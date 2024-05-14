export const getCachedData = (key) => {
    const cached = localStorage.getItem(key);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      if (new Date().getTime() - timestamp < oneDay) {
        return data;
      }
    }
    return null;
  };
  
  export const setCachedData = (key, data) => {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: new Date().getTime(),
      })
    );
  };
  