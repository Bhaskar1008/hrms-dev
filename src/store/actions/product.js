import * as actionTypes from './actionTypes';
// import axios from '../../axios-common';
import axios from 'axios'; 

export const fetchProductStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCT_START
    }
}

export const fetchProductSuccess = (product) => {
    return {
        type: actionTypes.FETCH_PRODUCT_SUCCESS,
        productCategory: product,
    }
} 


export const fetchProductFail = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCT_FAIL,
        error: error
    }
}

export const fetchProduct = (channelCode) => {
    return dispatch => {
        dispatch(fetchProductStart())
        return axios.get(`admin/getprodCategory?filter=23&channel=${channelCode}`)
            .then(res => {
                let response = res.data.data
                    if(res.data.statusCode===-1){
                        return dispatch(fetchProductSuccess(response))
                    }else{
                        throw response
                    }
            })
            .catch(error => {
                return dispatch(fetchProductFail(error))
            })
    }
}

export const fetchPlanNameStart = () => {
    return {
        type: actionTypes.FETCH_PLAN_NAME_START
    }
}

export const fetchPlanNameSuccess = (product) => {
    return {
        type: actionTypes.FETCH_PLAN_NAME_SUCCESS,
        planName: product,
    }
} 


export const fetchPlanNameFail = (error) => {
    return {
        type: actionTypes.FETCH_PLAN_NAME_FAIL,
        error: error
    }
}

export const fetchPlanName = (productId) => {
        
    return dispatch => {
        dispatch(fetchPlanNameStart())
        return axios.get(`https://oonanode-uat.salesdrive.app/sdx-api/secure/user/getproduct/?productType=${productId}&roleCode=SM1`)
            .then(res => {
                    let response = res.data.data
                    if(res.data.statusCode===-1){
                        return dispatch(fetchPlanNameSuccess(response))
                    }else{
                        throw response
                    }
            })
            .catch(error => {
                return dispatch(fetchPlanNameFail(error))
            })
    }
}