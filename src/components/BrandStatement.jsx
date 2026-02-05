import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function BrandStatement() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="pt-24 pb-6 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-relaxed">
            Personal Best Sportswear is built for those who show up — not to
            compete with others, but to improve themselves.
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            Clean design, functional comfort, and performance you can rely on.
            Built by real people who train, for real people who move.
          </p>

          <p className="text-lg text-gray-500 italic">
            Quality materials. Honest pricing. Local values. Sustainable
            choices.
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 h-1 w-32 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"
        />

        {/* Animated Logo */}
        <motion.div
          className="flex justify-center flex-1 lg:flex-1 mt-8"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 20, scale: 0.8 }
          }
          transition={{
            duration: 0.8,
            delay: 0.7,
            type: "spring",
            stiffness: 100,
          }}
        >
          <motion.a
            href="/"
            className="flex items-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src="/logo.png" alt="Personal Best" className="h-52 w-auto" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
