import * as actionTypes from "./actionTypes";
import axiosRequest from "../../axios-request/request.methods";



export const resetMotorFormData = () => {
  return {
    type: actionTypes.RESET_MOTOR_FORM_DATA,
  };
};

export const motorQuotationForm = (formData, succMsg) => {
  return {
    type: actionTypes.MOTOR_FORM_STORE,
    formData: formData,
    succMsg: succMsg,
  };
};

export const createMotorQuotationStart = () => {
  return {
    type: actionTypes.CREATE_MOTOR_QUOTATION_START,
  };
};

export const createMotorQuotationSuccess = (formData, succMsg) => {
  return {
    type: actionTypes.CREATE_MOTOR_QUOTATION_SUCCESS,
    formData: formData,
    succMsg: succMsg,
  };
};
export const motorFormalQuotationForm = (formData, succMsg) => {
  return {
    type: actionTypes.MOTOR_FORMAL_FORM_STORE,
    formData: formData,
    succMsg: succMsg,
  };
};
export const motorPolicyStore = (formData, succMsg) => {
  return {
    type: actionTypes.MOTOR_POLICY_FORM_STORE,
    formData: formData,
    succMsg: succMsg,
  };
};

export const createMotorQuotationFail = (error) => {
  return {
    type: actionTypes.CREATE_MOTOR_QUOTATION_FAIL,
    error: error,
  };
};

export const createMotorQuotation = (formData) => {
  return async (dispatch) => {
    dispatch(createMotorQuotationStart());
    // let result = await axiosRequest.post("user/ctpl-quotation", formData, {
    //   secure: true,
    // });

    if (formData?.statusCode == -1) {
      return dispatch(createMotorQuotationSuccess(formData));
    } else if (formData?.statusCode == 1) {
      return dispatch(createMotorQuotationFail(formData));
    }
  };
};
