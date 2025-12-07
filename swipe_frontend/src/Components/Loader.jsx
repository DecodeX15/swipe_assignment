import React from "react";
import { motion } from "framer-motion";

const EmptyState = ({ heightClass = "min-h-[500px]" }) => {
  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  const iconVariants = {
    hidden: { scale: 0.5, rotate: -15, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 150, delay: 0.2 },
    },
  };
  return (
    <motion.div
      className={`flex flex-col items-center justify-center text-center p-8 text-white ${heightClass}`}
      variants={contentVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.svg
        variants={iconVariants}
        className="w-20 h-20 text-blue-400 mb-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        ></path>
      </motion.svg>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-3xl font-bold text-white mb-2"
      >
        No Data Available
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-xl text-gray-400 max-w-lg"
      >
        Please **upload your files** (PDF, Image, Excel) using the box above to
        begin the analysis and view your extracted data here.
      </motion.p>
    </motion.div>
  );
};
export default EmptyState;
