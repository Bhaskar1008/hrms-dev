import {React,useState,useEffect} from 'react'
import './ProductionYearGraph.css'
import {Column} from '@ant-design/charts'
import {Row, Col} from 'antd'
import { useDispatch, useSelector, } from "react-redux";
import axiosRequest from "../../../axios-request/request.methods";
import { checkuserAccess, stoageGetter } from "../../../helpers";



const ProductionGraph = () => {
  let login_user_data = stoageGetter("user");
  
  let data = [
    {activity: 10,
      amount:100,
      category:"GPW",
      day: 5,
      month:"Sat, 5",
      name:"GWP Commitment (in ₹)"},
      {activity:0,
        amount:150,
        category:"GPW",
        day:5,
        month:"Sat, 5",
        name:"GWP Achieved (in ₹)"},

        {activity: 0,
          amount:340,
          category:"GPW",
          day: 6,
          month:"Sat, 6",
          name:"GWP Commitment (in ₹)"},
          {activity:0,
            amount:250,
            category:"GPW",
            day:6,
            month:"Sat, 6",
            name:"GWP Achieved (in ₹)"},

            {activity: 0,
              amount:240,
              category:"GPW",
              day: 7,
              month:"Sat, 7",
              name:"GWP Commitment (in ₹)"},
              {activity:0,
                amount:150,
                category:"GPW",
                day:7,
                month:"Sat, 7",
                name:"GWP Achieved (in ₹)"},

                {activity: 0,
                  amount:240,
                  category:"GPW",
                  day: 8,
                  month:"Sat, 8",
                  name:"GWP Commitment (in ₹)"},
                  {activity:0,
                    amount:150,
                    category:"GPW",
                    day:8,
                    month:"Sat, 8",
                    name:"GWP Achieved (in ₹)"},


                    {activity: 0,
                      amount:240,
                      category:"GPW",
                      day: 10,
                      month:"Sat, 10",
                      name:"GWP Commitment (in ₹)"},
                      {activity:0,
                        amount:150,
                        category:"GPW",
                        day:10,
                        month:"Sat, 10",
                        name:"GWP Achieved (in ₹)"},

                        {activity: 0,
                          amount:240,
                          category:"GPW",
                          day: 11,
                          month:"Sat, 11",
                          name:"GWP Commitment (in ₹)"},
                          {activity:0,
                            amount:150,
                            category:"GPW",
                            day:11,
                            month:"Sat, 11",
                            name:"GWP Achieved (in ₹)"},

                            {activity: 0,
                              amount:240,
                              category:"GPW",
                              day: 12,
                              month:"Sat, 12",
                              name:"GWP Commitment (in ₹)"},
                              {activity:0,
                                amount:150,
                                category:"GPW",
                                day:12,
                                month:"Sat, 12",
                                name:"GWP Achieved (in ₹)"},

                                {activity: 0,
                                  amount:240,
                                  category:"GPW",
                                  day: 13,
                                  month:"Sat, 13",
                                  name:"GWP Commitment (in ₹)"},
                                  {activity:0,
                                    amount:150,
                                    category:"GPW",
                                    day:13,
                                    month:"Sat, 13",
                                    name:"GWP Achieved (in ₹)"},
      


  ];
    const id = useSelector((state) => state?.login?.user?.id);
    const [GWPData, SetGWPData] = useState([]);
    const [GWPGraph, SetGWPGraph] = useState([]);
    const [finalBudgetConfig, setFinalBudgetConfig] = useState(null);
    const [finalBudgetData, setFinalBudgetData] = useState([]);
    const [currentIDTeam, setCurrentIDTeam] = useState(id);

    const userName = login_user_data.firstName
    // " " + login_user_data.lastName;
    useEffect(() =>{
      SetGWPGraph([...data]);
    },[])

    useEffect(() => {
        setTimeout(() => {
          const budgetConfigDat = [];
    
          GWPGraph?.forEach((item, index) => {
            if (item.name == "GWP Commitment (in ₹)") {
              budgetConfigDat.push({
                name: "Commitment",
                val: parseInt(item.amount),
                day: item.month,
              });
            } else {
              budgetConfigDat.push({
                name: "Achieved",
                val: parseInt(item.amount),
                day: item.month,
              });
            }
          });
    
          setFinalBudgetConfig({
            data: budgetConfigDat,
            isGroup: true,
            xField: "day",
            yField: "val",
            seriesField: "name",
            color: ["#4AC6BB", "#1D428A"],
          });
          setFinalBudgetData(data);
        });
      }, [GWPGraph]);


      const GetGraph = async () => {
        try {
          let res = await axiosRequest.get(`user/fetch_goals`, {
            secure: true,
          });
          console.log("cgvhbjn");
          if (res.data.graph_data) {
            let responseArray = [...res.data.graph_data];
            SetGWPGraph([...responseArray]);
          }
        } catch (error) {
          if (error?.response?.data?.statusCode === 1) {
            message.error(error?.response?.data?.data);
          }
        }
      };
  return (
    <>
        <div className='production-graph'>
        <Row>
                  <Col
                    span={24}
                  >
                    <div className='agent-data'>
                      <h4>Agent Production Year on Year</h4>
                      <button disabled>Learn More</button>
                    </div>
                    
                  </Col>
                </Row>
            {finalBudgetConfig && <Column style={{height: '260px'}} {...finalBudgetConfig} />}
            {/* <Column style={{height: '260px'}} {...finalBudgetConfig} /> */}
        </div>

    </>
  )
}

export default ProductionGraph