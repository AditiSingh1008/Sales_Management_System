import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

// Helper function to get field value
const getField = (item, ...fieldNames) => {
  for (const name of fieldNames) {
    if (item[name] !== undefined && item[name] !== null && item[name] !== '') {
      return item[name];
    }
  }
  return '-';
};

const TableBody = ({ data }) => {
  return (
    <tbody className="divide-y divide-slate-200">
      <AnimatePresence mode="popLayout">
        {data.length === 0 ? (
          <tr>
            <td colSpan="8" className="px-6 py-20">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-slate-400" />
                </div>
                <div className="text-center">
                  <p className="text-slate-700 font-bold text-xl mb-1">No transactions found</p>
                  <p className="text-slate-500">Try adjusting your search or filters</p>
                </div>
              </motion.div>
            </td>
          </tr>
        ) : (
          data.map((item, index) => (
            <motion.tr
              key={`${item.transactionId || item['Transaction ID'] || index}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ 
                delay: index * 0.03,
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ 
                backgroundColor: 'rgba(99, 102, 241, 0.05)',
                transition: { duration: 0.2 }
              }}
              className="group cursor-pointer"
            >
              <td className="px-6 py-4 text-sm font-mono font-semibold text-slate-700">
                {getField(item, 'transactionId', 'Transaction ID', 'transaction_id', 'Transaction_ID')}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-slate-700">
                {getField(item, 'date', 'Date')}
              </td>
              <td className="px-6 py-4 text-sm font-bold text-slate-900">
                {getField(item, 'customerName', 'Customer Name', 'customer_name', 'Customer_Name')}
              </td>
              <td className="px-6 py-4 text-sm font-mono text-slate-600">
                {getField(item, 'phoneNumber', 'Phone Number', 'phone_number', 'Phone_Number')}
              </td>
              <td className="px-6 py-4">
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700"
                >
                  {getField(item, 'customerRegion', 'Customer Region', 'customer_region', 'Customer_Region')}
                </motion.span>
              </td>
              <td className="px-6 py-4">
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-block px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold"
                >
                  {getField(item, 'productCategory', 'Product Category', 'product_category', 'Product_Category')}
                </motion.span>
              </td>
              <td className="px-6 py-4 text-sm font-bold text-slate-900">
                {getField(item, 'quantity', 'Quantity')}
              </td>
              <td className="px-6 py-4 text-sm text-emerald-600 font-black">
                ₹{parseFloat(getField(item, 'totalAmount', 'Total Amount', 'total_amount', 'finalAmount', 'Final Amount', 'Final_Amount', '0')).toLocaleString()}
              </td>
            </motion.tr>
          ))
        )}
      </AnimatePresence>
    </tbody>
  );
};

export default TableBody;