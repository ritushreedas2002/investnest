"use client"
// import Highcharts from 'highcharts/highstock';
// import HighchartsReact from 'highcharts-react-official';
// import React, { useEffect, useState } from 'react';

// const StockChart = () => {
//     const [series, setSeries] = useState([]);

//     useEffect(() => {
//         const fetchStockData = async () => {
//             const names = ['MSFT', 'AAPL', 'GOOG'];
//             const requests = names.map(name => fetch(`https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/${name.toLowerCase()}-c.json`)
//                 .then(response => response.json())
//                 .then(data => ({
//                     name,
//                     data
//                 }))
//             );

//             const seriesData = await Promise.all(requests);
//             setSeries(seriesData);
//         };

//         fetchStockData();
//     }, []);

//     const options = {
//         rangeSelector: {
//             selected: 4
//         },
//         yAxis: {
//             labels: {
//                 formatter: function () {
//                     return (this.value > 0 ? ' + ' : '') + this.value + '%';
//                 }
//             },
//             plotLines: [{
//                 value: 0,
//                 width: 2,
//                 color: 'silver'
//             }]
//         },
//         plotOptions: {
//             series: {
//                 compare: 'percent',
//                 showInNavigator: true
//             }
//         },
//         tooltip: {
//             pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
//             valueDecimals: 2,
//             split: true
//         },
//         series
//     };

//     return (
//         <HighchartsReact
//             highcharts={Highcharts}
//             constructorType={'stockChart'}
//             options={options}
//             containerProps={{ style: { height: "400px", minWidth: "310px" } }}
//         />
//     );
// };

// export default StockChart;

// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import React, { useState, useEffect } from 'react';

// const CryptoCompareChart = () => {
//     const [loading, setLoading] = useState(true);
//     const [seriesData, setSeriesData] = useState([]);

//     useEffect(() => {
//         const fetchCryptoData = async () => {
//             const urls = [
//                 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=300&interval=daily',
//                 'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=300&interval=daily'
//             ];

//             const responses = await Promise.all(urls.map(url => fetch(url)));
//             const data = await Promise.all(responses.map(res => res.json()));

//             // Calculate percentage growth from the first data point
//             const calculateGrowth = (prices) => {
//                 const initialPrice = prices[0][1];
//                 return prices.map(price => [price[0], ((price[1] - initialPrice) / initialPrice) * 100]);
//             };

//             const bitcoinGrowth = calculateGrowth(data[0].prices);
//             const ethereumGrowth = calculateGrowth(data[1].prices);

//             setSeriesData([
//                 { name: 'Bitcoin', data: bitcoinGrowth },
//                 { name: 'Ethereum', data: ethereumGrowth }
//             ]);
//             setLoading(false);
//         };

//         fetchCryptoData();
//     }, []);

//     if (loading) return <div>Loading...</div>;

//     const options = {
//         chart: {
//             type: 'line'
//         },
//         title: {
//             text: 'Bitcoin vs Ethereum Growth Percentage Over Time'
//         },
//         xAxis: {
//             type: 'datetime',
//             title: {
//                 text: 'Date'
//             }
//         },
//         yAxis: {
//             title: {
//                 text: 'Growth Percentage (%)'
//             }
//         },
//         tooltip: {
//             valueSuffix: '%'
//         },
//         series: seriesData
//     };

//     return (
//         <HighchartsReact
//             highcharts={Highcharts}
//             options={options}
//         />
//     );
// };

// export default CryptoCompareChart;


import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CryptoCompareChart = () => {
    const [coins, setCoins] = useState({ coin1: 'bitcoin', coin2: 'ethereum' });
    const [seriesData, setSeriesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    // Available coins for selection
    const availableCoins = ['bitcoin', 'ethereum', 'ripple', 'litecoin'];

    useEffect(() => {
        if (!cooldown) {
            setLoading(true);
            const fetchCryptoData = async () => {
                const responses = await Promise.all([
                    fetch(`https://api.coingecko.com/api/v3/coins/${coins.coin1}/market_chart?vs_currency=usd&days=1&interval=minute`),
                    fetch(`https://api.coingecko.com/api/v3/coins/${coins.coin2}/market_chart?vs_currency=usd&days=1&interval=minute`)
                ]);
                const data = await Promise.all(responses.map(res => res.json()));
                
                const formattedSeriesData = data.map((d, index) => {
                    const initialPrice = d.prices[0][1] || 10;
                    return {
                        name: index === 0 ? coins.coin1 : coins.coin2,
                        data: d.prices.map(price => [price[0], ((price[1] - initialPrice) / initialPrice) * 100])
                    };
                });
                
                setSeriesData(formattedSeriesData);
                setLoading(false);
                setLastUpdated(Date.now());
                setCooldown(true);
                setTimeout(() => setCooldown(false), 60000); // Cooldown of 60 seconds
            };

            fetchCryptoData();
        }
    }, [coins, cooldown]);

    const handleChange = (coin, value) => {
        if (!cooldown && coins[coin] !== value) {
            setCoins(prev => ({ ...prev, [coin]: value }));
        }
    };

    if (loading) return <div>Loading chart data...</div>;

    const options = {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Cryptocurrency Growth Percentage Comparison'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Time'
            }
        },
        yAxis: {
            title: {
                text: 'Growth Percentage (%)'
            },
            labels: {
                format: '{value}%'
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: seriesData
    };

    return (
        <div className="ml-44">
            <div>
                <label>Coin 1: </label>
                <select value={coins.coin1} onChange={e => handleChange('coin1', e.target.value)}>
                    {availableCoins.map(coin => (
                        <option key={coin} value={coin}>{coin.charAt(0).toUpperCase() + coin.slice(1)}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Coin 2: </label>
                <select value={coins.coin2} onChange={e => handleChange('coin2', e.target.value)}>
                    {availableCoins.map(coin => (
                        <option key={coin} value={coin}>{coin.charAt(0).toUpperCase() + coin.slice(1)}</option>
                    ))}
                </select>
            </div>
            {cooldown && <p>Please wait for 60 seconds to make another comparison. Last updated at: {new Date(lastUpdated).toLocaleTimeString()}</p>}
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};

export default CryptoCompareChart;