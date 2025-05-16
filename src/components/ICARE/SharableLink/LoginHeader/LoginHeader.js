import React, { useState, useEffect } from 'react';
import './LoginHeader.css'
import { Icon, Spin } from 'antd';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { WifiOutlined, GlobalOutlined } from '@ant-design/icons';
// import logobar from '../../../images/header_img/Kahoona Logo - white.png'
import { useHistory } from "react-router-dom";
import kahoona from "../../../../images/kahoona.png";



const OonaHeader = () => {
    const history = useHistory();
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const gotohome = () => {
        // history.push("/iCare-Dashboard");
    }
    return (
        <>

            <div className='header-data' style={{ marginBottom: '59px' }}>
                <div className='login-oona-header'>
                    <div className='parent-head'>
                        <div className='logo-header'>

                            <ul>
                                <li onClick={gotohome}><img src={kahoona} style={{ height: 26 }} />  </li>

                            </ul>
                        </div>
                    </div>
                    {/* <span > <Spin indicator={isOnline ? <WifiOutlined /> : <WifiOffIcon />} /></span> */}

                </div>
            </div>
            <div class="containernavdeco1"></div>

        </>
    )
}

export default OonaHeader