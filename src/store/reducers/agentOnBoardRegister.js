import { isEmpty } from "lodash";
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import { stoageGetter } from "../../helpers";
import _ from "lodash";


const initialState = {
  formData: {},
  leadDataloading: false,
  createAgentONBoardLoading: false
};

const storeAgentONBoardForm = (state, action) => {
  const payload = { ...state.formData, ...action.formData };
  return updateObject(state, {
    createLeadLoading: true,
    formData: payload,
  });
};

const storeAgentONBoardLisenceForm = (state, action) => {
  const payload = { ...state.LisenceForm, ...action.LisenceForm };
  return updateObject(state, {
    createLeadLoading: true,
    LisenceForm: payload,
  });
};

// agent all status form store 
const storeAgentAllApplicationForm = (state, action) => {
  const payload = { ...state.allApplicationForm, ...action.allApplicationForm };
  return updateObject(state, {
    createLeadLoading: true,
    allApplicationForm: payload,
  });
};

const reducer = (state = initialState, action) => {
  
  switch (action.type) {  
    case actionTypes.CREATE_AGENTONBOARD_STORE_SUCCESS:
      return storeAgentONBoardForm(state, action);
      case actionTypes.CREATE_AGENTONBOARD_LISENCEFORM_STORE_SUCCESS:
        return storeAgentONBoardLisenceForm(state, action);
        case actionTypes.CREATE_AGENTONALLAPLICATIONFORM_STORE_SUCCESS:
        return storeAgentAllApplicationForm(state, action);

      // reset form data
      case actionTypes.RESET_AGENT_ON_BOARD_FORM_DATA:
      return {...initialState};

    default:
      return state;
  }
};

export default reducer;