// import React from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import HC_exporting from "highcharts/modules/exporting";
// import HC_exportData from "highcharts/modules/export-data";
// import HC_accessibility from "highcharts/modules/accessibility";

// HC_exporting(Highcharts);
// HC_exportData(Highcharts);
// HC_accessibility(Highcharts);



// const BarGraphComponent = () => {

//   const processDataForChart = (data) => {
//     const incomeData = [];
//     const expenseData = [];
//     const categories = [];
  
//     data.yearly.forEach((item) => {
//       const month = new Date(0, parseInt(item.Month) - 1).toLocaleString('default', { month: 'short' });
//       categories.push(month);
//       incomeData.push(item.Income);
//       expenseData.push(item.Expense);
//     });
  
//     return {
//       categories,
//       series: [
//         {
//           name: 'Income',
//           data: incomeData,
//           color: 'rgba(54, 162, 235, 0.7)'
//         },
//         {
//           name: 'Expense',
//           data: expenseData,
//           color: 'rgba(255, 99, 132, 0.7)'
//         }
//       ]
//     };
//   };
  
//   const dynamicData = {
//     yearly: [
//       { Month: "01", Income: 30000, Expense: 20000 },
//       { Month: "02", Income: 30000, Expense: 8000 },
//       { Month: "03", Income: 30000, Expense: 20000 },
//       { Month: "04", Income: 30000, Expense: 7600 },
//       { Month: "05", Income: 20000, Expense: 30000 },
//       { Month: "06", Income: 20000, Expense: 30000 },
//       { Month: "07", Income: 10000, Expense: 20000 },
//       { Month: "08", Income: 30000, Expense: 20000 },
//       { Month: "09", Income: 30000, Expense: 20000 },
//       { Month: "10", Income: 30000, Expense: 20000 },
//       { Month: "11", Income: 22220, Expense: 33330 },
//       { Month: "12", Income: 1110, Expense: 33330 },
//     ],
//   };
  
//   const { categories, series } = processDataForChart(dynamicData);

//   const options = {
//     chart: {
//       type: "column",
//       // styledMode: true
//     },
//     title: {
//       text: "Average weight and BMI in some countries, women",
//       align: "left",
//     },
//     // subtitle: {
//     //   text: 'Source: ' +
//     //     '<a href="https://www.worlddata.info/average-bodyheight.php" ' +
//     //     'target="_blank">WorldData</a>',
//     //   align: 'left'
//     // },
//     xAxis: {
//       categories: categories/*["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"]*/,
//     },
//     yAxis: {
//       min: 0,
//       title: {
//         text: null
//       },
//       // labels: {
//       //   overflow: "justify",
//       // },
//     },
//     tooltip: {
//       shared: true,
//       valuePrefix: "$",
//     },
//     // plotOptions: {
//     //   column: {
//     //     borderRadius: 5,
//     //     pointWidth: 20,
//     //     //pointPadding: 0.05,
//     //     //groupPadding: 0.1,
//     //   },
//     // },
//     plotOptions: {
//       series: {
//         point: {
//           events: {
//             mouseOver: function () {
//               const chart = this.series.chart;
//               const index = this.index;
    
//               // Loop over all series to apply the dimming
//               chart.series.forEach((series) => {
//                 // Apply dimming only to non-hovered series points with the same index
//                 series.points.forEach((point) => {
//                   if (point.index !== index) {
//                     Highcharts.css(point.graphic.element, {
//                       opacity: 0.2,
//                     });
//                   }
//                 });
//               });
    
//               // Highlight all points for the hovered index (month)
//               chart.series.forEach((series) => {
//                 if (series.points[index]) {
//                   Highcharts.css(series.points[index].graphic.element, {
//                     opacity: 1,
//                   });
//                 }
//               });
//             },
//             mouseOut: function () {
//               const chart = this.series.chart;
    
//               // Restore the opacity for all points
//               chart.series.forEach((series) => {
//                 series.points.forEach((point) => {
//                   Highcharts.css(point.graphic.element, {
//                     opacity: 1,
//                   });
//                 });
//               });
//             }
//           }
//         },
//         states: {
//           hover: {
//             enabled: true, // Enable the hover state
//             brightness: 0.1, // Slight brightness on hover
//           }
//         }
//       },
//       column: {
//         // Other column options here
//       }
//     },
//     credits: {
//       enabled: false,
//     },
//     series:  series
   
//   };
  

//   return (
//     <div>
//       <HighchartsReact highcharts={Highcharts} options={options} />
//     </div>
//   );
// };

// export default BarGraphComponent;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';
import HC_accessibility from 'highcharts/modules/accessibility';
import ShimmerBarChart from "@/components/Shimmer/ShimmerBarChart"

// Initialize Highcharts modules
HC_exporting(Highcharts);
HC_exportData(Highcharts);
HC_accessibility(Highcharts);


const BarGraphComponent = () => {
  const [chartData, setChartData] = useState(null);
  const email=localStorage.getItem("email");

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`/api/analysis/yearly?email=${email}`);
        const formattedData = processDataForChart(response.data);
        setChartData(formattedData);
        console.log(formattedData);
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
      }
    };

    fetchChartData();
  }, []);

  const processDataForChart = (data) => {
    const incomeData = [];
    const expenseData = [];
    const categories = [];
  
    data.yearly.forEach((item) => {
      const month = new Date(0, parseInt(item.Month) - 1).toLocaleString('default', { month: 'short' });
      categories.push(month);
      incomeData.push(item.Income);
      expenseData.push(item.Expense);
    });
  
    return {
      categories,
      series: [
        {
          name: 'Income',
          data: incomeData,
          color: 'rgba(54, 162, 235, 0.7)'
        },
        {
          name: 'Expense',
          data: expenseData,
          color: 'rgba(255, 99, 132, 0.7)'
        }
      ]
    };
  };

  const options = chartData ? {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Monthly Income and Expenses',
      align: 'left',
    },
    xAxis: {
      categories: chartData.categories,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Amount ($)'
      },
    },
    tooltip: {
      shared: true,
      valuePrefix: '$',
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    credits: {
      enabled: false,
    },
    series: chartData.series,
  } : {};

  return (
    <div>
      {chartData ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
        
      ) : (
        // <p>Loading chart data...</p>
        <ShimmerBarChart/>
      )}
    </div>
  );
};

export default BarGraphComponent;
