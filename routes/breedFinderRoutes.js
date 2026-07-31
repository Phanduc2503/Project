const express = require("express");
const router = express.Router();
const breedFinderController = require("../controllers/breedFinderController");
const { requireLogin } = require("../middleware/authMiddleware");

// Questionnaire page
router.get("/breed-finder", breedFinderController.questionnaire);

// Process answers and show results
router.post("/breed-finder/results", breedFinderController.results);

// View saved recommendation
router.get("/breed-finder/saved/:id", breedFinderController.viewSaved);

// Save recommendation
router.post("/breed-finder/save/:recordId", requireLogin, breedFinderController.saveRecommendation);

// Delete recommendation
router.post("/breed-finder/delete/:id", requireLogin, breedFinderController.deleteRecommendation);

// Recommendation history
router.get("/breed-finder/history", requireLogin, breedFinderController.history);

// Compare breeds
router.get("/breed-finder/compare", breedFinderController.compare);

// API: Find breeds (for chatbot)
router.post("/api/breed-finder", breedFinderController.apiFindBreeds);
router.get("/api/breed-finder", breedFinderController.apiFindBreeds);

// API: Stats for admin
router.get("/api/breed-finder/stats", breedFinderController.getStats);

// API: Chart data for reports
router.get("/api/breed-finder/chart-data", breedFinderController.getChartData);

module.exports = router;