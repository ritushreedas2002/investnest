
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const StatisticsChart = () => {
  const [options] = useState({
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      }
    },
    colors: ["#00E396", "#008FFB"],
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      labels: {
        style: {
          colors: "#000000"
        }
      }
    },
    fill: {
      opacity: 1
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: "Year Wise Analysis",
      align: "left",
      style: {
        fontSize: "20px",
        color: "#000000"
      }
    },
    subtitle: {
      align: "left",
      margin: 30,
      offsetX: 0,
      offsetY: 30,
      floating: false,
      style: {
        fontSize: "24px",
        fontWeight: "semibold",
        color:"#000000"
      }
    },
    legend: {
      position: "right",
      offsetY: 40,
      labels: {
        colors: "#000000"
      }
    },
    tooltip: {
      theme: "dark" // Ensuring tooltip text is also light colored
    },
    yaxis: {
      labels: {
        style: {
          colors: "#000000"
        }
      }
    },
  });

  const [series] = useState([
    {
      name: "Income",
      data: [44, 55, 41, 67, 22, 43, 21, 49, 39, 25, 34, 27],
    },
    {
      name: "Spendings",
      data: [13, 23, 20, 8, 13, 27, 33, 12, 22, 11, 19, 15],
    },
  ]);

  return (
    <div className="w-full h-full bg-yellow-50 rounded-2xl mt-5 p-10">
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={350}
    />
    </div>
  );
};

export default StatisticsChart;

