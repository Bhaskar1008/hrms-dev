import React from 'react'
import './OonaFooter.css'
import logoImg from '../../../images/footer_img/logo.png'
import facebook from '../../../assets/ihc_icon/facebook.png'
import twiiter from '../../../assets/ihc_icon/twitter.png'
import tiktok from '../../../assets/ihc_icon/tiktok.png'
import instagram from '../../../assets/ihc_icon/insta.png'


import termsconditionpdf from '../../../images/Main Agreement Terms and Conditions.pdf'
import Privacypolicy from "../../../images/PhilLife Privacy Policy.pdf"
import { Link, useHistory } from "react-router-dom";
import { Input, Button, Typography, Row, Col,Divider } from 'antd';
import { YoutubeFilled, LinkedinFilled, InstagramOutlined,MailOutlined} from '@ant-design/icons';
import img1 from "../../../images/footer_img/Mail.png"
const { Text } = Typography;
const OonaFooter = () => {
  const history = useHistory();
const onclickcontact = () => {
  history.push("/help-desk")
}
const linkStyle = {
  color: '#333',
  textDecoration: 'none',
  fontSize: '14px',
};
const dividerStyle = {
  height: '16px',
  backgroundColor: '#000', // darker grey
  width: '1px',
  margin: '0',
};


const sendEmail = () => {
  window.open("mailto:contact@iorta.in");
}; 
  return (
    <>
        <footer className="footer1">
        <div className="">
  

          <div className="contactus1">
            <div style={{marginRight:'20px'}}>
              <div className="text17"  style={{marginBottom:'20px',color:'#707070'}}>Do you have any concerns?</div>
              <div className="button9"  onClick={sendEmail}>
                <div style={{color:'#ffffff'}} className="text16">Contact Us</div>
              </div>
            </div>
            
            <div className="containerdiv6">
              <div className="follow-us-on1" style={{marginBottom:'15px',color:'#707070'}}>Follow us on social</div>
              <div className="containerdiv7">
                <a className="facebook1" target='_blank' href='https://www.facebook.com/insularhealthcareph'>
                  <img className="vector-icon5" alt="" src={facebook} />
                </a>
         
                <a className="facebook1" target='_blank' href='https://x.com/yestoicare?lang=en'>
                  <img className="vector-icon7" alt="" src={twiiter} />
                </a>
                <a className="facebook1" target='_blank' href="https://www.tiktok.com/@yestoicare?is_from_webapp=1&sender_device=pc">
                <img className="vector-icon7" alt="" src={tiktok} />
                </a>
                <a className="facebook1" target='_blank' href="https://www.instagram.com/yestoicare/">
                <img className="vector-icon7" alt="" src={instagram} />
                </a>
              </div>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '20px', 
            padding: '20px 0',
          }}>
            <a href="/privacy-policy" style={linkStyle}>Privacy Policy</a>
            <Divider style={dividerStyle} type="vertical" />
            <a href="/terms-of-service" style={linkStyle}>Terms of Use & Service</a>
            <Divider style={dividerStyle} type="vertical" />
            <a href="/report-problem" style={linkStyle}>Report a Problem</a>
          </div>
        </div>
        <div className="div14" style={{display:'flex',flexDirection:'column'}}>
 
            <Row justify="end">
              <Col>
                <Text style={{ display: 'block', marginBottom: '10px', textAlign: 'left' }}>
                  Don’t miss out on any updates
                </Text>
                <Input.Group compact style={{ display: 'flex' }}>
                  <Input
                    style={{
                      flex: 1,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      marginRight: 15,
                    }}
                    placeholder="Enter email address"
                    prefix={<MailOutlined style={{ color: '#00AEC1' }} />}
                  />
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: '#F37021',
                      borderColor: '#F37021',
                      borderRadius:12
                    }}
                  >
                    Submit
                  </Button>
                </Input.Group>
              </Col>
            </Row>
                
                <div>
                  <p style={{color:'#707070'}}>Copyright © 2025 Insular Health Care,INC. All Rights Reserved.</p>
                </div>
  
        </div>
      </footer>
    </>
  )
}

export default OonaFooter