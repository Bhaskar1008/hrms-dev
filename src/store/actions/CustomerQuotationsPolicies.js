import * as actionTypes from './actionTypes';
import axios from '../../axios-common';
import { getLeadFilter } from '../../helpers';
import axiosLms from '../../axios-lmsv2';
import axiosRequest from '../../axios-request/request.methods';
import supportQuotationsPolicies from '../../components/QuotationsPoliciesCards/supportQuotationsPolicies ';
import { stoageGetter } from "../../helpers";


// Fetch leads quatation and policices data

export const fetchAllQuotationsPoliciesStartCustomer = () => {
    return {
        type: actionTypes.FETCH_ALL_QUOTATIONSPOLICIES_CUSTOMER_START
    }
}

export const fetchAllQuotationsPoliciesSuccessCustomer = (allQuotationsPolicies, countQP) => {
    return {
        type: actionTypes.FETCH_ALL_QUOTATIONSPOLICIES_CUSTOMER_SUCCESS,
        allQuotationsPolicies: allQuotationsPolicies,
        count: countQP
    }
}

export const fetchAllQuotationsPoliciesFailCustomer = (error) => {
    return {
        type: actionTypes.FETCH_ALL_QUOTATIONSPOLICIES_CUSTOMER_FAIL,
        error: error
    }
}


// get all application quation data
export const fetchAllApplictaionQuotationsStartCustomer = () => {
    return {
        type: actionTypes.FETCH_ALL_APPLICATIONQUOTATION_CUSTOMER_START
    }
}

export const fetchAllApplictaionQuotationsSuccessCustomer = (allapplicationQuotations, countQ) => {
    return {
        type: actionTypes.FETCH_ALL_APPLICATIONQUOTATION_CUSTOMER_SUCCESS,
        allapplicationQuotations: allapplicationQuotations,
        count: countQ
    }
}

export const fetchAllApplictaionQuotationsFailCustomer = (error) => {
    return {
        type: actionTypes.FETCH_ALL_APPLICATIONQUOTATION_CUSTOMER_FAIL,
        error: error
    }
}

export const addAllTeamCountCustomer = (count) => {
    return {
        type: actionTypes.FETCH_ALL_TEAM_CUSTOMER_COUNT,
        payload: count
    }
}

export const showloaderCustomer = (loader) => {
    return {
        type: actionTypes.SHOW_CUSTOMER_LOADER,
        loaderpage: loader
    }
}

export const hideloaderCustomer = (loader) => {
    return {
        type: actionTypes.HIDE_CUSTOMER_LOADER,
        loaderpage: loader
    }
}

export const addAllTeamCountSeCustomer = (countT) => {
    return {
        type: actionTypes.FETCH_ALL_TEAM_CUSTOMER_COUNTT,
        payload1: countT
    }
}

// let pageNo = 1
// let limit = 15

export const fetchQuotationsPoliciesCustomer = (id, leads, pageNo, cb = null) => {
    // let limit = 14;
    // pageNo === 1 ? limit = 14 : limit = (pageNo - 1) * 14

    return async dispatch => {
        dispatch(fetchAllQuotationsPoliciesStartCustomer())
        // alert("hhh")
        //let result = await axiosRequest.get(`user/v2/getLead/${id}?leadfilter=${leads}&skip=${skipVal}`, { secure: true });
        // page=1&limit = 15
        let result = await axiosRequest.get(`customer/getPolicy`, { secure: true });

        if (result.statusCode == -1) {

            dispatch(
                fetchAllQuotationsPoliciesSuccessCustomer(
                    //supportQuotationsPolicies.readSortDataFromAPI(
                    //leads,
                    result === "No leads found" ? [] : result.data[0],
                    //  ),
                    result.data[1][0].count
                )
            );
        }

        else {
            dispatch(fetchAllQuotationsPoliciesFailCustomer())
        }

        if (typeof cb == 'function') {
            cb(result);
        }
    }
}

///  FETHCH ALL QOUTATION DATA FOR ALL CUSTOMERT

export const fetchAllApplictaionQuotationsCustomer = (id, pageNo, cb = null) => {
    // let limit = 14;
    // pageNo === 1 ? limit = 14 : limit = (pageNo - 1) * 14
    return async dispatch => {
        dispatch(fetchAllQuotationsPoliciesStartCustomer())
        // alert("hhh")
        //let result = await axiosRequest.get(`user/v2/getLead/${id}?leadfilter=${leads}&skip=${skipVal}`, { secure: true });
        let result = await axiosRequest.get(`customer/getQuotation`, { secure: true });

        if (result.statusCode == -1) {
            dispatch(
                fetchAllApplictaionQuotationsSuccessCustomer(
                    //supportQuotationsPolicies.readSortDataFromAPI(
                    //leads,
                    result === "No leads found" ? [] : result.data[0],
                    //  ),
                    result.data[1][0].count
                )
            );
        }

        else {
            dispatch(fetchAllApplictaionQuotationsFailCustomer())
        }

        if (typeof cb == 'function') {
            cb(result);
        }
    }
}


export const fetchDataAfterFilterQuotationsPoliciesCustomer = (id, skip, quotationNumber,) => {
    return async dispatch => {
        dispatch(fetchAllQuotationsPoliciesStartCustomer())
        // &searchType=fname
        let url = `user/getQuotation/${id}?skip=${skip}`
        if (quotationNumber.trim().length) url += `&quotationNumber=${quotationNumber}`

        let result = await axiosRequest.get(url);
        if (result.length > 0) {
            // dispatch(fetchAllQuotationsPoliciesSuccess(supportQuotationsPolicies.readSortDataFromAPI(leadfilter,result,this), result[1][0].count));
            dispatch(fetchAllQuotationsPoliciesSuccessCustomer(result));
            // dispatch(fetchAllLeadsSuccess(result[0], result[1][0].count));
        } else {
            dispatch(fetchAllQuotationsPoliciesFailCustomer())
        }
    }
}

// Fetch Designation

export const fetchDesignationStartCustomer = () => {
    return {
        type: actionTypes.FETCH_DESIGNATION_CUSTOMER_START
    }
}

export const fetchDesignationSuccessCustomer = (designations) => {
    return {
        type: actionTypes.FETCH_DESIGNATION_CUSTOMER_SUCCESS,
        designations: designations,
    }
}


export const fetchDesignationFailCustomer = (error) => {
    return {
        type: actionTypes.FETCH_DESIGNATION_CUSTOMER_FAIL,
        error: error
    }
}

export const fetchDesignationCustomer = (channelCode) => {

    return dispatch => {
        dispatch(fetchDesignationStartCustomer())
        return axios.get(`admin/getDesignationMaster?userId=5b3b4cc28fa96d39870443e3&channelCode=5dbfdfa8e51cd5522249ba70`)
            .then(res => {

                if (res.data.statusCode === -1) {
                    return dispatch(fetchDesignationSuccessCustomer(res.data.data[0]))
                }
            })
            .catch(error => {
                return dispatch(fetchDesignationFailCustomer(error.response.data.errors))
            })
    }
}

// Fetch Team Member

export const fetchTeamMemberStart = () => {
    return {
        type: actionTypes.FETCH_TEAM_MEMBER_START
    }
}

export const fetchTeamMemberSuccess = (teamMember) => {
    return {
        type: actionTypes.FETCH_TEAM_MEMBER_SUCCESS,
        teamMember: teamMember
    }
}


export const fetchTeamMemberFail = (error) => {
    return {
        type: actionTypes.FETCH_TEAM_MEMBER_FAIL,
        error: error
    }
}

export const fetchTeamMember = (id) => {

    return dispatch => {
        dispatch(fetchTeamMemberStart())
        return axiosLms.get(`user_tree?userId=6153f1ec4735ef7f942926e3`)
            .then(res => {
                if (res.data.statusCode === -1) {
                    return dispatch(fetchTeamMemberSuccess())
                } else {
                    throw res
                }
            })
            .catch(error => {
                console.log(error)
                return dispatch(fetchTeamMemberFail(error))
            })
    }
}

//----- ACTION FOR CHANGE TAB
export const updateTabOfDashboard = (globalTab) => {
    return {
        type: actionTypes.UPDATE_TAB_POSSITION,
        globalTab: globalTab,
    }
}

// Action for Allocate satus

export const updateAllocateOfOpportunities = (allocate) => {
    return {
        type: actionTypes.UPDATE_ALLCATION_TAB_POSSITION,
        allocateTab: allocate,
    }
}

// Action to store all checked leads

export const updateCheckAllocatedLead = (checkedLead) => {
    return {
        type: actionTypes.UPDATE_ALLCATED_CHECKED_LEADS,
        checkedLead: checkedLead,
    }
}
