import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import FilterPanel from './FilterPanel';

const SearchAndControls = ({
  searchQuery,
  setSearchQuery,
  setCurrentPage,
  showFilters,
  setShowFilters,
  activeFilterCount,
  sortBy,
  setSortBy,
  filters,
  setFilters,
  filterOptions,
  toggleFilter,
  clearFilters
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-white/70 backdrop-blur-2xl border border-slate-200/60 rounded-3xl p-6 lg:p-8 mb-8 shadow-2xl"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400 z-10" />
            <input
              type="text"
              placeholder="Search by customer name or phone number..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="relative w-full pl-14 pr-5 py-4 bg-slate-50/80 border-2 border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-300/50 focus:border-indigo-400 transition-all font-medium"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="relative flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl transition-all shadow-xl font-semibold"
          >
            <Filter className="w-5 h-5" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-7 h-7 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg"
              >
                {activeFilterCount}
              </motion.span>
            )}
          </motion.button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-5 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300/50 cursor-pointer font-semibold shadow-lg"
          >
            <option value="date-desc">⬇️ Newest First</option>
            <option value="date-asc">⬆️ Oldest First</option>
            <option value="quantity-desc">📦 Qty: High → Low</option>
            <option value="quantity-asc">📦 Qty: Low → High</option>
            <option value="name-asc">🔤 Name: A → Z</option>
            <option value="name-desc">🔤 Name: Z → A</option>
          </select>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            filterOptions={filterOptions}
            toggleFilter={toggleFilter}
            clearFilters={clearFilters}
            activeFilterCount={activeFilterCount}
            setCurrentPage={setCurrentPage}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchAndControls;