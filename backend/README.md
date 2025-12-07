# Sales Management System - Backend

## Overview
RESTful API for the Retail Sales Management System with advanced filtering, sorting, search, and pagination capabilities.

## Tech Stack
- Node.js
- Express.js
- CSV Parser

## Search Implementation
Full-text case-insensitive search across Customer Name and Phone Number fields using JavaScript string methods.

## Filter Implementation
Multi-select filters with independent and combinational support for:
- Customer Region, Gender, Product Category, Tags, Payment Method
- Range-based filters for Age and Date

## Sorting Implementation
Dynamic sorting on Date (newest/oldest), Quantity (high/low), and Customer Name (A-Z/Z-A).

## Pagination Implementation
Server-side pagination with configurable page size (default: 10 items/page).

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Add your CSV file to `data/sales_data.csv`

3. Start the server:
```bash
npm run dev
```

4. Server runs on http://localhost:5000
```

---

## 📁 **Frontend Structure**
```
frontend/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── StatsCards.jsx
│   │   ├── DataTable.jsx
│   │   └── Pagination.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md