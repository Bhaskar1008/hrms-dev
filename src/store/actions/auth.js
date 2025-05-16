import * as actionTypes from "./actionTypes";
import axios from "../../axios-common";
import { Redirect, Route } from "react-router";
import { useHistory } from "react-router";
import axiosRequest from "../../axios-request/request.methods";

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const loginSuccess = (payload) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    login_agent_data: payload,
  };
};

export const multiChannelData = (payload) => {
  return {
    type: actionTypes.MULTI_CHANNEL,
    multiChannel: payload,
  };
};
export const headerName = (payload) => {
  return {
    type: actionTypes.HEADER_NAME,
    header: payload,
  };
};

export const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error,
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(loginStart());
    // const response = await  axios.post(`user/user_login_v3`,{email,password,reCaptchaToken:'09ABBMTcOWGCPi5gGdXSFjLJrmXpZmWHVBL90OBJYwMihpNXsNYJtrBhwYI3nr1J6CXWhcy6Jo2BffxPOH9a4tf88'}})
    // return await   dispatch(loginSuccess(response.data.data));
    // return axios.post(`user/user_login_v2`,{email,password})
    // .then( res=>{
    //     if(res.data.statusCode===-1){
    //         // history.push('/home')
    //         return    dispatch(loginSuccess(res.data.data));

    //     }
    // }).catch(error=>{
    // })

    const credentials = { email, password };
    let result = await axiosRequest.post("user/login", credentials, {
      secure: false,
    });
    if (result.data.length > 0) {
      return dispatch(loginSuccess(result.data));
    }
  };
};

export const logoutStart = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_START,
  };
};

export const logoutSuccess = () => {

  return {
    type: actionTypes.AUTH_LOGOUT_SUCCESS,
  };
};

export const logout = () => {

  return (dispatch) => {
    dispatch(logoutStart());
    // dispatch(logoutSuccess())

    return dispatch(logoutSuccess());
  };
};
// const getUserDetail = (cd=null) =>  {
//     try {
//         let self = this;
//         self.GET('getuserDetails?user_id='+this.Islogin()._id, res => {
//             if (res.data.statusCode === -1) {
//                 try {
//                     self.$store.commit('USER_DATA_DEATILS', res.data.data[0]);
//                     self.$store.commit('SET_ACCESS_DATA', res.data.data);
//                     if (typeof cb === 'function') {
//                         cb();
//                     }
//                 } catch (Exception) {
//                 }
//             }
//         });
//     } catch (err) {
//     }
// }

//Post login actions -- User Details
export const fetchUserDetailsStart = () => {
  return {
    type: actionTypes.FETCH_USER_DETAILS_START,
  };
};

export const fetchUserDetailsSuccess = (userDetails) => {
  return {
    type: actionTypes.FETCH_USER_DETAILS_SUCCESS,
    userDetails: userDetails,
  };
};

export const fetchUserDetailsFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_DETAILS_FAIL,
    error: error,
  };
};

export const fetchUserDetails = (userId) => {
  return async (dispatch) => {
    dispatch(fetchUserDetailsStart());
    // return axios.get(`user/getuserDetails?user_id=${userId}`)
    //     .then(res => {
    //         let response = res.data.data
    //         if(res.data.statusCode===-1){

    //             return dispatch(fetchUserDetailsSuccess(res.data.data[0]))
    //         }else{
    //             throw response
    //         }
    //     })
    //     .catch(error => {
    //         // return dispatch(fetchUserDetailsFail(error.response.data.errors))
    //         return dispatch(fetchUserDetailsFail(error))
    //     })

    let result = await axiosRequest.get(
      `user/getuserDetails?user_id=${userId}`,
      { secure: true }
    );
    if (result.data.length > 0) {
      return dispatch(fetchUserDetailsSuccess(result.data));
    }
  };
};

// Get Hierarchy

export const fetchHierarchyStart = () => {
  return {
    type: actionTypes.FETCH_HIERARCHY_START,
  };
};

export const fetchHierarchySuccess = (hierarchy) => {
  return {
    type: actionTypes.FETCH_HIERARCHY_SUCCESS,
    hierarchy: hierarchy,
  };
};

export const fetchHierarchyFail = (error) => {
  return {
    type: actionTypes.FETCH_HIERARCHY_FAIL,
    error: error,
  };
};

export const fetchHierarchy = (userId, channelCode) => {
  return async (dispatch) => {
    dispatch(fetchHierarchyStart());
    // return axios.get(`admin/getHierarchy?userId=5b3b4cc28fa96d39870443e3&channelCode=${channelCode}&skip=0&hierarchy_type=1`)
    //     .then(res => {
    //         return dispatch(fetchHierarchySuccess(res.data.data[0]))
    //     })
    //     .catch(error => {
    //         return dispatch(fetchHierarchyFail(error.response.data.errors))
    //     })

    let result = await axiosRequest.get(
      `admin/getHierarchy?userId=67d289ff7b14032720d13cf2&channelCode=${channelCode._id}&skip=0&hierarchy_type=1`,
      { secure: true }
    );
    if (result?.data?.length > 0) {
      dispatch(fetchHierarchySuccess(result?.data));
    }
  };
};
