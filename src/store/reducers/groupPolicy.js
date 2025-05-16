import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialGroupPolicy = {
  // Group policy
  groupPolicy: {},
  fetch_GroupPolicy_Loading: false,
  fetch_GroupPolicy_Error: "",

  //Contract
  contract: {},
  fetch_Contract_Loading: false,
  fetch_Contract_Error: "",

  //Sub Contract
  subcontract: {},
  fetch_SubContract_Loading: false,
  fetch_SubContract_sError: "",

  // Document Type
  documentType: {},
  fetch_DocumentType_Loading: false,
  fetch_DocumentType_Error: "",

  //Commerical Structure
  commercialStructure: {},
  fetch_CommercialStructure_Loading: false,
  fetch_CommercialStructure_Error: "",

  //agent
  agent: {},
  fetch_Agent_Loading: false,
  fetch_Agent_Error: "",

  //Sub Agent
  subAgent: {},
  fetch_SubAgent_Loading: false,
  fetch_SubAgent_Error: "",

  //Accessory List
  accessoryList: {},
  fetch_AccessoryList_Loading: false,
  fetch_AccessoryList_Error: "",

  //Payment Terms
  paymentTerms: {},
  fetch_PaymentTerms_Loading: false,
  fetch_PaymentTerms_Error: "",
};

//Group policy reducer
const fetchGroupPolicyStart = (state, action) => {
  return updateObject(state, { fetch_GroupPolicy_Loading: true });
};

const fetchGroupPolicySuccess = (state, action) => {
  return updateObject(state, {
    fetch_GroupPolicy_Loading: false,
    groupPolicy: action.groupPolicy,
  });
};
const fetchGroupPolicyFail = (state, action) => {
  return updateObject(state, {
    fetch_GroupPolicy_Loading: false,
    fetch_GroupPolicy_Error: action.error,
  });
};

//contract reducer
const fetchContractStart = (state, action) => {
  return updateObject(state, { fetch_Contract_Loading: true });
};

const fetchContractSuccess = (state, action) => {
  return updateObject(state, {
    fetch_Contract_Loading: false,
    contract: action.contract,
  });
};
const fetchContractFail = (state, action) => {
  return updateObject(state, {
    fetch_Contract_Loading: false,
    fetch_Contract_Error: action.error,
  });
};

//sub contract reducer
const fetchSubContractStart = (state, action) => {
  return updateObject(state, { fetch_SubContract_Loading: true });
};

const fetchSubContractSuccess = (state, action) => {
  return updateObject(state, {
    fetch_SubContract_Loading: false,
    subcontract: action.subcontract,
  });
};
const fetchSubContractFail = (state, action) => {
  return updateObject(state, {
    fetch_SubContract_Loading: false,
    fetch_SubContract_Error: action.error,
  });
};

// Document type
const fetchDocumentTypeStart = (state, action) => {
  return updateObject(state, { fetch_DocumentType_Loading: true });
};

const fetchDocumentTypeSuccess = (state, action) => {
  return updateObject(state, {
    fetch_DocumentType_Loading: false,
    documentType: action.documentType,
  });
};
const fetchDocumentTypeFail = (state, action) => {
  return updateObject(state, {
    fetch_DocumentType_Loading: false,
    fetch_DocumentType_Error: action.error,
  });
};

//commerical structure reducer
const fetchCommercialStructureStart = (state, action) => {
  return updateObject(state, { fetch_CommercialStructure_Loading: true });
};

const fetchCommercialStructureSuccess = (state, action) => {
  return updateObject(state, {
    fetch_CommercialStructure_Loading: false,
    commercialStructure: action.commercialStructure,
  });
};
const fetchCommercialStructureFail = (state, action) => {
  return updateObject(state, {
    fetch_CommercialStructure_Loading: false,
    fetch_CommercialStructure_Error: action.error,
  });
};

//Agent

const fetchAgentStart = (state, action) => {
  return updateObject(state, { fetch_Agent_Loading: true });
};

const fetchAgentSuccess = (state, action) => {
  return updateObject(state, {
    fetch_Agent_Loading: false,
    agent: action.agent,
  });
};
const fetchAgentFail = (state, action) => {
  return updateObject(state, {
    fetch_Agent_Loading: false,
    fetch_Agent_Error: action.error,
  });
};

// Sub Agent

const fetchSubAgentStart = (state, action) => {
  return updateObject(state, { fetch_SubAgent_Loading: true });
};

const fetchSubAgentSuccess = (state, action) => {
  return updateObject(state, {
    fetch_SubAgent_Loading: false,
    subAgent: action.subAgent,
  });
};
const fetchSubAgentFail = (state, action) => {
  return updateObject(state, {
    fetch_SubAgent_Loading: false,
    fetch_SubAgent_Error: action.error,
  });
};

//payment terms
const fetchPaymentTermsStart = (state, action) => {
  return updateObject(state, { fetch_PaymentTerms_Loading: true });
};

const fetchPaymentTermsSuccess = (state, action) => {
  return updateObject(state, {
    fetch_PaymentTerms_Loading: false,
    paymentTerms: action.paymentTerms,
  });
};
const fetchPaymentTermsFail = (state, action) => {
  return updateObject(state, {
    fetch_PaymentTerms_Loading: false,
    fetch_PaymentTerms_Error: action.error,
  });
};

//Accessory List reducer
const fetchAccessoryListStart = (state, action) => {
  return updateObject(state, { fetch_AccessoryList_Loading: true });
};

const fetchAccessoryListSuccess = (state, action) => {
  return updateObject(state, {
    fetch_AccessoryList_Loading: false,
    accessoryList: action.accessoryList,
  });
};
const fetchAccessoryListFail = (state, action) => {
  return updateObject(state, {
    fetch_AccessoryList_Loading: false,
    fetch_AccessoryList_Error: action.error,
  });
};

const reducer = (state = initialGroupPolicy, action) => {
  switch (action.type) {
    //state

    case actionTypes.FETCH_GROUPPOLICY_START:
      return fetchGroupPolicyStart(state, action);
    case actionTypes.FETCH_GROUPPOLICY_SUCCESS:
      return fetchGroupPolicySuccess(state, action);
    case actionTypes.FETCH_GROUPPOLICY_FAIL:
      return fetchGroupPolicyFail(state, action);

    case actionTypes.FETCH_CONTRACT_START:
      return fetchContractStart(state, action);
    case actionTypes.FETCH_CONTRACT_SUCCESS:
      return fetchContractSuccess(state, action);
    case actionTypes.FETCH_CONTRACT_FAIL:
      return fetchContractFail(state, action);

    case actionTypes.FETCH_SUBCONTRACT_START:
      return fetchSubContractStart(state, action);
    case actionTypes.FETCH_SUBCONTRACT_SUCCESS:
      return fetchSubContractSuccess(state, action);
    case actionTypes.FETCH_SUBCONTRACT_FAIL:
      return fetchSubContractFail(state, action);

    case actionTypes.FETCH_DOCUMENTTYPE_START:
      return fetchDocumentTypeStart(state, action);
    case actionTypes.FETCH_DOCUMENTTYPE_SUCCESS:
      return fetchDocumentTypeSuccess(state, action);
    case actionTypes.FETCH_DOCUMENTTYPE_FAIL:
      return fetchDocumentTypeFail(state, action);

    case actionTypes.FETCH_COMMERCIALSTRUCTURE_START:
      return fetchCommercialStructureStart(state, action);
    case actionTypes.FETCH_COMMERCIALSTRUCTURE_SUCCESS:
      return fetchCommercialStructureSuccess(state, action);
    case actionTypes.FETCH_COMMERCIALSTRUCTURE_FAIL:
      return fetchCommercialStructureFail(state, action);

    case actionTypes.FETCH_AGENT_START:
      return fetchAgentStart(state, action);
    case actionTypes.FETCH_AGENT_SUCCESS:
      return fetchAgentSuccess(state, action);
    case actionTypes.FETCH_AGENT_FAIL:
      return fetchAgentFail(state, action);

    case actionTypes.FETCH_SUBAGENT_START:
      return fetchSubAgentStart(state, action);
    case actionTypes.FETCH_SUBAGENT_SUCCESS:
      return fetchSubAgentSuccess(state, action);
    case actionTypes.FETCH_SUBAGENT_FAIL:
      return fetchSubAgentFail(state, action);

    case actionTypes.FETCH_ACCESSORYLIST_START:
      return fetchAccessoryListStart(state, action);
    case actionTypes.FETCH_ACCESSORYLIST_SUCCESS:
      return fetchAccessoryListSuccess(state, action);
    case actionTypes.FETCH_ACCESSORYLIST_FAIL:
      return fetchAccessoryListFail(state, action);

    case actionTypes.FETCH_PAYMENTTERMS_START:
      return fetchPaymentTermsStart(state, action);
    case actionTypes.FETCH_PAYMENTTERMS_SUCCESS:
      return fetchPaymentTermsSuccess(state, action);
    case actionTypes.FETCH_PAYMENTTERMS_FAIL:
      return fetchPaymentTermsFail(state, action);

    default:
      return state;
  }
};

export default reducer;
