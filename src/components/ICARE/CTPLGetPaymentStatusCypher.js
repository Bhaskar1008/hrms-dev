import React, { useState, useEffect } from 'react'
import './GetPaymentStatus.css'
import paymetImg from '../../images/payment_img.jpg'
import axiosRequest from "../../axios-request/request.methods";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import apiConfig from '../../config/api.config';
import { message } from 'antd'

const MotorGetPaymentStatusCypher = () => {
  const { baseURL } = apiConfig

  const history = useHistory();
  const windowsLocation = window.location.href;
  var cypherLinkSplit = windowsLocation?.split("ctpl-payment-return-url-cyphyer/")

  var finalCypherSplit = cypherLinkSplit[1]?.split("?")
  let finalCypher = finalCypherSplit[0]

  const queryString = window.location.search;

  var params = new URLSearchParams(queryString);
  // var requestId = params.get("requestid");
  // var responseId = params.get("responseid");
  var Policy_Number = params.get("Policy_Number");
  // var responseId = params.get("responseid");

  console.log("Policy_Number----------->", Policy_Number);

  const getLeadDetails = async (Policy_Number) => {
    try {

      const axios = require('axios');
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${baseURL}cipherSecure/payment/status?policyNumber=${Policy_Number}`,
        headers: { 'ciphertext': finalCypher },
      };

      axios.request(config)
        .then((response) => {
          console.log("response-----ctpl", response);
          if (response?.data?.statusCode === -1) {
            if (response?.data?.data?.data?.body?.responseCode === "MA001") {
              // history.push("/travel-payment-success")
              message.success(response?.data?.data?.data?.message)
              if (response?.data?.data?.data?.isCocafAuthenticated === false && response?.data?.data?.data?.isCocafRequired === true) {
                history.push({
                  pathname: "/ctpl-coca",
                  state: {
                    data: response?.data?.data?.data,
                    cypher: finalCypher
                  }
                })
              } else {
                history.push({
                  pathname: "/ctpl-payment-success-cypher",
                  state: {
                    data: response?.data?.data?.data,
                    cypher: finalCypher
                  }
                })
              }

            }else {
              // history.push("/travel-payment-failed")
              message.error(response?.data?.data?.data?.message ? response?.data?.data?.data?.message : response?.data?.data?.message)
              history.push({
                pathname: "/ctpl-payment-failed-cypher",
                state: {
                  data: response?.data?.data?.data ? response?.data?.data?.data : response?.data?.data?.policyData,
                  cypher: finalCypher
                }
              })
            }
          }else {
            // history.push("/travel-payment-failed")
            message.error(response?.data?.data?.data?.message ? response?.data?.data?.data?.message : response?.data?.data?.message)
            history.push({
              pathname: "/ctpl-payment-failed-cypher",
              state: {
                data: response?.data?.data?.data ? response?.data?.data?.data : response?.data?.data?.policyData,
                cypher: finalCypher
              }
            })
          } 
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLeadDetails(Policy_Number)
  }, [])

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
  )
}

export default MotorGetPaymentStatusCypher