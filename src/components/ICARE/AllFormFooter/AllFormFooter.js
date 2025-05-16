import React from "react";
import "./AllFormFooter.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const AllFormFooter = () => {
  // const { slected_policy } = props;
  // console.log("selectData", selectData);
  const vehicalPriceInfo = useSelector((state)=> state?.vehicalePriceHandler?.formData)
  console.log("vehicalPriceInfo", vehicalPriceInfo);
  const location = useLocation();

  // console.log("footer", props);

   let vehicleCategoryApi = useSelector((state) => state?.make?.vehiclecategory);
  //  console.log("vehicleCategoryApi-->", vehicleCategoryApi[0].price);



  let vehiclePrice = "";
  let vehicleName = "";
  if (vehicleCategoryApi !== undefined && Object.keys(vehicleCategoryApi).length !== 0){
    vehicleCategoryApi.map((item) => {
      // console.log("item", item.value);
      if (vehicalPriceInfo === item.value) {
        vehiclePrice = item.price;
        vehicleName = item.name;
      }
    });

  }


  return (
    <>
      <div className="bac">
        <div className="allformfooter">
          <div className="footer-details">
            <div className="firstdata">
              <p>YOUR SELECTION</p>
              <h2>
                Policy for Individual CTPL
                {/* <span className="npolicy">No Policy Group</span> */}
              </h2>
            </div>
          </div>
        </div>

          {/* {location.pathname === '/confirm-details' ? <>
          <div className="seconddata">
                    <p>APPROX</p>
                    {/* <h2>{ vehicalPriceInfo === "" || vehicalPriceInfo === {} || vehicalPriceInfo === undefined || vehicalPriceInfo === null ? '₱ 0' : `₱${vehiclePrice ? vehiclePrice : 0}`}</h2> 

                    <h2>₱ {vehiclePrice}</h2>
                  </div>
          </> : ""} */}
        
      </div>
     
    </>
  );
};

export default AllFormFooter;
