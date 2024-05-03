"use client"
// import ReactApexChart from "react-apexcharts";
// import { useState } from "react";

// const Chart = ({ sparkline, priceChange }) => {
//     const [chartOptions] = useState({
//         series: [{
//             data: [...sparkline.price],
//         }],
//         chart: {
//             type: "line",
//             height: 80,
//             sparkline: { enabled: true },
//             animations: { enabled: false },
//         },
//         tooltip: { enabled: false },
//         stroke: { width: 1 },
//         colors: [chartColor()],
//     });

//     function chartColor() {
//         if (priceChange <= 0) {
//             // Red for negative change
//             return "#ff3131";
//         } else {
//             // Green for positive change
//             return "#25df3e";
//         }
//     }

//     return (
//         <ReactApexChart
//             options={chartOptions}
//             series={chartOptions.series}
//             type="line"
//             height={80}
//         />
//     );
// };

// export default Chart;



import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const Chart = ({ sparkline, priceChange }) => {
  // Setup the chart options using Highcharts configuration
  const chartOptions = {
    chart: {
      type: 'line',
      height: 80,
      backgroundColor: 'transparent', // Set chart background to transparent
      // Additional Highcharts options for responsiveness or other behaviors can be added here
    },
    title: {
      text: null  // No title
    },
    xAxis: {
      visible: false  // Hide x-axis line, labels, and ticks
    },
    yAxis: {
      visible: false, // Hide y-axis line, labels, and ticks
      title: {
        text: null
      }
    },
    series: [{
      data: sparkline.price,  // Directly use the price array from props
      lineWidth: 1,
      marker: {
        enabled: false  // No markers
      },
      states: {
        hover: {
          lineWidthPlus: 0  // No additional width on hover
        }
      },
      color: priceChange <= 0 ? '#ff3131' : '#25df3e', // Conditional coloring based on price change
    }],
    tooltip: {
      enabled: false  // Disable tooltips
    },
    credits: {
      enabled: false  // Disable Highcharts credits
    },
    legend: {
      enabled: false  // Disable the legend
    },
    plotOptions: {
      series: {
        enableMouseTracking: false  // Disable mouse tracking for tooltips and other hover effects
      }
    }
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
    />
  );
};

export default Chart;





