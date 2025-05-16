import React, {useState,useEffect} from 'react'
import './OonaCustomerListing.css'
import { Button, Row, Col, Avatar, message } from 'antd'
import profile_img from '../../../images/Icon/profile-customer.png'
import {
    DeleteOutlined,
    MessageOutlined,
    MailOutlined,
    PhoneOutlined,
  } from "@ant-design/icons";
import BottomNavigation from '../bottomNavigation/bottomNavigation';
import Pagination from 'react-js-pagination';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions/customerListing";
import { stoageGetter } from "../../../helpers";
import { useHistory } from "react-router-dom";
import OonaFooter from '../OonaFooter/OonaFooter';
import NoRecordsFound from '../../NoRcordsFound/NoRecordsFound';
import FullPageLoader from '../../FullPageLoader/FullPageLoader';

const OonaCustomerListing = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = stoageGetter("user");
    const itemsPerPage = 15;
    const [activePage, setActivePage] = useState(1);
    const [loader, setLoader] = useState(false)

    // const customerPage = [
    //     {date: '12 June 2023', cardButton: 'IMPORTANT', imgData: profile_img, profileName: 'Juan dela Cruz', profileDescri: 'Customer since Feb 2023', proGender: 'Male', birtday: 'Jul 18', policy: 'Auto Comprehensive', proDele: 'Delete', proMess: 'Message', proMail: 'Mail', proPhone: 'Phone', path: '/customer-card-details'},
    //     {date: '12 June 2023', cardButton: 'IMPORTANT', imgData: profile_img, profileName: 'Jully dela Cruz', profileDescri: 'Customer since Feb 2023', proGender: 'Male', birtday: 'Jul 18', policy: 'Auto Comprehensive', proDele: 'Delete', proMess: 'Message', proMail: 'Mail', proPhone: 'Phone'},
    //     {date: '12 June 2023', cardButton: 'IMPORTANT', imgData: profile_img, profileName: 'Jonh dela Cruz', profileDescri: 'Customer since Feb 2023', proGender: 'Male', birtday: 'Jul 18', policy: 'Auto Comprehensive', proDele: 'Delete', proMess: 'Message', proMail: 'Mail', proPhone: 'Phone'},
    //     {date: '12 June 2023', cardButton: 'IMPORTANT', imgData: profile_img, profileName: 'Black Cruz', profileDescri: 'Customer since Feb 2023', proGender: 'Male', birtday: 'Jul 18', policy: 'Auto Comprehensive', proDele: 'Delete', proMess: 'Message', proMail: 'Mail', proPhone: 'Phone'},
    //     {date: '12 June 2023', cardButton: 'IMPORTANT', imgData: profile_img, profileName: 'Leo dela Cruz', profileDescri: 'Customer since Feb 2023', proGender: 'Male', birtday: 'Jul 18', policy: 'Auto Comprehensive', proDele: 'Delete', proMess: 'Message', proMail: 'Mail', proPhone: 'Phone'},
    //     {date: '12 June 2023', cardButton: 'IMPORTANT', imgData: profile_img, profileName: 'Smith dela Cruz', profileDescri: 'Customer since Feb 2023', proGender: 'Male', birtday: 'Jul 18', policy: 'Auto Comprehensive', proDele: 'Delete', proMess: 'Message', proMail: 'Mail', proPhone: 'Phone'},
    // ]

    useEffect(() => {
        // setLoader(true)
        dispatch(actions.fetchAllGetCustomerListing(id, result => {
            console.log("-------------result------------", result);
            if (result?.statusCode === -1) {
              setLoader(false)
            } else {
              setLoader(false)
              message.error(result.data)
            }
          }));
    }, [])

    const leadsDataCustomer = useSelector((state) => state?.customerListingPage?.allCustomerListing);
    let Email = leadsDataCustomer[0]?.email
    let phoneNumber = leadsDataCustomer[0]?.primaryMobile
    console.log("Email-->", Email, phoneNumber);
    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
      };
      // Calculate start and end index for the current page
      const startIndex = (activePage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      // Get the data for the current page
      const currentPageData = leadsDataCustomer.slice(startIndex, endIndex);
     console.log("currentPageData",currentPageData);

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

      const updateHandler = (data, i) => {
        console.log("id---------oonacustomer", data, i);
        // dispatch({ data: data?._id, type: "CURRENT_UPDATING_ID_CUSTOMER" });
        dispatch(actions.currentUpdatingIdFun(data?._id))
        history.push("/customer-card-details");
      };

      const sendEmail = () => {
        window.open(`mailto:${Email}`);
        
    }

  return (
    <>
    <FullPageLoader spinloader={loader} />

        <div className='main-container'>
        <div className="main-heading-customer">
            <h2>My Customers</h2>
            </div>
            {currentPageData?.length == [] ? <>
            <NoRecordsFound />
            </> : <>
            <Row gutter={[16,16]}>
                {currentPageData.map((cardDataCust, index) =>{
                    return <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div className='customer-card-data'>
                    <div className='customer-card-details'>
                            <div className='button-and-daat'>
                                <div className='date--'>
                                    <p>{cardDataCust.date ? cardDataCust.date : "12 June 2023"}</p>
                                </div>
                                
                                <div className='update-button display-flex'>
                                <div className='newbutton--'>
                                    <div>{cardDataCust.cardButton ? cardDataCust.cardButton : "IMPORTANT"}</div>
                                </div>
                                <div  onClick={() => updateHandler(cardDataCust, index)} className='newbutton--1'>
                                    <div>View Details</div>
                                </div>
                                
                                </div>
                            </div>
    
                            <div className='button-and-profile'>
                                <div className='profile--'>
                                    {/* <img src={cardDataCust.imgData} /> */}
                                    <Avatar
                                        style={{
                                            paddingTop: "-40px",
                                            lineHeight: "none",
                                            backgroundColor: getRandomColor(),
                                            
                                        }}
                                        size={{ xl: 40 }}
                                        >
                                        {nameShorter(cardDataCust.firstName + " " + cardDataCust.lastName)}
                                        </Avatar>
                                </div>
                                <div className='profilename--'>
                                    <h3>{cardDataCust.firstName + " " + cardDataCust.lastName}</h3>
                                    <p>{cardDataCust.profileDescri ? cardDataCust.profileDescri : "Customer since Feb 2023"}</p>
                                </div>
                            </div>
                        <hr />
    
                        <div className='button-and-all-details'>
                                <div className='profile--all'>
                                   <p>Gender</p>
                                   <h3>{cardDataCust?.gender === "1" ? "Male" : "Female"}</h3>
                                </div>
                                <div className='profilename--all'>
                                    <p>Birthdate</p>
                                   <h3>{cardDataCust?.dob ? cardDataCust.dob : "-"}</h3>
                                </div>
                                <div className='profilename--all'>
                                    <p>Lead ID</p>
                                   <h3>{cardDataCust?.lead_Id ? cardDataCust?.lead_Id : "-"}</h3>
                                </div>
                            </div>
                        <div className='background-customer'>
                            {/* <div className='delet'>
                                <p><DeleteOutlined style={{color: "#4AC6BB", marginRight: '5px', fontSize: '20px',
        fontWeight: 'bold'}} /></p>
                                <p>{cardDataCust.proDele ? cardDataCust.proDele : "Delete"}</p>
                            </div> */}
                            {/* <div className='delet'>
                                <p><MessageOutlined style={{color: "#4AC6BB", marginRight: '5px', fontSize: '20px',
        fontWeight: 'bold'}} /></p>
                                <p>{cardDataCust.proMess ? cardDataCust.proMess : "Message"}</p>
                            </div> */}
                            <div className='delet' onClick={sendEmail}>
                                <p><MailOutlined style={{color: "#4AC6BB", marginRight: '5px', fontSize: '20px',
        fontWeight: 'bold'}} /></p>
                                <p>{cardDataCust.proMail ? cardDataCust.proMail : "Mail"}</p>
                            </div>
                            <div className="outer">
                              <div className='inner'></div>
                            </div>

                            <div className='delet'>
                                <p><PhoneOutlined style={{color: "#4AC6BB", marginRight: '5px', fontSize: '20px',
        fontWeight: 'bold'}} /></p>
                               
                                <p><a style={{color: '#9180AE'}} href={`tel:${phoneNumber}`}>Phone</a>
                  </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </Col>
                })}
                
            </Row>

            <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={leadsDataCustomer.length}
                pageRangeDisplayed={5} // Number of page links to display
                onChange={handlePageChange}
                prevPageText="Prev"
                nextPageText="Next"
                innerClass="pagination"
                itemClass="page-item"
                linkClass="page-link"
            />
            </>}
            

        </div>
        <div className='navigation-button-down'>
            <BottomNavigation />
            <OonaFooter />
        </div>
    </>
  )
}

export default OonaCustomerListing