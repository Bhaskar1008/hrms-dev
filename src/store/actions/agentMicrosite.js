import * as actionTypes from './actionTypes';
import axios from '../../axios-common';

// Fetch leads data
export const fetchAgentDetailsStart = () => {
    return {
        type: actionTypes.FETCH_AGENT_DETAILS_START
    }
}

export const fetchAgentDetailsSuccess = (agentDetails) => {
    return {
        type: actionTypes.FETCH_AGENT_DETAILS_SUCCESS,
        agentDetails: agentDetails,
    }
} 


export const fetchAgentDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_AGENT_DETAILS_FAIL,
        error: error
    }
}

export const fetchAgentDetails = (agentId) => {
    return dispatch => {
        dispatch(fetchAgentDetailsStart())
        return axios.get(`user/get-microsite-settings/${agentId}`)
            .then(res => {
                const response = res.data.data[0]
                return dispatch(fetchAgentDetailsSuccess(response))
                // if(response.status===200){
                // }
            })
            .catch(error => {
                return dispatch(fetchAgentDetailsFail(error))
            })
    }
}


// fetch company
export const fetchCompanyStart = () => {
    return {
        type: actionTypes.FETCH_COMPANY_START
    }
}

export const fetchCompanySuccess = (aboutCompany) => {
    return {
        type: actionTypes.FETCH_COMPANY_SUCCESS,
        aboutCompany: aboutCompany,
    }
} 


export const fetchCompanyFail = (error) => {
    return {
        type: actionTypes.FETCH_COMPANY_FAIL,
        error: error
    }
}

export const fetchCompany = (agentId) => {
    return dispatch => {
        dispatch(fetchCompanyStart())
        return axios.get(`user/microsite/get-about-company-details/${agentId}`)
            .then(res => {
                const response = res.data.data
                return dispatch(fetchCompanySuccess(response))
                // if(response.status===200){
                // }
            })
            .catch(error => {
                return dispatch(fetchCompanyFail(error))
            })
    }
}

// fetch blogs
export const fetchBlogsStart = () => {
    return {
        type: actionTypes.FETCH_BLOGS_START
    }
}

export const fetchBlogsSuccess = (blogs) => {
    return {
        type: actionTypes.FETCH_BLOGS_SUCCESS,
        blogs: blogs,
    }
} 


export const fetchBlogsFail = (error) => {
    return {
        type: actionTypes.FETCH_BLOGS_FAIL,
        error: error
    }
}

export const fetchBlogs = (agentId,pageNo) => {
    let skipVal 
        if(pageNo===1){
            skipVal = 0
        }else{
            skipVal = (pageNo-1)*3

        }
    return dispatch => {
        dispatch(fetchBlogsStart())
        return axios.get(`user/microsite/fetch_blogs/${agentId}?skip=${skipVal}&limit=3`)
            .then(res => {
                const response = res.data.data
                return dispatch(fetchBlogsSuccess(response))
                // if(response.status===200){
                // }
            })
            .catch(error => {
                return dispatch(fetchBlogsFail(error))
            })
    }
}