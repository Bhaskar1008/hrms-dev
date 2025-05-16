
import React, { useState, useEffect } from "react";
import { Button, Tabs, message } from "antd";
import "./Tab.css";
import _ from "lodash";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/QuotationsPolicies";
// import { checkAgent, stoageGetter } from "../../helpers";
import { checkAgent, stoageGetter } from "../../helpers";
import GlobalFilters from "./Filter";
import AllocateModalShow from "./Allocate";
import person_black from "./../Activitity Tracker/icons/person_black.png";
import person_white from "./../Activitity Tracker/icons/person_white.png";
import group_white from "./../Activitity Tracker/icons/group_white.png";
import group_black from "./../Activitity Tracker/icons/group_black.png";
import { useLocation } from "react-router-dom";
import axiosRequest from "../../axios-request/request.methods";
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import { HistoryOutlined } from "@ant-design/icons";
import { BsCursor } from "react-icons/bs";
// import 'bootstrap/dist/css/bootstrap.min.css';

// api's

const { TabPane } = Tabs;

const Tab = ({
  tabMenu,
  header,
  activeKey,
  currentActiveTabKey
 
}) => {
  const currentLocation = useLocation();
console.log("tab menu",tabMenu)
  const dispatch = useDispatch();
  const { leadType } = useParams();
  const { masterType } = useParams();
  const [activeTab, setactiveTab] = useState();
  const [showTab, setShowTab] = useState();
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState([]);
  const [count2, setCount2] = useState([]);
  const [loader, setloader] = useState([]);
  const location = useLocation();

  let history = useHistory();
  let _currentTab = "self";
  // const [activeKey, setActiveKey] = useState("self")
  const [currentActiveTab, setCurrentActiveTab] = useState("self");
  const [isDisabled, setIsDisabled] = useState(false);
  const allocateBtnStatus = useSelector(
    (state) => state?.quotationsPolicies?.allocateTab
  );
  const leadsData = useSelector((state) => state.quotationsPolicies);

  var count1 = useSelector((state) => state?.quotationsPolicies?.countArr);

  const policyCount = useSelector((state) => state?.quotationsPolicies?.countQP);
  const quatationCount = useSelector((state) => state?.quotationsPolicies?.countQ);

  console.log(policyCount,quatationCount,"quotationsPolicies")
  const userId = useSelector((state) => state?.login?.userId);
  //const userId1 = useSelector((state) => state?.login?.user?.designation);
  const getleads = useSelector(
    (state) => state.quotationsPolicies.currentActiveTab
  );
  console.log("getleads", getleads);
  let _leadID = useSelector(
    (state) => state.quotationsPolicies.currentUpdatingID
  );
  var roleName = useSelector(
    (state) => state?.login?.user?.userRole[0]?.roleName
  );

  useEffect(() => {
    try {
      axiosRequest.get(`user/getApplicationCount/${userId}`,{ secure: true }).then((item) =>
     {
      console.log("item- for quotation->",item.data)
      let tempData = item.data  
      count?.push(
          tempData?.quotationCount ,
          // tempData?.provisionalPolicyCount,
          // tempData?.unpaidPolicyCount ,
          // tempData?.activePolicyCount,
          tempData?.totalPoliciesCount,
        )}
      );
      // console.log("requiredData", res.data[0]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    dispatch({ type: "CURRENT_UPDATING_TAB", action: "Quotation" });

    if (header === "Quotations/Policies") getDataForOpen("Quotation");
  }, []);
  // const ids = stoageGetter('user')

  // ************************Api *********************

  const getDataForOpen = async (leadInc) => {
    // let leadtyp = leadInc;
    setloader(true);
    const { id } = stoageGetter("user");
    const teamId = stoageGetter("teamMemberId");

    if (leadsData.globalTab === "self") {
      if (leadInc === "policies") {
        // dispatch(actions.fetchQuotationsPolicies(id, leadInc, 1));
        dispatch(actions.fetchQuotationsPolicies(id, 1, result => {
          if(result.statusCode === -1){
            setloader(false)
          }else{
            setloader(false)
          }
        }));
      }else if (leadInc === "Quotation") {
        
          dispatch(actions.fetchAllApplictaionQuotations(id, 1, result => {
            if(result.statusCode === -1){
              setloader(false)
            }else{
              setloader(false)
            }
          })
        );
      } else if (leadInc === "Quotation") {
        dispatch(
          actions.fetchAllApplictaionQuotations(id, 1, (result) => {
            if (result.statusCode === -1) {
              setloader(false);
            } else {
              setloader(false);
            }
          })
        );
      } else {
        setloader(false);
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
    console.log(activeKey,"currentActiveTab")
    setactiveTab(activeKey);

    dispatch({ type: "CURRENT_UPDATING_TAB", action: activeKey });

    // setactiveKey(key)
    if (activeKey) {
      switch (activeKey) {
        // case "all": {
        //   getDataForOpen("all");
        //   return history.push("/quotationsPoliciesMaster/all");
        // }
        case "policies": {
          getDataForOpen("policies");
          return history.push("/quotationsPoliciesMaster/policies");
        }
        case "Policies": {
          getDataForOpen("activepolicy");
          return history.push("/customer-listing");
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

        default:
          return history.push("/iCare-Dashboard");
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
            (location.pathname === "/quotationsPoliciesMaster/Quotation" || location.pathname === "/quotationsPoliciesMaster/policies" 
              ? `(${count[id] === undefined ? "0" : count[id]})`
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

  // redirect to builk upload history
  const handleBulkIssuance = () => {
    history.push("/bulk-issuance-history");
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <FullPageLoader fromapploader={loader}></FullPageLoader>
      {/* <p className="all_tabss">0</p> */}
      {/* {activeTab === 'unpaidpolicy' ? <p className="all_tabss_open">{totalLeads}</p> : null} */}
      
      {width > breakpoint ? (
        <div className="header-img-tabs tabsStyle">
          <div className="w-100">
            <div className="header_title_tab_wrapper_desktop" 
                >
              <p className="header-title-tab m-0">{header}</p>
              <Button
                className="bulk_issuance_history_btn"
                type="defoult"
                size="large"
                onClick={handleBulkIssuance}
              >
                <HistoryOutlined style={{ fontSize: 18, color: "#1D428A" }} />
                Bulk Issuance History
              </Button>
            </div>

            <div>
            <h3 className="header-subtitle-tab">{}</h3>
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

          <div style={{ display: "flex"}}>
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
                <GlobalFilters
                  show={show}
                  onHide={handleClose}
                  handleShow={handleShow}
                  setShow={setShow}
                  currentActiveTabKey={activeTab}
                />
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
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <p className="header-title-tab m-0">{header}</p>
            <Button
              onClick={handleBulkIssuance}
              className="bulk_issuance_history_btn"
              type="defoult"
              size="large"
            >
              <HistoryOutlined style={{ fontSize: 18, color: "#1D428A" }} />
              Bulk Issuance History
            </Button>
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
          <div style={{ display: "flex" ,position: "relative"}}>
            {tabPane.key === activeKey ? (
              <div className="round-card-main-Tab">
                {checkAgent() === false && (
                  <>
                    <AllocateModalShow />
                  </>
                )}
                <GlobalFilters
                  show={show}
                  onHide={handleClose}
                  handleShow={handleShow}
                  setShow={setShow}
                  currentActiveTabKey={activeTab}
                />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default Tab;
