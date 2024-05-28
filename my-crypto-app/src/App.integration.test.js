import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

test('fetches and displays data from the API', async () => {
  const mockData = {
    data: [
      { id: 'bitcoin', name: 'Bitcoin', price: '40000' },
      { id: 'ethereum', name: 'Ethereum', price: '2500' },
    ],
  };

  axios.get.mockResolvedValueOnce(mockData);

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
  });
});
