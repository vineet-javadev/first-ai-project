import axios from 'axios';

const url = "http://localhost:8080";

export const getData = async (message) => {
  try {
    const updateUrl = `${url}/ai/generate?prompt=${encodeURIComponent(message)}`;
    const response = await axios.get(updateUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response?.data || error.message);
    throw error; // Rethrow the error for handling at the call site
  }
};
