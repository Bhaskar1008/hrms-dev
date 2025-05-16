import React, { createContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Radio, Select, Input, Col, Row, Form, Space, Tag } from "antd";
import { Option } from "antd/lib/mentions";
import "../Tab/Filter.css";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/leads";
import { stoageGetter } from "../../helpers";
import filterImg from "../../assets/Images/filter.png";
const leadStatus = [
  { label: "New Lead Entry", value: "newleadentery" },
  { label: "No Contact", value: "nocontact" },
  { label: "Contact", value: "contact" },
];

const lead_type = [
  { label: "Sales", value: "Sales" },
  { label: "Individual", value: "Individual" },
  { label: "Group", value: "Group" },
  // {label: 'LA Recruitment', value: 'LA Recruitment',},
  // {label: 'OP Recruitment', value: 'OP Recruitment',},
];

const otp_type = [
  {
    label: "Very interested",
    value: "Very interested",
  },
  {
    label: "Somewhat interested",
    value: "Somewhat interested",
  },
  {
    label: "Not interested",
    value: "Not interested",
  },
  {
    label: "Closed Sale",
    value: "Closed Sale",
  },
  // {
  //   label: "Hot",
  //   value: "Hot",
  // },
  // {
  //   label: "Warm",
  //   value: "Warm",
  // },
  // {
  //   label: "Cold",
  //   value: "Cold",
  // },
  // {
  //   label: "Neutral",
  //   value: "Neutral",
  // },
  // {
  //   label: "Spot Closure",
  //   value: "Spot Closure",
  // },
];

const leadDisposition = [
  { label: "Not Reachable", value: "notreachable" },
  { label: "Ringing Busy", value: "ringingbusy" },
  { label: "Wrong Number", value: "wrongnumber" },
  { label: "Invalid Number", value: "invalidnumber" },
  { label: "Switched Off", value: "switchedoff" },
];

const lead_Disposition_contact = [
  { label: "Appointment", value: "appointment" },
  { label: "Call back", value: "callback" },
  { label: "Short hang-up", value: "shorthangup" },
  { label: "Not Interested", value: "notinterested" },
  { label: "Non Serviceable", value: "nonserviceable" },
  { label: "Not eligible", value: "noteligible" },
  { label: "Language Barrier", value: "languagebarrier" },
  { label: "Spot Closure", value: "spotclosure" },
  { label: "Converted", value: "converted" },
  { label: "Failed", value: "failed" },
];

const leadDispositionOptionContactLa = [
  { value: "bop", label: "BOP" },
  { value: "appointment", label: "Appointment" },
  {
    value: "callback",
    label: "Call back",
  },

  {
    value: "shorthangup",
    label: "Short hang-up",
  },
  {
    value: "notinterested",
    label: "Not Interested",
  },

  {
    value: "noteligible",
    label: "Not eligible",
  },

  {
    value: "languagebarrier",
    label: "Language Barrier",
  },

  {
    value: "converted",
    label: "Converted",
  },

  {
    value: "failed",
    label: "Failed",
  },

  {
    value: "training",
    label: "Training",
  },
  {
    value: "exam",
    label: "Exam",
  },
  {
    value: "coding",
    label: "Coding",
  },
];

export function OffCanvasForGlobalFilter({ ...props }) {
  let URl = window.location.href;
  const { id } = stoageGetter("user");
  const teamId = stoageGetter("teamMemberId");
  const dispatch = useDispatch();
  const leadsData = useSelector((state) => state.leads);

  console.log("leadsData---->", leadsData);

  const [filterData, setFilterData] = useState({
    id: leadsData?.globalTab == "team" ? teamId : id,
    skip: 0,
    searchtxt: "",
    leadStatus: "",
    sortByFlter: "",
    sort_status: "",
    leadfilter: getLastParameter(URl),
    leadDisposition: "",
    leadType: "",
    searchType: "fname",
    leadPropensity: "",
  });
  useEffect(() => {
    setFilterData((prev) => ({
      ...prev,
      id: leadsData?.globalTab === "team" ? teamId : id,
    }));
  }, []);
  console.log("filter Data", filterData);

  // searchtxt:'', leadStatus:'', sorByFlter:'', sort_status:'', leadfilter, leadDisposition, leadType

  const [searchTextFilter, setSearchTextFilter] = useState("");
  const [sortByFlter, setSortByFlter] = useState("");

  const [shortByStatus, setShortByStatus] = useState("created_date_old");
  const [sortBy, setSortBy] = useState("new_to_old");
  const [leadserchvalue, setLeadserchvalue] = useState("");

  // const [leadFilter, setleadFilter] = useState("");
  // const [searchType, setSearchType] = useState("fname");

  // const [leadDisposition, setLeadDisposition] = useState("");
  // const [leadType, setLeadType] = useState("");
  //const [leadStatus, setLeadStatus] = useState("");

  const [filterLeadStatus, setfilterLeadStatus] = useState("");
  const [closetab, setCloseTab] = useState(false);

  // let sortByData = [
  //   {label:'Lead Created date - Newest to oldest',value:'new_to_old', status: 'created_date_old'},
  //   {label:'Lead Created date - Oldest to Newest',value:'old_to_new', status: 'created_date_new'},
  //   // {label:'Allocation Date - Newest to Oldest',value:'new_to_old', status: 'allocation_date_old'},
  //   // {label:'Allocation Date - Oldest to Newest',value:'old_to_new', status: 'allocation_date_new'},
  // ]
  let sortByData = [
    {
      label: "Lead Created date - Newest to oldest",
      status: "new_to_old",
      filtValue: "createddate",
      value: "created_date_old",
    },
    {
      label: "Lead Created date - Oldest to Newest",
      status: "old_to_new",
      filtValue: "createddate",
      value: "created_date_new",
    },
    {
      label: "Allocation Date - Newest to Oldest",
      status: "new_to_old",
      filtValue: "allocateddate",
      value: "allocation_date_old",
    },
    {
      label: "Allocation Date - Oldest to Newest",
      status: "old_to_new",
      filtValue: "allocateddate",
      value: "allocation_date_new",
    },
  ];

  const handleSortByStatus = (ev, data) => {
    setFilterData((res) => ({ ...res, sortByFlter: data.filtValue }));
    setFilterData((res) => ({ ...res, sort_status: data.status }));
    setShortByStatus(data);
  };

  const handleChange = (val) => {
    setFilterData((res) => ({ ...res, leadType: val }));
  };

  const handelLeadStatus = (val) => {
    console.log("Val--->", val);
    setFilterData((res) => ({ ...res, leadPropensity: val }));
  };

  const handleSearchType = (val) => {
    console.log("Val--->", val);
    setLeadserchvalue("");
    setFilterData((res) => ({ ...res, searchType: val.target.value }));
  };

  const handleNameSearch = (val) => {
    console.log("Lead ID---->", val);
    setLeadserchvalue(val.target.value);
    setFilterData((res) => ({ ...res, searchtxt: val.target.value }));
  };

  const handleLeadDispositionChange = (val) => {
    setFilterData((res) => ({ ...res, leadDisposition: val }));
  };
  const handleLeadStatusChange = (val) => {
    setFilterData((res) => ({ ...res, leadStatus: val }));
  };

  const [hitFilterAPI, setHitFilterAPI] = useState(false);

  useEffect(() => {
    dispatch(
      actions.fetchDataAfterFilter(
        filterData?.id,
        filterData?.skip,
        filterData?.searchtxt,
        filterData?.leadStatus,
        filterData?.sortByFlter,
        filterData?.sort_status,
        filterData?.leadfilter,
        filterData?.leadDisposition,
        filterData?.leadType,
        filterData?.searchType,
        filterData?.leadPropensity
      )
    );

    if (filterData?.searchtxt === "" && filterData?.leadType === "" && filterData?.leadStatus === "" && filterData?.leadDisposition === "" && filterData?.sort_status === "" && filterData?.sortByFlter === "" && filterData?.leadPropensity === "") {
      setCloseTab(false);
    }
  }, [hitFilterAPI]);

  const handleApplyButton = () => {
    dispatch(
      actions.fetchDataAfterFilter(
        filterData?.id,
        filterData?.skip,
        filterData?.searchtxt,
        filterData?.leadStatus,
        filterData?.sortByFlter,
        filterData?.sort_status,
        filterData?.leadfilter,
        filterData?.leadDisposition,
        filterData?.leadType,
        filterData?.searchType,
        filterData?.leadPropensity
      )
    );
    setCloseTab(true);
    setShow(false);
  };

  function getLastParameter(URl) {
    const parts = URl.replace(/\/$/, "").split("/");
    if (parts[parts.length - 1] == "all_leads") {
      return "all";
    } else if (parts[parts.length - 1] == "fortoday") {
      return parts[parts.length - 1];
    } else if (parts[parts.length - 1] == "openlead") {
      return "open";
    } else if (parts[parts.length - 1] == "discardedlead") {
      return "discarded";
    } else if (parts[parts.length - 1] == "convertedleads") {
      return "converted";
    } else if (parts[parts.length - 1] == "pendingproposal") {
      return "failed";
    }
  }
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setFilterData({ searchType: "fname" });
  };
  const handleShow = () => setShow(true);

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 200;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    setShow(props.show);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);
  const getInputType = () => {
    if (filterData.searchType === "fname") {
      return "text";
    } else if (filterData.searchType === "primaryMobile") {
      return "number";
    } else if (filterData.searchType === "lead_Id") {
      return "text"; // or any other appropriate type
    }
    return "text"; // default type
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow} className="me-2">
        Filter
      </Button> */}

      {closetab ? (
        <>
          <div className="tagsss">
            <p>Selected Filters:</p>
            <div className="filter_chip">
              <ul className="filter_chip_ul">
                <li>
                  {filterData.searchtxt ? (
                    <Tag
                      closable
                      color="rgb(0 172 193)"
                      backgroundColor="rgb(1 180 187)"
                      onClose={(e) => {
                        setFilterData((res) => ({ ...res, searchtxt: "" }));
                        setHitFilterAPI(!hitFilterAPI);
                      }}
                    >
                      {filterData.searchtxt}
                    </Tag>
                  ) : null}
                </li>
                <li>
                  {filterData.leadType ? (
                    <Tag
                      closable
                      color="rgb(0 172 193)"
                      backgroundColor="rgb(1 180 187)"
                      onClose={(e) => {
                        setFilterData((res) => ({ ...res, leadType: "" }));
                        setHitFilterAPI(!hitFilterAPI);
                      }}
                    >
                      {filterData.leadType}
                    </Tag>
                  ) : null}
                </li>

                <li>
                  {filterData.leadStatus ? (
                    <Tag
                      closable
                      color="rgb(0 172 193)"
                      backgroundColor="rgb(1 180 187)"
                      onClose={(e) => {
                        setFilterData((res) => ({ ...res, leadStatus: "" }));
                        setHitFilterAPI(!hitFilterAPI);
                      }}
                    >
                      {filterData.leadStatus}
                    </Tag>
                  ) : null}
                </li>
                <li>
                  {filterData.leadDisposition ? (
                    <Tag
                      closable
                      color="rgb(0 172 193)"
                      backgroundColor="rgb(1 180 187)"
                      onClose={(e) => {
                        setFilterData((res) => ({ ...res, leadDisposition: "" }));
                        setHitFilterAPI(!hitFilterAPI);
                      }}
                    >
                      {filterData.leadDisposition}
                    </Tag>
                  ) : null}
                </li>
                <li>
                  {filterData.sortByFlter || filterData.sort_status ? (
                    <Tag
                      closable
                      color="rgb(0 172 193)"
                      backgroundColor="rgb(1 180 187)"
                      onClose={(e) => {
                        setFilterData((res) => ({ ...res, sortByFlter: "", sort_status: "" }));
                        setHitFilterAPI(!hitFilterAPI);
                      }}
                    >
                      {filterData.sortByFlter} {filterData.sort_status}
                    </Tag>
                  ) : null}
                </li>

                <li>
                  {filterData.leadPropensity ? (
                    <Tag
                      closable
                      color="rgb(0 172 193)"
                      backgroundColor="rgb(1 180 187)"
                      onClose={(e) => {
                        setFilterData((res) => ({ ...res, leadPropensity: "" }));
                        setHitFilterAPI(!hitFilterAPI);
                      }}
                    >
                      {filterData.leadPropensity}
                    </Tag>
                  ) : null}
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : null}

      <button className="round-cards43" onClick={handleShow} key={"filter"}>
        <img src={filterImg} className="person" alt="person_png" />
        Filter
      </button>

      <Offcanvas
        show={show}
        onHide={(e) => handleClose(e)}
        {...props}
        scroll={true}
        placement={breakpoint <= width ? "end" : "down"}
        style={{
          width: breakpoint <= width ? "27rem" : "100%",
          height: "auto",
          marginTop: "3.7rem",
          backgroundColor: "rgb(247, 247, 247)",
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Select Filter</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <div
            style={{
              width: "auto",
              height: "6rem",
              backgroundColor: "white",
              marginBottom: "0.5rem",
            }}
          >
            <h6
              style={{
                fontWeight: "bold",
                padding: "10px",
                fontSize: "13px",
                marginLeft: 5,
              }}
            >
              Sort by
            </h6>
            <Select
              onChange={(ev, data) => handleSortByStatus(ev, data)}
              bordered={false}
              name="SortBy"
              value={shortByStatus}
              options={sortByData}
              style={{
                width: "22rem",
                marginLeft: "1rem",
                // marginTop: "1rem",
                borderBottom: "1px gray solid",
                // opacity: "0.5",
              }}
              getPopupContainer={(trigger) => trigger.parentElement}
            ></Select>
          </div>
          <div
            style={{
              width: "auto",
              height: "10rem",
              backgroundColor: "white",
              marginBottom: "0.5rem",
            }}
          >
            <h6 style={{ fontWeight: "bold", padding: "10px", fontSize: "13px" }}>Search Type Selection</h6>
            <Radio.Group
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "1rem",
              }}
              // onChange={handleSearchType}
              defaultValue="fname"
              buttonStyle="solid"
            >
              <Space>
                <Radio.Button value="fname" onChange={handleSearchType}>
                  Name
                </Radio.Button>
                <Radio.Button value="primaryMobile" onChange={handleSearchType}>
                  Mobile
                </Radio.Button>
                <Radio.Button value="lead_Id" onChange={handleSearchType}>
                  Lead ID
                </Radio.Button>
              </Space>
            </Radio.Group>

            <div style={{ marginLeft: "20px" }}>
              {/* {show == true ? <p>Name</p> : ""}  */}

              {filterData.searchType === "fname" ? <p>Name</p> : filterData.searchType === "primaryMobile" ? <p>Mobile </p> : filterData.searchType === "lead_Id" ? <p>Lead ID</p> : ""}
            </div>
            <Row>
              {/* <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Input
                  type="text"
                  placeholder={filterData.searchType === 'fname' ? "Enter First Name / Last Name" : filterData.searchType === 'primaryMobile' ? "Enter Mobile" : filterData.searchType === 'lead_Id' ? 'Enter Lead ID' : ''}
                  size="default"
                  onChange={handleNameSearch}
                  style={{
                    width: '93%',
                    margin: "-10px 15px",
                    borderBottom: "1px gray solid",
                    //  opacity: "0.5",


                  }}
                  bordered={false}
                />
              </Col> */}
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Input
                  type={filterData.searchType === "primaryMobile" ? "tel" : filterData.searchType === "primaryMobile" ? "tel" : "text"}
                  placeholder={filterData.searchType === "fname" ? "Enter First Name / Last Name" : filterData.searchType === "primaryMobile" ? "Enter Mobile" : filterData.searchType === "lead_Id" ? "Enter Lead ID" : ""}
                  size="default"
                  value={leadserchvalue}
                  maxLength={filterData.searchType === "primaryMobile" ? 14 : filterData.searchType === "lead_Id" ? 100 : undefined}
                  onKeyPress={(e) => {
                    if (filterData.searchType === "primaryMobile" && !/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    if (filterData.searchType === "primaryMobile") {
                      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 14);
                    }
                    // else if (filterData.searchType === 'lead_Id') {
                    //   e.target.value = e.target.value.replace(/\D/g, "").slice(0, 100);
                    // }
                    handleNameSearch(e);
                  }}
                  style={{
                    width: "93%",
                    margin: "-10px 15px",
                    borderBottom: "1px gray solid",
                  }}
                  bordered={false}
                />
              </Col>
            </Row>
          </div>

          <div style={{ width: "auto", height: "11rem", backgroundColor: "white" }}>
            <h6
              style={{
                fontWeight: "bold",
                padding: "10px",
                fontSize: "13px",
                marginLeft: 5,
              }}
            >
              Filter by
            </h6>
            <Row>
              <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                <div className="filterby">
                  <h6>Lead Status</h6>
                  <Select
                    //defaultValue="Select"
                    placeholder="Select"
                    style={{
                      width: "100%",
                      borderBottom: "1px gray solid",
                      // opacity: "0.5",
                    }}
                    onChange={handelLeadStatus}
                    options={otp_type?.map((otp_data) => ({
                      label: otp_data.label,
                      value: otp_data.value,
                    }))}
                    getPopupContainer={(trigger) => trigger.parentElement}
                    bordered={false}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                <div className="filterby">
                  <h6>Lead Type</h6>
                  <Select
                    defaultValue="Select"
                    style={{
                      width: "100%",
                      borderBottom: "1px gray solid",
                      // opacity: "0.5",
                    }}
                    onChange={handleChange}
                    options={lead_type?.map((lead) => ({
                      label: lead.label,
                      value: lead.value,
                    }))}
                    bordered={false}
                    getPopupContainer={(trigger) => trigger.parentElement}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                <div className="filterby">
                  <h6>Lead Progress</h6>
                  <Select
                    defaultValue="Select"
                    style={{
                      width: "100%",
                      borderBottom: "1px gray solid",
                      // opacity: "0.5",
                    }}
                    onChange={handleLeadStatusChange}
                    options={leadStatus?.map((lead_data) => ({
                      label: lead_data.label,
                      value: lead_data.value,
                    }))}
                    bordered={false}
                    getPopupContainer={(trigger) => trigger.parentElement}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                {filterData.leadStatus === "nocontact" ? (
                  <div className="filterby">
                    <h6>Lead Disposition</h6>
                    <Select
                      defaultValue="select"
                      style={{
                        width: "100%",
                        borderBottom: "1px gray solid",
                        // opacity: "0.5",
                      }}
                      onChange={handleLeadDispositionChange}
                      options={leadDisposition?.map((lead_di) => ({
                        label: lead_di.label,
                        value: lead_di.value,
                      }))}
                      bordered={false}
                      getPopupContainer={(trigger) => trigger.parentElement}
                    />
                  </div>
                ) : (
                  ""
                )}

                {filterData.leadType === "Sales" && filterData.leadStatus === "contact" ? (
                  <div className="filterby">
                    <h6>Lead Disposition</h6>
                    <Select
                      defaultValue="select"
                      style={{
                        width: "100%",
                        borderBottom: "1px gray solid",
                        // opacity: "0.5",
                      }}
                      onChange={handleLeadDispositionChange}
                      options={lead_Disposition_contact?.map((lead_di) => ({
                        label: lead_di.label,
                        value: lead_di.value,
                      }))}
                      getPopupContainer={(trigger) => trigger.parentElement}
                      bordered={false}
                    />
                  </div>
                ) : (
                  ""
                )}

                {(filterData.leadType === "LA Recruitment" || filterData.leadType === "OP Recruitment") && filterData.leadStatus === "contact" ? (
                  <div className="filterby">
                    <h6>Lead Disposition</h6>
                    <Select
                      defaultValue="select"
                      style={{
                        width: "100%",
                        borderBottom: "1px gray solid",
                        // opacity: "0.5",
                      }}
                      onChange={handleLeadDispositionChange}
                      options={leadDispositionOptionContactLa?.map((lead_di_LA) => ({
                        label: lead_di_LA.label,
                        value: lead_di_LA.value,
                      }))}
                      bordered={false}
                      getPopupContainer={(trigger) => trigger.parentElement}
                    />
                  </div>
                ) : (
                  ""
                )}
              </Col>
              {/* <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                {leadStatus === 'new_lead' ? null : <div className="filterby">
                <h6>Lead Sub Disposition</h6>
                <Select
                            defaultValue="Select"
                            onChange={handleLeadSubDispositionChange}
                            options={lead_sub_dis}
                            style={{width: '100%'}}
                        />
              </div>
              }

              </Col> */}
            </Row>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  marginTop: "15px",
                  width: "6rem",
                  backgroundColor: "#1D428A",
                  color: "#fff",
                  marginBottom: "10px",
                }}
                onClick={handleApplyButton}
              >
                Apply
              </Button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function GlobalFilters(props) {
  return (
    <>
      <OffCanvasForGlobalFilter key={"0"} filterdata={props} />
    </>
  );
}

export default GlobalFilters;
