const Favorite = require("../models/Favorite");
const User = require("../models/User");
const Breed = require("../models/Breed");
const { createNotification } = require("./notificationController");

const PER_PAGE = 10;

// GET /admin/favorites - List all favorites with search, filter, sort, pagination
exports.index = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    const userId = req.query.userId || "";
    const breedId = req.query.breedId || "";
    const categoryId = req.query.categoryId || "";
    const sort = req.query.sort || "newest";

    // Build filter
    const filter = {};

    // Search by username or breed name
    if (search) {
      // Find matching users
      const matchingUsers = await User.find({
        username: { $regex: search, $options: "i" }
      }).select("_id").lean();
      const userIds = matchingUsers.map(u => u._id);

      // Find matching breeds
      const matchingBreeds = await Breed.find({
        name: { $regex: search, $options: "i" }
      }).select("_id").lean();
      const breedIds = matchingBreeds.map(b => b._id);

      filter.$or = [
        { userId: { $in: userIds } },
        { breedId: { $in: breedIds } }
      ];
    }

    if (userId) filter.userId = userId;
    if (breedId) filter.breedId = breedId;

    // Build sort
    let sortOption = {};
    if (sort === "newest") sortOption.createdAt = -1;
    else if (sort === "oldest") sortOption.createdAt = 1;
    else sortOption.createdAt = -1;

    const totalFavorites = await Favorite.countDocuments(filter);
    const totalPages = Math.ceil(totalFavorites / PER_PAGE);

    const favorites = await Favorite.find(filter)
      .populate({
        path: "userId",
        select: "username email avatar"
      })
      .populate({
        path: "breedId",
        populate: { path: "categoryId", select: "name" }
      })
      .sort(sortOption)
      .skip((page - 1) * PER_PAGE)
      .limit(PER_PAGE)
      .lean();

    // Filter out favorites with null references
    const validFavorites = favorites.filter(f => f.userId && f.breedId);

    // Stats
    const totalAllFavorites = await Favorite.countDocuments({});
    const usersWithFavorites = await Favorite.distinct("userId");
    const totalUsersWithFavorites = usersWithFavorites.length;

    // Most favorited breed
    const mostFavBreedAgg = await Favorite.aggregate([
      { $group: { _id: "$breedId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);
    let mostFavBreedName = "N/A";
    let mostFavBreedCount = 0;
    if (mostFavBreedAgg.length > 0) {
      const breed = await Breed.findById(mostFavBreedAgg[0]._id).select("name").lean();
      mostFavBreedName = breed ? breed.name : "Unknown";
      mostFavBreedCount = mostFavBreedAgg[0].count;
    }

    // Today's favorites
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayFavs = await Favorite.countDocuments({ createdAt: { $gte: todayStart } });

    // This week's favorites
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const weekFavs = await Favorite.countDocuments({ createdAt: { $gte: weekStart } });

    // Get all users for filter dropdown
    const allUsers = await User.find({}).select("username _id").sort({ username: 1 }).lean();

    // Get all breeds for filter dropdown
    const allBreeds = await Breed.find({}).select("name _id").sort({ name: 1 }).lean();

    // Get all categories for filter dropdown
    const Category = require("../models/Category");
    const allCategories = await Category.find({}).select("name _id").sort({ name: 1 }).lean();

    // Activity log - recent favorite actions
    const recentFavorites = await Favorite.find({})
      .populate({ path: "userId", select: "username" })
      .populate({ path: "breedId", select: "name" })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    const activityLog = recentFavorites
      .filter(f => f.userId && f.breedId)
      .map(f => ({
        username: f.userId.username,
        breedName: f.breedId.name,
        date: f.createdAt
      }));

    // Chart data: Most favorited breeds (top 8)
    const topBreedsAgg = await Favorite.aggregate([
      { $group: { _id: "$breedId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 }
    ]);
    const topBreedIds = topBreedsAgg.map(b => b._id);
    const topBreeds = await Breed.find({ _id: { $in: topBreedIds } }).select("name").lean();
    const breedMap = {};
    topBreeds.forEach(b => { breedMap[b._id.toString()] = b.name; });
    const chartBreeds = topBreedsAgg.map(b => ({
      name: breedMap[b._id.toString()] || "Unknown",
      count: b.count
    }));

    // Chart data: Favorites by category
    const favsWithBreeds = await Favorite.find({})
      .populate({ path: "breedId", select: "categoryId" })
      .lean();
    const categoryCounts = {};
    for (const fav of favsWithBreeds) {
      if (fav.breedId && fav.breedId.categoryId) {
        const catId = fav.breedId.categoryId.toString();
        categoryCounts[catId] = (categoryCounts[catId] || 0) + 1;
      }
    }
    const catIds = Object.keys(categoryCounts);
    const cats = await Category.find({ _id: { $in: catIds } }).select("name").lean();
    const catMap = {};
    cats.forEach(c => { catMap[c._id.toString()] = c.name; });
    const chartCategories = catIds.map(id => ({
      name: catMap[id] || "Uncategorized",
      count: categoryCounts[id]
    }));

    // Chart data: Favorites over time (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    const favsOverTime = await Favorite.find({
      createdAt: { $gte: sevenDaysAgo }
    }).sort({ createdAt: 1 }).lean();
    const dayLabels = [];
    const dayCounts = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(d.getDate() + i);
      const dayStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      dayLabels.push(dayStr);
      const dayStart = new Date(d);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(d);
      dayEnd.setHours(23, 59, 59, 999);
      const count = favsOverTime.filter(f => {
        const fd = new Date(f.createdAt);
        return fd >= dayStart && fd <= dayEnd;
      }).length;
      dayCounts.push(count);
    }

    res.render("admin/favorites", {
      favorites: validFavorites,
      totalFavorites,
      currentPage: page,
      totalPages,
      search,
      userId,
      breedId,
      categoryId,
      sort,
      success: req.query.success || null,
      error: req.query.error || null,
      totalAllFavorites,
      totalUsersWithFavorites,
      mostFavBreedName,
      mostFavBreedCount,
      todayFavs,
      weekFavs,
      allUsers,
      allBreeds,
      allCategories,
      activityLog,
      chartBreeds,
      chartCategories,
      chartDayLabels: dayLabels,
      chartDayCounts: dayCounts
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// POST /admin/favorites/delete/:id - Delete a single favorite
exports.destroy = async (req, res) => {
  try {
    const fav = await Favorite.findById(req.params.id)
      .populate({ path: "userId", select: "username" })
      .populate({ path: "breedId", select: "name" });

    if (!fav) {
      return res.redirect("/admin/favorites?error=Favorite not found");
    }

    const username = fav.userId ? fav.userId.username : "Unknown";
    const breedName = fav.breedId ? fav.breedId.name : "Unknown";

    await Favorite.findByIdAndDelete(req.params.id);

    await createNotification(
      "system",
      "Favorite Removed",
      `Admin removed "${breedName}" from "${username}"'s favorites.`,
      "/admin/favorites"
    );

    res.redirect("/admin/favorites?success=Favorite removed successfully");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/favorites?error=Failed to remove favorite");
  }
};

// POST /admin/favorites/bulk-delete - Bulk delete favorites
exports.bulkDestroy = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.redirect("/admin/favorites?error=No favorites selected");
    }

    await Favorite.deleteMany({ _id: { $in: ids } });

    await createNotification(
      "system",
      "Bulk Favorites Removed",
      `Admin removed ${ids.length} favorite(s) from the system.`,
      "/admin/favorites"
    );

    res.redirect("/admin/favorites?success=" + encodeURIComponent(ids.length + " favorite(s) removed successfully"));
  } catch (error) {
    console.log(error);
    res.redirect("/admin/favorites?error=Failed to remove favorites");
  }
};

// GET /admin/favorites/export/csv - Export favorites as CSV
exports.exportCsv = async (req, res) => {
  try {
    const favorites = await Favorite.find({})
      .populate({ path: "userId", select: "username email" })
      .populate({
        path: "breedId",
        select: "name originCountry",
        populate: { path: "categoryId", select: "name" }
      })
      .sort({ createdAt: -1 })
      .lean();

    const validFavs = favorites.filter(f => f.userId && f.breedId);

    let csv = "Username,Email,Breed Name,Category,Origin,Date Added\n";
    validFavs.forEach(f => {
      const date = new Date(f.createdAt).toLocaleDateString("en-US");
      const catName = f.breedId.categoryId ? f.breedId.categoryId.name : "N/A";
      csv += `"${f.userId.username}","${f.userId.email}","${f.breedId.name}","${catName}","${f.breedId.originCountry || 'N/A'}","${date}"\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=woofy-favorites.csv");
    res.send(csv);
  } catch (error) {
    console.log(error);
    res.redirect("/admin/favorites?error=Failed to export CSV");
  }
};