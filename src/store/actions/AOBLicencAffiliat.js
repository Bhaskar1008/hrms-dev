import * as actionTypes from "./actionTypes";
import axiosRequest from "../../axios-request/request.methods";

export const resetLicencseAfiliateForm = () => {
    return {
      type: actionTypes.RESET_LICENSED_AFFILIATES_DATA,
    };
  };



export const storeAgentONBoardLisenceForm = (formData, succMsg) => {
    return {
      type: actionTypes.CREATE_AGENTONBOARD_LISENCEFORM_STORE_SUCCESS,
      formData: formData,
      succMsg: succMsg,
    };
  };