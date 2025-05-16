import { stoageGetter } from "../helpers";
import { getCachedData, upsertToDB } from "../pouchdb/service";



const keyByPathname = [{ label: "/iCare-Dashboard", value: "/iCare-Dashboard" }];

const keyByApiUrl = {
  ["/iCare-Dashboard"]: [
    { label: "user/getnotification", value: "getNotification" },
    { label: "user/agent/all/dashbord/data", value: "getAllAgentData" },
    { label: "user/fetch_appointments", value: "fetchAllAppointment" },
    { label: "user/getAppointment", value: "getAllAppointment" },
    { label: "user/v2/user_tree", value: "getUserTree" },
    { label: "user/fetch_todo_list", value: "fetchTodoList" },
    { label: "admin/getHierarchy", value: "getHierarchy" },
    { label: "user/v2/getleads_team_count", value: "getLeadsTeamCount" },
    {
      label: "user/graph/agent/ytoy/production",
      value: "getAgentYToyProduction",
    },
  ],
};

const getKeyOfPathName = (pathname) => {
  if (keyByApiUrl[pathname]) return pathname;
  for (let path of keyByPathname) {
    if (pathname.startsWith(path.label)) {
      return path.value;
    }
  }
  return null;
};

const getApiKeyFromPathNameKey = (pathnameKey, url) => {
  const list = keyByApiUrl[pathnameKey];
  if (Array.isArray(list) && list.length !== 0) {
    for (let key of list) {
      if (url.startsWith(key.label)) {
        return key.value;
      }
    }
  }

  return null;
};

const getApiUniqueId = (url) => {
  if (!url) return null;

  const pathname = window.location.pathname;

  const pathKey = getKeyOfPathName(pathname);
  if (!pathKey) return null;

  const finalApiKey = getApiKeyFromPathNameKey(pathKey, url);

  if (!finalApiKey) return null;

  return finalApiKey;
};

let userData = stoageGetter("user")
function getUserData(){
    if(!userData){
        userData = stoageGetter("user")
        return userData
    }
    return userData
}

const validateRouteObj = {
  ['/iCare-Dashboard']: true,
  ['/performance']: true,
  ['/learningcenter']: true,
  ['/customer-details']: true,
  ['/quotationsPoliciesMaster/Quotation']: true,
  ['/quotationsPoliciesMaster/policies']: true,
}

const validateRoutes = (route) =>  {
  return validateRouteObj[route]
}


export async function savingDataOffline(response, url, method, baseUrl) {
    const login_user_data = getUserData("user");
    if(!login_user_data) return;
    if(!validateRoutes(window.location.pathname)){
        return;
    }
  //here storing data to couchdb
  const baseUrlObj = new URL(baseUrl);
  upsertToDB(login_user_data.id, baseUrlObj.hostname, method, url, response);
 }

export async function getOfflineData(url, method, baseUrl) {
  console.log("Check URL in Offline",url)
    const login_user_data = getUserData("user");
    if(!login_user_data) return null;
    if(!validateRoutes(window.location.pathname)){
        return null;
    }
  const baseUrlObj = new URL(baseUrl);
  const data = await getCachedData(
    login_user_data.id,
    baseUrlObj.hostname,
    method,
    url
  );
  return data;
}

// export async function requestInterceptor(config){
//     console.log(config)
//     return config
// }

// export async function responseErrorInterceptor(error){
//     console.log(error)
//     return Promise.reject(error);
// }

// export async function requestErrorInterceptor(error){
//     console.log(error)
//     return Promise.reject(error);
// }
