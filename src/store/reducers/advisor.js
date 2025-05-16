import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    // leads properties
    allAdvisorList:[],
    allAdvisorListLoading : false,
    allAdvisorListError : "",


}
// lead reducer
const fetchAdvisorListStart = (state, action) => {
    return updateObject(state, { 
        allAdvisorListLoading: true 
    })
}

const fetchAdvisorListSuccess = (state, action) => {
    return updateObject(state, { 
        allAdvisorListLoading: false, 
        allAdvisorList: action.allAdvisor, 
        count:action.count, 
    })
}
const fetchAdvisorListFail = (state, action) => {
    return updateObject(state, { 
        allAdvisorListLoading: false, 
        allAdvisorListError: action.error,
    });
}




const reducer = (state = initialState, action) => {
    switch (action.type) {
        // lead
        case actionTypes.FETCH_ADVISOR_LIST_START: return fetchAdvisorListStart(state, action)
        case actionTypes.FETCH_ADVISOR_LIST_SUCCESS: return fetchAdvisorListSuccess(state, action)
        case actionTypes.FETCH_ADVISOR_LIST_FAIL: return fetchAdvisorListFail(state, action)

        default: return state
    }
}

export default reducer;