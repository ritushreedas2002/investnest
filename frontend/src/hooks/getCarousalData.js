import axios from "axios";
export const getCarousalData = async (currency) => {
    console.log(`Fetching data for currency: ${currency}`);
    const options = {
      method: "GET",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
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
  
  