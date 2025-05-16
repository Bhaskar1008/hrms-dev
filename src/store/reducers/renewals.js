import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    // renewal properties
    allRenewals:[],
    paidRenewals:[],
    unPaidRenewals:[],
    lapsedRenewals:[],
    details: null,
    paidRenewals_Loading : false,
    fetch_paidRenewals_Loading : false,
    unPaidRenewals_Loading : false,
    fetch_unPaidRenewals_Loading : false,
    allRenewals_Loading : false,
    fetch_allRenewals_Loading : false,
    selected_allRenewals : null,
    fetch_allRenewals_Error : "",
    fetch_paidRenewals_Error : "",
    fetch_unPaidRenewals_Error : "",
}
// renewals reducer
const fetchAllRenewalsStart = (state, action) => {
    return updateObject(state, { fetch_allRenewals_Loading: true })
}

const fetchAllRenewalsSuccess = (state, action) => {
    return updateObject(state, { fetch_allRenewals_Loading: false, allRenewals: action.allRenewals, count:action.count })
}
const fetchAllRenewalsFail = (state, action) => {
    return updateObject(state, { fetch_allRenewals_Loading: false, fetch_allRenewals_Error: action.error });
}

const fetchPaidRenewalsStart = (state, action) => {
    return updateObject(state, { fetch_paidRenewals_Loading: true })
}

const fetchPaidRenewalsSuccess = (state, action) => {
    return updateObject(state, { fetch_paidRenewals_Loading: false, paidRenewals: action.paidRenewals, count:action.count })
}
const fetchPaidRenewalsFail = (state, action) => {
    return updateObject(state, { fetch_paidRenewals_Loading: false, fetch_paidRenewals_Error: action.error });
}

const fetchUnPaidRenewalsStart = (state, action) => {
    return updateObject(state, { fetch_unPaidRenewals_Loading: true })
}

const fetchUnPaidRenewalsSuccess = (state, action) => {
    return updateObject(state, { fetch_unPaidRenewals_Loading: false, unPaidRenewals: action.unPaidRenewals, count:action.count })
}
const fetchUnPaidRenewalsFail = (state, action) => {
    return updateObject(state, { fetch_unPaidRenewals_Loading: false, fetch_unPaidRenewals_Error: action.error });
}

const fetchRenewalDetailsStart = (state, action) => {
    return updateObject(state, { fetch_unPaidRenewals_Loading: true })
}

const fetchRenewalDetailsSuccess = (state, action) => {
    return updateObject(state, { fetch_unPaidRenewals_Loading: false, details: action.RenewalDetails })
}
const fetchRenewalDetailsFail = (state, action) => {
    return updateObject(state, { fetch_unPaidRenewals_Loading: false, fetch_unPaidRenewals_Error: action.error });
}




const reducer = (state = initialState, action) => {
    switch (action.type) {
        // renewals
        case actionTypes.FETCH_ALL_RENEWALS_START: return fetchAllRenewalsStart(state, action)
        case actionTypes.FETCH_ALL_RENEWALS_SUCCESS: return fetchAllRenewalsSuccess(state, action)
        case actionTypes.FETCH_ALL_RENEWALS_FAIL: return fetchAllRenewalsFail(state, action)

        case actionTypes.FETCH_PAID_RENEWALS_START: return fetchPaidRenewalsStart(state, action)
        case actionTypes.FETCH_PAID_RENEWALS_SUCCESS: return fetchPaidRenewalsSuccess(state, action)
        case actionTypes.FETCH_PAID_RENEWALS_FAIL: return fetchPaidRenewalsFail(state, action)

        case actionTypes.FETCH_UNPAID_RENEWALS_START: return fetchUnPaidRenewalsStart(state, action)
        case actionTypes.FETCH_UNPAID_RENEWALS_SUCCESS: return fetchUnPaidRenewalsSuccess(state, action)
        case actionTypes.FETCH_UNPAID_RENEWALS_FAIL: return fetchUnPaidRenewalsFail(state, action)

        case actionTypes.FETCH_DETAILS_RENEWALS_START: return fetchRenewalDetailsStart(state, action)
        case actionTypes.FETCH_DETAILS_RENEWALS_SUCCESS: return fetchRenewalDetailsSuccess(state, action)
        case actionTypes.FETCH_DETAILS_RENEWALS_FAIL: return fetchRenewalDetailsFail(state, action)
        default: return state
    }
}

export default reducer;