import React, { useState, useEffect } from 'react';
import './SalesPendency.css';
import { Row, Col, Typography, Divider, Card, Descriptions, Button, Carousel } from 'antd';
import { Select } from 'antd';
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment';
const contentStyle = {
    height: '230px',
    width: '100%',
    background: 'rgb(206, 160, 225)',
};
const { Option } = Select;
const { Title } = Typography;
const columns = [
    {
        title: 'Application No.',
        dataIndex: 'ApplicationNo',
    },
    {
        title: 'Policy Number',
        dataIndex: 'PolicyNumber',
    },
    {
        title: 'Branch Code',
        dataIndex: 'BranchCode',
    },
    {
        title: 'Premium Amount',
        dataIndex: 'PremiumAmount',
    },
    {
        title: 'Customer Name',
        dataIndex: 'CustomerName',
    },
    {
        title: 'Mobile Number',
        dataIndex: 'MobileNumber',
    },
    {
        title: 'E-Mail-Id',
        dataIndex: 'Emailid',
    },
    {
        title: 'Login Date',
        dataIndex: 'LoginDate',
    },
    {
        title: 'Sum Insured',
        dataIndex: 'SumInsured',
    },
    {
        title: 'Partner / Agent Name',
        dataIndex: 'PartnerAgentName',
    },
    {
        title: 'Type ',
        dataIndex: 'Type',
    },
    {
        title: 'Remarks',
        dataIndex: 'Remarks',
    },
    {
        title: 'Requirement Description',
        dataIndex: 'RequirementDescription',
    },
    {
        title: 'Date of File Update',
        dataIndex: 'DateofFileUpdate',
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <Button>Delete</Button>,
      },
];

const SalesPendency = () => {
    // const [testState, setTestState] = useState(true)
    // let { innerWidth: width, innerHeight: height } = window;
    const [selectRemarkOption, setSelectRemarkOption] = useState("");
    const [selectBusinessOption, setSelectBusinessOption] = useState("");
    const [fetchPendencyArr, setFetchPendencyArr] = useState([]);
    const [loading, setloading] = useState(true);
    const[resetArray,setResetArray]=useState([])

    const filterBusinessFunc = (e) => {
        setSelectBusinessOption(e.target.value)
    }
    const filterRemarkFunc = (e) => {
        setSelectRemarkOption(e.target.value)
    }

    useEffect(() => {
        getData();

    }, [selectBusinessOption, selectRemarkOption]);
    const getData = async () => {
        await axios.get("https://nodemanipalcigna.iorta.in/secure/sd/admin/fetchPendencyReport?BRMCode=82290")
            .then((res) => {
                setloading(false);
                setResetArray(res.data.data[0])
                setFetchPendencyArr(
                    res.data.data[0]
                        .filter(filArr => {
                            if (selectBusinessOption !== "") {
                                return filArr.bussinessType == selectBusinessOption
                            }
                            else if (selectRemarkOption !== "") {
                                return filArr.remarks == selectRemarkOption
                            }
                            else {
                                return filArr
                            }
                        })
                        .map(row => ({
                            ApplicationNo: row.applicationNo,
                            PolicyNumber: row.policyNumber,
                            BranchCode: row.branchCode,
                            PremiumAmount: row.PremiumAmount,
                            CustomerName: row.customerName,
                            MobileNumber: row.mobileNumber,
                            Emailid: row.emailAddress,
                            LoginDate: row.loginDate,
                            SumInsured: row.sumInsured,
                            PartnerAgentName: row.partner_slash_agent_name,
                            Type: row.bussinessType,
                            Remarks: row.remarks,
                            RequirementDescription: row.requirementDescription,
                            DateofFileUpdate: moment(row.updatedDate).format("DD-MM-YYYY")
                        }))

                );
            }
            );
    };
    function refreshPage() {
        window.location.reload(false);
   setFetchPendencyArr(resetArray)
    }
    return (
        // {width <= "375" ? <div className="tabs">
        // <Tabs defaultActiveKey="1" onChange={callback}>
        //     <TabPane tab="Upcoming" key="1"></TabPane>
        //     <TabPane tab="Recent" key="2"></TabPane>
        //     <TabPane tab="Later" key="3"></TabPane>
        // </Tabs></div> :
        <div className="wrapper">
            <Row type="flex" gutter={['', 24]}>
                <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                    <Row type="flex" gutter={['', 24]}>
                        <Col className="sales-pendency" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                            <div className="Card">
                                <div className="pendency-main">
                                    <Card style={contentStyle} >
                                        <h3 className="pendency-head3">BRM Code AB0005</h3><br />
                                        <Row gutter={[16, 16]}>
                                            <Col xs={24} sm={12} md={4}>
                                                <div >
                                                    <h4 className="pendency-head4">Filter by BusinessType</h4>
                                                    <select value={selectBusinessOption} style={{ width: 150, color: '#000', fontSize: '15px' }} bordered={false} onChange={filterBusinessFunc}>
                                                        <option value="">Select</option>
                                                        <option value="New Business">New Business</option>
                                                    </select>
                                                </div><hr />
                                            </Col>
                                            <Col xs={24} sm={12} md={4}>
                                                <div >
                                                    <h4 className="pendency-head4">Filter by Remark</h4>
                                                    <select value={selectRemarkOption} style={{ width: 150, color: '#000', fontSize: '15px' }} bordered={false} onChange={filterRemarkFunc}>
                                                        <option value="">Select</option>
                                                        <option value="Consent Pending-Sales">Consent Pending-Sales</option>
                                                    </select>
                                                </div><hr />
                                            </Col>
                                            <Col xs={24} sm={12} md={4}>
                                                <div >
                                                    <Button className="pendency-btn" shape="round" onClick={refreshPage}>Reset Filter</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                                <div>
                                    {loading ? (
                                        "Loading"
                                    ) : (
                                        <div className="wrapper">
                                        <Table
                                            columns={columns}
                                            dataSource={fetchPendencyArr}
                                            pagination={{ pageSize: 50 }}
                                            scroll={{ x: '150vw' }}
                                        />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default SalesPendency;