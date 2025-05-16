import * as actionTypes from "./actionTypes";
// import axios from '../../axios-common';
import axiosRequest from "../../axios-request/request.methods";

// Fetch leads data
export const fetchHistoryStart = () => {
  return {
    type: actionTypes.FETCH_HISTORY_START,
  };
};

export const fetchHistorySuccess = (history) => {
  return {
    type: actionTypes.FETCH_HISTORY_SUCCESS,
    history: history,
  };
};

export const fetchHistoryFail = (error) => {
  return {
    type: actionTypes.FETCH_HISTORY_FAIL,
    error: error,
  };
};

export const fetchHistory = (leadId, userId) => {
  return (dispatch) => {
    dispatch(fetchHistoryStart());
    return axiosRequest
      .get(`user/leadhistory/${leadId}?user_id=${userId}`, { secure: true })
      .then((res) => {
        if (res.data.length > 0) {
          const response = res.data;
          return dispatch(fetchHistorySuccess(response));
        } else {
          throw res.data;
        }
      })
      .catch((error) => {
        return dispatch(fetchHistoryFail(error));
      });
  };
};
