import React, { useState,useEffect } from "react";
import axios from "axios";
import "./Proposals.css";
import { Radio, Button, DatePicker } from "antd";
import "antd/dist/antd.css";
import { Row, Col, Card, Form, Tabs } from "antd";
import { ArrowRightOutlined, ConsoleSqlOutlined } from "@ant-design/icons";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import ProposalFulfilment from "../ProposalFulfilment/ProposalFulfilment";
// import "./Applications.css";
import MainTabs from "../MainTabs/MainTabs";
import { useSelector } from "react-redux";
import { get } from "jquery";

export const ProposalTabs = () => {
  // const location = useLocation();
  // const { recorddata } = location.state;
  const tabMenu = [
    {
      id: "benefitillustrator",
      value: "Benefit Illustrator",
    },
    {
      id: "proposalfulfilment",
      value: "Proposal Fulfilment",
    },
    {
      id: "prepaymentreview",
      value: "Pre-payment Review",
    },
    {
      id: "paymentoptions",
      value: "Payment Options",
    },
    {
      id: "uploaddocuments",
      value: "Upload Documents",
    },
    {
      id: "proposalhistory",
      value: "Proposal History",
    },
  ];
  const [BIdata,setBIdata]=useState([])

  const selector = useSelector((state)=>state.applicationReducer.singleCardData)
  const BIselector = useSelector((state)=>state.BICardReducer.BICardData)
  useEffect(()=>{
    getBIdata();
  },[])
  const getBIdata=async()=>{
    const resp=await axios.get("https://sdrestnode.iorta.in/secure/sd/user/getAgentproposal/5df77d17009e273b39cae811?proposalStatus=all&skip=0")
    setBIdata(resp.data.data[0])
    
  }
  // useEffect(()=>{

    const filteredBI = BIdata.filter((item)=>item.leadId._id === BIselector._id)
  // },[BIselector])


  // const biData=useSelector((state)=>state.BICardReducer.BICardData)

//   const [generateBI,setGenerateBI]=useState(
//     {
//       CFRType: selector.proposalStatus,
//       ClientID: "1234",
//       ClientName:selector.benefitIllustration.NameofLifeAssured,
//       Draft_date: 1657215233679,
//       PlanName: selector.productId.productName,
//       PremiumAmount:selector.benefitIllustration.annualisedPremium,
//       leadId:selector.leadId.lead_Id,
//       notification_body:selector.benefitIllustration.NameofLifeAssured+"|A7442F984|Deadline:1657215233678|07/14/2022",
//       notification_subtype: "new",
//       notification_type: "applications",
//       proposal_Id: selector._id,
//     }
//   )
//   const handleBIpost= () => {
//      axios.post('https://sdrestnode.iorta.in/secure/sd/user/sendnotification/5df77d17009e273b39cae811',generateBI)
//   }
//  useEffect(()=>{

//   handleBIpost();

//  },[handleBIpost])
      
  // const [getBenifitIllustratorData, setGetBenifitIllustratorData] = useState([]);
  // const getData = async () => {
  //   const res = await axios.get(
  //     "https://sdrestnode.iorta.in/secure/sd/user/getProposal/62600602d9cf413d6041a980"
  //   );
  //   setGetBenifitIllustratorData(res.data.data[0].benefitIllustration);
  // };
  

  // useEffect(() => {
  //   getData();
  // }, []);

  // const [cardData, setCatdData] = useState([
  //     { title: "Benefit Illustrator", iconurl:"https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/Dark_Gray/Group_11232.png"},
  //     { title: "Proposal Fulfilment", iconurl:"https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/Dark_Gray/Group_11229.png"},
  //     { title: "Pre-payment Review", iconurl:"https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/Dark_Gray/Group_11231.png"},
  //     { title: "Payment Option", iconurl:"https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/Dark_Gray/Group_11239.png"},
  //     { title: "Documents Upload", iconurl:"https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/Dark_Gray/Group_11237.png"},
  //     { title: "Proposal History", iconurl:"https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/White/Group_11249.png"},
  //   ]);
    // const userData = useSelector((state)=>state.applicationReducer.singleCardData)
  return (
      
    <div className="proposal-main">
        
      <MainTabs
        tabMenu={tabMenu}
        // header="New Lead"
        activeKey="benefitillustrator"
      />
      {/* <div className="site-card-border-less-wrapper container">
        {cardData.map((item, i) => (
            
          <div
            key={i}
            className="card"
            bordered={true}

            >
                <img src={item.iconurl} alt="" className="icons" />
            <p>{item.title}</p>
            
          </div>
        ))} */}
      {/* </div> */}
      
      <div className="benefit-illustrator">
        <div className="benefit-illustrator-first">
          <div
            style={{
              width: "100%",
              fontSize: "16px",
              fontFamily: "robotregular",
              padding: "2rem 0rem 0rem 1rem",
            }}
          >
            <p>
              {" "}
              <u>
                {" "}
                <b> Enter Details </b>{" "}
              </u>{" "}
            </p>
          </div>

          <div className="input-div">
              
            <p className="p-title">Advisor Name</p>
            <input
              style={{ backgroundColor: "#EFEFEF4D" }}
              className="input-container"
              type="text"
              name=""
              defaultValue={selector ? selector.benefitIllustration ? selector.benefitIllustration.AdvisorName : '' : "" }
              id=""
            />
          </div>
          <div className="input-div">
            <p className="p-title">Advisor Code</p>
            <input
              style={{ backgroundColor: "#EFEFEF4D" }}
              className="input-container"
              type="text"
              name=""
              defaultValue={selector ? selector.benefitIllustration ? selector.benefitIllustration.AdvisorCode:"": ""   }
              id=""
            />
          </div>
          <div className="input-div">
            <p className="p-title">Select Calculator Type</p>
            <select defaultValue={selector ? selector.benefitIllustration ? selector.benefitIllustration.CalculatorType:"": ""   } className="input-container">
              <option >Select Type</option>
              <option >Sum Assured to Premium</option>
              <option >Premium to Sum Assured</option>
            </select>
          </div>
          <div className="input-div">
            <p className="p-title">Gender of Life Assured</p>
            <Radio.Group defaultValue={selector ? selector.benefitIllustration ? selector.benefitIllustration.GenderofLifeAssured:"": "" } style={{ width: "18rem" }}>
              <Radio.Button value={'Male'} >Male</Radio.Button>
              <Radio.Button value={'Female'} >Female</Radio.Button>
              <Radio.Button value={'Other'} >Other</Radio.Button>
            </Radio.Group>
          </div>

          <div className="input-div">
            <p className="p-title">Name of Life Assured</p>
            <input type="text" className="input-container" defaultValue={selector ? selector.benefitIllustration ? selector.benefitIllustration.NameofLifeAssured:"": ""} />
          </div>

          <div className="input-div">
            <p className="p-title">Date of Birth of Life Assured</p>
            <DatePicker defaultValue={selector ? selector.benefitIllustration ? selector.benefitIllustration.DateofBirthofLifeAssured:"": ""  } className="input-container" />
          </div>

          <div className="input-div">
            <p className="p-title">Martial Status</p>
            <select defaultValue={selector ? selector.benefitIllustration ? selector.benefitIllustration.maritalStatus:"": ""  } className="input-container">
              <option >Select</option>
              <option >Single</option>
              <option >Married</option>
              <option >Divorced</option>
              <option >Window</option>
            </select>
          </div>

          <div className="input-div">
            <p className="p-title">Policy Term</p>
            <select defaultValue={selector ? selector.benefitIllustration ? selector.benefitIllustration.PolicyTerm:"": ""  } className="input-container">
              <option value={1} >Select</option>
              <option value={2} >5</option>
              <option value={3} >10</option>
              <option value={4} >15</option>
              <option value={5} >20</option>
              <option value={6} >25</option>
            </select>
          </div>

          <div className="input-div">
            <p className="p-title">Premium Type</p>
            <select defaultValue={selector ? selector.benefitIllustration ? selector.benefitIllustration.PremiumType:"": "" } className="input-container">
              <option >Select</option>
              <option >Regular</option>
              <option >Limited</option>
            </select>
          </div>

          <div className="input-div">
            <p className="p-title">Sum Assured</p>
            <input defaultValue={selector ? selector.benefitIllustration ? selector.benefitIllustration.SumAssured:"": "" } className="input-container" type="number" />
          </div>

          <div className="input-div">
            <p className="p-title">Death Benefit Option</p>
            <select defaultValue={selector ? selector.benefitIllustration ? selector.benefitIllustration.DeathBenefitOption:"": "" } className="input-container">
              <option >Select</option>
              <option >Option 1</option>
              <option >Option 2</option>
            </select>
          </div>

          <div className="input-div">
            <p className="p-title">Age Proof</p>
            <select defaultValue={selector ? selector.benefitIllustration ? selector.benefitIllustration.AgeProof:"": ""  } className="input-container">
              <option >Select</option>
              <option >Standard</option>
              <option >Non Standard</option>
            </select>
          </div>

          <div className="input-div">
            <p className="p-title">Annuity Frequency</p>
            <select defaultValue={selector ? selector.benefitIllustration ? selector.benefitIllustration.AnnuityFrequency:"": ""  } className="input-container">
              <option >Select</option>
              <option >Yearly</option>
              <option >Half-Yearly</option>
              <option >Quarterly</option>
              <option >Monthly</option>
            </select>
          </div>

          <div className="input-div">
            <p className="p-title">Annuity Option</p>
            <select defaultValue={selector ? selector.benefitIllustration ? selector.benefitIllustration.AnnuityOption:"": ""  } className="input-container">
              <option >Select</option>
              <option >Life Annuity</option>
              <option >Life Annuity with ROP</option>
            </select>
          </div>

          <div className="input-div">
            <p className="p-title">Do you want to add riders to this plan</p>
            <Radio.Group defaultChecked={selector ? selector.benefitIllustration ? selector.benefitIllustration.DoyouwanttoaddRiderstothisplan:"": "" }>
            <Radio.Button value={1} style={{ margin: "10px" }} type="radio" name="rider" id="" >
            Yes </Radio.Button>
            <Radio.Button
              style={{ margin: "10px 10px 0px 50px"}}
              type="radio"
              name="rider"
              value={2}
              id=""
            >
            No
            </Radio.Button>
            </Radio.Group>
          </div>
        </div>

        <div className="benefit-illustrator-second">
          <div
            className="benefit-illustrator-summary"
            style={{
              fontSize: "16px",
              fontFamily: "robotegular",
              padding: "2rem 0rem 0rem 10px ",
            }}
          >
            <b>
              <u>Summary</u>{" "}
            </b>{" "}
            <br />
          </div>
          <div style={{ padding: "5px" }}>
            <p className="p-title2">Plan Option</p>
            <b className="p-details">{selector ? selector.benefitIllustration ? selector.productId.productName:"": "" }</b>
            <hr />
            <p className="p-title2">Policy Term</p>
            <b className="p-details">{selector ? selector.benefitIllustration ? selector.benefitIllustration.PolicyTerm:"": ""  }</b>
            <hr />
            <p className="p-title2">Premium Paying Term</p>
            <b className="p-details"> {selector ? selector.benefitIllustration ? selector.benefitIllustration.PremiumPayingTerm:"": ""  } years</b>
            <hr />
            <p className="p-title2">Annualised Premium</p>
            <b className="p-details">{selector ? selector.benefitIllustration ? selector.benefitIllustration.annualisedPremium:"": "" } </b>
            <hr />
            <p className="p-title2">Sum Assured</p>
            <b className="p-details"> {selector ? selector.benefitIllustration ? selector.benefitIllustration.SumAssured:"": ""} </b>
            <hr />
            <p className="p-title2">Payout at Maturity</p>
            <b className="p-details">₹ 0</b>
            <hr />
            <p className="p-title2">Minimum Payout on Death</p>
            <b className="p-details">₹ 0</b>
            <hr />
          </div>
        </div>
      </div>
      <div>
        <div style={{marginLeft:'1.4rem'}} >

      <Col
        
          // xs={{ order: 1}}
          xs={15}
          sm={16}
          // md={16}
          // lg={14}
          // lg={{ order: 2 }}
          // xl={{ order: 2 }}
          span={12}
        >
          <Row justify="space-around" gutter={["", 22]}>
            <Col
              className="prepayment-card"
              xs={22}
              sm={22}
              md={22}
              lg={22}
              xl={23}
              span={23}
            >
              <Form>
                <Row
                  justify="space-between"
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                >
                  <Col>
                    
                      <Button className="prepaymentreview-btn1">
                        Generate BI
                      </Button>
                    
                  </Col>
                  <Col>
                  
                    <Button className="prepaymentreview-btn">
                      Calculate
                    </Button>
                   
                    <br />
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
        </div>
            <Col style={{marginBottom:'10px'}}
            >

            </Col>
           
        {/* <Col >
        <Row className="generate-BI" >
          <Col>
            <Button className="BI-Btn" >Generate BI</Button>
          </Col>
          <Col>
            <Button className="BI-Btn">Calculate</Button>
          </Col>
        </Row>
        </Col> */}
        <Col
          xs={{ order: 2 }}
          sm={24}
          md={24}
          lg={{ order: 2 }}
          xl={{ order: 2 }}
          span={22}
        >
          <Row justify="space-around" gutter={["", 24]}>
            <Col
              className="prepayment-card"
              xs={22}
              sm={22}
              md={22}
              lg={22}
              xl={23}
              span={23}
            >
              <Form>
                <Row
                  justify="space-between"
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                >
                  <Col>
                    {/* <Link to="/applications">
                      <Button className="prepaymentreview-btn1">
                        Previous
                      </Button>
                    </Link> */}
                  </Col>
                  <Col>
                  <Link to="/PropsalFulfilment">
                    <Button className="prepaymentreview-btn">
                      Proceed
                      <ArrowRightOutlined
                        style={{
                          marginTop: "6px",
                        }}
                      />
                    </Button>
                    </Link>
                    <br />
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
      </div>
    </div>
  );
};
