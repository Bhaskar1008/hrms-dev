import React, { useEffect, useState } from "react";
import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import "./KpiDashboard.css";
import { Row, Col, Card, Table, Tag, Space, Button, Select } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { checkAgent, stoageGetter } from "../../helpers";
import Tabs from "../../components/Tab/Tab";
import axiosRequest from "../../axios-request/request.methods";
import { stoageSetter } from "../../helpers";

import Self from "../Activitity Tracker/LeftSide-Activity/Self/Self";
import Team from "../Activitity Tracker/LeftSide-Activity/Team/Team";

import person_black from "../../assets/MaterialUiIcons/person_black_192x192.png";
import person_white from "../../assets/MaterialUiIcons/person_white_192x192.png";
import group_white from "../../assets/MaterialUiIcons/group_white_192x192.png";
import group_black from "../../assets/MaterialUiIcons/group_black_192x192.png";
import { data } from "jquery";

const KpiDashboard = () => {
  //const [KPI_Format_Data, setKPI_Format_Data ] = useState([])
  const login_user_data = stoageGetter("user");
  const userTreeData = useSelector((state) => state?.home?.user_tree);
  const leadsData = useSelector((state) => state.leads);
  
  const dispatch = useDispatch();
  const userDropdownValu = [];
  const userId = useSelector((state) => state.login.userId);
  const [TeamSelf, setTeamSelf] = useState(true);
  const [showDailyData, setShowDailyData] = useState(false);
  const [showFirstGraph, setShowFirstGraph] = useState(false);
  const [showTeamDrop, setShowTeamDrop] = useState(false);
  const [teamData, setTeamData] = useState("Select");
  const [gpwTableData, setGpwTableData] = useState([]);
  const [hierarAgentsList, setHierarAgentsList] = useState([]);
  const [desigData, setDesigData] = useState("Select");
  const [teamMemberList, setTeamMemberList] = useState([]);
  const [KPICard, setKPICard] = useState([]);
  const [showtitle, setShowTitle] = useState(false);
  const [mtdYtd, setMtdYtd] = useState("");

  const [firsrDrop, setFirstDrop] = useState([]);
  const [openSecond, setOpenSecond] = useState(false);
  const [firstValue, setFirstValue] = useState("Select");
  const [secondDropData, setSecondDropData] = useState([]);
  const [secondValue, setSecondValue] = useState("Select");
  const [username, setUsername] = useState("");
  const [userempcode, setUserEmpcode] = useState("");
  const [usercity, setUserCity] = useState("")
  const [userdesignatio, setUserdesignatio] = useState("")
  const [TeamSelfIndicator, setTeamSelfIndicator] = useState("self");
  const [teamselectedObject,SetTeamselectedObject] = useState(null)
  //const [teamData, setTeamData] = useState("");
  
  var logged_in_user = login_user_data.firstName + " " + login_user_data.lastName;
  var user_in_designation = login_user_data?.designation?.designatioName
  var user_in_city = login_user_data.city
  const user_in_empcode = login_user_data.employeeCode
  var Agents_id = login_user_data.AgentsId;
  // const employee_code = login_user_data.employeeCode
  var Employeecodeforself = login_user_data.employeeCode;

  const tabs_data = login_user_data.userRole[0].roleName

  // useEffect(() => {
  //   // simple using fetch

  //   getKpiData()
  //   fetchData()
  // }, [])
  
  let kpi_All_obj = KPICard.length == 0 ? 0 : KPICard[0];
  let KPI_Apr = KPICard.length == 0 ? 0 : KPICard[0].APR;
  let m_persistency = KPICard.length == 0 ? 0 : KPICard[0]["13M_Persistency" === 'NULL' ? '-' : "13M_Persistency"];

  let pers_10 = KPICard.length == 0 ? 0 : KPICard[0]["PPT_<10%"] ? KPICard[0]["PPT_<10%"] : '-';
  let pers_11 = KPICard.length == 0 ? 0 : KPICard[0]["PPT_10-11%"] ? KPICard[0]["PPT_10-11%"] : '-';
  let pers_12 = KPICard.length == 0 ? 0 : KPICard[0]["PPT_>=12%"] ? KPICard[0]["PPT_>=12%"] : '-';

  
  let kpi_pro_mix1 = KPICard.length == 0 ? 0 : KPICard[0][`Plan_Par%`] ? KPICard[0][`Plan_Par%`] : '-';
  let kpi_pro_mix2 = KPICard.length == 0 ? 0 : KPICard[0][`Plan_NONPAR%`] ? KPICard[0][`Plan_NONPAR%`] : '-';
  let kpi_pro_mix3 = KPICard.length == 0 ? 0 : KPICard[0][`Plan_Ulip%`] ? KPICard[0][`Plan_Ulip%`] : '-';
  let kpi_pro_mix4 = KPICard.length == 0 ? 0 : KPICard[0][`Plan_Single%`] ? KPICard[0][`Plan_Single%`] : '-';

  // let kpi_pro_mix = [
  //   kpi_pro_mix1,
  //   kpi_pro_mix2,
  //   kpi_pro_mix3,
  //   kpi_pro_mix4,
  // ].join(" | ");

  let AgentsHeld1 = KPICard.length == 0 ? 0 : KPICard[0][`BusinessAct_MTD_LA`]  
  let AgentsHeld2 = KPICard.length == 0 ? 0 : KPICard[0][`StatusAct_MTD_LA`]
  let AgentsHeld = [AgentsHeld1, AgentsHeld2].join(" | ");

  let AgentsHeld3 = KPICard.length == 0 ? 0 : KPICard[0][`BusinessAct_YTD_LA`] ? KPICard[0][`BusinessAct_YTD_LA`] : '-'
  let AgentsHeld4 = KPICard.length == 0 ? 0 : KPICard[0][`StatusAct_YTD_LA`]
  let AgentsHeld5 = [AgentsHeld3, AgentsHeld4].join(" | ");


  // ------------------------------- productivity MTD ---------------- //

  let productivity1 = KPICard.length == 0 ? 0 : KPICard[0][`LA_MTD_Prod`] ? KPICard[0][`LA_MTD_Prod`] : '-'
  let productivity2 = KPICard.length == 0 ? 0 : KPICard[0][`OP_MTD_Prod`] ? KPICard[0][`OP_MTD_Prod`] : '-'
  let productivity = [productivity1 === 'NULL' ? '-' : productivity1, productivity2 === 'NULL' ? '-' : productivity2].join(" | ");

  let productivity3 = KPICard.length == 0 ? 0 : KPICard[0][`LA_MTD_Prod`] ? KPICard[0][`LA_MTD_Prod`] : "-"
  let productivity4 = KPICard.length == 0 ? 0 : KPICard[0][`OP_MTD_Prod`] ? KPICard[0][`OP_MTD_Prod`] : '-'
  let productivity5 = KPICard.length == 0 ? 0 : KPICard[0][`SM_MTD_Prod`] ? KPICard[0][`SM_MTD_Prod`] : '-'
  let productivity6 = [productivity3 === 'NULL' ? '-' : productivity3, productivity4 === 'NULL' ? '-' : productivity4, productivity5 === 'NULL' ? '-' : productivity5].join(" | ");

  let productivity7 = KPICard.length == 0 ? 0 : KPICard[0][`LA_MTD_Prod`] ? KPICard[0][`LA_MTD_Prod`] : '-'
  let productivity8 = KPICard.length == 0 ? 0 : KPICard[0][`OP_MTD_Prod`] ? KPICard[0][`OP_MTD_Prod`] : '-'
  let productivity9 = KPICard.length == 0 ? 0 : KPICard[0][`SM_MTD_Prod`] ? KPICard[0][`SM_MTD_Prod`] : '-'
  let productivity10 = KPICard.length == 0 ? 0 : KPICard[0][`OH_MTD_Prod`] ? KPICard[0][`OH_MTD_Prod`] : '-'
  let productivity11 = [productivity7 === 'NULL' ? '-' : productivity7, productivity8 === 'NULL' ? '-' : productivity8, productivity9 === 'NULL' ? '-' : productivity9, productivity10 === "NULL" ? '-' : productivity10].join(" | ");


  // --------------------- productivity ytd ---------------- // 

  let productivity12 = KPICard.length == 0 ? 0 : KPICard[0][`LA_YTD_Prod`] ? KPICard[0][`LA_YTD_Prod`] : '-'
  let productivity13 = KPICard.length == 0 ? 0 : KPICard[0][`OP_YTD_Prod`] ? KPICard[0][`OP_YTD_Prod`] : '-'
  let productivity14 = [productivity12 === 'NULL' ? '-' : productivity12, productivity13 === 'NULL' ? '-' : productivity13].join(" | ");

  let productivity15 = KPICard.length == 0 ? 0 : KPICard[0][`LA_YTD_Prod`] ? KPICard[0][`LA_YTD_Prod`] : '-'
  let productivity16 = KPICard.length == 0 ? 0 : KPICard[0][`OP_YTD_Prod`] ? KPICard[0][`OP_YTD_Prod`] : '-'
  let productivity17 = KPICard.length == 0 ? 0 : KPICard[0][`SM_YTD_Prod`] ? KPICard[0][`SM_YTD_Prod`] : '-'
  let productivity18 = [productivity15 === 'NULL' ? '-' : productivity15, productivity16 === 'NULL' ? '-' : productivity16, productivity17 === 'NULL' ? '-' : productivity17].join(" | ");

  let productivity19 = KPICard.length == 0 ? 0 : KPICard[0][`LA_YTD_Prod`] ? KPICard[0][`LA_YTD_Prod`] : '-'
  let productivity20 = KPICard.length == 0 ? 0 : KPICard[0][`OP_YTD_Prod`] ? KPICard[0][`OP_YTD_Prod`] : '-'
  let productivity21 = KPICard.length == 0 ? 0 : KPICard[0][`SM_YTD_Prod`] ? KPICard[0][`SM_YTD_Prod`] : '-'
  let productivity22 = KPICard.length == 0 ? 0 : KPICard[0][`OH_YTD_Prod`] ? KPICard[0][`OH_YTD_Prod`] : '-'
  let productivity23 = [productivity19 === 'NULL' ? '-' : productivity19, productivity20 === 'NULL' ? '-' : productivity20, productivity21 === 'NULL' ? '-' : productivity21, productivity22 === 'NULL' ? '-' : productivity22].join(" | ");
  


  
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

  const handleundefinednull = (data) => {
    if (data == undefined || data == null || data == "") {
      return 0;
    } else {
      return data;
    }
  };

  const checkHerrachyuserwise=(cardname,)=>{
    
    let RoleCode =''
    if(TeamSelfIndicator === 'self'){
      RoleCode = login_user_data.userRole[0].roleName
    }else{
      if(teamselectedObject === null){
      RoleCode = login_user_data.userRole[0].roleName
      }else{
        RoleCode = teamselectedObject.roleCode[0].roleName
      }
    }
    
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
        || RoleCode === 'Regional Head' ||RoleCode === 'P & L Head'|| RoleCode === 'Agent' ){
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

    }else if(login_user_data.channelCode.channelCode === 'CH4' || login_user_data.channelCode.channelCode === 'CH10' || login_user_data.channelCode.channelCode === 'CH8' || login_user_data.channelCode.channelCode === 'CH6' || login_user_data.channelCode.channelCode === 'CH5' ){

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
  }


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
          color: colorCodeFunction(kpi_All_obj.Target_MTD_NBP , kpi_All_obj.NBP_MTD_NBP ),
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
          color: colorCodeFunction(kpi_All_obj.Target_MTD_NBP , kpi_All_obj.NBP_MTD_NBP ),
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
          showtitle: showtitle,
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
          title: "",
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
    //   Label: "Productivity",
    //   ShowCard:checkHerrachyuserwise("Productivity LA | OP | SM",true),
    //   KPIdata: {
    //     Actual: {
    //       value: handleundefinednull(productivity6),
    //       color: "",
    //       title: "LA | OP | SM",
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
    //   Label: "Productivity",
    //   ShowCard:checkHerrachyuserwise("Productivity LA | OP | SM | OH",true),
    //   KPIdata: {
    //     Actual: {
    //       value: handleundefinednull(productivity11),
    //       color: "",
    //       title: "LA | OP | SM | OH",
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
          color: colorCodeFunction(kpi_All_obj.Target_YTD_APE , kpi_All_obj.Issued_YTD_APE ),
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
          color: colorCodeFunction(kpi_All_obj.Target_YTD_NBP , kpi_All_obj.NBP_YTD_NBP),
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
          showtitle: showtitle,
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
          // color: kpi_All_obj.Target_MTD_APE < kpi_All_obj.Issued_MTD_APE ? 'rgb(8, 214, 8)' : 'red',
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
          // color: kpi_All_obj.Target_MTD_APE < kpi_All_obj.Issued_MTD_APE ? 'rgb(8, 214, 8)' : 'red',
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
          // color: kpi_All_obj.Target_YTD_APE < kpi_All_obj.Issued_YTD_APE ? "rgb(8, 214, 8)" : 'red',
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
          // color: kpi_All_obj.Target_YTD_APE < kpi_All_obj.Issued_YTD_APE ? "rgb(8, 214, 8)" : 'red',
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

  const handleSelfTeam = (type) => {
    let _channelId = login_user_data.channelCode._id;
    let _userId = login_user_data.id;
    setTeamSelfIndicator(type)
    if (type === "self") {
      setTeamSelf(true);
      setShowTeamDrop(false);
      setTeamData("Select");
      setFirstValue("Select");
      setSecondValue("Select");
      setOpenSecond(false);
      fetchData(userId, Employeecodeforself);
      setUsername(logged_in_user);
      setUserEmpcode(user_in_empcode)
      setUserdesignatio(user_in_designation)
      setUserCity(user_in_city)
      // getKpiData("GPW", _userId, _channelId);
    } else {
      setTeamSelf(false);
      setDesigData("Select");
      setTeamData("Select");
    }
  };

  const handleDesignationData = (event) => {
    setDesigData(event);
    setTeamData("Select");
    let _teamData = userTreeData?.reporting_users?.filter(
      (el) => el.hierarchy_id === event
    );
    setTeamMemberList(_teamData);
    setShowTeamDrop(true);
  };
  const handleTeamListData = (event) => {
    let _channelId = login_user_data.channelCode._id;
    setTeamData(event);
    // getKpiData("GPW", event, _channelId);
  };

  // const getKpiData = async () => {
  //   // let _kpiResp = await axiosRequest.get(
  //   //   `user/fetch_employee_kpi?emp_code=${userId}&category=${category}&channel=${channelId}`,
  //   //   { secure: true }
  //   // );

  // }
  const fetchData = async (selecteduserid, selectedemployeecode) => {
    try {
      let data = await axiosRequest.get(
        `user/kpi/dashboard/${selecteduserid}?employeeCode=${selectedemployeecode}`
      );

      let res = data;
      setKPICard(res);
    } catch (error) {
      console.log(error);

    }
  };

  useEffect(() => {
    setFirstValue("Select");
    setSecondValue("Select");
    setOpenSecond(false);
    getDataForFirstDropdownTeam();
    fetchData(userId, Employeecodeforself);
    setUsername(logged_in_user);
    setUserEmpcode(user_in_empcode)
    setUserdesignatio(user_in_designation)
    setUserCity(user_in_city)
  }, [leadsData]);

  // useEffect(() => {
  //   if (leadsData?.globalTab === "team") getDataForFirstDropdownTeam();
  // }, [leadsData]);

  const handleFirstDropdown = (event) => {
    
    event ? setOpenSecond(true) : setOpenSecond(false);
    setFirstValue(event);
    setSecondValue("");

    userTreeData?.reporting_users?.forEach((el) => {
      el.label = toCapitalize(el.full_name);
      el.value = el._id;
    });
    // let _teamData = reporting_users.filter(el => el.hierarchy_id === event)
    let _teamData = userTreeData?.reporting_users?.filter(
      (el) => el.hierarchy_id === event
    );
    // userDropdownValu = [..._teamData]
    setSecondDropData(_teamData);
  };

  const handleSecondDropdown = (event) => {


    let fliterobject = secondDropData.filter((el) => el._id === event);
    fetchData(event, fliterobject[0].employeeCode);
    SetTeamselectedObject(fliterobject[0])

    setUsername(fliterobject[0].full_name);
    setUserCity(fliterobject[0].city)
    setUserdesignatio(fliterobject[0]?.designation[0]?.designatioName)
    setUserEmpcode(fliterobject[0].employeeCode)

    // Agents_id = fliterobject[0].AgentsId;
    // const employee_code = login_user_data.employeeCode
    setSecondValue(event);
    //stoageSetter('teamMemberId', event);
    // dispatch(actions.fetchAllLeads(event,'all',1))
  };

  let toCapitalize = (strText) => {
    try {
      if (strText !== "" && strText !== null && typeof strText !== undefined) {
        var _str = strText.toLowerCase();
        var collection = _str.split(" ");
        var modifyStrigs = [];
        _str = "";
        for (var i = 0; i < collection.length; i++) {
          modifyStrigs[i] =
            collection[i].charAt(0).toUpperCase() + collection[i].slice(1);
          _str = _str + modifyStrigs[i] + " ";
        }
        return _str;
      } else {
        return "";
      }
    } catch (err) {
      console.log(err);

    }
  };

  const getDataForFirstDropdownTeam = () => {
    // const response = await getFirstDropdownValueApi(user && user.id);
    // if (response.status == 200) {
    //   if (response?.data?.data?.reporting_hierarchies) {
    //     setFirstDrop(response?.data?.data.reporting_hierarchies);
    //     setSecondDropData(response?.data?.data.reporting_users);
    //   }
    // } else {
    //   throw response?.data?.data;
    // }

    // if(userTreeData.length > 0){
    // if(userTreeData.length == 0){
    userTreeData?.reporting_hierarchies?.forEach((el) => {
      el.label = el.dispValue;
    });
    // reporting_hierarchies.forEach(el =>{ el.label = el.dispValue })
    userTreeData?.reporting_users?.forEach((el) => {
      // reporting_users.forEach(el =>{
      el.label = el.full_name;
      el.value = el._id;
    });
    setFirstDrop(userTreeData?.reporting_hierarchies);
    // setFirstDrop(reporting_hierarchies)
    // }
  };

  return (
    <>
      {/* <Tabs tabMenu={[]} header="KPI Dashboard" activeKey="1" />  */}
      <div className="headerTab_data">
        <h1>KPI Dashboard</h1>
      </div>

      <div className="mainTab">
        {tabs_data === "Agent" ? "" : 
        <>
        {checkAgent() === false && (
          <>
            <Row className="tabs kpiDrop" gutter={[16, 16]}>
              <Col xs={11} sm={12} md={12} lg={3} xl={3}>
                <button
                  style={{ width: "95%" }}
                  className={TeamSelf ? "active_tabs_button" : "tabs_button"}
                  onClick={(e) => {
                    handleSelfTeam("self");
                  }}
                >
                  <img
                    style={{ marginRight: "0px" }}
                    src={TeamSelf ? person_white : person_black}
                    className="person"
                    alt="person_png"
                  />
                  Self
                </button>
              </Col>
              <Col
                xs={11}
                sm={12}
                md={12}
                lg={3}
                xl={3}
                style={{ marginLeft: 8 }}
              >
                <button
                  style={{ width: "95%" }}
                  className={!TeamSelf ? "active_tabs_button" : "tabs_button"}
                  onClick={(e) => {
                    handleSelfTeam("team");
                  }}
                >
                  <img
                    style={{ marginRight: "0px" }}
                    src={TeamSelf ? group_black : group_white}
                    className="person"
                    alt="group_png"
                  />
                  Team
                </button>
              </Col>

              <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                {TeamSelf === false && (
                  <Select className="kpiSelectors"
                    value={firstValue}
                    style={{ width: "100%" }}
                    onChange={handleFirstDropdown}
                    placeholder="Select Hierarchy"
                    options={firsrDrop}
                  ></Select>
                )}
              </Col>

              <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                {openSecond && leadsData && TeamSelf === false && (
                  <Select 
                    className="kpiSelectors seconddropdown"
                    value={secondValue}
                    style={{ width: "100%" }}
                    onChange={(item) => handleSecondDropdown(item)}
                    placeholder="Select Team Member"
                    options={secondDropData}
                  ></Select>
                )}
              </Col>
            </Row>
          </>
        )}
        </>}

        
        

        <div className="dashboard_user">
          <div className="flex-data">
            <h3>KPI Dashboard For {username} - <span style={{fontSize: '15px', color: 'rgb(74 73 73)'}}>( {userempcode} | {userdesignatio} | {usercity} )</span></h3>
            {/* <h3>KPI Dashboard for {logged_in_user} - ID - {Agents_id}</h3> */}
            <div className="flex">
              {/* <p><i>Last upadated as on 24th Nov, 2022</i></p>
                    <Button style={{margin: '0 5px'}} className='refesh' shape="circle" icon={<RedoOutlined />}  /> */}
              <Select className="kpiSelectors"
                defaultValue="mtd"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  {
                    value: "mtd",
                    label: "MTD",
                  },
                  {
                    value: "ytd",
                    label: "YTD",
                  },
                ]}
              />
            </div>
          </div>
          <Row>

            {login_user_data.channelCode.channelCode === 'CH4' ? <>
            
            {mtdYtd === "ytd" ? (
              <>
                {KPI_Formate_IBRetails_YTD?.map((cardData, index) => (
                  <>
                  { cardData.ShowCard === true &&
                  
                  <>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={6}
                    xl={6}
                    className="gutter-row"
                    key={index}
                  >
                    
                    
                    <div className="card">

                      <div className="card-heading">
                        <h4>{cardData.Label}</h4>
                      </div>
                      <div className="flex">
                        

                        {cardData.Label === "APE" ||
                        cardData.Label === "NBP"  ? (

                          <div className="parent">
                            <h3
                              
                            >
                              {cardData.KPIdata.Target.value === "NULL" ||
                              cardData.KPIdata.Target.value === "NA"
                                ? '-'
                                : cardData.KPIdata.Target.value}
                            </h3>
                            <p>
                              {cardData.KPIdata.Target.title}
                            </p>
                          </div>
                        ) : null}

                      <div className="parent">
                          <h3
                            style={{ color: cardData.KPIdata.Actual.color }}
                          >
                            {cardData.KPIdata.Actual.value === "NULL"
                              ? '-'
                              : cardData.KPIdata.Actual.value}
                          </h3>
                          <p style={{ color: cardData.KPIdata.Actual.color }}>{cardData.KPIdata.Actual.title}</p>
                        </div>

                        {cardData.Label === "APE" ||
                        cardData.Label === "NBP" ? (
                          <div className="parent">
                            <h3
                              style={{
                                color: cardData.KPIdata.Actual.color,
                              }}
                            >
                              {cardData.KPIdata.Achivemnet.value === "NA"
                                ? 0
                                : cardData.KPIdata.Achivemnet.value}
                            </h3>
                            <p
                              style={{
                                color: cardData.KPIdata.Actual.color,
                                fontWeight: "bold",
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

                  </Col>
                  </>

}
</>
                ))}
              </>
            ) : (
              <>
                {KPI_Formate_IBRetails_MTD?.map((cardData, index) => (
                  
              <>  
            { cardData.ShowCard === true && 
              <>
              <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={6}
                    xl={6}
                    className="gutter-row"
                    key={index}
                  >
                    
                    <div className="card">
                      <div className="card-heading">
                        <h4>{cardData.Label}</h4>
                      </div>
                      <div className="flex">
                        

                        {cardData.Label === "APE" ||
                        cardData.Label === "NBP"  ? (

                          <div className="parent">
                            <h3
                            >
                              {cardData.KPIdata.Target.value === "NA"
                                ? 0
                                : cardData.KPIdata.Target.value}
                            </h3>
                            <p
                              
                            >
                              {cardData.KPIdata.Target.title}
                            </p>

                            
                          </div>
                        ) : null}

                              <div className="parent">  
                              <h3 style={{ color: cardData.KPIdata.Actual.color }}>
                                {cardData.KPIdata.Actual.value === "NULL"
                                  ? '-'
                                  : cardData.KPIdata.Actual.value}
                              </h3>
                              <p style={{
                                    color: cardData.KPIdata.Actual.color,
                                    fontWeight: "bold",
                                  }}
                              >{cardData.KPIdata.Actual.title}</p>


                              </div>

                        {cardData.Label === "APE" ||
                        cardData.Label === "NBP"  ? (
                          <div className="parent">
                            <h3
                              style={{
                                color: cardData.KPIdata.Actual.color,
                              }}
                            >
                              {cardData.KPIdata.Achivemnet.value === "NA"
                                ? 0
                                : cardData.KPIdata.Achivemnet.value}
                                
                            </h3>
                          
                            <p
                              style={{
                                color: cardData.KPIdata.Actual.color,
                                fontWeight: "bold",
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

                  </Col>
                  </>
                  }
                </>
                  
                ))}
              </>
            )}
            </> : <>
            {mtdYtd === "ytd" ? (
              <>
                {KPI_Formate_Data_YTD?.map((cardData, index) => (
                  <>
                  { cardData.ShowCard === true &&
                  
                  <>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={6}
                    xl={6}
                    className="gutter-row"
                    key={index}
                  >
                    
                    
                    <div className="card">

                      <div className="card-heading">
                        <h4>{cardData.Label}</h4>
                      </div>
                      <div className="flex">
                        

                        {cardData.Label === "APE" ||
                        cardData.Label === "NBP"  ? (

                          <div className="parent">
                            <h3
                              
                            >
                              {cardData.KPIdata.Target.value === "NULL" ||
                              cardData.KPIdata.Target.value === "NA"
                                ? '-'
                                : cardData.KPIdata.Target.value}
                            </h3>
                            <p>
                              {cardData.KPIdata.Target.title}
                            </p>
                          </div>
                        ) : null}

                      <div className="parent">
                          <h3
                            style={{ color: cardData.KPIdata.Actual.color }}
                          >
                            {cardData.KPIdata.Actual.value === "NULL"
                              ? '-'
                              : cardData.KPIdata.Actual.value}
                          </h3>
                          <p style={{ color: cardData.KPIdata.Actual.color }}>{cardData.KPIdata.Actual.title}</p>
                        </div>

                        {cardData.Label === "APE" ||
                        cardData.Label === "NBP" ? (
                          <div className="parent">
                            <h3
                              style={{
                                color: cardData.KPIdata.Actual.color,
                              }}
                            >
                              {cardData.KPIdata.Achivemnet.value === "NA"
                                ? 0
                                : cardData.KPIdata.Achivemnet.value}
                            </h3>
                            <p
                              style={{
                                color: cardData.KPIdata.Actual.color,
                                fontWeight: "bold",
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

                  </Col>
                  </>

}
</>
                ))}
              </>
            ) : (
              <>
                {KPI_Format_Data?.map((cardData, index) => (
                  
              <>  
            { cardData.ShowCard === true && 
              <>
              <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={6}
                    xl={6}
                    className="gutter-row"
                    key={index}
                  >
                    
                    <div className="card">
                      <div className="card-heading">
                        <h4>{cardData.Label}</h4>
                      </div>
                      <div className="flex">
                        

                        {cardData.Label === "APE" ||
                        cardData.Label === "NBP"  ? (

                          <div className="parent">
                            <h3
                            >
                              {cardData.KPIdata.Target.value === "NA"
                                ? 0
                                : cardData.KPIdata.Target.value}
                            </h3>
                            <p
                              
                            >
                              {cardData.KPIdata.Target.title}
                            </p>

                            
                          </div>
                        ) : null}

                              <div className="parent">  
                              <h3 style={{ color: cardData.KPIdata.Actual.color }}>
                                {cardData.KPIdata.Actual.value === "NULL"
                                  ? '-'
                                  : cardData.KPIdata.Actual.value}
                              </h3>
                              <p style={{
                                    color: cardData.KPIdata.Actual.color,
                                    fontWeight: "bold",
                                  }}
                              >{cardData.KPIdata.Actual.title}</p>


                              </div>

                        {cardData.Label === "APE" ||
                        cardData.Label === "NBP"  ? (
                          <div className="parent">
                            <h3
                              style={{
                                color: cardData.KPIdata.Actual.color,
                              }}
                            >
                              {cardData.KPIdata.Achivemnet.value === "NA"
                                ? 0
                                : cardData.KPIdata.Achivemnet.value}
                                
                            </h3>
                          
                            <p
                              style={{
                                color: cardData.KPIdata.Actual.color,
                                fontWeight: "bold",
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

                        {/* {cardData.Label ==='Productivity' ? <>
                        <div className="parent">
                              <h3 style={{
                                color: cardData.KPIdata.Target.color,
                              }}>{cardData.KPIdata.Target.value === undefined ? 0 : cardData.KPIdata.Target.value}</h3>
                              <p style={{
                                color: cardData.KPIdata.Target.color,
                                fontWeight: "bold",
                              }}>{cardData.Label === 'Productivity' ? cardData.KPIdata.Target.title : ''}</p>
                        </div>
                        
                        </> : ""} */}

                        

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

                  </Col>
                  </>
                  }
                </>
                  
                ))}
              </>
            )}
            </>
            }

            


          </Row>


        </div>
      </div>
    </>
  );
};

export default KpiDashboard;
