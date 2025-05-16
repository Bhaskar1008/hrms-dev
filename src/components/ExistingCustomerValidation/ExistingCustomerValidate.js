import React, { useState, createRef } from "react";
import "./ExistingCustomerValidation.css";
import { Row, Col, Button, Select, Form, Input, message } from "antd";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import img1 from "../../images/button images/MdVerified.png";
import { FolderAddOutlined } from "@ant-design/icons";
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import { getThirdPartyDetails } from "../../services/travel/index";

const ExistingCustomerValidate = ({ validIds, handleCustomerDetails, handleDocType, handleIdNumber, checkIdAvailable }) => {
 
  const [openloader, setOpenloader] = useState(false);
  const [checkBtnTriggered, setCheckBtnTriggered] = useState("");
  const [isExistingCustomer, setIsExistingCustomer] = useState(false);
  const [validateData, setValidateData] = useState({
    documentType: undefined,
    documentCode: "",
  });
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [isValidTriggered, setIsValidTriggred] = useState(false);
  const formRef = createRef();

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const checkValidate = () => {
    const docType = validateData?.documentType?.toString();
    const docCode = validateData?.documentCode?.toString();
    const params = {
      documentType: docType,
      documentCode: docCode
    }
    if (validateData.documentCode && validateData.documentType) {
      setOpenloader(true);
      setIsValidTriggred(true);
      getThirdPartyDetails(params)
        .then((data) => {
          if (data?.customerDetail) {
            setIsIdAvailable(true);
            checkIdAvailable(true);
            handleCustomerDetails(data.customerDetail);
          } else {
            message.error("Details not found");
            setIsIdAvailable(false);
            checkIdAvailable(false);
            handleCustomerDetails(false);
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
          message.error(error);
        })
        .finally(() => {
          setOpenloader(false);
        });
    } else {
      message.error(`Please select ${!validateData?.documentType ? 'Valid Id' : !validateData?.documentCode ? 'ID Number' : 'Valid Id and ID Number'}`)
    }
  };  

  const handleSelectChange = (value) => {
    setValidateData({
      ...validateData,
      documentType: value,
    });
    handleDocType(value);
  };

  const handleInputChange = (e) => {
    setValidateData({
      ...validateData,
      documentCode: e.target.value,
    });
    handleIdNumber(e.target.value);
  };

  const clearValidateData = () => {
    formRef.current.resetFields();
    setValidateData({
      documentType: undefined,
      documentCode: "",
    });
    handleDocType(undefined);
    handleIdNumber("");
    checkIdAvailable(false);
    setIsIdAvailable(false);
    setIsValidTriggred(false);
    handleCustomerDetails(false);
  };

  return (
    <>
      <FullPageLoader fromapploader={openloader}></FullPageLoader>

      <Form
        name="basic"
        ref={formRef}
        initialValues={{
          remember: true,
        }}
      >
        <div className="existing-customer-container main-component">
          <h2 className="fs-24 purple-text fw-600">
            Is this for an existing customer?
          </h2>
          <div className="checking-btns">
            <Button
              className={`check-btn ${checkBtnTriggered === 'yes' ? "active" : ""}`}
              onClick={() => { setCheckBtnTriggered('yes'); setIsExistingCustomer(true); }}
            >
              <CheckIcon style={{ color: "#5BA46A", marginRight: "13px" }} />
              Yes
            </Button>
            <Button
              className={`check-btn ${checkBtnTriggered === 'no' ? "active" : ""}`}
              onClick={() => { clearValidateData(); setCheckBtnTriggered('no'); setIsExistingCustomer(false) }}
            >
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
                    label="Valid ID"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Valid ID",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      className="first-name input-box"
                      placeholder="Select ID Type"
                      size="large"
                      options={validIds}
                      disabled={isIdAvailable}
                      value={validateData?.documentType}
                      onChange={handleSelectChange}
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
                      {
                        validator: (_, value) => {
                          const validPattern = /^[a-zA-Z0-9\-]+$/;
                          if (!validPattern.test(value)) {
                            return Promise.reject("only - is allowed.");
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      className="first-name input-box"
                      size="large"
                      maxLength="20"
                      name="documentId"
                      value={validateData?.documentCode}
                      disabled={isIdAvailable}
                      placeholder="Enter Valid ID Number"
                      autoComplete="off"
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
          {checkBtnTriggered === 'yes' && isExistingCustomer && (
            <>

              <div className="verified-container">
                <Button
                  className={`verified ${isIdAvailable ? "valid-user event-none" : ""} ${!isIdAvailable && isValidTriggered ? 'invalid-user event-none' : ''} varified-btn`}
                  onClick={checkValidate} 
                >
                  {" "}
                  <img src={img1} alt="validate" />
                  Validate
                </Button>
                {
                  !isIdAvailable && (
                    <Button className="clear varified-btn" onClick={clearValidateData}>
                      Clear All Fields
                    </Button>
                  )
                }
              </div>
            </>
          )}
        </div>
      </Form>
    </>
  );
};

export default ExistingCustomerValidate;
