# Sales Management System - Frontend

## Overview
Modern, responsive React application with advanced filtering, search, sorting, and pagination capabilities.

## Tech Stack
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React Icons

## Search Implementation
Real-time client-side search using useMemo for performance optimization. Case-insensitive search across customer name and phone number fields.

## Filter Implementation
Multi-select filters with independent state management. Supports:
- Multi-select dropdowns (Region, Gender, Category, Tags, Payment Method)
- Range filters (Age, Date)
- Combinational filtering with preserved state

## Sorting Implementation
Dynamic sorting with 6 options:
- Date (Newest/Oldest)
- Quantity (High-Low/Low-High)
- Customer Name (A-Z/Z-A)

## Pagination Implementation
Client-side pagination with 10 items per page. Smart page number display with preserved filter and search states.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Environment Variables
Create `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

## Features
✅ Beautiful UI with Framer Motion animations
✅ Responsive design (mobile-first)
✅ Real-time search
✅ Advanced multi-select filters
✅ Dynamic sorting
✅ Smart pagination
✅ Loading states & error handling
✅ Accessible components