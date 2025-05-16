import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Form, Menu, Tabs,Typography, Button, Input, Radio, Select, Cascader, DatePicker, Space, Modal } from 'antd';
import { Divider, Image, Card } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import './PaymentOptions.css';
import MainTabs from '../../components/MainTabs/MainTabs';
const { Title } = Typography;
function onChange(date, dateString) {
}
const tabMenu = [
    {
      id: 'benefitillustrator',
      value: "Benefit Illustrator",
    },
    {
      id: 'proposalfulfilment',
      value: "Proposal Fulfilment"
    },
    {
      id: 'prepaymentreview',
      value: "Pre-payment Review"
    },
    {
      id: 'paymentoptions',
      value: "Payment Options"
    },
    {
        id: 'uploaddocuments',
        value: "Upload Documents"
    },
    {
        id: 'proposalhistory',
        value: "Proposal History"
    },
  
  ]
const { Option } = Select;
const contentStyle = {
    height: '120px',
    color: '#fff',
    // lineHeight: '180px',
    // textAlign: 'center',
    // background: '#364d79',
};
const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};
const PaymentOptions = () => {
    const [value, setValue] = React.useState(1);
    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");



        const selector = useSelector((state)=>state.applicationReducer.singleCardData)

    return (
        <div className="paymentoption-main">
            <MainTabs
                tabMenu={tabMenu}
                // header="New Lead"
                activeKey="paymentoptions"
            />
            <div className="paymentoption-row-flex">
                <Tabs tabPosition={tabPosition} style={{ marginLeft: '1vw', marginRight: '1vw', marginTop: '1vw', backgroundColor: 'white', fontWeight: 'bolder' }}>
                    <TabPane tab="Personal" key="1" >
                        <div className="paymentoption-details-card-style ">
                            <div className="paymentoption-details-card-content-align">
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="paymentoption-card1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <h3 className="paymentoption-head3">Online</h3>
                                                    <h2 className="paymentoption-head2">Payment Review</h2>
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <span className="paymentoption-title">Installment Premium</span>
                                                            <span className="paymentoption-title"> {selector.benefitIllustration.annualisedPremium} </span>
                                                        </Col>
                                                        <Col >
                                                            <span className="paymentoption-title">Premium Frequency</span>
                                                            <span className="paymentoption-title"> {selector.benefitIllustration.PremiumMode} </span>
                                                        </Col>
                                                        <Col >
                                                            <span className="paymentoption-title">Premium Paying Term</span>
                                                            <span className="paymentoption-title"> {selector.benefitIllustration.PremiumPayingTerm} </span>
                                                        </Col>
                                                    </Row><br />
                                                    <Col>
                                                        <Button className="paymentoption-btn" style={{ marginLeft: '60vw' }}>Pay Now</Button>
                                                    </Col>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="paymentoption-card1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Button className="paymentoption-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="paymentoption-btn">Proceed
                                                                <ArrowRightOutlined
                                                                    style={{
                                                                        marginTop: "7px"
                                                                    }}
                                                                />
                                                            </Button><br />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                    </TabPane>
                    <TabPane tab="Cheque/Cash/DD" key="2" >
                        <div className="paymentoption-details-card-style ">
                            <div className="paymentoption-details-card-content-align">
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="paymentoption-card1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <h3 className="paymentoption-head3">Cash/Cheque/DD</h3>
                                                    <h2 className="paymentoption-head2">Payment Review</h2>
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col>
                                                            <span className="paymentoption-title">Installment Premium</span>
                                                            <span className="paymentoption-title"> {selector.benefitIllustration.annualisedPremium}</span>
                                                        </Col>
                                                        <Col >
                                                            <span className="paymentoption-title">Amount</span>
                                                            <span className="paymentoption-title">₹ 0.00</span>
                                                        </Col>
                                                        <Col >
                                                            <span className="paymentoption-title">Remaining Amount</span>
                                                            <span className="paymentoption-title">₹ 0.00</span>
                                                        </Col>
                                                    </Row><br />
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <span className="paymentoption-title">Premium Frequency</span>
                                                            <span className="paymentoption-title">{selector.benefitIllustration.PremiumMode}</span>
                                                        </Col>
                                                        <Col >
                                                            <span className="paymentoption-title">Premium Paying Term</span>
                                                            <span className="paymentoption-title">{selector.benefitIllustration.PremiumPayingTerm}</span>
                                                        </Col>
                                                        <Col >

                                                        </Col>
                                                    </Row><br />
                                                    <h2 className="paymentoption-head2">Payment Details</h2>
                                                    <Form layout="horizontal" className="contact-detail-form">
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="Payment Mode"
                                                                label="Payment Mode"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Please select payment mode!',
                                                                    },
                                                                ]}
                                                            >
                                                                <select defaultValue={selector.paymentOptions.Cheque_method} placeholder="Select a payment mode" className='select-input'>
                                                                    <option value="Select">Select</option>
                                                                    <option value="Cash">Cash</option>
                                                                    <option value="Cheque">Cheque</option>
                                                                    <option value="DD">DD</option>
                                                                </select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name='Recored Amount'
                                                                label="Recored Amount"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Input defaultValue={selector.paymentOptions.online_method.InstallmentPremium_calc} className="first-name border-bottom" type="number" placeholder="Enter Recored Amount" />

                                                            </Form.Item>
                                                        </Col>
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="Bank Name"
                                                                label="Bank Name
"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Input defaultValue={selector.personalDetails.BankName} className="first-name border-bottom" type="text" placeholder="Enter Bank Name" />

                                                            </Form.Item>
                                                        </Col>
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['Branch Name']}
                                                                label="Branch Name"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Input defaultValue={selector.personalDetails.BankBranch} className="first-name border-bottom" type="text" placeholder="Enter Branch Name" />

                                                            </Form.Item>
                                                        </Col>
                                                    </Form>
                                                    <Col>
                                                        <Button className="paymentoption-btn" style={{ marginLeft: '61vw' }}>Submit</Button>
                                                    </Col>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 4 }} sm={24} md={24} lg={{ order: 4 }} xl={{ order: 4 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="paymentoption-card1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Button className="paymentoption-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="paymentoption-btn">Proceed
                                                                <ArrowRightOutlined
                                                                    style={{
                                                                        marginTop: "6px"
                                                                    }}
                                                                />
                                                            </Button><br />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Send Link For Payment" key="3" >
                        <div>
                            <Row gutter={[40, 24]} justify="start">
                                <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                                    <Row gutter={['', 24]}>
                                        <Col className="paymentoption-card1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <Form >
                                                <h3 className="paymentoption-head3">SendLink</h3>
                                                <h2 className="paymentoption-head2">Payment Review</h2><br />
                                                <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                    <Col  >
                                                        <span className="paymentoption-title">Installment Premium</span>
                                                        <span className="paymentoption-title">{selector.benefitIllustration.annualisedPremium}</span>
                                                    </Col>
                                                    <Col >
                                                        <span className="paymentoption-title">Premium Frequency</span>
                                                        <span className="paymentoption-title">{selector.benefitIllustration.PremiumMode}</span>
                                                    </Col>
                                                    <Col>
                                                        <span className="paymentoption-title">Premium Paying Term</span>
                                                        <span className="paymentoption-title">{selector.benefitIllustration.PremiumPayingTerm}</span>
                                                    </Col>
                                                </Row><br />
                                                <p className="paymentoption-paragraph">Please enter the Mobile No on which you want to send the link</p>
                                                <Form layout="horizontal" className="contact-detail-form">
                                                    <Col >
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name={['Email ID']}
                                                            label="Email ID
"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                },
                                                            ]}
                                                        >
                                                            <Input defaultValue={selector.paymentOptions.payment_link_method.EmailID} className="first-name border-bottom" type="text" placeholder="Enter Email ID" />

                                                        </Form.Item>
                                                    </Col>
                                                    <Col >
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name={['Mobile No']}
                                                            label="Mobile No"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                },
                                                            ]}
                                                        >
                                                            <Input defaultValue={selector.paymentOptions.payment_link_method.MobileNo} className="first-name border-bottom" type="text" placeholder="Enter Mobile No" />

                                                        </Form.Item>
                                                    </Col>
                                                </Form>
                                                <Col>
                                                    <Button className="paymentoption-btn" style={{ marginLeft: '65vw' }}>Send Link</Button>
                                                </Col><br />
                                            </Form>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={{ order: 4 }} sm={24} md={24} lg={{ order: 4 }} xl={{ order: 4 }} span={22}>
                                    <Row justify="space-around" gutter={['', 24]}>
                                        <Col className="paymentoption-card1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <Form >
                                                <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                    <Col>
                                                        <Button className="paymentoption-btn1">Previous</Button>
                                                    </Col>
                                                    <Col >
                                                        <Button className="paymentoption-btn">Proceed
                                                            <ArrowRightOutlined
                                                                style={{
                                                                    marginTop: "7px"
                                                                }}
                                                            />
                                                        </Button><br />
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </TabPane>

                </Tabs>
            </div>
        </div>
    )
}

export default PaymentOptions;