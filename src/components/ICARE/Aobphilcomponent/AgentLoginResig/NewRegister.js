import React, { useEffect, useState, createRef, useRef } from "react";
import "./AgentLogin.css";
import {
  Card,
  Button,
  message,
  Modal,
  Row,
  Col,
  Checkbox,
  List,
} from "antd";
import {
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";
import LoginHeader from "../../../ICARE/LoginHeader/LoginHeader";

const NewRegister = () => {
    const [openModalPopConfirm, setOpenModalPopConfirm] = useState(false);
    const [accept, setAccept] = useState(false);
    const history=useHistory()
    const visibleModalPopConfirm = () => {
        setOpenModalPopConfirm(true);
    };
  
      const cancelIsregistration = async () =>{
        history.push('/login')
        }

    const onclickRegisterPage = () =>{
          history.push({
            pathname: '/agent-form', // Specify the destination route
          })
      }
      const hideModalPopConfirm = () => {
        setOpenModalPopConfirm(false);
      };
      const onCancelPopUpConfirm = () => {
        hideModalPopConfirm();
      };
      const onOkPopUpConfirm = () => {
        setAccept(true);
        hideModalPopConfirm();
      };
      

  return (
    <>
    <LoginHeader />
    <div className="agent_login_wrapper">
        <div className="agent_login reg_new">
        <Row gutter={[16,16]}>
        <Col xs={24} sm={24} md={8} lg={8}></Col>
            <Col xs={24} sm={24} md={8} lg={8} className="agent_login_logo">
            <Card
                      className="welcome_onboarding"
                      borderRadius={8}
                      headStyle={{ textAlign: "center" }}
                      bordered={false}
                    >
                      <div className="welcome_onboraing_registration">
                        <div className="text-center login_logo">
                          {/* <img
                            src={logobar}
                            alt="Ios install Logo"
                            //   style={{ height: 32, width: 32, marginBottom: 8 }}
                          /> */}
                        </div>
                        <div className="login_header_text mb-3">
                          <div className="welcome">Welcome!</div>
                          <div className="otp_description">
                            Before we begin the registration process, please
                            take a moment to review document checklist below and
                            ensure that you have the necessary documents ready
                            as you will need them throughout the process.
                          </div>
                        </div>
                        <div className="checklist_for_resigter">
                          Checklist for Registration <br />
                          <span className="png_jpeg">
                            ( .PNG or .JPG format )
                          </span>
                        </div>
                        <ul className="list-inline">
                          <li className="d-flex gap-2">
                            <CheckOutlined />
                            Download BPI account opening form
                          </li>
                          <li className="d-flex gap-2">
                            <CheckOutlined />
                            Clear scanned copy of SSS ID and TIN ID
                          </li>
                          <li className="d-flex gap-2">
                            <CheckOutlined />
                            Evidence of Payment license fee, Proof of bank
                            account number ownership and 2*2 size Photo
                          </li>
                          <li className="d-flex gap-2">
                            <CheckOutlined />
                            CA Form (Application for insurance agent’s license),
                            Clear copy of exam result from IC or Clearance from
                            other company
                          </li>
                        </ul>
                        <Checkbox
                          checked={accept}
                          onChange={visibleModalPopConfirm}
                          className="data_checked"
                        >
                          Data Privacy Consent
                        </Checkbox>

                    <div className="button_group">
                    <Button
                          block
                          size="large"
                          htmlType="cancel"
                          onClick={cancelIsregistration}
                          className="cancel_btn"
                        >
                          Cancel
                        </Button>

                    <Button
                          type="primary"
                          block
                          size="large"
                          htmlType="submit"
                          className={`${
                            accept === false
                              ? "registerbtndisabled"
                              : "registerbtn"
                          }`}
                          disabled={!accept}
                          onClick={onclickRegisterPage}
                        >
                          Register
                        </Button>
                        
                    </div>
                        
                      </div>
                    </Card>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8}></Col>
        </Row>

        {/* popconfirm modal start */}
        <Modal
          className="register_pop_conf_modal"
          centered
          open={openModalPopConfirm}
          // width={450}
          style={{
            top: 0,
          }}
          onCancel={onCancelPopUpConfirm}
          footer={null}
          closable={false}
        >
          <div className="modal_header d-flex justify-content-between align-items-center">
            <div className="header_title">Data Privacy Consent</div>
            <div>
              <CloseOutlined
                style={{ fontSize: "16px" }}
                onClick={onCancelPopUpConfirm}
              />
            </div>
          </div>
          <div className="modal_content mb-3">
            By signing this Licensed Agent’s Profile Sheet, I consent to the
            collection, generation, use, processing, storage, and retention of
            my personal data by Phillife Financial. I also authorize Phillife Financial
            to disclose my information to third parties for the following
            circumstances:<br /> a) As necessary for the proper execution of process
            related to the company; <br /> b) The use or disclosure is reasonably
            necessary, required, or authorized under law. This is in accordance
            with the provisions of the Data Privacy Act of 2012 and its
            implementing Rules and Regulations, including the circulars and
            memorandum orders by the National Privacy Commission. I understand
            that my application for a Licensed Agent Code to sell Phillife Financial
            will only be processed upon submission of complete licensing
            requirements as indicated in Annex A By signing this Licensed
            Agent’s Profile Sheet, I consent to the collection, generation, use,
            processing, storage, and retention of my personal data by Phillife Financial. I also authorize Phillife Financial to disclose my
            information to third parties for the following circumstances: a) As
            necessary for the proper execution of process related to the
            company; b) The use or disclosure is reasonably necessary, required,
            or authorized under law. This is in accordance with the provisions
            of the Data Privacy Act of 2012 and its implementing Rules and
            Regulations, including the circulars and memorandum orders by the
            National Privacy Commission. I understand that my application for a
            Licensed Agent Code to sell Phillife Financial will only be processed
            upon submission of complete licensing requirements as indicated in
            Annex A.
          </div>
          <div
            className="button_accept_cancel d-flex gap-3"
            key="footer-buttons"
          >
            <Button
              onClick={onCancelPopUpConfirm}
              size="large"
              className="decline"
              block
              type="default"
            >
              Decline
            </Button>
            <Button
              onClick={onOkPopUpConfirm}
              size="large"
              className="accept"
              block
              type="default"
            >
              Accept
            </Button>
          </div>
        </Modal>

        {/* popconfirm modal end */}
        
        </div>
    </div>
                
    </>
  )
}

export default NewRegister