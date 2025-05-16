import React, { createContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Radio, Select, Input, Col, Row, Form, Space, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/QuotationsPolicies";
import { stoageGetter } from "../../helpers";
import './ForQuotationFilter.css'

export const ForQuotationFilter = ({childcALLBACK}) => {

    const { id } = stoageGetter("user");
    const dispatch = useDispatch();
  
    const state = useSelector(state=>state)
    console.log("state---->",state)
    const [filterData, setFilterData] = useState({
       id:id,
       skip:0,
       searchtxt:'',
      quotationNumber:'',
    })

    const formItemLayout = {
        labelCol: {
          span: 24,
        },
        wrapperCol: {
          span: 24,
        },
      };

    const handleSearchType = (val) => {
        setFilterData(res => ({...res,quotationNumber:val.target.value}))
    
      };
    
      const handleNameSearch = (val) => {
        setFilterData(res => ({...res,searchtxt:val.target.value}))
      };
    //   const [hitFilterAPI, setHitFilterAPI] = useState(false)

    useEffect(()=>{
        dispatch(
          actions.fetchDataAfterFilterQuotationsPolicies(
            filterData.id,
            filterData.skip,
            filterData.searchtxt,
             filterData.quotationNumber,
          )
        );

      },[])
    
    
      const handleApplyButton = () => {
        
        dispatch(
          actions.fetchDataAfterFilterQuotationsPolicies(
            filterData.id,
            filterData.skip,
            filterData.searchtxt,
            filterData.quotationNumber,
          )
        );
        // childcALLBACK(filterData.quotationNumber)
        
      };

  return (
    <>
        <div>
            
            {/* <div style={{ marginLeft: "20px" }}>
             {/* {show == true ? <p>Name</p> : ""}  

            {filterData.quotationNumber === 'quotationNumber' ? <p>Quotation Number</p> : ""}

            </div> */}
            <Row gutter={[16, 16]}>

              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="QuotationNumber"
                    label="Quotation Number"
                >
                <Input
                    type="text"
                    placeholder="Enter Quotation Number"
                    size="default"
                    onChange={handleNameSearch}
                    style={{border: "1px gray solid",
                    }}
                    bordered={true}
                  />    
                </Form.Item>
                
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Button
                className="OnlyWuotationFilterButton" onClick={handleApplyButton}
                >Search</Button>
              </Col>
              
              <Col xs={24} sm={24} md={8} lg={8} xl={8}></Col>
              </Row>

          </div>

    </>
  )
}

function QuotationFilterData(props) {
    console.log("props===>QuotationFilterData", props);
    return (
      <>
        <ForQuotationFilter key={"0"} filterdata={props} />
      </>
    );
  }
  
  export default QuotationFilterData;

