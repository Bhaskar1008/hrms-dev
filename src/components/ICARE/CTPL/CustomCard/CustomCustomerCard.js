import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import './CustomCustomerCard.css'
import { Button, Row, Col, Avatar, Form, Select, DatePicker, Input, } from 'antd';
import moment from "moment/moment";

const CustomCustomerCard = ({ dataArray, itemsPerPage }) => {
  const [activePage, setActivePage] = useState(1);
  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

const [size, setSize] = useState("default"); // default is 'middle'
const [mobilenumber, setMobileNumber] = useState("");
const [genderVehicle, setGenderVehicle] = useState("");
const [dateOfBirth, setDateOfBirth] = useState("");

const [searchName, setSearchName] = useState("");
const [filteredCards, setFilteredCards] = useState([]);

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

const OnChangeDobHandler = (date) => {
let newDate = moment(date).valueOf();
const dateFormat = "MM/DD/YYYY"; // Date format
const formattedDate = moment(newDate).format(dateFormat);
setDateOfBirth(formattedDate);
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
  // Calculate start and end index for the current page
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Get the data for the current page
  const currentPageData = dataArray.slice(startIndex, endIndex);

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
      console.log(error);
    }
  };

  


  return (
    <>
    <Row gutter={16}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{padding:'0px'}}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="first name"
                        label="First name"
                      >
                        <Input
                          className="first-name input-box"
                          size="default"
                          maxLength="30"
                          placeholder="First name"
                          value={searchName}
                          onChange={(item) => onChangeMobileNumber(item)}
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="lname"
                        label="Middle Name"
                      >
                        <Input
                          className="first-name input-box"
                          size="default"
                          maxLength="30"
                          placeholder="Middle Name"
                          value={mobilenumber}
                          onChange={(item) => onChangeMobileNumber(item)}
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="last name"
                        label="Last name"
                      >
                        <Input
                          className="first-name input-box"
                          size="default"
                          maxLength="30"
                          placeholder="Last Name"
                          value={mobilenumber}
                          onChange={(item) => onChangeMobileNumber(item)}
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                </Row>

                    <Row gutter={16}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="gender"
                        label="Gender"
                      >
                        <Select
                        style={{width: '100%'}}
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
                        name="dateOfBirth"
                        label="Date of Birth"
                      >
                        <DatePicker
                          placeholder="Date of birth"
                          onChange={OnChangeDobHandler}
                          className="first-name input-box"
                          size="default"
                          value={dateOfBirth}
                          format="MM/DD/YYYY"
                          style={{ width: "100%" }}
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
                  </Row>
    <Row gutter={[16,16]}>
      {currentPageData.map((cardDataCust, index) => {
        return <Col key={index} xs={24} sm={24} md={24} lg={24} xl={24}>
        <div className='customer-card-data customer-card-desktop'>
      <div className='customer-card-details'>
          <div className='button-and-daat'>
              <div className='date--'>
                  <p>{cardDataCust.date}</p>
              </div>
              <div className='newbutton--'>
                  <Button>{cardDataCust.cardButton}</Button>
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
                      {nameShorter(cardDataCust.profileName)}
                      </Avatar>
                      <div className='profilename--'>
                        <h3>{cardDataCust.profileName}</h3>
                        <p>{cardDataCust.profileDescri}</p>
                    </div>
              </div>
              
              <div className='profile--all'>
                 <p>Gender</p>
                 <h3>{cardDataCust.proGender}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Birthdate</p>
                 <h3>{cardDataCust.birtday}</h3>
              </div>
              <div className='profilename--all-class'>
                  <p>Most recent policy</p>
                 <h3>{cardDataCust.policy}</h3>
              </div>
              <div className='profilename--all-class'>
                  <p>Doc Code</p>
                 <h3>{cardDataCust.documentCode}</h3>
              </div>
              <div className='profilename--all-class'>
                  <p>Doc Type</p>
                 <h3>{cardDataCust.DocumentType}</h3>
              </div>
              
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

        <Row gutter={[16,16]}>
                {currentPageData.map((cardDataCust, index) =>{
                    return <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div className='customer-card-data customer-card-mobile'>
                    <div className='customer-card-details'>
                            <div className='button-and-daat'>
                                <div className='date--'>
                                    <p>{cardDataCust.date ? cardDataCust.date : "12 June 2023"}</p>
                                </div>
                                <div className='newbutton--'>
                                    <Button>{cardDataCust.cardButton ? cardDataCust.cardButton : "IMPORTANT"}</Button>
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
                                   <h3>{cardDataCust.gender ? cardDataCust.gender : "-"}</h3>
                                </div>
                                <div className='profilename--all'>
                                    <p>Birthdate</p>
                                   <h3>{cardDataCust.dob ? cardDataCust.dob : "-"}</h3>
                                </div>
                                <div className='profilename--all-class'>
                                    <p>Most recent policy</p>
                                   <h3>{cardDataCust.policy ? cardDataCust.policy : "-"}</h3>
                                </div>
                            </div>
                        {/* <div className='background-customer'>
                            <div className='delet'>
                                <p><DeleteOutlined style={{color: "#4AC6BB", marginRight: '5px', fontSize: '20px',
        fontWeight: 'bold'}} /></p>
                                <p>{cardDataCust.proDele ? cardDataCust.proDele : "Delete"}</p>
                            </div>
                            <div className='delet'>
                                <p><MessageOutlined style={{color: "#4AC6BB", marginRight: '5px', fontSize: '20px',
        fontWeight: 'bold'}} /></p>
                                <p>{cardDataCust.proMess ? cardDataCust.proMess : "Message"}</p>
                            </div>
                            <div className='delet'>
                                <p><MailOutlined style={{color: "#4AC6BB", marginRight: '5px', fontSize: '20px',
        fontWeight: 'bold'}} /></p>
                                <p>{cardDataCust.proMail ? cardDataCust.proMail : "Mail"}</p>
                            </div>
                            <div className='delet'>
                                <p><PhoneOutlined style={{color: "#4AC6BB", marginRight: '5px', fontSize: '20px',
        fontWeight: 'bold'}} /></p>
                                <p>{cardDataCust.proPhone ? cardDataCust.proPhone : "Phone" }</p>
                            </div>
                        </div> */}
                        </div>
                    </div>
                    </Col>
                })}
                
            </Row>

      {/* Render pagination component */}
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={dataArray.length}
        pageRangeDisplayed={5} // Number of page links to display
        onChange={handlePageChange}
        prevPageText="Prev"
        nextPageText="Next"
         innerClass="pagination"
        itemClass="page-item"
        linkClass="page-link"
      />
    </>
  );
};

export default CustomCustomerCard;
