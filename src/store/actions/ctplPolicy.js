import * as actionTypes from "./actionTypes";
import axiosRequest from "../../axios-request/request.methods";


export const createCtplPolicyStart = () => {
  return {
    type: actionTypes.CREATE_CTPLPOLICY_START,
  };
};

export const createCtplPolicySuccess = (formData, succMsg) => {
  return {
    type: actionTypes.CREATE_CTPLPOLICY_SUCCESS,
    formData: formData,
    succMsg: succMsg,
  };
};
export const ctplStoreform = (formData, succMsg) => {
  return {
    type: actionTypes.CREATE_CTPLPOLICY_FORM,
    formData: formData,
    succMsg: succMsg,
  };
};

export const createCtplPolicyFail = (error) => {
  return {
    type: actionTypes.CREATE_CTPLPOLICY_FAIL,
    error: error,
  };
};

export const createCtplPolicy = (formData) => {
 
  return async (dispatch) => {
    dispatch(createCtplPolicyStart());
    return dispatch(createCtplPolicySuccess(formData));
    // let result = await axiosRequest.post("user/add/ctplPolicy", formData, {
    //   secure: true,
    // });

    // console.log("result", result);
    // if (result.length > 0) {
      // console.log("result", result);
      // if(result?.statusCode  === -1){
          
          
          
      // }
    // }
  };
};
