import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';
import _ from "lodash";


const initialState = {
    
    // states 
    productCategory:[],
    fetchProductLoading:false,
    fetchProductError:"",

    planName:[],
    fetchPlanLoading:false,
    fetchPlanError:"",
}

const fetchProductStart = (state, action) => {
    return updateObject(state, { fetchProductLoading: true })
}

const fetchProductSuccess = (state, action) => {
    return updateObject(state, { fetchProductLoading: false, productCategory: action.productCategory})
}
const fetchProductFail = (state, action) => {
    return updateObject(state, { fetchProductLoading: false, fetchProductError: action.error });
}

const fetchPlanNameStart = (state, action) => {
    return updateObject(state, { fetchPlanLoading: true })
}

const fetchPlanNameSuccess = (state, action) => {
    const planNames = action.planName
    let planNameOptions = planNames.map(planName => {
        const {productName,_id,
            // channelCode:{channelCode}
        }= planName
        const label = productName
        const value = productName
        // const chCode = channelCode
        const newProductCategories = { 
            // chCode,
            _id,
            label, value }
        return newProductCategories
    })
    return updateObject(state, { 
        fetchPlanLoading: false, 
        planName: planNameOptions
    })
}
const fetchPlanNameFail = (state, action) => {
    return updateObject(state, { fetchPlanLoading: false, fetchPlanError: action.error });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      
        case actionTypes.FETCH_PRODUCT_START: return fetchProductStart(state, action)
        case actionTypes.FETCH_PRODUCT_SUCCESS: return fetchProductSuccess(state, action)
        case actionTypes.FETCH_PRODUCT_FAIL: return fetchProductFail(state, action)

        case actionTypes.FETCH_PLAN_NAME_START: return fetchPlanNameStart(state, action)
        case actionTypes.FETCH_PLAN_NAME_SUCCESS: return fetchPlanNameSuccess(state, action)
        case actionTypes.FETCH_PLAN_NAME_FAIL: return fetchPlanNameFail(state, action)
        default: return state
    }
}

export default reducer;