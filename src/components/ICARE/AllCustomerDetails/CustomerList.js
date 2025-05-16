import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import './CustomerList.css'
import { Button, Row, Col, Avatar, message} from 'antd';
import moment from "moment/moment";
import profile_img from '../../../images/Icon/profile-customer.png'
import img1 from "../../../images/Icon/image-54@2x.png"
import {
    DeleteOutlined,
    MessageOutlined,
    MailOutlined,
    PhoneOutlined,
  } from "@ant-design/icons";
  import { Tabs } from 'antd';
  import { stoageGetter } from "../../../helpers";
  import { useDispatch, useSelector } from "react-redux";
  import * as actions from "../../../store/actions/customerListing";
  import axiosRequest from "../../../axios-request/request.methods";
import NoRecordsFound from '../../NoRcordsFound/NoRecordsFound';
import BottomNavigation from '../bottomNavigation/bottomNavigation';
import OonaFooter from '../OonaFooter/OonaFooter';
import { result } from 'lodash';
import FullPageLoader from '../../FullPageLoader/FullPageLoader';

const { TabPane } = Tabs;

const CustomerList = () => {
    const dispatch = useDispatch();
    const { id } = stoageGetter("user");

    const [activeTab, setActiveTab] = useState('Quotations');
    let customerLead_id = useSelector((state) => state?.customerListingPage?.currentUpdatingID);
    const itemsPerPage = 2;
    const itemsPerPage1 = 2;
    const [activePage, setActivePage] = useState(1);
    const [activePage1, setActivePage1] = useState(1);
    const [loader, setLoader] = useState(false)
    const [size, setSize] = useState("default"); // default is 'middle'
    const [mobilenumber, setMobileNumber] = useState("");
    const [genderVehicle, setGenderVehicle] = useState("");

    const [searchName, setSearchName] = useState("");
    const [filteredCards, setFilteredCards] = useState([]);
    const [perparticulerCustomer, setPerparticulerCustomer] = useState([])

    const dataArray = [
        {date: '14 June 2023', cardButton: 'IMPORTANT', imgData: profile_img, profileName: 'Jonh dela Cruz', profileDescri: 'Customer since Feb 2023', proGender: 'Male', birtday: 'Jul 18', policy: 'Auto Comprehensive', proDele: 'Delete', proMess: 'Message', proMail: 'Mail', proPhone: 'Phone', DocumentType: 'Motor', documentCode: '0123456789'},
        // Add more items to the dataArray
      ];

      const getLeadDetails = async (customerLead_id) => {
        setLoader(true)
        try {
          let result = await axiosRequest.get(`user/policy/getgetAllRefred_AgentsCustomer/${id}?customerId=${customerLead_id}`, {
            secure: true,
          });
          if (result?.statusCode === -1) {
            setLoader(false)
            setPerparticulerCustomer(result.data[0])
          }
         /// dispatch(actions.fetchLeadDetailsSuccess(result.data[0]));
        } catch (err) {
          setLoader(false)
          if (err?.response?.data?.statusCode === 1) {
            message.error(err?.response?.data?.data);
          }
        }
      };
  
      useEffect(() => {
        dispatch(actions.fetchAllGetQuotation(id, customerLead_id
        ));
        dispatch(actions.fetchAllGetPolicies(id, customerLead_id));

        getLeadDetails(customerLead_id)
    }, [])

    const leadsGetQuation = useSelector((state) => state.customerListingPage?.allQoutationArr);
    
    const customerData = useSelector((state) => state);
    const leadsGetPolicies = useSelector((state) => state?.customerListingPage?.allPolicies);

    console.log("leadsGetPolicies-------", leadsGetPolicies);

    const handleTabChange = (key) => {
        setActiveTab(key);
    };
      
 
const genderOptions = [
{ label: "Male", value: "Male" },
{ label: "Female", value: "Female" },
{ label: "Other", value: "Other" },
];

const onChangeMobileNumber = (e) => {
  setSearchName(e.target.value);
};
const OnchangeGenderHander = (item) => {
  setGenderVehicle(item);
};


const handleSearch = () => {
const filteredData = dataArray.filter((Cust) =>
  Cust.profileName.toLowerCase().includes(searchName.toLowerCase())
);
setFilteredCards(filteredData);
};

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handlePageChange1 = (pageNumber1) => {
    setActivePage1(pageNumber1);
  };
  // Calculate start and end index for the current page
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const startIndex1 = (activePage1 - 1) * itemsPerPage1;
  const endIndex1 = startIndex1 + itemsPerPage1;
  // Get the data for the current page
  const currentPageData = leadsGetQuation?.slice(startIndex, endIndex);
  const currentPagePoliciesData = leadsGetPolicies.slice(startIndex1, endIndex1);

  const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
    }
  };


  return (
    <>
    <FullPageLoader fromapploader={loader} />
    <div className='main-container'>
            <div className="main-heading-customer">
            <h2>Customer Details</h2>
            </div>
    
    <div className='heading-pro'>
        <h2>Personal Information</h2>
    </div>
             {/* <Row gutter={16}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="gender"
                        label="Document Type"
                      >
                        <Select
                          placeholder="Select Gender"
                          size="default"
                          options={genderOptions}
                          onChange={(item) => {
                            OnchangeGenderHander(item);
                          }}
                          value={genderVehicle}
                        ></Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="documentCode"
                        label="Document Code"
                      >
                        <Input
                          className="first-name input-box"
                          size="default"
                          maxLength="30"
                          placeholder="Document Code"
                          value={mobilenumber}
                          onChange={(item) => onChangeMobileNumber(item)}
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                    <Col
                     xs={24} sm={24} md={8} lg={8} xl={8}
                      className="searchDiv"
                    >
                      <Button className="searchBtn"  onClick={handleSearch} size={size}>
                        Search
                      </Button>
                    </Col>
                  </Row> */}

                  {/* CUSTOMER LIST FOR DESKTOP */}
    <Row gutter={[16,16]}>
      {perparticulerCustomer.map((cardDataCust, index) => {
        return <Col key={index} xs={24} sm={24} md={24} lg={24} xl={24}>
        <div className='customer-card-data customer-list-data-for-desktop'>
      <div className='customer-card-details'>
          <div className='button-and-daat'>
              <div className='date--'>
                  <p>{cardDataCust.date ? cardDataCust.date : 'DATE'}</p>
              </div>
              
              <div className='newbutton--customer'>
                <div>{cardDataCust.cardButton ? cardDataCust.cardButton : 'IMPORTANT'}</div>
              </div>
          </div>

          <div className='button-and-profile1 button-and-all-details'>
              <div className='profile--11'>
                  {/* <img src={cardDataCust.imgData} /> */}
                  <Avatar
                      style={{
                          paddingTop: "-40px",
                          lineHeight: "none",
                          backgroundColor: getRandomColor(),
                          
                      }}
                      size={{ xl: 40 }}
                      >
                      {nameShorter(cardDataCust?.firstName + " " + cardDataCust?.lastName)}
                      </Avatar>
                      <div className='profilename--'>
                        <h3>{cardDataCust.firstName + " " + cardDataCust.lastName}</h3>
                        <p>{cardDataCust.profileDescri ? cardDataCust.profileDescri : '----'}</p>
                    </div>
              </div>
              
              <div className='profile--all'>
                 <p>Gender</p>
                 <h3>{cardDataCust.gender === '1' ? "Male" : "Female"}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Birthdate</p>
                 <h3>{cardDataCust.dob}</h3>
              </div>
              <div className='profilename--all-class'>
                  <p>Mobile No.</p>
                 <h3>{cardDataCust.primaryMobile ? cardDataCust.primaryMobile : ''}</h3>
              </div>
              <div className='profilename--all-class'>
                  <p>Email</p>
                 <h3>{cardDataCust.email ? cardDataCust.email : '-'}</h3>
              </div>
              {/* <div className='profilename--all-class'>
                  <p>Doc Type</p>
                 <h3>{cardDataCust.DocumentType}</h3>
              </div>
              <div className='profilename--all-class'>
                  <p>Doc Code</p>
                 <h3>{cardDataCust.DocumentType}</h3>
              </div> */}
              
          </div> 
          {/* <div className='button-and-all-details'>
              
              
          </div>    */}
      
      </div>
  </div>
        </Col>
      })}
        </Row>

        {/* CUSTOMER LIST FROM MOBILE */}
        <Row gutter={[16,16]}>
      {perparticulerCustomer.map((cardDataCust, index) => {
        return <Col key={index} xs={24} sm={24} md={24} lg={24} xl={24}>
        <div className='customer-card-data customer-list-data-for-mobile'>
      <div className='customer-card-details'>
          <div className='button-and-daat'>
              <div className='date--'>
                  <p>{cardDataCust.date ? cardDataCust.date : 'DATE'}</p>
              </div>
              <div className='newbutton--customer'>
                  <div>{cardDataCust.cardButton ? cardDataCust.cardButton : 'IMPORTANT'}</div>
              </div>
          </div>

          <div className='button-and-profile button-and-all-details'>
              <div className='profile--11'>
                  {/* <img src={cardDataCust.imgData} /> */}
                  <Avatar
                      style={{
                          paddingTop: "-40px",
                          lineHeight: "none",
                          backgroundColor: getRandomColor(),
                          
                      }}
                      size={{ xl: 40 }}
                      >
                      {nameShorter(cardDataCust?.firstName + " " + cardDataCust?.lastName)}
                      </Avatar>
                      <div className='profilename--'>
                        <h3>{cardDataCust.firstName + " " + cardDataCust.lastName}</h3>
                        <p>{cardDataCust.profileDescri ? cardDataCust.profileDescri : '----'}</p>
                    </div>
              </div>
              
              <div className='profile--all'>
                 <p>Gender</p>
                 <h3>{cardDataCust.gender}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Birthdate</p>
                 <h3>{cardDataCust.dob}</h3>
              </div>
              <div className='profilename--all-class'>
                  <p>Mobile No.</p>
                 <h3>{cardDataCust.primaryMobile ? cardDataCust.primaryMobile : ''}</h3>
              </div>
              <div className='profilename--all-class'>
                  <p>Email</p>
                 <h3>{cardDataCust.email ? cardDataCust.email : '-'}</h3>
              </div>
              {/* <div className='profilename--all-class'>
                  <p>Doc Type</p>
                 <h3>{cardDataCust.DocumentType}</h3>
              </div>
              <div className='profilename--all-class'>
                  <p>Doc Code</p>
                 <h3>{cardDataCust.DocumentType}</h3>
              </div> */}
              
          </div> 
          {/* <div className='button-and-all-details'>
              
              
          </div>    */}
      {/* <div className='background-customer'>
          <div className='delet'>
              <p><DeleteOutlined style={{color: "#4AC6BB", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>{cardDataCust.proDele}</p>
          </div>
          <div className='delet'>
              <p><MessageOutlined style={{color: "#4AC6BB", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>{cardDataCust.proMess}</p>
          </div>
          <div className='delet'>
              <p><MailOutlined style={{color: "#4AC6BB", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>{cardDataCust.proMail}</p>
          </div>
          <div className='delet'>
              <p><PhoneOutlined style={{color: "#4AC6BB", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>{cardDataCust.proPhone}</p>
          </div>
      </div> */}
      </div>
  </div>
        </Col>
      })}
        </Row>


<div className='policy-details-pag'>
<div className='heading-pro'>
        <h2>Policies Purchased</h2>
    </div>


    <Tabs activeKey={activeTab} onChange={handleTabChange} >
            <TabPane tab="Quotations" key="Quotations">
    <Row gutter={[16,16]}>
      {currentPageData && currentPageData.length === 0 ? <>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <NoRecordsFound />
        </Col>
      </> : <>
      {currentPageData[0]?.LOB === "CTPL" ? currentPageData?.map((profileDataCust, index) => {
        return <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12}>
        <div className='customer-card-data'>
      <div className='customer-card-details1'>
          <div className='button-and-daat'>
              <div className='date--'>
                  <p>{profileDataCust.createdAt}</p>
              </div>
              <div className='newbutton--customer'>
                  <div>{profileDataCust.LOB}</div>
              </div>
          </div>

          <div className='button-and-profile1'>
              <div className='profile--11'>
                  <img src={profileDataCust.imgData ? profileDataCust.imgData : img1} />
                  
                      <div className='profilename--'>
                        <h3>{profileDataCust?.CTPL_VehicleInfo_for_Quotation?.makeName + profileDataCust?.CTPL_VehicleInfo_for_Quotation?.modelName ? profileDataCust?.CTPL_VehicleInfo_for_Quotation?.makeName + " " + profileDataCust?.CTPL_VehicleInfo_for_Quotation?.modelName : "-"}</h3>
                        <div className='child'>
                        <p>{profileDataCust?.CTPL_CustomerInfo_for_Quotation?.firstName + " " + profileDataCust.CTPL_CustomerInfo_for_Quotation?.lastName}</p>
                        <p style={{marginLeft: '2rem'}}>{profileDataCust?.quotationNumber ? profileDataCust.quotationNumber : "-"}</p>
                        </div>
                        
                    </div>
              </div>
          </div> 
         
           <div className='button-and-all-details'>
              <div className='profilename--all'>
                  <p>Premium</p>
                 <h3>{profileDataCust?.oonaQuotationResponse?.paymentBreakdown?.netPrem}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Commission</p>
                 <h3>{profileDataCust?.oonaQuotationResponse?.paymentBreakdown?.grossPrem}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Quote Type</p>
                 <h3>{profileDataCust?.quoteType ? profileDataCust?.quoteType : "-"}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Expiry</p>
                 <h3>{profileDataCust?.CTPL_VehicleInfo_for_Quotation?.expiryDate ? profileDataCust?.CTPL_VehicleInfo_for_Quotation?.expiryDate : "-"}</h3>
              </div>
              
          </div>    
      <div className='background-customer1'>
         
          <div className='delet'>
              <p><MailOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>{profileDataCust.proMail ? profileDataCust.proMail : "Mail"}</p>
          </div>
          <div className='delet'>
              <p><PhoneOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>{profileDataCust.proPhone ? profileDataCust.proPhone : "Phone"}</p>
          </div>
      </div>
      </div>
  </div>
        </Col>
      }) : <>
      {currentPageData[0]?.LOB === "Travel" ? currentPageData?.map((profileDataCust, index) => {
        return <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12}>
        <div className='customer-card-data'>
        <div className='customer-card-details1'>
          <div className='button-and-daat'>
              <div className='date--'>
                  <p>{profileDataCust.createdAt}</p>
              </div>
              <div className='newbutton--customer'>
                  <Button>{profileDataCust.LOB}</Button>
              </div>
          </div>

          <div className='button-and-profile1'>
              <div className='profile--11'>
                  <img src={profileDataCust.imgData ? profileDataCust.imgData : img1} />
                  
                      <div className='profilename--'>
                        <h3>{profileDataCust?.travel_information?.policyHolder?.policyTypeLOB ? profileDataCust?.travel_information?.policyHolder?.policyTypeLOB : '-'}</h3>
                        <div className='child'>
                        <p>{profileDataCust?.travel_information?.policyHolder?.firstName + " " + profileDataCust?.travel_information?.policyHolder?.lastName}</p>
                        <p style={{marginLeft: '2rem'}}>{profileDataCust.quotationNumber ? profileDataCust.quotationNumber : "-"}</p>
                        </div>
                        
                    </div>
              </div>
          </div> 
         
           <div className='button-and-all-details'>
              <div className='profilename--all'>
                  <p>Premium</p>
                 <h3>{profileDataCust?.oonaQuotationResponse?.paymentBreakdown?.netPrem}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Commission</p>
                 <h3>{profileDataCust?.oonaQuotationResponse?.paymentBreakdown?.grossPrem}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Quote Type</p>
                 <h3>{profileDataCust.quoteType ? profileDataCust.quoteType : "-"}</h3>
              </div>
              {/* <div className='profilename--all'>
                  <p>Expiry</p>
                 <h3>{profileDataCust.CTPL_VehicleInfo_for_Quotation.expiryDate ? profileDataCust.CTPL_VehicleInfo_for_Quotation.expiryDate : "-"}</h3>
              </div> */}
              
          </div>    
      <div className='background-customer1'>
          
          <div className='delet'>
              <p><MailOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>{profileDataCust.proMail ? profileDataCust.proMail : "Mail"}</p>
          </div>
          <div className='delet'>
              <p><PhoneOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>{profileDataCust.proPhone ? profileDataCust.proPhone : "Phone"}</p>
          </div>
      </div>
      </div>
  </div>
        </Col>
      }) : currentPageData?.map((profileDataCust, index) => {
        return <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12}>
        <div className='customer-card-data'>
        <div className='customer-card-details1'>
          <div className='button-and-daat'>
              <div className='date--'>
                  <p>{profileDataCust.createdAt}</p>
              </div>
              <div className='newbutton--customer'>
                  <div>{profileDataCust.LOB}</div>
              </div>
          </div>
  
          <div className='button-and-profile1'>
              <div className='profile--11'>
                  <img src={profileDataCust.imgData ? profileDataCust.imgData : img1} />
                  
                      <div className='profilename--'>
                        <h3>{profileDataCust?.motor_comprehensive?.productTierName ? profileDataCust?.motor_comprehensive?.productTierName : '-'}</h3>
                        <div className='child'>
                        <p>{profileDataCust?.motor_comprehensive?.policyHolder?.firstName + " " + profileDataCust?.motor_comprehensive?.policyHolder?.lastName}</p>
                        <p style={{marginLeft: '2rem'}}>{profileDataCust?.oonaQuotationResponse
  .quotationNumber ? profileDataCust?.oonaQuotationResponse
  ?.quotationNumber : "-"}</p>
                        </div>
                        
                    </div>
              </div>
          </div> 
         
           <div className='button-and-all-details'>
              <div className='profilename--all'>
                  <p>Premium</p>
                 <h3>{profileDataCust?.oonaQuotationResponse?.paymentBreakdown?.netPrem}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Commission</p>
                 <h3>{profileDataCust?.oonaQuotationResponse?.paymentBreakdown?.grossPrem}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Quote Type</p>
                 <h3>{profileDataCust?.quoteType ? profileDataCust?.quoteType : "-"}</h3>
              </div>
              {/* <div className='profilename--all'>
                  <p>Expiry</p>
                 <h3>{profileDataCust.CTPL_VehicleInfo_for_Quotation.expiryDate ? profileDataCust.CTPL_VehicleInfo_for_Quotation.expiryDate : "-"}</h3>
              </div> */}
              
          </div>    
      <div className='background-customer1'>
          
          <div className='delet'>
              <p><MailOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
  fontWeight: 'bold'}} /></p>
              <p>{profileDataCust.proMail ? profileDataCust.proMail : "Mail"}</p>
          </div>
          <div className='delet'>
              <p><PhoneOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
  fontWeight: 'bold'}} /></p>
              <p>{profileDataCust.proPhone ? profileDataCust.proPhone : "Phone"}</p>
          </div>
      </div>
      </div>
  </div>
        </Col>
      }) 
       }
      </>}
      </>}
      
        </Row>        
    </TabPane>


    
{/* Policy data start here  */}
        <TabPane tab="Policies" key="Policies">
        <Row gutter={[16,16]}>
      {currentPagePoliciesData && currentPagePoliciesData.length === 0 ? <>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <NoRecordsFound />
        </Col>
      </> : <>
      {currentPagePoliciesData[0]?.LOB === "CTPL" ? currentPagePoliciesData?.map((profileDataCust, index) => {
        return <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12}>
        <div className='customer-card-data'>
      <div className='customer-card-details1'>
          <div className='button-and-daat'>
              <div className='date--'>
                  <p>{profileDataCust?.createdAt}</p>
              </div>
              <div className='newbutton--customer'>
                  <div>{profileDataCust?.LOB}</div>
              </div>
          </div>

          <div className='button-and-profile1'>
              <div className='profile--11'>
                  <img src={profileDataCust.imgData ? profileDataCust.imgData : img1} />
                  
                      <div className='profilename--'>
                        <h3>{profileDataCust?.CTPL_VehicalInfo_for_Policy?.makeName + profileDataCust?.CTPL_VehicalInfo_for_Policy?.modelName ? profileDataCust?.CTPL_VehicalInfo_for_Policy?.makeName + " " + profileDataCust?.CTPL_VehicalInfo_for_Policy?.modelName : '-'}</h3>
                        <div className='child'>
                        <p>{profileDataCust?.CTPL_CustomerInfo_for_Policy?.firstName + " " + profileDataCust?.CTPL_CustomerInfo_for_Policy?.lastName}</p>
                        <p style={{marginLeft: '2rem'}}>{profileDataCust?.policyNo ? profileDataCust?.policyNo : "-"}</p>
                        </div>
                        
                    </div>
              </div>
          </div> 
         
           <div className='button-and-all-details'>
              <div className='profilename--all'>
                  <p>Premium</p>
                 <h3>{profileDataCust?.oonaPolicyResponse?.paymentBreakdown?.netPrem}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Commission</p>
                 <h3>{profileDataCust?.oonaPolicyResponse?.paymentBreakdown?.grossPrem}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Policy Status</p>
                 <h3>{profileDataCust?.oonaPolicyResponse?.policyStatus ? profileDataCust?.oonaPolicyResponse?.policyStatus : "-"}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Expiry</p>
                 <h3>{profileDataCust?.CTPL_VehicalInfo_for_Policy?.expiryDate ? profileDataCust?.CTPL_VehicalInfo_for_Policy?.expiryDate : "-"}</h3>
              </div>
              
          </div>    
      <div className='background-customer1'>
          {/* <div className='delet'>
              <p><DeleteOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>{profileDataCust.proDele ? profileDataCust.proDele : "Delete"}</p>
          </div>
          <div className='delet'>
              <p><MessageOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>{profileDataCust.proMess ? profileDataCust.proMess : "Message"}</p>
          </div> */}
          <div className='delet'>
              <p><MailOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>{profileDataCust.proMail ? profileDataCust.proMail : "Mail"}</p>
          </div>
          <div className='delet'>
              <p><PhoneOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>{profileDataCust.proPhone ? profileDataCust.proPhone : "Phone"}</p>
          </div>
      </div>
      </div>
  </div>
        </Col>
      }) : <>
      {currentPagePoliciesData[0]?.LOB === "Travel" ? currentPagePoliciesData?.map((profileDataCust, index) => {
        return <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12}>
        <div className='customer-card-data'>
        <div className='customer-card-details1'>
          <div className='button-and-daat'>
              <div className='date--'>
                  <p>{profileDataCust?.createdAt}</p>
              </div>
              <div className='newbutton--customer'>
                  <div>{profileDataCust?.LOB}</div>
              </div>
          </div>

          <div className='button-and-profile1'>
              <div className='profile--11'>
                  <img src={profileDataCust.imgData ? profileDataCust.imgData : img1} />
                  {/* <Avatar
                      style={{
                          paddingTop: "-40px",
                          lineHeight: "none",
                          backgroundColor: getRandomColor(),
                          
                      }}
                      size={{ xl: 40 }}
                      >
                      {nameShorter(profileDataCust.profileName)}
                      </Avatar> */}
                      <div className='profilename--'>
                        <h3>{profileDataCust?.travel_information?.policyHolder?.policyTypeLOB ? profileDataCust?.travel_information?.policyHolder?.policyTypeLOB : "-"}</h3>
                        <div className='child'>
                        <p>{profileDataCust?.travel_information?.policyHolder?.firstName + " " + profileDataCust?.travel_information?.policyHolder?.lastName}</p>
                        <p style={{marginLeft: '2rem'}}>{profileDataCust.policyNumber ? profileDataCust.policyNumber : "-"}</p>
                        </div>
                        
                    </div>
              </div>
          </div> 
         
           <div className='button-and-all-details'>
              <div className='profilename--all'>
                  <p>Premium</p>
                 <h3>{profileDataCust?.oonaPolicyResponse?.paymentBreakdown?.netPrem}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Commission</p>
                 <h3>{profileDataCust?.oonaPolicyResponse?.paymentBreakdown?.grossPrem}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Quote Type</p>
                 <h3>{profileDataCust.quoteType ? profileDataCust.quoteType : "-"}</h3>
              </div>
              {/* <div className='profilename--all'>
                  <p>Expiry</p>
                 <h3>{profileDataCust.CTPL_VehicleInfo_for_Quotation.expiryDate ? profileDataCust.CTPL_VehicleInfo_for_Quotation.expiryDate : "-"}</h3>
              </div> */}
              
          </div>    
      <div className='background-customer1'>
          
          <div className='delet'>
              <p><MailOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>{profileDataCust.proMail ? profileDataCust.proMail : "Mail"}</p>
          </div>
          <div className='delet'>
              <p><PhoneOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>{profileDataCust.proPhone ? profileDataCust.proPhone : "Phone"}</p>
          </div>
      </div>
      </div>
  </div>
        </Col>
      }) : currentPagePoliciesData?.map((profileDataCust, index) => {
        return <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12}>
        <div className='customer-card-data'>
        <div className='customer-card-details1'>
          <div className='button-and-daat'>
              <div className='date--'>
                  <p>{profileDataCust?.createdAt}</p>
              </div>
              <div className='newbutton--customer'>
                  <div>{profileDataCust?.LOB}</div>
              </div>
          </div>
  
          <div className='button-and-profile1'>
              <div className='profile--11'>
                  <img src={profileDataCust.imgData ? profileDataCust.imgData : img1} />
                  {/* <Avatar
                      style={{
                          paddingTop: "-40px",
                          lineHeight: "none",
                          backgroundColor: getRandomColor(),
                          
                      }}
                      size={{ xl: 40 }}
                      >
                      {nameShorter(profileDataCust.profileName)}
                      </Avatar> */}
                      <div className='profilename--'>
                        <h3>{profileDataCust?.motor_comprehensive?.productTierName ? profileDataCust?.motor_comprehensive?.productTierName : "-"}</h3>
                        <div className='child'>
                        <p>{profileDataCust?.motor_comprehensive
  ?.policyHolder?.firstName + " " + profileDataCust?.motor_comprehensive
  ?.policyHolder?.lastName}</p>
                        <p style={{marginLeft: '2rem'}}>{profileDataCust?.oonaPolicyResponse
  .policyNumber ? profileDataCust?.oonaPolicyResponse
  .policyNumber : "-"}</p>
                        </div>
                        
                    </div>
              </div>
          </div> 
         
           <div className='button-and-all-details'>
              <div className='profilename--all'>
                  <p>Premium</p>
                 <h3>{profileDataCust?.oonaPolicyResponse?.paymentBreakdown?.netPrem}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Commission</p>
                 <h3>{profileDataCust?.oonaPolicyResponse?.paymentBreakdown?.grossPrem}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Quote Type</p>
                 <h3>{profileDataCust.paymentMethod ? profileDataCust.paymentMethod : "-"}</h3>
              </div>
              {/* <div className='profilename--all'>
                  <p>Expiry</p>
                 <h3>{profileDataCust.CTPL_VehicleInfo_for_Quotation.expiryDate ? profileDataCust.CTPL_VehicleInfo_for_Quotation.expiryDate : "-"}</h3>
              </div> */}
              
          </div>    
      <div className='background-customer1'>
          
          <div className='delet'>
              <p><MailOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
  fontWeight: 'bold'}} /></p>
              <p>{profileDataCust.proMail ? profileDataCust.proMail : "Mail"}</p>
          </div>
          <div className='delet'>
              <p><PhoneOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
  fontWeight: 'bold'}} /></p>
              <p>{profileDataCust.proPhone ? profileDataCust.proPhone : "Phone"}</p>
          </div>
      </div>
      </div>
  </div>
        </Col>
      
      }) 
       }
      </>}
      </>}
      
        </Row> 
            </TabPane>
            </Tabs>


</div>
        

      {/* Render pagination component */}
      {activeTab == 'Quotations' ? <>
      {currentPageData.length === 0 ? "" : <>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={leadsGetQuation.length}
        pageRangeDisplayed={5} // Number of page links to display
        onChange={handlePageChange}
        prevPageText="Prev"
        nextPageText="Next"
         innerClass="pagination"
        itemClass="page-item"
        linkClass="page-link"
      />
      </>}
      
      </> : <Pagination
        activePage={activePage1}
        itemsCountPerPage={itemsPerPage1}
        totalItemsCount={currentPagePoliciesData?.length}
        pageRangeDisplayed={5} // Number of page links to display
        onChange={handlePageChange1}
        prevPageText="Prev"
        nextPageText="Next"
        innerClass="pagination"
        itemClass="page-item"
        linkClass="page-link"
      />}
      
    </div>

    <BottomNavigation />
    <OonaFooter />
    </>
  );
};

export default CustomerList;
