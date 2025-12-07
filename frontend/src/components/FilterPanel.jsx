import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import FilterSection from './FilterSection';

const FilterPanel = ({
  filters,
  setFilters,
  filterOptions,
  toggleFilter,
  clearFilters,
  activeFilterCount,
  setCurrentPage
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0, marginTop: 0 }}
      animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
      exit={{ opacity: 0, height: 0, marginTop: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="pt-8 border-t-2 border-slate-200 overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FilterSection 
          title="📍 Region" 
          options={filterOptions.customerRegion} 
          selected={filters.customerRegion} 
          onToggle={(v) => toggleFilter('customerRegion', v)} 
        />
        <FilterSection 
          title="👥 Gender" 
          options={filterOptions.gender} 
          selected={filters.gender} 
          onToggle={(v) => toggleFilter('gender', v)} 
        />
        <FilterSection 
          title="📦 Category" 
          options={filterOptions.productCategory} 
          selected={filters.productCategory} 
          onToggle={(v) => toggleFilter('productCategory', v)} 
        />
        <FilterSection 
          title="🏷️ Tags" 
          options={filterOptions.tags.slice(0, 10)} 
          selected={filters.tags} 
          onToggle={(v) => toggleFilter('tags', v)} 
        />
        <FilterSection 
          title="💳 Payment" 
          options={filterOptions.paymentMethod} 
          selected={filters.paymentMethod} 
          onToggle={(v) => toggleFilter('paymentMethod', v)} 
        />
        
        <div>
          <p className="text-slate-800 font-bold mb-4">🎂 Age Range</p>
          <div className="flex gap-3">
            <input 
              type="number" 
              placeholder="Min" 
              value={filters.ageRange.min}
              onChange={(e) => { setFilters(prev => ({ ...prev, ageRange: { ...prev.ageRange, min: e.target.value } })); setCurrentPage(1); }}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300/50"
            />
            <input 
              type="number" 
              placeholder="Max" 
              value={filters.ageRange.max}
              onChange={(e) => { setFilters(prev => ({ ...prev, ageRange: { ...prev.ageRange, max: e.target.value } })); setCurrentPage(1); }}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300/50"
            />
          </div>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={clearFilters}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-xl"
        >
          <X className="w-5 h-5" />
          Clear All Filters ({activeFilterCount})
        </motion.button>
      )}
    </motion.div>
  );
};

export default FilterPanel;