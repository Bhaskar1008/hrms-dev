import React, { useState, useEffect } from "react";
import "./GetPaymentStatus.css";
import paymetImg from "../../images/payment_img.jpg";
import axiosRequest from "../../axios-request/request.methods";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { message} from 'antd'

const TravelGetPaymentStatus = () => {
  const history = useHistory();
  const queryString = window.location.search;
  var params = new URLSearchParams(queryString);
  // var requestId = params.get("requestid");
  // var responseId = params.get("responseid");
  var Policy_Number = params.get("Policy_Number");
  // var responseId = params.get("responseid");

  console.log("Policy_Number----------->", Policy_Number);

  const ALLdetails = useSelector((state) => state);
  let CTPLPolicy = ALLdetails?.trip;
  let policyNumber = CTPLPolicy?.travelPolicyQuotationData?.policyNumber;

  const getLeadDetails = async (Policy_Number) => {
    try {
      let result = await axiosRequest.get(
        `user/payment/status?policyNumber=${Policy_Number}`,
        {
          secure: true,
        }
      );

      console.log("Data====>>>", result);

      if (result?.statusCode === -1) {
        //MA004
        if (result?.data?.data?.body?.responseCode === "MA001") {
          if (result?.data?.data?.isCocafAuthenticated === false && result?.data?.data?.isCocafRequired === true) {
            // history.push("/travel-coca");
            history.push({
              pathname: "/travel-coca",
              state: {
                data: result?.data?.data,
              },
            });
          } else {
            history.push({
              pathname: "/travel-payment-success",
              state: {
                data: result?.data?.data,
              },
            });
          }
          // history.push("/travel-payment-success")

        } else {
          //  history.push("/travel-payment-failed")
          history.push({
            pathname: "/travel-payment-failed",
            state: {
              data: result?.data?.data ? result?.data?.data : result?.data?.policyData,
            },
          });
        }
      }else {
        //  history.push("/travel-payment-failed")
        history.push({
          pathname: "/travel-payment-failed",
          state: {
            data: result?.data?.data ? result?.data?.data : result?.data?.policyData, 
          },
        });
      }
    } catch (err) {
      if (err?.response?.data?.statusCode === 1) {
        message.error(err?.response?.data?.data);
      }
    }
  };

  useEffect(() => {
    getLeadDetails(Policy_Number);
  }, []);

  return (
    <>
      {/* GetPaymentStatus */}
      <div className="cardPayment">
        <img
          src={paymetImg}
          alt="Payment Image"
          className="cardPayment-image"
        />
        <div className="cardPayment-content">
          <h3>Payment Status</h3>
          <h5>Please Wait...</h5>
        </div>
      </div>
    </>
  );
};

export default TravelGetPaymentStatus;
