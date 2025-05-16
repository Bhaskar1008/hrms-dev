import React, { useState, useRef, useEffect } from 'react'
import './Oona-header.css'
import logobar from '../../../images/header_img/Kahoona Logo - white.png'

const SimpleHeader = () => {
  
  return (
    <>

      <div className='header-data'>
        <div className='oona-header'>
          <div className='parent-head'>
            <div className='logo-head'>
              <ul>
                <li><img src={logobar} style={{ height: 36 }} />   </li>
              </ul>

            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default SimpleHeader