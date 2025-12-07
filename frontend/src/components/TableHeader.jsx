import React from 'react';
import { motion } from 'framer-motion';

const TableHeader = () => {
  const headers = ['Transaction', 'Date', 'Customer', 'Phone', 'Region', 'Category', 'Qty', 'Amount'];

  return (
    <thead className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
      <tr>
        {headers.map((header, i) => (
          <motion.th 
            key={i}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-wider"
          >
            {header}
          </motion.th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;