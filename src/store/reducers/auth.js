import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import { stoageGetter, stoageSetter, camelCaseKeys } from "../../helpers";
import instance from "../../axios-banca";
//import storage from '../redux-persist/lib/storage';
import storage from "redux-persist/lib/storage";


const initialState = {
  login_agent_data: null,
  agent_id: "",
  userId: "",
  login_error: null,
  channelCode: "",
  user: null,

  userDetails: {},
  levelCode: "",
  hierarchy: {},
  minValue: "",
  checkAgent: false,
};

let user = stoageGetter("user");
if (user) {
  initialState.user = user;
}


const loginStart = (state, action) => {
  return updateObject(state, { fetch_allLeads_Loading: true });
};

const multiChannelData = (state, action) => {
  return updateObject(state, {
    multiChannel: action.multiChannel,
    fetch_allLeads_Loading: false,
  });
};

const loginSuccess = (state, action) => {

  
  let user = camelCaseKeys({ ...action.login_agent_data[0][0] });
  // localStorage.setItem('user',user)
  stoageSetter("user", user);

  return updateObject(state, {
    fetch_allLeads_Loading: false,
    // login_agent_data: action.login_agent_data,
    user: user,
    userList:action.login_agent_data[0],
    user_name:
      action.login_agent_data[0][0].first_name +
      " " +
      action.login_agent_data[0][0].last_name,
    agent_id: action.login_agent_data[0][0].agent_id,
    userId: action.login_agent_data[0][0]._id,
    token: action.login_agent_data[1].token,
    // channelCode:action.login_agent_data[0][0].channelCode
  });
};
const loginFail = (state, action) => {
  return updateObject(state, {
    fetch_allLeads_Loading: false,
    login_error: action.error,
  });
};

const logoutStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const logoutSuccess = (state, action) => {
  
  stoageSetter("user", null);
  stoageSetter("headers", {});
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("headers");
  
  if (action.type === actionTypes.AUTH_LOGOUT_SUCCESS) {
    storage.removeItem('persist:root')
    state = undefined;

    //return configureStore(undefined, action)
  }
  return updateObject(state, { user: null, headers: {}, loading: false });
};

// const logoutFail = (state, action) => {
//     stoageSetter('user', null);
//     stoageSetter('headers', {});
//     window.localStorage.removeItem('user')
//     window.localStorage.removeItem('headers')
//     return updateObject(state, {user: null, headers: {} ,loading: false, error: action.error});
// };

// Post login Reducers- Get User details
const fetchUserDetailsStart = (state, action) => {
  return updateObject(state, { fetch_UserDetails_Loading: true });
};

const fetchUserDetailsSuccess = (state, action) => {
  const userDetails = action.userDetails;
  return updateObject(state, {
    fetch_UserDetails_Loading: false,
    userDetails: userDetails,
    levelCode: userDetails.hierarchy_id.levelCode,
    channelCode: userDetails.channelCode._id,
  });
};
const fetchUserDetailsFail = (state, action) => {
  return updateObject(state, {
    fetch_UserDetails_Loading: false,
    fetch_UserDetails_Error: action.error,
  });
};

// Get Hierarchy
const fetchHierarchyStart = (state, action) => {
  return updateObject(state, { fetch_Hierarchy_Loading: true });
};

const fetchHierarchySuccess = (state, action) => {
  const hierarchyData = action.hierarchy;
  let levelCodeArray = [];
  for (let i = 0; i < hierarchyData?.length; i++) {
    let levelCode = hierarchyData[i]?.levelCode;
    levelCodeArray.push(levelCode);
  }
  levelCodeArray.sort((a, b) => a - b);
  let minValue = Math.min(...levelCodeArray);
  return updateObject(state, {
    fetch_Hierarchy_Loading: false,
    hierarchy: hierarchyData,
    minValue: minValue,
  });
};
const fetchHierarchyFail = (state, action) => {
  return updateObject(state, {
    fetch_Hierarchy_Loading: false,
    fetch_Hierarchy_Error: action.error,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return loginStart(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL:
      return loginFail(state, action);
    case actionTypes.MULTI_CHANNEL:
      return multiChannelData(state, action);

    case actionTypes.AUTH_LOGOUT_START:
      return logoutStart(state, action);
    case actionTypes.AUTH_LOGOUT_SUCCESS:
      return logoutSuccess(state, action);

    case actionTypes.FETCH_USER_DETAILS_START:
      return fetchUserDetailsStart(state, action);
    case actionTypes.FETCH_USER_DETAILS_SUCCESS:
      return fetchUserDetailsSuccess(state, action);
    case actionTypes.FETCH_USER_DETAILS_FAIL:
      return fetchUserDetailsFail(state, action);

    case actionTypes.FETCH_HIERARCHY_START:
      return fetchHierarchyStart(state, action);
    case actionTypes.FETCH_HIERARCHY_SUCCESS:
      return fetchHierarchySuccess(state, action);
    case actionTypes.FETCH_HIERARCHY_FAIL:
      return fetchHierarchyFail(state, action);

    default:
      return state;
  }
};

export default reducer;
