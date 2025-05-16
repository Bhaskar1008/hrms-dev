import React, {useState} from 'react'
import { Row, Col, Button, Radio, Card, Select, Option, Form, Progress, Input } from 'antd'
import './PolicyType.css'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const PolicyType = () => {

    const formItemLayout = {
        labelCol: {
          span: 24,
        },
        wrapperCol: {
          span: 24,
        },
      };

    const [size, setSize] = useState('default'); // default is 'middle'
    const [value, setValue] = useState('individual');
    const [value1, setValue1] = useState('yes');
    const { Option } = Select;
    const [policyGroup, setPolicyGroup] = useState("")
    const [contractNumber, setContractNumber] = useState("")
    const [subcontractNumber, setSubcontractNumber] = useState("")
    

    const onChange = (e) => {
      setValue(e.target.value);
    };
    const onChange1 = (e) => {
        setValue1(e.target.value);
      };


    const policyGroupOption = [
        {label: "Policy Group 1", value: "PG1"},
        {label: "Policy Group 2", value: "PG2"},
        {label: "Policy Group 3", value: "PG3"},
    ]

    const policyContractNumber = [
        {label: "Contract", value: "contract"},
    ]

    const subContractNumberOption = [
        {label: "Sub-Contract", value: "subcontract"},
    ]

    const onChangePolicy = (value) =>{
        setPolicyGroup(value)
    }

    const onChangeContractNumber = (value) =>{
        setContractNumber(value)
    }

    const onChangeSubcontractNumber = (value) =>{
        setSubcontractNumber(value)
    }

    
      
  return (
    <>
    <div className='main-class'>
        <Row gutter={16}>
        <Col
              xs={24}
                 sm={24}
                 md={6}
                 lg={6}
                 xl={6}
              
            >
                <div className='policy-header'>
                  <Button className='dashboard-button' icon={ <ArrowLeftOutlined />} size={size}> Back to Dashboard </Button>
                </div>

                <div className='sidebar'>
                {/* <Progress percent={50} showInfo={false} /> */}
                    <ul>
                        <li><span style={{color: '#4AC6BB'}}>1</span> Vehicle Type</li>
                        <li><span style={{color: '#4AC6BB'}}>2</span> Confirmation</li>
                    </ul>
                </div>
            </Col>

            <Col
                 xs={24}
                 sm={24}
                 md={14}
                 lg={14}
                 xl={14}
                
                >
                {/* <div className='head-point'>
                    <h3>Almost there! Just need a few more details</h3>
                </div>
                <div className='userinfo'>
                    <h3 style={{display: 'flex'}}>I am <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    rules={[
                      {
                        required: false,
                        message: "Policy Group",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}> <Input placeholder='Name' style={{border: 'none', borderBottom: '1px solid gray', marginLeft: '5px', marginRight: '5px'}}/> </Form.Item>, you can</h3>
                    <h3> contact me at</h3>
                    <h3>and call me at</h3>
                </div>
                    <div className='right-side'>
                        <div className='policy-type'>
                            <h2>Select Policy Type</h2>
                        </div>

                        <Radio.Group onChange={onChange} value={value} style={{marginTop: '20px'}}>
                            <Radio value='individual'>Individual</Radio>
                            <Radio value='group'>Group</Radio>
                        </Radio.Group>

                    </div>
                <hr /> */}

                <div className='right-side'>
                        <div className='policy-type'>
                            <h2>Is from previous policyholder?</h2>
                        </div>

                        <Radio.Group onChange={onChange1} value={value1} style={{marginTop: '20px'}}>
                            <Radio value='yes'>Yes</Radio>
                            <Radio value='no'>No</Radio>
                        </Radio.Group>

                    </div>
                
        <div className='all-dropdown'>    
            <Row gutter={16} style={{marginTop: '15px'}}>
            <Col
                        xs={24}
                        sm={24}
                        md={8}
                        lg={8}
                        xl={8}
                        
                >
                    <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="policyGroup"
                    label="Policy Group"
                    rules={[
                      {
                        required: false,
                        message: "Policy Group",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}>
                    <Select
                            showSearch
                            style={{width: '100%'}}
                            placeholder="Select"
                            optionFilterProp="children"
                            onChange={onChangePolicy}
                            // onSearch={onSearch}
                            value={policyGroup}
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {policyGroupOption.map((item, index) => 
                            <Option key={index} value={item.value}>{item.label}</Option>) }
                            
                           
                        </Select>
                    </Form.Item>
                      
                </Col>
                <Col
                        xs={24}
                        sm={24}
                        md={8}
                        lg={8}
                        xl={8}
                        
                >
                    <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="contarctNumber"
                    label="Contract Number"
                    rules={[
                      {
                        required: false,
                        message: "Contract Number",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}>
                    <Select
                            showSearch
                            style={{width: '100%'}}
                            placeholder="Select"
                            optionFilterProp="children"
                            onChange={onChangeContractNumber}
                            // onSearch={onSearch}
                            value={contractNumber}
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {policyContractNumber.map((item, index) => 
                            <Option key={index} value={item.value}>{item.label}</Option>) }
                            
                           
                        </Select>
                    </Form.Item>
                      
                </Col>
                <Col
                        xs={24}
                        sm={24}
                        md={8}
                        lg={8}
                        xl={8}
                        
                >
                    <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="subcontractNumber"
                    label="Sub-Contarct Number"
                    rules={[
                      {
                        required: false,
                        message: "Sub-Contarct Number",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}>
                    <Select
                            showSearch
                            style={{width: '100%',}}
                            placeholder="Select"
                            optionFilterProp="children"
                            onChange={onChangeSubcontractNumber}
                            // onSearch={onSearch}
                            value={subcontractNumber}
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {subContractNumberOption.map((item, index) => 
                            <Option key={index} value={item.value}>{item.label}</Option>) }
                            
                           
                        </Select>
                    </Form.Item>
                      
                </Col>
            </Row>
            

            <div className='next-button-header'>
                <Button className='next-button' icon={ <ArrowRightOutlined />} size={size}>Next</Button>
            </div>        
        </div> 

            </Col>

        </Row>
        </div>
    </>
  )
}

export default PolicyType