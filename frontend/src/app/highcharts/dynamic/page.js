"use client"
import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const generateInitialData = () => {
    const data = [];
    const time = (new Date()).getTime();

    for (let i = -999; i <= 0; i += 1) {
        data.push([
            time + i * 1000,
            Math.round(Math.random() * 100)
        ]);
    }
    return data;
};

const LiveChart = () => {
    const chartComponentRef = useRef(null);

    useEffect(() => {
        const chart = chartComponentRef.current.chart;
        const series = chart.series[0];

        const intervalId = setInterval(() => {
            const x = (new Date()).getTime(); // current time
            const y = Math.round(Math.random() * 100);
            series.addPoint([x, y], true, true);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const options = {
        chart: {
            events: {
                load: function () {
                    // can initiate data feed here if needed
                }
            }
        },
        accessibility: {
            enabled: false
        },
        time: {
            useUTC: false
        },
        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },
        title: {
            text: 'Live random data'
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Random data',
            data: generateInitialData()
        }]
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={options}
            ref={chartComponentRef}
            containerProps={{ style: { height: "400px", minWidth: "310px" } }}
        />
    );
};

export default LiveChart;
