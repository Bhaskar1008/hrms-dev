import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Switch, Divider, Row, Col, Button, Popover } from 'antd'
import { MoreOutlined, ExclamationCircleOutlined, CalendarOutlined, MailFilled, PhoneFilled, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import '../LeadCards/LeadCard.css';
import './AdvisorCard.css'
import * as actions from '../../store/actions/index';
import { useHistory } from 'react-router-dom';

const LeadCard = React.memo((props) => {
    const {
        key,
        id,
        policyId,
        proposalType,
        proposalStatus,
        firstName,
        createdDate,
        submittedDate,
        primaryMobile
    } =props
    const dispatch = useDispatch()
    const history = useHistory()
    //     const {id,lead_Id,leadStatus,firstName,lastName,created_date,allocatedDate,primaryMobile,allocatedBy,allocatedTo,last_updated} = props

    const [width, setWidth] = useState(window.innerWidth);
    const [showMoreToggle, setShowMoreToggle] = useState(false);
    const breakpoint = 620;
    let avatar = firstName.match(/\b(\w)/g)
    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);

        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [width]);
    const showToggleHandler = () => {
        setShowMoreToggle(!showMoreToggle)
    }
    const updateHandler = (id) => {
        dispatch(actions.fetchLeadDetails(id))
        history.replace('/leadmasterpage/statuslead')
    }
    const text = <span>Title</span>;
    const content = (
        <Row>
            <Col span={6}>
                <CalendarOutlined style={{ fontSize: '16px', color: '#08c' }} />
            </Col>
            <Col span={18}>
                <p>Create an Event</p>
            </Col>
            <Col span={24}>
                <Divider className="popover-divider" />
            </Col>
            <Col span={6}>
                <MailFilled />
            </Col>
            <Col span={18}>
                <p>Mail</p>
            </Col>
            <Col span={24}>
                <Divider className="popover-divider" />
            </Col>
            <Col span={6}>
                <PhoneFilled />
            </Col>
            <Col span={18}>
                <p>Call</p>
            </Col>
        </Row>
    );
    // Card for desktop

    let card =
        // <Card
        //     // key={id}
        //     loading={props.loading}
        //     className="lead-card-desktop"
        //     hoverable={true}
        //     style={{ width: 610 }}>
        <Row className="advisor-card" align="top" justify="center">
            <Col span={2}>
                <Avatar
                    size={{ xl: 40 }}
                    style={{
                        color: '#ffffff',
                        backgroundColor: '#00ACC1',
                    }}
                >{avatar}</Avatar>
                {/* <Card.Grid hoverable={false} className="grid-style">
                        </Card.Grid> */}
            </Col>
            <Col span={12}>
                <p className="paragraph capitalize advisor-name font-bold">{firstName}</p>
                <p className="paragraph capitalize app-id-label font-bold">App ID <span className="app-id">{policyId}</span></p>
            </Col>
            <Col span={10}>
                <Row justify="center" align="middle">
                    <Col span={6}>
                        <Row justify="center" align="middle">
                            <Col span={4}>
                                <Divider className="divider" type="vertical" />
                            </Col>
                            <Col span={14} offset={6}>
                                <ExclamationCircleOutlined style={{ fontSize: '25px' }} />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={7}>
                        <Row justify="end" align="middle">
                            <Col span={4}>
                                <Divider className="divider" type="vertical" />
                            </Col>
                            <Col span={20}>
                                <p className="paragraph capitalize lead-status font-bold">{proposalStatus}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={9}>
                        <Row justify="end" align="middle">
                            <Col span={4}>
                                <Divider className="divider" type="vertical" />
                            </Col>
                            <Col span={20}>
                                <div className="lead-box">
                                    <p className="paragraph capitalize lead-agent font-bold">{proposalType}</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={2}>
                        <Row>
                            <Col span={4}>
                                <Divider className="divider" type="vertical" />
                            </Col>
                            <Col span={19} offset={1}>
                                <Popover placement="leftTop" content={content} trigger="click" style={{ width: '135px' }}>
                                    <MoreOutlined className="more-icon" style={{ fontSize: '30px', marginLeft: 'auto', fontWeight: 'bold' }} />
                                </Popover>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Divider className="middle-divider" />
            <Col span={24}>
                <Row justify="center" align="middle">
                    <Col span={18}>
                        <Row gutter={[16, 24]}>
                             {/* <Col span={8} >
                                <p className="paragraph adv-detail-label font-bold ">Created on</p>
                                <p className="paragraph adv-text">{created_date}</p>
                            </Col>
                            <Col span={8} >
                                <p className="paragraph adv-detail-label font-bold">Submitted on</p>
                                <p className="paragraph adv-text">{allocatedDate}</p>
                            </Col>
                            <Col span={8} >
                                <p className="paragraph adv-detail-label font-bold">Status Updated on</p>
                                <p className="paragraph adv-text">{last_updated}</p>
                            </Col> */}
                            <Col span={8} >
                                <p className="paragraph adv-detail-label font-bold">MObile No</p>
                                <p className="paragraph adv-text">{primaryMobile}</p>
                            </Col>
                            <Col span={8} >
                                <p className="paragraph adv-detail-label font-bold">Location</p>
                                <p className="paragraph adv-text">-</p>
                            </Col>
                            <Col span={8} >
                                <p className="paragraph adv-detail-label font-bold">Status</p>
                                <p className="paragraph adv-text">{proposalStatus}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={1}>
                        <Divider className="upd-divider" type="vertical" />
                    </Col>
                    <Col span={5} >
                        <Button className="adv-upd-btn"
                        // onClick={()=>updateHandler(id)}
                        >Update</Button>
                    </Col>
                </Row>
            </Col>
        </Row>

    // </Card>
    //Card for Mobile
    if (width < breakpoint) {
        card =
            <Row className="advisor-card" align="center">
                <Col span={2}>
                    <Avatar
                        size={{ xl: 40 }}
                        style={{
                            color: '#ffffff',
                            backgroundColor: '#00ACC1',
                        }}
                    >{avatar}</Avatar>
                    {/* <Card.Grid hoverable={false} className="grid-style">
                        </Card.Grid> */}
                </Col>
                <Col span={12}>
                    <p className="paragraph capitalize advisor-name font-bold">{firstName}</p>
                    <p className="paragraph capitalize app-id-label font-bold">App ID <span className="app-id">{policyId}</span></p>
                </Col>
                <Col span={10}>
                    <Row justify="center" align="middle">
                        <Col span={6}>
                            <Row justify="center" align="middle">
                                <Col span={4}>
                                    <Divider className="divider" type="vertical" />
                                </Col>
                                <Col span={14} offset={6}>
                                    <ExclamationCircleOutlined style={{ fontSize: '25px' }} />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={7}>
                            <Row justify="end" align="middle">
                                <Col span={4}>
                                    <Divider className="divider" type="vertical" />
                                </Col>
                                <Col span={20}>
                                    <p className="paragraph capitalize lead-status font-bold">{proposalStatus}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={9}>
                            <Row justify="end" align="middle">
                                <Col span={4}>
                                    <Divider className="divider" type="vertical" />
                                </Col>
                                <Col span={20}>
                                    <div className="lead-box">
                                        <p className="paragraph capitalize lead-agent font-bold">{proposalType}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={2}>
                            <Row>
                                <Col span={4}>
                                    <Divider className="divider" type="vertical" />
                                </Col>
                                <Col span={19} offset={1}>
                                    <Popover placement="leftTop" content={content} trigger="click" style={{ width: '135px' }}>
                                        <MoreOutlined className="more-icon" style={{ fontSize: '30px', marginLeft: 'auto', fontWeight: 'bold' }} />
                                    </Popover>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Divider className="middle-divider" />
                <Col span={24}>
                    <Row justify="center" align="middle">
                        <Col span={24}>
                            <Row gutter={[16, 24]}>
                                {/* <Col span={8} >
                                    <p className="paragraph adv-detail-label font-bold ">Created on</p>
                                    <p className="paragraph adv-text">{created_date}</p>
                                </Col>
                                <Col span={8} >
                                    <p className="paragraph adv-detail-label font-bold">Submitted on</p>
                                    <p className="paragraph adv-text">{allocatedDate}</p>
                                </Col>
                                <Col span={8} >
                                    <p className="paragraph adv-detail-label font-bold">Status Updated on</p>
                                    <p className="paragraph adv-text">{last_updated}</p>
                                </Col> */}
                                {showMoreToggle &&
                                    <>
                                        <Col span={8} >
                                            <p className="paragraph adv-detail-label font-bold">MObile No</p>
                                            <p className="paragraph adv-text">{primaryMobile}</p>
                                        </Col>
                                        <Col span={8} >
                                            <p className="paragraph adv-detail-label font-bold">Location</p>
                                            <p className="paragraph adv-text">-</p>
                                        </Col>
                                        <Col span={8} >
                                            <p className="paragraph adv-detail-label font-bold">Status</p>
                                            <p className="paragraph adv-text">{proposalStatus}</p>
                                        </Col>
                                    </>
                                }
                            </Row>
                        </Col>
                        <Col span={18} >
                            {!showMoreToggle ?
                                <Button
                                    className="adv-upd-btn show-toggle-btn"
                                    icon={<ArrowDownOutlined />}
                                    style={{boxShadow:'0 1px 3px 0 rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 2px 1px -1px rgb(0 0 0 / 12%)'}}
                                    onClick={showToggleHandler}
                                >Show More</Button>
                                :
                                <Button
                                    className="adv-upd-btn show-toggle-btn"
                                    icon={<ArrowUpOutlined />}
                                    onClick={showToggleHandler}
                                >Show Less</Button>
                            }
                        </Col>
                        <Col span={6} >
                            <Button className="adv-upd-btn"
                            // onClick={()=>updateHandler(id)}
                            >Update</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
    }
    return (
        <div
        // key={id}
        >
            {card}
        </div>

    )
})

export default LeadCard
