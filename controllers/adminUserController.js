const User = require("../models/User");
const Favorite = require("../models/Favorite");
const { createNotification } = require("./notificationController");

// Number of items per page
const PER_PAGE = 10;

// GET /admin/users - List all users with search, filter, sort, pagination
exports.index = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    const roleFilter = req.query.role || "";
    const statusFilter = req.query.status || "";
    const sort = req.query.sort || "newest";
    const range = req.query.range || "";

    // Build filter
    const filter = {};
    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (roleFilter) filter.role = roleFilter;
    if (statusFilter) filter.status = statusFilter;
    if (range === "new") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filter.createdAt = { $gte: thirtyDaysAgo };
    }

    // Build sort
    let sortOption = {};
    if (sort === "newest") sortOption.createdAt = -1;
    else if (sort === "oldest") sortOption.createdAt = 1;
    else sortOption.createdAt = -1;

    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / PER_PAGE);

    const users = await User.find(filter)
      .sort(sortOption)
      .skip((page - 1) * PER_PAGE)
      .limit(PER_PAGE)
      .lean();

    // Stats for the cards
    const totalAllUsers = await User.countDocuments({});
    const adminCount = await User.countDocuments({ role: "admin" });
    const activeCount = await User.countDocuments({ status: "active" });
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newUsersCount = await User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

    res.render("admin/users", {
      users,
      totalUsers,
      currentPage: page,
      totalPages,
      search,
      roleFilter,
      statusFilter,
      sort,
      range,
      success: req.query.success || null,
      error: req.query.error || null,
      totalAllUsers,
      adminCount,
      activeCount,
      newUsersCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// POST /admin/users/:id/role - Change user role
exports.changeRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    // Prevent admin from removing their own admin role
    if (userId === req.session.user._id.toString() && role !== "admin") {
      return res.redirect("/admin/users?error=You cannot remove your own admin role");
    }

    if (!["user", "admin"].includes(role)) {
      return res.redirect("/admin/users?error=Invalid role");
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.redirect("/admin/users?error=User not found");
    }

    const oldRole = user.role;
    user.role = role;
    await user.save();

    await createNotification(
      "system",
      "User Role Changed",
      `"${user.username}" role changed from "${oldRole}" to "${role}".`,
      "/admin/users"
    );

    res.redirect("/admin/users?success=User role updated successfully");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/users?error=Failed to update role");
  }
};

// POST /admin/users/:id/status - Toggle user status (active/suspended)
exports.toggleStatus = async (req, res) => {
  try {
    const userId = req.params.id;

    // Prevent admin from suspending themselves
    if (userId === req.session.user._id.toString()) {
      return res.redirect("/admin/users?error=You cannot suspend your own account");
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.redirect("/admin/users?error=User not found");
    }

    user.status = user.status === "active" ? "suspended" : "active";
    await user.save();

    await createNotification(
      "system",
      user.status === "active" ? "User Activated" : "User Suspended",
      `"${user.username}" account has been ${user.status === "active" ? "activated" : "suspended"}.`,
      "/admin/users"
    );

    res.redirect("/admin/users?success=User status updated successfully");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/users?error=Failed to update status");
  }
};

// POST /admin/users/:id/delete - Delete user
exports.destroy = async (req, res) => {
  try {
    const userId = req.params.id;

    // Prevent admin from deleting themselves
    if (userId === req.session.user._id.toString()) {
      return res.redirect("/admin/users?error=You cannot delete your own account");
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.redirect("/admin/users?error=User not found");
    }

    // Delete user's favorites
    await Favorite.deleteMany({ userId: user._id });

    const username = user.username;
    await User.findByIdAndDelete(userId);

    await createNotification(
      "system",
      "User Deleted",
      `User "${username}" has been deleted from the system.`,
      "/admin/users"
    );

    res.redirect("/admin/users?success=User deleted successfully");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/users?error=Failed to delete user");
  }
};

// GET /admin/users/:id - View single user detail
exports.show = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) {
      return res.redirect("/admin/users?error=User not found");
    }

    const favoritesCount = await Favorite.countDocuments({ userId: user._id });

    res.render("admin/user-detail", {
      viewUser: user,
      favoritesCount,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/admin/users?error=Failed to load user");
  }
};