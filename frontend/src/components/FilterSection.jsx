import React from 'react';
import { motion } from 'framer-motion';

const FilterSection = ({ title, options, selected, onToggle }) => {
  return (
    <div>
      <p className="text-slate-800 font-bold mb-4">{title}</p>
      <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
        {options.map((option, index) => (
          <motion.label 
            key={option}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.02 }}
            whileHover={{ x: 4 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
                className="w-5 h-5 rounded-lg border-2 border-slate-300 bg-white text-indigo-600 focus:ring-4 focus:ring-indigo-200 transition-all cursor-pointer"
              />
            </div>
            <span className="text-slate-700 font-medium group-hover:text-indigo-600 transition-colors truncate">
              {option}
            </span>
          </motion.label>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;