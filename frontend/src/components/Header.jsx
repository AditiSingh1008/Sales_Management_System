import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-10"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <motion.div 
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-20 h-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl"
          >
            <BarChart3 className="w-10 h-10 text-white" />
          </motion.div>
          <div>
            <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent leading-tight">
              Sales Analytics
            </h1>
            <p className="text-slate-600 text-lg mt-2 font-medium">
              Comprehensive retail management system
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-xl px-6 py-3 rounded-2xl border border-indigo-200 shadow-lg">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <span className="text-sm font-bold text-slate-700">Live Dashboard</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;