import React, { useState } from "react";
import "./ForgotPassword.css";
import { Card, Input, Button, Image, Form, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

// Import Image --- //
import sales_logo_img from "../../images/onnanepocicon.png";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const onForgotPassword = () => {
    // https://oonanode-uat.salesdrive.app/sdx-api/secure/user/forgotPasscode
    // https://sdrestnode.iorta.in/secure/sd/user/forgotPasscode
    axios
      .post(
        "https://oonanode-uat.salesdrive.app/sdx-api/auth/user/forgotPasscode",
        { email: email }
      )
      .then((resp) => {
        if (resp?.data?.statusCode === -1) {
          message.success(resp?.data?.data?.msg);
        } else if (resp?.data?.statusCode === -10) {
          message.error(resp?.data?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="main-body">
      <Form form={form} onFinish={onForgotPassword}>
        <div className="login-card">
          <Card className="main-card">
            <div className="logo">
              <Image
                preview={false}
                width={130}
                src={sales_logo_img}
                alt="login-logo"
              />
            </div>
            <hr className="horline" />
            <p
              style={{
                margin: 20,
                fontSize: "28px",
                textAlign: "center",
                color: "#1FB3AB",
              }}
            >
              Forgot Password
            </p>
            <Form.Item
              name="email"
              rules={
                [
                  // {
                  //     type: "email",
                  //     message: "Please Enter Valid Email"
                  // },
                  // {
                  //     required: true,
                  //     message: "PAN No is Required"
                  //     // message: "Email is Required"
                  // },
                  // {
                  //     message: 'Enter a valid PAN No format',
                  //     pattern: new RegExp(/(^([a-zA-Z]{5})([0-9]{4})([a-zA-Z]{1})$)/)
                  // }
                ]
              }
            >
              <Input
                size="large"
                placeholder="Enter User ID"
                prefix={<UserOutlined />}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Link to="/login">
              <p
                className="Logintext"
                style={{ color: "#fff", textDecoration: "underline" }}
              >
                Back To Login
              </p>
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              className="sendlinkbtn"
              block
            >
              Send Link
            </Button>
          </Card>
        </div>
      </Form>
    </div>
  );
};
export default ForgotPassword;
