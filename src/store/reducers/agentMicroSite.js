import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    
    // states 
    first_name:'',
    last_name:'',
    testimonials:[],
    achievements:{},
    fetchAgentDetailsLoading:false,
    fetchAgentDetailsError:"",
    profileImage:'',
    socialLinks:{},
    products:[],

    fetchCompanyLoading:false,
    fetchCompanyError:"",

    fetchBlogsLoading:false,
    fetchBlogsError:"",
    blogs:[],
    aboutCompany:{},
}
// states reducer
const fetchAgentDetailsStart = (state, action) => {
    return updateObject(state, { fetchAgentDetailsLoading: true })
}

const fetchAgentDetailsSuccess = (state, action) => {
    const { 
        first_name, 
        last_name,
        microsite_settings:{achievements:{badges}} ,
        microsite_settings:{testimonials}, 
        microsite_settings:{profileImage}, 
        microsite_settings:{connectWithMe}, 
        products,
    } = action.agentDetails
    // const {}

    return updateObject(state, { 
        fetchAgentDetailsLoading: false, 
        agentDetails: action.agentDetails,
        first_name:first_name,
        last_name:last_name,
        achievements:badges,
        testimonials:testimonials,
        profileImage:profileImage,
        socialLinks:connectWithMe,
        products:products,
    })
}
const fetchAgentDetailsFail = (state, action) => {
    return updateObject(state, { 
        fetchAgentDetailsLoading: false, 
        fetchAgentDetailsError: action.error 
    });
}

// Company
const fetchComapanyStart = (state, action) => {
    return updateObject(state, {
         fetchComapanyLoading: true 
    })
}

const fetchComapanySuccess = (state, action) => {
    
    return updateObject(state, { 
        fetchComapanyLoading: false, 
        aboutCompany:action.aboutCompany
    })
}
const fetchComapanyFail = (state, action) => {
    return updateObject(state, { 
        fetchComapanyLoading: false, 
        fetchComapanyError: action.error 
    });
}

// Blog

const fetchBlogsStart = (state, action) => {
    return updateObject(state, {
         fetchBlogsLoading: true 
    })
}

const fetchBlogsSuccess = (state, action) => {
    
    return updateObject(state, { 
        fetchBlogsLoading: false, 
        blogs:action.blogs
    })
}
const fetchBlogsFail = (state, action) => {
    return updateObject(state, { 
        fetchBlogsLoading: false, 
        fetchBlogsError: action.error 
    });
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
      
        //state
        case actionTypes.FETCH_AGENT_DETAILS_START: return fetchAgentDetailsStart(state, action)
        case actionTypes.FETCH_AGENT_DETAILS_SUCCESS: return fetchAgentDetailsSuccess(state, action)
        case actionTypes.FETCH_AGENT_DETAILS_FAIL: return fetchAgentDetailsFail(state, action)

        case actionTypes.FETCH_COMPANY_START: return fetchComapanyStart(state, action)
        case actionTypes.FETCH_COMPANY_SUCCESS: return fetchComapanySuccess(state, action)
        case actionTypes.FETCH_COMPANY_FAIL: return fetchComapanyFail(state, action)

        case actionTypes.FETCH_BLOGS_START: return fetchBlogsStart(state, action)
        case actionTypes.FETCH_BLOGS_SUCCESS: return fetchBlogsSuccess(state, action)
        case actionTypes.FETCH_BLOGS_FAIL: return fetchBlogsFail(state, action)

        default: return state
    }
}

export default reducer;