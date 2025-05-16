import React, { useEffect, useState } from "react";
import moment from "moment";
import * as actions from "../../store/actions/index";
import _ from "lodash";

import "./CalendarEvent.css";

import { TimePicker, Button, Modal, Card, Form, Input, DatePicker, Alert, Tag, Space, message, AutoComplete, Col, Upload, Row, Affix, Select } from "antd";
import { CloseOutlined, CloudUploadOutlined, DownloadOutlined, PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import axiosRequest from "../../axios-request/request.methods";
import { checkAgent, stoageGetter } from "../../helpers";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import apiConfig from "../../config/api.config";
import rootIndex from "../../store/root_index";
import { convertToIndianTimezone } from "../../helper/utils";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const { baseURL } = apiConfig;
const { store } = rootIndex;
const _store = store.getState();
const { Search } = Input;

let addEvent = [];

export default function CalendarEvent(props) {
  console.log("Checking Props=========>>", props);
  const thisMonth = moment().format("MM");
  let { innerWidth: width, innerHeight: height } = window;
  const format = "h:mm";
  let count_ = 1;
  let month = moment().format("MM/YYYY");

  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();

  const [Appointmentid, setAppointmentid] = useState("");

  const [worksiteCheck, setWorksiteCheck] = useState(false);
  const [advisorCheck, setAdvisorCheck] = useState(false);
  const [prospectCheck, setProspectCheck] = useState(false);
  const [customerCheck, setCustomerCheck] = useState(false);
  const [supervisorCheck, setSupervisorCheck] = useState(false);
  const [teamCheck, setTeamCheck] = useState(false);
  const [leadCheck, setLeadCheck] = useState(false);
  const [selfCheck, setSelfCheck] = useState(false);

  const [worksiteValue, setWorksiteValue] = useState("");
  const [partnerValue, setPartnerValue] = useState("");
  const [prospectValue, setProspectValue] = useState("");
  const [customerValue, setCustomerValue] = useState("");
  const [supervisorValue, setSupervisorValue] = useState("");
  const [teamValue, setTeamValue] = useState("");
  const [leadValue, setLeadValue] = useState("");
  const [selfValue, setSelfValue] = useState("");
  const [cityProvinceName, setCityProvinceName] = useState("");
  const [stateProvinceName, setStateProvinceName] = useState("");
  const [stateProvince, setStateProvince] = useState(null);
  const [cityProvince, setCityProvince] = useState("");

  const [unitNameValue, setUnitNameValue] = useState("");
  const [code, setCode] = useState("");

  const [appointmenttypes, setAppointmentType] = useState("Business Planning & review");
  const [clientvisit, setclientVisit] = useState("");
  const [duration, setDuration] = useState("");
  const [durationButton, setDurationButton] = useState({
    select_time: true,
    all_day: false,
  });
  const [advisorCollection, setAdvisorCollection] = useState({
    appointment_advisor: true,
    phone_call_advisor: false,
    training: false,
    businessPlanning_review: true,
    unit_meeting: false,
    joint_customer_visit: false,
    servicing: false,
    inactive_agent_reactivation: false,
  });
  const [statusType, setStatusType] = useState({
    openStatus: true,
    cancelStatus: false,
    closeStatus: false,
  });
  const [prospectCollection, setProspectCollection] = useState({
    appointment_prospect: true,
    phone_call: false,
    training_prospect: false,
    first_meeting: true,
    follow_up: false,
    document_collection: false,
  });
  const [customerCollection, setCustomerCollection] = useState({
    appointment_customer: true,
    phone_call_customer: false,
    policy_renewal: false,
  });

  function add3Dots(string, limit) {
    var dots = "...";
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
    return string;
  }

  const [teamMemberData, setTeamMemberData] = useState("");
  const [hierarAgentList, setHierarAgentList] = useState([]);
  const [teamMemberChip, setTeamMemberChip] = useState([]);
  const [ownerCollectn, setOwnerCollectn] = useState([]);

  const states = useSelector((state) => state?.address?.states);
  // console.log("State___________", states)
  let cities = useSelector((state) => state?.address?.cities?.lov);
  console.log("cities====>", cities);

  const _dataStore = useSelector((state) => state?.home?.user_tree);
  const User_State = useSelector((state) => state?.login);
  console.log("UserDatate===>", User_State);

  const employee_code = useSelector((state) => state?.login?.user?.channelCode.channelCode);

  const channel_ID = useSelector((state) => state?.login?.user?.channelCode?._id);

  const login_user_data = stoageGetter("user");
  let reporters_restrict = login_user_data.userRole[0].roleName;

  const reporters_restrict_List = ["Senior Manager", "Officer Param", "Officer Prahri", "Agent"];

  const reporters_restrict_Filter = reporters_restrict_List.filter((ele, ind) => {
    return ele == reporters_restrict;
  });
  const reporters_restrict_set = new Set(reporters_restrict_Filter);
  const reporters_restrict_array = Array.from(reporters_restrict_set);
  const reporters_restrict_compare = reporters_restrict_array.toString();

  useEffect(() => {
    try {
      let _teamMember = [];
      let _final_teamMember = null;
      _dataStore.reporting_users.map((el) => {
        let sortarray = {
          FullName: el.full_name,
          ShortId: el.hierarchyName,
          firstname: el.first_name,
          lastname: el.last_name,
          employecode: el.employeeCode,
          designation: el.hierarchyName,
          _Id: el._id,
          _role_code: el.roleCode[0].roleName,
          value: toCapitalize(el.full_name) + " " + "(" + el.hierarchyName + ")",
        };
        _teamMember.push(sortarray);

        const Condition_teamMember = _teamMember.filter((ele) => {
          let { _role_code } = ele;
          if (_role_code != undefined) {
            return _role_code != "Officer Param" && _role_code != "Officer Prahri" && _role_code != "Agent";
          }
        });

        _final_teamMember = Condition_teamMember;
        sortarray = {};
      });
      if (worksiteCheck) {
        if (employee_code == "CH1" || employee_code == "CH2" || employee_code == "CH11") {
          setHierarAgentList(_final_teamMember);
        }
      } else {
        if (employee_code == "CH1" || employee_code == "CH2" || employee_code == "CH11") {
          setHierarAgentList(_teamMember);
        }
      }
      if (employee_code == "CH3" || employee_code == "CH9" || employee_code == "CH7") {
        setHierarAgentList(_teamMember);
      }
      if (employee_code == "CH4" || employee_code == "CH5" || employee_code == "CH6" || employee_code == "CH10" || employee_code == "CH8") {
        setHierarAgentList(_teamMember);
      }

      // if(worksiteCheck){setHierarAgentList(_final_teamMember)}
      // else{setHierarAgentList(_teamMember)}
    } catch (err) { }
  }, [props, worksiteCheck]);

  useEffect(() => { }, [props]);

  let toCapitalize = (strText) => {
    try {
      if (strText !== "" && strText !== null && typeof strText !== undefined) {
        var _str = strText.toLowerCase();
        var collection = _str.split(" ");
        var modifyStrigs = [];
        _str = "";
        for (var i = 0; i < collection.length; i++) {
          modifyStrigs[i] = collection[i].charAt(0).toUpperCase() + collection[i].slice(1);
          _str = _str + modifyStrigs[i] + " ";
        }
        return _str;
      } else {
        return "";
      }
    } catch (err) { }
  };
  
  useEffect(() => {
    dispatch(actions.fetchAllState());
  }, [dispatch]);

  useEffect(() => {
    if(stateProvince){
      dispatch(actions.fetchAllCities(code));
    }
    if(props?.Data?.cityCode && stateProvince){
      const selectedCity = citiesOptions?.find((city) => city?.value === props?.Data?.cityCode);
      console.log(selectedCity,"akshaysriram")
      setCityProvince(selectedCity?.value || "");
      setCityProvinceName(selectedCity?.label || "");
    }
  },[stateProvince,dispatch])

  console.log(cityProvince, stateProvince, cityProvinceName, stateProvinceName, "akshaysriram")

  useEffect(() => {
    if (props.click == "UPDATE EVENT" && props.Data.leadId !== undefined && props.Data.leadId !== null) {
      let id = props.Data.leadId._id;
      dispatch({ data: id, type: "CURRENT_UPDATING_ID" });
      history.push("/leadmasterpage/statuslead", { leadID: id });
    }

    if (props.click == "data" || "UPDATE EVENT") {
      props.setIsModalVisible(true);
    }
    if (props.click == "UPDATE EVENT") {
      setUpdateCheckEvent(true);
    }

    if (props.Data) {
      if (props.Data.appointment_type == "Worksite") {
        setWorksiteCheck(true);
        setEventTypeWorksiteSelect(props.Data.event_type);
      }
      if (props.Data.appointment_type == "Partner") {
        setWorksiteCheck(false);
        setAdvisorCheck(true);
        setEventTypeAdvisorSelect(props.Data.event_type);
      }
      if (props.Data.appointment_type == "Cantt Opportunity") {
        setWorksiteCheck(false);
        setAdvisorCheck(true);
        setEventTypeAdvisorSelect(props.Data.event_type);
      }
      if (props.Data.appointment_type == "Advisor") {
        setWorksiteCheck(false);
        setAdvisorCheck(true);
        setEventTypeAdvisorSelect(props.Data.event_type);
      }
      if (props.Data.appointment_type == "Prospect") {
        setWorksiteCheck(false);
        setAdvisorCheck(false);
        setProspectCheck(true);
        setEventTypeProspectSelect(props.Data.event_type);
      }
      if (props.Data.appointment_type == "Customer") {
        setWorksiteCheck(false);
        setAdvisorCheck(false);
        setProspectCheck(false);
        setCustomerCheck(true);
        setEventTypeCustomerSelect(props.Data.event_type);
      }
      if (props.Data.appointment_type == "Supervisor") {
        setWorksiteCheck(false);
        setAdvisorCheck(false);
        setProspectCheck(false);
        setCustomerCheck(false);
        setTeamCheck(false);
        setSupervisorCheck(true);
        setEventTypeSupervisorSelect(props.Data.event_type);
      }
      if (props.Data.appointment_type == "Team") {
        setWorksiteCheck(false);
        setAdvisorCheck(false);
        setProspectCheck(false);
        setCustomerCheck(false);
        setSupervisorCheck(false);
        setTeamCheck(true);
        setEventTypeTeamSelect(props.Data.event_type);
      }
      if (props.Data.appointment_type == "Self") {
        setWorksiteCheck(false);
        setAdvisorCheck(false);
        setProspectCheck(false);
        setCustomerCheck(false);
        setTeamCheck(false);
        setSupervisorCheck(false);
        setSelfCheck(true);
        setEventTypeSelfSelect(props.Data.event_type);
      }
      if (props.Data.appointment_type == "Lead") {
        setWorksiteCheck(false);
        setAdvisorCheck(false);
        setProspectCheck(false);
        setCustomerCheck(false);
        setTeamCheck(false);
        setSupervisorCheck(false);
        setSelfCheck(false);
        setLeadCheck(true);

        setEventTypeLeadSelect(props.Data.event_type);
      }

      if (props.Data.durationType == "customedatetime") {
        setDurationButton({
          select_time: true,
          all_day: false,
        });
      } else {
        setDurationButton({
          select_time: false,
          all_day: true,
        });
      }

      if (props.Data.statusType == "open") {
        setEventStatus("open");
        setStatusType({
          openStatus: true,
          closeStatus: false,
          cancelStatus: false,
        });
      } else if (props.Data.statusType == "closed") {
        setEventStatus("closed");
        setStatusType({
          openStatus: false,
          closeStatus: true,
          cancelStatus: false,
        });
      } else {
        setEventStatus("cancelled");
        setStatusType({
          openStatus: false,
          closeStatus: false,
          cancelStatus: true,
        });
      }

      if(props?.Data?.stateCode){
        const selectedState = stateOptions.find((state) => state?.value === props?.Data?.stateCode);
        console.log(selectedState,"akshaysriram")
        setCode(props?.Data?.stateCode);
        setStateProvince(selectedState?.value || "");
        setStateProvinceName(selectedState?.label || "");
      }

      setAppointmentid(props?.Data?._id);
      setStatusReasonText(props.Data.statusReason);
      setDurationStartTimeOperation(props.Data.start_time);
      setDurationEndTimeOperation(props.Data.end_time);
      setDurationEndDateOperation(props.Data.end_date);
      setDurationEndDate(moment(props.Data.end_date));
      setDurationStartDateOperation(props.Data.start_date);
      setDurationStartDate(moment(props.Data.start_date));
      setStartTimeSelect(props.Data.start_time);
      setEndTimeSelect(props.Data.end_time);
      if (props.Data.follow_UpEvent_1_start_date) {
        setFollowUpOneDateOperation(props.Data.follow_UpEvent_1_start_date);
        setFollowUpOneDate(moment(props.Data.follow_UpEvent_1_start_date));
      } else {
        setFollowUpOneDateOperation();
        setFollowUpOneDate();
      }
      if (props.Data.follow_UpEvent_2_start_date) {
        setFollowUpTwoDateOperation(props.Data.follow_UpEvent_2_start_date);
        setFollowUpTwoDate(moment(props.Data.follow_UpEvent_2_start_date));
      } else {
        setFollowUpTwoDateOperation();
        setFollowUpTwoDate();
      }
      setEventDurationType(props.Data.durationType);
      setModeSelect(props.Data.mode);
      setTeamMemberChip(props.Data.teamMember);
      setUnitNameValue(props.Data.eventHeldUnitName);
      setCountOfParticipants(props.Data.eventAttendeeCount);
      setCustomerNameText();
      if (props.Data.eventAttendeeListFileUrl) {
        setUploadAttendanveValue(props.Data.eventAttendeeListFileName);
      }
    }
  }, []);

  const [startDuration, setStartDuration] = useState();
  const [endDuration, setEndDuration] = useState();
  const [MultiSelectDate, setMultiSelectDate] = useState(false);
  const [clickedDate, setClickedDate] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventText, setEventText] = useState("");
  const [value, setValue] = useState(moment("10:00", format));
  const [endVal, setEndVal] = useState(moment("10:00", format));
  const [addEvents, setAddEvents] = useState([]);

  const checkWorksiteFunc = (e) => {
    setBookEventCheck(true);
    setEventTypeAdvisorSelect("");
    setEventTypeProspectSelect("");
    setEventTypeCustomerSelect("");
    setEventTypeSupervisorSelect("");
    setEventTypeTeamSelect("");
    setEventTypeSelfSelect("");
    setUnitNameValue("");
    setDurationStartDate();
    setDurationStartDateOperation();
    setDurationEndDate();
    setDurationEndDateOperation();
    setFollowUpOneDate();
    setFollowUpOneDateOperation();
    setFollowUpTwoDate();
    setFollowUpTwoDateOperation();
    setStartTimeSelect("");
    setEndTimeSelect("");
    setTeamMemberChip([]);
    setEventStatus("open");
    setStatusType({
      openStatus: true,
      closeStatus: false,
      cancelStatus: false,
    });
    setStatusReasonText("");
    // setModeSelect('')
    setWorksiteCheck(true);
    setAdvisorCheck(false);
    setProspectCheck(false);
    setCustomerCheck(false);
    setSupervisorCheck(false);
    setTeamCheck(false);
    setLeadCheck(false);
    setSelfCheck(false);
    setWorksiteValue(e.target.textContent);
  };

  const checkPartnerFunc = (e) => {
    setBookEventCheck(true);
    setEventTypeWorksiteSelect("");
    setEventTypeProspectSelect("");
    setEventTypeCustomerSelect("");
    setEventTypeSupervisorSelect("");
    setEventTypeTeamSelect("");
    setEventTypeLeadSelect("");
    setEventTypeSelfSelect("");
    setModeSelect("");
    setUnitNameValue("");
    setDurationStartDate();
    setDurationStartDateOperation();
    setDurationEndDate();
    setDurationEndDateOperation();
    setFollowUpOneDate();
    setFollowUpOneDateOperation();
    setFollowUpTwoDate();
    setFollowUpTwoDateOperation();
    setStartTimeSelect("");
    setEndTimeSelect("");
    setTeamMemberChip([]);
    setEventStatus("open");
    setStatusType({
      openStatus: true,
      closeStatus: false,
      cancelStatus: false,
    });
    setStatusReasonText("");
    setAdvisorCheck(true);
    setProspectCheck(false);
    setCustomerCheck(false);
    setSupervisorCheck(false);
    setTeamCheck(false);
    setLeadCheck(false);
    setSelfCheck(false);
    setWorksiteCheck(false);
    setPartnerValue(e.target.textContent);
  };

  const checkProspectFunc = (e) => {
    setBookEventCheck(true);
    setEventTypeWorksiteSelect("");
    setEventTypeAdvisorSelect("");
    setEventTypeCustomerSelect("");
    setEventTypeSupervisorSelect("");
    setEventTypeTeamSelect("");
    setEventTypeLeadSelect("");
    setEventTypeSelfSelect("");
    setModeSelect("");
    setUnitNameValue("");
    setDurationStartDate();
    setDurationStartDateOperation();
    setDurationEndDate();
    setDurationEndDateOperation();
    setFollowUpOneDate();
    setFollowUpOneDateOperation();
    setFollowUpTwoDate();
    setFollowUpTwoDateOperation();
    setStartTimeSelect("");
    setEndTimeSelect("");
    setTeamMemberChip([]);
    setEventStatus("open");
    setStatusType({
      openStatus: true,
      closeStatus: false,
      cancelStatus: false,
    });
    setStatusReasonText("");
    setProspectCheck(true);
    setAdvisorCheck(false);
    setCustomerCheck(false);
    setSupervisorCheck(false);
    setTeamCheck(false);
    setSelfCheck(false);
    setLeadCheck(false);
    setWorksiteCheck(false);
    setProspectValue(e.target.textContent);
  };

  const checkCustomerFunc = (e) => {
    setBookEventCheck(true);
    setEventTypeWorksiteSelect("");
    setEventTypeAdvisorSelect("");
    setEventTypeProspectSelect("");
    setEventTypeSupervisorSelect("");
    setEventTypeTeamSelect("");
    setEventTypeLeadSelect("");
    setEventTypeSelfSelect("");
    setModeSelect("");
    setUnitNameValue("");
    setDurationStartDate();
    setDurationStartDateOperation();
    setDurationEndDate();
    setDurationEndDateOperation();
    setFollowUpOneDate();
    setFollowUpOneDateOperation();
    setFollowUpTwoDate();
    setFollowUpTwoDateOperation();
    setStartTimeSelect("");
    setEndTimeSelect("");
    setTeamMemberChip([]);
    setEventStatus("open");
    setStatusType({
      openStatus: true,
      closeStatus: false,
      cancelStatus: false,
    });
    setStatusReasonText("");
    setCustomerCheck(true);
    setAdvisorCheck(false);
    setProspectCheck(false);
    setSupervisorCheck(false);
    setTeamCheck(false);
    setSelfCheck(false);
    setLeadCheck(false);
    setWorksiteCheck(false);
    setCustomerValue(e.target.textContent);
  };

  const checkSupervisorFunc = (e) => {
    setBookEventCheck(true);
    setEventTypeWorksiteSelect("");
    setEventTypeAdvisorSelect("");
    setEventTypeProspectSelect("");
    setEventTypeCustomerSelect("");
    setEventTypeTeamSelect("");
    setEventTypeLeadSelect("");
    setEventTypeSelfSelect("");
    setModeSelect("");
    setUnitNameValue("");
    setDurationStartDate();
    setDurationStartDateOperation();
    setDurationEndDate();
    setDurationEndDateOperation();
    setFollowUpOneDate();
    setFollowUpOneDateOperation();
    setFollowUpTwoDate();
    setFollowUpTwoDateOperation();
    setStartTimeSelect("");
    setEndTimeSelect("");
    setTeamMemberChip([]);
    setEventStatus("open");
    setStatusType({
      openStatus: true,
      closeStatus: false,
      cancelStatus: false,
    });
    setStatusReasonText("");
    setSupervisorCheck(true);
    setTeamCheck(false);
    setAdvisorCheck(false);
    setProspectCheck(false);
    setCustomerCheck(false);
    setSelfCheck(false);
    setLeadCheck(false);
    setWorksiteCheck(false);
    setSupervisorValue(e.target.textContent);
  };

  const checkTeamFunc = (e) => {
    setBookEventCheck(true);
    setEventTypeWorksiteSelect("");
    setEventTypeAdvisorSelect("");
    setEventTypeProspectSelect("");
    setEventTypeCustomerSelect("");
    setEventTypeSupervisorSelect("");
    setEventTypeLeadSelect("");
    setEventTypeSelfSelect("");
    setModeSelect("");
    setUnitNameValue("");
    setDurationStartDate();
    setDurationStartDateOperation();
    setDurationEndDate();
    setDurationEndDateOperation();
    setFollowUpOneDate();
    setFollowUpOneDateOperation();
    setFollowUpTwoDate();
    setFollowUpTwoDateOperation();
    setStartTimeSelect("");
    setEndTimeSelect("");
    setTeamMemberChip([]);
    setEventStatus("open");
    setStatusType({
      openStatus: true,
      closeStatus: false,
      cancelStatus: false,
    });
    setStatusReasonText("");
    setTeamCheck(true);
    setSupervisorCheck(false);
    setAdvisorCheck(false);
    setProspectCheck(false);
    setCustomerCheck(false);
    setSelfCheck(false);
    setLeadCheck(false);
    setWorksiteCheck(false);
    setTeamValue(e.target.textContent);
  };

  const checkleadFunc = (e) => {
    console.log("Event Lead", e.target.textContent);
    setBookEventCheck(true);
    setEventTypeWorksiteSelect("");
    setEventTypeAdvisorSelect("");
    setEventTypeProspectSelect("");
    setEventTypeSupervisorSelect("");
    setEventTypeSelfSelect("");
    setModeSelect("");
    setUnitNameValue("");
    setDurationStartDate();
    setDurationStartDateOperation();
    setDurationEndDate();
    setDurationEndDateOperation();
    setFollowUpOneDate();
    setFollowUpOneDateOperation();
    setFollowUpTwoDate();
    setFollowUpTwoDateOperation();
    setStartTimeSelect("");
    setEndTimeSelect("");
    setTeamMemberChip([]);
    setEventStatus("open");
    setStatusType({
      openStatus: true,
      closeStatus: false,
      cancelStatus: false,
    });
    setStatusReasonText("");
    setTeamCheck(false);
    setSupervisorCheck(false);
    setAdvisorCheck(false);
    setProspectCheck(false);
    setCustomerCheck(false);
    setSelfCheck(false);
    setLeadCheck(true);
    setWorksiteCheck(false);
    setLeadValue(e.target.textContent);
  };

  const checkSelfFunc = (e) => {
    setBookEventCheck(true);
    setEventTypeWorksiteSelect("");
    setEventTypeAdvisorSelect("");
    setEventTypeProspectSelect("");
    setEventTypeCustomerSelect("");
    setEventTypeSupervisorSelect("");
    setEventTypeTeamSelect("");
    setEventTypeLeadSelect("");
    setModeSelect("");
    setUnitNameValue("");
    setDurationStartDate();
    setDurationStartDateOperation();
    setDurationEndDate();
    setDurationEndDateOperation();
    setFollowUpOneDate();
    setFollowUpOneDateOperation();
    setFollowUpTwoDate();
    setFollowUpTwoDateOperation();
    setStartTimeSelect("");
    setEndTimeSelect("");
    setTeamMemberChip([]);
    setEventStatus("open");
    setStatusType({
      openStatus: true,
      closeStatus: false,
      cancelStatus: false,
    });
    setStatusReasonText("");
    setSelfCheck(true);
    setAdvisorCheck(false);
    setProspectCheck(false);
    setCustomerCheck(false);
    setSupervisorCheck(false);
    setTeamCheck(false);
    setWorksiteCheck(false);
    setSelfValue(e.target.textContent);
  };

  const unitNameFunc = (e) => {
    setBookEventCheck(true);
    if (e.target.value.startsWith(" ")) {
      message.error("Cannot start from space");
    } else {
      setUnitNameValue(e.target.value);
    }
  };

  const DurationSelectTimeFunc = () => {
    setBookEventCheck(true);
    setEventDurationType("customedatetime");
    setStartTimeSelect("");
    setEndTimeSelect("");
    setDurationStartDate("");
    setDurationEndDate("");
    setDurationStartTimeOperation();
    setDurationEndTimeOperation();
    setDurationButton({
      select_time: true,
      all_day: false,
    });
  };
  const DurationAllDayFunc = () => {
    setBookEventCheck(true);
    setEventDurationType("allday");
    setDurationStartDate("");
    setDurationEndDate("");
    setDurationStartTimeOperation(32400000);
    setDurationEndTimeOperation(61200000);
    setDurationButton({
      select_time: false,
      all_day: true,
    });
  };

  let regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let regMobile = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
  // let regMobile=/^[6-9]\d{9}/;
  const [durationStartDate, setDurationStartDate] = useState("");
  const [durationEndDate, setDurationEndDate] = useState("");
  const [durationStartTime, setDurationStartTime] = useState("");
  const [durationEndTime, setDurationEndTime] = useState("");

  const [followUpOneDate, setFollowUpOneDate] = useState("");
  const [followUpTwoDate, setFollowUpTwoDate] = useState("");
  const [followupEventCheck, setFollowupEventCheck] = useState(false);

  const [durationStartBDateCheck, setDurationStartDateCheck] = useState(true);
  const [durationEndDateCheck, setDurationEndDateCheck] = useState(true);
  const [durationStartTimeCheck, setDurationStartTimeCheck] = useState(true);
  const [durationEndTimeCheck, setDurationEndTimeCheck] = useState(true);
  const [durationStartDateOperation, setDurationStartDateOperation] = useState();
  const [durationEndDateOperation, setDurationEndDateOperation] = useState("");
  const [durationStartTimeOperation, setDurationStartTimeOperation] = useState();
  const [durationEndTimeOperation, setDurationEndTimeOperation] = useState();
  const [durationStartDateHelper, setDurationStartDateHelper] = useState();
  const [durationStartTimeDiffCheck, setDurationStartTimeDiffCheck] = useState(true);
  const [durationEndTimeDiffCheck, setDurationEndTimeDiffCheck] = useState(true);
  const [durationEndTimeSameCheck, setDurationEndTimeSameCheck] = useState(true);
  const [durationStartDateDiffCheck, setDurationStartDateDiffCheck] = useState(true);
  const [durationEndDateDiffCheck, setDurationEndDateDiffCheck] = useState(true);
  const [followUpOneDateOperation, setFollowUpOneDateOperation] = useState();
  const [followUpTwoDateOperation, setFollowUpTwoDateOperation] = useState();

  const [fetchUpcomingArr, setFetchUpcomingArr] = useState([]);
  const [helperUpcomingArr, setHelperUpcomingArr] = useState();
  const [updateStartTime, setUpdateStartTime] = useState();
  const [updateEndTime, setUpdateEndTime] = useState();

  const [fetchStartDate, setFetchStartDate] = useState();
  const [fetchEndDate, setFetchEndDate] = useState();
  const [fetchStartTime, setFetchStartTime] = useState();
  const [fetchEndTime, setFetchEndTime] = useState();
  const [fetchedEventId, setFetchedEventId] = useState();
  const [fetchEventCheck, setFetchEventCheck] = useState(false);

  const [timeList, setTimeList] = useState([
    {
      dispValue: "8:00 AM",
      value: "28800000",
    },
    {
      dispValue: "8:30 AM",
      value: "30600000",
    },
    {
      dispValue: "9:00 AM",
      value: "32400000",
    },
    {
      dispValue: "9:30 AM",
      value: "34200000",
    },
    {
      dispValue: "10:00 AM",
      value: "36000000",
    },
    {
      dispValue: "10:30 AM",
      value: "37800000",
    },
    {
      dispValue: "11:00 AM",
      value: "39600000",
    },
    {
      dispValue: "11:30 AM",
      value: "41400000",
    },
    {
      dispValue: "12:00 PM",
      value: "43200000",
    },
    {
      dispValue: "12:30 PM",
      value: "45000000",
    },
    {
      dispValue: "1:00 PM",
      value: "46800000",
    },
    {
      dispValue: "1:30 PM",
      value: "48600000",
    },
    {
      dispValue: "2:00 PM",
      value: "50400000",
    },
    {
      dispValue: "2:30 PM",
      value: "52200000",
    },
    {
      dispValue: "3:00 PM",
      value: "54000000",
    },
    {
      dispValue: "3:30 PM",
      value: "55800000",
    },
    {
      dispValue: "4:00 PM",
      value: "57600000",
    },
    {
      dispValue: "4:30 PM",
      value: "59400000",
    },
    {
      dispValue: "5:00 PM",
      value: "61200000",
    },
    {
      dispValue: "5:30 PM",
      value: "63000000",
    },
    {
      dispValue: "6:00 PM",
      value: "64800000",
    },
    {
      dispValue: "6:30 PM",
      value: "66600000",
    },
    {
      dispValue: "7:00 PM",
      value: "68400000",
    },
    {
      dispValue: "7:30 PM",
      value: "70200000",
    },
    {
      dispValue: "8:00 PM",
      value: "72000000",
    },
    {
      dispValue: "8:30 PM",
      value: "73800000",
    },
    {
      dispValue: "9:00 PM",
      value: "75600000",
    },
    {
      dispValue: "9:30 PM",
      value: "77400000",
    },
  ]);

  const [eventTypeAdvisorDEFList, setEventTypeAdvisorDEFList] = useState([
    {
      dispValue: "Access Permission",
      value: "Access Permission",
    },
    {
      dispValue: "Influencer Meeting",
      value: "Influencer Meeting",
    },
    {
      dispValue: "Relationship Call",
      value: "Relationship Call",
    },
    {
      dispValue: "Welfare Activities",
      value: "Welfare Activities",
    },
    {
      dispValue: "Marketing Activities",
      value: "Marketing Activities",
    },
    {
      dispValue: "Service Camp",
      value: "Service Camp",
    },
  ]);

  const [eventTypeAdvisorList, setEventTypeAdvisorList] = useState([
    {
      dispValue: "Relationship Call",
      value: "Relationship Call",
    },
    {
      dispValue: "Sales Call",
      value: "Sales Call",
    },
    {
      dispValue: "Quote Generation",
      value: "Quote Generation",
    },
    {
      dispValue: "Lead Generation",
      value: "Lead Generation",
    },
  ]);

  const [eventTypeProspectList, setEventTypeProspectList] = useState([
    {
      dispValue: "Relationship Call",
      value: "Relationship Call",
    },
    {
      dispValue: "Sales Call",
      value: "Sales Call",
    },
    {
      dispValue: "Quote Generation",
      value: "Quote Generation",
    },
    {
      dispValue: "Lead Generation",
      value: "Lead Generation",
    },
  ]);

  const [eventTypeCustomerList, setEventTypeCustomerList] = useState([
    {
      dispValue: "Servicing Request",
      value: "Servicing Request",
    },
    {
      dispValue: "Renewal",
      value: "Renewal",
    },
    {
      dispValue: "Sales Call",
      value: "Sales Call",
    },
    {
      dispValue: "Relationship Call",
      value: "Relationship Call",
    },
    {
      dispValue: "Claim",
      value: "Claim",
    },
    {
      dispValue: "Others",
      value: "Others",
    },
  ]);

  const [eventTypeSupervisorList, setEventTypeSupervisorList] = useState([
    {
      dispValue: "Business Planning",
      value: "Business Planning",
    },
    {
      dispValue: "Business Review",
      value: "Business Review",
    },
    {
      dispValue: "Training",
      value: "Training",
    },
    {
      dispValue: "Team Building Activity",
      value: "Team Building Activity",
    },
    {
      dispValue: "Joint Field Visit",
      value: "Joint Field Visit",
    },
    {
      dispValue: "Sales Campaign",
      value: "Sales Campaign",
    },
    {
      dispValue: "Coaching",
      value: "Coaching",
    },
    {
      dispValue: "Kick-off",
      value: "Kick-off",
    },
    {
      dispValue: "Celebrating Wins",
      value: "Celebrating Wins",
    },
    {
      dispValue: "Celebrating Milestones",
      value: "Celebrating Milestones",
    },
    {
      dispValue: "Recruitment",
      value: "Recruitment",
    },
  ]);

  const [eventTypeTeamList, setEventTypeTeamList] = useState([
    {
      dispValue: "Business Planning",
      value: "Business Planning",
    },
    {
      dispValue: "Business Review",
      value: "Business Review",
    },
    {
      dispValue: "Training",
      value: "Training",
    },
    {
      dispValue: "Team Building Activity",
      value: "Team Building Activity",
    },
    {
      dispValue: "Joint Field Visit",
      value: "Joint Field Visit",
    },
    {
      dispValue: "Sales Campaign",
      value: "Sales Campaign",
    },
    {
      dispValue: "Coaching",
      value: "Coaching",
    },
    {
      dispValue: "Kick-off",
      value: "Kick-off",
    },
    {
      dispValue: "Celebrating Wins",
      value: "Celebrating Wins",
    },
    {
      dispValue: "Celebrating Milestones",
      value: "Celebrating Milestones",
    },
    {
      dispValue: "Recruitment",
      value: "Recruitment",
    },
  ]);

  const [eventTypeLeadList, setEventTypeLeadList] = useState([
    {
      dispValue: "Prospecting",
      value: "Prospecting",
    },
    {
      dispValue: "Qualifying/Costing",
      value: "Qualifying/Costing",
    },
    {
      dispValue: "Data Gathering",
      value: "Data Gathering",
    },
    {
      dispValue: "Proposal",
      value: "Proposal",
    },
    {
      dispValue: "Find Leads",
      value: "Find Leads",
    },
    {
      dispValue: "Connect",
      value: "Connect",
    },
    {
      dispValue: "Convert",
      value: "Convert",
    },
    {
      dispValue: "Recruitment",
      value: "Recruitment",
    },
  ]);

  const [eventTypeSelfList, setEventTypeSelfList] = useState([
    {
      dispValue: "Self",
      value: "Self",
    },
  ]);

  const [eventTypeWorksiteList, setEventTypeWorksiteList] = useState([
    {
      dispValue: "Unit Presentation",
      value: "Unit Presentation",
    },
  ]);

  const [modeList, setModeList] = useState([
    {
      dispValue: "Digital",
      value: "digital",
    },
    {
      dispValue: "In-person",
      value: "in-person",
    },
  ]);

  const [eventTypeWorksiteSelect, setEventTypeWorksiteSelect] = useState("");
  const [eventTypeAdvisorSelect, setEventTypeAdvisorSelect] = useState("");
  const [eventTypeProspectSelect, setEventTypeProspectSelect] = useState("");
  const [eventTypeCustomerSelect, setEventTypeCustomerSelect] = useState("");
  const [eventTypeSupervisorSelect, setEventTypeSupervisorSelect] = useState("");
  const [eventTypeTeamSelect, setEventTypeTeamSelect] = useState("");
  const [eventTypeLeadSelect, setEventTypeLeadSelect] = useState("");
  const [eventTypeSelfSelect, setEventTypeSelfSelect] = useState("");

  const [modeSelect, setModeSelect] = useState("");
  const [startTimeSelect, setStartTimeSelect] = useState("");
  const [endTimeSelect, setEndTimeSelect] = useState("");
  const [durationDateAlert, setDurationDateAlert] = useState(false);
  const [durationTimeAlert, setDurationTimeAlert] = useState(false);
  const [durationendTimeAlert, setDurationEndTimeAlert] = useState(false);
  const [durationenddateAlert, setDurationEndDateAlert] = useState(false);
  const [durationModeAlert, setDurationModeAlert] = useState(false);
  const [cardHeight, setCardHeight] = useState(true);
  const [prospectFirstNameText, setProspectFirstNameText] = useState("");
  const [prospectLastNameText, setProspectLastNameText] = useState("");
  const [prospectEmailAddressText, setProspectEmailAddressText] = useState("");
  const [prospectMobileNoText, setProspectMobileNoText] = useState("");
  const [prospectFirstNameCheck, setProspectFirstNameCheck] = useState(true);
  const [prospectLastNameCheck, setProspectLastNameCheck] = useState(true);
  const [prospectEmailAddressCheck, setProspectEmailAddressCheck] = useState(true);
  const [prospectMobileNoCheck, setProspectMobileNoCheck] = useState(true);
  const [prospectEmailRegCheck, setProspectEmailRegCheck] = useState(true);
  const [prospectMobileRegCheck, setProspectMobileRegCheck] = useState(true);
  const [addManuallyButtonCheck, setAddManuallyButtonCheck] = useState(false);
  const [customerNameText, setCustomerNameText] = useState("");
  const [customerMobileNoText, setCustomerMobileNoText] = useState("");
  const [customerNameCheck, setCustomerNameCheck] = useState(true);
  const [customerMobileNoCheck, setCustomerMobileNoCheck] = useState(true);
  const [customermblvalid, setCustomerMblValid] = useState(true);
  const [customerArr, setCustomerArr] = useState([]);
  const [customerHelperArr, setCustomerHelperArr] = useState([]);
  const [customerTagVisible, setCustomerTagVisible] = useState(false);
  const [customerOnClickVal, setCustomerOnClickVal] = useState();
  const [searchCustomerArr, setSearchCustomerArr] = useState([]);
  const [searchCustomerObject, setSearchCustomerObject] = useState();
  const [searchCustomerText, setSearchCustomerText] = useState("");
  const [customerOnClickCheck, setCustomerOnClickCheck] = useState(false);
  const [searchAdvisorText, setSearchAdvisorText] = useState("");
  const [advisorOnClickCheck, setAdvisorOnClickCheck] = useState(false);
  const [advisorArr, setAdvisorArr] = useState([]);
  const [advisorHelperArr, setAdvisorHelperArr] = useState([]);
  const [advisorTagVisible, setAdvisorTagVisible] = useState(false);
  const [advisorOnClickVal, setAdvisorOnClickVal] = useState();
  const [searchAdvisorArr, setSearchAdvisorArr] = useState([]);
  const [searchAdvisorObject, setSearchAdvisorObject] = useState();
  const [searchProspectArr, setSearchProspectArr] = useState([]);
  const [searchProspectObject, setSearchProspectObject] = useState();
  const [prospectArr, setProspectArr] = useState([]);
  const [prospectHelperArr, setProspectHelperArr] = useState([]);
  const [prospectTagVisible, setProspectTagVisible] = useState(false);
  const [prospectOnClickVal, setProspectOnClickVal] = useState();
  const [searchProspectText, setSearchProspectText] = useState("");
  const [prospectOnClickCheck, setProspectOnClickCheck] = useState(false);
  const [bookEventCheck, setBookEventCheck] = useState(true);
  const [updateEventCheck, setUpdateCheckEvent] = useState(false);
  const [updateEventId, setUpdateEventId] = useState();
  const [eventLoadCheck, setEventLoadCheck] = useState(false);
  const [eventBookCheck, setEventBookCheck] = useState("");
  const [updateEventType, setUpdateEventType] = useState("");
  const [appointmentTypeFetched, setAppointmentTypeFetched] = useState();
  const [eventTypeFetched, setEventTypeFetched] = useState();
  const [eventStatus, setEventStatus] = useState("");
  const [statusReasonText, setStatusReasonText] = useState("");
  const [manualCustomerCheck, setManualCustomerCheck] = useState(false);
  const [addCustTagVisible, setAddCustTagVisible] = useState(true);
  const [eventDurationType, setEventDurationType] = useState("customedatetime");
  const [countOfParticipants, setCountOfParticipants] = useState("");
  const [searchTeamArr, setSearchTeamArr] = useState([]);
  const [searchTeamObject, setSearchTeamObject] = useState();
  const [teamArr, setTeamArr] = useState([]);
  const [teamHelperArr, setTeamHelperArr] = useState([]);
  const [teamTagVisible, setTeamTagVisible] = useState(false);
  const [teamOnClickVal, setTeamOnClickVal] = useState();
  const [searchTeamText, setSearchTeamText] = useState("");
  const [teamOnClickCheck, setTeamOnClickCheck] = useState(false);
  const minimumDate = moment().format("MM-DD-YYYY");

  const [userIdfetched, setUserIdFetched] = useState(stoageGetter("user").id);

  const [uploadAttendanveValue, setUploadAttendanveValue] = useState();

  const handleUploadInput = (e) => {
    setBookEventCheck(true);

    setUploadAttendanveValue(e.target.files[0]);
  };

  const [fetchEventArray, setFetchEventArray] = useState([]);
  const [fetchEventObject, setFetchEventObject] = useState();
  const [editStartTime, setEditStartTime] = useState("");
  const [editStartDisp, setEditStartDisp] = useState("");
  const [editEndDisp, setEditEndDisp] = useState("");
  const [editEndTime, setEditEndTime] = useState("");

  const AdvisorClickedTag = (id, value) => {
    setAdvisorOnClickVal(value);

    searchAdvisorArr.map((item) => {
      if (item._id == id) {
        setSearchAdvisorObject(item);
      }
    });

    setAdvisorTagVisible(true);
    setAdvisorOnClickCheck(false);
  };
  const AdvisorTagCloseFunc = () => {
    setAdvisorTagVisible(false);
  };
  const searchAdvisorTextFunc = (e) => {
    setSearchAdvisorText(e.target.value);
    setAdvisorOnClickCheck(false);
    if (searchAdvisorText == "") {
      setAdvisorArr(advisorHelperArr);
    }
  };

  const searchAdvisorFunc = () => {
    setAdvisorOnClickCheck(true);
    axios
      .get(`https://sdtatadevlmsv2.iorta.in/auth/user/search/partners?csmId=616e908c43ed727bbac8d2d4&search=${searchAdvisorText}`)
      // axios.get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setSearchAdvisorArr(res.data.data);
        if (searchAdvisorText !== "") {
          setAdvisorArr(res.data.data.filter((i) => Object.values(i).join(" ").toLowerCase().includes(searchAdvisorText.toLowerCase())));
        } else {
          setAdvisorArr(res.data.data);
        }

        setAdvisorHelperArr(res.data);
      })
      .catch((err) => { });
  };

  // useEffect(()=>{
  //   if(updateEventCheck){
  //     onSelectTeam()
  //   }
  // },[ownerCollectn, teamMemberChip])

  const onSelectTeam = (value, data) => {
    setBookEventCheck(true);

    setTeamMemberData("");

    if (bookEventCheck == true) {
      setTeamMemberData("");
      let _data = [...new Set([...teamMemberChip, value])];
      let _finalData = _data.filter((ele) => ele != undefined);
      setTeamMemberChip(_finalData);
    }

    if (updateEventCheck == true) {
      setTeamMemberData("");
      let newTeamMemberChip = [...teamMemberChip, data];

      const MAPteamMemberChip = newTeamMemberChip.map((ele) => ele.value);
      const FILTERteamMemberChip = newTeamMemberChip.filter(({ value }, index) => !MAPteamMemberChip.includes(value, index + 1));

      setTeamMemberChip(FILTERteamMemberChip);
    }
  };

  const onChangeTeam = (text, data) => {
    setTeamMemberData(text);
    let newArray = [...ownerCollectn, data];
    let _OwnerData = newArray.filter((value) => Object.keys(value).length !== 0);
    const MAPownerData = newArray.map((ele) => ele.value);
    const FILTERownerData = _OwnerData.filter(({ value }, index) => !MAPownerData.includes(value, index + 1));

    setOwnerCollectn(FILTERownerData);
  };

  const removeTeamMember = (data, ind) => {
    let _arrayOwner = ownerCollectn.filter((item, index) => item.value !== data);

    setOwnerCollectn(_arrayOwner);
    let _array = teamMemberChip.filter((item, index) => index !== ind);
    setTeamMemberChip(_array);
  };

  const searchCustomer = (e) => {
    setCustomerOnClickCheck(true);
    axios
      .get(`https://sdtatadevlmsv2.iorta.in/auth/user/search/customers?csmId=616e908c43ed727bbac8d2d4&search=${searchCustomerText}`)
      // axios.get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setSearchCustomerArr(res.data.data);
        if (searchCustomerText !== "") {
          setCustomerArr(res.data.data.filter((i) => Object.values(i).join(" ").toLowerCase().includes(searchCustomerText.toLowerCase())));
        } else {
          setCustomerArr(res.data.data);
        }
        // setCustomerArr(res.data.data.filter((i)=> (Object.values(i)
        // .join(" ").toLowerCase().includes(searchCustomerText.toLowerCase()))))
        setCustomerHelperArr(res.data);
      })
      .catch((err) => { });
    // setCustomerArr(customerArr.sort( (a, b) => a.name.localeCompare(b.name, 'fr', {ignorePunctuation: true})))
  };

  const CustomerClickedTag = (id, value) => {
    setCustomerOnClickVal(value);
    searchCustomerArr.map((item) => {
      if (item._id == id) {
        setSearchCustomerObject(item);
      }
    });
    setCustomerTagVisible(true);
    setCustomerOnClickVal(false);
  };
  const CustomerTagCloseFunc = () => {
    setCustomerTagVisible(false);
  };
  const searchCustomerTextFunc = (e) => {
    setSearchCustomerText(e.target.value);
    setCustomerOnClickCheck(false);
    if (searchCustomerText == "") {
      setCustomerArr(customerHelperArr);
    }
  };

  const AddCustomerTag = (value) => { };
  const AddCustomerCloseFunc = () => { };

  const ProspectClickedTag = (id, value) => {
    setProspectOnClickVal(value);

    searchProspectArr.map((item) => {
      if (item._id == id) {
        setSearchProspectObject(item);
      }
    });
    setProspectTagVisible(true);
    setProspectOnClickCheck(false);
  };
  const ProspectTagCloseFunc = () => {
    setProspectTagVisible(false);
  };
  const searchProspect = (e) => {
    setProspectOnClickCheck(true);
    axios
      .get(`https://sdtatadevlmsv2.iorta.in/auth/user/search/prospects?csmId=616e908c43ed727bbac8d2d4&search=${searchProspectText}`)
      // axios.get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setSearchProspectArr(res.data.data);
        if (searchProspectText !== "") {
          setProspectArr(res.data.data.filter((i) => Object.values(i).join(" ").toLowerCase().includes(searchProspectText.toLowerCase())));
        } else {
          setProspectArr(res.data.data);
        }
        // setCustomerArr(res.data.data.filter((i)=> (Object.values(i)
        // .join(" ").toLowerCase().includes(searchCustomerText.toLowerCase()))))
        setProspectHelperArr(res.data);
      })
      .catch((err) => { }, [prospectArr]);
    // setCustomerArr(customerArr.sort( (a, b) => a.name.localeCompare(b.name, 'fr', {ignorePunctuation: true})))
  };

  let setURL;
  let URL = window.location.href;
  let webURL = "pramerica.salesdrive.app";
  if (URL.includes(webURL)) {
    setURL = true;
  } else {
    setURL = false;
  }

  const searchProspectTextFunc = (e) => {
    setSearchProspectText(e.target.value);
    setProspectOnClickCheck(false);
    if (searchProspectText == "") {
      setProspectArr(prospectHelperArr);
    }
  };

  const AddManuallyFunc = () => {
    setAddManuallyButtonCheck(true);
  };

  const CustomerNameFunc = (e) => {
    setCustomerNameText(e.target.value);

    if (e.target.value.length > 0) {
      setCustomerNameCheck(true);
    } else {
      setCustomerNameCheck(false);
    }
    // if (customerMobileNoText.length < 10) {
    //   setCustomerMobileNoCheck(false)
    // }
  };
  const CustomerMobileNoFunc = (e) => {
    // setCustomerMobileNoCheck(true)
    // if (customerNameText == "" ) {
    //   setCustomerNameCheck(false)
    // }

    if (e.target.value.length > 0) {
      setCustomerMobileNoCheck(true);
    }
    if (e.target.value.length < 11) {
      setCustomerMblValid(false);
      setCustomerMobileNoText(e.target.value);
    }

    if (e.target.value > 0 && e.target.value.length < 10) {
      setCustomerMblValid(false);
    } else {
      setCustomerMblValid(true);
    }
  };
  const ManualCustomerSubmitFunc = (e) => {
    if (customerMobileNoText == "" && customerNameText == "") {
      setCustomerMobileNoCheck(false);
      setCustomerNameCheck(false);
    } else if (customerMobileNoText == "") {
      setCustomerMobileNoCheck(false);
    } else if (customerNameText == "") {
      setCustomerNameCheck(false);
    } else {
      setManualCustomerCheck(true);
      setCustomerMobileNoCheck(true);
      setCustomerNameCheck(true);

      // setCustomerMobileNoText("")
      // setCustomerNameText("")
    }
  };
  const AddCustomerTagVisibleFunc = () => {
    setAddCustTagVisible(false);
    setManualCustomerCheck(false);
    setCustomerNameText("");
    setCustomerMobileNoText("");
  };

  const ProspectFirstNameFunc = (e) => {
    setProspectFirstNameText(e.target.value);
    setProspectFirstNameCheck(true);
    if (prospectLastNameText == "") {
      setProspectLastNameCheck(false);
    }
    if (prospectEmailAddressText == "") {
      setProspectEmailAddressCheck(false);
    }
    if (prospectMobileNoText == "") {
      setProspectMobileNoCheck(false);
    }
    if (regEmail.test(prospectEmailAddressText) == false) {
      setProspectEmailRegCheck(false);
    }

    if (regMobile.test(prospectMobileNoText) == false) {
      setProspectMobileRegCheck(false);
    }
  };

  const ProspectLastNameFunc = (e) => {
    setProspectLastNameText(e.target.value);
    setProspectLastNameCheck(true);
    if (prospectFirstNameText == "") {
      setProspectFirstNameCheck(false);
    }
    if (prospectEmailAddressText == "") {
      setProspectEmailAddressCheck(false);
    }
    if (prospectMobileNoText == "") {
      setProspectMobileNoCheck(false);
    }

    if (regEmail.test(prospectEmailAddressText) == false) {
      setProspectEmailRegCheck(false);
    }

    if (regMobile.test(prospectMobileNoText) == false) {
      setProspectMobileRegCheck(false);
    }
  };

  const ProspectEmailAddressFunc = (e) => {
    // if (reg.test(e.target.value) == false)
    // {
    //     // return false;
    // }
    setProspectEmailAddressText(e.target.value);
    setProspectEmailAddressCheck(true);
    if (prospectFirstNameText == "") {
      setProspectFirstNameCheck(false);
    }
    if (prospectLastNameText == "") {
      setProspectLastNameText(false);
    }
    if (prospectMobileNoText == "") {
      setProspectMobileNoCheck(false);
    }
    if (regEmail.test(e.target.value) == true) {
      setProspectEmailRegCheck(true);
    }
    if (regMobile.test(prospectMobileNoText) == false) {
      setProspectMobileRegCheck(false);
    }
  };
  const ProspectMobileNoFunc = (e) => {
    setProspectMobileNoText(e.target.value);
    setProspectMobileNoCheck(true);
    if (prospectFirstNameText == "") {
      setProspectFirstNameCheck(false);
    }
    if (prospectLastNameText == "") {
      setProspectLastNameText(false);
    }
    if (prospectEmailAddressText == "") {
      setProspectEmailAddressCheck(false);
    }
    if (regMobile.test(e.target.value) == true) {
      setProspectMobileRegCheck(true);
    }
    if (regEmail.test(prospectEmailAddressText) == false) {
      setProspectEmailRegCheck(false);
    }
  };
  const searchTeamTextFunc = (e) => {
    axios
      .get(`https://sdtatadevlmsv2.iorta.in/auth/user/getTeam?agentCode=616e908c43ed727bbac8d2d4`)

      .then((res) => {
        setSearchTeamArr(res.data.data);
        if (searchTeamText !== "" && searchTeamText.length >= 3) {
          setTeamArr(res.data.data.filter((i) => Object.values(i).join(" ").toLowerCase().includes(searchTeamText.toLowerCase())));
        } else {
          setTeamArr(res.data.data);
        }

        setTeamHelperArr(res.data);
      })
      .catch((err) => { });

    setSearchTeamText(e.target.value);
  };

  const TeamTagCloseFunc = () => {
    setTeamTagVisible(false);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const StartDateFunc = (date, dateString) => {
    console.log("date check-1 _________", date)
    setBookEventCheck(true);

    setDurationStartDate(moment(date));
    setDurationEndDate(moment(date));

    if (worksiteCheck) {
      // if(updateEventCheck){
      // setFollowUpOneDate(props.Data.follow_UpEvent_1_start_date)
      // setFollowUpTwoDate(props.Data.follow_UpEvent_2_start_date)

      // FollowUpOneDateFunc(props.Data.follow_UpEvent_1_start_date)
      // FollowUpTwoDateFunc(props.Data.follow_UpEvent_2_start_date)
      // }
      // else if(!updateEventCheck){
      setFollowUpOneDate(moment(date).add(1, "days"));
      setFollowUpTwoDate(moment(date).add(2, "days"));

      FollowUpOneDateFunc(moment(date).add(1, "days"));
      FollowUpTwoDateFunc(moment(date).add(2, "days"));
      // }
    }
    setDurationEndDateDiffCheck(true);

    const momentdate = moment(date).unix() * 1000;
    setDurationStartDateOperation(momentdate);
    setDurationEndDateOperation(momentdate);
    setDurationDateAlert(false);
  };

  const allDayStartDate = (date, dateString) => {
    setDurationStartDate(moment(date));
    setDurationEndDate(moment(date));

    if (worksiteCheck == true) {
      setFollowUpOneDate(moment(date).add(1, "days"));
      setFollowUpTwoDate(moment(date).add(2, "days"));

      FollowUpOneDateFunc(moment(date).add(1, "days"));
      FollowUpTwoDateFunc(moment(date).add(2, "days"));
    }

    setDurationEndDateDiffCheck(true);

    let ms_date = new Date(date).setUTCHours(0, 0, 0, 0);

    setDurationStartDateOperation(ms_date);
    setDurationEndDateOperation(ms_date);

    setDurationDateAlert(false);
  };

  const EndDateFunc = (e, date, dateString) => {
    setBookEventCheck(true);

    setDurationEndDate(moment(date));

    if (worksiteCheck) {
      // if(updateEventCheck){
      // setFollowUpOneDate(props.Data.follow_UpEvent_1_start_date)
      // setFollowUpTwoDate(props.Data.follow_UpEvent_2_start_date)

      // FollowUpOneDateFunc(props.Data.follow_UpEvent_1_start_date)
      // FollowUpTwoDateFunc(props.Data.follow_UpEvent_2_start_date)
      // }
      // else if(!updateEventCheck){
      setFollowUpOneDate(moment(date).add(1, "days"));
      setFollowUpTwoDate(moment(date).add(2, "days"));

      FollowUpOneDateFunc(moment(date).add(1, "days"));
      FollowUpTwoDateFunc(moment(date).add(2, "days"));
      // }
    }

    const ms_date = moment(date).unix() * 1000;
    if (ms_date < durationStartDateOperation) {
      setDurationEndDateDiffCheck(false);
      return false;
    } else {
      setDurationEndDateDiffCheck(true);
    }
    setDurationEndDateOperation(ms_date);

    if (endTimeSelect < startTimeSelect && startTimeSelect != "" && ms_date <= durationStartDateOperation) {
      setDurationEndTimeDiffCheck(false);
    } else {
      setDurationEndTimeDiffCheck(true);
    }

    if (endTimeSelect < startTimeSelect && ms_date <= durationStartDateOperation) {
      setDurationStartTimeDiffCheck(false);
    } else {
      setDurationStartTimeDiffCheck(true);
    }

    setDurationDateAlert(false);
  };

  const FollowUpOneDateFunc = (date, dateString) => {
    setBookEventCheck(true);
    setFollowUpOneDate(moment(date));
    const momentdate = moment(date).unix() * 1000;
    setFollowUpOneDateOperation(momentdate);

    if (worksiteCheck) {
      // if(updateEventCheck){
      // setFollowUpTwoDate(props.Data.follow_UpEvent_2_start_date)

      // FollowUpTwoDateFunc(props.Data.follow_UpEvent_2_start_date)
      // }
      // else if(!updateEventCheck){
      setFollowUpTwoDate(moment(date).add(1, "days"));

      FollowUpTwoDateFunc(moment(date).add(1, "days"));
      // }
    }
  };

  const FollowUpTwoDateFunc = (date, dateString) => {
    setBookEventCheck(true);

    setFollowUpTwoDate(moment(date));
    const momentdate = moment(date).unix() * 1000;
    setFollowUpTwoDateOperation(momentdate);
  };

  const EventTypeWorksiteChangeFunc = (e) => {
    setBookEventCheck(true);
    setEventTypeWorksiteSelect(e.target.value);
  };
  const EventTypeAdvisorChangeFunc = (e) => {
    setBookEventCheck(true);
    setEventTypeAdvisorSelect(e.target.value);
  };
  const EventTypeProspectChangeFunc = (e) => {
    setBookEventCheck(true);
    setEventTypeProspectSelect(e.target.value);
  };
  const EventTypeCustomerChangeFunc = (e) => {
    setBookEventCheck(true);
    setEventTypeCustomerSelect(e.target.value);
  };
  const EventTypeSupervisorChangeFunc = (e) => {
    setBookEventCheck(true);
    setEventTypeSupervisorSelect(e.target.value);
  };
  const EventTypeTeamChangeFunc = (e) => {
    setBookEventCheck(true);
    setEventTypeTeamSelect(e.target.value);
  };
  const EventTypeLeadChangeFunc = (e) => {
    setBookEventCheck(true);
    setEventTypeLeadSelect(e.target.value);
  };
  const EventTypeSelfChangeFunc = (e) => {
    setBookEventCheck(true);
    setEventTypeSelfSelect(e.target.value);
  };

  const ModeChangeFunc = (e) => {
    setBookEventCheck(true);
    setModeSelect(e.target.value);
  };

  const StartTimeChangeFunc = (e) => {
    setBookEventCheck(true);

    setStartTimeSelect(e.target.value);

    setDurationStartTimeCheck(true);
    let parseTime = parseInt(e.target.value);
    setDurationStartTimeOperation(parseTime);
    let timeDiff = e.target.value;
    setDurationEndTimeCheck(true);
    setEndTimeSelect(+timeDiff + +"3600000");

    setEndTimeSelect(+timeDiff + +"3600000");

    let parseTimeCondition = parseInt();
    setDurationEndTimeCheck(true);
    let endparseTime = parseInt(+timeDiff + +"3600000");
    setDurationEndTimeOperation(endparseTime);

    // if(((e.target.value)>=endTimeSelect)&&endTimeSelect!=""){
    //     setDurationStartTimeDiffCheck(false)
    //         }

    //     setStartTimeSelect(e.target.value)
    //     setDurationStartTimeCheck(true)
    //     let parseTime=parseInt(e.target.value)
    //     setDurationStartTimeOperation(parseTime)
    // let timeDiff=e.target.value
    // if(endTimeSelect==""){
    //   setEndTimeSelect((+timeDiff)+(+"3600000"))
    //   let parseTimeCondition=parseInt()
    //   setDurationEndTimeCheck(true)
    //   let parseTime=parseInt((+timeDiff)+(+"3600000"))
    //   setDurationEndTimeOperation(parseTime)
    // }
    // if(((e.target.value)>=endTimeSelect)&&endTimeSelect!=""){
    //   setDurationStartTimeDiffCheck(false)
    //       }
    //       else if(((e.target.value)>=endTimeSelect)){
    //         setDurationStartTimeDiffCheck(false)
    //       }
    //       else{
    //         setDurationStartTimeDiffCheck(true)
    //       }
  };
  const EndTimeChangeFunc = (e) => {
    setBookEventCheck(true);

    setEndTimeSelect(e.target.value);
    setDurationEndTimeCheck(true);
    let parseTime = parseInt(e.target.value);
    setDurationEndTimeOperation(parseTime);
    let timeDiff = e.target.value;
    if (e.target.value == startTimeSelect && startTimeSelect != "") {
      setDurationEndTimeSameCheck(false);
    } else if (e.target.value < startTimeSelect && durationEndDateOperation <= durationStartDateOperation) {
      setDurationStartTimeDiffCheck(false);
    } else {
      setDurationStartTimeDiffCheck(true);
      setDurationEndTimeSameCheck(true);
    }
    if (e.target.value < startTimeSelect && startTimeSelect != "" && durationEndDateOperation <= durationStartDateOperation) {
      setDurationEndTimeDiffCheck(false);
    } else {
      setDurationEndTimeDiffCheck(true);
    }
    if (startTimeSelect == "") {
      setStartTimeSelect(+timeDiff - +"36000000");
      let parseTime = parseInt(+timeDiff - +"36000000");

      setDurationStartTimeOperation(parseTime);
      setDurationStartTimeCheck(true);
    }
  };
  const StartTimeFunc = (time, timeString) => {
    setDurationStartTime(time);
    setDurationStartTimeOperation(timeString);
    let d = new Date();

    if (time > durationEndTime) {
      setDurationEndTime(moment(time).add(1, "hours"));
      // setDurationEndTimeOperation(timeString,"HH:mm:ss")

      // setDurationEndTimeOperation(moment(time).add(1, 'hours').format("H:m:ss z"))
    }
    if (durationEndTime == "") {
      setDurationEndTime(moment(time).add(1, "hours"));
      // setDurationEndTimeOperation(moment(timeString).format("HH:mm:ss.SSSZZ"))
      setDurationEndTimeOperation(moment(time).add(1, "hours").format("HH:mm:ss z"));
    }
    setDurationTimeAlert(false);
  };

  const EndTimeFunc = (time, timeString) => {
    let abc = new Date(time);
    let hours = ("0" + abc.getHours()).slice(-2);
    let minutes = ("0" + abc.getMinutes()).slice(-2);
    let seconds = ("0" + abc.getSeconds()).slice(-2);
    let compTime = hours + minutes + seconds;
    setDurationEndTime(time);

    setDurationEndTimeOperation(moment(time).format("HH:mm:ss"));

    if (time < durationStartTime) {
      setDurationStartTime(moment(time).subtract(1, "hours"));

      setDurationStartTimeOperation(moment(timeString).format("HH:mm:ss z"));
    }
    if (durationStartTime == "") {
      setDurationStartTime(moment(time).subtract(1, "hours"));
      setDurationEndTimeCheck(true);
      setDurationStartTimeOperation(moment(time).subtract(1, "hours").format("HH:mm:ss z"));

      // setDurationStartTimeOperation(moment(time).subtract(1, 'hours').format("H:m:ss z"))
    }
    setDurationStartTimeCheck(true);
    setDurationTimeAlert(false);

    // setDurationEndTime(moment(time))

    // setDurationEndTimeOperation(timeString,"H:mm:ss")
    //     if(time<durationStartTime){
    //       setDurationStartTime(moment(time).subtract(1, 'hours'))
    //       setDurationStartTimeOperation(moment(time).subtract(1, 'hours').format("T H:mm:ss z"))
    //     }
    // //  if(durationEndTime<time){
    // //   setDurationStartTime(moment(time).subtract(1, 'hours'))
    // //   setDurationStartTimeOperation(moment(time).subtract(1, 'hours').format("T H:mm:ss z"))
    // // }
    //     if (durationStartTime == "") {
    //       setDurationStartTime(moment(time).subtract(1, 'hours'))
    //       setDurationStartTimeOperation(moment(time).subtract(1, 'hours').format("T H:mm:ss z"))
    //     }
    //     setDurationTimeAlert(false)
  };

  useEffect(() => {
    if (!BookAppointmentFunc) {
      BookAppointmentFunc();
    }
  }, []);

  const uploadHostPostFunc = async (id) => {
    let formData = new FormData();
    formData.append("media_upload", uploadAttendanveValue);

    const uploadResult = await axios({
      method: "post",
      url: baseURL + `secure/user/uploads/leads/bulk/${userIdfetched}?userType=user&channelId=${channel_ID}&appointmentId=${id}&isCreate=1`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: "Bearer " + _store?.login?.token,
      },
    })
      .then(async (res) => {
        message.success("Event Created successfully");
        message.success(res?.data?.data.message);
        setTimeout(() => {
          window.location.reload(true);
        }, 3000);
      })
      .catch(async (err) => {
        message.error(err?.response?.data?.data);
        message.error("Event Creation Unsuccessful");
        // setTimeout(() => {
        //   window.location.reload(true);
        // }, 3000);
      });
  };

  const putOrUpdateAppointmentFunc = async (res) => {
    const start_date = convertToIndianTimezone(durationStartDateOperation, true);
    const end_date = convertToIndianTimezone(durationEndDateOperation, true);
    const followup_1_date = convertToIndianTimezone(followUpOneDateOperation, true);
    const followup_2_date = convertToIndianTimezone(followUpTwoDateOperation, true);
    let updateResult = await axiosRequest.put(
      `user/updateAppointment`,
      {
        userId: stoageGetter("user").id,
        appointment_type: props.Data.appointment_type,
        event_type: props.Data.event_type,
        eventHeldUnitName: props.Data.eventHeldUnitName,
        // mode : worksiteCheck == true ? 'Call' : modeSelect ,
        mode: worksiteCheck == true ? "digital" : modeSelect,
        durationType: eventDurationType,
        start_date: start_date,
        start_time: durationStartTimeOperation,
        end_date: end_date,
        end_time: worksiteCheck ? 61200000 : durationEndTimeOperation,
        followup_1_date: followup_1_date,
        followup_2_date: followup_2_date,
        teamMember: teamMemberChip,
        teamMember_clone: [],
        statusType: eventStatus || "open",
        statusreason: statusReasonText,
        eventAttendeeCount: res?.data?.data.eventAttendeeCount ? res?.data?.data.eventAttendeeCount : countOfParticipants,
        Appointment_id: Appointmentid,
        city: cityProvinceName,
        cityCode: cityProvince,
        stateCode: stateProvince,
        state: stateProvinceName,
      },
      { secure: true }
    );

    props.setIsModalVisible(false);

    if (updateResult.length !== 0) {
      if (props.api != undefined) {
        props.api(thisMonth);
      }
      if (props.getdata != undefined) {
        props.getdata(true);
      }
      props.setIsModalVisible(false);
    }
    // setTimeout(() => {
    //   window.location.reload(true);
    // }, 3000);
  };

  const uploadHostPutFunc = async (id) => {
    if (worksiteCheck == true && statusType.closeStatus == true && props?.Data?.is_main_Event === true) {
      let formData = new FormData();
      formData.append("media_upload", uploadAttendanveValue);

      const uploadPutResult = await axios({
        method: "post",
        url: baseURL + `secure/user/uploads/leads/bulk/${userIdfetched}?userType=user&channelId=${channel_ID}&appointmentId=${id}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "Bearer " + _store?.login?.token,
        },
      })
        .then(async (res) => {
          message.success(res?.data?.data.message);
          putOrUpdateAppointmentFunc(res);
        })
        .catch(async (err) => {
          let errCode = err?.response?.data?.statusCode;
          if (errCode === 11236) {
            message.error(err?.response?.data?.data);
            props.setIsModalVisible(false);
          } else {
            message.error(err?.response?.data?.data);
            putOrUpdateAppointmentFunc();
          }
        });
    } else {
      putOrUpdateAppointmentFunc();
    }
  };

  const newEvent = () => {
    if (pathname === "/iCare-Dashboard") {
      props?.myFunction();
    }
  };
  const BookAppointmentFunc = async (e) => {
    if (updateEventCheck == true) {
      if (worksiteCheck == true && eventTypeWorksiteSelect == "") {
        message.warning("Event Type is Mandatory");
      } else if (advisorCheck == true && eventTypeAdvisorSelect == "") {
        message.warning("Event Type is Mandatory");
      } else if (prospectCheck == true && eventTypeProspectSelect == "") {
        message.warning("Event Type is Mandatory");
      } else if (customerCheck == true && eventTypeCustomerSelect == "") {
        message.warning("Event Type is Mandatory");
      } else if (supervisorCheck == true && eventTypeSupervisorSelect == "") {
        message.warning("Event Type is Mandatory");
      } else if (teamCheck == true && eventTypeTeamSelect == "") {
        message.warning("Event Type is Mandatory");
      } else if (selfCheck == true && eventTypeSelfSelect == "") {
        message.warning("Event Type is Mandatory");
      }
      // else if (eventDurationType=='customedatetime' &&
      // durationEndDate >= props.Data.follow_UpEvent_1_start_date &&
      // durationEndDate >= props.Data.follow_UpEvent_2_start_date){
      //   message.warning('Follow Up Dates should not be less than End date');
      // }else if (eventDurationType=='allday' &&
      // durationStartDate >= props.Data.follow_UpEvent_1_start_date &&
      // durationStartDate >= props.Data.follow_UpEvent_2_start_date){
      //   message.warning('Follow Up Dates should not be less than Start date');
      // }
      // else if (followUpOneDateOperation >= props.Data.follow_UpEvent_2_start_date){
      //   message.warning('Invalid Follow Up Dates');
      // }else if (props.Data.follow_UpEvent_1_start_date >= followUpTwoDateOperation){
      //   message.warning('Invalid Follow Up Dates');
      // }
      else if (worksiteCheck == true && teamMemberChip.length < 1) {
        message.warning("Team Member is Mandatory");
      } else if (eventStatus == undefined || "") {
        message.warning("Status is Mandatory");
      } else if ((statusType.closeStatus == true && props.Data.followup_1 == false && props.Data.followup_2 == false && worksiteCheck == true && uploadAttendanveValue == undefined) || "") {
        message.warning("Upload Attendance is Mandatory");
      } else if (
        statusType.closeStatus == true &&
        worksiteCheck == true &&
        props.Data.followup_1 == false &&
        props.Data.followup_2 == false &&
        uploadAttendanveValue?.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        uploadAttendanveValue?.type !== "application/vnd.ms-excel"
      ) {
        message.warning("Invalid format uploaded (Supports xls format)");
      } else if ((statusType.closeStatus == true && worksiteCheck == true && props.Data.followup_1 == false && props.Data.followup_2 == false && countOfParticipants == "") || 0) {
        message.warning("Count of Participants is Mandatory");
      } else {
        if (worksiteCheck == true) {
          setEventDurationType("allday");
        }
        setDurationModeAlert(false);
        setDurationDateAlert(false);
        setDurationTimeAlert(false);
        setDurationEndDateAlert(false);
        setDurationEndTimeAlert(false);

        uploadHostPutFunc(Appointmentid);
      }

      if (startTimeSelect == "" && durationButton.select_time == true) {
        setDurationStartTimeCheck(false);
        setDurationTimeAlert(true);
        return false;
      }
      if (endTimeSelect == "" && durationButton.select_time == true) {
        setDurationEndTimeCheck(false);
        setDurationTimeAlert(true);
        return false;
      }
    } else {
      if (bookEventCheck == true) {
        setBookEventCheck(false);
      }

      if (worksiteValue == "" && partnerValue == "" && prospectValue == "" && customerValue == "" && supervisorValue == "" && teamValue == "" && leadValue == "" && selfValue == "") {
        message.warning("Event With is Mandatory");
      } else if (worksiteCheck == true && eventTypeWorksiteSelect == "") {
        message.warning("Event Type is Mandatory");
      } else if (advisorCheck == true && eventTypeAdvisorSelect == "") {
        message.warning("Event Type is Mandatory");
      } else if (prospectCheck == true && eventTypeProspectSelect == "") {
        message.warning("Event Type is Mandatory");
      } else if (customerCheck == true && eventTypeCustomerSelect == "") {
        message.warning("Event Type is Mandatory");
      } else if (supervisorCheck == true && eventTypeSupervisorSelect == "") {
        message.warning("Event Type is Mandatory");
      } else if (teamCheck == true && eventTypeTeamSelect == "") {
        message.warning("Event Type is Mandatory");
      } else if (selfCheck == true && eventTypeSelfSelect == "") {
        message.warning("Event Type is Mandatory");
      } else if (worksiteCheck == true && unitNameValue == "") {
        message.warning("Unit Name is Mandatory for Worksite");
      } else if (worksiteCheck == false && modeSelect == "") {
        message.warning("Mode is Mandatory");
      } else if (durationStartDateOperation == undefined) {
        message.warning("Start Date is Mandatory");
      } else if ((worksiteCheck == false && durationStartTimeOperation == undefined) || "") {
        message.warning("Start Time is Mandatory");
      } else if ((worksiteCheck == false && durationEndTimeOperation == undefined) || "") {
        message.warning("End Time is Mandatory");
      } else if ((worksiteCheck == true && followUpOneDateOperation == undefined) || "") {
        message.warning("Follow Up 1 Date is Mandatory");
      } else if ((worksiteCheck == true && followUpTwoDateOperation == undefined) || "") {
        message.warning("Follow Up 2 Date is Mandatory");
      } else if (eventDurationType == "customedatetime" && durationEndDate >= followUpOneDateOperation && durationEndDate >= followUpTwoDateOperation) {
        message.warning("Follow Up Dates should not be less than End date");
      } else if (eventDurationType == "allday" && durationStartDate >= followUpOneDateOperation && durationStartDate >= followUpTwoDateOperation) {
        message.warning("Follow Up Dates should not be less than Start date");
      } else if (followUpOneDateOperation >= followUpTwoDateOperation) {
        message.warning("Invalid Follow Up Dates");
      } else if (worksiteCheck == true && ownerCollectn.length < 1) {
        message.warning("Team Member is Mandatory");
      } else if (eventStatus == undefined || "") {
        message.warning("Status is Mandatory");
      } else if ((statusType.closeStatus == true && worksiteCheck == true && uploadAttendanveValue == undefined) || "") {
        message.warning("Upload Attendance is Mandatory");
      } else if (statusType.closeStatus == true && worksiteCheck == true && uploadAttendanveValue?.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && uploadAttendanveValue?.type !== "application/vnd.ms-excel") {
        message.warning("Invalid format uploaded (Supports xls format)");
      } else if (statusType.closeStatus == true && worksiteCheck == true && countOfParticipants == "") {
        message.warning("Count of Participants is Mandatory");
      } else {
        setDurationModeAlert(false);
        setDurationDateAlert(false);
        setDurationTimeAlert(false);
        setDurationEndDateAlert(false);
        setDurationEndTimeAlert(false);

        const start_date = convertToIndianTimezone(durationStartDateOperation, true);
        const end_date = convertToIndianTimezone(durationEndDateOperation, true);
        const followup_1_date = convertToIndianTimezone(followUpOneDateOperation, true);
        const followup_2_date = convertToIndianTimezone(followUpTwoDateOperation, true);

        let createFormData = {
          userId: stoageGetter("user").id,
          appointment_type: worksiteCheck
            ? worksiteValue
            : advisorCheck
              ? partnerValue
              : prospectCheck
                ? prospectValue
                : customerCheck
                  ? customerValue
                  : supervisorCheck
                    ? supervisorValue
                    : teamCheck
                      ? teamValue
                      : selfCheck
                        ? selfValue
                        : leadCheck
                          ? leadValue
                          : null,
          event_type: worksiteCheck
            ? eventTypeWorksiteSelect
            : advisorCheck
              ? eventTypeAdvisorSelect
              : prospectCheck
                ? eventTypeProspectSelect
                : customerCheck
                  ? eventTypeCustomerSelect
                  : supervisorCheck
                    ? eventTypeSupervisorSelect
                    : teamCheck
                      ? eventTypeTeamSelect
                      : selfCheck
                        ? eventTypeSelfSelect
                        : leadCheck
                          ? eventTypeLeadSelect
                          : null,
          eventHeldUnitName: unitNameValue,
          // mode : worksiteCheck == true ? 'Call' : modeSelect ,
          mode: worksiteCheck == true ? "digital" : modeSelect,
          durationType: worksiteCheck ? "allday" : eventDurationType,
          start_date: start_date,
          start_time: worksiteCheck ? 32400000 : durationStartTimeOperation,
          end_date: end_date,
          end_time: worksiteCheck ? 61200000 : durationEndTimeOperation,
          followup_1_date: followup_1_date,
          followup_2_date: followup_2_date,
          statusType: eventStatus || "open",
          statusreason: statusReasonText,
          teamMember: ownerCollectn,
          teamMember_clone: [],
          eventAttendeeCount: countOfParticipants,
          city: cityProvinceName, // city name has to be passed
          cityCode: cityProvince, //city code has to be passed
          stateCode: stateProvince,
          state: stateProvinceName,
        };
        const result = await axios({
          method: "post",
          url: baseURL + `secure/user/bookAppointment`,
          data: createFormData,
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + _store?.login?.token,
          },
        })
          .then(async (res) => {
            let AppID = res?.data?.data?._id;
            if (worksiteCheck == true && statusType.closeStatus == true) {
              uploadHostPostFunc(AppID);
              if (res?.data?.data?.length !== 0) {
                if (props.api != undefined) {
                  props.api(thisMonth);
                }
                if (props.getdata) {
                  props.getdata(true);
                }
                props.setIsModalVisible(false);
              }
            } else {
              if (res?.data?.data?.length !== 0) {
                if (props.api != undefined) {
                  props.api(thisMonth);
                }
                if (props.getdata) {
                  props.getdata(true);
                }
                props.setIsModalVisible(false);
              }
              message.success("Event Created successfully");
            }
          })
          .catch(async (err) => {
            // message.error("Event deleted from Database");
          });
        //   `user/bookAppointment`,
        //   {
        //     userId: stoageGetter("user").id,
        //     appointment_type: worksiteCheck
        //       ? worksiteValue
        //       : advisorCheck
        //       ? partnerValue
        //       : prospectCheck
        //       ? prospectValue
        //       : customerCheck
        //       ? customerValue
        //       : supervisorCheck
        //       ? supervisorValue
        //       : teamCheck
        //       ? teamValue
        //       : selfCheck
        //       ? selfValue
        //       : null,
        //     event_type: worksiteCheck
        //       ? eventTypeWorksiteSelect
        //       : advisorCheck
        //       ? eventTypeAdvisorSelect
        //       : prospectCheck
        //       ? eventTypeProspectSelect
        //       : customerCheck
        //       ? eventTypeCustomerSelect
        //       : supervisorCheck
        //       ? eventTypeSupervisorSelect
        //       : teamCheck
        //       ? eventTypeTeamSelect
        //       : selfCheck
        //       ? eventTypeSelfSelect
        //       : null,
        //     eventHeldUnitName: unitNameValue,
        //     // mode : worksiteCheck == true ? 'Call' : modeSelect ,
        //     mode: worksiteCheck == true ? "digital" : modeSelect,
        //     durationType: worksiteCheck ? "allday" : eventDurationType,
        //     start_date: start_date,
        //     start_time: worksiteCheck ? 32400000 : durationStartTimeOperation,
        //     end_date: end_date,
        //     end_time: worksiteCheck ? 61200000 : durationEndTimeOperation,
        //     followup_1_date: followup_1_date,
        //     followup_2_date: followup_2_date,
        //     statusType: eventStatus || "open",
        //     statusreason: statusReasonText,
        //     teamMember: ownerCollectn,
        //     teamMember_clone: [],
        //     eventAttendeeCount: countOfParticipants,
        //   },
        //   { secure: true }
        // );

        setBookEventCheck(false);
        props.setIsModalVisible(false);

        if (startTimeSelect == "" && durationButton.select_time == true) {
          setDurationStartTimeCheck(false);
          setDurationTimeAlert(true);

          return false;
        }
        if (endTimeSelect == "" && durationButton.select_time == true) {
          setDurationEndTimeCheck(false);
          setDurationTimeAlert(true);

          return false;
        }
      }
    }
  };
  // !!!!! BookAppointmentFunc() ENDS HERE !!!!!

  const StatusTypeOpenFunc = () => {
    setBookEventCheck(true);

    // dispatch({ data: id, type: "CURRENT_UPDATING_ID" });
    //history.push("/leadmasterpage/statuslead", { leadID: id });

    setEventStatus("open");
    setStatusType({
      openStatus: true,
      closeStatus: false,
      cancelStatus: false,
    });
  };
  const StatusTypeCloseFunc = () => {
    setEventStatus("closed");
    setStatusType({
      openStatus: false,
      closeStatus: true,
      cancelStatus: false,
    });
  };
  const StatusTypeCancelFunc = () => {
    setEventStatus("cancelled");
    setStatusType({
      openStatus: false,
      closeStatus: false,
      cancelStatus: true,
    });
  };
  const StatusTypeReasonFunc = (e) => {
    setBookEventCheck(true);
    if (e.target.value.startsWith(" ")) {
      message.error("Cannot start from space");
    } else {
      if (props?.Data?.statusReason == e.target.value) {
        setStatusReasonText();
      } else {
        setStatusReasonText(e.target.value);
      }
    }
  };

  const CountOfParticipantsFunc = (e) => {
    setBookEventCheck(true);
    if (e.target.value.startsWith(" ")) {
      message.error("Cannot start from space");
    } else {
      setCountOfParticipants(e.target.value);
    }
  };

  const AdvisorTrainingFunc = () => {
    setAdvisorCollection({
      appointment_advisor: false,
      phone_call_advisor: false,
      training: true,
    });
  };
  const AdvisorPhoneCallFunc = () => {
    setAdvisorCollection({
      appointment_advisor: false,
      phone_call_advisor: true,
      training: false,
    });
    setclientVisit("Relationship call");
  };
  const AdvisorAppointmentFunc = () => {
    setAdvisorCollection({
      appointment_advisor: true,
      phone_call_advisor: false,
      training: false,
    });
  };
  const CustomerAppointmentFunc = () => {
    setCustomerCollection({
      appointment_customer: true,
      phone_call_customer: false,
      policy_renewal: false,
    });
  };
  const CustomerPhoneCallFunc = () => {
    setCustomerCollection({
      appointment_customer: false,
      phone_call_customer: true,
      policy_renewal: false,
    });
    setclientVisit("Relationship call");
  };
  const CustomerPolicyRenewalFunc = () => {
    setCustomerCollection({
      appointment_customer: false,
      phone_call_customer: false,
      policy_renewal: true,
    });
  };

  const AppointmentProspectMeetingFunc = () => {
    setProspectCollection({
      appointment_prospect: true,
      first_meeting: true,
      follow_up: false,
      document_collection: false,
    });
  };

  const AppointmentProspectFollowUpFunc = () => {
    setProspectCollection({
      appointment_prospect: true,
      first_meeting: false,
      follow_up: true,
      document_collection: false,
    });
  };

  const AppointmentProspectDocCollectionFunc = () => {
    setProspectCollection({
      appointment_prospect: true,
      first_meeting: false,
      follow_up: false,
      document_collection: true,
    });
  };
  // const AppointmentAdvisorUnitMeetingFunc=()=>{}
  const AppointmentAdvisorUnitMeetingFunc = () => {
    setAdvisorCollection({
      appointment_advisor: true,
      businessPlanning_review: false,
      inactive_agent_reactivation: false,
      unit_meeting: true,
      joint_customer_visit: false,
      servicing: false,
    });
    setAppointmentType("Unit Meeting");
  };
  const AppointmentAdvisorServicingFunc = () => {
    setAdvisorCollection({
      appointment_advisor: true,
      businessPlanning_review: false,
      inactive_agent_reactivation: false,
      unit_meeting: false,
      joint_customer_visit: false,
      servicing: true,
    });
    setAppointmentType("Servicing");
  };
  const AppointmentAdvisorJoint_Cust_MeetingFunc = () => {
    setAdvisorCollection({
      appointment_advisor: true,
      businessPlanning_review: false,
      inactive_agent_reactivation: false,
      unit_meeting: false,
      joint_customer_visit: true,
      servicing: false,
    });
    setAppointmentType("Joint customer Meeting");
  };
  const AppointmentAdvisorBusinessPlanningFunc = () => {
    setAdvisorCollection({
      appointment_advisor: true,
      businessPlanning_review: true,
      inactive_agent_reactivation: false,
      unit_meeting: false,
      joint_customer_visit: false,
      servicing: false,
    });
    setAppointmentType("Business Planning & review");
  };

  const AppointmentAdvisorInactiveAgentFunc = () => {
    setAdvisorCollection({
      appointment_advisor: true,
      businessPlanning_review: false,
      inactive_agent_reactivation: true,
      unit_meeting: false,
      joint_customer_visit: false,
      servicing: false,
    });
    setAppointmentType("Inactive agent reactivation");
  };

  const onChangeDate = (date, dateString) => {
    setDurationStartDate(moment(date).format("MM-DD-YYYY"));
    setDurationEndDate(moment(date).format("MM-DD-YYYY"));
  };

  const onChangeTime = (time, timeString) => { };

  const TeamMemberMeetingFunc = () => {
    setAdvisorCollection({
      appointment_advisor: true,
      phone_call_advisor: false,
      training: false,
    });
    if (prospectCheck == true) {
      setProspectCollection({
        appointment_prospect: true,
        phone_call: false,
        training_prospect: false,
      });
    }
  };
  const TeamMemberTrainingFunc = () => {
    setAdvisorCollection({
      appointment_advisor: false,
      phone_call_advisor: false,
      training: true,
    });
    if (prospectCheck == true) {
      setProspectCollection({
        appointment_prospect: false,
        phone_call: true,
        training_prospect: false,
      });
    }
  };

  const TeamMemberBusinessPlanning_ReviewFunc = () => {
    setAdvisorCollection({
      businessPlanning_review: true,
      unit_meeting: false,
      joint_customer_visit: false,
    });
  };
  const TeamMemberUnitMeetingFunc = () => {
    setAdvisorCollection({
      businessPlanning_review: false,
      unit_meeting: true,
      joint_customer_visit: false,
    });
  };
  const TeamMemberJointCustomerVisitFunc = () => {
    setAdvisorCollection({
      businessPlanning_review: false,
      unit_meeting: false,
      joint_customer_visit: true,
    });
  };
  const ProspectAppointmentFunc = () => {
    setProspectCollection({
      appointment_prospect: true,
      phone_call: false,
      training_prospect: false,
    });
  };
  const ProspectPhoneCallFunc = () => {
    setProspectCollection({
      appointment_prospect: false,
      phone_call: true,
      training_prospect: false,
    });
    setclientVisit("Relationship call");
  };
  const ProspectTrainingFunc = () => {
    setProspectCollection({
      appointment_prospect: false,
      phone_call: false,
      training_prospect: true,
    });
  };
  const ProspectFirstMeetingFunc = () => {
    setProspectCollection({
      first_meeting: true,
      follow_up: false,
      document_collection: false,
    });
  };
  const ProspectFollowUpFunc = () => {
    setProspectCollection({
      first_meeting: false,
      follow_up: true,
      document_collection: false,
    });
  };
  const ProspectDocumentCollectionFunc = () => {
    setProspectCollection({
      first_meeting: false,
      follow_up: false,
      document_collection: true,
    });
  };

  const CustomerAppointmentCollectionFunc = () => {
    setCustomerCollection({
      appointment_customer: true,
      phone_call_customer: false,
      policy_renewal: false,
    });
  };
  const CustomerPhoneCallCollectionFunc = () => {
    setCustomerCollection({
      appointment_customer: false,
      phone_call_customer: true,
      policy_renewal: false,
    });
  };
  const CustomerPolicyRenewalCollectionFunc = () => {
    setCustomerCollection({
      appointment_customer: false,
      phone_call_customer: false,
      policy_renewal: true,
    });
  };
  const [dateClick, setDateClick] = useState();
  const [ActivityPageEvent, setActivityPageEvent] = useState(false);

  const showModal = (e, date) => {
    setUpdateCheckEvent(true);
    setDurationStartDate(moment(e.event.start));
    setDurationEndDate(moment(e.event.end));
    let start_ms_date = new Date(moment(e.event.start)).setUTCHours(0, 0, 0, 0);
    let end_ms_date = new Date(moment(e.event.end)).setUTCHours(0, 0, 0, 0);

    const greaterThanTen = fetchEventArray.find((element) => element.id == e.event.id);
    setFetchEventObject(fetchEventArray.find((element) => element.id == e.event.id));
    fetchEventArray.map((item) => {
      if (item.id == e.event.id) {
        setUpdateEventType(item.event_type);
        if (item.statusType == "open") {
          setStatusType({
            openStatus: true,
            closeStatus: false,
            cancelStatus: false,
          });
        } else if (item.statusType == "closed") {
          setStatusType({
            openStatus: false,
            closeStatus: true,
            cancelStatus: false,
          });
        } else if (item.statusType == "cancelled") {
          setStatusType({
            openStatus: true,
            closeStatus: true,
            cancelStatus: true,
          });
        }
        setAppointmentTypeFetched(item.appointment_type);
        setEventTypeFetched(item.event_type);

        if (item.appointment_type == "customer") {
          setCustomerCheck(true);
          setAdvisorCheck(false);
          setCustomerTagVisible(true);
          setCustomerOnClickVal(item.manuallyrenewalCustomer[0].Name);
          setProspectCheck(false);
          setAddManuallyButtonCheck(true);
        } else if (item.appointment_type == "existingapplication") {
          setCustomerCheck(false);
          setAdvisorCheck(false);
          setProspectCheck(true);
          setProspectOnClickVal(item.leadId.firstName);

          setProspectTagVisible(true);
        } else {
          setCustomerCheck(false);
          setAdvisorCheck(true);
          setProspectCheck(false);
          setAdvisorOnClickVal(item.partnerId.partnerName);
          setAdvisorTagVisible(true);
        }
        if (item.appointment_type == "existingpartner") {
          setProspectCollection({
            appointment_prospect: false,
            phone_call: false,
            training_prospect: false,
          });
          setCustomerCollection({
            appointment_customer: false,
            phone_call_customer: false,
            policy_renewal: false,
          });

          if (item.event_type == "appointment") {
            setAdvisorCollection({
              appointment_advisor: true,
              phone_call_advisor: false,
              training: false,
            });
          } else if (item.event_type == "training") {
            setAdvisorCollection({
              appointment_advisor: false,
              phone_call_advisor: false,
              training: true,
            });
          } else {
            setAdvisorCollection({
              appointment_advisor: false,
              phone_call_advisor: true,
              training: false,
            });
          }
        }

        if (item.appointment_type == "existingapplication") {
          setAdvisorCollection({
            appointment_advisor: false,
            phone_call_advisor: false,
            training: false,
          });
          setCustomerCollection({
            appointment_customer: false,
            phone_call_customer: false,
            policy_renewal: false,
          });

          if (item.event_type == "phonecall") {
            setProspectCollection({
              appointment_prospect: false,
              phone_call: true,
              training_prospect: false,
            });
          }
          if (item.event_type == "training") {
            setProspectCollection({
              appointment_prospect: false,
              phone_call: false,
              training_prospect: true,
            });
          }
          if (item.event_type == "appointment") {
            setProspectCollection({
              appointment_prospect: true,
              phone_call: false,
              training_prospect: false,
            });
          }
        }
        if (item.appointment_type == "customer") {
          setAdvisorCollection({
            appointment_advisor: false,
            phone_call_advisor: false,
            training: false,
          });
          setProspectCollection({
            appointment_prospect: false,
            phone_call: false,
            training_prospect: false,
          });
          if (item.event_type == "appointment") {
            setCustomerCollection({
              appointment_customer: true,
              phone_call_customer: false,
              policy_renewal: false,
            });
          } else if (item.event_type == "phonecall") {
            setCustomerCollection({
              appointment_customer: false,
              phone_call_customer: true,
              policy_renewal: false,
            });
          } else {
            setCustomerCollection({
              appointment_customer: false,
              phone_call_customer: false,
              policy_renewal: true,
            });
          }
        }

        setDurationStartTimeOperation(parseInt(item.start_time));
        setDurationEndTimeOperation(parseInt(item.end_time));
        setEventDurationType(item.durationType);
        timeList.map((time) => {
          if (time.value == item.start_time) {
            setStartTimeSelect(time.value);
          }
          if (time.value == item.end_time) {
            setEndTimeSelect(time.value);
          }
        });
      }
    });

    let start_ms_time = new Date(moment(e.event.start)).setDate(0, 0, 0);

    setDurationStartDateOperation(start_ms_date);
    setDurationEndDateOperation(end_ms_date);
    setBookEventCheck(false);
    setUpdateEventId(e.event.id);
    setUpdateCheckEvent(true);
    props.setIsModalVisible(true);
    setEventText(JSON.stringify(e.event.title));

    fetchUpcomingArr.map((item) => {
      if (item._id == e.event.id) {
        // setDurationStartDate(item.start_date)
        // setUpdateStartTime(JSON.stringify(item.start_time))
        // setUpdateEndTime(JSON.stringify(item.end_time))
        // setDurationEndDate(item.end_date)
      }

      //       return(
      // item.id==e.event.id?{
      // setHelperUpcomingArr(item)
      // }:null
      //       )
    });
  };

  // eventClickBtn(showModal);
  // {
  //   isModalComponent ? setActivityPageEvent(true):setActivityPageEvent(false);
  // }
  // {ActivityPageEvent ? showModal() :""

  // }
  // isModalComponent(showModal())
  const OnChangeEventText = (e) => {
    setEventText(e.target.value);
  };
  const OnDateClick = (e) => {
    setDateClick(e.target.value);
    props.setIsModalVisible(true);
  };
  const handleOk = (e) => {
    props.setIsModalVisible(false);

    // if (MultiSelectDate == true) {
    //   setAddEvents([...addEvents, {

    //     id: Math.random().toString(36).slice(-6), title: eventText,
    //     //  start:moment("2017-08-13T12:34:00Z").format(),
    //     //  end:moment("2017-08-13T13:34:00Z").format()
    //     start: moment(startDuration).format('MM-DD-YYYY') + moment(value).format("T" + "H:mm:ss" + "z"),
    //     end: moment(endDuration).format('MM-DD-YYYY') + moment(endVal).format("T" + "H:mm:ss" + "z"),
    //     // start:moment(startDuration).format('MM-DD-YYYY ') + moment(value).format("H:mm:ss"),
    //     // end:moment(endDuration).format('MM-DD-YYYY ') + moment(endVal).format("H:mm:ss"),
    //     // allDay:moment(endVal).format("H:mm:ss")>"23:59:59"?true:false

    //   }])
    // }
    // else {
    //   setAddEvents([...addEvents, {

    //     id: Math.random().toString(36).slice(-6), title: eventText,
    //     //  date:moment(clickedDate).format('MM-DD-YYYY') + moment(value).format("T"+"H:mm:ss"+"Z"),
    //     start: moment(clickedDate).format('MM-DD-YYYY') + moment(value).format("T" + "H:mm:ss" + "z"),
    //     end: moment(clickedDate).format('MM-DD-YYYY') + moment(endVal).format("T" + "H:mm:ss" + "z"),
    //     allDay: false
    //   }])

    // }

    //   setAddEvents([...addEvents,{

    //       id: Math.random().toString(36).slice(-6), title:eventText,
    //  start:moment(startDuration).format('MM-DD-YYYY ') + moment(value).format("H:mm:ss"),
    //       end:moment(endDuration).format('MM-DD-YYYY ') + moment(value).format("H:mm:ss"),
    //      date:moment(clickedDate).format('MM-DD-YYYY ') + moment(value).format("H:mm:ss")
    //     }])
    // setAddEvents([addEvents,{title:eventText,date:moment(e.dateStr).format('MM-DD-YYYY ') + moment(value).format("H:mm:ss")}])
  };

  const MultiSelect = (e) => {
    setAddManuallyButtonCheck(false);
    setProspectTagVisible(false);
    setAdvisorTagVisible(false);
    setCustomerTagVisible(false);
    setSearchAdvisorText("");
    setSearchProspectText("");
    setSearchCustomerText("");
    setSearchTeamText("");
    setTeamTagVisible(false);
    setAdvisorCheck(true);
    setProspectCheck(false);
    setCustomerCheck(false);
    setAdvisorCollection({
      appointment_advisor: true,
      phone_call_advisor: false,
      training: false,
      businessPlanning_review: true,
    });
    setProspectCollection({
      appointment_prospect: true,
      first_meeting: true,
      follow_up: false,
      document_collection: false,
    });
    setCustomerCollection({
      appointment_customer: true,
      phone_call_customer: false,
      policy_renewal: false,
    });
    setStartDuration(e.startStr);
    setEndDuration(e.endStr);
    props.setIsModalVisible(true);
    setMultiSelectDate(true);
  };

  const handleCancel = () => {
    props.setIsModalVisible(false);
    setDurationStartDateHelper();
  };

  // let EventFetch=fetchEventCheck==true? fetchUpcomingArr.map((item)=>{
  //   return(
  //     setHelperUpcomingArr(item)
  //   )
  // }):null
  // let startDateParse=helperUpcomingArr? JSON.parse(helperUpcomingArr.start_date):null;
  // let startTimeParse=helperUpcomingArr?JSON.parse(helperUpcomingArr.start_time):null;
  // let endDateParse=helperUpcomingArr?JSON.parse(helperUpcomingArr.end_date):null;
  // let endTimeParse=helperUpcomingArr? JSON.parse(helperUpcomingArr.end_time):null
  // let idParse=helperUpcomingArr? JSON.parse(helperUpcomingArr._id):null;
  let start_date_var = helperUpcomingArr ? helperUpcomingArr.start_date : null;
  let start_date_assign = new Date(start_date_var).setUTCHours(0, 0, 0, 0);
  let end_date_var = helperUpcomingArr ? helperUpcomingArr.end_date : null;
  let end_date_assign = new Date(end_date_var).setUTCHours(0, 0, 0, 0);

  let events = [
    { title: eventText, date: new Date("2021-08-11 10:00:00") },
    { title: "TEst", date: new Date("2021-08-11 10:00:00") },
  ];

  addEvent = [
    { title: "Meeting", date: new Date("2021-08-11 10:00:00") },
    { title: "TEst", date: new Date("2021-08-11 10:00:00") },
  ];
  const OnEndTimeChange = (e) => {
    setEndVal(e);
  };
  const OnTimeChange = (val) => {
    setValue(val);
  };
  const MultiSelectDateFunc = (e) => {
    setAddManuallyButtonCheck(false);
    setStartTimeSelect("");
    setEndTimeSelect("");
    setUpdateCheckEvent(false);
    setProspectTagVisible(false);
    setAdvisorTagVisible(false);
    setCustomerTagVisible(false);
    setCustomerNameText("");
    setCustomerMobileNoText("");
    setSearchAdvisorText("");
    setSearchProspectText("");
    setSearchCustomerText("");
    setSearchTeamText("");
    setTeamTagVisible(false);
    setAdvisorCheck(true);
    setProspectCheck(false);
    setCustomerCheck(false);
    setAdvisorCollection({
      appointment_advisor: true,
      phone_call_advisor: false,
      training: false,
      businessPlanning_review: true,
    });
    setProspectCollection({
      appointment_prospect: true,
      first_meeting: true,
      follow_up: false,
      document_collection: false,
    });
    setCustomerCollection({
      appointment_customer: true,
      phone_call_customer: false,
      policy_renewal: false,
    });
    if (updateEventCheck) setBookEventCheck(true);
    setDurationStartDate(moment(e.start));
    setDurationEndDate(moment(e.end).subtract(1, "days"));
    let new_start_date = Date.parse(e.start);
    let start_date = new Date(new_start_date).setUTCHours(0, 0, 0, 0);

    setDurationStartDateOperation(start_date);

    let moment_end_date = moment(e.end).subtract(1, "days");
    let new_end_date = Date.parse(moment_end_date);
    let end_date = new Date(new_end_date).setUTCHours(0, 0, 0, 0);
    setDurationEndDateOperation(end_date);
    // setDurationStartDate(moment(e.start).format("MM-DD-YYYY"))
    // setDurationStartDateOperation(moment(e.start).format("MM-DD-YYYY"))
    // setDurationEndDate(moment(e.end).subtract(1, "days").format("MM-DD-YYYY"))
    // setDurationEndDateOperation(moment(e.end).subtract(1, "days").format("MM-DD-YYYY"))
    props.setIsModalVisible(true);
  };
  const DateClick = (e) => {
    setAddManuallyButtonCheck(false);
    setStartTimeSelect("");
    setEndTimeSelect("");
    // setDurationStartDate(e.dateStr)
    // setDurationEndDate(e.dateStr)
    // setDurationStartDate(e.date)
    // setDurationEndDate(e.date)
    // let new_date =Date.parse(e.date)
    setBookEventCheck(true);
    setUpdateCheckEvent(false);
    let ms_date = new Date(e.date).setUTCHours(0, 0, 0, 0);

    // let ms_date = new Date(e.date).setHours(0, 0, 0, 0)
    // if (typeof e.date === 'string' || e.date instanceof String)
    // {
    // }

    // // it's a string
    // else{
    // }
    // it's something else
    setDurationStartDate(moment(e.date));
    setDurationEndDate(moment(e.date));

    setDurationStartDateHelper(e.dateStr);
    setDurationStartDateOperation(ms_date);

    setDurationEndDateOperation(ms_date);
    setClickedDate(e.dateStr);
    props.setIsModalVisible(true);
    setMultiSelectDate(false);
    // setAddEvents([...addEvents{title:eventText,date:moment(e.dateStr).format('MM-DD-YYYY ') + moment(value).format("H:mm:ss")}])
    // setAddEvents([addEvents,{title:eventText,date:moment(e.dateStr).format('MM-DD-YYYY ') + moment(value).format("H:mm:ss")}])
  };

  // ********  state/province and city start here ****** //
  let stateOptions =
    states && !_.isEmpty(states)
      ? states?.map((state) => {
        const label = state.NOM_PROV;
        const value = state.COD_PROV;
        const key = state.COD_PROV;
        const newState = { ...state, label, value, key };
        // state.push(label)
        return newState;
      })
      : null;

  let citiesOptions =
    cities && !_.isEmpty(cities)
      ? cities?.map((city) => {
        const label = city.NOM_LOCALIDAD;
        const value = city.COD_LOCALIDAD;
        const key = city.COD_LOCALIDAD;
        const newCities = { ...city, label, value, key };
        return newCities;
      })
      : null;

  const stateSelectHandler = (value, key) => {
    setCode(key.COD_PROV);
    dispatch(actions.fetchAllCities(key.COD_PROV));
  };

  const stateChangetHandler = (event, key) => {
    setStateProvince(key.COD_PROV);
    setStateProvinceName(key.NOM_PROV);
    // setStateProvince2(key.key);
    //cityProvince = "";
    setCityProvince("");
  };
  const cityChangeHandler = (value, key) => {
    setCityProvinceName(key.NOM_LOCALIDAD);
    setCityProvince(key.COD_LOCALIDAD);
    // setCityProvince2(key.key);
  };
  // ********  state/province and city end here ****** //

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  return (
    <div className="CalendarEvent-main-class" style={{ maxWidth: "100vw" }}>
      <Modal
        className=" create-event-header"
        title={updateEventCheck == true ? "UPDATE EVENT" : <div style={{ fontWeight: "bold", fontSize: "16px", color: "#1D428A" }}>{props.click == "UPDATE EVENT" ? "UPDATE EVENT" : "CREATE EVENT"}</div>}
        visible={props.isModalVisible}
        onOk={handleOk}
        closable={durationDateAlert == true || durationTimeAlert == true ? false : true}
        onCancel={handleCancel}
        footer={null}
        bodyStyle={{
          height: "60vh",
          maxWidth: "100vw",
          // display:"flex",
          // flexDirection:"column"
          overflowY: "scroll",
        }}
      >
        <div className="CalendarEvent-Modal-Card-content">
          <h4 style={{ paddingBottom: "10px" }} className="CalendarEvent-Modal-Card-header-type">
            Event With
            {updateEventCheck == true ? null : <span className="CalendarEvent-MandatoryStar">*</span>}
          </h4>

          <div className="CalendarEvent-Modal-Card-button-flex-wrap">
            {/* {employee_code == "CH1" ||
              employee_code == "CH2" ||
              employee_code == "CH11" ? (
              <>

                <button
                  disabled={updateEventCheck == true ? true : false}
                  onClick={checkCustomerFunc}
                  className={
                    customerCheck == true
                      ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                      : "CalendarEvent-Modal-Card-eventwith-static-button-style"
                  }
                >
                  Customer
                </button>

                <button
                  disabled={updateEventCheck == true ? true : false}
                  onClick={checkSupervisorFunc}
                  className={
                    supervisorCheck == true
                      ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                      : "CalendarEvent-Modal-Card-eventwith-static-button-style"
                  }
                >
                  Supervisor
                </button>

                <button
                  disabled={updateEventCheck == true ? true : false}
                  onClick={checkTeamFunc}
                  className={
                    teamCheck == true
                      ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                      : "CalendarEvent-Modal-Card-eventwith-static-button-style"
                  }
                >
                  Team
                </button>
              </>
            ) : employee_code == "CH3" ||
              employee_code == "CH9" ||
              employee_code == "CH7" ? (
              <>
                <button
                  disabled={updateEventCheck == true ? true : false}
                  onClick={checkProspectFunc}
                  className={
                    prospectCheck == true
                      ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                      : "CalendarEvent-Modal-Card-eventwith-static-button-style"
                  }
                >
                  Prospect
                </button>

                <button
                  disabled={updateEventCheck == true ? true : false}
                  onClick={checkCustomerFunc}
                  className={
                    customerCheck == true
                      ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                      : "CalendarEvent-Modal-Card-eventwith-static-button-style"
                  }
                >
                  Customer
                </button>

                <button
                  disabled={updateEventCheck == true ? true : false}
                  onClick={checkSupervisorFunc}
                  className={
                    supervisorCheck == true
                      ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                      : "CalendarEvent-Modal-Card-eventwith-static-button-style"
                  }
                >
                  Supervisor
                </button>

                <button
                  disabled={updateEventCheck == true ? true : false}
                  onClick={checkTeamFunc}
                  className={
                    teamCheck == true
                      ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                      : "CalendarEvent-Modal-Card-eventwith-static-button-style"
                  }
                >
                  Team
                </button>

                <button
                  disabled={updateEventCheck == true ? true : false}
                  onClick={checkPartnerFunc}
                  className={
                    advisorCheck == true
                      ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                      : "CalendarEvent-Modal-Card-eventwith-static-button-style"
                  }
                >
                  Advisor
                </button>
              </>
            ) : employee_code == "CH4" ||
              employee_code == "CH5" ||
              employee_code == "CH6" ||
              employee_code == "CH10" ||
              employee_code == "CH8" ? ( */}
            <>
              {/* <button
                  disabled={updateEventCheck == true ? true : false}
                  onClick={checkPartnerFunc}
                  className={
                    advisorCheck == true
                      ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style"
                      : "CalendarEvent-Modal-Card-eventwith-static-button-style"
                  }
                >
                  Partner
                </button> */}

              {/* <button
                disabled={updateEventCheck == true ? true : false}
                onClick={checkProspectFunc}
                className={prospectCheck == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
              >
                Prospect
              </button> */}

              <button
                disabled={updateEventCheck == true ? true : false}
                onClick={checkCustomerFunc}
                className={customerCheck == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
              >
                Customer
              </button>

              <button
                disabled={updateEventCheck == true ? true : false}
                onClick={checkSupervisorFunc}
                className={supervisorCheck == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
              >
                Supervisor
              </button>

              {/* <button
                disabled={updateEventCheck == true ? true : false}
                onClick={checkPartnerFunc}
                className={advisorCheck == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
              >
                Advisor
              </button> */}

              <button disabled={updateEventCheck == true ? true : false} onClick={checkTeamFunc} className={teamCheck == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}>
                Team
              </button>
              <button disabled={updateEventCheck == true ? true : false} onClick={checkleadFunc} className={leadCheck == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}>
                Lead
              </button>

              {/* <button
                    disabled={updateEventCheck==true?true:false}
                    onClick={checkSelfFunc}
                    className={selfCheck == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                  >Self</button> */}
            </>
            {/* ) : (
              <></>
             )} */}
          </div>
          {worksiteValue == "" && partnerValue == "" && prospectValue == "" && customerValue == "" && supervisorValue == "" && teamValue == "" && selfValue == "" && selfValue === "" && bookEventCheck == false && updateEventCheck == false ? (
            <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Event With is mandatory</p>
          ) : null}

          <hr
            style={{
              width: "100%",
              backgroundColor: "#d9dbd1",
              // height: '0.1vw',
              // marginTop: '20px',
              marginBottom: "20px",
              opacity: ".2",
            }}
          />

          <h4 className="CalendarEvent-Modal-Card-header-type">
            Event Type
            {updateEventCheck == true ? null : <span className="CalendarEvent-MandatoryStar">*</span>}
          </h4>

          {worksiteCheck == false && advisorCheck == false && prospectCheck == false && customerCheck == false && supervisorCheck == false && leadCheck === false && teamCheck == false && selfCheck == false ? (
            <div className="Input-date">
              <select className="CalendarEvent-Modal-TimePicker-style">
                <option value="">Select</option>
              </select>
            </div>
          ) : worksiteCheck ? (
            <div className="Input-date">
              <select disabled={updateEventCheck == true ? true : false} value={eventTypeWorksiteSelect} onChange={EventTypeWorksiteChangeFunc} className="CalendarEvent-Modal-TimePicker-style">
                <option value="">Select</option>

                {eventTypeWorksiteList.map((time) => {
                  return <option value={time.value}>{time.dispValue}</option>;
                })}
              </select>
              {eventTypeWorksiteSelect == "" && worksiteCheck == true && bookEventCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Event Type is mandatory</p> : null}
            </div>
          ) : prospectCheck ? (
            <div className="Input-date">
              <select disabled={updateEventCheck == true ? true : false} value={eventTypeProspectSelect} onChange={EventTypeProspectChangeFunc} className="CalendarEvent-Modal-TimePicker-style">
                <option value="">Select</option>

                {eventTypeProspectList.map((time) => {
                  return <option value={time.value}>{time.dispValue}</option>;
                })}
              </select>
              {eventTypeProspectSelect == "" && prospectCheck == true && bookEventCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Event Type is mandatory</p> : null}
            </div>
          ) : customerCheck ? (
            <div className="Input-date">
              <select disabled={updateEventCheck == true ? true : false} value={eventTypeCustomerSelect} onChange={EventTypeCustomerChangeFunc} className="CalendarEvent-Modal-TimePicker-style">
                <option value="">Select</option>

                {eventTypeCustomerList.map((time) => {
                  return <option value={time.value}>{time.dispValue}</option>;
                })}
              </select>
              {eventTypeCustomerSelect == "" && customerCheck == true && bookEventCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Event Type is mandatory</p> : null}
            </div>
          ) : supervisorCheck ? (
            <div className="Input-date">
              <select disabled={updateEventCheck == true ? true : false} value={eventTypeSupervisorSelect} onChange={EventTypeSupervisorChangeFunc} className="CalendarEvent-Modal-TimePicker-style">
                <option value="">Select</option>

                {eventTypeSupervisorList.map((time) => {
                  return <option value={time.value}>{time.dispValue}</option>;
                })}
              </select>
              {eventTypeSupervisorSelect == "" && supervisorCheck == true && bookEventCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Event Type is mandatory</p> : null}
            </div>
          ) : teamCheck ? (
            <div className="Input-date">
              <select disabled={updateEventCheck == true ? true : false} value={eventTypeTeamSelect} onChange={EventTypeTeamChangeFunc} className="CalendarEvent-Modal-TimePicker-style">
                <option value="">Select</option>

                {eventTypeTeamList.map((time) => {
                  return <option value={time.value}>{time.dispValue}</option>;
                })}
              </select>
              {eventTypeTeamSelect == "" && teamCheck == true && bookEventCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Event Type is mandatory</p> : null}
            </div>
          ) : leadCheck ? (
            <div className="Input-date">
              <select disabled={updateEventCheck == true ? true : false} value={eventTypeLeadSelect} onChange={EventTypeLeadChangeFunc} className="CalendarEvent-Modal-TimePicker-style">
                <option value="">Select</option>

                {eventTypeLeadList.map((time) => {
                  return <option value={time.value}>{time.dispValue}</option>;
                })}
              </select>
              {eventTypeLeadSelect == "" && leadCheck == true && bookEventCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Event Type is mandatory</p> : null}
            </div>
          ) : advisorCheck ? (
            <div className="Input-date">
              {employee_code == "CH1" || employee_code == "CH2" || employee_code == "CH11" ? (
                <select disabled={updateEventCheck == true ? true : false} value={eventTypeAdvisorSelect} onChange={EventTypeAdvisorChangeFunc} className="CalendarEvent-Modal-TimePicker-style">
                  <option value="">Select</option>
                  {eventTypeAdvisorDEFList.map((time) => {
                    return <option value={time.value}>{time.dispValue}</option>;
                  })}
                </select>
              ) : employee_code == "CH3" || employee_code == "CH4" || employee_code == "CH5" || employee_code == "CH6" || employee_code == "CH7" || employee_code == "CH8" || employee_code == "CH9" || employee_code == "CH10" ? (
                <select disabled={updateEventCheck == true ? true : false} value={eventTypeAdvisorSelect} onChange={EventTypeAdvisorChangeFunc} className="CalendarEvent-Modal-TimePicker-style">
                  <option value="">Select</option>
                  {eventTypeAdvisorList.map((time) => {
                    return <option value={time.value}>{time.dispValue}</option>;
                  })}
                </select>
              ) : (
                <>
                  {/* <select
                    disabled={updateEventCheck==true?true:false}
                    value={eventTypeAdvisorSelect}
                    onChange={EventTypeAdvisorChangeFunc}
                    className="CalendarEvent-Modal-TimePicker-style"
                    >
                      <option value="" >Select</option>
                      {eventTypeAdvisorDEFList.map((time)=>{
                    return(
                    <option value={time.value}>{time.dispValue}</option>
                    )
                    })}
                    </select> */}
                </>
              )}

              {eventTypeAdvisorSelect == "" && advisorCheck == true && bookEventCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Event Type is mandatory</p> : null}
            </div>
          ) : selfCheck ? (
            <div className="Input-date">
              <select disabled={updateEventCheck == true ? true : false} value={eventTypeSelfSelect} onChange={EventTypeSelfChangeFunc} className="CalendarEvent-Modal-TimePicker-style">
                <option value="">Select</option>

                {eventTypeSelfList.map((time) => {
                  return <option value={time.value}>{time.dispValue}</option>;
                })}
              </select>
              {eventTypeSelfSelect == "" && selfCheck == true && bookEventCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Event Type is mandatory</p> : null}
            </div>
          ) : null}
          <hr
            style={{
              width: "100%",
              backgroundColor: "#d9dbd1",
              // height: '0.1vw',
              marginTop: "20px",
              marginBottom: "20px",
              opacity: ".2",
            }}
          />

          {worksiteCheck == true ? (
            <h4 className="CalendarEvent-Modal-Card-header-type">
              Unit Name
              {updateEventCheck == true ? null : <span className="CalendarEvent-MandatoryStar">*</span>}
            </h4>
          ) : (
            <h4 className="CalendarEvent-Modal-Card-header-type">Event Name</h4>
          )}

          <div className="Input-date">
            <input type="text" placeholder="Enter here" maxLength="50" value={unitNameValue} onInput={unitNameFunc} disabled={updateEventCheck == true ? true : false} className="CalendarEvent-Modal-TimePicker-style" />
          </div>

          {unitNameValue == "" && worksiteCheck == true && bookEventCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Unit name is mandatory</p> : null}

          {worksiteCheck && !updateEventCheck ? (
            <hr
              style={{
                width: "100%",
                backgroundColor: "#d9dbd1",
                // height: '0.1vw',
                marginTop: "20px",
                marginBottom: "20px",
                opacity: ".2",
              }}
            />
          ) : updateEventCheck && props.Data.durationType == "allday" && props.Data.is_main_Event ? (
            <hr
              style={{
                width: "100%",
                backgroundColor: "#d9dbd1",
                // height: '0.1vw',
                marginTop: "20px",
                marginBottom: "20px",
                opacity: ".2",
              }}
            />
          ) : null}

          <hr
            style={{
              width: "100%",
              backgroundColor: "#d9dbd1",
              // height: '0.1vw',
              marginTop: "20px",
              marginBottom: "20px",
              opacity: ".2",
            }}
          />
          <div>
            <Row gutter={16}>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name label-color"
                  name="state"
                  label={<h4 className="CalendarEvent-Modal-Card-header-type">Province</h4>}
                  rules={[
                    {
                      required: false,
                      message: "Select your Province!",
                    },
                  ]}
                  style={{ marginBottom: "1rem", width: "100%" }}
                >
                  <Select
                    showSearch
                    bordered={false}
                    className="CalendarEvent-Modal-TimePicker-style"
                    // size="default"
                    placeholder="Select Your Province"
                    options={stateOptions}
                    onSelect={(e, data) => stateSelectHandler(e, data)}
                    disabled={updateEventCheck}
                    value={stateProvince}
                    autoComplete="off"
                    defaultValue={stateProvince}
                    onChange={(item, key) => stateChangetHandler(item, key)}
                    style={{ width: "100%" }}
                    // onChange={stateChangetHandler}
                    onSearch={onSearch}
                    filterOption={filterOption}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name label-color"
                  name="city"
                  label={<h4 className="CalendarEvent-Modal-Card-header-type">City</h4>}
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
                    className="CalendarEvent-Modal-TimePicker-style"
                    size="default"
                    placeholder="Select a city"
                    options={citiesOptions}
                    autoComplete="off"
                    value={cityProvince}
                    disabled={updateEventCheck}
                    // defaultValue={storeCityValue}
                    onChange={(item, key) => cityChangeHandler(item, key)}
                    onSearch={onSearch}
                    filterOption={filterOption}
                  ></Select>
                </Form.Item>
              </Col>
            </Row>
          </div>

          {worksiteCheck == false ? (
            <>
              <hr
                style={{
                  width: "100%",
                  backgroundColor: "#d9dbd1",
                  // height: '0.1vw',
                  marginTop: "20px",
                  marginBottom: "20px",
                  opacity: ".2",
                }}
              />

              <h4 className="CalendarEvent-Modal-Card-header-type">
                Mode
                {updateEventCheck == true ? null : <span className="CalendarEvent-MandatoryStar">*</span>}
              </h4>

              <div className="Input-date">
                <select disabled={updateEventCheck == true ? true : false} defaultValue="Select" value={modeSelect} onChange={ModeChangeFunc} className="CalendarEvent-Modal-TimePicker-style">
                  <option value="">Select</option>

                  {modeList.map((time, idex) => {
                    return (
                      <option key={idex} value={time.value}>
                        {time.dispValue}
                      </option>
                    );
                  })}
                </select>

                {modeSelect == "" && worksiteCheck == false && bookEventCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Mode is mandatory</p> : null}
              </div>
            </>
          ) : null}
          {updateEventCheck == true && props.Data.is_main_Event == false ? (
            <></>
          ) : (
            <>
              {worksiteCheck == true ? (
                ""
              ) : (
                <>
                  <hr
                    style={{
                      width: "100%",
                      backgroundColor: "#d9dbd1",
                      // height: '0.1vw',
                      marginTop: "20px",
                      marginBottom: "20px",
                      opacity: ".2",
                    }}
                  />

                  <h4 className="CalendarEvent-Modal-Card-header-type">
                    Duration
                    <span className="CalendarEvent-MandatoryStar">*</span>
                  </h4>
                  <div className="CalendarEvent-Modal-Card-time-duration-flex">
                    <button
                      disabled={(updateEventCheck == true && eventStatus == "closed") || eventStatus == "cancelled"}
                      onClick={DurationSelectTimeFunc}
                      value={eventDurationType}
                      className={durationButton.select_time == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                    >
                      Select Time
                    </button>

                    <button
                      disabled={(updateEventCheck == true && eventStatus == "closed") || eventStatus == "cancelled"}
                      onClick={DurationAllDayFunc}
                      value={eventDurationType}
                      className={durationButton.all_day == true ? "CalendarEvent-Modal-Card-eventwith-onclick-button-style" : "CalendarEvent-Modal-Card-eventwith-static-button-style"}
                    >
                      All Day
                    </button>
                  </div>
                </>
              )}

              {durationButton.select_time == true && worksiteCheck == false ? (
                <div>
                  <div className="CalendarEvent-Modal-datePicker-button-flex">
                    <div className="CalendarEvent-Modal-date-column-flex">
                      <h4 className={durationStartDateDiffCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}>
                        Event Start Date
                        <span className="CalendarEvent-MandatoryStar">*</span>
                      </h4>
                      <div className="Input-date">
                        {updateEventCheck == true ? (
                          <DatePicker
                            onChange={StartDateFunc}
                            inputReadOnly={true}
                            allowClear={false}
                            disabled={(updateEventCheck == true && props.Data.mainEventID != null) || eventStatus == "closed" || eventStatus == "cancelled"}
                            disabledDate={(d) => !d || d.isBefore(minimumDate)}
                            defaultValue={durationStartDate}
                            value={durationStartDate}
                            format="MM-DD-YYYY"
                            className={durationStartDateDiffCheck == false ? "CalendarEvent-Modal-empty-picker-style" : "CalendarEvent-Modal-picker-style"}
                          />
                        ) : (
                          <DatePicker
                            onChange={StartDateFunc}
                            inputReadOnly={true}
                            allowClear={false}
                            disabledDate={(d) => !d || d.isBefore(minimumDate)}
                            defaultValue={durationStartDate}
                            value={durationStartDate}
                            format="MM-DD-YYYY"
                            className={durationStartDateDiffCheck == false ? "CalendarEvent-Modal-empty-picker-style" : "CalendarEvent-Modal-picker-style"}
                          />
                        )}
                        {durationStartDateOperation == undefined && bookEventCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Start Date is mandatory</p> : null}
                        {durationStartDateDiffCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Start Date should not be after the End date</p> : null}
                      </div>
                    </div>
                    <div className="CalendarEvent-Modal-date-column-flex">
                      <h4 className={durationStartTimeDiffCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}>
                        Start Time
                        <span className="CalendarEvent-MandatoryStar">*</span>
                      </h4>

                      <div className="Input-date">
                        {updateEventCheck == true ? (
                          <select
                            disabled={(updateEventCheck == true && props.Data.mainEventID != null) || eventStatus == "closed" || eventStatus == "cancelled"}
                            value={startTimeSelect}
                            onChange={StartTimeChangeFunc}
                            className={durationEndTimeDiffCheck == false ? "CalendarEvent-Width-Custom-Time" : "CalendarEvent-Width-Custom-Time"}
                          >
                            <option value="">Select</option>

                            {timeList.map((time, index) => {
                              return (
                                <option key={index} value={time.value}>
                                  {time.dispValue}
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          <select value={startTimeSelect} onChange={StartTimeChangeFunc} className={durationEndTimeDiffCheck == false ? "CalendarEvent-Width-Custom-Time" : "CalendarEvent-Width-Custom-Time"}>
                            <option value="">Select</option>

                            {timeList.map((time, index) => {
                              return (
                                <option key={index} value={time.value}>
                                  {time.dispValue}
                                </option>
                              );
                            })}
                          </select>
                        )}
                        {startTimeSelect == "" && bookEventCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Start Time is mandatory</p> : null}
                        {durationStartTimeDiffCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Start Time should be less than end time</p> : null}
                      </div>
                    </div>
                  </div>
                  <div className="CalendarEvent-Modal-duration-style">
                    <div className="CalendarEvent-Modal-datePicker-button-flex">
                      <div className="CalendarEvent-Modal-date-column-flex">
                        <h4
                          className={durationEndDateDiffCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                        // className="CalendarEvent-Modal-Card-header-type"
                        >
                          Event End Date
                          <span className="CalendarEvent-MandatoryStar">*</span>
                        </h4>

                        <div className="Input-date">
                          {updateEventCheck == true ? (
                            <DatePicker
                              onChange={EndDateFunc}
                              inputReadOnly={true}
                              allowClear={false}
                              disabled={(updateEventCheck == true && props.Data.mainEventID != null) || eventStatus == "closed" || eventStatus == "cancelled"}
                              // defaultValue={durationEndDate}
                              disabledDate={(d) => d.isBefore(durationStartDate)}
                              format="MM-DD-YYYY"
                              value={durationEndDate}
                              className="CalendarEvent-Modal-picker-style"
                            />
                          ) : (
                            <DatePicker
                              onChange={EndDateFunc}
                              inputReadOnly={true}
                              allowClear={false}
                              // defaultValue={durationEndDate}
                              disabledDate={(d) => d.isBefore(durationStartDate)}
                              format="MM-DD-YYYY"
                              value={durationEndDate}
                              className="CalendarEvent-Modal-picker-style"
                            />
                          )}
                          {durationEndDateOperation == undefined && bookEventCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">End Date is mandatory</p> : null}
                          {durationEndDateDiffCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">End Date should be after start date</p> : null}
                        </div>
                      </div>
                      <div className="CalendarEvent-Modal-date-column-flex">
                        <h4
                          className={durationEndTimeDiffCheck == false ? "CalendarEvent-Modal-Card-empty-text-header-type" : "CalendarEvent-Modal-Card-header-type"}
                        // className="CalendarEvent-Modal-Card-header-type"
                        >
                          End Time
                          <span className="CalendarEvent-MandatoryStar">*</span>
                        </h4>

                        <div className="Input-date">
                          {updateEventCheck == true ? (
                            <select
                              value={endTimeSelect}
                              onChange={EndTimeChangeFunc}
                              disabled={(updateEventCheck == true && props.Data.mainEventID != null) || eventStatus == "closed" || eventStatus == "cancelled"}
                              className={durationEndTimeDiffCheck == false ? "CalendarEvent-Width-Custom-Time" : "CalendarEvent-Width-Custom-Time"}
                            >
                              <option value="">Select</option>

                              {timeList.map((time, index) => {
                                return (
                                  <option key={index} value={time.value}>
                                    {time.dispValue}
                                  </option>
                                );
                              })}
                            </select>
                          ) : (
                            <select value={endTimeSelect} onChange={EndTimeChangeFunc} className={durationEndTimeDiffCheck == false ? "CalendarEvent-Width-Custom-Time" : "CalendarEvent-Width-Custom-Time"}>
                              <option value="">Select</option>

                              {timeList.map((time, index) => {
                                return (
                                  <option key={index} value={time.value}>
                                    {time.dispValue}
                                  </option>
                                );
                              })}
                            </select>
                          )}

                          {endTimeSelect == "" && bookEventCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">End Time is mandatory</p> : null}
                          {durationEndTimeDiffCheck == false ? (
                            <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">End time should not be past start time</p>
                          ) : durationEndTimeSameCheck == false ? (
                            <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">End Time should not be Same from the Start Time</p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="CalendarEvent-Modal-datePicker-button-flex">
                    <div className="CalendarEvent-Modal-date-column-flex">
                      <h4 className="CalendarEvent-Modal-Card-header-type">
                        Event Start Date
                        <span className="CalendarEvent-MandatoryStar">*</span>
                      </h4>

                      <div className="Input-date">
                        {updateEventCheck == true ? (
                          <DatePicker
                            onChange={StartDateFunc}
                            inputReadOnly={true}
                            disabled={(updateEventCheck == true && worksiteCheck == true && props.Data.mainEventID != null) || eventStatus == "closed" || eventStatus == "cancelled"}
                            allowClear={false}
                            disabledDate={
                              // updateEventCheck == true
                              // ? d => !d || d.isBefore(props.Data?.start_date)
                              // :
                              (d) => !d || d.isBefore(minimumDate)
                            }
                            defaultValue={durationStartDate}
                            value={durationStartDate}
                            format="MM-DD-YYYY"
                            className={durationStartDateDiffCheck == false ? "CalendarEvent-Modal-empty-picker-style" : "CalendarEvent-Modal-picker-style"}
                          />
                        ) : (
                          <DatePicker
                            onChange={StartDateFunc}
                            inputReadOnly={true}
                            allowClear={false}
                            disabledDate={(d) => !d || d.isBefore(minimumDate)}
                            defaultValue={durationStartDate}
                            value={durationStartDate}
                            format="MM-DD-YYYY"
                            className={durationStartDateDiffCheck == false ? "CalendarEvent-Modal-empty-picker-style" : "CalendarEvent-Modal-picker-style"}
                          />
                        )}
                      </div>
                    </div>

                    {durationStartDateOperation == undefined && bookEventCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Start Date is mandatory</p> : null}
                  </div>
                </div>
              )}
            </>
          )}
          {employee_code == "CH3" || employee_code == "CH4" || employee_code == "CH5" || employee_code == "CH6" || employee_code == "CH7" || employee_code == "CH8" || employee_code == "CH9" || employee_code == "CH10" ? null : (
            <>
              {updateEventCheck == true && props.Data.followup_1 == false ? (
                <></>
              ) : (
                <div>
                  {/* <hr
                    style={{
                      width: "100%",
                      backgroundColor: "#d9dbd1",
                      // height: '0.1vw',
                      marginTop: "20px",
                      marginBottom: "20px",
                      opacity: ".2",
                    }}
                  /> */}
                  {/* {worksiteCheck == true ? (
                    <h4 className="CalendarEvent-Modal-Card-header-type">
                      Follow Up 1 Date
                      <span className="CalendarEvent-MandatoryStar">*</span>
                    </h4>
                  ) : (
                    <h4 className="CalendarEvent-Modal-Card-header-type">
                      Follow Up 1 Date
                    </h4>
                  )} */}

                  <div>
                    <div className="CalendarEvent-Modal-datePicker-button-flex">
                      <div className="CalendarEvent-Modal-date-column-flex">
                        <div className="Input-date">
                          {/* {updateEventCheck == true ? (
                            <DatePicker
                              onChange={FollowUpOneDateFunc}
                              inputReadOnly={true}
                              disabled={
                                updateEventCheck == true &&
                                props.Data.followup_2 === true &&
                                eventStatus === "open"
                                  ? true
                                  : false
                              }
                              allowClear={false}
                              disabledDate={(d) =>
                                d.isSame(durationEndDate) ||
                                d.isBefore(durationEndDate)
                              }
                              defaultValue={followUpOneDate}
                              value={followUpOneDate}
                              format="MM-DD-YYYY"
                              className={
                                durationStartDateDiffCheck == false
                                  ? "CalendarEvent-Modal-empty-picker-style"
                                  : "CalendarEvent-Modal-picker-style"
                              }
                            />
                          ) : (
                            <DatePicker
                              onChange={FollowUpOneDateFunc}
                              inputReadOnly={true}
                              allowClear={false}
                              disabledDate={(d) =>
                                d.isSame(durationEndDate) ||
                                d.isBefore(durationEndDate)
                              }
                              defaultValue={followUpOneDate}
                              value={followUpOneDate}
                              format="MM-DD-YYYY"
                              className={
                                durationStartDateDiffCheck == false
                                  ? "CalendarEvent-Modal-empty-picker-style"
                                  : "CalendarEvent-Modal-picker-style"
                              }
                            />
                          )} */}

                          {/* {followUpOneDateOperation == undefined &&
                          worksiteCheck == true &&
                          bookEventCheck == false ? (
                            <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">
                              Follow Up 1 Date is mandatory
                            </p>
                          ) : null}
                          {durationEndDate >= followUpOneDateOperation &&
                          updateEventCheck == false ? (
                            <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">
                              Follow Up 1 Date should not be less than End date
                            </p>
                          ) : null} */}
                          {/* {followUpOneDateOperation >= followUpTwoDateOperation && updateEventCheck == false ?
              <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Follow Up 1 Date should be a day before Follow Up 2 Date</p> : null} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {updateEventCheck == true && props.Data.followup_2 == false ? (
                <></>
              ) : (
                <div className="CalendarEvent-Modal-duration-style">
                  {/* <hr
                    style={{
                      width: "100%",
                      backgroundColor: "#d9dbd1",
                      // height: '0.1vw',
                      marginTop: "20px",
                      // marginBottom:'20px',
                      opacity: ".2",
                    }}
                  /> */}

                  {/* {worksiteCheck == true ? (
                    <h4 className="CalendarEvent-Modal-Card-header-type">
                      Follow Up 2 Date
                      <span className="CalendarEvent-MandatoryStar">*</span>
                    </h4>
                  ) : (
                    <h4 className="CalendarEvent-Modal-Card-header-type">
                      Follow Up 2 Date
                    </h4>
                  )} */}

                  <div>
                    <div className="CalendarEvent-Modal-datePicker-button-flex">
                      <div className="CalendarEvent-Modal-date-column-flex">
                        <div className="Input-date">
                          {/* {updateEventCheck == true ? (
                            <DatePicker
                              onChange={FollowUpTwoDateFunc}
                              inputReadOnly={true}
                              // disabled={updateEventCheck == true
                              //   && (props.Data.followup_2 === true && eventStatus === 'open') ? false : true
                              // }
                              allowClear={false}
                              disabledDate={(d) =>
                                d.isSame(followUpOneDate) ||
                                d.isBefore(followUpOneDate)
                              }
                              defaultValue={followUpTwoDate}
                              value={followUpTwoDate}
                              format="MM-DD-YYYY"
                              className={
                                durationStartDateDiffCheck == false
                                  ? "CalendarEvent-Modal-empty-picker-style"
                                  : "CalendarEvent-Modal-picker-style"
                              }
                            />
                          ) : (
                            <DatePicker
                              onChange={FollowUpTwoDateFunc}
                              inputReadOnly={true}
                              allowClear={false}
                              disabledDate={(d) =>
                                d.isSame(followUpOneDate) ||
                                d.isBefore(followUpOneDate)
                              }
                              defaultValue={followUpTwoDate}
                              value={followUpTwoDate}
                              format="MM-DD-YYYY"
                              className={
                                durationStartDateDiffCheck == false
                                  ? "CalendarEvent-Modal-empty-picker-style"
                                  : "CalendarEvent-Modal-picker-style"
                              }
                            />
                          )} */}

                          {/* {followUpTwoDateOperation == undefined &&
                          worksiteCheck == true &&
                          bookEventCheck == false ? (
                            <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">
                              Follow Up 2 Date is mandatory
                            </p>
                          ) : null}
                          {durationEndDate >= followUpTwoDateOperation &&
                          updateEventCheck == false ? (
                            <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">
                              Follow Up 2 Date should not be less than End date
                            </p>
                          ) : null} */}
                          {/* {followUpOneDateOperation >= followUpTwoDateOperation ?
              <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Follow Up 2 Date should be a day after Follow Up 1 Date</p> : null} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <hr
            style={{
              width: "100%",
              backgroundColor: "#d9dbd1",
              // height: '0.1vw',
              // marginTop: '20px',
              marginBottom: "20px",
              opacity: ".2",
            }}
          />

          {reporters_restrict == "Agent" ? (
            <></>
          ) : reporters_restrict == "Senior Manager" && (employee_code == "CH4" || employee_code == "CH5" || employee_code == "CH6" || employee_code == "CH8" || employee_code == "CH10") ? (
            <></>
          ) : (
            <>
              {/* <hr
                style={{
                  width: "100%",
                  backgroundColor: "#d9dbd1",
                  // height: '0.1vw',
                  marginTop: "20px",
                  marginBottom: "20px",
                  opacity: ".2",
                }}
              /> */}

              {worksiteCheck == true ? (
                <h4 className="CalendarEvent-Modal-Card-header-type">
                  Add Team Member
                  <span className="CalendarEvent-MandatoryStar">*</span>
                </h4>
              ) : (
                <h4 className="CalendarEvent-Modal-Card-header-type">Add Team Member</h4>
              )}

              <div className="Todo-Create-Search calSearch">
                {/* <Select
                      showSearch
                      autoComplete="on"
                          disabled={updateEventCheck == true && eventStatus == 'closed' || eventStatus == 'cancelled'}
                          value={teamMemberData}
                          allowClear={false}
                          style={{width: '100%'}}
                          options={hierarAgentList}
                          onChange={(text,data)=> onChangeTeam(text,data)}
                          onSelect={onSelectTeam}
                          placeholder='Search by Name'
                          filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }
                        >
                        </Select> */}

                <AutoComplete
                  disabled={(updateEventCheck == true && eventStatus == "closed") || eventStatus == "cancelled"}
                  value={teamMemberData}
                  allowClear={false}
                  style={{ width: "100%" }}
                  options={hierarAgentList}
                  onChange={(text, data) => onChangeTeam(text, data)}
                  onSelect={onSelectTeam}
                  filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                >
                  <Search placeholder="Search by Name" />
                </AutoComplete>
              </div>

              {teamMemberChip?.length !== 0 && (
                <div
                  style={{
                    display: "flex",
                    flexFlow: "wrap",
                    alignItems: "center",
                  }}
                >
                  {teamMemberChip?.map((item, index) => {
                    return (
                      <div style={{ marginRight: 10, marginTop: 10 }}>
                        {updateEventCheck == true ? (
                          <Button
                            disabled={(updateEventCheck == true && eventStatus == "closed") || eventStatus == "cancelled"}
                            size="small"
                            type="primary"
                            style={{
                              backgroundColor: "#00ACC1",
                              border: "none",
                              display: "flex",
                              alignItems: "center",
                            }}
                            shape="round"
                          >
                            {item.value}
                            <CloseOutlined onClick={() => removeTeamMember(item, index)} />
                          </Button>
                        ) : (
                          <Button
                            disabled={(updateEventCheck == true && eventStatus == "closed") || eventStatus == "cancelled"}
                            size="small"
                            type="primary"
                            style={{
                              backgroundColor: "#00ACC1",
                              border: "none",
                              display: "flex",
                              alignItems: "center",
                            }}
                            shape="round"
                          >
                            {item}
                            <CloseOutlined onClick={() => removeTeamMember(item, index)} />
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {worksiteCheck == true && ownerCollectn.length < 1 && bookEventCheck == false ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Team Member is mandatory</p> : null}
            </>
          )}

          <hr
            style={{
              width: "100%",
              backgroundColor: "#d9dbd1",
              // height: '0.1vw',
              marginTop: "20px",
              marginBottom: "20px",
              opacity: ".2",
            }}
          />

          <h4 style={{ paddingBottom: "10px" }} className="CalendarEvent-Modal-Card-header-type">
            Status
            <span className="CalendarEvent-MandatoryStar">*</span>
          </h4>

          <div className="CalendarEvent-Modal-Card-status">
            {updateEventCheck == true ? (
              <button
                value={eventStatus}
                onClick={StatusTypeOpenFunc}
                disabled={(updateEventCheck == true && props.Data.statusType == "closed") || props.Data.statusType == "cancelled"}
                className={statusType.openStatus == true ? "CalendarEvent-Modal-Card-Open-status-onclick-button-style" : "CalendarEvent-Modal-Card-Open-status-static-button-style"}
              >
                Open
              </button>
            ) : (
              <button value={eventStatus} onClick={StatusTypeOpenFunc} className={statusType.openStatus == true ? "CalendarEvent-Modal-Card-Open-status-onclick-button-style" : "CalendarEvent-Modal-Card-Open-status-static-button-style"}>
                Open
              </button>
            )}

            {updateEventCheck == true ? (
              <button
                value={eventStatus}
                onClick={StatusTypeCancelFunc}
                disabled={updateEventCheck == true && props.Data.statusType == "closed"}
                className={statusType.cancelStatus == true ? "CalendarEvent-Modal-Card-Cancel-status-onclick-button-style" : "CalendarEvent-Modal-Card-Cancel-status-static-button-style"}
              >
                Cancel Event
              </button>
            ) : null}

            <button
              value={eventStatus}
              onClick={StatusTypeCloseFunc}
              // disabled={updateEventCheck == true && eventStatus == 'cancelled'}
              className={statusType.closeStatus == true ? "CalendarEvent-Modal-Card-Close-status-onclick-button-style" : "CalendarEvent-Modal-Card-Close-status-static-button-style"}
            >
              Close
            </button>
          </div>

          <div className="Input-date">
            <h4 className="CalendarEvent-Modal-Card-header-type">Enter Remarks</h4>

            <textarea
              type="text"
              maxLength="200"
              value={statusReasonText}
              onInput={StatusTypeReasonFunc}
              disabled={(updateEventCheck == true && props.Data?.statusType == "closed") || props.Data?.statusType == "cancelled"}
              placeholder="Enter here"
              className="CalendarEvent-style-Custom-Input CalendarEvent-Modal-TimePicker-style"
            />
          </div>

          {
            // setURL ? <></> :
            updateEventCheck == true && statusType.closeStatus == true && worksiteCheck == true && props.Data.followup_1 == true && props.Data.hasOwnProperty("eventAttendeeListFileUrl") == false ? (
              <></>
            ) : updateEventCheck == true && statusType.closeStatus == true && worksiteCheck == true && props.Data.followup_2 == true && props.Data.hasOwnProperty("eventAttendeeListFileUrl") == false ? (
              <></>
            ) : statusType.closeStatus == true && worksiteCheck == true ? (
              <>
                <div className="CalenderEvent-Upload-Button-Hide-MobileView">
                  <hr
                    style={{
                      width: "100%",
                      backgroundColor: "#d9dbd1",
                      // height: '0.1vw',
                      marginTop: "20px",
                      marginBottom: "20px",
                      opacity: ".2",
                    }}
                  />

                  {statusType.closeStatus == true && worksiteCheck == true ? (
                    <h4 className="CalendarEvent-Modal-Card-header-type">
                      Upload Attendance Sheet
                      <span className="CalendarEvent-MandatoryStar">*</span>
                    </h4>
                  ) : (
                    <h4 className="CalendarEvent-Modal-Card-header-type">Upload Attendance Sheet</h4>
                  )}

                  <div className="CalendarEvent-Input-Upload-Parent">
                    <div>
                      {updateEventCheck == true && eventStatus == "closed" && props.Data.eventAttendeeListFailedFileUrl ? (
                        <Row className="CalenderEvent-UploadAttendanveValue-Download">
                          <a href={props.Data.eventAttendeeListFailedFileUrl}>
                            <Button icon={<DownloadOutlined />}>
                              <span> {props.Data.eventAttendeeListFileName}</span>
                              {/* <p style={{color:'red', paddingTop:'5px'}}>failed</p> */}
                            </Button>
                          </a>
                          {/* <div className="CalendarEvent-Input-Upload-Parent" style={{paddingTop:'5px'}}>
                  <input type="file"
                   onChange={handleUploadInput}
                   accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                   className="CalendarEvent-Modal-Hide-Input"
                   />
                   </div> */}
                        </Row>
                      ) : updateEventCheck == true && eventStatus == "closed" && props.Data.eventAttendeeListFileUrl ? (
                        <Row className="CalenderEvent-UploadAttendanveValue-Download">
                          <a href={props.Data.eventAttendeeListFileUrl}>
                            <Button icon={<DownloadOutlined />}>
                              <span> {props.Data.eventAttendeeListFileName}</span>
                              {/* <p style={{color:'green', paddingTop:'5px'}}>success</p> */}
                            </Button>
                          </a>
                        </Row>
                      ) : (
                        <input
                          type="file"
                          onChange={handleUploadInput}
                          disabled={(updateEventCheck == true && props.Data.eventAttendeeListFileUrl && eventStatus == "closed") || eventStatus == "cancelled"}
                          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                          className="CalendarEvent-Modal-Hide-Input"
                        />
                      )}
                    </div>
                    {updateEventCheck == true && eventStatus == "closed" && props.Data.eventAttendeeListFileUrl ? (
                      ""
                    ) : (
                      <Row className="CalenderEvent-Upload-Button">
                        <a href="https://image-upload-bucket-2019.s3.amazonaws.com/ab-insurance-dev/ec3bcf7a4a298bea29d624ef6ac6c8494120fd70fe3164d97308c0ca37a224d7.xlsx">
                          <Button icon={<DownloadOutlined />}>
                            <span>Sample File</span>
                          </Button>
                        </a>
                      </Row>
                    )}
                  </div>
                </div>
              </>
            ) : null
          }

          {(statusType.closeStatus == true && worksiteCheck == true && bookEventCheck == false && uploadAttendanveValue == undefined) || "" ? (
            <div className="CalenderEvent-Upload-Button-Hide-MobileView">
              <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Upload Attendance is Mandatory</p>
            </div>
          ) : null}

          {updateEventCheck == true && statusType.closeStatus == true && worksiteCheck == true && props.Data.followup_1 == true && props.Data.hasOwnProperty("eventAttendeeListFileUrl") == false ? (
            <></>
          ) : updateEventCheck == true && statusType.closeStatus == true && worksiteCheck == true && props.Data.followup_2 == true && props.Data.hasOwnProperty("eventAttendeeListFileUrl") == false ? (
            <></>
          ) : statusType.closeStatus == true && worksiteCheck == true ? (
            <>
              <hr
                style={{
                  width: "100%",
                  backgroundColor: "#d9dbd1",
                  // height: '0.1vw',
                  marginTop: "20px",
                  marginBottom: "20px",
                  opacity: ".2",
                }}
              />
              <div className="Input-date">
                {statusType.closeStatus == true && worksiteCheck == true ? (
                  <h4 className="CalendarEvent-Modal-Card-header-type">
                    Count of participants
                    <span className="CalendarEvent-MandatoryStar">*</span>
                  </h4>
                ) : (
                  <h4 className="CalendarEvent-Modal-Card-header-type">Count of participants</h4>
                )}

                <input
                  type="number"
                  min="0"
                  placeholder="Enter here"
                  value={countOfParticipants}
                  onInput={CountOfParticipantsFunc}
                  disabled={(updateEventCheck == true && props.Data.eventAttendeeListFileUrl && eventStatus == "closed") || eventStatus == "cancelled"}
                  className="CalendarEvent-Modal-TimePicker-style"
                />

                {countOfParticipants == "" && statusType.closeStatus == true && bookEventCheck == false && worksiteCheck == true ? <p className="CalendarEvent-Modal-Card-empty-text-bottom-type">Count of participants is mandatory</p> : null}
              </div>
            </>
          ) : null}
          <div>
            <div className="CalendarEvent-Modal-datePicker-button-flex"></div>
          </div>
        </div>

        {/* </div> */}

        <div className="CalendarEvent-Modal-book-appointment-flex">
          {updateEventCheck == true ? (
            <button
              onClick={() => {
                BookAppointmentFunc();
                newEvent();
              }}
              disabled={updateEventCheck == true && props.Data?.statusType == "closed"}
              className={"CalendarEvent-Modal-book-appointment-button-style"}
            >
              {updateEventCheck == true ? "Update Event" : "Create Event"}
            </button>
          ) : (
            <button
              onClick={() => {
                BookAppointmentFunc();
                newEvent();
              }}
              disabled={bookEventCheck == false}
              className={"CalendarEvent-Modal-book-appointment-button-style"}
            >
              {updateEventCheck == true ? "Update Event" : "Create Event"}
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
}
