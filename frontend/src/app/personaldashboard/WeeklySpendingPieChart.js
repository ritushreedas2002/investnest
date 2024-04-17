import React from "react";
import ReactApexChart from "react-apexcharts";

const WeeklySpendingPieChart = () => {
  const state = {
    series: [44, 55, 13, 43, 22], // These values represent the spending in each category
    options: {
      chart: {
        type: "donut",
        width: 200, // Setting a smaller width for the chart
      },
      labels: [
        "Groceries",
        "Utilities",
        "Dining Out",
        "Shopping",
        "Entertainment",
      ], // These labels represent each category
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100, // This will take effect only when the screen width is less than 480px
            },
            legend: {
              position: "right",
            },
          },
        },
      ],
      plotOptions: {
        pie: {
          donut: {
            size: "60%", // Adjust the size to create a thinner or thicker hollow section
          },
        },
      },
      legend: {
        show: false, // Set to false if you want to hide the legend
        position: "bottom", // Legend at the bottom of the chart
      },
    },
  };

  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="donut"
      height={250}
    />
  );
};

export default WeeklySpendingPieChart;
