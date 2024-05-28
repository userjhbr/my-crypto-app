// src/utils.test.js

import { filterCryptoData } from './utils';

test('filterCryptoData should filter data correctly', () => {
  const data = [
    { id: 1, symbol: 'BTC', price_change_percentage_24h: 5, price_change_percentage_7d_in_currency: 8 },
    { id: 2, symbol: 'ETH', price_change_percentage_24h: 3, price_change_percentage_7d_in_currency: 10 },
  ];

  const filteredData = filterCryptoData(data);

  expect(filteredData).toHaveLength(1);
  expect(filteredData[0].id).toBe(2);
});
