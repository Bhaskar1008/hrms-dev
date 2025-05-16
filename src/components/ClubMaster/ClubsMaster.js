import React, { useState, useEffect } from 'react';
import { Avatar, Tabs, Button, Modal, DatePicker } from 'antd';
import './ClubsMaster.css';
import { Layout } from 'antd';
import { Carousel } from 'antd';
import { Card, Col, Row } from 'antd';
import { Divider } from 'antd';
import { Descriptions } from 'antd';
const { Header, Footer, Content } = Layout;
const { Meta } = Card;
const contentStyle = {
    height: '310px',
    color: '#fff',
    lineHeight: '180px',
    textAlign: 'center',
    background: '#364d79',
};
const style = { background: '#fff', padding: '8px 0' };
const ClubsMaster = () => {
    const [isAdvisorModalVisible, setIsAdvisorModalVisible] = useState(false)
    const [selectAllClubsOption, setSelectAllClubsOption] = useState(true);
    const [selectViewClubsOption, setSelectViewClubsOption] = useState(false);
    const selectAllClubsFunc = () => {
        setSelectAllClubsOption(true)
        setSelectViewClubsOption(false)
    }
    const selectViewClubsFunc = () => {
        setSelectAllClubsOption(false)
        setSelectViewClubsOption(true)
    }
    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const CreateEventButtonFunc = () => {
        setIsAdvisorModalVisible(true)
        // alert(isAdvisorModalVisible)
    }
    const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);
    const [isDisplayVisible, setIsDisplayModalVisible] = useState(false);
    const showModal = () => {
        setIsJoinModalVisible(true);
    };
    const displayModal = () => {
        setIsDisplayModalVisible(true);
    }
    const handleOk = () => {
        setIsJoinModalVisible(false);
    };

    const handleCancel = () => {
        setIsJoinModalVisible(false);
    };
    // const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);

    // const showModal = () => {
    //     setIsJoinModalVisible(true);
    // };

    // const handleOk = () => {
    //     setIsJoinModalVisible(false);
    // };

    // const handleCancel = () => {
    //     setIsJoinModalVisible(false);
    // };
    const onChangeDate = (date, dateString) => {
    }
    return < >
        <div className="Clubmaster-head">
            <div className="Clubmaster-buttons">
                <div className="Clubmaster-buttons-display">
                    <div onClick={selectAllClubsFunc} className={selectAllClubsOption == true ? "club-button" : "club-btn2"} value={selectAllClubsOption}>
                        <p className={selectAllClubsOption == true ? "Clubmaster-tab-active-text-style" : "Clubmaster-tab-text-style"}>

                            All Clubs
                        </p>
                    </div>
                    <div onClick={selectViewClubsFunc} className={selectViewClubsOption == true ? "club-button" : "club-btn2"} value={selectViewClubsOption}>
                        <p className={selectViewClubsOption == true ? "Clubmaster-tab-active-text-style" : "Clubmaster-tab-text-style"} >

                            My Clubs
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="Main-content">
            {selectAllClubsOption ?
                <div className="club-wrapper">
                    <div className="club-container">
                        <h1 className="Head-tag1" >International Clubs</h1>
                        <Row type="flex" gutter={[40, 24]}>
                            <Col xs={{ order: 1 }} sm={8} md={8} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                <Row type="flex" gutter={['', 24]}>
                                    <Col className="card1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <div className="Card">
                                            <Carousel autoplay>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card1.jpg" className="responsive" />}>
                                                    </Card>
                                                </div>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card2.jpg" className="responsive" />}>
                                                    </Card>
                                                </div>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card3.jpg" className="responsive" />}>
                                                    </Card>
                                                </div>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card4.jpg" className="responsive" />}>
                                                    </Card>
                                                </div>
                                            </Carousel>
                                            <table className="clubmaster-table">
                                                <tr>
                                                    <th className="clubmaster-head">TOP OF TABLE CLUB (TOT)</th>
                                                </tr>
                                                <tr>
                                                    <td className="clubmaster-data">
                                                        <p className="Paragraph">Qualifying condition for 2016 on WRP* (Rs.)</p>
                                                        <h2 className="Head-tag2">₹ 2,09,76,000/-</h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td >
                                                        <p className="Paragraph">Qualifying condition for 2016 on Commission (Rs.)</p>
                                                        <h2 className="Head-tag2">₹ 52,44,000/-</h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="clubmaster-reward">
                                                        <p className="Paragraph">Rewards</p>
                                                        <h2 className="Head-tag2">MDRT Conference for 1</h2>
                                                        <h2 className="Head-tag2">MDRT Registration</h2>
                                                        <h2 className="Head-tag2">Reimbursement of 1.5 Lac</h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Button className="button" onClick={showModal}>Join Club</Button>
                                                        <Modal
                                                            className="Clubsmaster-modal-style"
                                                            title="Join Club" visible={isJoinModalVisible} onOk={handleOk}
                                                            footer={[
                                                                <Button type="primary" className="Clubsmaster-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,
                                                                <Button type="primary" className="Clubsmaster-modal-join-button-style" onClick={displayModal}>Join Now</Button>,
                                                            ]}
                                                            width="50%"
                                                            bodyStyle={{
                                                                height: "auto",
                                                                // display:"flex",
                                                                // flexDirection:"column"
                                                                // overflowY: "scroll"

                                                            }}

                                                        >
                                                            <Modal
                                                                className="Clubsmaster-modal-style"
                                                                title="Join Club" visible={isDisplayVisible} onOk={handleOk}
                                                                footer={[
                                                                    <Button type="primary" className="Clubsmaster-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,
                                                                    <Button type="primary" className="Clubsmaster-modal-join-button-style" onClick={displayModal}>OK</Button>,
                                                                ]}
                                                                width="50%"
                                                                bodyStyle={{
                                                                    height: "auto",

                                                                }}
                                                            >
                                                                <p className="Paragraph">Details of Digital East (1st to 30th June) has been shared with the selected 7 people via Email</p>


                                                            </Modal>
                                                            <p className="Paragraph">Confirmation will be sent through Email</p>
                                                            <p className="clubparagraph">EMDRT Club</p>
                                                            <p className="Paragraph">Power to Empower</p>
                                                            <p className="Paragraph">Apply to this club to avail Benefits?</p>

                                                        </Modal>
                                                        {/* <Modal
                                                            className="Clubsmaster-modal-style"
                                                            title="Join Club" visible={isJoinModalVisible} onOk={handleOk}
                                                            footer={[
                                                                <Button type="primary" className="Clubsmaster-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,
                                                                <Button type="primary" className="Clubsmaster-modal-join-button-style" onClick={handleCancel}>Join Now</Button>,
                                                            ]}
                                                            width="50%"
                                                            bodyStyle={{
                                                                height: "auto",
                                                                

                                                            }}
                                                        >
                                                            <p className="Paragraph">Confirmation will be sent through Email</p>
                                                            <p className="clubparagraph">EMDRT Club</p>
                                                            <p className="Paragraph">Power to Empower</p>
                                                            <p className="Paragraph">Apply to this club to avail Benefits?</p>
                                                        </Modal> */}
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </Col>
                                    <Col className="card2" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <div className="Card">
                                            <Carousel autoplay>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card1.jpg" />}>
                                                    </Card>
                                                </div>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card2.jpg" />}>
                                                    </Card>
                                                </div>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card3.jpg" />}>
                                                    </Card>
                                                </div>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card4.jpg" />}>
                                                    </Card>
                                                </div>
                                            </Carousel>
                                            <table className="clubmaster-table">
                                                <tr>
                                                    <th className="clubmaster-head">TOP OF TABLE CLUB (TOT)</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="grid-container">
                                                            <div className="grid-item">
                                                                <p className="Paragraph">NOP</p>
                                                                <h2 className="Head-tag2">55</h2><Divider />
                                                            </div>
                                                            <div className="grid-item">
                                                                <p className="Paragraph">Vintage</p>
                                                                <h2 className="Head-tag2">44</h2><Divider />
                                                            </div>
                                                            <div className="grid-item">
                                                                <p className="Paragraph">WRP</p>
                                                                <h2 className="Head-tag2">50</h2><Divider />
                                                            </div>
                                                            <div className="grid-item">
                                                                <p className="Paragraph">FY 16 NOP</p>
                                                                <h2 className="Head-tag2">35</h2><Divider />
                                                            </div>
                                                            <div className="grid-item">
                                                                <p className="Paragraph">13th Month Persistency</p>
                                                                <h2 className="Head-tag2">75%</h2><Divider />
                                                            </div>
                                                            <div className="grid-item">
                                                                <p className="Paragraph">FY 15 NOP</p>
                                                                <h2 className="Head-tag2">20</h2><Divider />
                                                            </div>
                                                            <div className="grid-item">
                                                                <p className="Paragraph">25th Month Persistency</p>
                                                                <h2 className="Head-tag2">65%</h2>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Button className="button" onClick={showModal}>Join Club</Button>
                                                        <Modal
                                                            className="Clubsmaster-modal-style"
                                                            title="Join Club" visible={isJoinModalVisible} onOk={handleOk}
                                                            footer={[
                                                                <Button type="primary" className="Clubsmaster-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,
                                                                <Button type="primary" className="Clubsmaster-modal-join-button-style" onClick={displayModal}>Join Now</Button>,
                                                            ]}
                                                            width="50%"
                                                            bodyStyle={{
                                                                height: "auto",
                                                                // display:"flex",
                                                                // flexDirection:"column"
                                                                // overflowY: "scroll"

                                                            }}

                                                        >
                                                            <Modal
                                                                className="Clubsmaster-modal-style"
                                                                title="Join Club" visible={isDisplayVisible} onOk={handleOk}
                                                                footer={[
                                                                    <Button type="primary" className="Clubsmaster-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,
                                                                    <Button type="primary" className="Clubsmaster-modal-join-button-style" onClick={displayModal}>OK</Button>,
                                                                ]}
                                                                width="50%"
                                                                bodyStyle={{
                                                                    height: "auto",

                                                                }}
                                                            >
                                                                <p className="Paragraph">Details of Digital East (1st to 30th June) has been shared with the selected 7 people via Email</p>


                                                            </Modal>
                                                            <p className="Paragraph">Confirmation will be sent through Email</p>
                                                            <p className="clubparagraph">EMDRT Club</p>
                                                            <p className="Paragraph">Power to Empower</p>
                                                            <p className="Paragraph">Apply to this club to avail Benefits?</p>

                                                        </Modal>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={{ order: 2 }} sm={8} md={8} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                <Row gutter={['', 24]}>
                                    <Col className="card3" xs={22} sm={24} md={24} lg={24} xl={24} span={24} >
                                        <div className="Card">
                                            <Carousel autoplay>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card1.jpg" />}>
                                                    </Card>
                                                </div>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card2.jpg" />}>
                                                    </Card>
                                                </div>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card3.jpg" />}>
                                                    </Card>
                                                </div>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card4.jpg" />}>
                                                    </Card>
                                                </div>
                                            </Carousel>
                                            <table className="clubmaster-table">
                                                <tr>
                                                    <th className="clubmaster-head">TOP OF TABLE CLUB (TOT)</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="Paragraph">Qualifying condition for 2016 on WRP* (Rs.)</p>
                                                        <h2 className="Head-tag2">₹ 1,04,88,000/-</h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="Paragraph">Qualifying condition for 2016 on Commission (Rs.)</p>
                                                        <h2 className="Head-tag2">₹ 26,22,000/-</h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="clubmaster-reward">
                                                        <p className="Paragraph">Rewards</p>
                                                        <h2 className="Head-tag2">MDRT Experience for 1</h2>
                                                        <h2 className="Head-tag2">Reimbursement of 1.5 La</h2><br />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Button className="button" onClick={showModal}>Join Club</Button>
                                                        <Modal
                                                            className="Clubsmaster-modal-style"
                                                            title="Join Club" visible={isJoinModalVisible} onOk={handleOk}
                                                            footer={[
                                                                <Button type="primary" className="Clubsmaster-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,
                                                                <Button type="primary" className="Clubsmaster-modal-join-button-style" onClick={displayModal}>Join Now</Button>,
                                                            ]}
                                                            width="50%"
                                                            bodyStyle={{
                                                                height: "auto",
                                                                // display:"flex",
                                                                // flexDirection:"column"
                                                                // overflowY: "scroll"

                                                            }}

                                                        >
                                                            <Modal
                                                                className="Clubsmaster-modal-style"
                                                                title="Join Club" visible={isDisplayVisible} onOk={handleOk}
                                                                footer={[
                                                                    <Button type="primary" className="Clubsmaster-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,
                                                                    <Button type="primary" className="Clubsmaster-modal-join-button-style" onClick={displayModal}>OK</Button>,
                                                                ]}
                                                                width="50%"
                                                                bodyStyle={{
                                                                    height: "auto",

                                                                }}
                                                            >
                                                                <p className="Paragraph">Details of Digital East (1st to 30th June) has been shared with the selected 7 people via Email</p>


                                                            </Modal>
                                                            <p className="Paragraph">Confirmation will be sent through Email</p>
                                                            <p className="clubparagraph">EMDRT Club</p>
                                                            <p className="Paragraph">Power to Empower</p>
                                                            <p className="Paragraph">Apply to this club to avail Benefits?</p>

                                                        </Modal>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </Col>
                                    <Col className="card2" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <div className="Card">
                                            <Carousel autoplay>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card1.jpg" />}>
                                                    </Card>
                                                </div>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card2.jpg" />}>
                                                    </Card>
                                                </div>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card3.jpg" />}>
                                                    </Card>
                                                </div>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card4.jpg" />}>
                                                    </Card>
                                                </div>
                                            </Carousel>
                                            <table className="clubmaster-table">
                                                <tr>
                                                    <th className="clubmaster-head">TOP OF TABLE CLUB (TOT)</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="grid-container">
                                                            <div className="grid-item">
                                                                <p className="Paragraph">NOP</p>
                                                                <h2 className="Head-tag2">55</h2><Divider />
                                                            </div>
                                                            <div className="grid-item">
                                                                <p className="Paragraph">Vintage</p>
                                                                <h2 className="Head-tag2">44</h2><Divider />
                                                            </div>
                                                            <div className="grid-item">
                                                                <p className="Paragraph">WRP</p>
                                                                <h2 className="Head-tag2">50</h2><Divider />
                                                            </div>
                                                            <div className="grid-item">
                                                                <p className="Paragraph">FY 16 NOP</p>
                                                                <h2 className="Head-tag2">35</h2><Divider />
                                                            </div>
                                                            <div className="grid-item">
                                                                <p className="Paragraph">13th Month Persistency</p>
                                                                <h2 className="Head-tag2">75%</h2><Divider />
                                                            </div>
                                                            <div className="grid-item">
                                                                <p className="Paragraph">FY 15 NOP</p>
                                                                <h2 className="Head-tag2">20</h2><Divider />
                                                            </div>
                                                            <div className="grid-item">
                                                                <p className="Paragraph">25th Month Persistency</p>
                                                                <h2 className="Head-tag2">65%</h2>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Button className="button" onClick={showModal}>Join Club</Button>
                                                        <Modal
                                                            className="Clubsmaster-modal-style"
                                                            title="Join Club" visible={isJoinModalVisible} onOk={handleOk}
                                                            footer={[
                                                                <Button type="primary" className="Clubsmaster-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,
                                                                <Button type="primary" className="Clubsmaster-modal-join-button-style" onClick={displayModal}>Join Now</Button>,
                                                            ]}
                                                            width="50%"
                                                            bodyStyle={{
                                                                height: "auto",
                                                                // display:"flex",
                                                                // flexDirection:"column"
                                                                // overflowY: "scroll"

                                                            }}

                                                        >
                                                            <Modal
                                                                className="Clubsmaster-modal-style"
                                                                title="Join Club" visible={isDisplayVisible} onOk={handleOk}
                                                                footer={[
                                                                    <Button type="primary" className="Clubsmaster-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,
                                                                    <Button type="primary" className="Clubsmaster-modal-join-button-style" onClick={displayModal}>OK</Button>,
                                                                ]}
                                                                width="50%"
                                                                bodyStyle={{
                                                                    height: "auto",

                                                                }}
                                                            >
                                                                <p className="Paragraph">Details of Digital East (1st to 30th June) has been shared with the selected 7 people via Email</p>


                                                            </Modal>
                                                            <p className="Paragraph">Confirmation will be sent through Email</p>
                                                            <p className="clubparagraph">EMDRT Club</p>
                                                            <p className="Paragraph">Power to Empower</p>
                                                            <p className="Paragraph">Apply to this club to avail Benefits?</p>

                                                        </Modal>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={{ order: 3 }} sm={8} md={8} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                                <Row gutter={['', 24]}>
                                    <Col className="card3" xs={22} sm={24} md={24} lg={24} xl={24} span={24} >
                                        <div className="Card">
                                            <Carousel autoplay>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card1.jpg" />}>
                                                    </Card>
                                                </div>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card2.jpg" />}>
                                                    </Card>
                                                </div>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card3.jpg" />}>
                                                    </Card>
                                                </div>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card4.jpg" />}>
                                                    </Card>
                                                </div>
                                            </Carousel>
                                            <table className="clubmaster-table">
                                                <tr>
                                                    <th className="clubmaster-head">TOP OF TABLE CLUB (TOT)</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="Paragraph">Qualifying condition for 2016 on WRP* (Rs.)</p>
                                                        <h2 className="Head-tag2">₹ 34,96,000/-</h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="Paragraph">Qualifying condition for 2016 on Commission (Rs.)</p>
                                                        <h2 className="Head-tag2">₹ 8,74,000/-</h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="clubmaster-reward">
                                                        <p className="Paragraph">Rewards</p>
                                                        <h2 className="Head-tag2">MDRT Experince</h2><br /><br />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Button className="button" onClick={showModal}>Join Club</Button>
                                                        <Modal
                                                            className="Clubsmaster-modal-style"
                                                            title="Join Club" visible={isJoinModalVisible} onOk={handleOk}
                                                            footer={[
                                                                <Button type="primary" className="Clubsmaster-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,
                                                                <Button type="primary" className="Clubsmaster-modal-join-button-style" onClick={displayModal}>Join Now</Button>,
                                                            ]}
                                                            width="50%"
                                                            bodyStyle={{
                                                                height: "auto",
                                                                // display:"flex",
                                                                // flexDirection:"column"
                                                                // overflowY: "scroll"

                                                            }}

                                                        >
                                                            <Modal
                                                                className="Clubsmaster-modal-style"
                                                                title="Join Club" visible={isDisplayVisible} onOk={handleOk}
                                                                footer={[
                                                                    <Button type="primary" className="Clubsmaster-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,
                                                                    <Button type="primary" className="Clubsmaster-modal-join-button-style" onClick={displayModal}>OK</Button>,
                                                                ]}
                                                                width="50%"
                                                                bodyStyle={{
                                                                    height: "auto",

                                                                }}
                                                            >
                                                                <p className="Paragraph">Details of Digital East (1st to 30th June) has been shared with the selected 7 people via Email</p>


                                                            </Modal>
                                                            <p className="Paragraph">Confirmation will be sent through Email</p>
                                                            <p className="clubparagraph">EMDRT Club</p>
                                                            <p className="Paragraph">Power to Empower</p>
                                                            <p className="Paragraph">Apply to this club to avail Benefits?</p>

                                                        </Modal>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </Col>
                                    <Col className="card3" xs={22} sm={24} md={24} lg={24} xl={24} span={24} >
                                        <div className="Card">
                                            <Carousel autoplay>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card1.jpg" />}>
                                                    </Card>
                                                </div>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card2.jpg" />}>
                                                    </Card>
                                                </div>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card3.jpg" />}>
                                                    </Card>
                                                </div>
                                                <div className="Image">
                                                    <Card style={contentStyle} cover={<img alt="example" src="card4.jpg" />}>
                                                    </Card>
                                                </div>
                                            </Carousel>
                                            <table className="clubmaster-table">
                                                <tr>
                                                    <th className="clubmaster-head">TOP OF TABLE CLUB (TOT)</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="grid-container">
                                                            <div className="grid-item">
                                                                <p className="Paragraph">NOP</p>
                                                                <h2 className="Head-tag2">55</h2><Divider />
                                                            </div>
                                                            <div className="grid-item">
                                                                <p className="Paragraph">Vintage</p>
                                                                <h2 className="Head-tag2">44</h2><Divider />
                                                            </div>
                                                            <div className="grid-item">
                                                                <p className="Paragraph">WRP</p>
                                                                <h2 className="Head-tag2">50</h2><Divider />
                                                            </div>
                                                            <div className="grid-item">
                                                                <p className="Paragraph">FY 16 NOP</p>
                                                                <h2 className="Head-tag2">35</h2><Divider />
                                                            </div>
                                                            <div className="grid-item">
                                                                <p className="Paragraph">13th Month Persistency</p>
                                                                <h2 className="Head-tag2">75%</h2><Divider />
                                                            </div>
                                                            <div className="grid-item">
                                                                <p className="Paragraph">FY 15 NOP</p>
                                                                <h2 className="Head-tag2">20</h2><Divider />
                                                            </div>
                                                            <div className="grid-item">
                                                                <p className="Paragraph">25th Month Persistency</p>
                                                                <h2 className="Head-tag2">65%</h2>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Button className="button" onClick={showModal}>Join Club</Button>
                                                        <Modal
                                                            className="Clubsmaster-modal-style"
                                                            title="Join Club" visible={isJoinModalVisible} onOk={handleOk}
                                                            footer={[
                                                                <Button type="primary" className="Clubsmaster-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,
                                                                <Button type="primary" className="Clubsmaster-modal-join-button-style" onClick={displayModal}>Join Now</Button>,
                                                            ]}
                                                            width="50%"
                                                            bodyStyle={{
                                                                height: "auto",
                                                                // display:"flex",
                                                                // flexDirection:"column"
                                                                // overflowY: "scroll"

                                                            }}

                                                        >
                                                            <Modal
                                                                className="Clubsmaster-modal-style"
                                                                title="Join Club" visible={isDisplayVisible} onOk={handleOk}
                                                                footer={[
                                                                    <Button type="primary" className="Clubsmaster-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,
                                                                    <Button type="primary" className="Clubsmaster-modal-join-button-style" onClick={displayModal}>OK</Button>,
                                                                ]}
                                                                width="50%"
                                                                bodyStyle={{
                                                                    height: "auto",

                                                                }}
                                                            >
                                                                <p className="Paragraph">Details of Digital East (1st to 30th June) has been shared with the selected 7 people via Email</p>


                                                            </Modal>
                                                            <p className="Paragraph">Confirmation will be sent through Email</p>
                                                            <p className="clubparagraph">EMDRT Club</p>
                                                            <p className="Paragraph">Power to Empower</p>
                                                            <p className="Paragraph">Apply to this club to avail Benefits?</p>

                                                        </Modal>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
                :
                <div className="club-container">
                    <h1 className="Head-tag1" >International Clubs</h1>
                    <Row type="flex" gutter={[10, 5]}>
                        <Col xs={{ order: 1 }} sm={8} md={8} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                            <Row type="flex" gutter={['', 5]}>
                                <Col className="card1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                    <div className="Card">
                                        <Carousel autoplay>
                                            <div className="Image">
                                                <Card style={contentStyle} cover={<img alt="example" src="card1.jpg" className="responsive" />}>
                                                </Card>
                                            </div>
                                            <div className="Image">
                                                <Card style={contentStyle} cover={<img alt="example" src="card2.jpg" className="responsive" />}>
                                                </Card>
                                            </div>
                                            <div className="Image">
                                                <Card style={contentStyle} cover={<img alt="example" src="card3.jpg" className="responsive" />}>
                                                </Card>
                                            </div>
                                            <div className="Image">
                                                <Card style={contentStyle} cover={<img alt="example" src="card4.jpg" className="responsive" />}>
                                                </Card>
                                            </div>
                                        </Carousel>
                                        <table className="clubmaster-table">
                                            <tr>
                                                <th className="clubmaster-head">TOP OF TABLE CLUB (TOT)</th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className="Paragraph">Qualifying condition for 2016 on WRP* (Rs.)</p>
                                                    <h2 className="Head-tag2">₹ 2,09,76,000/-</h2>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className="Paragraph">Qualifying condition for 2016 on Commission (Rs.)</p>
                                                    <h2 className="Head-tag2">₹ 52,44,000/-</h2>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="clubmaster-rewards">
                                                    <p className="Paragraph">Rewards</p>
                                                    <h2 className="Head-tag2">MDRT Conference for 1</h2>
                                                    <h2 className="Head-tag2">MDRT Registration</h2>
                                                    <h2 className="Head-tag2">Reimbursement of 1.5 Lac</h2>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Button className="button" onClick={showModal}>Join Club</Button>
                                                    <Modal
                                                        className="Clubsmaster-modal-style"
                                                        title="Join Club" visible={isJoinModalVisible} onOk={handleOk}
                                                        footer={[
                                                            <Button type="primary" className="Clubsmaster-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,
                                                            <Button type="primary" className="Clubsmaster-modal-join-button-style" onClick={displayModal}>Join Now</Button>,
                                                        ]}
                                                        width="50%"
                                                        bodyStyle={{
                                                            height: "auto",
                                                            // display:"flex",
                                                            // flexDirection:"column"
                                                            // overflowY: "scroll"

                                                        }}

                                                    >
                                                        <Modal
                                                            className="Clubsmaster-modal-style"
                                                            title="Join Club" visible={isDisplayVisible} onOk={handleOk}
                                                            footer={[
                                                                <Button type="primary" className="Clubsmaster-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,
                                                                <Button type="primary" className="Clubsmaster-modal-join-button-style" onClick={displayModal}>OK</Button>,
                                                            ]}
                                                            width="50%"
                                                            bodyStyle={{
                                                                height: "auto",

                                                            }}
                                                        >
                                                            <p className="Paragraph">Details of Digital East (1st to 30th June) has been shared with the selected 7 people via Email</p>


                                                        </Modal>
                                                        <p className="Paragraph">Confirmation will be sent through Email</p>
                                                        <p className="clubparagraph">EMDRT Club</p>
                                                        <p className="Paragraph">Power to Empower</p>
                                                        <p className="Paragraph">Apply to this club to avail Benefits?</p>

                                                    </Modal>
                                                </td>
                                            </tr>
                                        </table>
                                        {/* <Descriptions layout="vertical" bordered>
                                            <Descriptions.Item label="TOP OF TABLE CLUB (TOT)" span={3}>
                                                <p className="Paragraph">Qualifying condition for 2016 on WRP* (Rs.)</p>
                                                <h2 className="Head-tag2">₹ 2,09,76,000/-</h2><Divider />
                                                <p className="Paragraph">Qualifying condition for 2016 on Commission (Rs.)</p>
                                                <h2 className="Head-tag2">₹ 52,44,000/-</h2><Divider />
                                                <p className="Paragraph">Rewards</p>
                                                <h2 className="Head-tag2">MDRT Conference for 1</h2>
                                                <h2 className="Head-tag2">MDRT Registration</h2>
                                                <h2 className="Head-tag2">Reimbursement of 1.5 Lac</h2>
                                                <Divider />
                                                <Button className="button">Join Club</Button><br /><br /><br />
                                            </Descriptions.Item>
                                        </Descriptions> */}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={{ order: 2 }} sm={8} md={8} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                            <Row gutter={['', 24]}>
                                <Col className="card3" xs={22} sm={24} md={24} lg={24} xl={24} span={24} >
                                    <div className="Card">
                                        <Carousel autoplay>
                                            <div className="Image">
                                                <Card style={contentStyle} cover={<img alt="example" src="card1.jpg" />}>
                                                </Card>
                                            </div>
                                            <div className="Image">
                                                <Card style={contentStyle} cover={<img alt="example" src="card2.jpg" />}>
                                                </Card>
                                            </div>
                                            <div className="Image">
                                                <Card style={contentStyle} cover={<img alt="example" src="card3.jpg" />}>
                                                </Card>
                                            </div>
                                            <div className="Image">
                                                <Card style={contentStyle} cover={<img alt="example" src="card4.jpg" />}>
                                                </Card>
                                            </div>
                                        </Carousel>
                                        <table className="clubmaster-table">
                                            <tr>
                                                <th className="clubmaster-head">TOP OF TABLE CLUB (TOT)</th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="grid-container">
                                                        <div className="grid-item">
                                                            <p className="Paragraph">NOP</p>
                                                            <h2 className="Head-tag2">55</h2><Divider />
                                                        </div>
                                                        <div className="grid-item">
                                                            <p className="Paragraph">Vintage</p>
                                                            <h2 className="Head-tag2">44</h2><Divider />
                                                        </div>
                                                        <div className="grid-item">
                                                            <p className="Paragraph">WRP</p>
                                                            <h2 className="Head-tag2">50</h2><Divider />
                                                        </div>
                                                        <div className="grid-item">
                                                            <p className="Paragraph">FY 16 NOP</p>
                                                            <h2 className="Head-tag2">35</h2><Divider />
                                                        </div>
                                                        <div className="grid-item">
                                                            <p className="Paragraph">13th Month Persistency</p>
                                                            <h2 className="Head-tag2">75%</h2><Divider />
                                                        </div>
                                                        <div className="grid-item">
                                                            <p className="Paragraph">FY 15 NOP</p>
                                                            <h2 className="Head-tag2">20</h2><Divider />
                                                        </div>
                                                        <div className="grid-item">
                                                            <p className="Paragraph">25th Month Persistency</p>
                                                            <h2 className="Head-tag2">65%</h2>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Button className="button" onClick={showModal}>Join Club</Button>
                                                    <Modal
                                                        className="Clubsmaster-modal-style"
                                                        title="Join Club" visible={isJoinModalVisible} onOk={handleOk}
                                                        footer={[
                                                            <Button type="primary" className="Clubsmaster-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,
                                                            <Button type="primary" className="Clubsmaster-modal-join-button-style" onClick={displayModal}>Join Now</Button>,
                                                        ]}
                                                        width="50%"
                                                        bodyStyle={{
                                                            height: "auto",
                                                            // display:"flex",
                                                            // flexDirection:"column"
                                                            // overflowY: "scroll"

                                                        }}

                                                    >
                                                        <Modal
                                                            className="Clubsmaster-modal-style"
                                                            title="Join Club" visible={isDisplayVisible} onOk={handleOk}
                                                            footer={[
                                                                <Button type="primary" className="Clubsmaster-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,
                                                                <Button type="primary" className="Clubsmaster-modal-join-button-style" onClick={displayModal}>OK</Button>,
                                                            ]}
                                                            width="50%"
                                                            bodyStyle={{
                                                                height: "auto",

                                                            }}
                                                        >
                                                            <p className="Paragraph">Details of Digital East (1st to 30th June) has been shared with the selected 7 people via Email</p>


                                                        </Modal>
                                                        <p className="Paragraph">Confirmation will be sent through Email</p>
                                                        <p className="clubparagraph">EMDRT Club</p>
                                                        <p className="Paragraph">Power to Empower</p>
                                                        <p className="Paragraph">Apply to this club to avail Benefits?</p>

                                                    </Modal>
                                                    {/* <Modal title="Join Club" visible={isModalVisible} width={800} onOk={handleOk} onCancel={handleCancel}>
                                                        <p className="modal-text">Confirmation will be sent through Email</p>
                                                        <p className="Paragraph">EMDRT Club</p>
                                                        <p className="Paragraph">Power to Empower</p>
                                                        <p className="Paragraph">Apply to this club to avail Benefits?</p>
                                                    </Modal> */}
                                                </td>
                                            </tr>
                                        </table>
                                        {/* <Descriptions layout="vertical" bordered>
                                            <Descriptions.Item label="PLATINUM PREMIER" span={3}>
                                                <Row justify="space-around" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                    <Col>
                                                        <p className="Paragraph">NOP</p>
                                                        <h2 className="Head-tag2">55</h2><Divider />
                                                        <p className="Paragraph">WRP</p>
                                                        <h2 className="Head-tag2">50</h2><Divider />
                                                        <p className="Paragraph">13th Month Persistency</p>
                                                        <h2 className="Head-tag2">75%</h2><Divider />
                                                        <p className="Paragraph">25th Month Persistency</p>
                                                        <h2 className="Head-tag2">65%</h2><Divider />
                                                    </Col>
                                                    <Col>
                                                        <p className="Paragraph">Vintage</p>
                                                        <h2 className="Head-tag2">44</h2><Divider />
                                                        <p className="Paragraph">FY 16 NOP</p>
                                                        <h2 className="Head-tag2">35</h2><Divider />
                                                        <p className="Paragraph">FY 15 NOP</p>
                                                        <h2 className="Head-tag2">20</h2><Divider />
                                                    </Col>
                                                </Row>
                                                <Button className="button">Join Club</Button>
                                            </Descriptions.Item>
                                        </Descriptions> */}
                                    </div>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </div>
            }
            {/* </div > */}
        </div>

    </ >
}
export default ClubsMaster;
