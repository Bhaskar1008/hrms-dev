import * as actionTypes from "./actionTypes";
import axios from "../../axios-common";
import { getLeadFilter } from "../../helpers";
import axiosLms from "../../axios-lmsv2";
import axiosRequest from "../../axios-request/request.methods";
import supportQuotationsPolicies from "../../components/QuotationsPoliciesCards/supportQuotationsPolicies ";
import { stoageGetter } from "../../helpers";

// Fetch leads quatation and policices data

export const fetchAllQuotationsPoliciesStart = () => {
  return {
    type: actionTypes.FETCH_ALL_QUOTATIONSPOLICIES_START,
  };
};

export const fetchAllQuotationsPoliciesSuccess = (
  allQuotationsPolicies,
  countQP
) => {
  return {
    type: actionTypes.FETCH_ALL_QUOTATIONSPOLICIES_SUCCESS,
    allQuotationsPolicies: allQuotationsPolicies,
    count: countQP,
  };
};

export const fetchAllQuotationsPoliciesFail = (error) => {
  return {
    type: actionTypes.FETCH_ALL_QUOTATIONSPOLICIES_FAIL,
    error: error,
  };
};

// get all application quation data
export const fetchAllApplictaionQuotationsStart = () => {
  return {
    type: actionTypes.FETCH_ALL_APPLICATIONQUOTATION_START,
  };
};

export const fetchAllApplictaionQuotationsSuccess = (
  allapplicationQuotations,
  countQ
) => {
  return {
    type: actionTypes.FETCH_ALL_APPLICATIONQUOTATION_SUCCESS,
    allapplicationQuotations: allapplicationQuotations,
    count: countQ,
  };
};

export const fetchAllApplictaionQuotationsFail = (error) => {
  return {
    type: actionTypes.FETCH_ALL_APPLICATIONQUOTATION_FAIL,
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

// let pageNo = 1
// let limit = 15

export const fetchQuotationsPolicies = (id, pageNo, cb = null) => {
  return async (dispatch) => {
    dispatch(fetchAllQuotationsPoliciesStart());
    let result = await axiosRequest.get(
      `user/policy/getPolicy/${id}?&page=${pageNo}&limit=14`,
      { secure: true }
    );

    if (result.statusCode === -1) {
      dispatch(
        fetchAllQuotationsPoliciesSuccess(
          result === "No leads found" ? [] : result.data[0],
          //  ),
          result.data[1][0].count
        )
      );
    } else {
      dispatch(fetchAllQuotationsPoliciesFail());
    }

    if (typeof cb == "function") {
      cb(result);
    }
  };
};

// filter policy
export const fetchDataAfterFilterPolicies = (
  id,
  page,
  productName,
  policyholder,
  staffName,
  quotationPolicyNumber,
  quotationStatus,
  dateCreated,
  effectivityfromDate,
  effectivitytoDate,
  expiryfromDate,
  expirytoDate,
  DocumentStatus,
  current


) => {
  return async (dispatch) => {
    dispatch(fetchAllQuotationsPoliciesStart());
    let newpage = current > page ? current : page

    let url = `user/policy/getPolicy/${id}?&limit=14&page=${newpage}`;

    if (productName?.length) {
      url += `&LOB=${productName}`;
    }
    // if (policyholder && typeof policyholder === 'string' && policyholder.trim().length > 0) {
    //   url += `&policyHolderName=${policyholder}`;
    // }
    if (policyholder?.trim().length > 0) {
      url += `&policyHolderName=${policyholder}`;
    }
    if (staffName && typeof staffName === 'string' && staffName.trim().length > 0) {
      url += `&staffName=${staffName}`;
    }
    if (quotationPolicyNumber && typeof quotationPolicyNumber === 'string' && quotationPolicyNumber?.trim().length > 0) {
      url += `&policyNumber=${quotationPolicyNumber}`;
    }
    if (quotationStatus?.length) {
      url += `&policyStatus=${quotationStatus}`;
    }
    if (dateCreated) {
      url += `&createdAt=${dateCreated}`;
    }
    if (effectivityfromDate) {
      url += `&effectivityDateFrom=${effectivityfromDate}`;
    }
    if (effectivitytoDate) {
      url += `&effectivityDateTo=${effectivitytoDate}`;
    }
    if (expiryfromDate) {
      url += `&expirationDateFrom=${expiryfromDate}`;
    }
    if (expirytoDate) {
      url += `&expirationDateTo=${expirytoDate}`;
    }
    if (DocumentStatus?.length) {
      url += `&documentStatus=${DocumentStatus}`;
    }
    //
    let result = await axiosRequest.get(url);
    console.log(result, url, "url of get policy");


    if (result.statusCode === -1) {
      dispatch(
        fetchAllQuotationsPoliciesSuccess(
          result === "No leads found" ? [] : result.data[0],
          result.data[1][0].count
        )
      );
      console.log("count of policies", result.data[1][0].count);
    } else {
      dispatch(fetchAllQuotationsPoliciesFail());
    }
  };
};

///  FETHCH ALL QOUTATION DATA FOR ALL CUSTOMERT

export const fetchAllApplictaionQuotations = (id, pageNo, cb = null) => {
  // let limit = 14;
  // pageNo === 1 ? limit = 14 : limit = (pageNo - 1) * 14
  return async (dispatch) => {
    dispatch(fetchAllQuotationsPoliciesStart());
    // alert("hhh")
    //let result = await axiosRequest.get(`user/v2/getLead/${id}?leadfilter=${leads}&skip=${skipVal}`, { secure: true });
    let result = await axiosRequest.get(
      `user/getQuotation/${id}?&limit=14&page=${pageNo}`,
      { secure: true }
    );

    if (result.statusCode === -1) {
      dispatch(
        fetchAllApplictaionQuotationsSuccess(
          //supportQuotationsPolicies.readSortDataFromAPI(
          //leads,
          result === "No leads found" ? [] : result.data[0],
          //  ),
          result.data[1][0].count
        )
      );
    } else {
      dispatch(fetchAllApplictaionQuotationsFail());
    }

    if (typeof cb == "function") {
      cb(result);
    }
  };
};

export const fetchDataAfterFilterQuotationsPolicies = (
  id,
  page,
  productName,
  policyholder,
  staffName,
  quotationStatus,
  quotationPolicyNumber,
  dateCreated,
  effectivityfromDate,
  effectivitytoDate,
  expiryfromDate,
  expirytoDate,
  current
) => {
  console.log(effectivityfromDate, "effectivityfromDate");

  return async (dispatch) => {
    dispatch(fetchAllQuotationsPoliciesStart());
    let newpage = current > page ? current : page

    let url = `user/getQuotation/${id}?&limit=14&page=${newpage}`;

    if (productName?.length) {
      url += `&LOB=${productName}`;
    }
    // if (policyholder && typeof policyholder === 'string' && policyholder.trim().length > 0) {
    //   url += `&policyHolderName=${policyholder}`;
    // }
    if (policyholder?.trim().length > 0) {
      url += `&policyHolderName=${policyholder}`;
    }
    if (staffName?.trim().length > 0) {
      url += `&staffName=${staffName}`;
    }
    if (quotationStatus?.length) {
      url += `&quotationStatus=${quotationStatus}`;
    }
    if ( quotationPolicyNumber && typeof quotationPolicyNumber === 'string' && quotationPolicyNumber.trim().length > 0) {
      url += `&quotationNumber=${quotationPolicyNumber}`;
    }
    if (dateCreated) {
      url += `&createdAt=${dateCreated}`;
    }
    if (effectivityfromDate) {
      url += `&effectivityDateFrom=${effectivityfromDate}`;
    }
    if (effectivitytoDate) {
      url += `&effectivityDateTo=${effectivitytoDate}`;
    }
    if (expiryfromDate) {
      url += `&expirationDateFrom=${expiryfromDate}`;
    }
    if (expirytoDate) {
      url += `&expirationDateTo=${expirytoDate}`;
    }

    console.log(url, "url");

    let result = await axiosRequest.get(url);
    console.log(result, "result");


    if (result.statusCode === -1) {
      dispatch(
        fetchAllApplictaionQuotationsSuccess(
          //supportQuotationsPolicies.readSortDataFromAPI(
          //leads,
          result === "No leads found" ? [] : result.data[0],
          //  ),
          result.data[1][0].count
        )
      );
    } else {
      dispatch(fetchAllApplictaionQuotationsFail());
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
      .get(
        `admin/getDesignationMaster?userId=5b3b4cc28fa96d39870443e3&channelCode=5dbfdfa8e51cd5522249ba70`
      )
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

//----- ACTION FOR CHANGE count
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
