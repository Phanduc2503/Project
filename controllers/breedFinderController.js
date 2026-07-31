const BreedFinder = require("../models/BreedFinder");
const Breed = require("../models/Breed");
const breedFinderService = require("../services/breedFinderService");
const { createNotification } = require("./notificationController");

// Show the questionnaire page
exports.questionnaire = async (req, res) => {
  try {
    res.render("breed-finder/questionnaire", {
      user: req.session.user || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Process questionnaire answers and show results
exports.results = async (req, res) => {
  try {
    const answers = {
      living: req.body.living,
      homeSize: req.body.homeSize,
      experience: req.body.experience,
      family: req.body.family,
      children: req.body.children,
      otherPets: req.body.otherPets,
      exercise: req.body.exercise,
      preferredSize: req.body.preferredSize,
      energy: req.body.energy,
      grooming: req.body.grooming,
      purpose: req.body.purpose,
      climate: req.body.climate,
    };

    // Find matching breeds from MongoDB
    const matches = await breedFinderService.findMatchingBreeds(answers, 10);

    // Enhance with AI if available
    const enhanced = await breedFinderService.enhanceWithAI(matches, answers);

    // Save to database if user is logged in
    let savedRecord = null;
    if (req.session.user) {
      savedRecord = new BreedFinder({
        userId: req.session.user._id,
        answers,
        results: enhanced.map((m) => ({
          breedId: m.breedId,
          score: m.score,
          reason: m.reason,
          aiExplanation: m.aiExplanation || undefined,
        })),
      });
      await savedRecord.save();
    }

    res.render("breed-finder/results", {
      user: req.session.user || null,
      answers,
      results: enhanced,
      savedRecordId: savedRecord ? savedRecord._id : null,
      isHistory: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// View a specific saved recommendation
exports.viewSaved = async (req, res) => {
  try {
    const record = await BreedFinder.findById(req.params.id)
      .populate("results.breedId")
      .lean();

    if (!record) {
      return res.status(404).send("Recommendation not found");
    }

    // Only allow owner or admin to view
    if (
      req.session.user &&
      req.session.user._id.toString() !== record.userId?.toString() &&
      req.session.user.role !== "admin"
    ) {
      return res.status(403).send("Unauthorized");
    }

    // Populate breed data for results
    const results = [];
    for (const r of record.results) {
      if (r.breedId) {
        results.push({
          breedId: r.breedId._id,
          breed: r.breedId,
          score: r.score,
          reason: r.reason,
          aiExplanation: r.aiExplanation,
        });
      }
    }

    res.render("breed-finder/results", {
      user: req.session.user || null,
      answers: record.answers,
      results,
      savedRecordId: record._id,
      isHistory: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Save a recommendation to favorites
exports.saveRecommendation = async (req, res) => {
  try {
    const { recordId } = req.params;

    if (!req.session.user) {
      return res.status(401).json({ error: "Please login first" });
    }

    const record = await BreedFinder.findById(recordId);
    if (!record) {
      return res.status(404).json({ error: "Recommendation not found" });
    }

    record.isSaved = true;
    await record.save();

    await createNotification(
      "breed_finder_saved",
      "Recommendation Saved",
      `You saved a breed recommendation to your profile.`,
      "/user/profile"
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Delete a saved recommendation
exports.deleteRecommendation = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.session.user) {
      return res.status(401).json({ error: "Please login first" });
    }

    const record = await BreedFinder.findById(id);
    if (!record) {
      return res.status(404).json({ error: "Recommendation not found" });
    }

    if (
      record.userId.toString() !== req.session.user._id.toString() &&
      req.session.user.role !== "admin"
    ) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await BreedFinder.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get user's recommendation history
exports.history = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    const records = await BreedFinder.find({ userId: req.session.user._id })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    // Populate breed names for each result
    for (const record of records) {
      for (const r of record.results) {
        if (r.breedId) {
          const breed = await Breed.findById(r.breedId).select("name image").lean();
          r.breedName = breed ? breed.name : "Unknown";
          r.breedImage = breed ? breed.image : null;
        }
      }
    }

    res.render("breed-finder/history", {
      user: req.session.user,
      records,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Compare breeds
exports.compare = async (req, res) => {
  try {
    const { ids } = req.query;
    if (!ids) {
      return res.redirect("/breed-finder");
    }

    const breedIds = Array.isArray(ids) ? ids : ids.split(",");
    const limitedIds = breedIds.slice(0, 3);

    const breeds = await Breed.find({ _id: { $in: limitedIds } })
      .populate("categoryId")
      .lean();

    const comparison = breedFinderService.compareBreeds(breeds);

    res.render("breed-finder/compare", {
      user: req.session.user || null,
      comparison,
      breeds,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// API endpoint for chatbot integration
exports.apiFindBreeds = async (req, res) => {
  try {
    const answers = req.body.answers || req.query;
    const matches = await breedFinderService.findMatchingBreeds(answers, 5);
    const enhanced = await breedFinderService.enhanceWithAI(matches, answers);

    res.json({
      success: true,
      results: enhanced.map((m) => ({
        breedId: m.breedId,
        breedName: m.breed.name,
        score: m.score,
        reason: m.reason,
        aiExplanation: m.aiExplanation,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// API: Get stats for admin dashboard
exports.getStats = async (req, res) => {
  try {
    const totalUses = await BreedFinder.countDocuments();
    const totalSaved = await BreedFinder.countDocuments({ isSaved: true });

    // Top recommended breed
    const topBreedAgg = await BreedFinder.aggregate([
      { $unwind: "$results" },
      { $group: { _id: "$results.breedId", count: { $sum: 1 }, avgScore: { $avg: "$results.score" } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    let topBreedName = "N/A";
    if (topBreedAgg.length > 0) {
      const topBreed = await Breed.findById(topBreedAgg[0]._id).select("name").lean();
      if (topBreed) topBreedName = topBreed.name;
    }

    // Most selected lifestyle
    const lifestyleAgg = await BreedFinder.aggregate([
      { $group: { _id: "$answers.living", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);
    const mostLifestyle = lifestyleAgg.length > 0 ? lifestyleAgg[0]._id : "N/A";

    // Most common dog size
    const sizeAgg = await BreedFinder.aggregate([
      { $group: { _id: "$answers.preferredSize", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);
    const mostSize = sizeAgg.length > 0 ? sizeAgg[0]._id : "N/A";

    res.json({
      totalUses,
      totalSaved,
      topBreed: topBreedName,
      mostLifestyle,
      mostSize,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// API: Get chart data for reports
exports.getChartData = async (req, res) => {
  try {
    // Usage over time (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const usageDays = [];
    const usageCounts = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(d.getDate() + i);
      const dayStart = new Date(d);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(d);
      dayEnd.setHours(23, 59, 59, 999);
      const count = await BreedFinder.countDocuments({
        createdAt: { $gte: dayStart, $lte: dayEnd },
      });
      usageDays.push(d.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
      usageCounts.push(count);
    }

    // Top recommendations
    const topBreedsAgg = await BreedFinder.aggregate([
      { $unwind: "$results" },
      { $group: { _id: "$results.breedId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);
    const topBreedIds = topBreedsAgg.map((b) => b._id);
    const topBreeds = await Breed.find({ _id: { $in: topBreedIds } })
      .select("name")
      .lean();
    const breedMap = {};
    topBreeds.forEach((b) => {
      breedMap[b._id.toString()] = b.name;
    });
    const popularBreeds = topBreedsAgg.map((b) => ({
      name: breedMap[b._id.toString()] || "Unknown",
      count: b.count,
    }));

    // Lifestyle distribution
    const lifestyleDist = await BreedFinder.aggregate([
      { $group: { _id: "$answers.living", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      usageDays,
      usageCounts,
      popularBreeds,
      lifestyleDistribution: lifestyleDist.map((l) => ({
        name: l._id || "Not specified",
        count: l.count,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};