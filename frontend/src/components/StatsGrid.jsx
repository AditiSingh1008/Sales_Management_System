import React from 'react';
import { motion } from 'framer-motion';
import { Package, DollarSign, Users, TrendingUp } from 'lucide-react';
import StatCard from './StatCard';

const StatsGrid = ({ stats }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
    >
      <StatCard
        icon={Package}
        title="Total Units"
        value={stats.totalUnits.toLocaleString()}
        subtitle="Products sold"
        gradient="from-blue-500 to-cyan-500"
        delay={0.1}
      />
      <StatCard
        icon={DollarSign}
        title="Revenue"
        value={`₹${stats.totalAmount.toLocaleString()}`}
        subtitle="Total earnings"
        gradient="from-emerald-500 to-teal-500"
        delay={0.2}
      />
      <StatCard
        icon={Users}
        title="Customers"
        value={stats.uniqueCustomers.toLocaleString()}
        subtitle="Unique buyers"
        gradient="from-purple-500 to-pink-500"
        delay={0.3}
      />
      <StatCard
        icon={TrendingUp}
        title="Transactions"
        value={stats.totalTransactions.toLocaleString()}
        subtitle="Total orders"
        gradient="from-orange-500 to-red-500"
        delay={0.4}
      />
    </motion.div>
  );
};

export default StatsGrid;