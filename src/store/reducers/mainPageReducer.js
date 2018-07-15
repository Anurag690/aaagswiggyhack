import mainPageConstants from "../constant/mainPage";

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

    default: {
      return { ...state };
    }
  }
};

export default mainPageReducer;
