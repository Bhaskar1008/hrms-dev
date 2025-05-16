import React, { useState, useEffect } from 'react';
import './Blog.css';
import mainLogo from '../../images/logo_reverse.svg';
import blogImage2 from '../../images/single_blog_image_2@2x.png'
import blogImage1 from '../../images/single_blog_image_1@2x.png'
import blogImage3 from '../../images/single_blog_image_3@2x.png'
import blogImage1Background from '../../images/blog-1-header-background.png'
import whatsUp from '../../images/whats_app_FAB.png';
import LinkedIn from '../../images/LinkedIn_icon.svg';
import Twitter from '../../images/twitter_icon.svg';
import Facebook from '../../images/facebook_icon.svg';
import mail from '../../images/mail_outline_icon.svg';
import copy from '../../images/copy_link_icon.svg';
import { Modal, message, Button, Input, Select, Form } from 'antd';
import blog_one from '../../images/blog_one.png';
import blog_two from '../../images/blog_two.png';
import blog_three from '../../images/blog_three.png';
import letsConect from '../../images/lets_connect@2x.png';
import axios from '../../axios-common';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory, useLocation, } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Link } from 'react-router-dom';
import _ from 'lodash'
import moment from 'moment';
// import  useLocation  from 'react-router-dom';
const { Option } = Select;
const Blog = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.agent.blogs?.paginationResult)
    const {linkedIn,facebook,twitter} = useSelector((state) => state.agent.socialLinks)

    const [form] = Form.useForm();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState()
    const [mobile, setMobile] = useState()
    const [product, setProduct] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cblogId, setCblogId] = useState()
    const [activeBlog, setActiveBlog] = useState()
    const [agentId, setAgentId] = useState()

    const location = useLocation()
    useEffect(() => {
        setActiveBlog(location?.state?.blog)
        setAgentId(location?.state?.agentId)
        agentId && dispatch(actions.fetchBlogs(agentId,1))
        agentId && dispatch(actions.fetchAgentDetails(agentId))
    }, [location,agentId]);
    const payload = {
        user_id: "5df77d17009e273b39cae811",
        Product: product,
        firstName: firstName,
        lastName: lastName,
        primaryMobile: mobile,
        leadStatus: "newleadentery",
        lead_allocated_by: "5df77d17009e273b39cae811",
        lead_Owner_Id: "5df77d17009e273b39cae811",
        lead_Creator_Id: "5df77d17009e273b39cae811"
    }
    const onLetsConnect = () => {
        axios.post(`user/addlead`, payload).then(resp => {
            if (resp?.data?.statusCode === 9) {
                message.error(resp.data.data);
            }
            else if (resp?.data?.statusCode === -1) {
                message.success('Thanks for providing us the details. We will connect with you shortly.');
                form.resetFields();
            }

        }).catch(err => {
        })
    }
    const history = useHistory()
    const backToLanding = () => {
        history.push('/profile')
    }
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        axios.post(`user/addlead`, payload).then(resp => {
            if (resp?.data?.statusCode === 9) {
                message.error(resp.data.data);
            }
            else if (resp?.data?.statusCode === -1) {
                message.success('Thanks for providing us the details. We will connect with you shortly.');
                form.resetFields();
            }
        }).catch(err => {
        })
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    let blogCards = []
      if (!_.isEmpty(blogs)) {
        blogCards = _.map(blogs, (blog, index) => {

            return (
                <>
                    <div className="card">
                        <img src={blog?.blogImages[0]?.link} alt="blog1" />
                        <div className="cardCont">
                            <h4>{blog?.title}</h4>
                            <p>{blog?.content}</p>
                            <Link to={{
                                pathname: "/blog",
                                state: {
                                    blog:blog,
                                    agentId:agentId
                                }
                                }} 
                                // onClick={() => toSingleBlog(blog)}
                                >READ NOW</Link>
                        </div>
                    </div>
                </>
            )
        })
    }
    
    return (
        <>
            <div className="whatsapp">
                <a href="https://api.whatsapp.com/send/?phone=9167130251&text&app_absent=0" target="_blank">
                    <img src={whatsUp} alt="whatsapp" />
                </a>
            </div>
            <div className="container">
                <section className="maincon">
                    <div className="head">
                        <img src={mainLogo} />
                        <div className="options2">
                            <a href="https://d2cli.iorta.in/#/instantrenew" target="_blank">Instant Renewal</a>
                            <a href="https://d2cli.iorta.in/#/policytype" target="_blank">Claims</a>
                            <a href="https://d2cli.iorta.in/#/masterRaiseReq" target="_blank">Service</a>
                            <button className="primary" onClick={showModal} style={{ cursor: 'pointer' }}>LETS CONNECT</button>
                        </div>
                    </div>
                    <div className="profile">
                        <div className="titlecontent">
                            <Link to={`/profile?agent_id=${agentId}`}>
                                <p style={{ marginBottom: "40px", cursor: 'pointer' }} onClick={backToLanding}><LeftOutlined /> &nbsp;BACK TO HOME</p>
                            </Link>
                            <p style={{ marginBottom: "10px" }}>ARTICLE</p>
                            <h3>{activeBlog?.title}</h3>
                            {/* {cblogId === 1? <h3>5 Things You Did Not Know About Two<br/> Wheeler Insurance</h3>:''}
                        {cblogId === 2? <h3>Going For A Vacation. Here Are Five<br/> Reasons You Need Travel Insurance</h3>:''}
                        {cblogId === 3? <h3>Why every home need a Home<br/> Insurance?</h3>:''} */}
                            <p>{new Date( activeBlog?.publishedDate).toDateString()}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 5 min read</p>
                        </div>
                    </div>
                </section>

            </div>
            <div className="content">
                <img src={activeBlog?.blogImages[0]?.link} alt="log-banner" style={{ width: '100%', height: 'auto' }} />
                <div className="social sideSocial">
                    <span style={{ color: '#3E3E3E' }}>SHARE</span>
                    <br />
                    <a href={linkedIn}><img src={LinkedIn} alt="linkdIn-icon"/></a>
                    <br />
                    <a href={twitter}><img src={Twitter} alt="twitter-icon"/></a>
                    <br />
                    <a href={facebook}><img src={Facebook} alt="fb-icon"/></a>
                    <br />
                    <a href=""><img src={mail} alt="mail-icon"/></a>
                    <br />
                    <a href=""><img src={copy} alt="copy-icon"/></a>
                </div>
                <div className="blogcont">
                    <p style={{ marginBottom: '30px' }}>{activeBlog?.content}</p>
                </div>
            </div>
                <section className="section4" id="blog">
                    <h4>SIMILAR BLOG</h4>
                    <div className="cardsHolder">
                        {blogCards}
                        {/* <div className="card">
                            <img src={blog_one} alt="blog1" />
                            <div className="cardCont">
                                <h4>5 Things You Did Not Know About Two Wheeler Insurance</h4>
                                <p>Tata AIG General Insurance Company Limited’s Home Secure Supreme Is A Flexible Insurance Plan</p>
                                <a>READ NOW</a>
                            </div>
                        </div>
                        <div className="card">
                            <img src={blog_two} alt="blog2" />
                            <div className="cardCont">
                                <h4>Going For A Vacation. Here Are Five Reasons You Need Travel Insurance</h4>
                                <p>Tata AIG General Insurance Company Limited’s Home Secure Supreme Is A Flexible Travel Insurance Plan</p>
                                <a>READ NOW</a>
                            </div>
                        </div>
                        <div className="card">
                            <img src={blog_three} alt="blog3" />
                            <div className="cardCont">
                                <h4>Why every home need a Home Insurance?</h4>
                                <p>Tata AIG General Insurance Company Limited’s Home Secure Supreme Is A Flexible Home Insurance Plan</p>
                                <a>READ NOW</a>
                            </div>
                        </div> */}
                    </div>
                </section>
                <section className="section5">
                    <div style={{ width: "40%", marginTop: '-10px' }}>
                        <h4>LETS CONNECT</h4>
                        <h1>NOT SURE WHAT INSURANCE YOU NEED? WE CAN HELP.</h1>
                        <br />
                        <Form form={form} onFinish={onLetsConnect}>
                            <Form.Item
                                name="firstName"
                                rules={[
                                    {
                                        required: true,
                                        message: "First Name is Required"
                                    }
                                ]}>
                                <Input className="inputs" placeholder="Enter First Name" onChange={(e) => setFirstName(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                name="lastName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Last Name is Required"
                                    }
                                ]}>
                                <Input className="inputs" placeholder="Enter Last Name" onChange={(e) => setLastName(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                name="mobile"
                                rules={[
                                    {
                                        required: true,
                                        message: "Mobile is Required"
                                    },
                                    {
                                        min: 10,
                                        max: 10,
                                        pattern: '^([-]?[1-9][0-9]*|0)$',
                                        message: "Enter a Valid Mobile Number"
                                    }
                                ]}>
                                <Input className="inputs" placeholder="Enter Mobile" onChange={(e) => setMobile(e.target.value)} />
                            </Form.Item>
                            <Form.Item name="product" rules={[{ required: true, message: "Please select product" }]}>
                                <Select className="ant-select-selector inputs" placeholder="Select Product" onChange={setProduct} allowClear>
                                    <Option value="Health Insurance">Health Insurance</Option>
                                    <Option value="Motor Insurance">Motor Insurance</Option>
                                    <Option value="Travel Insurance">Travel Insurance</Option>
                                    <Option value="Personal Accident Insurance">Personal Accident Insurance</Option>
                                    <Option value="Other">Others</Option>
                                </Select>
                            </Form.Item>
                            {/* <Input className="inputs" placeholder="Intrested In" /> */}

                            <button style={{ borderRadius: "8px", cursor: 'pointer' }}
                                className="primary" htmlType="submit">LETS CONNECT</button>
                        </Form>
                    </div>
                    <div className="imagehld">
                        <img src={letsConect} width="100%" height="504px" style={{ float: "right", objectFit: "contain" }} />
                    </div>
                </section>
                <footer>
                    <div style={{ fontWeight: '300' }} className="social" >
                        &copy;2021 All Rights Reserved.
                    </div>
                    <div className="navigation social">
                        <a href="https://sdrestdemo.iorta.in/#/loginview" target="_blank" style={{ color: '#1CB3BC' }}>ADVISOR LOGIN</a>
                        <a href="#">TERMS OF USE</a>
                        <a href="#">PRIVACY POLICY</a>
                        <a href="#">LEGAL</a>
                    </div>
                </footer>
                    <div className="ContactUS" >
                        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}
                            cancelButtonProps={{
                                style: {
                                    display: "none",
                                },
                            }}>
                            <div>
                                <h2 style={{ color: '#0C5CAA', marginTop: '-12px', marginBottom: '10px !important' }}>Lets connect</h2>
                            </div>
                            <Form form={form} onFinish={handleOk} style={{ marginTop: '15px' }}>
                                <Form.Item
                                    name="firstName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "First Name is Required"
                                        }
                                    ]}>
                                    <Input className="inputs" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                                </Form.Item>
                                <Form.Item
                                    name="lastName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Last Name is Required"
                                        }
                                    ]}>
                                    <Input className="inputs" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                                </Form.Item>
                                <Form.Item
                                    name="mobile"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Mobile is Required"
                                        },
                                        {
                                            min: 10,
                                            max: 10,
                                            pattern: '^([-]?[1-9][0-9]*|0)$',
                                            message: "Enter a Valid Mobile Number"
                                        }
                                    ]}>
                                    <Input className="inputs" placeholder="Mobile" onChange={(e) => setMobile(e.target.value)} />
                                </Form.Item>
                                <Form.Item
                                    name="product"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Product is Required"
                                        }
                                    ]}>
                                    <Select className="ant-select-selector inputs" placeholder="Select Product" onChange={setProduct} allowClear>
                                        <Option value="Health Insurance">Health Insurance</Option>
                                        <Option value="Motor Insurance">Motor Insurance</Option>
                                        <Option value="Travel Insurance">Travel Insurance</Option>
                                        <Option value="Personal Accident Insurance">Personal Accident Insurance</Option>
                                        <Option value="Other">Others</Option>
                                    </Select>
                                </Form.Item>
                                <Button type="primary" style={{ backgroundColor: '#1CB3BC', border: 'none', borderRadius: '5px' }} htmlType="submit" size={'large'}>SUBMIT</Button>
                            </Form>
                            {/* <Input className="inputs" placeholder="Intrested In" /> */}
                        </Modal>
                    </div>
                </>
                )
}
                export default Blog;