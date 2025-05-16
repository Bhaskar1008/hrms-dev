import React, { useState } from 'react';
import { Row, Col, Form, Menu, Typography, Tabs, Button, Input, Table, Radio, Select, Cascader, DatePicker, Space, Modal, Checkbox } from 'antd';
import { Timeline } from 'antd';
import MainTabs from '../../components/MainTabs/MainTabs';
import './ProposalHistory.css';
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
const ProposalHistory = () => {
    const [value, setValue] = React.useState(1);
    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");
    return (
        <div className="proposalhistory">
            <MainTabs
                tabMenu={tabMenu}
                // header="New Lead"
                activeKey="5"
            />
            <div className="proposalhistory-row-flex">
                <Tabs tabPosition={tabPosition} style={{ marginLeft: '1vw', marginRight: '1vw', marginTop: '1vw', backgroundColor: 'white', fontWeight: 'bolder' }}>
                    <TabPane tab="Lead" key="1" >
                        <div className="proposalhistory-details-card-style ">
                            <div className="proposalhistory-details-card-content-align">
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposalhistory-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h2 className="proposalhistory-head2">Lead Data</h2><br />
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Timeline>
                                                                <Timeline.Item color="red">
                                                                    <h3 className="proposalhistory-head3">New Lead Created</h3>
                                                                    <p className="proposalhistory-paragraph">Chevkjw kjn.dwjves.  8796541230</p>
                                                                </Timeline.Item>
                                                                <Timeline.Item color="red">
                                                                    <h3 className="proposalhistory-head3">Update Appointment</h3>
                                                                    <p className="proposalhistory-paragraph">Chevkjw kjn.dwjves.  8796541230</p>
                                                                </Timeline.Item>
                                                            </Timeline>

                                                        </Col>
                                                        <Col >
                                                            <p className="proposalhistory-paragraph">himanshu</p>
                                                            <p className="proposalhistory-paragraph">10/22/2021, 12:45:25 PM</p><br />
                                                            <p className="proposalhistory-paragraph">himanshu</p>
                                                            <p className="proposalhistory-paragraph">10/24/2021, 3:40:37 PM</p><br />
                                                        </Col>
                                                    </Row>
                                                </Form>

                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposalhistory-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h2 className="proposalhistory-head2">Appointment data</h2><br />
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Timeline>
                                                               
                                                                <Timeline.Item color="red">
                                                                    <h3 className="proposalhistory-head3">New Appointment Created</h3>
                                                                    <p className="proposalhistory-paragraph">Proposal Started | P88F1F6B4</p>
                                                                </Timeline.Item>
                                                            </Timeline>

                                                        </Col>
                                                        <Col >
                                                            <p className="proposalhistory-paragraph">himanshu</p>
                                                            <p className="proposalhistory-paragraph">10/29/2021, 1:01:21 PM</p><br />
                                                        </Col>
                                                    </Row>
                                                </Form>

                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposalhistory-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h2 className="proposalhistory-head2">Proposal</h2><br />
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Timeline>
                                                                <Timeline.Item color="red">
                                                                    <h3 className="proposalhistory-head3">New BI Created</h3>
                                                                    <p className="proposalhistory-paragraph">Proposal Started | P88F1F6B4</p>
                                                                </Timeline.Item>
                                                            </Timeline>

                                                        </Col>
                                                        <Col >
                                                            <p className="proposalhistory-paragraph">himanshu</p>
                                                            <p className="proposalhistory-paragraph">10/22/2021, 11:11:04 AM</p><br />
                                                            
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
                    <TabPane tab="Appointment" key="2" >
                        <div className="proposalhistory-details-card-style ">
                            <div className="proposalhistory-details-card-content-align">
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposalhistory-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h2 className="proposalhistory-head2">Lead Data</h2><br />
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Timeline>
                                                               
                                                                <Timeline.Item color="red">
                                                                    <h3 className="proposalhistory-head3">New Lead Created</h3>
                                                                    <p className="proposalhistory-paragraph">Chevkjw kjn.dwjves.  8796541230</p>
                                                                </Timeline.Item>
                                                                <Timeline.Item color="red">
                                                                    <h3 className="proposalhistory-head3">Update Appointment</h3>
                                                                    <p className="proposalhistory-paragraph">Chevkjw kjn.dwjves.  8796541230</p>
                                                                </Timeline.Item>
                                                            </Timeline>

                                                        </Col>
                                                        <Col >
                                                           
                                                            <p className="proposalhistory-paragraph">himanshu</p>
                                                            <p className="proposalhistory-paragraph">10/22/2021, 12:45:25 PM</p><br />
                                                            <p className="proposalhistory-paragraph">himanshu</p>
                                                            <p className="proposalhistory-paragraph">10/24/2021, 3:40:37 PM</p><br />
                                                        </Col>
                                                    </Row>
                                                </Form>

                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposalhistory-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h2 className="proposalhistory-head2">Appointment data</h2><br />
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Timeline>
                                                                
                                                            <Timeline.Item color="red">
                                                                    <h3 className="proposalhistory-head3">New Appointment Created</h3>
                                                                    <p className="proposalhistory-paragraph">Chevkjw kjn.dwjves.  8796541230</p>
                                                                </Timeline.Item>
                                                                
                                                            </Timeline>

                                                        </Col>
                                                        <Col >
                                                            
                                                            <p className="proposalhistory-paragraph">himanshu</p>
                                                            <p className="proposalhistory-paragraph">10/29/2021, 1:01:21 PM</p><br />
                                                        </Col>
                                                    </Row>
                                                </Form>

                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposalhistory-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h2 className="proposalhistory-head2">Proposal</h2><br />
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Timeline>
                                                                <Timeline.Item color="red">
                                                                    <h3 className="proposalhistory-head3">New BI Created</h3>
                                                                    <p className="proposalhistory-paragraph">Proposal Started | P88F1F6B4</p>
                                                                </Timeline.Item>
                                                            </Timeline>

                                                        </Col>
                                                        <Col >
                                                            <p className="proposalhistory-paragraph">himanshu</p>
                                                            <p className="proposalhistory-paragraph">10/22/2021, 11:11:04 AM</p><br />
                                                            
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
                    <TabPane tab="Proposal" key="3" >
                        <div className="proposalhistory-details-card-style ">
                            <div className="proposalhistory-details-card-content-align">
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposalhistory-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h2 className="proposalhistory-head2">Lead Data</h2><br />
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Timeline>
                                                               
                                                            <Timeline.Item color="red">
                                                                    <h3 className="proposalhistory-head3">New Lead Created</h3>
                                                                    <p className="proposalhistory-paragraph">Chevkjw kjn.dwjves.  8796541230</p>
                                                                </Timeline.Item>
                                                                <Timeline.Item color="red">
                                                                    <h3 className="proposalhistory-head3">Update Appointment</h3>
                                                                    <p className="proposalhistory-paragraph">Chevkjw kjn.dwjves.  8796541230</p>
                                                                </Timeline.Item>
                                                            </Timeline>

                                                        </Col>
                                                        <Col >
                                                            
                                                            <p className="proposalhistory-paragraph">himanshu</p>
                                                            <p className="proposalhistory-paragraph">10/22/2021, 12:45:25 PM</p><br />
                                                            <p className="proposalhistory-paragraph">himanshu</p>
                                                            <p className="proposalhistory-paragraph">10/24/2021, 3:40:37 PM</p><br />
                                                        </Col>
                                                    </Row>
                                                </Form>

                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposalhistory-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h2 className="proposalhistory-head2">Appointment data</h2><br />
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Timeline>
                                                               
                                                            <Timeline.Item color="red">
                                                                    <h3 className="proposalhistory-head3">Update Appointment</h3>
                                                                    <p className="proposalhistory-paragraph">Chevkjw kjn.dwjves.  8796541230</p>
                                                                </Timeline.Item>
                                                               
                                                            </Timeline>

                                                        </Col>
                                                        <Col >
                                                            
                                                            
                                                            <p className="proposalhistory-paragraph">himanshu</p>
                                                            <p className="proposalhistory-paragraph">10/29/2021, 1:01:21 PM</p><br />
                                                        </Col>
                                                    </Row>
                                                </Form>

                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposalhistory-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h2 className="proposalhistory-head2">Proposal</h2><br />
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Timeline>
                                                                <Timeline.Item color="red">
                                                                    <h3 className="proposalhistory-head3">New BI Created</h3>
                                                                    <p className="proposalhistory-paragraph">Proposal Started | P88F1F6B4</p>
                                                                </Timeline.Item>
                                                            </Timeline>

                                                        </Col>
                                                        <Col >
                                                            <p className="proposalhistory-paragraph">himanshu</p>
                                                            <p className="proposalhistory-paragraph">10/22/2021, 11:11:04 AM</p><br />
                                                            
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
                    <TabPane tab="Issuance" key="4" >
                        <div className="proposalhistory-details-card-style ">
                            <div className="proposalhistory-details-card-content-align">
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposalhistory-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h2 className="proposalhistory-head2">Lead Data</h2><br />
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Timeline>
                                                                
                                                            <Timeline.Item color="red">
                                                                    <h3 className="proposalhistory-head3">New Lead Created</h3>
                                                                    <p className="proposalhistory-paragraph">Chevkjw kjn.dwjves.  8796541230</p>
                                                                </Timeline.Item>
                                                                <Timeline.Item color="red">
                                                                    <h3 className="proposalhistory-head3">Update Appointment</h3>
                                                                    <p className="proposalhistory-paragraph">Chevkjw kjn.dwjves.  8796541230</p>
                                                                </Timeline.Item>
                                                            </Timeline>

                                                        </Col>
                                                        <Col >
                                                           
                                                            <p className="proposalhistory-paragraph">himanshu</p>
                                                            <p className="proposalhistory-paragraph">10/22/2021, 12:45:25 PM</p><br />
                                                            <p className="proposalhistory-paragraph">himanshu</p>
                                                            <p className="proposalhistory-paragraph">10/24/2021, 3:40:37 PM</p><br />
                                                        </Col>
                                                    </Row>
                                                </Form>

                                            </Col>
                                        </Row>
                                    </Col>
                                    
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposalhistory-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h2 className="proposalhistory-head2">Appointment data</h2><br />
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Timeline>
                                                                
                                                                <Timeline.Item color="red">
                                                                    <h3 className="proposalhistory-head3">Update Appointment</h3>
                                                                    <p className="proposalhistory-paragraph">Proposal Started | P88F1F6B4</p>
                                                                </Timeline.Item>
                                                            </Timeline>

                                                        </Col>
                                                        <Col >
                                                            
                                                            
                                                            <p className="proposalhistory-paragraph">himanshu</p>
                                                            <p className="proposalhistory-paragraph">10/29/2021, 1:01:21 PM</p><br />
                                                        </Col>
                                                    </Row>
                                                </Form>

                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposalhistory-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h2 className="proposalhistory-head2">Proposal</h2><br />
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Timeline>
                                                                <Timeline.Item color="red">
                                                                    <h3 className="proposalhistory-head3">New BI Created</h3>
                                                                    <p className="proposalhistory-paragraph">Proposal Started | P88F1F6B4</p>
                                                                </Timeline.Item>
                                                            </Timeline>

                                                        </Col>
                                                        <Col >
                                                            <p className="proposalhistory-paragraph">himanshu</p>
                                                            <p className="proposalhistory-paragraph">10/22/2021, 11:11:04 AM</p><br />
                                                            
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
                    
                </Tabs>
            </div>
        </div>
    )
}
export default ProposalHistory;