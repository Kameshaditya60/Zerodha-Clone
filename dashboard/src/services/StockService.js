import axios from 'axios';
// require('dotenv').config();

const BACKEND_URL = process.env.BACKEND_URL|| "http://localhost:5000";  /// common url

export const stockService = {
  // Get all stocks for dashboard
  getAllStocks: async () => {
    console.log('Fetching all stocks from backend:', `${BACKEND_URL}/api/stocks/all`);
    const response = await axios.get(`${BACKEND_URL}/api/stocks/all`);
    console.log(typeof response);
    return response.data;
  },

  // Search stocks
  searchStocks: async (query) => {
    const response = await axios.get(`${BACKEND_URL}/stocks/search?query=${query}`);
    return response.data;
  },

  // Get single stock
  getStock: async (symbol) => {
    const response = await axios.get(`${BACKEND_URL}/stocks/${symbol}`);
    return response.data;
  }
};