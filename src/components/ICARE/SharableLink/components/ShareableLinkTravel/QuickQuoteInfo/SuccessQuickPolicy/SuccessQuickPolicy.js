import React ,{useState}from "react";
import img5 from "../../../../../images/Success/success.png";
import img6 from "../../../../../images/Success/wrapper.png";
import "./SuccessQuickPolicy.css";
import img1 from "../../../../../images/copy-img/copy.png";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
export default function SuccessQuickPolicy() {
  const [isCopied, setIsCopied] = useState(false);
  const linkText = "https://oo.na/agent/83dcgfg";

  const handleCopy = () => {
    navigator.clipboard
      .writeText(linkText)
      .then(() => {
        setIsCopied(true);
        alert("Text copied to clipboard!");
      })
      .catch((error) => {
        alert("Failed to copy text to clipboard.");
        console.error(error);
      });
  };
  const history = useHistory();
  const onChangetoDashboard = () => {
    history.push("/quotation-policy-tabs");
  };
  return (
    <>
    <div className="main">
      <div className="center">
        <img src={img5} className="success_img" alt="success" />
      </div>

      <div className="success_msg"> Success! </div>
      <div className="quote-msg">
      Quote has been issued
      <div className="quote-msg2">Quote Code: 0123456790</div>

      </div>
     
      <div className="btn_parent">
        <Button  className="back_btn"  onClick={onChangetoDashboard} >
          <ArrowLeftOutlined />
          Back to Home
        </Button>
        <Button className="print_btn" type="text">
          {" "}
          <img src={img6} /> Print Policy
        </Button>
      </div>
      
      <div className="quote-msg3">
      Send this quote link to the client
      </div>
      <div className="link_box">
                      <div className="link">
                        {" "}
                        https://oo.na/agent/83dcgfg
                        <img
                          className="img"
                          src={img1}
                          alt="Copy"
                          onClick={handleCopy}
                          // className={isCopied ? "copied" : ""}
                        />
                      </div>
                    </div>
      
      </div>
    </>
  );
}
