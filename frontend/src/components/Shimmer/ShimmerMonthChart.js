"use client"

// import React, { useEffect, useState } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// const PieShimmerChart = () => {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     // Simulate fetching data from an API
//     const fetchData = async () => {
//       try {
//         // Simulate an API call with a delay
//         // Mock response from the backend
//         const response = {
//           data: {
//             month: {
//               "Electronics": 12000,
//               "Electronics1": 3000,
//               "Clothing": 8000,
//               "Grocery": 5000,
//               "Utilities": 7000,
//             }
//           }
//         };

//         // Transform the data into the format Highcharts expects
//         const transformedData = Object.entries(response.data.month).map(([key, value]) => ({
//           name: key,
//           y: value
//         }));

//         // Update state with the transformed data
//         setChartData(transformedData);
//       } catch (error) {
//         console.error('Error fetching data: ', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const options = {
//     chart: {
//       type: "pie",
//       events: {
//         render: function() {
//           if (this.customLabel) {
//             this.customLabel.destroy();
//           }
//           this.customLabel = this.renderer.text(
//             'Add expense to see real data',
//             this.plotLeft + (this.plotWidth * 0.5),
//             this.plotHeight + this.plotTop - 12
//           )
//           .css({
//             color: '#333333',
//             fontSize: '16px'
//           })
//           .attr({
//             align: 'center'
//           })
//           .add();
//         }
//       }
//     },
//     title: {
//       text: ""
//     },
//     tooltip: {
//       pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
//     },
//     credits: {
//       enabled: false
//     },
//     accessibility: {
//       point: {
//         valueSuffix: "%"
//       }
//     },
//     plotOptions: {
//       pie: {
//         size: '75%', 
//         allowPointSelect: true,
//         borderRadius: 30,
//         borderWidth: 2,
//         cursor: "pointer",
//         showInLegend: false,
//         dataLabels: {
//           enabled: false
//         }
//       }
//     },
//     legend: {
//       enabled: false
//     },
//     series: [
//       {
//         enableMouseTracking: false,
//         animation: {
//           duration: 2000
//         },
//         colorByPoint: true,
//         data: chartData
//       }
//     ],
//     colors: [
//       "#f0f0f0", // Very light grey
//       "#d9d9d9", // Light grey
//       "#bdbdbd", // Medium grey
//       "#969696", // Dark grey
//       "#636363"  // Very dark grey
//     ]
//   };

//   return (
//     <div>
//       <HighchartsReact
//         highcharts={Highcharts}
//         options={options}
//         containerProps={{
//           style: { height: "280px", maxWidth: "400px", margin: "0 auto" }
//         }}
//       />
//     </div>
//   );
// };

// export default PieShimmerChart;

import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieShimmerChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        // Simulate an API call with a delay
        // Mock response from the backend
        const response = {
          data: {
            month: {
              "Electronics": 12000,
              "Electronics1": 3000,
              "Clothing": 8000,
              "Grocery": 5000,
              "Utilities": 7000,
            }
          }
        };

        // Transform the data into the format Highcharts expects
        const transformedData = Object.entries(response.data.month).map(([key, value]) => ({
          name: key,
          y: value
        }));

        // Update state with the transformed data
        setChartData(transformedData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: "pie",
      events: {
        render: function() {
          if (this.customLabel) {
            this.customLabel.destroy();
          }
          this.customLabel = this.renderer.text(
            'Add expense to see real data',
            this.plotLeft + (this.plotWidth * 0.5),
            this.plotHeight + this.plotTop - 12
          )
          .css({
            color: '#333333',
            fontSize: '16px'
          })
          .attr({
            align: 'center'
          })
          .add();
        }
      }
    },
    title: {
      text: ""
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
    },
    credits: {
      enabled: false
    },
    accessibility: {
      point: {
        valueSuffix: "%"
      }
    },
    plotOptions: {
      pie: {
        size: '75%', 
        allowPointSelect: true,
        borderRadius: 30,
        borderWidth: 2,
        cursor: "pointer",
        showInLegend: false,
        dataLabels: {
          enabled: false
        }
      }
    },
    legend: {
      enabled: false
    },
    series: [
      {
        enableMouseTracking: false,
        animation: {
          duration: 2000
        },
        colorByPoint: true,
        data: chartData
      }
    ],
    colors: [
      "#f0f0f0", // Very light grey
      "#d9d9d9", // Light grey
      "#bdbdbd", // Medium grey
      "#969696", // Dark grey
      "#636363"  // Very dark grey
    ]
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{
          style: { height: "280px", maxWidth: "400px", margin: "0 auto" }
        }}
      />
    </div>
  );
};

export default PieShimmerChart;

