import * as actionTypes from "./actionTypes";
import axiosRequest from "../../axios-request/request.methods";
import { message } from "antd";

export const currentUpdatingIdFun = (payload) => {
  return {
    type: actionTypes.CURRENT_UPDATING_ID_CUSTOMER,
    currentUpdatingID: payload
  }
}

export const resetCurrentCustomerId = () => {
  return {
    type: actionTypes.RESET_CURRENT_CUSTOMER_ID,
    currentUpdatingID: ""
  }
}

export const fetchAllGetCustomerListingStart = () => {
  return {
    type: actionTypes.FETCH_ALL_GETCUSTOMERLISTING_START,
  };
};

export const fetchAllGetCustomerListingSuccess = (
  allCustomerListing,
  count,
  id
) => {
  return {
    type: actionTypes.FETCH_ALL_GETCUSTOMERLISTING_SUCCESS,
    allCustomerListing: allCustomerListing,
    count: count,
    fetchLeadId: id
  };
};

export const fetchAllGetCustomerListingFail = (error) => {
  return {
    type: actionTypes.FETCH_ALL_GETCUSTOMERLISTING_FAIL,
    error: error,
  };
};

export const fetchAllGetCustomerListing = (id, leads, pageNo, cb = null) => {
  let skipVal;
  pageNo === 1 ? (skipVal = 0) : (skipVal = (pageNo - 1) * 15);
  return async (dispatch) => {

    dispatch(fetchAllGetCustomerListingStart());
    //let result = await axiosRequest.get(`user/v2/getLead/${id}?leadfilter=${leads}&skip=${skipVal}`, { secure: true });
    let result = await axiosRequest.get(`user/policy/getgetAllRefred_AgentsCustomer/${id}?isPolicyIssued=true`, {
      secure: true,
    });
    // if(result?.)
    if (result?.data?.length > 0) {

      dispatch(
        fetchAllGetCustomerListingSuccess(
          // supportQuotationsPolicies.readSortDataFromAPI(
          //   leads,
          result === "No leads found" ? [] : result.data[0],
          //   this

          //),
          result.data[1][0].count
        )
      );
    } else {

      dispatch(fetchAllGetCustomerListingFail());
    }

    if (typeof cb == "function") {
      cb(result);
    }

  };
};

/// get GetQuotation

export const fetchAllGetQuotationStart = () => {
  return {
    type: actionTypes.FETCH_ALL_GETQUOTATION_START,
  };
};

export const fetchAllGetQuotationSuccess = (allQoutationArr, count) => {
  return {
    type: actionTypes.FETCH_ALL_GETQUOTATION_SUCCESS,
    allQoutationArr: allQoutationArr,
    count: count,
  };
};

export const fetchAllGetQuotationFail = (error) => {
  return {
    type: actionTypes.FETCH_ALL_GETQUOTATION_FAIL,
    error: error,
  };
};

export const fetchAllGetQuotation = (id, customer_update_ID, pageNo, cb = null) => {
  let skipVal;
  pageNo === 1 ? (skipVal = 0) : (skipVal = (pageNo - 1) * 15);
  return async (dispatch) => {
    dispatch(fetchAllGetQuotationStart());
    //let result = await axiosRequest.get(`user/v2/getLead/${id}?leadfilter=${leads}&skip=${skipVal}`, { secure: true });
    let result = await axiosRequest.get(
      `user/v2/getQuotation/${id}?customerId=${customer_update_ID}`,
      { secure: true }
    );

    if (result?.data?.length > 0) {

      dispatch(
        fetchAllGetQuotationSuccess(
          result === "No Quotation found" ? [] : result.data[0],
          result.data[1][0].count
        )
      );

    } else if (result?.statusCode === 961) {
      message.error(result?.data)
    } else {
      dispatch(fetchAllGetQuotationFail());
    }



  };
};

/// get Get Policies

export const fetchAllGetPoliciesStart = () => {
  return {
    type: actionTypes.FETCH_ALL_GETPOLICIES_START,
  };
};

export const fetchAllGetPoliciesSuccess = (allPolicies, count) => {
  return {
    type: actionTypes.FETCH_ALL_GETPOLICIES_SUCCESS,
    allPolicies: allPolicies,
    count: count,
  };
};

export const fetchAllGetPoliciesFail = (error) => {
  return {
    type: actionTypes.FETCH_ALL_GETPOLICIES_FAIL,
    error: error,
  };
};

export const fetchAllGetPolicies = (id, customer_update_ID, pageNo) => {
  let skipVal;
  pageNo === 1 ? (skipVal = 0) : (skipVal = (pageNo - 1) * 15);
  return async (dispatch) => {
    dispatch(fetchAllGetPoliciesStart());
    //let result = await axiosRequest.get(`user/v2/getLead/${id}?leadfilter=${leads}&skip=${skipVal}`, { secure: true });
    let result = await axiosRequest.get(
      `user/policy/getPolicy/${id}?customerId=${customer_update_ID}`,
      { secure: true }
    );

    if (result?.data?.length > 0) {
      dispatch(
        fetchAllGetPoliciesSuccess(
          result === "No Policy found" ? [] : result.data[0],
          result.data[1][0].count
        )
      );
    } else if (result?.statusCode === 961) {
      message.error(result?.data)
    } else {
      dispatch(fetchAllGetPoliciesFail());
    }
  };
};
