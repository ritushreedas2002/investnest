"use client";
// import React, { useEffect, useState } from "react";
// import Highcharts from "highcharts/highstock";
// import HighchartsReact from "highcharts-react-official";

// const HighchartsComponent = () => {
//   const [chartOptions, setChartOptions] = useState({
//     chart: {
//       height: 600,
//     },
//     title: {
//       text: "AAPL Historical",
//     },
//     subtitle: {
//       text: "With dynamic indicators",
//     },
//     yAxis: [
//       {
//         height: "60%",
//       },
//       {
//         top: "65%",
//         height: "35%",
//       },
//     ],
//     rangeSelector: {
//       selected: 2,
//     },
//     plotOptions: {
//       series: {
//         showInLegend: true,
//       },
//     },
//     series: [
//       {
//         type: "candlestick",
//         id: "aapl",
//         name: "AAPL",
//         data: [], // data will be loaded via useEffect
//       },
//       {
//         type: "column",
//         id: "volume",
//         name: "Volume",
//         yAxis: 1,
//         data: [],
//       },
//     ],
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch("https://demo-live-data.highcharts.com/aapl-ohlcv.json");
//       const data = await response.json();
//       const ohlc = data.map(point => [point[0], point[1], point[2], point[3], point[4]]);
//       const volume = data.map(point => [point[0], point[5]]);

//       setChartOptions(prev => ({
//         ...prev,
//         series: [
//           { ...prev.series.find(serie => serie.id === "aapl"), data: ohlc },
//           { ...prev.series.find(serie => serie.id === "volume"), data: volume },
//         ],
//       }));
//     };

//     fetchData();
//   }, []);

//   const handleIndicatorChange = (type, id, linkedTo, yAxis) => {
//     setChartOptions(prev => {
//       // Remove existing series of the same ID if present
//       const existingIndex = prev.series.findIndex(serie => serie.id === id);
//       const newSeries = { type, id, linkedTo, yAxis, name: type.toUpperCase() };

//       if (existingIndex > -1) {
//         const newSeriesList = [...prev.series];
//         newSeriesList[existingIndex] = newSeries;
//         return { ...prev, series: newSeriesList };
//       } else {
//         return { ...prev, series: [...prev.series, newSeries] };
//       }
//     });
//   };

//   const removeIndicator = (id) => {
//     setChartOptions(prev => ({
//       ...prev,
//       series: prev.series.filter(serie => serie.id !== id),
//     }));
//   };

//   return (
//     <div className="main-wrapper">
//       <div className="selectors-container bg-gray-200 p-2 mb-4 flex flex-col md:flex-row justify-between">
//         <div className="col mb-2 md:mb-0">
//           <label htmlFor="overlays" className="block text-lg font-medium text-gray-700">Overlays:</label>
//           <select className="mt-1 block w-full p-2 bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="overlays" onChange={(e) => handleIndicatorChange(e.target.value, "overlay", "aapl", 0)}>
//             <option value="abands">Acceleration Bands</option>
//             <option value="bb">Bollinger Bands</option>
//             <option value="dema">DEMA (Double Exponential Moving Average)</option>
//             <option value="ema">EMA (Exponential Moving Average)</option>
//             <option value="ikh">Ichimoku Kinko Hyo</option>
//             <option value="keltnerchannels">Keltner Channels</option>
//             <option value="linearRegression">Linear Regression</option>
//             <option value="pivotpoints">Pivot Points</option>
//             <option value="pc">Price Channel</option>
//             <option value="priceenvelopes">Price Envelopes</option>
//             <option value="psar">PSAR (Parabolic SAR)</option>
//             <option value="sma">SMA (Simple Moving Average)</option>
//             <option value="supertrend">Super Trend</option>
//             <option value="tema">TEMA (Triple Exponential Moving Average)</option>
//             <option value="vbp">VbP (Volume by Price)</option>
//             <option value="vwap">WMA (Weighted Moving Average)</option>
//             <option value="wma">VWAP (Volume Weighted Average Price)</option>
//             <option value="zigzag">Zig Zag</option>
//           </select>
//           <button onClick={() => removeIndicator("overlay")} className="mt-2 p-2 bg-red-500 text-white">Remove Overlay</button>
//         </div>
//         <div className="col">
//           <label htmlFor="oscillators" className="block text-lg font-medium text-gray-700">Oscillators:</label>
//           <select className="mt-1 block w-full p-2 bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="oscillators" onChange={(e) => handleIndicatorChange(e.target.value, "oscillator", "aapl", 1)}>
//             <option value="apo">Absolute price indicator</option>
//             <option value="ad">A/D (Accumulation/Distribution)</option>
//             <option value="aroon">Aroon</option>
//             <option value="aroonoscillator">Aroon oscillator</option>
//             <option value="atr">ATR (Average True Range)</option>
//             <option value="ao">Awesome oscillator</option>
//             <option value="cci">CCI (Commodity Channel Index)</option>
//             <option value="chaikin">Chaikin</option>
//             <option value="cmf">CMF (Chaikin Money Flow)</option>
//             <option value="disparityindex">Disparity Index</option>
//             <option value="cmo">CMO (Chande Momentum Oscillator)</option>
//             <option value="dmi">DMI (Directional Movement Index)</option>
//             <option value="dpo">Detrended price</option>
//             <option value="linearRegressionAngle">Linear Regression Angle</option>
//             <option value="linearRegressionIntercept">Linear Regression Intercept</option>
//             <option value="linearRegressionSlope">Linear Regression Slope</option>
//             <option value="klinger">Klinger Oscillator</option>
//             <option value="macd">MACD (Moving Average Convergence Divergence)</option>
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
//           <button onClick={() => removeIndicator("oscillator")} className="mt-2 p-2 bg-red-500 text-white">Remove Oscillator</button>
//         </div>
//       </div>
//       <HighchartsReact
//         highcharts={Highcharts}
//         constructorType={"stockChart"}
//         options={chartOptions}
//       />
//     </div>
//   );
// };

// export default HighchartsComponent;

// import React, { useEffect, useState } from 'react';
// import Highcharts from 'highcharts/highstock';
// import HighchartsReact from 'highcharts-react-official';
// import HC_more from 'highcharts/highcharts-more'; // For more complex chart types
// import IndicatorsCore from 'highcharts/indicators/indicators'; // Core indicators
// import IndicatorsAll from 'highcharts/indicators/indicators-all'; // All indicators
// import StockTools from 'highcharts/modules/stock-tools';

// // Initialize modules
// if (typeof Highcharts === 'object') {
//   HC_more(Highcharts);
//   IndicatorsCore(Highcharts);
//   IndicatorsAll(Highcharts);
//   StockTools(Highcharts);
// }

// const HighchartsComponent = () => {
//   const [chartOptions, setChartOptions] = useState({
//     chart: {
//       height: 600,
//     },
//     title: {
//       text: 'AAPL Historical',
//     },
//     subtitle: {
//       text: 'With dynamic indicators',
//     },
//     yAxis: [
//       {
//         height: '60%',
//       },
//       {
//         top: '65%',
//         height: '35%',
//       },
//     ],
//     rangeSelector: {
//       selected: 2,
//     },
//     plotOptions: {
//       series: {
//         showInLegend: true,
//       },
//     },
//     series: [
//       {
//         type: 'candlestick',
//         id: 'aapl',
//         name: 'AAPL',
//         data: [], // data will be loaded via useEffect
//       },
//       {
//         type: 'column',
//         id: 'volume',
//         name: 'Volume',
//         yAxis: 1,
//         data: [],
//       },
//     ],
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('https://demo-live-data.highcharts.com/aapl-ohlcv.json');
//       const data = await response.json();
//       const ohlc = data.map(point => [point[0], point[1], point[2], point[3], point[4]]);
//       const volume = data.map(point => [point[0], point[5]]);

//       setChartOptions(prev => ({
//         ...prev,
//         series: [
//           { ...prev.series.find(serie => serie.id === 'aapl'), data: ohlc },
//           { ...prev.series.find(serie => serie.id === 'volume'), data: volume },
//         ],
//       }));
//     };

//     fetchData();
//   }, []);

//   const handleIndicatorChange = (e, linkedTo) => {
//     const { value: type } = e.target;
//     const newIndicator = {
//       type,
//       id: type,
//       linkedTo: linkedTo,
//       yAxis: 0,
//       params: {
//         period: 14  // default period for many indicators, adjust as necessary
//       }
//     };

//     setChartOptions(prev => {
//       const existingIndex = prev.series.findIndex(serie => serie.id === type);
//       const newSeriesList = prev.series.slice();

//       if (existingIndex > -1) {
//         newSeriesList[existingIndex] = newIndicator;
//       } else {
//         newSeriesList.push(newIndicator);
//       }

//       return { ...prev, series: newSeriesList };
//     });
//   };

//   const removeIndicator = (type) => {
//     setChartOptions(prev => ({
//       ...prev,
//       series: prev.series.filter(serie => serie.id !== type),
//     }));
//   };

//   return (
//     <div className="main-wrapper">
//       <div className="selectors-container bg-gray-200 p-2 mb-4 flex flex-col md:flex-row justify-between">
//         <div className="col mb-2 md:mb-0">
//           <label htmlFor="overlays" className="block text-lg font-medium text-gray-700">Overlays:</label>
//           <select className="mt-1 block w-full p-2 bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="overlays" onChange={(e) => handleIndicatorChange(e, 'aapl')}>
//             <option value="">Select an Overlay</option>
//             <option value="sma">SMA (Simple Moving Average)</option>
//             <option value="ema">EMA (Exponential Moving Average)</option>
//             <option value="tema">TEMA (Triple Exponential Moving Average)</option>
//             <option value="bb">Bollinger Bands</option>
//           </select>
//           <button onClick={() => removeIndicator('overlay')} className="mt-2 p-2 bg-red-500 text-white">Remove Overlay</button>
//         </div>

//         <div className="col">
//           <label htmlFor="oscillators" className="block text-lg font-medium text-gray-700">Oscillators:</label>
//           <select className="mt-1 block w-full p-2 bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="oscillators" onChange={(e) => handleIndicatorChange(e, 'aapl')}>
//             <option value="">Select an Oscillator</option>
//             <option value="rsi">RSI (Relative Strength Index)</option>
//             <option value="macd">MACD (Moving Average Convergence Divergence)</option>
//             <option value="stochastic">Stochastic</option>
//           </select>
//           <button onClick={() => removeIndicator('oscillator')} className="mt-2 p-2 bg-red-500 text-white">Remove Oscillator</button>
//         </div>
//       </div>
//       <HighchartsReact
//         highcharts={Highcharts}
//         constructorType={"stockChart"}
//         options={chartOptions}
//       />
//     </div>
//   );
// };

// export default HighchartsComponent;

import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import addIndicatorsAll from "highcharts/indicators/indicators-all";

// Initialize the indicators module
addIndicatorsAll(Highcharts);

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
        data: [], // Initial data is empty, will be loaded via useEffect
      },
      {
        type: "column",
        id: "volume",
        name: "Volume",
        yAxis: 1,
        data: [], // Initial data is empty, will be loaded via useEffect
      },
    ],
  });
  const [overlay, setOverlay] = useState("");
  const [oscillator, setOscillator] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://demo-live-data.highcharts.com/aapl-ohlcv.json"
      );
      const data = await response.json();
      const ohlc = data.map((point) => [
        point[0],
        point[1],
        point[2],
        point[3],
        point[4],
      ]);
      const volume = data.map((point) => [point[0], point[5]]);

      setChartOptions((prev) => ({
        ...prev,
        series: [
          { ...prev.series.find((series) => series.id === "aapl"), data: ohlc },
          {
            ...prev.series.find((series) => series.id === "volume"),
            data: volume,
          },
        ],
      }));
    };

    fetchData();
  }, []);

  const handleIndicatorChange = (type, id, yAxis) => {
    setChartOptions((prev) => {
      const newSeries = {
        type,
        id,
        linkedTo: "aapl",
        yAxis,
        data: [],
      };

      return {
        ...prev,
        series: [
          ...prev.series.filter((series) => series.id !== id),
          newSeries,
        ],
      };
    });
  };

  const removeIndicator = (id) => {
    setChartOptions((prev) => ({
      ...prev,
      series: prev.series.filter((series) => series.id !== id),
    }));
  };

  return (
    <div className="main-wrapper">
      <div className="selectors-container bg-gray-200 p-2 mb-4 flex flex-row">
        <div className="selector">
          <label htmlFor="overlay">Overlay:</label>
          <select
            id="overlay"
            value={overlay}
            onChange={(e) => {
              setOverlay(e.target.value);
              handleIndicatorChange(e.target.value, e.target.value, 0);
            }}
          >
            <option value="abands">Acceleration Bands</option>
            <option value="bb">Bollinger Bands</option>
            <option value="dema">
              DEMA (Double Exponential Moving Average)
            </option>
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
            <option value="tema">
              TEMA (Triple Exponential Moving Average)
            </option>
            <option value="vbp">VbP (Volume by Price)</option>
            <option value="vwap">WMA (Weighted Moving Average)</option>
            <option value="wma">VWAP (Volume Weighted Average Price)</option>
            <option value="zigzag">Zig Zag</option>
          </select>
          <button
            onClick={() => {
              removeIndicator(overlay);
              setOverlay("");
            }}
          >
            Remove Overlay
          </button>
        </div>
        <div className="selector">
          <label htmlFor="oscillator">Oscillator:</label>
          <select
            id="oscillator"
            value={oscillator}
            onChange={(e) => {
              setOscillator(e.target.value);
              handleIndicatorChange(e.target.value, e.target.value, 1);
            }}
          >
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
            <option value="linearRegressionAngle">
              Linear Regression Angle
            </option>
            <option value="linearRegressionIntercept">
              Linear Regression Intercept
            </option>
            <option value="linearRegressionSlope">
              Linear Regression Slope
            </option>
            <option value="klinger">Klinger Oscillator</option>
            <option value="macd">
              MACD (Moving Average Convergence Divergence)
            </option>
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
          <button
            onClick={() => {
              removeIndicator(oscillator);
              setOscillator("");
            }}
          >
            Remove Oscillator
          </button>
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
