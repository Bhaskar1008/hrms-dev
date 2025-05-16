import React,{ useState, useEffect } from 'react'
import { Row, Col, Button, Radio, message } from "antd";
import "./ShareableLinkProfile.css";
import ShareableLinkProfileComponent from "../../../../../components/ICARE/CTPL/VehicalInformation/ShareableLinkPofileComponent";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import FilterPage from "../../../../../../src/components/ICARE/CTPL/PolicyHolderFilter/FilterPage";

const ShareableLinkProfile = () => {
  const [size, setSize] = useState("default"); // default is 'middle'
  const [value1, setValue1] = useState("no");

  return (
   <>
    <div className="main-classShareable">
        <Row gutter={16} className="policy-header">
          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <div>
              {value1 === "no" ? (
                <>
                  <ShareableLinkProfileComponent />
                </>
              ) : (
                <>
                  <FilterPage />
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
   </>
  )
}

export default ShareableLinkProfile