import URL from "./variables";

//add 2 more variables, put/patch and delete requests

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
