import React, { useState, useEffect, createRef } from "react";
import useInput from "../hooks/use-input";
import _ from "lodash";
import { checkAgent, milToDateString } from "../../helpers";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import axiosRequest from "../../axios-request/request.methods";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./StatusLead.css";
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Select,
  Cascader,
  DatePicker,
  Space,
  Modal,
  Table,
  TimePicker,
  Spin,
  Drawer,
  message,
} from "antd";
import {
  ArrowRightOutlined,
  FileTextOutlined,
  EditOutlined,
  PhoneOutlined,
  SaveOutlined,
  DeleteOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import Tabs from "../../components/Tab/Tab";
import FloatButton from "../FloatButton/FloatButton";
import { msToDateString, stoageGetter } from "../../helpers";

const minimumDate = moment().format("MM-DD-YYYY");
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

var leadStatusType = "";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isNumberValid = (value) => value.trim() !== "" && value.length === 10;

const NewLead = React.memo((props) => {
  

  const leadTypeOptionsSales = [
    {
      label: "Sales",
      value: "Sales",
    },
    {
      label: "Individual",
      value: "Individual",
    },
    {
      label: "Group",
      value: "Group",
    },
  ];

  
  const leadPropensityOptions = [
    {
      label: "Very interested",
      value: "Very interested",
    },
    {
      label: "Somewhat interested",
      value: "Somewhat interested",
    },
    {
      label: "Not interested",
      value: "Not interested",
    },
    {
      label: "Closed Sale",
      value: "Closed Sale",
    },
  ];

  const appointmentTimeOptions = [
    { label: "8:00 AM", value: "28800000" },
    { label: "8:30 AM", value: "30600000" },
    {
      label: "9:00 AM",
      value: "32400000",
    },
    {
      label: "9:30 AM",
      value: "34200000",
    },
    {
      label: "10:00 AM",
      value: "36000000",
    },
    {
      label: "10:30 AM",
      value: "37800000",
    },
    {
      label: "11:00 AM",
      value: "39600000",
    },
    {
      label: "11:30 AM",
      value: "41400000",
    },
    {
      label: "12:00 PM",
      value: "43200000",
    },
    {
      label: "12:30 PM",
      value: "45000000",
    },
    {
      label: "1:00 PM",
      value: "46800000",
    },
    {
      label: "1:30 PM",
      value: "48600000",
    },
    {
      value: "50400000",
      label: "2:00 PM",
    },
    {
      label: "2:30 PM",
      value: "52200000",
    },
    {
      label: "3:00 PM",
      value: "54000000",
    },
    {
      label: "3:30 PM",
      value: "55800000",
    },
    {
      label: "4:00 PM",
      value: "57600000",
    },
    {
      label: "4:30 PM",
      value: "59400000",
    },
    {
      label: "5:00 PM",
      value: "61200000",
    },
    {
      label: "5:30 PM",
      value: "63000000",
    },
    {
      label: "6:00 PM",
      value: "64800000",
    },
    {
      label: "6:30 PM",
      value: "66600000",
    },
    {
      label: "7:00 PM",
      value: "68400000",
    },
    {
      label: "7:30 PM",
      value: "70200000",
    },
    {
      label: "8:00 PM",
      value: "72000000",
    },
    {
      label: "8:30 PM",
      value: "73800000",
    },
    {
      label: "9:00 PM",
      value: "75600000",
    },
  ];

  const teamTableHeader = [
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Team Member's",
      dataIndex: "teamMember",
      key: "teamMember",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <DeleteOutlined onClick={() => deleteTableRow(record)} />
      ),
    },
  ];

  let formRef = createRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  let _leadID = useSelector((state) => state.leads.currentUpdatingID);

  //const userId1 = useSelector((state) => state?.login?.user?.designation);

  const [opRoleName, setOpRoleName] = useState(false);
  const [opRoleName_AG, setOpRoleName_AG] = useState(false);
  var roleName = useSelector(
    (state) => state?.login?.user?.userRole[0]?.roleName
  );
  const login_user_data = stoageGetter("user");
  let reporters_restrict = login_user_data.userRole[0].roleName;
  const employee_code = useSelector(
    (state) => state?.login?.hierarchy?.channelCode?.channelCode
  );
  

  const tabMenu = [
    {
      id: 1,
      value: "Status",
    },
    {
      id: 2,
      value: "Lead Details",
    },
    {
      id: 3,
      value: "History",
    },
  ];

  const tabMenu2 = [
    {
      id: 1,
      value: "Status",
    },
    {
      id: 2,
      value: "Lead Details",
    },
  ];

  useEffect(() => {

    if (_leadID && _leadID !== "") {
      getLeadDetails(_leadID);
      setIsNewLead(false);
      setIsDisabled(true);
    } else {
      setIsNewLead(true);
      setIsDisabled(false);
    }
    if (roleName === "Officer Param" || roleName === "Officer Prahri") {
      setOpRoleName(true);
    }
    if (employee_code === "CH3") {
      setOpRoleName_AG(true);
    }

    dispatch(actions.fetchAllState());
    dispatch(actions.fetchAllCities(code));
  }, [dispatch]);

  const id = useSelector((state) => state.login.user.id);
  
  const channelCode = useSelector((state) => state?.login?.user?.channelCode);
  const states = useSelector((state) => state?.address?.states);
  const statesNew = useSelector((state) => state?.address?.states?.name);

  if (states !== undefined && !statesNew && Object.keys(states).length !== 0) {
    if (Array.isArray(states)) {
      states.sort((a, b) => {
        const stateName1 = a.provinceName?.toUpperCase() || '';
        const stateName2 = b.provinceName?.toUpperCase() || '';
        if (stateName1 < stateName2) {
          return -1;
        }
        if (stateName1 > stateName2) {
          return 1;
        }
        return 0; // Added return 0 for equal values
      });
    }
  }



  // store form data
  let storeFormData = useSelector((state) => state?.newLead?.formData);

  let allocateStore = useSelector(
    (state) => state?.leads?.allLeads[0]?.allocTo
  );

  let line1 = "";
  let line2 = "";
  let line3 = "";
  const address = storeFormData?.address[0];
  if (address !== undefined) {
    line1 = address.line1;
    line2 = address.line2;
    line3 = address.line3;
  }

  const userTreeData = useSelector((state) => state?.home?.user_tree);
  delete storeFormData["appointmentId"];
  delete storeFormData["appointmentDate"];

  let leadDataLoading = useSelector((state) => state.newLead.leadDataloading);
  let storeLeadId = useSelector((state) => state.newLead.leadId);


  // lead summary
  const storeleadIdValue = useSelector(
    (state) => state?.newLead?.formData?.lead_Id
  );

  const state_data = useSelector((state) => state?.leads?.allLeads[0]?.lead_Id);
  const storeleadPropencity = useSelector(
    (state) => state?.newLead?.formData?.leadPropensity
  );

 
  let storefirstNameValue = useSelector(
    (state) => state.newLead.formData.firstName
  );
  let storelastNameValue = useSelector(
    (state) => state.newLead.formData.lastName
  );
  let storeRemarkfromsource = useSelector(
    (state) => state?.newLead?.formData?.remarksfromSource
  );
  let storeRemarkfromuser = useSelector(
    (state) => state?.newLead?.formData?.remarksfromUser
  );

  const storeLandLine = useSelector(
    (state) => state.newLead.formData.landlineNo
  );

  let worksiteId1 = useSelector(
    (state) => state?.newLead?.formData?.workSiteEventId
  );

  let UnitNameWorksite = useSelector(
    (state) => state?.newLead?.formData?.workSiteEventId?.eventHeldUnitName
  );

  let storeEmailValue = useSelector((state) => state.newLead.formData.email);

  let storePrimaryMobileValue = useSelector(
    (state) => state.newLead.formData.primaryMobile
  );

  let storSource = useSelector(
    (state) => state?.newLead?.formData?.leadSource?.name
  );

  //let storeStateValue = useSelector((state) => state.newLead.formData.state);

  let storeCityValue = useSelector((state) => state?.newLead?.formData?.city);
  let storeLeadType = useSelector((state) => state?.newLead?.formData?.leadType);
  let storePrimaryNo = useSelector((state) => state?.newLead?.formData?.primaryMobile);
  let storesubLeadDisposition = useSelector((state) => state?.newLead?.formData?.leadsubDisposition);
  let storeLeadDisposition = useSelector((state) => state?.newLead?.formData?.leadDisposition);
  // let storeCode = useSelector((state) => state.newLead.formData.state);

  // responsive styling hook
  const [maxMobileLength, setMaxMobileLength] = useState(12);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  const [firstName, setFirstName] = useState("");
  const [code, setCode] = useState("");
  const [cityProvince2, setCityProvince2] = useState();
  const [stateProvince2, setStateProvince2] = useState();

  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [primaryNo, setPrimaryNo] = useState(storePrimaryNo ? storePrimaryNo : "");
  const [landlineNo, setLandlineNo] = useState(storeLandLine ? storeLandLine : "");

  const [mobileNoValid, setmobileNoValid] = useState("");
  const [leadPropensity, setLeadPropensity] = useState(null);
  const [leadStatus, setLeadStatus] = useState("");
  const [leadDisposition, setLeadDisposition] = useState("");
  const [leadSubDisposition, setLeadSubDisposition] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  // const [stateSummary, setStateSummary] = useState("");
  let stateSummary = useSelector((state) => state?.newLead?.formData?.state);

  let cities = useSelector((state) => state?.address?.cities);
  const [reminder, setReminder] = useState();
  const [appointmentDate, setAppointmentDate] = useState("");
  // moment(start_date)
  const [appointmentDatePost, setAppointmentDatePost] = useState();
  const [allDatePost, setAllDatePost] = useState();
  const [appointmentTime, setAppointmentTime] = useState("");
  // parseInt(start_time)
  const [remarkFromSource, setRemarkFromSource] = useState("");

  const [aaf, setAff] = useState("");
  const [proposalFormNumber, setProposalFormNumber] = useState("");
  const [remarkFromUser, setRemarkFromUser] = useState("");
  const [leadType, setLeadType] = useState(null);

  const [stateProvince, setStateProvince] = useState(null);
  const [stateProvinceName, setStateProvinceName] = useState("");
  const [cityProvince, setCityProvince] = useState(null);
  const [cityProvinceName, setCityProvinceName] = useState("");
  const [isNewLead, setIsNewLead] = useState(false);

  const [hierarAgentList, setHierarAgentList] = useState([]);
  const [desigDataOwner, setDesigDataOwner] = useState("");
  const [teamDataOwner, setTeamDataOwner] = useState("");
  const [addTeamMemAPIStruct, setAddTeamMemAPIStruct] = useState([]);
  const [desigData, setDesigData] = useState("");
  const [teamMemberList, setTeamMemberList] = useState([]);
  const [teamData, setTeamData] = useState("");
  const [addTeamMemb, setAddTeamMemb] = useState([]);
  const [teamTableData, setTeamTableData] = useState([]);
  const [leadOwner, setLeadOwner] = useState("");
  const [leadIdData, setLeadIdData] = useState("");
  const [teamDesig, setTeamDesig] = useState(null);
  const [hierarAgentListOwner, setHierarAgentListOwner] = useState([]);
  const [teamMemberListOwner, setTeamMemberListOwner] = useState([]);
  const [ownerArray, setOwnerArray] = useState([]);

  const [workSiteEventId, setWorkSiteEvent] = useState("");
  const [changeCity, setChangeCity] = useState(true);

  const capitalizeFirst = (firstNameSummary, lastNameSummary) => {
    const firstNameData =
      firstNameSummary.charAt(0).toUpperCase() + firstNameSummary.slice(1);
    const lastNameData =
      lastNameSummary.charAt(0).toUpperCase() + lastNameSummary.slice(1);
    const fullNameData = firstNameData + " " + lastNameData;
    return fullNameData;
  };
  //   summmyruy ===== ///
  const [firstNameSummary, setFirstNameSummary] = useState("");
  const [lastNameSummary, setLastNameSummary] = useState("");
  const [create_dateSummary, setCreate_dateSummary] = useState("");
  const [leadIDSummary, setLeadIDSummary] = useState("");
  const [leadSourceName, setLeadSourceName] = useState("");

  //  Drower -------------  OTP ------------------  ??

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    setFirstName(storefirstNameValue);
    setLastName(storelastNameValue);
    setLeadType(storeLeadType);
    setLeadPropensity(storeleadPropencity);
    setPrimaryNo(storePrimaryNo);
    setLandlineNo(storeLandLine);
    setRemarkFromSource(storeRemarkfromsource);
    setRemarkFromUser(storeRemarkfromuser);
  }, [
    storeleadIdValue,
    storelastNameValue,
    storefirstNameValue,
    storeLeadType,
    storeleadPropencity,
    storePrimaryNo,
    storeLandLine,
    storeRemarkfromsource,
    storeRemarkfromuser,
  ]);

  useEffect(() => {
    // if(userTreeData.length > 0){
    userTreeData?.reporting_hierarchies?.forEach((el) => {
      el.label = el.dispValue;
    });
    userTreeData?.reporting_users?.forEach((el) => {
      el.label = el.full_name;
      el.value = el._id;
    });
    setHierarAgentList(userTreeData?.reporting_hierarchies);
    setHierarAgentListOwner(userTreeData?.reporting_hierarchies);

    primaryNo.length === 10 ? setmobileNoValid(true) : setmobileNoValid(false);
  }, []);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  const getLeadDetails = async (lead_id) => {
    try {
      let result = await axiosRequest.get(`user/getlead_details/${lead_id}`, {
        secure: true,
      });
      if (result.data.length > 0) {
        dispatch(actions.fetchLeadDetailsSuccess(result.data[0]));
        if (result.data.length > 1) {
          let combined = {
            ...result.data[0],
            appointmentDetails: {
              ...result.data[1],
            },
          };

          loadValuesToFields(combined);
        } else {
          loadValuesToFields({ ...result.data[0], appointmentDetails: null });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadValuesToFields = (leadData) => {
    let _appntDate = "";
    let _appntTime = "";
    let newDate = "";

    if (leadData.appointmentDetails) {
      newDate = moment(leadData.appointmentDetails.start_date).valueOf();
      _appntDate = moment(leadData.appointmentDetails.start_date);
      _appntTime = leadData.appointmentDetails.start_time.toString();
      setAppointmentDate(moment(leadData.appointmentDetails.start_date));
      setAppointmentDatePost(newDate);
      setAppointmentTime(_appntTime);
    }


    let _data = {};
    if (leadData.hasOwnProperty("teamMembers")) {
      let _teamData = JSON.parse(leadData?.teamMembers);
      setAddTeamMemAPIStruct(_teamData);
      if (checkAgent() === false) {
        let _arryy = _teamData.map((el) => {
          userTreeData?.reporting_users?.filter((event) => {
            if (event._id === el.Id) {
              _data = {
                designation: event.hierarchyName,
                teamName: event.full_name,
                teamMem_id: event._id,
              };
            }
          });
          return _data;
        });
        let _finalData =
          _arryy.length > 0
            ? Object.keys(_arryy[0]).length > 0
              ? _arryy
              : []
            : [];
        setAddTeamMemb(_finalData);
        setTeamTableData(_finalData);
      }
    }

    // ==============  //
    setFirstNameSummary(leadData?.firstName);
    setLastNameSummary(leadData?.lastName);
    setCreate_dateSummary(leadData?.created_date);
    setLeadIDSummary(leadData?.lead_Id);
    setLeadSourceName(leadData?.leadSource?.name);
    setLeadStatus(leadData?.leadStatus);
    setLeadDisposition(leadData?.leadDisposition);
    setLeadSubDisposition(leadData?.leadsubDisposition);
    setFirstName(leadData?.firstName);
    setLastName(leadData?.lastName);
    setEmail(leadData?.email);
    setPrimaryNo(leadData?.primaryMobile);
    setLandlineNo(leadData?.landlineNo);
    setStateProvince(leadData?.state);
    setStateProvinceName(leadData?.state)
    setCityProvinceName(leadData?.city)
    setCityProvince(leadData?.city);
    setCityProvince2(leadData?.cityStateData.StateId);
    setStateProvince2(leadData?.cityStateData.CityID);
    setLeadType(leadData?.leadType ? leadData?.leadType : null);
    setLeadPropensity(leadData?.leadPropensity);
    setRemarkFromSource(leadData?.remarksfromSource);
    setAff(leadData?.aaf);
    setProposalFormNumber(leadData?.Client_ProposalId);
    setRemarkFromUser(leadData?.remarksfromUser);
    setWorkSiteEvent(leadData?.workSiteEventId?.eventHeldUnitName);

    form.setFieldsValue({
      firstname: leadData?.firstName,
      lastname: leadData?.lastName,
      email: leadData?.email,
      primaryNo: leadData?.primaryMobile,
      landline: leadData.landlineNo,
      state: leadData?.state,
      leadType: leadData?.leadType ? leadData?.leadType : null,
      leadPropensity: leadData?.leadPropensity,
      remarksfromsource: leadData?.remarksfromSource,
      aaf: leadData?.aaf,
      Client_ProposalId: leadData?.Client_ProposalId,
      remarksfromuser: leadData?.remarksfromUser,
      leadStatus: leadData?.leadStatus,
      leadDisposition: leadData?.leadDisposition,
      leadSubDisposition: leadData?.leadsubDisposition,
      appointmentDate: _appntDate,
      appointmentTime: _appntTime,
    });
  };

  // add team Member modal state control
  const [visibleTeamMemberModal, setVisibleTeamMemberModal] = useState(false);

  // change owner Member modal state control
  const [visibleChangeOwnerModel, setVisibleChangeOwnerModel] = useState(false);
  const [changeOwnerLoading, setChangeOwnerLoading] = useState(false);

  const leadOptions = [
    {
      value: "newleadentery",
      label: "New Lead Entry",
    },

    {
      value: "nocontact",
      label: "No Contact",
    },
    {
      value: "contact",
      label: "Contact",
    },
  ];

  const leadDispositionOptionNoContact = [
    {
      value: "notreachable",
      label: "Not reachable",
    },
    {
      value: "ringingbusy",
      label: "Ringing Busy",
    },
    {
      value: "wrongnumber",
      label: "Wrong number",
    },
    {
      value: "invalid",
      label: "Invalid Number",
    },
    {
      value: "switchoff",
      label: "Switched off",
    },
  ];

  const leadDispositionOptionContact = [
    { 
    value: "appointment", 
    label: "Appointment" 
    },
    {
      value: "callback",
      label: "Call back",
    },
    {
      value: "shorthangup",
      label: "Short Hang-up",
    },
    
    {
      value: "notinterested",
      label: "Not Interested",
    },
    
    {
      value: "noteligible",
      label: "Not eligible",
    },
    {
      value: "nonserviceable",
      label: "Non Serviceable",
    },

    {
      value: "converted",
      label: "Converted",
    },
    {
      value: "languagebarrier",
      label: "Language Barrier",
    },
    
    {
      value: "failed",
      label: "Failed",
    },
    
  ];

  const leadDispositionOptionContactLa = [
    { value: "bop", label: "BOP" },
    { value: "appointment", label: "Appointment" },
    {
      value: "callback",
      label: "Call back",
    },

   
    {
      value: "notinterested",
      label: "Not Interested",
    },

    {
      value: "noteligible",
      label: "Not eligible",
    }, 

    {
      value: "converted",
      label: "Converted",
    },

    {
      value: "training",
      label: "Training",
    },
    {
      value: "exam",
      label: "Exam",
    },
    {
      value: "coding",
      label: "Coding",
    },
  ];

  const leadDispositionOptionNotReach = [
    { label: "Not Reachable", value: "Not Reachable" },
  ];

  const leadDispositionOptionRing = [
    { label: "Ringing Busy", value: "Ringing Busy" },
  ];

  const leadDispositionOptionWrong = [
    { label: "Wrong Number", value: "Wrong Number" },
  ];

  const leadDispositionOptionInvalid = [
    { label: "Invalid Number", value: "Invalid Number" },
  ];

  const leadDispositionOptionSwitch = [
    { label: "Switched Off", value: "Switched Off" },
  ];

  const leadSubDispositionOption = [
    { label: "Appointment Confirmed", value: "Appointment Confirmed" },
    { label: "Moved to quotation", value: "Moved to quotation" },
  ];

  const leadSubDispositionOptionAppLa = [
    { label: "Appointment Confirmed", value: "Appointment Confirmed" },
  ];

  const leadSubDispositionOptionBop = [
    { label: "BOP Scheduling", value: "BOP Scheduling" },
    { label: "BOP Cancelled", value: "BOP Cancelled" },
    { label: "BOP Completed", value: "BOP Completed" },
  ];

  const leadSubDispositionOptionShorthangupLa = [
    { label: "Call back", value: "Call back" },
    {
      label: "Multiple attempts - Mark failed",
      value: "Multiple attempts - Mark failed",
    },
  ];

  const leadSubDispositionOptionCallbackLa = [
    {
      label: "Call Back Scheduled",
      value: "Call Back Scheduled",
    },
   
  ];

  const leadSubDispositionOptionNotInLa = [
    {
      label: "Not Interested before meeting",
      value: "Not Interested before meeting",
    },
    {
      label: "Financial Issues",
      value: "Financial Issues",
    },
    { label: "Already purchased", value: "Already purchased" },
    { label: "After Meeting - No Reason", value: "After Meeting - No Reason" },
    { label: "Service Issue by PLIL", value: "Service Issue by PLIL" },
    { label: "After Meeting - Expensive", value: "After Meeting - Expensive" },

    

  ];

  const leadSubDispositionOptionCallback = [
    // {
    //   label: "Call Back Scheduled",
    //   value: "Call Back Scheduled",
    // },
    {
      label: "Asked to Call back later",
      value: "Asked to Call back later",
    },
    {
      label: "Decision maker unavailable",
      value: "Decision maker unavailable",
    },
    {
      label: "Call back with presentation",
      value: "Call back with presentation",
    },
    {
      label: "Call back without presentation",
      value: "Call back without presentation",
    },
    {
      label: "Promise to pay",
      value: "Promise to pay",
    },
    {
      label: "Already paid to the partner or agent",
      value: "Already paid to the partner or agent",
    }, 
   
  ];
  const leadSubDispositionshort = [
    { label: "Call back", value: "Call back" },
    {
      label: "Multiple attempts - Mark failed",
      value: "Multiple attempts - Mark failed",
    },
  ];

  const leadSubDispositionNotIntersetd = [
    // {
    //   label: "Not Interested before meeting",
    //   value: "Not Interested before meeting",
    // },
    // {
    //   label: "Financial Issues",
    //   value: "Financial Issues",
    // },
    // { label: "Already purchased", value: "Already purchased" },
    // { label: "After Meeting - No Reason", value: "After Meeting - No Reason" },
    // { label: "Service Issue by PLIL", value: "Service Issue by PLIL" },
    // { label: "After Meeting - Expensive", value: "After Meeting - Expensive" },
    {
      label: "Not Interested before meeting",
      value: "Not Interested before meeting",
    },
    {
      label: "Service Issue",
      value: "Service Issue",
    },
    {
      label: "Never shown interest",
      value: "Never shown interest",
    },
    { label: "Already purchased", value: "Already purchased" },
    { label: "Enquire by Mistake", value: "Enquire by Mistake" },
    { label: "Not Interested", value: "Not Interested" },
    { label: "Price Not Affordable", value: "Price Not Affordable" },
    { label: "Product Not Available", value: "Product Not Available" },
  ];

  const leadSubDispositionNonSer = [
    { label: "Non Serviceable location", value: "Non Serviceable location" },
  ];

  const leadSubDispositionNonEli = [
    // { label: "Not Eligible - Age", value: "Not Eligible - Age" },
    // { label: "Not Eligible - Eductaion", value: "Not Eligible - Education" },
    // { label: "Not Eligible - Others", value: "Not Eligible - Others" },
    { label: "Not eligible - Age", value: "Not eligible - Age" },
    { label: "Not eligible - Income", value: "Not eligible - Income" },
    { label: "Not Eligible - Underage", value: "Not Eligible - Underage" },
    { label: "Not Eligible-Pre EX Condition", value: "Not Eligible-Pre EX Condition" },
    { label: "Not Eligible - Occupation", value: "Not Eligible - Occupation" },
    { label: "Not Eligible - High Risk (AML)", value: "Not Eligible - High Risk (AML)" },
    { label: "Not Eligible - Geographic Location", value: "Not Eligible - Geographic Location" },
    { label: "Not Eligible - Sanction List", value: "Not Eligible - Sanction List" },
    { label: "Not AML/TF Compliant", value: "Not AML/TF Compliant" },
    { label: "Not Eligible-Others", value: "Not Eligible-Others" },
  ];

  const leadSubDispositionNotService = [{ label: "Non Serviceable location", value: "Non Serviceable location" },];
  const leadSubDispositionFailed = [{ label: "Failed", value: "Failed" },];

  const leadSubDispositionNonEliLa = [
    { label: "Not Eligible - Age", value: "Not Eligible - Age" },
    { label: "Not Eligible - Eductaion", value: "Not Eligible - Education" },
    { label: "Not Eligible - Others", value: "Not Eligible - Others" },


  ];

  const leadSubDispositionLanBarOption = [
    { label: "Language Barrier", value: "Language Barrier" },
  ];

  const leadSubDispositionLanBarOptionLa = [
    { label: "Language Barrier", value: "Language Barrier" },
  ];

  const leadSubDispositionStopClouse = [
    { label: "Spot Closure", value: "Spot Closure" },
  ];
  const leadSubDispositionConvertedOpt = [
    { label: "Converted", value: "Converted" },
  ];

  const leadSubDispositionConvertedOptLa = [
    { label: "Converted", value: "Converted" },
  ];

  const leadSubDispositionOptionTraining = [
    { label: "Scheduled", value: "Scheduled" },
    { label: "Completed", value: "Completed" },
  ];

  const leadSubDispositionOptionExam = [
    { label: "No Show", value: "No Show" },
    { label: "Retake", value: "Retake" },
    { label: "Completed", value: "Completed" },
    { label: "Pass", value: "Pass" },
    { label: "Fail", value: "Fail" },
  ];

  const leadSubDispositionOptionCoding = [
    { label: "Date required", value: "Date required" },
  ];

  const leadSubDispositionFailedOption = [{ label: "Failed", value: "Failed" }];

  const leadSubDispositionFailedOptionLa = [
    { label: "Failed", value: "Failed" },
  ];

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const primaryNoHandler = (event) => {
    const inputValue = event.target.value;

    if (inputValue.startsWith('0')) {
      setMaxMobileLength(12);
    } else if (inputValue.startsWith('9')) {
      setMaxMobileLength(12);
    }
    setPrimaryNo(event.target.value);
  };
  const emailAddressHandler = (event) => {
    setEmail(event.target.value);
  };

  let stateOptions = [];

  if (states && !_.isEmpty(states)) {
    // Check if states is an array, if not convert it to array
    const statesArray = Array.isArray(states) ? states : Object.values(states);
    
    stateOptions = statesArray.map((state) => {
      const label = state.provinceName;
      const value = state.provinceCode;
      const key = state.provinceCode;
      return { ...state, label, value, key };
    });
  
    // Sort the states alphabetically
    stateOptions.sort((a, b) => {
      const stateName1 = a.provinceName?.toUpperCase() || '';
      const stateName2 = b.provinceName?.toUpperCase() || '';
      if (stateName1 < stateName2) return -1;
      if (stateName1 > stateName2) return 1;
      return 0;
    });
  }

// Or if you want to keep the null fallback:
let citiesOptions = cities && !statesNew && Array.isArray(cities) 
  ? cities.map((city) => ({
      label: city.Municipality_name,
      value: city.Municipality_code,
      key: city.Municipality_code,
      ...city
    }))
  : [];
  
  const getDisabledHours = () => {
    var hours = [];
    for (var i = 0; i < moment().hour(); i++) {
      hours.push(i);
    }
    return hours;
  };

  const getDisabledMinutes = (selectedHour) => {
    var minutes = [];
    if (selectedHour === moment().hour()) {
      for (var i = 0; i < moment().minute(); i++) {
        minutes.push(i);
      }
    }
    return minutes;
  };

  
  const handleAddMember = () => {
    // setModalText('Updating changes ');
    visibleTeamMemberModal && dispatch(actions.fetchTeamMember(channelCode));
  };

  const landlineNoHandler = (event) => {
    setLandlineNo(event.target.value);
  };
  

  const showChangeOwnerModal = () => {
    setDesigDataOwner("");
    setTeamDataOwner("");
    form.setFieldsValue({
      "Select Owner Designation": "",
      "Select Owner Team Member": "",
    });
    setVisibleChangeOwnerModel(true);
  };

  const handleDesignationDataOwner = (event, data) => {
    setDesigDataOwner(event);
    setTeamDataOwner("");
    form.setFieldsValue({
      "Select Owner Team Member": "",
    });

    let _teamData = userTreeData?.reporting_users?.filter(
      (el) => el.hierarchy_id === event
    );
    setTeamMemberListOwner(_teamData);
  };

  const handleTeamListDataOwner = (event, data) => {
    setTeamDataOwner(event);
    setOwnerArray(data);
  };
  const saveOwnerData = () => {
    setVisibleChangeOwnerModel(false);
    setLeadOwner(ownerArray?.full_name);

    if (ownerArray?.full_name === undefined) {
      message.error("Please Select Owner Team Member");
    } else {
      message.success("Owner Team Member Selected Successfully");
    }
  };

  const handleCancel = () => {
    setDesigDataOwner("");
    setTeamDataOwner("");
    form.setFieldsValue({
      "Select Owner Designation": "",
      "Select Owner Team Member": "",
    });
    setOwnerArray([]);
    setLeadOwner("");

    setVisibleChangeOwnerModel(false);
  };

  const handleChangeOwner = () => {
    setChangeOwnerLoading(true);
    setTimeout(() => {
      setVisibleChangeOwnerModel(false);
      setChangeOwnerLoading(false);
    }, 2000);
  };

  const leadHandler = (value) => {
    setLeadDisposition("");
    form.setFieldsValue({
      leadStatus: "",
      leadDisposition1: "",
      leadDisposition2: "",
      leadDispositionhh: "",
      leadSubDisposition: "",
    });
    setLeadStatus(value);
    leadStatusType = value;
    storeFormData.leadDisposition = "";
    
  };

  const leadDispositionHandlerNo = (value) => {
    setLeadDisposition(value);
    // storeFormData.leadsubDisposition = "";
    setAppointmentDate(null);
    setAppointmentTime([]);
  };

  const leadDispositionHandlerNotRe = (value) => {
    setLeadSubDisposition(value);
  };

  const appointmentDateHandler = (date, dateString) => {
    // setAppointmentDate(Date.parse(dateString))
    let newDate = moment(date).valueOf();
    // let ms_date = new Date(newDate).setUTCHours(0, 0, 0, 0)
    let itcDate = moment
      .utc(newDate)
      .utcOffset("+05:30")
      .format("MM-DD-YYYY hh:mm:ss");


    setAppointmentDate(date);
    setAppointmentDatePost(newDate);
  };

  const startTimeHandler = (value) => {
    setAppointmentTime(value);
  };

  const remarkFromSourceHandler = (event) => {
    setRemarkFromSource(event.target.value);
  };
  
  const affHandler = (event) => {
    setAff(event.target.value);
  };

  const proposanalHandler = (event) => {
    setProposalFormNumber(event.target.value);
  };

  const remarkFromUserHandler = (event) => {
    setRemarkFromUser(event.target.value);
  };

  const stateSelectHandler = (value, key) => {
    setCode(key.provinceCode);
    dispatch(actions.fetchAllCities(key.provinceCode));
  };

  const stateChangetHandler = (event, key) => {
    setStateProvince(key.provinceCode);
    setStateProvinceName(key.provinceName);
    setCityProvince(null);
  };

  const cityChangeHandler = (value, key) => {
    setCityProvinceName(key.Municipality_name);
    setCityProvince(key.Municipality_code);
  };
  const leadTypeHandler = (event) => {
    setLeadType(event);
  };

  const leadPropTypeHandler = (event) => {
    leadStatusType = "";
    setLeadPropensity(event);

    if (event === "Spot Closure") {
      storeFormData.leadDisposition = "converted";
      storeFormData.leadsubDisposition = "Converted";
      setLeadStatus("contact");
      setLeadDisposition("converted");
      setLeadSubDisposition("Converted");
      form.setFieldsValue({
        leadStatus: "contact",
        leadDisposition1: "converted",
        leadDisposition2: "converted",
        leadDispositionhh: "converted",
        leadSubDisposition: "Converted",
      });
    } else {
      storeFormData.leadDisposition = "";
      storeFormData.leadsubDisposition = "";
      setLeadStatus("newleadentery");
      setLeadDisposition("");
      setLeadSubDisposition("");
      form.setFieldsValue({
        leadStatus: "newleadentery",
        leadDisposition1: "",
        leadDisposition2: "",
        leadDispositionhh: "",
        leadSubDisposition: "",
      });
    }
  };

  const toggleTeamMember = () => {
    setDesigData("");
    setTeamData("");
    setVisibleTeamMemberModal(!visibleTeamMemberModal);
    !visibleTeamMemberModal && dispatch(actions.fetchDesignation(channelCode));
  };
  const saveTeamMemberData = () => {
    let _data = {
      designation: addTeamMemb.designation.label,
      teamMember: addTeamMemb.teamName.label,
    };

    setTeamTableData([...teamTableData, _data]);

    setVisibleTeamMemberModal(false);
  };

  const deleteTableRow = (el) => {
    const newData = teamTableData.filter(
      (item) => item.teamMember !== el.teamMember
    );
    setTeamTableData(newData);
  };

  // validations
  const checkValidity = (data) => {
    if (data === "" || data === undefined || data === null) {
      return "";
    } else {
      return data;
    }
  };

  const formData = {
    // put api
    ...storeFormData,

    user_id: !teamDataOwner ? id : teamDataOwner,
    leadStatus: leadStatus,
    leadDisposition: leadDisposition,
    leadsubDisposition: leadSubDisposition,

    remarksfromUser: remarkFromUser,
    remarksfromSource: remarkFromSource,
    teamMembers: JSON.stringify(addTeamMemb),
    leadSource: null,

    lead_Owner_Id: !teamDataOwner ? id : teamDataOwner,
    lead_Creator_Id: storeFormData.leadCreatorId
      ? storeFormData.leadCreatorId
      : id,
    leadType: leadType,
    leadPropensity: leadPropensity,
    line1: line1,
    line2: line2,
    line3: line3,
    country: "India",
    
    city: cityProvinceName, // city name has to be passed
    cityCode: cityProvince, //city code has to be passed
    stateCode: stateProvince,
    state: stateProvinceName,
    primaryMobile: primaryNo,
    landlineNo: landlineNo,
    email: email,
    
    mailingAddressStatus: "Yes",
    firstName: firstName,
    lastName: lastName,
    expectedPremium: null,
    expectedclosureDate: "",
    start_date: appointmentDatePost,
    //appointmentDate: appointmentDate,
    start_time: parseInt(appointmentTime),
  };

  let createFormData = {
    // post api
    leadStatus: leadStatus,
    leadsubDisposition: leadSubDisposition,
    //leadDisposition: leadDisposition,
    leadDisposition: leadDisposition,

    start_date: appointmentDatePost,
    //appointmentDate: appointmentDate,
    start_time: parseInt(appointmentTime),
    remarksfromUser: remarkFromUser,
    remarksfromSource: remarkFromSource,
    city: cityProvinceName, // city name has to be passed
    cityCode: cityProvince, //city code has to be passed
    stateCode: stateProvince,
    state: stateProvinceName,
    
    Client_ProposalId: proposalFormNumber,
    aaf: aaf,
    teamMembers: JSON.stringify(addTeamMemb),
    lead_Owner_Id: !teamDataOwner ? id : teamDataOwner,
    lead_Creator_Id: id,
    user_id: id,
    LeadType: leadType,
    leadPropensity: leadPropensity,
    

    primaryMobile: primaryNo,
    landlineNo: landlineNo,
    email: email,
    firstName: firstName,
    lastName: lastName,
  };

  const failedHandler = (error) => {
    alert(error);
  };

  // **********************  submit form ********************* //
  const submitHandler = (event) => {
    const regEx = /^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (email && email !== undefined) {
      if (!email.match(regEx)) {
        message.error("Enter Valid Email Id");
        return;
        // setMessage("Valid Email");
      }
    }

    const mobileRegEx = /^[06789]\d{9,13}$/; 
if (primaryNo && primaryNo !== undefined) {
  const primaryNoStr = String(primaryNo); 

  if (!mobileRegEx.test(primaryNoStr)) {
    message.error("Mobile Number should be 10 to 14 digits and start with 0, 6, 7, 8, or 9 only");
    return;
  }
}
    
    if (
      firstName === "" ||
      lastName === "" ||
      primaryNo === "" ||
      leadType === "" ||
      leadPropensity === ""
    ) {
      message.error("Please fill Mandatory fields");
      return;
    }

    const regA = /^[a-zA-Z ]+$/;
    if (firstName || lastName) {
      if (!lastName.match(regA) || !firstName.match(regA)) {
        message.error("Only Alphabets are Allowed");
        return;
      }
    }

    if (isNewLead) {
      dispatch(actions.createLead(createFormData)).then((res) => {
        console.log("reslead----->", res);
        let _leadID = "";
        if (res?.type === "CREATE_LEAD_SUCCESS") {
          setIsNewLead(false);
          setFirstNameSummary(res?.formData[0]?.firstName);
          setLastNameSummary(res.formData[0]?.lastName);
          setCreate_dateSummary(res.formData[0]?.created_date);
          setLeadIDSummary(res.formData[0]?.lead_Id);
          setLeadSourceName(res.formData[0]?.leadSource?.name);
          storePrimaryMobileValue = res?.formData[0]?.primaryMobile;
          stateSummary = res.formData[0]?.state;
          storeCityValue = res?.formData[0]?.city;
          storeLeadDisposition = res?.formData[0]?.leadDisposition;
          storesubLeadDisposition = res?.formData[0]?.leadsubDisposition;
          _leadID = res?.formData[0]?._id;
       
          setWorkSiteEvent(
            res?.formData[0]?.workSiteEventId?.eventHeldUnitName
          );
          setLeadIdData(res?.formData[0]?._id);

          if (
            (!storeLeadDisposition || storeLeadDisposition == "invalid") &&
            ownerArray?.full_name != undefined
          ) {
            history.push("/leadMaster/all_leads");
            message.success(`This Lead Allocated To ${ownerArray?.full_name}`);
          }
        }

        dispatch({ data: _leadID, type: "CURRENT_UPDATING_ID" });
        dispatch(actions.storeLead(formData));
      });
    } else {
      let _lead_id = storeLeadId !== undefined ? storeLeadId : leadIdData;
      dispatch(actions.editLead(formData, _lead_id)).then((res) => {
        console.log("reslead- update ---->", res);
        if (res?.type === "EDIT_LEAD_SUCCESS") {
          stateSummary = res.formData[0]?.state;
          storeCityValue = res?.formData[0]?.city;
          setIsNewLead(false);

          if (
            (!storeLeadDisposition || storeLeadDisposition == "invalid") &&
            ownerArray?.full_name != undefined
          ) {
            history.push("/leadMaster/all_leads");
            message.success(`This Lead Allocated To ${ownerArray?.full_name}`);
          }
        } else if (res?.type === "EDIT_LEAD_FAIL") {
          failedHandler(res.error);
        }
      });
    }
  };

  const handleDesignationData = (event, data) => {
    setDesigData(event);
    setTeamData("");
    form.setFieldsValue({
      "Select Team Member": "",
    });
    // const [teamDesig ,setTeamDesig]=useState(null)
    let _team = { ["designation"]: data.label };
    setTeamDesig(_team);

    let _teamData = userTreeData?.reporting_users?.filter(
      (el) => el.hierarchy_id === event
    );
    setTeamMemberList(_teamData);
  };

  const handleTeamListData = (event, data) => {
    setTeamData(event);

    let apiBody = {
      first_name: data.first_name,
      last_name: data.last_name,
      Id: data._id,
    };

    let _team = {
      ...teamDesig,
      ["teamName"]: data.label,
      ["teamMem_id"]: data.value,
    };
    // Data Structure for Table Data
    setAddTeamMemb([...addTeamMemb, _team]);
    // Data Structure for API Request Body
    setAddTeamMemAPIStruct([...addTeamMemAPIStruct, apiBody]);
  };

  if (leadDataLoading && _.isEmpty(storeFormData)) {
    return <Spin />;
  }

  return (
    <>
      <div className="leadtab">

        <Tabs
          tabMenu={_leadID ? tabMenu : tabMenu2}
          header="New Lead"
          activeKey="1"
        />
      </div>

      <div className="form-container">
        <Form
          form={form}
          initialValues={{
            leadStatus: leadStatus,
            firstname: firstName,
            leadType: leadType,
            phone: primaryNo,
            landline: landlineNo,
          }}
          fields={[
            {
              name: ["leadStatus"],
              value: leadStatus,
            },
            {
              name: ["firstname"],
              value: firstName,
            },
            {
              name: ["lastname"],
              value: lastName,
            },
            {
              name: ["email"],
              value: email,
            },
            {
              name: ["leadType"],
              value: leadType,
            },
            {
              name: ["phone"],
              value: primaryNo,
            },
            {
              name: ["landline"],
              value: landlineNo,
            },
            {
              name: ["leadPropensity"],
              value: leadPropensity,
            },
            {
              name: ["city"],
              value: cityProvince,
            },
            {
              name: ["state"],
              value: stateProvince,
            },
            {
              name: ["remarkFromSource"],
              value: remarkFromSource,
            },
            {
              name: ["remarkFromUser"],
              value: remarkFromUser,
            },
            {
              name: ["appointmentDate"],
              value: appointmentDate,
            },
            {
              name: ["appointmentTime"],
              value: appointmentTime,
            },
            {
              name: ["UnitNameWorksite"],
              value: UnitNameWorksite,
            },
          ]}
        >
          <Row justify={width > breakpoint ? "" : "center"} gutter={[0, 24]}>

            <Col
              className="form-body  p50 mb-2"
              xs={24}
              sm={24}
              md={16}
              lg={15}
              xl={15}
              span={23}
              offset={width > breakpoint ? 2 : 0}
            >
              <p className="form-title">Contact Details</p>
              <Row gutter={16} className="mb-2 statsLead">
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="firstname"
                    label="First Name"
                    rules={[
                      {
                        required: true,
                        message: "First Name is required",
                      },
                      {
                        message: "Only Alphabets are Allowed",
                        pattern: new RegExp(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/),
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="first-name input-box"
                      size="default"
                      maxLength="50"
                      placeholder="Enter First Name"
                      value={firstName}
                      defaultValue={firstName}
                      onChange={(item) => onChangeFirstName(item)}
                      autoComplete="off"
                      disabled={isDisabled}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="lastname"
                    label="Last Name"
                    rules={[
                      {
                        required: true,
                        message: "Last Name is required",
                      },
                      {
                        message: "Only Alphabets are Allowed",
                        pattern: new RegExp(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/),
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="last-name input-box"
                      size="default"
                      placeholder="Enter Last Name"
                      value={lastName}
                      defaultValue={lastName}
                      onChange={(item) => onChangeLastName(item)}
                      maxLength="50"
                      autoComplete="off"
                      disabled={isDisabled}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="email"
                    label="Email Address"
                    rules={[
                      {
                        type: "email",
                        message: "Please provide valid email address",
                      },
                      
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="email input-box"
                      size="default"
                      placeholder="Enter Email Address"
                      value={email}
                      onChange={(item) => emailAddressHandler(item)}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="phone"
                    label="Primary Mobile"
                    rules={[
                      {
                        required: true,
                        message: "Mobile No is required",
                      },
                      {
                        pattern: new RegExp(/^[06789][0-9]{9,13}$/), // Starts with 0,6,7,8,9 and has 10 to 14 digits
                        message: "Mobile Number should be 10 to 14 digits and start with 0, 6, 7, 8, or 9 only",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="phone-no input-box"
                      size="default"
                      placeholder="Enter Primary Mobile"
                      defaultValue={primaryNo}
                      onChange={(item) => primaryNoHandler(item)}
                      disabled={isDisabled}
                      maxLength={14} // Updated to allow up to 14 digits
                      autoComplete="off"
                      onKeyDown={(evt) => {
                        if (!/[0-9]/.test(evt.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(evt.key)) {
                          evt.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="landline"
                    label="Landline No"
                    rules={[
                      {
                        required: false,
                      },
                      {
                        message:
                          "Landline number must be 10 digit and numbers only",
                        pattern: new RegExp(/^[0-9][0-9]{9}$/),
                      },
                    ]}
                    style={{ marginBottom: "2rem" }}
                  >
                    <Input
                      defaultValue={landlineNo}
                      className="first-name input-box"
                      placeholder="Enter Landline No"
                      onChange={landlineNoHandler}
                      maxLength="10"
                      autoComplete="off"
                    // type="number"
                    />
                  </Form.Item>
                </Col>

              
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="state"
                    label="Province"
                    rules={[
                      {
                        required: false,
                        message: "Select your Province!",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      showSearch
                      bordered={false}
                      className="select-box"
                      // size="default"
                      placeholder="Select Your Province"
                      options={stateOptions}
                      onSelect={(e, data) => stateSelectHandler(e, data)}
                      value={stateProvince}
                      autoComplete="on"
                      // defaultValue={storeStateValue}
                      onChange={(item, key) => stateChangetHandler(item, key)}
                      // onChange={stateChangetHandler}
                      onSearch={onSearch}
                      filterOption={filterOption}
                    >

                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="city"
                    label="City"
                    rules={[
                      {
                        required: false,
                        message: "Please select your city!",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      showSearch
                      bordered={false}
                      className="select-box"
                      size="default"
                      placeholder="Select a city"
                      options={citiesOptions}
                      autoComplete="off"
                      value={cityProvince}
                      // defaultValue={storeCityValue}
                      onChange={(item, key) => cityChangeHandler(item, key)}
                      onSearch={onSearch}
                      filterOption={filterOption}
                    ></Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="leadType"
                    label="Lead Type"
                    rules={[
                      {
                        required: true,
                        message: "Select Lead Type",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      bordered={false}
                      className="select-box"
                      options={leadTypeOptionsSales}
                      value={leadType}
                      //defaultValue={leadType}
                      size="default"
                      placeholder="Select Lead Type"
                      onChange={(item) => leadTypeHandler(item)}
                      disabled={isDisabled}
                    ></Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="leadPropensity"
                    label="Lead Status"
                    rules={[
                      {
                        required: true,
                        message: "Select Lead Status",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      bordered={false}
                      className="select-box"
                      options={leadPropensityOptions}
                      value={leadPropensity}
                      // defaultValue={leadPropensity}
                      size="default"
                      placeholder="Select Lead Status"
                      onChange={(item) => leadPropTypeHandler(item)}
                    ></Select>
                  </Form.Item>
                </Col>

                {_leadID && worksiteId1?.appointment_type === "Worksite" ? (
                  <>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="UnitNameWorksite"
                        label="Tag to worksite event"
                      >
                        <Input
                          className="first-name input-box "
                          size="default"
                          placeholder="Enter Tag to worksite event"
                          value={UnitNameWorksite}
                          defaultValue={UnitNameWorksite}
                          // onChange={(item) => workSiteEvenetHandler(item)}
                          disabled={true}
                        />
                      </Form.Item>
                    </Col>
                  </>
                ) : (
                  ""
                )}
              </Row>
            </Col>

            {/* when updated lead is there then summary open */}
            {_leadID ? (
              <>
                <Col
                  className="form-body  p40"
                  // style={{ marginLeft: width > breakpoint ? "20px" : "0" }}
                  xs={{ order: width > breakpoint ? 2 : 1 }}
                  sm={24}
                  md={24}
                  lg={6}
                  xl={6}
                  order={1}
                  span={23}
                >
                  <Row>
                    <Col xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                      <p className="form-title">Summary</p>

                      <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12}>
                          <p className="lead-summ-label">Lead ID</p>
                          <p className="lead-detail">
                            {leadIDSummary} <br />{" "}
                          </p>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12}>
                          <p className="lead-summ-label">Source</p>
                          <p className="lead-detail">{leadSourceName}</p>
                        </Col>
                      </Row>
                      <div
                        style={{
                          backgroundColor: "gray",
                          height: "1px",
                          width: "auto",
                          opacity: "0.3",
                          margin: "5px 0px 5px 0px",
                        }}
                      ></div>

                      <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12}>
                          <p className="lead-summ-label"> Full Name</p>
                          <p className="lead-detail">
                            {capitalizeFirst(firstNameSummary, lastNameSummary)}{" "}
                            <br />
                          </p>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12}>
                          <p className="lead-summ-label"> Mobile Number </p>
                          <p className="lead-detail">
                            <a href={`tel:${storePrimaryMobileValue}`}></a>{" "}
                            {storePrimaryMobileValue}
                          </p>
                        </Col>
                      </Row>
                      <div
                        style={{
                          backgroundColor: "gray",
                          height: "1px",
                          width: "auto",
                          opacity: "0.3",
                          margin: "5px 0px 5px 0px",
                        }}
                      ></div>

                      <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12}>
                          <p className="lead-summ-label">Province</p>
                          <p className="lead-detail">
                            {stateProvinceName} <br />{" "}
                          </p>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12}>
                          <p className="lead-summ-label">City</p>
                          <p className="lead-detail">{cityProvinceName}</p>
                        </Col>
                      </Row>
                      <div
                        style={{
                          backgroundColor: "gray",
                          height: "1px",
                          width: "auto",
                          opacity: "0.3",
                          margin: "5px 0px 5px 0px",
                        }}
                      ></div>

                      <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12}>
                          <p className="lead-summ-label">Allocated To</p>
                          <p className="lead-detail">
                            {_leadID ? allocateStore : ""}
                            <br />{" "}
                          </p>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12}>
                          <p className="lead-summ-label">Created on</p>
                          <p className="lead-detail">
                            {new Date(create_dateSummary).toLocaleDateString(
                              "en-US"
                            ) === "Invalid Date"
                              ? ""
                              : new Date(create_dateSummary).toLocaleDateString(
                                "en-US",
                                { year: 'numeric', month: '2-digit', day: '2-digit' }
                              ).replace(/\//g, "-")}
                            <br />{" "}
                          </p>
                        </Col>
                      </Row>
                      <div
                        style={{
                          backgroundColor: "gray",
                          height: "1px",
                          width: "auto",
                          opacity: "0.3",
                          margin: "5px 0px 5px 0px",
                        }}
                      ></div>
                      <Row>
                        {/* <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12}>

                        <p className="lead-summ-label">OTP</p>
                        <p className="lead-otp">Verified</p>

                    </Col> */}
                        {/* <Col xs={12} sm={12} md={12} lg={12} xl={12} span={12}>
                      <p className="lead-summ-label">Worksite ID</p>
                      <p className="lead-detail">23246</p>
                    </Col> */}
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </>
            ) : (
              ""
            )}

            <Col
              className="form-body  p50"
              xs={{ order: 3 }}
              sm={16}
              md={16}
              lg={15}
              xl={15}
              span={23}
              offset={width > breakpoint ? 2 : 0}
            >
              <p className="form-title">Status</p>

              <Row gutter={16} className="mb-2">
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <div>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="leadStatus"
                      label="Lead Progress"
                      style={{ marginBottom: "1rem" }}
                      size="default"
                      rules={
                        leadPropensity === "Spot Closure"
                          ? ""
                          : [
                            {
                              required: true,
                              message: "Please Select Lead Progress",
                            },
                          ]
                      }
                    >
                      <Select
                        bordered={false}
                        className="select-box"
                        options={leadOptions}
                        size="default"
                        dropdownClassName="popup-size"
                        onChange={(event) => leadHandler(event)}
                        style={{ height: "2.45rem" }}
                        value={leadStatus}
                        defaultValue="newleadentery"
                        disabled={
                          leadPropensity === "Spot Closure" ? true : false
                        }
                      />
                    </Form.Item>
                  </div>
                </Col>

                {leadStatus === "newleadentry" ? null : (
                  <>
                    {leadStatus === "nocontact" ? (
                      <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                        <div>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name label-color"
                            name="leadDispositionhh"
                            label="Lead Disposition"
                            style={{ marginBottom: "1rem" }}
                            size="default"
                          >
                            <Select
                              bordered={false}
                              className="select-box"
                              options={leadDispositionOptionNoContact}
                              size="default"
                              dropdownClassName="popup-size"
                              onChange={(event) =>
                                leadDispositionHandlerNo(event)
                              }
                              style={{ height: "2.45rem" }}
                              defaultValue={storeLeadDisposition}
                            ></Select>
                          </Form.Item>
                        </div>
                      </Col>
                    ) : null}

                    {(leadType === "Sales" || leadType === "Individual"  ||leadType === "Group") && leadStatus === "contact" ? (
                      <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                        <div>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name label-color"
                            name="leadDisposition1"
                            label="Lead Disposition"
                            style={{ marginBottom: "1rem" }}
                            size="default"
                          >
                            <Select
                              bordered={false}
                              className="select-box"
                              options={leadDispositionOptionContact}
                              size="default"
                              dropdownClassName="popup-size"
                              onChange={(event) =>
                                leadDispositionHandlerNo(event)
                              }
                              style={{ height: "2.45rem" }}
                              //value={leadDisposition}
                              defaultValue={storeLeadDisposition}
                              disabled={
                                leadPropensity === "Spot Closure" ? true : false
                              }
                            ></Select>
                          </Form.Item>
                        </div>
                      </Col>
                    ) : null}
                  </>
                )}

                {(leadType === "LA Recruitment" ||
                  leadType === "OP Recruitment") &&
                  leadStatus === "contact" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadDisposition2"
                        label="Lead Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadDispositionOptionContactLa}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) => leadDispositionHandlerNo(event)}
                          style={{ height: "2.45rem" }}
                          //value={leadDisposition}
                          defaultValue={storeLeadDisposition}
                          disabled={
                            leadPropensity === "Spot Closure" ? true : false
                          }
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "nocontact" &&
                  leadDisposition === "notreachable" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition1"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadDispositionOptionNotReach}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          // value={leadSubDisposition}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "nocontact" &&
                  leadDisposition === "ringingbusy" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition2"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadDispositionOptionRing}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          //value={leadSubDisposition}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "nocontact" &&
                  leadDisposition === "wrongnumber" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition3"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadDispositionOptionWrong}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          //value={leadSubDisposition}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "nocontact" && leadDisposition === "invalid" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition4"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadDispositionOptionInvalid}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          // value={leadSubDisposition}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadDisposition === "switchoff" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition5"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadDispositionOptionSwitch}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "Sales" || leadType === "Individual"  ||leadType === "Group") &&
                  leadDisposition === "appointment" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition6"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionOption}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "Sales" || leadType === "Individual"  ||leadType === "Group") &&
                  leadDisposition === "callback" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition7"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionOptionCallback}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "Sales" || leadType === "Individual"  ||leadType === "Group") &&
                  leadDisposition === "shorthangup" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition8"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionshort}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "Sales" || leadType === "Individual"  ||leadType === "Group") &&
                  leadDisposition === "notinterested" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition9"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionNotIntersetd}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "Sales" || leadType === "Individual"  ||leadType === "Group") &&
                  leadDisposition === "nonserviceloc" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition10"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionNonSer}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "Sales" || leadType === "Individual"  ||leadType === "Group") &&
                  leadDisposition === "noteligible" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition11"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionNonEli}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}
                
                {leadStatus === "contact" &&
                  leadDisposition === "nonserviceable" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition11"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionNotService}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}
                {/* {leadStatus === "contact" &&
                  leadDisposition === "failed" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition11"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionFailed}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null} */}

                {((leadStatus === "contact" && leadType === "LA Recruitment") ||
                  leadType === "OP Recruitment") &&
                  leadDisposition === "noteligible" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition12"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionNonEliLa}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          //value={leadSubDispositionNotEliLa}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                
                {leadStatus === "contact" &&
                  (leadType === "LA Recruitment" ||
                    leadType === "OP Recruitment") &&
                  leadDisposition === "appointment" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition13"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionOptionAppLa}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "LA Recruitment" ||
                    leadType === "OP Recruitment") &&
                  leadDisposition === "bop" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition14"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionOptionBop}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "LA Recruitment" ||
                    leadType === "OP Recruitment") &&
                  leadDisposition === "shorthangup" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition15"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionOptionShorthangupLa}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "LA Recruitment" ||
                    leadType === "OP Recruitment") &&
                  leadDisposition === "callback" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition16"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionOptionCallbackLa}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "LA Recruitment" ||
                    leadType === "OP Recruitment") &&
                  leadDisposition === "notinterested" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition17"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionOptionNotInLa}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  leadDisposition === "shorthangup" &&
                  leadSubDisposition === "Call back" ? (
                  <>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="appointmentDate"
                        label="Appointment Date"
                        rules={[
                          {
                            type: "object",
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <DatePicker
                          inputReadOnly={true}
                          className="input-box"
                          onChange={(item) => appointmentDateHandler(item)}
                          value={appointmentDate}
                          defaultValue={appointmentDate}
                          size="default"
                          format="MM-DD-YYYY"
                          disabledDate={(d) => !d || d.isBefore(minimumDate)}
                          style={{
                            width: "100%",
                            boxShadow: "none",
                            border: "none",
                            borderBottom: "1px rgb(153, 153, 153) solid",
                          }}
                        
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="appointmentTime"
                        label="Select Start Time"
                        rules={[
                          {
                            required: true,
                            message: "Select Start Time",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        
                        <Select
                          bordered={false}
                          className="select-box"
                          value={appointmentTime}
                          defaultValue={appointmentTime}
                          onChange={(item) => startTimeHandler(item)}
                          size="default"
                          
                          options={appointmentTimeOptions}
                          placeholder="Start Time"
                        ></Select>
                      </Form.Item>
                    </Col>
                  </>
                ) : null}

                {leadStatus === "contact" &&
                  (leadDisposition === "appointment" ||
                    leadDisposition === "callback") ? (
                  <>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="appointmentDate"
                        label="Appointment Date"
                        rules={[
                          {
                            type: "object",
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <DatePicker
                          inputReadOnly={true}
                          className="input-box"
                          onChange={(item) => appointmentDateHandler(item)}
                          value={appointmentDate}
                          defaultValue={appointmentDate}
                          size="default"
                          format="MM-DD-YYYY"
                          disabledDate={(d) => !d || d.isBefore(minimumDate)}
                          style={{
                            width: "100%",
                            boxShadow: "none",
                            border: "none",
                            borderBottom: "1px rgb(153, 153, 153) solid",
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="appointmentTime"
                        label="Select Start Time"
                        rules={[
                          {
                            required: true,
                            message: "Select Start Time",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                       
                        <Select
                          bordered={false}
                          className="select-box"
                          value={appointmentTime}
                          defaultValue={appointmentTime}
                          onChange={(item) => startTimeHandler(item)}
                          size="default"
                          
                          options={appointmentTimeOptions}
                          placeholder="Start Time"
                        ></Select>
                      </Form.Item>
                    </Col>
                  </>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "Sales" || leadType === "Individual"  ||leadType === "Group") &&
                  leadDisposition === "languagebarrier" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition18"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionLanBarOption}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "LA Recruitment" ||
                    leadType === "OP Recruitment") &&
                  leadDisposition === "languagebarrier" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition19"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionLanBarOptionLa}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "Sales" || leadType === "Individual"  ||leadType === "Group") &&
                  leadDisposition === "spotclosure" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition20"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionStopClouse}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "Sales" || leadType === "Individual"  ||leadType === "Group") &&
                  leadDisposition === "converted" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition21"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionConvertedOpt}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                          disabled={
                            leadPropensity === "Spot Closure" ? true : false
                          }
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "Sales" || leadType === "Individual"  ||leadType === "Group") &&
                  leadDisposition === "failed" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition22"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionFailedOption}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "LA Recruitment" ||
                    leadType === "OP Recruitment") &&
                  leadDisposition === "failed" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition23"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionFailedOptionLa}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "Sales" || leadType === "Individual"  ||leadType === "Group") &&
                  (leadDisposition === "converted" ||
                    leadDisposition === "spotclosure") ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="Client_ProposalId"
                      label="Proposal Form Number"
                      rules={[
                        {
                          message: "Only Alphanumeric are Allowed",
                          pattern: new RegExp(/^[A-Za-z0-9? ,_-]+$/),
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Input
                        className="email input-box"
                        size="default"
                        placeholder="Enter Proposal Form Number"
                        value={proposalFormNumber}
                        onChange={(item) => proposanalHandler(item)}
                        style={{
                          border: "none",
                          borderBottom: "1px solid gray",
                        }}
                      />
                    </Form.Item>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "LA Recruitment" ||
                    leadType === "OP Recruitment") &&
                  leadDisposition === "converted" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition24"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionConvertedOptLa}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          // value={leadSubDispositionConvertedLa}
                          defaultValue={storesubLeadDisposition}
                          disabled={
                            leadPropensity === "Spot Closure" ? true : false
                          }
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "LA Recruitment" ||
                    leadType === "OP Recruitment") &&
                  leadDisposition === "training" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition25"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionOptionTraining}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          //value={leadSubDispositionTraining}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "LA Recruitment" ||
                    leadType === "OP Recruitment") &&
                  leadDisposition === "exam" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition26"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionOptionExam}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          //value={leadSubDispositionExam}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "LA Recruitment" ||
                    leadType === "OP Recruitment") &&
                  leadDisposition === "coding" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <div>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="leadsubDisposition27"
                        label="Lead Sub Disposition"
                        style={{ marginBottom: "1rem" }}
                        size="default"
                      >
                        <Select
                          bordered={false}
                          className="select-box"
                          options={leadSubDispositionOptionCoding}
                          size="default"
                          dropdownClassName="popup-size"
                          onChange={(event) =>
                            leadDispositionHandlerNotRe(event)
                          }
                          style={{ height: "2.45rem" }}
                          // value={leadSubDispositionCoding}
                          defaultValue={storesubLeadDisposition}
                        ></Select>
                      </Form.Item>
                    </div>
                  </Col>
                ) : null}

                {leadStatus === "contact" &&
                  (leadType === "LA Recruitment" ||
                    leadType === "OP Recruitment") &&
                  leadDisposition === "converted" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="aaf"
                      label="AAF Number"
                      rules={[
                        {
                          message: "Only Alphanumeric are Allowed",
                          pattern: new RegExp(/^[A-Za-z0-9? ,_-]+$/),
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Input
                        className="email statsLead input-box"
                        size="default"
                        placeholder="Enter AAF Number"
                        value={aaf}
                        onChange={(item) => affHandler(item)}
                        style={{
                          border: "none",
                          borderBottom: "1px solid gray",
                        }}
                      />
                    </Form.Item>
                  </Col>
                ) : (
                  ""
                )}

                {(leadStatus === "contact" &&
                  (leadType === "LA Recruitment" ||
                    leadType === "OP Recruitment") &&
                  leadDisposition === "training") ||
                  leadDisposition === "exam" ||
                  leadDisposition === "coding" ||
                  leadDisposition === "bop" ? (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="appointmentDate"
                      label="Date"
                      style={{ marginBottom: "1rem" }}
                    >
                      <DatePicker
                        inputReadOnly={true}
                        className="input-box"
                        onChange={(item) => appointmentDateHandler(item)}
                        value={appointmentDate}
                        defaultValue={appointmentDate}
                        size="default"
                        format="MM-DD-YYYY"
                        disabledDate={(d) => !d || d.isBefore(minimumDate)}
                        style={{
                          width: "100%",
                          boxShadow: "none",
                          border: "none",
                          borderBottom: "1px rgb(153, 153, 153) solid",
                        }}
                      
                      />
                    </Form.Item>
                  </Col>
                ) : null}

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="remarkFromSource"
                    label="Allocator's Remarks"
                    rules={[
                      {
                        message: "Only Alphanumeric are Allowed",
                        pattern: new RegExp(/^[A-Za-z0-9? ,_-]+$/),
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="email input-box"
                      size="default"
                      placeholder="Enter here"
                      value={remarkFromSource}
                      //defaultValue={remarkFromSource}
                      onChange={(item) => remarkFromSourceHandler(item)}
                      style={{ border: "none", borderBottom: "1px solid gray" }}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>

                {reporters_restrict == "Agent" ? (
                  <></>
                ) : reporters_restrict == "Officer Param" ? (
                  <></>
                ) : reporters_restrict == "Officer Prahri" ? (
                  <></>
                ) : (
                  <>
                    <Col
                      xs={24}
                      sm={12}
                      md={24}
                      lg={12}
                      xl={12}
                      className="mb-2"
                    >
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="remarkFromUser"
                        label="Remark From User "
                        rules={[
                          {
                            message: "Only Alphanumeric are Allowed",
                            pattern: new RegExp(/^[A-Za-z0-9? ,_-]+$/),
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <Input
                          className="email input-box"
                          size="default"
                          placeholder="Enter here"
                          value={remarkFromUser}
                          defaultValue={remarkFromUser}
                          onChange={(item) => remarkFromUserHandler(item)}
                          style={{
                            border: "none",
                            borderBottom: "1px solid gray",
                          }}
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}

               
              </Row>

              <Row>
                {checkAgent() === false && (
                  <>
                    {reporters_restrict == "Agent" ? (
                      <></>
                    ) : reporters_restrict == "Senior Manager" &&
                      (employee_code == "CH4" ||
                        employee_code == "CH5" ||
                        employee_code == "CH6" ||
                        employee_code == "CH8" ||
                        employee_code == "CH10") ? (
                      <></>
                    ) : (
                      <>
                        <Col
                          xs={24}
                          sm={24}
                          md={12}
                          lg={12}
                          xl={12}
                          className="lead-manager"
                        >
                          <p className="botton-label">
                            Currently this lead is allocated to{" "}
                            <span>
                              <b>
                                {!leadOwner
                                  ? _leadID
                                    ? allocateStore
                                    : allocateStore
                                  : leadOwner}
                              </b>
                              {/* <b>{_leadID ? allocateStore : "Self"}</b> */}
                            </span>
                          </p>
                        </Col>
                        <Col
                          xs={24}
                          sm={24}
                          md={5}
                          lg={5}
                          xl={5}
                          className="lead-manager"
                          style={{ textAlign: "end" }}
                          offset={width > breakpoint ? 7 : 0}
                        >
                          <Button
                            shape="round"
                            style={{
                              color: "#ffff",
                              backgroundColor: "#1D428A",
                            }}
                            onClick={showChangeOwnerModal}
                          >
                            Change Owner
                          </Button>
                        </Col>

                        <Modal
                          title="Allocate to"
                          centered={true}
                          visible={visibleChangeOwnerModel}
                          onCancel={handleCancel}
                          width="auto"
                          footer={null}
                        >
                          <Row gutter={10}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                              <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="Select Owner Designation"
                                label="Select Owner Designation"
                                rules={[
                                  {
                                    required: false,
                                    message: "Set Designation",
                                  },
                                ]}
                              >
                                <Select
                                  size="default"
                                  value={desigDataOwner}
                                  options={hierarAgentListOwner}
                                  onChange={(event, data) =>
                                    handleDesignationDataOwner(event, data)
                                  }
                                  placeholder="Set Designation"
                                ></Select>
                              </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                              <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="Select Owner Team Member"
                                label="Select Owner Team Member"
                                rules={[
                                  {
                                    required: false,
                                    message: "Set Reminder",
                                  },
                                ]}
                              >
                                <Select
                                  size="default"
                                  value={teamDataOwner}
                                  options={teamMemberListOwner}
                                  onChange={(event, data) =>
                                    handleTeamListDataOwner(event, data)
                                  }
                                  placeholder="Set Team Member"
                                ></Select>
                              </Form.Item>
                            </Col>
                          </Row>

                          <Row
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              marginTop: "30px",
                            }}
                          >
                            <Button key="cancel" onClick={handleCancel}>
                              Cancel
                            </Button>

                            <Button
                              key="save"
                              type="primary"
                              onClick={saveOwnerData}
                              style={{
                                backgroundColor: "#1D428A",
                                marginLeft: "5px",
                              }}
                            >
                              Save
                            </Button>
                          </Row>
                        </Modal>
                      </>
                    )}
                  </>
                )}

                {checkAgent() === false && (
                  <>
                   
                    <Col
                      xs={24}
                      sm={24}
                      md={6}
                      lg={6}
                      xl={6}
                      className="lead-manager"
                      offset={width > breakpoint ? 6 : 0}
                    >
                      
                    </Col>
                    <>
                      <Modal
                        title="Add Team Member"
                        centered={true}
                        visible={visibleTeamMemberModal}
                        onCancel={toggleTeamMember}
                        footer={[
                          <Button key="cancel" onClick={toggleTeamMember}>
                            Cancel
                          </Button>,
                          <Button
                            key="save"
                            type="primary"
                            onClick={saveTeamMemberData}
                            style={{ backgroundColor: "#1D428A" }}
                          >
                            Save
                          </Button>,
                        ]}
                      // onCancel={handleCancel}
                      >
                        <Row gutter={10}>
                          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item
                              {...formItemLayout}
                              className="form-item-name label-color"
                              name="Select Designation"
                              label="Select Designation"
                              rules={[
                                {
                                  required: false,
                                  message: "Set Designation",
                                },
                              ]}
                            >
                              <Select
                                size="default"
                                value={desigData}
                                options={hierarAgentList}
                                onChange={(event, data) =>
                                  handleDesignationData(event, data)
                                }
                                placeholder="Set Designation"
                              ></Select>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item
                              {...formItemLayout}
                              className="form-item-name label-color"
                              name="Select Team Member"
                              label="Select Team Member"
                              rules={[
                                {
                                  required: false,
                                  message: "Set Reminder",
                                },
                              ]}
                            >
                              <Select
                                size="default"
                                value={teamData}
                                options={teamMemberList}
                                onChange={(event, data) =>
                                  handleTeamListData(event, data)
                                }
                                placeholder="Set Team Member"
                              ></Select>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Modal>
                    </>
                  </>
                )}

                {checkAgent() === false && teamTableData.length > 0 && (
                  <Col xs={12} sm={12} md={12}>
                    <Table
                      pagination={false}
                      bordered
                      dataSource={teamTableData}
                      columns={teamTableHeader}
                      size="small"
                    />
                  </Col>
                )}
              </Row>

              {/* </Form> */}
            </Col>

            <Col
              className="form-body p30"
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "flex-end",
              }}
              xs={{ order: 5 }}
              sm={24}
              md={16}
              lg={15}
              xl={15}
              span={23}
              offset={width > breakpoint ? 2 : 0}
            >
              {/* <Row  > */}
              <Col xs={12} sm={12} md={4} offset={width > breakpoint ? 16 : 1}>

                <Form.Item>
                  <Button
                    shape="round"
                    style={{
                      color: "#ffff",
                      backgroundColor: "rgb(29, 66, 138)",
                      padding: "0px 30px",
                      margin: "0px -8px",
                    }}
                    
                    icon={<FileTextOutlined />}
                    htmlType="submit"
                    onClick={submitHandler}
                  >
                    {isNewLead ? "Submit" : "Update"}
                  </Button>
                </Form.Item>
              </Col>

              {/* </Row> */}
            </Col>
          </Row>
        </Form>
        {/* <FloatButton /> */}
      </div>
    </>
  );
});

export default NewLead;
