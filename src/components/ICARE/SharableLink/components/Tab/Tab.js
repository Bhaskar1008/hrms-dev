import React, { useState, useEffect } from "react";
import { Tabs, message } from "antd";
import "./Tab.css";
import _ from "lodash";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../../../../store/actions/CustomerQuotationsPolicies";
// import { checkAgent, stoageGetter } from "../../helpers";
import { checkAgent, stoageGetter } from "../../../../../helpers";
// import GlobalFilters from "./Filter";
import AllocateModalShow from "./Allocate";
// import person_black from "./../Activitity Tracker/icons/person_black.png";
// import person_white from "./../Activitity Tracker/icons/person_white.png";
// import group_white from "./../Activitity Tracker/icons/group_white.png";
// import group_black from "./../Activitity Tracker/icons/group_black.png";
import { useLocation } from "react-router-dom";

import axiosRequest from "../../../../../axios-request/request.methods";
import FullPageLoader from "../../../../FullPageLoader/FullPageLoader";
// import 'bootstrap/dist/css/bootstrap.min.css';

// api's

const { TabPane } = Tabs;

const Tab = ({
  tabMenu,
  header,
  activeKey,

}) => {
  const currentLocation = useLocation();

  const dispatch = useDispatch();
  const { leadType } = useParams();
  const { masterType } = useParams();
  const [activeTab, setactiveTab] = useState();
  const [showTab, setShowTab] = useState();
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState([]);
  const [count2, setCount2] = useState([]);
  const [loader, setloader] = useState([])
  const location = useLocation();

  let history = useHistory();
  let _currentTab = "self";
  // const [activeKey, setActiveKey] = useState("self")
  const [currentActiveTab, setCurrentActiveTab] = useState("self");
  const [isDisabled, setIsDisabled] = useState(false);
  const allocateBtnStatus = useSelector((state) => state?.quotationsPolicies?.allocateTab);
  const leadsData = useSelector((state) => state.quotationsPolicies);

  var count1 = useSelector((state) => state?.quotationsPolicies?.countArr);

  //const count_data = useSelector((state) => state?.quotationsPolicies?.countArrSe);

  const userId = useSelector((state) => state?.login?.userId);
  //const userId1 = useSelector((state) => state?.login?.user?.designation);
  const getleads = useSelector((state) => state.quotationsPolicies.currentActiveTab);
  console.log("getleads", getleads);
  let _leadID = useSelector((state) => state.quotationsPolicies.currentUpdatingID);
  var roleName = useSelector(
    (state) => state?.login?.user?.userRole[0]?.roleName
  );

  useEffect(() => {
    try {
      axiosRequest.get(`user/getApplicationCount/${userId}`, { secure: true }).then((item) => {
        console.log("item- for quotation->", item.data)
        let tempData = item.data
        count?.push(
          tempData?.quotationCount,
          tempData?.provisionalPolicyCount,
          tempData?.unpaidPolicyCount,
          tempData?.activePolicyCount,
          // tempData?.converted,
          // tempData?.failed
        )
      }
      );
      // console.log("requiredData", res.data[0]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    dispatch({ type: "CURRENT_UPDATING_TAB", action: "Quotation" });

    if (header === "Quotations/Policies") getDataForOpen("Quotation")
  }, []);
  // const ids = stoageGetter('user')

  // ************************Api *********************

  const getDataForOpen = async (leadInc) => {
    // let leadtyp = leadInc;
    setloader(true)
    const { id } = stoageGetter("user");
    const teamId = stoageGetter("teamMemberId");

    if (leadsData.globalTab === "self") {
      // if (leadInc === "activepolicy" || leadInc === "provisionalpolicy" || leadInc === "unpaid" || leadInc === "Policies") {
      if (leadInc === "Policies") {
        // dispatch(actions.fetchQuotationsPolicies(id, leadInc, 1));
        dispatch(actions.fetchQuotationsPoliciesCustomer(id, leadInc, 1, result => {
          if (result.statusCode === -1) {
            setloader(false)
          } else {
            setloader(false)
          }
        }));
      } else if (leadInc === "Quotation") {
        dispatch(actions.fetchAllApplictaionQuotationsCustomer(id, 1, result => {
          if (result.statusCode === -1) {
            setloader(false)
          } else {
            setloader(false)
          }
        }));
      } else {
        setloader(false)
      }

      //   if (leadInc === "riskInspection") {
      //     console.log("api not found ");
      // }
    }

    // if (leadsData.globalTab === "team") {
    //   dispatch(actions.fetchQuotationsPolicies(teamId, leadInc, 1 ));
    // }

  };

  // const switchteamself = async (leadInc, event) => {
  //   // let leadtyp = leadInc;
  //   // count1 = 0
  //   setloader(true)
  //   let item={all_lead : '0',today : '0',open_lead : '0',discarded_lead : '0', converted :'0', failed : '0',}
  //   let count = []
  //   count.push(item?.all_lead, item?.today, item?.open_lead, item?.discarded_lead, item?.converted, item?.failed)

  //     // countT.push()
  //     //if (leadsData?.globalTab === 'team') {
  //   dispatch(actions.addAllTeamCount(count))
  //   const { id } = stoageGetter("user",);
  //   const teamId = stoageGetter("teamMemberId");

  //   if (event === "self") {
  //     if (leadInc === "activepolicy" || leadInc === "provisionalpolicy") {
  //       dispatch(actions.fetchQuotationsPolicies(id, leadInc, 1, result => {
  //         console.log("After API HIT",result)
  //         if(result.statusCode === -1){
  //           setloader(false)
  //         }else{
  //           setloader(false)
  //         }
  //       }));
  //     }else if (leadInc === "Quotation") {
  //         dispatch(actions.fetchAllApplictaionQuotations(id, 1 ));
  //     }else{
  //       setloader(false)
  //     }
  //   //   if (leadInc === "riskInspection") {
  //   //     console.log("api not found ");
  //   // }

  //     // if (leadInc === "activepolicy" || leadInc === "unpaidpolicy" || leadInc === "provisionalpolicy") {
  //     //   dispatch(actions.fetchQuotationsPolicies(id, leadInc, 1));
  //     // } else if (leadInc === "Quotation") {
  //     //   dispatch(actions.fetchAllApplictaionQuotations(id, leadInc, 1));
  //     // }else{
  //     //   //
  //     // }

  //   }

  //   if (event === "team") {
  //     dispatch(actions.fetchQuotationsPolicies(teamId, "", 1));
  //   }
  // };


  const handleChangeTab = (currentTab) => {
    _currentTab = currentTab;
    setCurrentActiveTab(currentTab);
    // switchteamself(getleads, currentTab);

    dispatch(actions.updateTabOfDashboard(currentTab));

    // if (currentTab === "team") getDataForOpen();
    currentTab !== currentActiveTab &&
      dispatch(actions.updateAllocateOfOpportunities(false));
  };

  // -****************************************

  const handler = (activeKey) => {
    setactiveTab(activeKey);

    dispatch({ type: "CURRENT_UPDATING_TAB", action: activeKey });

    // setactiveKey(key)
    if (activeKey) {
      switch (activeKey) {
        // case "all": {
        //   getDataForOpen("all");
        //   return history.push("/quotationsPoliciesMaster/all");
        // }
        case "activepolicy": {
          getDataForOpen("activepolicy");
          return history.push("/quotationsPoliciesMaster/activepolicy");
        }
        case "Policies": {
          getDataForOpen("activepolicy");
          return history.push("/customer-listing");
        }

        case "unpaid": {
          getDataForOpen("unpaid");
          return history.push("/quotationsPoliciesMaster/unpaid");
        }

        case "provisionalpolicy": {
          getDataForOpen("provisionalpolicy");
          return history.push("/quotationsPoliciesMaster/provisionalpolicy");
        }

        case "Quotation": {
          getDataForOpen("Quotation");
          return history.push("/quotationsPoliciesMaster/Quotation");
        }

        // case "riskInspection": {
        //   getDataForOpen("riskInspection");
        //   return history.push("/quotationsPoliciesMaster/riskInspection");
        // }

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
          // tab={value.value}
          tab={
            value.value +
            " " +
            (location.pathname === "/quotationsPoliciesMaster/Quotation" ||
              location.pathname === "/quotationsPoliciesMaster/provisionalpolicy" ||
              location.pathname === "/quotationsPoliciesMaster/unpaid" ||
              location.pathname === "/quotationsPoliciesMaster/activepolicy"
              ? currentActiveTab === "team"
                ? `(${count1[id] === undefined || count1[id] === null
                  ? "0"
                  : count1[id]
                })`
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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <FullPageLoader fromapploader={loader}></FullPageLoader> */}
      {/* <p className="all_tabss">0</p> */}
      {/* {activeTab === 'unpaidpolicy' ? <p className="all_tabss_open">{totalLeads}</p> : null} */}

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
                activeKey={activeKey}
                className="main-lead-tabs"
              // style={{ marginLeft: "40px", }}
              >
                {tabPane}
              </Tabs>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            {tabPane.key === activeKey ? (
              <div className="round-card-main-Tab">
                {checkAgent() === false && (
                  <>
                    {/* <div className="round-card-main-Tab">
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
                    </div> */}

                    {/* <div className="round-card-main-Tab">
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
                    </div> */}

                    <AllocateModalShow />
                  </>
                )}
                {/* <GlobalFilters
                  show={show}
                  onHide={handleClose}
                  handleShow={handleShow}
                  setShow={setShow}
                /> */}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        // FOR MOBILE WEB
        <div
          className="tabsStyle"
          style={{ display: "flex", flexDirection: "Column" }}
        >
          <div>
            <p className="header-title-tab">{header}</p>
          </div>
          <div>
            <Tabs
              tabBarGutter={20}
              centered={false}
              onTabClick={handler}
              size="small"
              activeKey={activeKey}
              style={{
                backgroundColor: "#red",
                boxShadow: "0px 1px 10px 0px #0000003d",
              }}
            >
              {tabPane}
            </Tabs>
          </div>
          {header === "Lead" && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px",
              }}
            >
              {checkAgent() === false && (
                <>
                  {currentActiveTab === "team" && allocateBtnStatus || roleName === "Agent" ? "" : <>
                    {/* <button
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
                  </button> */}
                  </>}

                  {/* {currentActiveTab === "self" && allocateBtnStatus || roleName === "Agent" ? "" : <>
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
                </>} */}

                  <AllocateModalShow />
                </>
              )}
              {/* <GlobalFilters
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
