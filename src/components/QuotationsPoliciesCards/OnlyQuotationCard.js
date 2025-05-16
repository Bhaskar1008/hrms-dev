import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, Switch, Row, Col, Button } from "antd";
import {
  MoreOutlined, PhoneOutlined, DeleteOutlined,
  MessageOutlined,
  MailOutlined, ReloadOutlined, SyncOutlined
} from "@ant-design/icons";
import "./QuotationsPoliciesCard.css";
import * as actions from "../../store/actions/index";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { drop } from "lodash";
import AllocateModal from "../Tab/Allocate";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { checkuserAccess, stoageGetter } from "../../helpers";
import { updateCheckAllocatedLead } from "../../store/actions/leads";
import img1 from "../../images/Icon/image-54@2x.png";
import img2 from "../../images/Icon/image-55@2x.png";
import img3 from "../../images/Icon/image-56@2x.png";
import mailIcon from "../../assets/leadicon/mail.png";
import phoneIcon from "../../assets/leadicon/phone.png";

const OnlyQuotationCard = React.memo((props) => {
  console.log("Only Quatation PropS========>>>", props)
  const dispatch = useDispatch();
  const allocateBtnStatus = useSelector((state) => state?.leads?.allocateTab);
  const checkedLead = useSelector((state) => state?.leads?.checkedLead);
  const unCheckedLead = useSelector((state) => state?.leads?.unCheckedLead);
  const LeadData = useSelector((state) => state?.newLead?.payloadFormData);

  let user = stoageGetter("user");
  const empId = user.employeeCode;
  const designationName = useSelector((state) => state?.login?.user?.designation?.designatioName);


  const reporting_manager_empId = user?.reportingManager?.employeeCode;
  // console.log("emply_", empId, reporting_manager_empId);

  const history = useHistory();
  const {
    id,
    LOB,
    createdAt,
    policyForVehical,
    firstName,
    middleName,
    lastName,
    expiryDate,
    documentCode,
    documentType,
    quoteType,
    CTPLQuatationDetails,
    MotorQuatationDetails,
    TravelquatationDetails,
    Applicationtype,
    type,
    QuatationnDeatils = LOB === 'CTPL' ? CTPLQuatationDetails : LOB === 'Motor' ? MotorQuatationDetails : TravelquatationDetails,

    // allocatedBy,
    // allocatedTo,
    // appointmentOn,
  } = props;
  console.log("props ====>>12", CTPLQuatationDetails
  )

  const leadsData = useSelector((state) => state.quotationsPolicies);
  // console.log("quotationsPoliciesMaster/policies", leadsData);
  const [chkID, setChkId] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  function checkboxes(data, e) {
    e.target.checked
      ? dispatch(updateCheckAllocatedLead([...checkedLead, data]))
      : dispatch(
        updateCheckAllocatedLead(
          checkedLead?.filter((a) => a.id !== data.id) || []
        )
      );
    setChkId(data.Id);
  }

  useEffect(() => {
    !checkedLead.length && setChkId("");
  }, [checkedLead]);

  const sendEmail = () => {
    if (QuatationnDeatils?.ProductLOB === 'CTPL') {
      window.open(`mailto:${QuatationnDeatils?.fullresponse?.CTPL_CustomerInfo_for_Policy?.email}`);
    } else if (QuatationnDeatils?.ProductLOB === 'Travel') {
      window.open(`mailto:${QuatationnDeatils?.fullresponse?.travel_information?.policyHolder?.emailAddress}`);
    } else {
      window.open(`mailto:${QuatationnDeatils?.fullresponse?.motor_comprehensive?.policyHolder?.emailAddress}`);
    }
  };

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);


  const updateHandler = (id, LOB, Apptype) => {
    // console.log("id-------allQuotation", id);
    // dispatch({ data: data?._id, type: "CURRENT_UPDATING_ID_CUSTOMER" });
    // dispatch(actions.currentUpdatingIdFun(id))
    dispatch({ data: id, type: "CURRENT_UPDATING_FOR_QUOTATION_ID" });
    if (Apptype === 'Q') {
      if (LOB === 'Motor') {
        history.push("/all-motor-details", { leadID: id });
      } else if (LOB === 'Travel') {
        history.push("/all-travel-details", { leadID: id });
      } else {
        history.push("/all-ctpl-details", { leadID: id });
      }
    } else {
      if (LOB === 'Motor') {
        history.push("/all-motor-policy-details", { leadID: id });
      } else if (LOB === 'Travel') {
        history.push("/all-travel-policy-details", { leadID: id });
      } else {
        history.push("/all-ctpl-policy-details", { leadID: id });
      }
    }
  };


  let statusColors = {
    closed: "#D04949",
    open: "#e0cb0d",
    PendingProposals: "#b50e21",
    Converted: "#159e0e",
    statusStyle: "",
    bgColor: "",
  };
  const nameShorter = (str) => {
    try {
      if (str !== "") {
        str = str.toUpperCase();
        let arr = str.split(" ");
        let fLatter = arr[0].charAt(0);
        let sLatter = arr[1].charAt(0);
        // fLatter = fLatter.charAt(0);
        // sLatter = sLatter.charAt(0);
        str = fLatter + sLatter;
      }
      return str;
    } catch (error) {
      // console.log(error);
    }
  };

  const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const checkstatus = (tectnicaldata) => {
    // console.log("Technical Data===>>>",tectnicaldata)
    if (tectnicaldata === undefined || tectnicaldata === null) {
      return 'Active'
    } else if (tectnicaldata?.length === 0) {
      return 'Active'
    } else {
      return 'TC'
    }
  }

  const checkpremium = (premium, LOB) => {
    // console.log("Premium",premium)

    if (LOB === 'Travel') {
      if (premium === null || premium == undefined) {
        return '-'
      } else {
        return premium
      }
    } else if (LOB === 'CTPL') {
      if (premium === null || premium == undefined) {
        return '-'
      } else {
        return premium
      }
    } else {
      if (premium === null || premium == undefined) {
        return '-'
      } else {
        return premium
      }
    }
  }
  // Card for desktop

  let card = (
    <div className="LeadCard-Main-Page-Container" >

      <Card
        key={id}
        loading={props.loading}
        className="customer-card-details1"
      >
        {allocateBtnStatus && (
          <input
            id="checkbox"
            type="checkbox"
            checked={
              chkID &&
              checkedLead.length &&
              checkedLead?.filter((a) => a.id.includes(chkID))
            }
            onChange={(e) => checkboxes(props, e)}
          ></input>
        )}

        <div className='button-and-daat'>
          <div className='date--'>
            <p>{moment(QuatationnDeatils?.createdAt).format('DD/MM/YYYY')}</p>
            {/* {console.log("upadteding ", id)} */}
          </div>
          <div className='newbutton--'>
            <div>{QuatationnDeatils?.ProductLOB}</div>
          </div>

        </div>

        <div className='button-and-profile1'>
          <div className='profile--11'>
            <img src={QuatationnDeatils?.ProductLOB === "CTPL" ? img1 : QuatationnDeatils?.ProductLOB === "Travel" ? img3 : img2} />

            <div className='profilename--'>
              <h3>{QuatationnDeatils?.policyForVehical ? QuatationnDeatils?.policyForVehical : '-'}</h3>
              <div className='child textcapital'>
                <p>{QuatationnDeatils?.firstName + " " + QuatationnDeatils?.lastName}</p>

              </div>

            </div>
          </div>
        </div>
        <hr />

        <div className='button-and-all-details'>
          <div className='profilename--all textcapital'>
            <p>Quote Type</p>
            <h3>{QuatationnDeatils?.quoteType ? QuatationnDeatils?.quoteType : '-'}</h3>
          </div>
          <div className='profilename--all'>
            <p>{QuatationnDeatils?.ProductLOB === 'Travel' ? 'Travel Pack' : 'Document Type'}</p>

            {QuatationnDeatils?.ProductLOB === 'Travel' ?
              <h3>{QuatationnDeatils?.fullresponse?.travel_information?.travelData?.travelPackName ? QuatationnDeatils?.fullresponse?.travel_information?.travelData?.travelPackName : '-'}</h3>
              :
              <h3>{QuatationnDeatils?.documentType ? QuatationnDeatils?.documentType : '-'}</h3>
            }
          </div>
          <div className='profilename--all'>
            <p>{QuatationnDeatils?.ProductLOB === 'Travel' ? 'Travel Product' : 'Document Code'}</p>

            {QuatationnDeatils?.ProductLOB === 'Travel' ?
              <h3>{QuatationnDeatils?.fullresponse?.travel_information?.travelData?.travelProductName ? QuatationnDeatils?.fullresponse?.travel_information?.travelData?.travelProductName : '-'}</h3>
              :
              <h3>{QuatationnDeatils?.documentCode ? QuatationnDeatils?.documentCode : "-"}</h3>
            }
          </div>
        </div>

        <div className='button-and-all-details'>
          <div className='profilename--all'>
            <p>Premium</p>
            <h3>{checkpremium(QuatationnDeatils?.Premium, QuatationnDeatils?.ProductLOB)}</h3>
          </div>
          <div className='profilename--all'>
            <p>Status</p>
            <h3>{checkstatus(QuatationnDeatils?.Status)}</h3>
          </div>
          <div className='profilename--all'>
            <p>Expiry</p>
            <h3>{QuatationnDeatils?.expiryDate ? QuatationnDeatils?.expiryDate : "-"}</h3>
          </div>

        </div>

        {/* {(designationName === "Agent" && QuatationnDeatils?.createdBy === "Staff") ? <div className='button-and-all-details'></div> */}
        {((QuatationnDeatils?.linkShared_To_CustomerBy === "Staff" && QuatationnDeatils?.createdBy === "customer") || QuatationnDeatils?.createdBy === "Staff") ?
          <div className='button-and-all-details'>
            <div className='profilename--all'>
              {QuatationnDeatils?.Applicationtype === 'P' ?
                <p>Policy Number</p>
                : <p>Quotation Number</p>}
              <h3>{QuatationnDeatils?.QuotationNumber ? QuatationnDeatils?.QuotationNumber : '-'}</h3>
              <p style={{ marginLeft: '2rem' }}></p>
            </div>
            <div className='profilename--all'>
              <p>Staff Name</p>
              <h3>{QuatationnDeatils?.staff_orAgnet_firstName ? `${QuatationnDeatils?.staff_orAgnet_firstName} ${QuatationnDeatils?.staff_orAgnet_lastName}` : '-'}</h3>
              <p style={{ marginLeft: '2rem' }}></p>
            </div>

            <div className='profilename--all'>

              {QuatationnDeatils?.Applicationtype === "Q" && QuatationnDeatils?.ProductLOB === "Motor" ?
                <>
                  <p>Risk Inspection Status</p>
                  <h3><div className={`${QuatationnDeatils?.QC_status === "Approved" ? 'RiskInspectionConfirm' : 'RiskInspection1'}`} >
                    <text className="get-status-text">{QuatationnDeatils?.QC_status}</text>
                  </div>
                  </h3>
                </>
                : null
              }


            </div>
            {/* <div className='profilename--all'>
            {" "}
          </div> */}
          </div> : <div className='button-and-all-details'>
            <div className='profilename--all'>
              {QuatationnDeatils?.Applicationtype === 'P' ?
                <p>Policy Number</p>
                : <p>Quotation Number</p>}
              <h3>{QuatationnDeatils?.QuotationNumber ? QuatationnDeatils?.QuotationNumber : '-'}</h3>
              <p style={{ marginLeft: '2rem' }}></p>
            </div>

            <div className='profilename--all'>

              {QuatationnDeatils?.Applicationtype === "Q" && QuatationnDeatils?.ProductLOB === "Motor" ?
                <>
                  <p>Risk Inspection Status</p>
                  <h3><div className={`${QuatationnDeatils?.QC_status === "Approved" ? 'RiskInspectionConfirm' : 'RiskInspection1'}`} >
                    <text className="get-status-text">{QuatationnDeatils?.QC_status}</text>
                  </div>
                  </h3>
                </>
                : null
              }


            </div>
            <div className='profilename--all'>
              {" "}
            </div>
          </div>}



        {/* <div onClick={() => updateHandler(id,QuatationnDeatils?.ProductLOB,QuatationnDeatils?.Applicationtype)} className='button-view-detils'>
          <text className="button-vie-details-text" >View Details</text>
          </div> */}

        <div className='background-customer1'>
          <div className="ourIcons">
            <div className='delet'>
              <span> <img src={mailIcon} /></span>
              <p onClick={sendEmail}>Mail</p>
            </div>
            <div className='delet'>
              <span><img src={phoneIcon} /></span>
              <p><a style={{ color: '#9180AE' }} href={`tel:${QuatationnDeatils?.ProductLOB === 'CTPL' ? QuatationnDeatils?.fullresponse?.CTPL_CustomerInfo_for_Quotation?.mobileNumber : QuatationnDeatils?.ProductLOB === 'Travel' ? QuatationnDeatils?.fullresponse?.travel_information?.policyHolder?.mobileNumber : QuatationnDeatils?.fullresponse?.motor_comprehensive?.policyHolder?.mobileNumber}`}>Phone</a>
              </p>
            </div>
          </div>
          <div className="ViewButtonDetailsPage">
            <div onClick={() => updateHandler(id, QuatationnDeatils?.ProductLOB, QuatationnDeatils?.Applicationtype)} className='button-view-detils'>
              <text className="button-vie-details-text" >View Details</text>
            </div>
          </div>
          {/* <div className='delet'>
              <p><DeleteOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>Delete</p>
          </div>
          <div className='delet'>
              <p><MessageOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>Message</p>
          </div> */}

        </div>



        {/* {leadsData?.globalTab === "team" || leadStatus === "Converted" ? (
          ""
        ) : (

        )}  */}
      </Card>
    </div>
  );

  return <div key={id}>{card}</div>;
});

export default OnlyQuotationCard;
