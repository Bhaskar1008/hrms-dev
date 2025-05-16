import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialCtplPolicy = {
  // createCtplPolicyLoading: false,
  // createCtplPolicyError: "",
  // ctplPolicyDataloading: false,
  // ctplpolicyId: "",
  // CTPL_CustomerInfo_for_Policy: {
  //   firstName: "",
  //   middleName: "",
  //   lastName: "",
  //   suffix: "No",
  //   birthDate: "",
  //   placeOfBirth: "",
  //   gender: "",
  //   citizenship: "",
  //   province: "",
  //   provinceName:"", 
  //   city: "",
  //   cityName: "",
  //   zipCode: "",
  //   addressLine1: "",
  //   addressLine2: "",
  //   uploadID: "",
  //   mobileNumber: "",
  //   email: "",
  //   expiringPolicyNumber: "",
  //   documentType: "",
  //   documentCode: "",
  // },
  // CTPL_VehicalInfo_for_Policy: {
  //   make: "",
  //   makeName: '',
  //   model: "",
  //   modelName: '',
  //   vehicleType: "",
  //   vehicleTypeName: "",
  //   modelYear: "",
  //   subModel: "",
  //   subModelName: "",
  //   typeOfUse: "",
  //   typeOfUseName: "",
  //   subline: "",
  //   sublineName: "",
  //   plateNumber: "",
  //   chasisNumber: "",
  //   motorNumber: "",
  //   mvFileNumber: "",
  //   effectivityDate: "",
  //   expiryDate: "",
  // },
  // CTPL_policy_info: {
  //   issueType: null,
  //   accountType: null,
  //   policyType: null,
  //   policyForVehical: null,
  // },
  // leadId: null,
  // policy_group_info: {
  //   policy_group: null,
  //   contract_Num: null,
  //   sub_contract_Num: null,
  //   commercial_structure: null,
  // },
  formData: {}
};

const ctplStoreform = (state, action) => {
 

  const payload = { ...state.formData, ...action.formData };

  return updateObject(state, {
    createLeadLoading: false,
    formData: payload,
    // childParsedData:childParsedData,
  });
};

const createCtplPolicyStart = (state, action) => {
  return updateObject(state, {
    createCtplPolicyLoading: true,
    ctplPolicyDataloading: false,
  });
};

const createCtplPolicySuccess = (state, action) => {

  const payload = { ...state.formData, ...action.formData };
  return updateObject(state, {
    ctplPolicyDataLoading: true,
    createCtplPolicyLoading: false,
    formData: payload,
    // payloadFormData: payload,
    ctplpolicyId: action.formData._id,
    successMsg: action.succMsg,
  });
};
const createCtplPolicyFail = (state, action) => {
  return updateObject(state, {
    createCtplPolicyLoading: false,
    createCtplPolicyError: action.error,
    ctplPolicyDataLoading: false,
    errorMessage: action.error,
  });
};

const reducer = (state = initialCtplPolicy, action) => {
  switch (action.type) {
    // lead
    case actionTypes.CREATE_CTPLPOLICY_START:
      return createCtplPolicyStart(state, action);
    case actionTypes.CREATE_CTPLPOLICY_SUCCESS:
      return createCtplPolicySuccess(state, action);
    case actionTypes.CREATE_CTPLPOLICY_FAIL:
      return createCtplPolicyFail(state, action);
    case actionTypes.CREATE_CTPLPOLICY_FORM:
      return ctplStoreform(state, action);

    default:
      return state;
  }
};

export default reducer;
