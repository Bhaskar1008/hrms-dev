import { isEmpty } from "lodash";
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import { stoageGetter } from "../../helpers";
import _ from "lodash";

const initialState = {
  pwa: true,
};

const pwaOfflineFlag = (state, action) => {
  console.log("pwa-state", state);
  console.log("pwa-action", action);

  // Your logic to update state based on action
  return {
    ...state,
    pwa: action.formData.name,
  };
};

const reducer = (state = initialState, action) => {
  console.log("action3", action);
  switch (action.type) {
    // lead
    case actionTypes.OFFLINE_STORE_FLAG:
      return pwaOfflineFlag(state, action);

    default:
      return state;
  }
};

export default reducer;
