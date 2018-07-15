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

function fetchCategoryDataFromServer(requestPayload) {
  return async (dispatch, getState) => {
    try {
      dispatch(mainPageFormDataRequest());
      const response = await categoryService.fetchCategoryData(requestPayload);
      //   const response = fakeData;
      dispatch(mainPageFormDataSuccess(response));
    } catch (error) {
      alert("Error in Fetching the Data");
      console.log("%c error ", "background: salmon; color: black", error);
      dispatch(mainPageFormDataFail(error));
    }
  };
}

export default {
  updateFormData,
  updateGeoLocationValidation,
  fetchCategoryDataFromServer
};
