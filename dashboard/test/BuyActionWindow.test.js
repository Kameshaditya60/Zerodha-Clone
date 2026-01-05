import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BuyActionWindow from '../src/components/BuyActionWindow';
import GeneralContext from '../src/components/GeneralContext';

// Mock axios
jest.mock('axios');
const axios = require('axios');

describe('BuyActionWindow Component', () => {

  // Test 1: Component renders with input fields
  test('renders buy window with quantity and price inputs', () => {
    const mockClose = jest.fn();
    
    render(
      <GeneralContext.Provider value={{ closeBuyWindow: mockClose }}>
        <BuyActionWindow uid="INFY" />
      </GeneralContext.Provider>
    );

    expect(screen.getByDisplayValue('1')).toBeInTheDocument(); // Default quantity
    expect(screen.getByRole('button', { name: /buy/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  // Test 2: Cancel button closes window
  test('closing button calls closeBuyWindow', () => {
    const mockClose = jest.fn();
    
    render(
      <GeneralContext.Provider value={{ closeBuyWindow: mockClose }}>
        <BuyActionWindow uid="INFY" />
      </GeneralContext.Provider>
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockClose).toHaveBeenCalled();
  });

  // Test 3: Buy button sends correct data
  test('buy button sends order with correct data', async () => {
    const mockClose = jest.fn();
    axios.post.mockResolvedValue({ data: { success: true } });

    render(
      <GeneralContext.Provider value={{ closeBuyWindow: mockClose }}>
        <BuyActionWindow uid="INFY" />
      </GeneralContext.Provider>
    );

    // Change quantity
    const quantityInput = screen.getByDisplayValue('1');
    fireEvent.change(quantityInput, { target: { value: '5' } });

    // Click buy
    const buyButton = screen.getByRole('button', { name: /buy/i });
    fireEvent.click(buyButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/neworders',
        expect.objectContaining({
          name: 'INFY',
          quantity: '5',
          mode: 'BUY',
        })
      );
    });
  });

  // Test 4: Quantity input updates state
  test('quantity input updates correctly', () => {
    const mockClose = jest.fn();
    
    render(
      <GeneralContext.Provider value={{ closeBuyWindow: mockClose }}>
        <BuyActionWindow uid="INFY" />
      </GeneralContext.Provider>
    );

    const quantityInput = screen.getByDisplayValue('1');
    fireEvent.change(quantityInput, { target: { value: '10' } });

    expect(quantityInput.value).toBe('10');
  });
});
