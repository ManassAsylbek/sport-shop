import { motion, AnimatePresence } from "framer-motion";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import absImage from "../assets/abs.webp";
import crossImage from "../assets/cross.webp";
import yogaImage from "../assets/yoga.webp";

const heroSlides = [
  // {
  //   type: "video",
  //   src: "https://media.istockphoto.com/id/957904486/video/group-of-runners-running-up-the-mountain-slope-on-a-cloudy-day.mp4?s=mp4-640x640-is&k=20&c=vMdQKJR_fLOPqjTSjQvf3bKJMh5LKW4mZvJDqQW2QJs=",
  //   alt: "Group of runners running up the mountain",
  // },
  // {
  //   type: "video",
  //   src: "https://media.istockphoto.com/id/1334147852/video/athletic-girl-doing-exercises-with-battle-ropes-during-her-cross-fitness-workout.mp4?s=mp4-640x640-is&k=20&c=XM_2tLjfUqO8yLJKT0vXZQ6TJx5d8x3Qv0vQqVdQqJs=",
  //   alt: "Athletic girl doing exercises with battle ropes",
  // },
  // {
  //   type: "video",
  //   src: "https://media.istockphoto.com/id/2204447396/video/group-of-multiracial-friends-standing-in-outdoor-gym-looking-at-camera-with-serious.mp4?s=mp4-640x640-is&k=20&c=",
  //   alt: "Multiracial group of athletes in outdoor gym",
  // },
  // {
  //   type: "video",
  //   src: "https://media.istockphoto.com/id/2154940886/video/front-view-of-young-muscular-man-training-with-battle-ropes-in-gym.mp4?s=mp4-640x640-is&k=20&c=",
  //   alt: "Muscular man training with battle ropes",
  // },

  {
    type: "image",
    src: absImage,
    alt: "Athletes running up mountain trail - real people in motion",
  },
  {
    type: "image",
    src: crossImage,
    alt: "Athletes training with battle ropes",
  },
  {
    type: "image",
    src: yogaImage,
    alt: "yoga",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background Image/Video Slider */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10"></div>

        <AnimatePresence mode="wait">
          {heroSlides[currentSlide].type === "image" ? (
            <motion.img
              key={currentSlide}
              src={heroSlides[currentSlide].src}
              alt={heroSlides[currentSlide].alt}
              className="w-full h-full object-cover opacity-80"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          ) : (
            <motion.video
              key={currentSlide}
              src={heroSlides[currentSlide].src}
              className="w-full h-full object-cover opacity-80"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              autoPlay
              muted
              loop
              playsInline
            />
          )}
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Push Your
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Personal Best
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Performance-driven activewear designed for real movement, real
            comfort, and everyday training. Built for those who show up.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="/shop-men"
              className="group relative px-8 py-4 bg-white text-black font-semibold rounded-lg text-lg overflow-hidden transition-all duration-300 hover:scale-105 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Shop Men</span>
              <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>

            <motion.a
              href="/shop-women"
              className="group relative px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg text-lg overflow-hidden transition-all duration-300 hover:scale-105 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Shop Women</span>
              <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </motion.div>
      </div>

      {/* Animated shapes in background */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
}
