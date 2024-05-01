"use client";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Indicators from "highcharts/indicators/indicators-all";
import Accessibility from "highcharts/modules/accessibility";

// Initialize Highcharts modules
Indicators(Highcharts);
Accessibility(Highcharts);

const HighchartsComponent = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 600,
    },
    title: {
      text: "AAPL Historical",
    },
    subtitle: {
      text: "With dynamic indicators",
    },
    yAxis: [
      {
        height: "60%",
      },
      {
        top: "65%",
        height: "35%",
      },
    ],
    rangeSelector: {
      selected: 2,
    },
    plotOptions: {
      series: {
        showInLegend: true,
      },
    },
    series: [
      {
        type: "candlestick",
        id: "aapl",
        name: "AAPL",
        data: [], // data will be loaded via useEffect
      },
      {
        type: "column",
        id: "volume",
        name: "Volume",
        yAxis: 1,
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://demo-live-data.highcharts.com/aapl-ohlcv.json");
      const data = await response.json();
      const ohlc = data.map(point => [point[0], point[1], point[2], point[3], point[4]]);
      const volume = data.map(point => [point[0], point[5]]);

      setChartOptions(prev => ({
        ...prev,
        series: [
          { ...prev.series.find(serie => serie.id === "aapl"), data: ohlc },
          { ...prev.series.find(serie => serie.id === "volume"), data: volume },
        ],
      }));
    };

    fetchData();
  }, []);

  const handleIndicatorChange = (type, id, linkedTo, yAxis) => {
    setChartOptions(prev => {
      // Remove existing series of the same ID if present
      const existingIndex = prev.series.findIndex(serie => serie.id === id);
      const newSeries = { type, id, linkedTo, yAxis, name: type.toUpperCase() };

      if (existingIndex > -1) {
        const newSeriesList = [...prev.series];
        newSeriesList[existingIndex] = newSeries;
        return { ...prev, series: newSeriesList };
      } else {
        return { ...prev, series: [...prev.series, newSeries] };
      }
    });
  };

  const removeIndicator = (id) => {
    setChartOptions(prev => ({
      ...prev,
      series: prev.series.filter(serie => serie.id !== id),
    }));
  };

  return (
    <div className="main-wrapper">
      <div className="selectors-container bg-gray-200 p-2 mb-4 flex flex-col md:flex-row justify-between">
        <div className="col mb-2 md:mb-0">
          <label htmlFor="overlays" className="block text-lg font-medium text-gray-700">Overlays:</label>
          <select className="mt-1 block w-full p-2 bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="overlays" onChange={(e) => handleIndicatorChange(e.target.value, "overlay", "aapl", 0)}>
            <option value="abands">Acceleration Bands</option>
            <option value="bb">Bollinger Bands</option>
            <option value="dema">DEMA (Double Exponential Moving Average)</option>
            <option value="ema">EMA (Exponential Moving Average)</option>
            <option value="ikh">Ichimoku Kinko Hyo</option>
            <option value="keltnerchannels">Keltner Channels</option>
            <option value="linearRegression">Linear Regression</option>
            <option value="pivotpoints">Pivot Points</option>
            <option value="pc">Price Channel</option>
            <option value="priceenvelopes">Price Envelopes</option>
            <option value="psar">PSAR (Parabolic SAR)</option>
            <option value="sma">SMA (Simple Moving Average)</option>
            <option value="supertrend">Super Trend</option>
            <option value="tema">TEMA (Triple Exponential Moving Average)</option>
            <option value="vbp">VbP (Volume by Price)</option>
            <option value="vwap">WMA (Weighted Moving Average)</option>
            <option value="wma">VWAP (Volume Weighted Average Price)</option>
            <option value="zigzag">Zig Zag</option>
          </select>
          <button onClick={() => removeIndicator("overlay")} className="mt-2 p-2 bg-red-500 text-white">Remove Overlay</button>
        </div>
        <div className="col">
          <label htmlFor="oscillators" className="block text-lg font-medium text-gray-700">Oscillators:</label>
          <select className="mt-1 block w-full p-2 bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="oscillators" onChange={(e) => handleIndicatorChange(e.target.value, "oscillator", "aapl", 1)}>
            <option value="apo">Absolute price indicator</option>
            <option value="ad">A/D (Accumulation/Distribution)</option>
            <option value="aroon">Aroon</option>
            <option value="aroonoscillator">Aroon oscillator</option>
            <option value="atr">ATR (Average True Range)</option>
            <option value="ao">Awesome oscillator</option>
            <option value="cci">CCI (Commodity Channel Index)</option>
            <option value="chaikin">Chaikin</option>
            <option value="cmf">CMF (Chaikin Money Flow)</option>
            <option value="disparityindex">Disparity Index</option>
            <option value="cmo">CMO (Chande Momentum Oscillator)</option>
            <option value="dmi">DMI (Directional Movement Index)</option>
            <option value="dpo">Detrended price</option>
            <option value="linearRegressionAngle">Linear Regression Angle</option>
            <option value="linearRegressionIntercept">Linear Regression Intercept</option>
            <option value="linearRegressionSlope">Linear Regression Slope</option>
            <option value="klinger">Klinger Oscillator</option>
            <option value="macd">MACD (Moving Average Convergence Divergence)</option>
            <option value="mfi">MFI (Money Flow Index)</option>
            <option value="momentum">Momentum</option>
            <option value="natr">NATR (Normalized Average True Range)</option>
            <option value="obv">OBV (On-Balance Volume)</option>
            <option value="ppo">Percentage Price oscillator</option>
            <option value="roc">RoC (Rate of Change)</option>
            <option value="rsi">RSI (Relative Strength Index)</option>
            <option value="slowstochastic">Slow Stochastic</option>
            <option value="stochastic">Stochastic</option>
            <option value="trix">TRIX</option>
            <option value="williamsr">Williams %R</option>
          </select>
          <button onClick={() => removeIndicator("oscillator")} className="mt-2 p-2 bg-red-500 text-white">Remove Oscillator</button>
        </div>
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={chartOptions}
      />
    </div>
  );
};

export default HighchartsComponent;

//"use client";
// import React, { useState, useEffect } from "react";
// import Highcharts from "highcharts/highstock";
// import HighchartsReact from "highcharts-react-official";
// import IndicatorsAll from "highcharts/indicators/indicators-all";
// import HC_more from "highcharts/highcharts-more";
// import Exporting from "highcharts/modules/exporting";

// HC_more(Highcharts);
// IndicatorsAll(Highcharts);
// Exporting(Highcharts);

// const HighchartsComponent = () => {
//   const [data, setData] = useState([]);
//   const [selectedOverlay, setSelectedOverlay] = useState("pc");
//   const [selectedOscillator, setSelectedOscillator] = useState("macd");

//   useEffect(() => {
//     fetch("https://demo-live-data.highcharts.com/aapl-ohlcv.json")
//       .then((response) => response.json())
//       .then((data) => {
//         setData(data);
//       });
//   }, []);

//   const options = {
//     chart: {
//       height: 600,
//       events: {
//         load: function () {
//           this.series.forEach((series) => {
//             series.update({
//               events: {
//                 legendItemClick: function () {
//                   this.remove();
//                   return false;
//                 },
//               },
//             });
//           });
//         },
//       },
//     },
//     title: { text: "AAPL Historical" },
//     subtitle: { text: "Dynamic Indicators" },
//     yAxis: [
//       { height: "60%" },
//       { top: "60%", height: "20%" },
//       { top: "80%", height: "20%" },
//     ],
//     rangeSelector: { selected: 2 },
//     series: [
//       {
//         type: "candlestick",
//         id: "aapl",
//         name: "AAPL",
//         data: data.map((item) => [item[0], item[1], item[2], item[3], item[4]]),
//       },
//       {
//         type: "column",
//         id: "volume",
//         name: "Volume",
//         yAxis: 1,
//         data: data.map((item) => [item[0], item[5]]),
//       },
//       {
//         type: selectedOverlay,
//         id: "overlay",
//         linkedTo: "aapl",
//         yAxis: 0,
//         data: data.map((item) => [item[0], item[3]]), // Simplified example
//       },
//       {
//         type: selectedOscillator,
//         id: "oscillator",
//         linkedTo: "aapl",
//         yAxis: 2,
//         data: data.map((item) => [item[0], item[2]]), // Simplified example
//       },
//     ],
//   };

//   return (
//     <div className="p-4">
//       <div className="selectors-container flex flex-wrap mb-4">
//         <div className="col w-full md:w-1/2 p-2">
//           <label
//             htmlFor="overlays"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Overlays:
//           </label>
//           <select
//             id="overlays"
//             value={selectedOverlay}
//             onChange={(e) => setSelectedOverlay(e.target.value)}
//             className="mt-1 block w-full p-2 bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           >
//             {/* Populate your overlay options here */}
//             <option value="abands">Acceleration Bands</option>
//             <option value="bb">Bollinger Bands</option>
//             <option value="dema">
//               DEMA (Double Exponential Moving Average)
//             </option>
//             <option value="ema">EMA (Exponential Moving Average)</option>
//             <option value="ikh">Ichimoku Kinko Hyo</option>
//             <option value="keltnerchannels">Keltner Channels</option>
//             <option value="linearRegression">Linear Regression</option>{" "}
//             <option value="pivotpoints">Pivot Points</option>
//             <option value="pc">Price Channel</option>
//             <option value="priceenvelopes">Price Envelopes</option>{" "}
//             <option value="psar">PSAR (Parabolic SAR)</option>
//             <option value="sma">SMA (Simple Moving Average)</option>
//             <option value="supertrend">Super Trend</option>
//             <option value="tema">
//               TEMA (Triple Exponential Moving Average)
//             </option>
//             <option value="vbp">VbP (Volume by Price)</option>
//             <option value="vwap">WMA (Weighted Moving Average)</option>
//             <option value="wma">VWAP (Volume Weighted Average Price)</option>
//             <option value="zigzag">Zig Zag</option>
//           </select>
//         </div>
//         <div className="col w-full md:w-1/2 p-2">
//           <label
//             htmlFor="oscillators"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Oscillators:
//           </label>
//           <select
//             id="oscillators"
//             value={selectedOscillator}
//             onChange={(e) => setSelectedOscillator(e.target.value)}
//             className="mt-1 block w-full p-2 bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           >
//             {/* Populate your oscillator options here */}
//             <option value="apo">Absolute price indicator</option>
//             <option value="ad">A/D (Accumulation/Distribution)</option>
//             <option value="aroon">Aroon</option>
//             <option value="aroonoscillator">Aroon oscillator</option>
//             <option value="atr">ATR (Average True Range)</option>{" "}
//             <option value="ao">Awesome oscillator</option>
//             <option value="cci">CCI (Commodity Channel Index)</option>
//             <option value="chaikin">Chaikin</option>
//             <option value="cmf">CMF (Chaikin Money Flow)</option>
//             <option value="disparityindex">Disparity Index</option>
//             <option value="cmo">CMO (Chande Momentum Oscillator)</option>
//             <option value="dmi">DMI (Directional Movement Index)</option>
//             <option value="dpo">Detrended price</option>
//             <option value="linearRegressionAngle">
//               Linear Regression Angle
//             </option>
//             <option value="linearRegressionIntercept">
//               Linear Regression Intercept
//             </option>
//             <option value="linearRegressionSlope">
//               Linear Regression Slope
//             </option>
//             <option value="klinger">Klinger Oscillator</option>
//             <option value="macd">
//               MACD (Moving Average Convergence Divergence)
//             </option>
//             <option value="mfi">MFI (Money Flow Index)</option>
//             <option value="momentum">Momentum</option>
//             <option value="natr">NATR (Normalized Average True Range)</option>
//             <option value="obv">OBV (On-Balance Volume)</option>
//             <option value="ppo">Percentage Price oscillator</option>
//             <option value="roc">RoC (Rate of Change)</option>
//             <option value="rsi">RSI (Relative Strength Index)</option>
//             <option value="slowstochastic">Slow Stochastic</option>
//             <option value="stochastic">Stochastic</option>
//             <option value="trix">TRIX</option>
//             <option value="williamsr">Williams %R</option>
//           </select>
//         </div>
//       </div>
//       <HighchartsReact
//         highcharts={Highcharts}
//         constructorType="stockChart"
//         options={options}
//       />
//     </div>
//   );
// };

// export default HighchartsComponent;



// Import necessary libraries and modules
// import React, { useState, useEffect, useRef } from 'react';
// import Highcharts from 'highcharts/highstock';
// import HighchartsReact from 'highcharts-react-official';
// import IndicatorsAll from 'highcharts/indicators/indicators-all';
// import HC_more from 'highcharts/highcharts-more';
// import Exporting from 'highcharts/modules/exporting';
// import Accessibility from "highcharts/modules/accessibility";


// // Initialize Highcharts modules
// HC_more(Highcharts);
// IndicatorsAll(Highcharts);
// Exporting(Highcharts);
// Accessibility(Highcharts);

// const HighchartsComponent = () => {
//   const [data, setData] = useState([]);
//   const [series, setSeries] = useState([]);
//   const [selectedOverlay, setSelectedOverlay] = useState("pc");
//   const [selectedOscillator, setSelectedOscillator] = useState("macd");
//   const chartRef = useRef(null);

//   // Fetch stock data from API
//   useEffect(() => {
//     fetch("https://demo-live-data.highcharts.com/aapl-ohlcv.json")
//       .then(response => response.json())
//       .then(data => {
//         setData(data);
//         setupInitialSeries(data);
//       });
//   }, []);

//   // Setup initial series based on fetched data
//   const setupInitialSeries = (data) => {
//     const initialSeries = [
//       {
//         type: 'candlestick',
//         id: 'aapl',
//         name: 'AAPL',
//         data: data.map(item => [item[0], item[1], item[2], item[3], item[4]]),
//       },
//       {
//         type: 'column',
//         id: 'volume',
//         name: 'Volume',
//         yAxis: 1,
//         data: data.map(item => [item[0], item[5]]),
//       },
//       {
//         type: selectedOverlay,
//         name:selectedOverlay,
//         id: 'overlay',
//         linkedTo: 'aapl',
//         yAxis: 0,
//         data: data.map(item => [item[0], item[3]]),
//       },
//       {
//         type: selectedOscillator,
//         name:selectedOscillator,
//         id: 'oscillator',
//         linkedTo: 'aapl',
//         yAxis: 2,
//         data: data.map(item => [item[0], item[2]]),
//       }
//     ];
//     setSeries(initialSeries);
//   };

//   // Remove series from the chart
//   const removeSeries = (id) => {
//     setSeries(series.filter(ser => ser.id !== id));
//   };

//   // Highcharts options
//   const options = {
//     chart: {
//       height: 600,
//       events: {
//         load: function () {
//           chartRef.current = this; // Attach the chart to the ref
//         },
//       },
//     },
//     title: { text: "AAPL Historical" },
//     subtitle: { text: "Dynamic Indicators" },
//     yAxis: [
//       { height: "60%" },
//       { top: "60%", height: "20%" },
//       { top: "80%", height: "20%" }
//     ],
//     rangeSelector: { selected: 2 },
//     series: series,
//   };

//   return (
//     <div className="p-4">
//       <div className="selectors-container flex flex-wrap mb-4">
//         <div className="col w-full md:w-1/2 p-2">
//           <label htmlFor="overlays" className="block text-sm font-medium text-gray-700">
//             Overlays:
//           </label>
//           <select
//             id="overlays"
//             value={selectedOverlay}
//             onChange={e => setSelectedOverlay(e.target.value)}
//             className="mt-1 block w-full p-2 bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           >
//             {/* Overlay options */}
//             <option value="abands">Acceleration Bands</option>
//             <option value="bb">Bollinger Bands</option>
//             <option value="dema">DEMA</option>
//             <option value="ema">EMA</option>
//             <option value="ikh">Ichimoku Kinko Hyo</option>
//             <option value="keltnerchannels">Keltner Channels</option>
//             <option value="linearRegression">Linear Regression</option>
//             <option value="pivotpoints">Pivot Points</option>
//             <option value="pc">Price Channel</option>
//             <option value="priceenvelopes">Price Envelopes</option>
//             <option value="psar">PSAR</option>
//             <option value="sma">SMA</option>
//             <option value="supertrend">Super Trend</option>
//             <option value="tema">TEMA</option>
//             <option value="vbp">VbP</option>
//             <option value="vwap">VWAP</option>
//             <option value="wma">WMA</option>
//             <option value="zigzag">Zig Zag</option>
//           </select>
//         </div>
//         <div className="col w-full md:w-1/2 p-2">
//           <label htmlFor="oscillators" className="block text-sm font-medium text-gray-700">
//             Oscillators:
//           </label>
//           <select
//             id="oscillators"
//             value={selectedOscillator}
//             onChange={e => setSelectedOscillator(e.target.value)}
//             className="mt-1 block w-full p-2 bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           >
//             {/* Oscillator options */}
//             <option value="apo">APO</option>
//             <option value="ad">A/D</option>
//             <option value="aroon">Aroon</option>
//             <option value="aroonoscillator">Aroon Oscillator</option>
//             <option value="atr">ATR</option>
//             <option value="ao">Awesome Oscillator</option>
//             <option value="cci">CCI</option>
//             <option value="chaikin">Chaikin</option>
//             <option value="cmf">CMF</option>
//             <option value="disparityindex">Disparity Index</option>
//             <option value="cmo">CMO</option>
//             <option value="dmi">DMI</option>
//             <option value="dpo">DPO</option>
//             <option value="linearRegressionAngle">Linear Regression Angle</option>
//             <option value="linearRegressionIntercept">Linear Regression Intercept</option>
//             <option value="linearRegressionSlope">Linear Regression Slope</option>
//             <option value="klinger">Klinger Oscillator</option>
//             <option value="macd">MACD</option>
//             <option value="mfi">MFI</option>
//             <option value="momentum">Momentum</option>
//             <option value="natr">NATR</option>
//             <option value="obv">OBV</option>
//             <option value="ppo">PPO</option>
//             <option value="roc">RoC</option>
//             <option value="rsi">RSI</option>
//             <option value="slowstochastic">Slow Stochastic</option>
//             <option value="stochastic">Stochastic</option>
//             <option value="trix">TRIX</option>
//             <option value="williamsr">Williams %R</option>
//           </select>
//         </div>
//       </div>
//       <HighchartsReact
//         highcharts={Highcharts}
//         constructorType="stockChart"
//         options={options}
//       />
//       <div className="mt-4">
//         <h3 className="text-lg leading-6 font-medium text-gray-900">Active Indicators</h3>
//         <div className="mt-2">
//           {series.map(ser => (
//             <span key={ser.id} onClick={() => removeSeries(ser.id)} className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 cursor-pointer mr-2">
//               {ser.name} <span className="font-bold ml-1">x</span>
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HighchartsComponent;


