import * as actionTypes from "./actionTypes";
import axios from "../../axios-common";
import axiosRequest from "../../axios-request/request.methods";
import { convertToIndianTimezone } from "../../helper/utils";

export const createLeadStart = () => {
  return {
    type: actionTypes.CREATE_LEAD_START,
  };
};

export const resetLeadForm = () => {
  return {
      type: actionTypes.RESET_LEAD_FORM
  };
};

export const createLeadSuccess = (formData, succMsg) => {
  return {
    type: actionTypes.CREATE_LEAD_SUCCESS,
    formData: formData,
    succMsg: succMsg,
  };
};

export const createLeadFail = (error) => {
  return {
    type: actionTypes.CREATE_LEAD_FAIL,
    error: error,
  };
};

export const createLead = (formData) => {
  return async (dispatch) => {
    dispatch(createLeadStart());
    
    if (formData.start_date) {
      formData.start_date = convertToIndianTimezone(formData.start_date, true);
    }
    let result = await axiosRequest.post("user/addlead", formData, {
      secure: true,
    });
    if (result.data.length > 0) {
      return dispatch(createLeadSuccess(result.data));
    }
  };
};

export const editLeadStart = () => {
  return {
    type: actionTypes.EDIT_LEAD_START,
  };
};

export const editLeadSuccess = (formData) => {
  return {
    type: actionTypes.EDIT_LEAD_SUCCESS,
    formData: formData,
  };
};

export const editLeadFail = (error) => {
  return {
    type: actionTypes.EDIT_LEAD_FAIL,
    error: error,
  };
};

export const editLead = (formData, id) => {
  return async (dispatch) => {
    dispatch(editLeadStart());
    // return axios.put(`user/updateLead/${id}`,formData)
    //     .then(res => {
    //         if(res.data.statusCode===-1){
    //             let formData = res.data.data[0]
    //             let appointmentData = res.data.data[1]

    //             return dispatch(editLeadSuccess(formData,appointmentData))
    //         }else{
    //             throw res
    //         }
    //     })
    //     .catch(error => {
    //         const errorMessage = error.data.data

    //         return dispatch(editLeadFail(errorMessage))
    //     })
    if (formData.start_date) {
      formData.start_date = convertToIndianTimezone(formData.start_date, true);
    }

    let result = await axiosRequest.put(`user/updateLead/${id}`, formData, {
      secure: true,
    });

    return dispatch(editLeadSuccess(result.data));
  };
};

export const fetchLeadDetailsStart = () => {
  return {
    type: actionTypes.FETCH_LEAD_DETAILS_START,
  };
};

export const fetchLeadDetailsSuccess = (
  leadDetails,
  appointmentDetails,
  appointmentId,
  id
) => {
  return {
    type: actionTypes.FETCH_LEAD_DETAILS_SUCCESS,
    leadDetails: leadDetails,
    appointmentDetails: appointmentDetails,
    appointmentId: appointmentId,
    fetchLeadId: id,
  };
};

export const fetchLeadDetailsFail = (error) => {
  return {
    type: actionTypes.FETCH_LEAD_DETAILS_FAIL,
    error: error,
  };
};

export const fetchLeadDetails = (id) => {
  return async (dispatch) => {
    dispatch(fetchLeadDetailsStart());
    // return axios.get(`user/getlead_details/${id}`)
    //     .then(res => {
    //             let formData = res.data.data[0]
    //             let appointmentData = res.data.data[1]
    //             if(res.data.statusCode===-1){
    //                 return dispatch(fetchLeadDetailsSuccess(formData,appointmentData,id))
    //             }else{
    //                 throw formData
    //             }
    //     })
    //     .catch(error => {
    //         return dispatch(fetchLeadDetailsFail(error))
    //     })

    let result = await axiosRequest.get(`user/getlead_details/${id}`, {
      secure: true,
    });

    if (result.data.length > 0) {
      let combined = {
        ...result.data[0],
        appointmentDetails: {
          ...result.data[1],
        },
      };
      return dispatch(fetchLeadDetailsSuccess(combined));
    } else {
      return dispatch(
        fetchLeadDetailsSuccess({ ...result.data[0], appointmentDetails: null })
      );
    }
    let leadArr = [];
    result[0].leadStatus !== "" && leadArr.push(result[0].leadStatus);
    result[0].leadDisposition !== "" && leadArr.push(result[0].leadDisposition);
    result[0].leadsubDisposition !== "" &&
      leadArr.push(result[0].leadsubDisposition);
    result[0]["leadStatusArr"] = leadArr;

    // result.forEach(el =>{ el.leadStatusArr = leadArr })
    if (result.length > 0) {
      return dispatch(fetchLeadDetailsSuccess(result[0]));
    }
  };
};

export const storeForm = (formData) => {
  return {
    type: actionTypes.STORE_FORM_SUCCESS,
    formData: formData,
  };
};
export const storeLead = (formData) => {
  return (dispatch) => {
    dispatch(storeForm(formData));
  };
};
