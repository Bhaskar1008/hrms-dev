import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  //generatecoverage
  generateCoverages: {},
  fetch_GenerateCoverages_Loading: false,
  fetch_GenerateCoverages_Error: "",

  //mortgage all
  mortgage: {},
  fetch_Mortgage_Loading: false,
  fetch_Mortgage_Error: "",

  //mortgage clause
  mortgageClause: {},
  fetch_MortgageClause_Loading: false,
  fetch_MortgageClause_Error: "",

  // coverage selected value details
  CoverageSelectedValue: {},
  fetch_CoverageSelectedValue_Loading: false,
  fetch_CoverageSelectedValue_Error: "",
};

const fetchGenerateCoveragesStart = (state, action) => {
  return updateObject(state, { fetch_GenerateCoverages_Loading: true });
};

const fetchGenerateCoveragesSuccess = (state, action) => {
  return updateObject(state, {
    fetch_GenerateCoverages_Loading: false,
    generateCoverages: action.generateCoverages,
  });
};
const fetchGenerateCoveragesFail = (state, action) => {
  return updateObject(state, {
    fetch_GenerateCoverages_Loading: false,
    fetch_GenerateCoverages_Error: action.error,
  });
};

// mortgage all

const fetchMortgageStart = (state, action) => {
  return updateObject(state, { fetch_Mortgage_Loading: true });
};

const fetchMortgageSuccess = (state, action) => {
  return updateObject(state, {
    fetch_Mortgage_Loading: false,
    mortgage: action.mortgage,
  });
};
const fetchMortgageFail = (state, action) => {
  return updateObject(state, {
    fetch_Mortgage_Loading: false,
    fetch_Mortgage_Error: action.error,
  });
};

// mortgage clause

const fetchMortgageClauseStart = (state, action) => {
  return updateObject(state, { fetch_MortgageClause_Loading: true });
};

const fetchMortgageClauseSuccess = (state, action) => {
  return updateObject(state, {
    fetch_MortgageClause_Loading: false,
    mortgageClause: action.mortgageClause,
  });
};
const fetchMortgageClauseFail = (state, action) => {
  return updateObject(state, {
    fetch_MortgageClause_Loading: false,
    fetch_MortgageClause_Error: action.error,
  });
};

// coverage selected value details

const fetchCoverageSelectedValueStart = (state, action) => {
  return updateObject(state, { fetch_CoverageSelectedValue_Loading: true });
};

const fetchCoverageSelectedValueSuccess = (state, action) => {
  return updateObject(state, {
    fetch_CoverageSelectedValue_Loading: false,
    CoverageSelectedValue: action.CoverageSelectedValue,
  });
};
const fetchCoverageSelectedValueFail = (state, action) => {
  return updateObject(state, {
    fetch_CoverageSelectedValue_Loading: false,
    fetch_CoverageSelectedValue_Error: action.error,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // lead

    case actionTypes.FETCH_GENERATECOVERAGES_START:
      return fetchGenerateCoveragesStart(state, action);
    case actionTypes.FETCH_GENERATECOVERAGES_SUCCESS:
      return fetchGenerateCoveragesSuccess(state, action);
    case actionTypes.FETCH_GENERATECOVERAGES_FAIL:
      return fetchGenerateCoveragesFail(state, action);

    //mortgage

    case actionTypes.FETCH_MORTGAGE_START:
      return fetchMortgageStart(state, action);
    case actionTypes.FETCH_MORTGAGE_SUCCESS:
      return fetchMortgageSuccess(state, action);
    case actionTypes.FETCH_MORTGAGE_FAIL:
      return fetchMortgageFail(state, action);

    // mortgage

    case actionTypes.FETCH_MORTGAGECLAUSE_START:
      return fetchMortgageClauseStart(state, action);
    case actionTypes.FETCH_MORTGAGECLAUSE_SUCCESS:
      return fetchMortgageClauseSuccess(state, action);
    case actionTypes.FETCH_MORTGAGECLAUSE_FAIL:
      return fetchMortgageClauseFail(state, action);

    // coverage selected value

    case actionTypes.FETCH_COVERAGESELECTEDVALUE_START:
      return fetchCoverageSelectedValueStart(state, action);
    case actionTypes.FETCH_COVERAGESELECTEDVALUE_SUCCESS:
      return fetchCoverageSelectedValueSuccess(state, action);
    case actionTypes.FETCH_COVERAGESELECTEDVALUE_FAIL:
      return fetchCoverageSelectedValueFail(state, action);

    default:
      return state;
  }
};

export default reducer;
