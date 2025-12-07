import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ pagination, currentPage, setCurrentPage, itemsPerPage }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col sm:flex-row items-center justify-between px-8 py-6 border-t-2 border-slate-200 bg-gradient-to-r from-slate-50 to-indigo-50/30 gap-4"
    >
      <p className="text-slate-600 text-sm font-semibold">
        Showing <span className="text-indigo-600 font-black">{(pagination.currentPage - 1) * itemsPerPage + 1}</span>-
        <span className="text-indigo-600 font-black">{Math.min(pagination.currentPage * itemsPerPage, pagination.totalItems)}</span> of 
        <span className="text-indigo-600 font-black"> {pagination.totalItems}</span>
      </p>
      
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-3 bg-white border-2 border-slate-300 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:border-indigo-400 hover:bg-indigo-50 transition-all font-bold shadow-lg text-slate-700"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        
        {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
          let pageNum = i + 1;
          if (pagination.totalPages > 5) {
            if (currentPage <= 3) pageNum = i + 1;
            else if (currentPage >= pagination.totalPages - 2) pageNum = pagination.totalPages - 4 + i;
            else pageNum = currentPage - 2 + i;
          }
          
          return (
            <motion.button
              key={pageNum}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-5 py-3 rounded-xl font-black min-w-[48px] shadow-lg transition-all ${
                currentPage === pageNum 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/50' 
                  : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50'
              }`}
            >
              {pageNum}
            </motion.button>
          );
        })}
        
        <motion.button
          whileHover={{ scale: 1.05, x: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
          disabled={currentPage === pagination.totalPages}
          className="px-4 py-3 bg-white border-2 border-slate-300 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:border-indigo-400 hover:bg-indigo-50 transition-all font-bold shadow-lg text-slate-700"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Pagination;