import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Menu, Tabs, Typography, Button, Input, Radio, Select, Cascader, DatePicker, Space, Modal, Checkbox } from 'antd';
import { Divider, Image, Card, Table } from 'antd';
import axios from 'axios';


import MainTabs from '../../components/MainTabs/MainTabs';
import {
    ArrowRightOutlined
} from '@ant-design/icons';
import './ProposalFulfilment.css';
import { useSelector } from 'react-redux';
// import axios from 'axios';
import {
    BrowserRouter as Router,
    Link, useLocation, useHistory
} from "react-router-dom";
import { applyStyleProp } from '@fullcalendar/react';
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

]
// import Tabs from '../Tab';
const { Title } = Typography;
function onChange(date, dateString) {



}



const { Option } = Select;
const contentStyle = {
    height: '100px',
    color: '#fff',
    // lineHeight: '180px',
    // textAlign: 'center',
    // background: '#364d79',
};
const columns = [
    {
        title: 'Insurer',
        dataIndex: 'image',
        key: 'name',

    },
    {
        title: 'Sum Assured',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Policy Type',
        dataIndex: 'address',
        key: 'address',
    },

    {
        title: 'Policy Status',
        key: 'Policy Status',

    },
    {
        title: 'Risk Commencement....',
        dataIndex: 'Risk Commencement ',
        key: 'Risk Commencement ',
    },
    {
        title: 'Application Date',
        dataIndex: 'Application Date',
        key: 'Application Date',
    },
    {
        title: 'Action',
        dataIndex: 'Action',
        key: 'Action',
    },
];
const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};
// const setStateOptions = [

//     { value: "Mr", label: "Mr" },
//     { value: "Mrs", label: "Mrs" },
//     { value: "Dr", label: "Dr" },
//     { value: "Prof", label: "Prof" }
// ]
const ProposalFulfilment = () => {
    const [selectAllGenderOption, setSelectAllGenderOption] = useState(true);
    const [selectViewGenderOption, setSelectViewGenderOption] = useState(false);
    const [selectDisplayGenderOption, setSelectDisplayGenderOption] = useState(false);

    const [proposalfulfilmentData, setproposalFulfilmentData] = useState();
    // const [updateAt,setupdateAt]=useState()
    // const [fullName,setfullName]=useState()
    // const putItmes ={
    //     fullName:fullName
    // }

    // const handlePutdata=()=>{

    //     useEffect=(()=>{
    //         axios.put('https://sdrestnode.iorta.in/secure/sd/user/updateProposal/624d6845d9cf413d6041a859',putItmes)
    //     .then(response => setupdateAt(response.data.updateAt))
    //     },[])


    // }
    const selectAllGenderFunc = () => {
        setSelectAllGenderOption(true)
        setSelectViewGenderOption(false)
        setSelectDisplayGenderOption(false)
    }
    const selectViewGenderFunc = () => {
        setSelectAllGenderOption(false)
        setSelectViewGenderOption(true)
        setSelectDisplayGenderOption(false)
    }
    const selectDisplayGenderFunc = () => {
        setSelectAllGenderOption(false)
        setSelectViewGenderOption(false)
        setSelectDisplayGenderOption(true)
    }
    // const location = useLocation();
    // const { recorddata } = location.state;
    const [biArr, setBIArr] = useState([]);
    const [value, setValue] = React.useState('');
    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");


    // constructor(props) {
    //     super(props);
    //     this.state = { value: '' };
    //     this.handleChange = this.handleChange.bind(this);

    // }

    // handleChange(event) {
    //     this.setState({ value: event.target.value });
    // }
    // useEffect(() => {
    //    axios.get("https://sdrestnode.iorta.in/secure/sd/user/getProposal/61974af11dca6c56f4d380d9")
    //         .then((res) => {
    //             setBIArr(
    //                 res.data.data[0]
    //             );
    //         });


    // }, []);
    const putData = () => { axios.put('https://sdrestnode.iorta.in/secure/sd/user/updateProposal/624d6845d9cf413d6041a859', PutproposalFulfilmentData) }
    const PutproposalFulfilmentData = {
        // IclocksProposerandLifetobe:'',
        // Astadholdershipadhar:'',
        // AuthorizationbyLi_agree:'',
        // Tethmopalatineitle:'',
        // FbranchiurousullName:'',
        // FcrozzlyathersFullName:'',
        // GenderofLifeAssured:'',
        // MtenuisaritalStatus:'',
        // DateofBirthofLifeAssured:'',
        // Eexuviationducation:'',
        // SmesepisternumourceOfIncome:'',
        // AchurchwardnnualIncome:'',
        // PsmokeryuposeOfInsurance:'',
        // Odaityaccupation:'',
        // JomoplatoscopyobDescription:'',
        // JomoplatoscNatureofDuties:'',
        // AbuzzerreyouABCGroupemployee:'',
        // OunimucronateptingforECS:'',
        // PblackbackANCardNo:'',
        // BpeddleankAccountNo:'',
        // IsaddlebagFSCCode:'',
        // BpreternaturalistankName:'',
        // BacanthodianankBranch:'',
        // BpantomimistankAccountProof:'',
        // AsmellingddressLine1:'',
        // AbatwingddressLine2:'',
        // Sgalumphtate:'',
        // CUmbellulidaeity:'',
        // PperiproctousinCode:'',
        // EmployeeId:'',
        // MartarobileNo:'',
        // LrediscussionandlineNo:'',
        // Isynecdochicallysyour:'',
        // mailingAddressSecond:{
        //     city:'',
        //     mailingaddress:{
        //         line1:"",
        //         line2:"",
        //         pincode: "",
        //         state: ""
        //     }
        // }


        ////////////////////////////


        //         personalAddressLine2: personalAddressLine2,
        //         areYouABC_GroupEmployee: areYouABC_GroupEmployee,
        //         AnnualIncome: null,
        //         AdvisorCode: AdvisorCode,
        //         AdvisorName: AdvisorName,
        //         AgeProof: AgeProof,
        //         AnnuityFrequency: AnnuityFrequency,
        //         AnnuityOption: AnnuityOption,
        //         AnotherAppointeeDeatails_second: {Gender: Gender, Title: Title, Name: Name, Dob: Dob, Relationship: Relationship, MobileNo: MobileNo, Email: Email, Details: Details},

        //         AnotherAppointeeaddresssameasLA_second: {Add1: Add1, Add2: Add2, State: State, City: City, Code: Code},

        //         AnotherNomineeDeatails_second: {Gender: Gender, Title: Title, Name: Name, Dob: Dob, Relationship: Relationship, MobileNo: MobileNo, Email: Email, Details: Details},

        //         AnotherNomineeaddresssameasLA_second: {Add1: "", Add2: "", State: "", City: "", Code: ""},

        //         AppointeeaddresssameasLA_first: {Add1: Add1, Add2: Add2, State: State, City: City, Code: Code},

        //         personalAddressLine1: personalAddressLine1,
        //         AadharCardNumber: AadharCardNumber,
        //         AuthorizationbyLi_agree: AuthorizationbyLi_agree,
        //         BankBranch: BankBranch,
        //         personalBankAccountProof: personalBankAccountProof,
        //         BankAccountNo: BankAccountNo,
        //         BankName: BankName,
        //         personalCity: personalCity,
        //         CalculatorType: CalculatorType,
        //         WilltheNomineeDetailsbesameasaboveforPlan2: WilltheNomineeDetailsbesameasaboveforPlan2,
        //         AuthorizationbyLifetobeAssuredProposer1: AuthorizationbyLifetobeAssuredProposer1,
        //         Cheque_method: Cheque_method,
        //         ChildDateofBirth: ChildDateofBirth,
        //         ChildGender: ChildGender,
        //         ChildName: ChildName,
        // CustomerDeclarationCapture_status: false,
        //         DateofBirthofLifeAssured: DateofBirthofLifeAssured,
        //         DeathBenefitOption: DeathBenefitOption,
        //         DeclarationbyLifeto: DeclarationbyLifeto,
        //         DoyouwanttoaddRiderstothisplan: DoyouwanttoaddRiderstothisplan,
        //         personalDateofBirth: personalDateofBirth,
        //         Education: Education,
        //         personalEmailID: personalEmailID,
        //         personalFullName: personalFullName,
        //         FathersFullName: FathersFullName,
        //         GenderofLifeAssured: GenderofLifeAssured,
        //         personalGender: personalGender,
        //         HaveLifeInsurance_details: [],
        //         isProposerAndLifeToBeAssureTheSame: isProposerAndLifeToBeAssureTheSame,
        //         InstallmentPremium: null,
        //         InvestmentOption: InvestmentOption,
        //         IFSCCode: IFSCCode,
        //         isYourPermanentMailingAdress: isYourPermanentMailingAdress,
        //         IAgreecheckbox: IAgreecheckbox,
        //         Question1: Question1,
        //         NatureofDuties: NatureofDuties,
        //         JobDescription: JobDescription,
        //         LifeBalancedFund1: null,
        //         LifeCorporationBondFund1: null,
        //         LifeEquityFund3: null,
        //         LifeMoneyMarketFund1: null,
        //         LifePureEquityFund2: null,
        //         LandlineNo: null,
        //         MakeinIndiaFund: null,
        //         personalMobileNo: personalMobileNo ,
        //         MethodofPaymentecs: MethodofPaymentecs,
        //         personalMaritalStatus: personalMaritalStatus,
        //         Nationality: Nationality,
        //         NameofLifeAssured: NameofLifeAssured,
        //         Nameofparentspouse: Nameofparentspouse,
        //         NomineeaddresssameasLA_first: {Add1: Add1, Add2: Add2, State: State, City: City, Code: Code},

        //         Occupation: Occupation,
        //         OptingforECS: OptingforECS,
        //         PANCardNo: PANCardNo,
        //         PolicyTerm: PolicyTerm,
        //         PolicynotbecalledinquestionafterthreeyearsAgreeornot: PolicynotbecalledinquestionafterthreeyearsAgreeornot,
        //         EmailID: EmailID,
        //         personalPincode: null,
        //         PremiumMode: PremiumMode,
        //         PremiumPayingTerm: PremiumPayingTerm,
        //         PremiumType: PremiumType,
        //         Prohibitationofrebate: Prohibitationofrebate,
        //         PuposeOfInsurance: PuposeOfInsurance,
        //         RelationshipofChildwithLifeAssured: RelationshipofChildwithLifeAssured,
        //         personalState: personalState,
        //         SmartPensionFund1: null,
        //         SourceOfIncome: SourceOfIncome,
        //         SumAssured: SumAssured,
        //         personalTitle: personalTitle,
        //         NomineeName: NomineeName,
        //         HowlonghaveyoukonwntheLifetobeassured_month: null,
        // UploadAddressProof_status: false,
        // UploadAgeProof_status: false,
        // UploadIDProof_status: false,
        // UploadIncomeProof_status: false,
        // UploadPhotoID_status: false,
        //         Question12: Question12,
        //         AuthorizationbyLifetobeAssuredProposer3: AuthorizationbyLifetobeAssuredProposer3,
        //         annualisedPremium: annualisedPremium,
        // bI_export_pdf_status: '',
        //         nomineeEmailID: nomineeEmailID,
        //         medicalQuestion6: medicalQuestion6,
        //         nomineeDateofBirth: nomineeDateofBirth,
        //         Question5: Question5,
        //         Question6: Question6,
        //         currentRoute: "/master/testpro/proposalreport",
        //         WitnessState: WitnessState,
        //         medicalQuestion3: medicalQuestion3,
        //         AdvisorPlace: AdvisorPlace,
        //         Question4: Question4,
        //         medicalQuestion2: medicalQuestion2,
        //         Title_n: Title_n,
        //         AuthorizationbyLifetobeAssuredProposer2: AuthorizationbyLifetobeAssuredProposer2,
        //         Question3: Question3,
        //         Dobnominee: Dobnominee,
        //         WitnessPincode: null,
        //         FamilyHistoryDetails: FamilyHistoryDetails,
        //         WeightinKgs: null,
        //         incomeofProposer: incomeofProposer,
        //         Gender_n: Gender_n,
        //         medicalQuestion11: medicalQuestion11,
        // leadId: "",
        //         lifeinsuranceDetails: lifeinsuranceDetails,
        //         mailingAddressSecond: {mailingaddress: {line1: line1, line2: line2}, state: state, city: city, pincode: pincode},
        //         city: city,
        //         mailingaddress: {line1: line1, line2: line2},
        //         line1: "",
        //         line2: "",
        //         pincode: "",
        //         state: "",
        //         NomineeName_n: NomineeName_n,
        //         personalMaritalStatus: personalMaritalStatus,
        //         relationship_with_nominee: relationship_with_nominee,
        //         medicalQuestion7: medicalQuestion7,
        //         WitnessAddressLine1: WitnessAddressLine1,
        //         HeightinInches: HeightinInches,
        //         DoyouwanttoaddanotherNominee: DoyouwanttoaddanotherNominee,
        //         overmuchness: overmuchness,
        //         IstheNomineeaddresssameasLA: IstheNomineeaddresssameasLA,
        //         nomineeGender: nomineeGender,
        //         witness_date: witness_date,
        //         parturientDoyouwanttoaddanotherApp: parturientDoyouwanttoaddanotherApp,
        //         WitnessCity: WitnessCity,
        //         WitnessAddressLine2: WitnessAddressLine2,
        //         Question7: Question7,
        //         MobileNo:MobileNo ,
        // productId: {_id: ""},
        // active: 1,
        // appID: "",
        // channelCode: ["", ""],
        // 0: "",
        // 1: "",
        // createdDate: "",
        // created_by: "",
        // imageTitle: "",
        // lastupdatedOn: "",
        // productBrochure: [{files: {name: "", type: ""}}],
        // 0: {files: {name: "", type: ""}},
        // productCategory: "",
        // productDescription: "",
        // productImages: [{}],
        // 0: {},
        // productName: "",
        // productReasons: {reason1: "", reason2: ""},
        // reason1: "",
        // reason2: "",
        // reason3: "",
        // reason4: "",
        // reason5: "",
        // productVideo: [{}],
        // 0: {},
        // active: 1,
        // location: "",
        // name: "",
        // type: "",
        // product_code: "",
        // updated_by: "",
        // userId: "",
        // videoLink: "",
        // videoTitle: "",
        // web_link: "",
        // _id: "",
        // proposalStatus: "",
        // prosect: "",
        //         nomineeTitle: nomineeTitle,
        //         medicalQuestion10: medicalQuestion10,
        //         HowlonghaveyoukonwntheLifetobeassured_year: null,
        //         nomineeMobileNo: null,
        //         summityRelationshipofnomine: summityRelationshipofnomine,
        //         witness_mobile_no: null,
        //         medicalQuestion4: medicalQuestion4,
        //         totalsumass: null,
        //         witness_name: witness_name,
        //         unguentariaIstheAppointeeaddresssameasN: unguentariaIstheAppointeeaddresssameasN,
        //         medicalQuestion9: medicalQuestion9,
        //         TypeOfIncomeproof: TypeOfIncomeproof,
        //         medicalQuestion8: medicalQuestion8,
        // userId: "",
        //         HowlonghaveyoukonwntheLifetobeassured_fls_mob_no: null,
        //         medicalQuestion1: medicalQuestion1,









    }

    const selector = useSelector((state) => state.applicationReducer.singleCardData)

    const [getproposalFulfilment, setgetproposalFulfilment] = useState();
    const getData = async () => {
        const res = await axios.get(
            "https://sdrestnode.iorta.in/secure/sd/user/getProposal/62600602d9cf413d6041a980"
        );
        setgetproposalFulfilment(res.data.data);
    };


    useEffect(() => {
        getData();
    }, []);
    return (
        <>  <div className='main-div'>
            <div className="proposal-main">
                <MainTabs
                    tabMenu={tabMenu}
                    // header="New Lead"
                    activeKey="proposalfulfilment"
                />
                <div className="proposalfulfilment-row-flex">
                    <Tabs tabPosition={tabPosition} style={{ marginLeft: '1vw', marginRight: '1vw', marginTop: '1vw', backgroundColor: 'white', fontWeight: 'bolder' }}>

                        <TabPane tab="Personal" key="1">
                            <div className="proposalfulfilment-details-card-style ">
                                <div className="proposalfulfilment-details-card-content-align">
                                    <Row gutter={[40, 24]} justify="start">
                                        <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                            <Row gutter={['', 24]}>
                                                <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                    <Form >
                                                        <Col>
                                                            <span className="proposal-label">Is Proposer and Life to be Assured the same?</span><br />
                                                            <div>
                                                                <Radio.Group defaultValue={selector.personalDetails.IsProposerandLifetobeAssuredthesame} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, isProposerAndLifeToBeAssureTheSame: e.target.value })} >
                                                                    <Radio value={1} >Yes</Radio>
                                                                    <Radio value={2} >No</Radio>
                                                                </Radio.Group>
                                                            </div>
                                                        </Col>
                                                    </Form>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                            <Row gutter={['', 24]}>
                                                <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                    <h3 className="proposal-head3"> <b> Life To Be Assured</b></h3>
                                                    <h4 className="proposal-head4"> <b> Aadhar Card Details</b></h4>
                                                    <Form layout="horizontal" className="contact-detail-form">
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="Aadhar Card Number"
                                                                label="Aadhar Card Number"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Please enter aadhar card number',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input className="first-name border-bottom" defaultValue={selector.personalDetails.AadharCardNumber} placeholder="Enter Aadhar Card Number" onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AadharCardNumber: e.target.value })} />
                                                                {/* value={this.state.value} onChange={this.handleChange} */}
                                                            </Form.Item>
                                                        </Col>
                                                    </Form>
                                                    <Col>
                                                        <h2 className="proposal-head2">Consent For Aadhar Authentication</h2>
                                                        <p className="proposal-paragraph">
                                                            I, the holder of Aadhar number xxxxxxxx, hereby give my consent to ABC Nippon Life Insurance to obtain my Aadhar Number,Name and Fingerprints/Iris details for authentication with UIDAI.ABC Nippon Life Insurance has informed me that my identity information would only be used for life insurance proposal and also informed that my biometrics will not be stored/shared and will be submitted to CIDR only for the purpose of authentication.
                                                        </p>
                                                    </Col><br />
                                                    <Col>
                                                        <Checkbox defaultChecked={selector.personalDetails.IAgreecheckbox} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AuthorizationbyLi_agree: e.target.value })} className="proposal-checkbox">I agree with the consent mentioned above</Checkbox>
                                                    </Col><br />
                                                    <Col>
                                                        <Button className="proposal-btn">Submit</Button>
                                                    </Col><br />
                                                    <Col>
                                                        <Form layout="horizontal" className="contact-detail-form">
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Title"
                                                                    label="Title"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter title',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <select defaultValue={selector.personalDetails.Title} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, personalTitle: e.target.value })} className='select-input' placeholder="Select" style={{ width: '28vw' }}>
                                                                        <option value={'Select'}>Select</option>
                                                                        <option value={'Mr'}>Mr</option>
                                                                        <option value={'Mrs'}>Mrs</option>
                                                                        <option value={'Dr'}>Dr</option>
                                                                        <option value={'Prof'}>Prof</option>
                                                                    </select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Full Name"
                                                                    label="Full Name"
                                                                    value={selector.personalDetails.FullName}
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter full name',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.FullName} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, personalFullName: e.target.value })} className="first-name border-bottom" placeholder="Enter Full Name" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Fathers Full Name"
                                                                    label="Fathers Full Name"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter fathers full name',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.FathersFullName} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, FathersFullName: e.target.value })} className="first-name border-bottom" placeholder="Enter Fathers Full Name" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="gender"
                                                                    label="Gender"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select Nominee gender',
                                                                        },
                                                                    ]}
                                                                >

                                                                    <Radio.Group defaultValue={selector.personalDetails.Gender} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, personalGender: e.target.value })} buttonStyle="solid">
                                                                        <Radio.Button value="a" className="radio">Male</Radio.Button>
                                                                        <Radio.Button value="b" className="radio">Female</Radio.Button>
                                                                        <Radio.Button value="c" className="radio">Other</Radio.Button>
                                                                    </Radio.Group>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="marital status"
                                                                    label="Marital Status"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select martial status',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <select defaultValue={selector.personalDetails.MaritalStatus} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, personalMaritalStatus: e.target.value })} className='select-input' placeholder="Select a marital status">
                                                                        <option value="Select">Select</option>
                                                                        <option value="Single">Single</option>
                                                                        <option value="Married">Married</option>
                                                                        <option value="Divorced">Divorced</option>
                                                                        <option value="Widowed">Widowed</option>
                                                                    </select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="dob"
                                                                    label="Date Of Birth Of Life Assured"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select date of birth of life assured',
                                                                        },
                                                                    ]}
                                                                >    <input type="date" defaultValue={selector.personalDetails.DateofBirth} className='select-input' onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, personalDateofBirth: e.target.value })} />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Nationality"
                                                                    label="Nationality"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select nationality',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.Nationality} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, Nationality: e.target.value })} className="first-name border-bottom" placeholder="Enter Nationality" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Education"
                                                                    label="Education"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter education',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.Education} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, Education: e.target.value })} className="first-name border-bottom" placeholder="Enter Education" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Source Of Income"
                                                                    label="Source Of Income"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter source of income',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.SourceOfIncome} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, SourceOfIncome: e.target.value })} className="first-name border-bottom" placeholder="Enter Source Of Income" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Annual Income"
                                                                    label="Annual Income"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter annual income',
                                                                        },
                                                                    ]}
                                                                ><Input defaultValue={selector.personalDetails.AnnualIncome} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnnualIncome: e.target.value })} className="first-name border-bottom" placeholder="Enter Annual Income" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Purpose Of Insurance"
                                                                    label="Purpose Of Insurance"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select purpose of income',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <select defaultValue={selector.personalDetails.PuposeOfInsurance} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, PuposeOfInsurance: e.target.value })} className='select-input' placeholder="Select purpose of insurance">
                                                                        <option value="Select">Select</option>
                                                                        <option value="Investment">Investment</option>
                                                                        <option value="Protection">Protection</option>
                                                                    </select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Occupation"
                                                                    label="Occupation"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select occupation',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <select defaultValue={selector.personalDetails.Occupation} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, Occupation: e.target.value })} className='select-input' placeholder="Select occupation">
                                                                        <option value="Select">Select</option>
                                                                        <option value="Agriculture">Agriculture</option>
                                                                        <option value="AntiqueDealer">AntiqueDealer</option>
                                                                        <option value="Armed Forces">Armed Forces</option>
                                                                        <option value="Business">Business</option>
                                                                        <option value="Diamond Trader">Diamond Trader</option>
                                                                        <option value="Farmer">Farmer</option>
                                                                        <option value="House Wife">House Wife</option>
                                                                        <option value="House Wife with High Income">House Wife with High Income</option>
                                                                        <option value="Jewellery Dealer">Jewellery Dealer</option>
                                                                        <option value="Labour">Labour</option>
                                                                        <option value="Machine Operator">Machine Operator</option>
                                                                        <option value="Politically Exposed Person">Politically Exposed Person</option>
                                                                        <option value="Professionals">Professionals</option>
                                                                        <option value="Retired">Retired</option>
                                                                        <option value="Salaried">Salaried</option>
                                                                        <option value="Unemployed">Unemployed</option>
                                                                        <option value="Working in Coal Mines">Working in Coal Mines</option>
                                                                    </select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Job Description"
                                                                    label="Job Description"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter job description',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.JobDescription} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, JobDescription: e.target.value })} className="email border-bottom" placeholder="Enter Job Description" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Nature Of Duties"
                                                                    label="Nature Of Duties"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter nature of duties',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.NatureofDuties} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, NatureofDuties: e.target.value })} className="email border-bottom" type="number" placeholder="Enter Nature Of Duties" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Are you ABC Group employee"
                                                                    label="Are you ABC Group employee"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select ABC group employee',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Radio.Group defaultValue={selector.personalDetails.AreyouABCGroupemployee} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, areYouABC_GroupEmployee: e.target.value }, onChange)} >
                                                                        <Radio value={1}>Yes</Radio>
                                                                        <Radio value={2}>No</Radio>
                                                                    </Radio.Group>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Employee ID"
                                                                    label="Employee ID"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter Employee ID',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.NatureofDuties} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, EmployeeId: e.target.value })} className="email border-bottom" type="number" placeholder="Enter Employee ID" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Opting for ECS?"
                                                                    label="Opting for ECS?"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select opting for ECS',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Radio.Group defaultValue={selector.personalDetails.OptingforECS} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, OptingforECS: e.target.value }, onchange)} >
                                                                        <Radio value={1}>Yes</Radio>
                                                                        <Radio value={2}>No</Radio>
                                                                    </Radio.Group>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col></Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="PAN Card"
                                                                    label="PAN Card"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter pan card number',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.PANCardNo} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, PANCardNo: e.target.value })} className="email border-bottom" type="number" placeholder="Enter PAN card No." />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col></Col>
                                                            <Col>
                                                                <h3 className="proposal-head3">Bank Details</h3>
                                                                <p className="proposal-paragraph">(Manadatory only in case if premium is &gt;= 25000)</p>
                                                            </Col>
                                                            <Col></Col>

                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Bank Account No"
                                                                    label="Bank Account No"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter bank account no',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.BankAccountNo} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, BankAccountNo: e.target.value })} className="email border-bottom" type="number" placeholder="Enter Bank Account No" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="IFSC Code"
                                                                    label="IFSC Code"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter IFSC Code',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.IFSCCode} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, IFSCCode: e.target.value })} className="email border-bottom" type="number" placeholder="Enter IFSC Code" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Bank Name"
                                                                    label="Bank Name"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter bank name',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.BankName} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, BankName: e.target.value })} className="email border-bottom" type="text" placeholder="Bank Name" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Bank Branch"
                                                                    label="Bank Branch"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter bank branch',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.BankBranch} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, BankBranch: e.target.value })} className="email border-bottom" type="text" placeholder="Enter Bank Branch" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Bank Account Proof"
                                                                    label="Bank Account Proof"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select bank account proof',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <select defaultValue={selector.personalDetails.BankAccountProof} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, personalBankAccountProof: e.target.value })} className='select-input' placeholder="Select">
                                                                        <option value="Select">Select</option>
                                                                        <option value="Life Annunity">Cancelled Cheque</option>
                                                                        <option value="Life Annunity with ROP">Passbook Copy</option>

                                                                    </select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col></Col>
                                                            <Col>
                                                                <h3 className="proposal-head3">Mailing Address</h3>
                                                            </Col>
                                                            <Col></Col>

                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Address Line 1"
                                                                    label="Address Line 1"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter address line 1',
                                                                        },
                                                                    ]}
                                                                ><Input defaultValue={selector.personalDetails.AddressLine1} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, personalAddressLine1: e.target.value })} className="email border-bottom" type="text" placeholder="Enter Address Line 1" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Address Line 2"
                                                                    label="Address Line 2"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select address line 2',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.AddressLine2} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, personalAddressLine2: e.target.value })} className="email border-bottom" type="text" placeholder="Enter Address Line 2" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="State"
                                                                    label="State"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select State',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <select defaultValue={selector.personalDetails.State} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, personalState: e.target.value })} className='select-input' placeholder="Select">
                                                                        <option value="Select">Select</option>
                                                                        <option value="Life Annunity">Life Annunity</option>
                                                                        <option value="Life Annunity with ROP">Life Annunity with ROP</option>

                                                                    </select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="City"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select City',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <select defaultValue={selector.personalDetails.City} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, personalCity: e.target.value })} className='select-input' placeholder="Select">
                                                                        <option value="Select">Select</option>
                                                                        <option value="Life Annunity">Tura</option>
                                                                        <option value="Life Annunity with ROP">Shillong</option>
                                                                        <option>Nongstoin</option>
                                                                        <option>Nongpoh</option>
                                                                        <option>Mankachar</option>
                                                                        <option>Mairang</option>
                                                                        <option>Cherrapunji</option>
                                                                    </select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Pin Code"
                                                                    label="Pin Code"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter pin code',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.PinCode} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, personalPincode: e.target.value })} className="email border-bottom" type="text" placeholder="Enter Pin Code" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Email ID"
                                                                    label="Email ID"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter email id',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, personalEmailID: e.target.value })} className="email border-bottom" type="text" placeholder="Enter Email ID" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Mobile No"
                                                                    label="Mobile No"
                                                                    value={selector.personalDetails.MobileNo}
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter mobile no',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.MobileNo} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, personalMobileNo: e.target.value })} className="email border-bottom" type="text" placeholder="Enter Mobile No" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Landline No"
                                                                    label="Landline No"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter landline no',
                                                                        },
                                                                    ]}
                                                                ><Input defaultValue={selector.personalDetails.LandlineNo} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, LandlineNo: e.target.value })} className="email border-bottom" type="text" placeholder="Enter Landline No" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <h3 className="proposal-head3">Permanent Address</h3>
                                                            </Col>
                                                            <Col></Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="permanent address"
                                                                    label="Is Your Permanent address same as Mailing address?"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select permanent address same as mailing address ',
                                                                        },
                                                                    ]}
                                                                ><Radio.Group defaultValue={selector.personalDetails.IsyourPermanentaddresssameasmailingaddress} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, isYourPermanentMailingAdress: e.target.value })} onChange={onChange}>
                                                                        <Radio value={1}>Yes</Radio>
                                                                        <Radio value={2}>No</Radio>
                                                                    </Radio.Group>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col></Col>

                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Address Line 1"
                                                                    label="Address Line 1"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter address line 1',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.AddressLine1} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, mailingAddressSecond: { mailingaddress: { line1: e.target.value } } })} className="email border-bottom" type="text" placeholder="Enter Address Line 1" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Address Line 2"
                                                                    label="Address Line 2"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter address line 2 ',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input defaultValue={selector.personalDetails.AddressLine2} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, mailingAddressSecond: { mailingaddress: { line2: e.target.value } } })} className="email border-bottom" type="text" placeholder="Enter Address Line 2" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="State"
                                                                    label="State"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select state',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <select defaultValue={selector.personalDetails.State} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, mailingAddressSecond: { mailingaddress: { state: e.target.value } } })} className='select-input' placeholder="Select">
                                                                        <option value="Select">Select</option>
                                                                        <option value="Life Annunity">Life Annunity</option>
                                                                        <option value="Life Annunity with ROP">Life Annunity with ROP</option>

                                                                    </select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="City"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select city',
                                                                        },
                                                                    ]}
                                                                ><select defaultValue={selector.personalDetails.City} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, mailingAddressSecond: { city: e.target.value } })} className='select-input' placeholder="Select">
                                                                        <option value="Select">Select</option>
                                                                        <option value="Life Annunity">Tura</option>
                                                                        <option value="Life Annunity with ROP">Shillong</option>
                                                                        <option>Nongstoin</option>
                                                                        <option>Nongpoh</option>
                                                                        <option>Mankachar</option>
                                                                        <option>Mairang</option>
                                                                        <option>Cherrapunji</option>
                                                                    </select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="Pin Code"
                                                                    label="Pin Code"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter pin code',
                                                                        },
                                                                    ]}
                                                                ><Input defaultValue={selector.personalDetails.PinCode} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, mailingAddressSecond: { mailingaddress: { pincode: e.target.value } } })} className="email border-bottom" type="text" placeholder="Enter Pin Code" />
                                                                </Form.Item>
                                                            </Col>
                                                        </Form>
                                                    </Col>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                                            <Row justify="space-around" gutter={['', 24]}>
                                                <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                    <Form >
                                                        <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                            <Col  >
                                                                {/* <Link to="/BenefitIllustrator"> */}
                                                                <Button className="proposal-btn1" >Previous</Button>
                                                                {/* </Link> */}
                                                            </Col>
                                                            <Col >
                                                                <Button className="proposal-btn" >Proceed
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
                            </div>
                        </TabPane>
                        <TabPane tab="Nominee" key="2" >
                            <Row gutter={[40, 24]} justify="center">
                                <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                    <Row gutter={['', 24]}>
                                        <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <h3 className="proposal-head3">Nominee Details</h3>
                                            <h4 className="proposal-head4">Nominee 1</h4>
                                            <Form layout="horizontal" className="contact-detail-form">
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="gender"
                                                        label="Gender"
                                                        defaultValue={selector.nomineeDetails.Gender}
                                                        onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, nomineeGender: e.target.value })}
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee gender',
                                                            },
                                                        ]}
                                                    >
                                                        <div onClick={selectAllGenderFunc} className={selectAllGenderOption == true ? "proposalfulfilment-button" : "proposalfulfilment-btn2"} value={selectAllGenderOption}>
                                                            <p className={selectAllGenderOption == true ? "proposalfulfilment-tab-active-text-style" : "proposalfulfilment-tab-text-style"}>
                                                                Male
                                                            </p>
                                                        </div>
                                                        <div onClick={selectViewGenderFunc} className={selectViewGenderOption == true ? "proposalfulfilment-button" : "proposalfulfilment-btn2"} value={selectViewGenderOption}>
                                                            <p className={selectViewGenderOption == true ? "proposalfulfilment-tab-active-text-style" : "proposalfulfilment-tab-text-style"} >
                                                                Female
                                                            </p>
                                                        </div>
                                                        <div onClick={selectDisplayGenderFunc} className={selectDisplayGenderOption == true ? "proposalfulfilment-button" : "proposalfulfilment-btn2"} value={selectDisplayGenderOption}>
                                                            <p className={selectDisplayGenderOption == true ? "proposalfulfilment-tab-active-text-style" : "proposalfulfilment-tab-text-style"}>
                                                                Other
                                                            </p>
                                                        </div>
                                                        {/* <Radio.Group defaultValue="a">
                                                            <Radio.Button value="a" className="radio">Male</Radio.Button>
                                                            <Radio.Button value="b" className="radio">Female</Radio.Button>
                                                            <Radio.Button value="c" className="radio">Other</Radio.Button>
                                                        </Radio.Group> */}
                                                    </Form.Item>
                                                </Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="title"
                                                        label="Title"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee title!',
                                                            },
                                                        ]}
                                                    >
                                                        <select defaultValue={selector.nomineeDetails.Title} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, nomineeTitle: e.target.value })} className='select-input' placeholder="Select a title">
                                                            <option value="Select">Select</option>
                                                            <option value="Mr">Mr</option>
                                                            <option value="Mrs">Mrs</option>
                                                            <option value="Dr">Dr</option>
                                                            <option value="Prof">Prof</option>
                                                        </select>
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Nominee Name"
                                                        label="Nominee Name"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee name!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.NomineeName} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, NomineeName: e.target.value })} type="text" className="first-name border-bottom" placeholder="Enter Nominee Name" />
                                                    </Form.Item>

                                                </Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="dob"
                                                        label="Date Of Birth"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select date of birth!',
                                                            },
                                                        ]}
                                                    >
                                                        <DatePicker defaultValue={selector.nomineeDetails.DateofBirth} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, nomineeDateofBirth: e.target.value }, onChange)} className='select-input' />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Relationship of nominee with LA"
                                                        label="Relationship of nominee with LA"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Relationship of nominee with LA!',
                                                            },
                                                        ]}
                                                    >
                                                        <select defaultValue={selector.nomineeDetails.RelationshipofnomineewithLA} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, relationship_with_nominee: e.target.value })} className='select-input' placeholder="Select Relationship of nominee with LA">
                                                            <option value="Select">Select</option>
                                                            <option value="5">Financier</option>
                                                            <option value="10">Brother-in-law</option>
                                                            <option value="15">Daughter</option>
                                                            <option value="20">Daughter-in-law</option>
                                                            <option value="25">Father</option>
                                                            <option>Father-in-law</option>
                                                            <option>Grand Daughter</option>
                                                            <option>Grand Father</option>
                                                            <option>Grand Mother</option>
                                                            <option>Grand Son</option>
                                                            <option>Husband</option>
                                                            <option>Mother</option>
                                                            <option>Mother-in-law</option>
                                                            <option>Others</option>
                                                            <option>Son</option>
                                                            <option>Spouse</option>
                                                            <option>Sister</option>
                                                            <option>Sister-in-law</option>
                                                            <option>Wife</option>
                                                        </select>
                                                    </Form.Item>
                                                </Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Mobile No"
                                                        label="Mobile No"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select mobile no!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.MobileNo} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, nomineeMobileNo: e.target.value })} className="email border-bottom" type="text" placeholder="Enter Mobile No" />
                                                    </Form.Item>

                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Email ID"
                                                        label="Email ID"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select email id!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, nomineeEmailID: e.target.value })} className="email border-bottom" type="text" placeholder="Enter Email ID" />
                                                    </Form.Item>
                                                </Col>
                                                <Col></Col>
                                                <Col>
                                                    <h4 className="proposal-head4">Nominee 1 Address Details</h4>
                                                </Col>
                                                <Col></Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Is the Nominee address same as LA?"
                                                        label="Is the Nominee address same as LA?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Is the Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.nomineeDetails.IstheNomineeaddresssameasLA} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, IstheNomineeaddresssameasLA: e.target.value }, onChange)} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </Col>
                                                <Col></Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Address Line 1"
                                                        label="Address Line 1"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please Address Line 1',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, NomineeaddresssameasLA_first: { Add1: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter Address Line 1" />
                                                    </Form.Item>

                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Address Line 2"
                                                        label="Address Line 2"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please Address Line 2',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, NomineeaddresssameasLA_first: { Add2: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter Address Line 2" />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="State"
                                                        label="State"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please State',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, NomineeaddresssameasLA_first: { State: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter State" />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="City"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please City',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, NomineeaddresssameasLA_first: { City: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter CIty" />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Pin Code"
                                                        label="Pin Code"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please Pin Code',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, NomineeaddresssameasLA_first: { Code: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter Pin Code" />
                                                    </Form.Item>
                                                </Col>
                                                <Col></Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Do you want to add another nomiee??"
                                                        label="Do you want to add another nomiee??"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Do you want to add another nomiee?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.nomineeDetails.DoyouwanttoaddanotherNominee} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, DoyouwanttoaddanotherNominee: e.target.value }, onchange)} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                </Col>
                                                <h4 className="proposal-head4">Nominee 2</h4>
                                                <Col></Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="gender"
                                                        label="Gender"
                                                        defaultValue={selector.nomineeDetails.Gender}
                                                        onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherNomineeDeatails_second: { Gender: e.target.value } })}
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee gender',
                                                            },
                                                        ]}
                                                    >
                                                        <div onClick={selectAllGenderFunc} className={selectAllGenderOption == true ? "proposalfulfilment-button" : "proposalfulfilment-btn2"} value={selectAllGenderOption}>
                                                            <p className={selectAllGenderOption == true ? "proposalfulfilment-tab-active-text-style" : "proposalfulfilment-tab-text-style"}>
                                                                Male
                                                            </p>
                                                        </div>
                                                        <div onClick={selectViewGenderFunc} className={selectViewGenderOption == true ? "proposalfulfilment-button" : "proposalfulfilment-btn2"} value={selectViewGenderOption}>
                                                            <p className={selectViewGenderOption == true ? "proposalfulfilment-tab-active-text-style" : "proposalfulfilment-tab-text-style"} >
                                                                Female
                                                            </p>
                                                        </div>
                                                        <div onClick={selectDisplayGenderFunc} className={selectDisplayGenderOption == true ? "proposalfulfilment-button" : "proposalfulfilment-btn2"} value={selectDisplayGenderOption}>
                                                            <p className={selectDisplayGenderOption == true ? "proposalfulfilment-tab-active-text-style" : "proposalfulfilment-tab-text-style"}>
                                                                Other
                                                            </p>
                                                        </div>
                                                        {/* <Radio.Group defaultValue="a">
                                                            <Radio.Button value="a" className="radio">Male</Radio.Button>
                                                            <Radio.Button value="b" className="radio">Female</Radio.Button>
                                                            <Radio.Button value="c" className="radio">Other</Radio.Button>
                                                        </Radio.Group> */}
                                                    </Form.Item>
                                                </Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="title"
                                                        label="Title"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee title!',
                                                            },
                                                        ]}
                                                    >
                                                        <select defaultValue={selector.nomineeDetails.Title} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherNomineeDeatails_second: { Title: e.target.value } })} className='select-input' placeholder="Select a title">
                                                            <option value="Select">Select</option>
                                                            <option value="Mr">Mr</option>
                                                            <option value="Mrs">Mrs</option>
                                                            <option value="Dr">Dr</option>
                                                            <option value="Prof">Prof</option>
                                                        </select>
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Nominee Name"
                                                        label="Nominee Name"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee name!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.NomineeName} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherNomineeDeatails_second: { Name: e.target.value } })} type="text" className="first-name border-bottom" placeholder="Enter Nominee Name" />
                                                    </Form.Item>

                                                </Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="dob"
                                                        label="Date Of Birth"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select date of birth!',
                                                            },
                                                        ]}
                                                    >
                                                        <DatePicker defaultValue={selector.nomineeDetails.DateofBirth} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherNomineeDeatails_second: { Dob: e.target.value } })} className='select-input' />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Relationship of nominee with LA"
                                                        label="Relationship of nominee with LA"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Relationship of nominee with LA!',
                                                            },
                                                        ]}
                                                    >
                                                        <select defaultValue={selector.nomineeDetails.RelationshipofnomineewithLA} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherNomineeDeatails_second: { Relationship: e.target.value } })} className='select-input' placeholder="Select Relationship of nominee with LA">
                                                            <option value="Select">Select</option>
                                                            <option value="5">Financier</option>
                                                            <option value="10">Brother-in-law</option>
                                                            <option value="15">Daughter</option>
                                                            <option value="20">Daughter-in-law</option>
                                                            <option value="25">Father</option>
                                                            <option>Father-in-law</option>
                                                            <option>Grand Daughter</option>
                                                            <option>Grand Father</option>
                                                            <option>Grand Mother</option>
                                                            <option>Grand Son</option>
                                                            <option>Husband</option>
                                                            <option>Mother</option>
                                                            <option>Mother-in-law</option>
                                                            <option>Others</option>
                                                            <option>Son</option>
                                                            <option>Spouse</option>
                                                            <option>Sister</option>
                                                            <option>Sister-in-law</option>
                                                            <option>Wife</option>
                                                        </select>
                                                    </Form.Item>
                                                </Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Mobile No"
                                                        label="Mobile No"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select mobile no!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.MobileNo} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherNomineeDeatails_second: { MobileNo: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter Mobile No" />
                                                    </Form.Item>

                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Email ID"
                                                        label="Email ID"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select email id!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherNomineeDeatails_second: { Email: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter Email ID" />
                                                    </Form.Item>
                                                </Col>
                                                <Col></Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Is the Nominee address same as LA?"
                                                        label="Is the Nominee address same as LA?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Is the Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.nomineeDetails.IstheNomineeaddresssameasLA} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherNomineeaddresssameasLA_second: e.target.value }, onChange)} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>

                                                </Col>
                                                <Col></Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Address Line 1"
                                                        label="Address Line 1"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please Address Line 1',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherNomineeaddresssameasLA_second: { Add1: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter Address Line 1" />
                                                    </Form.Item>

                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Address Line 2"
                                                        label="Address Line 2"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please Address Line 2',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherNomineeaddresssameasLA_second: { Add2: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter Address Line 2" />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="State"
                                                        label="State"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please State',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherNomineeaddresssameasLA_second: { State: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter State" />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="City"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please City',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherNomineeaddresssameasLA_second: { City: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter CIty" />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Pin Code"
                                                        label="Pin Code"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please Pin Code',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherNomineeaddresssameasLA_second: { Code: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter Pin Code" />
                                                    </Form.Item>
                                                </Col>

                                                <Col></Col>

                                                <Col>
                                                    <h3 className="proposal-head3">Appointment Details</h3>
                                                    <h4 className="proposal-head4">Appointee 1</h4>
                                                </Col>
                                                <Col></Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Gender"
                                                        label="Gender"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select gender!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.nomineeDetails.Gender_n} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, Gender_n: e.target.value })} buttonStyle="solid">
                                                            <Radio.Button value="a" className="radio">Male</Radio.Button>
                                                            <Radio.Button value="b" className="radio">Female</Radio.Button>
                                                            <Radio.Button value="c" className="radio">Other</Radio.Button>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </Col>
                                                <Col></Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Title"
                                                        label="Title"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select title!',
                                                            },
                                                        ]}
                                                    >
                                                        <select defaultValue={selector.nomineeDetails.Title_n} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, Title_n: e.target.value })} className='select-input' placeholder="Select a title">
                                                            <option value="Select">Select</option>
                                                            <option value="Mr">Mr</option>
                                                            <option value="Mrs">Mrs</option>
                                                            <option value="Dr">Dr</option>
                                                            <option value="Prof">Prof</option>
                                                        </select>
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Nominee Name"
                                                        label="Nominee Name"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee Name!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.NomineeName_n} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, NomineeName_n: e.target.value })} type="text" className="first-name border-bottom" placeholder="Enter Apointnee Name" />
                                                    </Form.Item>
                                                </Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="dob"
                                                        label="Date Of Birth"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Date Of Birth!',
                                                            },
                                                        ]}
                                                    >
                                                        <DatePicker defaultValue={selector.nomineeDetails.Dobnominee} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, Dobnominee: e.target.value })} className='select-input' onChange={onChange} />

                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Relationship of nominee with LA"
                                                        label="Relationship of nominee with LA"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Is the Nominee address same as LA?Relationship of nominee with LA!',
                                                            },
                                                        ]}
                                                    >
                                                        <select defaultValue={selector.nomineeDetails.RelationshipofnomineewithLA_n} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, summityRelationshipofnomine: e.target.value })} className='select-input' placeholder="Select Relationship of nominee with LA">
                                                            <option value="Select">Select</option>
                                                            <option value="5">Financier</option>
                                                            <option value="10">Brother-in-law</option>
                                                            <option value="15">Daughter</option>
                                                            <option value="20">Daughter-in-law</option>
                                                            <option value="25">Father</option>
                                                            <option>Father-in-law</option>
                                                            <option>Grand Daughter</option>
                                                            <option>Grand Father</option>
                                                            <option>Grand Mother</option>
                                                            <option>Grand Son</option>
                                                            <option>Husband</option>
                                                            <option>Mother</option>
                                                            <option>Mother-in-law</option>
                                                            <option>Others</option>
                                                            <option>Son</option>
                                                            <option>Spouse</option>
                                                            <option>Sister</option>
                                                            <option>Sister-in-law</option>
                                                            <option>Wife</option>
                                                        </select>
                                                    </Form.Item>
                                                </Col>

                                                <Col>
                                                    <h4 className="proposal-head4">Appointee 1 Address Details</h4>
                                                </Col>
                                                <Col></Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Is the Appointee address same as Nominee"
                                                        label="Is the Appointee address same as Nominee"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Is the Nominee address same as LA?Is the Appointee address same as Nominee!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.nomineeDetails.IstheAppointeeaddresssameasNominee} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, unguentariaIstheAppointeeaddresssameasN: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </Col>
                                                <Col></Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Address Line 1"
                                                        label="Address Line 1"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please Address Line 1',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AppointeeaddresssameasLA_first: { Add1: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter Address Line 1" />
                                                    </Form.Item>

                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Address Line 2"
                                                        label="Address Line 2"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please Address Line 2',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AppointeeaddresssameasLA_first: { Add2: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter Address Line 2" />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="State"
                                                        label="State"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please State',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AppointeeaddresssameasLA_first: { State: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter State" />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="City"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please City',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AppointeeaddresssameasLA_first: { City: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter CIty" />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Pin Code"
                                                        label="Pin Code"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please Pin Code',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AppointeeaddresssameasLA_first: { Code: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter Pin Code" />
                                                    </Form.Item>
                                                </Col>
                                                <Col></Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Do you want to add another Appointee"
                                                        label="Do you want to add another Appointee"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Do you want to add another Appointee!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.nomineeDetails.DoyouwanttoaddanotherAppointee} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, parturientDoyouwanttoaddanotherApp: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </Col>
                                                <Col></Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Gender"
                                                        label="Gender"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select gender!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.nomineeDetails.Gender_n} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherAppointeeDeatails_second: { Gender: e.target.value } })} buttonStyle="solid">
                                                            <Radio.Button value="a" className="radio">Male</Radio.Button>
                                                            <Radio.Button value="b" className="radio">Female</Radio.Button>
                                                            <Radio.Button value="c" className="radio">Other</Radio.Button>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </Col>
                                                <Col></Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Title"
                                                        label="Title"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select title!',
                                                            },
                                                        ]}
                                                    >
                                                        <select defaultValue={selector.nomineeDetails.Title_n} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherAppointeeDeatails_second: { Title: e.target.value } })} className='select-input' placeholder="Select a title">
                                                            <option value="Select">Select</option>
                                                            <option value="Mr">Mr</option>
                                                            <option value="Mrs">Mrs</option>
                                                            <option value="Dr">Dr</option>
                                                            <option value="Prof">Prof</option>
                                                        </select>
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Nominee Name"
                                                        label="Nominee Name"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee Name!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.NomineeName_n} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherAppointeeDeatails_second: { Name: e.target.value } })} type="text" className="first-name border-bottom" placeholder="Enter Apointnee Name" />
                                                    </Form.Item>
                                                </Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="dob"
                                                        label="Date Of Birth"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Date Of Birth!',
                                                            },
                                                        ]}
                                                    >
                                                        <DatePicker defaultValue={selector.nomineeDetails.Dobnominee} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherAppointeeDeatails_second: { Dob: e.target.value } })} className='select-input' onChange={onChange} />

                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Relationship of nominee with LA"
                                                        label="Relationship of nominee with LA"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Is the Nominee address same as LA?Relationship of nominee with LA!',
                                                            },
                                                        ]}
                                                    >
                                                        <select defaultValue={selector.nomineeDetails.RelationshipofnomineewithLA_n} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherAppointeeDeatails_second: { Relationship: e.target.value } })} className='select-input' placeholder="Select Relationship of nominee with LA">
                                                            <option value="Select">Select</option>
                                                            <option value="5">Financier</option>
                                                            <option value="10">Brother-in-law</option>
                                                            <option value="15">Daughter</option>
                                                            <option value="20">Daughter-in-law</option>
                                                            <option value="25">Father</option>
                                                            <option>Father-in-law</option>
                                                            <option>Grand Daughter</option>
                                                            <option>Grand Father</option>
                                                            <option>Grand Mother</option>
                                                            <option>Grand Son</option>
                                                            <option>Husband</option>
                                                            <option>Mother</option>
                                                            <option>Mother-in-law</option>
                                                            <option>Others</option>
                                                            <option>Son</option>
                                                            <option>Spouse</option>
                                                            <option>Sister</option>
                                                            <option>Sister-in-law</option>
                                                            <option>Wife</option>
                                                        </select>
                                                    </Form.Item>
                                                </Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Mobile No"
                                                        label="Mobile No"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select mobile no!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.MobileNo} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherAppointeeDeatails_second: { MobileNo: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter Mobile No" />
                                                    </Form.Item>

                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Email ID"
                                                        label="Email ID"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select email id!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherAppointeeDeatails_second: { Email: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter Email ID" />
                                                    </Form.Item>
                                                </Col>

                                                <Col>
                                                    <h4 className="proposal-head4">Appointee 2 Address Details</h4>
                                                    <h4 className="proposal-head4">Appointee 2</h4>
                                                </Col>
                                                <Col></Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Is the Appointee address same as Nominee"
                                                        label="Is the Appointee address same as Nominee"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Is the Nominee address same as LA?Is the Appointee address same as Nominee!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.nomineeDetails.IstheAppointeeaddresssameasNominee} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherAppointeeDeatails_second: { Details: e.target.value } })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </Col>
                                                <Col></Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Address Line 1"
                                                        label="Address Line 1"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please Address Line 1',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherAppointeeaddresssameasLA_second: { Add1: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter Address Line 1" />
                                                    </Form.Item>

                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Address Line 2"
                                                        label="Address Line 2"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please Address Line 2',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherAppointeeaddresssameasLA_second: { Add2: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter Address Line 2" />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="State"
                                                        label="State"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please State',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherAppointeeaddresssameasLA_second: { State: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter State" />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="City"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please City',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherAppointeeaddresssameasLA_second: { City: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter CIty" />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Pin Code"
                                                        label="Pin Code"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please Pin Code',
                                                            },
                                                        ]}
                                                    >
                                                        <Input defaultValue={selector.nomineeDetails.EmailID} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AnotherAppointeeaddresssameasLA_second: { Code: e.target.value } })} className="email border-bottom" type="text" placeholder="Enter Pin Code" />
                                                    </Form.Item>
                                                </Col>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                    <Row justify="space-around" gutter={['', 24]}>
                                        <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <Form >
                                                <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                    <Col  >
                                                        <Button className="proposal-btn1">Previous</Button>
                                                    </Col>
                                                    <Col >
                                                        <Button className="proposal-btn">Proceed
                                                            <ArrowRightOutlined
                                                                style={{
                                                                    marginTop: "7px"
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
                        </TabPane>
                        <TabPane tab="Family" key="3" >
                            <div>
                                <Row gutter={[40, 24]} justify="center">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form>
                                                    <Col>
                                                        <h3 className="proposal-head3">Family History Details</h3>
                                                    </Col>
                                                    <Col></Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Have either of your parents or any brother or sister suffered from or died under the age of 60 due to the following conditions: Heart problem, diabetes, stroke, hypertension, raised cholestrol, cancer or any hereditary disease?"
                                                        label="Have either of your parents or any brother or sister suffered from or died under the age of 60 due to the following conditions: Heart problem, diabetes, stroke, hypertension, raised cholestrol, cancer or any hereditary disease?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.familyhistoryDetails.FamilyHistoryDetails} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, FamilyHistoryDetails: e.target.value }, onchange)} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Button className="proposal-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="proposal-btn">Proceed
                                                                <ArrowRightOutlined
                                                                    style={{
                                                                        marginTop: "7px"
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
                        </TabPane>
                        <TabPane tab="Insurance" key="4" >
                            <div>
                                <Row gutter={[40, 24]} justify="center">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form>
                                                    <Col>
                                                        <h3 className="proposal-head3">Life Insurance Details</h3>
                                                    </Col>
                                                    <Col></Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="Are you currently insured or applying for Life insurance cover, Critical illness cover, Accident benefit cover, not covered above?"
                                                        label="Are you currently insured or applying for Life insurance cover, Critical illness cover, Accident benefit cover, not covered above?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.lifeinsuranceDetails.lifeinsuranceDetails} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, lifeinsuranceDetails: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col>
                                                        <Button>Add Policy</Button>
                                                    </Col>
                                                    <Table
                                                        columns={columns}
                                                        pagination={{ pageSize: 50 }}
                                                        scroll={{ x: '150vw' }}
                                                        style={{ marginTop: '2vw' }}
                                                    />
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Button className="proposal-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="proposal-btn">Proceed
                                                                <ArrowRightOutlined
                                                                    style={{
                                                                        marginTop: "7px"
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
                        </TabPane>
                        <TabPane tab="Medical" key="5" >
                            <div>
                                <Row gutter={[40, 24]} justify="center">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form>
                                                    <Col>
                                                        <h3 className="proposal-head3">Life Style and Medical</h3>
                                                    </Col>
                                                    <Col></Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="1) Are you currently or do you intend engaging in any hazardous occupation or hobbies, eg. Working at heights, undergroundor offshore, using explosives, flying other than as fare-paying passenger,diving,mountaineering or any other dangerous activity?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.medicalDetails.Question1} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, medicalQuestion1: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="2) Are you currently or do you intend to live or travel outside of India for more than 6 months?If yes, please provide full details of countries to be visited and purpose of visit and duration"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.medicalDetails.Question2} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, medicalQuestion2: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="3) Habits: Do you smoke or have you smoked more than 5 cigarettes / E-Cigarettes or beedis or 3 Pouches of Gutka or Chewable Tobacco per day."
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.medicalDetails.Question3} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, medicalQuestion3: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="4) Do you consume or have you consumed any form of alcohol / liquor exceeding 90ml or 3 Pegs of Hard Liquor or 2 glasses of beer / wine per week."
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.medicalDetails.Question4} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, medicalQuestion4: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                </Form>
                                                <Form layout="horizontal" className="contact-detail-form">
                                                    <Col >
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name="City"
                                                            label="Height in Feet"
                                                            hasFeedback
                                                            rules={[
                                                                {
                                                                    required: false,
                                                                    message: 'Please select title!',
                                                                },
                                                            ]}
                                                        >
                                                            <select defaultValue={selector.medicalDetails.HeightinFeet} onchange={(e) => { setproposalFulfilmentData({ ...proposalfulfilmentData, overmuchness: e.target.value }) }} className='select-input' placeholder="Select Height in Feet ">
                                                                <option value="Select">Select</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                            </select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col >
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name="Height in Inches"
                                                            label="Height in Inches"
                                                            hasFeedback
                                                            rules={[
                                                                {
                                                                    required: false,
                                                                    message: 'Please select title!',
                                                                },
                                                            ]}
                                                        >
                                                            <select defaultValue={selector.medicalDetails.HeightinInches} onchange={(e) => { setproposalFulfilmentData({ ...proposalfulfilmentData, HeightinInches: e.target.value }) }} className='select-input' placeholder="Select Height in Inches ">
                                                                <option value="Select">Select</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                            </select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col>
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name={['user', 'name']}
                                                            label="Weight in kgs"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                },
                                                            ]}
                                                        >
                                                            <Input defaultValue={selector.medicalDetails.WeightinKgs} onchange={(e => { setproposalFulfilmentData({ ...proposalfulfilmentData, WeightinKgs: e.target.value }) })} className="email border-bottom" type="number" placeholder="Enter Weight in kgs" />
                                                        </Form.Item>
                                                    </Col>
                                                </Form>
                                                <Form >
                                                    <Col>
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name="City"
                                                            label="6) Are you currently taking any medication or drugs, other than minor conditions, (e.g. colds and flu), either prescribed by doctor, or have you suffered from any illness, disorder, disability or injury during the past 5 years which has required any form of medical or specialized examinations(including chest x-rays, gynecological inestigations, pap smear, or blood tests), consultaion,hospitalization or surgery?"
                                                            hasFeedback
                                                            rules={[
                                                                {
                                                                    required: false,
                                                                    message: 'Please select Nominee address same as LA?!',
                                                                },
                                                            ]}
                                                        ><br />
                                                            <Radio.Group defaultValue={selector.medicalDetails.Question6} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, medicalQuestion6: e.target.value })} value={value}>
                                                                <Radio value={1}>Yes</Radio>
                                                                <Radio value={2}>No</Radio>
                                                            </Radio.Group>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="7) Do you have : congenital / birth defects, pain or problems in the back, spine, muscles or joint,arthritis,gout, severe injury or other physical disability and have you been incapable of working /attending the school during the last 2 years for more than 5 days or are you currently incapable of working / attending school?
                                                "
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.medicalDetails.Question7} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, medicalQuestion7: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="8) Do you suffer from any medical ailments e.g: diabetes, high blood pressure, cancer, respiratory disease (including asthma),kidney, liver disease, stroke, any blood disorder, heart problems,hepatitisB, tuberculosis, psychiatric disorder, depression, HIV AIDS or a related infection?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.medicalDetails.Question8} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, medicalQuestion8: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="9) Is any surgery planned or are you currently aware or have been advised, that you may need to seek medical advice within the near future? (Other than for medical examinations that may arise from this application)"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.medicalDetails.Question9} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, medicalQuestion9: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="10) Have you ever suffered from drug or alcohol addiction or been advised by a doctor to reduce your alcohol / drug intake?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.medicalDetails.Question10} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, medicalQuestion10: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="11) Whether the Life Assured / Proposer / Nominee(s) is/are Politically Exposed Person(s)."
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.medicalDetails.Question11} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, medicalQuestion11: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Button className="proposal-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="proposal-btn">Proceed
                                                                <ArrowRightOutlined
                                                                    style={{
                                                                        marginTop: "7px"
                                                                    }}
                                                                />
                                                            </Button><br />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>                            </div>
                        </TabPane>
                        <TabPane tab="Vernacular" key="6" >
                            <div>
                                <Row gutter={[40, 24]} justify="center">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form>
                                                    <Col>
                                                        <h3 className="proposal-head3">Vernacular Details</h3>
                                                    </Col>
                                                    <Col></Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="ABC Life Insurance Company Limited requires that this proposal is completed by the Proposer. (If the Proposer does not read , write, or speak English, then this proposal may be completed by another person as per item 2 in guidelines of page 1 of this proposal. As such person need to complete this declaration.) I have explained the contents of this proposal to the Proposer and endeavoured to ensure that the contents have been fully understood. I have accurately recorded the responses to the information sought by the proposal form and I have read the responses back to the Proposer and confirmed that they are correct."
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.detailsOfWitness.Question12} onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h3 className="proposal-head3">Details Of Witness</h3>
                                                <Col>
                                                    <Form layout="horizontal" className="contact-detail-form">
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['user', 'name']}
                                                                label="Name"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Input defaultValue={selector.detailsOfWitness.Name} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, undershire: e.target.value })} className="email border-bottom" type="text" placeholder="Enter Name" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['user', 'name']}
                                                                label="Mobile No"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Input defaultValue={selector.detailsOfWitness.MobileNo} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, swoop: e.target.value })} className="email border-bottom" type="text" placeholder="Enter Mobile No" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="Insurance Company"
                                                                label="Date of Birth"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Date of Birth',
                                                                    },
                                                                ]}
                                                            >
                                                                <div>
                                                                    <DatePicker defaultValue={selector.detailsOfWitness.Date} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, parquet: e.target.value })} />

                                                                </div>,
                                                            </Form.Item>
                                                        </Col>
                                                        <Col></Col>
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['user', 'name']}
                                                                label="Address Line 1"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Input defaultValue={selector.detailsOfWitness.AddressLine1} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, oariopathic: e.target.value })} className="email border-bottom" type="text" placeholder="Enter Address Line 1" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['user', 'name']}
                                                                label="Address Line 2"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Input defaultValue={selector.detailsOfWitness.AddressLine2} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, pookaun: e.target.value })} className="email border-bottom" type="text" placeholder="Enter Address Line 2" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="City"
                                                                label="State"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Please select State!',
                                                                    },
                                                                ]}
                                                            >
                                                                <select defaultValue={selector.detailsOfWitness.State} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, dictyopteran: e.target.value })} className='select-input' placeholder="Select">
                                                                    <option value="Select">Select</option>
                                                                    <option value="Andra Pradesh">Andra Pradesh</option>
                                                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                                    <option value="Karnataka">Karnataka</option>
                                                                    <option value="Kerala">Kerala</option>
                                                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                                    <option value="Maharashtra">Maharashtra</option>
                                                                    <option value="Manipur">Manipur</option>
                                                                    <option value="Odisa">Odisa</option>
                                                                    <option value="Rajasthan">Rajasthan</option>

                                                                </select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="City"
                                                                label="City"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Please select city!',
                                                                    },
                                                                ]}
                                                            >
                                                                <select defaultValue={selector.detailsOfWitness.City} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, phasmatoid: e.target.value })} className='select-input' placeholder="Select">
                                                                    <option value="Select">Select</option>
                                                                    <option value="Life Annunity">Tura</option>
                                                                    <option value="Life Annunity with ROP">Shillong</option>
                                                                    <option>Nongstoin</option>
                                                                    <option>Nongpoh</option>
                                                                    <option>Mankachar</option>
                                                                    <option>Mairang</option>
                                                                    <option>Cherrapunji</option>
                                                                </select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['user', 'name']}
                                                                label="Pin Code"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Input defaultValue={selector.detailsOfWitness.PinCode} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, hushing: e.target.value })} className="email border-bottom" type="text" placeholder="Enter Pin Code" />
                                                            </Form.Item>
                                                        </Col>
                                                    </Form>
                                                </Col>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Button className="proposal-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="proposal-btn">Proceed
                                                                <ArrowRightOutlined
                                                                    style={{
                                                                        marginTop: "7px"
                                                                    }}
                                                                />
                                                            </Button><br />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>                            </div>
                        </TabPane>
                        <TabPane tab="Declaration" key="7" >
                            <div>
                                <Row gutter={[40, 24]} justify="center">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h3 className="proposal-head3">Declaration by Life to be Assured / Proposer</h3>
                                                <p className="proposal-paragraph">I understand and agree that the statements in this proposal form shall be the basis of the contract between me and ABC Life Insurance Company Limited ('the Company'). I agree that I will inform the Company if between the date of this proposal and the date of issuance of the policy about any change in my general health, occupation,financial position or if any other proposal or application to any other Insurance Company on my life is declined / postponed or accepted other than the standard terms so that the Company may consider the terms of acceptance.I understand that if I fail to disclose the information sought by the Company, then the Company may voidthe contract at its sole discretion without giving any further explanation and the consequence thereof shall follow. I agree that the Insurance protection shall only be provided effective from the date of acceptance of risk by the Company. I further declare that the statements in this proposal are true and I have disclosed all information which might be material to the Company while issuing the policy contract. I declare that I have read the sales literature of the proposed plan and understood the terms and conditions of the plan along with the associated risks and benefits which I propose to take. I declare that the premiums paid have  not been generated from the proceeds of any criminal activities/offences and I shall abide by and conform to the Prevention of Money Laundering Act, 2002 or any other applicable laws. I declare that the Company has disclosed and explained all the information related to this product and riders to me and I declare thatI have understood the same before signing this proposal form. In case of fraud the policy contract shall be cancelled immediately by forfeiture of all premiums paid or in case of misrepresentation the policy contractshall be cancelled immediately by refund of all premiums paid, subject to the fraud or misrepresentation being established by the insurer in accordance with Section 45 of the Insurance Act, 1938 as ammended from time to time.
                                                </p>
                                                <input type="checkbox" onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, DeclarationbyLifeto: e.target.value })} /> I agree

                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h3 className="proposal-head3">Authorization by Life to be Assured / Proposer</h3>
                                                <p className="proposal-paragraph">I hereby authorize the Company to charge any occupation / residential / age extra or reduce the sum assured on my proposal based on the information provided by me and the supporting documents submitted with this proposalform. I hereby authorize the Company to conduct screening/confirmation/ reconfirmation of overall status of the Life to be Assured including the health status through medical examinations, if required, which mayinclude Laboratory tests, Cardiac, Radiological investigations and other medical tests including blood tests to detect bacterial / viral / fungal infections. I hereby give my consent to undergo HIV1 /2 test by ELISA method. I am aware that this test is only for screening purposes and not confirmatory for HIV/AIDS. In order to enable the Company to assess the risk under this proposal and any time thereafter, I hereby, authorize the past and present employer(s)/business associates / medical practitioner / hospital and medical source/any life and non-life insurance Company / organization or Life Insurance Association to release to the Company the records of employment / business or other details as may be considered relevant for acceptance or otherwise of this proposal form. I agree that to underwrite the policy effectively, ABC Life Insurance Company may need to share my personnel information with a specialist service provider, who would keep the said information in secure and confidential manner. Payments will be made to the provided bank a/c, unless the bank a/c particulars are changed/modified by my written communication to RLIC. I also hereby agree and authorized the Company to access my data maintained by the Unique Identificatio Authority of India (UIDA) for KYC verification purpose.
                                                </p>
                                                <Col><Form.Item
                                                    {...formItemLayout}
                                                    className="form-item-name label-color"
                                                    name="City"
                                                    label="In Order to support ABC Life Insurance Company in its 'Go-Green' initiative, I agree to recieve policy documents by electronic mail instead of physical form"
                                                    hasFeedback
                                                    rules={[
                                                        {
                                                            required: false,
                                                            message: 'Please select Nominee address same as LA?!',
                                                        },
                                                    ]}
                                                >
                                                    <Radio.Group defaultValue={selector.misc.DeclarationbyLifeto} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AuthorizationbyLifetobeAssuredProposer1: e.target.value })} value={value}>
                                                        <Radio value={1}>Yes</Radio>
                                                        <Radio value={2}>No</Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                                </Col>
                                                <Col><Form.Item
                                                    {...formItemLayout}
                                                    className="form-item-name label-color"
                                                    name="City"
                                                    label="I am aware that in order to enable the company to assess the risk, I need to undergo medicals as per ABC Life Insurace Comapny Ltd. requirements and the same has been explained to may be the Adviser / Sales MAnager"
                                                    hasFeedback
                                                    rules={[
                                                        {
                                                            required: false,
                                                            message: 'Please select Nominee address same as LA?!',
                                                        },
                                                    ]}
                                                >
                                                    <Radio.Group defaultValue={selector.misc.AuthorizationbyLifetobeAssuredProposer1} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AuthorizationbyLifetobeAssuredProposer2: e.target.value })} value={value}>
                                                        <Radio value={1}>Yes</Radio>
                                                        <Radio value={2}>No</Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                                </Col>

                                                <Col><Form.Item
                                                    {...formItemLayout}
                                                    className="form-item-name label-color"
                                                    name="City"
                                                    label="I authorize ABC Life Insurance Comapany Limited and/or its representative to call us/me for all policy service related calls."
                                                    hasFeedback
                                                    rules={[
                                                        {
                                                            required: false,
                                                            message: 'Please select Nominee address same as LA?!',
                                                        },
                                                    ]}
                                                >
                                                    <Radio.Group defaultValue={selector.misc.AuthorizationbyLifetobeAssuredProposer2} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AuthorizationbyLifetobeAssuredProposer3: e.target.value })} value={value}>
                                                        <Radio value={1}>Yes</Radio>
                                                        <Radio value={2}>No</Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                                </Col>
                                                <input type="checkbox" defaultValue={selector.misc.AuthorizationbyLi_agree} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, AuthorizationbyLi_agree: e.target.value })} />I agree
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h3 className="proposal-head3">Prohibitation of rebate</h3>
                                                <p className="proposal-paragraph">1.No person shall allow or offer to allow, either directly on indirectly , as an inducement to any person to take or renew or continue an insurance in respect of any kinds of risk relating to lives or property in india,any rebate of the whole or part of the commission payable or any rebate of the premium shown on the policy,nor shall any person taking out or renewing or continuing a Policy accept any rebate, except such rebate as may be allowed in accordance with the published prospectuses or tabes of the insurer.
                                                </p>
                                                <p className="proposal-paragraph">2.Any person making the default in complying with the provisions of this section shall be liable for a prohibitionrebate which may extend to ten lakh rupees.Please refer to our website or contact our office for the details under the above mentioned Sectioned 41.</p>

                                                <input type="checkbox" defaultValue={selector.misc.Prohibitationofrebate} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, Prohibitationofrebate: e.target.value })} />I agree
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 4 }} sm={24} md={24} lg={{ order: 4 }} xl={{ order: 4 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h3 className="proposal-head3">Policy not be called in question after 3 years</h3>
                                                <p className="proposal-paragraph">1) No policy of life insurance shalle be called in question on any ground whatsoever after the expiry of three years from the date of the policy i.e., from the date of insurance of the policy or the date of commencement of risk or the date of revival of the policy or the date of the rider to the policy, whichever is later.</p>
                                                <p className="proposal-paragraph">2) A policy of life insurance may be called in question at anytime within three years from the date of insurance of the policy or the date of commencement of risk or the date of revival of the policy or the date of the rider to the policy, whichever is later, on the ground of fraud : provided that the insurer shall have to communicate in writing to the insure or the legal representatives or nominees or assigners of the insured the grounds and materials on which such decisions is based.</p>
                                                <p className="proposal-paragraph">3) Notwithstanding anything contained in subsection(2), No insurer shall repudiate a life insurance policy on the ground of fraud if the insured can prove that the mis-statement of supression of material fact was true to the best of his knowledge and belief or that there was no deliberate intention to supress the fact or that such mis-statement of supression of the material fact or within the knowledge of the insurer-provided that in case of fraud, the onus of disproving lies upon the beneficiaries, in case the policy holder is not alive.</p>
                                                <p className="proposal-paragraph">4) A policy of life insurance may be called in question at any time within three years from the date of insurance of the policy or the date of commencement of risk or the date of revival of the policy or the date of the rider to the policy ,whichever is later, on the ground that any statement or supression of the fact material to the expectancy of the life of the insured was incorrectly made in the proposal or other document on the basis of which the policy was issued or revived or rider issued; Provided that the insurer shall have to communicate in writing to the insured the grounds and materials on which such decision to repudiate the policy of life insurance is based; Provided further that in case of repudation of the policy on the ground of misstatement or supression of material fact, and not on the ground of fraud, the premiums collected on the policy till the date of repudation shall be paid to the insured or legal representatives or nominees or assignees of the insured within a period of ninety days from the, whichever is later, on the ground that any statement or supression of the fact material to the expectancy of the life of the insured was incorrectly made in the proposal or other document on the basis of which the policy was issued or revived or rider issued; Provided that the insurer shall have to communicate in writing to the insured the grounds and materials on which such decision to repudiate the policy of life insurance is based; Provided further that in case of repudation of the policy on the ground of misstatement or supression of material fact, and not on the ground of fraud,the premiums collected on the policy till the date of repudation shall be paid to the insured or legal representatives or nominees or assignees of the insured within a period of ninety days from the date of such repudation.Mis-statement or supression of shall not be considered material unless it has a direct bearing on the risk undertaken by the insurer. the onus is on the insurer to show that had the insurer been aware of the said fact no life insurance policy would have been issued to the insured. Nothing in this section shall prevent the insurer from calling for proof of age at any time if if entitled to do so, and no policy shall be deemed to be called in question merely because the term of the policy are adjusted on subsequent proof that the age of the life insured was incorrectly stated in the proposal.</p>

                                                <input type="checkbox" defaultValue={selector.misc.PolicynotbecalledinquestionafterthreeyearsAgreeornot} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, PolicynotbecalledinquestionafterthreeyearsAgreeornot: e.target.value })} />I agree
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 5 }} sm={24} md={24} lg={{ order: 5 }} xl={{ order: 5 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Button className="proposal-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="proposal-btn">Proceed
                                                                <ArrowRightOutlined
                                                                    style={{
                                                                        marginTop: "7px"
                                                                    }}
                                                                />
                                                            </Button><br />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>                            </div>
                        </TabPane>
                        <TabPane tab="Report" key="8" >
                            <div>
                                <Row gutter={[40, 24]} justify="center">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h3 className="proposal-head3">Confidential Report</h3>
                                                <Form>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="1) Have you met the Proposer & the Life to be Assured?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.confidentialReport.Question1} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, Question1: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="2) Are you (Advisor / SM) related to the Life to be Assured? If Yes, to whom and what is the relationship?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.confidentialReport.Question2} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, Question2: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="3) Do you notice any disability, mental or physical deformity for Life to be Assured?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.confidentialReport.Question3} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, Question3: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="4) Are you personally satisfied with the financial standing of the Proposer & Life to be Assured in relation to the proposed insurance? Please estimate the income of the Proposer."
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.confidentialReport.Question4} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, Question4: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col >
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name={['user', 'name']}
                                                            label="Income of the Proposer"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                },
                                                            ]}
                                                        >
                                                            <Input defaultValue={selector.confidentialReport.incomeofProposer} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, incomeofProposer: e.target.value })} className="email border-bottom" type="number" placeholder="Enter Income of the Proposer" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="5) Is the income proof verified by you? What is the type of income proof verified"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.confidentialReport.Question5} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, Question5: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col >
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name="City"
                                                            label="Type Of Income proof"
                                                            hasFeedback
                                                            rules={[
                                                                {
                                                                    required: false,
                                                                    message: 'Please select Type Of Income proof!',
                                                                },
                                                            ]}
                                                        >
                                                            <select defaultValue={selector.confidentialReport.TypeOfIncomeproof} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, TypeOfIncomeproof: e.target.value })} className='select-input' placeholder="Select Type Of Income proof ">
                                                                <option value="Select">Select</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                            </select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="6) Is the age proof verified by you for all Life to be Assured?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.confidentialReport.Question6} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, Question6: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="7) Is the Life to be Assured, presently, in good health? if no, give details."
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue={selector.confidentialReport.Question7} onChange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, Question7: e.target.value })} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col>
                                                        <p>8) How long have you konwn the Life to be assured?</p>
                                                    </Col>
                                                </Form>
                                                <Form layout="horizontal" className="contact-detail-form">
                                                    <Col >
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name={['user', 'name']}
                                                            label="Years"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                },
                                                            ]}
                                                        >
                                                            <Input defaultValue={selector.confidentialReport.HowlonghaveyoukonwntheLifetobeassured_year} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, HowlonghaveyoukonwntheLifetobeassured_year: e.target.value })} className="email border-bottom" type="number" placeholder="Enter Years" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col >
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name={['user', 'name']}
                                                            label="Months"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                },
                                                            ]}
                                                        >
                                                            <Input defaultValue={selector.confidentialReport.HowlonghaveyoukonwntheLifetobeassured_month} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, HowlonghaveyoukonwntheLifetobeassured_month: e.target.value })} className="email border-bottom" type="number" placeholder="Enter Months" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col >
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name={['user', 'name']}
                                                            label="Mobile No"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                },
                                                            ]}
                                                        >
                                                            <Input defaultValue={selector.confidentialReport.HowlonghaveyoukonwntheLifetobeassured_fls_mob_no} onchange={(e) => setproposalFulfilmentData({ ...proposalfulfilmentData, HowlonghaveyoukonwntheLifetobeassured_fls_mob_no: e.target.value })} className="email border-bottom" type="text" placeholder="Enter Mobile No" />
                                                        </Form.Item>
                                                    </Col>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Button className="proposal-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button onClick={putData} className="proposal-btn">Proceed
                                                                <ArrowRightOutlined
                                                                    style={{
                                                                        marginTop: "7px"
                                                                    }}
                                                                />
                                                            </Button><br />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
        </>
    )
}
export default ProposalFulfilment;