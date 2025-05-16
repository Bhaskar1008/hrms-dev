import * as actionTypes from "./actionTypes";
import axiosRequest from "../../axios-request/request.methods";

//  U
export const fetchCustomerJWTStart = () => {
  return {
    type: actionTypes.FETCH_CUSTOMER_JWT_STORE_START,
  };
};

export const fetchCustomerJWTSuccess = (formData) => {
  return {
    type: actionTypes.FETCH_CUSTOMER_JWT_STORE_SUCCESS,
    formData: formData,
  };
};

export const fetchCustomerJWTFail = (error) => {
  return {
    type: actionTypes.FETCH_CUSTOMER_JWT_STORE_FAIL,
    error: error,
  };
};

export const fetchCustomerJWT = (formData, cb = null) => {
    return (dispatch) => {
      dispatch(fetchCustomerJWTStart());
      return axiosRequest
        .post(`customer/jwtDecrypt`, formData)
        .then((res) => {
            let pdfRes = res?.data
            console.log("pdfRes===>", pdfRes);
            if (typeof cb == 'function') {
              cb(pdfRes);
            }
          return dispatch(fetchCustomerJWTSuccess(pdfRes));
        })
        .catch((error) => {
          
          if (typeof cb == 'function') {
            cb(error);
          }
          return dispatch(fetchCustomerJWTFail(error));
        });
    };
  };