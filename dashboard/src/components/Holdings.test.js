jest.mock('axios');

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Holdings from './Holdings';
import axios from 'axios';

describe('Holdings Component', () => {
  
  // Test 1: Component renders without crashing
  test('renders Holdings component', () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<Holdings />);
    expect(screen.getByText(/holdings/i)).toBeInTheDocument();
  });

  // Test 2: Fetches data from API on mount
  test('calls API endpoint on component mount', () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<Holdings />);
    // REACT_APP_BACKEND_URL is unset under Jest, so the fallback kicks in.
    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/api/holdings');
  });

  // Test 3: Displays holdings count after fetching
  test('displays holdings count after fetching data', async () => {
    const mockData = [
      { name: 'INFY', currentPrice: 1500, quantity: 10 },
      { name: 'TCS', currentPrice: 3500, quantity: 5 },
    ];
    
    axios.get.mockResolvedValue({ data: mockData });
    
    render(<Holdings />);
    
    await waitFor(() => {
      expect(screen.getByText(/Holdings \(2\)/i)).toBeInTheDocument();
    });
  });

  // Test 4: Displays stock names from API response
  test('displays stock names in the component', async () => {
    const mockData = [
      { name: 'INFY', currentPrice: 1500, quantity: 10 },
      { name: 'TCS', currentPrice: 3500, quantity: 5 },
    ];
    
    axios.get.mockResolvedValue({ data: mockData });
    
    render(<Holdings />);
    
    await waitFor(() => {
      expect(screen.getByText('INFY')).toBeInTheDocument();
      expect(screen.getByText('TCS')).toBeInTheDocument();
    });
  });

  // Test 5: Handles empty holdings list
  test('displays Holdings (0) when no data is returned', async () => {
    axios.get.mockResolvedValue({ data: [] });
    
    render(<Holdings />);
    
    await waitFor(() => {
      expect(screen.getByText(/Holdings \(0\)/i)).toBeInTheDocument();
    });
  });
});
