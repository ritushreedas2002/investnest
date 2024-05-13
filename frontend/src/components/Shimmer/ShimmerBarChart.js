"use client"
// import React, { useEffect, useState } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// import HC_exportData from "highcharts/modules/export-data";
// import HC_accessibility from "highcharts/modules/accessibility";

// HC_exportData(Highcharts);
// HC_accessibility(Highcharts);



// const ShimmerBarComponent = () => {

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
//           color: '#333333' 
//         },
//         {
//           name: 'Expense',
//           data: expenseData,
//           color: '#cccccc'
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
//       { Month: "09", Income: 0, Expense: 20000 },
//       { Month: "10", Income: 30000, Expense: 20000 },
//       { Month: "11", Income: 22220, Expense: 33330 },
//       { Month: "12", Income: 1110, Expense: 0 },
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

// export default ShimmerBarComponent;



import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ShimmerBarComponent = () => {
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
          color: '#D3D3D3'  // Consistent with BarGraphComponent
        },
        {
          name: 'Expense',
          data: expenseData,
          color: '#A9A9A9'  // Consistent with BarGraphComponent
        },
      ]
    };
  };

  // Assume dynamicData is either fetched or passed as a prop
  const dynamicData = {
    yearly: [
      { Month: "01", Income: 3000, Expense: 2000 },
      { Month: "02", Income: 3000, Expense: 8000 },
      { Month: "03", Income: 3000, Expense: 20000 },
      { Month: "04", Income: 3000, Expense: 7600 },
      { Month: "05", Income: 200, Expense: 3000 },
      { Month: "06", Income: 200, Expense: 30000 },
      { Month: "07", Income: 1000, Expense: 2000 },
      { Month: "08", Income: 3000, Expense: 20000 },
      { Month: "09", Income: 0, Expense: 200 },
      { Month: "10", Income: 30000, Expense: 2000 },
      { Month: "11", Income: 2220, Expense: 3333 },
      { Month: "12", Income: 1110, Expense: 0 },
    ],
  };

  const { categories, series } = processDataForChart(dynamicData);

  const options = {
    chart: {
      type: 'column',
      backgroundColor: '#4B5563', // Dark background
      height: 280 // Consistent height with the BarGraphComponent
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: categories,
      labels: {
        style: {
          color: '#ffffff'  // White text for visibility
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Amount (₹)',
        style: {
          color: '#ffffff'
        }
      },
      labels: {
        format: '₹{value}',
        style: {
          color: '#ffffff'
        }
      }
    },
    tooltip: {
      shared: true,
      valuePrefix: '₹'
    },
    legend: {
      itemStyle: {
        color: '#ffffff'  // White legend text
      }
    },
    plotOptions: {
      column: {
        borderRadius: 4,
        pointWidth: 18,  // Consistent with BarGraphComponent
        groupPadding: 0.1
      }
    },
    credits: {
      enabled: false
    },
    series: series
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default ShimmerBarComponent;
