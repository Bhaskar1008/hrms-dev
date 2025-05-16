import { Button, Col, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import "./BulkUploadHistory.css";
import { Link } from "react-router-dom";
import axiosRequest from "../../../axios-request/request.methods";
import FullPageLoader from "../../FullPageLoader/FullPageLoader";
import NoRecordsFound from "../../NoRcordsFound/NoRecordsFound";
import { useHistory } from "react-router";
const BulkUploadHistory = () => {
  const history = useHistory();
  const [openloader, setOpenloader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [countOfTable, setCountOfTable] = useState(0);
  const [loader, setLoader] = useState(false);

  const columns = [
    {
      title: "Request Number",
      dataIndex: "requestNumber",
      key: "requestNumber",
    },
    {
      title: "Request Date Created",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Request Time Created",
      dataIndex: "request_time_creates",
      key: "request_time_creates",
      render: (text) => {
        if (text) {
          const [time] = text.split(" ");
          return <span>{time}</span>;
        } else {
          return null;
        }
      },
    },
    {
      title: "Errors",
      dataIndex: "errors",
      key: "errors",
    },
    {
      title: "Actions",
      dataIndex: "indexFileId", // Assuming "indexFileId" is the correct property name
      key: "indexFileId",
      width: 100,
      render: (indexFileId) => (
        <Space className="request_record_view_btn">
          <Link to={`/bulk-history-details/${indexFileId}`}>VIEW</Link>
        </Space>
      ),
    },
  ];


  useEffect(() => {
    getTableDataForBulkUpload(currentPage);
  }, [currentPage]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    // getTableDataForBulkUpload(pagination.current);
    setCurrentPage(pagination.current);
  };

  const getTableDataForBulkUpload = async (currentPage) => {
    console.log("loader started--->");
    setLoader(true);
    let Response = await axiosRequest.get(
      `bulk-upload/get-index?limit=10&page=${currentPage}`
    );
    // console.log("Data=====>>>", Response);
    if (Response?.statusCode === -1) {
      setLoader(false);
      const count = Response?.data[1][0].count;
      setCountOfTable(count);
      const tableDataNew = Response?.data[0].map((item) => {
        var requestNumber = item?.requestNumber;
        console.log("ee---", item?.indexFileId);
        const createdAt = new Date(item.createdAt);
        return {
          ...item,
          date: createdAt.toLocaleDateString(),
          request_time_creates: createdAt.toLocaleTimeString(),
        };
      });

      console.log("Data=====>>>", tableDataNew);
      setTableData(tableDataNew);
    } else {
      setLoader(false);
    }
    // console.log("Get Pyment Methods",Response)getTableDataAfterView
  };

  const onClickBack = () => {
    history.push("/quotationsPoliciesMaster/Quotation");
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
      <FullPageLoader fromapploader={loader} />

      <div className="bulkupload_inssuance_history pt-4">
        <Row className="m-0" gutter={[16, { xs: 16, sm: 16, md: 16, lg: 16 }]}>
          <Col className="m-auto" xs={24} ms={24} md={22} lg={24} xl={20}>
            <div className="bulk_issuance_wrapper">
              <p className="bulk_issuance_history_header">
                Bulk Issuance History
              </p>
              <div className="bulk_issuance_sub_header">
                List of Bulk Issuances
              </div>
              {countOfTable > 0 ? (
                <Table
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
            <Button className="back-button" onClick={onClickBack}>
              Back
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BulkUploadHistory;
