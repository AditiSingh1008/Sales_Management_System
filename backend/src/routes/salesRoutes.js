const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

// Get all sales with filters, search, sort, pagination
router.get('/', salesController.getSales);

// Get sales statistics
router.get('/stats', salesController.getStats);

// Get filter options (unique values for dropdowns)
router.get('/filter-options', salesController.getFilterOptions);

module.exports = router;