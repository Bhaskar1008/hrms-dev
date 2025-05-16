import React, { useState, useEffect } from "react";
import "./PolicyHolder.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Radio, message } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import FilterPage from "../PolicyHolderFilter/FilterPage";
import VehicalInformationPage1 from "../VehicalInformation/VehicalInformationPage1";
import StepOne from "../../StepBar/StepOne/StepOne";
// import AllFormFooter from "../../AllFormFooter/AllFormFooter";
import * as actions from "../../../../store/actions";
import axiosRequest from "../../../../axios-request/request.methods";

const PolicyHolder1 = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const [size, setSize] = useState("default"); // default is 'middle'
  const [value1, setValue1] = useState("no");

  useEffect(() => {
    dispatch(actions.fetchAllVehicleCategory());

    dispatch(actions.fetchModelSuccess({}))
    dispatch(actions.fetchVehicleTypeSuccess({}))
    dispatch(actions.fetchModelYearSuccess({}))
    dispatch(actions.fetchSubModelSuccess({}))
    dispatch(actions.fetchTypeOfUseSuccess({}))
    dispatch(actions.fetchPolicyTermSuccess({}))
    dispatch(actions.fetchSublineSuccess({}))
    
  }, [dispatch]);

  const onChangetoDashboard = () => {
    dispatch(actions.resetFormData({}));
    history.push("/iCare-Dashboard");
  };
  const onChange1 = (e) => {
    dispatch(actions.vehicalinformationHandler({}));
    setValue1(e.target.value);
  };
  // function
  const backButtonFunction = () => {
    setValue1("no");
  };

  return (
    <>
      <div className="main-class">
        <Row gutter={16} className="policy-header">
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <div>
              <Button
                className="dashboard-button"
                icon={<ArrowLeftOutlined />}
                size={size}
                onClick={onChangetoDashboard}
              >
                {" "}
                Back to Dashboard{" "}
              </Button>
            </div>
            <div className="stepDiv">

              <StepOne />
            </div>
          </Col>
          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <div>
              
              {/* <div className="questionDiv">
                <ul>
                  <li>
                    <h3>Is from previous policyholder?</h3>
                    <Radio.Group onChange={onChange1} value={value1}>
                      <Radio className="radioValue" value="yes">
                        Yes
                      </Radio>
                      <Radio className="radioValue" value="no">
                        No
                      </Radio>
                    </Radio.Group>
                  </li>
                </ul>
              </div> */}
              {value1 === "no" ? (
                <>
                  <VehicalInformationPage1 data={backButtonFunction} />
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
      {value1 === "no" ? (
        <>
          {/* <AllFormFooter /> */}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default PolicyHolder1;
