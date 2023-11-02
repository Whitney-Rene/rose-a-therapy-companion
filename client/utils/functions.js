//my intent is to use this function in the homepage comp of app.jsx, I'd like to house it here to make my code cleaner
//I want to learn how to possibly resuse line 8? can the http be saved as a variable and I add diff endpoints based my server?

import URL from "./variables";

const getRequests = async (endpoint) => {
  try {
    const response = await fetch(`${URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occured:", error);
  }
};

export default getRequests;
