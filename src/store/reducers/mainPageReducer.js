import mainPageConstants from "../constant/mainPage";
import fakeData from "../../service/fakeData/index";

/**
 * Contains the State Related to the Login Credentials
 *
 */
const initialState = {
  formData: {
    geoLocation: {
      value: "",
      error: {
        isError: false,
        msg: ""
      }
    },
    filterType: {
      value: "1",
      error: {
        isError: false,
        msg: ""
      }
    },
    userId: {
      value: "",
      error: {
        isError: false,
        msg: ""
      }
    }
  },

  categoryData: {
    value: fakeData
  }
};

const mainPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case mainPageConstants.updateFormData: {
      return {
        ...state,
        formData: { ...action.data }
      };
    }
    case mainPageConstants.updateGeoLocationValidation: {
      return {
        ...state,
        formData: { ...state.formData, geoLocation: { ...action.data } }
      };
    }
    case mainPageConstants.mainPageFormDataSuccess: {
      return {
        ...state,
        categoryData: { value: action.data }
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default mainPageReducer;