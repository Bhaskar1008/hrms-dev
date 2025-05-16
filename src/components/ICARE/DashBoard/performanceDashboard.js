import React, { useState, useEffect } from "react";
import { Card, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import _ from "lodash";
import apiConfig from "../../../config/api.config";
import './performanceDashboard.css'
import PerformanceYearGraph from "../ProductionYearGraph/performanceYearGraph";
import Premimumcompo from "./primiumcomp";
import topperformance from "../../../assets/ihc_icon/topperformance.png"
const PerformanceDashboard = () => {
    const stats = [
        { label: "Company Average", value: "84" },
        { label: "Average Close Rate", value: "92%" },
      ];
      const topPerformers = [
        {
          id: 1,
          name: "Mylene Deogracias",
          sales: 234,
          image: "https://randomuser.me/api/portraits/women/1.jpg"
        },
        {
          id: 2,
          name: "Mylene Deogracias",
          sales: 234,
          image: "https://randomuser.me/api/portraits/men/2.jpg"
        },
        {
          id: 3,
          name: "Mylene Deogracias",
          sales: 234,
          image: "https://randomuser.me/api/portraits/men/3.jpg"
        },
        {
          id: 4,
          name: "Mylene Deogracias",
          sales: 234,
          image: "https://randomuser.me/api/portraits/women/4.jpg"
        },
        {
          id: 5,
          name: "Mylene Deogracias",
          sales: 234,
          image: "https://randomuser.me/api/portraits/women/5.jpg"
        }
      ];
    return (
        <>
            <div className="performance-container" style={{margin:'15px'}}>
                <p className="performancetitle">Performance</p>

                <PerformanceYearGraph></PerformanceYearGraph>
                <Premimumcompo></Premimumcompo>
                
                <div className="performance-container-layout" >
                    <div style={{ flex: 1 }}>
                        <div>
                            <img className="imgheight"s src={topperformance} alt="Performance" />
                            <p style={{fontSize:'30px',color:'#FF6D00',fontWeight:'500',marginBottom:'0px'}}>Top Performers</p>
                            <p style={{fontSize:'14px',color:'#707070',fontWeight:'500'}}>March 2025</p>
                        </div>
                        <div>
                            <p style={{fontSize:'18px',color:'#00AEC1',fontWeight:'500'}}>TOTAL COMPANY AVERAGE</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            {stats.map((stat, index) => (
                                <div
                                key={index}
                                style={{
                                    backgroundColor: "#fff",
                                    borderRadius: "12px",
                                    padding: "10px",
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                                }}
                                >
                                <div style={{ color: "#6c757d", fontSize: "14px" }}>{stat.label}</div>
                                <div style={{ fontSize: "24px", fontWeight: "600", color: "#3CA7B5" }}>
                                    {stat.value}
                                </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: 1,marginLeft:'15px',marginTop:'15px' }}>
                        <div>
                            <p style={{fontSize:'20px',color:'#00AEC1',fontWeight:'500',marginBottom:'0px'}}>Top 5 performers</p>
                        </div>
                        <div>
                        {topPerformers.map((performer) => (
                                <div
                                key={performer.id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    backgroundColor: "#fff",
                                    padding: "16px",
                                    borderRadius: "12px",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                    marginBottom: "16px"
                                }}
                                >
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <div style={{ fontSize: "24px", fontWeight: "700", color: "#3CA7B5", width: "24px" }}>
                                    {performer.id}
                                    </div>
                                    <div>
                                    <div style={{ fontWeight: "500", fontSize: "16px" }}>{performer.name}</div>
                                    <div style={{ fontSize: "14px", color: "#6c757d" }}>
                                        Monthly average sales: {performer.sales}
                                    </div>
                                    </div>
                                </div>
                                <img
                                    src={performer.image}
                                    alt={performer.name}
                                    style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    boxShadow: "0 0 6px rgba(0,0,0,0.1)"
                                    }}
                                />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PerformanceDashboard