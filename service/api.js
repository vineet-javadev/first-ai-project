import axios from 'axios';

// url for localhost
// const url = "http://localhost:8080";

// url for live server
const url = "https://firstai-project-backend.onrender.com";

export const getData = async (message) => {
  try {
    const updateUrl = `${url}/ai/generate?prompt=${encodeURIComponent(message)}`;
    const response = await axios.get(updateUrl);
    return response.data;
  } catch (error) {
    // console.error('Error fetching data:', error.response?.data || error.message);
    alert("SERVER ERROR : Data unable to fetch");
    // throw error; // Rethrow the error for handling at the call site
  }
};

export const checkServerStatus = async () => {
  try{
    const response = await axios.get(url+"/status");
    return response.data;
  } catch (error){
    // console.error('Error fetching data:', error.response?.data || error.message);
    alert("SERVER ERROR : I am really Sorry for this Inconvenience.");
  }
}