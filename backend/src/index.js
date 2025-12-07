// index.js - Sales Backend Server
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

let salesData = [];
const MAX_ROWS = 90000; // Limit to 90K rows for performance
const MOCK_DATA_SIZE = 5000; // Generate 5K mock records as fallback

// Generate mock data if CSV is not available
const generateMockData = () => {
  console.log(`📝 Generating ${MOCK_DATA_SIZE.toLocaleString()} mock records...`);
  const regions = ['North', 'South', 'East', 'West', 'Central'];
  const genders = ['Male', 'Female', 'Other'];
  const categories = ['Clothing', 'Electronics', 'Food', 'Books', 'Sports'];
  const tags = ['Premium', 'Sale', 'New', 'Featured', 'Limited'];
  const paymentMethods = ['Credit Card', 'Debit Card', 'Cash', 'UPI', 'Net Banking'];
  const names = ['Neha Yadav', 'Rahul Kumar', 'Priya Singh', 'Amit Sharma', 'Anjali Verma', 'Vikram Patel', 'Sneha Gupta', 'Rohan Mehta', 'Divya Reddy', 'Arjun Nair', 'Sanya Kapoor', 'Karan Malhotra'];
  
  const mockData = Array.from({ length: MOCK_DATA_SIZE }, (_, i) => ({
    transactionId: `TXN${String(i + 1).padStart(6, '0')}`,
    date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    customerId: `CUST${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`,
    customerName: names[Math.floor(Math.random() * names.length)],
    phoneNumber: `+91 ${String(Math.floor(Math.random() * 10000000000)).padStart(10, '0')}`,
    gender: genders[Math.floor(Math.random() * genders.length)],
    age: Math.floor(Math.random() * 50) + 18,
    customerRegion: regions[Math.floor(Math.random() * regions.length)],
    productCategory: categories[Math.floor(Math.random() * categories.length)],
    tags: tags[Math.floor(Math.random() * tags.length)],
    quantity: Math.floor(Math.random() * 10) + 1,
    totalAmount: Math.floor(Math.random() * 5000) + 500,
    paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
  }));
  
  console.log(`✅ Generated ${mockData.length.toLocaleString()} mock records`);
  return mockData;
};

// Load CSV data with memory limit
const loadData = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    const csvPath = path.join(__dirname, '../data/sales_data.csv');
    
    if (!fs.existsSync(csvPath)) {
      console.log('⚠️  CSV file not found at:', csvPath);
      console.log('💡 Using mock data for testing');
      const mockData = generateMockData();
      return resolve(mockData);
    }

    console.log('📂 Loading data from:', csvPath);
    console.log(`⚡ Memory optimization: Loading first ${MAX_ROWS.toLocaleString()} rows`);
    let rowCount = 0;
    let skippedRows = 0;
    
    let streamClosed = false;
    const stream = fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => {
        if (rowCount < MAX_ROWS) {
          results.push(data);
          rowCount++;
          
          // Show progress
          if (rowCount % 5000 === 0) {
            console.log(`📊 Loaded ${rowCount.toLocaleString()} rows...`);
          }
          
          // Stop at limit
          if (rowCount === MAX_ROWS) {
            console.log(`⚠️  Reached ${MAX_ROWS.toLocaleString()} row limit. Stopping load...`);
            streamClosed = true;
            stream.destroy();
            console.log(`✅ Successfully loaded ${results.length.toLocaleString()} records from CSV`);
            resolve(results);
          }
        }
      })
      .on('end', () => {
        if (!streamClosed) {
          console.log(`✅ Successfully loaded ${results.length.toLocaleString()} records from CSV`);
          resolve(results);
        }
      })
      .on('error', (error) => {
        if (!streamClosed && error.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
          console.error('❌ Error loading CSV:', error.message);
          console.log('⚠️  Falling back to mock data');
          const mockData = generateMockData();
          resolve(mockData);
        }
      });
  });
};

// Initialize data
loadData().then(data => {
  salesData = data;
  console.log(`✅ System ready with ${salesData.length.toLocaleString()} records`);
  console.log(`💾 Memory usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`);
}).catch(err => {
  console.error('Failed to load data:', err);
  salesData = generateMockData();
  console.log(`✅ Using mock data with ${salesData.length.toLocaleString()} records`);
});

// Helper function to get field value
const getField = (item, ...fieldNames) => {
  for (const name of fieldNames) {
    if (item[name] !== undefined && item[name] !== null && item[name] !== '') {
      return String(item[name]).trim();
    }
  }
  return '';
};

// Routes
app.get('/api/sales', (req, res) => {
  try {
    const {
      search, customerRegion, gender, ageMin, ageMax,
      productCategory, tags, paymentMethod, dateStart, dateEnd,
      sortBy, page = 1, limit = 10
    } = req.query;

    let filtered = [...salesData];

    // Search
    if (search) {
      const query = search.toLowerCase().trim();
      filtered = filtered.filter(item => {
        const name = getField(item, 'customerName', 'Customer Name', 'customer_name').toLowerCase();
        const phone = getField(item, 'phoneNumber', 'Phone Number', 'phone_number').toLowerCase();
        return name.includes(query) || phone.includes(query);
      });
    }

    // Filters
    if (customerRegion) {
      const regions = customerRegion.split(',').map(r => r.trim());
      filtered = filtered.filter(item => {
        const region = getField(item, 'customerRegion', 'Customer Region', 'customer_region');
        return regions.includes(region);
      });
    }

    if (gender) {
      const genders = gender.split(',').map(g => g.trim());
      filtered = filtered.filter(item => {
        const itemGender = getField(item, 'gender', 'Gender');
        return genders.includes(itemGender);
      });
    }

    if (ageMin || ageMax) {
      filtered = filtered.filter(item => {
        const age = parseInt(getField(item, 'age', 'Age')) || 0;
        const min = ageMin ? parseInt(ageMin) : 0;
        const max = ageMax ? parseInt(ageMax) : 999;
        return age >= min && age <= max;
      });
    }

    if (productCategory) {
      const categories = productCategory.split(',').map(c => c.trim());
      filtered = filtered.filter(item => {
        const category = getField(item, 'productCategory', 'Product Category', 'product_category');
        return categories.includes(category);
      });
    }

    if (tags) {
      const tagList = tags.split(',').map(t => t.trim());
      filtered = filtered.filter(item => {
        const itemTags = getField(item, 'tags', 'Tags');
        return tagList.includes(itemTags);
      });
    }

    if (paymentMethod) {
      const methods = paymentMethod.split(',').map(m => m.trim());
      filtered = filtered.filter(item => {
        const method = getField(item, 'paymentMethod', 'Payment Method', 'payment_method');
        return methods.includes(method);
      });
    }

    if (dateStart || dateEnd) {
      filtered = filtered.filter(item => {
        const dateStr = getField(item, 'date', 'Date');
        if (!dateStr) return true;
        
        const itemDate = new Date(dateStr);
        const start = dateStart ? new Date(dateStart) : new Date('2000-01-01');
        const end = dateEnd ? new Date(dateEnd) : new Date('2099-12-31');
        return itemDate >= start && itemDate <= end;
      });
    }

    // Sort
    switch (sortBy) {
      case 'date-desc':
        filtered.sort((a, b) => {
          const dateA = new Date(getField(a, 'date', 'Date') || 0);
          const dateB = new Date(getField(b, 'date', 'Date') || 0);
          return dateB - dateA;
        });
        break;
      case 'date-asc':
        filtered.sort((a, b) => {
          const dateA = new Date(getField(a, 'date', 'Date') || 0);
          const dateB = new Date(getField(b, 'date', 'Date') || 0);
          return dateA - dateB;
        });
        break;
      case 'quantity-desc':
        filtered.sort((a, b) => {
          const qtyA = parseInt(getField(a, 'quantity', 'Quantity')) || 0;
          const qtyB = parseInt(getField(b, 'quantity', 'Quantity')) || 0;
          return qtyB - qtyA;
        });
        break;
      case 'quantity-asc':
        filtered.sort((a, b) => {
          const qtyA = parseInt(getField(a, 'quantity', 'Quantity')) || 0;
          const qtyB = parseInt(getField(b, 'quantity', 'Quantity')) || 0;
          return qtyA - qtyB;
        });
        break;
      case 'name-asc':
        filtered.sort((a, b) => {
          const nameA = getField(a, 'customerName', 'Customer Name', 'customer_name');
          const nameB = getField(b, 'customerName', 'Customer Name', 'customer_name');
          return nameA.localeCompare(nameB);
        });
        break;
      case 'name-desc':
        filtered.sort((a, b) => {
          const nameA = getField(a, 'customerName', 'Customer Name', 'customer_name');
          const nameB = getField(b, 'customerName', 'Customer Name', 'customer_name');
          return nameB.localeCompare(nameA);
        });
        break;
      default:
        filtered.sort((a, b) => {
          const dateA = new Date(getField(a, 'date', 'Date') || 0);
          const dateB = new Date(getField(b, 'date', 'Date') || 0);
          return dateB - dateA;
        });
    }

    // Paginate
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const start = (pageNum - 1) * limitNum;
    const paginated = filtered.slice(start, start + limitNum);

    res.json({
      success: true,
      data: paginated,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(filtered.length / limitNum),
        totalItems: filtered.length
      }
    });
  } catch (error) {
    console.error('Error in /api/sales:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sales data',
      error: error.message
    });
  }
});

app.get('/api/stats', (req, res) => {
  try {
    const totalUnits = salesData.reduce((sum, item) => {
      const qty = parseInt(getField(item, 'quantity', 'Quantity')) || 0;
      return sum + qty;
    }, 0);

    const totalAmount = salesData.reduce((sum, item) => {
      const amount = parseFloat(getField(item, 'totalAmount', 'Total Amount', 'total_amount', 'finalAmount', 'Final Amount', 'Final_Amount')) || 0;
      return sum + amount;
    }, 0);

    const uniqueCustomers = new Set(
      salesData.map(item => getField(item, 'customerId', 'Customer ID', 'customer_id', 'Customer_ID'))
        .filter(id => id)
    ).size;

    res.json({
      success: true,
      data: {
        totalUnits,
        totalAmount,
        uniqueCustomers,
        totalTransactions: salesData.length
      }
    });
  } catch (error) {
    console.error('Error in /api/stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

app.get('/api/filter-options', (req, res) => {
  try {
    const regions = [...new Set(
      salesData.map(item => getField(item, 'customerRegion', 'Customer Region', 'customer_region', 'Customer_Region'))
        .filter(Boolean)
    )].sort();

    const genders = [...new Set(
      salesData.map(item => getField(item, 'gender', 'Gender'))
        .filter(Boolean)
    )].sort();

    const categories = [...new Set(
      salesData.map(item => getField(item, 'productCategory', 'Product Category', 'product_category', 'Product_Category'))
        .filter(Boolean)
    )].sort();

    const tagsList = [...new Set(
      salesData.map(item => getField(item, 'tags', 'Tags'))
        .filter(Boolean)
    )].sort();

    const paymentMethods = [...new Set(
      salesData.map(item => getField(item, 'paymentMethod', 'Payment Method', 'payment_method', 'Payment_Method'))
        .filter(Boolean)
    )].sort();

    res.json({
      success: true,
      data: {
        customerRegion: regions,
        gender: genders,
        productCategory: categories,
        tags: tagsList,
        paymentMethod: paymentMethods
      }
    });
  } catch (error) {
    console.error('Error in /api/filter-options:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching filter options',
      error: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    dataLoaded: salesData.length > 0,
    recordCount: salesData.length,
    memoryUsage: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api/sales`);
  console.log(`💚 Health: http://localhost:${PORT}/api/health`);
});
