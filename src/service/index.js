import fetch from "./core";

async function fetchCategoryData(requestPayload) {
  try {
    const url = "http://172.16.120.184:5000/recommendation";
    const fetchObject = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: requestPayload
    };
    return fetch(url, fetchObject);
  } catch (error) {
    console.log("%c some error ", "background: salmon; color: black", error);
  }
}

export default { fetchCategoryData };
