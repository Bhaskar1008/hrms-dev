import * as actionTypes from "./actionTypes";
import axiosRequest from "../../axios-request/request.methods";


//  U
export const fetchSaveQuotaionPDFStart = () => {
  return {
    type: actionTypes.FETCH_SAVEQUOTATIONPDF_START,
  };
};

export const fetchSaveQuotaionPDFSuccess = (formData) => {
  return {
    type: actionTypes.FETCH_SAVEQUOTATIONPDF_SUCCESS,
    formData: formData,
  };
};

export const fetchSaveQuotaionPDFFail = (error) => {
  return {
    type: actionTypes.FETCH_SAVEQUOTATIONPDF_FAIL,
    error: error,
  };
};

export const fetchAllSaveQuotaionPDF = (formData, cb = null) => {
    return (dispatch) => {
      dispatch(fetchSaveQuotaionPDFStart());
      return axiosRequest
        .post(`user/printQuote`, formData)
        .then((res) => {
            let pdfRes = res?.data
            console.log("pdfRes===>", pdfRes);
            if (typeof cb == 'function') {
              cb(pdfRes);
            }
          return dispatch(fetchSaveQuotaionPDFSuccess(pdfRes));
        })
        .catch((error) => {
          
          if (typeof cb == 'function') {
            cb(error);
          }
          return dispatch(fetchSaveQuotaionPDFFail(error));
        });
    };
  };