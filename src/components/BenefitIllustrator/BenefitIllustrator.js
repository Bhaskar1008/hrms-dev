// import React, { useState, useEffect } from 'react'
// import './BenefitIllustrator.css';
// import { Row, Col, Form, Typography, Tooltip, Button, Input, Radio, Select, Cascader, DatePicker, Space, Modal } from 'antd';
// import { Divider, Card } from 'antd';
// import axios from 'axios';
// import MainTabs from '../../components/MainTabs/MainTabs';
// import { ArrowRightOutlined } from '@ant-design/icons';
// import { Table, Tag } from 'antd';
// import {
//     BrowserRouter as Router,
//     Link, useHistory
// } from "react-router-dom";
// import { useLocation } from 'react-router-dom';
// const { Title } = Typography;
// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
// function onChange(date, dateString) {
// }

// const { Option } = Select;
// const contentStyle = {
//     height: '300px',
//     width: '100%',
//     background: 'rgb(1, 180, 187)'
// };
// const formItemLayout = {
//     labelCol: {
//         span: 24,
//     },
//     wrapperCol: {
//         span: 24,
//     },
// };

// const { Column, ColumnGroup } = Table;

// const selectButton = (value) => {
// }

// const data = [
//     {
//         title: 'Years',
//         dataIndex: 'Years',
//     },
//     {
//         title: 'Age Of Policy Holder',
//         dataIndex: 'Age Of Policy Holder',
//     },
//     {
//         title: 'Annualized Premium excluding service tax',
//         dataIndex: 'Annualized Premium excluding service tax',
//     },
//     {
//         title: 'Basic Sum Assured',
//         dataIndex: 'Basic Sum Assured',
//     },
//     {
//         title: 'Death Benefit Payable',
//         dataIndex: 'Death Benefit Payable',
//     },
//     {
//         title: 'Maturity Benefit',
//         dataIndex: 'Maturity Benefit',
//     },
// ];
// const tabMenu = [
//     {
//         id: 'benefitillustrator',
//         value: "Benefit Illustrator",
       
        
//     },
//     {
//         id: 'proposalfulfilment',
//         value: "Proposal Fulfilment"
//     },
//     {
//         id: 'prepaymentreview',
//         value: "Pre-payment Review"
//     },
//     {
//         id: 'paymentoptions',
//         value: "Payment Options"
//     },
//     {
//         id: 'uploaddocuments',
//         value: "Upload Documents"
//     },
//     {
//         id: 'proposalhistory',
//         value: "Proposal History"
//     },

// ]

// const setStateOptions = [

//     { value: "Select Type", label: "Select Type" },
//     { value: "Sum Assured to Premium", label: "Sum Assured to Premium" },
//     { value: "Premium to Sum Assured", label: "Premium to Sum Assured" },
// ]

// const BenefitIllustrator = () => {
//     const location = useLocation();
//     // const bidata} = benefitillArr();
    
//     const { recorddata } = location.state;
//     // const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);
//     const [isDisplayVisible, setIsDisplayModalVisible] = useState(false);
//     const [AdvisorName, setAdvisorName] = useState(recorddata ? recorddata.AdvisorName : "");
//     const [AdvisorCode, setAdvisorCode] = useState(recorddata ? recorddata.AdvisorCode : "");
//     const [CalculatorType, setCalculatorType] = useState(recorddata ? recorddata.CalculatorType : "");
//     const [NameofLifeAssured, setNameofLifeAssured] = useState(recorddata ? recorddata.NameofLifeAssured : "");
//     const [PolicyTerm, setPolicyTerm] = useState(recorddata ? recorddata.PolicyTerm : "");
//     const [PremiumType, setPremiumType] = useState(recorddata ? recorddata.PremiumType : "");
//     const [PremiumMode, setPremiumMode] = useState(recorddata ? recorddata.PremiumMode : "");
//     const [SumAssured, setSumAssured] = useState(recorddata ? recorddata.SumAssured : "");
//     const [DeathBenefitOption, setDeathBenefitOption] = useState(recorddata ? recorddata.DeathBenefitOption : "");
//     const [AgeProof, setAgeProof] = useState(recorddata ? recorddata.AgeProof : "");
//     const [DoyouwanttoaddRiderstothisplan, setDoyouwanttoaddRiderstothisplan] = useState(recorddata ? recorddata.DoyouwanttoaddRiderstothisplan : "");

//     const AdvisorNameFunc = (e) => {
//         setAdvisorName(e.target.value)
//     }
//     const AdvisorCodeFunc = (e) => {
//         setAdvisorCode(e.target.value)
//     }
//     const CalculatorTypeFunc = (e) => {
//         setCalculatorType(e.target.value)
//     }
//     const NameofLifeAssuredFunc = (e) => {
//         setNameofLifeAssured(e.target.value)
//     }
//     const PolicyTermFunc = (e) => {
//         setPolicyTerm(e.target.value)
//     }
//     const PremiumTypeFunc = (e) => {
//         setPremiumType(e.target.value)
//     }
//     const PremiumModeFunc = (e) => {
//         setPremiumMode(e.target.value)
//     }
//     const SumAssuredFunc = (e) => {
//         setSumAssured(e.target.value)
//     }
//     const DeathBenefitOptionFunc = (e) => {
//         setDeathBenefitOption(e.target.value)
//     }
//     const AgeProofFunc = (e) => {
//         setAgeProof(e.target.value)
//     }
//     const DoyouwanttoaddRiderstothisplanFunc = (e) => {
//         setDoyouwanttoaddRiderstothisplan(e.target.value)
//     }
//     // const [isPassingData, setIsPassingData] = useState();
//     const [buttonValue, setButtonValue] = useState();

//     // const showModal = () => {
//     //     setIsJoinModalVisible(true);
//     // };
//     // const SelectedButtonFunc = (value) => {
//     //     setIsPassingData(value)
//     // }
//     const displayModal = () => {
//         setIsDisplayModalVisible(true);
//     }
//     // const handleOk = () => {
//     //     setIsJoinModalVisible(false);
//     // };
//     // const handleCancel = () => {
//     //     setIsJoinModalVisible(false);
//     // };
//     const [benefitIllustratorArr, setBenefitIllustratorArr] = useState([]);
//     const [benefitillArr, setBIArr] = useState([]);
//     const [selectedObj, setSelectedObj] = useState()
//     const selectObj = (value) => {
//         setSelectedObj(value)
//     }
//     // selectObj(row)
//     useEffect(() => {
//         // axios.get("https://sdrestnode.iorta.in/secure/sd/user/getLead/5df782ab2b5ffa6c72ae1a25?leadfilter=all")
//         //     .then((res) => {
//         //         setBenefitIllustratorArr(
//         //             res.data.data
//         //         );
//         //     });https://sdrestnode.iorta.in/secure/user/getProposal/${recorddata._id}
//         // `https://sdrestnode.iorta.in/secure/sd/user/getProposal/${recorddata._id}`

        
//         // axios.get(`https://sdrestnode.iorta.in/secure/sd/user/getProposal/${recorddata._id}`)
//         //  .then((res) => {
//         //         setBIArr(
//         //             res.data.data[0]
//         //         );
//         //     });


//     }, []);
    
//     const [selectAllGenderOption, setSelectAllGenderOption] = useState(true);
//     const [selectViewGenderOption, setSelectViewGenderOption] = useState(false);
//     const [selectDisplayGenderOption, setSelectDisplayGenderOption] = useState(false);
//     const selectAllGenderFunc = () => {
//         setSelectAllGenderOption(true)
//         setSelectViewGenderOption(false)
//         setSelectDisplayGenderOption(false)
//     }
//     const selectViewGenderFunc = () => {
//         setSelectAllGenderOption(false)
//         setSelectViewGenderOption(true)
//         setSelectDisplayGenderOption(false)
//     }
//     const selectDisplayGenderFunc = () => {
//         setSelectAllGenderOption(false)
//         setSelectViewGenderOption(false)
//         setSelectDisplayGenderOption(true)
//     }
//     let { innerWidth: width, innerHeight: height } = window;
//     const [value, setValue] = React.useState(1);

//     // const onChangeLastName = (e) => {
//     //     setLastName(e.target.value)
//     // }
//     return (
//         <div className="form-container">
//             <MainTabs
//                 tabMenu={tabMenu} activeKey="benefitillustrator"
//             />
//             <Row gutter={[40, 24]} justify="center">
//                 <Col xs={{ order: 1 }} sm={16} md={16} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
//                     <Row gutter={['', 24]}>
//                         <Col className="benefitillustrator1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
//                             <Title className="bi-heading">Enter Details</Title><br />
//                             <Form layout="horizontal" className="contact-detail-form">
//                                 <Col>
//                                     <Form.Item
//                                         {...formItemLayout}
//                                         className="form-item-name label-color"
//                                         name="Advisor Name"
//                                         label="Advisor Name"
//                                         hasFeedback
//                                         rules={[
//                                             {
//                                                 required: false,
//                                                 message: 'Please enter advisor name',
//                                             },
//                                         ]}
//                                     >
//                                         <Input className="first-name border-bottom" placeholder="Advisor Name"
//                                             value={AdvisorName}
//                                             onChange={AdvisorNameFunc}
//                                         />
//                                     </Form.Item>
//                                     {/* <span className="labels">Advisor Name</span>
//                                     <p className="para">{recorddata.AdvisorName}</p><hr /> */}
//                                 </Col>
//                                 <Col>
//                                     <Form.Item
//                                         {...formItemLayout}
//                                         className="form-item-name label-color"
//                                         name="advisor code"
//                                         label="Advisor Code"
//                                         hasFeedback
//                                         rules={[
//                                             {
//                                                 required: false,
//                                                 message: 'Please enter advisor code',
//                                             },
//                                         ]}
//                                     >
//                                         <Input className="first-name border-bottom" placeholder="Advisor Code"
//                                             value={AdvisorCode}
//                                             onChange={AdvisorCodeFunc}
//                                         />
//                                     </Form.Item>
//                                     {/* <span className="labels">Advisor Code</span>
//                                     <p className="para">{recorddata.AdvisorCode}</p><hr /> */}
//                                 </Col>
//                                 {/* <Col></Col> */}
//                                 <Col >
//                                     <Form.Item
//                                         {...formItemLayout}
//                                         className="form-item-name label-color"
//                                         name="Calculator type"
//                                         label="Select Calculator Type"
//                                         hasFeedback
//                                         rules={[
//                                             {
//                                                 required: false,
//                                                 message: 'Please select calculator type',
//                                             },
//                                         ]}
//                                     >
//                                         <Select options={setStateOptions} placeholder="Select Type" style={{ width: '28vw' }} value={CalculatorType}
//                                             onChange={CalculatorTypeFunc}></Select>
//                                     </Form.Item>
//                                 </Col>
//                                 <Col >
//                                 </Col>
//                                 <Col >
//                                     <Form.Item
//                                         {...formItemLayout}
//                                         className="form-item-name label-color"
//                                         name="life assured"
//                                         label="Name Of Life  Assured"
//                                         hasFeedback
//                                         rules={[
//                                             {
//                                                 required: false,
//                                                 message: 'Please enter name of life assured',
//                                             },
//                                         ]}
//                                     >
//                                         <Input className="first-name border-bottom" placeholder="Name of life assured"
//                                             value={NameofLifeAssured}
//                                             onChange={NameofLifeAssuredFunc}
//                                         />
//                                     </Form.Item>
//                                 </Col>
//                                 <Col >
//                                     <Form.Item
//                                         {...formItemLayout}
//                                         className="form-item-name label-color"
//                                         name="gender"
//                                         label="Gender Of Life Assured"
//                                         hasFeedback
//                                         rules={[
//                                             {
//                                                 required: false,
//                                                 message: 'Please select gender of life assured',
//                                             },
//                                         ]}
//                                     >
//                                         <div onClick={selectAllGenderFunc} className={selectAllGenderOption == true ? "benefitillustrator-button" : "benefitillustrator-btn2"} value={selectAllGenderOption}>
//                                             <p className={selectAllGenderOption == true ? "Benefitillustrator-tab-active-text-style" : "Benefitillustrator-tab-text-style"}>
//                                                 Male
//                                             </p>
//                                         </div>
//                                         <div onClick={selectViewGenderFunc} className={selectViewGenderOption == true ? "benefitillustrator-button" : "benefitillustrator-btn2"} value={selectViewGenderOption}>
//                                             <p className={selectViewGenderOption == true ? "Benefitillustrator-tab-active-text-style" : "Benefitillustrator-tab-text-style"} >
//                                                 Female
//                                             </p>
//                                         </div>
//                                         <div onClick={selectDisplayGenderFunc} className={selectDisplayGenderOption == true ? "benefitillustrator-button" : "benefitillustrator-btn2"} value={selectDisplayGenderOption}>
//                                             <p className={selectDisplayGenderOption == true ? "Benefitillustrator-tab-active-text-style" : "Benefitillustrator-tab-text-style"}>
//                                                 Other
//                                             </p>
//                                         </div>
//                                         {/* <Radio.Group defaultValue="a">
//                                             <Radio.Button value="a" className="radio">Male</Radio.Button>
//                                             <Radio.Button value="b" className="radio">Female</Radio.Button>
//                                             <Radio.Button value="c" className="radio">Other</Radio.Button>
//                                         </Radio.Group> */}
//                                     </Form.Item>
//                                 </Col>
//                                 <Col >
//                                     <Form.Item
//                                         {...formItemLayout}
//                                         className="form-item-name label-color"
//                                         name="dob"
//                                         label="Date of Birth Of Life Assured"
//                                         hasFeedback
//                                         rules={[
//                                             {
//                                                 required: false,
//                                                 message: 'Please select date of birth of life assured',
//                                             },
//                                         ]}
//                                     >
//                                         <DatePicker onChange={onChange} style={{ width: '28vw' }} />
//                                     </Form.Item>
//                                 </Col>
//                                 <Col>
//                                     <Form.Item
//                                         {...formItemLayout}
//                                         className="form-item-name label-color"
//                                         name="martial status"
//                                         label="Martial Status"
//                                         hasFeedback
//                                         rules={[
//                                             {
//                                                 required: false,
//                                                 message: 'Please select martial status',
//                                             },
//                                         ]}
//                                     >
//                                         <Select placeholder="Select Martial Status" style={{ width: '28vw' }}>
//                                             <Option value="Select">Select</Option>
//                                             <Option value="Single">Single</Option>
//                                             <Option value="Married">Married</Option>
//                                             <Option value="Divorced">Divorced</Option>
//                                             <Option value="Widowed">Widowed</Option>
//                                         </Select>
//                                     </Form.Item>
//                                 </Col>
//                                 <Col >
//                                     <Form.Item
//                                         {...formItemLayout}
//                                         className="form-item-name label-color"
//                                         name="policy term"
//                                         label="Policy Term"
//                                         hasFeedback
//                                         rules={[
//                                             {
//                                                 required: false,
//                                                 message: 'Please select policy term',
//                                             },
//                                         ]}
//                                     >
//                                         <Select placeholder="Select Policy Term" style={{ width: '28vw' }}
//                                             value={PolicyTerm}
//                                             onChange={PolicyTermFunc}
//                                         >
//                                             <Option value="Select">Select</Option>
//                                             <Option value="5">5</Option>
//                                             <Option value="10">10</Option>
//                                             <Option value="15">15</Option>
//                                             <Option value="20">20</Option>
//                                             <Option value="25">25</Option>
//                                         </Select>
//                                     </Form.Item>
//                                 </Col>
//                                 <Col>
//                                     <Form.Item
//                                         {...formItemLayout}
//                                         className="form-item-name label-color"
//                                         name="Premium Paying Term"
//                                         label="Premium Paying Term"
//                                         hasFeedback
//                                         rules={[
//                                             {
//                                                 required: false,
//                                                 message: 'Please select premium paying term',
//                                             },
//                                         ]}
//                                     >
//                                         <Select placeholder="Select Premium Paying Term" style={{ width: '28vw' }}>
//                                             <Option value="Select">Select</Option>
//                                             <Option value="5">5</Option>
//                                             <Option value="10">10</Option>
//                                             <Option value="15">15</Option>
//                                             <Option value="20">20</Option>
//                                             <Option value="25">25</Option>
//                                         </Select>
//                                     </Form.Item>
//                                 </Col>
//                                 <Col >
//                                     <Form.Item
//                                         {...formItemLayout}
//                                         className="form-item-name label-color"
//                                         name="Premium Mode"
//                                         label="Premium Mode"
//                                         hasFeedback
//                                         rules={[
//                                             {
//                                                 required: false,
//                                                 message: 'Please select premium mode',
//                                             },
//                                         ]}
//                                     >
//                                         <Select placeholder="Yearly" style={{ width: '28vw' }} value={PremiumMode}
//                                             onChange={PremiumModeFunc}>
//                                             <Option value="Select">Select</Option>
//                                             <Option value="Yearly">Yearly</Option>
//                                             <Option value="Half-Yearly">Half-Yearly</Option>
//                                             <Option value="Quarterly">Quarterly</Option>
//                                             <Option value="Monthly">Monthly</Option>
//                                         </Select>
//                                     </Form.Item>
//                                 </Col>
//                                 <Col>
//                                     <Form.Item
//                                         {...formItemLayout}
//                                         className="form-item-name label-color"
//                                         name="Premium Type"
//                                         label="Premium Type"
//                                         hasFeedback
//                                         rules={[
//                                             {
//                                                 required: false,
//                                                 message: 'Please select premium type',
//                                             },
//                                         ]}
//                                     >
//                                         <Select placeholder="Regular" style={{ width: '28vw' }}
//                                             value={PremiumType}
//                                             onChange={PremiumTypeFunc}
//                                         >
//                                             <Option value="Single">Single</Option>
//                                             <Option value="Limited">Limited</Option>
//                                             <Option value="Regular">Regular</Option>
//                                         </Select>
//                                     </Form.Item>
//                                 </Col>
//                                 <Col >
//                                     <Form.Item
//                                         {...formItemLayout}
//                                         className="form-item-name label-color"
//                                         name="Sum Assured"
//                                         label="Sum Assured"
//                                         hasFeedback
//                                         rules={[
//                                             {
//                                                 required: false,
//                                                 message: 'Please enter sum assured',
//                                             },
//                                         ]}
//                                     >
//                                         <Input className="email border-bottom" type="number" placeholder="Enter SumAssured"
//                                             value={SumAssured}
//                                             onChange={SumAssuredFunc}
//                                         />
//                                     </Form.Item>
//                                 </Col>
//                                 <Col >
//                                 </Col>
//                                 <Col >
//                                     <Form.Item
//                                         {...formItemLayout}
//                                         className="form-item-name label-color"
//                                         name="Death Benefit Option"
//                                         label="Death Benefit Option"
//                                         hasFeedback
//                                         rules={[
//                                             {
//                                                 required: false,
//                                                 message: 'Please select death benefit option',
//                                             },
//                                         ]}
//                                     >
//                                         <Select placeholder="Yearly" style={{ width: '28vw' }}
//                                             value={DeathBenefitOption}
//                                             onChange={DeathBenefitOptionFunc}
//                                         >
//                                             <Option value="Select">Select</Option>
//                                             <Option value="Option1">Option 1</Option>
//                                             <Option value="Option2">Option 2</Option>

//                                         </Select>
//                                     </Form.Item>
//                                 </Col>
//                                 <Col>
//                                     <Form.Item
//                                         {...formItemLayout}
//                                         className="form-item-name label-color"
//                                         name="Age Proof"
//                                         label="Age Proof"
//                                         hasFeedback
//                                         rules={[
//                                             {
//                                                 required: false,
//                                                 message: 'Please select age proof',
//                                             },
//                                         ]}
//                                     >
//                                         <Select placeholder="Regular" style={{ width: '28vw' }}
//                                             value={AgeProof}
//                                             onChange={AgeProofFunc}
//                                         >
//                                             <Option value="Select">Select</Option>
//                                             <Option value="Standard">Standard</Option>
//                                             <Option value="Non-Standard">Non-Standard</Option>

//                                         </Select>
//                                     </Form.Item>
//                                 </Col>
//                                 <Col >
//                                     <Form.Item
//                                         {...formItemLayout}
//                                         className="form-item-name label-color"
//                                         name="Annuity Frequency"
//                                         label="Annuity Frequency"
//                                         hasFeedback
//                                         rules={[
//                                             {
//                                                 required: false,
//                                                 message: 'Please select annuity frequency',
//                                             },
//                                         ]}
//                                     >
//                                         <Select placeholder="Yearly" style={{ width: '28vw' }}>
//                                             <Option value="Select">Select</Option>
//                                             <Option value="Yearly">Yearly</Option>
//                                             <Option value="Half-Yearly">Half-Yearly</Option>
//                                             <Option value="Quarterly">Quarterly</Option>
//                                             <Option value="Monthly">Monthly</Option>
//                                         </Select>
//                                     </Form.Item>
//                                 </Col>
//                                 <Col>
//                                     <Form.Item
//                                         {...formItemLayout}
//                                         className="form-item-name label-color"
//                                         name="Annuity Option"
//                                         label="Annuity Option"
//                                         hasFeedback
//                                         rules={[
//                                             {
//                                                 required: false,
//                                                 message: 'Please select annuity option',
//                                             },
//                                         ]}
//                                     >
//                                         <Select placeholder="Regular" style={{ width: '28vw' }}>
//                                             <Option value="Select">Select</Option>
//                                             <Option value="Life Annunity">Life Annunity</Option>
//                                             <Option value="Life Annunity with ROP">Life Annunity with ROP</Option>
//                                         </Select>
//                                     </Form.Item>
//                                 </Col>
//                                 <Col>
//                                     <Form.Item
//                                         {...formItemLayout}
//                                         className="form-item-name label-color"
//                                         name="riders plan"
//                                         label="Do you want to add riders to this plan"
//                                         hasFeedback
//                                         rules={[
//                                             {
//                                                 required: false,
//                                                 message: 'Please select riders plan',
//                                             },
//                                         ]}
//                                     >
//                                         <Radio.Group value={DoyouwanttoaddRiderstothisplan}
//                                             onChange={DoyouwanttoaddRiderstothisplanFunc}>
//                                             <Radio value={1}>Yes</Radio>
//                                             <Radio value={2}>No</Radio>
//                                         </Radio.Group>
//                                     </Form.Item>
//                                 </Col>
//                                 <Col></Col>
//                             </Form>
//                         </Col>
//                         <Col className="benefitillustrator2" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
//                             <Form >
//                                 <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
//                                     <Col  >
//                                         <Button className="bi-btn1">Generate BI</Button>
//                                     </Col>
//                                     <Col >
//                                         <Button className="btn2">Calculate</Button><br />
//                                     </Col>
//                                 </Row>
//                             </Form>
//                         </Col>
//                     </Row>
//                 </Col>
//                 <Col xs={{ order: 2 }} sm={8} md={8} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
//                     <Row>
//                         <Col className="benefitillustrator3" xs={22} sm={24} md={24} lg={24} xl={24} span={24} >
//                             <Title className="bi-heading">Summary</Title><br />
//                             <span className="labels">Plan Option</span>
//                             <h2 className="head2">Home Loan</h2>
//                             <Divider />
//                             <span className="labels">Policy Term</span>
//                             <h2 className="head2">years</h2>
//                             <Divider />
//                             <span className="labels">Premium Paying Term</span>
//                             <h2 className="head2">years</h2>
//                             <Divider />
//                             <span className="labels">Annualised Premium</span>
//                             <h2 className="head2">₹ 0</h2>
//                             <Divider />
//                             <span className="labels">Sum Assured</span>
//                             <h2 className="head2">₹ </h2>
//                             <Divider />
//                             <span className="labels">Payout at Maturity</span>
//                             <h2 className="head2">₹ 0</h2>
//                             <Divider />
//                             <span className="labels">Minimum Payout on Death</span>
//                             <h2 className="head2">₹ 0</h2><Divider />
//                         </Col>
//                     </Row>
//                 </Col>
//                 <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
//                     <Row gutter={['', 24]}>
//                         <Col className="benefit_illustrator" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
//                             <Title className="bi-heading">Benefit Illustration</Title>
//                             {/* <div className="Benefitillustrator-head">
//                                             <div className="Benefitillustrator-buttons">
//                                                 <div className="Benefitillustrator-buttons-display"> */}
//                             <div onClick={selectAllGenderFunc} className={selectAllGenderOption == true ? "benefitillustrator-button" : "benefitillustrator-btn2"} value={selectAllGenderOption}>
//                                 <p className={selectAllGenderOption == true ? "Benefitillustrator-tab-active-text-style" : "Benefitillustrator-tab-text-style"}>
//                                     Maturity
//                                 </p>
//                             </div>
//                             <div onClick={selectViewGenderFunc} className={selectViewGenderOption == true ? "benefitillustrator-button" : "benefitillustrator-btn2"} value={selectViewGenderOption}>
//                                 <p className={selectViewGenderOption == true ? "Benefitillustrator-tab-active-text-style" : "Benefitillustrator-tab-text-style"} >
//                                     Events
//                                 </p>
//                             </div>
//                             <div onClick={selectDisplayGenderFunc} className={selectDisplayGenderOption == true ? "benefitillustrator-button" : "benefitillustrator-btn2"} value={selectDisplayGenderOption}>
//                                 <p className={selectDisplayGenderOption == true ? "Benefitillustrator-tab-active-text-style" : "Benefitillustrator-tab-text-style"}>
//                                     BI
//                                 </p>
//                             </div>
//                             {/* </div>
//                                             </div>
//                                         </div> */}
//                             {selectAllGenderOption ?
//                                 <Col>
//                                     <Card className="img" cover={<img alt="example" src="../base-plan.jpg" />}>
//                                     </Card>
//                                 </Col>
//                                 : selectViewGenderOption ?
//                                     <Col>
//                                         <Card className="img" cover={<img alt="example" src="../death-scenerio.jpg" />}>
//                                         </Card>
//                                     </Col>
//                                     :
//                                     <Col>
//                                         {/* <Card> */}
//                                         <div>
//                                             <h2 className="head2">ABC Endowment Plan 121N018V02</h2>
//                                             <h2 className="head2">Product Benefits</h2>
//                                             <table>
//                                                 <tr>
//                                                     <td >Date Of Quotation</td>
//                                                     <td >11/02/2016</td>
//                                                     <td >Policy Term</td>
//                                                     <td >years</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td >Name of the life insured</td>
//                                                     <td >Abdul Shaikh</td>
//                                                     <td >Premium Payment Term</td>
//                                                     <td >years</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td >Name of the insurance advisor</td>
//                                                     <td >ashraf khan</td>
//                                                     <td >Mode of Premium Payment</td>
//                                                     <td >Yearly</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td >Date Of Birth</td>
//                                                     <td></td>
//                                                     <td >Sum Assured for Basic Plan</td>
//                                                     <td></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td >Policy Commencement Date</td>
//                                                     <td >11/02/2016</td>
//                                                     <td >Total Installment premium (excluding service tax)</td>
//                                                     <td >50000</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td >Total Installment premium including service tax) for Year 1</td>
//                                                     <td >500000</td>
//                                                     <td >Total Installment premium (including service tax)for Year 1 onwards</td>
//                                                     <td >500000</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td >Unique Identification No.</td>
//                                                     <td >A</td>
//                                                     <td >Age</td>
//                                                     <td >0</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td >Advisor Code</td>
//                                                     <td >AGQFLXYR</td>
//                                                     <td >Frequency</td>
//                                                     <td >Regular</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td >Age proof</td>
//                                                     <td >Standard</td>
//                                                     <td></td>
//                                                     <td></td>
//                                                 </tr>
//                                             </table><br />
//                                             <span className="labels">As required by the Life Insurance Council please note, some benefits are guaranteed and some benefits are variable with returns based on the future performance of your Insurer carrying on Life Insurance business.If your policy offers guaranteed returns then these will be clearly marked "guaranteed"in the illustration table on this page.If your policy offers variable returns then the illustrations on this page will show two different rates of assumed future investment returns.These assumed rates of return are not guaranteed and they are not the upper or lower limits of what you might get back, as the value of your policy is dependant on a number of factors including future investment performance</span>
//                                             <h2 className="head2">Benefit Illustration Table</h2>
//                                             <div className="benefit-main">
//                                                 <Card style={contentStyle} >
//                                                     <Table columns={data} scroll={{ x: '150vw' }} />

//                                                 </Card>

//                                             </div><br /><br />
//                                             <p className="bi-paragraph">Insurance is the subject matter of solicitation</p>
//                                             <p className="bi-paragraph">ABC Life Insurance Company Limited is a fully licensed life insurance company registered with the Insurance Regulatory and Development Authority (Registration No: 121) in accordance with the provisions of the Insurance Act 1938.</p>
//                                             <p className="bi-paragraph">*Guaranteed Surrender Value is calculated at year end after paying survival benefits and it includes cash value of bonuses accrued</p>
//                                             <p className="bi-paragraph">**Special surrender value is calculated at year end after paying survival benefits and it includes cash value of bonuses accrued.</p>
//                                             <p className="bi-paragraph">***The applicable Surrender value will be payable after the completion of the third policy year.</p>
//                                             <p className="bi-paragraph">The premium amount shown above is calculated assuming that the life Proposed/Assured is a normal healthy person. In the event the Life Proposed/Assured is suffering from any sickness/ medical problems or in the event of any past medical history, the premium will be adjusted accordingly, as per the underwriting guidelines of ABC Life Insurance Company Limited.</p>
//                                             <p className="bi-paragraph">The main objective of the illustration is that the client is able to appreciate the features of the product and the flow of benefits in different circumstances with some level of quantification.</p>
//                                             <p className="bi-paragraph">The above amounts assume that all premiums are paid when due. Further, the above death and surrender values are illustrated assuming that all the modal/installment premium payable in a policy year are paid (i.e. the event occurs at the end of the policy year). If death or surrender occur and only some of the modal/ installment premium are paid, then the death or surrender values will only consist of that premium that has been paid. Accordingly, the death or surrender values at a time other than at the end of the policy year will be lower than those illustrated above</p>
//                                             <p className="bi-paragraph">1. This premium quotation is indicative. The premium rate charged to the customers may be different depending upon the factors such as health, occupation of the customer and other intrinsic factors such as non submission of documentary evidences like age proof.</p>
//                                             <p className="bi-paragraph">2. The current rate of service tax along with education cess is 3.50% and 1.75% for first year premiums and renewal premium respectively on base policy premium and a service tax along with education cess of 14.00% is levied on rider premiums. The service tax rate will be revised as and when notified by the Government.</p>
//                                             <p className="bi-paragraph">3. Rider premium rates, (if applicable) have not been taken into account in calculating the base premium.</p>
//                                             <p className="bi-paragraph">4. For authoritative details of the rates and the terms and conditions applicable to the particular person/policy, kindly refer to the specifications in the policy document after issuance.</p>
//                                             <p className="bi-paragraph">5. For more details on risk factor, terms and conditions, please read Sales brochure of the plan carefully before concluding a sale.</p>
//                                             <p className="bi-paragraph">6. Subject to the guaranteed minimum surrender value, the company may however pay a special surrender value calculated according to the basis and method in use from time to time. Please refer to sales brochure for more details.</p>
//                                             <p className="bi-paragraph">7. The policy acquires special surrender value after three years full premiums are paid.</p>
//                                             <p className="bi-paragraph">8. The policy acquires Guaranteed surrender value after one year full premiums are paid.</p>
//                                             <p className="bi-paragraph">9. “There is a guaranteed minimum surrender value equal to GSV Premium Factor multiplied by the total premiums paid excluding rider premiums and extra premiums paid, less any survival benefits already paid Plus GSV Bonus factor multiplied by the vested bonuses, if any. For GSV premium factors & GSV Bonus factor, kindly refer to the Policy document.”</p>
//                                             <p className="bi-paragraph">10. Special Surrender Value (SSV) is a non guaranteed benefit. SSV is equal to Special surrender value factor multiplied by Maturity Benefit multiplied by (No. of premiums paid / No. of premiums payable during the policy term) Plus Special surrender value factor multiplied by Vested Bonus.</p>
//                                             <p className="bi-paragraph">11. Upon non-payment of due premiums the policy acquires Paid up value after three years full premiums are paid. Please refer to sales brochure for more details.</p>
//                                             <p className="bi-paragraph">12. The actual bonus amount will be derived from company's bonus philosophy, economic environment, actual experience and other factors.</p>
//                                             <p className="bi-paragraph">13. Taxes, duties or surcharges of whatever description levied by any statutory authority will be applicable.</p>
//                                             <p className="bi-paragraph">I Kasturi Shah, have explained the information with respect to the above, to the prospect before entering into the contract.</p>
//                                             <p className="bi-paragraph">Intermediary's Signature:</p>
//                                             <p className="bi-paragraph">Place:</p>
//                                             <p className="bi-paragraph">Date:</p>
//                                             <p className="bi-paragraph">I Neha Nigam, having received the information with respect to the above, have understood the above statement before entering into the contract.</p>
//                                             <p className="bi-paragraph">Policyholders' Signature:</p>
//                                             <p className="bi-paragraph">Place:</p>
//                                             <p className="bi-paragraph">Date:</p>
//                                             <p className="bi-paragraph">ABC Life Insurance Co. Ltd. is only the name of the Insurance Company and ABC Endowment Plan is only the name of the Life insurance contract and does not in any way indicate the quality of the contract, its future prospects or returns “For more details on risk factors , terms and conditions please read sales brochure carefully before concluding a sale”.</p>
//                                             <p className="bi-paragraph">Insurance is the subject matter of the solicitation.</p>
//                                         </div>
//                                         {/* </Card> */}
//                                     </Col>



//                             }
//                             {/* <div>
//                                 <h2 className="head2">ABC Endowment Plan 121N018V02</h2>
//                                 <h2 className="head2">Product Benefits</h2>
//                                 <table>
//                                     <tr>
//                                         <td className="para">Date Of Quotation</td>
//                                         <td className="para">11/02/2016</td>
//                                         <td className="para">Policy Term</td>
//                                         <td className="para">years</td>
//                                     </tr>
//                                     <tr>
//                                         <td className="para">Name of the life insured</td>
//                                         <td className="para">Abdul Shaikh</td>
//                                         <td className="para">Premium Payment Term</td>
//                                         <td className="para">years</td>
//                                     </tr>
//                                     <tr>
//                                         <td className="para">Name of the insurance advisor</td>
//                                         <td className="para">ashraf khan</td>
//                                         <td className="para">Mode of Premium Payment</td>
//                                         <td className="para">Yearly</td>
//                                     </tr>
//                                     <tr>
//                                         <td className="para">Date Of Birth</td>
//                                         <td></td>
//                                         <td className="para">Sum Assured for Basic Plan</td>
//                                         <td></td>
//                                     </tr>
//                                     <tr>
//                                         <td className="para">Policy Commencement Date</td>
//                                         <td className="para">11/02/2016</td>
//                                         <td className="para">Total Installment premium (excluding service tax)</td>
//                                         <td className="para">50000</td>
//                                     </tr>
//                                     <tr>
//                                         <td className="para">Total Installment premium including service tax) for Year 1</td>
//                                         <td className="para">500000</td>
//                                         <td className="para">Total Installment premium (including service tax)for Year 1 onwards</td>
//                                         <td className="para">500000</td>
//                                     </tr>
//                                     <tr>
//                                         <td className="para">Unique Identification No.</td>
//                                         <td className="para">A</td>
//                                         <td className="para">Age</td>
//                                         <td className="para">0</td>
//                                     </tr>
//                                     <tr>
//                                         <td className="para">Advisor Code</td>
//                                         <td className="para">AGQFLXYR</td>
//                                         <td className="para">Frequency</td>
//                                         <td className="para">Regular</td>
//                                     </tr>
//                                     <tr>
//                                         <td className="para">Age proof</td>
//                                         <td className="para">Standard</td>
//                                         <td></td>
//                                         <td></td>
//                                     </tr>
//                                 </table>
//                                 <p>As required by the Life Insurance Council please note, some benefits are guaranteed and some benefits are variable with returns based on the future performance of your Insurer carrying on Life Insurance business.If your policy offers guaranteed returns then these will be clearly marked "guaranteed"in the illustration table on this page.If your policy offers variable returns then the illustrations on this page will show two different rates of assumed future investment returns.These assumed rates of return are not guaranteed and they are not the upper or lower limits of what you might get back, as the value of your policy is dependant on a number of factors including future investment performance</p>
//                                 <h2 className="head2">Benefit Illustration Table</h2>
//                                 <div className="benefit-main">
//                                     <Card style={contentStyle} >
//                                         <Table columns={data} scroll={{ x: '150vw' }}  />
//                                         <p className="para">Insurance is the subject matter of solicitation</p>
//                                     </Card>
//                                 </div>
//                                 </div> */}
//                         </Col>
//                     </Row>
//                 </Col>
//                 <Col xs={{ order: 4 }} sm={24} md={24} lg={{ order: 4 }} xl={{ order: 4 }} span={22}>
//                     <Row gutter={['', 24]}>
//                         <Col className="benefitillustrator1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
//                             {/* <Link to={{
//                                 pathname: "/master/proposalfulfilment",
//                                 state: { recorddata: biArr },
//                             }} ClassName="link-btn">Proceed</Link> */}
//                             <Button className="btn3" >Proceed
//                                 <ArrowRightOutlined
//                                     style={{
//                                         marginTop: "5px"
//                                     }}
//                                 />
//                             </Button>
//                         </Col>
//                     </Row>
//                 </Col>
//             </Row>

//         </div >
//     );
// }

// export default BenefitIllustrator;