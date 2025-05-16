import React, { useEffect, useState } from "react";
import "./index.css";
import Tab from "../../components/Tab/Tab";
import LeadCards from "../../components/LeadCards/LeadCards";
import FloatButton from "../../components/FloatButton/FloatButton";
import * as actions from "../../store/actions/index";
import { Pagination, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { stoageGetter } from "../../helpers";
import { useHistory } from "react-router";
import { Tag } from "antd";
import { useLocation } from "react-router-dom";

const LeadMaster = (props) => {
  const [notification, setNotification] = useState(true);
  //Set current page no of the page
  const [current, setcurrent] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const pageSize = 15;

  const leadsDataTab = useSelector((state) => state.leads.globalTab);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;
  const getleads = useSelector((state) => state?.leads?.currentActiveTab);

  useEffect(() => {
    const { id } = stoageGetter("user");
    const teamId = stoageGetter("teamMemberId");
    if (leadsDataTab === "self") {
      console.log("Id stored in stoageGetter is ----->", id);
      dispatch(actions.fetchAllLeads(id, getleads, current));
      console.log("id, getleads, current====> Self", id, getleads, current);
    }
    if (leadsDataTab === "team") {
      console.log("Leads Data tab is ----->", leadsDataTab);
      console.log("id, getleads, current====> Team", teamId, getleads, current);
      dispatch(actions.fetchAllLeads(teamId, getleads, current));
    }

    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [dispatch, current, width]);

  useEffect(() => setcurrent(1), [getleads, leadsDataTab]);
  //Accessing LeadCard data  from store
  const leadsData = useSelector((state) => state?.leads?.allLeads);
  console.log("main lead-data", leadsData);

  const leadDataLoading = useSelector((state) => state?.leads?.fetch_allLeads_Loading);
  // lead count of the page
  const totalLeads = useSelector((state) => {
    return state?.leads?.count;
  });

  //Pagination numbers function
  function itemRender(cur, type, originalElement) {
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
      id: "all",
      value: "All",
    },
    {
      id: "fortoday",
      value: "For Today",
    },
    {
      id: "open",
      value: "Open",
    },
    {
      id: "discarded",
      value: "Discarded",
    },
    {
      id: "converted",
      value: "Converted",
    },
    {
      id: "failed",
      value: "Failed",
    },
  ];

  return (
    <>
      <FloatButton />
      <div className="main-containerListing" style={{ backgroundColor: "rgb(241 238 238)" }}>
        <Tab tabMenu={tabMenu} header="Leads" activeKey={location.pathname === "/leadMaster/fortoday" ? "fortoday" : location.pathname === "/leadMaster/openlead" ? "open" : location.pathname === "/leadMaster/all_leads" ? "all" : getleads} />
        {/* {tabMenu ? <p className="all_tabss">0</p> : null} */}
        <LeadCards leads={leadsData} leadDataLoading={leadDataLoading} />
        {leadsData.length && leadsData ? (
          <div className="page-holder Pagination-Mapbranch" style={{ marginBottom: "2rem" }}>
            {totalLeads >= 15 ? <Pagination responsive current={current} onChange={handlePageClick} total={totalLeads} defaultPageSize={15} itemRender={itemRender} /> : ""}
          </div>
        ) : (
          ""
        )}

        {/* {(breakpoint > width) ? null : <FloatButton />} */}
      </div>
    </>
  );
};

export default LeadMaster;
