// import { useState, useEffect } from "react";

// import axios from "axios";

// const BraneGet = (url) => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const getData = async () => {
//       const data = await axios.get(url);

//       setData(data);
//     };

//     getData();
//   }, [url]);

//   return [data];
// };

// export default BraneGet;

import axios from 'axios';

export const braneGet = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
