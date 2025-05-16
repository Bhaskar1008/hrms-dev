
const NODE_ENV = process.env.REACT_APP_APPLICATION_TYPE
const DEV_BASE_URL = process.env.REACT_APP_NODE_URL
const OrigineRoute = window.location.origin;

console.log("Quesry Check On API Confid ==== >>>>",OrigineRoute,DEV_BASE_URL);

export default {
  baseURL:DEV_BASE_URL,
  auth: 'auth/',
  secure: 'secure/',
  NODE_ENV: NODE_ENV,
  ProjectLink:OrigineRoute,
  useMockData: true, // Toggle between mock and API data
  apiEndpoints: {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    quotationsPolicies: '/quotations_policies'
  }
};

