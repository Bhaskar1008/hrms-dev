import React, { useState } from 'react';
import { Row, Col, Form, Menu, Tabs, Typography, Button, Input, Radio, Select, Cascader, DatePicker, Space, Modal, Checkbox } from 'antd';
import { Upload, message } from 'antd';
import { Table, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import './AdvisorProfile.css';
const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};
const { Option } = Select;
const { Title } = Typography;
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    // (info) {
    //     if (info.file.status !== 'uploading') {
    //     }
    //     if (info.file.status === 'done') {
    //         message.success(`${info.file.name} file uploaded successfully`);
    //     } else if (info.file.status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //     }
    // },onChange
};
const setStateOptions = [

    { value: "Mr", label: "Passport" },
    { value: "Mrs", label: "Pan Card" },
    { value: "Ration Card", label: "Ration Card" },
    { value: "Dr", label: "Voter's Identity Card" },
    { value: "Prof", label: "Driving License" },
    { value: "", label: "Photo identity proof of Central or State government" },
    { value: "", label: "Letter from a recognized public authority or public servant" },
    { value: "", label: "Bank Pass Book bearing photograph" },
    { value: "", label: "Electricity Bill" },
    { value: "", label: "Telephone bill including mobile" },
    { value: "", label: "landline" },
    { value: "", label: "Bank Account Statement" },
    { value: "", label: "Consumer Gas connection card or Gas Bill" },
    { value: "", label: "Letter from any recognized public authority or public servant" },
    { value: "", label: "Credit Card Statement" }
]
const AdvisorProfile = () => {
    return (
        <div className="advisorprofile-main">
            <Row gutter={[40, 24]} justify="center">
                <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                    <Row gutter={['', 24]}>
                        <Col className="advisorprofile-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                            <Title className="bi-heading">Enter Details</Title><br />
                            <Form layout="horizontal" className="contact-detail-form">
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Name Of The User"
                                        hasFeedback
                                        style={{ width: '16vw' }}
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please enter name of user',
                                            },
                                        ]}
                                    >
                                        <Input className="first-name border-bottom" type="text" placeholder="Enter...." />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Branch"
                                        hasFeedback
                                        style={{ width: '16vw' }}
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please enter branch',
                                            },
                                        ]}
                                    >
                                        <Input className="first-name border-bottom" type="text" placeholder="Enter...." />
                                    </Form.Item>
                                </Col>
                                <Col >
                                <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Advisor Code"
                                        hasFeedback
                                        style={{ width: '16vw' }}
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please enter advisor code',
                                            },
                                        ]}
                                    >
                                        <Input className="first-name border-bottom" type="text" placeholder="Enter...." />
                                    </Form.Item>
                                </Col>
                                <Col >
                                <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Enter Reporting Manager"
                                        hasFeedback
                                        style={{ width: '16vw' }}
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please enter reporting manager',
                                            },
                                        ]}
                                    >
                                        <Input className="first-name border-bottom" type="text" placeholder="Enter...." />
                                    </Form.Item>
                                </Col>
                                <Col >
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Name Of Life  Assured"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please enter name of life assured',
                                            },
                                        ]}
                                    >
                                        <Input className="first-name border-bottom" placeholder="Test User" />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Gender Of Life Assured"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select gender of life assured',
                                            },
                                        ]}
                                    >
                                        <Radio.Group defaultValue="a">
                                            <Radio.Button value="a" className="radio">Male</Radio.Button>
                                            <Radio.Button value="b" className="radio">Female</Radio.Button>
                                            <Radio.Button value="c" className="radio">Other</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    {/* <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Date of Birth Of Life Assured"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select date of birth of life assured',
                                            },
                                        ]}
                                    >
                                        <DatePicker onChange={onChange} style={{ width: '28vw' }} />
                                    </Form.Item> */}
                                </Col>
                                <Col>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Martial Status"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select martial status',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Select Martial Status" style={{ width: '28vw' }}>
                                            <Option value="Select">Select</Option>
                                            <Option value="Single">Single</Option>
                                            <Option value="Married">Married</Option>
                                            <Option value="Divorced">Divorced</Option>
                                            <Option value="Widowed">Widowed</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Policy Term"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select policy term',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Select Policy Term" style={{ width: '28vw' }}>
                                            <Option value="Select">Select</Option>
                                            <Option value="5">5</Option>
                                            <Option value="10">10</Option>
                                            <Option value="15">15</Option>
                                            <Option value="20">20</Option>
                                            <Option value="25">25</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Premium Paying Term"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select premium paying term',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Select Premium Paying Term" style={{ width: '28vw' }}>
                                            <Option value="Select">Select</Option>
                                            <Option value="5">5</Option>
                                            <Option value="10">10</Option>
                                            <Option value="15">15</Option>
                                            <Option value="20">20</Option>
                                            <Option value="25">25</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Premium Mode"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select premium mode',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Yearly" style={{ width: '28vw' }}>
                                            <Option value="Select">Select</Option>
                                            <Option value="Yearly">Yearly</Option>
                                            <Option value="Half-Yearly">Half-Yearly</Option>
                                            <Option value="Quarterly">Quarterly</Option>
                                            <Option value="Monthly">Monthly</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Premium Type"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select premium type',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Regular" style={{ width: '28vw' }}>
                                            <Option value="Single">Single</Option>
                                            <Option value="Limited">Limited</Option>
                                            <Option value="Regular">Regular</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Sum Assured"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please enter sum assured',
                                            },
                                        ]}
                                    >
                                        <Input className="email border-bottom" type="number" placeholder="Enter SumAssured" />
                                    </Form.Item>
                                </Col>
                                <Col >
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Death Benefit Option"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select death benefit option',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Yearly" style={{ width: '28vw' }}>
                                            <Option value="Select">Select</Option>
                                            <Option value="Option1">Option 1</Option>
                                            <Option value="Option2">Option 2</Option>

                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Age Proof"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select age proof',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Regular" style={{ width: '28vw' }}>
                                            <Option value="Select">Select</Option>
                                            <Option value="Standard">Standard</Option>
                                            <Option value="Non-Standard">Non-Standard</Option>

                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Annuity Frequency"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select annuity frequency',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Yearly" style={{ width: '28vw' }}>
                                            <Option value="Select">Select</Option>
                                            <Option value="Yearly">Yearly</Option>
                                            <Option value="Half-Yearly">Half-Yearly</Option>
                                            <Option value="Quarterly">Quarterly</Option>
                                            <Option value="Monthly">Monthly</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Annuity Option"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select annuity option',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Regular" style={{ width: '28vw' }}>
                                            <Option value="Select">Select</Option>
                                            <Option value="Life Annunity">Life Annunity</Option>
                                            <Option value="Life Annunity with ROP">Life Annunity with ROP</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    {/* <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Do you want to add riders to this plan"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select riders plan',
                                            },
                                        ]}
                                    >
                                        <Radio.Group onChange={onChange} value={value}>
                                            <Radio value={1}>Yes</Radio>
                                            <Radio value={2}>No</Radio>
                                        </Radio.Group>
                                    </Form.Item> */}
                                </Col>
                                <Col></Col>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default AdvisorProfile;