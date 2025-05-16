import * as actionTypes from './actionTypes';
import { getLeadFilter } from '../../helpers';
import axiosLms from '../../axios-lmsv2';

export const fetchAdvisorListStart = () => {
    return {
        type: actionTypes.FETCH_ADVISOR_LIST_START
    }
}

export const fetchAdvisorListSuccess = (allAdvisor,count) => {
    return {
        type: actionTypes.FETCH_ADVISOR_LIST_SUCCESS,
        allAdvisor: allAdvisor,
        count:count
    }
} 


export const fetchAdvisorListFail = (error) => {
    return {
        type: actionTypes.FETCH_ADVISOR_LIST_FAIL,
        error: error
    }
}

export const fetchAdvisorList = (id,proposal,pageNo) => {
    //    const proposalFilter =  getLeadFilter(proposal)
        let skipVal 
        if(pageNo===1){
            skipVal = 0
        }else{
            skipVal = (pageNo-1)*15

        }
    return dispatch => {
        dispatch(fetchAdvisorListStart())
        return axiosLms.get(`getAgentproposal/6153f1ec4735ef7f942926e3?proposalStatus=${proposal}&skip=${skipVal}`)
            .then(res => {
                const response = res.data.data
                const errorCode = res.data.statusCode
                if(errorCode===-1){

                    return dispatch(fetchAdvisorListSuccess(response[0],response[1][0].count))
                }else{
                    throw response
                }
            })
            .catch(error => {
                return dispatch(fetchAdvisorListFail(error))
        })
    }
}