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
    name: "Toy Dogs",
    description: "Small, playful companion dogs perfect for apartment living. They are known for their petite size and affectionate nature."
  },
  {
    name: "Working Dogs",
    description: "Large, strong, and intelligent breeds bred for tasks like guarding, pulling sleds, and rescue operations."
  },
  {
    name: "Herding Dogs",
    description: "Highly intelligent and energetic breeds developed for herding livestock. They excel in obedience and agility training."
  },
  {
    name: "Hound Dogs",
    description: "Bred for hunting, hounds are known for their keen sense of smell, stamina, and distinctive baying voices."
  },
  {
    name: "Terrier Dogs",
    description: "Feisty, energetic, and courageous breeds originally bred for hunting vermin. They have strong personalities despite their size."
  },
  {
    name: "Sporting Dogs",
    description: "Active, alert, and friendly breeds developed for hunting game birds. They make excellent family companions with proper exercise."
  },
  {
    name: "Non-Sporting Dogs",
    description: "A diverse group of breeds with varied sizes, coats, and temperaments. They don't fit neatly into other categories."
  },
  {
    name: "Companion Dogs",
    description: "Breeds specifically developed to be loving companions. They thrive on human interaction and are ideal for families."
  }
];

// ===== DOG BREEDS =====
const breeds = [
  // ----- TOY DOGS -----
  {
    name: "Chihuahua",
    categoryIndex: 0,
    originCountry: "Mexico",
    lifeExpectancy: 14,
    temperament: "Loyal, lively, confident, alert",
    behavior: "Chihuahuas are tiny dogs with big personalities. They form strong bonds with their owners and can be wary of strangers. They enjoy being carried around and make excellent lap dogs.",
    careRequirements: "Minimal exercise needs. Short walks and indoor play suffice. They are sensitive to cold weather and may need a sweater in winter. Regular dental care is essential due to their small mouths.",
    description: "The Chihuahua is the world's smallest dog breed, named after the Mexican state of Chihuahua. Despite their tiny size, they have a fearless and confident demeanor. They come in two coat varieties: smooth and long-haired.",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&auto=format&fit=crop"
  },
  {
    name: "Pomeranian",
    categoryIndex: 0,
    originCountry: "Germany/Poland",
    lifeExpectancy: 13,
    temperament: "Intelligent, lively, bold, curious",
    behavior: "Pomeranians are energetic and intelligent little dogs. They are highly inquisitive and love being the center of attention. They can be quite vocal and make excellent watchdogs.",
    careRequirements: "Regular brushing needed for their thick double coat. They are active indoors but also enjoy short walks. Early socialization helps manage their tendency to bark at strangers.",
    description: "The Pomeranian is a compact, fox-faced toy dog named after the Pomerania region. Despite their small stature, they possess a spirited and extroverted personality. They were favorites of royalty including Queen Victoria.",
    image: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=600&auto=format&fit=crop"
  },
  {
    name: "Yorkshire Terrier",
    categoryIndex: 0,
    originCountry: "England",
    lifeExpectancy: 14,
    temperament: "Confident, courageous, intelligent, independent",
    behavior: "Yorkies are big dogs in tiny bodies. They are brave, clever, and often unaware of their small size. They love attention and form strong attachments to their families.",
    careRequirements: "Their long, silky coat requires daily brushing. They have high energy for their size and enjoy play sessions. Regular grooming appointments are recommended every 4-6 weeks.",
    description: "The Yorkshire Terrier was bred in 19th-century England to catch rats in clothing mills. Today they are one of the most popular toy breeds, known for their glamorous coat and confident attitude.",
    image: "https://images.unsplash.com/photo-1579562243430-4732bbd09d91?w=600&auto=format&fit=crop"
  },
  {
    name: "Maltese",
    categoryIndex: 0,
    originCountry: "Malta",
    lifeExpectancy: 14,
    temperament: "Gentle, playful, affectionate, lively",
    behavior: "Maltese dogs are gentle and responsive companions. They thrive on human companionship and are happiest when with their family. They have a playful nature that lasts well into old age.",
    careRequirements: "Their white, silky coat needs daily grooming to prevent mats. They are active indoors and need only moderate outdoor exercise. Tear staining around the eyes requires regular cleaning.",
    description: "The Maltese is one of the oldest dog breeds, with a history spanning over 2,000 years. They were cherished by ancient Greek and Roman nobility. Their pure white coat and dark eyes give them an elegant appearance.",
    image: "https://images.unsplash.com/photo-1530047139084-de4a1c9ae98d?w=600&auto=format&fit=crop"
  },
  {
    name: "Shih Tzu",
    categoryIndex: 0,
    originCountry: "China",
    lifeExpectancy: 13,
    temperament: "Friendly, outgoing, affectionate, lively",
    behavior: "Shih Tzus were bred to be companion dogs and excel at it. They are friendly with everyone, including strangers and other pets. They enjoy lounging but also have playful moments.",
    careRequirements: "Their luxurious double coat needs daily brushing. They have a flat face (brachycephalic) which can cause breathing issues in hot weather. Regular eye cleaning is needed to prevent irritation.",
    description: "The Shih Tzu, meaning 'Lion Dog' in Chinese, was bred exclusively for Chinese royalty. These regal little dogs were so prized that they were given as gifts to Chinese emperors. They have a sweet, trusting nature.",
    image: "https://images.unsplash.com/photo-1583336663277-620dc5d72f1d?w=600&auto=format&fit=crop"
  },
  {
    name: "Pug",
    categoryIndex: 0,
    originCountry: "China",
    lifeExpectancy: 13,
    temperament: "Charming, mischievous, loving, sociable",
    behavior: "Pugs are charming and mischievous companions. They have an easygoing nature and get along with everyone. Their comical expressions and snorting sounds make them endlessly entertaining.",
    careRequirements: "Their short coat sheds heavily and requires regular brushing. Due to their flat face, they can overheat easily and should not be over-exercised in warm weather. Facial wrinkles need regular cleaning.",
    description: "The Pug is an ancient breed with origins in China, where they were companions of Buddhist monks. They later became favorites of European royalty. Their distinctive wrinkled face and curled tail are iconic.",
    image: "https://images.unsplash.com/photo-1552840266-46aa24d3261c?w=600&auto=format&fit=crop"
  },

  // ----- WORKING DOGS -----
  {
    name: "Siberian Husky",
    categoryIndex: 1,
    originCountry: "Russia (Siberia)",
    lifeExpectancy: 13,
    temperament: "Friendly, gentle, energetic, independent",
    behavior: "Huskies are pack-oriented dogs with a friendly and gentle disposition. They are known for their striking blue or multicolored eyes. They have a strong prey drive and love to run and explore.",
    careRequirements: "They need substantial daily exercise including long walks or runs. Their thick double coat sheds heavily twice a year. They are escape artists and need secure fencing. Not ideal for hot climates.",
    description: "The Siberian Husky was developed by the Chukchi people of Siberia as sled dogs. They are known for their endurance, speed, and ability to work in harsh Arctic conditions. They have a wolf-like appearance but a friendly temperament.",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&auto=format&fit=crop"
  },
  {
    name: "German Shepherd",
    categoryIndex: 1,
    originCountry: "Germany",
    lifeExpectancy: 12,
    temperament: "Loyal, confident, courageous, intelligent",
    behavior: "German Shepherds are highly intelligent and versatile working dogs. They are loyal to their families and protective of their territory. They excel in police, military, and service roles.",
    careRequirements: "They need plenty of physical exercise and mental stimulation. Their double coat sheds year-round. Early training and socialization are essential. They thrive when given a job to do.",
    description: "The German Shepherd was developed in the late 19th century by Max von Stephanitz. They are one of the most popular breeds worldwide, valued for their intelligence, strength, and versatility as working dogs.",
    image: "https://images.unsplash.com/photo-1553882809-a4f57e595701?w=600&auto=format&fit=crop"
  },
  {
    name: "Golden Retriever",
    categoryIndex: 1,
    originCountry: "Scotland",
    lifeExpectancy: 12,
    temperament: "Intelligent, friendly, reliable, eager to please",
    behavior: "Golden Retrievers are one of the most beloved family dogs. They are exceptionally friendly, patient with children, and eager to please. They have a natural love for water and retrieving.",
    careRequirements: "They need regular exercise including daily walks and play sessions. Their thick coat requires weekly brushing. They are prone to obesity and need portion control. They thrive on human companionship.",
    description: "The Golden Retriever was developed in Scotland in the 19th century as a hunting dog for retrieving waterfowl. They are known for their beautiful golden coat, gentle mouth, and kind expression.",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop"
  },
  {
    name: "Rottweiler",
    categoryIndex: 1,
    originCountry: "Germany",
    lifeExpectancy: 10,
    temperament: "Loyal, confident, courageous, calm",
    behavior: "Rottweilers are powerful, confident dogs with a calm and courageous temperament. They are devoted to their families and make excellent guard dogs. They are known for their intelligence and trainability.",
    careRequirements: "They need regular exercise but not excessive. Their short coat requires minimal grooming. Early socialization and firm, consistent training are essential. They thrive with an experienced owner.",
    description: "The Rottweiler traces its origins back to the Roman Empire. They were used as cattle dogs and guardians in the town of Rottweil, Germany. They are known for their strength, endurance, and protective instincts.",
    image: "https://images.unsplash.com/photo-1567752881298-894b81f6aa9c?w=600&auto=format&fit=crop"
  },
  {
    name: "Great Dane",
    categoryIndex: 1,
    originCountry: "Germany",
    lifeExpectancy: 9,
    temperament: "Friendly, patient, dependable, gentle",
    behavior: "Despite their enormous size, Great Danes are known as 'gentle giants'. They are friendly with everyone, including children and other pets. They have a calm and patient demeanor.",
    careRequirements: "They need moderate exercise but space to move. Their short coat is easy to maintain. They are prone to bloat (GDV), a life-threatening condition. Due to their size, they have higher food costs and a shorter lifespan.",
    description: "The Great Dane was originally bred in Germany for hunting wild boar and deer. Today they are known for their massive size, elegant appearance, and gentle nature. They are among the tallest dog breeds in the world.",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&auto=format&fit=crop"
  },
  {
    name: "Bernese Mountain Dog",
    categoryIndex: 1,
    originCountry: "Switzerland",
    lifeExpectancy: 8,
    temperament: "Gentle, affectionate, loyal, calm",
    behavior: "Bernese Mountain Dogs are gentle giants with a calm and easygoing nature. They are particularly good with children and make excellent family pets. They have a strong work ethic and enjoy pulling carts.",
    careRequirements: "Their long, thick coat needs regular brushing. They are sensitive to heat and prefer cooler climates. Regular exercise is important. They have a relatively short lifespan compared to other breeds.",
    description: "The Bernese Mountain Dog originated as a farm dog in the Swiss Alps. They were used for pulling carts, driving cattle, and guarding property. Their beautiful tri-color coat and gentle expression make them stand out.",
    image: "https://images.unsplash.com/photo-1600878459640-6e2e5cdbe635?w=600&auto=format&fit=crop"
  },

  // ----- HERDING DOGS -----
  {
    name: "Border Collie",
    categoryIndex: 2,
    originCountry: "Scotland/England",
    lifeExpectancy: 14,
    temperament: "Intelligent, energetic, responsive, hardworking",
    behavior: "Border Collies are widely considered the most intelligent dog breed. They have an intense work drive and need constant mental and physical stimulation. They excel at dog sports and herding trials.",
    careRequirements: "They require extensive daily exercise and mental challenges. Without appropriate outlets, they can develop destructive behaviors. Their coat needs regular brushing. They thrive in active homes.",
    description: "The Border Collie was developed along the border of Scotland and England for herding sheep. They are renowned for their intelligence, agility, and 'eye' - the intense stare they use to control livestock.",
    image: "https://images.unsplash.com/photo-1536081047027-7d2acb0a24c5?w=600&auto=format&fit=crop"
  },
  {
    name: "Australian Shepherd",
    categoryIndex: 2,
    originCountry: "United States",
    lifeExpectancy: 13,
    temperament: "Smart, energetic, loyal, hardworking",
    behavior: "Australian Shepherds are highly intelligent and energetic working dogs. They form strong bonds with their families and are protective of their home. They have strong herding instincts and may try to herd children.",
    careRequirements: "They need substantial daily exercise and mental stimulation. Their medium-length coat requires weekly brushing. They excel in agility and obedience training. Early socialization is important.",
    description: "Despite their name, Australian Shepherds were actually developed in the United States as ranch dogs. They are known for their striking merle coat patterns, often with blue or heterochromatic eyes.",
    image: "https://images.unsplash.com/photo-1617898065156-963a1e4c7d62?w=600&auto=format&fit=crop"
  },
  {
    name: "Welsh Corgi (Pembroke)",
    categoryIndex: 2,
    originCountry: "Wales",
    lifeExpectancy: 13,
    temperament: "Smart, affectionate, bold, friendly",
    behavior: "Pembroke Welsh Corgis are intelligent, active, and affectionate. They are known for their short legs and long body. They are friendly with everyone but can be protective of their families.",
    careRequirements: "They need regular exercise despite their short legs. Their double coat sheds heavily and needs regular brushing. They are prone to weight gain and need portion control. Early training helps manage their herding instincts.",
    description: "The Pembroke Welsh Corgi is a small herding dog from Wales. According to legend, they were used by fairies to pull carriages. They are famously associated with Queen Elizabeth II, who owned over 30 Corgis during her reign.",
    image: "https://images.unsplash.com/photo-1541096881562-c7dd6c0f4a53?w=600&auto=format&fit=crop"
  },
  {
    name: "Shetland Sheepdog",
    categoryIndex: 2,
    originCountry: "Scotland (Shetland Islands)",
    lifeExpectancy: 13,
    temperament: "Intelligent, loyal, gentle, responsive",
    behavior: "Shelties are miniature collies in appearance and personality. They are highly intelligent and excel in obedience. They are loyal to their families and can be reserved with strangers. They have a tendency to bark.",
    careRequirements: "Their beautiful long coat needs regular brushing. They need daily exercise and mental stimulation. They are sensitive and respond best to positive training methods. They make excellent watchdogs.",
    description: "The Shetland Sheepdog originated in the Shetland Islands of Scotland, where they were used for herding sheep and ponies. They closely resemble a smaller version of the Rough Collie and are known for their beauty and intelligence.",
    image: "https://images.unsplash.com/photo-1590543599877-73548fde2a5d?w=600&auto=format&fit=crop"
  },

  // ----- HOUND DOGS -----
  {
    name: "Beagle",
    categoryIndex: 3,
    originCountry: "England",
    lifeExpectancy: 13,
    temperament: "Friendly, curious, merry, energetic",
    behavior: "Beagles are happy, friendly dogs with an ever-wagging tail. They are scent hounds driven by their nose, which can make them stubborn. They are excellent with children and get along well with other dogs.",
    careRequirements: "They need regular exercise and enjoy following their nose on walks. A secure, fenced yard is essential as they will follow a scent. Their short coat is easy to maintain. They can be vocal and howl.",
    description: "The Beagle was developed in England as a scent hound for hare hunting. They have an exceptional sense of smell, second only to the Bloodhound. Their friendly and curious nature makes them one of the most popular family dogs.",
    image: "https://images.unsplash.com/photo-1606598963395-555146d2f7e0?w=600&auto=format&fit=crop"
  },
  {
    name: "Dachshund",
    categoryIndex: 3,
    originCountry: "Germany",
    lifeExpectancy: 14,
    temperament: "Clever, stubborn, brave, lively",
    behavior: "Dachshunds are clever and courageous little dogs. They were bred to hunt badgers, and their bold personality reflects this heritage. They are loyal to their families but can be wary of strangers.",
    careRequirements: "They need moderate exercise but should avoid jumping due to their long spines. Their coat varies (smooth, long, or wire-haired) with different grooming needs. They can be prone to back problems and weight gain.",
    description: "The Dachshund, meaning 'badger dog' in German, was developed in Germany for hunting badgers and other burrowing animals. Their distinctive long body and short legs were designed for entering tunnels. They come in three coat varieties.",
    image: "https://images.unsplash.com/photo-1615737036244-62cc386b1064?w=600&auto=format&fit=crop"
  },
  {
    name: "Labrador Retriever",
    categoryIndex: 3,
    originCountry: "Canada (Newfoundland)",
    lifeExpectancy: 13,
    temperament: "Friendly, active, outgoing, gentle",
    behavior: "Labradors are one of the most popular dog breeds worldwide. They are friendly, energetic, and eager to please. They have a natural love for water and a 'soft mouth' for retrieving. They excel as family dogs and service animals.",
    careRequirements: "They need plenty of exercise daily. Their short, water-resistant coat sheds year-round. They are food-motivated and prone to obesity. They need lots of human interaction and can become destructive if left alone too long.",
    description: "The Labrador Retriever originated in Newfoundland, Canada, where they helped fishermen retrieve nets and fish. Despite their name, they were refined in England. They are known for their friendly nature and otter-like tail.",
    image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600&auto=format&fit=crop"
  },
  {
    name: "Bloodhound",
    categoryIndex: 3,
    originCountry: "Belgium",
    lifeExpectancy: 11,
    temperament: "Gentle, determined, affectionate, stubborn",
    behavior: "Bloodhounds are gentle giants with an incredible sense of smell. They are determined trackers who follow their nose with single-minded focus. Despite their serious working ability, they are affectionate and good with children.",
    careRequirements: "They need regular exercise but not excessive. Their short coat requires minimal grooming. Their long ears need regular cleaning to prevent infections. They drool and need their wrinkles cleaned. A secure yard is essential.",
    description: "The Bloodhound is one of the oldest dog breeds, with ancestors dating back to ancient Greece. They have the most acute sense of smell of any dog breed and their tracking evidence is admissible in court. They are famously gentle and dignified.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop"
  },
  {
    name: "Greyhound",
    categoryIndex: 3,
    originCountry: "Egypt/England",
    lifeExpectancy: 13,
    temperament: "Gentle, affectionate, calm, independent",
    behavior: "Greyhounds are surprisingly calm and gentle despite their racing reputation. They are affectionate with their families and often described as '45 mph couch potatoes'. They are good with children and other dogs.",
    careRequirements: "They need a daily walk but are not high-energy indoors. Their thin coat provides little protection from cold. They need a secure yard as they can run extremely fast. They have a strong prey drive for small animals.",
    description: "The Greyhound is one of the oldest dog breeds, with depictions dating back 4,000 years to ancient Egypt. They were bred for coursing game and later for racing. They are the fastest dog breed, reaching speeds up to 45 mph.",
    image: "https://images.unsplash.com/photo-1590604407871-1f0d5a50f270?w=600&auto=format&fit=crop"
  },

  // ----- TERRIER DOGS -----
  {
    name: "Jack Russell Terrier",
    categoryIndex: 4,
    originCountry: "England",
    lifeExpectancy: 14,
    temperament: "Energetic, intelligent, fearless, independent",
    behavior: "Jack Russells are high-energy dogs with a fearless and determined personality. They are intelligent but can be stubborn. They have strong hunting instincts and love to dig. They need an active owner who can keep up with them.",
    careRequirements: "They require substantial daily exercise and mental stimulation. Their rough or smooth coat needs minimal grooming. They are escape artists and need secure fencing. They excel at dog sports like agility and earthdog trials.",
    description: "The Jack Russell Terrier was developed in England by Reverend John Russell for fox hunting. They were bred to go to ground after foxes and have the courage and determination of much larger dogs. They are compact but powerful.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop"
  },
  {
    name: "Bull Terrier",
    categoryIndex: 4,
    originCountry: "England",
    lifeExpectancy: 13,
    temperament: "Playful, stubborn, affectionate, energetic",
    behavior: "Bull Terriers are known for their unique egg-shaped head and playful personality. They are affectionate with their families and have a strong sense of humor. They can be stubborn and need consistent training.",
    careRequirements: "They need regular exercise but are not excessively energetic. Their short coat is easy to maintain. Early socialization is crucial as they can be dog-aggressive. They thrive with positive reinforcement training.",
    description: "The Bull Terrier was developed in England in the 19th century from bulldogs and terriers. Originally bred for dog fighting, they were later refined into the friendly and entertaining companion we know today. They are known as 'the clown in the dog suit'.",
    image: "https://images.unsplash.com/photo-1590692899981-c9403e8bedc7?w=600&auto=format&fit=crop"
  },
  {
    name: "Scottish Terrier",
    categoryIndex: 4,
    originCountry: "Scotland",
    lifeExpectancy: 12,
    temperament: "Independent, confident, dignified, loyal",
    behavior: "Scottish Terriers are dignified and independent dogs with a bold personality. They are loyal to their families but can be aloof with strangers. They have a strong prey drive and love to dig. They are known for their distinctive beard and eyebrows.",
    careRequirements: "Their wiry coat needs regular brushing and professional grooming every 6-8 weeks. They need moderate exercise. They can be stubborn during training. They are known for their 'Scottish terrier stubbornness' and need patient handling.",
    description: "The Scottish Terrier, one of Scotland's oldest breeds, was developed to hunt badgers and foxes in the Highlands. They are known for their distinctive silhouette: short legs, a long head, and a wiry beard. Famous owners include Franklin D. Roosevelt and Eva Braun.",
    image: "https://images.unsplash.com/photo-1619806184388-f182b713ce0a?w=600&auto=format&fit=crop"
  },

  // ----- SPORTING DOGS -----
  {
    name: "English Springer Spaniel",
    categoryIndex: 5,
    originCountry: "England",
    lifeExpectancy: 13,
    temperament: "Friendly, playful, eager to please, energetic",
    behavior: "English Springer Spaniels are cheerful and energetic sporting dogs. They are eager to please and respond well to training. They have a natural instinct for flushing and retrieving game. They are excellent with children and other dogs.",
    careRequirements: "They need substantial daily exercise. Their medium-length, wavy coat needs regular brushing. Their ears need regular cleaning to prevent infections. They thrive when given a job to do and excel in hunt tests and agility.",
    description: "The English Springer Spaniel was developed in England as a hunting dog that 'springs' game from cover. They are the foundation of all spaniel breeds. Their wagging tail and happy expression reflect their friendly, enthusiastic nature.",
    image: "https://images.unsplash.com/photo-1605714366425-c54db9bf6034?w=600&auto=format&fit=crop"
  },
  {
    name: "Cocker Spaniel",
    categoryIndex: 5,
    originCountry: "England",
    lifeExpectancy: 13,
    temperament: "Gentle, affectionate, happy, trusting",
    behavior: "Cocker Spaniels are gentle and affectionate family dogs. They are known for their beautiful, silky coat and long, feathered ears. They are happy and wag their tails constantly. They get along well with children and other pets.",
    careRequirements: "Their luxurious coat needs regular brushing and professional grooming every 6-8 weeks. They need moderate daily exercise. Their long ears need regular cleaning. They thrive on human companionship and can develop separation anxiety.",
    description: "The Cocker Spaniel is the smallest of the sporting spaniels, named for their skill in hunting woodcock. They became immensely popular as family dogs, partly due to their starring role in Disney's 'Lady and the Tramp'.",
    image: "https://images.unsplash.com/photo-1594468190422-f36c3e6c7d64?w=600&auto=format&fit=crop"
  },
  {
    name: "Weimaraner",
    categoryIndex: 5,
    originCountry: "Germany",
    lifeExpectancy: 12,
    temperament: "Energetic, intelligent, fearless, obedient",
    behavior: "Weimaraners are sleek, athletic dogs with boundless energy. They are highly intelligent and need constant mental stimulation. They form deep bonds with their families and can be protective. They are known for their distinctive silver-gray coat and amber eyes.",
    careRequirements: "They need extensive daily exercise and mental challenges. Their short coat is easy to maintain. They can be destructive if under-exercised. They need early socialization and firm, consistent training. They are not recommended for inexperienced owners.",
    description: "The Weimaraner was developed in Germany in the early 19th century for hunting large game like deer and boar. They were known as the 'Gray Ghost' for their distinctive coat color and stealthy hunting style. Today they are versatile sporting and family dogs.",
    image: "https://images.unsplash.com/photo-1605714366425-c54db9bf6034?w=600&auto=format&fit=crop"
  },

  // ----- NON-SPORTING DOGS -----
  {
    name: "Bulldog",
    categoryIndex: 6,
    originCountry: "England",
    lifeExpectancy: 10,
    temperament: "Calm, courageous, friendly, dignified",
    behavior: "Bulldogs are gentle and courageous dogs with a calm demeanor. They are known for their distinctive wrinkled face and pushed-in nose. They are excellent with children and have a comical, dignified personality. They are not very active.",
    careRequirements: "They need minimal exercise due to their low energy levels. Their short coat needs occasional brushing. Their facial wrinkles need regular cleaning to prevent infections. Due to their flat face, they can overheat easily and have breathing difficulties.",
    description: "The Bulldog was originally bred in England for bull-baiting, a brutal sport banned in 1835. After the ban, they were bred into the gentle, friendly companion we know today. They are a national symbol of England and known for their distinctive, comical appearance.",
    image: "https://images.unsplash.com/photo-1575660938060-4d62a1e22f8e?w=600&auto=format&fit=crop"
  },
  {
    name: "Dalmatian",
    categoryIndex: 6,
    originCountry: "Croatia (Dalmatia)",
    lifeExpectancy: 12,
    temperament: "Energetic, intelligent, outgoing, dignified",
    behavior: "Dalmatians are energetic and intelligent dogs known for their distinctive spotted coat. They are outgoing and friendly but can be reserved with strangers. They have a strong working heritage and excel in various dog sports.",
    careRequirements: "They need substantial daily exercise and mental stimulation. Their short coat sheds heavily and needs regular brushing. They are prone to deafness, which should be tested in puppies. They thrive with an active family.",
    description: "The Dalmatian's origins are traced to the Dalmatia region of Croatia. They were used as carriage dogs, running alongside horse-drawn carriages, and as firehouse mascots. Their unique spotted coat makes them instantly recognizable, and they were popularized by Disney's '101 Dalmatians'.",
    image: "https://images.unsplash.com/photo-1596495578065-0e08c0fc0a0b?w=600&auto=format&fit=crop"
  },
  {
    name: "Poodle (Standard)",
    categoryIndex: 6,
    originCountry: "France/Germany",
    lifeExpectancy: 13,
    temperament: "Intelligent, active, elegant, proud",
    behavior: "Poodles are exceptionally intelligent and elegant dogs. They are highly trainable and excel in obedience and agility. They have a dignified demeanor but are also playful and affectionate. They come in three sizes: standard, miniature, and toy.",
    careRequirements: "Their curly, non-shedding coat needs regular professional grooming every 4-6 weeks. They need daily exercise and mental stimulation. They thrive on human companionship and can develop separation anxiety if left alone too long.",
    description: "Despite being known as the French Poodle, this breed actually originated in Germany as a water retriever ('Pudel' means 'to splash'). They were later refined in France into the elegant breed we know today. Their distinctive haircut was originally functional, providing warmth while allowing freedom of movement in water.",
    image: "https://images.unsplash.com/photo-1577946572660-e364f871c68c?w=600&auto=format&fit=crop"
  },

  // ----- COMPANION DOGS -----
  {
    name: "Cavalier King Charles Spaniel",
    categoryIndex: 7,
    originCountry: "England",
    lifeExpectancy: 13,
    temperament: "Affectionate, gentle, graceful, sociable",
    behavior: "Cavaliers are gentle and affectionate companions. They have a soft, sweet expression and a wagging tail that never stops. They are good with children, other dogs, and strangers. They thrive on human companionship and love to cuddle.",
    careRequirements: "Their silky, medium-length coat needs regular brushing. They need moderate daily exercise but are equally happy being lap dogs. They are prone to heart conditions and need regular veterinary checkups.",
    description: "The Cavalier King Charles Spaniel was named after King Charles II of England, who was rarely seen without his spaniels. They were bred as companion dogs for royalty and nobility. Their sweet, gentle nature makes them one of the best therapy dog breeds.",
    image: "https://images.unsplash.com/photo-1594468190422-f36c3e6c7d64?w=600&auto=format&fit=crop"
  },
  {
    name: "Bichon Frise",
    categoryIndex: 7,
    originCountry: "France/Belgium",
    lifeExpectancy: 14,
    temperament: "Playful, cheerful, affectionate, lively",
    behavior: "Bichon Frises are cheerful, playful little dogs with a love for life. They have a fluffy white coat that gives them a cotton-ball appearance. They are excellent with children and other pets. They are true companion dogs who hate being left alone.",
    careRequirements: "Their curly, non-shedding coat needs daily brushing and professional grooming every 4-6 weeks. They need moderate exercise and enjoy play sessions. They can be difficult to house-train. They thrive on human attention and companionship.",
    description: "The Bichon Frise originated in the Mediterranean region and was popular with French and Italian nobility. They were also used as circus dogs due to their intelligence and charming personality. Their name means 'curly lap dog' in French.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
  },
  {
    name: "Havanese",
    categoryIndex: 7,
    originCountry: "Cuba",
    lifeExpectancy: 14,
    temperament: "Intelligent, playful, outgoing, curious",
    behavior: "Havanese are intelligent and playful little dogs with a charming personality. They are highly social and love being the center of attention. They are excellent with children and adapt well to different living situations. They can be trained easily.",
    careRequirements: "Their long, silky coat needs daily brushing or regular professional grooming. They need moderate exercise and enjoy playtime. They are adaptable and do well in apartments. They thrive on human interaction and can develop separation anxiety.",
    description: "The Havanese is the national dog of Cuba and the only breed native to the country. They were developed from the Blanquito de la Habana and became beloved companions of Cuban aristocracy. Their lively, friendly nature has made them increasingly popular worldwide.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop"
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

    console.log("\n✅ SEED COMPLETE!");
    console.log(`   ${insertedCategories.length} categories`);
    console.log(`   ${insertedBreeds.length} breeds`);
    console.log("\nCategories:");
    insertedCategories.forEach((cat, i) => console.log(`   ${i + 1}. ${cat.name}`));

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();