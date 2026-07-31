const Breed = require("../models/Breed");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// ============================================================
// GEMINI MODEL CONFIGURATION
// Google AI Studio API supported models (as of 2026):
// - gemini-2.0-flash  (current recommended)
// - gemini-1.5-flash  (stable fallback)
// - gemini-1.5-pro    (higher quality, slower)
//
// If a model is deprecated or returns 404, the system
// automatically tries the next available model in the list.
// ============================================================

// Ordered list of preferred Gemini models (most preferred first)
const GEMINI_MODELS = [
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-pro",
];

let genAI = null;
let geminiModel = null;
let currentModelIndex = 0;

if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  geminiModel = genAI.getGenerativeModel({ model: GEMINI_MODELS[0] });
}

/**
 * Get the next available Gemini model if the current one fails.
 * Returns true if a fallback model was activated, false if none remain.
 */
function fallbackGeminiModel() {
  currentModelIndex++;
  if (currentModelIndex < GEMINI_MODELS.length && genAI) {
    const modelName = GEMINI_MODELS[currentModelIndex];
    geminiModel = genAI.getGenerativeModel({ model: modelName });
    console.warn(`Gemini: falling back to model "${modelName}"`);
    return true;
  }
  // No more models to try — disable Gemini for this session
  geminiModel = null;
  console.warn("Gemini: all models exhausted, AI explanations disabled.");
  return false;
}

/**
 * Score mapping for each answer to breed attributes
 */
const SCORE_MAP = {
  living: {
    Apartment: { small: 10, medium: 7, large: 3, any: 5 },
    House: { small: 7, medium: 9, large: 10, any: 7 },
    Farm: { small: 5, medium: 8, large: 10, any: 8 },
    Other: { small: 6, medium: 7, large: 6, any: 6 },
  },
  homeSize: {
    Small: { small: 10, medium: 6, large: 3, any: 5 },
    Medium: { small: 8, medium: 9, large: 6, any: 7 },
    Large: { small: 5, medium: 8, large: 10, any: 8 },
  },
  experience: {
    Beginner: { easy: 10, moderate: 7, hard: 3, any: 5 },
    Intermediate: { easy: 7, moderate: 9, hard: 6, any: 7 },
    Experienced: { easy: 5, moderate: 8, hard: 10, any: 8 },
  },
  family: {
    Single: { independent: 9, friendly: 6, protective: 7, any: 6 },
    Couple: { friendly: 8, independent: 7, playful: 8, any: 7 },
    "Family with children": { gentle: 10, patient: 10, playful: 9, any: 8 },
    Senior: { calm: 10, lowEnergy: 10, gentle: 9, any: 7 },
  },
  children: {
    No: { gentle: 6, patient: 6, any: 8 },
    Yes: { gentle: 10, patient: 10, playful: 8, any: 7 },
  },
  otherPets: {
    None: { friendly: 7, any: 8 },
    Cats: { catFriendly: 10, gentle: 8, any: 6 },
    Dogs: { dogFriendly: 10, social: 9, any: 6 },
    Other: { gentle: 8, friendly: 8, any: 6 },
  },
  exercise: {
    "Less than 30 min": { lowEnergy: 10, calm: 9, moderate: 4, any: 5 },
    "30-60 min": { moderate: 9, lowEnergy: 6, highEnergy: 4, any: 6 },
    "1-2 hours": { moderate: 8, highEnergy: 7, lowEnergy: 4, any: 6 },
    "More than 2 hours": { highEnergy: 10, active: 10, moderate: 5, any: 5 },
  },
  preferredSize: {
    Small: { small: 10, medium: 4, large: 1, any: 5 },
    Medium: { medium: 10, small: 5, large: 4, any: 6 },
    Large: { large: 10, medium: 5, small: 2, any: 5 },
    Any: { small: 7, medium: 8, large: 7, any: 8 },
  },
  energy: {
    Low: { lowEnergy: 10, calm: 9, moderate: 4, any: 5 },
    Medium: { moderate: 10, lowEnergy: 5, highEnergy: 5, any: 6 },
    High: { highEnergy: 10, active: 10, moderate: 4, any: 5 },
  },
  grooming: {
    "Low maintenance": { lowGrooming: 10, moderateGrooming: 5, highGrooming: 2, any: 5 },
    Medium: { moderateGrooming: 9, lowGrooming: 5, highGrooming: 5, any: 6 },
    "High maintenance": { highGrooming: 10, moderateGrooming: 6, lowGrooming: 2, any: 5 },
  },
  purpose: {
    Companion: { friendly: 10, affectionate: 10, loyal: 8, any: 6 },
    "Guard dog": { protective: 10, alert: 10, brave: 9, any: 5 },
    "Family dog": { gentle: 10, patient: 10, playful: 9, childFriendly: 10, any: 7 },
    "Running partner": { highEnergy: 10, active: 10, athletic: 9, any: 5 },
    Hiking: { active: 10, adventurous: 9, hardy: 8, any: 5 },
    "Service dog": { intelligent: 10, trainable: 10, calm: 9, any: 6 },
    "Therapy dog": { gentle: 10, calm: 10, affectionate: 9, any: 6 },
    "Show dog": { elegant: 9, trainable: 9, wellGroomed: 8, any: 6 },
    Any: { any: 8 },
  },
  climate: {
    Hot: { hotClimate: 10, coldClimate: 2, any: 5 },
    Cold: { coldClimate: 10, hotClimate: 2, any: 5 },
    Moderate: { hotClimate: 7, coldClimate: 7, any: 8 },
    Any: { any: 8 },
  },
};

/**
 * Analyze breed temperament and description to extract trait keywords
 */
function extractBreedTraits(breed) {
  const traits = new Set();
  const text = [
    breed.temperament || "",
    breed.behavior || "",
    breed.careRequirements || "",
    breed.description || "",
    breed.name || "",
  ]
    .join(" ")
    .toLowerCase();

  // Size detection
  if (/small|toy|miniature|tiny/i.test(text)) traits.add("small");
  if (/medium|moderate|average size/i.test(text)) traits.add("medium");
  if (/large|giant|big|massive/i.test(text)) traits.add("large");

  // Energy
  if (/energetic|active|high energy|hyper|lively/i.test(text)) traits.add("highEnergy");
  if (/moderate energy|calm|relaxed|gentle/i.test(text)) traits.add("moderate");
  if (/low energy|lazy|couch|sedentary|calm/i.test(text)) traits.add("lowEnergy");

  // Temperament
  if (/friendly|outgoing|social|sociable/i.test(text)) traits.add("friendly");
  if (/gentle|kind|sweet|tender/i.test(text)) traits.add("gentle");
  if (/loyal|devoted|faithful/i.test(text)) traits.add("loyal");
  if (/intelligent|smart|clever|bright/i.test(text)) traits.add("intelligent");
  if (/protective|watchful|guard/i.test(text)) traits.add("protective");
  if (/playful|fun|cheerful|happy/i.test(text)) traits.add("playful");
  if (/affectionate|loving|cuddly/i.test(text)) traits.add("affectionate");
  if (/patient|tolerant|easygoing/i.test(text)) traits.add("patient");
  if (/independent|aloof|self-reliant/i.test(text)) traits.add("independent");
  if (/alert|vigilant|aware/i.test(text)) traits.add("alert");
  if (/brave|courageous|fearless/i.test(text)) traits.add("brave");
  if (/trainable|obedient|eager to please/i.test(text)) traits.add("trainable");
  if (/calm|composed|serene|placid/i.test(text)) traits.add("calm");
  if (/active|athletic|sporty/i.test(text)) traits.add("active");
  if (/adventurous|explorer|curious/i.test(text)) traits.add("adventurous");
  if (/hardy|rugged|resilient|tough/i.test(text)) traits.add("hardy");
  if (/elegant|graceful|beautiful|stunning/i.test(text)) traits.add("elegant");
  if (/well.groomed|high maintenance|grooming needed/i.test(text)) traits.add("highGrooming");
  if (/low maintenance|easy care|minimal grooming/i.test(text)) traits.add("lowGrooming");
  if (/moderate grooming|occasional|regular brushing/i.test(text)) traits.add("moderateGrooming");

  // Family & children
  if (/good with children|child.friendly|kid.friendly|family/i.test(text)) traits.add("childFriendly");
  if (/good with cats|cat.friendly/i.test(text)) traits.add("catFriendly");
  if (/good with dogs|dog.friendly|pet.friendly/i.test(text)) traits.add("dogFriendly");
  if (/social|gets along|friendly with/i.test(text)) traits.add("social");

  // Climate
  if (/hot climate|warm|heat|tropical/i.test(text)) traits.add("hotClimate");
  if (/cold climate|cold weather|winter|arctic|snow/i.test(text)) traits.add("coldClimate");

  // Training difficulty
  if (/easy to train|highly trainable|quick learner/i.test(text)) traits.add("easy");
  if (/moderate training|average trainability/i.test(text)) traits.add("moderate");
  if (/challenging|stubborn|independent thinker|hard to train/i.test(text)) traits.add("hard");

  // Purpose traits
  if (/companion|lap dog|family pet/i.test(text)) traits.add("affectionate");
  if (/guard|watchdog|protection/i.test(text)) traits.add("protective");
  if (/service|assistance|working|therapy/i.test(text)) traits.add("trainable");
  if (/running|jogging|sport|agility/i.test(text)) traits.add("athletic");
  if (/show|exhibition|competition/i.test(text)) traits.add("elegant");

  // Add default traits based on category
  if (breed.categoryId && breed.categoryId.name) {
    const cat = breed.categoryId.name.toLowerCase();
    if (/toy|companion/i.test(cat)) {
      traits.add("small");
      traits.add("affectionate");
    }
    if (/working|guard|herding/i.test(cat)) {
      traits.add("intelligent");
      traits.add("active");
    }
    if (/hound|sporting/i.test(cat)) {
      traits.add("active");
      traits.add("friendly");
    }
    if (/terrier/i.test(cat)) {
      traits.add("active");
      traits.add("alert");
    }
  }

  return traits;
}

/**
 * Calculate compatibility score between user answers and a breed
 */
function calculateScore(answers, breed) {
  const traits = extractBreedTraits(breed);
  let totalScore = 0;
  let maxScore = 0;

  for (const [question, answer] of Object.entries(answers)) {
    if (!answer || !SCORE_MAP[question]) continue;

    const answerScores = SCORE_MAP[question][answer];
    if (!answerScores) continue;

    let bestScore = 0;
    for (const [trait, score] of Object.entries(answerScores)) {
      if (trait === "any") {
        bestScore = Math.max(bestScore, score);
      } else if (traits.has(trait)) {
        bestScore = Math.max(bestScore, score);
      }
    }
    totalScore += bestScore;
    maxScore += 10; // max possible per question
  }

  return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
}

/**
 * Generate a human-readable reason why a breed matches
 */
function generateReason(breed, score) {
  const reasons = [];
  const text = [
    breed.temperament || "",
    breed.behavior || "",
    breed.description || "",
  ]
    .join(" ")
    .toLowerCase();

  if (/friendly|outgoing|social/i.test(text)) reasons.push("Friendly and social temperament");
  if (/gentle|kind|sweet/i.test(text)) reasons.push("Gentle and kind nature");
  if (/good with children|child.friendly|family/i.test(text)) reasons.push("Excellent with children and families");
  if (/intelligent|smart|trainable/i.test(text)) reasons.push("Highly intelligent and trainable");
  if (/low energy|calm|relaxed/i.test(text)) reasons.push("Calm and relaxed energy level");
  if (/active|energetic|high energy/i.test(text)) reasons.push("Active and energetic personality");
  if (/protective|guard|watchful/i.test(text)) reasons.push("Natural protective instincts");
  if (/small|toy|miniature/i.test(text)) reasons.push("Compact size suitable for various homes");
  if (/large|giant/i.test(text)) reasons.push("Impressive size and presence");
  if (/low maintenance|easy care/i.test(text)) reasons.push("Low maintenance grooming needs");
  if (/affectionate|loving|cuddly/i.test(text)) reasons.push("Affectionate and loving companion");
  if (/loyal|devoted/i.test(text)) reasons.push("Extremely loyal and devoted");
  if (/playful|fun|cheerful/i.test(text)) reasons.push("Playful and cheerful disposition");
  if (/independent/i.test(text)) reasons.push("Independent and self-reliant");

  if (reasons.length === 0) {
    reasons.push(`Well-suited based on your preferences (${score}% match)`);
  }

  return reasons.slice(0, 3).join(". ") + ".";
}

/**
 * Main function: Find matching breeds based on user answers
 */
async function findMatchingBreeds(answers, limit = 10) {
  // Get all breeds with category populated
  const breeds = await Breed.find().populate("categoryId").lean();

  // Calculate scores for each breed
  const scored = breeds.map((breed) => ({
    breed,
    score: calculateScore(answers, breed),
  }));

  // Filter out low scores and sort
  const filtered = scored
    .filter((item) => item.score >= 30)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  // Generate reasons
  const results = filtered.map((item) => ({
    breedId: item.breed._id,
    breed: item.breed,
    score: item.score,
    reason: generateReason(item.breed, item.score),
  }));

  return results;
}

// ============================================================
// NEW BATCH AI EXPLANATION SYSTEM
// ============================================================
// Uses a SINGLE Gemini API call for the top 3 breeds instead of
// one call per breed. Includes caching, timeout protection, and
// graceful fallback when Gemini is unavailable.
// ============================================================
// AI EXPLANATION CACHE
// In-memory cache with 60-second TTL to avoid duplicate Gemini
// calls when the same answers are submitted repeatedly.
// ============================================================
const aiCache = new Map();
const AI_CACHE_TTL_MS = 60_000; // 60 seconds

/**
 * Generate a cache key from the answers object (sorted keys for consistency).
 */
function makeCacheKey(answers) {
  const sorted = Object.keys(answers)
    .sort()
    .map((k) => `${k}=${answers[k] || ""}`)
    .join("&");
  return `ai_explanation_${sorted}`;
}

/**
 * Build a default (fallback) AI explanation object when Gemini is
 * unavailable, rate-limited, or returns invalid data.
 */
function makeDefaultExplanation(breed, answers) {
  const reasons = [];
  const text = [
    breed.temperament || "",
    breed.description || "",
    breed.behavior || "",
  ]
    .join(" ")
    .toLowerCase();

  if (/friendly|outgoing|social/i.test(text)) reasons.push("This breed is naturally friendly and social, making it a great companion.");
  if (/gentle|kind|sweet|patient/i.test(text)) reasons.push("Its gentle and patient temperament suits a calm household.");
  if (/good with children|child.friendly|family/i.test(text)) reasons.push("It is known for being excellent with children and families.");
  if (/intelligent|smart|trainable|eager to please/i.test(text)) reasons.push("Highly intelligent and trainable, perfect for first-time owners.");
  if (/low energy|calm|relaxed/i.test(text)) reasons.push("Its calm energy level matches a relaxed lifestyle perfectly.");
  if (/active|energetic|high energy/i.test(text)) reasons.push("An energetic breed that will keep you active and engaged.");
  if (/small|toy|miniature/i.test(text)) reasons.push("Its compact size makes it ideal for apartments and smaller homes.");
  if (/low maintenance|easy care|minimal grooming/i.test(text)) reasons.push("Low grooming requirements mean less maintenance for you.");
  if (/affectionate|loving|cuddly/i.test(text)) reasons.push("An affectionate companion that loves to be close to its family.");
  if (/loyal|devoted|protective/i.test(text)) reasons.push("Extremely loyal and protective, making it a wonderful family guardian.");
  if (/playful|fun|cheerful/i.test(text)) reasons.push("A playful and cheerful personality that brings joy to any home.");
  if (/apartment|adaptable/i.test(text)) reasons.push("Adaptable to various living situations, including apartments.");
  if (/hot climate|warm|heat/i.test(text)) reasons.push("Well-suited for warm climates.");
  if (/cold climate|cold weather|winter|arctic/i.test(text)) reasons.push("Thrives in cold climates with its thick coat.");
  if (/guard|watchdog|protection/i.test(text)) reasons.push("Excellent guard dog with natural protective instincts.");
  if (/good with dogs|dog.friendly|pet.friendly/i.test(text)) reasons.push("Gets along well with other pets in the household.");
  if (/good with cats|cat.friendly/i.test(text)) reasons.push("Can live harmoniously with cats when properly introduced.");

  // If we couldn't detect anything specific, use a generic reason from generateReason
  if (reasons.length === 0) {
    reasons.push(generateReason(breed, 80));
  }

  return {
    whyFit: reasons.slice(0, 2).join(" "),
    advantages: "Adapts well to various home environments and family situations. Known for its reliable temperament and companionship qualities.",
    disadvantages: "Every breed has unique needs — ensure you can meet its exercise, grooming, and social requirements before committing.",
    trainingTips: "Start training early with positive reinforcement techniques. Consistency and patience are key to building a strong bond.",
    considerations: "Consider your living space, daily schedule, and long-term commitment before choosing this breed. Regular vet check-ups and a balanced diet are essential.",
  };
}

/**
 * Call Gemini with a SINGLE batch prompt that asks about up to 3 breeds.
 * Returns a Map<breedName, explanation> or null on failure.
 * Uses AbortController for timeout protection (15-second timeout).
 */
async function batchFetchAIExplanations(results, answers) {
  if (!geminiModel || results.length === 0) return null;

  // Only request AI for the top 3 breeds to avoid rate limits
  const topBreeds = results.slice(0, 3);

  // Build the prompt with all breed info in one request
  const breedInfoBlocks = topBreeds
    .map(
      (item, i) => `Breed ${i + 1}:
- Name: ${item.breed.name}
- Category: ${item.breed.categoryId ? item.breed.categoryId.name : "N/A"}
- Origin: ${item.breed.originCountry || "N/A"}
- Temperament: ${item.breed.temperament || "N/A"}
- Behavior: ${item.breed.behavior || "N/A"}
- Care Requirements: ${item.breed.careRequirements || "N/A"}
- Description: ${item.breed.description || "N/A"}
- Life Expectancy: ${item.breed.lifeExpectancy || "N/A"} years`
    )
    .join("\n\n");

  const prompt = `You are a dog breed expert. Analyze the following dog breeds and explain why each matches the user's lifestyle.

USER PREFERENCES:
${Object.entries(answers)
  .filter(([, v]) => v)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join("\n")}

BREEDS TO ANALYZE:
${breedInfoBlocks}

Return ONLY a valid JSON array (no markdown, no code fences, no extra text). The array must contain exactly ${topBreeds.length} objects, one per breed in the order given above. Each object must have these fields:
{
  "breedName": "Exact breed name as provided",
  "whyFit": "2-3 sentences explaining why this breed fits the user's lifestyle",
  "advantages": "2-3 sentences about this breed's advantages for this specific user",
  "disadvantages": "2-3 sentences about potential challenges or considerations",
  "trainingTips": "2-3 sentences with training tips specific to this breed",
  "considerations": "2-3 sentences about things to consider before getting this breed"
}`;

  try {
    // Use AbortController for 15-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);

    const result = await geminiModel.generateContent(prompt, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const response = result.response;
    const text = response.text();

    // Try to extract a JSON array from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(parsed)) return null;

    // Build a map keyed by breedName for easy lookup
    const explanationMap = new Map();
    for (const entry of parsed) {
      if (entry && entry.breedName) {
        explanationMap.set(entry.breedName.trim().toLowerCase(), {
          whyFit: entry.whyFit || "",
          advantages: entry.advantages || "",
          disadvantages: entry.disadvantages || "",
          trainingTips: entry.trainingTips || "",
          considerations: entry.considerations || "",
        });
      }
    }
    return explanationMap;
  } catch (error) {
    // Graceful fallback: log but never throw to the UI
    if (error.name === "AbortError") {
      console.warn("Gemini API timed out after 15 seconds — using fallback explanations.");
    } else {
      console.warn("Gemini API error (rate limit / quota / network):", error.message);

      // If the model returned 404 (deprecated/not found), try the next model
      if (error.message && (error.message.includes("404") || error.message.includes("not found") || error.message.includes("not available") || error.message.includes("no longer available"))) {
        if (fallbackGeminiModel()) {
          // Retry with the fallback model
          return await batchFetchAIExplanations(results, answers);
        }
      }
    }
    return null;
  }
}

/**
 * Get AI explanations for top breeds using a SINGLE Gemini API call.
 *
 * - Only the TOP 3 breeds receive AI-generated explanations.
 * - Remaining breeds get a local fallback explanation.
 * - Results are cached in memory for 60 seconds to avoid redundant calls.
 * - If Gemini fails (rate limit, timeout, etc.), fallback explanations are used.
 * - Never throws an exception to the caller.
 */
async function enhanceWithAI(results, answers) {
  if (!geminiModel) return results;

  // --- Check the in-memory cache first ---
  const cacheKey = makeCacheKey(answers);
  const cached = aiCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < AI_CACHE_TTL_MS) {
    // Cache hit — reapply the cached explanations to the current results
    const cachedMap = cached.explanationMap;
    return results.map((item) => {
      const breedName = item.breed.name.trim().toLowerCase();
      const aiExplanation = cachedMap.get(breedName) || null;
      return { ...item, aiExplanation };
    });
  }

  // --- Batch request: ONE Gemini call for all top breeds ---
  const explanationMap = await batchFetchAIExplanations(results, answers);

  // --- Merge explanations back into results ---
  const enhanced = results.map((item) => {
    const breedName = item.breed.name.trim().toLowerCase();
    // If we got a valid explanation from Gemini, use it.
    // Otherwise, generate a local fallback.
    const aiExplanation =
      (explanationMap && explanationMap.get(breedName)) ||
      makeDefaultExplanation(item.breed, answers);
    return { ...item, aiExplanation };
  });

  // --- Store in cache (even if null — avoids retrying failed calls) ---
  aiCache.set(cacheKey, {
    timestamp: Date.now(),
    explanationMap:
      explanationMap ||
      new Map(
        results.map((item) => [
          item.breed.name.trim().toLowerCase(),
          makeDefaultExplanation(item.breed, answers),
        ])
      ),
  });

  return enhanced;
}

/**
 * Compare breeds side by side
 */
function compareBreeds(breeds) {
  return breeds.map((breed) => ({
    name: breed.name,
    image: breed.image,
    temperament: breed.temperament || "N/A",
    energy: extractEnergyLevel(breed),
    trainability: extractTrainability(breed),
    children: extractChildFriendliness(breed),
    apartment: extractApartmentSuitability(breed),
    exercise: extractExerciseNeeds(breed),
    grooming: extractGroomingLevel(breed),
    lifeExpectancy: breed.lifeExpectancy ? `${breed.lifeExpectancy} years` : "N/A",
    origin: breed.originCountry || "N/A",
  }));
}

function extractEnergyLevel(breed) {
  const text = (breed.temperament + " " + breed.description).toLowerCase();
  if (/high energy|energetic|hyper|very active/i.test(text)) return "High";
  if (/moderate|medium energy/i.test(text)) return "Medium";
  if (/low energy|calm|relaxed|lazy/i.test(text)) return "Low";
  return "Medium";
}

function extractTrainability(breed) {
  const text = (breed.temperament + " " + breed.behavior + " " + breed.description).toLowerCase();
  if (/easy to train|highly trainable|eager to please|intelligent/i.test(text)) return "Easy";
  if (/moderate|independent|stubborn/i.test(text)) return "Moderate";
  if (/challenging|difficult|hard to train|strong.willed/i.test(text)) return "Challenging";
  return "Moderate";
}

function extractChildFriendliness(breed) {
  const text = (breed.temperament + " " + breed.description).toLowerCase();
  if (/good with children|child.friendly|kid.friendly|family|gentle|patient/i.test(text)) return "Good";
  if (/cautious|reserved|aloof/i.test(text)) return "Cautious";
  if (/not recommended|aggressive|unpredictable/i.test(text)) return "Not Recommended";
  return "Good";
}

function extractApartmentSuitability(breed) {
  const text = (breed.temperament + " " + breed.behavior + " " + breed.description).toLowerCase();
  if (/apartment|small space|indoor|adaptable/i.test(text)) return "Good";
  if (/space|yard|large home|house with garden/i.test(text)) return "Needs Space";
  if (/moderate|adaptable|flexible/i.test(text)) return "Moderate";
  return "Moderate";
}

function extractExerciseNeeds(breed) {
  const text = (breed.temperament + " " + breed.behavior + " " + breed.description).toLowerCase();
  if (/high exercise|needs lots|daily run|vigorous|active/i.test(text)) return "High";
  if (/moderate|regular|daily walk/i.test(text)) return "Moderate";
  if (/low exercise|minimal|short walk|calm/i.test(text)) return "Low";
  return "Moderate";
}

function extractGroomingLevel(breed) {
  const text = (breed.careRequirements + " " + breed.description).toLowerCase();
  if (/high maintenance|frequent|daily brushing|professional|regular grooming/i.test(text)) return "High";
  if (/moderate|weekly|occasional|regular brushing/i.test(text)) return "Medium";
  if (/low maintenance|minimal|occasional|easy care|hypoallergenic/i.test(text)) return "Low";
  return "Medium";
}

module.exports = {
  findMatchingBreeds,
  enhanceWithAI,
  compareBreeds,
  calculateScore,
  extractBreedTraits,
};
