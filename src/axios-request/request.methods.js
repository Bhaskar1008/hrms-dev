import axios from "axios";
import apiConfig from "../config/api.config";
import { message } from "antd";
import rootIndex from "../store/root_index";
import { getOfflineData, savingDataOffline } from "./savingDataOffline";
import Apiconfig from '../config/api.config'

const { store } = rootIndex;
const { baseURL, auth, secure, NODE_ENV } = apiConfig;

// it will execute the request
// common function for all methods
const ExecRequest = (config, options = { secure: true, multipart: false }) => {
  const _store = store.getState();

  function promiseCallback(resolve) {
    let headers = {
      "Content-Type": options.multipart
        ? "multipart/form-data"
        : "application/json",
    };

    var originURL = config.url
      var FinalToken = ""

      var customerLogin = _store?.CustomerLogin?.Customer_Token
      if (typeof customerLogin === 'string' && customerLogin !== '') {
        console.log("fulll");
        originURL = originURL.replace("user/","customer/")
        FinalToken = _store.CustomerLogin.Customer_Token
        console.log("user------", originURL);
      } else {
        originURL = config.url
        FinalToken = _store.login.token
        // text
      }

    headers = options.secure
      ? {
        ...headers,
        authorization: "Bearer " +  FinalToken
      }
      : headers;

      
    config.url = `${baseURL}${options.secure ? secure : auth}${originURL}`;
    
    config.timeout = 120000

    axios({ ...config, headers: headers })
      .then((res) => {
        const errCode = res.data.statusCode;
        
        const data = res.data;

        // COMMONA MSG
        if (errCode === 4) {
          if (data?.data?.message === 'Invalid plate number.') {
            message.warning(data?.data?.message);
          } else {
            // message.warning("Uh-oh! We've tripped over a digital glitch. Please try again later.");
            data?.data?.message ?
              message.error(data?.data?.message) : message.warning("Uh-oh! We've tripped over a digital glitch. Please try again later.")
          }
          resolve(data);
        }


        if (errCode === 2061 && config.url.includes("ExportEvents")) {
          message.error("No records found on selected dates");
        }
        if (errCode === -1) {
          if (typeof data.data === "string") {
            // alert(data.data)
            // message.success(data.data);
          } else {
            // alert('Your request has been resolved successfully');
            if (config.method === "post") {
              if (config.url.includes("todo_task"))
                message.success("Todo Created successfully");
              if (config.url.includes("bookAppointment"))
                message.success("Event Created successfully");
              if (config.url.includes("addlead"))
                message.success("Lead Created successfully");
              // ctpl-quotation
              if (config.url.includes("ctpl-quotation"))
                message.success("Quotation Generate successfully");
              // motor quick quatation
              if (config.url.includes("motor-quick-quotation"))
                message.success("Quotation Generate successfully");
              // policy
              if (config.url.includes("ctplPolicy"))
                message.success("Policy Generate successfully");
            } else if (config.method === "put") {
              if (config.url.includes("update_task_status"))
                message.success("Todo Updated successfully");
              if (config.url.includes("updateAppointment"))
                message.success("Event Updated successfully");
              if (config.url.includes("updateLead"))
                message.success("Lead details updated");
            }
          }
         

          resolve(data);
        }
        else if (errCode === 2601) {
          resolve(data.data);
        } else if (errCode === 1) {
          resolve(data);
        } else if (errCode === 4) {

          if (config.url.includes("ctplPolicy")) {
            message.error(data.data)
            resolve(data.data);
          }
          if (config.url.includes("motor-quick-quotation")) {
            resolve(data.data);
            message.error(data.data)
          }
        }
        else if (errCode === 4) {

          if (data?.data?.message === 'Invalid plate number.') {
            message.warning(data?.data?.message);
          } else {
            message.warning("Uh-oh! We've tripped over a digital glitch. Please try again later.");
            // message.warning(data?.data?.commonMessage)
          }
        } else {
          // alert(data.data);
          if (config.method !== "get") message.error(data.data);
          // message.error(data.data);
          resolve(null);
        }
      })
      .catch((error) => {
        if (error?.response) {
          //  alert(error.response.data.data);
          console.log("error.response.data.data", error?.response);
          // message.error(error?.response?.data?.data.commonMessage);
          if (error.response.status === 400 || error.response.status === 401 || error.response.status === 422 || error.response.status === 500 || error.response.status === 409) {
            try {
              // validation error is comes in 400
              // custom error code validation needs to apply here
              // VALIDATION_ERROR = 81
              // 144 - Expired otp
// 121 - wrong OTP
// 36 - Account requires verification by the Admin
// 770 - Please try again after __mins __secs

              if (error.response.data.statusCode === 4) {
                if (error?.response?.data?.data?.message === 'Invalid plate number.') {
                  message.warning(error?.response?.data?.data?.message);
                } else {
                  // for validation error purpos
                  message.warning(error?.response?.data?.data.commonMessage);
                }
              }
              if (error?.response?.data?.statusCode === 1) {
                // for validation error purpos oonaApiResponse?.message
                if (error?.response?.data?.data?.oonaApiResponse?.message) {
                  message.error(error?.response?.data?.data?.oonaApiResponse?.message)
                } else {
                  message.warning(error?.response?.data?.data);
                }

              }
              // store and local storage will clear on token expired, invalid
              // if token is not sent from the application
              // we consider this type of request is "invalid"
              else if (error.response.data.statusCode === 25) {
                if (typeof customerLogin === 'string' && customerLogin !== '') {
                  window.location.replace("/session-expire");
                }else{
                  window.location.replace("/login");
                }

              } else {
                // message.error("Request failed");
              }
            } catch (error) {
              // alert(error.response.data.data);
              message.error(error.response.data.data);
            }
          }
        } else if (error.request) {
          if (navigator.onLine === false) {

            // message.warn("No internet connection you are Offline");
          } else {
            // message.error("Request failed");
          }
          // alert('Request failed')

        } else {
          // alert(`${error.name}: ${error.message}`)
          message.error(`${error.name}: ${error.message}`);
        }
        resolve(null);
      });
  }
  return new Promise(promiseCallback);
};

export default {
  get: async (endPoint, options = { secure: true, multipart: false }) => {

    if (!navigator.onLine) {
      // if(true){
      const result = await getOfflineData(endPoint, "get", baseURL)
      return !result ? [] : result;
    }

    options = options.multipart
      ? options
      : {
        ...options,
        multipart: false,
      };
    let result = await ExecRequest(
      {
        method: "get",
        url: endPoint,
      },
      options
    );
    console.log("result",result)

    savingDataOffline(result, endPoint, "get", baseURL)

    return !result ? [] : result;
  },


  post: async (
    endPoint,
    dataBody,
    options = { secure: true, multipart: false }
  ) => {
    options = options.multipart
      ? options
      : {
        ...options,
        multipart: false,
      };
    let result = await ExecRequest(
      {
        method: "post",
        url: endPoint,
        data: dataBody,
      },
      options
    );

    return !result ? [] : result;
  },


  put: async (
    endPoint,
    dataBody,
    options = { secure: true, multipart: false }
  ) => {
    options = options.multipart
      ? options
      : {
        ...options,
        multipart: false,
      };
    let result = await ExecRequest(
      {
        method: "put",
        url: endPoint,
        data: dataBody,
      },
      options
    );

    return !result ? [] : result;
  },
};
