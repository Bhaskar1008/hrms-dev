import * as actionTypes from "./actionTypes";
import axiosRequest from "../../axios-request/customer.request.methods";

//  Make
export const fetchMakeStart = () => {
  return {
    type: actionTypes.FETCH_MAKE_START,
  };
};

export const fetchMakeSuccess = (states) => {
  return {
    type: actionTypes.FETCH_MAKE_SUCCESS,
    states: states,
  };
};

export const fetchMakeFail = (error) => {
  return {
    type: actionTypes.FETCH_MAKE_FAIL,
    error: error,
  };
};

export const fetchAllMake = () => {
  return (dispatch) => {
    dispatch(fetchMakeStart());
    return axiosRequest
      .get(`user/lov?name=Make`)
      .then((res) => {
        if (res?.statusCode === -1) {
          return dispatch(fetchMakeSuccess(res?.data));
        } else {
          return dispatch(fetchMakeFail(res?.data));
        }
      })
      .catch((error) => {
        return dispatch(fetchMakeFail(error));
      });
  };
};

// Modal
export const fetchModelStart = () => {
  return {
    type: actionTypes.FETCH_MODAL_START,
  };
};

export const fetchModelSuccess = (modal) => {
  return {
    type: actionTypes.FETCH_MODAL_SUCCESS,
    modal: modal,
  };
};

export const fetchModelFail = (error) => {
  return {
    type: actionTypes.FETCH_MODAL_FAIL,
    error: error,
  };
};

export const fetchAllModal = (makeCode, cb = null) => {
  return (dispatch) => {
    dispatch(fetchModelStart());
    return axiosRequest
      .get(`user/lov?name=Model&Make=${makeCode}`)
      .then((res) => {
        if (typeof cb == "function") {
          cb(res);
        }
        if (res?.statusCode === -1) {
          return dispatch(fetchModelSuccess(res?.data));
        } else {
          return dispatch(fetchModelFail(res?.data));
        }
      })
      .catch((error) => {
        if (typeof cb == "function") {
          cb(error);
        }
        return dispatch(fetchModelFail(error));
      });
  };
};

//Vechile Type

export const fetchVehicleTypeStart = () => {
  return {
    type: actionTypes.FETCH_VEHICLETYPE_START,
  };
};

export const fetchVehicleTypeSuccess = (vehicletype) => {
  
  return {
    type: actionTypes.FETCH_VEHICLETYPE_SUCCESS,
    vehicletype: vehicletype,
  };
};

export const fetchVehicleTypeFail = (error) => {
  return {
    type: actionTypes.FETCH_VEHICLETYPE_FAIL,
    error: error,
  };
};

export const fetchAllVehicleType = (modalCode, makeCode, cb = null) => {
  return (dispatch) => {
    dispatch(fetchVehicleTypeStart());
    return axiosRequest
      .get(`user/lov?name=VehicleType&Model=${modalCode}&Make=${makeCode}`)
      .then((res) => {
        if (typeof cb == "function") {
          cb(res);
        }
        if (res?.statusCode === -1) {
          return dispatch(fetchVehicleTypeSuccess(res?.data));
        } else {
          return dispatch(fetchVehicleTypeFail(res?.data));
        }
      })
      .catch((error) => {
        if (typeof cb == "function") {
          cb(error);
        }

        return dispatch(fetchVehicleTypeFail(error));
      });
  };
};

// Model Year

export const fetchModelYearStart = () => {
  return {
    type: actionTypes.FETCH_MODELYEAR_START,
  };
};

export const fetchModelYearSuccess = (modelyear) => {
  //console.log("test1", vehicletype);
  return {
    type: actionTypes.FETCH_MODELYEAR_SUCCESS,
    modelyear: modelyear,
  };
};

export const fetchModelYearFail = (error) => {
  return {
    type: actionTypes.FETCH_MODELYEAR_FAIL,
    error: error,
  };
};

export const fetchAllModelYear = (
  vehiclecode,
  modalCode,
  makeCode,
  cb = null
) => {
  return (dispatch) => {
    dispatch(fetchModelYearStart());
    return axiosRequest
      .get(
        `user/lov?name=ModelYear&VehicleType=${vehiclecode}&Model=${modalCode}&Make=${makeCode}`
      )
      .then((res) => {
        if (typeof cb == "function") {
          cb(res);
        }
        if (res?.statusCode === -1) {
          return dispatch(fetchModelYearSuccess(res?.data));
        } else {
          return dispatch(fetchModelYearFail(res?.data));
        }
      })
      .catch((error) => {
        if (typeof cb == "function") {
          cb(error);
        }
        // console.log("error--->", error);
        return dispatch(fetchModelYearFail(error));
      });
  };
};

// Sub Model
export const fetchSubModelStart = () => {
  return {
    type: actionTypes.FETCH_SUBMODEL_START,
  };
};

export const fetchSubModelSuccess = (submodel) => {
  //console.log("test1", vehicletype);
  return {
    type: actionTypes.FETCH_SUBMODEL_SUCCESS,
    submodel: submodel,
  };
};

export const fetchSubModelFail = (error) => {
  return {
    type: actionTypes.FETCH_SUBMODEL_FAIL,
    error: error,
  };
};

export const fetchAllSubModel = (
  modelyearcode,
  vehiclecode,
  modalCode,
  makeCode,
  cb = null
) => {
  return (dispatch) => {
    dispatch(fetchSubModelStart());
    return axiosRequest
      .get(
        `user/lov?name=Submodel&ModelYear=${modelyearcode}&VehicleType=${vehiclecode}&Model=${modalCode}&Make=${makeCode}`
      )
      .then((res) => {
        if (typeof cb == "function") {
          cb(res);
        }
        if (res?.statusCode === -1) {
          return dispatch(fetchSubModelSuccess(res?.data));
        } else {
          return dispatch(fetchSubModelFail(res?.data));
        }
      })
      .catch((error) => {
        if (typeof cb == "function") {
          cb(error);
        }
        // console.log("error--->", error);
        return dispatch(fetchSubModelFail(error));
      });
  };
};

//Type of use

export const fetchTypeOfUseStart = () => {
  return {
    type: actionTypes.FETCH_TYPEOFUSE_START,
  };
};

export const fetchTypeOfUseSuccess = (typeofuse) => {
  //console.log("test1", vehicletype);
  return {
    type: actionTypes.FETCH_TYPEOFUSE_SUCCESS,
    typeofuse: typeofuse,
  };
};

export const fetchTypeOfUseFail = (error) => {
  return {
    type: actionTypes.FETCH_TYPEOFUSE_FAIL,
    error: error,
  };
};

export const fetchAllTypeOfUse = (
  submodelcode,
  modelyearcode,
  vehiclecode,
  modalCode,
  makeCode,
  cb = null
) => {
  return (dispatch) => {
    dispatch(fetchTypeOfUseStart());
    return axiosRequest
      .get(
        `user/lov?name=TypeUse&Submodel=${submodelcode}&ModelYear=${modelyearcode}&VehicleType=${vehiclecode}&Model=${modalCode}&Make=${makeCode}`
      )
      .then((res) => {
        if (typeof cb == "function") {
          cb(res);
        }
        if (res?.statusCode === -1) {
          return dispatch(fetchTypeOfUseSuccess(res?.data));
        } else {
          return dispatch(fetchTypeOfUseFail(res?.data));
        }
      })
      .catch((error) => {
        if (typeof cb == "function") {
          cb(error);
        }
        return dispatch(fetchTypeOfUseFail(error));
      });
  };
};

// Vehicle value

export const fetchVehicleValueStart = () => {
  return {
    type: actionTypes.FETCH_VEHICLEVALUE_START,
  };
};

export const setMotorConditionalRender = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_MOTOR_CONDITIONAL_RENDER, payload: data });
};

export const fetchVehicleValueSuccess = (vehicleValue) => {
  return {
    type: actionTypes.FETCH_VEHICLEVALUE_SUCCESS,
    vehicleValue: vehicleValue,
  };
};

export const fetchVehicleValueFail = (error) => {
  return {
    type: actionTypes.FETCH_VEHICLEVALUE_FAIL,
    error: error,
  };
};

export const fetchAllVehicleValue = (
  makeCode,
  modalCode,
  submodelCode,
  modelYearCode,
  cb = null
) => {
  return (dispatch) => {
    dispatch(fetchVehicleValueStart());
    return axiosRequest
      .get(
        `user/motor/vehicle-value?makeCode=${makeCode}&modelCode=${modalCode}&subModelCode=${submodelCode}&yearModel=${modelYearCode}`
      )
      .then((res) => {
        if (typeof cb == "function") {
          cb(res);
        }
        if (res?.statusCode === -1) {
          return dispatch(fetchVehicleValueSuccess(res?.data));
        } else {
          return dispatch(fetchVehicleValueFail(res?.data));
        }
      })
      .catch((error) => {
        if (typeof cb == "function") {
          cb(error);
        }
        return dispatch(fetchVehicleValueFail(error));
      });
  };
};
// policy term
export const fetchPolicyTermStart = () => {
  return {
    type: actionTypes.FETCH_POLICYTERM_START,
  };
};

export const fetchPolicyTermSuccess = (policyTerm) => {
  return {
    type: actionTypes.FETCH_POLICYTERM_SUCCESS,
    policyTerm: policyTerm,
  };
};

export const fetchPolicyTermFail = (error) => {
  return {
    type: actionTypes.FETCH_POLICYTERM_FAIL,
    error: error,
  };
};

export const fetchAllPolicyTermValue = (plateNo, isLate, cb = null) => {

  return (dispatch) => {
    dispatch(fetchPolicyTermStart());
    return axiosRequest
      .get(`user/motor/policy-term?plateNo=${plateNo}&isLate=${isLate}`)
      .then((res) => {
        if (typeof cb == "function") {
          cb(res);
        }
        if (res?.statusCode === -1) {
          return dispatch(fetchPolicyTermSuccess(res?.data));
        } else {
          return dispatch(fetchPolicyTermFail(res?.data));
        }
      })
      .catch((error) => {
        if (typeof cb == "function") {
          cb(error);
        }
        return dispatch(fetchPolicyTermFail(error));
      });
  };
};
//subline
export const fetchSublineStart = () => {
  return {
    type: actionTypes.FETCH_SUBLINE_START,
  };
};

export const fetchSublineSuccess = (subline) => {
  return {
    type: actionTypes.FETCH_SUBLINE_SUCCESS,
    subline: subline,
  };
};

export const fetchSublineFail = (error) => {
  return {
    type: actionTypes.FETCH_SUBLINE_FAIL,
    error: error,
  };
};

export const fetchAllSubline = (vehicleCode, typeOfUseCode, cb = null) => {
  return (dispatch) => {
    dispatch(fetchSublineStart());
    return axiosRequest
      .get(
        `user/motor/subline?&vehicleType=${vehicleCode}&typeOfUse=${typeOfUseCode}`
      )
      .then((res) => {
        if (typeof cb == "function") {
          cb(res);
        }
        if (res?.statusCode === -1) {
          return dispatch(fetchSublineSuccess(res?.data));
        } else {
          return dispatch(fetchSublineFail(res?.data));
        }
      })
      .catch((error) => {
        if (typeof cb == "function") {
          cb(error);
        }
        return dispatch(fetchSublineFail(error));
      });
  };
};

// Vehicle Category

export const fetchVehicleCategoryStart = () => {
  return {
    type: actionTypes.FETCH_VEHICLECATEGORY_START,
  };
};

export const fetchVehicleCategorySuccess = (vehiclecategory) => {
  return {
    type: actionTypes.FETCH_VEHICLECATEGORY_SUCCESS,
    vehiclecategory: vehiclecategory,
  };
};

export const fetchVehicleCategoryFail = (error) => {
  return {
    type: actionTypes.FETCH_VEHICLECATEGORY_FAIL,
    error: error,
  };
};

export const fetchAllVehicleCategory = (cb = null) => {
  return (dispatch) => {
    dispatch(fetchVehicleCategoryStart());
    return axiosRequest
      .get(`user/vehicalTypes`)
      .then((res) => {
        if (typeof cb == "function") {
          cb(res);
        }
        if (res?.statusCode === -1) {

          return dispatch(fetchVehicleCategorySuccess(res?.data));
        } else {
          return dispatch(fetchVehicleCategoryFail(res?.data));
        }
      })
      .catch((error) => {
        if (typeof cb == "function") {
          cb(error);
        }
        return dispatch(fetchVehicleCategoryFail(error));
      });
  };
};

// Area of Usage

export const fetchAreaOfUsageStart = () => {
  return {
    type: actionTypes.FETCH_AREAOFUSAGE_START,
  };
};

export const fetchAreaOfUsageSuccess = (areaofusage) => {
  return {
    type: actionTypes.FETCH_AREAOFUSAGE_SUCCESS,
    areaofusage: areaofusage,
  };
};

export const fetchAreaOfUsageFail = (error) => {
  return {
    type: actionTypes.FETCH_AREAOFUSAGE_FAIL,
    error: error,
  };
};

export const fetchAllAreaOfUsage = (
  // submodelcode,
  // modelyearcode,
  // vehiclecode,
  // modalCode,
  // makeCode,
  subline,
  cb = null
) => {
  return (dispatch) => {
    dispatch(fetchAreaOfUsageStart());
    return axiosRequest
      .get(`user/lov?name=AreaOfUsage&Subline= ${subline}`)
      .then((res) => {
        if (typeof cb == "function") {
          cb(res);
        }
        if (res?.statusCode === -1) {

          return dispatch(fetchAreaOfUsageSuccess(res?.data));
        } else {
          return dispatch(fetchAreaOfUsageFail(res?.data));
        }
      })
      .catch((error) => {
        if (typeof cb == "function") {
          cb(error);
        }
        return dispatch(fetchAreaOfUsageFail(error));
      });
  };
};

// Type Of Motor Product Button

export const fetchMotorProductTierStart = () => {
  return {
    type: actionTypes.FETCH_MOTORPRODUCTTIER_START,
  };
};

export const fetchMotorProductTierSuccess = (motorproducttier) => {
  return {
    type: actionTypes.FETCH_MOTORPRODUCTTIER_SUCCESS,
    motorproducttier: motorproducttier,
  };
};

export const fetchMotorProductTierFail = (error) => {
  return {
    type: actionTypes.FETCH_MOTORPRODUCTTIER_FAIL,
    error: error,
  };
};

export const fetchAllMotorProductTier = (subline, cb = null) => {
  return (dispatch) => {
    dispatch(fetchMotorProductTierStart());
    return axiosRequest
      .get(`user/lov?name=MotarProduct&Subline=${subline}`)
      .then((res) => {
        if (typeof cb == "function") {
          cb(res);
        }
        if (res?.statusCode === -1) {
          return dispatch(fetchMotorProductTierSuccess(res?.data));
        } else {
          return dispatch(fetchMotorProductTierFail(res?.data));
        }
      })
      .catch((error) => {
        if (typeof cb == "function") {
          cb(error);
        }
        return dispatch(fetchMotorProductTierFail(error));
      });
  };
};

// suffix

export const fetchSuffixStart = () => {
  return {
    type: actionTypes.FETCH_SUFFIX_START,
  };
};

export const fetchSuffixSuccess = (states) => {
  return {
    type: actionTypes.FETCH_SUFFIX_SUCCESS,
    states: states,
  };
};

export const fetchSuffixFail = (error) => {
  return {
    type: actionTypes.FETCH_SUFFIX_FAIL,
    error: error,
  };
};

export const fetchAllSuffix = (cb = null) => {
  return (dispatch) => {
    dispatch(fetchSuffixStart());
    return axiosRequest
      .get(`user/lov-options?name=Suffix`)
      .then((res) => {
        if (typeof cb == "function") {
          cb(res);
        }
        if (res?.statusCode === -1) {

          return dispatch(fetchSuffixSuccess(res?.data));
        } else {
          return dispatch(fetchSuffixFail(res?.data));
        }
      })
      .catch((error) => {
        if (typeof cb == "function") {
          cb(error);
        }
        return dispatch(fetchSuffixFail(error));
      });
  };
};
// prefix start here
export const fetchPrefixStart = () => {
  return {
    type: actionTypes.FETCH_PREFIX_START,
  };
};

export const fetchPrefixSuccess = (states) => {
  return {
    type: actionTypes.FETCH_PREFIX_SUCCESS,
    states: states,
  };
};

export const fetchPrefixFail = (error) => {
  return {
    type: actionTypes.FETCH_PREFIX_FAIL,
    error: error,
  };
};

export const fetchAllPrefix = (cb = null) => {
  return (dispatch) => {
    dispatch(fetchPrefixStart());
    return axiosRequest
      .get(`user/lov-options?name=Suffix`)
      .then((res) => {
        if (typeof cb == "function") {
          cb(res);
        }
        if (res?.statusCode === -1) {
          return dispatch(fetchPrefixSuccess(res?.data));
        } else {
          return dispatch(fetchPrefixFail(res?.data));
        }
      })
      .catch((error) => {
        if (typeof cb == "function") {
          cb(error);
        }
        return dispatch(fetchPrefixFail(error));
      });
  };
};
