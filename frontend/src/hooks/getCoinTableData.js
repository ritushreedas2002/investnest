import axios from "axios";
export const getCoinTableData = async (currency,currentPage) => {
    console.log(`Fetching data for currency: ${currency}`);
    const options = {
      method: "GET",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=${currentPage}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`,
      headers: {
        // Example header, replace or remove as needed
        "x-cg-demo-api-key": "CG-YkDCZeia3Rt81Xesk36q17Mq",
      },
    };
  
    try {
      const response = await axios.request(options);
      console.log(response);
      return response.data; // Correct way to access data with Axios
    } catch (error) {
      console.error(error);
      // Handle error appropriately
      return []; // or return null, or throw, depending on your error handling strategy
    }
  };