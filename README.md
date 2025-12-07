# 🚀 Sales Management System

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-lightgrey.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, high-performance Retail Sales Management System with advanced search, filtering, sorting, and pagination capabilities. Built for TruEstate SDE Intern Assignment.

## 🌐 Live Demo

**🎯 [View Live Application](https://sales-management-system-nine-ruby.vercel.app/)**

Experience the full functionality of the Sales Management System with real-time search, advanced filtering, dynamic sorting, and smooth pagination.

---

## ✨ Features

### 🔍 Search
- **Real-time search** across Customer Name and Phone Number
- Case-insensitive search
- Works seamlessly with filters and sorting
- Optimized performance with debouncing

### 🎯 Advanced Filtering
- **Multi-select filters** for:
  - Customer Region
  - Gender
  - Product Category
  - Tags
  - Payment Method
- **Range-based filters** for:
  - Age (Min/Max)
  - Date Range (Start/End)
- Filter combination support
- Active filter count indicator
- One-click filter reset

### 📊 Dynamic Sorting
- Date (Newest First / Oldest First)
- Quantity (High to Low / Low to High)
- Customer Name (A-Z / Z-A)
- Maintains filter and search state

### 📄 Smart Pagination
- 10 items per page
- Next/Previous navigation
- Direct page number selection
- Total items count
- Preserves all active states

### 🎨 Modern UI/UX
- Beautiful gradient backgrounds
- Smooth animations with Framer Motion
- Responsive design (mobile-first)
- Loading states with skeleton screens
- Error handling with user-friendly messages
- Glass-morphism effects
- Interactive hover states

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **CSV Parser** - Data processing
- **CORS** - Cross-origin support

## 📁 Project Structure

```
root/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── salesController.js
│   │   ├── services/
│   │   │   └── salesService.js
│   │   ├── utils/
│   │   │   ├── dataLoader.js
│   │   │   └── validators.js
│   │   ├── routes/
│   │   │   └── salesRoutes.js
│   │   └── index.js
│   ├── data/
│   │   └── sales_data.csv
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnimatedBackground.jsx
│   │   │   ├── DataTable.jsx
│   │   │   ├── FilterPanel.jsx
│   │   │   ├── FilterSection.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── SearchAndControls.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── StatsGrid.jsx
│   │   │   ├── TableBody.jsx
│   │   │   └── TableHeader.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── docs/
│   └── architecture.md
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/sales-management-system.git
cd sales-management-system
```

2. **Setup Backend**
```bash
cd backend
npm install
```

3. **Add CSV Data**
Place your `sales_data.csv` file in `backend/data/` directory

4. **Start Backend Server**
```bash
npm run dev
```
Server runs on `http://localhost:5000`

5. **Setup Frontend** (New Terminal)
```bash
cd frontend
npm install
```

6. **Start Frontend**
```bash
npm run dev
```
Application runs on `http://localhost:3000`

### Environment Variables

Create `.env` file in frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

## 📖 API Documentation

### Endpoints

#### GET `/api/sales`
Retrieve sales data with filters, search, sort, and pagination.

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search query
- `customerRegion` - Comma-separated regions
- `gender` - Comma-separated genders
- `ageMin` - Minimum age
- `ageMax` - Maximum age
- `productCategory` - Comma-separated categories
- `tags` - Comma-separated tags
- `paymentMethod` - Comma-separated payment methods
- `dateStart` - Start date (YYYY-MM-DD)
- `dateEnd` - End date (YYYY-MM-DD)
- `sortBy` - Sort option (date-desc, date-asc, quantity-desc, quantity-asc, name-asc, name-desc)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 100
  }
}
```

#### GET `/api/stats`
Get sales statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUnits": 5000,
    "totalAmount": 1500000,
    "uniqueCustomers": 850,
    "totalTransactions": 1200
  }
}
```

#### GET `/api/filter-options`
Get available filter options.

**Response:**
```json
{
  "success": true,
  "data": {
    "customerRegion": ["North", "South", ...],
    "gender": ["Male", "Female", ...],
    "productCategory": ["Electronics", ...],
    "tags": ["Premium", "Sale", ...],
    "paymentMethod": ["Credit Card", ...]
  }
}
```

## 🎯 Implementation Details

### Search Implementation
- Case-insensitive string matching
- Searches across Customer Name and Phone Number
- Uses JavaScript `toLowerCase()` and `includes()` methods
- Works in combination with all filters

### Filter Implementation
- **Multi-select filters**: Array-based selection with independent state
- **Range filters**: Min/max validation for Age and Date
- All filters work in combination
- State preserved across sorting and pagination

### Sorting Implementation
- Six sort options available
- Uses JavaScript `sort()` with custom comparators
- Date sorting uses `Date` object comparison
- String sorting uses `localeCompare()`
- Maintains all active filters during sort

### Pagination Implementation
- Server-side pagination for performance
- 10 items per page (configurable)
- Smart page number display (shows 5 pages max)
- Preserves search, filter, and sort state
- Next/Previous navigation with disabled states

## 🎨 UI Components

### Header
- Animated logo with rotation on hover
- Gradient text effects
- Live status indicator

### StatsGrid
- Four statistics cards
- Animated number counters
- Icon animations on hover
- Gradient backgrounds

### SearchAndControls
- Real-time search input
- Filter toggle button with counter
- Sort dropdown with emoji indicators
- Responsive layout

### FilterPanel
- Collapsible filter section
- Custom checkbox styling
- Scrollable filter lists
- Age and date range inputs
- Clear all filters button

### DataTable
- Responsive table layout
- Smooth row animations
- Hover effects
- Loading skeleton
- Empty state design

### Pagination
- Current page indicator
- Page range display
- Navigation buttons
- Item count information

## 🔧 Configuration

### Backend Configuration
Edit `backend/src/index.js`:
```javascript
const PORT = process.env.PORT || 5000;
const MAX_ROWS = 90000; // Adjust for memory optimization
```

### Frontend Configuration
Edit `frontend/src/App.jsx`:
```javascript
const itemsPerPage = 10; // Change pagination size
const API_URL = import.meta.env.VITE_API_URL;
```

## 📱 Responsive Design

- **Mobile**: Optimized for phones (320px+)
- **Tablet**: Enhanced layout (768px+)
- **Desktop**: Full features (1024px+)
- **Large Desktop**: Wide layouts (1920px+)

## 🚀 Deployment

### Backend Deployment (Render/Railway/Heroku)
```bash
# Build command
npm install

# Start command
npm start
```

### Frontend Deployment (Vercel/Netlify)
```bash
# Build command
npm run build

# Output directory
dist
```

### Environment Variables for Production
Set `VITE_API_URL` to your backend URL

## 🧪 Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 🐛 Troubleshooting

### Backend not starting
- Check if port 5000 is available
- Ensure CSV file exists in `backend/data/`
- Verify Node.js version (16+)

### Frontend not connecting
- Check VITE_API_URL environment variable
- Ensure backend is running
- Check CORS settings

### CSV loading issues
- Verify CSV format matches expected structure
- Check file encoding (UTF-8 recommended)
- Ensure file size is reasonable (<100MB)

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 👨‍💻 Author

**Your Name**
- GitHub: [@AditiSingh1008](https://github.com/AditiSingh1008)

## 🙏 Acknowledgments

- TruEstate for the assignment opportunity
- React and Express.js communities
- Framer Motion for animations
- Tailwind CSS for styling utilities

## 📞 Support

For issues or questions:
- Open an issue on GitHub

---

**Built with ❤️ for TruEstate SDE Intern Assignment**
