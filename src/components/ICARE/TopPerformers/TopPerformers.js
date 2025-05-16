import React, {useState, useEffect} from 'react'
import './TopPerformers.css'
import topPerformer from "../../../../src/images/Performance page/top-performer-image@2x.png"
import top1 from "../../../../src/images/Performance page/employee-image@2x.png"
import top2 from "../../../../src/images/Performance page/employee-image1@2x.png"
import top3 from "../../../../src/images/Performance page/employee-image2@2x.png"
import top4 from "../../../../src/images/Performance page/employee-image3@2x.png"
import top from "../../../../src/images/Performance page/employee-image4@2x.png"
import OonaHeader from './../OonaHeader/OonaHeader'
import { LoadingOutlined } from '@ant-design/icons';
import { Row, Col, Button, Radio, Icon, Select, Form, Progress, Input, DatePicker, Upload, message, Card, Avatar,Spin } from "antd";
import {Option} from 'antd'
import filterIcon from '../../../assets/leadicon/Filled.png'
import { DownloadOutlined } from '@ant-design/icons';
import axiosRequest from '../../../axios-request/request.methods'  
import FullPageLoader from '../../FullPageLoader/FullPageLoader'
import actionNoData from "../../../assets/Actionnodata.png";
import _, { set } from "lodash";
import {stoageGetter } from "../../../helpers";

const TopPerformers = () => {
  let login_user_data = stoageGetter("user");
  const getAgentCode = login_user_data?.agentCode;
  const channelCode = login_user_data?.channelCode?.channelCode
  const [form] = Form.useForm();

    const [openloader, setopenloader] = useState(false)
    const [salesOfficer, setSalesOfficer] = useState(null)
    const [allResigns, setAllResigns] = useState("")
    // console.log("allResigns---------", allResigns);
    const [ResignOption, setResignOption] = useState([])
    const [SalsesOption, setSaleOption] = useState([])
      
    const [agentRegion, setAgentRegion] = useState("")
    const [loaderSpring, setLoaderSpring] = useState(false)
    let checkId = ""

    const formItemLayout = {
        labelCol: {
          span: 24,
        },
        wrapperCol: {
          span: 24,
        },
      };

      const onSearch = (value) => {
        console.log('search:', value);
      };
    
      // Filter `option.label` match the user type `input`
      const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

      const [postData, setPostData] = useState();
    
      useEffect(() => {
        AgentResignFunction()
        if (channelCode === 'CH2') {
          TopPerformFunction()
        }
        
    }, [])

    const antIcon = (
      <LoadingOutlined
        style={{
          fontSize: 50,
          color:'#472c77',
          fontWeight:700,
        }}
        spin
      />
    );
     

      const AgentResignFunction = async () =>{
        
        try {
          const response = await axiosRequest.get(`user/get/agent-region?agentSalesOffice=`);
          if (response?.statusCode === -1) {
            let data = response?.data
            let resignData = []
            data.map((item)=>{
              resignData.push({
                label:item.RegionName,
                value:item.RegionCode
              })
            })
            setResignOption(resignData)
          } else {
            
          }
          
        } catch (error) {
          setLoaderSpring(false)
          console.error(error);
        }
      }

      const TopPerformFunction = () => {
        setopenloader(true);
        // try {
        //     const response = await axiosRequest.get('user/agent/topPerformer', {
        //     });
            
        //     // Update state with the response data
        //     if (response?.statusCode === -1) {
        //         setopenloader(false);
        //         setPostData(response?.data?.data);
        //     }else{
        //       setopenloader(false);
        //     }
        //   } catch (err) {
        //     setopenloader(false);
        //    // setError(err.message);
        //    console.log("err", err);
        //   }

          axiosRequest.get('user/agent/topPerformer')
          .then(response => {
            // Handle the API response data here
            // setData(response.data);
            setopenloader(false);
            if (response?.statusCode === -1) {
              setopenloader(false);
              setPostData(response?.data?.data);
          }else{
            setopenloader(false);
          }
          })
          .catch(error => {
            // Handle any errors that occur during the request
            console.error('Error:', error);
            setopenloader(false);
          });
      };

  
    const onChangeHandelerResign = (e) =>{
      console.log("for clear button",salesOfficer);
      setSalesOfficer(null)
      form.setFieldsValue({
        sales_Officer: null,
        })
        console.log("for clear button___AFTER",salesOfficer);
      checkId = e
      setAllResigns(e)
      
      SalesApiCallFunctionChannelSales()
      
      
    }

    const ChangeHandlerForOfficer = (e, key) =>{
      setSalesOfficer(e)
      setAgentRegion(key.value)
      // setAgentRegion(e)
    }

    const SalesApiCallFunctionChannelSales =  () =>{
      setLoaderSpring(true)
      // setSaleOption([])
      if (checkId != null) {
        try {
          axiosRequest.get(`user/get/agentSalesOffice?agentRegion=${checkId}&agentCode=`).then((res)=>{
            
            if (res?.statusCode === -1) {
              setLoaderSpring(false)
              // setSaleOption([])
              let data = res?.data
              console.log("Data--->",data)
              let saleOptionData = [];
              data.map((item) => {
                // console.lo
                saleOptionData.push({label:item.SalesOfficeName,value:item.SalesOfficeCode})
              })
                
              setSaleOption(saleOptionData)
            } else {
              setLoaderSpring(false)
            }
            
          })
          // setSaleOption([])
        } catch (error) {
          setLoaderSpring(false)
          console.error(error);
        }
      }else{
        setLoaderSpring(false)
      }
    }

    const FilterTopPerformFunction =  () => {
      setopenloader(true);
      // try {
      //     const response = await axiosRequest.get(`user/agent/topPerformer?agentRegion${allResigns}&agentSalesOffice${salesOfficer}`, {
      //       // Replace with the data you want to send in the POST request body
      //       // sdx-api/secure/user/agent/topPerformer?agentRegion=10&agentSalesOffice=1019
      //       // agentRegion: allResigns,
      //       // agentSalesOffice: salesOfficer,
           
      //     });
          
      //     // Update state with the response data
      //     if (response?.statusCode === -1) {
      //         setopenloader(false);
      //         setPostData(response?.data?.data);
      //     }else{
      //       setopenloader(false);
      //     }
      //   } catch (err) {
      //     setopenloader(false);
      //    // setError(err.message);
      //    console.log("err", err);
      //   }

        axiosRequest.get(`user/agent/topPerformer?agentRegion=${allResigns}&agentSalesOffice=${salesOfficer}`)
          .then(response => {
            // Handle the API response data here
            // setData(response.data);
            setopenloader(false);
               if (response?.statusCode === -1) {
              setopenloader(false);
              setPostData(response?.data?.data);
          }else{
            setopenloader(false);
          }
          })
          .catch(error => {
            // Handle any errors that occur during the request
            console.error('Error:', error);
            setopenloader(false);
          });
    };

  
    const nameShorter = (str) => {
        try {
          if (str !== "") {
            str = str.toUpperCase();
            let arr = str.split(" ");
            let fLatter = arr[0].charAt(0);
            let sLatter = arr[1].charAt(0);
            let gLatter = arr[2].charAt(0);
            // fLatter = fLatter.charAt(0);
            // sLatter = sLatter.charAt(0);
            str = fLatter + sLatter + gLatter;
          }
          return str;
        } catch (error) {
          console.log(error);
        }
      };

      const FilterDataResign = () =>{
        FilterTopPerformFunction()
        // setSalesOfficer(null)
        // setAllResigns(null)
      }

    return (
        <>
        
        <FullPageLoader spinloader={loaderSpring} />
        {/* <FullPageLoader fromapploader={openloader} /> */}
           <Form form={form}>
            <div className='topPerformance'>
                <Row gutter={[16,16]}>
                     <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div className='peformnceHeading'>
                            <img src={topPerformer} />
                            <h2>Top Performers</h2>
                            <p>May 2023</p>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div className='agent'>
                            <Row gutter={[16,16]}>
                            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                             <Button className="filterIcon" onClick={FilterDataResign} disabled={!salesOfficer ? true : false}>
                                    Filter
                                </Button>
                                </Col>
                                <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name la formFill"
                                name="allResigns"
                            >
                                <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="All Region"
                                size="default"
                                options={ResignOption}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                // value={allResigns}
                                optionFilterProp="children"
                                onChange={(e,key)=> onChangeHandelerResign(e,key)}

                                ></Select>


                            </Form.Item>
                            </Col>
                            
                            <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                              {console.log('SalsesOption------>>>>>',salesOfficer)}
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name la formFill"
                                name='sales_Officer'
                            >
                                <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="All Sales Offices"
                                size="default"
                                options={SalsesOption}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                value={salesOfficer}
                                optionFilterProp="children"
                                onChange={(item, key) => ChangeHandlerForOfficer(item, key)}
                                >
                                
                                </Select>
                            </Form.Item>
                            </Col>
                    </Row>

                    <>
                    { openloader === true ?
                    <div  className='spinnerloader'>
                      <div style={{display:'flex',
                                      alignItems:'center',
                                      justifyContent:'center',
                                      marginTop: '-11px'}}>
                                  <Spin spinning={openloader} indicator={antIcon}></Spin> 
                          </div>
                    </div>
                      :
                      <>
                    { postData &&
                            postData?.length > 0 ? postData?.map((cardDataCust, index) =>{
                    return <div key={index} className='cardUser_data'>
                    <div className='digit_number'>
                        <h2>{index + 1}</h2>
                    </div>
                    <div className='headingandperofm'>
                        <h2>{cardDataCust?.agentName}</h2>
                        {/* <p>Monthly average sales: <span style={{color: "#000", fontWeight: 'bold', marginLeft: '5px', marginRight: '5px'}}>₱</span>{cardDataCust?.total}</p> */}
                    </div>
                    <div className='peformImg'>
                        {/* <img src={top1} /> */}
                        <Avatar
                            style={{
                                paddingTop: "-40px",
                                lineHeight: "none",
                                // backgroundColor: getRandomColor(),
                                marginTop: "10px",
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: "40px",
                                width: "40px",
                            
                            }}
                            size={{ xl: 45 }}
                            >
                            {nameShorter(cardDataCust?.agentName)}
                            </Avatar>
                    </div>
                    
                    </div>
                        })
                        : 
                        
                        <>
                        
                        <Card className="card" style={{ width: "100%" }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <img src={actionNoData} />
                                <p
                                  style={{
                                    fontWeight: 600,
                                    color: "#01b4bb",
                                    fontSize: "22px",
                                  }}
                                >
                                  No Records Found!
                                </p>
                              </div>
                            </Card>
                        </>
                    }
                  </>
                  }
                    </>
                    
                    
                    {/* <div className='cardUser_data'>
                       
                            <div className='digit_number'>
                                <h2>1</h2>
                            </div>
                            <div className='headingandperofm'>
                                <h2>Mylene Deogracias</h2>
                                <p>Monthly average sales: 234</p>
                            </div>
                            <div className='peformImg'>
                                <img src={top1} />
                            </div>
                       
                    </div>
                    <div className='cardUser_data'>
                       
                            <div className='digit_number'>
                                <h2>1</h2>
                            </div>
                            <div className='headingandperofm'>
                                <h2>Mylene Deogracias</h2>
                                <p>Monthly average sales: 234</p>
                            </div>
                            <div className='peformImg'>
                                <img src={top1} />
                            </div>
                       
                    </div> */}
                            
                        </div>
                        </Col>
                </Row>
            </div>
            </Form>
            
        </>
    )
}

export default TopPerformers
