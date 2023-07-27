// Devloper Rakesh 
// import axios from 'axios';

// export const braneGet = async (url) => {
//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const braneGet = async (url) => {

  try {

    const response = await fetch(url);




    if (!response.ok) {

      // If the response status is not in the range of 200-299, it's considered an error

      throw new Error(`Request failed with status ${response.status}`);

    }


    const data = await response.json();

    return data;

  } catch (error) {

    throw new Error(error.message);

  }

};
