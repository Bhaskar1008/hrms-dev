import React, { useState,useEffect } from 'react';
import { Row, Col, Card, Button, Form, Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { ArrowRightOutlined } from '@ant-design/icons';
import './PrePaymentReview.css';
import MainTabs from '../../components/MainTabs/MainTabs'
import { Link } from 'react-router-dom';
import axios from 'axios';

const tabMenu = [
    {
      id: 'benefitillustrator',
      value: "Benefit Illustrator",
    },
    {
      id: 'proposalfulfilment',
      value: "Proposal Fulfilment"
    },
    {
      id: 'prepaymentreview',
      value: "Pre-payment Review"
    },
    {
      id: 'paymentoptions',
      value: "Payment Options"
    },
    {
        id: 'uploaddocuments',
        value: "Upload Documents"
    },
    {
        id: 'proposalhistory',
        value: "Proposal History"
    },
  
  ];

  
  
  
  //   const [getlifeAssuredDetails,setgetlifeAssuredDetails] = useState();
  const fetchData =async()=>{
      const res = await axios.get('https://sdrestnode.iorta.in/secure/sd/user/getAgentproposal/5df77d17009e273b39cae811?proposalStatus=all&skip=0')
      //   setgetlifeAssuredDetails()
    }
    
    const PrePaymentReview = () => {
      const selector = useSelector((state)=>state.applicationReducer.singleCardData)
    // localStorage.setItem(selector)
    return (

        <div className="prepayment-main">
            <MainTabs
                tabMenu={tabMenu}
                // header="New Lead"
                activeKey="prepaymentreview"
            />
            <div className="prepayment-body">
                <Row gutter={[16, 16]} justify="start">
                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                <div className="div1">
                                    <p className="prepayment-title">Life Assured Details</p>
                                </div>
                                <div className="div2">
                                    <Row justify="center" gutter={[40, 12]}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Name: </text>
                                            <text className="prepayment-text"> {selector.benefitIllustration.NameofLifeAssured} </text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">DOB : </text>
                                            <text className="prepayment-text"> {selector.benefitIllustration.DateofBirthofLifeAssured} </text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Gender : </text>
                                            <text className="prepayment-text">{selector.benefitIllustration.GenderofLifeAssured}</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Mobile No : </text>
                                            <text className="prepayment-text">{selector.personalDetails.MobileNo}</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Email Id : </text>
                                            <text className="prepayment-text"> {selector.personalDetails.EmailID} </text>
                                        </Col> 
                                    </Row>
                                </div>
                            </Col >
                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                <div className="div1">
                                    <p className="prepayment-title">Proposer Details</p>
                                </div>
                                <div className="div2">
                                    <Row justify="center" gutter={[40, 12]}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Name : </text>
                                            <text className="prepayment-text"> {selector.benefitIllustration.NameofLifeAssured}</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">DOB : </text>
                                            <text className="prepayment-text">{selector.benefitIllustration.DateofBirthofLifeAssured}</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Gender : </text>
                                            <text className="prepayment-text"> {selector.benefitIllustration.GenderofLifeAssured} </text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Employee No : </text>
                                            <text className="prepayment-text">{selector.personalDetails.EmployeeId}</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Mobile No : </text>
                                            <text className="prepayment-text">{selector.personalDetails.MobileNo}</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Email Id : </text>
                                            <text className="prepayment-text">{selector.personalDetails.EmailID}</text>
                                        </Col>
                                    </Row>
                                </div>
                            </Col >
                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                <div className="div1">
                                    <p className="prepayment-title">Appointee/Nominee Details</p>
                                </div>
                                <div className="div2">
                                    <Row justify="center" gutter={[40, 12]}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">DOB : </text>
                                            <text className="prepayment-text"> {selector.nomineeDetails.DateofBirth} </text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Gender : </text>
                                            <text className="prepayment-text"> {selector.nomineeDetails.Gender} </text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Mobile No : </text>
                                            <text className="prepayment-text"> {selector.nomineeDetails.MobileNo} </text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Email Id : </text>
                                            <text className="prepayment-text"> {selector.nomineeDetails.EmailID} </text>
                                        </Col>
                                    </Row>
                                </div>
                            </Col >
                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                <div className="div1">
                                    <p className="prepayment-title">Plan Details</p>
                                </div>
                                <div className="div2">
                                    <Row justify="center" gutter={[40, 12]}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Plan Name : </text>
                                            <text className="prepayment-text"> {selector.productId.productName} </text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Plan Code Category : </text>
                                            <text className="prepayment-text">{selector.productId.productCategory}</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Policy Term : </text>
                                            <text className="prepayment-text"> {selector.benefitIllustration.PolicyTerm} </text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Premium Paying Term : </text>
                                            <text className="prepayment-text"> {selector.benefitIllustration.PremiumPayingTerm} </text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Sum Assured : </text>
                                            <text className="prepayment-text"> {selector.benefitIllustration.SumAssured} </text>
                                        </Col>
                                    </Row>
                                </div>
                            </Col >
                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                <div className="div1">
                                    <p className="prepayment-title">Premium Details</p>
                                </div>
                                <div className="div2">
                                    <Row justify="center" gutter={[40, 12]}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Premium Type : </text>
                                            <text className="prepayment-text"> {selector.benefitIllustration.PremiumType} </text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Installment Premium : </text>
                                            <text className="prepayment-text"> {selector.benefitIllustration.InstallmentPremium} </text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Annualized Premium : </text>
                                            <text className="prepayment-text"> {selector.benefitIllustration.annualisedPremium} </text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">ECS/Direct/Debit : </text>
                                            <text className="prepayment-text">{selector.benefitIllustration.MethodofPaymentecs}</text>
                                        </Col>
                                    </Row>
                                </div>
                            </Col >
                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                <div className="div1">
                                    <p className="prepayment-title">Other Details</p>
                                </div>
                                <div className="div2">
                                    <Row justify="center" gutter={[40, 12]}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Name : </text>
                                            <text className="prepayment-text"> {selector.benefitIllustration.AdvisorName} </text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Code   : </text>
                                            <text className="prepayment-text"> {selector.benefitIllustration.AdvisorCode} </text>
                                        </Col>
                                    </Row>
                                </div>
                            </Col >
                        </Row >
                    </Col>
                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                        <Row justify="space-around" gutter={['', 24]}>
                            <Col className="prepayment-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                <Form >
                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                        <Col>
                                            <Link to="pre-previous-btn">
                                            <Button className="prepaymentreview-btn1">Previous</Button>
                                            </Link>
                                        </Col>
                                        <Col >
                                        
                                            <Button className="prepaymentreview-btn">Proceed
                                              
                                                <ArrowRightOutlined
                                                    style={{
                                                        marginTop: "6px"
                                                    }}
                                                />
                                            </Button><br />
                                          
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

        </div >
    )
}
export default PrePaymentReview;