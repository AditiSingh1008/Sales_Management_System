import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pagination from './Pagination';

const DataTable = ({
  data,
  loading,
  error,
  pagination,
  currentPage,
  setCurrentPage,
  itemsPerPage
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-white/70 backdrop-blur-2xl border border-slate-200/60 rounded-3xl overflow-hidden shadow-2xl"
    >
      {error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-8 text-center"
        >
          <p className="text-red-600 font-bold text-lg">{error}</p>
        </motion.div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-16 h-16 text-indigo-600" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-slate-600 font-semibold text-lg"
          >
            Loading your data...
          </motion.p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader />
            <TableBody data={data} />
          </table>
        </div>
      )}

      {pagination.totalPages > 1 && !loading && (
        <Pagination
          pagination={pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      )}
    </motion.div>
  );
};

export default DataTable;