import { isEmpty } from "lodash";
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import { stoageGetter } from "../../helpers";
import _ from "lodash";


const initialState = {
  formData: {},
  leadDataloading: false,
  createCTPLQuotationLoading: false
};

const storeQuotationForm = (state, action) => {
  const payload = { ...state.formData, ...action.formData };
  return updateObject(state, {
    createLeadLoading: true,
    formData: payload,
    // childParsedData:childParsedData,
  });
};

const createCTPLQuotationStart = (state, action) => {
  return updateObject(state, {
    createCTPLQuotationLoading: true,
    leadDataloading: true,
  });
};


const createCTPLQuotationSuccess = (state, action) => {
  const payload = { ...state.formData, ...action.formData };
  return updateObject(state, {
    // leadDataloading: false,
    // createCTPLQuotationLoading: false,
    formData: payload,
    leadId: action.formData._id,
    // userId:action.formData.userId,
    successMsg: action.succMsg,
  });
};


const createCTPLQuotationFail = (state, action) => {
  return updateObject(state, {
    createCTPLQuotationLoading: false,
    createCTPLQuotationError: action.error,
    leadDataloading: false,
    errorMessage: action.error,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // lead
    case actionTypes.CREATE_CTPL_QUOTATION_START:
      return createCTPLQuotationStart(state, action);
    case actionTypes.CREATE_CTPL_QUOTATION_SUCCESS:
      return createCTPLQuotationSuccess(state, action);
    case actionTypes.CREATE_CTPL_QUOTATION_FAIL:
      return createCTPLQuotationFail(state, action);
      
    case actionTypes.CREATE_CTPL_STOREFORMQUOTATION_SUCCESS:
      return storeQuotationForm(state, action);

      // reset form data
      case actionTypes.RESET_FORM_DATA:
      return {...initialState};

    default:
      return state;
  }
};

export default reducer;