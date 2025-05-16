import * as actionTypes from "./actionTypes";
import axiosRequest from "../../axios-request/request.methods";

// Fetch leads data
// Commercial Structure
export const fetchCommercialStructureStart = () => {
  return {
    type: actionTypes.FETCH_COMMERCIALSTRUCTURE_START,
  };
};

export const fetchCommercialStructureSuccess = (commercialStructure) => {
  return {
    type: actionTypes.FETCH_COMMERCIALSTRUCTURE_SUCCESS,
    commercialStructure: commercialStructure,
  };
};

export const fetchCommercialStructureFail = (error) => {
  return {
    type: actionTypes.FETCH_COMMERCIALSTRUCTURE_FAIL,
    error: error,
  };
};

export const fetchAllCommercialStructure = (url, cb = null) => {
  return (dispatch) => {
    dispatch(fetchCommercialStructureStart());
    return axiosRequest
      .get(url)
      .then((res) => {
        if (typeof cb == 'function') {
          cb(res);
        }
        return dispatch(fetchCommercialStructureSuccess(res?.data));
      })
      .catch((error) => {
        if (typeof cb == 'function') {
          cb(error);
        }
        return dispatch(fetchCommercialStructureFail(error));
      });
  };
};

//  GroupPolicy

export const fetchGroupPolicyStart = () => {
  return {
    type: actionTypes.FETCH_GROUPPOLICY_START,
  };
};

export const fetchGroupPolicySuccess = (groupPolicy) => {
  return {
    type: actionTypes.FETCH_GROUPPOLICY_SUCCESS,
    groupPolicy: groupPolicy,
  };
};

export const fetchGroupPolicyFail = (error) => {
  return {
    type: actionTypes.FETCH_GROUPPOLICY_FAIL,
    error: error,
  };
};

export const fetchAllGroupPolicy = (commstru, cb = null) => {
  return (dispatch) => {
    dispatch(fetchGroupPolicyStart());
    return axiosRequest
      .get(`user/lov?name=GroupPolicy&AgentCode=${commstru}`)
      .then((res) => {
        if (typeof cb == 'function') {
          cb(res);
        }
        if (res?.statusCode === -1) {

          return dispatch(fetchGroupPolicySuccess(res?.data));
        } else {
          return dispatch(fetchGroupPolicyFail(res?.data));
        }
      })
      .catch((error) => {
        if (typeof cb == 'function') {
          cb(error);
        }
        return dispatch(fetchGroupPolicyFail(error));
      });
  };
};

// Contract
export const fetchContractStart = () => {
  return {
    type: actionTypes.FETCH_CONTRACT_START,
  };
};

export const fetchContractSuccess = (contract) => {
  return {
    type: actionTypes.FETCH_CONTRACT_SUCCESS,
    contract: contract,
  };
};

export const fetchContractFail = (error) => {
  return {
    type: actionTypes.FETCH_MODAL_FAIL,
    error: error,
  };
};

export const fetchAllContract = (groupPolicyCode, CommStru, cb = null) => {
  //console.log("groupPolicyCode", groupPolicyCode);
  return (dispatch) => {
    dispatch(fetchContractStart());
    return axiosRequest
      .get(
        `user/lov?name=Contract&GroupPolicy=${groupPolicyCode}&AgentCode=${CommStru}`
      )
      .then((res) => {
        if (typeof cb == 'function') {
          cb(res);
        }
        return dispatch(fetchContractSuccess(res?.data));
      })
      .catch((error) => {
        if (typeof cb == 'function') {
          cb(error);
        }
        return dispatch(fetchContractFail(error));
      });
  };
};

//sub contract
export const fetchSubContractStart = () => {
  return {
    type: actionTypes.FETCH_SUBCONTRACT_START,
  };
};

export const fetchSubContractSuccess = (subcontract) => {
  return {
    type: actionTypes.FETCH_SUBCONTRACT_SUCCESS,
    subcontract: subcontract,
  };
};

export const fetchSubContractFail = (error) => {
  return {
    type: actionTypes.FETCH_SUBCONTRACT_FAIL,
    error: error,
  };
};

export const fetchAllSubContract = (contractCode, CommStru, cb = null) => {
  return (dispatch) => {
    dispatch(fetchSubContractStart());
    return axiosRequest
      .get(
        `user/lov?name=Subcontract&Contract=${contractCode}&AgentCode=${CommStru}`
      )
      .then((res) => {
        if (typeof cb == 'function') {
          cb(res);
        }
        return dispatch(fetchSubContractSuccess(res?.data));
      })
      .catch((error) => {
        if (typeof cb == 'function') {
          cb(error);
        }
        return dispatch(fetchSubContractFail(error));
      });
  };
};

// Document Type

export const fetchDocumentTypeStart = () => {
  return {
    type: actionTypes.FETCH_DOCUMENTTYPE_START,
  };
};

export const fetchDocumentTypeSuccess = (documentType) => {
  return {
    type: actionTypes.FETCH_DOCUMENTTYPE_SUCCESS,
    documentType: documentType,
  };
};

export const fetchDocumentTypeFail = (error) => {
  return {
    type: actionTypes.FETCH_DOCUMENTTYPE_FAIL,
    error: error,
  };
};

export const fetchAllDocumentType = (cb = null) => {
  return (dispatch) => {
    dispatch(fetchDocumentTypeStart());
    return axiosRequest
      .get(`user/lov-options/documentType`)
      .then((res) => {
        if (typeof cb == 'function') {
          cb(res);
        }
        return dispatch(fetchDocumentTypeSuccess(res?.data));
      })
      .catch((error) => {
        if (typeof cb == 'function') {
          cb(error);
        }
        return dispatch(fetchDocumentTypeFail(error));
      });
  };
};

//agent

export const fetchAgentStart = () => {
  return {
    type: actionTypes.FETCH_AGENT_START,
  };
};

export const fetchAgentSuccess = (agent) => {
  return {
    type: actionTypes.FETCH_AGENT_SUCCESS,
    agent: agent,
  };
};

export const fetchAgentFail = (error) => {
  return {
    type: actionTypes.FETCH_AGENT_FAIL,
    error: error,
  };
};

export const fetchAllAgent = (commstru, cb = null) => {
  return (dispatch) => {
    dispatch(fetchAgentStart());
    return axiosRequest
      .get(`user/get/agent-list?commercialStructure=${commstru}`)
      .then((res) => {
        if (typeof cb == 'function') {
          cb(res);
        }
        return dispatch(fetchAgentSuccess(res?.data));
      })
      .catch((error) => {
        if (typeof cb == 'function') {
          cb(error);
        }
        return dispatch(fetchAgentFail(error));
      });
  };
};

//Sub Agent

export const fetchSubAgentStart = () => {
  return {
    type: actionTypes.FETCH_SUBAGENT_START,
  };
};

export const fetchSubAgentSuccess = (subAgent) => {
  return {
    type: actionTypes.FETCH_SUBAGENT_SUCCESS,
    subAgent: subAgent,
  };
};

export const fetchSubAgentFail = (error) => {
  return {
    type: actionTypes.FETCH_SUBAGENT_FAIL,
    error: error,
  };
};

export const fetchAllSubAgent = (commstru, cb = null) => {
  return (dispatch) => {
    dispatch(fetchSubAgentStart());
    return axiosRequest
      .get(`user/get/subagent-list?agentCode=${commstru}`)
      .then((res) => {
        if (typeof cb == 'function') {
          cb(res);
        }
        return dispatch(fetchSubAgentSuccess(res?.data));
      })
      .catch((error) => {
        if (typeof cb == 'function') {
          cb(error);
        }
        return dispatch(fetchSubAgentFail(error));
      });
  };
};

// Accessory List

export const fetchAccessoryListStart = () => {
  return {
    type: actionTypes.FETCH_ACCESSORYLIST_START,
  };
};

export const fetchAccessoryListSuccess = (accessoryList) => {
  return {
    type: actionTypes.FETCH_ACCESSORYLIST_SUCCESS,
    accessoryList: accessoryList,
  };
};

export const fetchAccessoryListFail = (error) => {
  return {
    type: actionTypes.FETCH_ACCESSORYLIST_FAIL,
    error: error,
  };
};

export const fetchAllAccessoryList = (vehicleTypeCode, effetiveDate, cb = null) => {
  return (dispatch) => {
    dispatch(fetchAccessoryListStart());
    return axiosRequest
      .get(`user/lov?name=Accessory&VehicleType=${vehicleTypeCode}&EffectivityDate=${effetiveDate}`)
      .then((res) => {
        if (typeof cb == 'function') {
          cb(res);
        }
        return dispatch(fetchAccessoryListSuccess(res?.data));
      })
      .catch((error) => {
        if (typeof cb == 'function') {
          cb(error);
        }
        return dispatch(fetchAccessoryListFail(error));
      });
  };
};

//payment terms
export const fetchPaymentTermsStart = () => {
  return {
    type: actionTypes.FETCH_PAYMENTTERMS_START,
  };
};

export const fetchPaymentTermsSuccess = (paymentTerms) => {
  return {
    type: actionTypes.FETCH_PAYMENTTERMS_SUCCESS,
    paymentTerms: paymentTerms,
  };
};

export const fetchPaymentTermsFail = (error) => {
  return {
    type: actionTypes.FETCH_PAYMENTTERMS_FAIL,
    error: error,
  };
};

export const fetchAllPaymentTerms = (cb = null) => {
  return (dispatch) => {
    dispatch(fetchPaymentTermsStart());
    return axiosRequest
      .get(`user/lov?name=PaymentTerms`)
      .then((res) => {
        if (typeof cb == 'function') {
          cb(res);
        }
        return dispatch(fetchPaymentTermsSuccess(res?.data));
      })
      .catch((error) => {
        if (typeof cb == 'function') {
          cb(error);
        }
        return dispatch(fetchPaymentTermsFail(error));
      });
  };
};
