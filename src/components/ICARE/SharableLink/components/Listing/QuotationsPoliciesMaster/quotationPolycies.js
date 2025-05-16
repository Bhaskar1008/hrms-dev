import React, { useEffect, useState } from "react";
import "./index.css";
import Tab from "../../Tab/Tab";
import QuotationsPoliciesCards from "../card/QuotationsPoliciesCards";
import * as actions from "../../../../../../store/actions/index";
import FloatButton from "../../../../../FloatButton/FloatButton";
import { Pagination, } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { stoageGetter } from "../../../../../../helpers";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import BottomNavigation from "../../../../bottomNavigation/bottomNavigation"
import OonaFooter from "../../../../OonaFooter/OonaFooter";
import OnlyQuotationCards from "../card/OnlyQuotationCards";

import FullPageLoader from "../../../../../FullPageLoader/FullPageLoader";
import { result } from "lodash";

const QuotationsPoliciesMaster = (props) => {
  const [notification, setNotification] = useState(true);
  //Set current page no of the page
  const [current, setcurrent] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const pageSize = 14;
  const [loader, setLoader] = useState(false)


  const leadsDataTab = useSelector((state) => state.CustomerquotationsPolicies.globalTab);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;
  const getleads = useSelector((state) => state?.CustomerquotationsPolicies?.currentActiveTab);

  useEffect(() => {
    const { id } = stoageGetter("user");
    // const teamId = stoageGetter("teamMemberId");

    if (leadsDataTab === 'self') {

      if (location.pathname === "/customer-listing") {
        setLoader(true)
        dispatch(actions.fetchAllApplictaionQuotationsCustomer(id, current, pageSize,
          result => {

            if (result.statusCode === -1) {
              setLoader(false)
            } else {
              setLoader(false)
            }
          }))
        setLoader(false)
        console.log("appappilcation----", id, current, pageSize);
      } else {
        // setLoader(false)
        dispatch(actions.fetchQuotationsPoliciesCustomer(id, getleads, current, pageSize,
          result => {
            if (result.statusCode === -1) {
              setLoader(false)
            } else {
              setLoader(false)
            }
          }
        ));
        console.log("getLead----", id, getleads, current, pageSize);
      }

    }
    // if(leadsDataTab === 'team'){
    //   dispatch(actions.fetchQuotationsPolicies(teamId, getleads, current));
    // }

    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [dispatch, current]);

  useEffect(() => setcurrent(1), [getleads, leadsDataTab]);

  const test = useSelector((state) => state);
  console.log("test==>", test)
  //  const leadsData = useSelector((state) => state?.quotationsPolicies?.allQuotationsPolicies);
  // const leadsData1 = useSelector((state) => state?.quotationsPolicies?.allapplicationQuotations

  const leadsData = useSelector((state) => state?.CustomerquotationsPolicies?.allQuotationsPolicies);
  console.log("hey==>", leadsData)
  const leadsData1 = useSelector((state) => state?.CustomerquotationsPolicies?.allapplicationQuotations
  );
  console.log("lead1", leadsData1)
  const leadDataLoading = useSelector(
    (state) => state?.CustomerquotationsPolicies?.fetch_allLeads_Loading
  );

  // lead count of the page
  const totalLeads = useSelector((state) => {
    return state?.CustomerquotationsPolicies?.countQP;
  });

  // only quation
  const totalLeadsQuotaion = useSelector((state) => {
    return state?.CustomerquotationsPolicies?.countQ;
  });

  //Pagination numbers function
  function itemRender(cur, type, originalElement) {
    console.log("policy page number", type, originalElement);
    const onPrev = () => {
      setcurrent(current - 1);
    };
    const onNext = () => {
      setcurrent(current + 1);
    };

    if (type === "prev") {
      return (
        <a current={current} onClick={onPrev} style={{ color: "#1D428A" }}>
          Prev
        </a>
      );
    }
    if (type === "next") {

      return (
        <a current={current} onClick={onNext} style={{ color: "#1D428A" }}>
          Next
        </a>
      );
    }
    return originalElement;
  }

  const handlePageClick = (page) => {
    setcurrent(page);
  };

  const tabMenu = [

    {
      id: "Quotation",
      value: "Quotation",
    },


    {
      id: "Policies",
      value: "Policies",
    },

  ];

  return (
    <>
      {/* <FullPageLoader fromapploader={loader} /> */}
      {/* <FloatButton /> */}

      <div className="main-containerListing" style={{ backgroundColor: "rgb(241 238 238)" }}>
        <Tab tabMenu={tabMenu} header="Welcome" current={current} />

        {location.pathname === "/customer-listing" ? <>
          <OnlyQuotationCards leads={leadsData1} leadDataLoading={leadDataLoading} />
          {leadsData1.length && leadsData1 ? (
            <div className="page-holder Pagination-Mapbranch" style={{ marginBottom: '2rem', }}>
              {totalLeadsQuotaion >= 14 ? (

                <Pagination
                  responsive
                  current={current}
                  onChange={handlePageClick}
                  total={totalLeadsQuotaion}
                  defaultPageSize={14}
                  itemRender={itemRender}
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </> : <>
          <QuotationsPoliciesCards leads={leadsData} leadDataLoading={leadDataLoading} />

          {leadsData.length && leadsData ? (

            <div className="page-holder Pagination-Mapbranch" style={{ marginBottom: '2rem', }}>
              {totalLeads >= 14 ? (
                <Pagination
                  responsive
                  current={current}
                  onChange={handlePageClick}
                  total={totalLeads}
                  defaultPageSize={14}
                  itemRender={itemRender}
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </>}

      </div>
      {/* <div className="bottom-mmm"> */}
      {/* <BottomNavigation /> */}
      {/* <OonaFooter /> */}
      {/* </div> */}
    </>
  );
};

export default QuotationsPoliciesMaster;
