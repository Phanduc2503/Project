// ===== WOOFY SEED DATA =====
// Run with: node seeds/seed-data.js
// This will populate Categories and Breeds collections

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const Category = require("../models/Category");
const Breed = require("../models/Breed");

// ===== CATEGORIES =====
const categories = [
  {
    name: "Sporting Dogs",
    description: "Active, alert, and friendly breeds developed for hunting game birds. They make excellent family companions with proper exercise and thrive in homes that can provide ample outdoor activity."
  },
  {
    name: "Working Dogs",
    description: "Large, strong, and intelligent breeds bred for tasks like guarding property, pulling sleds, and performing rescue operations. They are loyal, protective, and require experienced handling."
  },
  {
    name: "Herding Dogs",
    description: "Highly intelligent and energetic breeds developed for herding livestock. They excel in obedience and agility training and need plenty of mental and physical stimulation to thrive."
  },
  {
    name: "Hound Dogs",
    description: "Bred for hunting, hounds are known for their keen sense of smell, remarkable stamina, and distinctive baying voices. They come in both scent hound and sighthound varieties."
  },
  {
    name: "Terrier Dogs",
    description: "Feisty, energetic, and courageous breeds originally bred for hunting vermin. They have strong personalities despite their varying sizes and are known for their determination and spirit."
  },
  {
    name: "Toy Dogs",
    description: "Small, playful companion dogs perfect for apartment living. They are known for their petite size, affectionate nature, and big personalities packed into tiny bodies."
  },
  {
    name: "Non-Sporting Dogs",
    description: "A diverse group of breeds with varied sizes, coat types, and temperaments. They don't fit neatly into other categories but each has a unique and wonderful personality."
  },
  {
    name: "Companion Dogs",
    description: "Breeds specifically developed to be loving companions. They thrive on human interaction, are ideal for families and individuals, and excel at providing emotional support."
  },
  {
    name: "Mixed Breeds",
    description: "Crossbred dogs combining the best traits of two purebred parents. They often benefit from hybrid vigor and can have unique appearances and temperaments."
  },
  {
    name: "Rare Breeds",
    description: "Uncommon and distinctive breeds with unique histories and characteristics. These dogs are less frequently seen but offer exceptional qualities for dedicated owners."
  }
];

// ===== DOG BREEDS =====
const breeds = [
  // ==========================================
  // SPORTING DOGS (categoryIndex: 0)
  // ==========================================
  {
    name: "Golden Retriever",
    categoryIndex: 0,
    originCountry: "Scotland",
    lifeExpectancy: 12,
    temperament: "Intelligent, friendly, reliable, eager to please",
    behavior: "Golden Retrievers are one of the most beloved family dogs. They are exceptionally friendly, patient with children, and eager to please. They have a natural love for water and retrieving. They get along well with other dogs and strangers.",
    careRequirements: "Daily exercise including walks and play sessions. Weekly brushing to manage shedding. Prone to obesity so portion control is important. Regular ear cleaning and health checkups. Thrives on human companionship.",
    description: "The Golden Retriever was developed in Scotland in the 19th century by Lord Tweedmouth as a hunting dog for retrieving waterfowl. They are known for their beautiful golden coat, gentle mouth, and kind expression. Consistently ranked among the most popular dog breeds worldwide.",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop"
  },
  {
    name: "Labrador Retriever",
    categoryIndex: 0,
    originCountry: "Canada (Newfoundland)",
    lifeExpectancy: 13,
    temperament: "Friendly, active, outgoing, gentle",
    behavior: "Labradors are friendly, energetic, and eager to please. They have a natural love for water and a soft mouth for retrieving. They are excellent with children and other dogs. They make outstanding family pets, service dogs, and working dogs.",
    careRequirements: "Plenty of daily exercise including swimming and fetching. Their short, water-resistant coat sheds year-round and needs regular brushing. They are food-motivated and prone to obesity. Need lots of human interaction.",
    description: "The Labrador Retriever originated in Newfoundland, Canada, where they helped fishermen retrieve nets and fish from the cold Atlantic waters. Despite their name, they were refined in England. They are known for their friendly nature and distinctive otter-like tail.",
    image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600&auto=format&fit=crop"
  },
  {
    name: "English Setter",
    categoryIndex: 0,
    originCountry: "England",
    lifeExpectancy: 12,
    temperament: "Gentle, friendly, affectionate, mellow",
    behavior: "English Setters are gentle and friendly dogs with a mellow disposition. They are known for their elegant, feathered coat and graceful movement. They are excellent with children and other dogs. They have a moderate energy level and enjoy both play and relaxation.",
    careRequirements: "Moderate daily exercise including walks and playtime. Their long, silky coat needs regular brushing several times per week. Professional grooming every 6-8 weeks. Regular ear cleaning. They thrive on family companionship.",
    description: "The English Setter was developed in England over 400 years ago as a bird dog that would 'set' or crouch when locating game birds. They are one of the oldest gundog breeds and are known for their distinctive speckled coat pattern called 'belton'.",
    image: "https://images.unsplash.com/photo-1605714366425-c54db9bf6034?w=600&auto=format&fit=crop"
  },
  {
    name: "Irish Setter",
    categoryIndex: 0,
    originCountry: "Ireland",
    lifeExpectancy: 12,
    temperament: "Energetic, playful, affectionate, outgoing",
    behavior: "Irish Setters are exuberant and playful dogs with a zest for life. They are famously friendly with everyone they meet, including strangers and other dogs. They have a beautiful mahogany-red coat and a graceful, athletic build. They retain a puppy-like energy well into adulthood.",
    careRequirements: "Substantial daily exercise including long walks or runs. Their beautiful red coat needs regular brushing to prevent mats. Professional grooming recommended. They need a securely fenced yard. Mental stimulation is important to prevent boredom.",
    description: "The Irish Setter was developed in Ireland in the 18th century as a bird dog. Their striking red coat made them easily visible in the field. They were originally known as the 'Red Setter' and became popular show dogs in the Victorian era.",
    image: "https://images.unsplash.com/photo-1605714366425-c54db9bf6034?w=600&auto=format&fit=crop"
  },
  {
    name: "Cocker Spaniel",
    categoryIndex: 0,
    originCountry: "England",
    lifeExpectancy: 13,
    temperament: "Gentle, affectionate, happy, trusting",
    behavior: "Cocker Spaniels are gentle and affectionate family dogs. They are known for their beautiful, silky coat and long, feathered ears. They are happy and wag their tails constantly. They get along well with children and other pets. They have a soft, sweet expression.",
    careRequirements: "Their luxurious coat needs regular brushing and professional grooming every 6-8 weeks. Moderate daily exercise. Their long ears need regular cleaning to prevent infections. They thrive on human companionship and can develop separation anxiety.",
    description: "The Cocker Spaniel is the smallest of the sporting spaniels, named for their skill in hunting woodcock. They became immensely popular as family dogs, partly due to their starring role in Disney's 'Lady and the Tramp'.",
    image: "https://images.unsplash.com/photo-1594468190422-f36c3e6c7d64?w=600&auto=format&fit=crop"
  },
  {
    name: "English Springer Spaniel",
    categoryIndex: 0,
    originCountry: "England",
    lifeExpectancy: 13,
    temperament: "Friendly, playful, eager to please, energetic",
    behavior: "English Springer Spaniels are cheerful and energetic sporting dogs. They are eager to please and respond well to training. They have a natural instinct for flushing and retrieving game. They are excellent with children and other dogs. They have an enthusiastic, wagging tail.",
    careRequirements: "Substantial daily exercise including walks and play sessions. Their medium-length, wavy coat needs regular brushing. Their ears need regular cleaning to prevent infections. They thrive when given a job to do and excel in hunt tests and agility.",
    description: "The English Springer Spaniel was developed in England as a hunting dog that 'springs' game from cover. They are the foundation of all spaniel breeds. Their wagging tail and happy expression reflect their friendly, enthusiastic nature.",
    image: "https://images.unsplash.com/photo-1605714366425-c54db9bf6034?w=600&auto=format&fit=crop"
  },
  {
    name: "Weimaraner",
    categoryIndex: 0,
    originCountry: "Germany",
    lifeExpectancy: 12,
    temperament: "Energetic, intelligent, fearless, obedient",
    behavior: "Weimaraners are sleek, athletic dogs with boundless energy. They are highly intelligent and need constant mental stimulation. They form deep bonds with their families and can be protective. They are known for their distinctive silver-gray coat and amber eyes.",
    careRequirements: "Extensive daily exercise and mental challenges. Their short coat is easy to maintain. They can be destructive if under-exercised. Early socialization and firm, consistent training are essential. Not recommended for inexperienced owners.",
    description: "The Weimaraner was developed in Germany in the early 19th century for hunting large game like deer and boar. They were known as the 'Gray Ghost' for their distinctive coat color and stealthy hunting style. Today they are versatile sporting and family dogs.",
    image: "https://images.unsplash.com/photo-1605714366425-c54db9bf6034?w=600&auto=format&fit=crop"
  },
  {
    name: "Vizsla",
    categoryIndex: 0,
    originCountry: "Hungary",
    lifeExpectancy: 13,
    temperament: "Affectionate, energetic, gentle, loyal",
    behavior: "Vizslas are affectionate and energetic dogs known as 'Velcro dogs' because they stick close to their owners. They have a beautiful golden-rust coat and a lean, athletic build. They are gentle with children and get along with other dogs. They thrive on human contact.",
    careRequirements: "Substantial daily exercise including running and play. Their short coat needs minimal grooming. They are sensitive and respond best to positive training. They need to be with their family and can develop separation anxiety if left alone too long.",
    description: "The Vizsla is an ancient Hungarian breed used by Magyar warriors for falconry and hunting. They were nearly extinct after World War II but were carefully revived. They are known for their exceptional pointing ability and loving, gentle nature.",
    image: "https://images.unsplash.com/photo-1605714366425-c54db9bf6034?w=600&auto=format&fit=crop"
  },
  {
    name: "Pointer",
    categoryIndex: 0,
    originCountry: "England",
    lifeExpectancy: 13,
    temperament: "Friendly, even-tempered, energetic, dignified",
    behavior: "Pointers are friendly and even-tempered dogs with a dignified demeanor. They are known for their classic pointing stance when locating game. They are energetic and athletic, requiring plenty of exercise. They are good with children and other dogs when properly socialized.",
    careRequirements: "Extensive daily exercise including running in open spaces. Their short coat needs minimal grooming. They need a securely fenced yard. They thrive in active homes. Early training and socialization are important for proper development.",
    description: "The Pointer was developed in England in the 17th century as a bird dog that would 'point' at game birds. They are considered the epitome of a gundog and are known for their speed, endurance, and elegant, athletic build.",
    image: "https://images.unsplash.com/photo-1605714366425-c54db9bf6034?w=600&auto=format&fit=crop"
  },
  {
    name: "Nova Scotia Duck Tolling Retriever",
    categoryIndex: 0,
    originCountry: "Canada (Nova Scotia)",
    lifeExpectancy: 13,
    temperament: "Intelligent, energetic, affectionate, alert",
    behavior: "Tollers are the smallest of the retriever breeds and are known for their unique hunting technique of 'tolling' or luring waterfowl. They are highly intelligent and energetic. They are affectionate with their families and can be reserved with strangers. They have a distinctive red coat.",
    careRequirements: "Substantial daily exercise and mental stimulation. Their medium-length, water-resistant coat needs regular brushing. They are intelligent and need engaging activities. They excel in dog sports like agility and flyball. Early socialization is important.",
    description: "The Nova Scotia Duck Tolling Retriever was developed in the early 19th century in Nova Scotia, Canada. They lure waterfowl by playing along the shoreline, a technique called 'tolling'. They are known for their intelligence, athleticism, and cheerful disposition.",
    image: "https://images.unsplash.com/photo-1605714366425-c54db9bf6034?w=600&auto=format&fit=crop"
  },

  // ==========================================
  // WORKING DOGS (categoryIndex: 1)
  // ==========================================
  {
    name: "Boxer",
    categoryIndex: 1,
    originCountry: "Germany",
    lifeExpectancy: 11,
    temperament: "Playful, energetic, loyal, patient",
    behavior: "Boxers are playful and energetic dogs with a patient nature, especially with children. They are known for their distinctive 'boxing' motion with their front paws. They are loyal protectors of their families and have a strong, muscular build. They are alert and make excellent watchdogs.",
    careRequirements: "Daily exercise including walks and play sessions. Their short coat needs minimal grooming. They are prone to certain health conditions including heart issues and cancer. They need early socialization and training. They thrive on family interaction.",
    description: "The Boxer was developed in Germany in the late 19th century from the now-extinct Bullenbeisser and English Bulldogs. They were used as bull-baiting dogs, cattle drivers, and later as military and police dogs. Their name comes from their tendency to play by standing on hind legs and 'boxing' with front paws.",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&auto=format&fit=crop"
  },
  {
    name: "Rottweiler",
    categoryIndex: 1,
    originCountry: "Germany",
    lifeExpectancy: 10,
    temperament: "Loyal, confident, courageous, calm",
    behavior: "Rottweilers are powerful, confident dogs with a calm and courageous temperament. They are devoted to their families and make excellent guard dogs. They are known for their intelligence and trainability. They are good with children when raised with them but can be wary of strangers.",
    careRequirements: "Regular exercise but not excessive. Their short coat requires minimal grooming. Early socialization and firm, consistent training are essential. They thrive with an experienced owner who provides strong leadership. Regular health checkups are important.",
    description: "The Rottweiler traces its origins back to the Roman Empire, where they were used as cattle dogs. They were later named after the town of Rottweil, Germany, where they served as butcher's dogs. They are known for their strength, endurance, and protective instincts.",
    image: "https://images.unsplash.com/photo-1567752881298-894b81f6aa9c?w=600&auto=format&fit=crop"
  },
  {
    name: "Doberman Pinscher",
    categoryIndex: 1,
    originCountry: "Germany",
    lifeExpectancy: 11,
    temperament: "Loyal, intelligent, alert, fearless",
    behavior: "Dobermans are highly intelligent and loyal dogs with a sleek, athletic build. They are alert and fearless, making them excellent guard dogs. They form strong bonds with their families and are gentle with children when properly socialized. They are known for their speed and endurance.",
    careRequirements: "Substantial daily exercise including running and play. Their short coat needs minimal grooming. They need early socialization and consistent training. They thrive on having a job to do. They are sensitive to cold weather and need protection in winter.",
    description: "The Doberman Pinscher was developed in Germany in the 1890s by Karl Friedrich Louis Dobermann, a tax collector who needed a protective companion. They were refined to be the perfect guard dog while maintaining a loyal and gentle nature with their families.",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&auto=format&fit=crop"
  },
  {
    name: "Great Dane",
    categoryIndex: 1,
    originCountry: "Germany",
    lifeExpectancy: 9,
    temperament: "Friendly, patient, dependable, gentle",
    behavior: "Despite their enormous size, Great Danes are known as 'gentle giants'. They are friendly with everyone, including children and other pets. They have a calm and patient demeanor. They are not overly energetic but need space to move comfortably.",
    careRequirements: "Moderate exercise but space to move. Their short coat is easy to maintain. They are prone to bloat (GDV), a life-threatening condition requiring immediate veterinary attention. Due to their size, they have higher food costs and a shorter lifespan. Regular veterinary checkups are essential.",
    description: "The Great Dane was originally bred in Germany for hunting wild boar and deer. Despite their name, they are not Danish but German. They are among the tallest dog breeds in the world, with some individuals standing over 32 inches at the shoulder.",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&auto=format&fit=crop"
  },
  {
    name: "Saint Bernard",
    categoryIndex: 1,
    originCountry: "Switzerland",
    lifeExpectancy: 9,
    temperament: "Gentle, friendly, patient, calm",
    behavior: "Saint Bernards are gentle giants with a calm and patient nature. They are famously friendly and good with children. They have a massive, powerful build and a distinctive expression. They are not overly active but need regular exercise to maintain health.",
    careRequirements: "Moderate daily exercise. Their thick coat needs regular brushing, especially during shedding season. They drool significantly. They are prone to hip dysplasia and bloat. They prefer cooler climates and can overheat easily. Regular veterinary care is essential.",
    description: "The Saint Bernard was developed by monks at the Saint Bernard Hospice in the Swiss Alps for rescue work. They were famous for finding and rescuing lost travelers in deep snow. Their most famous rescue dog, Barry, saved over 40 lives in the early 1800s.",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&auto=format&fit=crop"
  },
  {
    name: "Bernese Mountain Dog",
    categoryIndex: 1,
    originCountry: "Switzerland",
    lifeExpectancy: 8,
    temperament: "Gentle, affectionate, loyal, calm",
    behavior: "Bernese Mountain Dogs are gentle giants with a calm and easygoing nature. They are particularly good with children and make excellent family pets. They have a strong work ethic and enjoy pulling carts. They are loyal and devoted to their families.",
    careRequirements: "Their long, thick coat needs regular brushing. They are sensitive to heat and prefer cooler climates. Regular exercise is important but not excessive. They have a relatively short lifespan compared to other breeds. Regular health monitoring is important.",
    description: "The Bernese Mountain Dog originated as a farm dog in the Swiss Alps. They were used for pulling carts, driving cattle, and guarding property. Their beautiful tri-color coat of black, white, and rust makes them one of the most striking working breeds.",
    image: "https://images.unsplash.com/photo-1600878459640-6e2e5cdbe635?w=600&auto=format&fit=crop"
  },
  {
    name: "Bullmastiff",
    categoryIndex: 1,
    originCountry: "England",
    lifeExpectancy: 9,
    temperament: "Loyal, affectionate, protective, calm",
    behavior: "Bullmastiffs are powerful, loyal dogs with a calm and protective nature. They were bred to guard estates and are naturally protective of their families. They are affectionate with their owners and good with children. They have a strong, muscular build and a dignified demeanor.",
    careRequirements: "Moderate daily exercise. Their short coat needs minimal grooming. Early socialization and training are essential due to their size and strength. They are prone to bloat and hip dysplasia. They need a comfortable place to rest due to their large size.",
    description: "The Bullmastiff was developed in England in the 19th century by gamekeepers to protect estates from poachers. They were bred from the English Mastiff and the Bulldog, combining the Mastiff's size with the Bulldog's courage and tenacity.",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&auto=format&fit=crop"
  },
  {
    name: "Cane Corso",
    categoryIndex: 1,
    originCountry: "Italy",
    lifeExpectancy: 10,
    temperament: "Loyal, intelligent, alert, protective",
    behavior: "Cane Corsos are powerful and intelligent Italian mastiffs. They are loyal and protective of their families and property. They are alert and make excellent guard dogs. They are confident and need an experienced owner who can provide firm, consistent leadership.",
    careRequirements: "Regular daily exercise. Their short coat needs minimal grooming. Early socialization and extensive training are essential. They need a securely fenced yard. They are not recommended for first-time dog owners. Regular veterinary checkups are important.",
    description: "The Cane Corso is an ancient Italian breed descended from Roman war dogs. Their name means 'bodyguard dog' in Latin. They were used for guarding property, hunting large game, and as military dogs. They are known for their impressive size and protective instincts.",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&auto=format&fit=crop"
  },
  {
    name: "Akita",
    categoryIndex: 1,
    originCountry: "Japan",
    lifeExpectancy: 11,
    temperament: "Loyal, dignified, courageous, independent",
    behavior: "Akitas are dignified and courageous dogs with a strong independent streak. They are fiercely loyal to their families and can be reserved with strangers. They have a powerful, imposing build and a curled tail. They are known for their cat-like cleanliness and quiet demeanor.",
    careRequirements: "Moderate daily exercise. Their thick double coat needs regular brushing, especially during shedding season. Early socialization is essential as they can be dog-aggressive. They need firm, consistent training. They are not recommended for inexperienced owners.",
    description: "The Akita is a ancient Japanese breed named after the Akita prefecture in northern Japan. They were originally used for hunting bear and wild boar. The most famous Akita, Hachiko, is celebrated for his unwavering loyalty to his owner, waiting at a train station daily for nearly 10 years after his owner's death.",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&auto=format&fit=crop"
  },
  {
    name: "Samoyed",
    categoryIndex: 1,
    originCountry: "Russia (Siberia)",
    lifeExpectancy: 13,
    temperament: "Friendly, gentle, playful, adaptable",
    behavior: "Samoyeds are friendly and gentle dogs known for their perpetual 'Sammy smile'. They have a beautiful white, fluffy coat and a happy, playful disposition. They are good with children and other dogs. They are social dogs who thrive on human companionship and can be vocal.",
    careRequirements: "Regular daily exercise. Their thick white coat needs frequent brushing to prevent mats. They shed heavily. They are social and should not be left alone for long periods. They prefer cooler climates. Regular grooming appointments are recommended.",
    description: "The Samoyed was developed by the Samoyede people of Siberia for herding reindeer, pulling sleds, and keeping their owners warm at night. They are one of the oldest dog breeds and are known for their gentle nature and characteristic smiling expression.",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&auto=format&fit=crop"
  },

  // ==========================================
  // HERDING DOGS (categoryIndex: 2)
  // ==========================================
  {
    name: "Border Collie",
    categoryIndex: 2,
    originCountry: "Scotland/England",
    lifeExpectancy: 14,
    temperament: "Intelligent, energetic, responsive, hardworking",
    behavior: "Border Collies are widely considered the most intelligent dog breed. They have an intense work drive and need constant mental and physical stimulation. They excel at dog sports and herding trials. They can be reserved with strangers but are devoted to their families.",
    careRequirements: "Extensive daily exercise and mental challenges. Without appropriate outlets, they can develop destructive behaviors. Their coat needs regular brushing. They thrive in active homes with jobs to do. They excel in agility, obedience, and herding competitions.",
    description: "The Border Collie was developed along the border of Scotland and England for herding sheep. They are renowned for their intelligence, agility, and 'eye' - the intense stare they use to control livestock. They are considered the most intelligent of all dog breeds.",
    image: "https://images.unsplash.com/photo-1536081047027-7d2acb0a24c5?w=600&auto=format&fit=crop"
  },
  {
    name: "Australian Shepherd",
    categoryIndex: 2,
    originCountry: "United States",
    lifeExpectancy: 13,
    temperament: "Smart, energetic, loyal, hardworking",
    behavior: "Australian Shepherds are highly intelligent and energetic working dogs. They form strong bonds with their families and are protective of their home. They have strong herding instincts and may try to herd children. They are versatile and excel in various dog sports.",
    careRequirements: "Substantial daily exercise and mental stimulation. Their medium-length coat requires weekly brushing. They excel in agility and obedience training. Early socialization is important. They need a job to do and thrive in active, engaged homes.",
    description: "Despite their name, Australian Shepherds were actually developed in the United States as ranch dogs. They are known for their striking merle coat patterns, often with blue or heterochromatic eyes. They are among the most popular herding breeds in America.",
    image: "https://images.unsplash.com/photo-1617898065156-963a1e4c7d62?w=600&auto=format&fit=crop"
  },
  {
    name: "German Shepherd",
    categoryIndex: 2,
    originCountry: "Germany",
    lifeExpectancy: 12,
    temperament: "Loyal, confident, courageous, intelligent",
    behavior: "German Shepherds are highly intelligent and versatile working dogs. They are loyal to their families and protective of their territory. They excel in police, military, and service roles. They are confident and courageous, making them excellent guard and protection dogs.",
    careRequirements: "Plenty of physical exercise and mental stimulation. Their double coat sheds year-round. Early training and socialization are essential. They thrive when given a job to do. They need strong leadership and consistent training methods.",
    description: "The German Shepherd was developed in the late 19th century by Max von Stephanitz. They are one of the most popular breeds worldwide, valued for their intelligence, strength, and versatility as working dogs. They are the second most registered breed by the AKC.",
    image: "https://images.unsplash.com/photo-1553882809-a4f57e595701?w=600&auto=format&fit=crop"
  },
  {
    name: "Belgian Malinois",
    categoryIndex: 2,
    originCountry: "Belgium",
    lifeExpectancy: 13,
    temperament: "Intelligent, energetic, loyal, protective",
    behavior: "Belgian Malinois are highly intelligent and energetic working dogs. They are intensely loyal and protective of their families. They are known for their exceptional work ethic and are used extensively in police and military roles. They are alert and always ready for action.",
    careRequirements: "Extensive daily exercise and mental challenges. Their short coat needs minimal grooming. They need early socialization and advanced training. They are not suitable for sedentary homes. They thrive with experienced handlers who can provide structure and purpose.",
    description: "The Belgian Malinois is one of four Belgian shepherd breeds, named after the city of Malines. They have become the preferred breed for military and police work worldwide, including Navy SEALs. They are known for their incredible drive, intelligence, and athleticism.",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&auto=format&fit=crop"
  },
  {
    name: "Old English Sheepdog",
    categoryIndex: 2,
    originCountry: "England",
    lifeExpectancy: 12,
    temperament: "Gentle, intelligent, sociable, playful",
    behavior: "Old English Sheepdogs are gentle and sociable dogs with a playful nature. They are known for their distinctive shaggy gray and white coat and their characteristic 'bear-like' waddle. They are excellent with children and get along well with other dogs. They have a charming, clownish personality.",
    careRequirements: "Their profuse coat needs extensive brushing several times per week. Professional grooming every 6-8 weeks. Moderate daily exercise. They need regular ear cleaning and nail trimming. They thrive on human companionship and should not be left alone for long periods.",
    description: "The Old English Sheepdog was developed in England as a drover's dog for driving cattle and sheep to market. They are known affectionately as the 'Bobtail' because their tails were traditionally docked. They became popular family dogs and were featured in Disney's 'The Shaggy Dog'.",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&auto=format&fit=crop"
  },
  {
    name: "Bearded Collie",
    categoryIndex: 2,
    originCountry: "Scotland",
    lifeExpectancy: 13,
    temperament: "Lively, intelligent, affectionate, bouncy",
    behavior: "Bearded Collies are lively and bouncy dogs with a joyful personality. They have a distinctive shaggy coat that covers their face like a beard. They are affectionate with their families and good with children. They are intelligent and respond well to training. They have a playful, puppy-like energy that lasts for years.",
    careRequirements: "Substantial daily exercise including walks and play sessions. Their long, shaggy coat needs regular brushing to prevent mats. Professional grooming every 6-8 weeks. They need mental stimulation. They thrive in active homes with space to run.",
    description: "The Bearded Collie, or 'Beardie', is an ancient Scottish breed used for herding sheep and cattle in the Highlands. They are one of the oldest British breeds. Their name comes from the long hair on their chin that forms a beard. They are known for their enthusiastic, bouncy personality.",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&auto=format&fit=crop"
  },
  {
    name: "Collie (Rough)",
    categoryIndex: 2,
    originCountry: "Scotland",
    lifeExpectancy: 13,
    temperament: "Gentle, loyal, intelligent, proud",
    behavior: "Rough Collies are gentle and loyal dogs with a dignified demeanor. They are known for their beautiful, abundant coat and elegant head shape. They are excellent with children and make wonderful family dogs. They are intelligent and eager to please. They are sensitive and respond best to gentle training.",
    careRequirements: "Their abundant coat needs regular brushing several times per week. Moderate daily exercise. They are sensitive dogs who need positive reinforcement training. Regular veterinary checkups. They thrive on family companionship and should not be left alone for long periods.",
    description: "The Rough Collie was developed in Scotland as a herding dog. They were popularized worldwide by the fictional dog Lassie, who starred in books, films, and television. They are known for their beauty, intelligence, and unwavering loyalty to their families.",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&auto=format&fit=crop"
  },
  {
    name: "Shetland Sheepdog",
    categoryIndex: 2,
    originCountry: "Scotland (Shetland Islands)",
    lifeExpectancy: 13,
    temperament: "Intelligent, loyal, gentle, responsive",
    behavior: "Shelties are miniature collies in appearance and personality. They are highly intelligent and excel in obedience. They are loyal to their families and can be reserved with strangers. They have a tendency to bark and make excellent watchdogs. They are sensitive and responsive to their owners.",
    careRequirements: "Their beautiful long coat needs regular brushing. Daily exercise and mental stimulation. They are sensitive and respond best to positive training methods. They make excellent watchdogs. Early socialization helps manage their reserve with strangers.",
    description: "The Shetland Sheepdog originated in the Shetland Islands of Scotland, where they were used for herding sheep and ponies. They closely resemble a smaller version of the Rough Collie and are known for their beauty, intelligence, and devoted nature.",
    image: "https://images.unsplash.com/photo-1590543599877-73548fde2a5d?w=600&auto=format&fit=crop"
  },
  {
    name: "Pembroke Welsh Corgi",
    categoryIndex: 2,
    originCountry: "Wales",
    lifeExpectancy: 13,
    temperament: "Smart, affectionate, bold, friendly",
    behavior: "Pembroke Welsh Corgis are intelligent, active, and affectionate. They are known for their short legs, long body, and lack of a tail. They are friendly with everyone but can be protective of their families. They have strong herding instincts and may try to herd children or other pets.",
    careRequirements: "Regular exercise despite their short legs. Their double coat sheds heavily and needs regular brushing. They are prone to weight gain and need portion control. Early training helps manage their herding instincts. Regular veterinary checkups for back health.",
    description: "The Pembroke Welsh Corgi is a small herding dog from Wales. According to legend, they were used by fairies to pull carriages. They are famously associated with Queen Elizabeth II, who owned over 30 Corgis during her reign. They are known for their fox-like appearance and big personality.",
    image: "https://images.unsplash.com/photo-1541096881562-c7dd6c0f4a53?w=600&auto=format&fit=crop"
  },
  {
    name: "Cardigan Welsh Corgi",
    categoryIndex: 2,
    originCountry: "Wales",
    lifeExpectancy: 13,
    temperament: "Intelligent, loyal, even-tempered, affectionate",
    behavior: "Cardigan Welsh Corgis are the older of the two Corgi breeds. They have a long tail and rounded ears, distinguishing them from Pembrokes. They are intelligent and even-tempered. They are loyal to their families and can be reserved with strangers. They are good with children and other pets.",
    careRequirements: "Regular daily exercise. Their double coat needs regular brushing, especially during shedding season. They are prone to weight gain. Early socialization is important. They are generally healthier than Pembrokes with fewer genetic health issues.",
    description: "The Cardigan Welsh Corgi is one of the oldest dog breeds in the British Isles, brought to Wales by the Celts around 1200 BC. They are named after Cardiganshire in Wales. Unlike the Pembroke, they have a full tail and are slightly larger with rounded ears.",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&auto=format&fit=crop"
  },

  // ==========================================
  // HOUND DOGS (categoryIndex: 3)
  // ==========================================
  {
    name: "Beagle",
    categoryIndex: 3,
    originCountry: "England",
    lifeExpectancy: 13,
    temperament: "Friendly, curious, merry, energetic",
    behavior: "Beagles are happy, friendly dogs with an ever-wagging tail. They are scent hounds driven by their nose, which can make them stubborn. They are excellent with children and get along well with other dogs. They have a distinctive baying bark when following a scent.",
    careRequirements: "Regular exercise and enjoy following their nose on walks. A secure, fenced yard is essential as they will follow a scent. Their short coat is easy to maintain. They can be vocal and howl. They need early training as they can be stubborn.",
    description: "The Beagle was developed in England as a scent hound for hare hunting. They have an exceptional sense of smell, second only to the Bloodhound. Their friendly and curious nature makes them one of the most popular family dogs. They are known for their tri-color coat and soulful eyes.",
    image: "https://images.unsplash.com/photo-1606598963395-555146d2f7e0?w=600&auto=format&fit=crop"
  },
  {
    name: "Bloodhound",
    categoryIndex: 3,
    originCountry: "Belgium",
    lifeExpectancy: 11,
    temperament: "Gentle, determined, affectionate, stubborn",
    behavior: "Bloodhounds are gentle giants with an incredible sense of smell. They are determined trackers who follow their nose with single-minded focus. Despite their serious working ability, they are affectionate and good with children. They have a distinctive deep, melodious bay.",
    careRequirements: "Regular exercise but not excessive. Their short coat requires minimal grooming. Their long ears need regular cleaning to prevent infections. They drool significantly and need their facial wrinkles cleaned. A secure yard is essential. They need early socialization.",
    description: "The Bloodhound is one of the oldest dog breeds, with ancestors dating back to ancient Greece. They have the most acute sense of smell of any dog breed and their tracking evidence is admissible in court. They are famously gentle, dignified, and determined.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop"
  },
  {
    name: "Basset Hound",
    categoryIndex: 3,
    originCountry: "France",
    lifeExpectancy: 12,
    temperament: "Gentle, patient, affectionate, stubborn",
    behavior: "Basset Hounds are gentle and patient dogs with a charmingly sad expression. They are scent hounds with an exceptional sense of smell, second only to the Bloodhound. They are good with children and other dogs. They have a deep, melodious bark and can be quite vocal.",
    careRequirements: "Moderate exercise but should not be over-exercised due to their short legs. Their short coat needs regular brushing. Their long ears need regular cleaning. They are prone to obesity and need portion control. They can be stubborn during training.",
    description: "The Basset Hound was developed in France and Belgium for hunting small game by scent. Their name comes from the French word 'bas' meaning low. They have the second best sense of smell of any dog breed. Their short legs and long body were bred for following scent trails close to the ground.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop"
  },
  {
    name: "Greyhound",
    categoryIndex: 3,
    originCountry: "Egypt/England",
    lifeExpectancy: 13,
    temperament: "Gentle, affectionate, calm, independent",
    behavior: "Greyhounds are surprisingly calm and gentle despite their racing reputation. They are affectionate with their families and often described as '45 mph couch potatoes'. They are good with children and other dogs. They have a strong prey drive for small animals.",
    careRequirements: "A daily walk but are not high-energy indoors. Their thin coat provides little protection from cold and they need a coat in winter. A secure yard is essential as they can run extremely fast. They need a soft bed due to their thin skin and bony bodies.",
    description: "The Greyhound is one of the oldest dog breeds, with depictions dating back 4,000 years to ancient Egypt. They were bred for coursing game and later for racing. They are the fastest dog breed, reaching speeds up to 45 mph. They are known for their gentle, quiet nature.",
    image: "https://images.unsplash.com/photo-1590604407871-1f0d5a50f270?w=600&auto=format&fit=crop"
  },
  {
    name: "Whippet",
    categoryIndex: 3,
    originCountry: "England",
    lifeExpectancy: 13,
    temperament: "Gentle, affectionate, calm, playful",
    behavior: "Whippets are gentle and affectionate dogs with a calm indoor demeanor. They are known for their speed and love of running. They are good with children and other dogs. They have a sweet, sensitive nature. They are clean dogs with minimal doggy odor.",
    careRequirements: "Daily opportunity to run in a secure area. Their short coat needs minimal grooming. They are sensitive to cold and need a coat in winter. They need a soft bed. They are generally healthy but prone to certain genetic conditions. They thrive on human companionship.",
    description: "The Whippet was developed in England in the 19th century by coal miners for racing and ratting. They are essentially smaller versions of Greyhounds and are known as the 'poor man's racehorse'. They are the fastest dog of their size, reaching speeds up to 35 mph.",
    image: "https://images.unsplash.com/photo-1590604407871-1f0d5a50f270?w=600&auto=format&fit=crop"
  },
  {
    name: "Afghan Hound",
    categoryIndex: 3,
    originCountry: "Afghanistan",
    lifeExpectancy: 12,
    temperament: "Dignified, independent, aloof, elegant",
    behavior: "Afghan Hounds are dignified and elegant dogs with an independent nature. They are known for their beautiful, silky coat and aloof demeanor. They can be reserved with strangers but are loyal to their families. They have a strong prey drive and love to run.",
    careRequirements: "Their luxurious coat needs extensive grooming including daily brushing and regular baths. They need regular exercise in a secure area. They are independent and can be challenging to train. They need early socialization. They are sensitive and respond best to gentle training.",
    description: "The Afghan Hound is an ancient breed from Afghanistan, where they were used for hunting large game in the mountains. They are one of the oldest dog breeds, with a history dating back thousands of years. They are known for their regal appearance and independent, cat-like personality.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop"
  },
  {
    name: "Dachshund",
    categoryIndex: 3,
    originCountry: "Germany",
    lifeExpectancy: 14,
    temperament: "Clever, stubborn, brave, lively",
    behavior: "Dachshunds are clever and courageous little dogs. They were bred to hunt badgers, and their bold personality reflects this heritage. They are loyal to their families but can be wary of strangers. They have a distinctive deep bark for their size. They are known for their determination.",
    careRequirements: "Moderate exercise but should avoid jumping due to their long spines. Their coat varies (smooth, long, or wire-haired) with different grooming needs. They can be prone to back problems and weight gain. Regular veterinary checkups for spinal health are essential.",
    description: "The Dachshund, meaning 'badger dog' in German, was developed in Germany for hunting badgers and other burrowing animals. Their distinctive long body and short legs were designed for entering tunnels. They come in three coat varieties and two sizes: standard and miniature.",
    image: "https://images.unsplash.com/photo-1615737036244-62cc386b1064?w=600&auto=format&fit=crop"
  },
  {
    name: "Rhodesian Ridgeback",
    categoryIndex: 3,
    originCountry: "South Africa",
    lifeExpectancy: 11,
    temperament: "Courageous, loyal, independent, dignified",
    behavior: "Rhodesian Ridgebacks are courageous and loyal dogs with a dignified demeanor. They are known for the distinctive ridge of hair running along their back in the opposite direction. They were bred to hunt lions and have a strong prey drive. They are protective of their families.",
    careRequirements: "Substantial daily exercise including long walks or runs. Their short coat needs minimal grooming. Early socialization and firm, consistent training are essential. They can be stubborn and independent. They need a securely fenced yard. They thrive with experienced owners.",
    description: "The Rhodesian Ridgeback was developed in South Africa by European settlers who crossed native ridged dogs with European breeds. They were used for hunting lions, earning them the name 'African Lion Hound'. They are known for their courage, loyalty, and distinctive back ridge.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop"
  },
  {
    name: "Saluki",
    categoryIndex: 3,
    originCountry: "Persia (Iran)",
    lifeExpectancy: 13,
    temperament: "Gentle, dignified, independent, reserved",
    behavior: "Salukis are gentle and dignified sighthounds with an independent nature. They are known for their elegant, slender build and silky coat. They are reserved with strangers but loyal to their families. They have a strong prey drive and love to run. They are clean and quiet dogs.",
    careRequirements: "Daily opportunity to run in a secure area. Their silky coat needs minimal grooming. They are sensitive to cold. They are independent and can be challenging to train. They need early socialization. They thrive with gentle, positive reinforcement training.",
    description: "The Saluki is one of the oldest known dog breeds, with depictions dating back to ancient Egypt around 2100 BC. They were bred by nomadic tribes in the Middle East for hunting gazelle. They are known for their grace, speed, and dignified, aloof personality.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop"
  },
  {
    name: "Basenji",
    categoryIndex: 3,
    originCountry: "Central Africa (Congo)",
    lifeExpectancy: 13,
    temperament: "Intelligent, independent, alert, curious",
    behavior: "Basenjis are intelligent and independent dogs known as the 'barkless dog' because they produce a unique yodel-like sound instead of barking. They are alert and curious with a cat-like personality. They are clean and groom themselves like cats. They are good with children but can be reserved with strangers.",
    careRequirements: "Regular daily exercise. Their short coat needs minimal grooming. They are escape artists and need secure fencing. They are intelligent and need mental stimulation. Early socialization is important. They can be challenging to train due to their independent nature.",
    description: "The Basenji is an ancient breed from Central Africa, where they were used for hunting and as companions. They are one of the oldest dog breeds, with a history similar to the Saluki. They are known for their unique yodel, cat-like grooming habits, and intelligent, curious nature.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop"
  },

  // ==========================================
  // TERRIER DOGS (categoryIndex: 4)
  // ==========================================
  {
    name: "Jack Russell Terrier",
    categoryIndex: 4,
    originCountry: "England",
    lifeExpectancy: 14,
    temperament: "Energetic, intelligent, fearless, independent",
    behavior: "Jack Russells are high-energy dogs with a fearless and determined personality. They are intelligent but can be stubborn. They have strong hunting instincts and love to dig. They need an active owner who can keep up with them. They are good with children but may not tolerate rough handling.",
    careRequirements: "Substantial daily exercise and mental stimulation. Their rough or smooth coat needs minimal grooming. They are escape artists and need secure fencing. They excel at dog sports like agility and earthdog trials. Early training and socialization are essential.",
    description: "The Jack Russell Terrier was developed in England by Reverend John Russell for fox hunting. They were bred to go to ground after foxes and have the courage and determination of much larger dogs. They are compact but powerful, with a boundless energy that requires an active lifestyle.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop"
  },
  {
    name: "Bull Terrier",
    categoryIndex: 4,
    originCountry: "England",
    lifeExpectancy: 13,
    temperament: "Playful, stubborn, affectionate, energetic",
    behavior: "Bull Terriers are known for their unique egg-shaped head and playful personality. They are affectionate with their families and have a strong sense of humor. They can be stubborn and need consistent training. They are good with children but may not get along with other dogs.",
    careRequirements: "Regular exercise but are not excessively energetic. Their short coat is easy to maintain. Early socialization is crucial as they can be dog-aggressive. They thrive with positive reinforcement training. They need strong leadership and consistent boundaries.",
    description: "The Bull Terrier was developed in England in the 19th century from bulldogs and terriers. Originally bred for dog fighting, they were later refined into the friendly and entertaining companion we know today. They are known as 'the clown in the dog suit' for their playful, comical personality.",
    image: "https://images.unsplash.com/photo-1590692899981-c9403e8bedc7?w=600&auto=format&fit=crop"
  },
  {
    name: "Scottish Terrier",
    categoryIndex: 4,
    originCountry: "Scotland",
    lifeExpectancy: 12,
    temperament: "Independent, confident, dignified, loyal",
    behavior: "Scottish Terriers are dignified and independent dogs with a bold personality. They are loyal to their families but can be aloof with strangers. They have a strong prey drive and love to dig. They are known for their distinctive beard and eyebrows. They have a confident, self-assured demeanor.",
    careRequirements: "Their wiry coat needs regular brushing and professional grooming every 6-8 weeks. Moderate exercise. They can be stubborn during training. They are known for their 'Scottish terrier stubbornness' and need patient handling. Early socialization is important.",
    description: "The Scottish Terrier, one of Scotland's oldest breeds, was developed to hunt badgers and foxes in the Highlands. They are known for their distinctive silhouette: short legs, a long head, and a wiry beard. Famous owners include Franklin D. Roosevelt and Eva Braun.",
    image: "https://images.unsplash.com/photo-1619806184388-f182b713ce0a?w=600&auto=format&fit=crop"
  },
  {
    name: "Airedale Terrier",
    categoryIndex: 4,
    originCountry: "England (Yorkshire)",
    lifeExpectancy: 12,
    temperament: "Intelligent, confident, friendly, courageous",
    behavior: "Airedale Terriers are the largest of the terrier breeds, known as the 'King of Terriers'. They are intelligent and confident with a friendly disposition. They are courageous and were used as war dogs and police dogs. They are good with children and make excellent family dogs.",
    careRequirements: "Substantial daily exercise including walks and play sessions. Their wiry coat needs regular brushing and professional grooming every 6-8 weeks. They need mental stimulation. Early training and socialization are important. They thrive with an active family.",
    description: "The Airedale Terrier was developed in the Aire Valley of Yorkshire, England, for hunting otters and rats. They are the largest of the terrier breeds. During World War I, they served as messenger and ambulance dogs on the battlefield. They are known for their versatility and courage.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop"
  },
  {
    name: "Yorkshire Terrier",
    categoryIndex: 4,
    originCountry: "England",
    lifeExpectancy: 14,
    temperament: "Confident, courageous, intelligent, independent",
    behavior: "Yorkies are big dogs in tiny bodies. They are brave, clever, and often unaware of their small size. They love attention and form strong attachments to their families. They are good with older children but may not tolerate rough handling. They make excellent watchdogs.",
    careRequirements: "Their long, silky coat requires daily brushing. They have high energy for their size and enjoy play sessions. Regular grooming appointments are recommended every 4-6 weeks. They need early socialization to prevent small dog syndrome. They are sensitive to cold weather.",
    description: "The Yorkshire Terrier was bred in 19th-century England to catch rats in clothing mills. Today they are one of the most popular toy breeds, known for their glamorous coat and confident attitude. Despite their small size, they retain the courageous spirit of their terrier ancestors.",
    image: "https://images.unsplash.com/photo-1579562243430-4732bbd09d91?w=600&auto=format&fit=crop"
  },
  {
    name: "West Highland White Terrier",
    categoryIndex: 4,
    originCountry: "Scotland",
    lifeExpectancy: 14,
    temperament: "Friendly, confident, playful, independent",
    behavior: "West Highland White Terriers, or Westies, are friendly and confident little dogs with a playful nature. They have a distinctive white coat and a cheerful expression. They are good with children and make excellent family pets. They are intelligent but can be stubborn.",
    careRequirements: "Their white, wiry coat needs regular brushing and professional grooming every 6-8 weeks. Moderate daily exercise. They need early training and socialization. They have a strong prey drive and love to dig. They are generally healthy but prone to skin allergies.",
    description: "The West Highland White Terrier was developed in Scotland for hunting vermin. They were originally bred by the Malcolm family of Poltalloch, who needed a white dog that could be easily distinguished from foxes during hunts. They are known for their bright white coat and cheerful, friendly personality.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop"
  },
  {
    name: "Fox Terrier (Wire)",
    categoryIndex: 4,
    originCountry: "England",
    lifeExpectancy: 13,
    temperament: "Friendly, energetic, alert, playful",
    behavior: "Wire Fox Terriers are friendly and energetic dogs with a playful, mischievous nature. They are alert and make excellent watchdogs. They are intelligent and respond well to training. They have a strong prey drive and love to chase. They are good with children but may not tolerate other small pets.",
    careRequirements: "Substantial daily exercise and play sessions. Their wiry coat needs regular brushing and professional grooming every 6-8 weeks. They need mental stimulation. Early training and socialization are important. They need a securely fenced yard as they are escape artists.",
    description: "The Wire Fox Terrier was developed in England for fox hunting. They were bred to go to ground after foxes and flush them out. They are known for their distinctive wiry coat and alert, intelligent expression. They have been popular show dogs and family companions for over a century.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop"
  },
  {
    name: "Staffordshire Bull Terrier",
    categoryIndex: 4,
    originCountry: "England",
    lifeExpectancy: 13,
    temperament: "Courageous, affectionate, loyal, playful",
    behavior: "Staffordshire Bull Terriers are courageous and affectionate dogs with a playful nature. They are known for their muscular build and broad smile. They are excellent with children and are known as 'nanny dogs'. They are loyal to their families and can be protective.",
    careRequirements: "Regular daily exercise including walks and play sessions. Their short coat needs minimal grooming. Early socialization and consistent training are essential. They thrive on human companionship. They need strong leadership and positive reinforcement training.",
    description: "The Staffordshire Bull Terrier was developed in England in the 19th century for dog fighting. After blood sports were banned, they were bred into the loving family companions they are today. They are known for their courage, loyalty, and exceptional love for children.",
    image: "https://images.unsplash.com/photo-1590692899981-c9403e8bedc7?w=600&auto=format&fit=crop"
  },
  {
    name: "Norfolk Terrier",
    categoryIndex: 4,
    originCountry: "England",
    lifeExpectancy: 14,
    temperament: "Friendly, alert, courageous, affectionate",
    behavior: "Norfolk Terriers are friendly and courageous little dogs with a big personality. They are the smallest of the working terriers. They are alert and make excellent watchdogs. They are good with children and other dogs. They are affectionate with their families and have a happy, playful nature.",
    careRequirements: "Regular daily exercise. Their wiry coat needs regular brushing and occasional professional grooming. They need early training and socialization. They have a strong prey drive. They are adaptable and do well in various living situations. They thrive on human companionship.",
    description: "The Norfolk Terrier was developed in England for hunting rats and foxes. They are closely related to the Norwich Terrier, the main difference being that Norfolks have dropped ears while Norwich have erect ears. They are known for their friendly, fearless, and affectionate nature.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop"
  },
  {
    name: "Cairn Terrier",
    categoryIndex: 4,
    originCountry: "Scotland",
    lifeExpectancy: 14,
    temperament: "Independent, spirited, friendly, alert",
    behavior: "Cairn Terriers are independent and spirited little dogs with a friendly nature. They are alert and make excellent watchdogs. They are good with children and other dogs. They have a strong prey drive and love to dig. They are intelligent but can be stubborn.",
    careRequirements: "Regular daily exercise. Their wiry coat needs regular brushing and occasional professional grooming. They need early training and socialization. They have a strong prey drive. They are adaptable and do well in various living situations. They need mental stimulation.",
    description: "The Cairn Terrier is one of the oldest terrier breeds, originating in the Scottish Highlands. They were named for their ability to go to ground after foxes and badgers among cairns (piles of stones). They are best known as Toto from 'The Wizard of Oz'.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop"
  },

  // ==========================================
  // TOY DOGS (categoryIndex: 5)
  // ==========================================
  {
    name: "Chihuahua",
    categoryIndex: 5,
    originCountry: "Mexico",
    lifeExpectancy: 14,
    temperament: "Loyal, lively, confident, alert",
    behavior: "Chihuahuas are tiny dogs with big personalities. They form strong bonds with their owners and can be wary of strangers. They enjoy being carried around and make excellent lap dogs. They are alert and make excellent watchdogs. They are good with older children but may not tolerate rough handling.",
    careRequirements: "Minimal exercise needs. Short walks and indoor play suffice. They are sensitive to cold weather and may need a sweater in winter. Regular dental care is essential due to their small mouths. Early socialization helps prevent small dog syndrome.",
    description: "The Chihuahua is the world's smallest dog breed, named after the Mexican state of Chihuahua. Despite their tiny size, they have a fearless and confident demeanor. They come in two coat varieties: smooth and long-haired. They are one of the oldest breeds in the Americas.",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&auto=format&fit=crop"
  },
  {
    name: "Pomeranian",
    categoryIndex: 5,
    originCountry: "Germany/Poland",
    lifeExpectancy: 13,
    temperament: "Intelligent, lively, bold, curious",
    behavior: "Pomeranians are energetic and intelligent little dogs. They are highly inquisitive and love being the center of attention. They can be quite vocal and make excellent watchdogs. They are good with older children. They have a bold, confident personality that belies their small size.",
    careRequirements: "Regular brushing needed for their thick double coat. They are active indoors but also enjoy short walks. Early socialization helps manage their tendency to bark at strangers. They are prone to dental issues and need regular dental care. They are sensitive to heat.",
    description: "The Pomeranian is a compact, fox-faced toy dog named after the Pomerania region. Despite their small stature, they possess a spirited and extroverted personality. They were favorites of royalty including Queen Victoria, who owned a particularly small Pomeranian named Marco.",
    image: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=600&auto=format&fit=crop"
  },
  {
    name: "Maltese",
    categoryIndex: 5,
    originCountry: "Malta",
    lifeExpectancy: 14,
    temperament: "Gentle, playful, affectionate, lively",
    behavior: "Maltese dogs are gentle and responsive companions. They thrive on human companionship and are happiest when with their family. They have a playful nature that lasts well into old age. They are good with children and other pets. They are intelligent and respond well to training.",
    careRequirements: "Their white, silky coat needs daily grooming to prevent mats. They are active indoors and need only moderate outdoor exercise. Tear staining around the eyes requires regular cleaning. They need regular dental care. They are sensitive to cold and heat.",
    description: "The Maltese is one of the oldest dog breeds, with a history spanning over 2,000 years. They were cherished by ancient Greek and Roman nobility. Their pure white coat and dark eyes give them an elegant appearance. They are known for their gentle, playful, and affectionate nature.",
    image: "https://images.unsplash.com/photo-1530047139084-de4a1c9ae98d?w=600&auto=format&fit=crop"
  },
  {
    name: "Papillon",
    categoryIndex: 5,
    originCountry: "France/Belgium",
    lifeExpectancy: 14,
    temperament: "Intelligent, friendly, alert, energetic",
    behavior: "Papillons are intelligent and friendly little dogs with distinctive butterfly-like ears. They are highly trainable and excel in obedience and agility. They are alert and make excellent watchdogs. They are good with children and other pets. They have a lively, energetic personality.",
    careRequirements: "Regular daily exercise including walks and play sessions. Their long, silky coat needs regular brushing. They are intelligent and need mental stimulation. They excel in dog sports. They are generally healthy but prone to dental issues. They thrive on human companionship.",
    description: "The Papillon, meaning 'butterfly' in French, is named for their large, fringed ears that resemble butterfly wings. They were popular with European royalty, including Marie Antoinette. They are one of the most intelligent toy breeds and excel in obedience competitions.",
    image: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=600&auto=format&fit=crop"
  },
  {
    name: "Pekingese",
    categoryIndex: 5,
    originCountry: "China",
    lifeExpectancy: 13,
    temperament: "Dignified, independent, loyal, affectionate",
    behavior: "Pekingese are dignified and independent little dogs with a regal bearing. They were bred as companions for Chinese royalty and have a self-important attitude. They are loyal to their families but can be aloof with strangers. They have a distinctive rolling gait and a lion-like mane.",
    careRequirements: "Moderate exercise but should avoid overexertion due to their flat face. Their long, thick coat needs daily brushing. Their facial wrinkles need regular cleaning. They are prone to breathing issues and overheating. They need early socialization to prevent small dog syndrome.",
    description: "The Pekingese is an ancient breed from China, named after the city of Peking (now Beijing). They were sacred dogs in Chinese imperial courts and were owned exclusively by royalty. According to legend, they were created by the Buddha from a lion. They are known for their regal, independent nature.",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&auto=format&fit=crop"
  },
  {
    name: "Shih Tzu",
    categoryIndex: 5,
    originCountry: "China",
    lifeExpectancy: 13,
    temperament: "Friendly, outgoing, affectionate, lively",
    behavior: "Shih Tzus were bred to be companion dogs and excel at it. They are friendly with everyone, including strangers and other pets. They enjoy lounging but also have playful moments. They are good with children and make excellent family pets. They have a sweet, trusting nature.",
    careRequirements: "Their luxurious double coat needs daily brushing. They have a flat face which can cause breathing issues in hot weather. Regular eye cleaning is needed to prevent irritation. They need moderate exercise. They thrive on human companionship and should not be left alone for long periods.",
    description: "The Shih Tzu, meaning 'Lion Dog' in Chinese, was bred exclusively for Chinese royalty. These regal little dogs were so prized that they were given as gifts to Chinese emperors. They have a sweet, trusting nature and a beautiful, flowing coat that comes in many colors.",
    image: "https://images.unsplash.com/photo-1583336663277-620dc5d72f1d?w=600&auto=format&fit=crop"
  },
  {
    name: "Japanese Chin",
    categoryIndex: 5,
    originCountry: "Japan",
    lifeExpectancy: 13,
    temperament: "Gentle, intelligent, affectionate, cat-like",
    behavior: "Japanese Chins are gentle and intelligent little dogs with a cat-like personality. They are known for their elegant appearance and distinctive 'Chin spin' when excited. They are affectionate with their families but can be reserved with strangers. They are clean and quiet dogs.",
    careRequirements: "Moderate exercise including short walks. Their silky coat needs regular brushing. They are sensitive to heat and cold. They are generally healthy but prone to heart murmurs and respiratory issues. They thrive on human companionship and are sensitive to harsh training methods.",
    description: "The Japanese Chin is an ancient breed from Japan, where they were kept by nobility and royalty. They were considered treasures and were often given as gifts between royalty. They are known for their elegant, cat-like movements and their ability to perch on furniture like cats.",
    image: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=600&auto=format&fit=crop"
  },
  {
    name: "Toy Poodle",
    categoryIndex: 5,
    originCountry: "France/Germany",
    lifeExpectancy: 15,
    temperament: "Intelligent, active, elegant, proud",
    behavior: "Toy Poodles are exceptionally intelligent and elegant little dogs. They are highly trainable and excel in obedience and agility. They have a dignified demeanor but are also playful and affectionate. They are good with children and other pets. They are alert and make excellent watchdogs.",
    careRequirements: "Their curly, non-shedding coat needs regular professional grooming every 4-6 weeks. They need daily exercise and mental stimulation. They thrive on human companionship and can develop separation anxiety. They are generally healthy but prone to dental issues.",
    description: "The Toy Poodle is the smallest variety of the Poodle breed. Despite their elegant appearance, Poodles were originally bred as water retrievers. The Toy variety was developed as a companion dog. They are among the most intelligent dog breeds and excel in various dog sports.",
    image: "https://images.unsplash.com/photo-1577946572660-e364f871c68c?w=600&auto=format&fit=crop"
  },
  {
    name: "Russian Toy",
    categoryIndex: 5,
    originCountry: "Russia",
    lifeExpectancy: 14,
    temperament: "Lively, affectionate, intelligent, alert",
    behavior: "Russian Toys are lively and affectionate little dogs with a big personality. They are intelligent and alert, making excellent watchdogs. They form strong bonds with their owners and thrive on attention. They are good with older children. They have a fine-boned, elegant appearance.",
    careRequirements: "Moderate exercise including short walks and indoor play. Their short or long coat needs minimal to moderate grooming. They are sensitive to cold weather. They need early socialization. They are generally healthy but prone to dental issues. They thrive on human companionship.",
    description: "The Russian Toy is a rare breed from Russia, developed in the 20th century from English Toy Terriers. They were popular among Russian aristocracy and were nearly extinct after the Russian Revolution. They are known for their elegant, fine-boned appearance and lively, affectionate nature.",
    image: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=600&auto=format&fit=crop"
  },
  {
    name: "Brussels Griffon",
    categoryIndex: 5,
    originCountry: "Belgium",
    lifeExpectancy: 13,
    temperament: "Inquisitive, alert, affectionate, spirited",
    behavior: "Brussels Griffons are inquisitive and spirited little dogs with a distinctive monkey-like face. They are alert and make excellent watchdogs. They are affectionate with their families and form strong bonds. They have a big personality in a small body. They are intelligent but can be stubborn.",
    careRequirements: "Moderate daily exercise. Their wiry or smooth coat needs regular grooming. Their prominent eyes need regular cleaning. They are sensitive to extreme temperatures. They need early socialization. They thrive on human companionship and can develop separation anxiety.",
    description: "The Brussels Griffon was developed in Belgium as a ratter in stables. They are named after the city of Brussels. Their distinctive face with a short nose, large eyes, and prominent beard gives them an almost human-like expression. They were popularized in the movie 'As Good as It Gets'.",
    image: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=600&auto=format&fit=crop"
  },

  // ==========================================
  // NON-SPORTING DOGS (categoryIndex: 6)
  // ==========================================
  {
    name: "Dalmatian",
    categoryIndex: 6,
    originCountry: "Croatia (Dalmatia)",
    lifeExpectancy: 12,
    temperament: "Energetic, intelligent, outgoing, dignified",
    behavior: "Dalmatians are energetic and intelligent dogs known for their distinctive spotted coat. They are outgoing and friendly but can be reserved with strangers. They have a strong working heritage and excel in various dog sports. They are good with children and make active family companions.",
    careRequirements: "Substantial daily exercise and mental stimulation. Their short coat sheds heavily and needs regular brushing. They are prone to deafness, which should be tested in puppies. They thrive with an active family. They need early socialization and training.",
    description: "The Dalmatian's origins are traced to the Dalmatia region of Croatia. They were used as carriage dogs, running alongside horse-drawn carriages, and as firehouse mascots. Their unique spotted coat makes them instantly recognizable, and they were popularized by Disney's '101 Dalmatians'.",
    image: "https://images.unsplash.com/photo-1596495578065-0e08c0fc0a0b?w=600&auto=format&fit=crop"
  },
  {
    name: "French Bulldog",
    categoryIndex: 6,
    originCountry: "France/England",
    lifeExpectancy: 11,
    temperament: "Playful, affectionate, sociable, adaptable",
    behavior: "French Bulldogs are playful and affectionate dogs with a charming, comical personality. They have distinctive bat-like ears and a flat face. They are sociable and get along with everyone. They are excellent apartment dogs due to their moderate energy level. They are good with children and other pets.",
    careRequirements: "Minimal exercise needs due to their flat face. Their short coat needs occasional brushing. Their facial wrinkles need regular cleaning. They are prone to breathing issues and overheating. They need regular veterinary checkups. They thrive on human companionship.",
    description: "The French Bulldog was developed in England and later refined in France when lace workers brought them to the continent. They became popular in French society and were beloved by artists and writers. They are known for their bat ears, comical expression, and affectionate, adaptable nature.",
    image: "https://images.unsplash.com/photo-1575660938060-4d62a1e22f8e?w=600&auto=format&fit=crop"
  },
  {
    name: "English Bulldog",
    categoryIndex: 6,
    originCountry: "England",
    lifeExpectancy: 10,
    temperament: "Calm, courageous, friendly, dignified",
    behavior: "Bulldogs are gentle and courageous dogs with a calm demeanor. They are known for their distinctive wrinkled face and pushed-in nose. They are excellent with children and have a comical, dignified personality. They are not very active and prefer lounging. They are loyal and protective of their families.",
    careRequirements: "Minimal exercise due to their low energy levels. Their short coat needs occasional brushing. Their facial wrinkles need regular cleaning to prevent infections. Due to their flat face, they can overheat easily and have breathing difficulties. They need regular veterinary care.",
    description: "The Bulldog was originally bred in England for bull-baiting, a brutal sport banned in 1835. After the ban, they were bred into the gentle, friendly companion we know today. They are a national symbol of England and known for their distinctive, comical appearance and determined nature.",
    image: "https://images.unsplash.com/photo-1575660938060-4d62a1e22f8e?w=600&auto=format&fit=crop"
  },
  {
    name: "Boston Terrier",
    categoryIndex: 6,
    originCountry: "United States",
    lifeExpectancy: 13,
    temperament: "Friendly, intelligent, lively, gentle",
    behavior: "Boston Terriers are friendly and intelligent dogs with a lively, gentle nature. They are known as the 'American Gentleman' due to their tuxedo-like coat pattern. They are good with children and other pets. They are adaptable and do well in apartments. They are eager to please and easy to train.",
    careRequirements: "Moderate daily exercise including walks and play sessions. Their short coat needs minimal grooming. Their prominent eyes need regular cleaning. They are sensitive to extreme temperatures. They need early socialization. They thrive on human companionship.",
    description: "The Boston Terrier was developed in Boston, Massachusetts in the late 19th century from English Bulldogs and White English Terriers. They are one of the few breeds developed in the United States. Their distinctive black and white tuxedo markings give them their 'American Gentleman' nickname.",
    image: "https://images.unsplash.com/photo-1596495578065-0e08c0fc0a0b?w=600&auto=format&fit=crop"
  },
  {
    name: "Chow Chow",
    categoryIndex: 6,
    originCountry: "China",
    lifeExpectancy: 12,
    temperament: "Dignified, independent, loyal, aloof",
    behavior: "Chow Chows are dignified and independent dogs with a lion-like appearance. They are known for their blue-black tongue and thick, fluffy coat. They are loyal to their families but can be aloof with strangers. They are not typically playful but are devoted companions. They have a cat-like independence.",
    careRequirements: "Moderate daily exercise. Their thick double coat needs regular brushing, especially during shedding season. They are prone to overheating in warm weather. Early socialization is essential as they can be protective. They need firm, consistent training from an experienced owner.",
    description: "The Chow Chow is an ancient Chinese breed, with a history dating back over 2,000 years. They were used for hunting, guarding, and pulling sleds. Their distinctive blue-black tongue is unique among dog breeds. They are known for their regal, aloof demeanor and lion-like appearance.",
    image: "https://images.unsplash.com/photo-1596495578065-0e08c0fc0a0b?w=600&auto=format&fit=crop"
  },
  {
    name: "Keeshond",
    categoryIndex: 6,
    originCountry: "Netherlands",
    lifeExpectancy: 13,
    temperament: "Friendly, lively, intelligent, affectionate",
    behavior: "Keeshonden are friendly and lively dogs with a cheerful, outgoing personality. They have a beautiful gray and black coat and distinctive 'spectacles' markings around their eyes. They are excellent with children and other pets. They are alert and make good watchdogs. They are eager to please and easy to train.",
    careRequirements: "Regular daily exercise. Their thick double coat needs regular brushing, especially during shedding season. They are social dogs and should not be left alone for long periods. They need early socialization. They thrive on human companionship and family activities.",
    description: "The Keeshond is the national dog of the Netherlands. They were named after the 18th-century Dutch patriot Kees de Gyselaer and became a symbol of the Dutch Patriot party. They were used as barge dogs on Dutch canal boats. They are known for their friendly, affectionate nature and distinctive spectacles.",
    image: "https://images.unsplash.com/photo-1596495578065-0e08c0fc0a0b?w=600&auto=format&fit=crop"
  },
  {
    name: "Lhasa Apso",
    categoryIndex: 6,
    originCountry: "Tibet",
    lifeExpectancy: 14,
    temperament: "Confident, alert, independent, loyal",
    behavior: "Lhasa Apsos are confident and alert little dogs with an independent nature. They were bred as sentinel dogs in Tibetan monasteries and have a keen sense of hearing. They are loyal to their families but can be reserved with strangers. They have a beautiful, heavy coat that reaches the ground.",
    careRequirements: "Their long, heavy coat needs daily brushing and regular professional grooming. Moderate daily exercise. They are intelligent but can be stubborn during training. They need early socialization. They are generally healthy but prone to certain eye conditions.",
    description: "The Lhasa Apso is an ancient breed from Tibet, where they were kept in monasteries as sentinel dogs. They were considered sacred and were believed to bring good luck. Their name means 'bearded lion dog' in Tibetan. They are known for their keen hearing and alert, confident nature.",
    image: "https://images.unsplash.com/photo-1596495578065-0e08c0fc0a0b?w=600&auto=format&fit=crop"
  },
  {
    name: "Schipperke",
    categoryIndex: 6,
    originCountry: "Belgium",
    lifeExpectancy: 14,
    temperament: "Curious, energetic, confident, independent",
    behavior: "Schipperkes are curious and energetic little dogs with a confident, independent nature. They are known for their distinctive black coat and fox-like appearance. They are alert and make excellent watchdogs. They are good with children and have a playful, mischievous personality.",
    careRequirements: "Regular daily exercise including walks and play sessions. Their thick black coat needs regular brushing. They are intelligent and need mental stimulation. They have a strong prey drive. They are escape artists and need secure fencing. They need early training and socialization.",
    description: "The Schipperke is a small Belgian breed developed as a watchdog and ratter on canal barges. Their name means 'little captain' in Flemish. They are known for their curious, mischievous nature and distinctive black coat. They are often described as 'little black devils' for their playful, energetic personality.",
    image: "https://images.unsplash.com/photo-1596495578065-0e08c0fc0a0b?w=600&auto=format&fit=crop"
  },
  {
    name: "Bichon Frise",
    categoryIndex: 6,
    originCountry: "France/Belgium",
    lifeExpectancy: 14,
    temperament: "Playful, cheerful, affectionate, lively",
    behavior: "Bichon Frises are cheerful, playful little dogs with a love for life. They have a fluffy white coat that gives them a cotton-ball appearance. They are excellent with children and other pets. They are true companion dogs who hate being left alone. They are intelligent and respond well to training.",
    careRequirements: "Their curly, non-shedding coat needs daily brushing and professional grooming every 4-6 weeks. Moderate exercise and enjoy play sessions. They can be difficult to house-train. They thrive on human attention and companionship. They are generally healthy but prone to allergies.",
    description: "The Bichon Frise originated in the Mediterranean region and was popular with French and Italian nobility. They were also used as circus dogs due to their intelligence and charming personality. Their name means 'curly lap dog' in French. They are known for their cheerful, affectionate nature.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },
  {
    name: "American Eskimo Dog",
    categoryIndex: 6,
    originCountry: "United States",
    lifeExpectancy: 14,
    temperament: "Intelligent, alert, friendly, playful",
    behavior: "American Eskimo Dogs are intelligent and alert dogs with a beautiful white, fluffy coat. They are friendly and playful with their families. They are excellent watchdogs and can be vocal. They are good with children and other pets. They are highly trainable and excel in obedience and agility.",
    careRequirements: "Regular daily exercise including walks and play sessions. Their thick white coat needs regular brushing, especially during shedding season. They are intelligent and need mental stimulation. They need early socialization. They thrive on human companionship and family activities.",
    description: "The American Eskimo Dog was developed in the United States from German Spitz dogs. Despite their name, they have no connection to Eskimo culture. They were popular circus dogs in the early 20th century. They are known for their beautiful white coat, intelligent expression, and friendly, playful nature.",
    image: "https://images.unsplash.com/photo-1596495578065-0e08c0fc0a0b?w=600&auto=format&fit=crop"
  },

  // ==========================================
  // COMPANION DOGS (categoryIndex: 7)
  // ==========================================
  {
    name: "Pug",
    categoryIndex: 7,
    originCountry: "China",
    lifeExpectancy: 13,
    temperament: "Charming, mischievous, loving, sociable",
    behavior: "Pugs are charming and mischievous companions. They have an easygoing nature and get along with everyone. Their comical expressions and snorting sounds make them endlessly entertaining. They are good with children and other pets. They are affectionate and love being the center of attention.",
    careRequirements: "Their short coat sheds heavily and requires regular brushing. Due to their flat face, they can overheat easily and should not be over-exercised in warm weather. Facial wrinkles need regular cleaning. They are prone to obesity and need portion control. Regular veterinary checkups are essential.",
    description: "The Pug is an ancient breed with origins in China, where they were companions of Buddhist monks. They later became favorites of European royalty. Their distinctive wrinkled face, curled tail, and charming personality make them one of the most beloved companion breeds worldwide.",
    image: "https://images.unsplash.com/photo-1552840266-46aa24d3261c?w=600&auto=format&fit=crop"
  },
  {
    name: "Cavalier King Charles Spaniel",
    categoryIndex: 7,
    originCountry: "England",
    lifeExpectancy: 13,
    temperament: "Affectionate, gentle, graceful, sociable",
    behavior: "Cavaliers are gentle and affectionate companions. They have a soft, sweet expression and a wagging tail that never stops. They are good with children, other dogs, and strangers. They thrive on human companionship and love to cuddle. They are adaptable and do well in various living situations.",
    careRequirements: "Their silky, medium-length coat needs regular brushing. Moderate daily exercise but are equally happy being lap dogs. They are prone to heart conditions and need regular veterinary checkups. They thrive on human companionship and should not be left alone for long periods.",
    description: "The Cavalier King Charles Spaniel was named after King Charles II of England, who was rarely seen without his spaniels. They were bred as companion dogs for royalty and nobility. Their sweet, gentle nature makes them one of the best therapy dog breeds. They are known for their beautiful, silky coat and expressive eyes.",
    image: "https://images.unsplash.com/photo-1594468190422-f36c3e6c7d64?w=600&auto=format&fit=crop"
  },
  {
    name: "Havanese",
    categoryIndex: 7,
    originCountry: "Cuba",
    lifeExpectancy: 14,
    temperament: "Intelligent, playful, outgoing, curious",
    behavior: "Havanese are intelligent and playful little dogs with a charming personality. They are highly social and love being the center of attention. They are excellent with children and adapt well to different living situations. They can be trained easily and excel in obedience. They are good with other pets.",
    careRequirements: "Their long, silky coat needs daily brushing or regular professional grooming. Moderate exercise and enjoy playtime. They are adaptable and do well in apartments. They thrive on human interaction and can develop separation anxiety. They are generally healthy but prone to certain eye conditions.",
    description: "The Havanese is the national dog of Cuba and the only breed native to the country. They were developed from the Blanquito de la Habana and became beloved companions of Cuban aristocracy. Their lively, friendly nature has made them increasingly popular worldwide as family companions.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },
  {
    name: "Miniature Poodle",
    categoryIndex: 7,
    originCountry: "France/Germany",
    lifeExpectancy: 14,
    temperament: "Intelligent, active, elegant, proud",
    behavior: "Miniature Poodles are exceptionally intelligent and elegant dogs. They are highly trainable and excel in obedience and agility. They have a dignified demeanor but are also playful and affectionate. They are good with children and other pets. They are alert and make excellent watchdogs.",
    careRequirements: "Their curly, non-shedding coat needs regular professional grooming every 4-6 weeks. Daily exercise and mental stimulation. They thrive on human companionship and can develop separation anxiety. They are generally healthy but prone to dental issues and certain genetic conditions.",
    description: "The Miniature Poodle is the medium-sized variety of the Poodle breed. Despite their elegant appearance, Poodles were originally bred as water retrievers. The Miniature variety was developed as a companion dog. They are among the most intelligent dog breeds and excel in various dog sports.",
    image: "https://images.unsplash.com/photo-1577946572660-e364f871c68c?w=600&auto=format&fit=crop"
  },
  {
    name: "Cockapoo",
    categoryIndex: 7,
    originCountry: "United States",
    lifeExpectancy: 14,
    temperament: "Friendly, affectionate, intelligent, playful",
    behavior: "Cockapoos are friendly and affectionate designer dogs, a cross between a Cocker Spaniel and a Poodle. They are intelligent and easy to train. They are excellent with children and other pets. They have a playful, happy nature and love being part of family activities. They are adaptable to various living situations.",
    careRequirements: "Their curly or wavy coat needs regular brushing and professional grooming every 6-8 weeks. Moderate daily exercise. They thrive on human companionship. They are generally healthy but can inherit health issues from either parent breed. Regular veterinary checkups are important.",
    description: "The Cockapoo is one of the oldest and most popular designer dog breeds, first bred in the United States in the 1960s. They combine the friendly, gentle nature of the Cocker Spaniel with the intelligence and low-shedding coat of the Poodle. They are known for their loving, adaptable personality.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },
  {
    name: "Cavapoo",
    categoryIndex: 7,
    originCountry: "Australia/United States",
    lifeExpectancy: 14,
    temperament: "Affectionate, gentle, intelligent, sociable",
    behavior: "Cavapoos are affectionate and gentle designer dogs, a cross between a Cavalier King Charles Spaniel and a Poodle. They are intelligent and easy to train. They are excellent with children and other pets. They have a sweet, loving nature and thrive on human companionship. They are adaptable to various living situations.",
    careRequirements: "Their curly or wavy coat needs regular brushing and professional grooming every 6-8 weeks. Moderate daily exercise. They thrive on human companionship and can develop separation anxiety. They are generally healthy but can inherit health issues from either parent breed.",
    description: "The Cavapoo is a popular designer dog breed that combines the gentle, affectionate nature of the Cavalier King Charles Spaniel with the intelligence and low-shedding coat of the Poodle. They are known for their sweet expression, loving personality, and adaptability to family life.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },
  {
    name: "Maltipoo",
    categoryIndex: 7,
    originCountry: "United States",
    lifeExpectancy: 14,
    temperament: "Playful, affectionate, intelligent, lively",
    behavior: "Maltipoos are playful and affectionate designer dogs, a cross between a Maltese and a Poodle. They are intelligent and easy to train. They are excellent with children and other pets. They have a lively, happy nature and love being the center of attention. They are adaptable to apartment living.",
    careRequirements: "Their curly or wavy coat needs regular brushing and professional grooming every 6-8 weeks. Moderate daily exercise including short walks and indoor play. They thrive on human companionship. They are generally healthy but prone to dental issues. Regular veterinary checkups are important.",
    description: "The Maltipoo is a popular designer dog breed that combines the gentle, playful nature of the Maltese with the intelligence and low-shedding coat of the Poodle. They are known for their teddy bear appearance, loving personality, and adaptability to various living situations.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },
  {
    name: "Pomsky",
    categoryIndex: 7,
    originCountry: "United States",
    lifeExpectancy: 13,
    temperament: "Intelligent, playful, energetic, affectionate",
    behavior: "Pomskies are intelligent and playful designer dogs, a cross between a Pomeranian and a Siberian Husky. They have a striking appearance with Husky-like markings and a fluffy coat. They are energetic and need regular exercise. They are affectionate with their families and can be good with children.",
    careRequirements: "Regular daily exercise including walks and play sessions. Their thick double coat needs regular brushing. They are intelligent and need mental stimulation. Early training and socialization are important. They can be vocal. They thrive in active homes with experienced owners.",
    description: "The Pomsky is a relatively new designer dog breed that combines the small size of the Pomeranian with the striking appearance of the Siberian Husky. They are known for their beautiful blue eyes, fluffy coat, and playful, energetic personality. They require an active, engaged owner.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },
  {
    name: "Mini Goldendoodle",
    categoryIndex: 7,
    originCountry: "United States",
    lifeExpectancy: 14,
    temperament: "Friendly, intelligent, playful, affectionate",
    behavior: "Mini Goldendoodles are friendly and intelligent designer dogs, a cross between a Golden Retriever and a Miniature Poodle. They are highly trainable and eager to please. They are excellent with children and other pets. They have a playful, affectionate nature and love being part of family activities.",
    careRequirements: "Their curly or wavy coat needs regular brushing and professional grooming every 6-8 weeks. Moderate to high daily exercise needs. They thrive on human companionship. They are intelligent and need mental stimulation. Early training and socialization are important for proper development.",
    description: "The Mini Goldendoodle is a popular designer dog breed that combines the friendly, gentle nature of the Golden Retriever with the intelligence and low-shedding coat of the Miniature Poodle. They are known for their loving personality, trainability, and adaptability to family life.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },
  {
    name: "Bichon Poodle (Poochon)",
    categoryIndex: 7,
    originCountry: "Australia/United States",
    lifeExpectancy: 14,
    temperament: "Playful, affectionate, intelligent, cheerful",
    behavior: "Poochons are playful and affectionate designer dogs, a cross between a Bichon Frise and a Poodle. They are intelligent and easy to train. They are excellent with children and other pets. They have a cheerful, happy nature and love being the center of attention. They are adaptable to various living situations.",
    careRequirements: "Their curly, non-shedding coat needs regular brushing and professional grooming every 4-6 weeks. Moderate daily exercise. They thrive on human companionship and can develop separation anxiety. They are generally healthy but can inherit health issues from either parent breed.",
    description: "The Poochon is a popular designer dog breed that combines the cheerful, playful nature of the Bichon Frise with the intelligence and low-shedding coat of the Poodle. They are known for their fluffy, teddy bear appearance and loving, adaptable personality.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },

  // ==========================================
  // MIXED BREEDS (categoryIndex: 8)
  // ==========================================
  {
    name: "Goldendoodle",
    categoryIndex: 8,
    originCountry: "United States",
    lifeExpectancy: 13,
    temperament: "Friendly, intelligent, loyal, playful",
    behavior: "Goldendoodles are friendly and intelligent designer dogs, a cross between a Golden Retriever and a Poodle. They are highly trainable and eager to please. They are excellent with children and other pets. They have a playful, affectionate nature and love being part of family activities. They are popular as therapy and service dogs.",
    careRequirements: "Their curly or wavy coat needs regular brushing and professional grooming every 6-8 weeks. Substantial daily exercise including walks and play sessions. They thrive on human companionship. They are intelligent and need mental stimulation. Early training and socialization are important.",
    description: "The Goldendoodle is one of the most popular designer dog breeds, first bred in the United States in the 1990s. They combine the friendly, gentle nature of the Golden Retriever with the intelligence and low-shedding coat of the Poodle. They are known for their loving personality and versatility.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },
  {
    name: "Labradoodle",
    categoryIndex: 8,
    originCountry: "Australia",
    lifeExpectancy: 13,
    temperament: "Friendly, energetic, intelligent, affectionate",
    behavior: "Labradoodles are friendly and energetic designer dogs, a cross between a Labrador Retriever and a Poodle. They are highly intelligent and easy to train. They are excellent with children and other pets. They have a playful, affectionate nature and love being part of family activities. They are popular as service and therapy dogs.",
    careRequirements: "Their curly or wavy coat needs regular brushing and professional grooming every 6-8 weeks. Substantial daily exercise including walks, runs, and play sessions. They thrive on human companionship. They are intelligent and need mental stimulation. Early training and socialization are important.",
    description: "The Labradoodle was first bred in Australia in the 1980s as a hypoallergenic guide dog. They combine the friendly, outgoing nature of the Labrador Retriever with the intelligence and low-shedding coat of the Poodle. They are known for their loving personality and exceptional trainability.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },
  {
    name: "Cockapoo",
    categoryIndex: 8,
    originCountry: "United States",
    lifeExpectancy: 14,
    temperament: "Friendly, affectionate, intelligent, playful",
    behavior: "Cockapoos are friendly and affectionate designer dogs, a cross between a Cocker Spaniel and a Poodle. They are intelligent and easy to train. They are excellent with children and other pets. They have a playful, happy nature and love being part of family activities. They are adaptable to various living situations.",
    careRequirements: "Their curly or wavy coat needs regular brushing and professional grooming every 6-8 weeks. Moderate daily exercise. They thrive on human companionship. They are generally healthy but can inherit health issues from either parent breed. Regular veterinary checkups are important.",
    description: "The Cockapoo is one of the oldest and most popular designer dog breeds, first bred in the United States in the 1960s. They combine the friendly, gentle nature of the Cocker Spaniel with the intelligence and low-shedding coat of the Poodle. They are known for their loving, adaptable personality.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },
  {
    name: "Pomsky",
    categoryIndex: 8,
    originCountry: "United States",
    lifeExpectancy: 13,
    temperament: "Intelligent, playful, energetic, affectionate",
    behavior: "Pomskies are intelligent and playful designer dogs, a cross between a Pomeranian and a Siberian Husky. They have a striking appearance with Husky-like markings and a fluffy coat. They are energetic and need regular exercise. They are affectionate with their families and can be good with children when properly socialized.",
    careRequirements: "Regular daily exercise including walks and play sessions. Their thick double coat needs regular brushing. They are intelligent and need mental stimulation. Early training and socialization are important. They can be vocal. They thrive in active homes with experienced owners.",
    description: "The Pomsky is a relatively new designer dog breed that combines the small size of the Pomeranian with the striking appearance of the Siberian Husky. They are known for their beautiful blue eyes, fluffy coat, and playful, energetic personality. They require an active, engaged owner.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },
  {
    name: "Morkie",
    categoryIndex: 8,
    originCountry: "United States",
    lifeExpectancy: 14,
    temperament: "Affectionate, playful, intelligent, lively",
    behavior: "Morkies are affectionate and playful designer dogs, a cross between a Maltese and a Yorkshire Terrier. They are intelligent and have a lively personality. They are good with older children and make excellent companion dogs. They form strong bonds with their owners and love being the center of attention.",
    careRequirements: "Their silky coat needs regular brushing and professional grooming every 6-8 weeks. Moderate daily exercise including short walks and indoor play. They thrive on human companionship. Early training and socialization are important. They are generally healthy but prone to dental issues.",
    description: "The Morkie is a popular designer dog breed that combines the gentle, affectionate nature of the Maltese with the confident, spirited personality of the Yorkshire Terrier. They are known for their small size, silky coat, and loving, playful personality.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },
  {
    name: "Schnoodle",
    categoryIndex: 8,
    originCountry: "United States",
    lifeExpectancy: 14,
    temperament: "Intelligent, playful, affectionate, alert",
    behavior: "Schnoodles are intelligent and playful designer dogs, a cross between a Schnauzer and a Poodle. They are highly trainable and eager to please. They are good with children and other pets. They are alert and make excellent watchdogs. They have a playful, affectionate nature and love being part of family activities.",
    careRequirements: "Their wiry or curly coat needs regular brushing and professional grooming every 6-8 weeks. Moderate to high daily exercise needs. They are intelligent and need mental stimulation. Early training and socialization are important. They thrive on human companionship.",
    description: "The Schnoodle is a popular designer dog breed that combines the intelligence and alertness of the Schnauzer with the low-shedding coat and trainability of the Poodle. They come in various sizes depending on the parent breeds. They are known for their playful, affectionate personality.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },
  {
    name: "Bernedoodle",
    categoryIndex: 8,
    originCountry: "United States/Canada",
    lifeExpectancy: 13,
    temperament: "Friendly, intelligent, affectionate, playful",
    behavior: "Bernedoodles are friendly and intelligent designer dogs, a cross between a Bernese Mountain Dog and a Poodle. They are highly trainable and eager to please. They are excellent with children and other pets. They have a gentle, affectionate nature and love being part of family activities. They are adaptable to various living situations.",
    careRequirements: "Their curly or wavy coat needs regular brushing and professional grooming every 6-8 weeks. Moderate to high daily exercise needs. They thrive on human companionship. They are intelligent and need mental stimulation. Early training and socialization are important for proper development.",
    description: "The Bernedoodle is a popular designer dog breed that combines the gentle, loyal nature of the Bernese Mountain Dog with the intelligence and low-shedding coat of the Poodle. They are known for their beautiful tri-color markings, loving personality, and family-friendly nature.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },
  {
    name: "Aussiedoodle",
    categoryIndex: 8,
    originCountry: "United States",
    lifeExpectancy: 13,
    temperament: "Intelligent, energetic, affectionate, playful",
    behavior: "Aussiedoodles are intelligent and energetic designer dogs, a cross between an Australian Shepherd and a Poodle. They are highly trainable and excel in obedience and agility. They are good with children and other pets. They have a playful, affectionate nature and need plenty of mental and physical stimulation.",
    careRequirements: "Their curly or wavy coat needs regular brushing and professional grooming every 6-8 weeks. Substantial daily exercise and mental stimulation. They are highly intelligent and need engaging activities. Early training and socialization are essential. They thrive in active homes with experienced owners.",
    description: "The Aussiedoodle is a popular designer dog breed that combines the intelligence and herding instincts of the Australian Shepherd with the low-shedding coat and trainability of the Poodle. They are known for their striking merle coat patterns, high energy, and loving personality.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },
  {
    name: "Puggle",
    categoryIndex: 8,
    originCountry: "United States",
    lifeExpectancy: 13,
    temperament: "Friendly, playful, affectionate, curious",
    behavior: "Puggles are friendly and playful designer dogs, a cross between a Pug and a Beagle. They are curious and have a happy, outgoing personality. They are excellent with children and other pets. They have a playful nature and love being part of family activities. They are adaptable to various living situations.",
    careRequirements: "Their short coat needs regular brushing. Moderate daily exercise including walks and play sessions. They can be vocal and may howl like a Beagle. They are prone to obesity and need portion control. Early training and socialization are important. They thrive on human companionship.",
    description: "The Puggle is a popular designer dog breed that combines the charming, affectionate nature of the Pug with the friendly, curious personality of the Beagle. They are known for their cute, wrinkled face, floppy ears, and happy, outgoing personality.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },
  {
    name: "Cavachon",
    categoryIndex: 8,
    originCountry: "United States",
    lifeExpectancy: 14,
    temperament: "Affectionate, gentle, playful, sociable",
    behavior: "Cavachons are affectionate and gentle designer dogs, a cross between a Cavalier King Charles Spaniel and a Bichon Frise. They are sociable and get along with everyone. They are excellent with children and other pets. They have a playful, happy nature and love being part of family activities. They are adaptable to various living situations.",
    careRequirements: "Their soft, wavy coat needs regular brushing and professional grooming every 6-8 weeks. Moderate daily exercise including walks and play sessions. They thrive on human companionship and can develop separation anxiety. Early training and socialization are important.",
    description: "The Cavachon is a popular designer dog breed that combines the gentle, affectionate nature of the Cavalier King Charles Spaniel with the cheerful, playful personality of the Bichon Frise. They are known for their soft, fluffy coat, sweet expression, and loving, adaptable personality.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },

  // ==========================================
  // RARE BREEDS (categoryIndex: 9)
  // ==========================================
  {
    name: "Azawakh",
    categoryIndex: 9,
    originCountry: "West Africa (Mali/Niger)",
    lifeExpectancy: 12,
    temperament: "Loyal, independent, affectionate, reserved",
    behavior: "Azawakhs are loyal and independent sighthounds from West Africa. They are known for their elegant, slender build and short, fine coat. They are affectionate with their families but can be reserved with strangers. They have a strong prey drive and love to run. They are clean and quiet dogs.",
    careRequirements: "Daily opportunity to run in a secure area. Their short coat needs minimal grooming. They are sensitive to cold weather. They are independent and can be challenging to train. Early socialization is essential. They need a securely fenced yard. They thrive with experienced owners.",
    description: "The Azawakh is an ancient sighthound breed from the Sahel region of West Africa, where they were used by nomadic tribes for hunting gazelle and hare. They are named after the Azawakh Valley. They are known for their elegant, regal appearance and loyal, protective nature.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop"
  },
  {
    name: "Xoloitzcuintli (Mexican Hairless)",
    categoryIndex: 9,
    originCountry: "Mexico",
    lifeExpectancy: 14,
    temperament: "Calm, loyal, intelligent, alert",
    behavior: "Xoloitzcuintlis are calm and loyal dogs known for their hairless body and warm skin. They are intelligent and alert, making excellent watchdogs. They are affectionate with their families and can be reserved with strangers. They come in three sizes: toy, miniature, and standard.",
    careRequirements: "Their hairless skin needs regular moisturizing and sun protection. They are sensitive to extreme temperatures and need protection from both sun and cold. Moderate daily exercise. They need early socialization. They are generally healthy with few genetic health issues.",
    description: "The Xoloitzcuintli, or Mexican Hairless Dog, is one of the oldest and rarest dog breeds, with a history dating back over 3,000 years to the Aztec civilization. They were considered sacred by the Aztecs and were believed to have healing powers. They are known for their hairless body and calm, loyal nature.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop"
  },
  {
    name: "Thai Ridgeback",
    categoryIndex: 9,
    originCountry: "Thailand",
    lifeExpectancy: 13,
    temperament: "Independent, intelligent, loyal, protective",
    behavior: "Thai Ridgebacks are independent and intelligent dogs with a loyal, protective nature. They are known for the distinctive ridge of hair running along their back. They are alert and make excellent guard dogs. They are good with their families but can be reserved with strangers. They have a strong prey drive.",
    careRequirements: "Regular daily exercise including walks and runs. Their short coat needs minimal grooming. Early socialization and firm, consistent training are essential. They need a securely fenced yard. They are not recommended for first-time dog owners. They thrive with experienced handlers.",
    description: "The Thai Ridgeback is an ancient breed from Thailand, where they were used for hunting and guarding. They are one of only three ridgeback breeds in the world. They were virtually unknown outside of Thailand until the late 20th century. They are known for their intelligence, loyalty, and protective instincts.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop"
  },
  {
    name: "Norwegian Lundehund",
    categoryIndex: 9,
    originCountry: "Norway",
    lifeExpectancy: 12,
    temperament: "Friendly, energetic, independent, curious",
    behavior: "Norwegian Lundehunds are friendly and energetic dogs with a curious, independent nature. They have unique physical characteristics including six toes on each foot and the ability to bend their head backward to touch their spine. They were bred to hunt puffins on steep cliffs. They are alert and make good watchdogs.",
    careRequirements: "Regular daily exercise including walks and play sessions. Their thick double coat needs regular brushing. They are prone to digestive issues and need a carefully managed diet. They are intelligent and need mental stimulation. Early socialization is important.",
    description: "The Norwegian Lundehund is a rare breed from Norway, developed for hunting puffins on steep coastal cliffs. Their name means 'puffin dog' in Norwegian. They have several unique physical adaptations including six toes on each foot and extremely flexible joints. They were nearly extinct after World War II.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop"
  },
  {
    name: "Otterhound",
    categoryIndex: 9,
    originCountry: "England",
    lifeExpectancy: 11,
    temperament: "Friendly, gentle, determined, independent",
    behavior: "Otterhounds are friendly and gentle dogs with a determined, independent nature. They are large, shaggy hounds with an exceptional sense of smell. They are good with children and other dogs. They have a deep, melodious bark. They are known for their webbed feet and love of water.",
    careRequirements: "Substantial daily exercise including swimming and scent-tracking activities. Their shaggy, double coat needs regular brushing and occasional professional grooming. They are prone to bloat. They need a securely fenced yard. Early training and socialization are important.",
    description: "The Otterhound is a rare British breed developed for hunting otters, which is now illegal. They have webbed feet and a water-resistant coat adapted for swimming. They are one of the most endangered dog breeds, with fewer than 1,000 individuals worldwide. They are known for their friendly, gentle nature.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop"
  },
  {
    name: "Lagotto Romagnolo",
    categoryIndex: 9,
    originCountry: "Italy",
    lifeExpectancy: 14,
    temperament: "Affectionate, intelligent, loyal, energetic",
    behavior: "Lagotto Romagnolos are affectionate and intelligent dogs with a loyal, energetic nature. They are known for their curly, woolly coat and exceptional truffle-hunting ability. They are good with children and other pets. They are eager to please and respond well to training. They have a happy, playful personality.",
    careRequirements: "Their curly, woolly coat needs regular brushing and professional grooming every 6-8 weeks. Moderate to high daily exercise needs. They are intelligent and need mental stimulation. They excel in scent work and dog sports. Early training and socialization are important.",
    description: "The Lagotto Romagnolo is an ancient Italian breed from the Romagna region. They were originally bred as water retrievers but are now primarily used as truffle hunters due to their exceptional sense of smell. Their name means 'lake dog' in Italian. They are known for their curly coat and affectionate nature.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop"
  },
  {
    name: "Canaan Dog",
    categoryIndex: 9,
    originCountry: "Israel",
    lifeExpectancy: 13,
    temperament: "Intelligent, alert, loyal, independent",
    behavior: "Canaan Dogs are intelligent and alert dogs with a loyal, independent nature. They are the national dog of Israel and were originally used as guard dogs and herders. They are alert and make excellent watchdogs. They are loyal to their families but can be reserved with strangers. They have a strong survival instinct.",
    careRequirements: "Regular daily exercise including walks and runs. Their short, double coat needs minimal grooming. Early socialization and firm, consistent training are essential. They need a securely fenced yard. They are not recommended for first-time dog owners. They thrive with experienced handlers.",
    description: "The Canaan Dog is an ancient breed from Israel, descended from semi-wild pariah dogs that lived in the desert. They were domesticated by the ancient Israelites for guarding and herding. They were later used by the Israeli military. They are known for their intelligence, alertness, and independent nature.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop"
  },
  {
    name: "Karelian Bear Dog",
    categoryIndex: 9,
    originCountry: "Finland/Russia",
    lifeExpectancy: 12,
    temperament: "Courageous, independent, loyal, alert",
    behavior: "Karelian Bear Dogs are courageous and independent dogs with a loyal, alert nature. They were bred for hunting large game including bears and moose. They are fearless and determined. They are loyal to their families but can be aggressive toward other dogs. They have a strong prey drive and need experienced handling.",
    careRequirements: "Substantial daily exercise including long walks and runs. Their thick double coat needs regular brushing. Early socialization and extensive training are essential. They need a securely fenced yard. They are not recommended for inexperienced owners. They thrive with active, experienced handlers.",
    description: "The Karelian Bear Dog is a rare Finnish breed used for hunting large game. They are known for their courage and ability to stand up to bears. They were nearly extinct after World War II but were revived by Finnish breeders. They are known for their black and white coat and fearless, determined nature.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop"
  },
  {
    name: "Bergamasco Sheepdog",
    categoryIndex: 9,
    originCountry: "Italy",
    lifeExpectancy: 13,
    temperament: "Intelligent, patient, independent, affectionate",
    behavior: "Bergamasco Sheepdogs are intelligent and patient dogs with a unique, matted coat that forms into flocks or 'flocks'. They are independent but affectionate with their families. They are good with children and other pets. They were bred as herding dogs in the Italian Alps and have a calm, patient demeanor.",
    careRequirements: "Their unique matted coat needs special grooming to maintain the flocks. Moderate daily exercise. They are intelligent and need mental stimulation. Early training and socialization are important. They are generally healthy with few genetic issues. They thrive in cooler climates.",
    description: "The Bergamasco Sheepdog is an ancient Italian breed from the Bergamo region of the Italian Alps. They are known for their unique coat that forms into flat, felt-like mats called 'flocks' that protect them from harsh mountain weather. They are one of the oldest herding breeds and are known for their patient, intelligent nature.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop"
  },
  {
    name: "Catalburun (Turkish Pointer)",
    categoryIndex: 9,
    originCountry: "Turkey",
    lifeExpectancy: 12,
    temperament: "Intelligent, loyal, energetic, alert",
    behavior: "Catalburuns are intelligent and loyal dogs known for their distinctive split or double nose. They are energetic and alert, making excellent hunting dogs. They are loyal to their families and can be reserved with strangers. They have a strong prey drive and need plenty of exercise. They are rare even in their native Turkey.",
    careRequirements: "Substantial daily exercise including long walks and runs. Their short coat needs minimal grooming. Early socialization and training are important. They need a securely fenced yard. They are not recommended for inexperienced owners. They thrive in active homes with experienced handlers.",
    description: "The Catalburun is an extremely rare Turkish breed known for its distinctive split nose, which is believed to enhance their sense of smell. Their name means 'fork nose' in Turkish. They are used as pointers and hunting dogs in Turkey. They are one of the rarest dog breeds in the world, with only a few hundred individuals.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop"
  }
];

// ===== SEED FUNCTION =====
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Category.deleteMany({});
    await Breed.deleteMany({});
    console.log("Cleared existing categories and breeds");

    // Insert categories
    const insertedCategories = await Category.insertMany(categories);
    console.log(`Inserted ${insertedCategories.length} categories`);

    // Map category index to actual category IDs
    const breedDocs = breeds.map(breed => ({
      categoryId: insertedCategories[breed.categoryIndex]._id,
      name: breed.name,
      originCountry: breed.originCountry,
      lifeExpectancy: breed.lifeExpectancy,
      temperament: breed.temperament,
      behavior: breed.behavior,
      careRequirements: breed.careRequirements,
      description: breed.description,
      image: breed.image
    }));

    // Insert breeds
    const insertedBreeds = await Breed.insertMany(breedDocs);
    console.log(`Inserted ${insertedBreeds.length} breeds`);

    // Print summary
    console.log("\n" + "=".repeat(50));
    console.log("✅ SEED COMPLETED SUCCESSFULLY");
    console.log("=".repeat(50));
    console.log(`✓ Total Categories: ${insertedCategories.length}`);
    console.log(`✓ Total Breeds: ${insertedBreeds.length}`);
    console.log("\n📊 Breed count in every category:");
    insertedCategories.forEach((cat, i) => {
      const count = breeds.filter(b => b.categoryIndex === i).length;
      console.log(`   ${cat.name}: ${count} breeds`);
    });
    console.log("\n" + "=".repeat(50));

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
}

seed();