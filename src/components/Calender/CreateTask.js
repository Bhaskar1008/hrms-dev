import React, { useState, useEffect, useCallback } from 'react'
import './CreateTask.css';
import { Row, Col,
    Divider, Typography, Button,
    Form, Avatar, Image, Popover,
    Checkbox, Pagination, Modal,
    Input, Space, DatePicker, Select }
    from 'antd';
import {
    UsergroupAddOutlined,
    UserOutlined,
    PlusOutlined,
    PhoneFilled,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
// import Calendar from 'react-calendar';
import { Calendar } from '@natscale/react-calendar';
import { AudioOutlined } from '@ant-design/icons';

// --- Import Image ---- //
import todoclock_img from '../../assets/todoclock.png'



const { Option } = Select;
const { Search } = Input;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
            backgroundColor: '#a4a8abfc'
        }}
    />
);
const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};
const { Title } = Typography;
const CreateTask = () => {
    const onSearch = value =>{}
    function onChange(e) {
    }

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
    const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);
    const [isDisplayModalVisible, setIsDisplayModalVisible] = useState(false);
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
    return (

        <div className="create-task-main">
            <Row gutter={[40, 24]} justify="center">
                <Col xs={{ order: 1 }} sm={16} md={16} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                    <Row gutter={['', 24]}>
                        <Col className="task" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                            <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col>
                                    <h3 className='task-head3'>To Do</h3>
                                </Col>
                                <Col >
                                    <div>
                                        <span className='event-name'>Create new Task  <Button className='event-btn' shape="circle" onClick={showModal}>
                                            <PlusOutlined
                                                rotate="0"
                                                style={{
                                                    fontSize: "12px",
                                                    fontSize: "12px"
                                                }} />
                                        </Button>
                                            <Modal
                                                className="Createtask-modal-style"
                                                title="To Do" style={{ fontWeight: "bold" }} visible={isJoinModalVisible} onOk={handleOk}
                                                footer={[
                                                    <Button onClick={handleCancel}></Button>,
                                                    <Button></Button>,
                                                ]}
                                                width="50%"
                                                bodyStyle={{
                                                    height: "auto",

                                                }}

                                            >
                                                <div className='div2'>
                                                    <h3 className='headtag3'>Add Team Member</h3>
                                                    <div>
                                                        <Search placeholder="Search by Name" onSearch={onSearch} style={{ width: 300, paddingTop: '1vw' }} />
                                                    </div>
                                                    <div className='note'>
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name="note"

                                                            hasFeedback
                                                            rules={[
                                                                {
                                                                    required: false,
                                                                    message: 'Please enter advisor code',
                                                                },
                                                            ]}
                                                        >
                                                            <Input className="first-name border-bottom" placeholder="What do you need to remember To Do"

                                                            />
                                                        </Form.Item>
                                                    </div>
                                                    <h3 className='headtag3'>Add Priority</h3>
                                                    <Row>
                                                        <Col span={4}>
                                                            <Button className="btn1">High</Button>
                                                        </Col>
                                                        <Col span={4}>
                                                            <Button className="btn2">Medium</Button></Col>
                                                        <Col span={4}>
                                                            <Button className="btn3">Low</Button>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col span={5}>
                                                            <h3 className='headtag3'>Set a Due Reminder</h3>
                                                        </Col>
                                                        <Col span={6}>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="dob"
                                                                // label="Date of Birth Of Life Assured"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Please select date',
                                                                    },
                                                                ]}
                                                            >
                                                                <DatePicker onChange={onChange} placeholder="mm/dd/yyyy" style={{ width: '10vw' }} />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={6}>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="time"
                                                                // label="Martial Status"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Please select time',
                                                                    },
                                                                ]}
                                                            >

                                                                <Select placeholder="Select" style={{ width: '10vw' }}>
                                                                    <Option value="Select">Select</Option>
                                                                    <Option value="12:00 AM">12:00 AM</Option>
                                                                    <Option value="12:30 AM">12:30 AM</Option>
                                                                    <Option value="1:00 AM">1:00 AM</Option>
                                                                    <Option value="1:30 AM">1:30 AM</Option>
                                                                    <Option value="2:00 AM">2:00 AM</Option>
                                                                    <Option value="2:30 AM">2:30 AM</Option>
                                                                    <Option value="3:00 AM">3:00 AM</Option>
                                                                    <Option value="3:30 AM">3:30 AM</Option>
                                                                    <Option value="4:00 AM">4:00 AM</Option>
                                                                    <Option value="4:30 AM">4:30 AM</Option>
                                                                    <Option value="5:00 AM">5:00 AM</Option>
                                                                    <Option value="5:30 AM">5:30 AM</Option>
                                                                    <Option value="6:00 AM">6:00 AM</Option>
                                                                    <Option value="6:30 AM">6:30 AM</Option>
                                                                    <Option value="7:00 AM">7:00 AM</Option>
                                                                    <Option value="7:30 AM">7:30 AM</Option>
                                                                    <Option value="8:00 AM">8:00 AM</Option>
                                                                    <Option value="8:30 AM">8:30 AM</Option>
                                                                </Select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={4}>
                                                            <Button className='save-btn'>Save</Button>
                                                        </Col>
                                                    </Row>

                                                </div>
                                            </Modal>
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                            <div className='createtask-hr' />
                            <div className="createtask-buttons">
                                <div className="createtask-buttons-display">
                                    <Row gutter={[120, 24]} >
                                        <Col span={6} order={1}>
                                            <div onClick={selectButtonFunc} className={selectButtonOption == true ? "createtask-button" : "createtask-btn2"} value={selectButtonOption}>
                                                <p className={selectButtonOption == true ? "createtask-tab-active-text-style" : "createtask-tab-text-style"}>
                                                    To Do
                                                </p>
                                            </div>
                                        </Col>
                                        <Col span={6} order={2}>
                                            <div onClick={selectBtnFunc} className={selectBtnOption == true ? "createtask-button" : "createtask-btn2"} >
                                                <p className={selectBtnOption == true ? "createtask-tab-active-text-style" : "createtask-tab-text-style"} >
                                                    Archive
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div><br />
                            {selectButtonOption ?
                                <div>
                                    <Row gutter={[16, 16]}>
                                        <Col xs={12} sm={12} md={12}>
                                            <div className="Createtask-card-style" >
                                                <div className="Createtask-card-content-flex">
                                                    <div className="Createtask-card-top-content-flex">
                                                        <div className="Createtask-card-top-content-text-flex">
                                                            <div className="Createtask-card-top-avatar-content-flex">
                                                                <Avatar
                                                                    style={{
                                                                        verticalAlign: 'middle',
                                                                        marginRight: "10px",
                                                                        marginTop: "3px"
                                                                    }}
                                                                    size="small"
                                                                    src={<Image src={todoclock_img} style={{ width: '15px', marginTop: '2px' }} />}
                                                                >
                                                                </Avatar>
                                                                <div className="Createtask-card-top-avatar-name-column-flex">
                                                                    {/* <p className="Createtask-card-name-text-style">Axis</p> */}
                                                                    <div className="Createtask-card-id-row-flex">
                                                                        <p className="Createtask-card-id-text-style">7:30 AM:</p>
                                                                        <p className="Createtask-card-id-number-text-style"> 04/20/2022</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className="Createtask-card-bottom-vertical-line-style"></div>
                                                        <div className="Createtask-card-top-avatar-name-column-flex">
                                                            <div className="Createtask-card-id-row-flex">
                                                                <p className="Createtask-cards-id-text-style">Region:</p>
                                                                <p className="Createtask-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Createtask-card-id-row-flex">
                                                                <p className="Createtask-card1-id-text-style">Cluster:</p>
                                                                <p className="Createtask-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Createtask-card-bottom-vertical-line-style"></div>
                                                        <div className="Createtask-card-top-avatar-name-column-flex">
                                                            <p className="Createtask-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Createtask-card-id-row-flex">
                                                                <p className="Createtask-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div> */}
                                                            <div className="Createtask-card-top-card-icon-flex">
                                                                {/* <div className="Createtask-card-bottom-vertical-line-style"></div> */}
                                                                <div className="Createtask-popover-mainstyle">
                                                                    <Popover placement="leftTop" className="Createtask-popover-mainstyle"
                                                                        content={
                                                                            <div className="Createtask-popover-main-flex">
                                                                                <div className="Createtask-card-popover-icon-text-flex">
                                                                                    <EditOutlined
                                                                                        style={{
                                                                                            fontSize: "18px",
                                                                                            marginRight: "6px"

                                                                                        }}  />
                                                                                    <Button className="Createtask-card-popover-text" onClick={displayModal}>Edit</Button>
                                                                                    <Modal
                                                                                        className="Createtask-modal-style"
                                                                                        title="To Do" style={{ fontWeight: "bold" }} visible={isDisplayModalVisible} onOk={handleOk}
                                                                                        footer={[
                                                                                            <Button onClick={handleCancel}></Button>,
                                                                                            <Button></Button>,
                                                                                        ]}
                                                                                        width="50%"
                                                                                        bodyStyle={{
                                                                                            height: "auto",

                                                                                        }}

                                                                                    >
                                                                                        <div className='div2'>
                                                                                            <h3 className='headtag3'>Add Team Member</h3>
                                                                                            <div>
                                                                                                <Search placeholder="Search by Name" onSearch={onSearch} style={{ width: 300, paddingTop: '1vw' }} />
                                                                                            </div>
                                                                                            <div className='note'>
                                                                                                <Form.Item
                                                                                                    {...formItemLayout}
                                                                                                    className="form-item-name label-color"
                                                                                                    name="note"

                                                                                                    hasFeedback
                                                                                                    rules={[
                                                                                                        {
                                                                                                            required: false,
                                                                                                            message: 'Please enter advisor code',
                                                                                                        },
                                                                                                    ]}
                                                                                                >
                                                                                                    <Input className="first-name border-bottom" placeholder="What do you need to remember To Do"

                                                                                                    />
                                                                                                </Form.Item>
                                                                                            </div>
                                                                                            <h3 className='headtag3'>Add Priority</h3>
                                                                                            <Row>
                                                                                                <Col span={4}>
                                                                                                    <Button className="btn1">High</Button>
                                                                                                </Col>
                                                                                                <Col span={4}>
                                                                                                    <Button className="btn2">Medium</Button></Col>
                                                                                                <Col span={4}>
                                                                                                    <Button className="btn3">Low</Button>
                                                                                                </Col>
                                                                                            </Row>

                                                                                            <Row>
                                                                                                <Col span={5}>
                                                                                                    <h3 className='headtag3'>Set a Due Reminder</h3>
                                                                                                </Col>
                                                                                                <Col span={6}>
                                                                                                    <Form.Item
                                                                                                        {...formItemLayout}
                                                                                                        className="form-item-name label-color"
                                                                                                        name="dob"
                                                                                                        // label="Date of Birth Of Life Assured"
                                                                                                        hasFeedback
                                                                                                        rules={[
                                                                                                            {
                                                                                                                required: false,
                                                                                                                message: 'Please select date',
                                                                                                            },
                                                                                                        ]}
                                                                                                    >
                                                                                                        <DatePicker onChange={onChange} placeholder="mm/dd/yyyy" style={{ width: '10vw' }} />
                                                                                                    </Form.Item>
                                                                                                </Col>
                                                                                                <Col span={6}>
                                                                                                    <Form.Item
                                                                                                        {...formItemLayout}
                                                                                                        className="form-item-name label-color"
                                                                                                        name="time"
                                                                                                        // label="Martial Status"
                                                                                                        hasFeedback
                                                                                                        rules={[
                                                                                                            {
                                                                                                                required: false,
                                                                                                                message: 'Please select time',
                                                                                                            },
                                                                                                        ]}
                                                                                                    >

                                                                                                        <Select placeholder="Select" style={{ width: '10vw' }}>
                                                                                                            <Option value="Select">Select</Option>
                                                                                                            <Option value="12:00 AM">12:00 AM</Option>
                                                                                                            <Option value="12:30 AM">12:30 AM</Option>
                                                                                                            <Option value="1:00 AM">1:00 AM</Option>
                                                                                                            <Option value="1:30 AM">1:30 AM</Option>
                                                                                                            <Option value="2:00 AM">2:00 AM</Option>
                                                                                                            <Option value="2:30 AM">2:30 AM</Option>
                                                                                                            <Option value="3:00 AM">3:00 AM</Option>
                                                                                                            <Option value="3:30 AM">3:30 AM</Option>
                                                                                                            <Option value="4:00 AM">4:00 AM</Option>
                                                                                                            <Option value="4:30 AM">4:30 AM</Option>
                                                                                                            <Option value="5:00 AM">5:00 AM</Option>
                                                                                                            <Option value="5:30 AM">5:30 AM</Option>
                                                                                                            <Option value="6:00 AM">6:00 AM</Option>
                                                                                                            <Option value="6:30 AM">6:30 AM</Option>
                                                                                                            <Option value="7:00 AM">7:00 AM</Option>
                                                                                                            <Option value="7:30 AM">7:30 AM</Option>
                                                                                                            <Option value="8:00 AM">8:00 AM</Option>
                                                                                                            <Option value="8:30 AM">8:30 AM</Option>
                                                                                                        </Select>
                                                                                                    </Form.Item>
                                                                                                </Col>
                                                                                                <Col span={4}>
                                                                                                    <Button className='save-btn'>Update</Button>
                                                                                                </Col>
                                                                                            </Row>

                                                                                        </div>
                                                                                    </Modal>
                                                                                </div>
                                                                                <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                                                <div className="Createtask-card-popover-icon-text-flex">
                                                                                    <DeleteOutlined
                                                                                        style={{
                                                                                            fontSize: "18px",
                                                                                            marginRight: "6px",

                                                                                        }}
                                                                                    />
                                                                                    <Button className="Createtask-card-popover-text" >Archive</Button>
                                                                                </div>
                                                                                <div className="Createtask-card-middle-horizontal-line-style"></div>
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

                                                    <div className="Createtask-card-middle-content-flex">
                                                        <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                        <div className="Createtask-card-middle-content-text-flex">
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <div className="Createtask-card-id-text-style">
                                                                    <Checkbox onChange={onChange} >
                                                                        <p className="checkbox">Tuesday</p> </Checkbox>
                                                                </div>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                    </div>
                                                    <div className="Createtask-card-bottom-content-flex" >
                                                        <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                        <div className="Createtask-card-bottom-content-text-flex">
                                                            <div className="Createtask-card-bottom-vertical-line-column-flex">
                                                                <p className="Createtask-card-bottom-text-style">Saurabh Sharma</p>
                                                            </div>
                                                            <div className="Createtask-card-bottom-vertical-line-column-flex">
                                                                <Button className="Createtask-card-bottom-button-style">Medium</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={12} md={12}>
                                            <div className="Createtask-card-style" >
                                                <div className="Createtask-card-content-flex">
                                                    <div className="Createtask-card-top-content-flex">
                                                        <div className="Createtask-card-top-content-text-flex">
                                                            <div className="Createtask-card-top-avatar-content-flex">
                                                                <Avatar
                                                                    style={{
                                                                        verticalAlign: 'middle',
                                                                        marginRight: "10px",
                                                                        marginTop: "3px"
                                                                    }}
                                                                    size="small"
                                                                    src={<Image src={todoclock_img} style={{ width: '15px', marginTop: '2px' }} />}
                                                                >
                                                                </Avatar>
                                                                <div className="Createtask-card-top-avatar-name-column-flex">
                                                                    {/* <p className="Createtask-card-name-text-style">Axis</p> */}
                                                                    <div className="Createtask-card-id-row-flex">
                                                                        <p className="Createtask-card-id-text">Overdue :</p>
                                                                        <p className="Createtask-card-id-numbers-text"> 5:00 AM : 04/04/2022</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className="Createtask-card-bottom-vertical-line-style"></div>
                                                        <div className="Createtask-card-top-avatar-name-column-flex">
                                                            <div className="Createtask-card-id-row-flex">
                                                                <p className="Createtask-cards-id-text-style">Region:</p>
                                                                <p className="Createtask-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Createtask-card-id-row-flex">
                                                                <p className="Createtask-card1-id-text-style">Cluster:</p>
                                                                <p className="Createtask-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Createtask-card-bottom-vertical-line-style"></div>
                                                        <div className="Createtask-card-top-avatar-name-column-flex">
                                                            <p className="Createtask-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Createtask-card-id-row-flex">
                                                                <p className="Createtask-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div> */}
                                                            <div className="Createtask-card-top-card-icon-flex">
                                                                {/* <div className="Createtask-card-bottom-vertical-line-style"></div> */}
                                                                <div className="Createtask-popover-mainstyle">
                                                                    <Popover placement="leftTop" className="Createtask-popover-mainstyle"
                                                                        content={
                                                                            <div className="Createtask-popover-main-flex">
                                                                                <div className="Createtask-card-popover-icon-text-flex">
                                                                                    <EditOutlined
                                                                                        style={{
                                                                                            fontSize: "18px",
                                                                                            marginRight: "6px"

                                                                                        }} />
                                                                                    <h6 className="Createtask-card-popover-text-style">Edit</h6>
                                                                                </div>
                                                                                <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                                                <div className="Createtask-card-popover-icon-text-flex">
                                                                                    <DeleteOutlined
                                                                                        style={{
                                                                                            fontSize: "18px",
                                                                                            marginRight: "6px",

                                                                                        }}
                                                                                    />
                                                                                    <h6 className="Createtask-card-popover-text-style" >Archive</h6>
                                                                                </div>
                                                                                <div className="Createtask-card-middle-horizontal-line-style"></div>
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

                                                    <div className="Createtask-card-middle-content-flex">
                                                        <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                        <div className="Createtask-card-middle-content-text-flex">
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <div className="Createtask-card-id-text-style">
                                                                    <Checkbox onChange={onChange} >
                                                                        <p className="checkbox">Hard Work</p> </Checkbox>
                                                                </div>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                    </div>
                                                    <div className="Createtask-card-bottom-content-flex" >
                                                        <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                        <div className="Createtask-card-bottom-content-text-flex">
                                                            <div className="Createtask-card-bottom-vertical-line-column-flex">
                                                                <p className="Createtask-card-bottom-para-style">Saurabh Sharma</p>
                                                            </div>
                                                            {/* <div className="Createtask-card-bottom-vertical-line-column-flex">
                                                        <div className="Createtask-card-bottom-vertical-line-style"></div>
                                                        <p className="Createtask-card-bottom-para-style">-</p>
                                                    </div> */}

                                                            <div className="Createtask-card-bottom-vertical-line-column-flex">
                                                                <Button className="Createtask-card-bottom-buttons-style">High</Button>
                                                            </div>
                                                            <div className="Createtask-card-bottom-vertical-line-column-flex">
                                                                {/* <div className="Createtask-card-bottom-vertical-line-style"></div> */}
                                                                <p className="Createtask-card-bottom-link-style">Show More</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={12} md={12}>
                                            <div className="Createtask-card-style" >
                                                <div className="Createtask-card-content-flex">
                                                    <div className="Createtask-card-top-content-flex">
                                                        <div className="Createtask-card-top-content-text-flex">
                                                            <div className="Createtask-card-top-avatar-content-flex">
                                                                <Avatar
                                                                    style={{
                                                                        verticalAlign: 'middle',
                                                                        marginRight: "10px",
                                                                        marginTop: "3px"
                                                                    }}
                                                                    size="small"
                                                                    src={<Image src={todoclock_img} style={{ width: '15px', marginTop: '2px' }} />}
                                                                >
                                                                </Avatar>
                                                                <div className="Createtask-card-top-avatar-name-column-flex">
                                                                    {/* <p className="Createtask-card-name-text-style">Axis</p> */}
                                                                    <div className="Createtask-card-id-row-flex">
                                                                        <p className="Createtask-card-id-text">Overdue :</p>
                                                                        <p className="Createtask-card-id-numbers-text"> 12:00 AM : 04/03/2022</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className="Createtask-card-bottom-vertical-line-style"></div>
                                                        <div className="Createtask-card-top-avatar-name-column-flex">
                                                            <div className="Createtask-card-id-row-flex">
                                                                <p className="Createtask-cards-id-text-style">Region:</p>
                                                                <p className="Createtask-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Createtask-card-id-row-flex">
                                                                <p className="Createtask-card1-id-text-style">Cluster:</p>
                                                                <p className="Createtask-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Createtask-card-bottom-vertical-line-style"></div>
                                                        <div className="Createtask-card-top-avatar-name-column-flex">
                                                            <p className="Createtask-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Createtask-card-id-row-flex">
                                                                <p className="Createtask-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div> */}
                                                            <div className="Createtask-card-top-card-icon-flex">
                                                                {/* <div className="Createtask-card-bottom-vertical-line-style"></div> */}
                                                                <div className="Createtask-popover-mainstyle">
                                                                    <Popover placement="leftTop" className="Createtask-popover-mainstyle"
                                                                        content={
                                                                            <div className="Createtask-popover-main-flex">
                                                                                <div className="Createtask-card-popover-icon-text-flex">
                                                                                    <EditOutlined
                                                                                        style={{
                                                                                            fontSize: "18px",
                                                                                            marginRight: "6px"

                                                                                        }} />
                                                                                    <h6 className="Createtask-card-popover-text-style">Edit</h6>
                                                                                </div>
                                                                                <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                                                <div className="Createtask-card-popover-icon-text-flex">
                                                                                    <DeleteOutlined
                                                                                        style={{
                                                                                            fontSize: "18px",
                                                                                            marginRight: "6px",

                                                                                        }}
                                                                                    />
                                                                                    <h6 className="Createtask-card-popover-text-style" >Archive</h6>
                                                                                </div>
                                                                                <div className="Createtask-card-middle-horizontal-line-style"></div>
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

                                                    <div className="Createtask-card-middle-content-flex">
                                                        <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                        <div className="Createtask-card-middle-content-text-flex">
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <div className="Createtask-card-id-text-style">
                                                                    <Checkbox onChange={onChange} >
                                                                        <p className="checkbox">Tata</p> </Checkbox>
                                                                </div>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                    </div>
                                                    <div className="Createtask-card-bottom-content-flex" >
                                                        <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                        <div className="Createtask-card-bottom-content-text-flex">
                                                            <div className="Createtask-card-bottom-vertical-line-column-flex">
                                                                <p className="Createtask-card-bottom-para-style">Saurabh Sharma</p>
                                                            </div>
                                                            {/* <div className="Createtask-card-bottom-vertical-line-column-flex">
                                                        <div className="Createtask-card-bottom-vertical-line-style"></div>
                                                        <p className="Createtask-card-bottom-para-style">-</p>
                                                    </div> */}

                                                            <div className="Createtask-card-bottom-vertical-line-column-flex">
                                                                <Button className="Createtask-card-bottom-button-style">Medium</Button>
                                                            </div>
                                                            <div className="Createtask-card-bottom-vertical-line-column-flex">
                                                                {/* <div className="Createtask-card-bottom-vertical-line-style"></div> */}
                                                                <p className="Createtask-card-bottom-link-style">Show More</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={12} md={12}>
                                            <div className="Createtask-card-style" >
                                                <div className="Createtask-card-content-flex">
                                                    <div className="Createtask-card-top-content-flex">
                                                        <div className="Createtask-card-top-content-text-flex">
                                                            <div className="Createtask-card-top-avatar-content-flex">
                                                                <Avatar
                                                                    style={{
                                                                        verticalAlign: 'middle',
                                                                        marginRight: "10px",
                                                                        marginTop: "3px"
                                                                    }}
                                                                    size="small"
                                                                    src={<Image src={todoclock_img} style={{ width: '15px', marginTop: '2px' }} />}
                                                                >
                                                                </Avatar>
                                                                <div className="Createtask-card-top-avatar-name-column-flex">
                                                                    {/* <p className="Createtask-card-name-text-style">Axis</p> */}
                                                                    <div className="Createtask-card-id-row-flex">
                                                                        <p className="Createtask-card-id-text">Overdue :</p>
                                                                        <p className="Createtask-card-id-numbers-text"> 9:00 AM : 03/30/2022</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className="Createtask-card-bottom-vertical-line-style"></div>
                                                        <div className="Createtask-card-top-avatar-name-column-flex">
                                                            <div className="Createtask-card-id-row-flex">
                                                                <p className="Createtask-cards-id-text-style">Region:</p>
                                                                <p className="Createtask-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Createtask-card-id-row-flex">
                                                                <p className="Createtask-card1-id-text-style">Cluster:</p>
                                                                <p className="Createtask-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Createtask-card-bottom-vertical-line-style"></div>
                                                        <div className="Createtask-card-top-avatar-name-column-flex">
                                                            <p className="Createtask-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Createtask-card-id-row-flex">
                                                                <p className="Createtask-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div> */}
                                                            <div className="Createtask-card-top-card-icon-flex">
                                                                {/* <div className="Createtask-card-bottom-vertical-line-style"></div> */}
                                                                <div className="Createtask-popover-mainstyle">
                                                                    <Popover placement="leftTop" className="Createtask-popover-mainstyle"
                                                                        content={
                                                                            <div className="Createtask-popover-main-flex">
                                                                                <div className="Createtask-card-popover-icon-text-flex">
                                                                                    <EditOutlined
                                                                                        style={{
                                                                                            fontSize: "18px",
                                                                                            marginRight: "6px"

                                                                                        }} />
                                                                                    <h6 className="Createtask-card-popover-text-style">Edit</h6>
                                                                                </div>
                                                                                <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                                                <div className="Createtask-card-popover-icon-text-flex">
                                                                                    <DeleteOutlined
                                                                                        style={{
                                                                                            fontSize: "18px",
                                                                                            marginRight: "6px",

                                                                                        }}
                                                                                    />
                                                                                    <h6 className="Createtask-card-popover-text-style" >Archive</h6>
                                                                                </div>
                                                                                <div className="Createtask-card-middle-horizontal-line-style"></div>
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

                                                    <div className="Createtask-card-middle-content-flex">
                                                        <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                        <div className="Createtask-card-middle-content-text-flex">
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <div className="Createtask-card-id-text-style">
                                                                    <Checkbox onChange={onChange} >
                                                                        <p className="checkbox">New Workkkk</p> </Checkbox>
                                                                </div>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                    </div>
                                                    <div className="Createtask-card-bottom-content-flex" >
                                                        <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                        <div className="Createtask-card-bottom-content-text-flex">
                                                            <div className="Createtask-card-bottom-vertical-line-column-flex">
                                                                <p className="Createtask-card-bottom-para-style">Saurabh Sharma</p>
                                                            </div>
                                                            {/* <div className="Createtask-card-bottom-vertical-line-column-flex">
                                                        <div className="Createtask-card-bottom-vertical-line-style"></div>
                                                        <p className="Createtask-card-bottom-para-style">-</p>
                                                    </div> */}

                                                            <div className="Createtask-card-bottom-vertical-line-column-flex">
                                                                <Button className="Createtask-card-bottom-button-style">Medium</Button>
                                                            </div>
                                                            <div className="Createtask-card-bottom-vertical-line-column-flex">
                                                                {/* <div className="Createtask-card-bottom-vertical-line-style"></div> */}
                                                                <p className="Createtask-card-bottom-link-style">Show More</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={12} md={12}>
                                            <div className="Createtask-card-style" >
                                                <div className="Createtask-card-content-flex">
                                                    <div className="Createtask-card-top-content-flex">
                                                        <div className="Createtask-card-top-content-text-flex">
                                                            <div className="Createtask-card-top-avatar-content-flex">
                                                                <Avatar
                                                                    style={{
                                                                        verticalAlign: 'middle',
                                                                        marginRight: "10px",
                                                                        marginTop: "3px"
                                                                    }}
                                                                    size="small"
                                                                    src={<Image src={todoclock_img} style={{ width: '15px', marginTop: '2px' }} />}
                                                                >
                                                                </Avatar>
                                                                <div className="Createtask-card-top-avatar-name-column-flex">
                                                                    {/* <p className="Createtask-card-name-text-style">Axis</p> */}
                                                                    <div className="Createtask-card-id-row-flex">
                                                                        <p className="Createtask-card-id-text">Overdue :</p>
                                                                        <p className="Createtask-card-id-numbers-text"> 6:30 AM : 03/30/2022</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className="Createtask-card-bottom-vertical-line-style"></div>
                                                        <div className="Createtask-card-top-avatar-name-column-flex">
                                                            <div className="Createtask-card-id-row-flex">
                                                                <p className="Createtask-cards-id-text-style">Region:</p>
                                                                <p className="Createtask-cards-id-number-text-style">North 1</p>
                                                            </div>
                                                            <div className="Createtask-card-id-row-flex">
                                                                <p className="Createtask-card1-id-text-style">Cluster:</p>
                                                                <p className="Createtask-card1-id-number-text-style">Strategic Br - Jaipur</p>
                                                            </div>
                                                        </div>
                                                        <div className="Createtask-card-bottom-vertical-line-style"></div>
                                                        <div className="Createtask-card-top-avatar-name-column-flex">
                                                            <p className="Createtask-card-id-text-style">Meeting Scheduled on</p>
                                                            <div className="Createtask-card-id-row-flex">
                                                                <p className="Createtask-cards-name-text-style">10/20/2021</p>
                                                            </div>
                                                        </div> */}
                                                            <div className="Createtask-card-top-card-icon-flex">
                                                                {/* <div className="Createtask-card-bottom-vertical-line-style"></div> */}
                                                                <div className="Createtask-popover-mainstyle">
                                                                    <Popover placement="leftTop" className="Createtask-popover-mainstyle"
                                                                        content={
                                                                            <div className="Createtask-popover-main-flex">
                                                                                <div className="Createtask-card-popover-icon-text-flex">
                                                                                    <EditOutlined
                                                                                        style={{
                                                                                            fontSize: "18px",
                                                                                            marginRight: "6px"

                                                                                        }} />
                                                                                    <h6 className="Createtask-card-popover-text-style">Edit</h6>
                                                                                </div>
                                                                                <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                                                <div className="Createtask-card-popover-icon-text-flex">
                                                                                    <DeleteOutlined
                                                                                        style={{
                                                                                            fontSize: "18px",
                                                                                            marginRight: "6px",

                                                                                        }}
                                                                                    />
                                                                                    <h6 className="Createtask-card-popover-text-style" >Archive</h6>
                                                                                </div>
                                                                                <div className="Createtask-card-middle-horizontal-line-style"></div>
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

                                                    <div className="Createtask-card-middle-content-flex">
                                                        <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                        <div className="Createtask-card-middle-content-text-flex">
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <div className="Createtask-card-id-text-style">
                                                                    <Checkbox onChange={onChange} >
                                                                        <p className="checkbox">New Work</p> </Checkbox>
                                                                </div>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                            <div className="Createtask-card-top-avatar-name-column-flex">
                                                                <p className="Createtask-card-id-text-style"></p>
                                                                <div className="Createtask-card-id-row-flex">
                                                                    <p className="Createtask-card-id-number-text-style"></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                    </div>
                                                    <div className="Createtask-card-bottom-content-flex" >
                                                        <div className="Createtask-card-middle-horizontal-line-style"></div>
                                                        <div className="Createtask-card-bottom-content-text-flex">
                                                            <div className="Createtask-card-bottom-vertical-line-column-flex">
                                                                <p className="Createtask-card-bottom-para-style">Saurabh Sharma</p>
                                                            </div>
                                                            {/* <div className="Createtask-card-bottom-vertical-line-column-flex">
                                                        <div className="Createtask-card-bottom-vertical-line-style"></div>
                                                        <p className="Createtask-card-bottom-para-style">-</p>
                                                    </div> */}

                                                            <div className="Createtask-card-bottom-vertical-line-column-flex">
                                                                <Button className="Createtask-card-bottom-button1-style">Low</Button>
                                                            </div>
                                                            <div className="Createtask-card-bottom-vertical-line-column-flex">
                                                                {/* <div className="Createtask-card-bottom-vertical-line-style"></div> */}
                                                                <p className="Createtask-card-bottom-link-style">Show More</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <div className='createtask-hr' />
                                        <div className='pagination'>
                                            <Pagination defaultCurrent={1} total={50} />
                                        </div>
                                    </Row>
                                </div>
                                :
                                <h1>hiii</h1>
                            }
                        </Col>

                    </Row>
                </Col>

            </Row>
        </div>

    )
}
export default CreateTask;