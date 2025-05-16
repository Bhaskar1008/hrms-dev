import React, { useState, createRef } from 'react';
import img1 from "../images/button images/MdVerified.png";
import FullPageLoader from '../components/FullPageLoader/FullPageLoader';
import { Row, Col, Button, Select, Form, Input, message, Image } from "antd";
import {
  FolderAddOutlined,
  DeleteOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "./HypervergeComponent.css";
import axiosRequest from "../axios-request/request.methods";
import { stoageGetter } from "../helpers";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';


const HypervergeComponent = ({ handleCustomerDetails, handleDocType, handleIdNumber, checkIdAvailable, documentId, hintText, handleHyperResponse }) => {
  const formRef = createRef();
  const [form] = Form.useForm();
  const [openloader, setOpenloader] = useState(false);
  const [isUserValidate, setIsUserValidate] = useState(false);
  const [isBtnTriggered, setIsBtnTriggered] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [documentCode, setDocumentCode] = useState(null);
  const [validCutomerData, setValidCustomerData] = useState(null);
  const [checkBtnTriggered, setCheckBtnTriggered] = useState("yes");
  const [isExistingCustomer, setIsExistingCustomer] = useState(true);
  const [validIds, setValidIds] = useState([]);

  const hyperData = useSelector((state) => state?.hyperverge);
  
  useEffect(() =>{
    if(hyperData?.currentLOB == "CTPL"){
      const {documentCode, documentType, hyperDocImg, hypervergeDocName, isExistingCustomer} =  hyperData?.hypervergeCtpl;
      if(documentType && documentCode && hyperDocImg && hypervergeDocName){
        prepopulateHyperData(documentType, documentCode, hyperDocImg, hypervergeDocName, isExistingCustomer);
      }
    } else if(hyperData?.currentLOB == "MOTOR"){
      const {documentCode, documentType, hyperDocImg, hypervergeDocName, isExistingCustomer} =  hyperData?.hypervergeMotor;
      if(documentType && documentCode && hyperDocImg && hypervergeDocName){
        prepopulateHyperData(documentType, documentCode, hyperDocImg, hypervergeDocName, isExistingCustomer);
      }
      } else if(hyperData?.currentLOB == "TRAVEL"){
      const {documentCode, documentType, hyperDocImg, hypervergeDocName, isExistingCustomer} =  hyperData?.hypervergeTravel;
      if(documentType && documentCode && hyperDocImg && hypervergeDocName){
        prepopulateHyperData(documentType, documentCode, hyperDocImg, hypervergeDocName, isExistingCustomer);
      }
      }
  }, [hyperData])

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const validaId = () => {
    axiosRequest.get('user/documentList').then((resp) =>{
      if(resp?.statusCode === -1 && resp?.data?.data?.length > 0){
        const data = resp?.data?.data.map((e) => ({
          label: e.NOM_VALOR,
          value: e.ADQC_ID,
          hyperId: e.HV_ID_CODE
        }))
        setValidIds(data)
      }
    }).catch((err) =>{
      setValidIds([])
    })
  }
  useEffect(() =>{
    validaId();
  }, []);

  const onSelectYes = (status) => {
    if (status !== checkBtnTriggered) {
      setCheckBtnTriggered('yes');
      clearValidateData("yes");
      setIsExistingCustomer(true);
    }
  }
  const onSelectNo = (status) => {
    if (status !== checkBtnTriggered) {
      setCheckBtnTriggered('no');
      clearValidateData("no");
      setIsExistingCustomer(false)
    }
  }

  const selectDocType = (val) => {
    setDocumentType(val);
    handleDocType(val);
  }
  const selectDocCode = (val) => {
    setDocumentCode(val);
    handleIdNumber(val);
  }


  const validateUser = (formData) => {
    setIsBtnTriggered(true);
    setOpenloader(true);
    axiosRequest.get(`user/third-party/detail?documentType=${documentType}&documentCode=${documentCode}`)
      .then((response) => {
        setOpenloader(false);
        if (response?.data?.customerDetail) {
          setValidCustomerData(response?.data?.customerDetail);
          setIsUserValidate(true);
          checkIdAvailable(true);
          handleCustomerDetails(response?.data?.customerDetail);
        } else {
          message.error("Details not found");
          setIsUserValidate(false);
          checkIdAvailable(false);
          handleCustomerDetails(false);
        }
      })
      .catch((error) => {
        setOpenloader(false);
        message.error(error);
      });
  };
  const onFinishFailed = (err) => {
    console.log(err);
  }

  const clearValidateData = (status) => {
    if (status !== checkBtnTriggered) {
      formRef.current.resetFields();
      setDocumentCode("");
      setDocumentType("");
      handleDocType(undefined);
      handleIdNumber("");
      checkIdAvailable(false);
      setIsUserValidate(false);
      setIsBtnTriggered(false);
      handleCustomerDetails(false);
      resetDoc()
    }
  };

  //   Hyperverge Codes
  const [hyperResult, setHyperResult] = useState("");
  const [fullName, setFullName] = useState("");
  const [imagePath, setImagePath] = useState("");

  let login_user_data = stoageGetter("user");
  const onBoardHandler = async (KYCResult) => {
    if (!documentId) {
      message.error("Document id is not available");
      return;
    }
    if (!documentType && checkBtnTriggered == "yes") {
      message.error("Please select ID Type");
      return;
    }
    if (!documentCode && checkBtnTriggered == "yes") {
      message.error("Please enter ID Number");
      return;
    }
    let agentMobileNumber = login_user_data.mobileNo;
    let API = `user/hyperverge/tokenGeneration?documentId=${documentId}`;
    // let API = `user/hyperverge/tokenGeneration?documentId=${documentId}&documentType=${documentType}&documentCode=${documentCode}`;
    setOpenloader(true);
    let Response = await axiosRequest.get(API);
    setOpenloader(false);

    if (Response.statusCode === -1) {
      let token = Response.data.accessToken;
      let transactionId = Response.data.transactionId;
      let workflowIDs = Response.data.workflow;
      LaunchSDK(KYCResult, token, transactionId, workflowIDs);
    } else {
    }
  };

  const LaunchSDK = async (KYCResult, Token, transactionId, workflowIDs) => {
    const hyperKycConfigs = new window.HyperKycConfig(
      Token,
      workflowIDs,
      transactionId
    );
    window.HyperKYCModule.launch(hyperKycConfigs, (ResultsHandler) => {
      if(checkBtnTriggered == "yes"){
        const isValidDoc = checkDocumentValid(ResultsHandler?.details);
        if(!isValidDoc){
          message.error("Document you provided does not match existing customer details!")
          return;
        }
      }
      handleHyperResponse(ResultsHandler);
      console.log("Result Hadler ===>>>>>", ResultsHandler);
      setHyperResult(ResultsHandler);
      if (ResultsHandler.status == "auto_approved") {
        prepopulateHyperData(null, null, ResultsHandler?.details?.imagePath)
        const selectedName = ResultsHandler?.details?.fullName
          ? ResultsHandler?.details?.fullName
          : `${ResultsHandler?.details?.firstName} ${ResultsHandler?.details?.middleName} ${ResultsHandler?.details?.lastName}`;
          if (checkBtnTriggered == "no") {
            if (ResultsHandler?.details?.idNumber) {
            prepopulateHyperData(null, ResultsHandler?.details?.idNumber, null, selectedName, false);
            } else {
              message.error("ID Number is not found");
            }
            if (ResultsHandler?.details?.documentType) {
              const selectedDocType = validIds.filter((item) => item.hyperId
              == ResultsHandler?.details?.documentType)[0];
              prepopulateHyperData(selectedDocType?.value, null, null, null, false);
            } else {
              message.error("ID type is not found");
            }
          } else {
          prepopulateHyperData(null, null, null, selectedName, true);
        }
      } else {
        setImagePath("");
      }
    });
  };

  const resetDoc = () => {
    setHyperResult("");
    setFullName("");
    setImagePath("");
  };
  const deleteDoc = () =>{
    if(checkBtnTriggered == "no"){
      formRef.current.resetFields();
      setDocumentCode("");
      setDocumentType("");
    handleDocType(undefined);
    handleIdNumber("");
    checkIdAvailable(false);
    setIsUserValidate(false);
    setIsBtnTriggered(false);
    handleCustomerDetails(false);
  }
  handleHyperResponse(null);
    resetDoc()
  }

  const prepopulateHyperData = (docType, IdNumber, docImg, hyperDocName, isExistCustomer) =>{
    if(docType){
      selectDocType(docType);
      form.setFieldsValue({
        validId: docType,
      });
    }
    if(IdNumber){
      form.setFieldsValue({
        documentCode: IdNumber,
      })
      selectDocCode(IdNumber)
    }
    if(docImg){
      setImagePath(docImg);
    }
    if(hyperDocName) {
      setFullName(hyperDocName);
    }
    setIsExistingCustomer(isExistCustomer);
    checkIdAvailable(isExistCustomer);
    setIsUserValidate(isExistCustomer);
    if(isExistCustomer){
      setCheckBtnTriggered('yes');
    } else {
      setCheckBtnTriggered('no');
    }
  }

  const checkDocumentValid = (hyperData) =>{
    const customerDOB = moment(validCutomerData?.birthday).format("DD-MM-YYYY");
    const customerGender = validCutomerData?.gender == "0" ? "F" : "M";
    if(hyperData?.firstName && validCutomerData?.firstName && hyperData?.firstName !== validCutomerData?.firstName){
      return false;
    }
    if(hyperData?.lastName && validCutomerData?.lastName && hyperData?.lastName !== validCutomerData?.lastName){
      return false;
    }
    if(hyperData?.middleName && validCutomerData?.middleName && hyperData?.middleName !== validCutomerData?.middleName){
      return false;
    }
    if(hyperData?.dateOfBirth && customerDOB && hyperData?.dateOfBirth !== customerDOB){
      return false;
    }
    if(hyperData?.gender && hyperData?.gender !== customerGender){
      return false;
    }
    return true;
  }



  return (
    <>
      <FullPageLoader fromapploader={openloader}></FullPageLoader>
      <div className='hyper-box'>

        {/* Validation Form */}
        <Form
          name="basic"
          ref={formRef}
          initialValues={{
            remember: true,
          }}
          form={form}
          onFinish={validateUser}
          onFinishFailed={onFinishFailed}
        >
          <div className="main-component">
            <h2 className="fs-24 purple-text fw-600">
              Is this for an existing customer?
            </h2>
            <div className="checking-btns">
              <Button
                className={`check-btn-hyper ${checkBtnTriggered === 'yes' ? "active" : ""}`}
                onClick={() => onSelectYes("yes")}>
                <CheckIcon style={{ color: "#5BA46A", marginRight: "13px" }} />
                Yes
              </Button>
              <Button
                className={`check-btn-hyper ${checkBtnTriggered === 'no' ? "active" : ""}`}
                onClick={() => onSelectNo("no")}>
                <CloseIcon style={{ color: "#BB251A", marginRight: "13px" }} />
                No
              </Button>
            </div>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name la"
                  name="validId"
                  label="ID Type"
                  rules={[
                    {
                      required: true,
                      message: "Please Select ID Type",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    className="first-name input-box valid-id"
                    style={{ height: '42px' }}
                    placeholder="Select ID Type"
                    size="large"
                    options={validIds}
                    disabled={isUserValidate || checkBtnTriggered == "no"}
                    value={documentType}
                    onChange={(val) => selectDocType(val)}
                  ></Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name la"
                  name="documentCode"
                  label="ID Number"
                  rules={[
                    {
                      required: true,
                      message: "Please Select ID Number",
                    },
                    // {
                    //   validator: (_, value) => {
                    //     const validPattern = /^[a-zA-Z0-9\-]+$/;
                    //     if (!validPattern.test(value)) {
                    //       return Promise.reject("only - is allowed.");
                    //     }
                    //     return Promise.resolve();
                    //   },
                    // },
                  ]}
                >
                  <Input
                    className="first-name input-box docId"
                    style={{ height: '42px' }}
                    size="large"
                    maxLength="20"
                    name="documentCode"
                    value={documentCode}
                    disabled={isUserValidate || (checkBtnTriggered === 'no' && !documentCode)}
                    placeholder="Enter ID Number"
                    autoComplete="off"
                    onChange={(e) => selectDocCode(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            {checkBtnTriggered === 'yes' && isExistingCustomer && (
              <>
                <div className="verified-container" style={{ marginBottom: '16px' }}>
                  <Button
                    className={`verified-btn ${isUserValidate ? "valid-user event-none" : ""} ${!isUserValidate && isBtnTriggered ? 'invalid-user event-none' : ''}`}
                    htmlType='submit'
                  >
                    <img src={img1} alt="validate" />
                    {isUserValidate ? 'Validated' : !isUserValidate && isBtnTriggered ? 'Try Again' : 'Validate'}
                  </Button>
                      <Button className="clear" onClick={() => clearValidateData("clear")}>
                        Clear All Fields
                      </Button>
                </div>
              </>
            )}
          </div>
        </Form>

        {/* Hyperverge */}
        <div>
          <p style={{ fontWeight: 'bold', color: '#000' }}>
            <span style={{ color: 'red' }}>* </span>
            Document </p>
          <div
            className="browser-box"
          >
            <div className="doc-box">
              {
                !imagePath && (
                  <div
                    className="child11"
                    style={{
                      backgroundColor: '#1D428A',
                      borderColor: '#1D428A',
                      marginRight: "20px",
                    }}
                  >
                    <FolderAddOutlined style={{ color: 'white' }} />
                  </div>
                )
              }
              {
                imagePath && (
                  <Image
                    width={45}
                    src={imagePath}
                    style={{ marginRight: '10px' }}
                  />
                )
              }
              <div className="doc-text-container">
                {fullName && (
                  <p className="doc-text" title={fullName}>
                    <FileProtectOutlined style={{ marginRight: "10px" }} />
                    <span className="signature-name" title={fullName}>
                      {fullName}
                    </span>
                    <DeleteOutlined
                      className="doc-delete-icon"
                      onClick={deleteDoc}
                    />
                  </p>
                )}
              </div>
            </div>

            <Button
              className={`browse-btn ${hyperResult?.status == "auto_approved" || fullName ? "points-none" : ""
                }`}
              style={{ backgroundColor: '#1D428A' }}
              onClick={onBoardHandler}
            >
              Browse
            </Button>
          </div>
          <p className="fw-bold" style={{ marginTop: 10 }}>
            {hintText}
          </p>
        </div>

      </div>
    </>
  )
}

export default HypervergeComponent;