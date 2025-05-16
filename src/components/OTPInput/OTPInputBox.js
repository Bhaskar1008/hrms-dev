import React, { useState, useRef ,useEffect} from 'react';
import './OTPInputBox.css'; // Import the CSS file for styling

const OTPInput = ({ length, onChange ,cleardata,onResend, timers ,Messagetext,verifyOtp}) => {
    console.log("Checking datat==>>",length, verifyOtp)
    const [timer, setTimer] = useState(timers);
    const [otp, setOTP] = useState(Array(length).fill(''));
    const inputRefs = useRef([]);

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
    const RunningTimer =()=>{
        setInterval(timer)
    }
  
    return (
        <div className='wrapper-main-box'>
            <div className='message-text-box'>
              <div className='message-wrapper-box'>
                <span className="timer-text">{Messagetext}</span>
             </div>
            </div>
            <div>
             <span className="timer-text-otp">Please enter the <span style={{fontWeight:'700'}}>OTP</span></span>
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
                <button className='verify-button' onClick={verifyOtp}>
                  Verify
                </button>
              </div>
        </div>
    );
  };
  
  export default OTPInput;
  