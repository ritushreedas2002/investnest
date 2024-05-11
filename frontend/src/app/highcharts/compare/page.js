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

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useState, useEffect } from 'react';

const CryptoCompareChart = () => {
    const [loading, setLoading] = useState(true);
    const [seriesData, setSeriesData] = useState([]);

    useEffect(() => {
        const fetchCryptoData = async () => {
            const urls = [
                'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=300&interval=daily',
                'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=300&interval=daily'
            ];

            const responses = await Promise.all(urls.map(url => fetch(url)));
            const data = await Promise.all(responses.map(res => res.json()));

            // Calculate percentage growth from the first data point
            const calculateGrowth = (prices) => {
                const initialPrice = prices[0][1];
                return prices.map(price => [price[0], ((price[1] - initialPrice) / initialPrice) * 100]);
            };

            const bitcoinGrowth = calculateGrowth(data[0].prices);
            const ethereumGrowth = calculateGrowth(data[1].prices);

            setSeriesData([
                { name: 'Bitcoin', data: bitcoinGrowth },
                { name: 'Ethereum', data: ethereumGrowth }
            ]);
            setLoading(false);
        };

        fetchCryptoData();
    }, []);

    if (loading) return <div>Loading...</div>;

    const options = {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Bitcoin vs Ethereum Growth Percentage Over Time'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Growth Percentage (%)'
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: seriesData
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
};

export default CryptoCompareChart;