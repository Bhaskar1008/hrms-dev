import * as actionTypes from "../actions/actionTypes";

export const setTravelInfo = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_TRIP_INFO, payload: data });
};

export const setTravelUserDetails = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_TRAVEL_USER_DETAILS, payload: data });
};

export const setTravelPolicyDetails = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_TRAVEL_POLICY_DETAILS, payload: data });
};

export const setQuotationDetails = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_TRAVEL_QUOTATION_DETAILS, payload: data });
};

export const setTravelCustomerInfo = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_TRAVEL_CUSTOMER_INFO, payload: data });
};

export const setTravelerInfo = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_TRAVELER_INFO, payload: data });
};

export const setPolicyGeneratedInfo = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_TRAVEL_POLICY_QUOTATION, payload: data });
};
export const setPolicyResetdInfo = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_TRAVEL_RESET_QUOTATION });
};
