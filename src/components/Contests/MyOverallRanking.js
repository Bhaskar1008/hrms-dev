import React from 'react';
import { Line } from '@ant-design/charts';
import './MyOverallRanking.css';
const MyOverallRanking= () => {
  const data = [
    { year: '2017-06-05' , 
    label:{
        visible:false}
    ,value: 120 },
    { year: '2017-06-13', value: 240 },
    { year: '2017-06-20', value: 320 },
    { year: '2017-06-22', value: 320 },
    // {  value: 5 },
    // { value: 4.9 },
    // { value: 6 },
    // {  value: 7 },
    // {  value: 9 },
    // {  value: 13 },
  ];
  const data1 = [
    { year: '2017-04-21' , 
    label:{
        visible:false}
    ,value: 20 },
    { year: '2017-04-16', value: 40 },
    { year: '2017-04-10', value: 20 },
    { year: '2017-04-12', value: 10 },
    // {  value: 5 },
    // { value: 4.9 },
    // { value: 6 },
    // {  value: 7 },
    // {  value: 9 },
    // {  value: 13 },
  ];
  const config = {
    data,
    height: 400,
    xField: 'year',
    yField: 'value',
    className:"myoverallranking-chart1-style",

    // point: {
    //   size: 5,
    // //   shape: 'diamond',
    // },
  };
  const config1 = {
    data1,
    height: 400,
    xField: 'year',
    yField: 'value',
    className:"myoverallranking-chart1-style",

    // point: {
    //   size: 5,
    // //   shape: 'diamond',
    // },
  };
  return (
  <div
  className="myoverallranking-main"
  >
<div
className="myoverallranking-card-style"
>
<div
className="myoverallranking-content-flex"
>
    <h4
    className="myoverallranking-content-text"
    >View All My Ranking</h4>
    <div
    className="myoverallranking-content-row-flex"
    >
    <Line {...config1} />
    <Line {...config} />
    </div>
  
    <div
    className="myoverallranking-content-row-flex"
    >
    <Line {...config} />
    <Line {...config1} />
    </div>
  
</div>
</div>

  </div>
//   <Line {...config} />
  );
};
export default MyOverallRanking;