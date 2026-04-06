export interface GhanaianFood {
  id: string;
  name: string;
  description: string;
  category: "Carbs" | "Proteins" | "Soups & Stews" | "Snacks" | "Beverages";
  nutritionalValue: {
    calories: number;
    carbs: number; // in grams
    protein: number; // in grams
    fat: number; // in grams
    glycemicIndex: "Low" | "Medium" | "High";
    sodium: "Low" | "Medium" | "High";
  };
  suitableFor: string[]; // List of condition IDs
  avoidFor: string[]; // List of condition IDs
  reasons: { [conditionId: string]: string };
  substitutes?: string[];
  imageUrl: string;
}

export interface HealthCondition {
  id: string;
  name: string;
  description: string;
  icon: string;
  disclaimer: string;
}

export const conditions: HealthCondition[] = [
  {
    id: "diabetes",
    name: "Diabetes Management",
    description: "Focus on low glycemic index foods, high fiber, and lean protein to manage blood sugar.",
    icon: "activity",
    disclaimer: "Always monitor your blood glucose levels. Ghanaian carbohydrate heavy diets can trigger high sugar spikes if not portion-controlled."
  },
  {
    id: "hypertension",
    name: "Hypertension (High BP)",
    description: "Focus on low sodium, low cholesterol, and potassium-rich foods like leafy greens.",
    icon: "heart",
    disclaimer: "Avoid salty fish (momoni, koobi), salty meats, and highly processed seasonings like bouillon cubes."
  },
  {
    id: "ulcer",
    name: "Peptic Ulcer",
    description: "Focus on bland, low-acid, and non-spicy traditional meals that won't trigger acid production.",
    icon: "shield-alert",
    disclaimer: "Strictly avoid high amounts of pepper (shito, kpakposhito) and extremely sour fermented items."
  },
  {
    id: "weight-loss",
    name: "Weight Management",
    description: "Focus on calorie-deficit, portion control, high fiber, and reduced oil intake.",
    icon: "scale",
    disclaimer: "Traditional swallows like fufu and banku are very calorie-dense; portion sizes are critical."
  },
  {
    id: "general-health",
    name: "General Vitality",
    description: "Balanced traditional Ghanaian diet designed to maximize energy, vitamins, and minerals.",
    icon: "smile",
    disclaimer: "A well-rounded balance of all food groups helps maintain long-term health."
  }
];

export const ghanaianFoods: GhanaianFood[] = [
  {
    id: "kontomire-stew",
    name: "Kontomire Stew (Palava Sauce)",
    description: "Traditional stew made with cocoyam leaves, melon seeds (egusi), palm oil, and steamed fish/meat.",
    category: "Soups & Stews",
    nutritionalValue: {
      calories: 250,
      carbs: 8,
      protein: 18,
      fat: 16,
      glycemicIndex: "Low",
      sodium: "Low"
    },
    suitableFor: ["diabetes", "hypertension", "weight-loss", "general-health"],
    avoidFor: [],
    reasons: {
      diabetes: "Extremely low carbohydrate and rich in dietary fiber from cocoyam leaves which slows sugar absorption.",
      hypertension: "Leaves contain high potassium and magnesium if prepared with minimal salt.",
      "weight-loss": "High in satiety and low in carbs. Ensure palm oil is used sparingly."
    },
    substitutes: ["Spinach", "Kale", "Swiss Chard"],
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "boiled-plantain",
    name: "Boiled Plantain (Apem)",
    description: "Unripe or slightly ripe plantain boiled until tender.",
    category: "Carbs",
    nutritionalValue: {
      calories: 180,
      carbs: 45,
      protein: 2,
      fat: 0.5,
      glycemicIndex: "Medium",
      sodium: "Low"
    },
    suitableFor: ["hypertension", "ulcer", "general-health"],
    avoidFor: [],
    reasons: {
      ulcer: "Very gentle on the stomach lining and low in acid.",
      hypertension: "High potassium source, which actively counteracts high sodium levels in the blood."
    },
    substitutes: ["Boiled Sweet Potatoes", "Water Yam"],
    imageUrl: "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "fufu",
    name: "Fufu (Cassava & Plantain)",
    description: "Boiled cassava and plantain pounded together into a smooth, elastic dough. Usually served with soup.",
    category: "Carbs",
    nutritionalValue: {
      calories: 400,
      carbs: 90,
      protein: 3,
      fat: 1,
      glycemicIndex: "High",
      sodium: "Low"
    },
    suitableFor: ["general-health"],
    avoidFor: ["diabetes", "weight-loss"],
    reasons: {
      diabetes: "High glycemic index and dense carbohydrate load will cause significant blood sugar spikes.",
      "weight-loss": "Extremely calorie-dense per small portion, easy to overeat.",
      "ulcer": "Safe to eat if served with mild, non-peppery soup like Light Soup without excess pepper."
    },
    imageUrl: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "kenkey",
    name: "Kenkey (Ga/Fanti)",
    description: "Fermented maize dough cooked in corn husks or plantain leaves. Sour taste.",
    category: "Carbs",
    nutritionalValue: {
      calories: 320,
      carbs: 65,
      protein: 6,
      fat: 2,
      glycemicIndex: "Medium",
      sodium: "Medium"
    },
    suitableFor: ["general-health"],
    avoidFor: ["ulcer"],
    reasons: {
      ulcer: "The fermentation process creates high acidity which can easily aggravate stomach ulcers.",
      diabetes: "Eaten with caution due to heavy carbohydrate density."
    },
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "garden-egg-stew",
    name: "Garden Egg Stew (Nyaadewa)",
    description: "Nutrient-rich stew made from local small eggplants, palm oil, and dried herrings.",
    category: "Soups & Stews",
    nutritionalValue: {
      calories: 210,
      carbs: 12,
      protein: 10,
      fat: 14,
      glycemicIndex: "Low",
      sodium: "Low"
    },
    suitableFor: ["diabetes", "hypertension", "weight-loss", "general-health"],
    avoidFor: [],
    reasons: {
      diabetes: "Garden eggs have powerful soluble fiber that helps control blood glucose levels.",
      hypertension: "Low in sodium and naturally anti-inflammatory."
    },
    imageUrl: "https://images.unsplash.com/photo-1592417817098-8fd3d9ebc4a5?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "waakye",
    name: "Waakye",
    description: "Rice and black-eyed beans boiled together with sorghum leaves for color and antioxidants.",
    category: "Carbs",
    nutritionalValue: {
      calories: 380,
      carbs: 70,
      protein: 14,
      fat: 4,
      glycemicIndex: "Medium",
      sodium: "Medium"
    },
    suitableFor: ["general-health", "weight-loss"],
    avoidFor: [],
    reasons: {
      "weight-loss": "Rich in protein and fiber from beans, which promotes satiety. Eat with moderate stew.",
      diabetes: "Better alternative to plain white rice, but portion size remains critical."
    },
    imageUrl: "https://images.unsplash.com/photo-1512058560366-cd242d4235cd?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "light-soup",
    name: "Light Soup (Nkrakra)",
    description: "Water-based tomato soup infused with ginger, garlic, garden eggs, and various meats or fish.",
    category: "Soups & Stews",
    nutritionalValue: {
      calories: 140,
      carbs: 10,
      protein: 15,
      fat: 5,
      glycemicIndex: "Low",
      sodium: "Medium"
    },
    suitableFor: ["diabetes", "weight-loss", "hypertension", "general-health"],
    avoidFor: ["ulcer"],
    reasons: {
      "weight-loss": "Very low calorie density. Fills the stomach without packing heavy calories.",
      ulcer: "Frequently prepared with heavy local chili pepper (kpakposhito) which irritates ulcers."
    },
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "red-red",
    name: "Red Red (Plantain & Beans Stew)",
    description: "Black-eyed peas stew cooked in palm oil and served with fried sweet plantains.",
    category: "Proteins",
    nutritionalValue: {
      calories: 450,
      carbs: 55,
      protein: 18,
      fat: 20,
      glycemicIndex: "Medium",
      sodium: "Medium"
    },
    suitableFor: ["general-health"],
    avoidFor: ["weight-loss", "hypertension"],
    reasons: {
      "weight-loss": "Frying ripe plantains absorbs massive amounts of palm oil, multiplying calorie counts.",
      hypertension: "Commercial preparation uses excess salt and deep-fried palm oil."
    },
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "koobi-momoni",
    name: "Koobi & Momoni (Salted Sun-Dried Fish)",
    description: "Local fermented salted fish used heavily to flavor soups and stews.",
    category: "Proteins",
    nutritionalValue: {
      calories: 110,
      carbs: 0,
      protein: 20,
      fat: 3,
      glycemicIndex: "Low",
      sodium: "High"
    },
    suitableFor: [],
    avoidFor: ["hypertension"],
    reasons: {
      hypertension: "Extremely high sodium content. One small piece can exceed the daily recommended salt intake limit."
    },
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c170db76?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "musa-pudding",
    name: "Asaana / Corn Beer",
    description: "Fermented caramelized corn beverage drunk ice-cold.",
    category: "Beverages",
    nutritionalValue: {
      calories: 190,
      carbs: 45,
      protein: 2,
      fat: 0,
      glycemicIndex: "High",
      sodium: "Low"
    },
    suitableFor: ["general-health"],
    avoidFor: ["diabetes", "weight-loss"],
    reasons: {
      diabetes: "Loaded with caramelized sugar and corn starch, causing immediate blood sugar spikes.",
      ulcer: "Fermented drinks can trigger acid reflux in sensitive ulcer patients."
    },
    imageUrl: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=500&auto=format&fit=crop&q=60"
  }
];

export const localKnowledgeBaseAnswers = [
  {
    keywords: ["waakye", "diabetes", "can i eat waakye"],
    answer: "Yes, you can eat Waakye if you have diabetes, but with conditions! Keep the portion size moderate. Emphasize more beans than rice, avoid adding too much wele or shito cooked with heavy oil, and load up on cabbage, lettuce, and diced cucumber instead of gari fortify."
  },
  {
    keywords: ["koobi", "blood pressure", "hypertension", "salty fish"],
    answer: "Individuals with Hypertension should strictly avoid or severely limit Koobi and Momoni. They are heavily cured with rock salt, which drastically raises sodium intake and spikes blood pressure. If you must use them, soak them thoroughly in hot water overnight to extract the salt."
  },
  {
    keywords: ["fufu", "weight loss", "is fufu healthy"],
    answer: "Fufu is very nutrient-dense but exceptionally heavy in carbohydrates. To enjoy fufu on a weight-loss journey, limit your swallow size to the size of your fist, use a lot of lean protein, and fill up on low-oil Light Soup or Garden Egg soup."
  },
  {
    keywords: ["shito", "ulcer", "pepper"],
    answer: "Shito (black pepper sauce) is one of the primary triggers for peptic ulcers due to its heavy red pepper and oil content. It is best to avoid spicy foods entirely during a flare-up and choose bland alternatives like boiled green plantains."
  },
  {
    keywords: ["hypertension", "ghanaian foods", "help", "lower blood pressure"],
    answer: "Excellent Ghanaian foods for hypertension include: Garden Egg Stew (low sodium, high potassium), boiled plantains (rich in potassium), kontomire stew (high magnesium), and Light Soup with minimal salt. Avoid koobi, momoni, and excessive bouillon cubes."
  },
  {
    keywords: ["banku", "kenkey", "diabetics", "better"],
    answer: "Banku is slightly better than Kenkey for diabetics because it's less acidic and has a lower glycemic response. However, both are high-carb foods, so portion control is essential. Always pair with protein-rich soups and vegetables."
  },
  {
    keywords: ["jollof rice", "diet", "weight loss"],
    answer: "Jollof rice can be part of a weight loss diet if prepared mindfully: use minimal oil, add plenty of vegetables like carrots, peas, and bell peppers, control portions to 1 cup, and choose grilled chicken over fried meats."
  },
  {
    keywords: ["snacks", "ulcer", "ulcer patients"],
    answer: "Safe snacks for ulcer patients include: boiled plantains, roasted corn, banana, papaya, oatmeal, and plain crackers. Avoid spicy, acidic, or fried snacks. Eat small portions frequently rather than large meals."
  },
  {
    keywords: ["palm oil", "cholesterol", "affect"],
    answer: "Palm oil is high in saturated fat and can raise LDL cholesterol levels. For heart health, use palm oil sparingly and consider alternatives like olive oil or sunflower oil. Traditional dishes often use excessive amounts - reduce by half for better health."
  },
  {
    keywords: ["groundnuts", "weight loss", "good", "peanuts"],
    answer: "Groundnuts are calorie-dense but nutritious for weight loss when eaten in moderation (small handful daily). They provide protein and healthy fats that increase satiety. Avoid fried groundnuts with salt - choose raw or roasted without added oil."
  },
  {
    keywords: ["instead of fufu", "fufu alternatives", "substitutes"],
    answer: "Great fufu alternatives include: boiled plantains, sweet potato mash, oatmeal swallows, cauliflower rice, or smaller portions of banku/tuo zaafi. These provide similar texture with lower calories and glycemic impact."
  },
  {
    keywords: ["tuo zaafi", "diabetics", "good for"],
    answer: "Tuo Zaafi is generally better for diabetics than fufu because it's made from whole grains and has more fiber. However, portion control remains crucial. Pair with protein-rich soups and limit the quantity to manage blood sugar effectively."
  },
  {
    keywords: ["kontomire", "palava sauce", "health benefits"],
    answer: "Kontomire (palava sauce) is highly nutritious! Rich in iron, vitamins A and C, and antioxidants. It's excellent for anemia, immune support, and overall health. Prepare with minimal palm oil and salt for maximum benefits."
  },
  {
    keywords: ["gari", "diabetes", "can i eat"],
    answer: "Gari has a high glycemic index and can spike blood sugar. If you have diabetes, eat very small portions, soak to reduce starch, and pair with protein-rich soups. Fresh gari is better than fermented versions."
  },
  {
    keywords: ["light soup", "healthy", "benefits"],
    answer: "Light Soup is one of the healthiest Ghanaian soups! It's low-calorie, hydrating, and easily digestible. Rich in vitamins from tomatoes, garden eggs, and vegetables. Perfect for weight loss and general wellness when prepared with minimal salt."
  }
];
