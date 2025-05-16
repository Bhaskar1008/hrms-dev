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

const storeAgentONBoardLisenceForm = (state, action) => {
    const payload = { ...state.formData, ...action.formData };
    return updateObject(state, {
      createLeadLoading: true,
      formData: payload,
    });
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {  
        case actionTypes.CREATE_AGENTONBOARD_LISENCEFORM_STORE_SUCCESS:
          return storeAgentONBoardLisenceForm(state, action);
        // reset form data
        case actionTypes.RESET_LICENSED_AFFILIATES_DATA:
        return {...initialState};
  
      default:
        return state;
    }
  };

  export default reducer;