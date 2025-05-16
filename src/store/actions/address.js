import * as actionTypes from "./actionTypes";
import axios from "../../axios-common";
import axiosRequest from "../../axios-request/request.methods";
import { stoageGetter } from "../../helpers";
import config from '../../config/api.config'

let provinceCode = "";
const user_data = stoageGetter("user");
let loginUserID = user_data?.id;

// Fetch leads data
export const fetchStateStart = () => {
  return {
    type: actionTypes.FETCH_STATES_START,
  };
};

export const fetchStateSuccess = (states) => {
  return {
    type: actionTypes.FETCH_STATES_SUCCESS,
    states: states,
  };
};

export const fetchStateFail = (error) => {
  return {
    type: actionTypes.FETCH_STATES_FAIL,
    error: error,
  };
};

export const fetchAllState = (cb = null) => {
  return (dispatch) => {
    dispatch(fetchStateStart());
    return axiosRequest
    .get('admin/provinces', { secure: false })  
      .then((res) => {
        console.log("provinces",res,typeof cb)
        const provinces = res.data.provinces || [];
        
        if (typeof cb == 'function') {
          cb(res);
        }
        return dispatch(fetchStateSuccess(provinces));
      })
      .catch((error) => {
        if (typeof cb == 'function') {
          cb(error);
        }
        return dispatch(fetchStateFail(error));
      });
  };
};


export const fetchCitiesStart = () => {
  return {
    type: actionTypes.FETCH_CITIES_START,
  };
};
// cities
export const fetchCitiesSuccess = (cities) => {
  return {
    type: actionTypes.FETCH_CITIES_SUCCESS,
    cities: cities,
  };
};

export const fetchCitiesFail = (error) => {
  return {
    type: actionTypes.FETCH_CITIES_FAIL,
    error: error,
  };
};


// export const fetchAllCities = (stateCode, cb = null) => {
//   return async (dispatch) => {
//     dispatch(fetchCitiesStart());
//     try {
//       const res = await axiosRequest.get(`user/lov?name=City&Province=${stateCode}`);
//       if (typeof cb === 'function') {
//         cb(res);
//       }
//       dispatch(fetchCitiesSuccess(res?.data));
//     } catch (error) {
//       if (typeof cb === 'function') {
//         cb(error);
//       }

//       dispatch(fetchCitiesFail(error));
//     }
//   };
// };


export const fetchAllCities = (stateCode,cb = null) => {
  return (dispatch) => {
    dispatch(fetchCitiesStart());   
      return axiosRequest 
      .get(`admin/municipalities/${stateCode}`, { secure: false })         
        .then((res) => {
          const city = res?.data?.municipalities;

      if (typeof cb === 'function') {
        cb(res);
      }
      dispatch(fetchCitiesSuccess(city));
    }) 
    .catch((error) => {
      if (typeof cb === 'function') {
        cb(error);
      }
      dispatch(fetchCitiesFail(error));
    });
  };
};


// for the zipCode
export const fetchZipCodeStart = () => {
  return {
    type: actionTypes.FETCH_ZIPCODE_START,
  };
};

export const fetchZipCodeSuccess = (zipcode) => {
  return {
    type: actionTypes.FETCH_ZIPCODE_SUCCESS,
    zipcode: zipcode,
  };
};

export const fetchZipCodeFail = (error) => {
  return {
    type: actionTypes.FETCH_ZIPCODE_FAIL,
    error: error,
  };
};

export const fetchAllZipCode = (cityCode, stateCode, cb = null) => {
  return (dispatch) => {
    dispatch(fetchZipCodeStart());
    return axiosRequest
      .get(`user/lov?name=Zip&City=${cityCode}&Province=${stateCode}`)
      .then((res) => {
        if (typeof cb == 'function') {
          cb(res);
        }
        return dispatch(fetchZipCodeSuccess(res?.data));
      })
      .catch((error) => {
        if (typeof cb == 'function') {
          cb(error);
        }
        return dispatch(fetchZipCodeFail(error));
      });
  };
};


// citizenship
export const fetchCitizenshipStart = () => {
  return {
    type: actionTypes.FETCH_CITIZENSHIP_START,
  };
};

export const fetchCitizenshipSuccess = (citizenship) => {
  return {
    type: actionTypes.FETCH_CITIZENSHIP_SUCCESS,
    citizenship: citizenship,
  };
};

export const fetchCitizenshipFail = (error) => {
  return {
    type: actionTypes.FETCH_CITIZENSHIP_FAIL,
    error: error,
  };
};

export const fetchAllCitizenship = (cb = null) => {
  return (dispatch) => {
    dispatch(fetchCitizenshipStart());
    return axiosRequest
      .get(`user/lov?name=Citizenship`)
      .then((res) => {
        if (typeof cb == 'function') {
          cb(res);
        }
        return dispatch(fetchCitizenshipSuccess(res?.data));
      })
      .catch((error) => {
        if (typeof cb == 'function') {
          cb(error);
        }
        return dispatch(fetchCitizenshipFail(error));
      });
  };
};
