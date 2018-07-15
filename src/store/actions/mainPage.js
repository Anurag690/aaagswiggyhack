import mainPageConstants from "../constant/mainPage";

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

export default { updateFormData, updateGeoLocationValidation };
