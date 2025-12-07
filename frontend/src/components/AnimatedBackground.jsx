import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 via-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
          x: [0, -150, 0],
          y: [0, 150, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-rose-400/20 rounded-full blur-3xl"
      />
    </div>
  );
};

export default AnimatedBackground;