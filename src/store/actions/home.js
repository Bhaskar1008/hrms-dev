import * as actionTypes from "./actionTypes";
import axios from "../../axios-common";
import axiosRequest from "../../axios-request/request.methods";

export const homeStart = () => {
  return {
    type: actionTypes.HOME_START,
  };
};

export const homeSuccess = (payload) => {
  return {
    type: actionTypes.HOME_SUCCESS,
    home: payload,
  };
};

export const userTreeData = (payload) => {
  return {
    type: actionTypes.USER_TREE,
    home: payload,
  };
};
export const businessCardData = (payload) => {
  return {
    type: actionTypes.BUSINESS_CARD,
    businessData: payload,
  };
};

export const homeFail = (error) => {
  return {
    type: actionTypes.HOME_FAIL,
    error: error,
  };
};
export const todoStart = () => {
  return {
    type: actionTypes.TODO_START,
  };
};

export const todoSuccess = (info) => {
  return {
    type: actionTypes.TODO_SUCCESS,
    todo: info,
  };
};

export const activitiesStart = () => {
  return {
    type: actionTypes.ACTIVITIES_START,
  };
};

export const activitiesSuccess = (info) => {
  return {
    type: actionTypes.ACTIVITIES_SUCCESS,
    activities: info,
  };
};

export const activitiesFail = (error) => {
  return {
    type: actionTypes.ACTIVITIES_FAIL,
    error: error,
  };
};

export const home = (agent_id, userID) => {
  return async (dispatch) => {
    dispatch(homeStart());
    // https://pocbancanode.iorta.in/secure/user/getleads_team_count/AG9l7ynu?filter=today&agent_user_id=60e5d6056b18e8309da3fa49
    let _resp = await axiosRequest.get(
      `user/v2/getleads_team_count/${userID}?requiredData=self`,
      { secure: true }
    );
    return dispatch(homeSuccess(_resp.data));
    // return axios.get(`user/getleads_team_count/${agent_id}`)
    // .then(res=>{
    //     return dispatch(homeSuccess(res.data.data))
    // }).catch(error=>{
    // })
  };
};

export const getUserTreeAPI = (userId) => {
  return async (dispatch) => {
    // dispatch(homeStart())
    let _resp = await axiosRequest.get(`user/v2/user_tree?userId=${userId}`, {
      secure: true,
    });
    return dispatch(userTreeData(_resp?.data));
    // return axiosRequest.get(`user/v2/user_tree?userId=${agent_id}`)
    // .then(res=>{
    //     return dispatch(userTreeData(res.data.data))
    // }).catch(error=>{
    // })
  };
};

export const getBusinessCardAPI = (userId, channelData) => {
  // https://pocbancanode.iorta.in/secure/user/fetch_business_card_data?csmId=60e5d6056b18e8309da3fa49&channel=5f912e05037b6c581e7678f1
  return async (dispatch) => {
    // dispatch(homeStart())
    let _resp = await axiosRequest.get(
      `user/fetch_business_card_data?csmId=${userId}&channel=${channelData._id}`,
      { secure: true }
    );
    return dispatch(businessCardData(_resp));
    // return axiosRequest.get(`user/v2/user_tree?userId=${agent_id}`)
    // .then(res=>{
    //     return dispatch(userTreeData(res.data.data))
    // }).catch(error=>{
    // })
  };
};

export const todoGetData = (id) => {
  return async (dispatch) => {
    dispatch(todoStart());
    // https://pocbancanode.iorta.in/secure/user/fetch_todo_list?user_id=60e5d6056b18e8309da3fa49&filter=all&skip=0
    let _resp = await axiosRequest.get(
      `user/fetch_todo_list?filter=all&skip=0`,
      { secure: true }
    );
    return dispatch(todoSuccess(_resp));
  };
};

export const activities = (id, agentID) => {
  return async (dispatch) => {
    dispatch(activitiesStart());
    let _resp = await axiosRequest.get(
      `user/getAppointment?teamdata=0&now_filter=1&agentCode=${agentID}`,
      { secure: true }
    );
    // let _resp = await axiosRequest.get(`user/fetch_todo_list?user_id=${id}&filter=all&skip=0`, { secure: true })
    return dispatch(activitiesSuccess(_resp));
    // return axios.get(`user/getAppointment/${id}?set_reminder_prority=high,none,low,medium&now_filter=1`)
    // .then(res=>{
    //     return dispatch(activitiesSuccess(res.data.data))
    // }).catch(error=>{
    // })
  };
};
