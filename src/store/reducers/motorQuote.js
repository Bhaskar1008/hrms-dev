import { isEmpty } from "lodash";
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import { stoageGetter } from "../../helpers";
import _ from "lodash";

const initialState = {
  formData: {},
  leadDataloading: false,
  createMotorQuotationLoading: false,
  motorQutotionSucess: {},
  formalQuotationSucess: {},
  motorPolicyResponse: {}

};

const motorQuotationForm = (state, action) => {
  const payload = { ...state.formData, ...action.formData };
  return updateObject(state, {
    createLeadLoading: true,
    formData: payload,
    // childParsedData:childParsedData,
  });
};

const createMotorQuotationStart = (state, action) => {
  return updateObject(state, {
    createMotorQuotationLoading: true,
    leadDataloading: true,
  });
};

const createMotorQuotationSuccess = (state, action) => {
  const payload = { ...state.formData, ...action.formData };
  return updateObject(state, {
    // leadDataloading: false,
    // createCTPLQuotationLoading: false,
    motorQutotionSucess: payload,
    leadId: action.formData._id,
    // userId:action.formData.userId,
    successMsg: action.succMsg,
  });
};
const motorFormalQuotationForm = (state, action) => {
 
  const payload = { ...state.formData, ...action.formData };
  return updateObject(state, {
    // leadDataloading: false,
    // createCTPLQuotationLoading: false,
    formalQuotationSucess: payload,
    leadId: action.formData._id,
    // userId:action.formData.userId,
    successMsg: action.succMsg,
  });
};
const motorPolicyStore = (state, action) => {
  
  const payload = { ...state.formData, ...action.formData };
  return updateObject(state, {
    // leadDataloading: false,
    // createCTPLQuotationLoading: false,
    motorPolicyResponse: payload,
    leadId: action.formData._id,
    // userId:action.formData.userId,
    successMsg: action.succMsg,
  });
};

const createMotorQuotationFail = (state, action) => {
  return updateObject(state, {
    createMotorQuotationLoading: false,
    createMotorQuotationError: action.error,
    leadDataloading: false,
    errorMessage: action.error,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // motor quotation

    case actionTypes.CREATE_MOTOR_QUOTATION_START:
      return createMotorQuotationStart(state, action);
    case actionTypes.CREATE_MOTOR_QUOTATION_SUCCESS:
      return createMotorQuotationSuccess(state, action);
    // this formal quotation
    case actionTypes.MOTOR_FORMAL_FORM_STORE:
      return motorFormalQuotationForm(state, action);

    // this for ther policy
    case actionTypes.MOTOR_POLICY_FORM_STORE:
      return motorPolicyStore(state, action);
    //
    case actionTypes.CREATE_MOTOR_QUOTATION_FAIL:
      return createMotorQuotationFail(state, action);

    case actionTypes.MOTOR_FORM_STORE:
      return motorQuotationForm(state, action);

    // reset form data
    case actionTypes.RESET_MOTOR_FORM_DATA:
      return { ...initialState };

    default:
      return state;
  }
};

export default reducer;
