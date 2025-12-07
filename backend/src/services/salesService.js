const { loadSalesData } = require('../utils/dataLoader');

let salesData = [];

// Load data on startup
(async () => {
  salesData = await loadSalesData();
  console.log(`✅ Loaded ${salesData.length} sales records`);
})();

const getSalesData = async (filters, sort, page, limit) => {
  let filteredData = [...salesData];

  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredData = filteredData.filter(item =>
      item.customerName.toLowerCase().includes(searchLower) ||
      item.phoneNumber.toLowerCase().includes(searchLower)
    );
  }

  // Apply filters
  if (filters.customerRegion.length > 0) {
    filteredData = filteredData.filter(item =>
      filters.customerRegion.includes(item.customerRegion)
    );
  }

  if (filters.gender.length > 0) {
    filteredData = filteredData.filter(item =>
      filters.gender.includes(item.gender)
    );
  }

  if (filters.ageMin !== null || filters.ageMax !== null) {
    filteredData = filteredData.filter(item => {
      const age = parseInt(item.age);
      const min = filters.ageMin || 0;
      const max = filters.ageMax || 999;
      return age >= min && age <= max;
    });
  }

  if (filters.productCategory.length > 0) {
    filteredData = filteredData.filter(item =>
      filters.productCategory.includes(item.productCategory)
    );
  }

  if (filters.tags.length > 0) {
    filteredData = filteredData.filter(item =>
      filters.tags.includes(item.tags)
    );
  }

  if (filters.paymentMethod.length > 0) {
    filteredData = filteredData.filter(item =>
      filters.paymentMethod.includes(item.paymentMethod)
    );
  }

  if (filters.dateStart || filters.dateEnd) {
    filteredData = filteredData.filter(item => {
      const itemDate = new Date(item.date);
      const start = filters.dateStart ? new Date(filters.dateStart) : new Date('2000-01-01');
      const end = filters.dateEnd ? new Date(filters.dateEnd) : new Date('2099-12-31');
      return itemDate >= start && itemDate <= end;
    });
  }

  // Apply sorting
  switch (sort) {
    case 'date-desc':
      filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'date-asc':
      filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'quantity-desc':
      filteredData.sort((a, b) => parseInt(b.quantity) - parseInt(a.quantity));
      break;
    case 'quantity-asc':
      filteredData.sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity));
      break;
    case 'name-asc':
      filteredData.sort((a, b) => a.customerName.localeCompare(b.customerName));
      break;
    case 'name-desc':
      filteredData.sort((a, b) => b.customerName.localeCompare(a.customerName));
      break;
  }

  // Pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    totalItems,
    totalPages
  };
};

const getStatistics = async () => {
  const totalUnits = salesData.reduce((sum, item) => sum + parseInt(item.quantity), 0);
  const totalAmount = salesData.reduce((sum, item) => sum + parseFloat(item.totalAmount), 0);
  const uniqueCustomers = new Set(salesData.map(item => item.customerId)).size;

  return {
    totalUnits,
    totalAmount,
    uniqueCustomers,
    totalTransactions: salesData.length
  };
};

const getFilterOptions = async () => {
  const regions = [...new Set(salesData.map(item => item.customerRegion))].filter(Boolean);
  const genders = [...new Set(salesData.map(item => item.gender))].filter(Boolean);
  const categories = [...new Set(salesData.map(item => item.productCategory))].filter(Boolean);
  const tags = [...new Set(salesData.map(item => item.tags))].filter(Boolean);
  const paymentMethods = [...new Set(salesData.map(item => item.paymentMethod))].filter(Boolean);

  return {
    customerRegion: regions.sort(),
    gender: genders.sort(),
    productCategory: categories.sort(),
    tags: tags.sort(),
    paymentMethod: paymentMethods.sort()
  };
};

module.exports = {
  getSalesData,
  getStatistics,
  getFilterOptions
};