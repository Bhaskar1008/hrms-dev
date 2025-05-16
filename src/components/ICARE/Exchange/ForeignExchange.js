import React, {useState, useEffect} from 'react'
import './ForeignExchange.css'
import {Row, Col, message} from "antd"
import dollar from '../../../images/Icon/image 43.png'
import uero from '../../../images/Icon/image 44.png'
// import { stoageGetter } from "../../helpers";
import axiosRequest from "../../../axios-request/request.methods";

const ForeignExchange = () => {
    const [ExpiryData , setExpiryData] = useState("")
    const [loading, setLoading] = useState(false)
  
useEffect(() => {
    fetchExpiryData()
}, [])

  const fetchExpiryData = async () => {
    setLoading(true);
    try {
      const response =
        await axiosRequest.get(`user/getForeignExchange
    `);
    if (response?.length !== 0) {
      if (response?.statusCode === -1) {
        setLoading(false);
        let myPre = response?.data?.data?.obj
        setExpiryData(myPre);
      }else{
        setLoading(false);
        setExpiryData("0");
      }
    }
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
    }
  }

  let Dollar = ExpiryData?.dollar
  let Uero = ExpiryData?.euro

  const foreiData = [
    {currancy: 'US Dollar', states: `₱${Dollar === undefined ? "0" : Dollar} = $1.00`, forImag: dollar},
    {currancy: 'Euro', states: `₱${Uero === undefined ? "0" : Uero} = €1.00`, forImag: uero},
]

  return (
    <>
        <div className='foreignExchanges'>
            <div className='Extitle'>
                <h4>Foreign Exchange</h4>
            </div>
            <Row gutter={[16,16]}>
                {foreiData.map((foreIn, index) => {
                    return <Col key={index} xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}>

                    <div className='foreignCard'>
                        <div className='card-parent'>
                            <div className='child-for-ph'>
                             <p>{foreIn.currancy}</p>
                             <h4>{foreIn.states}</h4>
                            </div>
                            <div className='child-for'>
                             <img src={foreIn.forImag} />
                            </div>
                        </div>
                        
                    </div>
                </Col>
                })}
                
            </Row>
            
        </div>
    </>
  )
}

export default ForeignExchange