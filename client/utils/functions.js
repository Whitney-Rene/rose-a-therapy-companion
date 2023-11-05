import URL from "./variables";
import moment from "moment";

//FUTURE PLANS:
//add 2 more functions, put/patch and delete requests

//this is an async call to backend, specifically for get requests
const getRequest = async (endpoint) => {
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

//this is an async call to backend, specifically for get post requests
const postRequest = async (endpoint, data) => {
  try {
    const response = await fetch(`${URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error while adding contact:", error);
  }
};

const patchRequest = async (endpoint, entry_id, data) => {
  try {
    const response = await fetch(`${URL}${endpoint}/${entry_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to update entry");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error updating contact:", error);
  }
};

function formatTime(rawDate) {
  const dateObject = moment(rawDate);
  const formattedDate = dateObject.format("MMMM D, YYYY");
  return formattedDate;
}

export default { getRequest, postRequest, patchRequest, formatTime };
