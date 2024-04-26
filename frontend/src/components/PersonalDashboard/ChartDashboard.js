import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarGraphComponent = () => {
  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Monthly Income and Expenses'
    },
    xAxis: {
      categories: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Amount ($)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: 
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>${point.y:.2f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Income',
      data: [12000, 19000, 30000, 50000, 20000, 30000], // Sample data
      color: 'rgba(54, 162, 235, 0.7)'
    }, {
      name: 'Expenses',
      data: [8000, 15000, 26000, 40000, 10000, 20000], // Sample data
      color: 'rgba(255, 99, 132, 0.7)'
    }]
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

export default BarGraphComponent;
