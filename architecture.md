# System Architecture Documentation

## 📐 Architecture Overview

The Sales Management System follows a **client-server architecture** with clear separation of concerns between frontend and backend. The system is designed for scalability, maintainability, and performance.

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT TIER                           │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              React Application (Vite)                 │   │
│  │                                                       │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌───────────┐  │   │
│  │  │ Components  │  │   Services   │  │  Utils    │  │   │
│  │  │             │  │              │  │           │  │   │
│  │  │ - Header    │  │ - api.js     │  │ - helpers │  │   │
│  │  │ - Stats     │  │ - axios      │  │           │  │   │
│  │  │ - Filters   │  │              │  │           │  │   │
│  │  │ - Table     │  │              │  │           │  │   │
│  │  │ - Pagination│  │              │  │           │  │   │
│  │  └─────────────┘  └──────────────┘  └───────────┘  │   │
│  │                                                       │   │
│  │              State Management (React Hooks)          │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ↕ HTTP/REST                      │
└─────────────────────────────────────────────────────────────┘
                             ↕ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                       SERVER TIER                            │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Express.js Application                      │   │
│  │                                                       │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────┐│   │
│  │  │ Routes   │→ │Controllers│→ │ Services │→ │Utils││   │
│  │  │          │  │           │  │          │  │     ││   │
│  │  │ /sales   │  │ getSales  │  │ filter() │  │ CSV ││   │
│  │  │ /stats   │  │ getStats  │  │ sort()   │  │Load ││   │
│  │  │ /filter- │  │ getFilter │  │ paginate │  │     ││   │
│  │  │ options  │  │ Options   │  │          │  │     ││   │
│  │  └──────────┘  └──────────┘  └──────────┘  └─────┘│   │
│  │                                                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ↕                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Data Layer (In-Memory)                   │   │
│  │         CSV Data → Parsed Objects → Arrays           │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Backend Architecture

### Layer Structure

The backend follows a **layered architecture** pattern:

```
Request → Routes → Controllers → Services → Utils → Response
```

#### 1. Routes Layer (`routes/`)
**Responsibility**: Define API endpoints and HTTP methods

```javascript
// salesRoutes.js
GET  /api/sales          → getSales()
GET  /api/stats          → getStats()
GET  /api/filter-options → getFilterOptions()
```

**Design Pattern**: Express Router pattern
- Centralizes route definitions
- Enables middleware chaining
- Supports route prefixing

#### 2. Controllers Layer (`controllers/`)
**Responsibility**: Handle HTTP requests and responses

```javascript
// salesController.js
├── getSales()           // Main data retrieval with filters
├── getStats()           // Statistics aggregation
└── getFilterOptions()   // Available filter values
```

**Key Functions**:
- Request validation
- Query parameter parsing
- Response formatting
- Error handling

#### 3. Services Layer (`services/`)
**Responsibility**: Business logic implementation

```javascript
// salesService.js
├── getSalesData()       // Filter, sort, paginate
├── getStatistics()      // Calculate aggregates
└── getFilterOptions()   // Extract unique values
```

**Operations**:
- Data filtering
- Sorting algorithms
- Pagination logic
- Statistical calculations

#### 4. Utils Layer (`utils/`)
**Responsibility**: Helper functions and utilities

```javascript
// dataLoader.js
├── loadSalesData()      // CSV parsing
└── generateMockData()   // Fallback data

// validators.js
└── validateQueryParams() // Input validation
```

---

## 🎨 Frontend Architecture

### Component Hierarchy

```
App.jsx (Root Component)
│
├── AnimatedBackground.jsx (Decorative)
├── Header.jsx
├── StatsGrid.jsx
│   └── StatCard.jsx (x4)
│
├── SearchAndControls.jsx
│   └── FilterPanel.jsx
│       └── FilterSection.jsx (x6)
│
└── DataTable.jsx
    ├── TableHeader.jsx
    ├── TableBody.jsx
    └── Pagination.jsx
```

### State Management

**State Location**: Centralized in `App.jsx`

```javascript
// App.jsx state structure
{
  // Data State
  data: [],                    // Current page data
  stats: {},                   // Statistics
  filterOptions: {},           // Available filters
  
  // UI State
  loading: false,
  error: null,
  showFilters: false,
  
  // Filter State
  filters: {
    customerRegion: [],
    gender: [],
    ageRange: { min: '', max: '' },
    productCategory: [],
    tags: [],
    paymentMethod: [],
    dateRange: { start: '', end: '' }
  },
  
  // Search & Sort State
  searchQuery: '',
  sortBy: 'date-desc',
  
  // Pagination State
  currentPage: 1,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  }
}
```

### Data Flow

```
User Action → State Update → useEffect Trigger → API Call → Response → State Update → Re-render
```

**Example Flow**:
1. User types in search box
2. `setSearchQuery()` updates state
3. `useEffect` detects change
4. API request with new search query
5. Response updates `data` state
6. Components re-render with new data

---

## 🔄 Data Flow Diagram

### Complete Request Flow

```
┌─────────────┐
│   Browser   │
└─────┬───────┘
      │ 1. User enters search query
      ↓
┌─────────────────────────────┐
│  SearchAndControls.jsx      │
│  - Captures input           │
│  - Updates searchQuery state│
└─────┬───────────────────────┘
      │ 2. State change triggers useEffect
      ↓
┌─────────────────────────────┐
│  App.jsx                    │
│  - useEffect detects change │
│  - Prepares query parameters│
└─────┬───────────────────────┘
      │ 3. axios.get() with params
      ↓
┌─────────────────────────────┐
│  Backend API                │
│  http://localhost:5000/api  │
└─────┬───────────────────────┘
      │ 4. Route to controller
      ↓
┌─────────────────────────────┐
│  salesController.getSales() │
│  - Extracts query params    │
│  - Calls service layer      │
└─────┬───────────────────────┘
      │ 5. Business logic
      ↓
┌─────────────────────────────┐
│  salesService.getSalesData()│
│  - Filter data              │
│  - Sort data                │
│  - Paginate results         │
└─────┬───────────────────────┘
      │ 6. Return processed data
      ↓
┌─────────────────────────────┐
│  Response JSON              │
│  {                          │
│    success: true,           │
│    data: [...],             │
│    pagination: {...}        │
│  }                          │
└─────┬───────────────────────┘
      │ 7. Update React state
      ↓
┌─────────────────────────────┐
│  App.jsx                    │
│  - setData(response.data)   │
│  - setPagination(...)       │
└─────┬───────────────────────┘
      │ 8. Trigger re-render
      ↓
┌─────────────────────────────┐
│  DataTable.jsx              │
│  - Renders updated data     │
│  - Shows new results        │
└─────────────────────────────┘
```

---

## 📊 Module Responsibilities

### Backend Modules

#### index.js (Entry Point)
```javascript
Responsibilities:
├── Server initialization
├── Middleware setup (CORS, JSON parsing)
├── Route mounting
├── CSV data loading
├── Error handling
└── Port listening
```

#### controllers/salesController.js
```javascript
Responsibilities:
├── HTTP request handling
├── Query parameter extraction
├── Input validation
├── Service layer invocation
├── Response formatting
└── Error response generation
```

#### services/salesService.js
```javascript
Responsibilities:
├── Data filtering logic
│   ├── Text search
│   ├── Multi-select filters
│   └── Range filters
├── Sorting algorithms
│   ├── Date comparison
│   ├── Numeric sorting
│   └── String comparison
├── Pagination calculation
├── Statistics aggregation
└── Filter option extraction
```

#### utils/dataLoader.js
```javascript
Responsibilities:
├── CSV file reading
├── Stream processing
├── Data parsing
├── Memory management
└── Mock data generation
```

#### utils/validators.js
```javascript
Responsibilities:
├── Query parameter validation
├── Type checking
├── Range validation
└── Error message generation
```

### Frontend Modules

#### App.jsx (Container)
```javascript
Responsibilities:
├── State management
├── API orchestration
├── Effect handling
├── Props distribution
└── Layout composition
```

#### components/Header.jsx
```javascript
Responsibilities:
├── Branding display
├── Status indicator
└── Animation effects
```

#### components/StatsGrid.jsx
```javascript
Responsibilities:
├── Statistics display
├── Card layout
└── Animation coordination
```

#### components/SearchAndControls.jsx
```javascript
Responsibilities:
├── Search input management
├── Filter toggle
├── Sort selection
└── Control layout
```

#### components/FilterPanel.jsx
```javascript
Responsibilities:
├── Filter UI rendering
├── Filter state management
├── Clear filters action
└── Active filter count
```

#### components/DataTable.jsx
```javascript
Responsibilities:
├── Table structure
├── Loading states
├── Error display
├── Empty states
└── Component composition
```

#### components/Pagination.jsx
```javascript
Responsibilities:
├── Page navigation
├── Page number display
├── Item count info
└── Navigation state
```

---

## 🔍 Algorithm Implementations

### Search Algorithm
```javascript
// Case-insensitive substring matching
function search(data, query) {
  const lowerQuery = query.toLowerCase();
  return data.filter(item => 
    item.customerName.toLowerCase().includes(lowerQuery) ||
    item.phoneNumber.toLowerCase().includes(lowerQuery)
  );
}

Time Complexity: O(n × m) where n = data length, m = query length
Space Complexity: O(k) where k = matching items
```

### Filter Algorithm
```javascript
// Multi-criteria filtering
function filter(data, filters) {
  return data.filter(item => {
    // Check each filter category
    if (filters.region.length > 0) {
      if (!filters.region.includes(item.region)) return false;
    }
    
    if (filters.ageMin || filters.ageMax) {
      const age = parseInt(item.age);
      if (age < filters.ageMin || age > filters.ageMax) return false;
    }
    
    // ... other filters
    return true;
  });
}

Time Complexity: O(n × f) where n = data length, f = filter count
Space Complexity: O(k) where k = filtered items
```

### Sort Algorithm
```javascript
// Multi-field sorting
function sort(data, sortBy) {
  return data.sort((a, b) => {
    switch(sortBy) {
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'name-asc':
        return a.customerName.localeCompare(b.customerName);
      // ... other cases
    }
  });
}

Time Complexity: O(n log n) - JavaScript's Timsort
Space Complexity: O(1) - In-place sorting
```

### Pagination Algorithm
```javascript
// Slice-based pagination
function paginate(data, page, limit) {
  const startIndex = (page - 1) × limit;
  const endIndex = startIndex + limit;
  
  return {
    data: data.slice(startIndex, endIndex),
    totalPages: Math.ceil(data.length / limit),
    totalItems: data.length
  };
}

Time Complexity: O(1) for slice operation
Space Complexity: O(m) where m = items per page
```

---

## 🗂️ Folder Structure Rationale

### Backend Structure
```
backend/
├── src/                    # Source code
│   ├── controllers/        # HTTP layer
│   ├── services/           # Business logic
│   ├── utils/              # Helper functions
│   ├── routes/             # API routes
│   └── index.js            # Entry point
├── data/                   # Data files
│   └── sales_data.csv
├── package.json
└── README.md
```

**Design Decisions**:
- Separation of concerns (MVC pattern)
- Scalable structure for growth
- Clear module boundaries
- Easy testing and maintenance

### Frontend Structure
```
frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── AnimatedBackground.jsx
│   │   ├── DataTable.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── Header.jsx
│   │   ├── Pagination.jsx
│   │   └── ...
│   ├── services/           # API calls
│   ├── utils/              # Helper functions
│   ├── App.jsx             # Root component
│   ├── main.jsx            # React entry
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json
└── README.md
```

**Design Decisions**:
- Component-based architecture
- Single responsibility principle
- Reusable components
- Clear separation of concerns

---

## 🚀 Performance Optimizations

### Backend Optimizations
1. **Memory Management**
   - Limited CSV rows (90,000 max)
   - Efficient data structures
   - Stream processing for large files

2. **Query Optimization**
   - Filter before sort
   - Paginate after all operations
   - Avoid unnecessary iterations

3. **Caching Strategy**
   - In-memory data cache
   - Filter options cached
   - Statistics pre-calculated

### Frontend Optimizations
1. **React Optimizations**
   - `useMemo` for expensive calculations
   - Component memoization
   - Lazy loading for large lists

2. **API Optimization**
   - Debounced search (300ms)
   - Request cancellation
   - Progressive loading

3. **Rendering Optimization**
   - Virtual scrolling (if needed)
   - Pagination to limit DOM nodes
   - Conditional rendering

---

## 🔒 Security Considerations

### Backend Security
- CORS configuration
- Input validation
- SQL injection prevention (N/A - no DB)
- Rate limiting (future enhancement)
- Error message sanitization

### Frontend Security
- XSS prevention (React default)
- HTTPS in production
- Environment variable protection
- Secure API endpoints

---

## 📈 Scalability Considerations

### Horizontal Scaling
- Stateless API design
- Load balancer ready
- Session-less architecture

### Vertical Scaling
- Efficient algorithms
- Memory optimization
- Caching strategies

### Future Enhancements
- Database integration (MongoDB/PostgreSQL)
- Redis caching layer
- WebSocket for real-time updates
- Microservices architecture
- CDN for static assets

---

## 🧪 Testing Strategy

### Backend Testing
- Unit tests for services
- Integration tests for controllers
- API endpoint testing
- Mock data testing

### Frontend Testing
- Component unit tests
- Integration tests
- E2E testing with Cypress
- Visual regression testing

---

## 📝 API Design Principles

1. **RESTful Design**: Standard HTTP methods
2. **Consistent Responses**: Uniform JSON structure
3. **Error Handling**: Descriptive error messages
4. **Versioning**: API version in URL (future)
5. **Documentation**: Clear endpoint docs

---

## 🎯 Design Patterns Used

### Backend Patterns
- **MVC Pattern**: Model-View-Controller separation
- **Service Pattern**: Business logic encapsulation
- **Repository Pattern**: Data access abstraction
- **Singleton Pattern**: Single data source

### Frontend Patterns
- **Container/Presentational**: Smart vs. Dumb components
- **Composition**: Component composition over inheritance
- **Custom Hooks**: Reusable stateful logic
- **Render Props**: Flexible component reuse

---


**Version**: 1.0.0  
**Author**: TruEstate Intern Assignment
