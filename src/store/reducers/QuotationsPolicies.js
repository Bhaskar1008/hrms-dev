import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  // leads properties
  allQuotationsPolicies: [],
  allQuotationsPolicies_Loading: false,
  fetch_allQuotationsPolicies_Loading: false,
  selected_allQuotationsPolicies: null,
  fetch_allQuotationsPolicies_Error: "",

  allapplicationQuotations: [],
  allapplicationQuotations_Loading: false,
  fetch_allapplicationQuotations_Loading: false,
  selected_allapplicationQuotations: null,
  fetch_allapplicationQuotations_Error: "",

  // lead form meta data
  fetchTeamMemberLoading: false,
  designations: [],
  fetchTeamMemberError: "",

  teamMember: {},
  globalTab: "self",
  allocateTab: false,
  checkedLead: [],
  countArr: [],
  showloader: true,
  hideloader: false,

  currentUpdatingQuotationID: "",
  currentDocumentID: "",
  currentActiveTab: "policies"
};
// lead reducer

const setCurrentActiveTab = (state, action) => {
  return updateObject(state, { currentActiveTab: action.action });
};


//  GET ALL APPLICATION QUATATION AND POLICIES DATA 
const fetchAllQuotationsPoliciesStart = (state, action) => {
  return updateObject(state, { fetch_allQuotationsPolicies_Loading: true });
};

const fetchAllQuotationsPoliciesSuccess = (state, action) => {
  return updateObject(state, {
    fetch_allQuotationsPolicies_Loading: false,
    allQuotationsPolicies: action.allQuotationsPolicies,
    countQP: action.count,
    selected_all_QuotationsPolicies: action.selected_allQuotationsPolicies,
  });
};
const fetchAllQuotationsPoliciesFail = (state, action) => {
  return updateObject(state, {
    fetch_allQuotationsPolicies_Loading: false,
    fetch_allQuotationsPolicies_Error: action.error,
    allQuotationsPolicies: [],
  });
};

// GET ALL APPLICATION ONLY QOUTATION DATA  

const fetchAllApplictaionQuotationsStart = (state, action) => {
  return updateObject(state, { allapplicationQuotations_Loading: true });
};

const fetchAllApplictaionQuotationsSuccess = (state, action) => {
  return updateObject(state, {
    allapplicationQuotations_Loading: false,
    allapplicationQuotations: action.allapplicationQuotations,
    countQ: action.count,
    selected_all_allapplicationQuotations: action.selected_allapplicationQuotations,
  });
};
const fetchAllApplictaionQuotationsFail = (state, action) => {
  return updateObject(state, {
    fetch_allapplicationQuotations_Loading: false,
    fetch_allapplicationQuotationsError: action.error,
    allapplicationQuotations: [],
  });
};

const fetchTeamMemberStart = (state, action) => {
  return updateObject(state, {
    fetchTeamMemberLoading: true,
  });
};

const fetchTeamMemberSuccess = (state, action) => {
  return updateObject(state, {
    fetchTeamMemberLoading: false,
    designations: action.designations,
  });
};
const fetchTeamMemberFail = (state, action) => {
  return updateObject(state, {
    fetchTeamMemberLoading: false,
    fetchTeamMemberError: action.error,
  });
};

const updateTabOfDashboard = (state, action) => {
  return updateObject(state, {
    fetchTeamMemberLoading: false,
    globalTab: action.globalTab,
  });
};

const updateAllocateOfOpportunities = (state, action) => {
  return updateObject(state, {
    fetchTeamMemberLoading: false,
    allocateTab: action.allocateTab,
  });
};

const updateCheckAllocatedLead = (state, action) => {
  return updateObject(state, {
    fetchTeamMemberLoading: false,
    checkedLead: action.checkedLead,
  });
};



const updateAllTeamCount = (state, action) => {
  return updateObject(state, {
    countArr: action.payload,
  });
};

const updateAllTeamCountSe = (state, action) => {
  return updateObject(state, {
    countArrSe: action.payload1,
  });
};

const showfullpageloader = (state, action) => {
  return updateObject(state, {
    showloader: action.loaderpage,
  });
};

const hidefullpageloader = (state, action) => {
  return updateObject(state, {
    hideloader: action.loaderpage,
  });
};

const currentUpdatingIdQuotationFun = (state, action) => {
  return updateObject(state, { currentUpdatingQuotationID: action.data });
  
  // return updateObject(state, { currentUpdatingQuotationID: action.currentUpdatingQuotationID });
};
const currentDocumentIdFun = (state, action) => {
  return updateObject(state, { currentDocumentID: action.data });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // leadtchh
    case actionTypes.CURRENT_UPDATING_TAB:
      return setCurrentActiveTab(state, action);

    case actionTypes.CURRENT_UPDATING_FOR_QUOTATION_ID:
      return currentUpdatingIdQuotationFun(state, action);

    case actionTypes.CURRENT_DOCUMENTS_ID:
      return currentDocumentIdFun(state, action);

  // get all application quatation and policy api 
    case actionTypes.FETCH_ALL_QUOTATIONSPOLICIES_START:
      return fetchAllQuotationsPoliciesStart(state, action);
    case actionTypes.FETCH_ALL_QUOTATIONSPOLICIES_SUCCESS:
      return fetchAllQuotationsPoliciesSuccess(state, action);
    case actionTypes.FETCH_ALL_QUOTATIONSPOLICIES_FAIL:
      return fetchAllQuotationsPoliciesFail(state, action);

// get all application quotation data 
case actionTypes.FETCH_ALL_APPLICATIONQUOTATION_START:
  return fetchAllApplictaionQuotationsStart(state, action);
case actionTypes.FETCH_ALL_APPLICATIONQUOTATION_SUCCESS:
  return fetchAllApplictaionQuotationsSuccess(state, action);
case actionTypes.FETCH_ALL_APPLICATIONQUOTATION_FAIL:
  return fetchAllApplictaionQuotationsFail(state, action);

    case actionTypes.FETCH_DESIGNATION_START:
      return fetchTeamMemberStart(state, action);
    case actionTypes.FETCH_DESIGNATION_SUCCESS:
      return fetchTeamMemberSuccess(state, action);
    case actionTypes.FETCH_DESIGNATION_FAIL:
      return fetchTeamMemberFail(state, action);
    case actionTypes.UPDATE_TAB_POSSITION:
      return updateTabOfDashboard(state, action);
    case actionTypes.UPDATE_ALLCATION_TAB_POSSITION:
      return updateAllocateOfOpportunities(state, action);
    case actionTypes.UPDATE_ALLCATED_CHECKED_LEADS:
      return updateCheckAllocatedLead(state, action);
    case actionTypes.FETCH_ALL_TEAM_COUNT:
      return updateAllTeamCount(state, action);
    case actionTypes.FETCH_ALL_TEAM_COUNTT:
      return updateAllTeamCountSe(state, action);
    case actionTypes.SHOW_LOADER:
      return showfullpageloader(state, action)
    case actionTypes.HIDE_LOADER:
      return hidefullpageloader(state, action)
    default:
      return state;


  }
};

export default reducer;
