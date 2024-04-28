import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ShimmerBarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    let step = 0;

    const interval = setInterval(() => {
      if (chartRef.current) {
        const chart = chartRef.current.chart;
        
        chart.series[0].points.forEach((point) => {
          point.update({
            color: {
              linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
              stops: [
                [0, `rgba(255, 255, 255, ${Math.abs(Math.sin(step))})`],
                [0.5, `rgba(255, 255, 255, 0)`],
                [1, `rgba(255, 255, 255, ${Math.abs(Math.sin(step))})`]
              ]
            }
          }, false); // false to not redraw yet
        });

        step += 0.1;
        if (step > 2 * Math.PI) {
          step = 0; // Reset step
        }

        chart.redraw();
      }
    }, 100); // Update every 100ms

    return () => {
      clearInterval(interval);
    };
  }, []);

  const chartOptions = {
    chart: {
      type: 'column',
      animation: false // Turn off initial animation
    },
    title: {
      text: 'Monthly Income and Expenses'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      title: {
        text: 'Amount ($)'
      }
    },
    series: [{
      data: [21000, 19000, 22000, 25000, 24000, 23000, 21000, 19000, 22000, 25000, 24000, 23000],
      color: Highcharts.getOptions().colors[0]
    }]
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      ref={chartRef}
    />
  );
};

export default ShimmerBarChart;
