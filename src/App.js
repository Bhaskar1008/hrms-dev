import React, { useEffect, useState } from "react";
import "./App.css";
import { message, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from "react-router-dom";
// import * as actions from "../../../store/actions/index";
import * as actions from "./store/actions/index";
// code for the sharable links start here

// import ProductSelect from "./components/ICARE/SharableLink/components/ProductSelect"
import Links from "./components/ICARE/SharableLink/components/Links";
// code for the sharale links end here
import BenefitIllustrator from "./components/BenefitIllustrator/BenefitIllustrator";
import ProposalFulfilment from "./components/ProposalFulfilment/ProposalFulfilment";
import Multichannel from "./components/Multichannel";
import DefaultChannel from "./components/DefaultChannel/DefaultChannel";
import FullPageLoader from "./components/FullPageLoader/FullPageLoader";
// import MotorComprehensive from "./components/ICARE/MotorComprehensive/MotorComprehensive.js";
import NotificationComp from "./components/NotificationComp/NotificationComp";
import { CoverageMap } from "istanbul-lib-coverage";
// import PolicyHolderInformationInformation from "./components/ICARE/MotorComprehensive/PolicyHolder/PolicyHolder";
// import PolicyHolderInformation from "./components/ICARE/MotorComprehensive/components/PolicyHolderInformation";
import MotorPolicyHolderInformation from "./components/ICARE/MotorComprehensive/PolicyHolder/PolicyHolder";
import RiskInspection from "./components/ICARE/MotorComprehensive/RiskInspection/RiskInspection";

// const Master = React.lazy(() => import("./containers/Master/index"));
const MotorComprehensive = React.lazy(() => import("./components/ICARE/MotorComprehensive/MotorComprehensive"));

const LeadMaster = React.lazy(() => import("./containers/LeadMaster/index"));
const QuotationsPoliciesMaster = React.lazy(() => import("./containers/QuotationsPoliciesMaster/index"));
const AllQuotationDetails = React.lazy(() => import("./components/QuotationsPoliciesCards/AllQuotationDetails"));

const AllmotorDetails = React.lazy(() => import("./components/QuotationsPoliciesCards/MotorAlldetails"));

const AllctplDetails = React.lazy(() => import("./components/QuotationsPoliciesCards/CTPLalldetails"));

const AlltravelDetails = React.lazy(() => import("./components/QuotationsPoliciesCards/travelalldetails"));

const AllmotorpolicyDetails = React.lazy(() => import("./components/QuotationsPoliciesCards/allmotorpolicydetails"));

const AllctplpolicyDetails = React.lazy(() => import("./components/QuotationsPoliciesCards/AllCTPLpolicityDetails"));

const AlltravelpolicyDetails = React.lazy(() => import("./components/QuotationsPoliciesCards/AllTravelPolicydetails"));

const AdvisorMaster = React.lazy(() => import("./containers/AdvisorMaster/index"));
const sdkhyperverge = React.lazy(() => import("./HypervergeSDK/websdk"));
const AdvisorList = React.lazy(() => import("./components/AdvisorOnboarding/AdvisorCard"));
const OfflineMessage = React.lazy(() => import("./OfflineMessageU"));

const StatusLead = React.lazy(() => import("./components/StatusLead/StatusLead"));
const PersonalDetails = React.lazy(() => import("./components/LeadDetails/PersonalDetails/PersonalDetails"));
const ContactDetails = React.lazy(() => import("./components/LeadDetails/ContactDetails/ContactDetails"));
const Resource = React.lazy(() => import("./components/ICARE/resources/ResourcesOona"));
const bulkHistoryDetails = React.lazy(() => import("./components/ICARE/BulkHistoryDetails/BulkHistoryDetails"));
const ProfessionalDetails = React.lazy(() => import("./components/LeadDetails/ProfessionalDetails/ProfessionalDeatils"));
const ExistingInsurance = React.lazy(() => import("./components/LeadDetails/ExistingInsurance/ExistingInsurance"));
const ProposedProduct = React.lazy(() => import("./components/LeadDetails/ProposedProduct/ProposedProduct"));
const ProposalDetails = React.lazy(() => import("./components/ProposalDetails/ProposalDetails"));
const DocumentsUpload = React.lazy(() => import("./components/DocumentsUpload/DocumentsUpload"));
const History = React.lazy(() => import("./components/History/History"));
const Login = React.lazy(() => import("./components/Login/Login"));
const ForgotPassword = React.lazy(() => import("./components/ForgotPassword/ForgotPassword"));
const ChangePassword = React.lazy(() => import("./components/ChangePassword/ChangePassword"));
const Sidebar = React.lazy(() => import("./components/SideBar/SideBar"));
const BottomNavigation = React.lazy(() => import("./components/ICARE/bottomNavigation/bottomNavigation"));
const OonaFooter = React.lazy(() => import("./components/ICARE/OonaFooter/OonaFooter"));
// const ClubsMaster = React.lazy(() =>
//   import("./components/ClubMaster/ClubsMaster")
// );

const MyTeams = React.lazy(() => import("./components/MyTeams/MyTeams"));
// const Birthday = React.lazy(() => import("./components/Birthday/Birthday"));
// const HomePage = React.lazy(() => import("./components/Home/HomePage"));
const CompletedContest = React.lazy(() => import("./components/Contests/CompletedContest"));
const ActiveContest = React.lazy(() => import("./components/Contests/ActiveContest"));
const ActiveContestDetails = React.lazy(() => import("./components/Contests/ActiveContestDetails"));
const AllContestDetails = React.lazy(() => import("./components/Contests/AllContestDetails"));
const Calendar1 = React.lazy(() => import("./components/Activitity Tracker/ActivityCalender"));
const AllContest = React.lazy(() => import("./components/Contests/AllContest"));
const CompletedContestDetails = React.lazy(() => import("./components/Contests/CompletedContestDetails"));
const MyOverallRanking = React.lazy(() => import("./components/Contests/MyOverallRanking"));

const AllContestDetails1 = React.lazy(() => import("./components/Contests/AllContestDetails"));
const ActiveContestDetails1 = React.lazy(() => import("./components/Contests/ActiveContestDetails"));
const CompletedContest1 = React.lazy(() => import("./components/Contests/CompletedContest"));
const Calendar = React.lazy(() => import("./components/Contests/CalendarEvent"));
const CalendarMobile = React.lazy(() => import("./components/Contests/CalendarMobile"));

const AgentMicroService = React.lazy(() => import("./components/AgentMicroSite/AgentMicroSite"));

const KpiDashboard = React.lazy(() => import("./components/KpiDashboard/KpiDashboard"));

const NotifyPage = React.lazy(() => import("./components/NotificationComp/NotificationComp"));
const ChannelPartnerRecruitmentMaster = React.lazy(() => import("./containers/ChannelPartnerMaster/index"));
const DailyBussiness = React.lazy(() => import("./components/DailyBussiness/DailyBussiness"));
const Blog = React.lazy(() => import("./components/AgentMicroSite/Blog"));
const AdvisorPitch = React.lazy(() => import("./components/AdvisorPitch/AdvisorPitch"));
// const BenefitIllustrator = React.lazy(() => import('./components/BenefitIllustrator/BenefitIllustrator'))
const ForCustomer = React.lazy(() => import("./components/ForCustomer/ForCustomer"));
const ForSelf = React.lazy(() => import("./components/ForSelf/ForSelf"));
const RenewalReport = React.lazy(() => import("./components/RenewalReport/RenewalReport"));
const SalesPitch = React.lazy(() => import("./components/SalesPitch/SalesPitch"));
const ServiceCorner = React.lazy(() => import("./containers/ServiceCorner/index"));
const ServiceCornerAll = React.lazy(() => import("./components/ServiceCorner/ServiceCorner"));
const ServiceCornerSelf = React.lazy(() => import("./components/ServiceCorner/ServiceSelf"));
const ServiceCornerCustomers = React.lazy(() => import("./components/ServiceCorner/ServiceCustomer"));
const Renewals = React.lazy(() => import("./containers/RenewalMaster/index"));
const RenewalAll = React.lazy(() => import("./components/RenewalCollections/AllRenewals"));
const RenewalPaid = React.lazy(() => import("./components/RenewalCollections/PaidRenewals"));
const RenewalUnPaid = React.lazy(() => import("./components/RenewalCollections/UnPaidRenewals"));
const RenewalLapsed = React.lazy(() => import("./components/RenewalCollections/LapsedRenewals"));
const RenewalMasterDetails = React.lazy(() => import("./components/RenewalCollections/RenewalDetails"));
const SalesPendency = React.lazy(() => import("./components/SalesPendency/SalesPendency"));
const ExistingPartner = React.lazy(() => import("./components/Partners/ExistingPartner"));
const ExistingPartnerDetails = React.lazy(() => import("./components/Partners/ExistingPartnerDetails"));
const MappedBranches = React.lazy(() => import("./components/MappedBranches/MappedBranches"));
const LoanProducts = React.lazy(() => import("./components/Products/LoanProducts"));
// const ProposalFulfilment = React.lazy(() => import('./components/ProposalFulfilment/ProposalFulfilment'))
const PrePaymentReview = React.lazy(() => import("./components/PrePaymentReview/PrePaymentReview"));
const PaymentOptions = React.lazy(() => import("./components/PaymentOptions/PaymentOptions"));
const ProposalHistory = React.lazy(() => import("./components/ProposalHistory/ProposalHistory"));
const CreateTask = React.lazy(() => import("./components/Calender/CreateTask"));
const CreateNewTask = React.lazy(() => import("./components/Calender/CreateNewTask"));
const UploadDocuments = React.lazy(() => import("./components/UploadDocuments/UploadDocuments"));
const AdvisorProfile = React.lazy(() => import("./components/AdvisorProfile/AdvisorProfile"));
const Dashboard = React.lazy(() => import("./components/Dashboard/Dashboard"));
const BulkAction = React.lazy(() => import("./components/BulkAction/BulkAction"));
const TodoMobile = React.lazy(() => import("./components/Activitity Tracker/TodoMobile"));

const OonaDashboard = React.lazy(() => import("./components/ICARE/DashBoard/OonaDashboard"));

const VehicalType = React.lazy(() => import("./components/ICARE/CTPL/VehicalType"));

const PolicyType = React.lazy(() => import("./components/ICARE/CTPL/PolicyType"));
const VehicalInformation = React.lazy(() => import("./components/ICARE/CTPL/VehicalInformation/VehicalInformation"));

const CustomerInformation = React.lazy(() => import("./components/ICARE/CTPL/CustomerInformation/CustomerInformation"));

const TravelInfo = React.lazy(() => import("./components/ICARE/TRAVEL/TravelInfo/TravelInfo"));
const OonaLogin = React.lazy(() => import("./components/ICARE/OonaLogin/OonaLogin"));
const TravelPage = React.lazy(() => import("./components/ICARE/TRAVEL/TravelPage/TravelPage/TravelPage"));

const CustomerInformations = React.lazy(() => import("./components/ICARE/TRAVEL/CustomerInformation/CustomerInformation"));

// const Success = React.lazy(() => import("./components/ICARE/Success/Success"));
const TechnicalControl = React.lazy(() => import("./components/ICARE/Success/TechnicalControl"));
const Fail = React.lazy(() => import("./components/ICARE/Error/Error"));

const NotificationOona = React.lazy(() => import("./components/ICARE/NotificationOona/NotificationOona"));

const PolicyHolder1 = React.lazy(() => import("./components/ICARE/CTPL/PolicyHolder/PolicyHolder1"));
const VehicalInformationPage1 = React.lazy(() => import("./components/ICARE/CTPL/VehicalInformation/VehicalInformationPage1"));
const PolicyGroup = React.lazy(() => import("./components/ICARE/CTPL/PolicyGroup/PolicyGroup"));
const BulkUpload = React.lazy(() => import("./components/ICARE/CTPL/BulkUpload/BulkUpload"));

const AllProduct = React.lazy(() => import("./components/ICARE/AllProduct/AllProduct"));

const ConfirmPage = React.lazy(() => import("./components/ICARE/CTPL/ConfirmPage/ConfirmPage"));

const HelpCenter = React.lazy(() => import("./components/ICARE/Help Center/HelpCenter"));
const BulkUploadMotor = React.lazy(() => import("./components/ICARE/MotorComprehensive/components/BulkUploadMotor"));

const PriceCheck1 = React.lazy(() => import("./components/ICARE/MotorComprehensive/PriceCheck/PriceCheck"));

const PolicyGroupDetails = React.lazy(() => import("./components/ICARE/MotorComprehensive/PolicyGroupDetails/PolicyGroupDetails"));

const VehicleInformationInfo = React.lazy(() => import("./components/ICARE/MotorComprehensive/VehicleInformationDetails/VehicleInformationDetails"));

const vehicleQuote = React.lazy(() => import("./components/ICARE/MotorComprehensive/VehicleQuote/VehicleQuote"));

const accessoryQuote = React.lazy(() => import("./components/ICARE/MotorComprehensive/AccessoryQuote/AccessoryQuote"));

const coverageQuote = React.lazy(() => import("./components/ICARE/MotorComprehensive/CoverageQuote/CoverageQuote"));

const policyHolderQuote = React.lazy(() => import("./components/ICARE/MotorComprehensive/PolicyHolderInformationQuote/PolicyHolderInformationQuote"));

const riskInspection = React.lazy(() => import("./components/ICARE/MotorComprehensive/RiskInspection/RiskInspection"));
const riskInspectionSuccess = React.lazy(() => import("./components/ICARE/MotorComprehensive/RiskInspection/Success/Success"));

const MotorConfirmPage = React.lazy(() => import("./components/ICARE/MotorComprehensive/MotorConfirmPage/MotorConfirmPage"));

const inspectionFileUpload = React.lazy(() => import("./components/ICARE/MotorComprehensive/RiskInspection/InspectionFileUpload/InspectionFileUpload"));

const DocumentAlreadyUploaded = React.lazy(() => import("./components/ICARE/MotorComprehensive/RiskInspection/Success/DocumentAlreadyUploaded"));
const quoteInformation = React.lazy(() => import("./components/ICARE/MotorComprehensive/QuoteInformation/QuoteInformation"));

const QuotationSuccess = React.lazy(() => import("./components/ICARE/MotorComprehensive/QuotationSuccessPage/QuotationSuccessPage"));

const CustomerDetail = React.lazy(() => import("./components/ICARE/TRAVEL/CustomerDetails/CustomerDetail"));

const Performance = React.lazy(() => import("./components/ICARE/PerformancePage/Performance"));

const CtplBulkUploadSuccess = React.lazy(() => import("./components/ICARE/BulkUploadSuccess/BulkUploadSuccess"));
const CtplBulkUploadError = React.lazy(() => import("./components/ICARE/BulkUploadError/BulkUploadError"));

const TravelBulkUploadSuccess = React.lazy(() => import("./components/ICARE/BulkUploadSuccess/TravelBulkUploadSuccess"));
const TravelBulkUploadError = React.lazy(() => import("./components/ICARE/BulkUploadError/TravelBulkUploadError"));

const MotorBulkUploadSuccess = React.lazy(() => import("./components/ICARE/BulkUploadSuccess/MotorBulkUploadSuccess"));
const MotorBulkUploadError = React.lazy(() => import("./components/ICARE/BulkUploadError/MotorBulkUploadError"));

const FormalQuoteInfo = React.lazy(() => import("./components/ICARE/TRAVEL/FormalQuoteInfo/FormalQuoteInfo"));
const QuickQuoteInfo = React.lazy(() => import("./components/ICARE/TRAVEL/QuickQuoteInfo/QuickQuoteInfo"));
const SuccessQuickPolicy = React.lazy(() => import("./components/ICARE/TRAVEL/QuickQuoteInfo/SuccessQuickPolicy/SuccessQuickPolicy"));
const QuotePolicyInformation = React.lazy(() => import("./components/ICARE/TRAVEL/QuotePolicyInformation/QuotePolicyInformation"));

const OonaCustomerListing = React.lazy(() => import("./components/ICARE/OonaCustomerListing/OonaCustomerListing"));
const QuoteCode = React.lazy(() => import("./components/ICARE/TRAVEL/QuoteCode/QuoteCode"));

const CustomerList = React.lazy(() => import("./components/ICARE/AllCustomerDetails/CustomerList"));

// POLICY AND CTPL SUCCESS PAGE START HERE START HERE
const SuccessQuotation = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/SuccessQuotation"));
const CTPLSuccessQuotation = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/CTPLSuccessQuotation"));
const PolicySuccessTravel = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/policySuccessTravel"));
const PolicySuccessCTPL = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/PolicySuccessCTPL"));
const PaymentSuccessCTPLDone = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/PaymentSuccessCTPL"));

const PaymentSuccessTravelDone = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/PaymentSuccessTravel"));
const PaymentCustomerPayTravelDone = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/PaymentCustomerPayTravel"));

// CYPHER PAYMENT ROUTING DATA START HERE
const PaymentSuccessTravelDoneCypher = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/PaymentSuccessTravelCypher"));

const PaymentFailedTravelCypher = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/PaymentFailedTravelCypher"));

const PaymentSuccessCTPLDoneCypher = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/PaymentSuccessCtplCypher"));

const PaymentFailedCTPLCypher = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/PaymentFailedCtplCypher"));

const PaymentFailedMotorCypher = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/PaymentFailedMotorCypher"));

const PaymentSuccessMotorDoneCypher = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/PaymentSuccessMotorCypher"));

// CYPHER PAYMENT ROUTING DATA END HERE

const PaymentFailedCTPL = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/PaymentFailedCTPL"));

const PaymentFailed = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/PaymentFailedTravel"));

const TechnicalControlForCTPL = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/TechnicalControlForCTPL"));

// PAYMENT LINK TO SEND CUSTOMER PAGE START HERE =====>

const PaymentLinkCustomerSend = React.lazy(() => import("./components/ICARE/Success/Success"));
const PaymentLinkCustomerSendMotor = React.lazy(() => import("./components/ICARE/Success/SuccessMotor"));
const PaymentLinkCustomerSendCTPL = React.lazy(() => import("./components/ICARE/Success/SuccessCTPL"));

// PAYMENT LINK TO SEND CUSTOMER PAGE END HERE =====>

// POLICY AND MOTOR SUCCESS PAGE END HERE START HEREtechnical control

// POLICY AND MOTOR SUCCESS PAGE START HERE START HEREtechnical control
const TechnicalControlForMotor = React.lazy(() => import("./components/ICARE/MotorComprehensive/SuccessQuotation/TechnicalControlForMotor"));
const CustomerTechnicalControlForMotor = React.lazy(() => import("./components/ICARE/SharableLink/components/motor_sharable_comp/SuccessQuotation/TechnicalControlForMotor"));

const FormalTechnicalControlForMotor = React.lazy(() => import("./components/ICARE/MotorComprehensive/SuccessQuotation/FormalTechnicalControlForMotor"));

const MotorSuccessQuotation = React.lazy(() => import("./components/ICARE/MotorComprehensive/SuccessQuotation/MotorSuccessQuotation"));

const motorQuotationPending = React.lazy(() => import("./components/ICARE/MotorComprehensive/SuccessQuotation/QuotationPendingMotor"));
const RiskInspectionRequiredMotor = React.lazy(() => import("./components/ICARE/MotorComprehensive/SuccessQuotation/RiskInspectionRequiredMotor"));

const motorPolicyPaymentPage = React.lazy(() => import("./components/ICARE/MotorComprehensive/SuccessQuotation/PolicySuccessMotor"));

const motorPolicyCustomerPayPage = React.lazy(() => import("./components/ICARE/MotorComprehensive/SuccessQuotation/PaymentCustomerPayMotor"));

const motorPolicyTechnicalControl = React.lazy(() => import("./components/ICARE/MotorComprehensive/SuccessQuotation/PolicyTechnicalControlMotor"));

const motorPolicySuccessPage = React.lazy(() => import("./components/ICARE/MotorComprehensive/SuccessQuotation/PaymentSuccessMotor"));

const CustomermotorPolicySuccessPage = React.lazy(() => import("./components/ICARE/SharableLink/components/motor_sharable_comp/SuccessQuotation/PaymentSuccessMotor"));
const CustomermotorPolicyFailedPage = React.lazy(() => import("./components/ICARE/SharableLink/components/motor_sharable_comp/SuccessQuotation/PaymentFailedMotor"));
const CustomermotorPolicyCustomerPayPage = React.lazy(() => import("./components/ICARE/SharableLink/components/motor_sharable_comp/SuccessQuotation/PaymentCustomerPayMotor"));
const motorPolicyFailedPage = React.lazy(() => import("./components/ICARE/MotorComprehensive/SuccessQuotation/PaymentFailedMotor"));

// POLICY AND END SUCCESS PAGE END HERE START HEREtechnical control

const QuotationPending = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/QuotationPending"));
const TravelTechnicalControl = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/travelTechnicalControl"));
// this for the coca
const motorCoca = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/CocPaymentFailedMotor"));
const CtplCoca = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/CocPaymentFailedCtpl"));
const TravelCoca = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/CocPaymentFailedTravel"));
const TravelQuotePending = React.lazy(() => import("./components/ICARE/TRAVEL/SuccessQuotation/TravelQuotePending"));

// POLICY AND CTPL SUCCESS PAGE START HERE

const TravelerDetials = React.lazy(() => import("./components/ICARE/TRAVEL/TravelerDetials/TravelerDetials"));

const ResourceCenter = React.lazy(() => import("./components/SalesPitch/ResourceCenter"));

const TravelBulkUpload = React.lazy(() => import("./components/ICARE/TRAVEL/TravelBulkUpload/TravelBulkUpload"));
const TravelPolicyGroup = React.lazy(() => import("./components/ICARE/TRAVEL/TravelPolicyGroup/TravelPolicyGroup"));
const PolicyHolder = React.lazy(() => import("./components/ICARE/MotorComprehensive/PolicyHolder/PolicyHolder"));
const AlternatePolicyHolder = React.lazy(() => import("./components/ICARE/MotorComprehensive/AlternatePolicyHolder/AlternatePolicyHolder"));

// pament status CTPL , MOTOR , TRAVEL
const GetPaymentStatus = React.lazy(() => import("./components/ICARE/GetPaymentStatus"));
const MotorGetPaymentStatus = React.lazy(() => import("./components/ICARE/MotorGetPaymentStatus"));
const CustomerMotorGetPaymentStatus = React.lazy(() => import("./components/ICARE/SharableLink/MotorGetPaymentStatus"));
const TravelGetPaymentStatus = React.lazy(() => import("./components/ICARE/TravelGetPaymentStatus"));

const TravelGetPaymentStatusCypher = React.lazy(() => import("./components/ICARE/TravelGetPaymentStatusCypher"));
const CTPLGetPaymentStatusCypher = React.lazy(() => import("./components/ICARE/CTPLGetPaymentStatusCypher"));

const MotorGetPaymentStatusCypher = React.lazy(() => import("./components/ICARE/MotorGetPaymentStatusCypher"));

const MotorBulkUpload = React.lazy(() => import("./components/ICARE/MotorComprehensive/MotorBulkUpload/MotorBulkUpload"));

// Cypher payment page ---

const CTPLCypherPayment = React.lazy(() => import("./components/ICARE/PaymentCypher/CtplCypher/CtplCypherPaymentSuccess"));

const TravelCypherPayment = React.lazy(() => import("./components/ICARE/PaymentCypher/TravelCypher/TravelCypherPaymentSuccess"));

const MotorCypherPayment = React.lazy(() => import("./components/ICARE/PaymentCypher/MotorCypher/MotorCypherPaymentSuccess"));
const SharableLogin = React.lazy(() => import("./components/ICARE/SharableLink/components/SharableLogin/SharableLogin"));
const customerListingPage = React.lazy(() => import("./components/ICARE/SharableLink/components/Listing/QuotationsPoliciesMaster/quotationPolycies"));
const MobileLogin = React.lazy(() => import("./components/ICARE/SharableLink/components/SharableLogin/Mobilelogin"));
const PolicyPage = React.lazy(() => import("./components/ICARE/SharableLink/components/PolicyPage/PolicyPage"));
//
// const ShareableLinkProfile = React.lazy(() =>
//   import("./components/ICARE/SharableLink/components/ShareableLinkProfile/ShareableLinkProfile")
// );

const CustomerMotorSuccessQuotation = React.lazy(() => import("./components/ICARE/SharableLink/components/motor_sharable_comp/SuccessQuotation/MotorSuccessQuotation"));

// ================ For Customer sharblelink start here =========================

const quoationPolicyTab = React.lazy(() => import("./components/ICARE/SharableLink/components/QuotationPolicyTab/QuotationPolicyTab"));

//
// motoshare for the customer will start from here
const motorCustomerPolicyHolder = React.lazy(() => import("./components/ICARE/SharableLink/components/motor_sharable_comp/PolicyHolder/PolicyHolder"));
const HypervergeTest = React.lazy(() => import("./components/ICARE/SharableLink/sharable_hyepr/PolicyHyper"));
const motorCustomerAlternatePolicyHolder = React.lazy(() => import("./components/ICARE/SharableLink/components/motor_sharable_comp/AlternatePolicyHolder/AlternatePolicyHolder"));
const motorCustomerConfirmPage = React.lazy(() => import("./components/ICARE/SharableLink/components/motor_sharable_comp/MotorConfirmPage/MotorConfirmPage"));
const motorCustomerFormalTechnicalControl = React.lazy(() => import("./components/ICARE/SharableLink/components/motor_sharable_comp/SuccessQuotation/FormalTechnicalControlForMotor"));

const motorCustomerPolicyTechnicalControl = React.lazy(() => import("./components/ICARE/SharableLink/components/motor_sharable_comp/SuccessQuotation/PolicyTechnicalControlMotor"));
const CustomermotorPolicyPaymentPage = React.lazy(() => import("./components/ICARE/SharableLink/components/motor_sharable_comp/SuccessQuotation/PolicySuccessMotor"));
const customermotorPolicyCustomerPayPage = React.lazy(() => import("./components/ICARE/SharableLink/components/motor_sharable_comp/SuccessQuotation/PaymentCustomerPayMotor"));
// motoshare for the customer will end here

const CustomerPolicyHolder1 = React.lazy(() => import("./components/ICARE/SharableLink/components/CustomerSharableLinkCTPL/PolicyHolder/PolicyHolder1"));
const CustomerVehicalInformationPage1 = React.lazy(() => import("./components/ICARE/SharableLink/components/CustomerSharableLinkCTPL/VehicalInformation/VehicalInformationPage1"));
const CustomerVehicalInformation = React.lazy(() => import("./components/ICARE/SharableLink/components/CustomerSharableLinkCTPL/VehicalInformation/VehicalInformation"));
const CustomerPolicyGroup = React.lazy(() => import("./components/ICARE/SharableLink/components/CustomerSharableLinkCTPL/PolicyGroup/PolicyGroup"));
const SharableLinkCustomerInformation = React.lazy(() => import("./components/ICARE/SharableLink/components/CustomerSharableLinkCTPL/CustomerInformation/CustomerInformation"));
const CustomerConfirmPage = React.lazy(() => import("./components/ICARE/SharableLink/components/CustomerSharableLinkCTPL/ConfirmPage/ConfirmPage"));

const CustomerCTPLSuccessQuotation = React.lazy(() => import("./components/ICARE/SharableLink/components/AllCTPLTravelPayment/SuccessQuotation/CTPLSuccessQuotation"));

const CustomerQuotationPending = React.lazy(() => import("./components/ICARE/SharableLink/components/AllCTPLTravelPayment/SuccessQuotation/QuotationPending"));
const CustomerPolicySuccessCTPL = React.lazy(() => import("./components/ICARE/SharableLink/components/AllCTPLTravelPayment/SuccessQuotation/PolicySuccessCTPL"));
const CustomerTechnicalControlForCTPL = React.lazy(() => import("./components/ICARE/SharableLink/components/AllCTPLTravelPayment/SuccessQuotation/TechnicalControlForCTPL"));
const CustomerPaymentFailedCTPL = React.lazy(() => import("./components/ICARE/SharableLink/components/AllCTPLTravelPayment/SuccessQuotation/PaymentFailedCTPL"));

const CustomerPaymentSuccessCTPL = React.lazy(() => import("./components/ICARE/SharableLink/components/AllCTPLTravelPayment/SuccessQuotation/PaymentSuccessCTPL"));

const CustomerGetPaymentStatus = React.lazy(() => import("./components/ICARE/SharableLink/components/GetPaymentStatus"));
const CustomerCtplCoca = React.lazy(() => import("./components/ICARE/SharableLink/components/AllCTPLTravelPayment/SuccessQuotation/CocPaymentFailedCtpl"));
// ================ For Customer sharblelink end here =========================

// ================ For Agent Login Registration start here =========================
// const AgentLogin = React.lazy(() => import("./components/ICARE/Aobphilcomponent/AgentLoginResig/AgentLogin"));
// ================ For Agent Login Registration end here =========================

// ================ Agent Form Registration start here ============================

// const AgentForm = React.lazy(() => import("./components/ICARE/Aobphilcomponent/AgentFormRegistration/AgentForm"));
// const CreateAccount = React.lazy(() => import("./components/ICARE/Aobphilcomponent/AgentFormRegistration/CreateAccount"));
// const ApplicationStatus = React.lazy(() => import("./components/ICARE/Aobphilcomponent/AgentFormRegistration/ApplicationStatus"));
// const VerifyDetails = React.lazy(() => import("./components/ICARE/Aobphilcomponent/AgentFormRegistration/VerifyDetails"));

const AgentLogin = React.lazy(() => import("./components/ICARE/Aobphilcomponent/AgentLoginResig/NewAgentLogin"));
const AgentBrokerLogin = React.lazy(() => import("./Agent_BrokerOnboarding/login/AgentBrokerLogin.js"));
const Welcome = React.lazy(() => import("./Agent_BrokerOnboarding/login/Welcome.js"));
const AgentMainApp = React.lazy(() => import("./Agent_BrokerOnboarding/Agent/AgentMainApp.js"));
const BrokerMainApp = React.lazy(() => import("./Agent_BrokerOnboarding/Broker/BrokerMainApp.js"));
const AgentLoginNew = React.lazy(() => import("./components/ICARE/Aobphilcomponent/AgentLoginResig/AgentLogin.js"));
const NewRegister = React.lazy(() => import("./components/ICARE/Aobphilcomponent/AgentLoginResig/NewRegister.js"));
// ================ For Agent Login Registration end here =========================

// ================ Agent Form Registration start here ============================

const AgentForm = React.lazy(() => import("./components/ICARE/Aobphilcomponent/AgentFormRegistration/AgentForm"));
const CreateAccount = React.lazy(() => import("./components/ICARE/Aobphilcomponent/AgentFormRegistration/CreateAccount"));
const ApplicationStatus = React.lazy(() => import("./components/ICARE/Aobphilcomponent/AgentFormRegistration/ApplicationStatus"));
const VerifyDetails = React.lazy(() => import("./components/ICARE/Aobphilcomponent/AgentFormRegistration/VerifyDetails"));
const successProfile = React.lazy(() => import("./components/ICARE/Aobphilcomponent/AgentFormRegistration/successProfile.js"));

// +++++++++++++++++++ Shareable link for travel routes =============================

const SharableLinkQuoteCode = React.lazy(() => import("./components/ICARE/SharableLink/components/ShareableLinkTravel/QuoteCode/QuoteCode"));
// const ShareableTravelQuotePending = React.lazy(() =>
//   import("./components/ICARE/SharableLink/components/ShareableLinkTravel/SuccessQuotation/TravelQuotePending")
// );

const ShareableLinkTravelInfo = React.lazy(() => import("./components/ICARE/SharableLink/components/ShareableLinkTravel/TravelInfo/TravelInfo"));
const ShareableTravelPolicyGroup = React.lazy(() => import("./components/ICARE/SharableLink/components/ShareableLinkTravel/TravelPolicyGroup/TravelPolicyGroup"));

const ShareableTravelQuotePending = React.lazy(() => import("./components/ICARE/SharableLink/components/ShareableLinkTravel/SuccessQuotation/TravelQuotePending"));

const ShareableCustomerDetail = React.lazy(() => import("./components/ICARE/SharableLink/components/ShareableLinkTravel/CustomerDetails/CustomerDetail"));
const ShareableTravelPage = React.lazy(() => import("./components/ICARE/SharableLink/components/ShareableLinkTravel/TravelPage/TravelPage/TravelPage"));
const SharableSuccessQuotation = React.lazy(() => import("./components/ICARE/SharableLink/components/ShareableLinkTravel/SuccessQuotation/SuccessQuotation"));
const ShareableCustomerInformation = React.lazy(() => import("./components/ICARE/SharableLink/components/ShareableLinkTravel/CustomerInformation/CustomerInformation"));
const ShareableTravelerDetials = React.lazy(() => import("./components/ICARE/SharableLink/components/ShareableLinkTravel/TravelerDetials/TravelerDetials"));
const ShareableFormalQuoteInfo = React.lazy(() => import("./components/ICARE/SharableLink/components/ShareableLinkTravel/FormalQuoteInfo/FormalQuoteInfo"));
const ShareablePolicySuccessTravel = React.lazy(() => import("./components/ICARE/SharableLink/components/ShareableLinkTravel/SuccessQuotation/policySuccessTravel"));
const ShareableTravelTechnicalControl = React.lazy(() => import("./components/ICARE/SharableLink/components/ShareableLinkTravel/SuccessQuotation/travelTechnicalControl"));

const ShareableTravelGetPaymentStatus = React.lazy(() => import("./components/ICARE/SharableLink/components/TravelGetPaymentStatus"));

const ShareableTravelGetPaymentStatusCypher = React.lazy(() => import("./components/ICARE/SharableLink/components/TravelGetPaymentStatusCypher"));

const ShareableTravelCypherPayment = React.lazy(() => import("./components/ICARE/SharableLink/components/PaymentCypher/TravelCypher/TravelCypherPaymentSuccess"));
const ShareablePaymentFailed = React.lazy(() => import("./components/ICARE/SharableLink/components/ShareableLinkTravel/SuccessQuotation/PaymentFailedTravel"));
const ShareablePaymentSuccessTravelDone = React.lazy(() => import("./components/ICARE/SharableLink/components/ShareableLinkTravel/SuccessQuotation/PaymentSuccessTravel"));

// ============= bulk issuance history ==============
const BulkIssuanceHistory = React.lazy(() => import("./components/ICARE/BulkUploadHistory/BulkUploadHistory"));
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const AuthorizationTokenError = React.lazy(() => import("./components/ICARE/SharableLink/AuthorizationFailedPage/AuthorizationFailedPage"));

const performanceDashboard = React.lazy(() => import("./components/ICARE/DashBoard/performanceDashboard.js"));
const channelPartnerRecruitment = React.lazy(()=>import("./components/channelPartnerRecruitment/channelPartnerRecruitment"))
function App() {
  // const dispatch = useDispatch();
  // dispatch(actions.pwaOfflineFlag({ name: false }));

  return (
    <React.Suspense fallback={<FullPageLoader fromapploader={true} />}>
      <Router>
        <div className="box-size">
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/forgotpassword" component={ForgotPassword}></Route>
            <Route path="/changepassword" component={ChangePassword}></Route>
            {/* <Route path="/himanshu" component={AgentMicroService}></Route> */}
            <Route path="/profile" component={AgentMicroService}></Route>
            <Route path="/blog" component={Blog}></Route>
            {/* <Route path="/Master/:masterType" component={Master}></Route> */}
            <Route path="/risk-inspection/:id/:type" component={riskInspection} />
            <Route path="/risk-inspection-success/:id/:type" component={riskInspectionSuccess} />
            <Route path="/inspection-file-upload/:id/:type" component={inspectionFileUpload} />
            <Route path="/document-already-uploaded/:id/:type" component={DocumentAlreadyUploaded} />
            {/* SEND TO CUSTOMER POLICY LIST TRAVEL, CTPL, MOTOR LINK START HERE  */}
            <Route path="/ctpl-cypher-payment" component={CTPLCypherPayment} />
            <Route path="/ctpl-payment-return-url-cyphyer" component={CTPLGetPaymentStatusCypher} />
            <Route path="/travel-cypher-payment" component={TravelCypherPayment} />
            <Route path="/travel-payment-return-url-cyphyer" component={TravelGetPaymentStatusCypher} />
            <Route path="/motor-cypher-payment" component={MotorCypherPayment} />
            <Route path="/motor-payment-return-url-cyphyer" component={MotorGetPaymentStatusCypher} />
            {/* success -- failed  */}
            <Route path="/travel-payment-success-cypher" component={PaymentSuccessTravelDoneCypher} />
            <Route path="/travel-payment-failed-cypher" component={PaymentFailedTravelCypher} />
            <Route path="/ctpl-payment-success-cypher" component={PaymentSuccessCTPLDoneCypher} />
            <Route path="/ctpl-payment-failed-cypher" component={PaymentFailedCTPLCypher} />
            <Route path="/motor-payment-success-cypher" component={PaymentSuccessMotorDoneCypher} />
            <Route path="/motor-payment-failed-cypher" component={PaymentFailedMotorCypher} />
            {/* Customer sharbale link payment start */}
            <Route path="/customer-policyholder" component={motorCustomerPolicyHolder} />
            {/* <Route
          path="/test"
          component={HypervergeTest}
        /> */}
            <Route path="/customer-motor-convert-policy" component={CustomerMotorSuccessQuotation} />
            <Route path="/customer-motor-technical-control" component={CustomerTechnicalControlForMotor} />
            <Route path="/customer-listing" component={customerListingPage} />
            <Route path="/customer-alternate-policyholder" component={motorCustomerAlternatePolicyHolder} />
            <Route path="/customer-motor-confirm-page" component={motorCustomerConfirmPage} />
            <Route path="/customer-formal-technical-control" component={motorCustomerFormalTechnicalControl} />
            <Route path="/customer-motor-policy-technical-control" component={motorCustomerPolicyTechnicalControl} />
            <Route path="/customer-motor-payment-pay-now" component={CustomermotorPolicyPaymentPage} />
            <Route path="/customer-motor-policy-customer-pay" component={customermotorPolicyCustomerPayPage} />
            <Route path="/customer-motor-payment-success" component={CustomermotorPolicySuccessPage} />
            <Route path="/customer-motor-payment-failed" component={CustomermotorPolicyFailedPage} />
            <Route path="/customer-motor-policy-customer-pay" component={customermotorPolicyCustomerPayPage} />
            <Route path="/customer-motor-payment-return-url" component={CustomerMotorGetPaymentStatus} />
            {/* this is for the motore  */}
            {/* Shareable link for travel */}
            <Route path="/customer/quote-code" component={SharableLinkQuoteCode} />
            {/* <Route path="/customer/travel-quotation-failed" 
            component={ShareableTravelQuotePending} /> */}
            <Route path="/customer/travel-info" component={ShareableLinkTravelInfo} />
            <Route path="/customer/travel-policygroup" component={ShareableTravelPolicyGroup} />
            <Route path="/customer/travel-quotation-failed" component={ShareableTravelQuotePending} />
            <Route path="/customer/travel-policy-holder" component={ShareableTravelPage} />
            <Route path="/customer/customer-detail" component={ShareableCustomerDetail} />
            <Route path="/customer/travel/success" component={SharableSuccessQuotation} />
            <Route path="/customer/customer-info" component={ShareableCustomerInformation} />
            <Route path="/customer/traveler-details" component={ShareableTravelerDetials} />
            <Route path="/customer/formal-quote-info" component={ShareableFormalQuoteInfo} />
            <Route path="/customer/travel-policy-sucess" component={ShareablePolicySuccessTravel} />
            <Route path="/customer/travel-technical-control" component={ShareableTravelTechnicalControl} />
            <Route path="/customer/travel-cypher-payment" component={ShareableTravelCypherPayment} />
            <Route path="/customer/travel-payment-return-url-cyphyer" component={ShareableTravelGetPaymentStatusCypher} />
            <Route path="/customer/travel-payment-return-url" component={ShareableTravelGetPaymentStatus} />
            <Route path="/customer/travel-payment-success" component={ShareablePaymentSuccessTravelDone} />
            <Route path="/customer/travel-payment-failed" component={ShareablePaymentFailed} />
            {/* Shareable link for travel */}
            <Route path="/quotation-policy-tabs" component={quoationPolicyTab} />
            <Route path="/customerr-policy-detail" component={CustomerPolicyHolder1} />
            <Route path="/customer-vehical-info" component={CustomerVehicalInformationPage1} />
            <Route path="/customer-vehicle-information" component={CustomerVehicalInformation} />
            <Route path="/customer-policy-group" component={CustomerPolicyGroup} />
            <Route path="/customer-sharableLink-information" component={SharableLinkCustomerInformation} />
            <Route path="/customer-confirm-details" component={CustomerConfirmPage} />
            <Route path="/customer-CTPL/success" component={CustomerCTPLSuccessQuotation} />
            <Route path="/customer-quotation-pending" component={CustomerQuotationPending} />
            <Route path="/customer-CTPL-policy-sucess" component={CustomerPolicySuccessCTPL} />
            <Route path="/customer-CTPL-technical-control" component={CustomerTechnicalControlForCTPL} />
            <Route path="/customer-CTPL-payment-failed" component={CustomerPaymentFailedCTPL} />
            <Route path="/customer-CTPL-payment-success" component={CustomerPaymentSuccessCTPL} />
            <Route path="/customer-ctpl-payment-return-url" component={CustomerGetPaymentStatus} />
            <Route path="/customer-ctpl-coca" component={CustomerCtplCoca} />
            <Route path="/customer-login" component={SharableLogin} />
            <Route path="/session-expire" component={AuthorizationTokenError} />
            {/* Customer sharbale link payment End */}
            {/* Agent LoginResigstration  start */}
            <Route path="/agent-login" component={AgentLogin} />
            {/* Agent LoginResigstration  end */}
            {/* Agent Form Resgistration start   */}
            <Route path="/agent-form" component={AgentForm} />
            <Route path="/agent-login-new" component={AgentBrokerLogin}></Route>
            <Route path="/welcome" component={Welcome}></Route>
            <Route path="/agent/:tabKey" component={AgentMainApp} />
            <Route exact path="/agent" render={() => <Redirect to="/agent/personalDetails" />} />
            <Route path="/broker/:tabKey" component={BrokerMainApp} />
            <Route exact path="/broker" render={() => <Redirect to="/broker/personalDetails" />} />
            <Route path="/agent-resigstration" component={NewRegister} /> {/*yes*/}
            {/* Agent Form Resgistration end   */}
            {/* Create account start   */}
            <Route path="/create-account" component={CreateAccount} /> {/*yes*/}
            {/* Create account end   */}
            {/* SEND TO CUSTOMER POLICY LIST TRAVEL, CTPL, MOTOR LINK END HERE  */}
            {/* Application status start */}
            <Route path="/application-status" component={ApplicationStatus} />
            <Route path="/verify-details" component={VerifyDetails} />
            <Route path="/success-profile" component={successProfile} />
            {/* Application status end */}
            <div>
              {/* Make this route at the end only. */}
              <Route path="/agentMicrosite" component={AgentMicroService}></Route>
              <div>
                <Sidebar />
                <div style={{ marginTop: "60px" }}>
                  {/* <Route path="/clubsMaster" component={ClubsMaster}></Route>
                  <Route path="/birthday" component={Birthday}></Route>
                  <Route path="/home" component={HomePage}></Route> */}
                  <Route path="/rewardscorner/contests/completed" component={CompletedContest}></Route>
                  <Route path="/rewardscorner/contests/allcontest" component={AllContest} />
                  <Route path="/rewardscorner/contests/myoverallranking" component={MyOverallRanking} />
                  <Route path="/rewardscorner/contests/activecontest" component={ActiveContest} />
                  <Route path="/rewardscorner/contests/activecontestdetails" component={ActiveContestDetails} />
                  <Route path="/calendar" component={Calendar1} /> {/*yes*/}
                  <Route path="/calendar/create-event" component={Calendar} />
                  <Route path="/create-event-mobile" component={CalendarMobile} />
                  <Route path="/learningcenter" component={ResourceCenter} /> {/*yes*/}
                  <Route path="/todo" component={TodoMobile} /> {/*yes*/}
                  <Route path="/kpi-dashboard" component={KpiDashboard} />
                  <Route path="/daily-bussienss" component={DailyBussiness} /> {/*yes*/}
                  <Route path="/channel-partner-recruitment" component={channelPartnerRecruitment} />
                  <Route path="/motor-info" component={MotorComprehensive} /> {/*yes*/}
                  {/* <Route path="/all-products" component={AllProduct} /> */}
                  <Route path="/policy-detail" component={PolicyHolder1} />
                  <Route path="/quote-code" component={QuoteCode} />

                  <Route path="/channelPartnerMaster/:channelPartnerType" component={ChannelPartnerRecruitmentMaster} /> {/*yes*/}


                  <Route path="/performanceDasboard" component={performanceDashboard} />
                  <Route path="/performance" component={Performance} />
                  <Route path="/notifypage" component={NotifyPage} />
                  <Route path="/masterpresales/advisordetail/advisorpitch" component={AdvisorPitch}></Route> {/*yes*/}
                  <Route path="/master/benefitillustrator" component={BenefitIllustrator}></Route>
                  <Route path="/master/proposalfulfilment" component={ProposalFulfilment}></Route>
                  <Route path="/master/prepaymentreview" component={PrePaymentReview}></Route>
                  <Route path="/master/paymentoptions" component={PaymentOptions}></Route>
                  <Route path="/forcustomer" component={ForCustomer}></Route>
                  <Route path="/forself" component={ForSelf}></Route>
                  <Route path="/renewalreport" component={RenewalReport}></Route>
                  <Route path="/masterpresales/customerdetails/salespitch" component={SalesPitch}></Route> {/*yes*/}
                  <Route path="/resource-center" component={Resource}></Route>
                  <Route path="/servicecorner/all" component={ServiceCorner}></Route>
                  <Route path="/servicecorner/self" component={ServiceCornerSelf}></Route>
                  <Route path="/servicecorner/customers" component={ServiceCornerCustomers}></Route>
                  <Route path="/renewalMaster/allRenewals" component={Renewals} />
                  <Route path="/renewalMaster/all" component={RenewalAll} />
                  <Route path="/renewalMaster/paidRenewals" component={RenewalPaid} />
                  <Route path="/renewalMaster/unpaidRenewals" component={RenewalUnPaid} />
                  <Route path="/renewalMaster/lapsedRenewals" component={RenewalLapsed} />
                  <Route path="/renewalMaster/Details" component={RenewalMasterDetails} />
                  <Route path="/salespendency" component={SalesPendency}></Route>
                  <Route path="/existingpartner" component={ExistingPartner} />
                  <Route path="/existingpartnerdetails" component={ExistingPartnerDetails} />
                  <Route path="/mappedbranches" component={MappedBranches}></Route>
                  <Route path="/master/uploaddocuments" component={UploadDocuments}></Route>
                  <Route path="/master/proposalhistory" component={ProposalHistory}></Route>
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/createtask" component={CreateTask} />
                  <Route path="/createnewtask" component={CreateNewTask} />
                  <Route path="/leadMaster/:leadType" component={LeadMaster}></Route> {/*yes*/}
                  {/* QuotationsPoliciesMaster and customerListingMaster master */}
                  <Route path="/quotationsPoliciesMaster/:quotationsType" component={QuotationsPoliciesMaster} />
                  <Route path="/all-motor-details" component={AllmotorDetails} />
                  <Route path="/all-ctpl-details" component={AllctplDetails} />
                  <Route path="/all-travel-details" component={AlltravelDetails} />
                  <Route path="/all-motor-policy-details" component={AllmotorpolicyDetails} />
                  <Route path="/all-ctpl-policy-details" component={AllctplpolicyDetails} />
                  <Route path="/all-travel-policy-details" component={AlltravelpolicyDetails} />
                  <Route path="/all-quotation-details" component={AllQuotationDetails} />
                  <Route path="/advisormaster/:advisortype" component={AdvisorMaster}></Route>
                  <Route path="/multichannel" component={Multichannel}></Route>
                  <Route path="/defaultchannel" component={DefaultChannel}></Route>
                  <Route path="/team" component={MyTeams}></Route>
                  <Route path="/leadmasterpage/statuslead" component={StatusLead}></Route> {/*yes*/}
                  {/* <Route
                    path="/oona-leadmanagement"
                    component={oonaCard}
                  ></Route> */}
                  <Route path="/leadmasterpage/leaddetails/personallead" component={PersonalDetails}></Route> {/*yes*/}
                  <Route path="/leadmasterpage/leaddetails/contactlead" component={ContactDetails}></Route> {/*yes*/}
                  <Route path="/leadmasterpage/leaddetails/professionallead" component={ProfessionalDetails}></Route> {/*yes*/}
                  {/* <Route path="/leadmasterpage/leaddetails/existingLead" component={ExistingInsurance}></Route> */}
                  {/* <Route path="/leadmasterpage/leaddetails/productLead" component={ProposedProduct}></Route> */}
                  {/* <Route path="/leadmasterpage/proposal" component={ProposalDetails}></Route> */}
                  {/* <Route path="/leadmasterpage/leadmasterdoc/leaddoc" component={DocumentsUpload}></Route> */}
                  <Route path="/leadmasterpage/leadhistory" component={History}></Route> {/*yes*/}
                  <Route path="/advisorOnboarding/:type" component={AdvisorList}></Route>
                  <Route path="/hypervergesdk" component={sdkhyperverge}></Route>
                  <Route path="/PropsalFulfilment" component={ProposalFulfilment}></Route>
                  <Route path="/iCare-Dashboard" component={OonaDashboard} />
                  <Route path="/products" component={LoanProducts} /> {/*yes*/}
                  <Route path="/loginProfile" component={OonaLogin} /> {/*yes*/}
                  <Route path="/icare-notification" component={NotificationOona} /> {/*yes*/}
                </div>

                <div>
                  <BottomNavigation />
                  <OonaFooter />
                </div>
              </div>

              <Route path="/bulkaction" component={BulkAction} />
            </div>
          </Switch>
        </div>

        {/* New url and link rout start here*/}
        {/* <Route path="/product" component={ProductSelect}></Route> */}
        <Route path="/vehical-type" component={VehicalType} />
        <Route path="/policy-type" component={PolicyType} />
        <Route path="/vehicle-information" component={VehicalInformation} />
        <Route path="/travel-policy-holder" component={TravelPage} />
        <Route path="/travel-info" component={TravelInfo} />
        <Route path="/customer-detail" component={CustomerDetail} />

        {/* travel motor and ctpl success page START*/}
        <Route path="/travel/success" component={SuccessQuotation} />
        <Route path="/CTPL/success" component={CTPLSuccessQuotation} />
        <Route path="/travel-policy-sucess" component={PolicySuccessTravel} />
        <Route path="/CTPL-policy-sucess" component={PolicySuccessCTPL} />
        <Route path="/CTPL-payment-success" component={PaymentSuccessCTPLDone} />
        <Route path="/CTPL-payment-failed" component={PaymentFailedCTPL} />

        <Route path="/travel-payment-success" component={PaymentSuccessTravelDone} />

        {/* <Route
          path="/customer/shareable-link"
          component={ShareableLinkProfile}
        /> */}
        {/* Credit term Success */}
        <Route path="/travel-policy-customer-pay" component={PaymentCustomerPayTravelDone} />

        <Route path="/travel-payment-failed" component={PaymentFailed} />
        <Route path="/travel-quotation-failed" component={TravelQuotePending} />
        <Route path="/travel-technical-control" component={TravelTechnicalControl} />
        <Route path="/motor-coca" component={motorCoca} />
        <Route path="/ctpl-coca" component={CtplCoca} />
        <Route path="/travel-coca" component={TravelCoca} />

        <Route path="/CTPL-technical-control" component={TechnicalControlForCTPL} />
        <Route path="/quotation-pending" component={QuotationPending} />
        {/* travel motor and ctpl success page END*/}

        {/* Payment link send to customer page start here */}

        <Route path="/travel-customer-payment-link" component={PaymentLinkCustomerSend} />
        <Route path="/motor-customer-payment-link" component={PaymentLinkCustomerSendMotor} />
        <Route path="/ctpl-customer-payment-link" component={PaymentLinkCustomerSendCTPL} />
        <Route path="/links" component={Links} />

        {/* Payment link send to customer page end here */}

        {/* this is for the motor technical control, pending quotation, success and policy quote start*/}
        <Route path="/motor-technical-control" component={TechnicalControlForMotor} />

        <Route path="/formal-technical-control" component={FormalTechnicalControlForMotor} />
        <Route path="/motor-convert-policy" component={MotorSuccessQuotation} />
        <Route path="/motor-quotation-pending" component={motorQuotationPending} />
        <Route path="/risk-inspection-required" component={RiskInspectionRequiredMotor} />

        <Route path="/motor-payment-pay-now" component={motorPolicyPaymentPage} />
        {/* customer payment */}

        <Route path="/motor-policy-customer-pay" component={motorPolicyCustomerPayPage} />

        <Route path="/motor-policy-technical-control" component={motorPolicyTechnicalControl} />
        <Route path="/motor-payment-success" component={motorPolicySuccessPage} />

        <Route path="/motor-payment-failed" component={motorPolicyFailedPage} />

        {/* this is for the motor technical control, pending quotation, success and policy quote start*/}

        {/* ALL ---------- MOTOR PAGE ROUTING START HERE ----------- */}
        <Route path="/price-check-info" component={PriceCheck1} />
        <Route path="/policy-group-info" component={PolicyGroupDetails} />
        <Route path="/motor-bulk" component={MotorBulkUpload} />

        <Route path="/vehicle-information-info" component={VehicleInformationInfo} />
        <Route path="/vehicle-Quote-info" component={vehicleQuote} />
        <Route path="/accessory-Quote-info" component={accessoryQuote} />
        <Route path="/coverage-Quote-info" component={coverageQuote} />
        <Route path="/policyholder-Quote-info" component={policyHolderQuote} />
        <Route path="/Quote-info" component={quoteInformation} />
        <Route path="/success-Quote-info" component={QuotationSuccess} />
        <Route path="/policyholder" component={PolicyHolder} />
        <Route path="/alternate-policyholder" component={AlternatePolicyHolder} />
        <Route path="/motor-confirm-page" component={MotorConfirmPage} />
        {/* ALL ---------- MOTOR PAGE ROUTING END HERE ----------- */}

        {/* routing for the customer start from here for the motoshare */}

        {/* routing for the customer end==> from here for the motoshare */}

        {/* PAYMENT RETURN URL MOTOR, CTPL, TRAVEL*/}
        <Route path="/ctpl-payment-return-url" component={GetPaymentStatus} />
        <Route path="/travel-payment-return-url" component={TravelGetPaymentStatus} />

        <Route path="/motor-payment-return-url" component={MotorGetPaymentStatus} />

        {/* ALL ---------- ALL OTHER DASHBORD CARD CTPL PAGE ROUTING START HERE ----------- */}
        <Route path="/all-products" component={AllProduct} />
        <Route path="/customer-info" component={CustomerInformations} />
        <Route path="/customer-information" component={CustomerInformation} />

        {/* <Route path="/success" component={Success} /> */}
        <Route path="/technical-control" component={TechnicalControl} />
        <Route path="/error" component={Fail} />
        <Route path="/confirm-details" component={ConfirmPage} />
        <Route path="/help-desk" component={HelpCenter} />
        <Route path="/vehical-info" component={VehicalInformationPage1} />
        <Route path="/policy-group" component={PolicyGroup} />
        <Route path="/ctpl-bulk-upload" component={BulkUpload} />
        <Route path="/motor-bulk-upload" component={BulkUploadMotor} />

        {/* Bulk Upload Fine start here  */}

        <Route path="/ctpl-bulk-upload-success" component={CtplBulkUploadSuccess} />

        <Route path="/ctpl-bulk-upload-error" component={CtplBulkUploadError} />
        <Route path="/travel-bulk-upload-success" component={TravelBulkUploadSuccess} />
        <Route path="/travel-bulk-upload-error" component={TravelBulkUploadError} />
        <Route path="/motor-bulk-upload-success" component={MotorBulkUploadSuccess} />
        <Route path="/motor-bulk-upload-error" component={MotorBulkUploadError} />
        {/* Bulk Upload Fine End here  */}
        <Route path="/formal-quote-info" component={FormalQuoteInfo} />
        <Route path="/quickpolicy-information" component={QuotePolicyInformation} />
        <Route path="/quick-quote-info" component={QuickQuoteInfo} />
        <Route path="/success-quickpolicy" component={SuccessQuickPolicy} />
        <Route path="/customer-details" component={OonaCustomerListing} />
        {/* this is for the customer_motor  */}

        <Route path="/customer-card-details" component={CustomerList} />
        <Route path="/traveler-details" component={TravelerDetials} />
        {/* ALL ---------- ALL OTHER DASHBORD CARD CTPL PAGE ROUTING START HERE ----------- */}

        {/* ootb  */}

        <Route path="/travel-bulkUpload" component={TravelBulkUpload} />
        <Route path="/travel-policygroup" component={TravelPolicyGroup} />

        {/* coc authentication failed */}
        {/* <Route path="/travel-coc-failed" component={CocPaymentFailedTravel} />
     <Route path="/ctpl-coc-failed" component={CocPaymentFailedCtpl} />
     <Route path="/motor-coc-failed" component={CocPaymentFailedMotor} /> */}

        {/* bulkupload history start */}
        <Route path="/bulk-issuance-history" component={BulkIssuanceHistory} />

        {/* bulkupload history end */}

        {/* shareablelogin */}
        {/* <Route path="/customer-login" component={SharableLogin} /> */}
        <Route path="/otp-verification" component={MobileLogin} />
        <Route path="/policy" component={PolicyPage} />

        {/* Bulk History Details Table routing*/}
        <Route path="/bulk-history-details" component={bulkHistoryDetails} />
      </Router>
    </React.Suspense>
  );
}

export default App;
