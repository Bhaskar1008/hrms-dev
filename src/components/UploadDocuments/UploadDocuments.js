import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './UploadDocuments.css';
import { Row, Col, Form, Menu, Tabs, Typography, Button, Input, Radio, Select, Cascader, DatePicker, Space, Modal, Checkbox } from 'antd';
import { Divider, Image, Card } from 'antd';
import { Upload, message } from 'antd';
import { Table, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import MainTabs from '../../components/MainTabs/MainTabs'

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
const { Title } = Typography;
function onChange(date, dateString) {
}
const columns = [
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'name',

    },
    {
        title: 'Category & Type',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Document Status',
        dataIndex: 'address',
        key: 'address',
    },

    {
        title: 'Action',
        key: 'action',

    },
];
const props = {
    name: 'file',
    action: 'https://sdrestnode.iorta.in/secure/sd/user/upload_app_doc', 
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
const { Option } = Select;
const contentStyle = {
    height: '100px',
    color: '#fff',
};
const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};
// const setStateOptions = [

//     { value: "Mr", label: "Passport" },
//     { value: "Mrs", label: "Pan Card" },
//     { value: "Ration Card", label: "Ration Card" },
//     { value: "Dr", label: "Voter's Identity Card" },
//     { value: "Prof", label: "Driving License" },
//     { value: "", label: "Photo identity proof of Central or State government" },
//     { value: "", label: "Letter from a recognized public authority or public servant" },
//     { value: "", label: "Bank Pass Book bearing photograph" },
//     { value: "", label: "Electricity Bill" },
//     { value: "", label: "Telephone bill including mobile" },
//     { value: "", label: "landline" },
//     { value: "", label: "Bank Account Statement" },
//     { value: "", label: "Consumer Gas connection card or Gas Bill" },
//     { value: "", label: "Letter from any recognized public authority or public servant" },
//     { value: "", label: "Credit Card Statement" }
// ]


const UploadDocuments = () => {
    const [value, setValue] = React.useState(1);
    const [selectedFile, setSelectedFile] = useState();
        const [isFilePicked, setIsFilePicked] = useState(false);
        const [fileName, setFileName]=useState('')

    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");


        const selector = useSelector((state)=>state.applicationReducer.singleCardData)

//    const selectedFile={
//         active: "",
//         document_type: fileName,
//         fileName: "0a767c847ef95087ad822f229391554c3d49b68c",
//         fileType: "png",
//         location: "http://sdrestnode.pngiorta.in/0a767c847ef95087ad822f229391554c3d49b68c.",
//         document_status: true,
//         document_type: "UploadAddressProof",
//     }
	// const changeHandler = (event) => {
	// 	setSelectedFile(event.target.files[0]);
	// 	setIsFilePicked(true);
	// };

	// const handleSubmission = () => {
	// 	const formData = new FormData();

	// 	formData.append('File', selectedFile);

	// 	fetch(
	// 		'https://sdrestnode.iorta.in/secure/sd/user/upload_app_doc',
	// 		{
	// 			method: 'POST',
	// 			body: formData,
	// 		}
	// 	)
	// 		.then((response) => response.json())
	// 		.then((result) => {
	// 			console.log('Success:', result);
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error:', error);
	// 		});
	// };



    return (
        <div className="addressproof">
            <MainTabs
                tabMenu={tabMenu}
                // header="New Lead"
                activeKey="uploaddocuments"
            />
            <div className="addressProof-row-flex">
                <Tabs tabPosition={tabPosition} style={{ marginLeft: '1vw', marginRight: '1vw', marginTop: '1vw', backgroundColor: 'white', fontWeight: 'bolder' }}>
                    <TabPane tab="Address Proof" key="1" >
                        <div className="uploaddocuments-details-card-style ">
                            <div className="uploaddocuments-details-card-content-align">
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h3 className="addressproof-head3">Upload Address Proof</h3>
                                                <p className="addressproof-paragraph">Please select the document type you would like to upload for your Address Proof</p>
                                                <Col>
                                                    <Form layout="horizontal" className="contact-detail-form">
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="Select Document Type"
                                                                label="Select Document Type"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Select Document Type!',
                                                                    },
                                                                ]}
                                                            >
                                                                <select defaultValue={selector.documentUpload} placeholder="Passport"  className='select-input'>
                                                                    <option>Select</option>
                                                                    <option>Passport</option>
                                                                    <option>Pan Card</option>
                                                                    <option>Ration Card</option>
                                                                    <option>Voter's Identity Card</option>
                                                                    <option>Driving License</option>
                                                                    <option>Photo identity proof of Central or State government</option>
                                                                    <option>Letter from a recognized public authority or public servant</option>
                                                                    <option>Bank Pass Book bearing photograph</option>
                                                                    <option>Electricity Bill</option>
                                                                    <option>Telephone bill including mobile</option>
                                                                    <option>landline</option>
                                                                    <option>Bank Account Statement</option>
                                                                    <option>Consumer Gas connection card or Gas Bill</option>
                                                                    <option>Letter from any recognized public authority or public servant</option>
                                                                    <option>Credit Card Statement</option>
                                                                </select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['full', 'name']}
                                                                label="You can add multiple images for a document"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Upload {...props}>
                                                                    <Button className="addressproof-btn"  >Upload</Button>
                                                                </Upload>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <div className="box">Please ensure that that image you upload is clear and verifiable.</div>
                                                        </Col>
                                                    </Form>
                                                </Col>

                                                <Table
                                                    columns={columns}
                                                    pagination={{ pageSize: 50 }}
                                                    scroll={{ x: '150vw' }}
                                                    style={{ marginTop: '2vw' }}
                                                />

                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Button className="addressproof-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="addressproof-btn"  >Save</Button><br />
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
                    <TabPane tab="Photo Id" key="2" >
                        <div className="uploaddocuments-details-card-style ">
                            <div className="uploaddocuments-details-card-content-align">
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <h3 className="addressproof-head3">Upload Photo ID</h3>
                                                <p className="addressproof-paragraph">Please select the document type you would like to upload for your Address Proof</p>
                                                <Col>
                                                    <Form layout="horizontal" className="contact-detail-form">
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="Select Document Type"
                                                                label="Select Document Type"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Select Document Type!',
                                                                    },
                                                                ]}
                                                            >
                                                                <select defaultValue={selector.documentUpload} placeholder="Passport" className='select-input'>
                                                                    <option>Select</option>
                                                                    <option>Passport</option>
                                                                    <option>Pan Card</option>
                                                                    <option>Ration Card</option>
                                                                    <option>Voter's Identity Card</option>
                                                                    <option>Driving License</option>
                                                                    <option>Photo identity proof of Central or State government</option>
                                                                    <option>Letter from a recognized public authority or public servant</option>
                                                                    <option>Bank Pass Book bearing photograph</option>
                                                                    <option>Electricity Bill</option>
                                                                    <option>Telephone bill including mobile</option>
                                                                    <option>landline</option>
                                                                    <option>Bank Account Statement</option>
                                                                    <option>Consumer Gas connection card or Gas Bill</option>
                                                                    <option>Letter from any recognized public authority or public servant</option>
                                                                    <option>Credit Card Statement</option>
                                                                </select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['full', 'name']}
                                                                label="You can add multiple images for a document"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Upload {...props}>
                                                                    <Button className="addressproof-btn" >Upload</Button>
                                                                </Upload>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <div className="box">Please ensure that that image you upload is clear and verifiable.</div>
                                                        </Col>
                                                    </Form>
                                                </Col>
                                                <Table
                                                    columns={columns}
                                                    pagination={{ pageSize: 50 }}
                                                    scroll={{ x: '150vw' }}
                                                    style={{ marginTop: '2vw' }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                    <Col  >
                                                            <Button className="addressproof-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="addressproof-btn">Save</Button><br />
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
                    <TabPane tab="ID Proof" key="3" >
                        <div className="uploaddocuments-details-card-style ">
                            <div className="uploaddocuments-details-card-content-align">
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <h3 className="addressproof-head3">Upload ID Proof</h3>
                                                <p className="addressproof-paragraph">Please select the document type you would like to upload for your ID Proof</p>
                                                <Col>
                                                    <Form layout="horizontal" className="contact-detail-form">
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="Select Document Type"
                                                                label="Select Document Type"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Select Document Type!',
                                                                    },
                                                                ]}
                                                            >
                                                                <select defaultValue={selector.documentUpload} placeholder="Passport" className='select-input'>
                                                                    <option>Select</option>
                                                                    <option>Passport</option>
                                                                    <option>Pan Card</option>
                                                                    <option>Ration Card</option>
                                                                    <option>Voter's Identity Card</option>
                                                                    <option>Driving License</option>
                                                                    <option>Photo identity proof of Central or State government</option>
                                                                    <option>Letter from a recognized public authority or public servant</option>
                                                                    <option>Bank Pass Book bearing photograph</option>
                                                                    <option>Electricity Bill</option>
                                                                    <option>Telephone bill including mobile</option>
                                                                    <option>landline</option>
                                                                    <option>Bank Account Statement</option>
                                                                    <option>Consumer Gas connection card or Gas Bill</option>
                                                                    <option>Letter from any recognized public authority or public servant</option>
                                                                    <option>Credit Card Statement</option>
                                                                </select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['full', 'name']}
                                                                label="You can add multiple images for a document"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Upload {...props}>
                                                                    <Button className="addressproof-btn" >Upload</Button>
                                                                </Upload>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <div className="box">Please ensure that that image you upload is clear and verifiable.</div>
                                                        </Col>
                                                    </Form>
                                                </Col>
                                                <Table
                                                    columns={columns}
                                                    pagination={{ pageSize: 50 }}
                                                    scroll={{ x: '150vw' }}
                                                    style={{ marginTop: '2vw' }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                    <Col  >
                                                            <Button className="addressproof-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="addressproof-btn">Save</Button><br />
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
                    <TabPane tab="Income Proof" key="4" >
                        <div className="uploaddocuments-details-card-style ">
                            <div className="uploaddocuments-details-card-content-align">
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <h3 className="addressproof-head3">Upload Income Proof</h3>
                                                <p className="addressproof-paragraph">Please select the document type you would like to upload for your Income Proof</p>
                                                <Col>
                                                    <Form layout="horizontal" className="contact-detail-form">
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="Select Document Type"
                                                                label="Select Document Type"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Select Document Type!',
                                                                    },
                                                                ]}
                                                            >
                                                                 <select defaultValue={selector.documentUpload} placeholder="Passport" className='select-input'>
                                                                    <option>Select</option>
                                                                    <option>Passport</option>
                                                                    <option>Pan Card</option>
                                                                    <option>Ration Card</option>
                                                                    <option>Voter's Identity Card</option>
                                                                    <option>Driving License</option>
                                                                    <option>Photo identity proof of Central or State government</option>
                                                                    <option>Letter from a recognized public authority or public servant</option>
                                                                    <option>Bank Pass Book bearing photograph</option>
                                                                    <option>Electricity Bill</option>
                                                                    <option>Telephone bill including mobile</option>
                                                                    <option>landline</option>
                                                                    <option>Bank Account Statement</option>
                                                                    <option>Consumer Gas connection card or Gas Bill</option>
                                                                    <option>Letter from any recognized public authority or public servant</option>
                                                                    <option>Credit Card Statement</option>
                                                                </select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['full', 'name']}
                                                                label="You can add multiple images for a document"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Upload {...props}>
                                                                    <Button className="addressproof-btn" >Upload</Button>
                                                                </Upload>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <div className="box">Please ensure that that image you upload is clear and verifiable.</div>
                                                        </Col>
                                                    </Form>
                                                </Col>
                                                <Table
                                                    columns={columns}
                                                    pagination={{ pageSize: 50 }}
                                                    scroll={{ x: '150vw' }}
                                                    style={{ marginTop: '2vw' }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                    <Col  >
                                                            <Button className="addressproof-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="addressproof-btn">Save</Button><br />
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
                    <TabPane tab="Age Proof" key="5" >
                        <div className="uploaddocuments-details-card-style ">
                            <div className="uploaddocuments-details-card-content-align">
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <h3 className="addressproof-head3">Upload Age Proof</h3>
                                                <p className="addressproof-paragraph">Please select the document type you would like to upload for your Age Proof</p>
                                                <Col>
                                                    <Form layout="horizontal" className="contact-detail-form">
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="Select Document Type"
                                                                label="Select Document Type"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Select Document Type!',
                                                                    },
                                                                ]}
                                                            >
                                                                <select defaultValue={selector.documentUpload} placeholder="Passport" className='select-input'>
                                                                    <option>Select</option>
                                                                    <option>Passport</option>
                                                                    <option>Pan Card</option>
                                                                    <option>Ration Card</option>
                                                                    <option>Voter's Identity Card</option>
                                                                    <option>Driving License</option>
                                                                    <option>Photo identity proof of Central or State government</option>
                                                                    <option>Letter from a recognized public authority or public servant</option>
                                                                    <option>Bank Pass Book bearing photograph</option>
                                                                    <option>Electricity Bill</option>
                                                                    <option>Telephone bill including mobile</option>
                                                                    <option>landline</option>
                                                                    <option>Bank Account Statement</option>
                                                                    <option>Consumer Gas connection card or Gas Bill</option>
                                                                    <option>Letter from any recognized public authority or public servant</option>
                                                                    <option>Credit Card Statement</option>
                                                                </select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['full', 'name']}
                                                                label="You can add multiple images for a document"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Upload {...props}>
                                                                    <Button className="addressproof-btn" >Upload</Button>
                                                                </Upload>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <div className="box">Please ensure that that image you upload is clear and verifiable.</div>
                                                        </Col>
                                                    </Form>
                                                </Col>
                                                <Table
                                                    columns={columns}
                                                    pagination={{ pageSize: 50 }}
                                                    scroll={{ x: '150vw' }}
                                                    style={{ marginTop: '2vw' }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                    <Col  >
                                                            <Button className="addressproof-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="addressproof-btn">Save</Button><br />
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
                    <TabPane tab="Customer Declaration" key="6" >
                        <div className="uploaddocuments-details-card-style ">
                            <div className="uploaddocuments-details-card-content-align">
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <h3 className="addressproof-head3">Customer Declaration Capture</h3>
                                                <p className="addressproof-paragraph">Please select the document type you would like to upload for your Address Proof</p>
                                                <Col>
                                                    <Form layout="horizontal" className="contact-detail-form">
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="Select Document Type"
                                                                label="Select Document Type"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Select Document Type!',
                                                                    },
                                                                ]}
                                                            >
                                                                 <select defaultValue={selector.documentUpload} placeholder="Passport" className='select-input'>
                                                                    <option>Select</option>
                                                                    <option>Passport</option>
                                                                    <option>Pan Card</option>
                                                                    <option>Ration Card</option>
                                                                    <option>Voter's Identity Card</option>
                                                                    <option>Driving License</option>
                                                                    <option>Photo identity proof of Central or State government</option>
                                                                    <option>Letter from a recognized public authority or public servant</option>
                                                                    <option>Bank Pass Book bearing photograph</option>
                                                                    <option>Electricity Bill</option>
                                                                    <option>Telephone bill including mobile</option>
                                                                    <option>landline</option>
                                                                    <option>Bank Account Statement</option>
                                                                    <option>Consumer Gas connection card or Gas Bill</option>
                                                                    <option>Letter from any recognized public authority or public servant</option>
                                                                    <option>Credit Card Statement</option>
                                                                </select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['full', 'name']}
                                                                label="You can add multiple images for a document"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Upload {...props}>
                                                                    <Button className="addressproof-btn" >Upload</Button>
                                                                </Upload>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <div className="box">Please ensure that that image you upload is clear and verifiable.</div>
                                                        </Col>
                                                    </Form>
                                                </Col>
                                                <Table
                                                    columns={columns}
                                                    pagination={{ pageSize: 50 }}
                                                    scroll={{ x: '150vw' }}
                                                    style={{ marginTop: '2vw' }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                    <Col  >
                                                            <Button className="addressproof-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="addressproof-btnn">Save & Submit</Button><br />
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
export default UploadDocuments;