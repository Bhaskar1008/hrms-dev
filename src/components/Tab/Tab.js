import React, { useState, useEffect, useContext } from "react";
import { Card, Radio, Tabs, Modal, Form, Select, Input, message } from "antd";
import { Option } from "antd/lib/mentions";
import "./Tab.css";
import _ from "lodash";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/leads";
// import { checkAgent, stoageGetter } from "../../helpers";
import { checkAgent, stoageGetter } from "../../helpers";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import LeadCard from "../LeadCards/LeadCard";
import GlobalFilters from "./Filter";
import AllocateModalShow from "./Allocate";
import person_black from "./../Activitity Tracker/icons/person_black.png";
import person_white from "./../Activitity Tracker/icons/person_white.png";
import group_white from "./../Activitity Tracker/icons/group_white.png";
import group_black from "./../Activitity Tracker/icons/group_black.png";
import { useLocation } from "react-router-dom";
import axiosRequest from "../../axios-request/request.methods";
// import 'bootstrap/dist/css/bootstrap.min.css';

// api's
import { getTeamMainTabApi, getFirstDropdownValueApi, getSecondDropdownValueApi, getFormByIdApi, getOpenTabApi, getFortodayTabApi, getDiscardedTabApi, getFailedTabApi } from "../actions/allleadAction";
import { flexibleCompare } from "fullcalendar";
import { Column } from "@antv/g2plot";
import { Warning } from "@material-ui/icons";

const { TabPane } = Tabs;

const Tab = ({ tabMenu, test, header, detailsRouteTab, activeKey, activeRenewalkey, current, filterdata }) => {
  const currentLocation = useLocation();

  const dispatch = useDispatch();
  const { leadType } = useParams();
  const { masterType } = useParams();
  const [activeTab, setactiveTab] = useState();
  const [showTab, setShowTab] = useState();
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState([]);
  const [count2, setCount2] = useState([]);
  const location = useLocation();

  let history = useHistory();
  let _currentTab = "self";
  // const [activeKey, setActiveKey] = useState("self")
  const [currentActiveTab, setCurrentActiveTab] = useState("self");
  const [isDisabled, setIsDisabled] = useState(false);
  const allocateBtnStatus = useSelector((state) => state?.leads?.allocateTab);
  const leadsData = useSelector((state) => state.leads);

  var count1 = useSelector((state) => state?.leads?.countArr);

  //const count_data = useSelector((state) => state?.leads?.countArrSe);

  const userId = useSelector((state) => state?.login?.userId);
  //const userId1 = useSelector((state) => state?.login?.user?.designation);
  const getleads = useSelector((state) => state.leads.currentActiveTab);
  const Fullstate = useSelector((state) => state);

  let _leadID = useSelector((state) => state.leads.currentUpdatingID);
  var roleName = useSelector((state) => state?.login?.user?.userRole[0]?.roleName);

  useEffect((leadInc) => {
    // const { id } = stoageGetter("user");
    // dispatch(actions.fetchAllLeads(id, leadInc, 1));

    dispatch({ type: "CURRENT_UPDATING_TAB", action: getleads });

    if (header === "Lead") getDataForOpen(getleads);
    // if (currentActiveTab === "self") {
    // const { id } = stoageGetter("user");
    // dispatch(actions.fetchAllLeads(id, 'all', 1));
    // getDataForOpen('all')
    // }
    // }
  }, []);

  useEffect(() => {
    try {
      axiosRequest.get(`user/v2/getleads_team_count/${userId}?requiredData=self`, { secure: true }).then((item) => {
        let tempData = item.data;
        count.push(tempData?.all_lead, tempData?.today, tempData?.open_lead, tempData?.discarded_lead, tempData?.converted, tempData?.failed);
        dispatch(actions.addAllTeamCount([tempData?.all_lead, tempData?.today, tempData?.open_lead, tempData?.discarded_lead, tempData?.converted, tempData?.failed]));
      });
    } catch (error) {
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
    }
  }, []);

  // const ids = stoageGetter('user')

  // ************************Api *********************

  const getDataForOpen = async (leadInc) => {
    // let leadtyp = leadInc;
    console.log("Clicked Tabs", leadInc);
    const { id } = stoageGetter("user");
    const teamId = stoageGetter("teamMemberId");

    if (leadsData.globalTab === "self") {
      dispatch(actions.fetchAllLeads(id, leadInc, 1));
    }
    // else {
    //  // const teamId = stoageGetter("teamMemberId");
    //   dispatch(actions.fetchAllLeads(id, '', 1));
    // }

    if (leadsData.globalTab === "team") {
      dispatch(actions.fetchAllLeads(teamId, leadInc, 1));
    }

    // const response = await getOpenTabApi(id, leadInc);
    // if (response?.data?.statusCode == -1) {
    //   if (response?.data?.data) {
    //   dispatch(
    //       actions.fetchAllLeadsSuccess(
    //         response?.data?.data[0],
    //    response?.data?.data[1][0]?.count

    //       )
    // );
    //   }
    // } else {
    //   dispatch(actions.fetchAllLeadsSuccess([], 0));
    //   throw response?.data?.data;
    // }
  };

  const switchteamself = async (leadInc, event) => {
    // let leadtyp = leadInc;

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
      dispatch(actions.fetchAllLeads(teamId, "", 1));
    }
  };

  // const getAlldataofTeamMainTab = async () => {
  //   const response = await getTeamMainTabApi();
  //   if (response?.data?.statusCode == -1) {
  //     if (response?.data?.data) {
  //       // setAllData(response?.data?.data[0])
  //       dispatch(
  //         actions.fetchAllLeadsSuccess(
  //           response?.data?.data[0],
  //           response?.data?.data[1][0]?.count
  //         )
  //       );
  //     }
  //   } else {
  //     dispatch(actions.fetchAllLeadsSuccess([], 0));
  //     throw response?.data?.data;
  //     // dispatch(fetchAllLeadsFail(error))
  //   }
  //   // const response2 = await getFirstDropdownValueApi()
  //   // const response3 = await getSecondDropdownValueApi()
  //   // const response4 = await getFormByIdApi("")
  // };

  const handleChangeTab = (currentTab) => {
    _currentTab = currentTab;
    setCurrentActiveTab(currentTab);
    switchteamself(getleads, currentTab);

    dispatch(actions.updateTabOfDashboard(currentTab));

    // if (currentTab === "team") getDataForOpen();
    currentTab !== currentActiveTab && dispatch(actions.updateAllocateOfOpportunities(false));
  };

  // -****************************************

  const handler = (activeKey) => {
    setactiveTab(activeKey);
    dispatch({ type: "CURRENT_UPDATING_TAB", action: activeKey });

    // setactiveKey(key)
    if (activeKey) {
      switch (activeKey) {
        case "all": {
          getDataForOpen("all");
          return history.push("/leadMaster/all_leads");
        }
        case "fortoday": {
          getDataForOpen("fortoday");
          return history.push("/leadMaster/fortoday");
        }
        case "open": {
          getDataForOpen("open");
          return history.push("/leadMaster/openlead");
        }

        case "discarded": {
          getDataForOpen("discarded");
          return history.push("/leadMaster/discardedlead");
        }

        case "converted": {
          getDataForOpen("converted");
          return history.push("/leadMaster/convertedleads");
        }
        case "failed": {
          getDataForOpen("failed");
          return history.push("/leadMaster/pendingproposal");
        }

        case "1":
          return history.push("/leadmasterpage/statuslead");
        // case '2':
        //   return history.push('/leadmasterpage/leaddetails/personallead')
        // case '3':
        //   return history.push('/leadmasterpage/proposal')
        // case '4':
        //   return history.push('/leadmasterpage/leadmasterdoc/leaddoc')
        case "3":
          return history.push("/leadmasterpage/leadhistory");
        case "2":
          if (_leadID !== "") {
            return history.push("/leadmasterpage/leaddetails/personallead");
          } else {
            message.warning("Please create the Lead to move forward ");

            return;
          }

        case "calendar":
          return history.push("/calendar");

        case "todo":
          return history.push("/todo");

        case "advisorpitch":
          return history.push("/masterpresales/advisordetail/advisorpitch");

        case "customerpitch":
          return history.push("/masterpresales/customerdetails/salespitch");

        case "allrenewals":
          return history.push("/renewalMaster/allRenewals");
        case "paidrenewals":
          return history.push("/renewalMaster/paidRenewals");
        case "unpaidrenewals":
          return history.push("/renewalMaster/unpaidRenewals");
        case "lapsedrenewals":
          return history.push("/renewalMaster/lapsedRenewals");

        // case "benefitillustrator": return history.push('/master/benefitillustrator');
        // case "proposalfulfilment": return history.push('/master/proposalfulfilment');
        // case "prepaymentreview": return history.push('/master/prepaymentreview');
        // case "paymentoptions": return history.push('/master/paymentoptions');
        // case "uploaddocuments": return history.push('/master/uploaddocuments');
        // case "proposalhistory": return history.push('/master/proposalhistory');
        default:
          return history.push("/home");
      }
    }
  };

  let tabPane = [];
  // if (tabMenu && !_.isEmpty(tabMenu)) {
  //   tabPane = _.map(tabMenu, (value, id) => {
  //     return <TabPane key={value.id} tab={value.value}></TabPane>;
  //   });
  // }

  if (tabMenu && !_?.isEmpty(tabMenu)) {
    tabPane = _?.map(tabMenu, (value, id) => {
      return (
        <TabPane
          key={value.id}
          //tab={value.value + " " +  "[" + count[id] + "]"}
          tab={
            value.value +
            " " +
            (location.pathname === "/leadMaster/all_leads" ||
            location.pathname === "/leadMaster/fortoday" ||
            location.pathname === "/leadMaster/openlead" ||
            location.pathname === "/leadMaster/discardedlead" ||
            location.pathname === "/leadMaster/convertedleads" ||
            location.pathname === "/leadMaster/pendingproposal"
              ? currentActiveTab === "team"
                ? `(${count1[id] === undefined || count1[id] === null ? "0" : count1[id]})`
                : `(${count[id] === undefined ? "0" : count[id]})`
              : "")
          }
        ></TabPane>
      );
    });
  }

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);
  // useEffect(() => {
  //   handler(activeKey);
  //   console.log("Handler is runnign", activeKey);
  // }, [activeKey]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <p className="all_tabss">0</p> */}
      {/* {activeTab === 'open' ? <p className="all_tabss_open">{totalLeads}</p> : null} */}

      {width > breakpoint ? (
        <div className="header-img-tabs tabsStyle">
          <div>
            <div>
              <p className="header-title-tab">{header}</p>
            </div>

            <div>
              <Tabs
                tabBarGutter={20}
                centered={false}
                onTabClick={handler}
                size="default"
                activeKey={
                  location.pathname === "/leadMaster/all_leads"
                    ? "all"
                    : location.pathname === "/leadMaster/fortoday"
                    ? "fortoday"
                    : location.pathname === "/leadMaster/openlead"
                    ? "open"
                    : location.pathname === "/leadMaster/discardedlead"
                    ? "discarded"
                    : location.pathname === "/leadMaster/convertedleads"
                    ? "converted"
                    : location.pathname === "/leadMaster/pendingproposal"
                    ? "failed"
                    : activeKey
                }
                className="main-lead-tabs"
                // style={{ marginLeft: "40px", }}
              >
                {tabPane}
              </Tabs>
            </div>
          </div>

          {/* <div style={{ display: "flex" }}>
            {tabPane.key === activeKey ? (
              <div className="round-card-main-Tab">
                {checkAgent() === false && (
                  <>
                    <div className="round-card-main-Tab">
                      {currentActiveTab === "self" && allocateBtnStatus || roleName === "Agent" ? (
                        ""
                      ) : (
                        <>
                          <figure
                            className={
                              currentActiveTab === "team"
                                ? "round-cards1-active"
                                : "round-cards1"
                            }
                            onClick={() => handleChangeTab("team")}
                            key={"team"}
                          >
                            {" "}
                            <figcaption className="card-caption">
                              Team
                            </figcaption>{" "}
                          </figure>
                        </>
                      )}
                    </div>

                    <div className="round-card-main-Tab">
                      {currentActiveTab === "team" && allocateBtnStatus || roleName === "Agent" ? (
                        ""
                      ) : (
                        <figure
                          className={
                            currentActiveTab === "self"
                              ? "round-cards2-active"
                              : "round-cards2"
                          }
                          onClick={() => handleChangeTab("self")}
                          key={"self"}
                        >
                          {" "}
                          <figcaption className="card-caption">
                            Self
                          </figcaption>{" "}
                        </figure>
                      )}
                    </div>

                    <AllocateModalShow />
                  </>
                )}
                <GlobalFilters
                  show={show}
                  onHide={handleClose}
                  handleShow={handleShow}
                  setShow={setShow}
                />
              </div>
            ) : null}
          </div> */}
        </div>
      ) : (
        // FOR MOBILE WEB
        <div className="tabsStyle" style={{ display: "flex", flexDirection: "Column" }}>
          <div>
            <p className="header-title-tab">{header}</p>
          </div>
          <div>
            <Tabs
              tabBarGutter={20}
              centered={false}
              onTabClick={handler}
              size="small"
              activeKey={
                location.pathname === "/leadMaster/all_leads"
                  ? "all"
                  : location.pathname === "/leadMaster/fortoday"
                  ? "fortoday"
                  : location.pathname === "/leadMaster/openlead"
                  ? "open"
                  : location.pathname === "/leadMaster/discardedlead"
                  ? "discarded"
                  : location.pathname === "/leadMaster/convertedleads"
                  ? "converted"
                  : location.pathname === "/leadMaster/pendingproposal"
                  ? "failed"
                  : activeKey
              }
              style={{
                backgroundColor: "#red",
                boxShadow: "0px 1px 10px 0px #0000003d",
              }}
            >
              {tabPane}
            </Tabs>
          </div>
          {header === "Leads" && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px",
              }}
            >
              {/* {checkAgent() === false && (
                <>
                {currentActiveTab === "team" && allocateBtnStatus || roleName === "Agent" ? "" : <>
                <button
                    onClick={() => handleChangeTab("self")}
                    key={"self"}
                    className={
                      currentActiveTab === "self"
                        ? "active_tabs_button"
                        : "tabs_button"
                    }
                  >
                    <img
                      src={
                        currentActiveTab === "self"
                          ? person_white
                          : person_black
                      }
                      className="person"
                      alt="person_png"
                    />{" "}
                    Self
                  </button>
                </>}

                {currentActiveTab === "self" && allocateBtnStatus || roleName === "Agent" ? "" : <>
                <button
                    onClick={() => handleChangeTab("team")}
                    key={"team"}
                    className={
                      currentActiveTab === "team"
                        ? "active_tabs_button"
                        : "tabs_button"
                    }
                  >
                    <img
                      src={
                        currentActiveTab === "team" ? group_white : group_black
                      }
                      className="group"
                      alt="person_png"
                    />{" "}
                    Team
                  </button>
                </>}

                  <AllocateModalShow />
                </>
              )}
              <GlobalFilters
                show={show}
                onHide={handleClose}
                handleShow={handleShow}
                setShow={setShow}
              /> */}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Tab;
