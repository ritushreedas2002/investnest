import React from 'react';
import ReactApexChart from 'react-apexcharts';

const CoinChart = ({ chartData }) => {
  const dates = chartData.prices.map((price) => new Date(price[0]).toLocaleDateString());
  const prices = chartData.prices.map((price) => price[1]);

  const options = {
    chart: {
      toolbar:{
        tools:{
          pan:false,
        }
      },
      type: 'area',
      zoom: {
        enabled: true,
      },
      foreColor: '#ffffff', // Sets the color of the text for the entire chart
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.0,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: "#5356FF",
            opacity: 1
          },
          {
            offset: 100,
            opacity: 0.5
          }
        ]
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    grid:{
      xaxis:{
        lines:{
          show: false,
          strokeWidth:1
        }
      },
      yaxis:{
        lines:{
          show: false,
        }
      }
    },
    title: {
      text: 'Market Price',
      align: 'left',
      style: {
        color: '#ffffff', // Specifically sets the title text color to white
      },
    },
    xaxis: {
      categories: dates,
      tickAmount: 6,
      tooltip: {
        enabled: false, // Disable the x-axis tooltip here
      },
      labels: {
        // show:false,
        rotate: 0,
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
  };
  
  const series = [
    {
      name: "Price",
      data: prices,
    },
  ];
  

  return (
    <ReactApexChart options={options} series={series} type="area" height={500} />
  );
};

export default CoinChart;
