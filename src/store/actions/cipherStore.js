import * as actionTypes from "./actionTypes";
import axiosRequest from "../../axios-request/request.methods";

//  U
export const fetchSaveCipherTextStart = () => {
  return {
    type: actionTypes.FETCH_SAVE_STORE_CIPHER_TEXT_START,
  };
};

export const fetchSaveCipherTextSuccess = (formData) => {
  return {
    type: actionTypes.FETCH_SAVE_STORE_CIPHER_TEXT_SUCCESS,
    formData: formData,
  };
};

export const fetchSaveCipherTextFail = (error) => {
  return {
    type: actionTypes.FETCH_SAVE_STORE_CIPHER_TEXT_FAIL,
    error: error,
  };
};

export const fetchSaveCipherText = (formData, cb = null) => {
    return (dispatch) => {
      dispatch(fetchSaveCipherTextStart());
      return axiosRequest
        .post(`customer/shareableLink`, formData)
        .then((res) => {
            let pdfRes = res
            console.log("pdfRes===>", pdfRes);
            if (typeof cb == 'function') {
              cb(pdfRes);
            }
          return dispatch(fetchSaveCipherTextSuccess(pdfRes));
        })
        .catch((error) => {
          
          if (typeof cb == 'function') {
            cb(error);
          }
          return dispatch(fetchSaveCipherTextFail(error));
        });
    };
  };