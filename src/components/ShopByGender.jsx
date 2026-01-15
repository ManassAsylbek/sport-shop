import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function ShopByGender() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600">
            Performance gear designed specifically for your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Men's Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative overflow-hidden rounded-3xl cursor-pointer h-[600px]"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1605296867424-35fc25c9212a?q=80&w=2940&auto=format&fit=crop"
                alt="Men's Activewear"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            </div>

            <div className="relative h-full flex flex-col justify-end p-10 z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  Men's
                </h3>
                <p className="text-xl text-gray-200 mb-8 max-w-md">
                  Built for strength, endurance, and everyday movement.
                  T-shirts, tanks, shorts, and hoodies designed for performance.
                </p>

                <motion.a
                  href="#men"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-lg text-lg group-hover:bg-blue-500 group-hover:text-white transition-all duration-300"
                  whileHover={{ x: 10 }}
                >
                  <span>Shop Men's</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </motion.a>
              </motion.div>

              {/* Decorative element */}
              <div className="absolute top-10 right-10 w-32 h-32 border-4 border-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          {/* Women's Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative overflow-hidden rounded-3xl cursor-pointer h-[600px]"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2940&auto=format&fit=crop"
                alt="Women's Activewear"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            </div>

            <div className="relative h-full flex flex-col justify-end p-10 z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  Women's
                </h3>
                <p className="text-xl text-gray-200 mb-8 max-w-md">
                  Designed for comfort, flexibility, and confidence. Leggings,
                  tops, sports bras, and layers that move with you.
                </p>

                <motion.a
                  href="#women"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-lg text-lg group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300"
                  whileHover={{ x: 10 }}
                >
                  <span>Shop Women's</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </motion.a>
              </motion.div>

              {/* Decorative element */}
              <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 text-lg">
            All products designed for movement • Breathable fabrics • Free
            shipping over $100
          </p>
        </motion.div>
      </div>
    </section>
  );
}
