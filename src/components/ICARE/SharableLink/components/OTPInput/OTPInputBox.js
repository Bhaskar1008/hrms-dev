import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import apiConfig from "../../../../../config/api.config";
import rootIndex from "../../../../../store/root_index";
import { message } from "antd";
import FullPageLoader from "../../../../FullPageLoader/FullPageLoader";
import * as actions from "../../../../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";

import './OTPInputBox.css'; // Import the CSS file for styling
import { useHistory } from "react-router-dom";
const OTPInput = ({ length, onChange, cleardata, onResend, timers, Messagetext, Messagetext1, Messagetext2, verifyOtp, EnteredOtp, mobileNumber }) => {
  const storeMobileNumber = mobileNumber

  const history = useHistory();
  const dispatch = useDispatch();
  const baseURL = apiConfig?.baseURL;
  const { store } = rootIndex;
  const _store = store.getState();
  console.log("Checking datat==>>", length, verifyOtp)
  const [timer, setTimer] = useState(timers);
  const [otp, setOTP] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);
  const [loader, setLoader] = useState(false);

  console.log("mobileNumber--", storeMobileNumber);
  dispatch(actions.GetCustomerMobileNumber(storeMobileNumber));

  useEffect(() => {
    setOTP(Array(length).fill('')); // Clear the OTP on component load
    inputRefs.current = Array(length).fill().map((_, index) => inputRefs.current[index]);
    inputRefs.current[0].focus(); // Move focus to the first input field
  }, [cleardata]);

  useEffect(() => {
    let countdownTimer = null;

    if (timer > 0) {
      countdownTimer = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(countdownTimer);
    };
  }, [timer]);



  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const otpValues = [...otp];
    otpValues[index] = value.slice(0, 1); // Restrict input to a single digit
    setOTP(otpValues);
    onChange(otpValues.join('')); // Pass the updated OTP value to the parent component

    if (value) {
      // Move focus to the next input field
      if (index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      // Move focus to the previous input field
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleInputPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length);
    const otpValues = Array(length).fill('').map((_, index) => pastedData[index] || '');
    setOTP(otpValues);
    onChange(otpValues.join('')); // Pass the updated OTP value to the parent component

    if (pastedData.length > length) {
      // Move focus to the next input field if more digits are pasted
      inputRefs.current[length - 1].focus();
    } else {
      // Move focus to the last input field
      inputRefs.current[pastedData.length - 1].focus();
    }
  };

  const handleInputFocus = (e) => {
    e.target.select(); // Select the input field content on focus
  };

  const handleResendClick = () => {
    onResend();
    setOTP(Array(length).fill('')); // Reset the OTP values
    inputRefs.current[0].focus(); // Move focus to the first input field
    setTimer(30);
  };
  const RunningTimer = () => {
    setInterval(timer)
  }

  const VefiryOTPLogin = async () => {
    console.log("Im calling")

    let currentURL = window.location.href;
    let index = currentURL.indexOf("customer-login/");
    let ciphertext = ""
    if (index !== -1) {
      ciphertext = currentURL.substring(index + "customer-login/".length);
      console.log(ciphertext);
    }
    try {
      setLoader(true);
      const Url = `${baseURL}cipherSecure/customerOtpVerification`;
      const requestBody = {
        mobileNumber,
        otp: EnteredOtp
      };
      const headers = {
        ciphertext,
        authorization: "Bearer " + _store.login.token,
        'Content-Type': 'application/json',
      };
      const response = await axios.post(Url, requestBody, { headers });
      setLoader(false);
      let customerToken = response?.data?.data?.token
      dispatch(actions.GetCustomerToken(customerToken));

      console.log("customerLogin---", response.data.data.token);

      if (response?.data?.statusCode === -1) {

        message.success(response?.data?.data?.message)
        const formData = {
          // mobileNumber: "",
          // agentCode: "",
          // commercialStructure: "",
          // userId: ""
        };
        dispatch(actions.fetchCustomerJWT(formData, result => {
          // if (result?.statusCode === -1) {

          // } else {
          //   // setopenloader(false)
          // }
          console.log("Result====", result);
        }))
        history.push("/quotation-policy-tabs")
      } else {
        message.error(response?.data?.data)
      }
      console.log("response response response: ", response);
    } catch (error) {
      setLoader(false);
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
    }


    console.log("mobileNumber: ", mobileNumber)
    console.log("otp: ", EnteredOtp)
  }
  const handleOnchage = (evt)=>{
    const isNumber = /^[0-9]$/.test(evt.key);
      const isBackspace = evt.key === "Backspace";
      console.log("Enter Pressed",evt.key)

      if (!isNumber && !isBackspace) {
        console.log("Backepsce")
        if(evt.key === 'Enter'){
          VefiryOTPLogin();
        }else {
        evt.preventDefault();
        }
        
      }
  }

  return (
    <>
      <FullPageLoader fromapploader={loader} />
      <div className='wrapper-main-box'>
        <div className='message-text-box'>
          <div className='message-wrapper-box'>
            <span className="timer-text">{Messagetext}<strong>{Messagetext1}</strong>{Messagetext2}</span>
          </div>
        </div>
        <div>
          <span className="timer-text-otp">Please enter the <span style={{ fontWeight: '700' }}>OTP</span></span>
        </div>
        <div className="otp-container">
          {Array(length)
            .fill()
            .map((_, index) => (
              <input
                key={index}
                className="otp-input"
                type="number"
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleInputChange(e, index)}
                onPaste={handleInputPaste}
                onFocus={handleInputFocus}
                onKeyDown={(evt) => { handleOnchage(evt)}}
                ref={(el) => (inputRefs.current[index] = el)}

              />
            ))}

        </div>
        <div className="resend-container">
          <div>
            {timer > 0 && <span className="timer-text">Resend OTP in {timer} second</span>}
          </div>
          {timer == 0 &&
            <button className="resend-button" onClick={handleResendClick} >
              Resend OTP
            </button>
          }

        </div>
        <div>
          {/* <button className='verify-button' onClick={verifyOtp}>
                  Verify
                </button> */}
          <button className='verify-button' onClick={VefiryOTPLogin}>
            Verify & Proceed
          </button>

        </div>
      </div>
    </>

  );
};

export default OTPInput;
