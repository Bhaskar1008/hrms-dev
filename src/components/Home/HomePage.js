import React, { Fragment, useEffect, useState } from "react";
import "./HomePage.css";
import "../Activitity Tracker/RightSide-Todo/Todo&Archive-Css/TodoCards.css";
import { Image, Button, Row, Col, Card, Select } from "antd";
// import { Bar } from '@ant-design/charts';
import "antd/dist/antd.css";
import "../KpiDashboard/KpiDashboard.css";
import * as actions from "../../store/actions/index";
import * as leadActions from "../../store/actions/leads";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import moment from "moment";
import _ from "lodash";
import { Link, useHistory } from "react-router-dom";
import FloatButton from "../FloatButton/FloatButton";
import { Column } from "@ant-design/charts";
import axiosRequest from "../../axios-request/request.methods";
import { checkuserAccess, stoageGetter } from "../../helpers";

import {
  ConsoleSqlOutlined,
  FormOutlined,
  ShopOutlined,
} from "@ant-design/icons";

// import image -----
import business_img from "../../assets/DashboardIconNew/Group3366.png";
import activity_img from "../../assets/DashboardIconNew/Group3371.png";
import opportunities_img from "../../assets/DashboardIconNew/Group3367.png";
import todo_img from "../../assets/DashboardIconNew/Group3375.png";
import sales_guide_img from "../../assets/DashboardIconNew/Group3369.png";
import event_img from "../../assets/DashboardIconNew/Group127.png";
import application_img from "../../assets/DashboardIconNew/Group3373.png";
import action_data_img from "../../assets/Actionnodata.png";
import mapped_img from "../../assets/DashboardIconNew/Group3381.png";
import reward_img from "../../assets/DashboardIconNew/Group3379.png";
import contest_img from "../../assets/DashboardIconNew/Group3151.png";
import club_img from "../../assets/DashboardIconNew/Group3157.png";
import birthday_img from "../../assets/DashboardIconNew/Group3376.png";
import left_arrow from "../../assets/Subtraction10.png";
import right_arrow from "../../assets/Subtraction12.png";
import TodoClock from "../../assets/todoclock.png";
import hamburger from "../../assets/hamburger8@2x.png";
import checkboxoutline from "../../assets/checkboxoutline.png";
import truecheckbox from "../../assets/CalenderIcons/truecheckbox.png";
import product_icon from "../../assets/Producticon.png";
import resource_icon from "../../assets/learningcenter.png";

// import { PowerBIEmbed } from 'powerbi-client-react';
// import { models } from "powerbi-client";

function Modal({ children, shown, close }) {
  return shown ? (
    <div
      className="modal-backdrop"
      onClick={() => {
        // close modal when outside of modal is clicked
        close();
      }}
    >
      <div
        className="modal-content"
        onClick={e => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        {/* <button onClick={close}>Close</button> */}
        {children}
      </div>
    </div>
  ) : null;
}

const HomePage = () => {
  const [modalShown, toggleModal] = useState(false);
  const [activitydata, setActivityData] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const user_data = stoageGetter("user");
  let loginUserID = user_data.id;

  const getPercenTage = (x, y) => {
    let val = isNaN(y / x) * 100 ? 0 : checkValidity((y / x) * 100);
    return isFloat(val)
      ? parseInt(val).toPrecision(3)
      : parseInt(val).toPrecision(3);
  };

  const isFloat = (n) => {
    try {
      return Number(n) === n && n % 1 !== 0;
    } catch (err) {
    }
  };

  const checkValidity = (data) => {
    try {
      if (
        data === "" ||
        data === null ||
        data === undefined ||
        data === "undefined" ||
        data === "-" ||
        data === Infinity
      ) {
        return 0;
      } else {
        return data;
      }
    } catch (err) {}
  };

  const login_user_data = stoageGetter("user");

  if (login_user_data === null) history.push("/login");

  // const _token = useSelector((state) => state.login.token)
  const agent_id = login_user_data.agentId;
  // const logged_in_user = useSelector((state) => state.login.user_name)
  const logged_in_user =
    login_user_data.firstName + " " + login_user_data.lastName;
  // const id = useSelector((state) => state.login.id)
  const id = login_user_data.id;
  // const userId = useSelector((state) => state.login?.user?.id)
  const userId = login_user_data.id;
  // const channelCode = useSelector((state) => state.login?.user?.channelCode)
  const channelCode = login_user_data.channelCode;
  let _storeData = useSelector((state) => state);

  const _accessActivityTracker = checkuserAccess("myEvents", _storeData.login); //Activity Tracker
  const _accessDailyBusiness = checkuserAccess("myBusiness", _storeData.login); // Daily Business
  const _accessOpportunities = checkuserAccess("myLeads", _storeData.login); // Opportunities
  const _accessKpi = checkuserAccess("businessDashboard", _storeData.login); // KPI Dashbord

  const _accessTodo = checkuserAccess("todoTask", _storeData.login); // TODO
  const _accessSalesGuide = checkuserAccess("sales_guide", _storeData.login); // Sales Guide

  const [width, setWidth] = useState(window.innerWidth);
  const [goal, setGoal] = useState({});
  const [getTodoDataArray, setGetTodoDataArray] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const [showData, setShowData] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
  const [showBusinessData, setShowBusinessData] = useState(false);

  const [businessDropdown, setBusinessDropdown] = useState("");
  const [businessDropArray, setBusinessDropArray] = useState([]);

  const [businessRetention, setBusinessRetention] = useState({});
  const [businessGWP, setBusinessGWP] = useState({});
  const [businessActivation, setBusinessActivation] = useState({});
  const [opportunities, setOpportunities] = useState([]);



  var routename = "";

  // KPI Dashboard

  const [KPICard, setKPICard] = useState([]);
  const [mtdYtd, setMtdYtd] = useState("");


  const employee_code = login_user_data.employeeCode;

  useEffect(() => {
    // simple using fetch
    dispatch(actions.createCTPLQuotationSuccess({}))
    dispatch(actions.storeQuotationForm({}))
    // dispatch(actions.fetchModelSuccess({}))
    const fetchData = async () => {
      try {
        let data = await axiosRequest.get(
          `user/kpi/dashboard/${userId}?employeeCode=${employee_code}`
        );
        let res = data;
        setKPICard(res);
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  const handleundefinednull = (data) => {
    if (data == undefined || data == null || data == "") {
      return 0;
    } else {
      return data;
    }
  };

  //   KPI dashbaoard ??
  const checkHerrachyuserwise = (cardname,) => {
    let RoleCode = login_user_data.userRole[0].roleName;

    if(login_user_data.channelCode.channelCode === 'CH2' || login_user_data.channelCode.channelCode === 'CH1' || login_user_data.channelCode.channelCode === 'CH11'){

      if(cardname === "NOP"){
        if(RoleCode === 'Senior Manager' || RoleCode === 'Officer Prahri'
         || RoleCode === 'Officer Param'|| RoleCode === 'Office Head'
         || RoleCode === 'Area Head' || RoleCode === 'Regional Head'
         ||RoleCode === 'P & L Head' || RoleCode === 'Agent' ){

          return true
        }else {
          return false

        }
      }

      if(cardname === "APE"){
        if(RoleCode === 'Senior Manager' || RoleCode === 'Officer Prahri'
         || RoleCode === 'Officer Param'|| RoleCode === 'Office Head'
         || RoleCode === 'Area Head' || RoleCode === 'Regional Head'
         ||RoleCode === 'P & L Head' || RoleCode === 'Agent' ){
          return true
        }else {
          return false
        }
      }

      if(cardname === "NBP"){
        if(RoleCode === 'P & L Head'){
          return true
        }else {
          return false
        }
      }

      if(cardname === "No Records Found"){
        if(RoleCode === 'Insurance officer'){
          return true
        }else {
          return false
        }
      }

      if(cardname === "Productivity LA | OP"){
        if(RoleCode === 'Senior Manager'){
          return true
        }else {
          return false
        }
      }

      if(cardname === "Productivity LA | OP | SM"){
        if(RoleCode === 'Office Head'){
          return true
        }else {
          return false
        }
      }

      if(cardname === "Productivity LA | OP | SM | OH"){
        if(RoleCode === 'Area Head' || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head'){
          return true
        }else {
          return false
        }
      }

      // if(cardname === "LA Productivity"){
      //   if(RoleCode === 'Senior Manager' || RoleCode === 'Chief Business Officer' || RoleCode === 'Office Head' || RoleCode === 'Area Head' || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
      //     return true
      //   }else {
      //     return false
      //   }
      // }

      // if(cardname === "OP Productivity"){
      //   if(RoleCode === 'Senior Manager' || RoleCode === 'Chief Business Officer' || RoleCode === 'Office Head' || RoleCode === 'Area Head' || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
      //     return true
      //   }else {
      //     return false
      //   }
      // }

      // if(cardname === "SM Productivity"){
      //   if(RoleCode === 'Office Head' || RoleCode === 'Chief Business Officer' || RoleCode === 'Area Head' || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
      //     return true
      //   }else {
      //     return false
      //   }
      // }

      // if(cardname === "OH Productivity"){
      //   if(RoleCode === 'Area Head' || RoleCode === 'Chief Business Officer' || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
      //     return true
      //   }else {
      //     return false
      //   }
      // }

      if(cardname === "Agents Coded"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }
      if(cardname === "Agents Active | Agents Held"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }

      if(cardname === "OPs Active | Held"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }

      if(cardname === "IOs Active | Held"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return false
        }
      }


      if(cardname === "OPs Coded"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }

      if(cardname === "IOs Coded"){
        if(RoleCode === 'Senior Manager' || RoleCode === 'Chief Business Officer'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return false
        }
      }

      if(cardname === "SMs Held | Budgeted"){
        if(RoleCode === 'Office Head' || RoleCode === 'Chief Business Officer'
        || RoleCode === 'Area Head' || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return false
        }else {
          return false
        }
      }

      if(cardname === "SMs Active | Held"){
        if(RoleCode === 'Office Head'
        || RoleCode === 'Area Head' || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }

      if(cardname === "Active Agents Case Rate"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }

      if(cardname === "Average Ticket Size"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }

      // if(cardname === "Agents Active | Agents Held"){
      //   if(RoleCode === 'Senior Manager'
      //   || RoleCode === 'Office Head' || RoleCode === 'Area Head'
      //   || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
      //     return false
      //   }else {
      //     return false
      //   }
      // }

      if(cardname === "Product Mix"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Territory Manager' || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }

      if(cardname === "PPT Mix"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Territory Manager' || RoleCode === 'Regional Head'
        ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }

      if(cardname === "APR"){
        if(RoleCode === 'Senior Manager' || RoleCode === 'Officer Param' || RoleCode === 'Officer Prahri'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' || RoleCode === 'Agent'){
          return true
        }else {
          return false
        }
      }

      if(cardname === "13M Persistency"){
        if(RoleCode === 'Senior Manager' || RoleCode === 'Officer Param' || RoleCode === 'Officer Prahri'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head'||RoleCode === 'Agent' ){
          return true
        }else {
          return false
        }
      }


// __________________ second changes __________________ //

    }else if(login_user_data.channelCode.channelCode === 'CH3' || login_user_data.channelCode.channelCode === 'CH7' || login_user_data.channelCode.channelCode === 'CH9'){
      if(cardname === "APE"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head'){
          return true
        }else {
          return false
        }
      }

      if(cardname === "NBP"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head'){
          return true
        }else {
          return false
        }
      }
      if(cardname === "NOP"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head'){
          return true
        }else {
          return false
        }
      }

      if(cardname === "Productivity LA | OP"){
        if(RoleCode === 'Senior Manager'){
          return true
        }else {
          return false
        }
      }

      if(cardname === "Productivity LA | OP | SM"){
        if(RoleCode === 'Office Head'){
          return true
        }else {
          return false
        }
      }

      if(cardname === "Productivity LA | OP | SM | OH"){
        if(RoleCode === 'Area Head' || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head'){
          return true
        }else {
          return false
        }
      }

      // if(cardname === "LA Productivity"){
      //   if(RoleCode === 'Senior Manager' || RoleCode === 'Chief Business Officer' || RoleCode === 'Office Head' || RoleCode === 'Area Head' || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
      //     return true
      //   }else {
      //     return false
      //   }
      // }

      // if(cardname === "OP Productivity"){
      //   if(RoleCode === 'Senior Manager' || RoleCode === 'Chief Business Officer' || RoleCode === 'Office Head' || RoleCode === 'Area Head' || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
      //     return false
      //   }
      // }

      // if(cardname === "IM Productivity"){
      //   if(RoleCode === 'Senior Manager' || RoleCode === 'Chief Business Officer' || RoleCode === 'Office Head' || RoleCode === 'Area Head' || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
      //     return true
      //   }else {
      //     return false
      //   }
      // }

      // if(cardname === "SM Productivity"){
      //   if(RoleCode === 'Office Head' || RoleCode === 'Chief Business Officer' || RoleCode === 'Area Head' || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
      //     return true
      //   }else {
      //     return false
      //   }
      // }

      // if(cardname === "OH Productivity"){
      //   if(RoleCode === 'Area Head' || RoleCode === 'Chief Business Officer' || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
      //     return true
      //   }else {
      //     return false
      //   }
      // }


      if(cardname === "Agents Coded"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }

      if(cardname === "Agents Active | Agents Held"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }


      if(cardname === "IOs Coded"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return true
        }else{
          return false
        }
      }

      if(cardname === "IOs Active | Held"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return true
        }else{
         return false
        }
      }

      if(cardname === "SMs Active | Held"){
        if(RoleCode === 'Office Head'
        || RoleCode === 'Area Head' || RoleCode === 'Regional Head'
        ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }


      if(cardname === "Active Agents Case Rate"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }

      if(cardname === "Average Ticket Size"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }

      if(cardname === "Product Mix"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Territory Manager' || RoleCode === 'Regional Head'
        ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }

      if(cardname === "PPT Mix"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Territory Manager' || RoleCode === 'Regional Head'
        ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }

      if(cardname === "SMs Held | Budgeted"){
        if(RoleCode === 'Office Head' || RoleCode === 'Chief Business Officer'
        || RoleCode === 'Area Head' || RoleCode === 'Regional Head'
        ||RoleCode === 'P & L Head' ){
          return false
        }else {
          return false
        }
      }


      if(cardname === "13M Persistency"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Office Head' || RoleCode === 'Area Head'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }

      if(cardname === "No Records Found"){
        if(RoleCode === 'Insurance officer' || RoleCode === 'Agent'){
          return true
        }else {
          return false
        }
      }

  // __________________ third changes __________________ //

    }else if(login_user_data.channelCode.channelCode === 'CH4' || login_user_data.channelCode.channelCode === 'CH10' || login_user_data.channelCode.channelCode === 'CH8' || login_user_data.channelCode.channelCode === 'CH6' || login_user_data.channelCode.channelCode === 'CH5'){

      if(cardname === "NOP"){
        if(RoleCode === 'Senior Manager' || RoleCode === 'Territory Manager'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head'){
          return false
        }else {
          return false
        }
      }

      if(cardname === "APE"){
        if(RoleCode === 'Senior Manager' || RoleCode === 'Territory Manager'
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head'){
          return true
        }else {
          return false
        }
      }
      if(cardname === "13M Persistency"){
        if(RoleCode === 'Senior Manager'
         || RoleCode === 'Office Head' || RoleCode === 'Area Head'
         || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }
      if(cardname === "SMs Active | Held"){
        if(RoleCode === 'Territory Manager'|| RoleCode === 'Regional Head'
        ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }

      // if(cardname === "LA Productivity"){
      //   if(RoleCode === 'Senior Manager' || RoleCode === 'Territory Manager' || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head'){
      //     return true
      //   }else {
      //     return false
      //   }
      // }

      // if(cardname === "OP Productivity"){
      //   if(RoleCode === 'Senior Manager' || RoleCode === 'Territory Manager' || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head'){
      //     return true
      //   }else {
      //     return false
      //   }
      // }

      // if(cardname === "SM Productivity"){
      //   if(RoleCode === 'Territory Manager' || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head'){
      //     return true
      //   }else {
      //     return false
      //   }
      // }

      // if(cardname === "OH Productivity"){
      //   if(RoleCode === 'Territory Manager' || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head'){
      //     return true
      //   }else {
      //     return false
      //   }
      // }

      if(cardname === "Product Mix"){
        if(RoleCode === 'Senior Manager'
        || RoleCode === 'Territory Manager' || RoleCode === 'Regional Head'
        ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }

      if(cardname === "PPT Mix"){
        if(RoleCode === 'Senior Manager' || RoleCode === 'Office Head'
        || RoleCode === 'Territory Manager' || RoleCode === 'Regional Head'
        ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }
      if(cardname === "Average Ticket Size"){
        if(RoleCode === 'Territory Manager' || RoleCode === 'Regional Head'
        ||RoleCode === 'P & L Head' ){
          return true
        }else {
          return false
        }
      }
      if(cardname === "No Records Found"){
        if(RoleCode === 'Insurance officer'){
          return true
        }else {
          return false
        }
      }



    }
  };

  const colorCodeFunction = (t, a) =>{

    let target = Math.floor(t)
    let actual = Math.floor(a)


    if (target < actual ) {
      // green
      return '#08d608'
    }else if (target == actual) {
      // green
      return '#08d608'
    }else if(target > actual){
      // red
      return 'red'
    }
  }


  let kpi_All_obj = KPICard.length == 0 ? 0 : KPICard[0];
  let KPI_Apr = KPICard.length == 0 ? 0 : KPICard[0]?.APR;
  let m_persistency = KPICard.length == 0 ? 0 : KPICard[0]["13M_Persistency"];

  let pers_10 = KPICard.length == 0 ? 0 : KPICard[0]["PPT_<10%"] ? KPICard[0]["PPT_<10%"] : '0';
  let pers_11 = KPICard.length == 0 ? 0 : KPICard[0]["PPT_10-11%"] ? KPICard[0]["PPT_10-11%"] : '0';
  let pers_12 = KPICard.length == 0 ? 0 : KPICard[0]["PPT_>=12%"] ? KPICard[0]["PPT_>=12%"] : '0';


  let kpi_pro_mix1 = KPICard.length == 0 ? 0 : KPICard[0][`Plan_Par%`] ? KPICard[0][`Plan_Par%`] : '0';
  let kpi_pro_mix2 = KPICard.length == 0 ? 0 : KPICard[0][`Plan_NONPAR%`] ? KPICard[0][`Plan_NONPAR%`] : '0';
  let kpi_pro_mix3 = KPICard.length == 0 ? 0 : KPICard[0][`Plan_Ulip%`] ? KPICard[0][`Plan_Ulip%`] : '0';
  let kpi_pro_mix4 = KPICard.length == 0 ? 0 : KPICard[0][`Plan_Single%`] ? KPICard[0][`Plan_Single%`] : '0';

  // let kpi_pro_mix = [
  //   kpi_pro_mix1,
  //   kpi_pro_mix2,
  //   kpi_pro_mix3,
  //   kpi_pro_mix4,
  // ].join(" | ");

  let AgentsHeld1 = KPICard.length == 0 ? 0 : KPICard[0][`BusinessAct_MTD_LA`]
  let AgentsHeld2 = KPICard.length == 0 ? 0 : KPICard[0][`StatusAct_MTD_LA`]
  let AgentsHeld = [AgentsHeld1, AgentsHeld2].join(" | ");

  let productivity1 = KPICard.length == 0 ? 0 : KPICard[0][`LA_MTD_Prod`] ? KPICard[0][`LA_MTD_Prod`] : '0'
  let productivity2 = KPICard.length == 0 ? 0 : KPICard[0][`OP_MTD_Prod`] ? KPICard[0][`OP_MTD_Prod`] : '0'
  let productivity = [productivity1, productivity2].join(" | ");

  let productivity3 = KPICard.length == 0 ? 0 : KPICard[0][`LA_MTD_Prod`] ? KPICard[0][`LA_MTD_Prod`] : "0"
  let productivity4 = KPICard.length == 0 ? 0 : KPICard[0][`OP_MTD_Prod`] ? KPICard[0][`OP_MTD_Prod`] : '0'
  let productivity5 = KPICard.length == 0 ? 0 : KPICard[0][`SM_MTD_Prod`] ? KPICard[0][`SM_MTD_Prod`] : '0'
  let productivity6 = [productivity3, productivity4, productivity5].join(" | ");

  let productivity7 = KPICard.length == 0 ? 0 : KPICard[0][`LA_MTD_Prod`] ? KPICard[0][`LA_MTD_Prod`] : '0'
  let productivity8 = KPICard.length == 0 ? 0 : KPICard[0][`OP_MTD_Prod`] ? KPICard[0][`OP_MTD_Prod`] : '0'
  let productivity9 = KPICard.length == 0 ? 0 : KPICard[0][`SM_MTD_Prod`] ? KPICard[0][`SM_MTD_Prod`] : '0'
  let productivity10 = KPICard.length == 0 ? 0 : KPICard[0][`OH_MTD_Prod`] ? KPICard[0][`OH_MTD_Prod`] : '0'
  let productivity11 = [productivity7, productivity8, productivity9, productivity10].join(" | ");



  // --------------------- productivity ytd ---------------- //

  let productivity12 = KPICard.length == 0 ? 0 : KPICard[0][`LA_YTD_Prod`] ? KPICard[0][`LA_YTD_Prod`] : '0'
  let productivity13 = KPICard.length == 0 ? 0 : KPICard[0][`OP_YTD_Prod`] ? KPICard[0][`OP_YTD_Prod`] : '0'
  let productivity14 = [productivity12, productivity13].join(" | ");

  let productivity15 = KPICard.length == 0 ? 0 : KPICard[0][`LA_YTD_Prod`] ? KPICard[0][`LA_YTD_Prod`] : '0'
  let productivity16 = KPICard.length == 0 ? 0 : KPICard[0][`OP_YTD_Prod`] ? KPICard[0][`OP_YTD_Prod`] : '0'
  let productivity17 = KPICard.length == 0 ? 0 : KPICard[0][`SM_YTD_Prod`] ? KPICard[0][`SM_YTD_Prod`] : '0'
  let productivity18 = [productivity15, productivity16, productivity17].join(" | ");

  let productivity19 = KPICard.length == 0 ? 0 : KPICard[0][`LA_YTD_Prod`] ? KPICard[0][`LA_YTD_Prod`] : '0'
  let productivity20 = KPICard.length == 0 ? 0 : KPICard[0][`OP_YTD_Prod`] ? KPICard[0][`OP_YTD_Prod`] : '0'
  let productivity21 = KPICard.length == 0 ? 0 : KPICard[0][`SM_YTD_Prod`] ? KPICard[0][`SM_YTD_Prod`] : '0'
  let productivity22 = KPICard.length == 0 ? 0 : KPICard[0][`OH_YTD_Prod`] ? KPICard[0][`OH_YTD_Prod`] : '0'
  let productivity23 = [productivity19, productivity20, productivity21, productivity22].join(" | ");


  let AgentsHeld3 = KPICard.length == 0 ? 0 : KPICard[0][`BusinesAct_YTD_LA`]
  let AgentsHeld4 = KPICard.length == 0 ? 0 : KPICard[0][`BusinesAct_YTD_LA`]
  let AgentsHeld5 = [AgentsHeld3, AgentsHeld4].join(" | ");

  let sms_active_held1 = KPICard.length == 0 ? 0 : KPICard[0][`BusinessAct_MTD_SM`]
  let sms_active_held2 = KPICard.length == 0 ? 0 : KPICard[0][`StatusAct_MTD_SM`]
  let StatusAct_MTD = [sms_active_held1, sms_active_held2].join(" | ");

  let sms_active_held3 = KPICard.length == 0 ? 0 : KPICard[0][`BusinessAct_YTD_SM`]
  let sms_active_held4 = KPICard.length == 0 ? 0 : KPICard[0][`StatusAct_YTD_SM`]
  let StatusAct_YTD = [sms_active_held3, sms_active_held4].join(" | ");

  let sms_held_bud1 = KPICard.length == 0 ? 0 : KPICard[0][`Coding_MTD_SM`]
  let sms_held_bud2 = KPICard.length == 0 ? 0 : KPICard[0][`0`]
  let sms_held = [sms_held_bud1, sms_held_bud2].join(" | ");

  let sms_held_bud3 = KPICard.length == 0 ? 0 : KPICard[0][`Coding_YTD_SM`]
  let sms_held_bud4 = KPICard.length == 0 ? 0 : KPICard[0][`0`]
  let sms_held_ytd = [sms_held_bud3, sms_held_bud4].join(" | ");


  let opp_active_held1 = KPICard.length == 0 ? 0 : KPICard[0][`BusinessAct_MTD_OP`]
  let opp_active_held2 = KPICard.length == 0 ? 0 : KPICard[0][`StatusAct_MTD_OP`]
  let StatusAct_MTD_OPP = [opp_active_held1, opp_active_held2].join(" | ");

  let opp_active_held3 = KPICard.length == 0 ? 0 : KPICard[0][`BusinessAct_YTD_OP`]
  let opp_active_held4 = KPICard.length == 0 ? 0 : KPICard[0][`StatusAct_YTD_OP`]
  let StatusAct_YTD_OPP = [opp_active_held3, opp_active_held4].join(" | ");


  let KPIMTD = [

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "No Records Found",
      ShowCard:checkHerrachyuserwise("No Records Found",true),
      KPIdata: {
        Actual: {
          value: '',
          color: '',
          title: "",
          showtitle: false,
        },

      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "APE",
      ShowCard:checkHerrachyuserwise("APE",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.Issued_MTD_APE),
          color: colorCodeFunction(kpi_All_obj.Target_MTD_APE , kpi_All_obj.Issued_MTD_APE  ),
          title: "Actual",
          showtitle: false,
        },

        Target: {
          value: handleundefinednull(kpi_All_obj.Target_MTD_APE),
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: handleundefinednull(kpi_All_obj.TargetVSActual_MTD_Per),
          color: colorCodeFunction(kpi_All_obj.Target_MTD_APE , kpi_All_obj.Issued_MTD_APE ),
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "NBP",
      ShowCard:checkHerrachyuserwise("NBP",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.NBP_MTD_NBP),
          color: colorCodeFunction(kpi_All_obj.Target_MTD_NBP , kpi_All_obj.NBP_MTD_NBP),
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: handleundefinednull(kpi_All_obj.Target_MTD_NBP),
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: handleundefinednull(kpi_All_obj.TargetVSActual_MTD_NBPPer),
          color: colorCodeFunction(kpi_All_obj.Target_MTD_NBP , kpi_All_obj.NBP_MTD_NBP  ),
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari' ? true:false,
      Label: "NOP",
      ShowCard:checkHerrachyuserwise("NOP",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.Issued_MTD_NOP),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Productivity",
      ShowCard:checkHerrachyuserwise("Productivity LA | OP",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(productivity),
          color: "",
          title: "LA | OP",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Productivity",
      ShowCard:checkHerrachyuserwise("Productivity LA | OP | SM",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(productivity6),
          color: "",
          title: "LA | OP | SM",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Productivity",
      ShowCard:checkHerrachyuserwise("Productivity LA | OP | SM | OH",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(productivity11),
          color: "",
          title: "LA | OP | SM | OH",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },


    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Agents Coded",
      ShowCard:checkHerrachyuserwise("Agents Coded",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.Coding_MTD_LA),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Agents Active | Agents Held",
      ShowCard:checkHerrachyuserwise("Agents Active | Agents Held",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(AgentsHeld),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },





    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "OPs Coded",
      ShowCard:checkHerrachyuserwise("OPs Coded",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.Coding_MTD_OP),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "OPs Active | Held",
      ShowCard:checkHerrachyuserwise("OPs Active | Held",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(StatusAct_MTD_OPP),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "IOs Coded",
      ShowCard:checkHerrachyuserwise("IOs Coded",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.Coding_MTD_OP),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "IOs Active | Held",
      ShowCard:checkHerrachyuserwise("IOs Active | Held",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(StatusAct_MTD_OPP),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },




    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "SMs Held | Budgeted",
      ShowCard:checkHerrachyuserwise("SMs Held | Budgeted",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(sms_held),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "SMs Active | Held",
      ShowCard:checkHerrachyuserwise("SMs Active | Held",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(StatusAct_MTD),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Active Agents Case Rate",
      ShowCard:checkHerrachyuserwise("Active Agents Case Rate",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.LA_CaseRate_MTD),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Average Ticket Size",
      ShowCard:checkHerrachyuserwise("Average Ticket Size",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.Avg_TicketSize_MTD),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },


    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Product Mix",
      ShowCard:checkHerrachyuserwise("Product Mix",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(`${kpi_pro_mix1}`),
          color: "",
          title: "Par%",
          showtitle: false,
        },
        Target: {
          value: handleundefinednull(`| ${kpi_pro_mix2}`),
          color: "",
          title: "| Non-Par%",
          showtitle: false,
        },
        Achivemnet: {
          value: handleundefinednull(`| ${kpi_pro_mix3}`),
          color: "",
          title: "| ULIP%",
          showtitle: false,
        },

        Achivemnet_one: {
          value: handleundefinednull(`| ${kpi_pro_mix4}`),
          color: "",
          title: "| Single%",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "PPT Mix",
      ShowCard:checkHerrachyuserwise("PPT Mix",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(`${pers_10}`),
          color: "",
          title: "<10Y%",
          showtitle: false,
        },
        Target: {
          value: handleundefinednull(`| ${pers_11}`),
          color: "",
          title: "| 10-11Y%",
          showtitle: false,
        },
        Achivemnet: {
          value: handleundefinednull(`| ${pers_12}`),
          color: "",
          title: "| >11Y%",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {

      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "APR",
      ShowCard:checkHerrachyuserwise("APR",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(KPI_Apr),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "13M Persistency",
      ShowCard:checkHerrachyuserwise("13M Persistency",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(m_persistency),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },
  ];

  const KPI_Format_Data = KPIMTD;

  let KPIYTD = [

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "No Records Found",
      ShowCard:checkHerrachyuserwise("No Records Found",true),
      KPIdata: {
        Actual: {
          value: '',
          color: '',
          title: "",
          showtitle: false,
        },

      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "APE",
      ShowCard:checkHerrachyuserwise("APE",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.Issued_YTD_APE),
          color: colorCodeFunction( kpi_All_obj.Target_YTD_APE , kpi_All_obj.Issued_YTD_APE ),
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: handleundefinednull(kpi_All_obj.Target_YTD_APE),
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: handleundefinednull(kpi_All_obj.TargetVSActual_YTD_Per),
          color: colorCodeFunction(kpi_All_obj.Target_YTD_APE , kpi_All_obj.Issued_YTD_APE  ),
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "NBP",
      ShowCard:checkHerrachyuserwise("NBP",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.NBP_YTD_NBP),
          color: colorCodeFunction( kpi_All_obj.Target_YTD_NBP , kpi_All_obj.NBP_YTD_NBP ),
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: handleundefinednull(kpi_All_obj.Target_YTD_NBP),
          color: "red",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: handleundefinednull(kpi_All_obj.TargetVSActual_YTD_NBPPer),
          color: colorCodeFunction(kpi_All_obj.Target_YTD_NBP , kpi_All_obj.NBP_YTD_NBP ),
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari' ? true:false,
      Label: "NOP",
      ShowCard:checkHerrachyuserwise("NOP",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.Issued_YTD_NOP),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "red",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Productivity",
      ShowCard:checkHerrachyuserwise("Productivity LA | OP",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(productivity14),
          color: "",
          title: "LA | OP",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },


    // {
    //   // showcard:this.userdetails.herarvy ==='parhari'?true:false,
    //   Label: "LA Productivity",
    //   ShowCard:checkHerrachyuserwise("LA Productivity",true),
    //   KPIdata: {
    //     Actual: {
    //       value: handleundefinednull(kpi_All_obj.LA_YTD_Prod),
    //       color: "",
    //       title: "Actual",
    //       showtitle: false,
    //     },
    //     Target: {
    //       value: 0,
    //       color: "",
    //       title: "Target",
    //       showtitle: false,
    //     },
    //     Achivemnet: {
    //       value: 0,
    //       color: "",
    //       title: "% Achievement",
    //       showtitle: false,
    //     },
    //   },
    //   Textcolr: "red",
    // },

    // {
    //   // showcard:this.userdetails.herarvy ==='parhari'?true:false,
    //   Label: "OP Productivity",
    //   ShowCard:checkHerrachyuserwise("OP Productivity",true),
    //   KPIdata: {
    //     Actual: {
    //       value: handleundefinednull(kpi_All_obj.OP_YTD_Prod),
    //       color: "",
    //       title: "Actual",
    //       showtitle: false,
    //     },
    //     Target: {
    //       value: 0,
    //       color: "",
    //       title: "Target",
    //       showtitle: false,
    //     },
    //     Achivemnet: {
    //       value: 0,
    //       color: "",
    //       title: "% Achievement",
    //       showtitle: false,
    //     },
    //   },
    //   Textcolr: "red",
    // },

    // {
    //   // showcard:this.userdetails.herarvy ==='parhari'?true:false,
    //   Label: "IM Productivity",
    //   ShowCard:checkHerrachyuserwise("IM Productivity",true),
    //   KPIdata: {
    //     Actual: {
    //       value: handleundefinednull(kpi_All_obj.IM_MTD_Prod),
    //       color: "",
    //       title: "Actual",
    //       showtitle: false,
    //     },
    //     Target: {
    //       value: 0,
    //       color: "red",
    //       title: "Target",
    //       showtitle: false,
    //     },
    //     Achivemnet: {
    //       value: 0,
    //       color: "#08d608",
    //       title: "% Achievement",
    //       showtitle: false,
    //     },
    //   },
    //   Textcolr: "red",
    // },

    // {
    //   // showcard:this.userdetails.herarvy ==='parhari'?true:false,
    //   Label: "SM Productivity",
    //   ShowCard:checkHerrachyuserwise("SM Productivity",true),
    //   KPIdata: {
    //     Actual: {
    //       value: handleundefinednull(kpi_All_obj.SM_YTD_Prod),
    //       color: "",
    //       title: "Actual",
    //       showtitle: false,
    //     },
    //     Target: {
    //       value: 0,
    //       color: "",
    //       title: "Target",
    //       showtitle: false,
    //     },
    //     Achivemnet: {
    //       value: 0,
    //       color: "",
    //       title: "% Achievement",
    //       showtitle: false,
    //     },
    //   },
    //   Textcolr: "red",
    // },

    // {
    //   // showcard:this.userdetails.herarvy ==='parhari'?true:false,
    //   Label: "OH Productivity",
    //   ShowCard:checkHerrachyuserwise("OH Productivity",true),
    //   KPIdata: {
    //     Actual: {
    //       value: handleundefinednull(kpi_All_obj.OH_YTD_Prod),
    //       color: "",
    //       title: "Actual",
    //       showtitle: false,
    //     },
    //     Target: {
    //       value: 0,
    //       color: "",
    //       title: "Target",
    //       showtitle: false,
    //     },
    //     Achivemnet: {
    //       value: 0,
    //       color: "",
    //       title: "% Achievement",
    //       showtitle: false,
    //     },
    //   },
    //   Textcolr: "red",
    // },



    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Productivity",
      ShowCard:checkHerrachyuserwise("Productivity LA | OP | SM",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(productivity18),
          color: "",
          title: "LA | OP | SM",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Productivity",
      ShowCard:checkHerrachyuserwise("Productivity LA | OP | SM | OH",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(productivity23),
          color: "",
          title: "LA | OP | SM | OH",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },


    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Agents Coded",
      ShowCard:checkHerrachyuserwise("Agents Coded",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.Coding_YTD_LA),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },



    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Agents Active | Agents Held",
      ShowCard:checkHerrachyuserwise("Agents Active | Agents Held",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(AgentsHeld5),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "OPs Coded",
      ShowCard:checkHerrachyuserwise("OPs Coded",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.Coding_YTD_OP),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },


    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "OPs Active | Held",
      ShowCard:checkHerrachyuserwise("OPs Active | Held",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(StatusAct_YTD_OPP),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "IOs Coded",
      ShowCard:checkHerrachyuserwise("IOs Coded",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.Coding_YTD_OP),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "IOs Active | Held",
      ShowCard:checkHerrachyuserwise("IOs Active | Held",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(StatusAct_YTD_OPP),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "SMs Held | Budgeted",
      ShowCard:checkHerrachyuserwise("SMs Held | Budgeted",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(sms_held_ytd),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "SMs Active | Held",
      ShowCard:checkHerrachyuserwise("SMs Active | Held",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(StatusAct_YTD),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Active Agents Case Rate",
      ShowCard:checkHerrachyuserwise("Active Agents Case Rate",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.LA_CaseRate_YTD),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Average Ticket Size",
      ShowCard:checkHerrachyuserwise("Average Ticket Size",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.Avg_TicketSize_YTD),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },


    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Product Mix",
      ShowCard:checkHerrachyuserwise("Product Mix",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(`${kpi_pro_mix1}`),
          color: "",
          title: "Par%",
          showtitle: false,
        },
        Target: {
          value: handleundefinednull(`| ${kpi_pro_mix2}`),
          color: "",
          title: "| Non-Par%",
          showtitle: false,
        },
        Achivemnet: {
          value: handleundefinednull(`| ${kpi_pro_mix3}`),
          color: "",
          title: "| ULIP%",
          showtitle: false,
        },

        Achivemnet_one: {
          value: handleundefinednull(`| ${kpi_pro_mix4}`),
          color: "",
          title: "| Single%",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "PPT Mix",
      ShowCard:checkHerrachyuserwise("PPT Mix",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(`${pers_10}`),
          color: "",
          title: "<10Y%",
          showtitle: false,
        },
        Target: {
          value: handleundefinednull(`| ${pers_11}`),
          color: "",
          title: "| 10-11Y%",
          showtitle: false,
        },
        Achivemnet: {
          value: handleundefinednull(`| ${pers_12}`),
          color: "",
          title: "| >11Y%",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    // {
    //   // showcard:this.userdetails.herarvy ==='parhari'?true:false,
    //   Label: "APR",
    //   ShowCard:checkHerrachyuserwise("APR",false),
    //   KPIdata: {
    //     Actual: {
    //       value: handleundefinednull(KPI_Apr),
    //       color: "",
    //       title: "Actual",
    //       showtitle: false,
    //       display: 'none'
    //     },
    //     Target: {
    //       value: 0,
    //       color: "",
    //       title: "Target",
    //       showtitle: false,
    //     },
    //     Achivemnet: {
    //       value: 0,
    //       color: "",
    //       title: "% Achievement",
    //       showtitle: false,
    //     },
    //   },
    //   Textcolr: "red",
    // },

    // {
    //   // showcard:this.userdetails.herarvy ==='parhari'?true:false,
    //   Label: "13M Persistency",
    //   ShowCard:checkHerrachyuserwise("13M Persistency",false),
    //   KPIdata: {
    //     Actual: {
    //       value: handleundefinednull(m_persistency),
    //       color: "",
    //       title: "Actual",
    //       showtitle: false,
    //     },
    //     Target: {
    //       value: 0,
    //       color: "",
    //       title: "Target",
    //       showtitle: false,
    //     },
    //     // Achievement
    //     Achivemnet: {
    //       value: 0,
    //       color: "",
    //       title: "% Achievement",
    //       showtitle: false,
    //     },
    //   },
    //   Textcolr: "red",
    // },


  ];

  const KPI_Formate_Data_YTD = KPIYTD;

  let KPIIBMTD = [
    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "No Records Found",
      ShowCard:checkHerrachyuserwise("No Records Found",true),
      KPIdata: {
        Actual: {
          value: '',
          color: '',
          title: "",
          showtitle: false,
        },

      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "APE",
      ShowCard:checkHerrachyuserwise("APE",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.Issued_MTD_APE),
          color: colorCodeFunction(kpi_All_obj.Target_MTD_APE, kpi_All_obj.Issued_MTD_APE ),
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: handleundefinednull(kpi_All_obj.Target_MTD_APE),
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: handleundefinednull(kpi_All_obj.TargetVSActual_MTD_Per),
          color: colorCodeFunction(kpi_All_obj.Target_MTD_APE, kpi_All_obj.Issued_MTD_APE ),
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "13M Persistency",
      ShowCard:checkHerrachyuserwise("13M Persistency",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(m_persistency),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "SMs Active | Held",
      ShowCard:checkHerrachyuserwise("SMs Active | Held",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(StatusAct_YTD),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Product Mix",
      ShowCard:checkHerrachyuserwise("Product Mix",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(`${kpi_pro_mix1}`),
          color: "",
          title: "Par%",
          showtitle: false,
        },
        Target: {
          value: handleundefinednull(`| ${kpi_pro_mix2}`),
          color: "",
          title: "| Non-Par%",
          showtitle: false,
        },
        Achivemnet: {
          value: handleundefinednull(`| ${kpi_pro_mix3}`),
          color: "",
          title: "| ULIP%",
          showtitle: false,
        },

        Achivemnet_one: {
          value: handleundefinednull(`| ${kpi_pro_mix4}`),
          color: "",
          title: "| Single%",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "PPT Mix",
      ShowCard:checkHerrachyuserwise("PPT Mix",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(`${pers_10}`),
          color: "",
          title: "<10Y%",
          showtitle: false,
        },
        Target: {
          value: handleundefinednull(`| ${pers_11}`),
          color: "",
          title: "| 10-11Y%",
          showtitle: false,
        },
        Achivemnet: {
          value: handleundefinednull(`| ${pers_12}`),
          color: "",
          title: "| >11Y%",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Average Ticket Size",
      ShowCard:checkHerrachyuserwise("Average Ticket Size",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.Avg_TicketSize_YTD),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

  ]
  const KPI_Formate_IBRetails_MTD = KPIIBMTD;

  let KPIIBYTD = [
    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "No Records Found",
      ShowCard:checkHerrachyuserwise("No Records Found",true),
      KPIdata: {
        Actual: {
          value: '',
          color: '',
          title: "",
          showtitle: false,
        },

      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "APE",
      ShowCard:checkHerrachyuserwise("APE",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.Issued_YTD_APE),
          color: colorCodeFunction( kpi_All_obj.Target_YTD_APE , kpi_All_obj.Issued_YTD_APE ),
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: handleundefinednull(kpi_All_obj.Target_YTD_APE),
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: handleundefinednull(kpi_All_obj.TargetVSActual_YTD_Per),
          color: colorCodeFunction( kpi_All_obj.Target_YTD_APE , kpi_All_obj.Issued_YTD_APE ),
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "SMs Active | Held",
      ShowCard:checkHerrachyuserwise("SMs Active | Held",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(StatusAct_YTD),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Product Mix",
      ShowCard:checkHerrachyuserwise("Product Mix",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(`${kpi_pro_mix1}`),
          color: "",
          title: "Par%",
          showtitle: false,
        },
        Target: {
          value: handleundefinednull(`| ${kpi_pro_mix2}`),
          color: "",
          title: "| Non-Par%",
          showtitle: false,
        },
        Achivemnet: {
          value: handleundefinednull(`| ${kpi_pro_mix3}`),
          color: "",
          title: "| ULIP%",
          showtitle: false,
        },

        Achivemnet_one: {
          value: handleundefinednull(`| ${kpi_pro_mix4}`),
          color: "",
          title: "| Single%",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "PPT Mix",
      ShowCard:checkHerrachyuserwise("PPT Mix",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(`${pers_10}`),
          color: "",
          title: "<10Y%",
          showtitle: false,
        },
        Target: {
          value: handleundefinednull(`| ${pers_11}`),
          color: "",
          title: "| 10-11Y%",
          showtitle: false,
        },
        Achivemnet: {
          value: handleundefinednull(`| ${pers_12}`),
          color: "",
          title: "| >11Y%",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

    {
      // showcard:this.userdetails.herarvy ==='parhari'?true:false,
      Label: "Average Ticket Size",
      ShowCard:checkHerrachyuserwise("Average Ticket Size",true),
      KPIdata: {
        Actual: {
          value: handleundefinednull(kpi_All_obj.Avg_TicketSize_YTD),
          color: "",
          title: "Actual",
          showtitle: false,
        },
        Target: {
          value: 0,
          color: "",
          title: "Target",
          showtitle: false,
        },
        Achivemnet: {
          value: 0,
          color: "",
          title: "% Achievement",
          showtitle: false,
        },
      },
      Textcolr: "red",
    },

  ]
  const KPI_Formate_IBRetails_YTD = KPIIBYTD;

  const handleChange = (value) => {
    setMtdYtd(value);
  };

  const mtdOption = [
    {
      value: "mtd",
      label: "MTD",
    },
    {
      value: "ytd",
      label: "YTD",
    },
  ];

  // Access Management
  const [showActivityTracker, setShowActivityTracker] = useState(
    _accessActivityTracker.props.read === true ? true : false
  );

  const [showDailyBusiness, setShowDailyBusiness] = useState(
    _accessDailyBusiness.props.read === true ? true : false
  );
  const [showOpportunities, setShowOpportunities] = useState(
    _accessOpportunities.props.read === true ? true : false
  );
  // const [showKpi, setShowKpi] = useState(
  //   _accessKpi.props.read === true ? true : false
  // );

  const [showTodo, setShowTodo] = useState(
    _accessTodo.props.read === true ? true : false
  );

  const [showSalesGuide, setShowSalesGuide] = useState(
    _accessSalesGuide.props.read === true ? true : false
  );

  if (showTodo === true && showActivityTracker === false) {
    routename = "/todo";
  } else if (showActivityTracker === true && showTodo === false) {
    routename = "/calendar";
  } else if (showTodo === true && showActivityTracker === true) {
    routename = "/calendar";
  }

  let _businessRetention = {};
  let _businessGWP = {};
  let _businessActivation = {};

  useEffect(() => {
    if (id) dispatch(actions.activities(id, agent_id));
    if (id) dispatch(actions.todoGetData(id));
    dispatch(actions.getUserTreeAPI(userId));

    // dispatch(actions.getBusinessCardAPI(userId,channelCode));

    dispatch(leadActions.updateTabOfDashboard("self"));

    // userId && dispatch(actions.fetchUserDetails(userId))
    channelCode && dispatch(actions.fetchHierarchy(userId, channelCode));
    if (agent_id) dispatch(actions.home(agent_id, userId));
    getTodoData(0);
    getDailyBusiness();
    getOpportunities();
    // getKpiData(userId, channelCode);
  }, []);

  // useEffect(() => {
  // let _businessCardResp = _storeData.home.businessData[0].data
  // let _bussDropArr = [];

  // if(_businessCardResp.length > 0){
  //   for (let _kpi of _businessCardResp) {
  //     let data = {
  //       label: _kpi.year_month,
  //       value: _kpi.year_month,
  //       index: _kpi.id === 'last_two_month' ? '1' : '2'
  //     }
  //     _bussDropArr.push(data)

  //     setBusinessDropArray(_bussDropArr)
  //     setBusinessDropdown(_bussDropArr[0].value)
  //   }
  //   handleBusinessDropdown(_bussDropArr[0].value)
  // }else{
  //   handleBusinessDropdown('')
  // }
  // },[])

  // !!!!!!! ACTIVITY !!!!!!

  // const todayDate = moment().format("YYYY-MM-DD")
  var timeArr = moment().format("HH:mm:ss").split(":");
  var timeInMilliseconds = timeArr[0] * 3600000 + timeArr[1] * 60000;
  let todayDate = Date.now();
  let yesterdayDate = moment(todayDate).subtract(1, "days");

  let FilterDateMS = new Date(moment(yesterdayDate)).setUTCHours(0, 0, 0, 0);
  let dateAndTimeMS = timeInMilliseconds + FilterDateMS;

  // let activities_data_store = [];

  const home_data = useSelector((state) => state.home.home_obj);

  // activities_data_store = useSelector(
  //   (state) => state.activities.activities_obj
  // );

  let activities_data = null;
  // if (activities_data_store !== undefined) {
  //   activities_data = activities_data_store.filter((ele) => {
  //     return ele.start_date >= dateAndTimeMS;
  //   });
  // }

  function add3Dots(string, limit) {
    var dots = "...";
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
    return string;
  }

  const [idLead, setidLead] = useState();
  useEffect(() => {
    activities_data.map((item) => {
      if (item.leadId !== undefined && item.leadId !== null) {
        let id = item.leadId._id;
        setidLead(id);
      }
    });
  }, []);

  const ActivityOnClickFunc = () => {
    dispatch({ data: idLead, type: "CURRENT_UPDATING_ID" });
    history.push("/leadmasterpage/statuslead", { leadID: idLead });
    setidLead();
  };

  if (activities_data !== undefined && activities_data !== null) {
    if (activities_data.length != 0) {
      activities_data = activities_data.filter((item) => {
        return item.statusType == "open";
      });
    }
  } else {
    activities_data = [];
  }

  const dateFun = (time) => {
    let finalTimeobj = timeList.filter((item) => {
      return item.value == time;
    });
    if (finalTimeobj.length > 0) {
      let finalTime = finalTimeobj[0].dispValue;

      return finalTime;
    } else {
      return "";
    }
  };

  // let getKpiData = async (userId, channelData) => {
  //   // let _resp = await axiosRequest.get(
  //   //   `user/fetch_business_card_data?csmId=${userId}&channel=${channelData._id}`,
  //   //   { secure: true }
  //   // );

  //   // dispatch(actions.businessCardData(_resp))
  //   let _businessCardResp = [];
  //   if (_resp.length > 0) {
  //     _businessCardResp = _resp[0].data;
  //   }

  //   let _bussDropArr = [];
  //   if (_businessCardResp?.length > 0) {
  //     for (let _kpi of _businessCardResp) {
  //       let data = {
  //         label: _kpi.year_month,
  //         value: _kpi.year_month,
  //         index: _kpi.id === "last_two_month" ? "1" : "2",
  //       };
  //       _bussDropArr.push(data);

  //       setBusinessDropArray(_bussDropArr);
  //       setBusinessDropdown(_bussDropArr[0].value);
  //     }
  //     handleBusinessDropdown(_bussDropArr[0].value, _businessCardResp);
  //   } else {
  //     handleBusinessDropdown("", _businessCardResp);
  //   }
  // };

  let getOpportunities = async () => {
    try {
      let res = await axiosRequest.get(
        `user/v2/getleads_team_count/${userId}?requiredData=self`,
        { secure: true }
      );
      if (res) {
        for (const key in res) {
          opportunities.push({
            value: res?.today,
            name: "ForToday",
            month: moment(new Date()).format("DD/MM/YYYY"),
          });
          opportunities.push({
            value: res?.open_lead,
            name: "Open",
            month: moment(new Date()).format("DD/MM/YYYY"),
          });
        }
      }
    } catch (error) {
    }
  };

  let getDailyBusiness = async () => {
    try {
      let res = await axiosRequest.get(
        `user/fetch_daily_activity/${id}?today_goal=true`,
        { secure: true }
      );
      setGoal(res.data);
    } catch (error) {
    }
  };

  let getTodoData = async (skip) => {
    try {
      const { id } = stoageGetter("user");
      let arrData = [];
      let _resp = await axiosRequest.get(
        `user/fetch_todo_list?filter=all&skip=${skip}`,
        { secure: true }
      );

      let respData = _resp.data[0];

      for (let _data of respData) {
        let _icon = "";
        // let _remark = ''
        // let _enableRemark = null
        // let _disableSubmit = null
        let _textOverline = {};
        if (_data.taskOwner._id !== id) {
          if (_data.owernersCollectionDetails.length !== 0) {
            _textOverline =
              _data.owernersCollectionDetails[0].taskDone === false
                ? { textDecorationLine: "", opacity: "0" }
                : { textDecorationLine: "line-through", opacity: "0" };
            _icon =
              _data.owernersCollectionDetails[0].taskDone === false
                ? checkboxoutline
                : truecheckbox;
          } else {
            _textOverline = { textDecorationLine: "", opacity: "0" };
            _icon = checkboxoutline;
          }
        } else {
          _textOverline =
            _data.taskDone === false
              ? { textDecorationLine: "", opacity: "0" }
              : { textDecorationLine: "line-through", opacity: "0" };
          _icon = _data.taskDone === false ? checkboxoutline : truecheckbox;
        }

        // _data.owernersCollectionDetails.forEach(event => {
        //     if(event.remarkText !== ''){
        //         _enableRemark = false
        //         // _disableSubmit = true
        //         event.remarkData = event.remarkText
        //         event.disableSubmit = true
        //     }else{
        //         _enableRemark = true
        //         // _disableSubmit = false
        //         event.remarkData = event.remarkText
        //         event.disableSubmit = false
        //     }
        // })

        let objstrct = {
          content: _data.description,
          removeBtn: _data.taskDone,
          icon: _icon,
          createddate: _data.createdDate,
          dateofreminder: moment(_data.dateOfReminder).format("L"),
          timeofreminder: parseInt(_data.timeOfReminder),
          todoid: _data._id,
          stringtimeofreminder: _data._stringVersionTimeOfReminder,
          ownername:
            _data.taskOwner.first_name + " " + _data.taskOwner.last_name,
          status: setTodoStatus(
            _data.dateOfReminder,
            parseInt(_data.timeOfReminder)
          ),
          searchdata: _data.owernersCollectionDetails,
          taskOwner_id: _data.taskOwner._id,
          taskPriority: _data.taskPriority,
          priorityIndicatorColor: _data.priorityIndicatorColor,
          showMemberRemark: false,
          showMemText: "Show More",
          sooncolor: "#E46A25",
          overduecolor: "#F44336",
          showarchiedpopup: false,
          textOverLine: _textOverline,
          wholeData: _data,
          Cretedownertaskdon: _data.taskDone,
          isUserIdSameornot: _data.taskOwner._id !== id ? false : true,
        };
        arrData.push(objstrct);
      }
      setGetTodoDataArray(arrData);
      setShowData(true);
    } catch (err) {}
  };

  let setTodoStatus = (reminderDate, reminderTime) => {
    try {
      let reminderDay = reminderDate + reminderTime;
      let current_date = Date.now();

      let soon_time_ = reminderDay - 60000 * 60 * 24;
      let start_time = new Date(current_date).setHours(0, 0, 0, 0);
      let end_time = new Date(current_date).setHours(23, 59, 59, 999);

      if (current_date > reminderDay) {
        return "Overdue";
      } else if (start_time < soon_time_ && soon_time_ < end_time) {
        return "Soon";
      } else {
        return "";
      }
    } catch (err) {
    }
  };

  const onLogout = () => {
    dispatch(actions.logout());
    history.push("/login");
  };

  const showModal = (event, ind) => {
    // setButtonName('Update')
    getTodoDataArray[ind].showarchiedpopup = false;
    setUpdateData(event);
    setIsModalVisible(true);
  };

  const archiveData = async (event) => {
    //   setIsModalVisible(true);
    const { id } = stoageGetter("user");
    try {
      let formData = {
        // userId:id,
        userId: id,
        taskOwner: event.taskOwner_id,
        taskId: event.todoid,
        archive: true,
      };
      let _resp = await axiosRequest.put(`user/update_task_status`, formData, {
        secure: true,
      });

      setGetTodoDataArray([]);
      getTodoData(0);
    } catch (err) {
    }
  };

  const removListFromToDo = (data, rowIndex) => {
    const { id } = stoageGetter("user");
    let _teamMembers = [];

    // let datachek = data.taskOwner_id !== id ? false :true
    //         setusercreatedid(datachek)

    // return
    // let newData = getTodoDataArray;
    if (data.removeBtn === false) {
      let _data = getTodoDataArray.map((ev, index) => {
        if (rowIndex === index) {
          ev.removeBtn = true;
          ev.icon = truecheckbox;
          ev.textOverLine.textDecorationLine = "line-through";
        }
        return ev;
      });
      setGetTodoDataArray(_data);

      // let _teamMember =[]
      _teamMembers = _data[rowIndex].searchdata;
      if (_data[rowIndex].taskOwner_id !== id) {
        var switchdata = false;
        const newArr = _teamMembers.map((_ev) => {
          if (_ev._Id === id) {
            // var switchdata = false
            if (_ev.taskDone === false) {
              switchdata = true;
            } else if (_ev.taskDone === true) {
              switchdata = false;
            }
            return {
              ..._ev,
              FullName: _ev.FullName,
              designation: _ev.designation,
              _Id: _ev._Id,
              ShortId: _ev.ShortId,
              remarkText: _ev.remarkText,
              taskDone: switchdata,
              inAppNotification: _ev.inAppNotification,
              remarkNotification: _ev.remarkNotification,
            };
          }

          return _ev;
        });

        let formdata = {
          userId: id,
          taskOwner: _data[rowIndex].taskOwner_id,
          taskId: _data[rowIndex].todoid,
          owernersCollectionDetails: newArr,
        };

        updateTODOTaskApi(formdata);
      } else {
        let formdata = {
          userId: id,
          taskOwner: _data[rowIndex].taskOwner_id,
          taskId: data.todoid,
          taskDone: true,
        };
        updateTODOTaskApi(formdata);
      }
    } else if (data.removeBtn === true) {
      // return
      let _data = getTodoDataArray.map((ev, index) => {
        if (rowIndex === index) {
          ev.removeBtn = false;
          ev.icon = checkboxoutline;
          ev.textOverLine.textDecorationLine = "";
        }
        return ev;
      });

      _teamMembers = _data[rowIndex].searchdata;

      if (_data[rowIndex].taskOwner_id !== id) {
        var switchdata = false;
        const newArr = _teamMembers.map((_ev) => {
          if (_ev._Id === id) {

            if (_ev.taskDone === false) {
              switchdata = true;
            } else if (_ev.taskDone === true) {
              switchdata = false;
            }
            return {
              ..._ev,
              FullName: _ev.FullName,
              designation: _ev.designation,
              _Id: _ev._Id,
              ShortId: _ev.ShortId,
              remarkText: _ev.remarkText,
              taskDone: switchdata,
              inAppNotification: _ev.inAppNotification,
              remarkNotification: _ev.remarkNotification,
            };
          }

          return _ev;
        });

        let formdata = {
          userId: id,
          taskOwner: _data[rowIndex].taskOwner_id,
          taskId: _data[rowIndex].todoid,
          owernersCollectionDetails: newArr,
        };
        updateTODOTaskApi(formdata);
      } else {
        let formdata = {
          userId: id,
          taskOwner: _data[rowIndex].taskOwner_id,
          taskId: data.todoid,
          taskDone: false,
        };
        updateTODOTaskApi(formdata);
      }
    }
  };

  // const removListFromToDo = (data, rowIndex) => {
  //   const { id } = stoageGetter("user");
  //   // userId:id,

  //   let _teamMembers = [];
  //   let newData = getTodoDataArray;
  //   _teamMembers = data.searchdata
  //   return getTodoDataArray.map((item, index) => {
  //     if (data.removeBtn === false) {
  //       newData[rowIndex].removeBtn = true;
  //       newData[rowIndex].icon = truecheckbox;
  //       newData[rowIndex].textOverLine.textDecorationLine = "line-through";
  //       setGetTodoDataArray(newData);

  //       if (newData[rowIndex].taskOwner_id !== id) {
  //         // let object = {
  //         //   FullName: newData[rowIndex].searchdata[0].FullName,
  //         //   designation: newData[rowIndex].searchdata[0].designation,
  //         //   _Id: newData[rowIndex].searchdata[0]._Id,
  //         //   ShortId: newData[rowIndex].searchdata[0].ShortId,
  //         //   remarkText: newData[rowIndex].searchdata[0].remarkText,
  //         //   taskDone: true,
  //         //   inAppNotification:
  //         //     newData[rowIndex].searchdata[0].inAppNotification,
  //         //   remarkNotification:
  //         //     newData[rowIndex].searchdata[0].remarkNotification,
  //         // };
  //         // _teamMembers.push(object);

  //         var switchdata = false
  //               const newArr = _teamMembers.map(_ev => {
  //                   if (_ev._Id === id) {
  //                       // var switchdata = false
  //                       if( _ev.taskDone === false ){
  //                           switchdata =true
  //                       }else if(_ev.taskDone === true){
  //                           switchdata =false
  //                       }

  //                     return {..._ev,
  //                           FullName:_ev.FullName,
  //                           designation:_ev.designation,
  //                           _Id:_ev._Id,
  //                           ShortId:_ev.ShortId,
  //                           remarkText: _ev.remarkText,
  //                           taskDone:switchdata,
  //                           inAppNotification: _ev.inAppNotification,
  //                           remarkNotification: _ev.remarkNotification,

  //                       };
  //                   }

  //                   return _ev;
  //                 });

  //                 return

  //         let formdata = {
  //           userId: id,
  //           taskOwner: newData[rowIndex].taskOwner_id,
  //           taskId: newData[rowIndex].todoid,
  //           owernersCollectionDetails: _teamMembers,
  //         };
  //         updateTODOTaskApi(formdata);
  //       } else {
  //         let formdata = {
  //           userId: id,
  //           taskOwner: newData[rowIndex].taskOwner_id,
  //           taskId: data.todoid,
  //           taskDone: true,
  //         };
  //         updateTODOTaskApi(formdata);
  //       }
  //     } else {
  //       newData[rowIndex].removeBtn = false;
  //       newData[rowIndex].icon = checkboxoutline;
  //       newData[rowIndex].textOverLine.textDecorationLine = "";
  //       setGetTodoDataArray(newData);

  //       if (newData[rowIndex].taskOwner_id !== id) {
  //         let object = {
  //           FullName: newData[rowIndex].searchdata[0].FullName,
  //           designation: newData[rowIndex].searchdata[0].designation,
  //           _Id: newData[rowIndex].searchdata[0]._Id,
  //           ShortId: newData[rowIndex].searchdata[0].ShortId,
  //           remarkText: newData[rowIndex].searchdata[0].remarkText,
  //           taskDone: false,
  //           inAppNotification:
  //             newData[rowIndex].searchdata[0].inAppNotification,
  //           remarkNotification:
  //             newData[rowIndex].searchdata[0].remarkNotification,
  //         };
  //         _teamMembers.push(object);

  //         let formdata = {
  //           userId: id,
  //           taskOwner: newData[rowIndex].taskOwner_id,
  //           taskId: newData[rowIndex].todoid,
  //           owernersCollectionDetails: _teamMembers,
  //         };
  //         updateTODOTaskApi(formdata);
  //       } else {
  //         let formdata = {
  //           userId: id,
  //           taskOwner: newData[rowIndex].taskOwner_id,
  //           taskId: data.todoid,
  //           taskDone: false,
  //         };
  //         updateTODOTaskApi(formdata);
  //       }
  //     }
  //   });
  // };

  const updateTODOTaskApi = async (data) => {
    setGetTodoDataArray([]);
    let _resp = await axiosRequest.put(`user/update_task_status`, data, {
      secure: true,
    });

    getTodoData(0);
  };

  const Showpopuptodo = (ind,data) => {
    let _data = getTodoDataArray.map((ev,index)=>{
        ind === index ?  ev.showarchiedpopup === true ? ev.showarchiedpopup = false : ev.showarchiedpopup = true   : ev.showarchiedpopup = false
        return ev
    })
    setGetTodoDataArray(_data)
    toggleModal(!modalShown);
}

  const handleBusinessDropdown = (event, data) => {
    setBusinessDropdown(event);
    let _businessCardResp = data;
    let _selectMonthData = [];

    if (_businessCardResp !== undefined) {
      _selectMonthData = _businessCardResp.filter(
        (el) => event === el.year_month
      );
    }

    if (event !== "") {
      _businessRetention.target =
        _selectMonthData[0]["GWP Retention"].gwp_retention_target;
      _businessRetention.achieve =
        _selectMonthData[0]["GWP Retention"].gwp_retention_achievement;
      _businessRetention.per_achieve =
        _selectMonthData[0]["GWP Retention"].gwp_retention_per_achievement;

      _businessGWP.target = _selectMonthData[0]["GPW"].gpw_target;
      _businessGWP.achieve = _selectMonthData[0]["GPW"].gpw_achievement;
      _businessGWP.per_achieve = _selectMonthData[0]["GPW"].gpw_per_achievement;

      _businessActivation.target =
        _selectMonthData[0]["Branch Activation"].branch_activation_target;
      _businessActivation.achieve =
        _selectMonthData[0]["Branch Activation"].branch_activation_achievement;
      _businessActivation.per_achieve =
        _selectMonthData[0][
          "Branch Activation"
        ].branch_activation_per_achievement;

      setBusinessRetention(_businessRetention);
      setBusinessGWP(_businessGWP);
      setBusinessActivation(_businessActivation);
    } else {
      _businessRetention.target = 0;
      _businessRetention.achieve = 0;
      _businessRetention.per_achieve = 0;

      _businessGWP.target = 0;
      _businessGWP.achieve = 0;
      _businessGWP.per_achieve = 0;

      _businessActivation.target = 0;
      _businessActivation.achieve = 0;
      _businessActivation.per_achieve = 0;

      setBusinessRetention(_businessRetention);
      setBusinessGWP(_businessGWP);
      setBusinessActivation(_businessActivation);
    }
    // setShowBusinessData(true)
  };

  const data = [
    {
      name: "For Today",
      month: "Sun.",
      value: 7,
    },
    {
      name: "For Today",
      month: "Mon.",
      value: 3,
    },
    {
      name: "For Today",
      month: "Tue.",
      value: 4,
    },
    {
      name: "For Today",
      month: "Wed.",
      value: 2,
    },
    {
      name: "For Today",
      month: "Thr",
      value: 15,
    },
    {
      name: "For Today",
      month: "Fri.",
      value: 10,
    },
    {
      name: "For Today",
      month: "Sat.",
      value: 11,
    },
    {
      name: "Open",
      month: "Sun.",
      value: 6,
    },
    {
      name: "Open",
      month: "Mon.",
      value: 1,
    },
    {
      name: "Open",
      month: "Tue.",
      value: 5,
    },
    {
      name: "Open",
      month: "Wed.",
      value: 7,
    },
    {
      name: "Open",
      month: "Thr",
      value: 16,
    },
    {
      name: "Open",
      month: "Fri.",
      value: 18,
    },
    {
      name: "Open",
      month: "Sat.",
      value: 15,
    },
  ];
  const breakpoint = 620;
  const config = {
    data: opportunities,
    width: width > breakpoint ? 325 : 320,
    height: 165,
    autoFit: false,
    isGroup: true,
    xField: "month",
    yField: "value",
    seriesField: "name",
    xAxis: {
      label: {
        style: {
          fill: "#FFFFFF",
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fill: "#FFFFFF",
        },
      },
    },
    legend: {
      itemName: {
        style: {
          fill: "#FFFFFF",
        },
      },
    },
    // label: {
    //   position: "middle",
    //   layout: [
    //     // { type: 'interval-adjust-position' },
    //     // { type: 'interval-hide-overlap' },
    //     { type: "adjust-color" },
    //   ],
    // },
    color: ["#FFFFFF", "#98C3DE"],
  };

  return (
    <Fragment>
      <FloatButton />

      <Col className="cardHolder" justify="center">
        {/* home-ml10 */}

        <div className="user_name">
          <p
            style={{
              textTransform: "capitalize",
             fontWeight:'bold',
              fontSize: "16px",
              marginBottom: "8px",
              color: "#000000",
            }}
          >
            <span
              style={{
                textTransform: "capitalize",
                fontWeight: "bold",
                fontSize: "16px",

                color: "#000000",
              }}
            >
              {" "}
              Hi {logged_in_user},
            </span>
            {"   "}
            Welcome to Salesdrive
          </p>
        </div>
        <Row className="alignUserLabel">
          <Col></Col>
          <Col>
            <div className="dataCardLabel"></div>
          </Col>
          <Col>
            <div className="dataCardLabel"></div>
          </Col>
        </Row>
        <Row
          gutter={[16, 16]}
          style={{ marginLeft: 0, marginRight: 0 }}
          justify="center"
        >
          {showActivityTracker && (
            <Col>
              <div
                className="dataCard"
                bordered="false"
                style={{ backgroundColor: "rgb(206, 160, 225)" }}
              >
                <div className="card-content">
                  <div
                    onClick={() => history.push("/calendar")}
                    className="activity-icon"
                  >
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={activity_img}
                      alt="Activities"
                    />
                  </div>
                  <div
                    onClick={() => history.push("/calendar")}
                    className="activities-text"
                  >
                    <div className="appointment_data">
                      <p className="ttile_name">Activities</p>
                      <p className="ttile_name_small">
                        {activities_data && activities_data.length
                          ? activities_data.length + " Open Activities"
                          : ""}
                      </p>
                    </div>
                    <div className="horizontalLine"></div>
                  </div>
                </div>

                {activities_data.length > 0 ? (
                  <div className="activity-block">
                    {activities_data.map((item) => {
                      return (
                        <div
                          // onClick={()=>history.push("/calendar")}
                          className="action-cards-content-activity"
                          key={item._id}
                        >
                          <div
                            onClick={
                              // (item.leadId) == null ?
                              () => history.push("/calendar")
                              // :
                              //  ActivityOnClickFunc
                            }
                          >
                            <p className="appoinment_date">
                              {Moment(item.start_date).format("D MMM YYYY")}{" "}
                            </p>
                            <div className="appointment_data">
                              <p>
                                {/* {Moment(item.start_time_MS).format("h:mm a")} */}
                                {dateFun(item.start_time)}
                              </p>
                              <p style={{ fontWeight: "bold" }}>
                                {item.event_type}
                              </p>
                              <p>
                                {/* {Moment(item.end_time_MS).format("h:mm a")} */}
                                {dateFun(item.end_time)}
                              </p>
                            </div>

                            <div id="truncateLongTexts">
                              {item.leadId !== undefined &&
                              item.leadId !== null ? (
                                <p>
                                  {item.event_name} with {item.leadId.firstName}{" "}
                                  {item.leadId.lastName}
                                </p>
                              ) : (
                                <p>{item.eventHeldUnitName}</p>
                              )}
                            </div>

                            {/* <table>
                              <tr>
                                <td style={{ width: '85px' }}>
                                  <Button type="primary" size='small' style={{ backgroundColor: item.reminder_prority_color, color: "#fff", borderRadius: '2px' }}>
                                    {item.set_reminder_prority}
                                  </Button>
                                </td>
                                <td>{item.event_description}</td>
                                <td>{item.leadId?.primaryMobile}</td>
                              </tr>
                            </table> */}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="events-body">
                    <Image
                      className="stars"
                      preview={false}
                      src={event_img}
                      alt="Events"
                    />
                    <p
                      style={{
                        color: "#CEA0E1",
                        fontSize: "20px",
                        width: "fit-content",
                        margin: "auto",
                      }}
                    >
                      No Events Exist
                    </p>
                    <Link to="/calendar">
                      <div
                        style={{
                          color: "#fff",
                          padding: "5px 20px",
                          backgroundColor: "#CEA0E1",
                          width: "40%",
                          width: "fit-content",
                          margin: "auto",
                          cursor: "pointer",
                        }}
                      >
                        Create an Event
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </Col>
          )}

          {showOpportunities && (
            <Col>
              <div
                className=" dataCard"
                bordered="false"
                style={{ backgroundColor: "rgb(134, 172, 236)", width: '100%'} }
              >
                <Link to="/leadMaster/all_leads">
                  <div className="card-content">
                    <div className="activity-icon">
                      <Image
                        preview={false}

                        height={55}
                        src={opportunities_img}
                        alt="Opportunities"
                        style={{width: '100%'}}
                      />
                    </div>
                    <div className="activities-text">
                      <p className="ttile_name">Lead</p>
                      <div className="horizontalLine"></div>
                    </div>
                  </div>
                </Link>
                <div style={{ marginTop: "30px" }}>
                  <Column {...config} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",


                  }}
                >
                  <div
                    style={{
                      padding: "0 30px",
                      borderRight: "1px solid #FFFFFF",
                      textAlign: "center",
                      color: "#FFFFFF",
                    }}
                  >
                    <p>For Today</p>
                    <span style={{ color: "#FFFFFF", fontSize: "50px" }}>
                      {home_data?.today ? home_data.today : "00"}
                      {/* {res?.today ? res?.today : '00'} */}
                    </span>
                  </div>
                  <div

                    style={{
                      padding: "0 30px",
                      textAlign: "center",
                      color: "#FFFFFF",
                    }}
                  >
                    <p>Open</p>
                    <span style={{ color: "#FFFFFF", fontSize: "50px" }}>
                      {home_data?.open_lead ? home_data.open_lead : "00"}
                      {/* {res?.open_lead ? res?.open_lead : '00'} */}
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          )}

          <Col style={{ display: "none" }}>
            <div
              className=" dataCard"
              bordered="false"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div className="card-content">
                <Link to={"/applications"}>
                  <div className="activity-icon">
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={application_img}
                      alt="Opportunities"
                    />
                  </div>
                  <div className="activities-text">
                    <p className="ttile_name">Applications</p>
                    {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '300%', margin: '-6px' }} /> */}
                    <div className="horizontalLine"></div>
                  </div>
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "40px",
                  marginRight: "36px",
                }}
              >
                <div
                  style={{
                    padding: "0px 60px 20px 20px",
                    borderRight: "1px solid #fff ",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  <p>Login</p>
                  <span style={{ color: "#fff", fontSize: "50px" }}>00</span>
                </div>
                <div
                  style={{
                    padding: "0px 0px 20px 45px",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  <p>CFR</p>
                  <span style={{ color: "#fff", fontSize: "50px" }}>
                    {home_data?.cfr_count_team
                      ? home_data.cfr_count_team
                      : "23"}
                  </span>
                </div>
              </div>

              <hr
                style={{
                  border: "none",
                  borderBottom: "2px solid #fff",
                  opacity: "0.5",
                  width: "240px",
                  margin: "10px 0px 0px 60px",
                }}
              />
              {/* <hr style={{ border: "none", borderBottom: "1px solid #fff", width: "200px"}} /> */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    padding: "2px 60px 20px 0px",
                    borderRight: "1px solid #fff",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  <p>Draft</p>
                  <span style={{ color: "#fff", fontSize: "50px" }}>00</span>
                </div>
                <div
                  style={{
                    padding: "0px 0px 20px 40px",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  <p>Recruitment</p>
                  <span style={{ color: "#fff", fontSize: "50px" }}>00</span>
                </div>
              </div>
            </div>
          </Col>

          {/* {showDailyBusiness && (
            <Col >
              <div
                className=" dataCard"
                bordered="false"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                {/* <Link to="/kpi-dashboard">
                <div className="card-content" style={{ marginBottom: "25px" }}>
                  <div
                    className="activity-icon"
                    onClick={() => history.push("/kpi-dashboard")}
                  >
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={business_img}
                      alt="Business"
                    />
                  </div>
                  <div className="activities-text businessCardStyle">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p
                        onClick={() => history.push("/kpi-dashboard")}
                        className="ttile_name"
                      >
                        {/* Business
                        KPI Dashboard
                      </p>
                      <div className="kpiHomeDropArrow">
                      <Select className="kpiSelectorsHome"
                        defaultValue="mtd"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={mtdOption}
                      ></Select>
                      </div>
                    </div>
                    <div className="horizontalLine"></div>
                  </div>
                </div>

                <div className="activity-block activity-block1">
                      {login_user_data.channelCode.channelCode === 'CH4' ? <>
                      {mtdYtd === "ytd" ? (
                    <>
                      {KPI_Formate_IBRetails_YTD?.map((cardData, index) => (
                        <>
                          {cardData.ShowCard === true && (
                            <>
                              <div
                                className="card"
                                key={index}
                                style={{ boxShadow: "none" }}
                              >
                                <div
                                  className="card-heading"
                                  style={{
                                    marginBottom: "10px",
                                    marginTop: "0rem",
                                  }}
                                >
                                  <h4>{cardData.Label}</h4>
                                </div>
                                <div className="flex">
                                  {cardData.Label === "APE" ||
                                  cardData.Label === "NBP" ? (
                                    <div className="parent">
                                      <h3

                                      >
                                        {cardData.KPIdata.Target.value === "NA"
                                          ? 0
                                          : cardData.KPIdata.Target.value}
                                      </h3>
                                      <p>{cardData.KPIdata.Target.title}</p>
                                    </div>
                                  ) : null}

                                  <div className="parent">
                                    <h3
                                      style={{

                                        color: cardData.KPIdata.Actual.color,
                                      }}
                                    >
                                      {cardData.KPIdata.Actual.value === "NULL"
                                        ? 0
                                        : cardData.KPIdata.Actual.value}
                                    </h3>
                                    <p
                                      style={{
                                        color: cardData.KPIdata.Actual.color,
                                      }}
                                    >
                                      {cardData.KPIdata.Actual.title}
                                    </p>
                                  </div>

                                  {cardData.Label === "APE" ||
                                  cardData.Label === "NBP" ? (
                                    <div className="parent">
                                      <h3
                                        style={{

                                          color: cardData.KPIdata.Actual.color,
                                        }}
                                      >
                                        {cardData.KPIdata.Achivemnet.value ===
                                        "NA"
                                          ? 0
                                          : cardData.KPIdata.Achivemnet.value}
                                      </h3>
                                      <p
                                        style={{
                                          color: cardData.KPIdata.Actual.color,
                                        }}
                                      >
                                        {cardData.KPIdata.Achivemnet.title}
                                      </p>
                                    </div>
                                  ) : null}
                                  {cardData.Label === 'PPT Mix' ? (

                                              <>
                                              <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Target.color,
                              }}>{cardData.KPIdata.Target.value === undefined ? 0 : cardData.KPIdata.Target.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Target.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'PPT Mix' ? cardData.KPIdata.Target.title : ''}</p>
                        </div>

                          <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Achivemnet.color,
                              }}>{cardData.KPIdata.Achivemnet.value === undefined ? 0 : cardData.KPIdata.Achivemnet.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Achivemnet.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'PPT Mix' ? cardData.KPIdata.Achivemnet.title : ''}</p>
                        </div>
                                          </>
                      ) : null }


                        {cardData.Label === 'Product Mix' ? (

                        <>
                          <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Target.color,
                              }}>{cardData.KPIdata.Target.value === undefined ? 0 : cardData.KPIdata.Target.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Target.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'Product Mix' ? cardData.KPIdata.Target.title : ''}</p>
                        </div>

                          <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Achivemnet.color,
                              }}>{cardData.KPIdata.Achivemnet.value === undefined ? 0 : cardData.KPIdata.Achivemnet.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Achivemnet.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'Product Mix' ? cardData.KPIdata.Achivemnet.title : ''}</p>
                        </div>
                        <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Achivemnet.color,
                              }}>{cardData.KPIdata.Achivemnet_one.value === undefined ? 0 : cardData.KPIdata.Achivemnet_one.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Achivemnet.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'Product Mix' ? cardData.KPIdata.Achivemnet_one.title : ''}</p>
                        </div>
                          </>

                        ) : null}
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      {KPI_Formate_IBRetails_MTD?.map((cardData, index) => (
                        <>
                          {cardData.ShowCard === true && (
                            <>
                              <div
                                className="card"
                                key={index}
                                style={{ boxShadow: "none" }}
                              >
                                <div
                                  className="card-heading"
                                  style={{
                                    marginBottom: "10px",
                                    marginTop: "0rem",
                                  }}
                                >
                                  <h4>{cardData.Label}</h4>
                                </div>
                                <div className="flex">
                                  {cardData.Label === "APE" ||
                                  cardData.Label === "NBP" ? (
                                    <div className="parent">
                                      <h3>
                                        {cardData.KPIdata.Target.value === "NA"
                                          ? 0
                                          : cardData.KPIdata.Target.value}
                                      </h3>
                                      <p>{cardData.KPIdata.Target.title}</p>
                                    </div>
                                  ) : null}

                                  <div className="parent">
                                    <h3
                                      style={{

                                        color: cardData.KPIdata.Actual.color,
                                      }}
                                    >
                                      {cardData.KPIdata.Actual.value === "NULL"
                                        ? 0
                                        : cardData.KPIdata.Actual.value}
                                    </h3>
                                    <p
                                      style={{
                                        color: cardData.KPIdata.Actual.color,
                                      }}
                                    >
                                      {cardData.KPIdata.Actual.title}
                                    </p>
                                  </div>

                                  {cardData.Label === "APE" ||
                                  cardData.Label === "NBP" ? (
                                    <div className="parent">
                                      <h3
                                        style={{

                                          color: cardData.KPIdata.Actual.color,
                                        }}
                                      >
                                        {cardData.KPIdata.Achivemnet.value ===
                                        "NA"
                                          ? 0
                                          : cardData.KPIdata.Achivemnet.value}
                                      </h3>
                                      <p
                                        style={{
                                          color: cardData.KPIdata.Actual.color,
                                        }}
                                      >
                                        {cardData.KPIdata.Achivemnet.title}
                                      </p>
                                    </div>
                                  ) : null}
                                  {cardData.Label === 'PPT Mix' ? (

                                              <>
                                              <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Target.color,
                              }}>{cardData.KPIdata.Target.value === undefined ? 0 : cardData.KPIdata.Target.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Target.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'PPT Mix' ? cardData.KPIdata.Target.title : ''}</p>
                        </div>

                          <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Achivemnet.color,
                              }}>{cardData.KPIdata.Achivemnet.value === undefined ? 0 : cardData.KPIdata.Achivemnet.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Achivemnet.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'PPT Mix' ? cardData.KPIdata.Achivemnet.title : ''}</p>
                        </div>
                                          </>
                      ) : null }


                        {cardData.Label === 'Product Mix' ? (

                        <>
                          <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Target.color,
                              }}>{cardData.KPIdata.Target.value === undefined ? 0 : cardData.KPIdata.Target.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Target.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'Product Mix' ? cardData.KPIdata.Target.title : ''}</p>
                        </div>

                          <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Achivemnet.color,
                              }}>{cardData.KPIdata.Achivemnet.value === undefined ? 0 : cardData.KPIdata.Achivemnet.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Achivemnet.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'Product Mix' ? cardData.KPIdata.Achivemnet.title : ''}</p>
                        </div>
                        <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Achivemnet.color,
                              }}>{cardData.KPIdata.Achivemnet_one.value === undefined ? 0 : cardData.KPIdata.Achivemnet_one.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Achivemnet.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'Product Mix' ? cardData.KPIdata.Achivemnet_one.title : ''}</p>
                        </div>
                          </>

                        ) : null}
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ))}
                    </>
                  )}
                      </> : <>
                      {mtdYtd === "ytd" ? (
                    <>
                      {KPI_Formate_Data_YTD?.map((cardData, index) => (
                        <>
                          {cardData.ShowCard === true && (
                            <>
                              <div
                                className="card"
                                key={index}
                                style={{ boxShadow: "none" }}
                              >
                                <div
                                  className="card-heading"
                                  style={{
                                    marginBottom: "10px",
                                    marginTop: "0rem",
                                  }}
                                >
                                  <h4>{cardData.Label}</h4>
                                </div>
                                <div className="flex">
                                  {cardData.Label === "APE" ||
                                  cardData.Label === "NBP" ? (
                                    <div className="parent">
                                      <h3

                                      >
                                        {cardData.KPIdata.Target.value === "NA"
                                          ? 0
                                          : cardData.KPIdata.Target.value}
                                      </h3>
                                      <p>{cardData.KPIdata.Target.title}</p>
                                    </div>
                                  ) : null}

                                  <div className="parent">
                                    <h3
                                      style={{

                                        color: cardData.KPIdata.Actual.color,
                                      }}
                                    >
                                      {cardData.KPIdata.Actual.value === "NULL"
                                        ? 0
                                        : cardData.KPIdata.Actual.value}
                                    </h3>
                                    <p
                                      style={{
                                        color: cardData.KPIdata.Actual.color,
                                      }}
                                    >
                                      {cardData.KPIdata.Actual.title}
                                    </p>
                                  </div>

                                  {cardData.Label === "APE" ||
                                  cardData.Label === "NBP" ? (
                                    <div className="parent">
                                      <h3
                                        style={{

                                          color: cardData.KPIdata.Actual.color,
                                        }}
                                      >
                                        {cardData.KPIdata.Achivemnet.value ===
                                        "NA"
                                          ? 0
                                          : cardData.KPIdata.Achivemnet.value}
                                      </h3>
                                      <p
                                        style={{
                                          color: cardData.KPIdata.Actual.color,
                                        }}
                                      >
                                        {cardData.KPIdata.Achivemnet.title}
                                      </p>
                                    </div>
                                  ) : null}
                                  {cardData.Label === 'PPT Mix' ? (

                                              <>
                                              <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Target.color,
                              }}>{cardData.KPIdata.Target.value === undefined ? 0 : cardData.KPIdata.Target.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Target.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'PPT Mix' ? cardData.KPIdata.Target.title : ''}</p>
                        </div>

                          <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Achivemnet.color,
                              }}>{cardData.KPIdata.Achivemnet.value === undefined ? 0 : cardData.KPIdata.Achivemnet.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Achivemnet.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'PPT Mix' ? cardData.KPIdata.Achivemnet.title : ''}</p>
                        </div>
                                          </>
                      ) : null }


                        {cardData.Label === 'Product Mix' ? (

                        <>
                          <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Target.color,
                              }}>{cardData.KPIdata.Target.value === undefined ? 0 : cardData.KPIdata.Target.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Target.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'Product Mix' ? cardData.KPIdata.Target.title : ''}</p>
                        </div>

                          <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Achivemnet.color,
                              }}>{cardData.KPIdata.Achivemnet.value === undefined ? 0 : cardData.KPIdata.Achivemnet.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Achivemnet.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'Product Mix' ? cardData.KPIdata.Achivemnet.title : ''}</p>
                        </div>
                        <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Achivemnet.color,
                              }}>{cardData.KPIdata.Achivemnet_one.value === undefined ? 0 : cardData.KPIdata.Achivemnet_one.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Achivemnet.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'Product Mix' ? cardData.KPIdata.Achivemnet_one.title : ''}</p>
                        </div>
                          </>

                        ) : null}
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      {KPI_Format_Data?.map((cardData, index) => (
                        <>
                          {cardData.ShowCard === true && (
                            <>
                              <div
                                className="card"
                                key={index}
                                style={{ boxShadow: "none" }}
                              >
                                <div
                                  className="card-heading"
                                  style={{
                                    marginBottom: "10px",
                                    marginTop: "0rem",
                                  }}
                                >
                                  <h4>{cardData.Label}</h4>
                                </div>
                                <div className="flex">
                                  {cardData.Label === "APE" ||
                                  cardData.Label === "NBP" ? (
                                    <div className="parent">
                                      <h3>
                                        {cardData.KPIdata.Target.value === "NA"
                                          ? 0
                                          : cardData.KPIdata.Target.value}
                                      </h3>
                                      <p>{cardData.KPIdata.Target.title}</p>
                                    </div>
                                  ) : null}

                                  <div className="parent">
                                    <h3
                                      style={{

                                        color: cardData.KPIdata.Actual.color,
                                      }}
                                    >
                                      {cardData.KPIdata.Actual.value === "NULL"
                                        ? 0
                                        : cardData.KPIdata.Actual.value}
                                    </h3>
                                    <p
                                      style={{
                                        color: cardData.KPIdata.Actual.color,
                                      }}
                                    >
                                      {cardData.KPIdata.Actual.title}
                                    </p>
                                  </div>

                                  {cardData.Label === "APE" ||
                                  cardData.Label === "NBP" ? (
                                    <div className="parent">
                                      <h3
                                        style={{

                                          color: cardData.KPIdata.Actual.color,
                                        }}
                                      >
                                        {cardData.KPIdata.Achivemnet.value ===
                                        "NA"
                                          ? 0
                                          : cardData.KPIdata.Achivemnet.value}
                                      </h3>
                                      <p
                                        style={{
                                          color: cardData.KPIdata.Actual.color,
                                        }}
                                      >
                                        {cardData.KPIdata.Achivemnet.title}
                                      </p>
                                    </div>
                                  ) : null}
                                  {cardData.Label === 'PPT Mix' ? (

                                              <>
                                              <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Target.color,
                              }}>{cardData.KPIdata.Target.value === undefined ? 0 : cardData.KPIdata.Target.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Target.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'PPT Mix' ? cardData.KPIdata.Target.title : ''}</p>
                        </div>

                          <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Achivemnet.color,
                              }}>{cardData.KPIdata.Achivemnet.value === undefined ? 0 : cardData.KPIdata.Achivemnet.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Achivemnet.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'PPT Mix' ? cardData.KPIdata.Achivemnet.title : ''}</p>
                        </div>
                                          </>
                      ) : null }


                        {cardData.Label === 'Product Mix' ? (

                        <>
                          <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Target.color,
                              }}>{cardData.KPIdata.Target.value === undefined ? 0 : cardData.KPIdata.Target.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Target.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'Product Mix' ? cardData.KPIdata.Target.title : ''}</p>
                        </div>

                          <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Achivemnet.color,
                              }}>{cardData.KPIdata.Achivemnet.value === undefined ? 0 : cardData.KPIdata.Achivemnet.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Achivemnet.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'Product Mix' ? cardData.KPIdata.Achivemnet.title : ''}</p>
                        </div>
                        <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Achivemnet.color,
                              }}>{cardData.KPIdata.Achivemnet_one.value === undefined ? 0 : cardData.KPIdata.Achivemnet_one.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Achivemnet.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'Product Mix' ? cardData.KPIdata.Achivemnet_one.title : ''}</p>
                        </div>
                          </>

                        ) : null}
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ))}
                    </>
                  )}
                      </>}



                </div>
              </div>
            </Col>
          )} */}

          {showDailyBusiness && (
            <Col>
              <div
                className=" dataCard"
                bordered="false"
                style={{ backgroundColor: "rgb(94, 192, 173)" }}
              >
                <Link to="/daily-bussienss">
                  <div className="card-content">
                    <div className="activity-icon">
                      <Image
                        preview={false}
                        width={55}
                        height={55}
                        src={opportunities_img}
                        alt="Business"
                      />
                    </div>
                    <div className="activities-text">
                      <p className="ttile_name">Daily Business</p>
                      <div className="horizontalLine"></div>
                    </div>
                  </div>
                </Link>
                <div style={{ marginTop: "50px" }}>
                  <div
                    style={{
                      backgroundColor: "#fff",
                      marginBottom: "10px",
                      borderRadius: "3px",
                      color: "#3C3D3D",
                      fontSize: "11px",
                      border: "1px solid #00224747",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "750",
                        padding: "5px 10px",
                        borderBottom: "1px solid #c1c8cc",
                        marginBottom: 0,
                      }}
                    >
                      GWP / {moment().format("MMMM / YYYY")}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        color: "#fff",
                        lineHeight: "5px",
                        color: "black",
                      }}
                    >
                      <div style={{ width: "120px", padding: "8px 10px" }}>
                        <p>Target</p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#3c3d3d",
                            marginBottom: 5,
                          }}
                        >
                          {goal?.am?.gpwCommitment ? goal.am.gpwCommitment : 0}
                        </p>
                      </div>
                      <div
                        style={{
                          width: "120px",
                          padding: "8px 10px",
                          borderRight: "1px solid #c2c8cc",
                          borderLeft: "1px solid #c2c8cc",
                        }}
                      >
                        <p>Achievement</p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#3c3d3d",
                            marginBottom: 5,
                          }}
                        >
                          {goal?.pm?.gpwAchived ? goal.pm.gpwAchived : 0}
                        </p>
                      </div>
                      <div style={{ width: "120px", padding: "8px 10px" }}>
                        <p>Achievement</p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#3c3d3d",
                            marginBottom: 5,
                          }}
                        >
                          {getPercenTage(
                            checkValidity(goal?.am?.gpwCommitment),
                            checkValidity(goal?.pm?.gpwAchived)
                          )}
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          )}

          <Col style={{ display: "none" }}>
            <div
              className=" dataCard"
              bordered="false"
              style={{ backgroundColor: "#00ACC1", overflow: "hidden" }}
            >
              <div className="card-content">
                <div className="activity-icon">
                  <Image
                    preview={false}
                    width={55}
                    height={55}
                    src={todo_img}
                    alt="Actions"
                  />
                </div>
                <div className="activities-text">
                  <p className="ttile_name">Actions</p>
                  {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '480%', margin: '-6px' }} /> */}
                  <div className="horizontalLine"></div>
                </div>
                <div className="action-cards-content">
                  <div style={{ width: "100%", padding: "10px" }}>
                    <p style={{ width: "100%", margin: "0" }}>
                      New Leads{" "}
                      <span
                        style={{
                          float: "right",
                          color: "#00ACC1",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Dismiss
                      </span>
                    </p>
                    <h1 style={{ marginTop: "-10px" }}>
                      <b style={{ color: "#00ACC1" }}>10</b>{" "}
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          fontFamily: "robotoregular",
                        }}
                      >
                        Unallocated leads in the list
                      </span>
                    </h1>
                  </div>
                  <div style={{ width: "100%", padding: "10px" }}>
                    <p style={{ width: "100%", margin: "0" }}>
                      New Leads{" "}
                      <span
                        style={{
                          float: "right",
                          color: "#00ACC1",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Dismiss
                      </span>
                    </p>
                    <h1 style={{ marginTop: "-10px" }}>
                      <b style={{ color: "#00ACC1" }}>10</b>{" "}
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          fontFamily: "robotoregular",
                        }}
                      >
                        Unallocated leads in the list
                      </span>
                    </h1>
                  </div>
                  <div style={{ width: "100%", padding: "10px" }}>
                    <p style={{ width: "100%", margin: "0" }}>
                      New Leads{" "}
                      <span
                        style={{
                          float: "right",
                          color: "#00ACC1",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Dismiss
                      </span>
                    </p>
                    <h1 style={{ marginTop: "-10px" }}>
                      <b style={{ color: "#00ACC1" }}>10</b>{" "}
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          fontFamily: "robotoregular",
                        }}
                      >
                        Unallocated leads in the list
                      </span>
                    </h1>
                  </div>
                  <div style={{ width: "100%", padding: "10px" }}>
                    <p style={{ width: "100%", margin: "0" }}>
                      New Leads{" "}
                      <span
                        style={{
                          float: "right",
                          color: "#00ACC1",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Dismiss
                      </span>
                    </p>
                    <h1 style={{ marginTop: "-10px" }}>
                      <b style={{ color: "#00ACC1" }}>10</b>{" "}
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          fontFamily: "robotoregular",
                        }}
                      >
                        Unallocated leads in the list
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {showTodo && (
            <Col>
              <div
                className=" dataCard"
                bordered="false"
                style={{ backgroundColor: "rgb(0, 172, 193)" }}
              >
                {/* <Link to={routename}> */}
                <div className="card-content">
                  <div
                    onClick={() => history.push("/todo")}
                    className="activity-icon"
                  >
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={todo_img}
                      alt="ToDo"
                    />
                  </div>
                  <div
                    onClick={() => history.push("/todo")}
                    className="activities-text"
                  >
                    <p className="ttile_name">To Do</p>
                    {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '590%', margin: '-6px' }} /> */}
                    <div className="horizontalLine"></div>
                  </div>
                </div>
                {/* </Link> */}

                {getTodoDataArray &&
                !_.isEmpty(getTodoDataArray) &&
                getTodoDataArray !== "No appointment " ? (
                  <div className="activity-block">
                    {getTodoDataArray.map((element, index, item) => {
                      return (
                        <div
                          className="TodoCard-Container todo-home"
                          key={index}
                        >
                          <div className="TodoCards-Top">
                            <div className="TodoCards-TimedateArchive">
                              <Col className="TodoCards-TopClock">
                                <div className="todoCard-mr15">
                                  <img src={TodoClock} alt="alarm" />
                                </div>
                                <div>
                                  <h4
                                    style={{
                                      color:
                                        element.status === "Soon"
                                          ? element.sooncolor
                                          : element.status === "Overdue"
                                          ? element.overduecolor
                                          : "red",
                                      fontSize: 12,
                                    }}
                                  >
                                    {element.status}{" "}
                                  </h4>
                                </div>
                                <div style={{ marginLeft: 5 }}>
                                  <h4
                                    style={{
                                      color:
                                        element.status === "Soon"
                                          ? element.sooncolor
                                          : element.status === "Overdue"
                                          ? element.overduecolor
                                          : "red",
                                      fontSize: 12,
                                    }}
                                  >
                                    {element.stringtimeofreminder} :{" "}
                                    {element.dateofreminder}
                                  </h4>
                                </div>
                              </Col>

                              <div style={{ paddingLeft: 10, paddingRight: 5 }}>
                                <img
                                  alt=""
                                  src={hamburger}
                                  style={{
                                    height: 15,
                                    width: 3,
                                    cursor: "pointer",
                                  }}
                                  onClick={(e) => {
                                    Showpopuptodo(index, element);
                                  }}
                                />
                              </div>

                              <Modal
                                shown={modalShown}
                                close={() => {
                                toggleModal(false);
                                }}
                            >
                              <div className="Hamburger-Edit1">
                                <Card className='Hamburger-Card Hamburger-box'>
                                    {/* <div style={{cursor:'pointer'}} onClick={()=> showModal(element,index)}><FormOutlined style={{marginRight:"10px",marginLeft:10}} />Edit</div> */}
                                    {/* <div style={{backgroundColor:'#e6e9eb', opacity:'0.3',height:10,marginTop:5,marginBottom:5}}></div> */}
                                    <div style={{cursor:'pointer'}} onClick={()=> archiveData(element)}><ShopOutlined style={{marginRight:"10px",marginLeft:10}}/>Archive</div>
                                </Card>
                              </div>

                            </Modal>


                            </div>
                          </div>
                          {/* <div className="TodoCards-Body">
                            <div
                              className="TodoCard-Body-CheckBox todoCard-mr15"
                              onClick={() => removListFromToDo(element, index)}
                            >
                              <img
                                src={element.icon}
                                className="archive-trueCheckBox"
                                alt="trueCheckBox"
                              />
                            </div>
                            <p
                              style={{
                                textDecorationLine:
                                  element.textOverLine.textDecorationLine,
                              }}
                            >
                              {element.content}
                            </p>
                          </div> */}
                          {element.isUserIdSameornot === true && (
                            <div className="TodoCards-Body">
                              {/* <div className='TodoCard-Body-CheckBox'>
                                    <input type='checkbox'   onClick={(e)=>{Uncheck(element.taskOwner_id)}}/>
                                </div> */}

                              {/* {usercreatedid ===} */}
                              <div
                                className="TodoCard-Body-CheckBox todoCard-mr15"
                                onClick={() =>
                                  removListFromToDo(element, index)
                                }
                              >
                                <img
                                  src={
                                    element.Cretedownertaskdon === true
                                      ? truecheckbox
                                      : checkboxoutline
                                  }
                                  className="archive-trueCheckBox"
                                  alt="trueCheckBox"
                                />
                              </div>
                              <p
                                style={{
                                  textDecorationLine:
                                    element.Cretedownertaskdon === true
                                      ? "line-through"
                                      : "",
                                }}
                              >
                                {element.content}
                              </p>
                              {/* <p style={[{textDecorationLine : element.textOverLine.textDecorationLine}]} className={element.removeBtn ?"textDecoration":""}>{element.content}</p> */}
                            </div>
                          )}

                          {/* {  element.isUserIdSameornot === false &&               */}
                          {element.isUserIdSameornot === false
                            ? element.searchdata.map((data, ind) => {
                                return (
                                  <div>
                                    {data._Id == loginUserID && (
                                      <div className="TodoCards-Body">
                                        <div
                                          className="TodoCard-Body-CheckBox todoCard-mr15"
                                          onClick={() =>
                                            removListFromToDo(element, index)
                                          }
                                        >
                                          <img
                                            src={
                                              data.taskDone === true
                                                ? truecheckbox
                                                : checkboxoutline
                                            }
                                            className="archive-trueCheckBox"
                                            alt="trueCheckBox"
                                          />
                                        </div>
                                        <p
                                          style={{
                                            textDecorationLine:
                                              data.taskDone === true
                                                ? "line-through"
                                                : "",
                                          }}
                                        >
                                          {element.content}
                                        </p>

                                        {/* <p style={[{textDecorationLine : element.textOverLine.textDecorationLine}]} className={element.removeBtn ?"textDecoration":""}>{element.content}</p> */}
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                            : ""}

                          <div className="Todo-Footer">
                            <p
                              style={{
                                textTransform: "capitalize",
                                fontWeight: "bolder",
                              }}
                            >
                              {element.ownername}
                            </p>
                            <button
                              style={{
                                textTransform: "capitalize",
                                backgroundColor: element.priorityIndicatorColor,
                              }}
                            >
                              {element.taskPriority}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ height: "75%" }} className="events-body">
                    <Image
                      className="stars1"
                      src={action_data_img}
                      preview={false}
                    ></Image>
                    <p
                      style={{
                        color: "#00ACC1",

                        fontWeight: "600",
                        margin: "0 auto",
                        width: "fit-content",
                      }}
                    >
                      No Active Task
                    </p>
                  </div>
                )}
              </div>
            </Col>
          )}

          <Col style={{ display: "none" }}>
            <div
              className=" dataCard"
              bordered="false"
              style={{ backgroundColor: "#5EC0AD" }}
            >
              <Link to="/renewalMaster/allRenewals">
                <div className="card-content">
                  <div className="activity-icon">
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={mapped_img}
                      alt="Customers"
                    />
                  </div>
                  <div className="activities-text">
                    <p className="ttile_name">Renewals</p>
                    {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '350%', margin: '-6px' }} /> */}
                    <div className="horizontalLine"></div>
                  </div>
                </div>
              </Link>
              <div className="rewardscorner-text">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <div
                    style={{
                      padding: "0 50px",
                      borderRight: "1px solid #fff",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    <p>Renewals</p>
                    <h1 style={{ color: "#fff", fontSize: "50px" }}>
                      {home_data?.Renewal_count_team
                        ? home_data.Renewal_count_team
                        : "00"}
                    </h1>
                    <p>
                      <b>New</b>
                    </p>
                  </div>
                  <div
                    style={{
                      padding: "0 50px",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    <p>Customers</p>
                    <h1 style={{ color: "#fff", fontSize: "50px" }}>
                      {home_data?.customer_count_team
                        ? home_data.customer_count_team
                        : "00"}
                    </h1>
                    <p>
                      <b>New</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col style={{ display: "none" }}>
            <div
              className=" dataCard"
              bordered="false"
              style={{ backgroundColor: "#00ACC1" }}
            >
              <div className="card-content">
                <Link to="/rewardscorner/contests/allcontest">
                  <div className="activity-icon">
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={reward_img}
                      alt="Rewards Corner"
                    />
                  </div>
                  <div className="activities-text">
                    <p className="ttile_name">Rewards Corner</p>
                    {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '240%', margin: '-6px' }} /> */}
                    <div className="horizontalLine"></div>
                  </div>
                </Link>
                <div className="rewardscorner-text">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <Link to="/rewardscorner/contests/allcontest">
                      <div
                        style={{
                          padding: "0 50px",
                          cursor: "pointer",
                          borderRight: "1px solid #fff",
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        <Image
                          preview={false}
                          width={90}
                          height={90}
                          src={contest_img}
                          alt="contests"
                          hspace="20"
                        />
                        <p>Contests</p>
                      </div>
                    </Link>
                    <Link to="/clubsmaster">
                      <div
                        style={{
                          padding: "0 50px",
                          cursor: "pointer",
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        <Image
                          preview={false}
                          width={90}
                          height={90}
                          src={club_img}
                          alt="clubs"
                        />
                        <p>Clubs</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col style={{ display: "none" }}>
            <div
              className=" dataCard"
              bordered="false"
              style={{ backgroundColor: "#86ACEC" }}
            >
              <div className="card-content">
                <div className="activity-icon">
                  <Image
                    preview={false}
                    width={55}
                    height={55}
                    src={sales_guide_img}
                    alt="Sales Guide"
                  />
                </div>
                <Link to="/servicecorner/all">
                  <div className="activities-text">
                    <p className="ttile_name">Service Corner</p>
                    {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '300%', margin: '-6px' }} /> */}
                    <div className="horizontalLine"></div>
                  </div>
                </Link>
                <div className="salesGuideCont">
                  <div>
                    <p>WIP</p>
                    <h1>00</h1>
                  </div>
                  <div>
                    <p>Closed</p>
                    <h1>00</h1>
                  </div>
                  <div>
                    <p>Claim</p>
                    <h1>00</h1>
                  </div>
                </div>
                <div style={{ marginTop: "30px", textAlign: "center" }}>
                  <p
                    className="sales-content"
                    style={{
                      height: 35,
                      width: "fit-content",
                      padding: "5px 15px",
                      display: "inline-block",
                    }}
                  >
                    Downloads
                  </p>
                  <p
                    className="sales-content"
                    style={{
                      height: 35,
                      width: "fit-content",
                      padding: "5px 15px",
                      display: "inline-block",
                      marginLeft: "10px",
                    }}
                  >
                    FAQ's
                  </p>
                </div>
              </div>
            </div>
          </Col>

          {showSalesGuide && (
            <Col>
              <div
                className=" dataCard"
                bordered="false"
                style={{ backgroundColor: "rgb(206, 160, 225)" }}
              >
                <div className="card-content">
                  <Link to="/products">
                    <div className="activity-icon">
                      <Image
                        preview={false}
                        width={55}
                        height={55}
                        src={sales_guide_img}
                        alt="Sales Guide"
                      />
                    </div>
                    <div className="activities-text">
                      <p className="ttile_name">Sales Guide</p>
                      {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '300%', margin: '-6px' }} /> */}
                      <div className="horizontalLine"></div>
                    </div>
                  </Link>
                  <div className="sales-guide-content">
                    <div className="b1-content">
                      <div
                        onClick={() =>
                          history.push(
                            "/masterpresales/customerdetails/salespitch"
                          )
                        }
                      >
                        <div className="salesGuideNewStyle">
                          <img
                            src={product_icon}
                            style={{ height: 55, width: 55, cursor: "pointer" }}
                          />
                        </div>
                        <div>
                          <p className="sales-content" style={{ fontSize: 14 }}>
                            Sales Pitch
                          </p>
                        </div>
                      </div>

                      <div
                        style={{ marginLeft: 15 }}
                        onClick={() => history.push("/learningcenter")}
                      >
                        <div className="salesGuideNewStyle">
                          <img
                            src={resource_icon}
                            style={{ height: 55, width: 55, cursor: "pointer" }}
                          />
                        </div>
                        {/* <p className="sales-content" style={{ fontSize: 14 }}>Learning Center</p> */}
                        <div>
                          <p className="sales-content" style={{ fontSize: 14 }}>
                            Learning Center
                          </p>
                        </div>
                      </div>

                      <div onClick={() => history.push("/products")}>
                        <div className="salesGuideNewStyle">
                          <img
                            src={product_icon}
                            style={{ height: 55, width: 55, cursor: "pointer" }}
                          />
                        </div>
                        {/* <p className="sales-content" style={{ fontSize: 14 }}>Product</p> */}
                        <div>
                          <p className="sales-content" style={{ fontSize: 14 }}>
                            Product
                          </p>
                        </div>
                      </div>
                      {/* <div onClick={() => history.push("/learningcenter")}>
                        <p
                          className="sales-content"
                          style={{ height: 35, width: 130, fontSize: 14 }}
                        >
                          Learning Center
                        </p>
                      </div> */}
                    </div>
                    {/* <div className="b1-content">
                      <div onClick={() => history.push("/products")}>
                        <p
                          className="sales-content"
                          style={{ height: 35, width: 100 }}
                        >
                          Product
                        </p>
                      </div>
                      <p
                        className="sales-content"
                        style={{ height: 35, width: 130, fontSize: 14 }}
                      >
                        Need Analysis
                      </p>
                    </div>
                    <div className="b1-content">
                      <div onClick={() => history.push("/advisorpitch")}>
                        <p
                          className="sales-content"
                          style={{ height: 35, width: 200, fontSize: 14 }}
                        >
                          Advisor OnBoarding
                        </p>
                      </div>
                    </div>
                    <div className="b1-content">
                      <div onClick={() => history.push("/advisorpitch")}>
                        <p
                          className="sales-content"
                          style={{ height: 35, width: 200, fontSize: 14 }}
                        >
                          Recruitment Presentation
                        </p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </Col>
          )}

          <Col style={{ display: "none" }}>
            <div
              className=" dataCard"
              bordered="false"
              style={{ backgroundColor: "#CEA0E1" }}
            >
              <div className="card-content">
                <Link to="/birthday">
                  <div className="activity-icon">
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={birthday_img}
                      alt="Birthday"
                    />
                  </div>
                  <div className="activities-text">
                    <p className="ttile_name">Birthday</p>
                    {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '420%', margin: '-6px' }} /> */}
                    <div className="horizontalLine"></div>
                  </div>
                </Link>
                <div className="birthday-slides">
                  <Image
                    preview={false}
                    width={32}
                    height={32}
                    src={left_arrow}
                    alt="left arrow"
                  />
                  <Image
                    preview={false}
                    width={32}
                    height={32}
                    src={right_arrow}
                    alt="right arrow"
                  />
                </div>
              </div>
            </div>
          </Col>

          {/* <Col>
          <div className=" dataCard" bordered="false" style={{ backgroundColor: '#5EC0AD' }}>
            <Link to="/mappedbranches">
              <div className="card-content">
                <div className="activity-icon">
                  <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3381.png" alt="Customers" />
                </div>
                <div className="activities-text">
                  <p className='ttile_name'>Mapped Branches</p>
                  <hr style={{ backgroundColor: '#fff', height: '1px', width: '200%', margin: '-6px' }} />
                </div>
              </div>
            </Link>
            <div className="events-body">
              <Image className="stars" preview={false} src="https://pocbanca.iorta.in/assets/Actionnodata.png" alt="Events" />
              <p style={{ color: '#00ACC1',  fontWeight: "600", margin: "0 auto", width: "fit-content", paddingTop: "50%" }}>No Branches Found</p>
              <p style={{ color: '#CEA0E1', fontSize: '20px', width: "fit-content", margin: "auto" }}>No Events Exist</p>
            </div>
          </div>
        </Col> */}

          <Col style={{ display: "none" }}>
            <div
              className=" dataCard"
              bordered="false"
              style={{ backgroundColor: "#5EC0AD" }}
            >
              <Link to="/mappedbranches">
                <div className="card-content">
                  <div className="activity-icon">
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={mapped_img}
                      alt="Customers"
                    />
                  </div>
                  <div className="activities-text">
                    <p className="ttile_name">Mapped Branches</p>
                    {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '200%', margin: '-6px' }} /> */}
                    <div className="horizontalLine"></div>
                  </div>
                </div>
              </Link>
              <div className="events-body">
                <Image
                  className="stars"
                  preview={false}
                  src={action_data_img}
                  alt="Events"
                />
                <p
                  style={{
                    color: "#00ACC1",

                    fontWeight: "600",
                    margin: "0 auto",
                    width: "fit-content",
                  }}
                >
                  No Branches Found
                </p>
              </div>
            </div>
          </Col>

          <Col style={{ display: "none" }}>
            <div
              className=" dataCard"
              bordered="false"
              style={{ backgroundColor: "#5EC0AD" }}
            >
              <Link to="/existingpartner">
                <div className="card-content">
                  <div className="activity-icon">
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={mapped_img}
                      alt="Customers"
                    />
                  </div>
                  <div className="activities-text">
                    <p className="ttile_name">Existing Partner</p>
                    {/* <hr style={{ backgroundColor: '#fff', height: '1px', width: '200%', margin: '-6px' }} /> */}
                    <div className="horizontalLine"></div>
                  </div>
                </div>
              </Link>
              <div style={{ height: "75%" }} className="events-body">
                <p
                  style={{
                    color: "#00ACC1",

                    fontWeight: "600",
                    margin: "0 auto",
                    width: "fit-content",
                    paddingTop: "50%",
                  }}
                >
                  No Branches Found
                </p>
              </div>
            </div>
          </Col>

          {/* <Col>
          <div className=" dataCard" bordered="false" style={{ backgroundColor: '#00ACC1' }}>
            <div className="card-content">
              <div className="activity-icon">
                <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3375.png" alt="ToDo" />
              </div>
              <div className="activities-text">
                <p className='ttile_name'>To Do</p>
                <hr style={{ backgroundColor: '#ececec', height: '1px', width: '590%', margin: '-6px' }} />
              </div>
            </div>
            <div style={{ height: "75%" }} className="events-body">
              <p style={{ color: '#00ACC1',  fontWeight: "600", margin: "0 auto", width: "fit-content", paddingTop: "50%" }}>No Active Task</p>
            </div>
          </div>
        </Col> */}

          {/* <Col className="dummy-home-card"></Col> */}

          <Col style={{ display: "none" }}>
            <div
              className=" dataCard"
              bordered="false"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div className="card-content">
                <Link to="/renewalreport">
                  <div className="activity-icon">
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={reward_img}
                      alt="dashboards"
                    />
                  </div>
                  <div className="activities-text">
                    <p className="ttile_name">Dashboards</p>
                    <hr className="horizontalLine" />
                  </div>
                </Link>
                <div className="rewardscorner-text">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <Link to="/renewalreport">
                      <div
                        style={{
                          padding: "0 50px",
                          cursor: "pointer",
                          borderRight: "1px solid #fff",
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        <Image
                          preview={false}
                          width={90}
                          height={90}
                          src={contest_img}
                          alt="contests"
                          hspace="20"
                        />
                        <p>Renewal Report</p>
                      </div>
                    </Link>
                    <Link to="/salespendency">
                      <div
                        style={{
                          padding: "0 50px",
                          cursor: "pointer",
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        <Image
                          preview={false}
                          width={90}
                          height={90}
                          src={club_img}
                          alt="clubs"
                        />
                        <p>Sales Pendency</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col className="dummy-home-card"></Col>
          <Col className="dummy-home-card"></Col>
        </Row>
      </Col>
    </Fragment>
  );
};
export default HomePage;
