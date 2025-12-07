const salesService = require('../services/salesService');
const { validateQueryParams } = require('../utils/validators');

const getSales = async (req, res) => {
  try {
    const {
      search,
      customerRegion,
      gender,
      ageMin,
      ageMax,
      productCategory,
      tags,
      paymentMethod,
      dateStart,
      dateEnd,
      sortBy,
      page = 1,
      limit = 10
    } = req.query;

    // Validate and parse query parameters
    const filters = {
      search: search || '',
      customerRegion: customerRegion ? customerRegion.split(',') : [],
      gender: gender ? gender.split(',') : [],
      ageMin: ageMin ? parseInt(ageMin) : null,
      ageMax: ageMax ? parseInt(ageMax) : null,
      productCategory: productCategory ? productCategory.split(',') : [],
      tags: tags ? tags.split(',') : [],
      paymentMethod: paymentMethod ? paymentMethod.split(',') : [],
      dateStart: dateStart || null,
      dateEnd: dateEnd || null
    };

    const sort = sortBy || 'date-desc';
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    // Get filtered and paginated data
    const result = await salesService.getSalesData(filters, sort, pageNum, limitNum);

    res.json({
      success: true,
      data: result.data,
      pagination: {
        currentPage: pageNum,
        totalPages: result.totalPages,
        totalItems: result.totalItems,
        itemsPerPage: limitNum
      }
    });
  } catch (error) {
    console.error('Error in getSales:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sales data',
      error: error.message
    });
  }
};

const getStats = async (req, res) => {
  try {
    const stats = await salesService.getStatistics();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error in getStats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};

const getFilterOptions = async (req, res) => {
  try {
    const options = await salesService.getFilterOptions();
    res.json({
      success: true,
      data: options
    });
  } catch (error) {
    console.error('Error in getFilterOptions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching filter options',
      error: error.message
    });
  }
};

module.exports = {
  getSales,
  getStats,
  getFilterOptions
};