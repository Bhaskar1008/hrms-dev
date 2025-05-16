import React from 'react';
import { Empty } from 'antd';
import './NoRecord.css';

const NoRecord=()=>{
    return(
<div className="NoRecord-main-class">
<div className="NoRecord-card-style">
<Empty
imageStyle={{
    height:"500px"
}}
/>
</div>
</div>
    )
}
export default NoRecord;