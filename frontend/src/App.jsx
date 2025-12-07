import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import SearchAndControls from './components/SearchAndControls';
import DataTable from './components/DataTable';
import AnimatedBackground from './components/AnimatedBackground';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const App = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date-desc');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUnits: 0,
    totalAmount: 0,
    uniqueCustomers: 0,
    totalTransactions: 0
  });
  const [filterOptions, setFilterOptions] = useState({
    customerRegion: [],
    gender: [],
    productCategory: [],
    tags: [],
    paymentMethod: []
  });
  const [filters, setFilters] = useState({
    customerRegion: [],
    gender: [],
    ageRange: { min: '', max: '' },
    productCategory: [],
    tags: [],
    paymentMethod: [],
    dateRange: { start: '', end: '' }
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });

  const itemsPerPage = 10;

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get(`${API_URL}/filter-options`);
        if (response.data.success) {
          setFilterOptions(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching filter options:', err);
      }
    };
    fetchFilterOptions();
  }, []);

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_URL}/stats`);
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  // Fetch data with loading animation
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const params = {
          page: currentPage,
          limit: itemsPerPage,
          sortBy: sortBy
        };

        if (searchQuery) params.search = searchQuery;
        if (filters.customerRegion.length > 0) params.customerRegion = filters.customerRegion.join(',');
        if (filters.gender.length > 0) params.gender = filters.gender.join(',');
        if (filters.ageRange.min) params.ageMin = filters.ageRange.min;
        if (filters.ageRange.max) params.ageMax = filters.ageRange.max;
        if (filters.productCategory.length > 0) params.productCategory = filters.productCategory.join(',');
        if (filters.tags.length > 0) params.tags = filters.tags.join(',');
        if (filters.paymentMethod.length > 0) params.paymentMethod = filters.paymentMethod.join(',');
        if (filters.dateRange.start) params.dateStart = filters.dateRange.start;
        if (filters.dateRange.end) params.dateEnd = filters.dateRange.end;

        const response = await axios.get(`${API_URL}/sales`, { params });
        
        if (response.data.success) {
          await new Promise(resolve => setTimeout(resolve, 300));
          setData(response.data.data);
          setPagination(response.data.pagination);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please check if the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, sortBy, searchQuery, filters]);

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const current = prev[category];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      customerRegion: [],
      gender: [],
      ageRange: { min: '', max: '' },
      productCategory: [],
      tags: [],
      paymentMethod: [],
      dateRange: { start: '', end: '' }
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const activeFilterCount = useMemo(() => {
    return filters.customerRegion.length + 
           filters.gender.length + 
           filters.productCategory.length + 
           filters.tags.length + 
           filters.paymentMethod.length +
           (filters.ageRange.min || filters.ageRange.max ? 1 : 0) +
           (filters.dateRange.start || filters.dateRange.end ? 1 : 0);
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 max-w-[1900px] mx-auto px-6 lg:px-10 py-8">
        <Header />
        
        <StatsGrid stats={stats} />

        <SearchAndControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setCurrentPage={setCurrentPage}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          activeFilterCount={activeFilterCount}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filters={filters}
          setFilters={setFilters}
          filterOptions={filterOptions}
          toggleFilter={toggleFilter}
          clearFilters={clearFilters}
        />

        <DataTable
          data={data}
          loading={loading}
          error={error}
          pagination={pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default App;