import React, { useState } from "react";
import "./QuickQuoteInfo.css";
import { useHistory } from "react-router-dom";
import { Row, Col, Modal } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import StepTwo from "../../MotorComprehensive/components/StepBar/StepThree/StepThree";
import FormalQuoteInfo from "../FormalQuoteInfo/FormalQuoteInfo";
export default function QuickQuoteInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsSubmitted, setIsDetailsSubmitted] = useState(false);
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const history = useHistory();
  const onChangetoDashboard = () => {
    history.push("/quotation-policy-tabs");
  };
  const onClickYes = () => {
    history.push("/success-quickpolicy");
  };
  const onModalYesClick = () => {
    setIsDetailsSubmitted(true);
    setIsModalOpen(false);
  };
  

  return (
    <>
      <div className="parent-element">
        <div className="left-side">
          <Button type="dashed" onClick={onChangetoDashboard} className="dashbtn">
            <ArrowLeftOutlined />
            Back to Home
          </Button>
          <StepTwo />
        </div>
        <div className="right-side">
          <div className="right-container">
            <h2 className="heading1">
              {isDetailsSubmitted ? (
                <> Policy Code: QP123456789 </>
              ) : (
                "One last look! Did we get everything right?"
              )}
            </h2>
            <div className="travel-info">
              <h2 className="travel-heading">Policy Holder Information</h2>
              <div className="data-container">
                <Row className="row-bottom-margin">
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Document Type</div>
                      <div className="subheading">Type</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Document Code</div>
                      <div className="subheading">code</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">First Name</div>
                      <div className="subheading">First Name</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Middle Name</div>
                      <div className="subheading">Middle Name</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Last Name</div>
                      <div className="subheading">Last Name</div>
                    </div>
                  </Col>
                </Row>

                <Row className="row-bottom-margin">
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Birthdate</div>
                      <div className="subheading">MM/DD/YYYY</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Suffix</div>
                      <div className="subheading">suffix</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Gender</div>
                      <div className="subheading">Gender</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Place of Birth</div>
                      <div className="subheading">Place of Birth</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Citizenship</div>
                      <div className="subheading">Filipino</div>
                    </div>
                  </Col>
                </Row>

                <Row className="row-bottom-margin">
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Mobile Number</div>
                      <div className="subheading">Mobile Number</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Email Address</div>
                      <div className="subheading">Email Address</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Province</div>
                      <div className="subheading">Province</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">City</div>
                      <div className="subheading">city</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Zip Code</div>
                      <div className="subheading">Zip Code</div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Address Line 1</div>
                      <div className="subheading">Line 1</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Address Line 2</div>
                      <div className="subheading">Line 2</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="travel-info">
              <h2 className="travel-heading">Travel Information</h2>
              <div className="data-container">
                <Row className="traveler">
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Country to Visit</div>
                      <div className="subheading">Philippines</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Travel Package</div>
                      <div className="subheading">private</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Currency</div>
                      <div className="subheading">PHP</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Medical Package</div>
                      <div className="subheading">Private</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Arrival Date</div>
                      <div className="subheading">August 1</div>
                    </div>
                  </Col>
                </Row>

                <Row className="traveler">
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Departure Date</div>
                      <div className="subheading">August 3</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Trip Duration</div>
                      <div className="subheading">3 days</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">One Way Trip</div>
                      <div className="subheading">No</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Purpose of Trip</div>
                      <div className="subheading">other</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Specify</div>
                      <div className="subheading">Reason</div>
                    </div>
                  </Col>
                </Row>

                <Row className="traveler">
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Hazardous Sports</div>
                      <div className="subheading">Yes</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Sports Equipment</div>
                      <div className="subheading">Yes</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Cruise</div>
                      <div className="subheading">Yes</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">COVID-19 Coverage</div>
                      <div className="subheading">Yes</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Coverage</div>
                      <div className="subheading">Individual</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="travel-info">
              <h2 className="travel-heading">
                Additional Traveler Information
              </h2>
              <div className="data-container">
                <h6 className="travelerNo">Traveler 1</h6>
                <Row className="traveler">
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Complete Name</div>
                      <div className="subheading">Alden A Tiranda</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Email Address</div>
                      <div className="subheading">alden@gmail.com</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Contact Number</div>
                      <div className="subheading">09181230190</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Physician’s Name & Number</div>
                      <div className="subheading">Dr. Atom 09181230190</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Policy Holder</div>
                      <div className="subheading">Yes</div>
                    </div>
                  </Col>
                </Row>
                <h6 className="travelerNo">Traveler 2</h6>
                <Row className="traveler">
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Complete Name</div>
                      <div className="subheading">Alden A Tiranda</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Email Address</div>
                      <div className="subheading">alden@gmail.com</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Contact Number</div>
                      <div className="subheading">09181230190</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Relationship</div>
                      <div className="subheading">Spouse</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Physician’s Name & Number</div>
                      <div className="subheading">Dr. Atom 09181230190</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div>
              <h6 className="travel-heading ">Product </h6>
            </div>
            <div>
              <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                <Button className="travel">Travel Basic</Button>
              </Col>
            </div>
            <div className="btn">
              <div className="btn">
                <Button className="prev-btn">Edit Quote</Button>
                <Button className="nextbutton" onClick={showModal}>
                  Buy Policy
                  <ArrowRightOutlined />
                </Button>
                <Modal
                  className="modal-footer-content"
                  title=""
                  visible={isModalOpen}
                >
                  <div className="modal-title row-bottom-margin">
                    <h6>You will now issue this policy</h6>
                  </div>
                  <div className="modal-title2  row-bottom-margin">
                  Are you sure the details you have placed are correct? 
                  </div>
                  <div className="btn-popup">
                    <Button className="prev-btn">No, back to form</Button>
                    <Button className="nextbutton" onClick={onClickYes }>
                      Yes <ArrowRightOutlined />
                    </Button>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
