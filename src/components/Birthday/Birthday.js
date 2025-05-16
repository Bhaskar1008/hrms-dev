import React, { useState } from 'react';
import './Birthday.css';
import { Tabs } from 'antd';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import Title from 'antd/lib/typography/Title';
const { TabPane } = Tabs;
function callback(key) {
}

const Birthday = () => {
    const [testState, setTestState] = useState(true)
    let { innerWidth: width, innerHeight: height } = window;
    return <useState >
        <div className="main-container">
            <div className="btn-section">
                {width <= "375" ? <div className="tabs">
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="Upcoming" key="1"></TabPane>
                        <TabPane tab="Recent" key="2"></TabPane>
                        <TabPane tab="Later" key="3"></TabPane>
                    </Tabs></div> :
                    <div className="card">
                        <Row gutter={[16, 16]} >
                            <Col span={16}>
                            {/* {width <= "374" ? <h4>It works</h4> : <h4>It doesnt</h4>} */}
                                <h1 className="Head1">Birthday</h1><br />
                                <div className="gutter-example">
                                    <Row gutter={16} justify="center">
                                        <Col className="gutter-row" span={4}>
                                            <div className="gutter-box">
                                                <Button className="birthday-btn" shape="round" size="large" block={false} onChange={callback}>Upcoming</Button>
                                            </div>
                                        </Col>
                                        <Col className="gutter-row" span={4}>
                                            <div className="gutter-box">
                                                <Button className="birthday-btn" shape="round" size="large" block={false} >Recent</Button>
                                            </div>
                                        </Col>
                                        <Col className="gutter-row" span={4}>
                                            <div className="gutter-box">
                                                <Button className="birthday-btn" shape="round" size="large" block={false} >Later</Button>
                                            </div>
                                        </Col>
                                        <Col className="gutter-row" span={4}>
                                            <div className="gutter-box"></div>
                                        </Col>
                                        <Col className="gutter-row" span={4}>
                                            <div className="gutter-box"></div>
                                        </Col>
                                        <Col className="gutter-row" span={4}>
                                            <div className="gutter-box"></div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>}
                
            </div >
        </div >
    </useState >
}
export default Birthday;