import { useState } from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import {
  FunnelIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

const products = [
  {
    id: 1,
    name: "Performance Training T-Shirt",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2787&auto=format&fit=crop",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Grey", "White"],
    activity: "Training",
  },
  {
    id: 2,
    name: "Essential Training Tank",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2787&auto=format&fit=crop",
    category: "Tanks",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Grey", "Navy"],
    activity: "Training",
  },
  {
    id: 3,
    name: "Performance Running Shorts",
    price: 42,
    image:
      "https://images.unsplash.com/photo-1556906781-9cba4a95bc14?q=80&w=2787&auto=format&fit=crop",
    category: "Shorts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Grey"],
    activity: "Running",
  },
  {
    id: 4,
    name: "Training Hoodie Pro",
    price: 68,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2787&auto=format&fit=crop",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Grey", "Charcoal"],
    activity: "Training",
  },
  {
    id: 5,
    name: "Lightweight Running Tee",
    price: 38,
    image:
      "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?q=80&w=2940&auto=format&fit=crop",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Red", "Blue"],
    activity: "Running",
  },
  {
    id: 6,
    name: "Compression Tank Top",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2940&auto=format&fit=crop",
    category: "Tanks",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Grey"],
    activity: "Training",
  },
  {
    id: 7,
    name: "Training Shorts Elite",
    price: 48,
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=2940&auto=format&fit=crop",
    category: "Shorts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Olive", "Grey"],
    activity: "Training",
  },
  {
    id: 8,
    name: "Zip-Up Training Hoodie",
    price: 72,
    image:
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=2787&auto=format&fit=crop",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Grey"],
    activity: "Training",
  },
];

const categories = ["All", "T-Shirts", "Tanks", "Shorts", "Hoodies"];
const activities = ["All", "Training", "Running", "Gym"];

export default function ShopMenPage() {
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
        title="Men's Activewear | Personal Best Sportswear"
        description="Shop men's performance activewear including t-shirts, tanks, shorts, and hoodies. Designed for training, running, and everyday movement."
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Men's Collection
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Built for strength, endurance, and everyday movement. Performance
              gear designed for real training.
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
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-black text-white"
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
                            ? "bg-blue-600 text-white"
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
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
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
                            : color.toLowerCase() === "grey"
                            ? "#808080"
                            : color.toLowerCase() === "charcoal"
                            ? "#36454f"
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
