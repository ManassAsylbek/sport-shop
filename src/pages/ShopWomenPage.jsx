import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import {
  getProductsByCollection,
  getImageUrl,
  getCategories,
} from "../lib/medusa";

function getCategoryFromProduct(product) {
  if (!product.categories || product.categories.length === 0) return "Other";
  return product.categories[0].name;
}

function getPrice(product) {
  const variant = product.variants?.[0];
  if (!variant) return null;
  // 1) calculated_price (when region_id is passed)
  const cp = variant.calculated_price;
  if (cp) {
    const amt = cp.calculated_amount ?? cp.original_amount;
    if (amt != null) return (amt).toFixed(2);
  }
  // 2) prices array — prefer USD
  if (variant.prices?.length) {
    const usd = variant.prices.find((p) => p.currency_code === "usd");
    const pick = usd || variant.prices[0];
    if (pick?.amount != null) return (pick.amount).toFixed(2);
  }
  return null;
}

export default function ShopWomenPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProductsByCollection("womens-collection"), getCategories()])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        const names = ["All", ...categoriesData.map((c) => c.name)];
        setCategories(names);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "All") return true;
    return getCategoryFromProduct(product) === selectedCategory;
  });

  return (
    <>
      <SEO
        title="Women's Activewear | Personal Best Sportswear"
        description="Shop women's performance activewear including sports bras, leggings, tops, and hoodies. Designed for comfort, flexibility, and confidence."
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-900 to-purple-900 text-white pt-28 pb-7">
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
              {/* <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FunnelIcon className="w-5 h-5" />
                <span className="font-medium">Filters</span>
              </button> */}

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
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.a
                key={product.id}
                href={`/product/${product.handle}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 mb-4 aspect-square">
                  {product.thumbnail || product.images?.[0]?.url ? (
                    <img
                      src={getImageUrl(
                        product.thumbnail || product.images[0].url,
                      )}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-400 text-4xl">👗</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                      {product.title}
                    </h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                      {getCategoryFromProduct(product)}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {getPrice(product)
                      ? `$${getPrice(product)}`
                      : "See options"}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}

        {!loading && filteredProducts.length === 0 && (
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
