import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  // CustomerListing properties
  allCustomerListing: [],
  allCustomerListing_Loading: false,
  fetch_allCustomerListing_Loading: false,
  selected_allCustomerListing: null,
  fetch_allCustomerListing_Error: "",

  // QOUTATAION properties
  allQoutationArr: [],
  allQoutation_Loading: false,
  fetch_allQoutation_Loading: false,
  selected_allQoutation: null,
  fetch_allQoutation_Error: "",

  // POLICIES properties
  allPolicies: [],
  allPolicies_Loading: false,
  fetch_allPolicies_Loading: false,
  selected_allPolicies: null,
  fetch_allPolicies_Error: "",

  // lead form meta data
  fetchTeamMemberLoading: false,
  designations: [],
  fetchTeamMemberError: "",

  teamMember: {},
  globalTab: "self",
  allocateTab: false,
  checkedLead: [],
  countArr: [],
  countArrSe: [],
  showloader: true,
  hideloader: false,

  currentUpdatingID: "",
  currentActiveTab: "all"
};


const fetchAllGetCustomerListingStart = (state, action) => {
  return updateObject(state, { fetch_allCustomerListing_Loading: true });
};

const fetchAllGetCustomerListingSuccess = (state, action) => {
  return updateObject(state, {
    fetch_allCustomerListing_Loading: false,
    allCustomerListing: action.allCustomerListing,
    count: action.count,
    selected_all_CustomerListing: action.selected_allCustomerListing,
  });
};
const fetchAllGetCustomerListingFail = (state, action) => {
  return updateObject(state, {
    fetch_allCustomerListing_Loading: false,
    fetch_allCustomerListing_Error: action.error,
    allCustomerListing: [],
  });
};


// GET QOUTATION DATA 

const fetchAllGetQuotationStart = (state, action) => {
  return updateObject(state, { fetch_allQoutation_Loading: true });
};

const fetchAllGetQuotationSuccess = (state, action) => {
  return updateObject(state, {
    fetch_allQoutation_Loading: false,
    allQoutationArr: action.allQoutationArr,
    count: action.count,
    selected_all_Qoutation: action.selected_allQoutation,
  });
};
const fetchAllGetQuotationFail = (state, action) => {
  return updateObject(state, {
    fetch_allQuotation_Loading: false,
    fetch_allQuotation_Error: action.error,
    allQoutationArr: [],
  });
};

// GET POLICIES 
const fetchAllGetPoliciesStart = (state, action) => {
  return updateObject(state, { fetch_allPolicies_Loading: true });
};

const fetchAllGetPoliciesSuccess = (state, action) => {
  return updateObject(state, {
    fetch_allPolicies_Loading: false,
    allPolicies: action.allPolicies,
    count: action.count,
    selected_all_Policies: action.selected_allPolicies,
  });
};
const fetchAllGetPoliciesFail = (state, action) => {
  return updateObject(state, {
    fetch_allPolicies_Loading: false,
    fetch_allPolicies_Error: action.error,
    allPolicies: [],
  });
};

const currentUpdatingIdFun = (state, action) => {
  return updateObject(state, { currentUpdatingID: action.currentUpdatingID });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    // leadtchh
    case actionTypes.CURRENT_UPDATING_ID_CUSTOMER:
      return currentUpdatingIdFun(state, action);
    case actionTypes.RESET_CURRENT_CUSTOMER_ID:
      return {
        ...state,
        currentUpdatingID: ""
      };
    case actionTypes.FETCH_ALL_GETCUSTOMERLISTING_START:
      return fetchAllGetCustomerListingStart(state, action);
    case actionTypes.FETCH_ALL_GETCUSTOMERLISTING_SUCCESS:
      return fetchAllGetCustomerListingSuccess(state, action);
    case actionTypes.FETCH_ALL_GETCUSTOMERLISTING_FAIL:
      return fetchAllGetCustomerListingFail(state, action);

    // GET QOUTATION CUSTOMER
    case actionTypes.FETCH_ALL_GETQUOTATION_START:
      return fetchAllGetQuotationStart(state, action);
    case actionTypes.FETCH_ALL_GETQUOTATION_SUCCESS:
      return fetchAllGetQuotationSuccess(state, action);
    case actionTypes.FETCH_ALL_GETQUOTATION_FAIL:
      return fetchAllGetQuotationFail(state, action);

    // GET POLICIES CUSTOMER
    case actionTypes.FETCH_ALL_GETPOLICIES_START:
      return fetchAllGetPoliciesStart(state, action);
    case actionTypes.FETCH_ALL_GETPOLICIES_SUCCESS:
      return fetchAllGetPoliciesSuccess(state, action);
    case actionTypes.FETCH_ALL_GETPOLICIES_FAIL:
      return fetchAllGetPoliciesFail(state, action);

    default:
      return state;


  }
};

export default reducer;