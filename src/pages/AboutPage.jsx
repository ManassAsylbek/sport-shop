import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import SEO from "../components/SEO";
import {
  BoltIcon,
  HeartIcon,
  UsersIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const values = [
  {
    icon: BoltIcon,
    title: "Movement First",
    description:
      "Every product is designed with one goal: to move with you, not against you.",
  },
  {
    icon: HeartIcon,
    title: "Honest Quality",
    description:
      "No hype. No shortcuts. Just quality materials and thoughtful design.",
  },
  {
    icon: UsersIcon,
    title: "Community Driven",
    description:
      "Built by real people who train, for real people who show up every day.",
  },
  {
    icon: SparklesIcon,
    title: "Personal Progress",
    description: "It's not about being the best. It's about being YOUR best.",
  },
];

export default function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <>
      <SEO
        title="About Us | Personal Best Sportswear"
        description="Learn about Personal Best Sportswear. Built for those who show up — not to compete with others, but to improve themselves."
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Personal Best Sportswear is built for those who show up — not to
              compete with others, but to improve themselves.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="prose prose-lg max-w-none"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why We Started Personal Best
          </h2>

          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Personal Best Sportswear was born from a blend of passion,
            perseverance, and a lifelong love of sport. While studying building
            engineering, I was also a dedicated long-distance runner and soccer
            player, As an athlete, I was always drawn to clothing that felt
            comfortable, functional, and easy to move in—gear that truly
            supported an active lifestyle.
          </p>

          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            In July 1993, an opportunity arose when a small store in Deep Cove,
            North Vancouver, became available for sale. Originally a children’s
            clothing shop, it came with an affordable lease and ready-made
            fixtures. With limited resources but a clear vision, I shifted the
            focus to sports and activewear. Financing was a challenge, and I
            worked tirelessly, often juggling long hours both in and out of the
            store , to make it work. That marked the beginning of Personal Best
            Sportswear.
          </p>

          <p className="text-xl text-gray-700 leading-relaxed">
            In the early days, we carried well-known brands such as Adidas,
            Puma, and Speedo. Within months, I introduced my own line, starting
            with T-shirts and gradually expanding into hats, water bottles,
            fleece jackets, and popular aerobic wear of the time, including
            leggings and sports bras. For four years, our small shop proudly
            served the community, supporting local races, sponsoring events, and
            sharing the joy and spirit of sport.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed">
            By the late 1990s, the sportswear industry was changing rapidly.
            Large chain retailers expanded across Canada, making it increasingly
            difficult for small independent stores to compete. Although the
            business provided steady income, growth was limited. At the same
            time, I had taken on a demanding role as a project manager
            overseeing the construction of an elementary school. With a heavy
            heart, I made the difficult decision to close the store but I held
            onto the name Personal Best Sportswear and the dream of one day
            bringing it back.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed">
            Today, after more than 40 years of running, 13 marathons, two
            ultramarathons, countless half-marathons, and races of every
            distance, my passion for sport remains as strong as ever. Personal
            Best Sportswear represents a lifelong commitment to movement,
            discipline, and the meditative power of an active lifestyle. It’s my
            way of sharing that dedication with others—and helping you reach
            your own personal best.
          </p>
        </motion.div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-20" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <value.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* What Personal Best Means */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What "Personal Best" Means
          </h2>

          <div className="space-y-6 text-lg text-gray-700">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl">
              <h3 className="font-bold text-xl text-gray-900 mb-3">
                Consistency Over Intensity
              </h3>
              <p>
                It's not about the one workout where you go all out. It's about
                showing up day after day, week after week, building the habit of
                self-improvement.
              </p>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-2xl">
              <h3 className="font-bold text-xl text-gray-900 mb-3">
                Progress, Not Perfection
              </h3>
              <p>
                You don't have to be the fastest, the strongest, or the best in
                the room. You just have to be better than you were yesterday.
              </p>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-gray-50 p-8 rounded-2xl">
              <h3 className="font-bold text-xl text-gray-900 mb-3">
                Movement is Medicine
              </h3>
              <p>
                Whether you're training for performance or just staying active,
                movement matters. And what you wear should support that, not
                distract from it.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=2826&auto=format&fit=crop"
          alt="Community running together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white px-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Join the Movement
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              Do Your Best. Be Your Best. Look Your Best.
            </p>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Go for your Personal Best?
            </h2>
            Explore our collection of performance activewear designed for real
            <p className="text-xl text-gray-300 mb-8">movement.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/shop-men"
                className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Shop Men's
              </a>
              <a
                href="/shop-women"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Shop Women's
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
