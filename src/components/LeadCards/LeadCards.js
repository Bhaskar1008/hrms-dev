import { useEffect, useState } from "react";
import LeadCard from "./LeadCard";
import "./LeadCards.css";
import _ from "lodash";
import { Row, Col, Avatar, Card, Select, Button } from "antd";
import NoRecordsFound from "../NoRcordsFound/NoRecordsFound";
import { useDispatch, useSelector } from "react-redux";
import { AllocateModal } from "../Tab/Allocate";
import { stoageSetter } from "../../helpers";
import * as actions from "../../store/actions/leads";
import axiosRequest from "../../axios-request/request.methods";
// stoageSetter('user', user);
import GlobalFilters from "../Tab/Filter";
import AllocateModalShow from "../Tab/Allocate";
import {
  // getTeammain_tab_1Api,
  getFirstDropdownValueApi,
  getSecondDropdownValueApi,
  getFormByIdApi,
  getOpenTabApi,
  getFortodayTabApi,
  getDiscardedTabApi,
  getFailedTabApi,
} from "../../components/actions/allleadAction";

import { fetchAllLeadsSuccess } from "../../store/actions/leads";
import { checkAgent, stoageGetter } from "../../helpers";
import person_black from "./../Activitity Tracker/icons/person_black.png";
import person_white from "./../Activitity Tracker/icons/person_white.png";
import group_white from "./../Activitity Tracker/icons/group_white.png";
import group_black from "./../Activitity Tracker/icons/group_black.png";
import supportLeads from "./supportLeads";

const { Option } = Select;

const LeadCards = (props) => {
  let _currentTab = "self";
  const leadsData = useSelector((state) => state.leads);
  console.log("Lead Data===>>>", leadsData);
  const loginState = useSelector((state) => state.login);
  const userTreeData = useSelector((state) => state?.home?.user_tree);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let test = userTreeData?.reporting_hierarchies;
  const allocateBtnStatus = useSelector((state) => state?.leads?.allocateTab);
  // var userData = {
  //   label:"All",
  //     dispValue:"All",
  //     value:"all",
  // }
  // test = [
  //   userData,
  //   ...userTreeData?.reporting_hierarchies,
  // ]

  const { user } = loginState;
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  const [firsrDrop, setFirstDrop] = useState([]);
  const [openSecond, setOpenSecond] = useState(false);
  const [firstValue, setFirstValue] = useState("Select");
  const [secondDropData, setSecondDropData] = useState([]);
  const [secondValue, setSecondValue] = useState("Select");
  // const [hierarAgentList ,setHierarAgentList]=useState([])

  const [cards, setcard] = useState([]);
  const [currentActiveTab, setCurrentActiveTab] = useState("self");
  const userId = useSelector((state) => state?.login?.userId);

  useEffect(() => {
    setFirstValue("Select");
    setSecondValue("Select");
    setOpenSecond(false);
  }, [leadsData.globalTab]);

  useEffect(() => {
    if (leadsData?.globalTab === "team") getDataForFirstDropdownTeam();
  }, [leadsData]);

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
    test?.forEach((el) => {
      el.label = el.dispValue;
    });
    // reporting_hierarchies.forEach(el =>{ el.label = el.dispValue })
    userTreeData?.reporting_users?.forEach((el) => {
      // reporting_users.forEach(el =>{
      el.label = el.full_name;
      el.value = el._id;
    });
    setFirstDrop(test);
    // setFirstDrop(reporting_hierarchies)

    // }
  };
  const switchteamself = async (leadInc, event) => {
    // let leadtyp = leadInc;

    console.log("Team view Clicked");

    // count1 = 0
    let item = { all_lead: "0", today: "0", open_lead: "0", discarded_lead: "0", converted: "0", failed: "0" };
    let count = [];
    count.push(item?.all_lead, item?.today, item?.open_lead, item?.discarded_lead, item?.converted, item?.failed);

    // countT.push()
    //if (leadsData?.globalTab === 'team') {
    dispatch(actions.addAllTeamCount(count));

    const { id } = stoageGetter("user");
    const teamId = stoageGetter("teamMemberId");

    if (event === "self") {
      dispatch(actions.fetchAllLeads(id, leadInc, 1));
      // getDataForOpen(leadInc)
    }

    if (event === "team") {
      // dispatch(actions.fetchAllLeads(teamId, leadInc, 1));
      dispatch(fetchAllLeadsSuccess(supportLeads.readSortDataFromAPI(leadInc, [])));
    }
  };

  // let b = []

  // let a = {
  //   dispValue: "All",
  //   label: "All",
  //   value: "all"
  // }

  //b.push(a)
  //firsrDrop.unshift(a)
  //b.push(firsrDrop)

  useEffect(() => {
    // if (secondValue) {
    // getDataAfterFilterTeam()
    cardShow();
    //   dispatch(
    //     actions.fetchDataAfterFilter(

    //      // filterData.searchtxt,
    //     ))
    //   // }
  }, [leadsData.allLeads]);

  // useEffect(() => {
  //   // if (secondValue) {
  //   // getDataAfterFilterTeam()
  //   cardShow();
  //   // }
  // }, []);

  // const getDataForSecondDropdownTeam = async () => {
  //   const response = await getSecondDropdownValueApi()
  //   if (response.status == 200) {
  //     if (response?.data?.data) {
  //       const filterValue = []
  //       const dropDownData = []
  //       _.map(response.data.data, function (layar) {
  //         return _.map(layar, function (layarTwo) {
  //           filterValue.push(layarTwo[0])
  //         })
  //       })
  //       filterValue &&
  //         _.map(filterValue, function (layar) {
  //           _.map(layar.subCategories, function (data) {
  //             dropDownData.push(data)
  //           })
  //         })
  //       setSecondDropData(dropDownData)
  //     }
  //   } else {
  //     throw response?.data?.data
  //   }
  // }
  const handleFirstDropdown = (event) => {
    event ? setOpenSecond(true) : setOpenSecond(false);
    setFirstValue(event);
    setSecondValue("");
    // stoageSetter('teamMemberId', event);
    userTreeData.reporting_users.forEach((el) => {
      el.label = toCapitalize(el.full_name);
      el.value = el._id;
    });
    // let _teamData = reporting_users.filter(el => el.hierarchy_id === event)
    let _teamData = userTreeData.reporting_users.filter((el) => el.hierarchy_id === event);
    console.warn("_teamData((((((((((===>>>>>>>>>>", _teamData);
    setSecondDropData(_teamData);
  };
  const handleSecondDropdown = (event) => {
    setSecondValue(event);
    console.log("Event is ---------->", event);
    stoageSetter("teamMemberId", event);

    let agentId = "";
    if (leadsData?.globalTab === "team") {
      agentId = event;
    } else {
      agentId = userId;
    }
    dispatch(actions.fetchAllLeads(agentId, getleads, 1));
    try {
      if (event) {
        let res = axiosRequest.get(`user/v2/getleads_team_count/${event}?requiredData=self`, { secure: true });
        res.then((item) => {
          let count = [];
          // let countT = []

          count.push(item?.all_lead, item?.today, item?.open_lead, item?.discarded_lead, item?.converted, item?.failed);

          // countT.push()
          //if (leadsData?.globalTab === 'team') {
          dispatch(actions.addAllTeamCount(count));
          //}
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    } catch (err) {}
  };

  const getleads = useSelector((state) => state.leads.currentActiveTab);

  var roleName = useSelector((state) => state?.login?.user?.userRole[0]?.roleName);

  const handleChangeTab = (currentTab) => {
    console.log("Current Datat===>", currentTab);
    console.log("Current Active tab===>", currentActiveTab);
    if (currentTab == currentActiveTab) {
      return;
    }
    currentTab === "team" && stoageSetter("teamMemberId", null);
    _currentTab = currentTab;
    setCurrentActiveTab(currentTab);
    switchteamself(getleads, currentTab);

    dispatch(actions.updateTabOfDashboard(currentTab));

    // if (currentTab === "team") getDataForOpen();
    currentTab !== currentActiveTab && dispatch(actions.updateAllocateOfOpportunities(false));
  };

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  const cardShow = () => {
    if (secondValue) {
      let newCards = leadsData.allLeads;
      // .filter((data) =>
      //   data.reporting_manager === secondValue
      // );

      if (_.isEmpty(newCards)) {
        return (
          <>
            <div className="main_tab_1">
              <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  {leadsData?.globalTab === "team" && (
                    <div className="hierarchy">
                      <p style={{ marginLeft: "3.8rem", marginBottom: "5%" }}>Select Hierarchy</p>
                      <Select
                        className="firstdropdown"
                        value={firstValue}
                        // defaultValue='all'
                        style={{ width: "100%" }}
                        onChange={handleFirstDropdown}
                        placeholder="Select Hierarchy"
                        options={firsrDrop}
                      ></Select>
                    </div>
                  )}
                </Col>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  {openSecond && leadsData?.globalTab === "team" && (
                    <div className="hierarchy">
                      <p style={{ marginLeft: "1.3rem", marginBottom: "5px" }}>Select Team Member</p>
                      <Select className="seconddropdown" value={secondValue} style={{ width: "100%" }} onChange={(item) => handleSecondDropdown(item)} placeholder="Select Team Member" options={secondDropData}></Select>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
            <div className="no-record">
              <NoRecordsFound />
            </div>
          </>
        );
      }
      if (!_.isEmpty(newCards)) {
        let card = [];
        card = _.map(newCards, (lead, index) => {
          return (
            <>
              <Col sm={18} md={18} lg={12} xl={12} key={index}>
                <LeadCard
                  className="lead-agent-card"
                  key={lead.id}
                  id={lead.id}
                  lead_Id={lead.lead_Id}
                  leadStatus={lead.status}
                  leadName={lead.personName}
                  leadType={lead.leadType}
                  // firstName={lead.first_name}
                  // lastName={lead.last_name}
                  created_date={lead.allocationDate}
                  allocatedDate={lead.allocationDate}
                  primaryMobile={lead.mobileNo}
                  allocatedBy={lead.allocBy}
                  allocatedTo={lead.allocTo}
                  appointmentOn={lead.appointDate}
                  loading={props.leadDataLoading}
                />
              </Col>
            </>
          );
        });
        setcard(card);
      }
    }
    //  else {

    //   let card = [];
    //   if (_.isEmpty(props.leads)) { return <NoRecordsFound /> }
    //   if (!_.isEmpty(props.leads)) {
    //     card = _.map(props.leads, (lead, index) => {
    //       return (
    //         <>
    //           <Col sm={18} md={18} lg={11} xl={11} >
    //             <LeadCard className='lead-agent-card'
    //               key={lead._id}
    //               id={lead._id}
    //               lead_Id={lead.lead_Id}
    //               leadStatus={lead.leadStatus}
    //               firstName={lead.firstName}
    //               lastName={lead.lastName}
    //               created_date={lead.created_date}
    //               allocatedDate={lead.allocatedDate}
    //               primaryMobile={lead.primaryMobile}
    //               allocatedBy={lead.lead_allocated_by === null ? '' : lead.lead_allocated_by.first_name + ' ' + lead.lead_allocated_by.last_name}
    //               allocatedTo={lead.leadOwnerId === null ? '' : lead.leadOwnerId.first_name + ' ' + lead.leadOwnerId.last_name}
    //               appointmentOn={lead?.appointmentId?.start_date}
    //               loading={props.leadDataLoading}
    //             />
    //           </Col>
    //         </>
    //       )
    //     })
    //     setcard(card)
    //   }
    // }
  };

  // secondValue ?
  // "hi"
  // :
  // (
  // return
  let card = [];
  if (_.isEmpty(props.leads)) {
    return (
      <>
        <div className="main_tab_1" style={{ marginTop: "20px" }}></div>
        <div className={props.leads.length > 0 ? "for-tab-button-filter" : "for-tab-button-filter-display"}>
          <Row gutter={[16, 16]}>
            {checkAgent() === false && (
              <>
                <div style={{ marginTop: "1.5rem" }}>
                  {(currentActiveTab === "team" && allocateBtnStatus) || roleName === "Agent" ? null : (
                    <button onClick={() => handleChangeTab("self")} key={"self"} className={currentActiveTab === "self" ? "active_tabs_button full-width" : "tabs_button full-width"}>
                      <img src={currentActiveTab === "self" ? person_white : person_black} className="person" alt="person_png" /> Self
                    </button>
                  )}
                </div>
                <Col xs={12} sm={12} md={10} lg={8} xl={4} style={{ marginTop: "1.5rem" }}>
                  {(currentActiveTab === "self" && allocateBtnStatus) || roleName === "Agent" ? null : (
                    <button onClick={() => handleChangeTab("team")} key={"team"} className={currentActiveTab === "team" ? "active_tabs_button full-width" : "tabs_button full-width"}>
                      <img src={currentActiveTab === "team" ? group_white : group_black} className="group" alt="person_png" /> Team
                    </button>
                  )}
                </Col>
              </>
            )}
            <Col xs={12} sm={12} md={4} lg={4} xl={4} style={{ marginTop: "1.5rem" }}>
              <GlobalFilters show={show} onHide={handleClose} handleShow={handleShow} setShow={setShow} />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "20px" }}>
            <Col xs={12} sm={12} md={12} lg={4} xl={4}>
              {leadsData?.globalTab === "team" && (
                <div className="hierarchy">
                  <p>Select Hierarchy </p>
                  <Select className="firstdropdown" value={firstValue} style={{ width: "100%" }} onChange={handleFirstDropdown} placeholder="Select Hierarchy" options={firsrDrop} />
                </div>
              )}
            </Col>
            <Col xs={12} sm={12} md={12} lg={4} xl={4}>
              {openSecond && leadsData?.globalTab === "team" && (
                <div className="hierarchy">
                  <p>Select Team Member</p>
                  <Select className="seconddropdown" value={secondValue} style={{ width: "100%" }} onChange={handleSecondDropdown} placeholder="Select Team Member" options={secondDropData} />
                </div>
              )}
            </Col>
          </Row>
          <div className="no-record">
            <NoRecordsFound />
          </div>
        </div>
      </>
    );
  }
  if (!_.isEmpty(props.leads)) {
    card = _.map(props.leads, (lead, index) => {
      return (
        <>
          <Col sm={18} md={18} lg={12} xl={12} key={index}>
            <LeadCard
              className="lead-agent-card"
              key={lead.id}
              id={lead.id}
              lead_Id={lead.lead_Id}
              leadStatus={lead.status}
              leadName={lead.personName}
              // firstName={lead.firstName}
              // lastName={lead.lastName}
              created_date={lead.allocationDate}
              allocatedDate={lead.allocationDate}
              primaryMobile={lead.mobileNo}
              allocatedBy={lead.allocBy}
              allocatedTo={lead.allocTo}
              appointmentOn={lead.appointDate}
              loading={props.leadDataLoading}
            />
          </Col>
        </>
      );
    });
  }
  // )

  const getDataAfterFilterTeam = async () => {
    const response = await getFormByIdApi({ id: secondValue });
    if (response.status == 200) {
      if (response?.data?.data) {
        dispatch(fetchAllLeadsSuccess(response?.data?.data[0], response?.data?.data[1][0]?.count));
      }
    } else {
      throw response?.data?.data;
    }
  };

  return (
    <>
      <div className="main_tab_1"></div>
      <div className={props.leads.length > 0 ? "for-tab-button-filter" : "for-tab-button-filter-display"}>
        <Row gutter={[16, 16]}>
          {!checkAgent() && (
            <>
              {(currentActiveTab !== "team" || !allocateBtnStatus) && roleName !== "Agent" && (
                <div style={{ marginTop: "1.5rem" }}>
                  <button onClick={() => handleChangeTab("self")} key="self" className={`${currentActiveTab === "self" ? "active_tabs_button" : "tabs_button"} full-width`}>
                    <img src={currentActiveTab === "self" ? person_white : person_black} className="person" alt="person_png" /> Self
                  </button>
                </div>
              )}

              {(currentActiveTab !== "self" || !allocateBtnStatus) && roleName !== "Agent" && (
                <Col xs={24} sm={12} md={10} lg={8} xl={4} style={{ marginTop: "1.5rem" }}>
                  <button onClick={() => handleChangeTab("team")} key="team" className={`${currentActiveTab === "team" ? "active_tabs_button" : "tabs_button"} full-width`}>
                    <img src={currentActiveTab === "team" ? group_white : group_black} className="group" alt="group_png" /> Team
                  </button>
                </Col>
              )}
            </>
          )}

          <Col xs={24} sm={12} md={4} lg={4} xl={4} style={{ marginTop: "1.5rem" }}>
            <GlobalFilters show={show} onHide={handleClose} handleShow={handleShow} setShow={setShow} />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: "20px" }}>
          <Col xs={24} sm={12} md={12} lg={4} xl={4}>
            {leadsData?.globalTab === "team" && (
              <div className="hierarchy">
                <p>Select Hierarchy</p>
                <Select className="firstdropdown" value={firstValue} style={{ width: "100%" }} onChange={handleFirstDropdown} placeholder="Select Hierarchy" options={firsrDrop} />
              </div>
            )}
          </Col>
          <Col xs={24} sm={12} md={12} lg={4} xl={4}>
            {openSecond && leadsData?.globalTab === "team" && (
              <div className="hierarchy">
                <p>Select Team Member</p>
                <Select className="seconddropdown" value={secondValue} style={{ width: "100%" }} onChange={handleSecondDropdown} placeholder="Select Team Member" options={secondDropData} />
              </div>
            )}
          </Col>
        </Row>
      </div>

      <div className="cardalign">
        <Row justify="space-between" style={{ backgroundColor: "rgb(241 238 238)" }} gutter={2}>
          {!secondValue ? card : cards}
          <Col sm={18} md={18} lg={12} xl={12} className={width < breakpoint ? "dummy-card-mobile" : "dummy-card-desktop"}>
            <Card className="lead-card-desktop" hoverable>
              <div className="avatar-and-status">
                <Avatar size={{ xl: 50 }} />
              </div>
              <div className="content">
                <div className="content-header">
                  <p className="user-name-text capitalize">
                    <span className="user-id uppercase"></span>
                  </p>
                </div>
                <div className="content-body">
                  <Card.Grid hoverable={false} className="grid-style">
                    <p className="text-type">Created on</p>
                    <p className="text-content"></p>
                  </Card.Grid>
                  <Card.Grid hoverable={false} className="grid-style">
                    <p className="text-type">Created on</p>
                    <p className="text-content"></p>
                  </Card.Grid>
                  <Card.Grid hoverable={false} className="grid-style">
                    <p className="text-type">Appointment on</p>
                    <p className="text-content">-</p>
                  </Card.Grid>
                  <Card.Grid hoverable={false} className="grid-style">
                    <p className="text-type">Mobile No.</p>
                    <p className="text-content"></p>
                  </Card.Grid>
                  <Card.Grid hoverable={false} className="grid-style">
                    <p className="text-type">Allocated by</p>
                    <p className="text-content capitalize"></p>
                  </Card.Grid>
                  <Card.Grid hoverable={false} className="grid-style">
                    <p className="text-type">Allocated to</p>
                    <p className="text-content capitalize"></p>
                  </Card.Grid>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LeadCards;
