import { combineReducers } from "redux";
import leadsReducer from "./leads";
import createLeadReducer from "./newLead";
import addressReducer from "./address";
import customerLoginReducer from './customerAuth'
import loginReducer from "./auth";
import homeReducer from "./home";
import activitiesReducer from "./home";
import kpiDashboardReducer from "./kpiDashboard";
import renewalReducer from "./renewals";
import productReducer from "./product";
import agentReducer from "./agentMicroSite";
import advisorReducer from "./advisor";
import applicationReducer from "./applicationreducer";
// import BICardReducer from './BICardReducer';
// import activitiesReducer from './home'
import historyReducer from "./history";
import configureStore from "../CreateStore";
// import pendencyReducer from './penc'
import * as actionTypes from "../actions/actionTypes";
import makeReducer from "./make";
import ctplPolicyReducer from "./ctplPolicy";
import groupPolicyReducer from "./groupPolicy";
import quotationsPolicies from "./QuotationsPolicies";
import customerListingPage from "./customerListing";
import ctplQuotation from "./ctplquotation";
import tripReducer from "./tripReducer";
import vehicalePriceHandler from "./vehicalePriceHandler";
import uploadDocument from "./uploadDocument";
import motorQuotation from "./motorQuote";
import motorCoverageReducer from "./motorCoverage";
import hyperverge from "./hyperverge";
import saveQuotationPdf from "./saveQuotationPdf";
import pwaOffline from "./pwaOffline";
import checkboxReducer from "./checkbox";
import cipherStore from "./cipherStore"
import AOBLicenseAffiliatReducer from './AOBLicencAffiliat'
import CustomerquotationsPolicies from "./CustomerQuotationsPolicies"
import JWTDecrypt from './CustomerJWTDecrypt'
import GetCommercialValue from "./getCommercialValue";
import GetCustomerMobileNumberReducer from "./getCustomerMobile";
import AgentOnBoardingRegisterReducer from './agentOnBoardRegister';
import companyReducer from "./companyDetails"
// agentcypherstore
import agentCypherStoreReducer from './AgentCypherStore'
import getFiltersData from "./getFiltersData"
// all dashboard premimum store
import  DashboardPremiumData from "./dashboardPremium"
import representativeReducer from "./representativeDetails";
import brokerReducer from "./brokerReducer";

export default () => {
  const rootReducer = combineReducers({
    leads: leadsReducer,
    newLead: createLeadReducer,
    address: addressReducer,
    login: loginReducer,
    // customer ---
    CustomerLogin: customerLoginReducer,
    home: homeReducer,
    activities: activitiesReducer,
    kpiDashboard: kpiDashboardReducer,
    renewals: renewalReducer,
    history: historyReducer,
    product: productReducer,
    agent: agentReducer,
    advisor: advisorReducer,
    applicationReducer,
    make: makeReducer,
    checkbox: checkboxReducer,
    ctplPolicy: ctplPolicyReducer,
    groupPolicy: groupPolicyReducer,
    quotationsPolicies: quotationsPolicies,
    customerListingPage: customerListingPage,
    ctplqoutation: ctplQuotation,
    trip: tripReducer,
    vehicalePriceHandler: vehicalePriceHandler,
    uploadDocument,
    motorQuotation: motorQuotation,
    motorCoverage: motorCoverageReducer,
    hyperverge,
    saveQuotationPdf: saveQuotationPdf,
    pwaOffline,
    CustomerquotationsPolicies,
    cipherStore: cipherStore,
    JWTDecrypt: JWTDecrypt,
    GetCommercialValue: GetCommercialValue,
    GetCustomerMobileNumber: GetCustomerMobileNumberReducer,
    agentOnBoardingRegister: AgentOnBoardingRegisterReducer,
    brokerReducer : brokerReducer,
    AOBLicenceAffiliat: AOBLicenseAffiliatReducer,
    companyReducer : companyReducer,
    representativeReducer : representativeReducer,
    // BICardReducer,
    // pendegitncies:pendencyReducer
    // agent cypher store
    GetAgentCypherStore: agentCypherStoreReducer,
    getFiltersData,
    // dasboardPremium
    DashboardPremiumData,
  });

  const reducerProxy = (state, action) => {
    if (action.type === actionTypes.AUTH_LOGOUT_SUCCESS) {
      return rootReducer(undefined, action);
    }
    return rootReducer(state, action);
  };

  return configureStore(reducerProxy);
};

// export default rootReducer;
