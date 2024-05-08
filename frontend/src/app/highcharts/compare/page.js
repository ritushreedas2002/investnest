"use client"
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';

const StockChart = () => {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fetchStockData = async () => {
            const names = ['MSFT', 'AAPL', 'GOOG'];
            const requests = names.map(name => fetch(`https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/${name.toLowerCase()}-c.json`)
                .then(response => response.json())
                .then(data => ({
                    name,
                    data
                }))
            );

            const seriesData = await Promise.all(requests);
            setSeries(seriesData);
        };

        fetchStockData();
    }, []);

    const options = {
        rangeSelector: {
            selected: 4
        },
        yAxis: {
            labels: {
                formatter: function () {
                    return (this.value > 0 ? ' + ' : '') + this.value + '%';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },
        plotOptions: {
            series: {
                compare: 'percent',
                showInNavigator: true
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            valueDecimals: 2,
            split: true
        },
        series
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={options}
            containerProps={{ style: { height: "400px", minWidth: "310px" } }}
        />
    );
};

export default StockChart;
