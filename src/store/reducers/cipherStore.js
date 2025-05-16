import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialMake = {
  // make
  SaveCipherTEXT: {},
  fetch_SaveCipherStore_Loading: false,
  fetch_SaveCipherStore_Error: "",
}

const fetchSaveCipherTextStart = (state, action) => {
    return updateObject(state, { fetch_SaveCipherStore_Loading: true });
  };
  
  const fetchSaveCipherTextSuccess = (state, action) => {
    return updateObject(state, {
        fetch_SaveCipherStore_Loading: false,
        SaveCipherTEXT: action,
    });
  };
  const fetchSaveCipherTextFail = (state, action) => {
    return updateObject(state, {
        fetch_SaveCipherStore_Loading: false,
        fetch_savePdf_Error: action.error,
    });
  };

  const reducer = (state = initialMake, action) => {
    switch (action.type) {
      //state
      case actionTypes.FETCH_SAVE_STORE_CIPHER_TEXT_START:
        return fetchSaveCipherTextStart(state, action,);
      case actionTypes.FETCH_SAVE_STORE_CIPHER_TEXT_SUCCESS:
        return fetchSaveCipherTextSuccess(state, action);
      case actionTypes.FETCH_SAVE_STORE_CIPHER_TEXT_FAIL:
        return fetchSaveCipherTextFail(state, action);
        default:
            return state;
    }
};

export default reducer