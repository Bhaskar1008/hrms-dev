import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tripInfo: null,
  travelUserInfo: null,
  travelPolicyData: null,
  travelQuotationDetails: null,
  travelUserDetailedInfo: null,
  travelersInfo: null,
  travelPolicyQuotationData: null
};

const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TRIP_INFO:
      return {
        ...state,
        tripInfo: action.payload,
      };
    case actionTypes.SET_TRAVEL_USER_DETAILS:
      return {
        ...state,
        travelUserInfo: action.payload,
      };
    case actionTypes.SET_TRAVEL_POLICY_DETAILS:
      return {
        ...state,
        travelPolicyData: action.payload,
      };
    case actionTypes.SET_TRAVEL_QUOTATION_DETAILS:
      return {
        ...state,
        travelQuotationDetails: action.payload,
      };
    case actionTypes.SET_TRAVEL_CUSTOMER_INFO:
      return {
        ...state,
        travelUserDetailedInfo: action.payload,
      };
    case actionTypes.SET_TRAVELER_INFO:
      return {
        ...state,
        travelersInfo: action.payload,
      };
    case actionTypes.SET_TRAVEL_POLICY_QUOTATION:
      return {
        ...state,
        travelPolicyQuotationData: action.payload,
      };
    case actionTypes.SET_TRAVEL_RESET_QUOTATION:
      return initialState;
    default:
      return state;
  }
};

export default tripReducer;
