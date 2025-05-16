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

const AdvisorMaster = (props) => {
  const [notification, setNotification] = useState(true);
  //Set current page no of the page
  const [current, setcurrent] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();
  const pageSize = 15;

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  useEffect(() => {
    const { id } = stoageGetter("user");
    // dispatch(actions.fetchAllLeads(id,'',current))

    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [dispatch, current, width]);

  //Accessing LeadCard data  from store
  const leadsData = useSelector((state) => state.leads.allLeads);
  //Loading leads data
  const leadDataLoading = useSelector(
    (state) => state.leads.fetch_allLeads_Loading
  );
  // lead count of the page
  const totalLeads = useSelector((state) => {
    return state.leads.count;
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
      id: "active",
      value: "Active",
    },
    {
      id: "inactive",
      value: "Inactive",
    },
  ];


  return (
    <>
      <FloatButton />
      <div style={{ backgroundColor: "#fafafa" }}>
        <Tab
          tabMenu={tabMenu}
          header="Lead"

          // current={current}
        />
        {/* <Button type='primary' className="export-btn">Export</Button>
                <Button className="list-btn" onClick={ ()=> history.push('/list-creation-master') } type='primary'>List Creation</Button> */}
        {/* <Button type='primary' className='dashboard-btn' onClick={ ()=> history.push('/dashboard') }>Dashboard</Button>
                <Button type='primary' className="export-btn">Export</Button>
                <Button className="list-btn" onClick={ ()=> history.push('/list-creation-master') } type='primary'>List Creation</Button> */}
        {/* <div className="export-btn-holder">
            </div> */}
        {tabMenu && tabMenu.id == "all" ? <div className="noti">1</div> : null}
        <LeadCards leads={leadsData} leadDataLoading={leadDataLoading} />
        <div className="page-holder Pagination-Mapbranch">
          <Pagination
            responsive
            current={current}
            onChange={handlePageClick}
            total={totalLeads}
            pageSize={pageSize}
            itemRender={itemRender}
          />
        </div>
        {/* {(breakpoint > width) ? null : <FloatButton />} */}
      </div>
    </>
  );
};

export default AdvisorMaster;
