// Centralized product data
export const menProducts = [
  {
    id: 1,
    name: "Performance Training T-Shirt",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2787&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "Tops",
    description:
      "Engineered for peak performance with moisture-wicking fabric and strategic ventilation zones.",
    colors: ["Black", "Navy", "Grey", "White"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    features: [
      "Quick-dry technology",
      "Anti-odor treatment",
      "Flatlock seams",
      "Reflective details",
    ],
    fabric: "88% Polyester, 12% Spandex",
    care: "Machine wash cold, tumble dry low",
  },
  {
    id: 2,
    name: "Athletic Shorts",
    price: 38,
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=2940&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=2940&auto=format&fit=crop",
    ],
    category: "Bottoms",
    description: "Lightweight and breathable shorts perfect for any workout.",
    colors: ["Black", "Navy", "Grey"],
    sizes: ["S", "M", "L", "XL"],
    features: ["Elastic waistband", "Side pockets", "Moisture-wicking"],
    fabric: "90% Polyester, 10% Spandex",
    care: "Machine wash cold",
  },
  {
    id: 3,
    name: "Compression Long Sleeve",
    price: 52,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2787&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "Tops",
    description:
      "Compression technology for muscle support and enhanced blood circulation during training.",
    colors: ["Black", "Navy", "Grey"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "Compression fit",
      "4-way stretch",
      "Moisture-wicking",
      "Flatlock seams",
    ],
    fabric: "85% Nylon, 15% Spandex",
    care: "Machine wash cold, hang dry",
  },
  {
    id: 4,
    name: "Training Joggers",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=2787&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "Bottoms",
    description:
      "Comfortable joggers designed for warm-ups, cool-downs, and everyday training.",
    colors: ["Black", "Navy", "Grey", "Charcoal"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "Elastic waistband with drawstring",
      "Zippered pockets",
      "Tapered fit",
      "Soft fleece interior",
    ],
    fabric: "80% Cotton, 20% Polyester",
    care: "Machine wash cold, tumble dry low",
  },
  {
    id: 5,
    name: "Performance Tank Top",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2940&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2940&auto=format&fit=crop",
    ],
    category: "Tops",
    description:
      "Lightweight tank top with maximum breathability for hot weather training sessions.",
    colors: ["Black", "Grey", "Navy", "White"],
    sizes: ["S", "M", "L", "XL"],
    features: [
      "Racerback design",
      "Mesh panels",
      "Quick-dry fabric",
      "Anti-odor",
    ],
    fabric: "100% Polyester",
    care: "Machine wash cold, tumble dry low",
  },
  {
    id: 6,
    name: "Training Hoodie",
    price: 75,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2787&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "Outerwear",
    description:
      "Warm and comfortable hoodie perfect for outdoor training in cooler weather.",
    colors: ["Black", "Navy", "Grey", "Charcoal"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "Adjustable hood",
      "Kangaroo pocket",
      "Ribbed cuffs",
      "Soft fleece lining",
    ],
    fabric: "70% Cotton, 30% Polyester",
    care: "Machine wash cold, tumble dry low",
  },
  {
    id: 7,
    name: "Gym Shorts Pro",
    price: 42,
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=2940&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=2940&auto=format&fit=crop",
    ],
    category: "Bottoms",
    description:
      "Professional-grade gym shorts with secure zippered pockets for your essentials.",
    colors: ["Black", "Navy", "Grey"],
    sizes: ["S", "M", "L", "XL"],
    features: [
      "Zippered side pockets",
      "Elastic waistband",
      "Quick-dry fabric",
      "Built-in liner",
    ],
    fabric: "92% Polyester, 8% Spandex",
    care: "Machine wash cold, hang dry",
  },
  {
    id: 8,
    name: "Sport Polo Shirt",
    price: 48,
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2787&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "Tops",
    description:
      "Casual athletic polo shirt combining style with performance features for versatile wear.",
    colors: ["Black", "Navy", "White", "Grey"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "Moisture-wicking",
      "UPF 50+ sun protection",
      "3-button placket",
      "Breathable mesh panels",
    ],
    fabric: "88% Polyester, 12% Spandex",
    care: "Machine wash cold, tumble dry low",
  },
];

export const womenProducts = [
  {
    id: 101,
    name: "Performance Leggings",
    price: 58,
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=2787&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "Bottoms",
    description:
      "High-waisted leggings with compression support for maximum comfort during any workout.",
    colors: ["Black", "Navy", "Purple", "Charcoal"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: [
      "High waistband",
      "Squat-proof fabric",
      "Hidden pocket",
      "4-way stretch",
    ],
    fabric: "80% Nylon, 20% Spandex",
    care: "Machine wash cold, hang dry",
  },
  {
    id: 102,
    name: "Sports Bra Pro",
    price: 42,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2940&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2940&auto=format&fit=crop",
    ],
    category: "Tops",
    description:
      "Maximum support sports bra designed for high-impact activities and intense training.",
    colors: ["Black", "White", "Pink", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: [
      "Adjustable straps",
      "Removable padding",
      "Wide elastic band",
      "Moisture-wicking",
    ],
    fabric: "85% Polyester, 15% Spandex",
    care: "Hand wash recommended",
  },
  {
    id: 103,
    name: "Training Tank",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2787&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "Tops",
    description:
      "Breathable and lightweight tank top perfect for intense training sessions.",
    colors: ["Black", "White", "Grey", "Blue"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: [
      "Racerback design",
      "Loose fit",
      "Breathable mesh panels",
      "Quick-dry",
    ],
    fabric: "100% Polyester",
    care: "Machine wash cold",
  },
  {
    id: 104,
    name: "Yoga Pants",
    price: 62,
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=2787&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "Bottoms",
    description:
      "Ultra-flexible and comfortable pants designed specifically for yoga and pilates.",
    colors: ["Black", "Navy", "Purple", "Grey"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: [
      "4-way stretch",
      "High waistband",
      "Flatlock seams",
      "Soft fabric",
    ],
    fabric: "87% Nylon, 13% Spandex",
    care: "Machine wash cold, hang dry",
  },
  {
    id: 105,
    name: "Crop Top Athletic",
    price: 38,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2787&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "Tops",
    description:
      "Stylish crop top design with high-performance moisture-wicking fabric.",
    colors: ["Black", "White", "Pink", "Grey"],
    sizes: ["XS", "S", "M", "L"],
    features: [
      "Cropped length",
      "Moisture-wicking",
      "Breathable",
      "Stretchy fabric",
    ],
    fabric: "90% Polyester, 10% Spandex",
    care: "Machine wash cold, hang dry",
  },
  {
    id: 106,
    name: "Running Shorts",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2940&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2940&auto=format&fit=crop",
    ],
    category: "Bottoms",
    description:
      "Lightweight running shorts with built-in liner for maximum comfort and freedom of movement.",
    colors: ["Black", "Navy", "Pink", "Grey"],
    sizes: ["XS", "S", "M", "L"],
    features: [
      "Built-in liner",
      "Side pockets",
      "Elastic waistband",
      "Lightweight",
    ],
    fabric: "88% Polyester, 12% Spandex",
    care: "Machine wash cold, tumble dry low",
  },
  {
    id: 107,
    name: "Zip-Up Jacket",
    price: 78,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=2787&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "Outerwear",
    description:
      "Water-resistant athletic jacket perfect for outdoor training in various weather conditions.",
    colors: ["Black", "Navy", "Grey"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: [
      "Water-resistant",
      "Full zip closure",
      "Side pockets",
      "Breathable fabric",
    ],
    fabric: "100% Polyester with DWR coating",
    care: "Machine wash cold, hang dry",
  },
  {
    id: 108,
    name: "Training Set",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=2787&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "Sets",
    description:
      "Matching sports bra and leggings set for a coordinated, stylish training look.",
    colors: ["Black", "Navy", "Purple"],
    sizes: ["XS", "S", "M", "L"],
    features: [
      "Matching top and bottom",
      "High-waisted leggings",
      "Supportive sports bra",
      "Moisture-wicking",
    ],
    fabric: "80% Nylon, 20% Spandex",
    care: "Machine wash cold, hang dry",
  },
];

// Helper function to get product by ID
export const getProductById = (id) => {
  const allProducts = [...menProducts, ...womenProducts];
  return allProducts.find((p) => p.id === parseInt(id));
};

// Featured products for homepage
export const featuredProducts = [
  { ...menProducts[0], formattedPrice: "$45" },
  { ...womenProducts[0], formattedPrice: "$58" },
  { ...menProducts[2], formattedPrice: "$52" },
  { ...womenProducts[1], formattedPrice: "$42" },
];

// Categories
export const menCategories = ["All", "Tops", "Bottoms", "Outerwear"];
export const womenCategories = ["All", "Tops", "Bottoms", "Outerwear", "Sets"];
export const activities = ["Training", "Running", "Yoga", "Gym", "Outdoor"];
