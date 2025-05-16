import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialMake = {
  // make
  make: {},
  fetch_Make_Loading: false,
  fetch_Make_Error: "",
  // SUFFIX
  suffix: {},
  fetch_Suffix_Loading: false,
  fetch_Suffix_Error: "",
  //motorConditionRenderSection
  motorConditionRenderSection: {},

  //modal
  modal: {},
  fetch_Modal_Loading: false,
  fetch_Modal_Error: "",

  //vehicletype
  vehicletype: {},
  fetch_VehicleType_Loading: false,
  fetch_VehicleType_Error: "",

  //modelyear
  modelyear: {},
  fetch_ModelYear_Loading: false,
  fetch_ModelYear_Error: "",

  //submodel
  submodel: {},
  fetch_SubModel_Loading: false,
  fetch_SubModel_Error: "",

  // typeofuse
  typeofuse: {},
  fetch_TypeOfUse_Loading: false,
  fetch_TypeOfUse_Error: "",

  // vehicle value
  vehicleValue: {},
  fetch_VehicleValue_Loading: false,
  fetch_VehicleValue_Error: "",
  // policy term value
  policyTerm: {},
  fetch_policyTerm_Loading: false,
  fetch_policyTerm_Error: "",
  //subline
  subline: {},
  fetch_Subline_Loading: false,
  fetch_Subline_Error: "",

  // vehicle category

  vehiclecategory: {},
  fetch_VehicleCategory_Loading: false,
  fetch_VehicleCategory_Error: "",

  //area of usage
  areaofusage: {},
  fetch_AreaOfUsage_Loading: false,
  fetch_AreaOfUsage_Error: "",

  // Motor product tier

  motorproducttier: {},
  fetch_MotorProductTier_Loading: false,
  fetch_MotorProductTier_Error: "",
};

// make reducer
const fetchSuffixStart = (state, action) => {
  return updateObject(state, { fetch_Suffix_Loading: true });
};

const fetchSuffixSuccess = (state, action) => {
  return updateObject(state, {
    fetch_Suffix_Loading: false,
    suffix: action.states.lovOptions,
  });
};
const fetchSuffixFail = (state, action) => {
  return updateObject(state, {
    fetch_Suffix_Loading: false,
    fetch_Suffix_Error: action.error,
  });
};
// suffix
const fetchMakeStart = (state, action) => {
  return updateObject(state, { fetch_Make_Loading: true });
};

const fetchMakeSuccess = (state, action) => {
  return updateObject(state, {
    fetch_Make_Loading: false,
    make: action.states.lov,
  });
};
const fetchMakeFail = (state, action) => {
  return updateObject(state, {
    fetch_Make_Loading: false,
    fetch_Make_Error: action.error,
  });
};

//modal reducer
const fetchModalStart = (state, action) => {
  return updateObject(state, { fetch_Modal_Loading: true });
};

const fetchModalSuccess = (state, action) => {
  return updateObject(state, {
    fetch_Modal_Loading: false,
    modal: action.modal,
  });
};
const fetchModalFail = (state, action) => {
  return updateObject(state, {
    fetch_Modal_Loading: false,
    fetch_Modal_Error: action.error,
  });
};

//vechicletype
const fetchVehicleTypeStart = (state, action) => {
  return updateObject(state, { fetch_VehicleType_Loading: true });
};

const fetchVehicleTypeSuccess = (state, action) => {
  return updateObject(state, {
    fetch_VehicleType_Loading: false,
    vehicletype: action.vehicletype,
  });
};
const fetchVehicleTypeFail = (state, action) => {
  return updateObject(state, {
    fetch_VehicleType_Loading: false,
    fetch_VehicleType_Error: action.error,
  });
};

//Model Year

const fetchModelYearStart = (state, action) => {
  return updateObject(state, { fetch_ModelYear_Loading: true });
};

const fetchModelYearSuccess = (state, action) => {
  return updateObject(state, {
    fetch_ModelYear_Loading: false,
    modelyear: action.modelyear,
  });
};
const fetchModelYearFail = (state, action) => {
  return updateObject(state, {
    fetch_ModelYear_Loading: false,
    fetch_ModelYear_Error: action.error,
  });
};

//Sub Model
const fetchSubModelStart = (state, action) => {
  return updateObject(state, { fetch_SubModel_Loading: true });
};

const fetchSubModelSuccess = (state, action) => {
  return updateObject(state, {
    fetch_SubModel_Loading: false,
    submodel: action.submodel,
  });
};
const fetchSubModelFail = (state, action) => {
  return updateObject(state, {
    fetch_SubModel_Loading: false,
    fetch_SubModel_Error: action.error,
  });
};

//Type Of Use

const fetchTypeOfUseStart = (state, action) => {
  return updateObject(state, { fetch_TypeOfUse_Loading: true });
};

const fetchTypeOfUseSuccess = (state, action) => {
  return updateObject(state, {
    fetch_TypeOfUse_Loading: false,
    typeofuse: action.typeofuse,
  });
};
const fetchTypeOfUseFail = (state, action) => {
  return updateObject(state, {
    fetch_TypeOfUse_Loading: false,
    fetch_TypeOfUse_Error: action.error,
  });
};

//vehicle value

const fetchVehicleValueStart = (state, action) => {
  return updateObject(state, { fetch_VehicleValue_Loading: true });
};

const fetchVehicleValueSuccess = (state, action) => {
  return updateObject(state, {
    fetch_VehicleValue_Loading: false,
    vehicleValue: action.vehicleValue,
  });
};
const fetchVehicleValueFail = (state, action) => {
  return updateObject(state, {
    fetch_VehicleValue_Loading: false,
    fetch_VehicleValue_Error: action.error,
  });
};
// policy Term

const fetchPolicyTermStart = (state, action) => {
  return updateObject(state, { fetch_PolicyTerm_Loading: true });
};

const fetchPolicyTermSuccess = (state, action) => {
  return updateObject(state, {
    fetch_PolicyTerm_Loading: false,
    policyTerm: action.policyTerm,
  });
};
const fetchPolicyTermFail = (state, action) => {
  return updateObject(state, {
    fetch_PolicyTerm_Loading: false,
    fetch_PolicyTerm_Error: action.error,
  });
};
//subline

const fetchSublineStart = (state, action) => {
  return updateObject(state, { fetch_Subline_Loading: true });
};

const fetchSublineSuccess = (state, action) => {
  return updateObject(state, {
    fetch_Subline_Loading: false,
    subline: action.subline,
  });
};
const fetchSublineFail = (state, action) => {
  return updateObject(state, {
    fetch_Subline_Loading: false,
    fetch_Subline_Error: action.error,
  });
};

// vehicle category
const fetchVehicleCategoryStart = (state, action) => {
  return updateObject(state, { fetch_VehicleCategory_Loading: true });
};

const fetchVehicleCategorySuccess = (state, action) => {
  return updateObject(state, {
    fetch_VehicleCategory_Loading: false,
    vehiclecategory: action.vehiclecategory,
  });
};
const fetchVehicleCategoryFail = (state, action) => {
  return updateObject(state, {
    fetch_VehicleCategory_Loading: false,
    fetch_VehicleCategory_Error: action.error,
  });
};

//area of usage

const fetchAreaOfUsageStart = (state, action) => {
  return updateObject(state, { fetch_AreaOfUsage_Loading: true });
};

const fetchAreaOfUsageSuccess = (state, action) => {
  return updateObject(state, {
    fetch_AreaOfUsage_Loading: false,
    areaofusage: action.areaofusage,
  });
};
const fetchAreaOfUsageFail = (state, action) => {
  return updateObject(state, {
    fetch_AreaOfUsage_Loading: false,
    fetch_AreaOfUsage_Error: action.error,
  });
};

//motor product tier

const fetchMotorProductTierStart = (state, action) => {
  return updateObject(state, { fetch_PolicyTerm_Loading: true });
};

const fetchMotorProductTierSuccess = (state, action) => {
  return updateObject(state, {
    fetch_MotorProductTier_Loading: false,
    motorproducttier: action.motorproducttier,
  });
};
const fetchMotorProductTierFail = (state, action) => {
  return updateObject(state, {
    fetch_MotorProductTier_Loading: false,
    fetch_MotorProductTier_Error: action.error,
  });
};

const reducer = (state = initialMake, action) => {
  switch (action.type) {
    //state
    case actionTypes.FETCH_MAKE_START:
      return fetchMakeStart(state, action,);
    case actionTypes.FETCH_MAKE_SUCCESS:
      return fetchMakeSuccess(state, action);
    case actionTypes.FETCH_MAKE_FAIL:
      return fetchMakeFail(state, action);
    // suffix
    case actionTypes.FETCH_SUFFIX_START:
      return fetchSuffixStart(state, action,);

    case actionTypes.FETCH_SUFFIX_SUCCESS:
      return fetchSuffixSuccess(state, action);
    case actionTypes.FETCH_SUFFIX_FAIL:
      return fetchSuffixFail(state, action);

    //modal
    case actionTypes.FETCH_MODAL_START:
      return fetchModalStart(state, action);
    case actionTypes.FETCH_MODAL_SUCCESS:
      return fetchModalSuccess(state, action);
    case actionTypes.FETCH_MODAL_FAIL:
      return fetchModalFail(state, action);

    //Vehicletype
    case actionTypes.FETCH_VEHICLETYPE_START:
      return fetchVehicleTypeStart(state, action);
    case actionTypes.FETCH_VEHICLETYPE_SUCCESS:
      return fetchVehicleTypeSuccess(state, action);
    case actionTypes.FETCH_VEHICLETYPE_FAIL:
      return fetchVehicleTypeFail(state, action);

    //Modelyear
    case actionTypes.FETCH_MODELYEAR_START:
      return fetchModelYearStart(state, action);
    case actionTypes.FETCH_MODELYEAR_SUCCESS:
      return fetchModelYearSuccess(state, action);
    case actionTypes.FETCH_MODELYEAR_FAIL:
      return fetchModelYearFail(state, action);

    //Submodel
    case actionTypes.FETCH_SUBMODEL_START:
      return fetchSubModelStart(state, action);
    case actionTypes.FETCH_SUBMODEL_SUCCESS:
      return fetchSubModelSuccess(state, action);
    case actionTypes.FETCH_SUBMODEL_FAIL:
      return fetchSubModelFail(state, action);

    //typeofuse
    case actionTypes.FETCH_TYPEOFUSE_START:
      return fetchTypeOfUseStart(state, action);
    case actionTypes.FETCH_TYPEOFUSE_SUCCESS:
      return fetchTypeOfUseSuccess(state, action);
    case actionTypes.FETCH_TYPEOFUSE_FAIL:
      return fetchTypeOfUseFail(state, action);

    //vehicle value
    case actionTypes.FETCH_VEHICLEVALUE_START:
      return fetchVehicleValueStart(state, action);
    case actionTypes.FETCH_VEHICLEVALUE_SUCCESS:
      return fetchVehicleValueSuccess(state, action);
    case actionTypes.FETCH_VEHICLEVALUE_FAIL:
      return fetchVehicleValueFail(state, action);
    // policy Term
    case actionTypes.FETCH_POLICYTERM_START:
      return fetchPolicyTermStart(state, action);
    case actionTypes.FETCH_POLICYTERM_SUCCESS:
      return fetchPolicyTermSuccess(state, action);
    case actionTypes.FETCH_POLICYTERM_FAIL:
      return fetchPolicyTermFail(state, action);

    // subline

    case actionTypes.FETCH_SUBLINE_START:
      return fetchSublineStart(state, action);
    case actionTypes.FETCH_SUBLINE_SUCCESS:
      return fetchSublineSuccess(state, action);
    case actionTypes.FETCH_SUBLINE_FAIL:
      return fetchSublineFail(state, action);

    // vehicle category
    case actionTypes.FETCH_VEHICLECATEGORY_START:
      return fetchVehicleCategoryStart(state, action);
    case actionTypes.FETCH_VEHICLECATEGORY_SUCCESS:
      return fetchVehicleCategorySuccess(state, action);
    case actionTypes.FETCH_VEHICLECATEGORY_FAIL:
      return fetchVehicleCategoryFail(state, action);

    //Area of usage

    case actionTypes.FETCH_AREAOFUSAGE_START:
      return fetchAreaOfUsageStart(state, action);
    case actionTypes.FETCH_AREAOFUSAGE_SUCCESS:
      return fetchAreaOfUsageSuccess(state, action);
    case actionTypes.FETCH_AREAOFUSAGE_FAIL:
      return fetchAreaOfUsageFail(state, action);

    // Motor Product Tier

    case actionTypes.FETCH_MOTORPRODUCTTIER_START:
      return fetchMotorProductTierStart(state, action);
    case actionTypes.FETCH_MOTORPRODUCTTIER_SUCCESS:
      return fetchMotorProductTierSuccess(state, action);
    case actionTypes.FETCH_MOTORPRODUCTTIER_FAIL:
      return fetchMotorProductTierFail(state, action);

      
    case actionTypes.SET_MOTOR_CONDITIONAL_RENDER:
      return {
        ...state,
        motorConditionRenderSection: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
