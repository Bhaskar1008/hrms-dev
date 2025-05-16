import React,{useEffect,useState } from 'react';
import { Card, Col, Row,Avatar } from 'antd';
import { Button,message,Modal } from 'antd';
import { PlusOutlined, FileTextOutlined,ShareAltOutlined } from '@ant-design/icons';
import {useHistory,useLocation } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { useDispatch,useSelector } from 'react-redux';
import Moment from "moment";
import './RenewalDetails.css';
import axios from '../../axios-manipal';
const RenewalDetails = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [show, setShow] = useState(false);
    const location = useLocation();
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        let proposer_ID_refs = location?.state?.proposer_ID_refs
        dispatch(actions.fetchRenewalDetails(proposer_ID_refs))
     }, [location,dispatch]);
     const renewalDetails = useSelector((state)=>state.renewals.details)
    let avatar = renewalDetails?.proposerName.match(/\b(\w)/g)
    const showContent = ()=>{
        if(!show) {
            setShow(true);
        }
        else {
            setShow(false);
        }
    }
    
    const addLeadHandler = ()=>{
        axios.get(`cross_sell_check/${renewalDetails?.BRM_Code?._id}?PolicyNumber=${renewalDetails?.proposer_ID}&CustomerId=${renewalDetails.proposer_ID_refs?._id}`).then(resp=>{
            if(resp?.data?.statusCode === -1){
                let f_name = renewalDetails?.proposerName.split(' ')[0]
                let l_name = renewalDetails?.proposerName.substring(f_name.length).trim()
                let payload = {
                    CustomerId: renewalDetails.proposer_ID_refs?._id,
                    PolicyNumber: renewalDetails?.proposer_ID,
                    city: renewalDetails.proposer_ID_refs?.City,
                    customerId: renewalDetails.proposer_ID_refs?._id,
                    dob: renewalDetails.proposer_ID_refs?.date_of_birth,
                    email: renewalDetails.proposer_ID_refs?.customer_email_id,
                    existingCustomerFlag: "yes",
                    firstName: f_name,
                    lastName: l_name,
                    leadStatus: "newleadentery",
                    leadType: "New Business",
                    lead_Creator_Id: renewalDetails?.BRM_Code?._id,
                    lead_Owner_Id: renewalDetails?.BRM_Code?._id,
                    line1: renewalDetails.proposer_ID_refs.customerAddress,
                    line2: renewalDetails.proposer_ID_refs.address_2,
                    maritalStatus: renewalDetails.proposer_ID_refs?.marital_status,
                    pincode: renewalDetails.proposer_ID_refs?.marital_status,
                    primaryMobile: renewalDetails.proposer_ID_refs?.customerContactNumber,
                    secondaryMobile: renewalDetails.proposer_ID_refs?.secondaryTelephone,
                    user_id: renewalDetails?.BRM_Code?._id                                                                    
                }
                axios.post(`addlead`,payload).then(resp=>{
                    if (resp?.data?.statusCode === -1){
                        message.success("Lead Added Successfully")
                        dispatch(actions.storeLead(resp?.data?.data[0]))
                        history.push('/leadmasterpage/statuslead')
                    }
                    else{
                        message.warning("Please Update The Lead Status")
                    }
                })
            }
            else if (resp?.data?.statusCode === 3721){
                dispatch(actions.storeLead(resp?.data?.data[0]))
                history.push('/leadmasterpage/statuslead')
            }
        })
    }
   const updateRenewalHandler = ()=>{
       if(renewalDetails.policy_status === 'Paid'){
        message.warning("This policy status is marked as paid, please update status of policies in unpaid section")
       }
       else if (renewalDetails.policy_status === 'Lapsed'){
        message.warning("This policy status is marked as lapsed, please update status of policies in unpaid section")
       }
       else {
        history.push('/leadmasterpage/statuslead')
    }
   }
   const showModal = () => {
    if (renewalDetails.policy_status === 'Lapsed'){
        message.warning("Policy has been marked as lapsed, please contact customers from unpaid list")
    }
    else {
        setIsModalVisible(true);
    }
  };
  let messageBody = `Thank you for choosing to renew your Manipal Cigna Health Insurance Policy. Your renewal options will be available once you click on the link${renewalDetails?.paymentLink}`
  const handleOk = () => {
    setIsModalVisible(false);
    axios.get(`send_sms_mchi?sms_body=${messageBody}&country_cd=${91}&dest=${renewalDetails?.customerContactNumber}&emailto=${renewalDetails?.proposer_ID_refs?.customer_email_id}&customerName=${renewalDetails?.proposerName}&policyno=${renewalDetails?.proposer_ID}`).then(resp=>{
        if(resp?.data?.statusCode === -1){
            message.success('Payment link SMS and email have been sent to customer');
        }
    }).catch(err=>{
        console.log("share payment link error",err)
    })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
    return (
        <>
        {renewalDetails&&(<>
            <div className="header">
            <Row >
                <Col><h1>{renewalDetails?.proposerName}</h1></Col>
            </Row>
            <div style={{padding: '0 3%',paddingBottom:'30px',marginLeft: '-15px'}}>
                    <Row className="tabs">
                        <Col span={4}><Button onClick={updateRenewalHandler} className="primaryBtn" icon={< FileTextOutlined style={{color:'#00ACC1'}}  />}>Update Renewal Status</Button></Col>
                        <Col span={4}><Button onClick={addLeadHandler} className="secondaryBtn" icon={<PlusOutlined style={{color:'#00ACC1'}}  />}>Add as Cross Sell Lead</Button></Col>
                    </Row>
                </div>
            </div>
            <div className="site-card-wrapper" style={{padding:'25px'}}>
                <Row gutter={16}>
                <Col span={8}>
                    <Card className="main-cards">
                    <p className="card-heading">Personal Details</p>
                    <div className="avatar-and-status name">
                        <Avatar style={{backgroundColor:'#007F8F'}} size={{xl: 50}}>{avatar}</Avatar>
                       <div className="nameInfo">
                       <div style={{color:'#78849E',marginRight:'115px'}}>{renewalDetails?.proposerName}</div>
                        <div>Proposer ID ({renewalDetails?.proposer_ID})</div>
                       </div>
                    </div>
                    <p>Telephone No : -</p>
                    <hr/>
                    <p>Mobile No. : {renewalDetails.customerContactNumber}</p>
                    <hr/>
                    <p>Email ID : {renewalDetails.proposer_ID_refs.customer_email_id}</p>
                    <hr/>
                    <p>Date of Birth : {renewalDetails.date_of_birth}</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="main-cards">
                    <p className="card-heading">Policy Details</p>
                    <p>BRM_Code  : {renewalDetails.BRM_Code.agent_id}</p>
                    <p>Partners / Distributor Name : {renewalDetails.partnersDistributorName}</p>
                    <p>Policy Servicing Branch : {renewalDetails.policyServicingBranch}</p>
                    <p>Zone : {renewalDetails.Location}</p>
                    <p>Proposer_ID : {renewalDetails.proposer_ID}</p>
                    <p>Policy No : {renewalDetails.policyNo}</p>
                    <p>Product Category : {renewalDetails.productCategory}</p>
                    <p>Policy Type : {renewalDetails.policyType}</p>
                    <p>Policy Status : {renewalDetails.policy_status}</p>
                    <p>Claim Flag : {renewalDetails.claimFlag}</p>
                    <p>Current Sum Assured : {renewalDetails.currentSumAssured}</p>
                    <p>Cumulative Bonus : {renewalDetails.cumulativeBonus}</p>
                    <p>Renewal Time : {renewalDetails.renewalTime}</p>
                    <p>Payment Link : <a href={renewalDetails.paymentLink} target="_blank">{renewalDetails.paymentLink}</a> <span onClick={showModal} style={{marginLeft:'50px',borderRadius:'50px',backgroundColor:'#00ACC1',padding:'8px',color:'#fff',cursor:'pointer'}}><ShareAltOutlined  /></span></p>
                    {show && (
                        <span>
                        <p>Last Yr - Net Premium : {renewalDetails.lastYearNetPremium}</p>
                        <p>Policy Start Date : {renewalDetails.policyStartDate}</p>
                        <p>Policy End Date : {renewalDetails.policyEndDate}</p>
                        <p>Renewal Start Date : { Moment(renewalDetails.renewalStartDate).format("D MMM YYYY")}</p>
                        <p>Grace End Date : { Moment(renewalDetails.graceEndDate).format("D MMM YYYY")}</p>
                        <p>Recurring payment flag :  {renewalDetails.RecurringPaymentFlag}</p>
                        <p>Premium for 1 Year : {renewalDetails.PremiumOneYear}</p>
                        <p>Premium for 2 Years : {renewalDetails.PremiumTwoYear}</p>
                        <p>Premium for 3 Year : {renewalDetails.PremiumThreeYear}</p>
                        <p>Upsell flag : {renewalDetails.upsellFlag}</p>
                        <p>Premium for level 1 Upsell : {renewalDetails.UPSELLOnePRM}</p>
                        <p>Premium for level 2 Upsell : {renewalDetails.UPSELLTwoPRM}</p>
                        <p>Next best offer : {renewalDetails.nextBestOffer}</p>
                        </span> 
                    )}
                    <p style={{textAlign:'center',cursor:'pointer',marginBottom:'-18px',backgroundColor:'#F7F7F7'}} onClick={showContent}>{show === false?'Show More ↓':'Show Less ↑'} </p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="main-cards">
                    <p className="card-heading">Recommended Products</p>
                    <p>Recommended Product 1 : {renewalDetails.proposer_ID_refs.recommendedProduct1}</p>
                    <p>Recommended Product 2 : {renewalDetails.proposer_ID_refs.recommendedProduct2}</p>
                    </Card>
                    <Card className="main-cards" style={{marginTop:'15px'}}>
                    <p>Address Details</p>
                    <p>Address Line 1 : {renewalDetails.proposer_ID_refs.customerAddress}</p>
                    <p>Address Line 2 : {renewalDetails.proposer_ID_refs.address_2}</p>
                    <p>City : {renewalDetails.proposer_ID_refs.City}</p>
                    <p>Pincode : {renewalDetails.proposer_ID_refs.pincode}</p>
                    </Card>
                </Col>
                </Row>
            </div>
     
        </>)}

        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Do you wish to send payment link to the customer?</p>
      </Modal>
           
        </>
    )
}

export default RenewalDetails;