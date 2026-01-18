import { useState } from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import {
  FunnelIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

const products = [
  {
    id: 101,
    name: "Essential Sports Bra",
    price: 38,
    image:
      "https://images.unsplash.com/photo-1518310952931-b1de897abd40?q=80&w=2940&auto=format&fit=crop",
    category: "Sports Bras",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Rose", "White"],
    activity: "Training",
  },
  {
    id: 102,
    name: "Performance Leggings",
    price: 58,
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=2787&auto=format&fit=crop",
    category: "Leggings",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Burgundy", "Olive"],
    activity: "Training",
  },
  {
    id: 103,
    name: "Crop Training Top",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2820&auto=format&fit=crop",
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Rose", "Mint"],
    activity: "Training",
  },
  {
    id: 104,
    name: "Lightweight Running Tank",
    price: 32,
    image:
      "https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=2787&auto=format&fit=crop",
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Coral", "Teal"],
    activity: "Running",
  },
  {
    id: 105,
    name: "Relaxed Fit Hoodie",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=2787&auto=format&fit=crop",
    category: "Hoodies",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Grey", "Navy", "Cream"],
    activity: "Lifestyle",
  },
  {
    id: 106,
    name: "High-Waist Training Shorts",
    price: 42,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2940&auto=format&fit=crop",
    category: "Shorts",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Sage", "Plum"],
    activity: "Training",
  },
  {
    id: 107,
    name: "Seamless Long Sleeve",
    price: 48,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2940&auto=format&fit=crop",
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Nude", "Forest", "Dusty Pink"],
    activity: "Training",
  },
  {
    id: 108,
    name: "7/8 Length Leggings",
    price: 62,
    image:
      "https://images.unsplash.com/photo-1506634572416-48cdfe530110?q=80&w=2787&auto=format&fit=crop",
    category: "Leggings",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Charcoal", "Teal"],
    activity: "Yoga",
  },
];

const categories = [
  "All",
  "Sports Bras",
  "Leggings",
  "Tops",
  "Hoodies",
  "Shorts",
];
const activities = ["All", "Training", "Running", "Yoga", "Lifestyle"];

export default function ShopWomenPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedActivity, setSelectedActivity] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;
    const activityMatch =
      selectedActivity === "All" || product.activity === selectedActivity;
    return categoryMatch && activityMatch;
  });

  return (
    <>
      <SEO
        title="Women's Activewear | Personal Best Sportswear"
        description="Shop women's performance activewear including sports bras, leggings, tops, and hoodies. Designed for comfort, flexibility, and confidence."
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Women's Collection
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Designed for comfort, flexibility, and confidence. Performance
              wear that moves with you.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FunnelIcon className="w-5 h-5" />
                <span className="font-medium">Filters</span>
              </button>

              {/* Category Tabs */}
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      selectedCategory === category
                        ? "bg-pink-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-gray-600">
              {filteredProducts.length} products
            </div>
          </div>

          {/* Activity Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t"
            >
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <AdjustmentsHorizontalIcon className="w-4 h-4" />
                    Activity Type
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {activities.map((activity) => (
                      <button
                        key={activity}
                        onClick={() => setSelectedActivity(activity)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedActivity === activity
                            ? "bg-pink-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {activity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.a
              key={product.id}
              href={`/product/${product.id}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gray-100 mb-4 aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Quick View */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Quick View
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                    {product.category}
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900">
                  ${product.price}
                </p>
                <div className="flex gap-1">
                  {product.colors.slice(0, 4).map((color, idx) => (
                    <div
                      key={idx}
                      className="w-6 h-6 rounded-full border-2 border-gray-200"
                      style={{
                        backgroundColor:
                          color.toLowerCase() === "white"
                            ? "#ffffff"
                            : color.toLowerCase() === "black"
                            ? "#000000"
                            : color.toLowerCase() === "navy"
                            ? "#001f3f"
                            : color.toLowerCase() === "rose"
                            ? "#ff007f"
                            : color.toLowerCase(),
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              No products found. Try different filters.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
