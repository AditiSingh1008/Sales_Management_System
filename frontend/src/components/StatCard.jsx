import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, title, value, subtitle, gradient, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all group"
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div 
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</span>
      </div>
      <motion.p 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2 }}
        className="text-4xl font-black text-slate-800 mb-2"
      >
        {value}
      </motion.p>
      <p className="text-slate-500 font-semibold text-sm">{subtitle}</p>
    </motion.div>
  );
};

export default StatCard;