import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from './config';
import './App.css';

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  //const [setLoading] = useState(true);//
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        price_change_percentage: '7d',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1
      }
    })
    .then(response => {
      const filteredData = response.data.filter(coin => {
        const { price_change_percentage_24h, price_change_percentage_7d_in_currency, market_cap_change_24h, symbol } = coin;
        const isBtc = symbol === 'btc';

        if (isBtc && Math.abs(price_change_percentage_24h) > config.btcPercPar) {
          setError('Bitcoin fora do limite.');
          return false;
        }

        return (
          price_change_percentage_24h >= 0 &&
          price_change_percentage_7d_in_currency >= 0 &&
          market_cap_change_24h >= 0 &&
          !(price_change_percentage_24h > 0 && price_change_percentage_7d_in_currency > 0 && market_cap_change_24h > 6 && price_change_percentage_7d_in_currency > 9)
        );
      });

      setCryptoData(filteredData);
      // eslint-disable-next-line no-undef
      //setLoading(false); // Data fetching is complete
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setError('Erro ao buscar dados.');
      // eslint-disable-next-line no-undef
      //setLoading(false); // Data fetching failed
    });
  }, []);

  return (
    <div>
      <h1>Crypto </h1>
      {error && <p>{error}</p>}
      <ul>
        {cryptoData.map(coin => (
          <li key={coin.id}>
            <p>ID: {coin.id}</p>
            <p>Símbolo: <b>{coin.symbol}</b></p>
            <p>Nome: {coin.name}</p>
            <p>valor atual: ${coin.current_price}</p>
            <p>24h %: {coin.price_change_percentage_24h}%</p>
            <p>7d %: {coin.price_change_percentage_7d_in_currency}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;