import { useEffect, useState } from 'react'
import AdvisorCard from './AdvisorCard'
import _ from "lodash";
import { Row, Col, Avatar, Card, Divider, Button, Pagination, Drawer, Form,Input,Select,Radio,Search } from 'antd'
import { FilterOutlined } from '@ant-design/icons';

import * as actions from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Tab from '../Tab/Tab'
import NoRecordsFound from '../NoRcordsFound/NoRecordsFound';
import '../LeadCards/LeadCards.css';
const LeadCards = (props) => {
    const {Option} = Select
    const {Search} = Input
    const statusOptions =[
        { value: 'Draft', label: 'Draft' },{ value: 'Sent to Dist Ops 1st level QC pending', label: 'Sent to Dist Ops 1st level QC pending' },
        { value: 'QC Discrepant', label: 'QC Discrepant' },{ value: 'Discrepancy Resolved', label: 'Discrepancy Resolved' },
        { value: 'QC Non-Discrepant', label: 'QC Non-Discrepant' },{ value: 'Candidate review pending', label: 'Candidate review pending' },
        { value: 'Profile rejected by candidate', label: 'Profile rejected by candidate' },{ value: 'Recruitment fees pending', label: 'Recruitment fees pending' },
        { value: 'Recruitment fees success', label: 'Recruitment fees success' },{ value: 'Training Receipt Generated', label: 'Training Receipt Generated' },
        { value: 'Training Completed', label: 'Training Completed' },{ value: 'Exam Failed', label: 'Exam Failed' },
        { value: 'Exam Passed', label: 'Exam Passed' },{ value: 'L2 QC Pending', label: 'L2 QC Pending' },
        { value: 'L2 QC Passed', label: 'L2 QC Passed' },{ value: 'L2 QC Failed', label: 'L2 QC Failed' },
        { value: 'E-acceptance Pending', label: 'E-acceptance Pending' },{ value: 'E-acceptance of agreement success', label: 'E-acceptance of agreement success' },
        { value: 'Agent Code Generation Pending', label: 'Agent Code Generation Pending' },{ value: 'Agent Onboarded', label: 'Agent Onboarded' },

    ]


    const dispatch = useDispatch()
    const totalLeads = useSelector((state) => {
        return state.advisor.count
    })
    const advisorListData = useSelector((state) => state.advisor.allAdvisorList)
    const allAdvisorListLoading = useSelector((state) => state.advisor.allAdvisorListLoading)
    const [width, setWidth] = useState(window.innerWidth);
    const [current, setcurrent] = useState(1)
    const [drawerVisible, setDrawerVisible] = useState()
    const [sortValue, setSortValue] = useState()
    const [seachTypeValue, setSearchTypeValue] = useState()
    const [seachTypePlaceHolder, setSearchTypePlaceHolder] = useState()
    const [searchText, setSearchText] = useState()
    const [applicationValue, setApplicationValue] = useState()
    const [statusValue, setStatusValue] = useState()


    const breakpoint = 620;

    useEffect(() => {
        dispatch(actions.fetchAdvisorList('', 'all', current))

        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);

        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [width, current, dispatch]);

    function itemRender(cur, type, originalElement) {
        const onPrev = () => {
            setcurrent(current - 1)
        }
        const onNext = () => {
            setcurrent(current + 1)
        }

        if (type === 'prev') {
            return <a current={current} onClick={onPrev} style={{ color: '#1D428A' }}>Prev</a>;
        }
        if (type === 'next') {
            return <a current={current} onClick={onNext} style={{ color: '#1D428A' }}>Next</a>;
        }
        return originalElement;
    }
    const handlePageClick = (page) => {
        setcurrent(page)
    }
    const filterVisibleStyle = {
        fontSize: '40px',
        color: 'rgb(1, 180, 187)',
        zIndex: '10000',
        position: 'fixed',
        bottom: '50px',
        right: '25px',
    }
    const filterHideStyle = {
        opacity: '0'
    }
    const filterHandler = () => {

        setDrawerVisible(true)
    };

    const onCloseDrawer = () => {
        setDrawerVisible(false)
    };

    const sortByHandler =(value)=>{
        setSortValue(value)
    }

    const searchTypeHandler =(event)=>{
        const val = event.target.value
        setSearchTypeValue(val)
        const placeholderText = `Search By  ${val}`

        setSearchTypePlaceHolder(placeholderText)

    }

    const tabMenu = [
        {
            id: 'all',
            value: "All"
        },
        {
            id: 'Draft',
            value: "Draft"
        },
        {
            id: 'Application',
            value: "Application"
        },
        {
            id: 'Recruited',
            value: "Recruited"
        },
        {
            id: 'Failed',
            value: "Failed"
        },

    ]
    let card = [];
    // if (allAdvisorListLoading) { return <NoRecordsFound /> }
    if (!_.isEmpty(advisorListData)) {
        card = _.map(advisorListData, (advisor, index) => {
            return (
                <>
                    <Col key={index} sm={18} md={18} lg={11} xl={10}>
                        <AdvisorCard
                            key={advisor._id}
                            id={advisor._id}
                            policyId={advisor.policyId}
                            proposalType={advisor.proposalType}
                            proposalStatus={advisor.proposalStatus}
                            firstName={advisor.CandidateName_as_per_PAN}
                            // lastName={advisor.lastName}
                            createdDate={advisor.createdDate}
                            submittedDate={advisor.allocatedDate}
                            primaryMobile={advisor.Mobile_No}
                        // allocatedBy={lead.lead_allocated_by === null ? '' : lead.lead_allocated_by.first_name + ' ' + lead.lead_allocated_by.last_name}
                        // allocatedTo={lead.lead_allocated_by === null ? '' : lead.lead_allocated_by.first_name + ' ' + lead.lead_allocated_by.last_name}
                        // appointmentOn={lead?.appointmentId?.start_date}
                        // loading={props.leadDataLoading}
                        />
                    </Col>
                </>
            )
        })
    }
    return (
        <>
            <Tab
                tabMenu={tabMenu}
                header="Recruitment Applications"
            // current={current}
            />
            <div className="cards-container">
                <Row justify="center" gutter={[18, { xs: 8, sm: 10, md: 10, lg: 18 }]}>
                    {/* {card} */}
                    {/* this is just a presentational card  */}
                    <Col sm={18} md={18} lg={11} xl={10} className={width < breakpoint ? "dummy-card-mobile" : 'dummy-card-desktop'} >
                        <  >
                            <Row className="advisor-card" align="top" justify="center">
                                <Col span={2}>
                                    <Avatar
                                        size={{ xl: 40 }}
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#00ACC1',
                                        }}
                                    >AV</Avatar>
                                    {/* <Card.Grid hoverable={false} className="grid-style">
                        </Card.Grid> */}
                                </Col>
                                <Col span={12}>
                                    <p className="paragraph capitalize advisor-name font-bold">Azim Shaikh</p>
                                    <p className="paragraph capitalize app-id-label font-bold">App ID <span className="app-id">AGIN_202111_000420</span></p>
                                </Col>
                                <Col span={10}>
                                    <Row justify="center" align="middle">
                                        <Col span={6}>
                                            <Row justify="center" align="middle">
                                                <Col span={4}>
                                                    <Divider className="divider" type="vertical" />
                                                </Col>
                                                <Col span={14} offset={6}>
                                                    {/* <ExclamationCircleOutlined style={{ fontSize: '25px' }} /> */}
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={7}>
                                            <Row justify="end" align="middle">
                                                <Col span={4}>
                                                    <Divider className="divider" type="vertical" />
                                                </Col>
                                                <Col span={20}>
                                                    <p className="paragraph capitalize lead-status font-bold">Failed</p>
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
                                                        <p className="paragraph capitalize lead-agent font-bold">AGENT</p>
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
                                                    {/* <Popover placement="leftTop" content={content} trigger="click" style={{ width: '135px' }}>
                                    <MoreOutlined className="more-icon" style={{ fontSize: '30px', marginLeft: 'auto', fontWeight: 'bold' }} />
                                </Popover> */}
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
                                                <Col span={8} >
                                                    <p className="paragraph adv-detail-label font-bold ">Created on</p>
                                                    <p className="paragraph adv-text">Date</p>
                                                </Col>
                                                <Col span={8} >
                                                    <p className="paragraph adv-detail-label font-bold">Submitted on</p>
                                                    <p className="paragraph adv-text">Date</p>
                                                </Col>
                                                <Col span={8} >
                                                    <p className="paragraph adv-detail-label font-bold">Status Updated on</p>
                                                    <p className="paragraph adv-text">Date</p>
                                                </Col>
                                                <Col span={8} >
                                                    <p className="paragraph adv-detail-label font-bold">MObile No</p>
                                                    <p className="paragraph adv-text">Date</p>
                                                </Col>
                                                <Col span={8} >
                                                    <p className="paragraph adv-detail-label font-bold">Location</p>
                                                    <p className="paragraph adv-text">Date</p>
                                                </Col>
                                                <Col span={8} >
                                                    <p className="paragraph adv-detail-label font-bold">Status</p>
                                                    <p className="paragraph adv-text">Date</p>
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
                        </>
                    </Col>
                </Row>
            </div>
            <FilterOutlined style={!drawerVisible ? filterVisibleStyle : filterHideStyle} onClick={filterHandler} />
            <div className="page-holder">
                <Pagination
                    responsive
                    current={current}
                    onChange={handlePageClick}
                    total={totalLeads}
                    defaultPageSize={15}
                    itemRender={itemRender} />
            </div>
            <Drawer
                title="Select Filter"
                placement="right"
                width={420}
                closable={true}
                onClose={onCloseDrawer}
                visible={drawerVisible}
                getContainer={false}
                style={{ position: 'absolute' }}
            >
                <Form>
                    <Row >
                        <Col span={24}>
                            <h3>Sort By</h3>
                        </Col>
                        <Col span={24}>
                            <Form.Item

                            >
                                <Select
                                    size="large"
                                    placeholder="Sort By"
                                    onChange={sortByHandler}
                                >
                                    <Option value="created_date_old">Application Created date - Newest to oldest</Option>
                                    <Option value="created_date_new">Application Created date - Oldest to Newest</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            <h3>Search Type Selection</h3>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="Search By Selection"
                            >
                                 <Radio.Group
                                        size='large'
                                        onChange={searchTypeHandler}
                                    >
                                        <Radio.Button value="Name">Name</Radio.Button>
                                        <Radio.Button value="Mobile">Mobile</Radio.Button>
                                        <Radio.Button value="Application ID">Application ID</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                // label={seachTypeValue}
                                // placeholder={SeachTypeValue}

                            >
                                <Search
                                    placeholder={seachTypePlaceHolder}
                                    // onSearch={onSearch}
                                    style={{ width: "100%" }} />
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            <h3>Filter By</h3>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            >
                                <Select
                                    size="large"
                                    placeholder="Application Type"
                                    // onChange={applicationTypeHandler}
                                >
                                    <Option value="posp">POSP</Option>
                                    <Option value="agent">Agent</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            >
                                <Select
                                    // value={insurer}
                                    size="large"
                                    options={statusOptions}
                                    placeholder="Status"
                                    // onChange={statusHandler}

                                >

                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            <Button
                                type="primary"
                                // style={{backgroundColor:'#3b371e'}}
                                >Apply</Button>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}

export default LeadCards
