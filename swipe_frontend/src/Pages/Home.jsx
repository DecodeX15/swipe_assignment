import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

function Home() {
  const navigate = useNavigate();

  // Framer Motion variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Aesthetic: Dark background with subtle star-like speckles (mimicking your image)
  const backgroundStyle = {
    // This is a simple way to create a dark, textured background
    backgroundImage:
      "radial-gradient(ellipse at center, rgba(30, 41, 59, 0.4) 0%, rgba(17, 24, 39, 1) 100%)",
    // Fallback color: bg-gray-900
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center text-white bg-gray-900"
      style={backgroundStyle}
    >
      <motion.div
        className="text-center max-w-4xl p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 1. Main Heading */}
        <motion.h1
          className="text-6xl sm:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 leading-tight"
          variants={itemVariants}
        >
          Automated Data Manager
        </motion.h1>

        {/* 2. Subtitle */}
        <motion.p
          className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Instantly extract, manage, and synchronize data from Invoices,
          Products, and Customers across various file formats.
        </motion.p>

        {/* 3. Key Feature Tags */}
        <motion.div
          className="flex justify-center flex-wrap gap-4 mb-12"
          variants={itemVariants}
        >
          <span className="px-4 py-1 text-sm rounded-full bg-teal-800 text-teal-200 font-medium border border-teal-600 shadow-lg">
            AI-Powered Extraction
          </span>
          <span className="px-4 py-1 text-sm rounded-full bg-blue-800 text-blue-200 font-medium border border-blue-600 shadow-lg">
            Redux Real-Time Sync
          </span>
          <span className="px-4 py-1 text-sm rounded-full bg-purple-800 text-purple-200 font-medium border border-purple-600 shadow-lg">
            Multi-Format Support
          </span>
        </motion.div>

        {/* 4. Get Started Button */}
        <motion.button
          className="px-10 cursor-pointer  py-4 text-xl font-bold rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-2xl shadow-blue-500/50 transform hover:scale-[1.03] active:scale-95 border-2 border-blue-600"
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px rgba(59, 130, 246, 0.7)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/analyse")} // Redirect to /analyse
        >
          Get Started →
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Home;
