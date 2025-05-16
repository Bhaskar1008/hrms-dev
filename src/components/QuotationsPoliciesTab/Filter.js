import React, { createContext, useRef, forwardRef, useState, useImperativeHandle, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Row, Col, Select, Form, Input, DatePicker, Spin, Tag } from "antd";
import { Option } from "antd/lib/mentions";
import "./Filter.css";
import moment from "moment";
import filterImg from "../../assets/Images/filter.png";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/QuotationsPolicies";
import { GetfilterQuotationData } from "../../store/actions/getFiltersdata";

import { stoageGetter } from "../../helpers";
import { CloseCircleOutlined } from "@ant-design/icons";
import FullPageLoader from "../FullPageLoader/FullPageLoader";




export function OffCanvasForGlobalFilter({ currentActiveTabKey, ...props }) {
  console.log("activeKey-------->", currentActiveTabKey);

  const { id } = stoageGetter("user");
  const user_data = stoageGetter("user");
  var travelUserDetailedInfo = useSelector((state) => state?.trip?.travelUserDetailedInfo?.documentUploaded)
  console.log("hypervergeData--->>>", travelUserDetailedInfo)
  const designationName = user_data.designation.designatioName
  console.log("designationName----->", designationName)
 
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const [showButton, setShowButton] = useState(false);
  console.log("showButton", showButton);

  const [closetab, setCloseTab] = useState(false);

  // this is data for filter

  const [quotationStatus, setQuotationStatus] = useState([]);



  const [DocumentStatus, setDocumentStatus] = useState([]);

  const [applyFilter, setApplyFilter] = useState({
    id: id,
    page: 1,
    policyholder: "",
    staffName: "",
    quotationPolicyNumber: "",
    quotationStatus: "",//policy
    dateCreated: null,
    effectivityfromDate: "",
    effectivitytoDate: "",
    expiryfromDate: "",
    expirytoDate: "",
  });
  console.log("filterdata", applyFilter);

  const [form] = Form.useForm();



  const handleShow = () => {
    setShow(true);
  };

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 200;
  const [current, setcurrent] = useState(1);
  const [productName, setProductName] = useState([]);

  const productOptions = [
    { label: "CTPL", value: "CTPL" },
    { label: "Travel", value: "Travel" },
    { label: "Motor", value: "Motor" },
  ];
  
  const quotationOptions = currentActiveTabKey === "Quotation"
    ? [
      { label: "Active", value: "Active" },
      { label: "Provisional", value: "Provisional" }
    ]
    : [
      { label: "Active", value: "Active" },
      { label: "Provisional", value: "Provisional" },
      { label: "Paid", value: "Paid" },
      { label: "Unpaid", value: "Unpaid" }
    ];
  
  const documentOptions = [
    { label: "Document Uploaded", value: "document uploaded" },
    { label: "Document Not Uploaded", value: "document not uploaded" },
  ];
  const handleforProduct = (val) => {
    setProductName(val.join("-"));
  };
  console.log(productName, "productName");
  const handleforPolicyholder = (val) => {
    // console.log(val,"policyholder")
    setApplyFilter((res) => ({ ...res, policyholder: val.target.value }));
  };
  const handleforstaffName = (val) => {
    // console.log(val,"policyholder")
    setApplyFilter(res => ({ ...res, staffName: val.target.value }))
  }

  const handleforQuotationPolicyNumber = (val) => {
    // console.log(val.target.value ,"quotationPolicyNumber")
    setApplyFilter((res) => ({
      ...res,
      quotationPolicyNumber: val.target.value,
    }));
  };
  const handleforQuotationStatus = (val) => {
    console.log(val, "policyholder");
    setQuotationStatus(val);
  };

  // const handleforPolicyStatus = (val) =>{
  //   console.log(val,'handleforPolicyStatus')
  //   setPolicyStatus(val)
  // }

  const handleforDateCreated = (date, dateString) => {

    console.log(date, "dateCreated");
    let newDate = moment(date).valueOf();
    const dateFormat = "YYYY/MM/DD"; // Date format
    const formattedDate = moment(newDate).format(dateFormat);
    console.log("dateFormat", dateString);
    setApplyFilter((res) => ({ ...res, dateCreated: date }));
  };
  const handleforeffectivityfromDate = (date, dateString) => {
    const formattedDate = dateString ? moment(date).format('MM/DD/YYYY') : null;
    setApplyFilter({
      ...applyFilter,
      effectivityfromDate: formattedDate,
    });

    // let newDate = moment(date).valueOf();
    // const dateFormat = "MM/DD/YYYY"; // Date format
    // const formattedDate = moment(newDate).format(dateFormat);
    // // console.log("dateFormat", formattedDate, date._d, dateString);
    // setApplyFilter((res) => ({ ...res, effectivityfromDate: date }));
  };
  const handleforEffectivitytoDate = (date, dateString) => {
    const formattedDate = dateString ? moment(date).format('MM/DD/YYYY') : null;
    setApplyFilter({
      ...applyFilter,
      effectivitytoDate: formattedDate,
    });
    // let newDate = moment(date).valueOf();
    // const dateFormat = "MM/DD/YYYY"; // Date format
    // const formattedDate = moment(newDate).format(dateFormat);
    // // console.log("dateFormat", formattedDate, date._d, dateString);
    // setApplyFilter((res) => ({ ...res, effectivitytoDate: date }));
  };
  const handleforExpiryfromDate = (date, dateString) => {
    const formattedDate = dateString ? moment(date).format('MM/DD/YYYY') : null;
    setApplyFilter({
      ...applyFilter,
      expiryfromDate: formattedDate,
    });
    // let newDate = moment(date).valueOf();
    // const dateFormat = "MM/DD/YYYY"; // Date format
    // const formattedDate = moment(newDate).format(dateFormat);
    // // console.log("dateFormat", formattedDate, date._d, dateString);
    // setApplyFilter((res) => ({ ...res, expiryfromDate: date }));
  };
  const handleforExpirytoDate = (date, dateString) => {
    const formattedDate = dateString ? moment(date).format('MM/DD/YYYY') : null;
    setApplyFilter({
      ...applyFilter,
      expirytoDate: formattedDate,
    });
    // let newDate = moment(date).valueOf();
    // const dateFormat = "MM/DD/YYYY"; // Date format
    // const formattedDate = moment(newDate).format(dateFormat);
    // setApplyFilter((res) => ({ ...res, expirytoDate: date }));
  };
  useEffect(() => {
    // Additional logic if needed
  }, [showButton]);

  useEffect(() => {
    const id = applyFilter?.id;
    const page = applyFilter?.page;
    // Reset filter data and hide "Close Filter" tag when currentActiveTabKey changes
    setProductName([]);
    setApplyFilter({
      id,
      page,
      policyholder: "",
      staffName: "",
      quotationPolicyNumber: "",
      quotationStatus: "",
      dateCreated: null,
      effectivityfromDate: "",
      effectivitytoDate: "",
      expiryfromDate: "",
      expirytoDate: "",
    });
    setQuotationStatus([]);
    setDocumentStatus([]);
    // setShowButton(false);
    handleClearAll()
  }, [currentActiveTabKey]);

  const handleforDocumentStatus = (val) => {
    if (travelUserDetailedInfo?.documentUploaded === true) {
      val = val === "document uploaded" ? val : "";
    } else if (travelUserDetailedInfo?.documentUploaded === false) {
      val = val === "document not uploaded" ? val : "";
    }
    setDocumentStatus(val);
    console.log(val, "setDocumentStatus");
  };
  

  const handleClose = () => {
    setShow(false);
  };
  const handleApplyFilter = (e) => {
    console.log("button console for refernce", showButton);
    const id = applyFilter?.id;
    const page = applyFilter?.page;
    const policyholder = applyFilter?.policyholder;
    const staffName = applyFilter?.staffName;
    const quotationPolicyNumber = applyFilter?.quotationPolicyNumber;
    const dateCreated = applyFilter?.dateCreated
      ? moment(applyFilter?.dateCreated).format("YYYY/MM/DD")
      : null;
    const effectivityfromDate = applyFilter?.effectivityfromDate
      ? moment(applyFilter?.effectivityfromDate).format("MM/DD/YYYY")
      : null;
    const effectivitytoDate = applyFilter?.effectivitytoDate
      ? moment(applyFilter?.effectivitytoDate).format("MM/DD/YYYY")
      : null;
    const expiryfromDate = applyFilter?.expiryfromDate
      ? moment(applyFilter?.expiryfromDate).format("MM/DD/YYYY")
      : null;
    const expirytoDate = applyFilter?.expirytoDate
      ? moment(applyFilter?.expirytoDate).format("MM/DD/YYYY")
      : null;

    if (currentActiveTabKey === "Quotation") {
      dispatch(
        GetfilterQuotationData({
          id,
          page,
          policyholder,
          staffName,
          quotationPolicyNumber,
          quotationStatus,
          dateCreated,
          effectivityfromDate,
          effectivitytoDate,
          expiryfromDate,
          expirytoDate,
          showButton,
          productName,
          quotationOrPolicy: 'Quotation'
        })
      );

      dispatch(
        actions.fetchDataAfterFilterQuotationsPolicies(
          id,
          page,
          productName,
          policyholder,
          staffName,
          quotationStatus,
          quotationPolicyNumber,
          dateCreated,
          effectivityfromDate,
          effectivitytoDate,
          expiryfromDate,
          expirytoDate,
          showButton,
          current
        )
      );
    } else {
      dispatch(
        GetfilterQuotationData({
          id,
          page,
          productName,
          policyholder,
          staffName,
          quotationPolicyNumber,
          quotationStatus,
          dateCreated,
          effectivityfromDate,
          effectivitytoDate,
          expiryfromDate,
          expirytoDate,
          showButton,
          DocumentStatus,
          quotationOrPolicy: 'Policies'

        })
      );
      dispatch(
        actions.fetchDataAfterFilterPolicies(
          id,
          page,
          productName,
          policyholder,
          staffName,
          quotationPolicyNumber,
          quotationStatus,
          dateCreated,
          effectivityfromDate,
          effectivitytoDate,
          expiryfromDate,
          expirytoDate,
          DocumentStatus,
          showButton,
          current,
          
        )
      );
    }

    if (
      applyFilter?.policyholder === "" &&
      applyFilter?.staffName === "" &&
      applyFilter?.quotationPolicyNumber === "" &&
      applyFilter?.dateCreated === "" &&
      applyFilter?.effectivityfromDate === "" &&
      applyFilter?.effectivitytoDate === "" &&
      applyFilter?.expiryfromDate === "" &&
      applyFilter?.expirytoDate === "" &&
      applyFilter?.quotationStatus === "" 
    ) {
      setCloseTab(false);
      setShowButton(false);
    } else {
      setShowButton(true);
    }
    setShow(false);
    setCloseTab(true);
  };

  const handleClearAll = () => { 
    form.resetFields();
    setShowButton(false);
    setProductName([]);
    setDocumentStatus([])
    setQuotationStatus([])
    form.setFieldValue({
      productName: [],
      policyholder: "",
      DocumentStatus: [],
    })
    const id = applyFilter?.id;
    const page = applyFilter?.page;
    setApplyFilter({
      id,
      page,
      policyholder: "",
      staffName: "",
      quotationPolicyNumber: "",
      quotationStatus: "",
      dateCreated: null,
      effectivityfromDate: "",
      effectivitytoDate: "",
      expiryfromDate: "",
      expirytoDate: "",
    });
  };

  

  const onResetfilter = () => {
    handleClearAll()
    const id = applyFilter?.id;
    const page = applyFilter?.page;
    setProductName([])
    setDocumentStatus([])
    setApplyFilter({
      id: id,
      page: 1,
      policyholder: "",
      staffName: "",
      quotationPolicyNumber: "",
      quotationStatus: "",//policy
      dateCreated: null,
      effectivityfromDate: "",
      effectivitytoDate: "",
      expiryfromDate: "",
      expirytoDate: "",
    }) 
    form.setFieldValue({
      productName: [],
      policyholder: "",
      staffName: "",
      DocumentStatus: "",
    })

    if (currentActiveTabKey === "Quotation") {
      dispatch(GetfilterQuotationData({
        id: id,
        page: 1,
        // productName: "",
        // policyholder: "",
        // staffName: "",
        // quotationPolicyNumber: "",
        // quotationStatus: "",
        // dateCreated: "",
        // effectivityfromDate: '',
        // effectivitytoDate: "",
        // expiryFromDate: "",
        // expiryToDate: "",
        // quotationOrPolicy: ''

          productName : "",
          policyholder: "",
          staffName : "",
          quotationPolicyNumber: "",
          quotationStatus: "",
          dateCreated: "",
          effectivityfromDate: "",
          effectivitytoDate: "",
          expiryfromDate: "",
          expirytoDate: "",
          showButton : "",
          DocumentStatus: "",
          quotationOrPolicy: '',
        
      }));
      dispatch(actions.fetchDataAfterFilterQuotationsPolicies(id, page));
    } else {
      dispatch(GetfilterQuotationData({
        productName: "",
        policyholder: "",
        staffName:"",
        quotationPolicyNumber: "",
        quotationStatus: "",
        dateCreated: "",
        effectivityfromDate: '',
        effectivitytoDate: "",
        expiryFromDate: "",
        expiryToDate: "",
        quotationOrPolicy: ''
      }));
      dispatch(actions.fetchDataAfterFilterPolicies(id, page));
    }
    // dispatch(actions.fetchDataAfterFilterQuotationsPolicies(id, page));
    console.log("Close icon clicked!");
    setShowButton(false);
  };



  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  useEffect(() => { });

  return (
    <>
      {/* <p className="listheading" >List of {currentActiveTabKey}</p> */}

      {showButton === true ? 
        <div className="closeFilterButtonDiv" >
          <Tag
            className="closeFilterButton"
            closable
            onClose={onResetfilter}
            closeIcon={<CloseCircleOutlined />}
          >
            Close Filter
          </Tag>
        </div> : ""
      }

      <button className="filterbutton" onClick={handleShow} key={"filter"}>
        <img src={filterImg} className="filterImg" alt="filterImg" />
        Filter
      </button>

      <Offcanvas
        show={show}
        {...props}
        scroll={true}
        onHide={(e) => handleClose(e)}
        placement={breakpoint <= width ? "end" : "down"}
        style={{
          width: breakpoint <= width ? "27rem" : "100%",
          height: "auto",
          marginTop: "3.7rem",
          backgroundColor: "rgb(247, 247, 247)",
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        {/* <FullPageLoader fromapploader={loader}></FullPageLoader> */}

        <Offcanvas.Body>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            form={form}
          >
            <Row gutter={[24]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name la"
                  name="product"
                  label="Product"
                  labelCol={{ span: 24 }} // Set label width to 100%
                  wrapperCol={{ span: 24 }}
                >
                  <Select
                    size="default"
                    mode="multiple"
                    placeholder="Select product"
                    onChange={handleforProduct}
                    style={{
                      width: "100%",
                    }}
                    options={productOptions}
                    value={productName}
                    dropdownMatchSelectWidth={false} // Prevents dropdown from expanding
                    dropdownStyle={{ width: 200, maxHeight: 300, overflowY: 'auto' }}
                    getPopupContainer={(trigger) => trigger.parentElement} // Fixed width and height
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name la"
                  name="policyholder"
                  label="Policy Holder"
                >
                  <Input
                    className="policyholder input-box"
                    size="default"
                    placeholder="Enter policy holder"
                    value={applyFilter.policyholder}
                    onChange={handleforPolicyholder}
                  />
                </Form.Item>
              </Col>
              {designationName === "Staff" ? "" : 
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="staffName"
                    label="Staff Name"
                  >
                    <Input
                      className="policyholder input-box"
                      size="default"
                      placeholder="Enter Staff Name"
                      value={applyFilter.staffName}
                      // value={applyFilter.policyholder}
                      onChange={handleforstaffName}
                    // onChange={handleforPolicyholder}
                    />
                  </Form.Item>
                </Col>}
             
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item {...formItemLayout} className="form-item-name la">
                  <p>
                    <b>
                      {currentActiveTabKey === "Quotation"
                        ? "Quotation number"
                        : "Policy Number"}
                    </b>
                  </p>

                  <Input
                    size="default"
                    className="form-item-name la textfields"
                    onChange={handleforQuotationPolicyNumber}
                    placeholder={
                      currentActiveTabKey === "Quotation"
                        ? "Enter quotation number"
                        : "Enter policy number"
                    }
                    value={applyFilter.quotationPolicyNumber}
                  />
                </Form.Item>
              </Col>
              {currentActiveTabKey === "policies" ? (
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="policyStatus"
                    label="Policy Status"
                  >
                    <Select
                      size="default"
                      placeholder="Select policy status"
                      onChange={handleforQuotationStatus}
                      style={{ width: "100%" }}
                      options={quotationOptions}
                      value={quotationStatus}
                      dropdownMatchSelectWidth={false} // Prevents dropdown from expanding
                      dropdownStyle={{ width: 200, maxHeight: 300, overflowY: 'auto' }}
                      getPopupContainer={(trigger) => trigger.parentElement} // Fixed width and height
                    />
                  </Form.Item>
                </Col>
              )
                : <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="quotationStatus"
                    label="Quotation Status"
                  >
                    <Select
                      size="default"
                      placeholder="Select Quotation status"
                      onChange={handleforQuotationStatus}
                      style={{ width: "100%" }}
                      options={quotationOptions}
                      value={quotationStatus}
                      dropdownMatchSelectWidth={false} // Prevents dropdown from expanding
                      dropdownStyle={{ width: 200, maxHeight: 300, overflowY: 'auto' }}
                      getPopupContainer={(trigger) => trigger.parentElement} // Fixed width and height
                    />
                  </Form.Item>
                </Col>}
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name la"
                  name="dateCreated"
                  label="Date Created"
                >
                  <DatePicker
                    className="textfields"
                    onChange={handleforDateCreated}
                    size="default"
                    style={{ width: "100%" }}
                    getPopupContainer={(trigger) => trigger.parentElement}
                    value={applyFilter.dateCreated}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name la"
                  name="effectivityFromDate"
                  label="Effectivity From Date"
                >
                  <DatePicker
                    onChange={handleforeffectivityfromDate}
                    size="default"
                    style={{ width: "100%" }}
                    getPopupContainer={(trigger) => trigger.parentElement}
                    value={applyFilter.effectivityfromDate ? moment(applyFilter.effectivityfromDate, 'MM/DD/YYYY') : null}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name la"
                  name="effectivityToDate"
                  label="Effectivity To Date"
                >
                  <DatePicker
                    onChange={handleforEffectivitytoDate}
                    size="default"
                    style={{ width: "100%" }}
                    getPopupContainer={(trigger) => trigger.parentElement}
                    // value={applyFilter.effectivitytoDate}
                    value={applyFilter.effectivitytoDate ? moment(applyFilter.effectivitytoDate, 'MM/DD/YYYY') : null}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name la"
                  name="expiryFromDate"
                  label="Expiry From Date"
                >
                  <DatePicker
                    onChange={handleforExpiryfromDate}
                    size="default"
                    style={{ width: "100%" }}
                    // value={applyFilter.expiryfromDate}
                    getPopupContainer={(trigger) => trigger.parentElement}
                    value={applyFilter.expiryfromDate ? moment(applyFilter.expiryfromDate, 'MM/DD/YYYY') : null}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name la"
                  name="expiryToDate"
                  label="Expiry To Date"
                >
                  <DatePicker
                    onChange={handleforExpirytoDate}
                    size="default"
                    style={{ width: "100%" }}
                    // value={applyFilter.expirytoDate}
                    getPopupContainer={(trigger) => trigger.parentElement}
                    value={applyFilter.expirytoDate ? moment(applyFilter.expirytoDate, 'MM/DD/YYYY') : null}
                  />
                </Form.Item>
              </Col>

              {currentActiveTabKey === "policies" && (
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="DocumentStatus"
                    label="Document Status"
                  >
                    <Select
                      size="default"
                      placeholder="Select  "
                      onChange={handleforDocumentStatus}
                      style={{
                        width: "100%",
                      }}
                      value={DocumentStatus}
                      options={documentOptions}
                      dropdownMatchSelectWidth={false} // Prevents dropdown from expanding
                      dropdownStyle={{ width: 200, maxHeight: 300, overflowY: 'auto' }}
                      getPopupContainer={(trigger) => trigger.parentElement} // Fixed width and height
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Form>

          <div className="buttonsDiv">
            <Button
              className="clearAll"
              onClick={handleClearAll}
             
            >
              Clear All
            </Button>
            <Button
              className="ApplyFilter"
              onClick={handleApplyFilter}
              
            >
              Apply Filters
              {/* <ArrowRightOutlined /> */}
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}


function GlobalFilters(currentActiveTabKey, props) {
  console.log("Props------>", props, currentActiveTabKey);
  const leadsData = useSelector((state) => state.quotationsPolicies);
  console.log(
    "quotationsPoliciesMaster/policies Checking--------------->",
    leadsData.currentActiveTab
  );
  
  return (
    <>
      <OffCanvasForGlobalFilter
        key={"0"}
        filterdata={props}
        currentActiveTabKey={leadsData?.currentActiveTab}
      />
      {/* currentActiveTabKey={currentActiveTabKey} */}
    </>
  );
}

export default GlobalFilters;
