import * as actionTypes from "./actionTypes";
import axiosRequest from "../../axios-request/request.methods";

export const resetFormData = () => {
  return {
    type: actionTypes.RESET_FORM_DATA,
  };
};

export const storeQuotationForm = (formData, succMsg) => {
  return {
    type: actionTypes.CREATE_CTPL_STOREFORMQUOTATION_SUCCESS,
    formData: formData,
    succMsg: succMsg,
  };
};

export const createCTPLQuotationStart = () => {
  return {
    type: actionTypes.CREATE_CTPL_QUOTATION_START,
  };
};

export const createCTPLQuotationSuccess = (formData, succMsg) => {
  return {
    type: actionTypes.CREATE_CTPL_QUOTATION_SUCCESS,
    formData: formData,
    succMsg: succMsg,
  };
};

export const createCTPLQuotationFail = (error) => {
  return {
    type: actionTypes.CREATE_CTPL_QUOTATION_FAIL,
    error: error,
  };
};

export const createCTPLQuotation = (formData, cb = null) => {
 
  return async (dispatch) => {
    dispatch(createCTPLQuotationStart());
    if (formData?.statusCode == -1) {
      return dispatch(createCTPLQuotationSuccess(formData));
    } else if (formData?.statusCode == 1) {
      return dispatch(createCTPLQuotationFail(formData));
    }
  };
};
