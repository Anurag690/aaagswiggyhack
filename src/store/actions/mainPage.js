import mainPageConstants from "../constant/mainPage";

function updateFormData(formData) {
  return {
    type: mainPageConstants.updateFormData,
    data: formData
  };
}

export default { updateFormData };
