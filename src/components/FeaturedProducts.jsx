import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../lib/medusa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function getProductImage(product) {
  if (product.thumbnail) return product.thumbnail;
  if (product.images?.length > 0) return product.images[0].url;
  return null;
}

function getProductPrice(product) {
  const variant = product.variants?.[0];
  if (!variant) return null;
  const cp = variant.calculated_price;
  if (cp) {
    const amt = cp.calculated_amount ?? cp.original_amount;
    if (amt != null) return (amt / 100).toFixed(2);
  }
  if (variant.prices?.length) {
    const usd = variant.prices.find((p) => p.currency_code === "usd");
    const pick = usd || variant.prices[0];
    if (pick?.amount != null) return (pick.amount / 100).toFixed(2);
  }
  return null;
}

function getOriginalPrice(product) {
  const desc = product.description || "";
  const match = desc.match(/[Rr]egular price \$(\d+\.?\d*)/);
  return match ? parseFloat(match[1]).toFixed(2) : null;
}

function getDiscount(product) {
  const subtitle = product.subtitle || "";
  const match = subtitle.match(/(\d+)%/);
  return match ? match[1] : null;
}

export default function FeaturedProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts({ limit: 6 })
      .then((data) => setProducts(data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Designed for movement. Built for performance. Made for you.
          </p>
        </motion.div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl aspect-square mb-4" />
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-5 bg-gray-200 rounded w-1/4" />
              </div>
            ))}
          </div>
        )}

        {/* Products grid */}
        {!loading && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => {
              const image = getProductImage(product);
              const price = getProductPrice(product);
              const originalPrice = getOriginalPrice(product);
              const discount = getDiscount(product);
              const category = product.categories?.[0]?.name;

              return (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/product/${product.handle}`)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-2xl bg-gray-100 mb-4 aspect-square">
                    {image ? (
                      <img
                        src={image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <svg
                          className="w-16 h-16"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                    {/* Discount badge */}
                    {discount && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{discount}%
                      </span>
                    )}

                    {/* Category badge */}
                    {category && (
                      <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                        {category}
                      </span>
                    )}

                    {/* Quick View */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.handle}`);
                      }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-100 whitespace-nowrap"
                    >
                      Quick View
                    </motion.button>
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {price && (
                        <span className="text-xl font-bold text-gray-900">
                          ${price}
                        </span>
                      )}
                      {originalPrice && price && originalPrice !== price && (
                        <span className="text-sm text-gray-400 line-through">
                          ${originalPrice}
                        </span>
                      )}
                      {discount && (
                        <span className="text-sm text-red-500 font-semibold">
                          -{discount}% OFF
                        </span>
                      )}
                    </div>
                    {product.material && (
                      <p className="text-xs text-gray-500">
                        {product.material}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="/shop-men"
            className="inline-block px-8 py-4 bg-black text-white font-semibold rounded-lg text-lg hover:bg-gray-800 transition-colors duration-300"
          >
            View All Products
          </a>
        </motion.div>
      </div>
    </section>
  );
}
