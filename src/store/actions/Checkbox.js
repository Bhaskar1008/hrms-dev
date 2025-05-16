import * as actionTypes from "./actionTypes";

export const setChangeCheckboxState = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_CHECKBOX_INFO, payload: data });
};
