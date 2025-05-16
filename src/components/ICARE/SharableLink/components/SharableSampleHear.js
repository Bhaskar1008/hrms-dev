import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from "react-router";
import './SharableSampleHear.css'
import logobar from '../../../../images/header_img/Kahoona Logo - white.png'

const SharableSampleHear = () => {
    const history = useHistory();
    const handleChangetoDashboard = () => {
        history.push("/iCare-Dashboard");
    };

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
                        <div className='logo-head'>
                            <ul>
                                <li style={{ color: 'White', fontWeight: 400 }} onClick={handleChangetoDashboard} > Cancel  </li>

                            </ul>

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default SharableSampleHear