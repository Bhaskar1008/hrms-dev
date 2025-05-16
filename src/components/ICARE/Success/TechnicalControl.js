import React ,{useState}from "react";
import img5 from "../../../images/Success/success.png";
import img6 from "../../../images/Success/wrapper.png";
import "./TechnicalControl.css";
import img1 from "../../../images/copy-img/copy.png";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useHistory } from "react-router-dom";


export default function TechnicalControl() {
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
    history.push("/iCare-Dashboard");
  };
  return (
    <>
    <div className="rsmaindivv">
      <div className="center">
        <img src={img5} className="success_img" alt="success" />
      </div>

      <div className="success_msg"> Success! </div>
      <div className="success_msg2">
        The policy has been issued and delivered to the customer’s registered
        email.
      </div>

      <div className="success_msg3">
        Send this policy & feedback link to the client
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
      <div className="btn_parent">
        <Button  className="back_btn"  onClick={onChangetoDashboard} >
          <ArrowLeftOutlined />
          Back to dashboard
        </Button>
        <Button className="print_btn" type="text">
          {" "}
          <img src={img6} /> Print Policy
        </Button>
      </div>
      </div>
    </>
  );
}
