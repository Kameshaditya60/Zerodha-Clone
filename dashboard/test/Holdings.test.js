// Mock axios FIRST before importing
jest.mock('axios');

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Holdings from '../src/components/Holdings';
import axios from 'axios';


describe('Holdings Component', () => {
  
  // Test 1: Component renders with loading state
  test('shows loading message initially', () => {
    axios.get.mockImplementation(() => new Promise(() => {})); // Never resolves
    render(<Holdings />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  // Test 2: Displays holdings data from API
  test('displays holdings data after fetching', async () => {
    const mockData = [
      { name: 'INFY', quantity: 10, price: 1500 },
      { name: 'TCS', quantity: 5, price: 3500 },
    ];
    
    axios.get.mockResolvedValue({ data: mockData });
    
    render(<Holdings />);
    
    await waitFor(() => {
      expect(screen.getByText('INFY')).toBeInTheDocument();
      expect(screen.getByText('TCS')).toBeInTheDocument();
    });
  });

  // Test 3: Shows error message on API failure
  test('displays error message when API fails', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));
    
    render(<Holdings />);
    
    await waitFor(() => {
      expect(screen.getByText(/error|failed/i)).toBeInTheDocument();
    });
  });

  // Test 4: Table has correct columns
  test('displays correct table headers', async () => {
    const mockData = [{ name: 'INFY', quantity: 10, price: 1500 }];
    axios.get.mockResolvedValue({ data: mockData });
    
    render(<Holdings />);
    
    await waitFor(() => {
      expect(screen.getByText('Symbol')).toBeInTheDocument();
      expect(screen.getByText('Quantity')).toBeInTheDocument();
      expect(screen.getByText('Price')).toBeInTheDocument();
    });
  });
});
