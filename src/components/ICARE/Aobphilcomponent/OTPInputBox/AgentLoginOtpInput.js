import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
// Import the CSS file for styling
import "./OtpInput.css";
import { Button } from "antd";

// { length, onChange ,cleardata,onResend, timers ,Messagetext,verifyOtp}
const AgentLoginOtpInput = forwardRef((props, ref) => {

  // const [clearinput ,SetclearInput] =useState(cleardata)
  const [timer, setTimer] = useState(props.timers);
  const [otp, setOTP] = useState(Array(props.length).fill(""));
  // const customTextResend = false;
  const inputRefs = useRef([]);

  useEffect(() => {
    // console.log("Im Call on Page component Load",props.cleardata)
    setOTP(Array(props.length).fill("")); // Clear the OTP on component load
    inputRefs.current = Array(props.length)
      .fill()
      .map((_, index) => inputRefs.current[index]);
    inputRefs.current[0].focus(); // Move focus to the first input field
    // console.log("After Call Im Call on Page component Load")
  }, [props.cleardata]);

  useEffect(() => {
    // console.log("Timer===>>",timer)
    // SetclearInput(timer)
    let timerstart = 0;
    timerstart = timer;
    let countdownTimer = null;

    if (timerstart > 0) {
      countdownTimer = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(countdownTimer);
    };
  }, [timer]);

  const childRef = useRef();

  const childFunction = () => {
    setOTP(Array(props.length).fill("")); // Clear the OTP on component load
    setTimer(props.timers);
  };

  // Expose the childFunction through the ref
  useImperativeHandle(ref, () => ({
    childFunction,
  }));

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const otpValues = [...otp];
    otpValues[index] = value.slice(0, 1); // Restrict input to a single digit
    // console.log("data===>>",otpValues)
    setOTP(otpValues);
    props.onChange(otpValues.join("")); // Pass the updated OTP value to the parent component

    if (value) {
      // Move focus to the next input field
      if (index < props.length - 1) {
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
    const pastedData = e.clipboardData
      .getData("text/plain")
      .slice(0, props.length);
    const otpValues = Array(props.length)
      .fill("")
      .map((_, index) => pastedData[index] || "");
    setOTP(otpValues);
    props.onChange(otpValues.join("")); // Pass the updated OTP value to the parent component

    if (pastedData.length > props.length) {
      // Move focus to the next input field if more digits are pasted
      inputRefs.current[props.length - 1].focus();
    } else {
      // Move focus to the last input field
      inputRefs.current[pastedData.length - 1].focus();
    }
  };

  const handleInputFocus = (e) => {
    e.target.select(); // Select the input field content on focus
  };

  const handleResendClick = () => {
    props.onResend();
    setOTP(Array(props.length).fill("")); // Reset the OTP values
    inputRefs.current[0].focus(); // Move focus to the first input field
    setTimer(props.timers);
  };
  const RunningTimer = () => {
    setInterval(timer);
  };
  // clear current input using backspace btn
  const handleKeyDown = (e, index) => {
    // setOTP(Array(props.length).fill(""));
    if (e.key === "Backspace" && index > 0 && otp[index] === "" || e.key === 'e' || e.key === '.' || e.key === '-' && e.preventDefault()) {
      inputRefs.current[index - 1].focus();
      setOTP((prevOTP) => {
        const newOTP = [...prevOTP];
        newOTP[index - 1] = "";
        return newOTP;
      });
    }else if (e.key === 'Enter') {
      props.verifyOtp()

    }
  };
  
  return (
    <div className="agent_login_otp_wrapper">
      <div className="wrapper-main-box">
        <div className="message-text-box">
          {props.Messagetext && (
            <div className="message-wrapper-box">
              <span className="timer-text">{props.Messagetext}</span>
            </div>
          )}
        </div>
        <div className="otp_title_text">
          <span className="timer-text-otp">Please enter the OTP</span>
        </div>
        <div className="otp-container">
          {Array(props.length)
            .fill()
            .map((_, index) => (
              
              <input
                key={index}
                className="otp-input"
                type="number"
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                // onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
                onPaste={handleInputPaste}
                onFocus={handleInputFocus}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
        </div>
        {props.showTimer ? (
          <div className="resend-container">
            <div>
              {timer > 0 && (
                <span className="timer-text">Resend OTP in {timer} second</span>
              )}
            </div>
            {timer === 0 && (
              <button className="resend-button" onClick={handleResendClick}>
                Resend OTP
              </button>
            )}
          </div>
        ) : null}
        <div>
          <Button
            className="verify_btn"
            size="large"
            type="defoult"
            onClick={props.verifyOtp}
          >
            {props.btn_text ? props.btn_text : "Verify"}
          </Button>
        </div>
        {props.customTextWithResend ? (
          <div className="resend-container">
            <span>Didn’t receive the OTP?</span>
            <button className="resend_button" onClick={handleResendClick}>
              Resend OTP
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
});

export default AgentLoginOtpInput;
