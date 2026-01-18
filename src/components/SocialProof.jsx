import { motion } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";

const testimonials = [
  {
    id: 1,
    name: "Marcus Chen",
    location: "Vancouver, BC",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    rating: 5,
    text: "Best training gear I've owned. The fit is perfect, fabric breathes, and it actually lasts. No BS, just quality.",
    activity: "Crossfit & Running",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    location: "Toronto, ON",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 5,
    text: "Finally found sportswear that doesn't compromise. Comfortable for yoga, tough enough for HIIT. Love the honest approach.",
    activity: "Yoga & HIIT",
  },
  {
    id: 3,
    name: "James Rodriguez",
    location: "Montreal, QC",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 5,
    text: "Been training for 15 years. This is the real deal - performance without the price tag nonsense. Highly recommend.",
    activity: "Weightlifting",
  },
  {
    id: 4,
    name: "Emily Park",
    location: "Calgary, AB",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 5,
    text: "Love that it's locally made and sustainable. The quality speaks for itself. This is my go-to brand now.",
    activity: "Trail Running",
  },
];

const communityImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    alt: "Athletes training with battle ropes",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&h=600&fit=crop",
    alt: "Diverse group of athletes warming up",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    alt: "Runner on mountain trail at sunrise",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop",
    alt: "Group running up mountain trail",
  },
];

export default function SocialProof() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Built by Real Athletes, For Real Athletes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands who've made the switch to honest, performance-driven
            activewear
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                  <p className="text-sm text-blue-600 font-medium">
                    {testimonial.activity}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community Images Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Community in Motion
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {communityImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
              10K+
            </p>
            <p className="text-gray-600 font-medium">Active Athletes</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
              4.9★
            </p>
            <p className="text-gray-600 font-medium">Average Rating</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
              98%
            </p>
            <p className="text-gray-600 font-medium">Would Recommend</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
              100%
            </p>
            <p className="text-gray-600 font-medium">Canadian Made</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
