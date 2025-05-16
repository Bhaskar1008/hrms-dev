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
    currentActiveTab: "activepolicy"
};
// lead reducer

const setCurrentActiveTabCustomer = (state, action) => {
    return updateObject(state, { currentActiveTab: action.action });
};


//  GET ALL APPLICATION QUATATION AND POLICIES DATA
const fetchAllQuotationsPoliciesStartCustomer = (state, action) => {
    return updateObject(state, { fetch_allQuotationsPolicies_Loading: true });
};

const fetchAllQuotationsPoliciesSuccessCustomer = (state, action) => {
    return updateObject(state, {
        fetch_allQuotationsPolicies_Loading: false,
        allQuotationsPolicies: action.allQuotationsPolicies,
        countQP: action.count,
        selected_all_QuotationsPolicies: action.selected_allQuotationsPolicies,
    });
};
const fetchAllQuotationsPoliciesFailCustomer = (state, action) => {
    return updateObject(state, {
        fetch_allQuotationsPolicies_Loading: false,
        fetch_allQuotationsPolicies_Error: action.error,
        allQuotationsPolicies: [],
    });
};

// GET ALL APPLICATION ONLY QOUTATION DATA

const fetchAllApplictaionQuotationsStartCustomer = (state, action) => {
    return updateObject(state, { allapplicationQuotations_Loading: true });
};

const fetchAllApplictaionQuotationsSuccessCustomer = (state, action) => {
    return updateObject(state, {
        allapplicationQuotations_Loading: false,
        allapplicationQuotations: action.allapplicationQuotations,
        countQ: action.count,
        selected_all_allapplicationQuotations: action.selected_allapplicationQuotations,
    });
};
const fetchAllApplictaionQuotationsFailCustomer = (state, action) => {
    return updateObject(state, {
        fetch_allapplicationQuotations_Loading: false,
        fetch_allapplicationQuotationsError: action.error,
        allapplicationQuotations: [],
    });
};

const fetchTeamMemberStartCustomer = (state, action) => {
    return updateObject(state, {
        fetchTeamMemberLoading: true,
    });
};

const fetchTeamMemberSuccessCustomer = (state, action) => {
    return updateObject(state, {
        fetchTeamMemberLoading: false,
        designations: action.designations,
    });
};
const fetchTeamMemberFailCustomer = (state, action) => {
    return updateObject(state, {
        fetchTeamMemberLoading: false,
        fetchTeamMemberError: action.error,
    });
};

const updateTabOfDashboardCustomer = (state, action) => {
    return updateObject(state, {
        fetchTeamMemberLoading: false,
        globalTab: action.globalTab,
    });
};

const updateAllocateOfOpportunitiesCustomer = (state, action) => {
    return updateObject(state, {
        fetchTeamMemberLoading: false,
        allocateTab: action.allocateTab,
    });
};

const updateCheckAllocatedLeadCustomer = (state, action) => {
    return updateObject(state, {
        fetchTeamMemberLoading: false,
        checkedLead: action.checkedLead,
    });
};



const updateAllTeamCountCustomer = (state, action) => {
    return updateObject(state, {
        countArr: action.payload,
    });
};

const updateAllTeamCountSeCustomer = (state, action) => {
    return updateObject(state, {
        countArrSe: action.payload1,
    });
};

const showfullpageloaderCustomer = (state, action) => {
    return updateObject(state, {
        showloader: action.loaderpage,
    });
};

const hidefullpageloaderCustomer = (state, action) => {
    return updateObject(state, {
        hideloader: action.loaderpage,
    });
};

const currentUpdatingIdQuotationFunCustomer = (state, action) => {
    return updateObject(state, { currentUpdatingQuotationID: action.data });

    // return updateObject(state, { currentUpdatingQuotationID: action.currentUpdatingQuotationID });
};
const currentDocumentIdFunCustomer = (state, action) => {
    return updateObject(state, { currentDocumentID: action.data });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // leadtchh
        case actionTypes.CURRENT_UPDATING_CUSTOMER_TAB:
            return setCurrentActiveTabCustomer(state, action);

        case actionTypes.CURRENT_UPDATING_FOR_QUOTATION_CUSTOMER_ID:
            return currentUpdatingIdQuotationFunCustomer(state, action);

        case actionTypes.CURRENT_DOCUMENTS_CUSTOMER_ID:
            return currentDocumentIdFunCustomer(state, action);

        // get all application quatation and policy api
        case actionTypes.FETCH_ALL_QUOTATIONSPOLICIES_CUSTOMER_START:
            return fetchAllQuotationsPoliciesStartCustomer(state, action);
        case actionTypes.FETCH_ALL_QUOTATIONSPOLICIES_CUSTOMER_SUCCESS:
            return fetchAllQuotationsPoliciesSuccessCustomer(state, action);
        case actionTypes.FETCH_ALL_QUOTATIONSPOLICIES_CUSTOMER_FAIL:
            return fetchAllQuotationsPoliciesFailCustomer(state, action);

        // get all application quotation data
        case actionTypes.FETCH_ALL_APPLICATIONQUOTATION_CUSTOMER_START:
            return fetchAllApplictaionQuotationsStartCustomer(state, action);
        case actionTypes.FETCH_ALL_APPLICATIONQUOTATION_CUSTOMER_SUCCESS:
            return fetchAllApplictaionQuotationsSuccessCustomer(state, action);
        case actionTypes.FETCH_ALL_APPLICATIONQUOTATION_CUSTOMER_FAIL:
            return fetchAllApplictaionQuotationsFailCustomer(state, action);

        case actionTypes.FETCH_DESIGNATION_CUSTOMER_START:
            return fetchTeamMemberStartCustomer(state, action);
        case actionTypes.FETCH_DESIGNATION_CUSTOMER_SUCCESS:
            return fetchTeamMemberSuccessCustomer(state, action);
        case actionTypes.FETCH_DESIGNATION_CUSTOMER_FAIL:
            return fetchTeamMemberFailCustomer(state, action);
        case actionTypes.UPDATE_TAB_CUSTOMER_POSSITION:
            return updateTabOfDashboardCustomer(state, action);
        case actionTypes.UPDATE_ALLCATION_TAB_CUSTOMER_POSSITION:
            return updateAllocateOfOpportunitiesCustomer(state, action);
        case actionTypes.UPDATE_ALLCATED_CHECKED_CUSTOMER_LEADS:
            return updateCheckAllocatedLeadCustomer(state, action);
        case actionTypes.FETCH_ALL_TEAM_CUSTOMER_COUNT:
            return updateAllTeamCountCustomer(state, action);
        case actionTypes.FETCH_ALL_TEAM_CUSTOMER_COUNTT:
            return updateAllTeamCountSeCustomer(state, action);
        case actionTypes.SHOW_CUSTOMER_LOADER:
            return showfullpageloaderCustomer(state, action)
        case actionTypes.HIDE_CUSTOMER_LOADER:
            return hidefullpageloaderCustomer(state, action)
        default:
            return state;


    }
};

export default reducer;
