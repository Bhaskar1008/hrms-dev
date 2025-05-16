import { SAVE_COMPANY_DETAILS } from "../actions/actionTypes";

const initialState = {
  companyDetails: {},
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_COMPANY_DETAILS:
      return {
        ...state,
        companyDetails: action.payload,
      };
    default:
      return state;
  }
};

export default companyReducer;