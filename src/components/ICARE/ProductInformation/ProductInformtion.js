import React from "react";
import { Link, useHistory, useLocationistory } from "react-router-dom";
import "./ProductInformation.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../store/actions";
import { FaPlane } from "react-icons/fa"

import img1 from "../../../assets/ihc_icon/indiv.png";
import img2 from "../../../assets/ihc_icon/family.png";
import img3 from "../../../assets/ihc_icon/renew.png";
import img4 from "../../../assets/ihc_icon/more.png";
import flag_icon from "../../../images/Icon/flag-icon.svg";
import { setPolicyResetdInfo } from "../../../store/actions/travel";

const ProductInformtion = () => {
  //  const location = useLocation()
  const history = useHistory();
  const dispatch = useDispatch();

  const resetHyperData = () => {
    dispatch(actions.hypervergeMotorData({}));
    dispatch(actions.hypervergeCTPLData({}));
    dispatch(actions.hypervergeTravelData({}));
  };
  const onChangetoMotor = () => {
    dispatch(actions.currentLobData("MOTOR"));
    resetHyperData();
    dispatch(actions.resetMotorFormData({}));
    dispatch(actions.fetchGroupPolicySuccess({}));
    // dispatch(actions.fetchAllMotorProductTier(null));
    dispatch(actions.setChangeCheckboxState({}));
    history.push("/motor-info");
  };

  const onChangetoctpl = () => {
    dispatch(actions.currentLobData("CTPL"));
    resetHyperData();
    dispatch(actions.uploadVehicleCertificate([]));
    dispatch(actions.uploadVehicleCertificate([]));
    dispatch(actions.uploadPhotoId([]));
    dispatch(actions.uploadSign([]));
    dispatch(actions.fetchGroupPolicySuccess({}));
    dispatch(actions.resetFormData({}));
    history.push("/policy-detail");
  };
  const TravelPage = () => {
    dispatch(actions.currentLobData("TRAVEL"));
    resetHyperData();
    dispatch(setPolicyResetdInfo({}));
    dispatch(actions.fetchGroupPolicySuccess({}));
    history.push("/quote-code");
  };

  const IconButton = ({ icon, backgroundColor }) => {
    return (
      <div style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {icon}
      </div>
    );
  };

  const morehandel = () => {
    history.push("/all-products");
  };
  return (
    <>
      <div className="products-main">
        <h3>Select a product</h3>
        <div className="div10">
          <div className="product-type-big-button" onClick={onChangetoctpl}>
            <div className="product-icons">
              <img className="image-54-icon" alt="" src={img1} />

              <div className="ctpl">INDIVIDUAL PLAN</div>
            </div>
          </div>
          <div
            className="product-type-big-button1"
            // onClick={() => }
            onClick={onChangetoMotor}
          >
            <div className="product-icons">
              <img className="image-54-icon" alt="" src={img2} />

              <div className="ctpl">FAMILY PLAN</div>
            </div>
          </div>
          <div className="product-type-big-button2" onClick={TravelPage}>
            <div className="product-icons">
              <img className="image-54-icon" alt="" src={img3} />
              {/* <IconButton icon={<FaPlane style={{ fontSize: "20px", color: "#FFFFFF" }} />} backgroundColor="#4A5F98" /> */}

              <div className="ctpl">PREMIUM PLAN</div>
            </div>
            {/* <div className="covid-banner1">
              <div className="taglabel1">Covid Coverage</div>
              <img className="flag-icon1" alt="" src={flag_icon} />
            </div> */}
          </div>
          <div className="product-type-big-button3" onClick={morehandel}>
            <div className="product-icons3">
              <img className="image-54-icon" alt="" src={img4} />

              <div className="ctpl">more</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInformtion;
