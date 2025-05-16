import React from 'react'
import './StepTravelOne.css'

const StepTravelOne = () => {
  return (
    <>
    <div className='steppa'>
    <div className='step1'>
            <div className='inner-page'></div>
        </div>
        <div className="sidebarstep">
              {/* <Progress percent={50} showInfo={false} /> */}
              <ul>
                <li> <span style={{color:'#4AC6BB',marginRight:'5px'}}>1</span> PRICE CHECK
                </li>
                <li><span style={{color:'#4AC6BB',marginRight:'5px'}}>2</span> CONVERT TO POLICY
                </li>
                <li><span style={{color:'#4AC6BB',marginRight:'5px'}}>3</span>CONFIRMATION AND PAYMENT
                </li>
              </ul>
            </div>
    </div>

    <div className='steppaMobile'>
        <div className='rsstepdata'>
            <div className='data1'>
                <h4>1</h4>
                <p> Price Check</p>
            </div>
            <div className='data2'>
                <h4 style={{marginRight: '8px'}}>2</h4>
                <h4>3</h4>
            </div>
        </div>
    </div>
        
    </>
  )
}

export default StepTravelOne