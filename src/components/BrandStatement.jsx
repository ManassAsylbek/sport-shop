import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function BrandStatement() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="py-24 bg-white" ref={ref}>
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

          <p className="text-xl text-gray-600 leading-relaxed">
            Clean design, functional comfort, and performance you can rely on —
            whether you're training, running, or living in motion.
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 h-1 w-32 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"
        />
      </div>
    </section>
  );
}
