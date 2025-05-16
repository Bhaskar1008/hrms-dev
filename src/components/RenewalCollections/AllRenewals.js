import React, {useState} from 'react';
import './AllRenewals.css';
import { Card,Avatar, Input, Button, Row, Col,Modal } from 'antd';
import { TeamOutlined, UserOutlined,FilterOutlined } from '@ant-design/icons';

const AllRenewals = () => {
    const [modal1Visible,setModal1Visible] = useState(false)
    const showModal = () => {
        setModal1Visible(true);
    };
    return(
        <div style={{padding: '0 3%',paddingBottom:'30px'}}>
            <div className="site-card-wrapper" style={{marginTop:'20px'}}>
                <Row gutter={12}>
                    <Col span={3}>
                        <Card bordered={true} style={{ height: 100 }}>
                        All
                        <h3 className="notification">6</h3>
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Card bordered={true} style={{ height: 100 }}>
                        Paid
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Card bordered={true} style={{ height: 100 }}>
                        UnPaid
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Card bordered={true} style={{ height: 100 }}>
                        Lapsed
                        </Card>
                    </Col>
                </Row>
            </div>
            <div >
                <Row className="tabs">
                    <Col span={2}><Button className="iconbutton" icon={<TeamOutlined />}></Button>Team</Col>
                    <Col span={2}><Button className="iconbutton" icon={<UserOutlined />}></Button>Self</Col>
                    <Col span={2}><Button className="iconbutton" icon={<FilterOutlined />} onClick={showModal}></Button>Filter</Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                    <Card style={{ width: 600,height:100 }}  className="detailsCard">
                        <div className="profile">
                            <p>BP</p>
                        </div>
                        <p className="status">Lapsed</p>
                        <Row>
                            <Col span={12}>
                            <p className='updatetitle' style={{margin:"0"}}>update as on 20/01/1999</p>
                            <p className='updatecount' style={{margin:"0"}}>323</p>
                            <p className='updatetotal' style={{margin:"0"}}>Total GWP in ₹ Lac</p>
                            </Col>
                            <Col span={8} offset={4}>
                            <p className="sidehead" style={{margin:"0"}}>MTD Aug 2021</p>
                            <p className="updatestatus" style={{margin:"0"}}>Actual</p>
                            </Col>
                        </Row>
                    </Card>
                    </Col>
                    <Col span={12} >
                    <Card style={{ width: 600,height:100 }}>
                        <div className="profile">
                            <p>BP</p>
                        </div>
                        <p className="status">Lapsed</p>
                    </Card>
                    </Col>
                    <Col span={12} >
                    <Card style={{ width: 600,height:100 }}>
                        <div className="profile">
                            <p>BP</p>
                        </div>
                        <p className="status">Lapsed</p>
                    </Card>
                    </Col>
                    <Col span={12} >
                    <Card style={{ width: 600,height:110 }}>
                        <div className="profile">
                            <p>BP</p>
                        </div>
                        <p className="status">Lapsed</p>
                    </Card>
                    </Col>
                    <Col span={12} >
                    <Card style={{ width: 600,height:100 }}>
                        <div className="profile">
                            <p>BP</p>
                        </div>
                        <p className="status">Lapsed</p>
                    </Card>
                    </Col>
                    <Col span={12} >
                    <Card style={{ width: 600,height:100 }}>
                        <div className="profile">
                            <p>BP</p>
                        </div>
                        <p className="status">Lapsed</p>
                    </Card>
                    </Col>
                    <Col span={12} >
                    <Card style={{ width: 600,height:100 }}>
                        <div className="profile">
                            <p>BP</p>
                        </div>
                        <p className="status">Lapsed</p>
                    </Card>
                    </Col>
                    <Col span={12} >
                    <Card style={{ width: 600,height:100 }}>
                        <div className="profile">
                            <p>BP</p>
                        </div>
                        <p className="status">Lapsed</p>
                    </Card>
                    </Col>

                </Row>
            </div>
            <Modal
                title="20px to Top"
                style={{ top: 70 ,left: 420, height: 500}}
                visible={modal1Visible}
                onOk={() => setModal1Visible(false)}
                onCancel={() => setModal1Visible(false)}
                >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </div>
    )
}
export default  AllRenewals;