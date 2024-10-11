import React, { useEffect, useState, useContext } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
    const { coinId } = useParams();
    const [coinData, setCoinData] = useState();
    const [historicalData, setHistoricalData] = useState();
    const { currency } = useContext(CoinContext);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    const fetchCoinData = async () => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-cg-demo-api-key': 'CG-cBqRHmhLj8k6u6Dc8YisnQby',
                },
            });
            const data = await response.json();
            setCoinData(data);
        } catch (err) {
            setError("Failed to fetch coin data");
            console.error(err);
        }
    };

    const fetchHistoricalData = async () => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-cg-demo-api-key': 'CG-cBqRHmhLj8k6u6Dc8YisnQby',
                },
            });
            const data = await response.json();
            setHistoricalData(data);
        } catch (err) {
            setError("Failed to fetch historical data");
            console.error(err);
        } finally {
            setLoading(false); // Set loading to false when done
        }
    };

    useEffect(() => {
        fetchCoinData();
        fetchHistoricalData();
    }, [coinId, currency]); // Trigger on coinId change

    // Show loading spinner
    if (loading) {
        return <div className='spinner'><div className='spin'></div></div>;
    }

    // Show error message
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Ensure coinData and historicalData are available
    if (coinData && historicalData) {
        return (
            <div className='coin'>
                <div className='coin-name'>
                    <img src={coinData?.image?.large} alt="" />
                    <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
                </div>
                <div className='coin-chart'>
                    <LineChart historicalData={historicalData} />
                </div>
                <div className='coin-info'>
                    <ul>
                        <li>Crypto Market Rank</li>
                        <li>{coinData.market_cap_rank}</li>
                    </ul>
                    <ul>
                        <li>Current Price</li>
                        <li>{currency.symbol} {coinData.market_data.current_price[currency.name]?.toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>Market Cap</li>
                        <li>{currency.symbol} {coinData.market_data.market_cap[currency.name]?.toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>24 Hour High</li>
                        <li>{currency.symbol} {coinData.market_data.high_24h[currency.name]?.toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>24 Hour Low</li>
                        <li>{currency.symbol} {coinData.market_data.low_24h[currency.name]?.toLocaleString()}</li>
                    </ul>
                </div>
            </div>
        );
    }

    return null; // Fallback in case of any other unexpected state
};

export default Coin;
