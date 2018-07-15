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

  isLoading: false,

  categoryData: {
    // value: fakeData
    value: []
  },

  selectedCategoryObj: {
    value: {},
    itemsArr: [],
    categoryName: ""
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
    case mainPageConstants.mainPageFormDataRequest: {
      return {
        ...state,
        isLoading: true
      };
    }
    case mainPageConstants.mainPageFormDataSuccess: {
      return {
        ...state,
        isLoading: false,
        categoryData: { value: action.data }
      };
    }
    case mainPageConstants.mainPageFormDataFail: {
      return {
        ...state,
        isLoading: false
      };
    }
    case mainPageConstants.updatedSelectedCategory: {
      let categoryName = "";
      let itemsArr = [];
      if (action.filterType === 1) {
        categoryName = Object.keys(action.data)[0];
        itemsArr = action.data[categoryName];
      } else {
        itemsArr = action.data;
      }
      return {
        ...state,
        selectedCategoryObj: {
          value: action.data,
          categoryName,
          itemsArr
        }
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default mainPageReducer;
