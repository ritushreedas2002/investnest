"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure axios is imported
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ShimmerBarChart from "@/components/Shimmer/ShimmerBarChart"


const BarGraphComponent = () => {
  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;

  // Initialize chartData as an object with categories and series keys
  const [chartData, setChartData] = useState({ categories: [], series: [] });

  const processDataForChart = (data) => {
    const incomeData = [];
    const expenseData = [];
    const categories = [];

    data.yearly.forEach((item) => {
      const month = new Date(0, parseInt(item.Month, 10) - 1).toLocaleString(
        "default",
        { month: "short" }
      );
      categories.push(month);
      incomeData.push(item.Income);
      expenseData.push(item.Expense);
    });

    return {
      categories,
      series: [
        {
          name: "Income",
          data: incomeData,
          color: "rgba(54, 162, 235, 0.7)",
        },
        {
          name: "Expense",
          data: expenseData,
          color: "rgba(255, 99, 132, 0.7)",
        },
      ],
    };
  };

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`/api/analysis/yearly?email=${email}`);
        const formattedData = processDataForChart(response.data);
        setChartData(formattedData); // Update the chart data state
        // console.log(formattedData);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      }
    };

    if (email) {
      fetchChartData();
      const intervalId = setInterval(() => {
        fetchChartData(); // Your function that fetches the latest chart data
      }, 10000); // Fetch every 10 seconds

      return () => clearInterval(intervalId); // Your function that fetches the latest chart data
    }
  }, []);
  const maxIncome = Math.max(...(chartData.series[0]?.data ?? [0]));
  const maxExpense = Math.max(...(chartData.series[1]?.data ?? [0]));
  const yAxisMax = Math.max(maxIncome, maxExpense);

  // The chartOptions should be a part of the state or at least derived state from chartData
  // This is because we are fetching data asynchronously
  const options = {
    chart: {
      type: "column",
      height: 280,
      backgroundColor: "#4B5563",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: chartData.categories,
      labels: {
        style: {
          color: "#ffffff", // Set the x-axis labels to white
        },
      },
    },
    yAxis: {
      min: 0,
      // max: yAxisMax + (0.1 * yAxisMax),
      title: {
        text: "Amount (₹)", // Use the symbol for Indian Rupee
        style: {
          color: "#ffffff",
        },
      },
      labels: {
        format: "₹{value}", // Format the y-axis labels to show currency
        style: {
          color: "#ffffff",
        },
      },
      //tickInterval: Math.ceil(yAxisMax / 5),
    },
    tooltip: {
      shared: true,
      valuePrefix: "₹",
    },
    legend: {
      itemStyle: {
        color: "#ffffff", // Set the legend text color to white
      },
    },
    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver: function () {
              const chart = this.series.chart;
              const index = this.index;

              // Loop over all series to apply the dimming
              chart.series.forEach((series) => {
                // Apply dimming only to non-hovered series points with the same index
                series.points.forEach((point) => {
                  if (point.index !== index) {
                    Highcharts.css(point.graphic.element, {
                      opacity: 0.2,
                    });
                  }
                });
              });

              // Highlight all points for the hovered index (month)
              chart.series.forEach((series) => {
                if (series.points[index]) {
                  Highcharts.css(series.points[index].graphic.element, {
                    opacity: 1,
                  });
                }
              });
            },
            mouseOut: function () {
              const chart = this.series.chart;

              // Restore the opacity for all points
              chart.series.forEach((series) => {
                series.points.forEach((point) => {
                  Highcharts.css(point.graphic.element, {
                    opacity: 1,
                  });
                });
              });
            },
          },
        },
        states: {
          hover: {
            enabled: true, // Enable the hover state
            brightness: 0.1, // Slight brightness on hover
          },
        },
      },
      column: {
        borderRadius: 4,
        pointWidth: 18,
        // pointPadding: 0.05,
        groupPadding: 0.1,
      },
    },
    credits: {
      enabled: false,
    },
    series: chartData.series,
  };
  return (
    <div>
      {chartData && chartData.categories.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <ShimmerBarChart/>
        // <p>Loading data or no data available...</p> // Display loading or some placeholder
      )}
    </div>
  );
};

export default BarGraphComponent;
