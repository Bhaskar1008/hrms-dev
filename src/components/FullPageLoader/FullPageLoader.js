import React,{useState} from 'react'
import './FullPageLoader.css'
import loadImg from '../../images/pocloader.gif'
import loadingImg1 from '../../images/Spin-1s-200px.gif'
import { useSelector } from "react-redux";
import { Spin } from "antd";
import {LoadingOutlined} from "@ant-design/icons";
//const [loading, setLoading] = useState()


const FullPageLoader = ({ fromapploader, spinloader}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;
    // var loader = useSelector((state) => state?.leads?.showloader); 
    // var hide = useSelector((state) => state?.leads?.hideloader); 


    // if(!fromloginloader) return null
    // if(!fromhomeloader) return null

   // alert(fromloginloader)
  return (
    <>
    {
         fromapploader ? 
        <div className='loader_data'>
            <div className='loader'>
                <img src={loadImg}  />
            </div>
        </div> : null
    }

    {
         spinloader ?
         <div className='loader_data'>
            <div className='screenLoader'>
                {/* <img src={loadingImg1}  /> */}
                <Spin indicator={antIcon} />
            </div>
        </div> 
         : null
    }
        
    </>
  )
}

export default FullPageLoader