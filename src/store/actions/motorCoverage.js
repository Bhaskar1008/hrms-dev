import * as actionTypes from "./actionTypes";
import axiosRequest from "../../axios-request/request.methods";

export const fetchGenerateCoveragesStart = () => {
  return {
    type: actionTypes.FETCH_GENERATECOVERAGES_START,
  };
};

export const fetchGenerateCoveragesSuccess = (generateCoverages) => {
  return {
    type: actionTypes.FETCH_GENERATECOVERAGES_SUCCESS,
    generateCoverages: generateCoverages,
  };
};

export const fetchGenerateCoveragesFail = (error) => {
  return {
    type: actionTypes.FETCH_GENERATECOVERAGES_FAIL,
    error: error,
  };
};

// export const fetchAllGenerateCoverages = (formData) => {

//   return async (dispatch) => {
//     dispatch(fetchGenerateCoveragesStart());

//     let result = await axiosRequest.post("user/motor/generate-coverage", {
//       quotationNo: "9990000622979",
//     });
//     console.log(" result", result);
//     if (result.data.length > 0) {
//       return dispatch(fetchGenerateCoveragesSuccess(result.data));
//     }
//   };
// };

export const fetchAllGenerateCoverages = (formData, cb = null) => {
  return async (dispatch) => {
    dispatch(fetchGenerateCoveragesStart());

    if (formData?.statusCode == -1) {
      return dispatch(fetchGenerateCoveragesSuccess(formData));
    } else if (formData?.statusCode == 1) {
      return dispatch(fetchGenerateCoveragesFail(formData));
    }
  };
};

// mortgage
export const fetchMortgageStart = () => {
  return {
    type: actionTypes.FETCH_MORTGAGE_START,
  };
};

export const fetchMortgageSuccess = (mortgage) => {
  return {
    type: actionTypes.FETCH_MORTGAGE_SUCCESS,
    mortgage: mortgage,
  };
};

export const fetchMortgageFail = (error) => {
  return {
    type: actionTypes.FETCH_MORTGAGE_FAIL,
    error: error,
  };
};

export const fetchAllMortgage = () => {
  return (dispatch) => {
    dispatch(fetchMortgageStart());
    return axiosRequest
      .get(`user/motor/mortagagee/all`)
      .then((res) => {
        return dispatch(fetchMortgageSuccess(res?.data));
      })
      .catch((error) => {
        return dispatch(fetchMortgageFail(error));
      });
  };
};

// mortgage clause
export const fetchMortgageClauseStart = () => {
  return {
    type: actionTypes.FETCH_MORTGAGECLAUSE_START,
  };
};

export const fetchMortgageClauseSuccess = (mortgageClause) => {
  return {
    type: actionTypes.FETCH_MORTGAGECLAUSE_SUCCESS,
    mortgageClause: mortgageClause,
  };
};

export const fetchMortgageClauseFail = (error) => {
  return {
    type: actionTypes.FETCH_MORTGAGECLAUSE_FAIL,
    error: error,
  };
};

export const fetchAllMortgageClause = () => {
  return (dispatch) => {
    dispatch(fetchMortgageClauseStart());
    return axiosRequest
      .get(`user/motor/mortgage-clause`)
      .then((res) => {
        return dispatch(fetchMortgageClauseSuccess(res?.data));
      })
      .catch((error) => {
        return dispatch(fetchMortgageClauseFail(error));
      });
  };
};

// coverage selected value details

export const fetchCoverageSelectedValueStart = () => {
  return {
    type: actionTypes.FETCH_COVERAGESELECTEDVALUE_START,
  };
};

export const fetchCoverageSelectedValueSuccess = (formData, succMsg) => {
  return {
    type: actionTypes.FETCH_COVERAGESELECTEDVALUE_SUCCESS,
    formData: formData,
    succMsg: succMsg,
  };
};

export const fetchCoverageSelectedValueFail = (error) => {
  return {
    type: actionTypes.FETCH_COVERAGESELECTEDVALUE_FAIL,
    error: error,
  };
};

export const fetchAllCoverageSelectedValueDetails = (formData, cb = null) => {
  return async (dispatch) => {
    dispatch(fetchCoverageSelectedValueStart());
    if (formData?.statusCode == -1) {
      return dispatch(fetchCoverageSelectedValueSuccess(formData));
    } else if (formData?.statusCode == 1) {
      return dispatch(fetchCoverageSelectedValueFail(formData));
    }
  };
};
