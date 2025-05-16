import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  // leads properties
  allLeads: [],
  allLeads_Loading: false,
  fetch_allLeads_Loading: false,
  selected_allLeads: null,
  fetch_allLeads_Error: "",

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
// lead reducer

const setCurrentActiveTab = (state, action) => {
  return updateObject(state, { currentActiveTab: action.action });
};

const fetchAllLeadsStart = (state, action) => {
  return updateObject(state, { fetch_allLeads_Loading: true });
};

const fetchAllLeadsSuccess = (state, action) => {

  return updateObject(state, {
    fetch_allLeads_Loading: false,
    allLeads: action.allLeads,
    count: action.count,
    selected_all_leads: action.selected_allLeads,
  });
};
const fetchAllLeadsFail = (state, action) => {
  return updateObject(state, {
    fetch_allLeads_Loading: false,
    fetch_allLeads_Error: action.error,
    allLeads: [],
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

const currentUpdatingIdFun = (state, action) => {
  return updateObject(state, { currentUpdatingID: action.data });
};


const reducer = (state = initialState, action) => {

  switch (action.type) {
    // leadtchh
    case actionTypes.CURRENT_UPDATING_TAB:
      return setCurrentActiveTab(state, action);
    case actionTypes.CURRENT_UPDATING_ID:
      return currentUpdatingIdFun(state, action);
    /* Leads */
    case actionTypes.RESET_CURRENT_CUSTOMER_ID:
      return {
        ...state,
        currentUpdatingID: ""
      };
    case actionTypes.FETCH_ALL_LEADS_START:
      return fetchAllLeadsStart(state, action);
    case actionTypes.FETCH_ALL_LEADS_SUCCESS:
      return fetchAllLeadsSuccess(state, action);
    case actionTypes.FETCH_ALL_LEADS_FAIL:
      return fetchAllLeadsFail(state, action);

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
