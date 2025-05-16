import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  formData:{}
};

const vehicalinformationHandler = (state, action) => {
    // const payload = { ...state.formData, ...action.priceHandler };
    return updateObject(state, {
      formData: action.priceHandler,
      // childParsedData:childParsedData,
    });
  };
  

const vehicalePriceHandler = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VEHICAL_PRICE_HANDLER:
        return vehicalinformationHandler(state, action);
    default:
      return state;
  }
};

export default vehicalePriceHandler;
