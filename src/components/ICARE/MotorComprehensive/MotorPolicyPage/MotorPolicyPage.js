import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./MotorPolicyPage.css";
import * as actions from "../../../../store/actions";
import axiosRequest from "../../../../axios-request/request.methods";
import { Row, Col, Button, Select, Form, message, Upload, Drawer } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import _ from "lodash";
import group_img from "../../../../images/Icon/Group.png";
import indivi from "../../../../images/Icon/indivi.png";
import img3 from "../../../../images/policyGroup/copy.png";
import img4 from "../../../../images/sharableLinkd_img/tap .png";
import MessageEmail from "../../../ICARE/SharableLink/components/messageEmail";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import apiConfig from "../../../../config/api.config";
import { stoageGetter } from "../../../../helpers";
import { CloseOutlined } from '@ant-design/icons';
// this is this is my function
export const DrawerFunction = ({ onClose, showDrawer,isfromprofile}) => {
  console.log("showDrawer----", showDrawer,isfromprofile);
  const { baseURL } = apiConfig;
  let userData = stoageGetter("user");
  const dispatch = useDispatch();

  const getAgentCode = userData?.agentCode;
  const channelCode = userData?.channelCode;
  let MobileNumberOfUser = userData?.mobileNo

  const userId = useSelector((state) => state.login.user.id)
  const [linkUrl, setlinkUrl] = useState("")

  const [lasAgent, setLasAgent] = useState(false);
  const [mboAgent, setMboAgent] = useState(false);
  const [opeshowDrawer, setopeshowDrawer] = useState(false);
  const [loader, setLoader] = useState(false);
  
  const [commercialStructure, setCommercialStructure] = useState("")
  console.log("commercialStructure----", commercialStructure)

  const handleDrawerClose = () => {

    setLasAgent(false);
    setMboAgent(false);
    if (onClose) {
      onClosepopup();
    }
  };

  const onclickNewFunctionSingle = (data) =>{
    console.log("data-----single", data);
    dispatch(actions.GetCommercialValue(data));

  }
  const handledrawerOpen = () => {
    setopeshowDrawer(true);
  };
  const onClosepopup = () => {
    setopeshowDrawer(false);
  };
  const onclickNewFunction = (data, index) =>{
    console.log("index---", data, index);
    dispatch(actions.GetCommercialValue(data));
    for (let i = 0; i < commercialStructure.length; i++) {
      if (i == index) {
        commercialStructure[i].isActive = true
      }else{
        commercialStructure[i].isActive = false
      }
     }

  }

  useEffect(() => {
    let url1 = `user/lov?name=CommStructure&AgentCode=${getAgentCode}`;
    if (channelCode.channelCode === "CH1") {
      url1 = `user/travel/commercialStructures`;
    } else {
    //   getGroupPolicy(getAgentCode);
    //   getSubAgentList(getAgentCode);
    }
    setLoader(true);
    dispatch(actions.fetchAllCommercialStructure(url1, result =>{
      if (result.statusCode === -1) {
        const initialArr = result?.data?.lov
        initialArr.forEach(v => {v.isActive = false;});
        setCommercialStructure(initialArr)
        console.log("data==========>>>",result?.data?.lov)
        if(result?.data?.lov?.length == 1){
          setLoader(true);
          let comercial = result?.data?.lov[0]
          callApiWithJwt(comercial)
          dispatch(actions.GetCommercialValue(comercial));
        }else{
          setLoader(false);
        }
      }
        
    }));
  }, [])


  async function callApiWithJwt(comercial) {
    
    const formData = {
        mobileNumber: MobileNumberOfUser,
        agentCode: getAgentCode,
        commercialStructure: comercial.NOM_NIVEL3,
        // commercialStructureCode: comercial.COD_NIVEL3,
        userId: userId,
        baseUrl: apiConfig?.ProjectLink + "/customer-login/",
    };

    dispatch(
        actions.fetchSaveCipherText(formData, (result) => {
            console.log("result------ on Motor Drawer", result);
            if (result.statusCode === -1) {
              setLoader(false);
                setlinkUrl(result.data)
                
            }else{
              setLoader(false);
            }
        })
    );
}

  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

  // Set the placement based on the viewport width
  const placement = viewportWidth > 424 ? 'right' : 'bottom';
  

  return (
    <>
    <FullPageLoader fromapploader={loader} ></FullPageLoader>
    {isfromprofile !== true  ?
    // <>
    <div>
      <Col xs={24} sm={24} md={12} lg={24} xl={24}>
          <div
            className="product1-tap1-container-chips"
            onClick={handledrawerOpen}
          >
            <>
            {commercialStructure?.length > 1 ?
              <div>
                <span>{`Please tap here to `}</span>
                <b>view shareable links</b>
                <span> as per your commercial structure</span>
              </div>
              :
              <div className="url-text-width" >
                <div className="text-wrap-link display-web" >{linkUrl.slice(0, 40)+'...'}</div>
                <div className="text-wrap-link display-mobile" >{linkUrl.slice(0, 33)+'...'}</div>
              </div>

            }
            </>
            <div className="circleforpan1-cips">
              <img className="product1-icon-img1" alt="" src={img4} />
            </div>
          </div>
      </Col>
    </div>
:
    // <>
    <div className="sharelinkdiv">
      {/* <>
      {commercialStructure?.length > 1 ?
        <div className="ptagprofile">Please click on your agent type to share link with your customer.</div>
        :
        <div className="ptagprofile">{linkUrl.slice(0, 60)+'...'}</div>
        <div className="text-wrap-link display-mobile" >{linkUrl.slice(0, 33)+'...'}</div>
      }
      </> */}
      <>
            {commercialStructure?.length > 1 ?
              <p className="ptagprofile">Please click on your agent type to share link with your customer.</p>
              :
              <>
                <p className="ptagprofile display-web" >{linkUrl.slice(0, 100)+'...'}</p>
                <p className="ptagprofile display-mobile" >{linkUrl.slice(0, 40)+'...'}</p>
              </>

            }
            </>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            onClick={handledrawerOpen}
          >
            <g clip-path="url(#clip0_1546_1518)">
              <path
                d="M15 13.3998C14.3667 13.3998 13.8 13.6498 13.3667 14.0415L7.425 10.5832C7.46667 10.3915 7.5 10.1998 7.5 9.99984C7.5 9.79984 7.46667 9.60817 7.425 9.4165L13.3 5.9915C13.75 6.40817 14.3417 6.6665 15 6.6665C16.3833 6.6665 17.5 5.54984 17.5 4.1665C17.5 2.78317 16.3833 1.6665 15 1.6665C13.6167 1.6665 12.5 2.78317 12.5 4.1665C12.5 4.3665 12.5333 4.55817 12.575 4.74984L6.7 8.17484C6.25 7.75817 5.65833 7.49984 5 7.49984C3.61667 7.49984 2.5 8.6165 2.5 9.99984C2.5 11.3832 3.61667 12.4998 5 12.4998C5.65833 12.4998 6.25 12.2415 6.7 11.8248L12.6333 15.2915C12.5917 15.4665 12.5667 15.6498 12.5667 15.8332C12.5667 17.1748 13.6583 18.2665 15 18.2665C16.3417 18.2665 17.4333 17.1748 17.4333 15.8332C17.4333 14.4915 16.3417 13.3998 15 13.3998ZM15 3.33317C15.4583 3.33317 15.8333 3.70817 15.8333 4.1665C15.8333 4.62484 15.4583 4.99984 15 4.99984C14.5417 4.99984 14.1667 4.62484 14.1667 4.1665C14.1667 3.70817 14.5417 3.33317 15 3.33317ZM5 10.8332C4.54167 10.8332 4.16667 10.4582 4.16667 9.99984C4.16667 9.5415 4.54167 9.1665 5 9.1665C5.45833 9.1665 5.83333 9.5415 5.83333 9.99984C5.83333 10.4582 5.45833 10.8332 5 10.8332ZM15 16.6832C14.5417 16.6832 14.1667 16.3082 14.1667 15.8498C14.1667 15.3915 14.5417 15.0165 15 15.0165C15.4583 15.0165 15.8333 15.3915 15.8333 15.8498C15.8333 16.3082 15.4583 16.6832 15 16.6832Z"
                fill="#1D428A"
              />
            </g>
            <defs>
              <clipPath id="clip0_1546_1518"  >
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
      </div>
    // </>
    }
  
    <Drawer
      placement={placement}
      closable={true}
      onClose={handleDrawerClose}
      visible={opeshowDrawer}
      title={commercialStructure?.length === 1 ? 'Share':"Commercial Structure"}
      closeIcon={<CloseOutlined style={{ position: 'absolute', right: '16px', marginTop: "-6px"}} />}
      style={{ overflow: 'auto' }}
    >
      <div
        className="dr-main-commercial1"
        style={{ overflowY: "auto", height: "100%" }}
        
      >
        <div className="dr-agent-info-container1">
          
          {commercialStructure?.length === 1 ? <>
            {/* <div onClick={() => onclickNewFunctionSingle(commercialStructure)}>
               
            </div> */}
            <MessageEmail  />
          </> 
           : <>
             <div className="dr-flex-container">
                <div className="dr-share-instruction-text1">
                  <span>{`Please click on your agent type to `}</span>
                  <b>share link with your customer</b>
                  <span>.</span>
                </div>
              </div>
          {commercialStructure?.length > 0 && commercialStructure?.map((comercialData, index) =>{
            return <div key={index} className="dr-agent-type-container1">
            <div className="dr-agent-type">
              <div className="dr-agent-title">
                <div className="dr-bold-text1">{comercialData?.NOM_NIVEL3}</div>
              </div>
              <div
                className="dr-share-link-container1"
                onClick={() => onclickNewFunction(comercialData, index)}
              >
                <div className="dr-flex-container1">
                  <div className="dr-flex-item">
                    Tap here to share link with customer
                  </div>
                </div>
                <div className="dr-share-link-icon">
                  <img className="dr-image-style" alt="sharlink" src={img3} />
                </div>
                
              </div>
            </div>
            {comercialData.isActive && <MessageEmail />}

          </div>
          })}
          </>}
           
          
          
        </div>
      </div>

    </Drawer>
    </>
  );
};

// const MotorPolicyPage = () => {
//   const dispatch = useDispatch();

//   const checkstate = useSelector((state) => state);

//   console.log("checkstate->", checkstate);

//   useEffect(() => {
//     dispatch(actions.fetchAllVehicleCategory());
//   }, [dispatch]);

//   const [form] = Form.useForm();
//   const history = useHistory();
//   const { Option } = Select;
//   const [size, setSize] = useState("default"); // default is 'middle'

//   const [activeButton, setActiveButton] = useState(null);
//   const [travelType, setTravelType] = useState("");
//   const [policyTypeList, setPolicyTypeList] = useState([]);
//   const [loader, setLoader] = useState(false);
//   const [selectedButton, setSelectedButton] = useState(null);

//   const formItemLayout = {
//     labelCol: {
//       span: 24,
//     },
//     wrapperCol: {
//       span: 24,
//     },
//   };

//   let vehicelCategoryApi = useSelector((state) => state?.make?.vehiclecategory);

//   const onChangetoDashboard = () => {
//     history.push("/iCare-Dashboard");
//   };

//   const PolicyOptionOnchangeVehical = (e) => {
//     console.log("Event-->", e);

//     dispatch(actions.vehicalinformationHandler(e));
//   };

//   const policyTypeOnChange = (e) => { };

//   const handleButtonClick = () => {
//     // console.log("", );
//     setActiveButton();
//   };

//   const handleProceed = (val) => {
//     console.log("gcvhbjnk", val);
//     setTravelType(val);
//     // console.log("buttonIndex", buttonIndex);
//     setActiveButton(val);
//   };

//   const getProductList = async () => {
//     setLoader(true);
//     const res = await axiosRequest.get("user/productList?product=MOTOR");
//     if (res.statusCode === -1) {
//       setLoader(false);
//       if (res?.data?.data) {
//         setPolicyTypeList(res.data.data);
//       }
//     } else {
//       setLoader(false);
//       console.log("Not Found");
//     }
//   };

//   useEffect(() => {
//     getProductList();
//   }, []);

//   const onchangetoNext = async () => {
//     if (travelType === "Fleet" || travelType === "Bulk") {
//       history.push({
//         pathname: "/motor-bulk",
//         data: { selectedButton },
//       });

//       // history.push("/motor-bulk");
//     } else {
//       if (!selectedButton) {
//         return message.error("Please select a policy type.");
//       }
//       setLoader(true);
//       try {
//         const response = await axiosRequest.get("user/getDocumentId");
//         console.log("response", response);
//         if (response.statusCode === -1) {
//           setLoader(false);
//           const documentId = response?.data?.documentId;
//           dispatch({ data: documentId, type: "CURRENT_DOCUMENTS_ID" });
//           history.push({
//             pathname: "/price-check-info",
//           });
//         } else {
//           message.error(response.data);
//           setLoader(false);
//         }
//       } catch (error) {
//         setLoader(false);
//         console.log("error", error);
//       }
//     }
//   };
//   // this for the testing
//   const [showDrawer, setShowDrawer] = useState(false);
//   const onClose = () => {
//     setShowDrawer(false);
//   };
//   const handledrawerOpen = () => {
//     setShowDrawer(true);
//   };

//   return (
//     <>
//       <FullPageLoader fromapploader={loader} />
//       <div className="main-classinfo">
//         <Form
//           name="basic"
//           initialValues={{
//             remember: true,
//           }}
//           form={form}
//         >
//           <div className="">
//             <div className="CTPLfirst-info">
//               <h3>I need to issue a policy for</h3>
//             </div>

//             <Row gutter={16}>
//               {policyTypeList &&
//                 Array.isArray(policyTypeList) &&
//                 policyTypeList.map((e, index) => {
//                   return (
//                     <Col xs={24} sm={24} md={12} lg={12} xl={12} key={index}>
//                       <Button
//                         className={`${activeButton === e.name
//                           ? "activeforMotorButtonMotorInfo"
//                           : "button-Motor "
//                           }`}
//                         onClick={() => {
//                           setSelectedButton(e.name);
//                           handleProceed(e.name);
//                         }}
//                       >
//                         <img
//                           src={e.name === "Individual" ? indivi : group_img}
//                         />
//                         <div className="ctplfleet-span">
//                           <span>{e.name}</span>
//                           <span className="second-span-ctpl">{e.sublabel}</span>
//                         </div>
//                       </Button>
//                     </Col>
//                   );
//                 })}
//               {/* <Col xs={24} sm={24} md={12} lg={24} xl={24} >
//                 <div className="product1-tap-container" onClick={handledrawerOpen}>
//                   <div className="custom-flex-1">
//                     <span>{`Please tap here to `}</span>
//                     <b>view shareable links</b>
//                     <span> as per your commercial structure</span>
//                   </div>
//                   <div className="circleforpan">
//                     <img
//                       className="product1-icon-img"
//                       alt=""
//                       src={img4}
//                     />
//                   </div>
//                 </div>
//               </Col>
//               <Col xs={24} sm={24} md={12} lg={24} xl={24} >
//                 <div className="product1-or-text12">
//                   OR

//                 </div>
//               </Col> */}
//             </Row>
//             <div>
//               {/* <DrawerFunction showDrawer={openshowDrawer} onClose={onClose} /> */}
//             </div>

//             <div className="btndiv">
//               <Button
//                 className="next"
//                 onClick={onchangetoNext}
//                 htmlType="submit"
//               >
//                 Proceed <ArrowRightOutlined />
//               </Button>
//             </div>
//           </div>
//         </Form>
//       </div>
//     </>
//   );
// };
export default DrawerFunction;
