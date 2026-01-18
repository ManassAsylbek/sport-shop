import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const products = [
  {
    id: 1,
    name: "Performance Training T-Shirt",
    price: "$45",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2787&auto=format&fit=crop",
    category: "Men",
  },
  {
    id: 2,
    name: "Essential Sports Bra",
    price: "$38",
    image:
      "https://images.unsplash.com/photo-1518310952931-b1de897abd40?q=80&w=2940&auto=format&fit=crop",
    category: "Women",
  },
  {
    id: 3,
    name: "Training Shorts",
    price: "$42",
    image:
      "https://images.unsplash.com/photo-1556906781-9cba4a95bc14?q=80&w=2787&auto=format&fit=crop",
    category: "Men",
  },
  {
    id: 4,
    name: "Performance Leggings",
    price: "$58",
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=2787&auto=format&fit=crop",
    category: "Women",
  },
  {
    id: 5,
    name: "Training Hoodie",
    price: "$68",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2787&auto=format&fit=crop",
    category: "Men",
  },
  {
    id: 6,
    name: "Athletic Tank Top",
    price: "$35",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2820&auto=format&fit=crop",
    category: "Women",
  },
];

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

export default function FeaturedProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.a
              key={product.id}
              href={`/product/${product.id}`}
              variants={itemVariants}
              className="group cursor-pointer block"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gray-100 mb-4 aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Quick Add Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-100"
                >
                  Quick Add
                </motion.button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900">
                  {product.price}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>

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
