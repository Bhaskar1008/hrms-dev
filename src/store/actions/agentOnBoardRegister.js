// import * as actionTypes from "./actionTypes";
// import axiosRequest from "../../axios-request/request.methods";

// export const resetFormAgentONBoardData = () => {
//   return {
//     type: actionTypes.RESET_AGENT_ON_BOARD_FORM_DATA,
//   };
// };

// export const storeAgentONBoardForm = (formData, succMsg) => {
//   return {
//     type: actionTypes.CREATE_AGENTONBOARD_STORE_SUCCESS,
//     formData: formData,
//     succMsg: succMsg,
//   };
// };

// export const storeAgentONBoardLisenceForm = (payload, succMsg) => {
//   return {
//     type: actionTypes.CREATE_AGENTONBOARD_LISENCEFORM_STORE_SUCCESS,
//     LisenceForm: payload,
//     succMsg: succMsg,
//   };
// };

// // all form submit status store 
// export const storeAgentAllApplicationForm = (payload, succMsg) => {
//   return {
//     type: actionTypes.CREATE_AGENTONALLAPLICATIONFORM_STORE_SUCCESS,
//     allApplicationForm: payload,
//   };
// };

import * as actionTypes from "./actionTypes";
import axiosRequest from "../../axios-request/request.methods";

export const resetFormAgentONBoardData = () => {
  return {
    type: actionTypes.RESET_AGENT_ON_BOARD_FORM_DATA,
  };
};

export const storeAgentONBoardForm = (formData, succMsg) => {
  return {
    type: actionTypes.CREATE_AGENTONBOARD_STORE_SUCCESS,
    formData: formData,
    succMsg: succMsg,
  };
};

// all form submit status store 
export const storeAgentAllApplicationForm = (payload, succMsg) => {
  return {
    type: actionTypes.CREATE_AGENTONALLAPLICATIONFORM_STORE_SUCCESS,
    allApplicationForm: payload,
  };
};

export const GetAllResubitformDataForm = (payload, succMsg) => {
  return {
    type: actionTypes.GET_ALLAGENTFORM_STORE,
    allResubmitForm: payload,
  };
};

export const LoginMobileNumber = (payload) => {
  return {
      type: actionTypes.CUSTOMER_LOGIN_MOBILE_TOKEN,
      CustomerLoginMobile: payload,
  };
};

export const StoreLiAff = (payload) => {
  return {
      type: actionTypes.LI_AFFI_TEXT,
      liaff: payload,
  };
};


