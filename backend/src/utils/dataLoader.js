const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const loadSalesData = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    const csvPath = path.join(__dirname, '../../data/sales_data.csv');

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

module.exports = { loadSalesData };