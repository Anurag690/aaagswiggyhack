import fetch from "./core";

async function fetchCategoryData(requestPayload) {
  try {
    // const url = "http://172.16.120.184:5000/recommendation";
    const url = "http://192.168.43.121:5000/recommendation";
    // const url = "172.16.120.184:5000/recommendation";
    const fetchObject = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: requestPayload ? JSON.stringify(requestPayload) : {}
    };
    return new Promise(async (resolve, reject) => {
      try {
        const fetchResult = await fetch(url, fetchObject);
        const response = await fetchResult.json();
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  } catch (error) {
    console.log("%c some error ", "background: salmon; color: black", error);
  }
}

export default { fetchCategoryData };
