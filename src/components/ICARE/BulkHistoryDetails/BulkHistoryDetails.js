import { Button, Col, Pagination, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import "./BulkHistoryDetails.css";
import { AiOutlineFileExcel } from "react-icons/ai";
import apiConfig from "../../../config/api.config";
import axiosRequest from "../../../axios-request/request.methods";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import FullPageLoader from "../../FullPageLoader/FullPageLoader";
import NoRecordsFound from "../../NoRcordsFound/NoRecordsFound";
const { baseURL } = apiConfig;

const BulkHistoryDetails = () => {
  const [loader, setLoader] = useState(false);

  const [countOfTable, setCountOfTable] = useState(0);
  const [requestNumberDisplay, setRequestNumberDisplay] = useState("");

  const viewDetails = (record) => {
    setLoader(true);
    const { requestNumber, policyNumber, quotationNumber } = record;
    let redirectTo = "/"; // Default redirection
    // Check the requestNumber to determine the redirection URL
    if (requestNumber && requestNumber.startsWith("CTPL")) {
      setLoader(false);
      if (quotationNumber !== "-" && policyNumber !== "-") {
        redirectTo = "/all-ctpl-policy-details";
      } else {
        redirectTo = "/all-ctpl-details";
      }
    } else if (requestNumber && requestNumber.startsWith("Travel")) {
      setLoader(false);
      if (quotationNumber !== "-" && policyNumber !== "-") {
        redirectTo = "/all-travel-policy-details";
      } else {
        redirectTo = "/all-travel-details";
      }
    } else {
      setLoader(false);
      if (quotationNumber !== "-" && policyNumber !== "-") {
        redirectTo = "/all-motor-policy-details";
      } else {
        redirectTo = "/all-motor-details";
      }
    }

    history.push({
      pathname: redirectTo,
      state: { data: record, bulkUpload_id },
    });
  };
  const columns = [
    {
      title: "Quotation Number",
      dataIndex: "policyNumber",
      key: "policyNumber",
      render: (text, record) => `${record.quotationNumber}`,
    },
    {
      title: "Policy Number",
      dataIndex: "QuotationNumber",
      key: "QuotationNumber",
      render: (text, record) => `${record.policyNumber}`,
    },
    {
      title: "Record Row Number",
      dataIndex: "rowNumber",
      key: "rowNumber",
    },
    {
      title: "Policy Holder’s Name",
      dataIndex: "policyHolderName",
      key: "policyHolderName",
    },
    {
      title: "Status of Policy",
      dataIndex: "statusOfPolicy",
      key: "statusOfPolicy",
    },
    {
      title: "Status of Quotations",
      dataIndex: "statusOfQuotation",
      key: "statusOfQuotation",
    },
    {
      title: "Errors Message",
      dataIndex: "errorMessage",
      key: "errorMessage",
      render: (text) => (

        <span
          // style={{
          //   color:
          //     text.includes("Invalid Email ID") ||
          //       text.includes("Invalid Mobile Number")
          //       ? "#F85353"
          //       : "inherit",
          // }}
          style={{
            color: "red"
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.quotationNumber === "-" && record.policyNumber === "-" ? (
            <div className="view_details disabled" style={{ color: "gray" }}>
              VIEW DETAILS
            </div>
          ) : (
            <div className="view_details" onClick={() => viewDetails(record)}>
              View Details
            </div>
          )}
        </Space>
      ),
    },
  ];

  const { id } = useParams();
  const history = useHistory();
  const queryString = window.location.href;
  var params = queryString.split("bulk-history-details/");
  var bulkUpload_id = params[1];
  console.log("queryString", bulkUpload_id);

  console.log("params id", id);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getTableDataAfterView(currentPage, bulkUpload_id);
  }, [currentPage, bulkUpload_id]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    setCurrentPage(pagination.current);
  };

  const customPaginationText = {
    prevText: "Prev",
    nextText: "Next",
  };

  const onClickBack = () => {
    history.push("/bulk-issuance-history");
  };

  const getTableDataAfterView = async (currentPage, bulkUpload_id) => {
    console.log("loaderstated");
    setLoader(true);
    let Response = await axiosRequest.get(
      `bulk-upload/get-details?limit=10&page=${currentPage}&id=${bulkUpload_id}`
    );
    console.log("Data=====>>>", Response);
    if (Response?.statusCode === -1) {
      setLoader(false);
      const count = Response?.data[1][0].count;
      setCountOfTable(count);
      const tableView = Response?.data[0].map((e) => {
        return e;
      });
      const requestNumbers = tableView.map((item) => {
        return item.requestNumber.split("-")[0];
      });
      console.log("All Request Numbers:", requestNumbers);
      setTableData(tableView);
    } else {
      setLoader(false);
    }
    // console.log("Get Pyment Methods",Response)
  };

  const downloadExcelFile = async () => {
    var bulkId = bulkUpload_id;
    let response = await fetch(
      `https://oonanode-dev.salesdrive.app/sdx-api/auth/bulk-upload/get-report?id=${bulkId}`
    );
    let responseData = await response.blob();
    const url = window.URL.createObjectURL(new Blob([responseData]));
    console.log(url, "hello I am downloading a file", response);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${bulkId}.xlsx`);
    document.body.appendChild(link);
    link.click();
  };

  const itemRender = (current, type, originalElement) => {
    const commonStyle = {
      color: "#1D428A",
      fontSize: "18px",
      fontWeight: "600",
    };
    const paginationBox = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: currentPage === current ? "#1D428A" : null,
    };

    if (type === "prev") {
      return <span style={commonStyle}>Prev</span>;
    }
    if (type === "next") {
      return <span style={commonStyle}>Next</span>;
    }
    if (type === "page") {
      const pageStyle = {
        ...paginationBox,
        color: currentPage === current ? "#fff" : "#1D428A",
      };
      return <span style={pageStyle}>{current}</span>;
    }

    return originalElement;
  };

  return (
    <>
      <FullPageLoader spinloader={loader} />
      <Row gutter={[16, { xs: 16, sm: 10, md: 16, lg: 16 }]} className="m-0">
        <Col className="m-auto" xs={24} sm={24} md={24} lg={22} xl={22}>
          <div className="wrapper-history">
            <div className="details-of-request">
              Details of Request Number {requestNumberDisplay}
              <div>
                <Button className="download-error" onClick={downloadExcelFile}>
                  <AiOutlineFileExcel style={{ fontSize: "20px" }} />
                  Download Error
                </Button>
              </div>
            </div>
            {countOfTable > 0 ? (
              <Table
                scroll={{ x: true }}
                className="history-table"
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
                pagination={
                  countOfTable > 10
                    ? {
                        current: currentPage,
                        pageSize: 10,
                        total: countOfTable,
                        itemRender: itemRender,
                        showSizeChanger: false,
                      }
                      : false
                  }
                />
              ) : (
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <NoRecordsFound />
                </Col>
              )}
            </div>
            <div className="backButton">
              <Button className="back-buttond" onClick={onClickBack}>
                Back
              </Button>
            </div>
        </Col>
      </Row>
    </>
  );
};

export default BulkHistoryDetails;
