const validateQueryParams = (params) => {
  const errors = [];

  if (params.page && isNaN(parseInt(params.page))) {
    errors.push('Page must be a number');
  }

  if (params.limit && isNaN(parseInt(params.limit))) {
    errors.push('Limit must be a number');
  }

  if (params.ageMin && isNaN(parseInt(params.ageMin))) {
    errors.push('Age min must be a number');
  }

  if (params.ageMax && isNaN(parseInt(params.ageMax))) {
    errors.push('Age max must be a number');
  }

  return errors;
};

module.exports = { validateQueryParams };