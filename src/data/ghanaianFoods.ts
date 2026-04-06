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
    answer: "Yes, you can eat Waakye if you have diabetes, but with conditions! Keep the portion size moderate (1 cup). Emphasize more beans than rice for protein and fiber, avoid adding too much wele or shito cooked with heavy oil, and load up on cabbage, lettuce, and diced cucumber instead of gari fortify. The beans provide soluble fiber that slows glucose absorption."
  },
  {
    keywords: ["koobi", "blood pressure", "hypertension", "salty fish"],
    answer: "Individuals with Hypertension should strictly avoid or severely limit Koobi and Momoni. They are heavily cured with rock salt, which drastically raises sodium intake and spikes blood pressure. One small piece can exceed your daily sodium limit. If you must use them, soak them thoroughly in hot water overnight to extract the salt, changing water multiple times."
  },
  {
    keywords: ["fufu", "weight loss", "is fufu healthy"],
    answer: "Fufu is very nutrient-dense but exceptionally heavy in carbohydrates (400 calories per fist-sized portion). To enjoy fufu on a weight-loss journey: limit your swallow size to the size of your fist, use a lot of lean protein (fish/chicken) in your soup, fill up on low-oil Light Soup or Garden Egg soup, and consider alternative swallows like oatmeal or cauliflower mash for lower calories."
  },
  {
    keywords: ["shito", "ulcer", "pepper"],
    answer: "Shito (black pepper sauce) is one of the primary triggers for peptic ulcers due to its heavy red pepper and oil content. Capsaicin in peppers can increase stomach acid production and irritate ulcer lining. It is best to avoid spicy foods entirely during a flare-up and choose bland alternatives like boiled green plantains, plain rice, or steamed fish."
  },
  {
    keywords: ["hypertension", "ghanaian foods", "help", "lower blood pressure"],
    answer: "Excellent Ghanaian foods for hypertension include: Garden Egg Stew (low sodium, high potassium from garden eggs), boiled plantains (rich in potassium - 450mg per medium plantain), kontomire stew (high magnesium and potassium), Light Soup with minimal salt, and beans. These foods provide potassium which helps counteract sodium's effects on blood pressure. Avoid koobi, momoni, and excessive bouillon cubes."
  },
  {
    keywords: ["banku", "kenkey", "diabetics", "better"],
    answer: "Banku is slightly better than Kenkey for diabetics because it's less acidic (fermentation in kenkey creates more acid) and has a lower glycemic response. However, both are high-carb foods (65-70g carbs per serving). For optimal blood sugar control: limit to 1 cup, pair with protein-rich soups, add vegetables, and consider walking 15 minutes after meals to help glucose utilization."
  },
  {
    keywords: ["jollof rice", "diet", "weight loss"],
    answer: "Jollof rice can be part of a weight loss diet if prepared mindfully: use minimal oil (1 tbsp instead of 3), add plenty of vegetables like carrots, peas, and bell peppers (adds fiber and nutrients), control portions to 1 cup, choose grilled chicken over fried meats, and use brown rice instead of white for more fiber. This reduces calories from 450 to about 280 per serving."
  },
  {
    keywords: ["snacks", "ulcer", "ulcer patients"],
    answer: "Safe snacks for ulcer patients include: boiled plantains (alkaline and soothing), roasted corn (low acid), banana (natural antacid), papaya (contains papain enzyme for digestion), oatmeal (coating and soothing), plain crackers, and yogurt (probiotics). Avoid spicy, acidic, or fried snacks. Eat small portions frequently rather than large meals to reduce stomach acid production."
  },
  {
    keywords: ["palm oil", "cholesterol", "affect"],
    answer: "Palm oil is high in saturated fat (50% saturated) and can raise LDL cholesterol levels. For heart health, use palm oil sparingly (max 1 tbsp per meal) and consider alternatives like olive oil or sunflower oil. Traditional dishes often use excessive amounts - reduce by half for better health. Red palm oil does contain vitamin E and beta-carotene, but the saturated fat content outweighs benefits for heart patients."
  },
  {
    keywords: ["groundnuts", "weight loss", "good", "peanuts"],
    answer: "Groundnuts are calorie-dense but nutritious for weight loss when eaten in moderation (small handful daily - about 20 nuts). They provide protein (8g per serving), healthy fats, and fiber that increase satiety. Choose raw or roasted without added oil/salt. The monounsaturated fats can help reduce belly fat when combined with overall calorie deficit. Avoid fried groundnuts which double the calories."
  },
  {
    keywords: ["instead of fufu", "fufu alternatives", "substitutes"],
    answer: "Great fufu alternatives include: boiled plantains (150 calories vs 400 for fufu), sweet potato mash, oatmeal swallows (150 calories), cauliflower rice (25 calories), or smaller portions of banku/tuo zaafi. These provide similar texture with significantly lower calories and glycemic impact. For gradual transition, mix 50% fufu with 50% alternative, then increase alternative ratio over time."
  },
  {
    keywords: ["tuo zaafi", "diabetics", "good for"],
    answer: "Tuo Zaafi is generally better for diabetics than fufu because it's made from whole millet/sorghum grains and has more fiber (3g vs 1g per serving). However, portion control remains crucial - limit to 1.5 cups. Pair with protein-rich soups, add plenty of vegetables, and monitor blood sugar 2 hours after eating. The complex carbs provide slower glucose release than refined cassava fufu."
  },
  {
    keywords: ["kontomire", "palava sauce", "health benefits"],
    answer: "Kontomire (palava sauce) is highly nutritious! Rich in iron (prevents anemia), vitamins A and C (immune support), calcium (bone health), and antioxidants. One cup provides 35% daily iron needs. It's excellent for pregnant women, children, and anemic patients. Prepare with minimal palm oil and salt for maximum benefits. The egusi seeds add protein and healthy fats."
  },
  {
    keywords: ["gari", "diabetes", "can i eat"],
    answer: "Gari has a high glycemic index (70+) and can spike blood sugar rapidly. If you have diabetes: eat very small portions (1/4 cup), soak to reduce starch content, pair with protein-rich soups, choose fresh gari over fermented (less acidic), and always include vegetables. Better alternatives include boiled plantains or brown rice. Monitor glucose 1 hour after eating gari meals."
  },
  {
    keywords: ["light soup", "healthy", "benefits"],
    answer: "Light Soup is one of the healthiest Ghanaian soups! It's low-calorie (140 calories per bowl), hydrating, and easily digestible. Rich in vitamins from tomatoes (lycopene), garden eggs (anthocyanins), ginger (anti-inflammatory), and garlic (allicin). Perfect for weight loss, convalescence, and general wellness. Prepare with minimal salt and no oily additives for maximum benefits."
  },
  {
    keywords: ["meal timing", "when to eat", "diabetes"],
    answer: "For optimal blood sugar control: eat breakfast within 1 hour of waking, space meals 4-5 hours apart, avoid skipping meals, have dinner 3 hours before bedtime, and include protein with every meal. Ghanaian timing: 7am breakfast (oatmeal/boiled plantain), 12pm lunch (moderate waakye), 4pm snack (nuts/fruits), 7pm dinner (light soup with protein). This prevents glucose spikes and crashes."
  },
  {
    keywords: ["portion control", "how much to eat", "guidelines"],
    answer: "Portion control guidelines for Ghanaian foods: Fufu/Banku - fist size only, Rice/Waakye - 1 cup cooked, Soup - 2 ladles, Protein - palm size (fish/chicken), Vegetables - fill half your plate, Oil - 1 tbsp per meal, Plantains - 1 medium, Beans - 1 cup. Use smaller plates, eat slowly, and stop when 80% full. These portions provide adequate nutrition without excess calories."
  },
  {
    keywords: ["hydration", "water intake", "ghanaian climate"],
    answer: "In Ghana's hot climate, aim for 3-4 liters daily. Include: water with lemon slices, coconut water (natural electrolytes), hibiscus tea (sobolo) without sugar, and traditional soups. Avoid sugary drinks and excessive alcohol. Signs of good hydration: clear urine, energy levels, and skin elasticity. Drink 1 glass 30 minutes before meals for better digestion and portion control."
  },
  {
    keywords: ["protein sources", "ghanaian proteins", "vegetarian"],
    answer: "Excellent Ghanaian protein sources: beans (waakye, red red - 15g protein per cup), groundnuts (8g per handful), egusi seeds (27g per 100g), tilapia/croaker fish (25g per 100g), snails (16g per 100g), and crabs. For vegetarians: combine beans with grains for complete protein. Aim for 0.8g protein per kg body weight daily. Traditional combinations like beans and rice provide all essential amino acids."
  },
  {
    keywords: ["fiber intake", "high fiber foods", "ghanaian"],
    answer: "High fiber Ghanaian foods: kontomire (4g per cup), beans (8g per cup), garden eggs (3g per cup), whole grains like millet (6g per cup), boiled plantains (3g per medium), and fruits like mango (3g per cup). Aim for 25-35g fiber daily. Fiber helps control blood sugar, lowers cholesterol, and promotes weight loss. Increase fiber gradually and drink plenty of water to prevent bloating."
  },
  {
    keywords: ["pregnancy nutrition", "pregnant women", "eating for two"],
    answer: "Pregnancy nutrition needs: 300 extra calories daily, focus on iron (kontomire, beans), calcium (milk, fish), folate (leafy greens), and protein (beans, fish). Safe Ghanaian foods: boiled plantains, light soup, kontomire stew, waakye (well-cooked), and fruits. Avoid: raw fish, undercooked eggs, excessive caffeine, and alcohol. Take prenatal vitamins and stay hydrated. Small frequent meals help with morning sickness."
  },
  {
    keywords: ["children nutrition", "kids", "healthy eating"],
    answer: "Children's nutrition needs: balanced meals with protein for growth, carbs for energy, and vitamins for immunity. Healthy Ghanaian options: boiled plantains with groundnut soup, waakye with vegetables, kontomire stew with fish, fruits like bananas and mangoes. Limit sugary snacks and sodas. Make meals colorful and fun. Establish regular eating times and involve children in food preparation for better acceptance."
  },
  {
    keywords: ["elderly nutrition", "seniors", "aging"],
    answer: "Elderly nutrition needs: softer foods, adequate protein to prevent muscle loss, calcium for bone health, and B vitamins. Suitable Ghanaian foods: soft kenkey, light soup with fish, boiled plantains, mashed beans, and kontomire stew (well-cooked). Ensure adequate hydration as thirst sensation decreases with age. Smaller, more frequent meals are easier to digest. Consider vitamin D and B12 supplements after consulting a doctor."
  },
  {
    keywords: ["exercise and diet", "workout nutrition", "ghanaian foods"],
    answer: "Pre-workout: light carbs 1 hour before (boiled plantain, small waakye portion). Post-workout: protein + carbs within 30 minutes (beans with rice, fish with banku). Hydration: water before, during, and after exercise. For weight training: increase protein to 1.6g per kg body weight. Traditional foods like groundnuts and eggs are excellent protein sources. Avoid heavy, oily meals before exercise as they slow digestion."
  },
  {
    keywords: ["food allergies", "intolerances", "ghanaian foods"],
    answer: "Common Ghanaian food allergens: groundnuts (peanuts), seafood (shrimp, crabs), eggs, and gluten (in wheat-based foods). If allergic: substitute groundnuts with tree nuts like cashews, replace seafood with chicken or beans, use egg-free recipes, and choose gluten-free grains like millet or rice. Always read ingredient labels, especially in processed foods. When eating out, clearly communicate allergies to food handlers."
  },
  {
    keywords: ["food safety", "food hygiene", "ghanaian street food"],
    answer: "Food safety tips: Choose hot, freshly cooked foods, avoid raw vegetables in street food, wash hands before eating, drink only bottled or boiled water, avoid ice in drinks from uncertain sources, eat at busy stalls (high turnover), and check food cleanliness. High-risk foods: salads, raw vegetables, and mayonnaise-based dishes. Safe options: hot soups, thoroughly cooked foods, and peeled fruits. Trust your instincts - if in doubt, don't eat it."
  },
  {
    keywords: ["seasonal eating", "best foods", "ghanaian seasons"],
    answer: "Seasonal eating in Ghana: Rainy season (April-October) - enjoy leafy greens (kontomire, garden eggs), tomatoes, and local vegetables. Dry season (November-March) - focus on root vegetables (yams, plantains), stored grains, and dried fish. Eating seasonally ensures better nutrition, lower costs, and supports local farmers. Visit local markets for the freshest seasonal produce and ask vendors what's currently in season."
  },
  {
    keywords: ["budget nutrition", "cheap healthy foods", "affordable"],
    answer: "Budget-friendly nutritious Ghanaian foods: beans (excellent protein, cheap), kontomire leaves (free if you have plants), garden eggs (low cost), local fruits in season, brown rice (buy in bulk), and eggs. Tips: buy from local markets, cook in bulk and freeze, grow your own vegetables, buy seasonal produce, and reduce meat consumption (replace with beans). A healthy Ghanaian diet can cost less than fast food when planned properly."
  },
  {
    keywords: ["meal planning", "weekly menu", "ghanaian diet plan"],
    answer: "Sample weekly Ghanaian meal plan: Monday - Waakye with vegetables, Tuesday - Light soup with fish, Wednesday - Red red with boiled plantains, Thursday - Kontomire stew with rice, Friday - Banku with okro soup, Saturday - Jollof rice with chicken, Sunday - Fufu with light soup. Include snacks like fruits, nuts, and yogurt. Prep ingredients on weekends, cook in bulk, and vary proteins and vegetables throughout the week for balanced nutrition."
  }
];
