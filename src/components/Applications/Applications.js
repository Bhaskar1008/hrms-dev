import React, { useEffect, useState } from "react";
import { Card, Row, Col, Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./Applications.css";
import { ProposalTabs } from "./Proposals";
import { Link } from "react-router-dom";
import axios from "axios";
import { Pagination } from "antd";
import FloatButton from "../FloatButton/FloatButton";
import moment from "moment";

// ---- Import Image --- //
import mail_icon from '../../assets/SalesDriveIcon/Mail_Icon.png'


export const Applications = () => {
  const dispatch = useDispatch();
  const [Active, setActive] = useState('')
  const [cardData, setCatdData] = useState([
    { title: "All", filter: 'All', iconurl: "https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/Dark_Gray/Group_11232.png" },
    { title: "Draft Proposal", filter: 'Proposalstarted', iconurl: "https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/Dark_Gray/Group_11229.png " },
    { title: "Logins", filter: 'login', iconurl: "https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/Dark_Gray/Group_11241.png" },
    { title: "Issued", filter: 'issued', iconurl: "https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/Dark_Gray/Group_11242.png" },
    { title: "Rejected", filter: 'rejected', iconurl: "https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/Dark_Gray/Group_11243.png" },
  ]);
  // const [value,setValue]=useState('All')
  const data = [
    { name: 'Shiva Tondon', userId: 'A6041A859', premiumType: 'Limited', policy: 20, draftDate: '3/22/2022', amount: 160000, btnType: 'Track Proposal' },
    { name: 'Rameez Mirza', userId: 'A6041A859', premiumType: 'Limited', policy: 20, draftDate: '3/23/2022', amount: 160000, btnType: 'Track Proposal' },
    { name: 'Danish Hussain', userId: 'A6041A859', premiumType: 'Limited', policy: 20, draftDate: '3/24/2022', amount: 160000, btnType: 'Track Proposal' },
    { name: 'Danish Hussain', userId: 'A6041A859', premiumType: 'Limited', policy: 20, draftDate: '3/24/2022', amount: 160000, btnType: 'Resume', filter: 'Draft Proposal' },
    { name: 'Danish Hussain', userId: 'A6041A859', premiumType: 'Limited', policy: 20, draftDate: '3/24/2022', amount: 160000, btnType: 'Track Proposal' },
    { name: 'Danish Hussain', userId: 'A6041A859', premiumType: 'Limited', policy: 20, draftDate: '3/24/2022', amount: 160000, btnType: 'Track Proposal', filter: 'Rejected' },
  ]
  const [userData, setUserData] = useState(data)
  const [GetData, setGetData] = useState([])
  const [totalPages, setTotalPages] = useState()
  const [bgcolor, setbgColor] = useState(false)
  const [current, setcurrent] = useState(1)
  const [tempArr, setTempArr] = useState([...GetData])
  const getData = async () => {

    const resp = await axios.get(`https://sdrestnode.iorta.in/secure/sd/user/lead_count_async/5df77d17009e273b39cae811`)
    let totalCards = resp.data.data.proposal_count
    getTotalPages(totalCards);
    const res = await axios.get(`https://sdrestnode.iorta.in/secure/sd/user/getAgentproposal/5df77d17009e273b39cae811?proposalStatus=all&skip=0`)
    setGetData(res.data.data[0])
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    changePageNo(current)
  }, [current])
  const changePageNo = async (pageNo) => {
    let skipNo = (pageNo - 1) * 15;
    const res = await axios.get(`https://sdrestnode.iorta.in/secure/sd/user/getAgentproposal/5df77d17009e273b39cae811?proposalStatus=all&skip=${skipNo}`)
    setGetData(res.data.data[0])
  }
  // const [GetCardData, setGetCardData]=useState([])
  // const getCardData= async () => {
  //   const res = await axios.get('https://sdrestnode.iorta.in/secure/sd/user/lead_count_async/5df77d17009e273b39cae811')
  //   setGetCardData(res.data.data.proposal_count)
  // }

  // useEffect(()=>{
  //   getCardData();
  // },[])
  // useEffect(()=>{
  //     if(value!=='All'){
  //         const filtered=GetData.filter((elem)=>elem.proposalStatus === value)
  //         setTempArr(filtered);
  //     }else{
  //       setTempArr(GetData)
  //     }


  // },[value])

  const handleFilter = async (cardName) => {

    setbgColor(true)

    if (cardName === "All") {
      const res = await axios.get('https://sdrestnode.iorta.in/secure/sd/user/getAgentproposal/5df77d17009e273b39cae811?proposalStatus=all&skip=0')
      setGetData(res.data.data[0])
    }
    if (cardName === "Draft Proposal") {
      const res = await axios.get('https://sdrestnode.iorta.in/secure/sd/user/getAgentproposal/5df77d17009e273b39cae811?proposalStatus=Proposalstarted&skip=0')
      setGetData(res.data.data[0])
    }
    if (cardName === "Logins") {
      const res = await axios.get('https://sdrestnode.iorta.in/secure/sd/user/getAgentproposal/5df77d17009e273b39cae811?proposalStatus=login&skip=0')
      setGetData(res.data.data[0])
    }
    if (cardName === "Issued") {
      const res = await axios.get('https://sdrestnode.iorta.in/secure/sd/user/getAgentproposal/5df77d17009e273b39cae811?proposalStatus=issued&skip=0')
      setGetData(res.data.data[0])
    }
    if (cardName === "Rejected") {
      const res = await axios.get('https://sdrestnode.iorta.in/secure/sd/user/getAgentproposal/5df77d17009e273b39cae811?proposalStatus=rejected&skip=0')
      setGetData(res.data.data[0])
    }

  }
  // const  isActive = (cardName)=>{
  //   if(cardName === 'All'){
  //     setColor='blue'
  //   }
  //   if(cardName === 'Draft Proposal'){
  //     setColor='blue'
  //   }
  //   if(cardName === 'Logins'){
  //     setColor='blue'
  //   }
  //   if(cardName === 'Issued'){
  //     setColor='blue'
  //   }
  //   if(cardName === 'Rejected'){
  //     setColor='blue'
  //   }
  // }


  const totalLeads = useSelector((state) => {
    return state.leads.count
  })

  // const isActive = (status)=>{
  //   if(status === 'Proposalstarted'){
  //     setColor='blue'
  //   }
  //   if(status === 'issued'){
  //     setColor='blue'
  //   }
  //   if(status === 'login'){
  //     setColor='blue'
  //   }
  //   if(status === 'rejected'){
  //     setColor='blue'
  //   }
  // }

  function itemRender(cur, type, originalElement) {
    const onPrev = () => {
      setcurrent(current - 1)
    }
    const onNext = () => {
      setcurrent(current + 1)
    }

    if (type === 'prev') {
      return <a current={current} onClick={onPrev} style={{ color: '#1D428A' }}>Prev</a>;
    }
    if (type === 'next') {
      return <a current={current} onClick={onNext} style={{ color: '#1D428A' }}>Next</a>;
    }
    return originalElement;
  }

  const handlePageClick = (page) => {
    setcurrent(page)
  }
  const getTotalPages = (totalCards) => {
    let sumall = totalCards.map(item => item.count).reduce((prev, curr) => prev + curr, 0);
    setTotalPages(sumall)
  }

  
  const handleStatus = (status) => {
    if (status === 'Proposalstarted') {
      return 'Proposal Started'
    }
    if (status === 'issued') {
      return 'Issued'
    }
    if (status === 'login') {
      return 'Login'
    }
    if (status === 'rejected') {
      return 'Rejected'
    }
  }

  const getAvatarName = (name) => {
    var fullName = name.split(' '),
      firstName = fullName[0],
      lastName = fullName[fullName.length - 1];
    let avatar = firstName.match(/\b(\w)/g) + lastName.match(/\b(\w)/g)
    return avatar.toUpperCase()
  }

  // var myObj = JSON.parse({myObj:setGetData.benefitIllustration.premium_due_date}),
  // myDate = new Date(1000*myObj.date_created).toLocaleString();

  return (
    <div className="main-container">

      <div className="site-card-border-less-wrapper container" >
        {cardData.map((item, i) => (


          <div
            key={i}
            className="card"
            bordered={true}
            style={{ backgroundColor: bgcolor ? "blue" : "white" }}
            onClick={() => handleFilter(item.title)}
          >
            <div style={{ textAlign: 'center' }} className="ct-container">1</div>
            <img src={item.iconurl} alt="" className="icons" />
            <p> <b>{item.title}</b> </p>
          </div>
        ))}
      </div>



      <div className="site-card-border-less-wrapper user-container" >
        {GetData.map((item, i) => (


          <Card key={i} className="user-card" bordered={true} style={{ width: '560px', height: 160 }}>
            <Row gutter={[8, 8]}>
              <Col span={6} className="user-icon-col" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Avatar size={58}
                  style={{
                    color: "#f56a00",
                    fontWeight: 'bold',

                    backgroundColor: "#fde3cf",
                  }}
                >
                  {getAvatarName(item.benefitIllustration.NameofLifeAssured)}
                </Avatar>
                <h4 style={{ fontWeight: 'bold', color: 'green', fontSize: '12px', fontFamily: "robotoregular" }}>{handleStatus(item.proposalStatus)}</h4>
              </Col>
              <Col span={16} >
                <Row gutter={[8, 19]} xs={1} md={2}>
                  <Col className="assured-name" span={8}>{item.benefitIllustration.NameofLifeAssured}</Col>
                  <Col className="assured-name" span={8}>{item.benefitIllustration.AdvisorCode}</Col>
                </Row>
                <hr />
                <Row gutter={[6, 16]}>
                  <Col span={8}>
                    <span className="span-title">Premium Type</span>
                    <span className="span-details">{item.benefitIllustration.PremiumType}</span>
                  </Col>
                  <Col span={8}>
                    <span className="span-title">Policy Term</span>
                    <span className="span-details">{item.benefitIllustration.PolicyTerm} Years</span>
                  </Col>
                  <Col span={8}>

                    <span className="span-title">Draft Date</span>
                    <span className="span-details">{new Date(item.benefitIllustration.premium_due_date).toLocaleDateString('in')}</span>
                  </Col>

                  <Col span={8}>
                    <span className="span-title">Premium Amount</span>
                    <span className="span-details">{item.benefitIllustration.annualisedPremium}</span>
                  </Col>

                  <Col span={8} offset={8}>
                    <Link to="master/proposalTabs">
                      {/* <Link to={item.btnType === 'Resume' ? "master/proposalTabs" : "/master/proposalhistory" }> */}
                      <Button
                        onClick={() => dispatch({ type: 'SINGLE_CARD_DATA', payload: item })}
                      >{item.proposalStatus === 'Proposalstarted' ? 'Resume' : 'Track Proposal'}</Button>
                    </Link>
                  </Col>
                </Row>
              </Col>
              <Col className="mail-image-main" span={2}>
                <img src={mail_icon} alt="" className="mail-image" />
              </Col>

            </Row>
          </Card>
        ))}
      </div>
      {/* <div style={{hieght:"3rem",width:'10rem',float:"right"}}> */}
      {/* </div> */}
      <div className="pagination">
        <div className="page-holder">
          <Pagination
            // responsive
            current={current}
            onChange={handlePageClick}
            total={totalPages}
            defaultPageSize={15}
            itemRender={itemRender} />
        </div>
      </div>
    </div>
  );
};
