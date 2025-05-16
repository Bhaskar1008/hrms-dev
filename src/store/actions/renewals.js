import * as actionTypes from './actionTypes';
import axios from '../../axios-manipal';


// Fetch all renewals data
export const fetchAllRenewalsStart = () => {
    return {
        type: actionTypes.FETCH_ALL_RENEWALS_START
    }
}

export const fetchAllRenewalsSuccess = (allRenewals,count) => {
    return {
        type: actionTypes.FETCH_ALL_RENEWALS_SUCCESS,
        allRenewals: allRenewals,
        count:count
    }
} 


export const fetchAllRenewalsFail = (error) => {
    return {
        type: actionTypes.FETCH_ALL_RENEWALS_FAIL,
        error: error
    }
}

export const fetchAllRenewals = (leads,pageNo) => {
        let skipVal 
        if(pageNo===1){
            skipVal = 0
        }else{
            skipVal = (pageNo-1)*15

        }
    return dispatch => {
        dispatch(fetchAllRenewalsStart())
        return axios.get(`getPolicy/610a50ec85eac609e29061e3?policy_filter=all&sortBy=-1&skip=${skipVal}`)
            .then(res => {
                return dispatch(fetchAllRenewalsSuccess(res.data.data[0],res.data.data[1][0].count))
            })
            .catch(error => {
                return dispatch(fetchAllRenewalsFail(error.response.data.errors))
            })
    }
}

// Fetch paid renewals data
export const fetchPaidRenewalsStart = () => {
    return {
        type: actionTypes.FETCH_PAID_RENEWALS_START
    }
}

export const fetchPaidRenewalsSuccess = (paidRenewals,count) => {
    return {
        type: actionTypes.FETCH_PAID_RENEWALS_SUCCESS,
        paidRenewals: paidRenewals,
        count:count
    }
} 


export const fetchPaidRenewalsFail = (error) => {
    return {
        type: actionTypes.FETCH_PAID_RENEWALS_FAIL,
        error: error
    }
}

export const fetchPaidRenewals = (leads,pageNo) => {
        let skipVal 
        if(pageNo===1){
            skipVal = 0
        }else{
            skipVal = (pageNo-1)*15

        }
    return dispatch => {
        dispatch(fetchPaidRenewalsStart())
        return axios.get(`getPolicy/610a50ec85eac609e29061e3?policy_filter=Paid&sortBy=-1&skip=${skipVal}`)
            .then(res => {
                return dispatch(fetchPaidRenewalsSuccess(res.data.data[0],res.data.data[1][0].count))
            })
            .catch(error => {
                return dispatch(fetchPaidRenewalsFail(error.response.data.errors))
            })
    }
}


// Fetch unpaid renewals data
export const fetchUnPaidRenewalsStart = () => {
    return {
        type: actionTypes.FETCH_UNPAID_RENEWALS_START
    }
}

export const fetchUnPaidRenewalsSuccess = (unPaidRenewals,count) => {
    return {
        type: actionTypes.FETCH_UNPAID_RENEWALS_SUCCESS,
        unPaidRenewals: unPaidRenewals,
        count:count
    }
} 


export const fetchUnPaidRenewalsFail = (error) => {
    return {
        type: actionTypes.FETCH_UNPAID_RENEWALS_FAIL,
        error: error
    }
}

export const fetchUnPaidRenewals = (leads,pageNo) => {
        let skipVal 
        if(pageNo===1){
            skipVal = 0
        }else{
            skipVal = (pageNo-1)*15

        }
    return dispatch => {
        dispatch(fetchUnPaidRenewalsStart())
        return axios.get(`getPolicy/610a50ec85eac609e29061e3?policy_filter=Unpaid&sortBy=-1&skip=${skipVal}`)
            .then(res => {
                return dispatch(fetchUnPaidRenewalsSuccess(res?.data?.data[0],res?.data?.data[1][0].count))
            })
            .catch(error => {
                return dispatch(fetchUnPaidRenewalsFail(error?.response?.data?.errors))
            })
    }
}

// Fetch lapsed renewals data
export const fetchLapsedRenewalsStart = () => {
    return {
        type: actionTypes.FETCH_LAPSED_RENEWALS_START
    }
}

export const fetchLapsedRenewalsSuccess = (lapsedRenewals,count) => {
    return {
        type: actionTypes.FETCH_LAPSED_RENEWALS_SUCCESS,
        lapsedRenewals: lapsedRenewals,
        count:count
    }
} 


export const fetchLapsedRenewalsFail = (error) => {
    return {
        type: actionTypes.FETCH_LAPSED_RENEWALS_FAIL,
        error: error
    }
}

export const fetchLapsedRenewals = (leads,pageNo) => {
        let skipVal 
        if(pageNo===1){
            skipVal = 0
        }else{
            skipVal = (pageNo-1)*15

        }
    return dispatch => {
        dispatch(fetchLapsedRenewalsStart())
        return axios.get(`getPolicy/610a50ec85eac609e29061e3?policy_filter=Lapsed&sortBy=-1&skip=${skipVal}`)
            .then(res => {
                return dispatch(fetchLapsedRenewalsSuccess(res.data.data[0],res.data.data[1][0].count))
            })
            .catch(error => {
                return dispatch(fetchLapsedRenewalsFail(error.response.data.errors))
            })
    }
}


// Fetch renewal details data
export const fetchRenewalDetailsStart = () => {
    return {
        type: actionTypes.FETCH_DETAILS_RENEWALS_START
    }
}

export const fetchRenewalDetailsSuccess = (RenewalDetails) => {
    return {
        type: actionTypes.FETCH_DETAILS_RENEWALS_SUCCESS,
        RenewalDetails: RenewalDetails
    }
} 


export const fetchRenewalDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_DETAILS_RENEWALS_FAIL,
        error: error
    }
}

export const fetchRenewalDetails = (id) => {
    return dispatch => {
        dispatch(fetchRenewalDetailsStart())
        return axios.get(`getPolicyDetails/610a50ec85eac609e29061e3?proposer_ID_refs=${id}`)
            .then(res => {
                return dispatch(fetchRenewalDetailsSuccess(res.data.data[0]))
            })
            .catch(error => {
                return dispatch(fetchRenewalDetailsFail(error.response.data.errors))
            })
    }
}