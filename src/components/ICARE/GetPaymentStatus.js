import React, { useState, useEffect } from "react";
import "./GetPaymentStatus.css";
import paymetImg from "../../images/payment_img.jpg";
import axiosRequest from "../../axios-request/request.methods";
import { useHistory, useParams } from "react-router-dom";

const GetPaymentStatus = () => {
  const history = useHistory();
  const queryString = window.location.search;
  // var params = new (queryString);
  console.log("params----", queryString);
  var params = new URLSearchParams(queryString);
  var Policy_Number = params.get("Policy_Number");
  // var responseId = params.get("responseid");

  console.log("Policy_Number----------->", Policy_Number);
  // var requestId = params.get("requestid");
  // var responseId = params.get("responseid");

  const getLeadDetails = async (Policy_Number) => {
    try {
      let result = await axiosRequest.get(
        `user/payment/status?policyNumber=${Policy_Number}`,
        {
          secure: true,
        }
      );
      console.log("result----------------------", result);
      if (result?.statusCode === -1) {
        if (result?.data?.data?.body?.responseCode === "MA001") {
          if (result?.data?.data?.isCocafAuthenticated === false && result?.data?.data?.isCocafRequired === true) {
            // history.push("/ctpl-coca");
            // isCocafAuthenticated
            history.push({
              pathname: "/ctpl-coca",
              state: {
                data: result?.data?.data,
              },
            });
          } else {
            history.push({
              pathname: "/CTPL-payment-success",
              state: {
                data: result?.data?.data,
              },
            });
          }

        } else {
          history.push({
            pathname: "/CTPL-payment-failed",
            state: {
              data: result?.data?.data ? result?.data?.data : result?.data?.policyData,
            },
          });
        }
      } else {
        history.push({
          pathname: "/CTPL-payment-failed",
          state: {
            data: result?.data?.data ? result?.data?.data : result?.data?.policyData,
          },
        });
      }
    } catch (err) {
      console.log(err);
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

export default GetPaymentStatus;
