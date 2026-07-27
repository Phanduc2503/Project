const Breed = require("../models/Breed");
const Category = require("../models/Category");
const User = require("../models/User");
const Favorite = require("../models/Favorite");

exports.homePage = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 }).limit(6);

    const featuredBreeds = await Breed.find()
      .populate("categoryId")
      .sort({ createdAt: -1 })
      .limit(6);

    const totalBreeds = await Breed.countDocuments();
    const totalCategories = await Category.countDocuments();

    res.render("home/homePage", {
      categories,
      featuredBreeds,
      totalBreeds,
      totalCategories,
    });
  } catch (error) {
    console.log(error);
    res.render("home/homePage", {
      categories: [],
      featuredBreeds: [],
      totalBreeds: 0,
      totalCategories: 0,
    });
  }
};

// Helper to get date range filter
function getDateFilter(range) {
  const now = new Date();
  let start;

  switch (range) {
    case "today":
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "week":
      start = new Date(now);
      start.setDate(now.getDate() - now.getDay());
      start.setHours(0, 0, 0, 0);
      break;
    case "month":
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "year":
      start = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      return {};
  }

  return { $gte: start, $lte: now };
}

exports.adminPage = async (req, res) => {
  try {
    const range = req.query.range || "all";
    const dateFilter = range !== "all" ? { createdAt: getDateFilter(range) } : {};

    const totalBreeds = await Breed.countDocuments(dateFilter);
    const totalCategories = await Category.countDocuments(dateFilter);
    const totalUsers = await User.countDocuments(dateFilter);
    const totalFavorites = await Favorite.countDocuments(dateFilter);

    const recentBreeds = await Breed.find(dateFilter)
      .populate("categoryId")
      .sort({ createdAt: -1 })
      .limit(8);

    const recentUsers = await User.find(dateFilter)
      .sort({ createdAt: -1 })
      .limit(5);

    const recentFavorites = await Favorite.find(dateFilter)
      .populate("userId", "username email")
      .populate("breedId", "name")
      .sort({ createdAt: -1 })
      .limit(6);

    const recentNotifications = await require("../models/Notification").find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.render("admin/adminPage", {
      totalBreeds,
      totalCategories,
      totalUsers,
      totalFavorites,
      recentBreeds,
      recentUsers,
      recentFavorites,
      recentNotifications,
      currentRange: range,
    });
  } catch (error) {
    console.log(error);
    res.render("admin/adminPage", {
      totalBreeds: 0,
      totalCategories: 0,
      totalUsers: 0,
      totalFavorites: 0,
      recentBreeds: [],
      recentUsers: [],
      recentFavorites: [],
      recentNotifications: [],
      currentRange: "all",
    });
  }
};

// Admin reports page
exports.adminReports = async (req, res) => {
  try {
    const totalBreeds = await Breed.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalFavorites = await Favorite.countDocuments();

    // Category distribution
    const categories = await Category.find().lean();
    const catDistribution = [];
    for (const cat of categories) {
      const count = await Breed.countDocuments({ categoryId: cat._id });
      catDistribution.push({ name: cat.name, count });
    }

    // Top breeds by popularity (favorites count)
    const topBreedsAgg = await Favorite.aggregate([
      { $group: { _id: "$breedId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    const topBreedIds = topBreedsAgg.map(b => b._id);
    const topBreeds = await Breed.find({ _id: { $in: topBreedIds } }).select("name").lean();
    const breedMap = {};
    topBreeds.forEach(b => { breedMap[b._id.toString()] = b.name; });
    const popularBreeds = topBreedsAgg.map(b => ({
      name: breedMap[b._id.toString()] || "Unknown",
      count: b.count
    }));

    // User registrations over time (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    const userDays = [];
    const userCounts = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(d.getDate() + i);
      const dayStart = new Date(d);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(d);
      dayEnd.setHours(23, 59, 59, 999);
      const count = await User.countDocuments({ createdAt: { $gte: dayStart, $lte: dayEnd } });
      userDays.push(d.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
      userCounts.push(count);
    }

    res.render("admin/reports", {
      totalBreeds,
      totalCategories,
      totalUsers,
      totalFavorites,
      catDistribution,
      popularBreeds,
      reportDays: userDays,
      reportUserCounts: userCounts
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// Admin search API - searches breeds, categories, and users
exports.adminSearch = async (req, res) => {
  try {
    const q = req.query.q || "";
    if (!q || q.length < 1) {
      return res.json({ results: [] });
    }

    const regex = { $regex: q, $options: "i" };

    const [breeds, categories, users] = await Promise.all([
      Breed.find({
        $or: [
          { name: regex },
          { originCountry: regex },
          { temperament: regex },
        ]
      })
      .select("name originCountry image")
      .limit(5)
      .lean(),

      Category.find({ name: regex })
        .select("name description")
        .limit(5)
        .lean(),

      User.find({
        $or: [
          { username: regex },
          { email: regex },
        ]
      })
        .select("username email avatar")
        .limit(5)
        .lean(),
    ]);

    const results = [];

    breeds.forEach(b => {
      results.push({
        type: "breed",
        label: b.name,
        sublabel: b.originCountry || "Unknown origin",
        image: b.image || null,
        url: "/breeds/" + b._id,
        icon: "fa-paw",
      });
    });

    categories.forEach(c => {
      results.push({
        type: "category",
        label: c.name,
        sublabel: c.description ? c.description.substring(0, 60) : "Category",
        image: null,
        url: "/categories/edit/" + c._id,
        icon: "fa-folder",
      });
    });

    users.forEach(u => {
      results.push({
        type: "user",
        label: u.username,
        sublabel: u.email,
        image: u.avatar || null,
        url: "/user/profile",
        icon: "fa-user",
      });
    });

    res.json({ results });
  } catch (error) {
    console.error("Admin search error:", error);
    res.status(500).json({ results: [], error: "Search failed" });
  }
};