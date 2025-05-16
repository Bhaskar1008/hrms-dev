import React, { useEffect, useState } from "react";
import "./primiumcomp.css";
import icon1 from "../../../assets/ihc_icon/totalrenewal.png";
import icon2 from "../../../assets/ihc_icon/premimum.png";
import icon3 from "../../../assets/ihc_icon/renewable.png";
import icon4 from "../../../assets/ihc_icon/expiring.png";

import { LoadingOutlined } from '@ant-design/icons';
import { Row, Col, Card ,Spin} from "antd";
import { stoageGetter } from "../../../helpers";
import axiosRequest from "../../../axios-request/request.methods";
import { useDispatch, useSelector } from "react-redux";
import FullPageLoader from "../../FullPageLoader/FullPageLoader";
import * as actions from "../../../store/actions";

const Premimumcompo = () => {
  const dispatch = useDispatch();

  const [productionData, setProductionData] = useState("0");
  const [premiumData, setPremiumData] = useState("0");
  const [renewData, setRenewData] = useState("0");
  const [expiryData, setExpiryData] = useState("0");
  const [loading, setLoading] = useState(false);
  const [totalptremiumload, settotalptremiumload] = useState(false);
  const [premiumdue, setpremiumdue] = useState(false);
  const [forrenewal, setforrenewal] = useState(false);
  const [expiringqote, setexpiringqote] = useState(false);

  let login_user_data = stoageGetter("user");
  const AgentCodeFromSelect = useSelector(
    (state) => state?.ctplqoutation?.formData?.agentCode
  );
  let agentCode =
    login_user_data?.channelCode?.channelCode === "CH1"
      ? AgentCodeFromSelect
      : login_user_data?.agentCode;
  // premium

  const getAllDashBoardData = useSelector(
    (state) => state?.DashboardPremiumData?.all_PremiumData
  );

  const [userInformation,setuserInformation] = useState([
    { name: "Total Premiums", price: '0', icon: icon1 },
    { name: "Premiums Due", price: '0', icon: icon2 },
    { name: "For Renewal", price: '0', icon: icon3 },
    { name: "Expiring quotes",price: '0', icon: icon3 },
  ])



   const fetchProductionData = async () => {
    setLoading(true);
    try {
      const response = await axiosRequest.get(
        `user/agent/all/dashbord/data?agentCode=${agentCode}`
      );
      if (response?.length !== 0) {
        if (response?.statusCode === -1) {
          setLoading(false);
          const storeReponseData = response?.data
          console.log("storeReponseData", storeReponseData);
          dispatch(actions.GetDashboardPremiumStore(storeReponseData))
          // let myPre = parseFloat(response?.data?.toatlY2YProduction).toFixed(0);
          // setProductionData(myPre);
          if (Object.keys(storeReponseData).length !== 0) {
            setuserInformation([
              { name: "Total Premiums", price: Math.round(storeReponseData?.getAgnetYear2YearProduction?.toatlY2YProduction), icon: icon1 },
              { name: "Premiums Due", price: Math.round(storeReponseData?.getAgentPrimiumDue?.count), icon: icon2 },
              { name: "For Renewal", price: Math.round(storeReponseData?.getAgentCountForRenewalPolciy?.count), icon: icon3 },
              { name: "Expiring quotes", price: Math.round(storeReponseData?.getAgentExpiringQuote?.count), icon: icon4 },
            ])
          }
          
        }else{
          setLoading(false);
          setProductionData("0");
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error ", error);
      setLoading(false);
    }
  }
  
  

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 20,
        color:'#472c77',
        fontWeight:700,
      }}
      spin
    />
  );

  const checkdata = (data) =>{
    if(data > 0 || data > '0'){
      return false
    }else {
      return true
    }
  }

  const pricedata = (price)=>{
    if(login_user_data?.channelCode?.channelCode === "CH1"){
      return 0
    }else{
      return price
    }
  }

  const addThousandSeparator = (number)=> {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    if(login_user_data?.channelCode?.channelCode !== "CH1" && Object.keys(getAllDashBoardData).length === 0){
    fetchProductionData();
    }
    setuserInformation([
    { name: "Total Premiums", price: Math.round(getAllDashBoardData?.getAgnetYear2YearProduction?.toatlY2YProduction) ? Math.round(getAllDashBoardData?.getAgnetYear2YearProduction?.toatlY2YProduction) : '0', icon: icon1 },
    { name: "Premiums Due", price: Math.round(getAllDashBoardData?.getAgentPrimiumDue?.count) ? Math.round(getAllDashBoardData?.getAgentPrimiumDue?.count) : '0', icon: icon2 },
    { name: "For Renewal", price: Math.round(getAllDashBoardData?.getAgentCountForRenewalPolciy?.count) ? Math.round(getAllDashBoardData?.getAgentCountForRenewalPolciy?.count) : '0', icon: icon3 },
    { name: "Expiring quotes", price: Math.round(getAllDashBoardData?.getAgentExpiringQuote?.count) ? Math.round(getAllDashBoardData?.getAgentExpiringQuote?.count) : '0', icon: icon4 },
    ])
    // fetchpremiumData();
    // fetchRenewData();
    // fetchExpiryData();

  }, []);


  

  return (
    <>
 
      <div className="user-card">
        <div className="card-information">
          <Row gutter={[16, 16]}>
            {userInformation.map((userInfo, index) => {
              return (
                <Col key={index} xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Card>
                    <div className="user-card-parent">
                      <div className="parent-user">
                        <div className="child-user-card">
                          <div>
                            <p>{userInfo.name}</p>
                          </div>

                          <div>
                            <img src={userInfo.icon} title="Icons" />
                          </div>
                        </div>
                        
                        {loading === true ?
                          <div style={{display:'flex',
                                      alignItems:'center',
                                      justifyContent:'center',
                                      marginTop: '-11px'}}>
                                  <Spin spinning={loading} indicator={antIcon}></Spin> 
                          </div>:
                        <h4>{addThousandSeparator(userInfo.price)}</h4>
                        }
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
           
          </Row>
        </div>
      </div>
    </>
  );
};

export default Premimumcompo;
