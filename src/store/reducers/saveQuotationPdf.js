import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialMake = {
  // make
  SaveQuotaionPDF: {},
  fetch_SaveQuotaionPDF_Loading: false,
  fetch_SaveQuotaionPDF_Error: "",
}

const fetchSaveQuotaionPDFStart = (state, action) => {
    return updateObject(state, { fetch_SaveQuotaionPDF_Loading: true });
  };
  
  const fetchSaveQuotaionPDFSuccess = (state, action) => {
    return updateObject(state, {
        fetch_SaveQuotaionPDF_Loading: false,
        SaveQuotaionPDF: action,
    });
  };
  const fetchSaveQuotaionPDFFail = (state, action) => {
    return updateObject(state, {
        fetch_SaveQuotaionPDF_Loading: false,
        fetch_savePdf_Error: action.error,
    });
  };

  const reducer = (state = initialMake, action) => {
    switch (action.type) {
      //state
      case actionTypes.FETCH_SAVEQUOTATIONPDF_START:
        return fetchSaveQuotaionPDFStart(state, action,);
      case actionTypes.FETCH_SAVEQUOTATIONPDF_SUCCESS:
        return fetchSaveQuotaionPDFSuccess(state, action);
      case actionTypes.FETCH_SAVEQUOTATIONPDF_FAIL:
        return fetchSaveQuotaionPDFFail(state, action);
        default:
            return state;
    }
};

export default reducer