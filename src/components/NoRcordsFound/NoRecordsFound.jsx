import { Row, Col } from "antd";
import "../History/History.css";
import "../StatusLead/StatusLead.css";
// import '../LeadDetails/LeadDetailsTab.css';
import "../LeadDetails/LeadDetails/LeadDetailsTab.css";

const NoRecordsFound = () => {

return (
    <>
      <div className="form-container">
        <Row>
        <Col
            xs={24}
            sm={24}
            md={4}
            lg={4}
            xl={4}
          >
        </Col>
          <Col
            className="form-body m0a"
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
            style={{marginTop: "2rem", marginBottom: '2rem'}}
          >
            <div className="proposal">
              <div className="bg-norecord"></div>
              <p className="norecord-title">No Records Found</p>
            </div>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={4}
            lg={4}
            xl={4}
          >
        </Col>
        </Row>
      </div>
    </>
  );
};

export default NoRecordsFound;
