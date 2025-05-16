import * as actionTypes from "./actionTypes";
import axios from "../../axios-common";
import { getLeadFilter } from "../../helpers";
import axiosLms from "../../axios-lmsv2";
import axiosRequest from "../../axios-request/request.methods";
import supportLead from "../../components/LeadCards/supportLeads";
import { stoageGetter } from "../../helpers";

// Fetch leads data
export const fetchAllLeadsStart = () => {
  return {
    type: actionTypes.FETCH_ALL_LEADS_START,
  };
};

export const fetchAllLeadsSuccess = (allLeads, count) => {
  return {
    type: actionTypes.FETCH_ALL_LEADS_SUCCESS,
    allLeads: allLeads,
    count: count,
  };
};
export const setCurrentActiveTab = (tab) => {
  return {
    type: actionTypes.CURRENT_UPDATING_TAB,
    data: tab,
  };
};
export const fetchAllLeadsFail = (error) => {
  return {
    type: actionTypes.FETCH_ALL_LEADS_FAIL,
    error: error,
  };
};

export const addAllTeamCount = (count) => {
  return {
    type: actionTypes.FETCH_ALL_TEAM_COUNT,
    payload: count,
  };
};

export const showloader = (loader) => {
  return {
    type: actionTypes.SHOW_LOADER,
    loaderpage: loader,
  };
};

export const hideloader = (loader) => {
  return {
    type: actionTypes.HIDE_LOADER,
    loaderpage: loader,
  };
};

export const addAllTeamCountSe = (countT) => {
  return {
    type: actionTypes.FETCH_ALL_TEAM_COUNTT,
    payload1: countT,
  };
};

export const fetchAllLeads = (id, leads, pageNo) => {
  let skipVal;
  pageNo === 1 ? (skipVal = 0) : (skipVal = (pageNo - 1) * 15);
  return async (dispatch) => {
    dispatch(fetchAllLeadsStart());
    // alert("hhh")
    let result = await axiosRequest.get(`user/v2/getLead/${id}?leadfilter=${leads}&skip=${skipVal}`, { secure: true });

    if (result?.data?.length > 0) {
      dispatch(fetchAllLeadsSuccess(supportLead.readSortDataFromAPI(leads, result === "No leads found" ? [] : result?.data[0], this), result?.data[1][0]?.count));
    } else {
      dispatch(fetchAllLeadsFail());
    }
  };
};

export const fetchDataAfterFilter = (id, skip, searchtxt, leadStatus, sorByFlter, sort_status, leadfilter, leadDisposition, leadType, searchType, leadPropensity) => {
  return async (dispatch) => {
    dispatch(fetchAllLeadsStart());

    // &searchType=fname
    let url = `user/v2/getLead/${id}?skip=${skip}`;
    if (searchType?.trim().length) url += `&searchType=${searchType}`;
    if (searchtxt?.trim().length) {
      url += `&searchtxt=${searchtxt}`;
    }
    if (leadStatus?.trim().length) {
      url += `&leadStatus=${leadStatus}`;
    }
    if (sorByFlter?.trim().length) {
      url += `&sorByFlter=${sorByFlter}`;
    }
    if (sort_status?.trim().length) {
      url += `&sort_status=${sort_status}`;
    }
    if (leadfilter?.trim().length) {
      url += `&leadfilter=${leadfilter}`;
    }
    if (leadDisposition?.trim().length) {
      url += `&leadDisposition=${leadDisposition}`;
    }
    if (leadType?.trim().length) {
      url += `&leadType=${leadType}`;
    }
    if (leadPropensity?.trim().length) {
      url += `&leadPropensity=${leadPropensity}`;
    }
    console.log(url, "url");

    let result = await axiosRequest.get(url);
    if (result?.data?.length > 0) {
      dispatch(fetchAllLeadsSuccess(supportLead.readSortDataFromAPI(leadfilter, result?.data[0], this), result?.data[1][0].count));
      // dispatch(fetchAllLeadsSuccess(result[0], result[1][0].count));
    } else {
      dispatch(fetchAllLeadsFail());
    }
  };
};

// Fetch Designation

export const fetchDesignationStart = () => {
  return {
    type: actionTypes.FETCH_DESIGNATION_START,
  };
};

export const fetchDesignationSuccess = (designations) => {
  return {
    type: actionTypes.FETCH_DESIGNATION_SUCCESS,
    designations: designations,
  };
};

export const fetchDesignationFail = (error) => {
  return {
    type: actionTypes.FETCH_DESIGNATION_FAIL,
    error: error,
  };
};

export const fetchDesignation = (channelCode) => {
  return (dispatch) => {
    dispatch(fetchDesignationStart());
    return axios
      .get(`admin/getDesignationMaster?userId=5b3b4cc28fa96d39870443e3&channelCode=5dbfdfa8e51cd5522249ba70`)
      .then((res) => {
        if (res.data.statusCode === -1) {
          return dispatch(fetchDesignationSuccess(res.data.data[0]));
        }
      })
      .catch((error) => {
        return dispatch(fetchDesignationFail(error.response.data.errors));
      });
  };
};

// Fetch Team Member

export const fetchTeamMemberStart = () => {
  return {
    type: actionTypes.FETCH_TEAM_MEMBER_START,
  };
};

export const fetchTeamMemberSuccess = (teamMember) => {
  return {
    type: actionTypes.FETCH_TEAM_MEMBER_SUCCESS,
    teamMember: teamMember,
  };
};

export const fetchTeamMemberFail = (error) => {
  return {
    type: actionTypes.FETCH_TEAM_MEMBER_FAIL,
    error: error,
  };
};

export const fetchTeamMember = (id) => {
  return (dispatch) => {
    dispatch(fetchTeamMemberStart());
    return axiosLms
      .get(`user_tree?userId=6153f1ec4735ef7f942926e3`)
      .then((res) => {
        if (res.data.statusCode === -1) {
          return dispatch(fetchTeamMemberSuccess());
        } else {
          throw res;
        }
      })
      .catch((error) => {
        console.log(error);
        return dispatch(fetchTeamMemberFail(error));
      });
  };
};

//----- ACTION FOR CHANGE TAB
export const updateTabOfDashboard = (globalTab) => {
  return {
    type: actionTypes.UPDATE_TAB_POSSITION,
    globalTab: globalTab,
  };
};

// Action for Allocate satus

export const updateAllocateOfOpportunities = (allocate) => {
  return {
    type: actionTypes.UPDATE_ALLCATION_TAB_POSSITION,
    allocateTab: allocate,
  };
};

// Action to store all checked leads

export const updateCheckAllocatedLead = (checkedLead) => {
  return {
    type: actionTypes.UPDATE_ALLCATED_CHECKED_LEADS,
    checkedLead: checkedLead,
  };
};
