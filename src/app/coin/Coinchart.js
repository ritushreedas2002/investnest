import React from 'react';
import ReactApexChart from 'react-apexcharts';

const CoinChart = ({ chartData }) => {
  const dates = chartData.prices.map((price) => new Date(price[0]).toLocaleDateString());
  const prices = chartData.prices.map((price) => price[1]);

  const options = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
      foreColor: '#ffffff', // Sets the color of the text for the entire chart
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Market Price',
      align: 'left',
      style: {
        color: '#ffffff', // Specifically sets the title text color to white
      },
    },
    // grid: {
    //   row: {
    //     colors: ['#f3f3f3', 'transparent'],
    //     opacity: 0.5,
    //   },
    // },
    xaxis: {
      categories: dates,
      labels: {
        style: {
          colors: '#ffffff', // Sets the x-axis label text color to white
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#ffffff', // Sets the y-axis label text color to white
        },
      },
    },
    tooltip: {
      style: {
        colors: '#ffffff', // Sets the tooltip text color to white
      },
      x: {
        format: 'dd/MM/yy',
      },
    },
  };
  
  const series = [
    {
      name: "Price",
      data: prices,
    },
  ];
  

  return (
    <ReactApexChart options={options} series={series} type="line" height={500} />
  );
};

export default CoinChart;
