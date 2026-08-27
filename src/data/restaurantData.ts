import { MenuItem, Review, SeatingArea } from '../types';

export const RESTAURANT_INFO = {
  name: "L'Aura",
  tagline: "Artisanal Woodfire Kitchen & Wine Bar",
  address: "428 King Street West, Fashion & Theatre District, Toronto, ON",
  phone: "(416) 882-5910",
  email: "reservations@laurarestaurant.com",
  openingHours: [
    { days: "Monday – Thursday", lunch: "11:30 AM – 2:30 PM", dinner: "5:00 PM – 10:30 PM" },
    { days: "Friday – Saturday", lunch: "11:30 AM – 3:00 PM", dinner: "5:00 PM – 11:30 PM" },
    { days: "Sunday", brunch: "10:30 AM – 3:00 PM", dinner: "5:00 PM – 9:30 PM" },
  ],
  chef: {
    name: "Executive Chef Marco Vieri",
    subtitle: "Michelin-trained in Modena & Florence",
    bio: "With over 18 years mastering the alchemy of oak woodfire grilling and slow-fermented heritage grains, Chef Marco curates a seasonal sensory journey rooted in Northern Italian tradition elevated by local sustainable harvest.",
    quote: "Cooking over open wood embers strips away pretension — it demands absolute respect for the raw ingredient and unyielding timing.",
    photo: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80"
  },
  sommelier: {
    name: "Elena Rossi",
    title: "Master Sommelier",
    bio: "Curator of our 450-bottle cellar showcasing biodynamic European estates and rare artisanal vintages."
  },
  awards: [
    "Michelin Guide Recommended 2024 & 2025",
    "OpenTable Diners' Choice Top 50 in Canada",
    "Wine Spectator Best of Award of Excellence",
    "Toronto Life Best New Italian Kitchen"
  ]
};

export const SEATING_AREAS: {
  id: SeatingArea;
  name: string;
  badge: string;
  description: string;
  image: string;
  capacityText: string;
  atmosphere: string;
}[] = [
  {
    id: 'main_dining',
    name: "The Grand Dining Room",
    badge: "Signature Ambiance",
    description: "Vaulted timber ceilings, low-lit warm brass chandeliers, and velvet banquettes centered around our copper bar.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    capacityText: "Tables for 2 to 8 guests",
    atmosphere: "Lively, romantic, sophisticated"
  },
  {
    id: 'garden_patio',
    name: "The Heated Olive Courtyard",
    badge: "Outdoor / Veranda",
    description: "Verdant olive trees, climate-controlled radiant flooring, flickering hearth lanterns, and retractable glass roof.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    capacityText: "Tables for 2 to 6 guests",
    atmosphere: "Intimate, breezy, garden romance"
  },
  {
    id: 'chef_counter',
    name: "Chef’s Hearth Counter",
    badge: "Front-Row Experience",
    description: "Direct seating facing the open 900°F oak woodfire oven and grill. Watch the culinary brigade plate your courses.",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
    capacityText: "Bar-height seating for 1 to 4 guests",
    atmosphere: "Immersive culinary theatre"
  },
  {
    id: 'wine_cellar',
    name: "The Sommelier's Reserve Vault",
    badge: "Exclusive & Quiet",
    description: "Surrounded by brick arches and temperature-controlled vintage cellars. Perfect for private celebrations.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    capacityText: "Semi-private for 4 to 12 guests",
    atmosphere: "Quiet luxury & wine lovers"
  }
];

export const MENU_CATEGORIES = [
  { id: 'all', label: 'Full Menu', icon: 'Sparkles' },
  { id: 'starters', label: 'Antipasti & Crudo', icon: 'Salad' },
  { id: 'pasta', label: 'Handcrafted Pastas', icon: 'UtensilsCrossed' },
  { id: 'pizza', label: 'Woodfired Pizzas', icon: 'Flame' },
  { id: 'mains', label: 'Prime Hearth & Seafood', icon: 'Beef' },
  { id: 'chef-tasting', label: "Chef's Tasting", icon: 'Award' },
  { id: 'desserts', label: 'Dolci & Desserts', icon: 'Cake' },
  { id: 'drinks', label: 'Cocktails & Cellar', icon: 'Wine' }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // Starters
  {
    id: 'starter-1',
    name: "Black Truffle & Fontina Arancini",
    italianName: "Arancini al Tartufo Nero",
    description: "Crispy Carnaroli saffron rice croquettes filled with melted Fontina Val d'Aosta cheese, shaved Umbrian black winter truffle, and roasted garlic aioli.",
    price: 22,
    category: 'starters',
    categoryLabel: 'Antipasti & Crudo',
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80",
    tags: ['Vegetarian', 'Signature', 'Chef Special'],
    calories: 460,
    prepTimeMinutes: 12,
    pairingWine: "Franciacorta Brut DOCG, Lombardy",
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    customizationGroups: [
      {
        title: "Truffle Upgrade",
        options: [
          { name: "Standard Shaved Truffle", price: 0 },
          { name: "Extra Fresh Shaved Black Truffle (+3g)", price: 9 }
        ]
      },
      {
        title: "Dipping Sauce",
        options: [
          { name: "Roasted Garlic Truffle Aioli", price: 0 },
          { name: "San Marzano Spicy Pomodoro", price: 2 },
          { name: "Both Sauces", price: 3 }
        ]
      }
    ]
  },
  {
    id: 'starter-2',
    name: "Heirloom Burrata & Woodfired Figs",
    italianName: "Burrata Pugliese con Fichi Arrostiti",
    description: "Creamy 250g Pugliese burrata, mission figs roasted in oak embers, 24-month aged Prosciutto di Parma, 12-year Modena balsamic drizzle, grilled sourdough.",
    price: 26,
    category: 'starters',
    categoryLabel: 'Antipasti & Crudo',
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=800&q=80",
    tags: ['Signature', 'Woodfired'],
    calories: 520,
    prepTimeMinutes: 10,
    pairingWine: "Vermentino di Sardegna DOC",
    allergens: ['Dairy', 'Gluten'],
    customizationGroups: [
      {
        title: "Prosciutto Selection",
        options: [
          { name: "With 24-Month Prosciutto di Parma", price: 0 },
          { name: "Vegetarian (No Prosciutto, Extra Roasted Pistachios)", price: 0 },
          { name: "Upgrade to Iberico Bellota Ham", price: 8 }
        ]
      },
      {
        title: "Artisanal Bread",
        options: [
          { name: "Grilled Oak-Fired Sourdough", price: 0 },
          { name: "Gluten-Free Warm Focaccia", price: 3 },
          { name: "Extra Bread Basket", price: 4 }
        ]
      }
    ]
  },
  {
    id: 'starter-3',
    name: "Hamachi Crudo & Calabrian Citrus",
    italianName: "Crudo di Ricciola agli Agrumi",
    description: "Sashimi-grade Pacific yellowtail, Sicilian blood orange carpaccio, pickled shallot pearls, cold-pressed green olive oil, crispy capers, and sea salt flakes.",
    price: 25,
    category: 'starters',
    categoryLabel: 'Antipasti & Crudo',
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    tags: ['Gluten-Free', 'Chef Special'],
    calories: 280,
    prepTimeMinutes: 8,
    pairingWine: "Etna Bianco DOC (Carricante)",
    allergens: ['Fish']
  },
  {
    id: 'starter-4',
    name: "Wood-Roasted Bone Marrow & Gremolata",
    italianName: "Midollo di Bue al Forno",
    description: "Split prime beef bone marrow roasted in our 900° oven with fresh parsley lemon gremolata, pickled mustard seeds, and charred brioche points.",
    price: 24,
    category: 'starters',
    categoryLabel: 'Antipasti & Crudo',
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    tags: ['Woodfired'],
    calories: 610,
    prepTimeMinutes: 15,
    pairingWine: "Barolo DOCG, Piedmont",
    allergens: ['Gluten']
  },

  // Pastas
  {
    id: 'pasta-1',
    name: "Handmade Wild Boar Pappardelle",
    italianName: "Pappardelle al Ragù di Cinghiale",
    description: "Silk egg pasta ribbons rolled daily, 14-hour slow-braised wild boar shoulder ragù, rosemary juniper reduction, and freshly grated 36-month Parmigiano-Reggiano.",
    price: 34,
    category: 'pasta',
    categoryLabel: 'Handcrafted Pastas',
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80",
    tags: ['Signature', 'Chef Special'],
    calories: 680,
    prepTimeMinutes: 16,
    pairingWine: "Brunello di Montalcino DOCG 2018",
    allergens: ['Gluten', 'Eggs', 'Dairy'],
    customizationGroups: [
      {
        title: "Parmigiano & Truffle",
        options: [
          { name: "36-Month Parmigiano-Reggiano", price: 0 },
          { name: "Extra Aged Parmigiano Wheel Shaving", price: 3 },
          { name: "Add Fresh Black Winter Truffle", price: 10 }
        ]
      },
      {
        title: "Pasta Preference",
        options: [
          { name: "Classic Silk Egg Ribbon Pasta", price: 0 },
          { name: "Gluten-Free Artisanal Pasta", price: 3 }
        ]
      }
    ]
  },
  {
    id: 'pasta-2',
    name: "Maine Lobster & Saffron Ravioli",
    italianName: "Ravioli d'Aragosta allo Zafferano",
    description: "Delicate pasta pillows filled with sweet Atlantic lobster meat and ricotta, Meyer lemon tarragon bisque, caviar pearls, and butter-poached lobster claw.",
    price: 42,
    category: 'pasta',
    categoryLabel: 'Handcrafted Pastas',
    image: "https://images.unsplash.com/photo-1587740908075-9e245070dfaa?auto=format&fit=crop&w=800&q=80",
    tags: ['Signature', 'Chef Special'],
    calories: 620,
    prepTimeMinutes: 18,
    pairingWine: "Gavi di Gavi DOCG Black Label",
    allergens: ['Shellfish', 'Dairy', 'Gluten', 'Eggs'],
    customizationGroups: [
      {
        title: "Caviar Garnish",
        options: [
          { name: "Standard Kaluga Caviar Pearls", price: 0 },
          { name: "Double Imperial Caviar (+5g)", price: 14 }
        ]
      }
    ]
  },
  {
    id: 'pasta-3',
    name: "Truffled Cacio e Pepe in Pecorino Wheel",
    italianName: "Spaghetti alla Chitarra Cacio e Pepe",
    description: "Hand-cut chitarra spaghetti swirled with toasted crushed Sarawak black peppercorns, 24-month Pecorino Romano DOP, and cultured alpine butter.",
    price: 29,
    category: 'pasta',
    categoryLabel: 'Handcrafted Pastas',
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=80",
    tags: ['Vegetarian', 'Signature'],
    calories: 590,
    prepTimeMinutes: 14,
    pairingWine: "Greco di Tufo DOCG, Campania",
    allergens: ['Dairy', 'Gluten']
  },

  // Pizzas
  {
    id: 'pizza-1',
    name: "Tartufo Bianco & Wild Chanterelle Pizza",
    italianName: "Pizza ai Funghi di Bosco e Tartufo",
    description: "72-hour fermented sourdough crust, Fior di Latte mozzarella, Taleggio cream, sauteed wild chanterelles, fresh thyme, and white truffle essence.",
    price: 31,
    category: 'pizza',
    categoryLabel: 'Woodfired Pizzas',
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    tags: ['Vegetarian', 'Woodfired', 'Signature'],
    calories: 740,
    prepTimeMinutes: 14,
    pairingWine: "Pinot Noir Riserva, Alto Adige",
    allergens: ['Gluten', 'Dairy'],
    customizationGroups: [
      {
        title: "Crust Style",
        options: [
          { name: "Artisanal 72-hr Oak-Fired Crust", price: 0 },
          { name: "Crispy Well-Done Charred Edge", price: 0 },
          { name: "Gluten-Friendly Cauliflower Crust", price: 5 }
        ]
      },
      {
        title: "Extra Toppings",
        options: [
          { name: "No Additional Toppings", price: 0 },
          { name: "Add Shaved Prosciutto San Daniele", price: 6 },
          { name: "Add Fresh Whole Burrata Crown", price: 8 }
        ]
      }
    ]
  },
  {
    id: 'pizza-2',
    name: "Spicy Calabrian Soppressata & Hot Honey",
    italianName: "Pizza Diavola con Miele Piccante",
    description: "San Marzano DOP tomato sauce, spicy hand-cut artisanal soppressata, smoked provolone, Calabrian chili flakes, fresh basil, and wildflower hot honey drizzle.",
    price: 28,
    category: 'pizza',
    categoryLabel: 'Woodfired Pizzas',
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80",
    tags: ['Spicy', 'Woodfired'],
    calories: 790,
    spicyLevel: 2,
    prepTimeMinutes: 12,
    pairingWine: "Chianti Classico Gran Selezione DOCG",
    allergens: ['Gluten', 'Dairy'],
    customizationGroups: [
      {
        title: "Spice Level",
        options: [
          { name: "Medium Kick (Chef Recipe)", price: 0 },
          { name: "Mild (Light Chili)", price: 0 },
          { name: "Extra Fiery (Calabrian Bomb)", price: 2 }
        ]
      }
    ]
  },
  {
    id: 'pizza-3',
    name: "Margherita di Bufala D.O.P.",
    italianName: "Margherita Classica Verace",
    description: "Organic hand-crushed San Marzano tomatoes, Campania water buffalo mozzarella, sweet garden basil, Sicilian sea salt, and Tenuta extra virgin olive oil.",
    price: 24,
    category: 'pizza',
    categoryLabel: 'Woodfired Pizzas',
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80",
    tags: ['Vegetarian', 'Woodfired'],
    calories: 680,
    prepTimeMinutes: 10,
    pairingWine: "Valpolicella Ripasso Superiore",
    allergens: ['Gluten', 'Dairy']
  },

  // Mains
  {
    id: 'main-1',
    name: "45-Day Dry Aged Prime Florentine Ribeye (32oz)",
    italianName: "Bistecca alla Fiorentina al Legno",
    description: "USDA Prime bone-in ribeye dry-aged in our salt chamber, seared over white oak coals, rosemary-infused bone marrow butter, roasted Cipollini onions, sea salt.",
    price: 98,
    category: 'mains',
    categoryLabel: 'Prime Hearth & Seafood',
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    tags: ['Chef Special', 'Woodfired', 'Gluten-Free'],
    calories: 1150,
    prepTimeMinutes: 24,
    pairingWine: "Super Tuscan Ornellaia 2019",
    allergens: ['Dairy'],
    customizationGroups: [
      {
        title: "Cooking Temperature",
        required: true,
        options: [
          { name: "Medium Rare (Recommended by Chef)", price: 0 },
          { name: "Rare (Cool Red Center)", price: 0 },
          { name: "Medium (Warm Pink Center)", price: 0 },
          { name: "Medium Well", price: 0 }
        ]
      },
      {
        title: "Accompanying Hearth Side",
        options: [
          { name: "Wood-Roasted Rosemary Potatoes", price: 0 },
          { name: "Charred Broccolini with Garlic Chili", price: 3 },
          { name: "Truffled Polenta with Taleggio", price: 6 }
        ]
      }
    ]
  },
  {
    id: 'main-2',
    name: "Pan-Roasted Chilean Sea Bass Acqua Pazza",
    italianName: "Spigola Cilena all'Acqua Pazza",
    description: "Sustainably caught sea bass fillet, saffron heirloom cherry tomato broth, castelvetrano olives, caperberries, fennel pollen, and baby zucchini blossoms.",
    price: 48,
    category: 'mains',
    categoryLabel: 'Prime Hearth & Seafood',
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    tags: ['Gluten-Free', 'Chef Special'],
    calories: 520,
    prepTimeMinutes: 18,
    pairingWine: "Lugana Riserva DOC, Lake Garda",
    allergens: ['Fish']
  },
  {
    id: 'main-3',
    name: "Crispy Heritage Duck Breast & Amarena Cherry",
    italianName: "Petto d'Anatra ai Frutti di Bosco",
    description: "Spiced Muscovy duck breast seared crisp, creamy celery root puree, balsamic wild amarena cherry glaze, charred baby leeks, and candied hazelnuts.",
    price: 44,
    category: 'mains',
    categoryLabel: 'Prime Hearth & Seafood',
    image: "https://images.unsplash.com/photo-1514944298352-19e34c9c82c3?auto=format&fit=crop&w=800&q=80",
    tags: ['Gluten-Free'],
    calories: 640,
    prepTimeMinutes: 20,
    pairingWine: "Amarone della Valpolicella Classico",
    allergens: ['Tree Nuts', 'Dairy']
  },

  // Chef Tasting
  {
    id: 'tasting-1',
    name: "Grand Hearth 5-Course Tasting Journey",
    italianName: "Percorso Gastronomico dello Chef",
    description: "Curated multi-course experience featuring Hamachi Crudo, Maine Lobster Ravioli, Dry-Aged Ribeye, Smoked Burrata, and Pistachio Tiramisu with sommelier pairings.",
    price: 135,
    category: 'chef-tasting',
    categoryLabel: "Chef's Tasting",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    tags: ['Chef Special', 'Signature'],
    calories: 1450,
    prepTimeMinutes: 30,
    pairingWine: "Complete 5-Glass Sommelier Wine Flight Available (+ $75)",
    allergens: ['Dairy', 'Gluten', 'Shellfish', 'Fish', 'Eggs'],
    customizationGroups: [
      {
        title: "Wine Pairing Flight",
        options: [
          { name: "No Wine Pairing (Food Only)", price: 0 },
          { name: "Classic Italian Terroir Flight (5 Glasses)", price: 75 },
          { name: "Prestige Vintage Reserve Flight (5 Glasses)", price: 125 }
        ]
      },
      {
        title: "Dietary Adjustments",
        options: [
          { name: "Standard Chef Selection", price: 0 },
          { name: "Pescatarian Adaptation", price: 0 },
          { name: "Gluten-Free Course Substitutions", price: 0 }
        ]
      }
    ]
  },

  // Desserts
  {
    id: 'dessert-1',
    name: "Smoked Bronte Pistachio Tiramisu",
    italianName: "Tiramisù al Pistacchio di Bronte",
    description: "Espresso & dark rum dipped Savoiardi biscuits, Sicilian Bronte pistachio mascarpone mousse, Valrhona dark chocolate dust, tableside smoked with applewood.",
    price: 18,
    category: 'desserts',
    categoryLabel: 'Dolci & Desserts',
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
    tags: ['Vegetarian', 'Signature', 'Chef Special'],
    calories: 480,
    prepTimeMinutes: 8,
    pairingWine: "Passito di Pantelleria DOC",
    allergens: ['Dairy', 'Eggs', 'Gluten', 'Tree Nuts']
  },
  {
    id: 'dessert-2',
    name: "Meyer Lemon & Olive Oil Polenta Cake",
    italianName: "Torta all'Olio d'Oliva e Limone",
    description: "Moist Sicilian olive oil cake with candied citrus peel, rosemary infused honey, and Fior di Latte gelato with crushed toasted pine nuts.",
    price: 16,
    category: 'desserts',
    categoryLabel: 'Dolci & Desserts',
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    tags: ['Vegetarian', 'Gluten-Free'],
    calories: 410,
    prepTimeMinutes: 6,
    pairingWine: "Moscato d'Asti DOCG",
    allergens: ['Dairy', 'Eggs', 'Tree Nuts']
  },
  {
    id: 'dessert-3',
    name: "Dark Chocolate & Smoked Hazelnut Fondant",
    italianName: "Tortino Caldo al Cioccolato e Nocciole",
    description: "Warm molten 70% dark Guanaja chocolate cake with a melting Piedmont hazelnut praline center and vanilla bean bean gelato.",
    price: 19,
    category: 'desserts',
    categoryLabel: 'Dolci & Desserts',
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    tags: ['Vegetarian'],
    calories: 560,
    prepTimeMinutes: 12,
    pairingWine: "Vin Santo del Chianti",
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Tree Nuts']
  },

  // Drinks
  {
    id: 'drink-1',
    name: "Smoked Rosemary & Blood Orange Old Fashioned",
    italianName: "Cocktail L'Aura Antico",
    description: "Woodford Reserve Bourbon, Amaro Nonino, blood orange bitters, charred rosemary sprig cloche-smoked with hickory embers.",
    price: 21,
    category: 'drinks',
    categoryLabel: 'Cocktails & Cellar',
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    tags: ['Signature'],
    prepTimeMinutes: 5
  },
  {
    id: 'drink-2',
    name: "Amalfi Coast Limoncello Spritz",
    italianName: "Spritz della Costiera",
    description: "House-infused organic Amalfi lemon liqueur, Valdobbiadene Prosecco Superiore, sparkling fever-tree soda, fresh mint, and candied lemon rind.",
    price: 19,
    category: 'drinks',
    categoryLabel: 'Cocktails & Cellar',
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    tags: ['Signature', 'Vegan'],
    prepTimeMinutes: 4
  },
  {
    id: 'drink-3',
    name: "Brunello di Montalcino DOCG 2017 (By the Glass)",
    italianName: "Vino Rosso Riserva",
    description: "Intense ruby red, notes of wild dark cherry, leather, cedar, and velvety tannins from Tenuta Caparzo estate.",
    price: 28,
    category: 'drinks',
    categoryLabel: 'Cocktails & Cellar',
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    tags: ['Vegan', 'Chef Special'],
    prepTimeMinutes: 2
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    authorName: "Sarah Jenkins & David Chen",
    authorLocation: "Toronto, ON",
    rating: 5,
    date: "2 days ago",
    title: "An unforgettable anniversary dinner at the Chef's Hearth!",
    comment: "From the moment we stepped into L'Aura, the atmosphere was magical. We sat at the Chef's Hearth counter and watched Chef Marco prepare the Fiorentina steak over open embers. The Black Truffle Arancini and Pistachio Tiramisu are absolute must-orders. Flawless wine recommendations from Elena as well!",
    category: 'Food Quality',
    verifiedDiner: true,
    recommendedDish: "45-Day Dry Aged Prime Florentine Ribeye",
    helpfulCount: 42,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 'rev-2',
    authorName: "Marcello Moretti",
    authorLocation: "Milan & New York",
    rating: 5,
    date: "1 week ago",
    title: "Tastes just like my grandmother's kitchen in Emilia-Romagna.",
    comment: "Being Italian, I am notoriously strict about pasta and woodfire pizza. The Wild Boar Pappardelle pasta had extraordinary bite and depth of flavor, braised to sheer perfection. The wine list has some of the hardest-to-find Brunello vintages in Canada. 10/10.",
    category: 'Food Quality',
    verifiedDiner: true,
    recommendedDish: "Handmade Wild Boar Pappardelle",
    helpfulCount: 38,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 'rev-3',
    authorName: "Dr. Alistair Finch",
    authorLocation: "Oakville, ON",
    rating: 5,
    date: "2 weeks ago",
    title: "World-class online ordering and delivery packaging",
    comment: "We used their online ordering system for a private dinner party at home. Everything arrived hot in eco-friendly insulated packaging with fresh herbs and reheating instructions for the bread. The Tartufo pizza and Lobster Ravioli were still restaurant crisp. Phenomenal execution!",
    category: 'Service',
    verifiedDiner: true,
    recommendedDish: "Tartufo Bianco & Wild Chanterelle Pizza",
    helpfulCount: 29,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 'rev-4',
    authorName: "Elena & Gabriel Vance",
    authorLocation: "Montreal, QC",
    rating: 5,
    date: "3 weeks ago",
    title: "Heated Olive Courtyard patio is the most romantic spot in town",
    comment: "We booked the heated courtyard for a birthday celebration. The radiant heating kept us cozy under the stars while sipping smoked Old Fashioneds. The Chilean Sea Bass was melt-in-your-mouth tender. Service was attentive without being intrusive.",
    category: 'Atmosphere',
    verifiedDiner: true,
    recommendedDish: "Pan-Roasted Chilean Sea Bass Acqua Pazza",
    helpfulCount: 19,
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
  }
];

export const AVAILABLE_TIME_SLOTS = [
  { time: "11:30 AM", period: "Lunch", available: true },
  { time: "12:00 PM", period: "Lunch", available: true },
  { time: "12:30 PM", period: "Lunch", available: true },
  { time: "1:00 PM", period: "Lunch", available: true },
  { time: "1:30 PM", period: "Lunch", available: true },
  { time: "2:00 PM", period: "Lunch", available: false },
  { time: "5:00 PM", period: "Dinner", available: true },
  { time: "5:30 PM", period: "Dinner", available: true },
  { time: "6:00 PM", period: "Dinner", available: true },
  { time: "6:30 PM", period: "Dinner", available: true, popular: true },
  { time: "7:00 PM", period: "Dinner", available: true, popular: true },
  { time: "7:30 PM", period: "Dinner", available: true, popular: true },
  { time: "8:00 PM", period: "Dinner", available: true },
  { time: "8:30 PM", period: "Dinner", available: true },
  { time: "9:00 PM", period: "Dinner", available: true },
  { time: "9:30 PM", period: "Dinner", available: true }
];

export const MENU_ITEMS = INITIAL_MENU_ITEMS;

