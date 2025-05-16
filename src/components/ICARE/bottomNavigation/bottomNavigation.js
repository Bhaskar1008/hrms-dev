import React from "react";
import "./BottomNavigation.css";
import icon1 from "../../../assets/ihc_icon/homeicon.png";
import icon2 from "../../../assets/ihc_icon/performanceicon.png";
import icon3 from "../../../assets/ihc_icon/policy.png";
import icon4 from "../../../assets/ihc_icon/group.png";
import icon5 from "../../../assets/ihc_icon/school.png";




import perfor from "../../../images/Icon/nav-icon11.svg";
import customer from "../../../images/Icon/nav-icon3.svg";
import sales from "../../../images/Icon/nav-icon21.svg";
import resource from "../../../images/Icon/nav-icon4.svg";
import calender from "../../../images/Icon/event.svg";
import sales_guide from "../../../images/Icon/book_4.svg";
import business from "../../../images/Icon/business.svg";
import { useLocation, useHistory } from "react-router-dom";
import { checkAgent, stoageGetter, stoageSetter } from "../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions/leads";

const BottomNavigation = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const leadsData = useSelector((state) => state.leads);
  const leadmangesment = () => {
    // getDataForOpen("all");
    history.push("/performanceDasboard");
  };
  const quotationOrPolicy = () => {
    history.push("/QuotationsPoliciesMaster/all_leads");
  }
  const homePageOnchange = () => {
    history.push("/iCare-Dashboard");
  };
  const PerformancePage = () => {
    history.push("/daily-bussienss");
  };
  const resourceCenterPage = () => {
    history.push("/masterpresales/customerdetails/salespitch");
  };

  const calendarOnChange = () => {
    history.push("/calendar");
  };

  const getDataForOpen = async (leadInc) => {
    const { id } = stoageGetter("user");
    const teamId = stoageGetter("teamMemberId");
    console.log("Id and teamid is --->>", id, teamId);
    console.log("GlobalTab  --->>", leadsData.globalTab);
    if (leadsData.globalTab === "self") {
      stoageSetter("teamMemberId", null);
      dispatch(actions.fetchAllLeads(id, leadInc, 1));
    }

    if (leadsData.globalTab === "team") {
      dispatch(actions.fetchAllLeads(teamId, leadInc, 1));
    }
  };

  const customerPage = () => {
    history.push("/customer-details");
  };
  return (
    <>
      <div className="bottom-navigation1">
        <div className="nav-container1">
          <a className={"nav-link4 " + (location.pathname === "/iCare-Dashboard" && "nav-link-active1")} onClick={homePageOnchange}>
            <img className="nav-icon5" alt="" src={icon1} />

            <div className="link-name7">HOME</div>
          </a>
          <a className={"nav-link4 " + (location.pathname === "/performanceDasboard" && "nav-link-active1")} onClick={leadmangesment}>
            <img className="nav-icon5" alt="" src={icon2} />

            <div className="link-name7">PERMORMANCE</div>
          </a>

          <a className={"nav-link4 " + (location.pathname === "/QuotationsPoliciesMaster/all_leads" && "nav-link-active1")} onClick={quotationOrPolicy}>
            <img className="nav-icon5" alt="" src={business} />

            <div className="link-name7">QUOTATIONS/POLICIES</div>
          </a>

          <a className={"nav-link4 " + (location.pathname === "/performance" && "nav-link-active1")} onClick={PerformancePage}>
            <img className="nav-icon5" alt="" src={icon3} />

            <div className="link-name7">DAILY BUSINESS</div>
          </a>
          <a className={`${location.pathname === "/calendar" ? "nav-link-active1" : "nav-link4"}`} onClick={calendarOnChange}>
            <img className="nav-icon5" alt="" src={icon4} />
            <div className="link-name7">CUSTOMERS</div>
          </a>

          <a className={"nav-link4 " + (location.pathname === "/learningcenter" && "nav-link-active1")} onClick={resourceCenterPage}>
            <img className="nav-icon5" alt="" src={icon5} />
            <div className="link-name7">LEARNING CENTER</div>
          </a>
        </div>
      </div>
    </>
  );
};

export default BottomNavigation;
