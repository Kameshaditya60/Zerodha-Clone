import axios from 'axios';

const API_URL = 'http://localhost:5000';  /// common url

export const stockService = {
  // Get all stocks for dashboard
  getAllStocks: async () => {
    const response = await axios.get(`${API_URL}/allstocks`);
    console.log(typeof response);
    console.log('allstock response:', response);
    return response.data;
  },

  // Search stocks
  searchStocks: async (query) => {
    const response = await axios.get(`${API_URL}/stocks/search?query=${query}`);
    return response.data;
  },

  // Get single stock
  getStock: async (symbol) => {
    const response = await axios.get(`${API_URL}/stock/${symbol}`);
    return response.data;
  }
};