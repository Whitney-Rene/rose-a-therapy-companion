import URL from "./variables";

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
    // console.log(responseData)
  } catch (error) {
    console.error("Error while adding contact:", error);
  }
};

export default { getRequest, postRequest };
