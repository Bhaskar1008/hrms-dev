import React,{useState} from 'react'
import { Row, Col, Button, Card } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import './VehicalType.css'
// image 
import bike from '../../../images/policy_img/image 27.png'
import car from '../../../images/policy_img/image 28.png'
import tempo from '../../../images/policy_img/image 29.png'
import car2 from '../../../images/policy_img/image 25.png'
import truck from '../../../images/policy_img/image 26.png'
import bus from '../../../images/policy_img/bus.png'

const VehicalType = () => {

    const [size, setSize] = useState('default'); // default is 'middle'
    const [active, setActive] = useState(null)

    const vehicalType = [
        {ImgData: bike, Name: "Motorcycle/Tricycle", value: "P250"},
        {ImgData: car, Name: "Private Cars/SUV", value: "P560"},
        {ImgData: tempo, Name: "Light/ Medium Trucks", value: "P610"},
        {ImgData: car2, Name: "Taxi, PUJ, & Minibus", value: "P1,100"},
        {ImgData: truck, Name: "Heavy Trucks/Private Buses", value: "P1,200"},
        {ImgData: bus, Name: "PUB/Tourist Bus", value: "P610"}
    ]

    const handleClick = (index, e) => {
        if (index == 1) {
            console.log("p560"); 
        }
        
        setActive(index)
      };

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
                 md={18}
                 lg={18}
                 xl={18}
                
                >

                <div className='vehical-type'>
                    <h2>Let’s get started with some important details.</h2>
                </div>
                <div className='product-card'>
                
                    <Row gutter={16}>
                      
                    {vehicalType.map((productData, index) => {
                        return <Col
                        xs={24}
                        sm={24}
                        md={8}
                        lg={8}
                        xl={8}
                        style={{marginTop:'10px'}}
                        > <Card
                        hoverable
                        style={{
                        height: 120,
                        }}
                        onClick={(e) => handleClick(index, e)}
                        key={index}
                        className={`product-data ${active == index && 'active'}`}
                    >
                        <img src={productData.ImgData} />
                        <h4>{productData.Name}</h4>
                        <h4>{productData.value}</h4>
                        
                    </Card>
                </Col>;
                    })}
                  
                </Row>
                </div>

            </Col>

        </Row>
        </div>
    </>
  )
}

export default VehicalType