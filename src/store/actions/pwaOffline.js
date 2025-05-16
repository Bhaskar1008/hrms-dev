import * as actionTypes from "./actionTypes";
import axios from "../../axios-common";
import axiosRequest from "../../axios-request/request.methods";
import { convertToIndianTimezone } from "../../helper/utils";

export const pwaOfflineFlag = (formData) => {
  // console.log("pwa-action1", formData)
  // console.log("pwa-action2", succMsg)
  return {
    type: actionTypes.OFFLINE_STORE_FLAG,
    formData: formData,
  };
};
