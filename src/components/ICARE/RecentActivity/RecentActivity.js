import React from 'react'
import "./RecentActivity.css"
import ctpl from "../../../images/Icon/image-54@2x.png";
import motor from "../../../images/Icon/image-55@2x.png";
import travel from "../../../images/Icon/image-56@2x.png";
import ctplPolicy from "../../../images/Icon/image-57@2x.png";

const RecentActivity = () => {
  return (
    <>
     <div classname="topPerformerDivProd">
                <div className="PerformersectionProd">
                    <div className="section9">
                        <div className="top-performer-head-prod">
                            <br/>
                            <div className="prodh21">My Downline Agents</div>
                            <div className="prodh5">PERFORMANCE - May-JUNE 2023</div>
                        </div>
                        <div className="company-average-prod">

                            <div className="prodh4">TOTAL COMPANY AVERAGE</div>
                            <div className='companyDivprod'>
                            <div className="prodnumbers4">
                                <div className="prodData">
                                    <div className="commissionprod">Company Average</div>
                                    <div className="units4prod">62</div>
                                </div>
                            </div>
                            &nbsp;
                            &nbsp;

                            <div className="prodnumbers4">
                                <div className="prodData">
                                    <div className="commissionprod">Average Close Rate</div>
                                    <div className="units4prod">82%</div>
                                </div>
                            </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="section10">
                        <p className='recent-activity'>Recent activity</p>
                        <div className="product-card">
                            <div className="product-card-info">
                                <div className="product-info">
                                    <div className="product-name">CTPL Policy Sale</div>
                                    <div className="name">Abigail de Vera      03 June </div>
                                </div>
                            </div>
                            <img
                                className="product-icon"
                                alt=""
                            src={ctpl}
                            />
                        </div>
                        <div className="product-card">
                            <div className="product-card-info">
                                <div className="product-info">
                                    <div className="product-name">Motor Policy Sale</div>
                                    <div className="name">Abigail de Vera     03 June</div>
                                </div>
                            </div>
                            <img
                                className="product-icon"
                                alt=""
                            src={motor}
                            />
                        </div>
                        <div className="product-card">
                            <div className="product-card-info">
                                <div className="product-info">
                                    <div className="product-name">Travel Policy Sale</div>
                                    <div className="name">Popoy Sanchez   01 June </div>
                                </div>
                            </div>
                            <img
                                className="product-icon"
                                alt=""
                            src={travel}
                            />
                        </div>
                        <div className="product-card">
                            <div className="product-card-info">
                                <div className="product-info">
                                    <div className="product-name">CTPL Policy Sale</div>
                                    <div className="name">Abigail de Vera  03 June </div>
                                </div>
                            </div>
                            <img
                                className="product-icon"
                                alt=""
                            src={ctplPolicy}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <br />
    </>
  )
}

export default RecentActivity