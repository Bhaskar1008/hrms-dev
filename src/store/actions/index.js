import { hypervergeMotorData } from "./hyperverge";

export { fetchAllLeads, fetchDesignation, fetchTeamMember } from "./leads";
export {
  fetchLeadDetailsSuccess,
  fetchLeadDetails,
  createLead,
  storeLead,
  editLead,
  resetLeadForm
} from "./newLead";
export {
  fetchAllState,
  fetchAllCities,
  fetchAllZipCode,
  fetchAllCitizenship,
} from "./address";
export {
  loginSuccess,
  login,
  logout,
  fetchUserDetails,
  fetchHierarchy,
  multiChannelData,
  headerName,
} from "./auth";

export {
  GetCustomerToken,
} from "./customerAuth";

// export { home,activities } from './home'
// export { activities } from './home'
export { kpiDashboard } from "./kpiDashboard";
export {
  fetchAllRenewals,
  fetchPaidRenewals,
  fetchUnPaidRenewals,
  fetchLapsedRenewals,
  fetchRenewalDetails,
} from "./renewals";
export {
  home,
  activities,
  getUserTreeAPI,
  todoGetData,
  getBusinessCardAPI,
  businessCardData,
} from "./home";
export { fetchHistory } from "./history";
export { fetchProduct, fetchPlanName } from "./product";
export { fetchAgentDetails, fetchBlogs, fetchCompany } from "./agentMicrosite";
export { fetchAdvisorList } from "./advisor";
export {
  fetchAllMake,
  fetchAllModal,
  fetchAllVehicleType,
  fetchAllModelYear,
  fetchAllSubModel,
  fetchAllTypeOfUse,
  fetchAllVehicleValue,
  fetchAllSubline,
  fetchAllPolicyTermValue,
  fetchAllVehicleCategory,
  fetchAllAreaOfUsage,
  fetchAllMotorProductTier,
  fetchAllSuffix,
  fetchAllPrefix,
  fetchModelSuccess,
  fetchVehicleTypeSuccess,
  fetchModelYearSuccess,
  fetchSubModelSuccess,
  fetchTypeOfUseSuccess,
  fetchPolicyTermSuccess,
  fetchSublineSuccess,
  fetchAreaOfUsageSuccess,
} from "./make";

export {
  createCtplPolicy,
  createCtplPolicyStart,
  ctplStoreform,
} from "./ctplPolicy";

export {
  fetchAllGroupPolicy,
  fetchAllContract,
  fetchAllSubContract,
  fetchAllCommercialStructure,
  fetchAllDocumentType,
  fetchAllAgent,
  fetchAllSubAgent,
  fetchAllAccessoryList,
  fetchAllPaymentTerms,
  fetchGroupPolicySuccess,
} from "./groupPolicy";
export {
  motorQuotationForm,
  createMotorQuotation,
  createMotorQuotationSuccess,
  resetMotorFormData,
  motorFormalQuotationForm,
  motorPolicyStore,
} from "./motorQuote";
export {
  fetchAllGenerateCoverages,
  fetchAllMortgage,
  fetchAllMortgageClause,
  fetchAllCoverageSelectedValueDetails,
} from "./motorCoverage";
// ctpl -- quotation
export {
  createCTPLQuotation,
  storeQuotationForm,
  createCTPLQuotationSuccess,
  resetFormData,
} from "./ctplquotation";

// ctpl -- Quotations Policies
export {
  fetchQuotationsPolicies,
  fetchAllApplictaionQuotations,

} from "./QuotationsPolicies";
export {

  fetchQuotationsPoliciesCustomer,
  fetchAllApplictaionQuotationsCustomer
} from "./CustomerQuotationsPolicies";

// customer listing
export {
  fetchAllGetCustomerListing,
  fetchAllGetQuotation,
  fetchAllGetPolicies,
  currentUpdatingIdFun,
  resetCurrentCustomerId
} from "./customerListing";

export { vehicalinformationHandler } from "./vehicalePriceHandler";
// upload documents

export {
  uploadVehicleCertificate,
  uploadPhotoId,
  uploadSign,
} from "./uploadDocument";
// hyperverge data
export {
  hypervergeMotorData,
  hypervergeTravelData,
  hypervergeCTPLData,
  currentLobData,
} from "./hyperverge";

export { saveCompanyDetails, saveRepresentativeDetails } from "./companyDetails"

export { brokerDetails } from "./brokerDetails"

export { fetchAllSaveQuotaionPDF } from "./saveQuotationPdf";

export { pwaOfflineFlag } from "./pwaOffline";

export { setChangeCheckboxState } from "./Checkbox";

// save cipher store
export { fetchSaveCipherText } from "./cipherStore";

// JWT Decrypt store
export { fetchCustomerJWT } from "./CustomerJWTDecrypt";

// get coomercial store
export { GetCommercialValue } from "./getCommercialValue";
export { GetfilterQuotationData } from "./getFiltersdata"
// get customer mobile number store
export { GetCustomerMobileNumber } from "./getCustomerMobile";

// agent on boarding action
// export {
//   storeAgentONBoardForm,
//   resetFormAgentONBoardData,
//   storeAgentONBoardLisenceForm,
//   storeAgentAllApplicationForm,
// } from "./agentOnBoardRegister";
export {
  storeAgentONBoardForm,
  resetFormAgentONBoardData,
  storeAgentAllApplicationForm,
  GetAllResubitformDataForm,
  LoginMobileNumber,
  StoreLiAff
} from "./agentOnBoardRegister";

export { storeAgentONBoardLisenceForm, resetLicencseAfiliateForm } from "./AOBLicencAffiliat"

export {
  GetAgentCypherStore,
} from "./AgentCypherStore";

// all dashboard premium store 
export {
  GetDashboardPremiumStore,
} from "./dashboardPremium"