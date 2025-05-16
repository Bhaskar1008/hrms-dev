import React from 'react'
import './StepTwo.css'

const StepTwo = () => {
  return (
    <>
    <div className='steppa2'>
    <div className='step2'>
            <div className='inner-page2'></div>
        </div>
        <div className="sidebarstep2">
              {/* <Progress percent={50} showInfo={false} /> */}
              <ul>
                <li><span style={{color:'#4AC6BB',marginRight:'5px'}}>1</span> VEHICLE DETAILS
                </li>
                <li> <span style={{color:'#4AC6BB',marginRight:'5px'}}>2</span>Customer DETAILS
                </li>
                <li> <span style={{color:'#4AC6BB',marginRight:'5px'}}>3</span>Confirmation & Payment
                </li>
              </ul>
            </div>
    </div>

    <div className='steppaMobile2'>
        <div className='stepdata2'>
            <div className='data4'>
                <h4>1</h4>
                <h4 style={{marginLeft: '8px'}}>2</h4>
                <p style={{marginLeft: '5px', fontSize: '12px'}}>Customer Details</p>
            </div>
            <div className='data3'>
                <h4>3</h4>
            </div>
        </div>
    </div>
        
    </>
  )
}

export default StepTwo