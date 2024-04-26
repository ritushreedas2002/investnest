import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting from "highcharts/modules/exporting";
import HC_exportData from "highcharts/modules/export-data";
import HC_accessibility from "highcharts/modules/accessibility";

// Load modules
HC_exporting(Highcharts);
HC_exportData(Highcharts);
HC_accessibility(Highcharts);

const PieChart = () => {
  const [chartData, setChartData] = useState([]);

  const data = {
    "month": {
      "Fees": 7000,
      "Restaurant": 600,
      "Groceries": 2000,
      "Transportation": 1500,
      "Entertainment": 800
    }
  };

  useEffect(() => {
    // Function to fetch and transform data
    const fetchData = async () => {
      try {

        // Transform the data into the format Highcharts expects
        const transformedData = Object.entries(data.month).map(([key, value]) => ({
          name: key,
          y: value
        }));

        setChartData(transformedData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {

    // Define custom animation for pie series
    Highcharts.seriesTypes.pie.prototype.animate = function (init) {
      const series = this,
        chart = series.chart,
        points = series.points,
        { animation } = series.options,
        { startAngleRad } = series;

      if (init) {
        points.forEach((point) => {
          point.opacity = 0;
        });
      } else {
        fanAnimate(points[0], startAngleRad);
      }

      function fanAnimate(point, startAngleRad) {
        const graphic = point && point.graphic, // Check if point is defined first
        args = point && point.shapeArgs; 

        if (graphic && args) {
          graphic
            .attr({
              start: startAngleRad,
              end: startAngleRad,
              opacity: 1,
            })
            .animate(
              {
                start: args.start,
                end: args.end,
              },
              {
                duration: animation.duration / points.length,
              },
              function () {
                if (points[point.index + 1]) {
                  fanAnimate(points[point.index + 1], args.end);
                }
                if (point.index === series.points.length - 1) {
                  // Update pie to donut only after the last animation completes
                  chart.update(
                    {
                      plotOptions: {
                        pie: {
                          innerSize: "50%", // Creates a donut effect
                          borderRadius: 6,
                        },
                      },
                    },
                    false
                  ); // False to avoid redrawing immediately
                  points.forEach((point) => {
                    point.opacity = 1;
                  });
                  series.update({ enableMouseTracking: true });
                  // Now redraw the chart to apply the updates
                  chart.redraw();
                }
              }
            );
        }
      }
      
    };
  }, []);

  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        borderWidth: 2,
        cursor: "pointer",
        showInLegend: true,
        dataLabels: {
          enabled: false,
          // format: '<b>{point.name}</b><br>{point.percentage}%',
          distance: 0,
        },
      },
    },
    legend: {
      layout: "horizontal", // Change layout to horizontal
      align: "center",
      verticalAlign: "bottom",
      useHTML: true,
      width: 360, // Set a specific width to encourage a two-column layout
      itemWidth: 180, // Approximate width of each column
      symbolRadius: 2, // Makes the legend symbol squares
      symbolHeight: 12,
      labelFormatter: function () {
        return `${this.name}: <b>${this.y}</b>`; // Custom format
      },
      
    },
    colors: [
      // Custom colors for each slice
      "#32CD32", // Tomato
      "#4682B4", // SteelBlue
      "#32CD32", // LimeGreen
      "#FFD700", // Gold
      "#6A5ACD", // SlateBlue
    ],
    series: [
      {
        enableMouseTracking: false,
        animation: {
          duration: 2000,
        },
        colorByPoint: true,
        data: chartData,
        // data: [
        //   {
        //     name: "Customer Support",
        //     y: 21.3,
        //   },
        //   {
        //     name: "Development",
        //     y: 18.7,
        //   },
        //   {
        //     name: "Sales",
        //     y: 20.2,
        //   },
        //   {
        //     name: "Marketing",
        //     y: 14.2,
        //   },
        //   {
        //     name: "Other",
        //     y: 25.6,
        //   },
        // ],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{
          style: { height: "450px", maxWidth: "600px", margin: "0 auto" },
        }}
      />
    </div>
  );
};

export default PieChart;

// function fanAnimate(point, startAngleRad) {
//     const graphic = point.graphic,
//         args = point.shapeArgs;

//     if (graphic && args) {
//         graphic
//             .attr({
//                 start: startAngleRad,
//                 end: startAngleRad,
//                 opacity: 1
//             })
//             .animate({
//                 start: args.start,
//                 end: args.end
//             }, {
//                 duration: animation.duration / points.length
//             }, function () {
//                 if (points[point.index + 1]) {
//                     fanAnimate(points[point.index + 1], args.end);
//                 }
//                 if (point.index === series.points.length - 1) {
//                     series.dataLabelsGroup.animate({ opacity: 1 }, void 0, function () {
//                         points.forEach(point => { point.opacity = 1; });
//                         series.update({ enableMouseTracking: true }, false);
//                         chart.update({
//                             plotOptions: {
//                                 pie: {
//                                     innerSize: '50%',
//                                     borderRadius: 6
//                                 }
//                             }
//                         });
//                     });
//                 }
//             });
//     }
// }

// if (init) {
//     points.forEach(point => {
//         point.opacity = 0;
//     });
// } else {
//     fanAnimate(points[0], startAngleRad);
// }
