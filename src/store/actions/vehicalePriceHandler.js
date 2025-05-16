import * as actionTypes from "../actions/actionTypes";


export const vehicalinformationHandler = (payload) => {
    return {
      type: actionTypes.VEHICAL_PRICE_HANDLER,
      priceHandler: payload,
    };
  };