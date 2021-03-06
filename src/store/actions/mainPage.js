import mainPageConstants from "../constant/mainPage";
import categoryService from "../../service/index";

import fakeData from "../../service/fakeData/index";

function updateFormData(formData) {
  return {
    type: mainPageConstants.updateFormData,
    data: formData
  };
}
function updateGeoLocationValidation(geoLocationObj) {
  return {
    type: mainPageConstants.updateGeoLocationValidation,
    data: geoLocationObj
  };
}

function mainPageFormDataRequest() {
  return {
    type: mainPageConstants.mainPageFormDataRequest,
    data: true
  };
}

function mainPageFormDataSuccess(response) {
  return {
    type: mainPageConstants.mainPageFormDataSuccess,
    data: response
  };
}
function mainPageFormDataFail(errorResponse) {
  return {
    type: mainPageConstants.mainPageFormDataFail,
    error: errorResponse
  };
}

function fetchCategoryDataFromServer(requestPayload, historyObj) {
  return async (dispatch, getState) => {
    try {
      dispatch(mainPageFormDataRequest());
      const response = await categoryService.fetchCategoryData(requestPayload);
      //   const response = fakeData;
      if (requestPayload.flag === 2) {
        dispatch(updateSelectedCategoryCard([]));
        dispatch(updateSelectedCategoryCard(response, 2));
        historyObj.push("/items");
      } else {
        dispatch(mainPageFormDataSuccess(response));
      }
    } catch (error) {
      alert("Error in Fetching the Data");
      console.log("%c error ", "background: salmon; color: black", error);
      dispatch(mainPageFormDataFail(error));
    }
  };
}

function updateSelectedCategoryCard(categoryObj, filterType = 1) {
  return {
    type: mainPageConstants.updatedSelectedCategory,
    data: categoryObj,
    filterType
  };
}

export default {
  updateFormData,
  updateGeoLocationValidation,
  fetchCategoryDataFromServer,
  updateSelectedCategoryCard
};
