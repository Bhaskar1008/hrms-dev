import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialMake = {
  // make
  JWTDecryptData: {},
  fetch_JWTDecryptStore_Loading: false,
  fetch_JWTDecryptStore_Error: "",
}

const fetchCustomerJWTStart = (state, action) => {
    return updateObject(state, { fetch_JWTDecryptStore_Loading: true });
  };
  
  const fetchCustomerJWTSuccess = (state, action) => {
    return updateObject(state, {
        fetch_JWTDecryptStore_Loading: false,
        JWTDecryptData: action,
    });
  };
  const fetchCustomerJWTFail = (state, action) => {
    return updateObject(state, {
        fetch_JWTDecryptStore_Loading: false,
        fetch_JWTDecrypt_Error: action.error,
    });
  };

  const reducer = (state = initialMake, action) => {
    switch (action.type) {
      //state
      case actionTypes.FETCH_CUSTOMER_JWT_STORE_START:
        return fetchCustomerJWTStart(state, action,);
      case actionTypes.FETCH_CUSTOMER_JWT_STORE_SUCCESS:
        return fetchCustomerJWTSuccess(state, action);
      case actionTypes.FETCH_CUSTOMER_JWT_STORE_FAIL:
        return fetchCustomerJWTFail(state, action);
        default:
            return state;
    }
};

export default reducer