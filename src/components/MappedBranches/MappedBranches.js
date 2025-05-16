import React, { useState, useEffect } from 'react';
import { Avatar, Tabs, Button, Popover, Drawer, Image, Input, Tag, Row, Col, Divider } from 'antd';
import { Pagination } from 'antd';
import {
    UsergroupAddOutlined,
    UserOutlined,
    PhoneFilled,
    MoreOutlined,
    ScheduleFilled,
    MailFilled,
} from '@ant-design/icons';
import './MappedBranches.css';
// import image //
import group_name_img from '../../assets/Group90162x.png'
const style = { background: '#0092ff', padding: '8px 0' };
const MappedBranches = () => {
    const [selectButtonOption, setSelectButtonOption] = useState(true);
    const [selectBtnOption, setSelectBtnOption] = useState(false);

    const selectButtonFunc = () => {
        setSelectButtonOption(true)
        setSelectBtnOption(false)
    }
    const selectBtnFunc = () => {
        setSelectButtonOption(false)
        setSelectBtnOption(true)
    }
    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    return (
        <div className="Mappedbranches">
            <div className="Mappedbranches-main-head">
                <div className="Mappedbranches-main-head1">
                    <p className="Mappedbranches-main-head2">Bank Branches</p>
                </div>
                <div>
                    <Button className="mapped-btn">All</Button>
                </div>

                {width > "769" ?
                    <div className="Mapped-head">
                        <h4 className="Mapped-heading">Region</h4><br />
                        <div className="Mappedbranches-buttons">
                            <div className="Mappedbranches-buttons-display">
                                <Row gutter={[40, 16]} >
                                    <Col span={6} order={1}>
                                        <div onClick={selectButtonFunc} className={selectButtonOption == true ? "mapped-button" : "mapped-btn2"} value={selectButtonOption}>
                                            <p className={selectButtonOption == true ? "Mappedbranches-tab-active-text-style" : "Mappedbranches-tab-text-style"}>
                                                <UserOutlined
                                                    rotate="0"
                                                    style={{
                                                        fontSize: "18px",
                                                        marginRight: "8px"
                                                    }} />
                                                Self
                                            </p>
                                        </div>
                                    </Col>
                                    <Col span={6} order={2}>
                                        <div onClick={selectBtnFunc} className={selectBtnOption == true ? "mapped-button" : "mapped-btn2"} >
                                            <p className={selectBtnOption == true ? "Mappedbranches-tab-active-text-style" : "Mappedbranches-tab-text-style"} >
                                                <UsergroupAddOutlined
                                                    rotate="0"
                                                    style={{
                                                        fontSize: "18px",
                                                        marginRight: "8px"
                                                    }} />
                                                Team
                                            </p>
                                        </div>
                                    </Col>
                                    <Col span={6} order={3}>
                                        <div>
                                            <select className="dropdown" >
                                                <option value="">Select</option>
                                                <option value="Mumbai Main">Mumbai Main</option>
                                                <option value="East">East</option>
                                                <option value="Mumbai 1">Mumbai 1</option>
                                                <option value="North 1">North 1</option>
                                                <option value="North 3">North 3</option>
                                                <option value="North 2">North 2</option>
                                                <option value="South 2">South 2</option>
                                                <option value="South 1">South 1</option>
                                                <option value="West 2">West 2</option>
                                                <option value="West 1">West 1</option>
                                            </select>
                                        </div>
                                    </Col>
                                    <Col span={6} order={4}>
                                        <div>
                                            <Button className="reset-btn">Reset</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <hr />
                        </div>
                    </div>
                    :
                    <div className="Mappedbranches-tab-mobile-view-box">
                        <Tabs>
                            <TabPane tab="Self" key="1"></TabPane>
                            <TabPane tab="Team" key="2"></TabPane>

                        </Tabs>
                    </div>
                }
                {selectButtonOption ?
                    <div className='mapped-main'>
                        <div className="Mappedbranches-content-area-style" >
                            <div className="Mappedbranches-card-flex">
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} sm={12} md={12}>
                                        <div className="Mappedbranches-card-style" >
                                            <div className="Mappedbranches-card-content-flex">
                                                <div className="Mappedbranches-card-top-content-flex">
                                                    <div className="Mappedbranches-card-top-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-content-flex">
                                                            <Avatar
                                                                style={{
                                                                    verticalAlign: 'middle',
                                                                    marginRight: "10px",
                                                                    marginTop: "3px"
                                                                }}
                                                                size="large"
                                                                src={<Image src={group_name_img} />}
                                                            >
                                                            </Avatar>
                                                            <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                                <p className="Mappedbranches-card-name-text-style">Axis</p>
                                                                <div className="Mappedbranches-card-id-row-flex">
                                                                    <p className="Mappedbranches-card-id-text-style">Branch:</p>
                                                                    <p className="Mappedbranches-card-id-number-text-style">Jaipur</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-id-text-style">Region:</p>
                                                                <p className="Mappedbranches-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card1-id-text-style">Cluster:</p>
                                                                <p className="Mappedbranches-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-card-icon-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <div className="Mappedbranches-popover-mainstyle">
                                                                <Popover placement="leftTop" className="Mappedbranches-popover-mainstyle"
                                                                    content={
                                                                        <div className="Mappedbranches-popover-main-flex">
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <ScheduleFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }} />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">create an event</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <MailFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style" >Mail</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <PhoneFilled
                                                                                    rotate="90"
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">Call</h6>
                                                                            </div>
                                                                        </div>
                                                                    } trigger="click">
                                                                    <MoreOutlined
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            marginTop: "15px",

                                                                        }}
                                                                    />
                                                                </Popover>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-bottom-content-flex" >
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-bottom-content-text-flex">
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <Button className="Mappedbranches-card-bottom-button-style">View</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-middle-content-flex">
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-middle-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">JUL 2021</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">Month</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">-</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% MTD YOY Growth</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% GWP Achieved</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Renewed Policy</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Retention GWP</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={12} md={12}>
                                        <div className="Mappedbranches-card-style" >
                                            <div className="Mappedbranches-card-content-flex">
                                                <div className="Mappedbranches-card-top-content-flex">
                                                    <div className="Mappedbranches-card-top-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-content-flex">
                                                            <Avatar
                                                                style={{
                                                                    verticalAlign: 'middle',
                                                                    marginRight: "10px",
                                                                    marginTop: "3px"
                                                                }}
                                                                size="large"
                                                                src={<Image src={group_name_img} />}
                                                            >
                                                            </Avatar>
                                                            <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                                <p className="Mappedbranches-card-name-text-style">Axis</p>
                                                                <div className="Mappedbranches-card-id-row-flex">
                                                                    <p className="Mappedbranches-card-id-text-style">Branch:</p>
                                                                    <p className="Mappedbranches-card-id-number-text-style">Jaipur</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-id-text-style">Region:</p>
                                                                <p className="Mappedbranches-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card1-id-text-style">Cluster:</p>
                                                                <p className="Mappedbranches-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-card-icon-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <div className="Mappedbranches-popover-mainstyle">
                                                                <Popover placement="leftTop" className="Mappedbranches-popover-mainstyle"
                                                                    content={
                                                                        <div className="Mappedbranches-popover-main-flex">
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <ScheduleFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }} />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">create an event</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <MailFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style" >Mail</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <PhoneFilled
                                                                                    rotate="90"
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">Call</h6>
                                                                            </div>
                                                                        </div>
                                                                    } trigger="click">
                                                                    <MoreOutlined
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            marginTop: "15px",

                                                                        }}
                                                                    />
                                                                </Popover>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-bottom-content-flex" >
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-bottom-content-text-flex">
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <Button className="Mappedbranches-card-bottom-button-style">View</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-middle-content-flex">
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-middle-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">JUL 2021</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">Month</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">-</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% MTD YOY Growth</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% GWP Achieved</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Renewed Policy</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Retention GWP</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={12} md={12}>
                                        <div className="Mappedbranches-card-style" >
                                            <div className="Mappedbranches-card-content-flex">
                                                <div className="Mappedbranches-card-top-content-flex">
                                                    <div className="Mappedbranches-card-top-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-content-flex">
                                                            <Avatar
                                                                style={{
                                                                    verticalAlign: 'middle',
                                                                    marginRight: "10px",
                                                                    marginTop: "3px"
                                                                }}
                                                                size="large"
                                                                src={<Image src={group_name_img} />}
                                                            >
                                                            </Avatar>
                                                            <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                                <p className="Mappedbranches-card-name-text-style">Axis</p>
                                                                <div className="Mappedbranches-card-id-row-flex">
                                                                    <p className="Mappedbranches-card-id-text-style">Branch:</p>
                                                                    <p className="Mappedbranches-card-id-number-text-style">Jaipur</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-id-text-style">Region:</p>
                                                                <p className="Mappedbranches-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card1-id-text-style">Cluster:</p>
                                                                <p className="Mappedbranches-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-card-icon-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <div className="Mappedbranches-popover-mainstyle">
                                                                <Popover placement="leftTop" className="Mappedbranches-popover-mainstyle"
                                                                    content={
                                                                        <div className="Mappedbranches-popover-main-flex">
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <ScheduleFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }} />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">create an event</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <MailFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style" >Mail</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <PhoneFilled
                                                                                    rotate="90"
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">Call</h6>
                                                                            </div>
                                                                        </div>
                                                                    } trigger="click">
                                                                    <MoreOutlined
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            marginTop: "15px",

                                                                        }}
                                                                    />
                                                                </Popover>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-bottom-content-flex" >
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-bottom-content-text-flex">
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <Button className="Mappedbranches-card-bottom-button-style">View</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-middle-content-flex">
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-middle-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">JUL 2021</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">Month</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">-</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% MTD YOY Growth</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% GWP Achieved</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Renewed Policy</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Retention GWP</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={12} md={12}>
                                        <div className="Mappedbranches-card-style" >
                                            <div className="Mappedbranches-card-content-flex">
                                                <div className="Mappedbranches-card-top-content-flex">
                                                    <div className="Mappedbranches-card-top-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-content-flex">
                                                            <Avatar
                                                                style={{
                                                                    verticalAlign: 'middle',
                                                                    marginRight: "10px",
                                                                    marginTop: "3px"
                                                                }}
                                                                size="large"
                                                                src={<Image src={group_name_img} />}
                                                            >
                                                            </Avatar>
                                                            <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                                <p className="Mappedbranches-card-name-text-style">Axis</p>
                                                                <div className="Mappedbranches-card-id-row-flex">
                                                                    <p className="Mappedbranches-card-id-text-style">Branch:</p>
                                                                    <p className="Mappedbranches-card-id-number-text-style">Jaipur</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-id-text-style">Region:</p>
                                                                <p className="Mappedbranches-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card1-id-text-style">Cluster:</p>
                                                                <p className="Mappedbranches-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-card-icon-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <div className="Mappedbranches-popover-mainstyle">
                                                                <Popover placement="leftTop" className="Mappedbranches-popover-mainstyle"
                                                                    content={
                                                                        <div className="Mappedbranches-popover-main-flex">
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <ScheduleFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }} />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">create an event</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <MailFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style" >Mail</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <PhoneFilled
                                                                                    rotate="90"
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">Call</h6>
                                                                            </div>
                                                                        </div>
                                                                    } trigger="click">
                                                                    <MoreOutlined
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            marginTop: "15px",

                                                                        }}
                                                                    />
                                                                </Popover>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-bottom-content-flex" >
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-bottom-content-text-flex">
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <Button className="Mappedbranches-card-bottom-button-style">View</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-middle-content-flex">
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-middle-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">JUL 2021</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">Month</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">-</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% MTD YOY Growth</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% GWP Achieved</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Renewed Policy</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Retention GWP</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </Col>

                                    <Col xs={24} sm={12} md={12}>
                                        <div className="Mappedbranches-card-style" >
                                            <div className="Mappedbranches-card-content-flex">
                                                <div className="Mappedbranches-card-top-content-flex">
                                                    <div className="Mappedbranches-card-top-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-content-flex">
                                                            <Avatar
                                                                style={{
                                                                    verticalAlign: 'middle',
                                                                    marginRight: "10px",
                                                                    marginTop: "3px"
                                                                }}
                                                                size="large"
                                                                src={<Image src={group_name_img} />}
                                                            >
                                                            </Avatar>
                                                            <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                                <p className="Mappedbranches-card-name-text-style">Axis</p>
                                                                <div className="Mappedbranches-card-id-row-flex">
                                                                    <p className="Mappedbranches-card-id-text-style">Branch:</p>
                                                                    <p className="Mappedbranches-card-id-number-text-style">Jaipur</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-id-text-style">Region:</p>
                                                                <p className="Mappedbranches-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card1-id-text-style">Cluster:</p>
                                                                <p className="Mappedbranches-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-card-icon-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <div className="Mappedbranches-popover-mainstyle">
                                                                <Popover placement="leftTop" className="Mappedbranches-popover-mainstyle"
                                                                    content={
                                                                        <div className="Mappedbranches-popover-main-flex">
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <ScheduleFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }} />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">create an event</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <MailFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style" >Mail</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <PhoneFilled
                                                                                    rotate="90"
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">Call</h6>
                                                                            </div>
                                                                        </div>
                                                                    } trigger="click">
                                                                    <MoreOutlined
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            marginTop: "15px",

                                                                        }}
                                                                    />
                                                                </Popover>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-bottom-content-flex" >
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-bottom-content-text-flex">
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <Button className="Mappedbranches-card-bottom-button-style">View</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-middle-content-flex">
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-middle-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">JUL 2021</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">Month</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">-</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% MTD YOY Growth</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% GWP Achieved</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Renewed Policy</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Retention GWP</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={12} md={12}>
                                        <div className="Mappedbranches-card-style" >
                                            <div className="Mappedbranches-card-content-flex">
                                                <div className="Mappedbranches-card-top-content-flex">
                                                    <div className="Mappedbranches-card-top-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-content-flex">
                                                            <Avatar
                                                                style={{
                                                                    verticalAlign: 'middle',
                                                                    marginRight: "10px",
                                                                    marginTop: "3px"
                                                                }}
                                                                size="large"
                                                                src={<Image src={group_name_img} />}
                                                            >
                                                            </Avatar>
                                                            <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                                <p className="Mappedbranches-card-name-text-style">Axis</p>
                                                                <div className="Mappedbranches-card-id-row-flex">
                                                                    <p className="Mappedbranches-card-id-text-style">Branch:</p>
                                                                    <p className="Mappedbranches-card-id-number-text-style">Jaipur</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-id-text-style">Region:</p>
                                                                <p className="Mappedbranches-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card1-id-text-style">Cluster:</p>
                                                                <p className="Mappedbranches-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-card-icon-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <div className="Mappedbranches-popover-mainstyle">
                                                                <Popover placement="leftTop" className="Mappedbranches-popover-mainstyle"
                                                                    content={
                                                                        <div className="Mappedbranches-popover-main-flex">
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <ScheduleFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }} />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">create an event</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <MailFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style" >Mail</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <PhoneFilled
                                                                                    rotate="90"
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">Call</h6>
                                                                            </div>
                                                                        </div>
                                                                    } trigger="click">
                                                                    <MoreOutlined
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            marginTop: "15px",

                                                                        }}
                                                                    />
                                                                </Popover>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-bottom-content-flex" >
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-bottom-content-text-flex">
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <Button className="Mappedbranches-card-bottom-button-style">View</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-middle-content-flex">
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-middle-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">JUL 2021</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">Month</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">-</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% MTD YOY Growth</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% GWP Achieved</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Renewed Policy</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Retention GWP</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={12} md={12}>
                                        <div className="Mappedbranches-card-style" >
                                            <div className="Mappedbranches-card-content-flex">
                                                <div className="Mappedbranches-card-top-content-flex">
                                                    <div className="Mappedbranches-card-top-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-content-flex">
                                                            <Avatar
                                                                style={{
                                                                    verticalAlign: 'middle',
                                                                    marginRight: "10px",
                                                                    marginTop: "3px"
                                                                }}
                                                                size="large"
                                                                src={<Image src={group_name_img} />}
                                                            >
                                                            </Avatar>
                                                            <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                                <p className="Mappedbranches-card-name-text-style">Axis</p>
                                                                <div className="Mappedbranches-card-id-row-flex">
                                                                    <p className="Mappedbranches-card-id-text-style">Branch:</p>
                                                                    <p className="Mappedbranches-card-id-number-text-style">Jaipur</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-id-text-style">Region:</p>
                                                                <p className="Mappedbranches-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card1-id-text-style">Cluster:</p>
                                                                <p className="Mappedbranches-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-card-icon-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <div className="Mappedbranches-popover-mainstyle">
                                                                <Popover placement="leftTop" className="Mappedbranches-popover-mainstyle"
                                                                    content={
                                                                        <div className="Mappedbranches-popover-main-flex">
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <ScheduleFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }} />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">create an event</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <MailFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style" >Mail</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <PhoneFilled
                                                                                    rotate="90"
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">Call</h6>
                                                                            </div>
                                                                        </div>
                                                                    } trigger="click">
                                                                    <MoreOutlined
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            marginTop: "15px",

                                                                        }}
                                                                    />
                                                                </Popover>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-bottom-content-flex" >
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-bottom-content-text-flex">
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <Button className="Mappedbranches-card-bottom-button-style">View</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-middle-content-flex">
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-middle-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">JUL 2021</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">Month</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">-</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% MTD YOY Growth</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% GWP Achieved</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Renewed Policy</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Retention GWP</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={12} md={12}>
                                        <div className="Mappedbranches-card-style" >
                                            <div className="Mappedbranches-card-content-flex">
                                                <div className="Mappedbranches-card-top-content-flex">
                                                    <div className="Mappedbranches-card-top-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-content-flex">
                                                            <Avatar
                                                                style={{
                                                                    verticalAlign: 'middle',
                                                                    marginRight: "10px",
                                                                    marginTop: "3px"
                                                                }}
                                                                size="large"
                                                                src={<Image src={group_name_img} />}
                                                            >
                                                            </Avatar>
                                                            <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                                <p className="Mappedbranches-card-name-text-style">Axis</p>
                                                                <div className="Mappedbranches-card-id-row-flex">
                                                                    <p className="Mappedbranches-card-id-text-style">Branch:</p>
                                                                    <p className="Mappedbranches-card-id-number-text-style">Jaipur</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-id-text-style">Region:</p>
                                                                <p className="Mappedbranches-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card1-id-text-style">Cluster:</p>
                                                                <p className="Mappedbranches-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-card-icon-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <div className="Mappedbranches-popover-mainstyle">
                                                                <Popover placement="leftTop" className="Mappedbranches-popover-mainstyle"
                                                                    content={
                                                                        <div className="Mappedbranches-popover-main-flex">
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <ScheduleFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }} />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">create an event</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <MailFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style" >Mail</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <PhoneFilled
                                                                                    rotate="90"
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">Call</h6>
                                                                            </div>
                                                                        </div>
                                                                    } trigger="click">
                                                                    <MoreOutlined
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            marginTop: "15px",

                                                                        }}
                                                                    />
                                                                </Popover>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-bottom-content-flex" >
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-bottom-content-text-flex">
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <Button className="Mappedbranches-card-bottom-button-style">View</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-middle-content-flex">
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-middle-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">JUL 2021</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">Month</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">-</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% MTD YOY Growth</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% GWP Achieved</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Renewed Policy</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Retention GWP</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='mapped-main'>
                        <div className="Mappedbranches-content-area-style" >
                            <div className="Mappedbranches-card-flex">
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} sm={12} md={12}>
                                        <div className="Mappedbranches-card-style" >
                                            <div className="Mappedbranches-card-content-flex">
                                                <div className="Mappedbranches-card-top-content-flex">
                                                    <div className="Mappedbranches-card-top-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-content-flex">
                                                            <Avatar
                                                                style={{
                                                                    verticalAlign: 'middle',
                                                                    marginRight: "10px",
                                                                    marginTop: "3px"
                                                                }}
                                                                size="large"
                                                                src={<Image src={group_name_img} />}
                                                            >
                                                            </Avatar>
                                                            <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                                <p className="Mappedbranches-card-name-text-style">Axis</p>
                                                                <div className="Mappedbranches-card-id-row-flex">
                                                                    <p className="Mappedbranches-card-id-text-style">Branch:</p>
                                                                    <p className="Mappedbranches-card-id-number-text-style">Jaipur</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-id-text-style">Region:</p>
                                                                <p className="Mappedbranches-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card1-id-text-style">Cluster:</p>
                                                                <p className="Mappedbranches-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-card-icon-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <div className="Mappedbranches-popover-mainstyle">
                                                                <Popover placement="leftTop" className="Mappedbranches-popover-mainstyle"
                                                                    content={
                                                                        <div className="Mappedbranches-popover-main-flex">
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <ScheduleFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }} />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">create an event</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <MailFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style" >Mail</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <PhoneFilled
                                                                                    rotate="90"
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">Call</h6>
                                                                            </div>
                                                                        </div>
                                                                    } trigger="click">
                                                                    <MoreOutlined
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            marginTop: "15px",

                                                                        }}
                                                                    />
                                                                </Popover>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-bottom-content-flex" >
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-bottom-content-text-flex">
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <Button className="Mappedbranches-card-bottom-button-style">View</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-middle-content-flex">
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-middle-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">JUL 2021</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">Month</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">-</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% MTD YOY Growth</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% GWP Achieved</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Renewed Policy</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Retention GWP</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={12} md={12}>
                                        <div className="Mappedbranches-card-style" >
                                            <div className="Mappedbranches-card-content-flex">
                                                <div className="Mappedbranches-card-top-content-flex">
                                                    <div className="Mappedbranches-card-top-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-content-flex">
                                                            <Avatar
                                                                style={{
                                                                    verticalAlign: 'middle',
                                                                    marginRight: "10px",
                                                                    marginTop: "3px"
                                                                }}
                                                                size="large"
                                                                src={<Image src={group_name_img} />}
                                                            >
                                                            </Avatar>
                                                            <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                                <p className="Mappedbranches-card-name-text-style">Axis</p>
                                                                <div className="Mappedbranches-card-id-row-flex">
                                                                    <p className="Mappedbranches-card-id-text-style">Branch:</p>
                                                                    <p className="Mappedbranches-card-id-number-text-style">Jaipur</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-id-text-style">Region:</p>
                                                                <p className="Mappedbranches-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card1-id-text-style">Cluster:</p>
                                                                <p className="Mappedbranches-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-card-icon-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <div className="Mappedbranches-popover-mainstyle">
                                                                <Popover placement="leftTop" className="Mappedbranches-popover-mainstyle"
                                                                    content={
                                                                        <div className="Mappedbranches-popover-main-flex">
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <ScheduleFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }} />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">create an event</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <MailFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style" >Mail</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <PhoneFilled
                                                                                    rotate="90"
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">Call</h6>
                                                                            </div>
                                                                        </div>
                                                                    } trigger="click">
                                                                    <MoreOutlined
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            marginTop: "15px",

                                                                        }}
                                                                    />
                                                                </Popover>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-bottom-content-flex" >
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-bottom-content-text-flex">
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <Button className="Mappedbranches-card-bottom-button-style">View</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-middle-content-flex">
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-middle-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">JUL 2021</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">Month</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">-</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% MTD YOY Growth</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% GWP Achieved</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Renewed Policy</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Retention GWP</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={12} md={12}>
                                        <div className="Mappedbranches-card-style" >
                                            <div className="Mappedbranches-card-content-flex">
                                                <div className="Mappedbranches-card-top-content-flex">
                                                    <div className="Mappedbranches-card-top-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-content-flex">
                                                            <Avatar
                                                                style={{
                                                                    verticalAlign: 'middle',
                                                                    marginRight: "10px",
                                                                    marginTop: "3px"
                                                                }}
                                                                size="large"
                                                                src={<Image src={group_name_img} />}
                                                            >
                                                            </Avatar>
                                                            <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                                <p className="Mappedbranches-card-name-text-style">Axis</p>
                                                                <div className="Mappedbranches-card-id-row-flex">
                                                                    <p className="Mappedbranches-card-id-text-style">Branch:</p>
                                                                    <p className="Mappedbranches-card-id-number-text-style">Jaipur</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-id-text-style">Region:</p>
                                                                <p className="Mappedbranches-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card1-id-text-style">Cluster:</p>
                                                                <p className="Mappedbranches-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-card-icon-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <div className="Mappedbranches-popover-mainstyle">
                                                                <Popover placement="leftTop" className="Mappedbranches-popover-mainstyle"
                                                                    content={
                                                                        <div className="Mappedbranches-popover-main-flex">
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <ScheduleFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }} />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">create an event</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <MailFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style" >Mail</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <PhoneFilled
                                                                                    rotate="90"
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">Call</h6>
                                                                            </div>
                                                                        </div>
                                                                    } trigger="click">
                                                                    <MoreOutlined
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            marginTop: "15px",

                                                                        }}
                                                                    />
                                                                </Popover>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-bottom-content-flex" >
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-bottom-content-text-flex">
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <Button className="Mappedbranches-card-bottom-button-style">View</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-middle-content-flex">
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-middle-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">JUL 2021</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">Month</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">-</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% MTD YOY Growth</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% GWP Achieved</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Renewed Policy</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Retention GWP</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={12} md={12}>
                                        <div className="Mappedbranches-card-style" >
                                            <div className="Mappedbranches-card-content-flex">
                                                <div className="Mappedbranches-card-top-content-flex">
                                                    <div className="Mappedbranches-card-top-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-content-flex">
                                                            <Avatar
                                                                style={{
                                                                    verticalAlign: 'middle',
                                                                    marginRight: "10px",
                                                                    marginTop: "3px"
                                                                }}
                                                                size="large"
                                                                src={<Image src={group_name_img} />}
                                                            >
                                                            </Avatar>
                                                            <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                                <p className="Mappedbranches-card-name-text-style">Axis</p>
                                                                <div className="Mappedbranches-card-id-row-flex">
                                                                    <p className="Mappedbranches-card-id-text-style">Branch:</p>
                                                                    <p className="Mappedbranches-card-id-number-text-style">Jaipur</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-id-text-style">Region:</p>
                                                                <p className="Mappedbranches-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card1-id-text-style">Cluster:</p>
                                                                <p className="Mappedbranches-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-card-icon-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <div className="Mappedbranches-popover-mainstyle">
                                                                <Popover placement="leftTop" className="Mappedbranches-popover-mainstyle"
                                                                    content={
                                                                        <div className="Mappedbranches-popover-main-flex">
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <ScheduleFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }} />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">create an event</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <MailFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style" >Mail</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <PhoneFilled
                                                                                    rotate="90"
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">Call</h6>
                                                                            </div>
                                                                        </div>
                                                                    } trigger="click">
                                                                    <MoreOutlined
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            marginTop: "15px",

                                                                        }}
                                                                    />
                                                                </Popover>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-bottom-content-flex" >
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-bottom-content-text-flex">
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <Button className="Mappedbranches-card-bottom-button-style">View</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-middle-content-flex">
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-middle-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">JUL 2021</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">Month</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">-</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% MTD YOY Growth</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% GWP Achieved</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Renewed Policy</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Retention GWP</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </Col>

                                    <Col xs={24} sm={12} md={12}>
                                        <div className="Mappedbranches-card-style" >
                                            <div className="Mappedbranches-card-content-flex">
                                                <div className="Mappedbranches-card-top-content-flex">
                                                    <div className="Mappedbranches-card-top-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-content-flex">
                                                            <Avatar
                                                                style={{
                                                                    verticalAlign: 'middle',
                                                                    marginRight: "10px",
                                                                    marginTop: "3px"
                                                                }}
                                                                size="large"
                                                                src={<Image src={group_name_img} />}
                                                            >
                                                            </Avatar>
                                                            <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                                <p className="Mappedbranches-card-name-text-style">Axis</p>
                                                                <div className="Mappedbranches-card-id-row-flex">
                                                                    <p className="Mappedbranches-card-id-text-style">Branch:</p>
                                                                    <p className="Mappedbranches-card-id-number-text-style">Jaipur</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-id-text-style">Region:</p>
                                                                <p className="Mappedbranches-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card1-id-text-style">Cluster:</p>
                                                                <p className="Mappedbranches-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-card-icon-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <div className="Mappedbranches-popover-mainstyle">
                                                                <Popover placement="leftTop" className="Mappedbranches-popover-mainstyle"
                                                                    content={
                                                                        <div className="Mappedbranches-popover-main-flex">
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <ScheduleFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }} />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">create an event</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <MailFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style" >Mail</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <PhoneFilled
                                                                                    rotate="90"
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">Call</h6>
                                                                            </div>
                                                                        </div>
                                                                    } trigger="click">
                                                                    <MoreOutlined
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            marginTop: "15px",

                                                                        }}
                                                                    />
                                                                </Popover>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-bottom-content-flex" >
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-bottom-content-text-flex">
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <Button className="Mappedbranches-card-bottom-button-style">View</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-middle-content-flex">
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-middle-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">JUL 2021</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">Month</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">-</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% MTD YOY Growth</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% GWP Achieved</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Renewed Policy</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Retention GWP</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={12} md={12}>
                                        <div className="Mappedbranches-card-style" >
                                            <div className="Mappedbranches-card-content-flex">
                                                <div className="Mappedbranches-card-top-content-flex">
                                                    <div className="Mappedbranches-card-top-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-content-flex">
                                                            <Avatar
                                                                style={{
                                                                    verticalAlign: 'middle',
                                                                    marginRight: "10px",
                                                                    marginTop: "3px"
                                                                }}
                                                                size="large"
                                                                src={<Image src={group_name_img} />}
                                                            >
                                                            </Avatar>
                                                            <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                                <p className="Mappedbranches-card-name-text-style">Axis</p>
                                                                <div className="Mappedbranches-card-id-row-flex">
                                                                    <p className="Mappedbranches-card-id-text-style">Branch:</p>
                                                                    <p className="Mappedbranches-card-id-number-text-style">Jaipur</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-id-text-style">Region:</p>
                                                                <p className="Mappedbranches-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card1-id-text-style">Cluster:</p>
                                                                <p className="Mappedbranches-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-card-icon-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <div className="Mappedbranches-popover-mainstyle">
                                                                <Popover placement="leftTop" className="Mappedbranches-popover-mainstyle"
                                                                    content={
                                                                        <div className="Mappedbranches-popover-main-flex">
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <ScheduleFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }} />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">create an event</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <MailFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style" >Mail</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <PhoneFilled
                                                                                    rotate="90"
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">Call</h6>
                                                                            </div>
                                                                        </div>
                                                                    } trigger="click">
                                                                    <MoreOutlined
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            marginTop: "15px",

                                                                        }}
                                                                    />
                                                                </Popover>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-bottom-content-flex" >
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-bottom-content-text-flex">
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <Button className="Mappedbranches-card-bottom-button-style">View</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-middle-content-flex">
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-middle-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">JUL 2021</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">Month</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">-</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% MTD YOY Growth</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% GWP Achieved</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Renewed Policy</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Retention GWP</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={12} md={12}>
                                        <div className="Mappedbranches-card-style" >
                                            <div className="Mappedbranches-card-content-flex">
                                                <div className="Mappedbranches-card-top-content-flex">
                                                    <div className="Mappedbranches-card-top-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-content-flex">
                                                            <Avatar
                                                                style={{
                                                                    verticalAlign: 'middle',
                                                                    marginRight: "10px",
                                                                    marginTop: "3px"
                                                                }}
                                                                size="large"
                                                                src={<Image src={group_name_img} />}
                                                            >
                                                            </Avatar>
                                                            <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                                <p className="Mappedbranches-card-name-text-style">Axis</p>
                                                                <div className="Mappedbranches-card-id-row-flex">
                                                                    <p className="Mappedbranches-card-id-text-style">Branch:</p>
                                                                    <p className="Mappedbranches-card-id-number-text-style">Jaipur</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-id-text-style">Region:</p>
                                                                <p className="Mappedbranches-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card1-id-text-style">Cluster:</p>
                                                                <p className="Mappedbranches-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-card-icon-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <div className="Mappedbranches-popover-mainstyle">
                                                                <Popover placement="leftTop" className="Mappedbranches-popover-mainstyle"
                                                                    content={
                                                                        <div className="Mappedbranches-popover-main-flex">
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <ScheduleFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }} />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">create an event</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <MailFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style" >Mail</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <PhoneFilled
                                                                                    rotate="90"
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">Call</h6>
                                                                            </div>
                                                                        </div>
                                                                    } trigger="click">
                                                                    <MoreOutlined
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            marginTop: "15px",

                                                                        }}
                                                                    />
                                                                </Popover>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-bottom-content-flex" >
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-bottom-content-text-flex">
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <Button className="Mappedbranches-card-bottom-button-style">View</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-middle-content-flex">
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-middle-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">JUL 2021</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">Month</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">-</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% MTD YOY Growth</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% GWP Achieved</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Renewed Policy</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Retention GWP</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={12} md={12}>
                                        <div className="Mappedbranches-card-style" >
                                            <div className="Mappedbranches-card-content-flex">
                                                <div className="Mappedbranches-card-top-content-flex">
                                                    <div className="Mappedbranches-card-top-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-content-flex">
                                                            <Avatar
                                                                style={{
                                                                    verticalAlign: 'middle',
                                                                    marginRight: "10px",
                                                                    marginTop: "3px"
                                                                }}
                                                                size="large"
                                                                src={<Image src={group_name_img} />}
                                                            >
                                                            </Avatar>
                                                            <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                                <p className="Mappedbranches-card-name-text-style">Axis</p>
                                                                <div className="Mappedbranches-card-id-row-flex">
                                                                    <p className="Mappedbranches-card-id-text-style">Branch:</p>
                                                                    <p className="Mappedbranches-card-id-number-text-style">Jaipur</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-id-text-style">Region:</p>
                                                                <p className="Mappedbranches-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card1-id-text-style">Cluster:</p>
                                                                <p className="Mappedbranches-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-card-icon-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <div className="Mappedbranches-popover-mainstyle">
                                                                <Popover placement="leftTop" className="Mappedbranches-popover-mainstyle"
                                                                    content={
                                                                        <div className="Mappedbranches-popover-main-flex">
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <ScheduleFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }} />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">create an event</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <MailFilled
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style" >Mail</h6>
                                                                            </div>
                                                                            <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                                            <div className="Mappedbranches-card-popover-icon-text-flex">
                                                                                <PhoneFilled
                                                                                    rotate="90"
                                                                                    style={{
                                                                                        fontSize: "18px",
                                                                                        marginRight: "6px"

                                                                                    }}
                                                                                />
                                                                                <h6 className="Mappedbranches-card-popover-text-style">Call</h6>
                                                                            </div>
                                                                        </div>
                                                                    } trigger="click">
                                                                    <MoreOutlined
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            marginTop: "15px",

                                                                        }}
                                                                    />
                                                                </Popover>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-bottom-content-flex" >
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-bottom-content-text-flex">
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <p className="Mappedbranches-card-bottom-para-style">-</p>
                                                        </div>
                                                        <div className="Mappedbranches-card-bottom-vertical-line-column-flex">
                                                            <div className="Mappedbranches-card-bottom-vertical-line-style"></div>
                                                            <Button className="Mappedbranches-card-bottom-button-style">View</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Mappedbranches-card-middle-content-flex">
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                    <div className="Mappedbranches-card-middle-content-text-flex">
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">JUL 2021</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">Month</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">-</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% MTD YOY Growth</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% GWP Achieved</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Renewed Policy</p>
                                                            </div>
                                                        </div>
                                                        <div className="Mappedbranches-card-top-avatar-name-column-flex">
                                                            <p className="Mappedbranches-card-id-text-style">0.000</p>
                                                            <div className="Mappedbranches-card-id-row-flex">
                                                                <p className="Mappedbranches-card-id-number-text-style">% Retention GWP</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Mappedbranches-card-middle-horizontal-line-style"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>

                }
            </div>

        </div >

    )
}

export default MappedBranches;