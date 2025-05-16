import { useEffect, useState } from "react";
import OnlyQuotationsCard from "./OnlyQuotationCard";
import "./QuotationsPoliciesCards.css";
import _ from "lodash";
import { Row, Col, Avatar, Card, Select } from "antd";
import NoRecordsFound from "../NoRcordsFound/NoRecordsFound";
import { useDispatch, useSelector } from "react-redux";
import { AllocateModal } from "../Tab/Allocate";
import { stoageSetter } from "../../helpers";
import * as actions from "../../store/actions/index";
import axiosRequest from '../../axios-request/request.methods'
import GlobalFilters from '../QuotationsPoliciesTab/Filter'
// stoageSetter('user', user);

import {
  // getTeammain_tab_1Api,
  getFirstDropdownValueApi,
  getSecondDropdownValueApi,
  getFormByIdApi,
  getOpenTabApi,
  getFortodayTabApi,
  getDiscardedTabApi,
  getFailedTabApi,
} from "../actions/allleadAction";

// import { fetchAllLeadsSuccess } from "../../store/actions/QuotationsPolicies";
import QuotationFilterData, { ForQuotationFilter } from "../QuotationsPoliciesTab/ForQuotationFilter";

const { Option } = Select;

const OnlyQuotationCards = (props) => {
  console.log("props-----", props);

  const leadsData = useSelector((state) => state.quotationsPolicies);
  console.log("leadsDatappppppp", leadsData);


  const loginState = useSelector((state) => state.login);
  const userTreeData = useSelector((state) => state?.home?.user_tree);

  let test = userTreeData?.reporting_hierarchies
  console.log("test----", test);
  console.log("userTreeData----", userTreeData);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
  const userId = useSelector(state => state?.login?.userId)


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
  }, [leadsData.allapplicationQuotations]);

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
    let _teamData = userTreeData.reporting_users.filter(
      (el) => el.hierarchy_id === event
    );
    console.warn('_teamData((((((((((===>>>>>>>>>>', _teamData)
    setSecondDropData(_teamData);

  };
  const handleSecondDropdown = (event) => {

    setSecondValue(event);
    stoageSetter('teamMemberId', event);

    let agentId = ''
    if (leadsData?.globalTab === 'team') {
      agentId = event
    } else {
      agentId = userId
    }
    dispatch(actions.fetchAllLeads(agentId, getleads, 1))
    try {
      if (event) {
        let res = axiosRequest.get(
          `user/v2/getleads_team_count/${event}?requiredData=self`, { secure: true });
        res.data.then(item => {
          let count = []
          // let countT = []

          count.push(item?.all_lead, item?.today, item?.open_lead, item?.discarded_lead, item?.converted, item?.failed)

          // countT.push()
          //if (leadsData?.globalTab === 'team') {
          //  dispatch(actions.addAllTeamCount(count))
          //}


        })
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
          modifyStrigs[i] =
            collection[i].charAt(0).toUpperCase() + collection[i].slice(1);
          _str = _str + modifyStrigs[i] + " ";
        }
        return _str;
      } else {
        return "";
      }
    } catch (err) { }
  };

  const checkundefined = (data) => {
    if (data === null || data === undefined) {
      return '-'
    } else {
      return data
    }
  }
  const getleads = useSelector((state) => state.quotationsPolicies.currentActiveTab);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);


  const cardShow = () => {
    if (secondValue) {
      let newCards = leadsData?.allapplicationQuotations;
      console.log("newCards", newCards);
      // .filter((data) =>
      //   data.reporting_manager === secondValue
      // );

      if (_.isEmpty(newCards)) {
        return (
          <>
            <div className="main-containerListing">
              <div className="main_tab_1" >
                {/* <h4 className="newHeadingH3">List of Quotations</h4> */}

                <Row gutter={[16, 16]}>
                  <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                    {leadsData?.globalTab === "team" && (
                      <div className="hierarchy">
                        <p style={{ marginLeft: "3.8rem", marginBottom: "5px" }}>
                          Select Hierarchy
                        </p>
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
                        <p style={{ marginLeft: "1.3rem", marginBottom: "5px" }}>
                          Select Team Member
                        </p>
                        <Select
                          className="seconddropdown"
                          value={secondValue}
                          style={{ width: "100%" }}
                          onChange={(item) => handleSecondDropdown(item)}
                          placeholder="Select Team Member"
                          options={secondDropData}
                        ></Select>
                      </div>
                    )}
                  </Col>
                </Row>
              </div>

              <NoRecordsFound />
            </div>
          </>
        );
      }

      if (!_.isEmpty(newCards,)) {

        let card = [];
        card = _.map(newCards, (lead, index) => {
          { console.log(lead, 'lead.appointDate'); }
          return (
            <>

              <Col sm={24} md={24} lg={12} xl={12} key={index}>
                <OnlyQuotationsCard
                  className="lead-agent-card"
                  key={lead._id}
                  id={lead._id}
                  lead_Id={lead.lead_Id}
                  createdAt={lead.createdAt}
                  LOB={lead.LOB}
                  policyForVehical={lead?.CTPL_Quotation_info?.policyForVehical}
                  firstName={lead?.CTPL_CustomerInfo_for_Quotation?.firstName}
                  middleName={lead?.CTPL_CustomerInfo_for_Quotation?.middleName}
                  lastName={lead?.CTPL_CustomerInfo_for_Quotation?.lastName}
                  quoteType={lead?.quoteType}
                  documentType={lead?.CTPL_CustomerInfo_for_Quotation?.documentType}
                  documentCode={lead?.CTPL_CustomerInfo_for_Quotation?.documentCode}
                  expiringPolicyNumber={lead?.CTPL_VehicleInfo_for_Quotation?.expiryDate}
                  email={lead?.CTPL_CustomerInfo_for_Quotation?.email}
                  mobileNumber={lead?.CTPL_CustomerInfo_for_Quotation?.mobileNumber}

                  CTPLQuatationDetails={{
                    createdAt: lead?.createdAt,
                    quoteType: lead?.quoteType,
                    ProductLOB: lead?.LOB,
                    policyForVehical: lead?.CTPL_VehicleInfo_for_Quotation?.makeName + " " + lead?.CTPL_VehicleInfo_for_Quotation?.modelName,
                    firstName: lead?.CTPL_CustomerInfo_for_Quotation?.firstName,
                    middleName: lead?.CTPL_CustomerInfo_for_Quotation?.middleName,
                    lastName: lead?.CTPL_CustomerInfo_for_Quotation?.lastName,
                    QuotationNumber: lead?.oonaQuotationResponse?.quotationNumber,
                    Premium: lead?.oonaQuotationResponse?.paymentBreakdown?.grossPrem,
                    Status: lead?.oonaQuotationResponse?.technicalControls,
                    documentType: lead?.CTPL_CustomerInfo_for_Quotation?.documentType,
                    documentCode: lead?.CTPL_CustomerInfo_for_Quotation?.documentCode,
                    expiryDate: lead?.CTPL_VehicleInfo_for_Quotation?.expiryDate,
                    email: lead?.CTPL_CustomerInfo_for_Quotation?.email,
                    mobileNumber: lead?.CTPL_CustomerInfo_for_Quotation?.mobileNumber,
                    QC_status: 'Not Required',
                    fullresponse: lead,
                    Applicationtype: 'Q',
                    createdBy: lead?.createdBy,
                    staff_orAgnet_firstName: lead?.staff_orAgnet_firstName,
                    staff_orAgnet_lastName: lead?.staff_orAgnet_lastName,
                    linkShared_To_CustomerBy: lead?.linkShared_To_CustomerBy,

                  }}

                  MotorQuatationDetails={{
                    createdAt: lead?.createdAt,
                    ProductLOB: lead?.LOB,
                    quoteType: lead?.quoteType,
                    policyForVehical: checkundefined(lead?.motor_comprehensive?.vehicleData?.makeName) + "-" + checkundefined(lead?.motor_comprehensive?.vehicleData?.modelName),
                    firstName: checkundefined(lead?.motor_comprehensive?.policyHolder?.firstName),
                    middleName: checkundefined(lead?.motor_comprehensive?.policyHolder?.middleName),
                    lastName: checkundefined(lead?.motor_comprehensive?.policyHolder?.lastName),
                    QuotationNumber: lead?.oonaQuotationResponse?.quotationNumber,
                    Premium: lead?.oonaQuotationResponse?.paymentBreakdown?.grossPrem,
                    Status: lead?.oonaQuotationResponse?.technicalControls,
                    documentType: lead?.motor_comprehensive?.policyHolder?.documentType,
                    documentCode: lead?.motor_comprehensive?.policyHolder?.documentCode,
                    expiryDate: lead?.motor_comprehensive?.expirationDate,
                    QC_status: lead?.QC_status,
                    fullresponse: lead,
                    email: lead?.motor_comprehensive?.policyHolder?.email,
                    mobileNumber: lead?.motor_comprehensive?.policyHolder?.mobileNumber,
                    Applicationtype: 'Q',
                    createdBy: lead?.createdBy,
                    staff_orAgnet_firstName: lead?.staff_orAgnet_firstName,
                    staff_orAgnet_lastName: lead?.staff_orAgnet_lastName,
                    linkShared_To_CustomerBy: lead?.linkShared_To_CustomerBy,

                  }}


                  TravelquatationDetails={{
                    createdAt: lead?.createdAt,
                    ProductLOB: lead?.LOB,
                    quoteType: lead?.quoteType,
                    policyForVehical: lead?.travel_information?.travelData?.travelType === 'I' ? 'International' : 'Domestic',
                    firstName: lead?.travel_information?.policyHolder?.firstName,
                    middleName: lead?.travel_information?.policyHolder?.middleName,
                    lastName: lead?.travel_information?.policyHolder?.lastName,
                    QuotationNumber: lead?.oonaQuotationResponse?.quotationNumber,
                    Premium: lead?.oonaQuotationResponse?.paymentBreakdown?.converted,
                    Status: lead?.oonaQuotationResponse?.technicalControls,
                    subcontractor: lead?.travel_information?.subContractCodeName,
                    expiryDate: lead?.travel_information?.expirationDate,
                    QC_status: 'Not Required',
                    fullresponse: lead,
                    Applicationtype: 'Q',
                    createdBy: lead?.createdBy,
                    staff_orAgnet_firstName: lead?.staff_orAgnet_firstName,
                    staff_orAgnet_lastName: lead?.staff_orAgnet_lastName,
                    linkShared_To_CustomerBy: lead?.linkShared_To_CustomerBy,
                  }}
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
    //   if (_.isEmpty(props.quotationsPolicies)) { return <NoRecordsFound /> }
    //   if (!_.isEmpty(props.quotationsPolicies)) {
    //     card = _.map(props.quotationsPolicies, (lead, index) => {
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

        <div className="main_tab_1" style={{ marginTop: '20px' }}>
          {/* <h4 className="newHeadingH3">List of Quotations</h4> */}

          <Row gutter={[16, 16]} >
            <Col xs={12} sm={12} md={12} lg={4} xl={4}>
              <div className="hierarchy">
                {/* <p>Select Hierarchy</p>
               <Select
               className="firstdropdown"
               value={firstValue}
              //defaultValue='all'
                style={{width: '100%'}}
               onChange={handleFirstDropdown}
               placeholder="Select Hierarchy"
               options={firsrDrop}

               >
               </Select> */}



              </div>
            </Col>
            {/* <Col xs={12} sm={12} md={12} lg={4} xl={4}>
         {openSecond && leadsData?.globalTab === "team" && (
          <div className="hierarchy">
            <p>Select Team Member</p>
             <Select
              className="seconddropdown"
              value={secondValue}
            style={{width: '100%',}}
              onChange={ (item) => handleSecondDropdown(item)}
              placeholder="Select Team Member"
              options={secondDropData}
            ></Select>
          </div>
        )}
         </Col> */}
          </Row>
        </div>
        <NoRecordsFound />
      </>
    );
  }


  if (!_.isEmpty(props.leads)) {
    card = _.map(props.leads, (lead, index) => {
      return (
        <>
          <Col sm={24} md={24} lg={12} xl={12} key={index}>
            <OnlyQuotationsCard
              className="lead-agent-card"
              key={lead._id}
              id={lead._id}
              lead_Id={lead.lead_Id}
              createdAt={lead.createdAt}
              LOB={lead.LOB}
              policyForVehical={lead?.CTPL_Quotation_info?.policyForVehical}
              firstName={lead?.CTPL_CustomerInfo_for_Quotation?.firstName}
              middleName={lead?.CTPL_CustomerInfo_for_Quotation?.middleName}
              lastName={lead?.CTPL_CustomerInfo_for_Quotation?.lastName}
              quoteType={lead?.quoteType}
              documentType={lead?.CTPL_CustomerInfo_for_Quotation?.documentType}
              documentCode={lead?.CTPL_CustomerInfo_for_Quotation?.documentCode}
              expiringPolicyNumber={lead?.CTPL_VehicleInfo_for_Quotation?.expiryDate}
              email={lead?.CTPL_VehicleInfo_for_Quotation?.email}
              mobileNumber={lead?.CTPL_VehicleInfo_for_Quotation?.mobileNumber}

              CTPLQuatationDetails={{
                createdAt: lead?.createdAt,
                ProductLOB: lead?.LOB,
                firstName: lead?.CTPL_CustomerInfo_for_Quotation?.firstName,
                middleName: lead?.CTPL_CustomerInfo_for_Quotation?.middleName,
                lastName: lead?.CTPL_CustomerInfo_for_Quotation?.lastName,
                QuotationNumber: lead?.oonaQuotationResponse?.quotationNumber,
                Premium: lead?.oonaQuotationResponse,
                Status: lead?.oonaQuotationResponse?.technicalControls,
                documentType: lead?.CTPL_CustomerInfo_for_Quotation?.documentType,
                documentCode: lead?.CTPL_CustomerInfo_for_Quotation?.documentCode,
                Expiry: lead?.CTPL_VehicleInfo_for_Quotation?.expiryDate,
                email: lead?.CTPL_CustomerInfo_for_Quotation?.email,
                mobileNumber: lead?.CTPL_CustomerInfo_for_Quotation?.mobileNumber,
              }}
            />
          </Col>
        </>
      );
    });
  }
  // )

  // const getDataAfterFilterTeam = async () => {
  //   const response = await getFormByIdApi({ id: secondValue });
  //   if (response.status == 200) {
  //     if (response?.data?.data) {
  //       dispatch(
  //         fetchAllQuotationsPoliciesSuccess(
  //           response?.data?.data,
  //           response?.data?.data[1][0]?.count
  //         )
  //       );
  //     }
  //   } else {
  //     throw response?.data?.data;
  //   }
  // };'

  // const childcALLBACK=(data)=>{
  //   console.log("data====>", data);
  // }

  return (
    <>
      <div className="main_tab_1" >
        <h4 className="newHeadingH3">List of Quotations</h4>


        {/* <GlobalFilters
                show={show}
                onHide={handleClose}
                handleShow={handleShow}
                setShow={setShow}
              />  */}
        {/* <ForQuotationFilter childcALLBACK={childcALLBACK}  /> */}
        {/* <QuotationFilterData childcALLBACK={childcALLBACK} /> */}
        <>
          {/* <Row gutter={16}>
                  <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  {leadsData?.globalTab === "team" && (
          <div className="hierarchy">
            <p >Select Hierarchy</p>
            <Select
              className="firstdropdown"
              value={firstValue}
             // defaultValue='all'
              style={{width: '100%'}}
              onChange={handleFirstDropdown}
              placeholder="Select Hierarchy"
              options={firsrDrop}
            >
            </Select>
          </div>
        )}
      </Col>
      <Col xs={12} sm={12} md={12} lg={4} xl={4}>
      {openSecond && leadsData?.globalTab === "team" && (
          <div className="hierarchy">
            <p>Select Team Member</p>
             <Select
              className="seconddropdown"
              value={secondValue}
              style={{width: '100%',}}
              onChange={ (item) => handleSecondDropdown(item)}
              placeholder="Select Team Member"
              options={secondDropData}
            ></Select>
          </div>
        )}
      </Col>
      </Row> */}
        </>
      </div>

      <Row>
        {!secondValue ? card : cards}
        {/* this is just a presentational card  */}
        <Col
          sm={24}
          md={24}
          lg={12}
          xl={12}
          className={
            width < breakpoint ? "dummy-card-mobile" : "dummy-card-desktop"
          }
        >
          <>
            <Card
              // key={id}
              // loading={props.loading}
              className="lead-card-desktop"
              hoverable={true}
            >
              <div className="avatar-and-status">
                <Avatar size={{ xl: 50 }}></Avatar>
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
              {/* {leadsData?.globalTab === "team" ? <button className="update-btn">Update</button> : ''} */}
            </Card>
          </>
        </Col>
      </Row>
    </>
  );
};

export default OnlyQuotationCards;
