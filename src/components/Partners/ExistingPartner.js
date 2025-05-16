import React, { useEffect, useState } from 'react';
import { Avatar,Tabs,Button ,Popover,Drawer,Input,Tag,  Pagination} from 'antd';
import './ExistingPartner.css';
import {
   PhoneFilled,
   MoreOutlined,
   ScheduleFilled,
   MailFilled,
   DownloadOutlined,
   ControlOutlined,
   SlidersFilled,

  } from '@ant-design/icons';
  import {
    BrowserRouter as Router,
    Link,useHistory
  } from "react-router-dom";
import axios from 'axios';
import NoRecord from './NoRecord';
import './NoRecord.css';
const { Search } = Input;
const ExistingPartner=()=>{
  const history=useHistory();
  const UserList = ['U', 'L', 'To', 'Ed'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];
  const[existingPartnerArr,setExistingPartnerArr]=useState([]);
  const[helperPartnerArr,setHelperPartnerArr]=useState([]);
  const[countArr,setCountArr]=useState();
  const [current,setcurrent] = useState(1)
  const[totalPages,setTotalPages]=useState();
  function paginate (arr, size) {
    return arr.reduce((acc, val, i) => {
      let idx = Math.floor(i / size)
      let page = acc[idx] || (acc[idx] = [])
      page.push(val)

      return acc
    }, [])
  }

  const handlePageClick = (page)=>{
    setcurrent(page)
}
function itemRender(cur, type, originalElement) {
  const onPrev = ()=>{
      setcurrent(current-1)
  }
  const onNext = ()=>{
      setcurrent(current+1)
  }

  if (type === 'prev') {
      return <button current={current} onClick={onPrev}>Prev</button>;
    }
  if (type === 'next') {
    return <button current={current} onClick={onNext}>Next</button>;
  }
  return originalElement;
}
const changeUser = () => {
  const index = UserList.indexOf(user);
  setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
  setColor(index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]);
};

const changeGap = () => {
  const index = GapList.indexOf(gap);
  setGap(index < GapList.length - 1 ? GapList[index + 1] : GapList[0]);
};


    const [user, setUser] = useState(UserList[0]);
    const [color, setColor] = useState(ColorList[0]);
    const [gap, setGap] = useState(GapList[0]);
    const [drawerVisible, setDrawerVisible] = useState(false);

const[filterTagVisible,setFilterTagVisible]=useState(false)
const[searchFilterValue,setSearchFilterValue]=useState("")
const[postSearchValue,setPostSearchValue]=useState("");
    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState("top");
const[existingPartnerTabCheck,setExistingPartnerTabCheck]=useState({
all_tab:true,
met_tab:false,
not_met_tab:false,
active_tab:false,
inactive_tab:false
})

const[searchTypeTabCheck,setSearchTypeTabCheck]=useState({
  name:true,
  mobile:false,
  partnerId:false
})
const[filterTagKeyName,setFilterTagKeyName]=useState("");
useEffect(()=>{
  if(filterButtonCheck==true&&searchFilterValue!==""){
    axios.get(
      searchTypeTabCheck.name==true?
      `https://sdtatadevlmsv2.iorta.in/auth/user/fetch_existing_partners?userId=616e908c43ed727bbac8d2d4&searchBy={"partnerName":${postSearchValue}}&skip=0&sortedby=newest_first`
        :searchTypeTabCheck.partnerId==true?
        `https://sdtatadevlmsv2.iorta.in/auth/user/fetch_existing_partners?userId=616e908c43ed727bbac8d2d4&searchBy={"partnerId":${postSearchValue}}&skip=0&sortedby=newest_first`
        :
        `https://sdtatadevlmsv2.iorta.in/auth/user/fetch_existing_partners?userId=616e908c43ed727bbac8d2d4&searchBy={"contactNo":${postSearchValue}}&skip=0&sortedby=newest_first`
      )
    .then((res)=>{
      setHelperPartnerArr(existingPartnerArr)

       setExistingPartnerArr(res.data.data=="Not found"?[]: res.data.data[0])
            setCountArr(res.data.data=="Not found"?0:res.data.data[0].length)
            let array = res.data.data[0]
            let page_size = 2
            let pages = paginate(array, page_size)
            // setExistingPartnerArr(pages)
            res.data.data[0].map((item)=>{

            })
            setTotalPages(res.data.data[0].length)
    })
    .catch((err)=>{console.log("error", err);
    })
        }
  else if(existingPartnerTabCheck.all_tab==true){
      axios.get("https://sdtatadevlmsv2.iorta.in/auth/user/fetch_existing_partners?userId=616e908c43ed727bbac8d2d4&partnerType=v1&status=active&skip=0")
      .then((res)=>{
        setExistingPartnerArr(res.data.data=="Not found"?[]: res.data.data[0])
      setCountArr(res.data.data=="Not found"?0:res.data.data[0].length)
        let array = res.data.data[0]
        let page_size = 2
        let pages = paginate(array, page_size)
        // setExistingPartnerArr(pages)
        res.data.data[0].map((item)=>{

        })
        setTotalPages(res.data.data[0].length)
      })
      .catch((err)=>{console.log("error", err);
      })
    }
    else if(existingPartnerTabCheck.met_tab==true){
      axios.get("https://sdtatadevlmsv2.iorta.in/auth/user/fetch_existing_partners?userId=616e908c43ed727bbac8d2d4&partnerType=v1&status=active&skip=0")
      .then((res)=>{
        setExistingPartnerArr(res.data.data=="Not found"?[]: res.data.data[0])
        setCountArr(res.data.data=="Not found"?0:res.data.data[0].length)
        let array = res.data.data[0]
        let page_size = 2
        let pages = paginate(array, page_size)
        // setExistingPartnerArr(pages)
        res.data.data[0].map((item)=>{

        })
        setTotalPages(res.data.data[0].length)
      })
      .catch((err)=>{console.log("error", err);
      })
    }
    else if(existingPartnerTabCheck.not_met_tab==true){
      axios.get("https://sdtatadevlmsv2.iorta.in/auth/user/fetch_existing_partners?userId=616e908c43ed727bbac8d2d4&partnerType=v1&status=inactive&skip=0")
      .then((res)=>{
        setExistingPartnerArr(res.data.data=="Not found"?[]: res.data.data[0])
        setCountArr(res.data.data=="Not found"?0:res.data.data[0].length)
        let array = res.data.data[0]
        let page_size = 2
        let pages = paginate(array, page_size)
        // setExistingPartnerArr(pages)
        res.data.data[0].map((item)=>{

        })
        setTotalPages(res.data.data[0].length)
      })
      .catch((err)=>{console.log("error", err);
      })
    }
    else if(existingPartnerTabCheck.active_tab==true){
      axios.get("https://sdtatadevlmsv2.iorta.in/auth/user/fetch_existing_partners?userId=616e908c43ed727bbac8d2d4&partnerType=v2&status=active&skip=0")
      .then((res)=>{
        setExistingPartnerArr(res.data.data=="Not found"?[]: res.data.data[0])
        setCountArr(res.data.data=="Not found"?0:res.data.data[0].length)
        let array = res.data.data[0]
        let page_size = 2
        let pages = paginate(array, page_size)
        // setExistingPartnerArr(pages)
        res.data.data[0].map((item)=>{

        })
        setTotalPages(res.data.data[0].length)
      })
      .catch((err)=>{console.log("error", err);
      })
    }
    else{
      axios.get("https://sdtatadevlmsv2.iorta.in/auth/user/fetch_existing_partners?userId=616e908c43ed727bbac8d2d4&partnerType=v2&status=inactive&skip=0")
      .then((res)=>{
        setExistingPartnerArr(res.data.data=="Not found"?[]: res.data.data[0])
        setCountArr(res.data.data=="Not found"?0:res.data.data[0].length)
        let array = res.data.data[0]
        let page_size = 2
        let pages = paginate(array, page_size)
        // setExistingPartnerArr(pages)
        res.data.data[0].map((item)=>{

        })
        setTotalPages(res.data.data[0].length)
      })
      .catch((err)=>{console.log("error", err);
      })
    }



    },[existingPartnerTabCheck,filterTagVisible])
const showDrawer = () => {
    setDrawerVisible(true);
  };
  const onClose = () => {
    setDrawerVisible(false);
  };

  const ButtonDrawerVisibleFunc=()=>{
    setDrawerVisible(true);
  }
const AllTabClickFunc=()=>{
    setExistingPartnerTabCheck({
        all_tab:true,
        met_tab:false,
        not_met_tab:false,
        active_tab:false,
        inactive_tab:false
    })
}

const MetTabClickFunc=()=>{
    setExistingPartnerTabCheck({
        all_tab:false,
        met_tab:true,
        not_met_tab:false,
        active_tab:false,
        inactive_tab:false
    })
}
const NotMetTabClickFunc=()=>{
    setExistingPartnerTabCheck({
        all_tab:false,
        met_tab:false,
        not_met_tab:true,
        active_tab:false,
        inactive_tab:false
    })
}
const ActiveTabClickFunc=()=>{
    setExistingPartnerTabCheck({
        all_tab:false,
        met_tab:false,
        not_met_tab:false,
        active_tab:true,
        inactive_tab:false
    })
}
const InactiveTabClickFunc=()=>{
    setExistingPartnerTabCheck({
        all_tab:false,
        met_tab:false,
        not_met_tab:false,
        active_tab:false,
        inactive_tab:true ,
    })
}
const SearchFilterNameFunc=()=>{
  setFilterTagKeyName(JSON.stringify("partnerName"))
setSearchTypeTabCheck({
  name:true,
  mobile:false,
  partnerId:false
})
}
const SearchFilterMobileFunc=()=>{
  setSearchTypeTabCheck({
    name:false,
    mobile:true,
    partnerId:false
  })
}
const SearchFilterPartnerIdFunc=()=>{
  setFilterTagKeyName(JSON.stringify("partnerId"))
  setSearchTypeTabCheck({
    name:false,
    mobile:false,
    partnerId:true
  })
}
const[filterButtonCheck,setFilterButtonCheck]=useState(false)

const FilterTagCloseFunc=()=>{
  setFilterTagVisible(false)
  setFilterButtonCheck(false)
  setSearchFilterValue("")
  setSearchTypeTabCheck({
    name:true,
    mobile:false,
    partnerId:false
  })
}
const ApplyFilterButtonFunc=()=>{
  setFilterTagVisible(true)
  setFilterButtonCheck(true)
  setDrawerVisible(false)
}
const SearchFilterValueFunc=(e)=>{
setSearchFilterValue(e.target.value)
setPostSearchValue(JSON.stringify(e.target.value))
}
const RedirectFunc=()=>{
  history.push('leadMaster/all_leads')
}

    return(
        <div
        className="Existingpartner-main-flex"
        >
<div
className="Existingpartner-topview-flex"
>
    <div
    className={width>"767"?"Exisitngpartner-main-heading-flex":""}
    >
      <div className="Existingpartner-heading-content-style">
    <p
    className="Existingpartner-main-heading"
    >Existing Partner</p>



    {width>"765"?   <div
    className="Existingpartner-tab-flex"
    >
       <div
        className="Existingpartner-tab-view-flex"
       >
<div
onClick={AllTabClickFunc}

         className={existingPartnerTabCheck.all_tab==true?"Existingpartner-tab-active-style":"Existingpartner-tab-style"}
        >
            <p

            className={existingPartnerTabCheck.all_tab==true?"Existingpartner-tab-active-text-style":"Existingpartner-tab-text-style"}
            >
                All
            </p>
            </div>

            <div
            onClick={MetTabClickFunc}
        className={existingPartnerTabCheck.met_tab==true?"Existingpartner-tab-active-style":"Existingpartner-tab-style"}
        >
            <p
           className={existingPartnerTabCheck.met_tab==true?"Existingpartner-tab-active-text-style":"Existingpartner-tab-text-style"}
            >
                Met
            </p>
            </div>


            <div
            onClick={NotMetTabClickFunc}
        className={existingPartnerTabCheck.not_met_tab==true?"Existingpartner-tab-active-style":"Existingpartner-tab-style"}
        >
            <p
           className={existingPartnerTabCheck.not_met_tab==true?"Existingpartner-tab-active-text-style":"Existingpartner-tab-text-style"}
            >
                Not Met
            </p>
            </div>
            <div
            onClick={ActiveTabClickFunc}
        className={existingPartnerTabCheck.active_tab==true?"Existingpartner-tab-active-style":"Existingpartner-tab-style"}
        >
            <p
           className={existingPartnerTabCheck.active_tab==true?"Existingpartner-tab-active-text-style":"Existingpartner-tab-text-style"}
            >
                Active
            </p>
            </div>
            <div
            onClick={InactiveTabClickFunc}
        className={existingPartnerTabCheck.inactive_tab==true?"Existingpartner-tab-active-style":"Existingpartner-tab-style"}
        >
            <p
           className={existingPartnerTabCheck.inactive_tab==true?"Existingpartner-tab-active-text-style":"Existingpartner-tab-text-style"}
            >
                Inactive
            </p>
            </div>
       </div>
       <div
       className="Existingpartner-lead-button-flex"
       >
       <div
       onClick={RedirectFunc}
       className="Existingpartner-lead-button-style"
       >

           <p
       className="Existingpartner-lead-text-style"
       >Leads</p>



</div>
</div>





    </div>
    :
    <div
    className="Existingpartner-tab-mobile-view-box"
    >
 <Tabs>
 <TabPane tab="All" key="1"></TabPane>
 <TabPane tab="Met" key="2"></TabPane>
 <TabPane tab="Not Met" key="3"></TabPane>
 <TabPane tab="Active" key="4"></TabPane>
 <TabPane tab="Inactive" key="5"></TabPane>
<TabPane tab={ <div
       className="Existingpartner-lead-button-flex"
       >
       <div
       className="Existingpartner-lead-button-style"
       >

           <p
       className="Existingpartner-lead-text-style"
       >Leads</p>


</div>
</div>}
key="6"
></TabPane>

 </Tabs>

  </div>
  }
   </div>
   </div>
    <div
    className="Existingpartner-content-area-style"
    >

      <div
       className="Existingpartner-recordnumber-style"
      >
      <p className="Existingpartnerdetails-recordtext-bold-orange-style"><strong
      className="Existingpartnerdetails-recordtext-bold-black-style"
      >Showing {countArr==0?0:1} to {countArr}</strong> out of {countArr} records</p>
      </div>
      <div
      className="Existingpartner-Tag-area-flex"
      >
        <p className="Existingpartner-selectedfilter-text-style">{filterTagVisible?"Selected Filter:":""}</p>
      <Tag
          closable
          visible={filterTagVisible}
          onClose={FilterTagCloseFunc}
          className="Existingpartner-filter-tag-style"
        >
        {searchFilterValue}
        </Tag>
      </div>
      <div
      className="Existingpartner-cardbutton-flex"
      >
        <div
         className="Existingpartner-card-flex"
        >
<div
className="Existingpartner-card-wrap"
>
{existingPartnerArr.length!==0? existingPartnerArr.map((item)=>{
        return(

          <div
          className="Existingpartner-card-style"

          >
              <div
              className="Existingpartner-card-content-flex"
              >
                  <div
                  className="Existingpartner-card-top-content-flex"
                  >
  <div
  className="Existingpartner-card-top-content-text-flex"
  >
      <div
      className="Existingpartner-card-top-avatar-content-flex"
      >
  <Avatar

          style={{
            backgroundColor: color,
            verticalAlign: 'middle',

            marginRight:"10px"
          }}
          size="large"
          gap={gap}
        >
          {item.partnerName?item.partnerName.match(/\b(\w)/g).join('').toUpperCase():""}
        </Avatar>
        <div
        className="Existingpartner-card-top-avatar-name-column-flex"
        >
        <p
        className="Existingpartner-card-name-text-style">{item.partnerName}</p>
   <div
   className="Existingpartner-card-id-row-flex"
   >
  <p className="Existingpartner-card-id-text-style">Id</p>
  <p
  className="Existingpartner-card-id-number-text-style"
  >{item.partnerId}</p>
   </div>
        </div>

      </div>

      <div
      className="Existingpartner-card-top-card-icon-flex"
      >
       <div
      className="Existingpartner-card-bottom-vertical-line-style"
      ></div>
      <div
      className="Existingpartner-card-phone-icon-row-flex"
      >
      <PhoneFilled
      rotate="90"
      style={{
  fontSize:"18px",
  marginTop:"15px",
  marginRight:"8px"
  }}/>
  <p
  className="Existingpartner-card-phone-icon-number-text"
  >0</p>
      </div>

      <div
      className="Existingpartner-card-bottom-vertical-line-style"
      ></div>
      <div
      className="Existingpartner-popover-mainstyle"
      >
           <Popover placement="leftTop"
            className="Existingpartner-popover-mainstyle"
            content={
           <div
           className="Existingpartner-popover-main-flex"
           >
      <div
                    className="Existingpartner-card-popover-icon-text-flex"
                    >
                    <ScheduleFilled
                       style={{
                          fontSize:"18px",
                          marginRight:"6px"

                          }}
                    />
                    <h6
                    className="Existingpartner-card-popover-text-style"

                    >create an event</h6>
                    </div>
      <div
                      className="Existingpartner-card-middle-horizontal-line-style"
                      ></div>
                    <div
                    className="Existingpartner-card-popover-icon-text-flex"
                    >

                    <MailFilled
                       style={{
                          fontSize:"18px",
                          marginRight:"6px"

                          }}
                    />
                    <h6
                  className="Existingpartner-card-popover-text-style"
                    >Mail</h6>
                    </div>
                      <div
                      className="Existingpartner-card-middle-horizontal-line-style"
                      ></div>
                                          <div
                    className="Existingpartner-card-popover-icon-text-flex"
                    >

                    <PhoneFilled
                     rotate="90"
                       style={{
                          fontSize:"18px",
                          marginRight:"6px"

                          }}
                    />
                    <h6
                  className="Existingpartner-card-popover-text-style"
                    >Call</h6>
                    </div>
           </div>
            } trigger="click">
        <MoreOutlined
     style={{
      fontSize:"18px",
      marginTop:"15px",
      // marginRight:"8px"
      }}
    />
        </Popover>

        </div>

      </div>

  </div>
                  </div>


                  <div
                  className="Existingpartner-card-middle-content-flex"
                  >
                      <div
                      className="Existingpartner-card-middle-horizontal-line-style"
                      ></div>

                        <div
                  className="Existingpartner-card-middle-content-text-flex"
                  >
                      <p
                      className="Existingpartner-card-middle-content-text-style"
                      >Target ₹ {item?item.target:""}</p>
                      <p
                      className="Existingpartner-card-middle-content-text-style"
                      >Achieved ₹ {item?item.achivement:""}</p>
                      <p
                      className="Existingpartner-card-middle-content-text-style"
                      >% Achieved {item?(100*item.achivement)/item.target:""}%</p>
                      </div>
                      <div
                      className="Existingpartner-card-middle-horizontal-line-style"
                      ></div>
                  </div>

                  <div
                  className="Existingpartner-card-bottom-content-flex"
                  >
  <div
  className="Existingpartner-card-bottom-content-text-flex"
  >
  <div
  className="Existingpartner-card-bottom-vertical-line-column-flex"
  >
      <div
      className="Existingpartner-card-bottom-vertical-line-style"
      ></div>

  <Link to={{
    pathname:'/existingpartnerdetails',
    state:{
      partnerId:item.partnerId
    }
  }}
  className="Existingpartner-card-bottom-button-style"
  >View</Link>
  </div>


  </div>
                  </div>

              </div>


          </div>
        )
      }):<NoRecord/>}

</div>
        </div>
        <div
        className="Existingpartner-button-flex"
        >
          <div
          className="Existingpartner-button-column-flex"
          >
<Button
    onClick={ButtonDrawerVisibleFunc}
    className="Existingpartner-floater-button-style"
    type="primary" shape="circle" icon={<SlidersFilled
        style={{
            fontSize:"25px",


            // marginRight:"8px"
            }}
    rotate={90}/>}  />

          </div>

        </div>

      </div>

    {/* <div
    className="Existingpartner-card-flex-area"
    >



      {existingPartnerArr.length!==0? existingPartnerArr.map((item)=>{
        return(

          <div
          className="Existingpartner-card-style"

          >
              <div
              className="Existingpartner-card-content-flex"
              >
                  <div
                  className="Existingpartner-card-top-content-flex"
                  >
  <div
  className="Existingpartner-card-top-content-text-flex"
  >
      <div
      className="Existingpartner-card-top-avatar-content-flex"
      >
  <Avatar

          style={{
            backgroundColor: color,
            verticalAlign: 'middle',

            marginRight:"10px"
          }}
          size="large"
          gap={gap}
        >
          {item.partnerName?item.partnerName.match(/\b(\w)/g).join('').toUpperCase():""}
        </Avatar>
        <div
        className="Existingpartner-card-top-avatar-name-column-flex"
        >
        <p
        className="Existingpartner-card-name-text-style">{item.partnerName}</p>
   <div
   className="Existingpartner-card-id-row-flex"
   >
  <p className="Existingpartner-card-id-text-style">Id</p>
  <p
  className="Existingpartner-card-id-number-text-style"
  >{item.partnerId}</p>
   </div>
        </div>

      </div>

      <div
      className="Existingpartner-card-top-card-icon-flex"
      >
       <div
      className="Existingpartner-card-bottom-vertical-line-style"
      ></div>
      <div
      className="Existingpartner-card-phone-icon-row-flex"
      >
      <PhoneFilled
      rotate="90"
      style={{
  fontSize:"18px",
  marginTop:"15px",
  marginRight:"8px"
  }}/>
  <p
  className="Existingpartner-card-phone-icon-number-text"
  >0</p>
      </div>

      <div
      className="Existingpartner-card-bottom-vertical-line-style"
      ></div>
      <div
      className="Existingpartner-popover-mainstyle"
      >
           <Popover placement="leftTop"
            className="Existingpartner-popover-mainstyle"
            content={
           <div
           className="Existingpartner-popover-main-flex"
           >
      <div
                    className="Existingpartner-card-popover-icon-text-flex"
                    >
                    <ScheduleFilled
                       style={{
                          fontSize:"18px",
                          marginRight:"6px"

                          }}
                    />
                    <h6
                    className="Existingpartner-card-popover-text-style"

                    >create an event</h6>
                    </div>
      <div
                      className="Existingpartner-card-middle-horizontal-line-style"
                      ></div>
                    <div
                    className="Existingpartner-card-popover-icon-text-flex"
                    >

                    <MailFilled
                       style={{
                          fontSize:"18px",
                          marginRight:"6px"

                          }}
                    />
                    <h6
                  className="Existingpartner-card-popover-text-style"
                    >Mail</h6>
                    </div>
                      <div
                      className="Existingpartner-card-middle-horizontal-line-style"
                      ></div>
                                          <div
                    className="Existingpartner-card-popover-icon-text-flex"
                    >

                    <PhoneFilled
                     rotate="90"
                       style={{
                          fontSize:"18px",
                          marginRight:"6px"

                          }}
                    />
                    <h6
                  className="Existingpartner-card-popover-text-style"
                    >Call</h6>
                    </div>
           </div>
            } trigger="click">
        <MoreOutlined
     style={{
      fontSize:"18px",
      marginTop:"15px",
      // marginRight:"8px"
      }}
    />
        </Popover>

        </div>

      </div>

  </div>
                  </div>


                  <div
                  className="Existingpartner-card-middle-content-flex"
                  >
                      <div
                      className="Existingpartner-card-middle-horizontal-line-style"
                      ></div>

                        <div
                  className="Existingpartner-card-middle-content-text-flex"
                  >
                      <p
                      className="Existingpartner-card-middle-content-text-style"
                      >Target ₹ 0</p>
                      <p
                      className="Existingpartner-card-middle-content-text-style"
                      >Achieved ₹ 0</p>
                      <p
                      className="Existingpartner-card-middle-content-text-style"
                      >% Achieved 0%</p>
                      </div>
                      <div
                      className="Existingpartner-card-middle-horizontal-line-style"
                      ></div>
                  </div>

                  <div
                  className="Existingpartner-card-bottom-content-flex"
                  >
  <div
  className="Existingpartner-card-bottom-content-text-flex"
  >
  <div
  className="Existingpartner-card-bottom-vertical-line-column-flex"
  >
      <div
      className="Existingpartner-card-bottom-vertical-line-style"
      ></div>

  <Link to={{
    pathname:'/existingpartnerdetails',
    state:{
      partnerId:item.partnerId
    }
  }}
  className="Existingpartner-card-bottom-button-style"
  >View</Link>
  </div>


  </div>
                  </div>

              </div>


          </div>
        )
      }):<NoRecord/>}


    </div>
   */}


    </div>

    </div>

<div
className="Existingpartner-bottomview-flex"
>
    <div

    className="Existingpartner-bottomview-row-flex"
    >
              <Drawer
                 width={width>"767"?"500":"315"}
                 height="50"
              className="Existingpartner-drawer-style"
              title={<p  className="Existingpartner-drawer-sortby-text-style">Select Filter</p>} placement="right" onClose={onClose} visible={drawerVisible}>
      <div
      className="Existingpartner-drawer-card-style"
      >
        <div
        className="Existingpartner-drawer-sort-flex"
        >
        <p
        className="Existingpartner-drawer-sortby-text-style"
        >Sort By</p>

        <select
        className="Existingpartner-drawer-select-dropdown-style"
        >

          <option>Date of Joining-Newest First</option>
          <option>Date of Joining-Oldest First</option>
        </select>
        </div>

      </div>

      <div
      className="Existingpartner-drawer-card-style"
      >
        <div
        className="Existingpartner-drawer-sort-flex"
        >
        <p
        className="Existingpartner-drawer-sortby-text-style"
        >Search Type Selection</p>
<div
className="Existingpartner-drawer-button-flex"
>
<button
value={searchTypeTabCheck.name}
onClick={SearchFilterNameFunc}
        className={searchTypeTabCheck.name==true? "Existingpartner-drawer-selected-button-tab-style":"Existingpartner-drawer-notselected-button-tab-style"}
        >Name
        </button>
        <button
        value={searchTypeTabCheck.mobile}
        onClick={SearchFilterMobileFunc}
        className={searchTypeTabCheck.mobile==true? "Existingpartner-drawer-selected-button-tab-style":"Existingpartner-drawer-notselected-button-tab-style"}

        >Mobile
        </button>
        <button
        value={searchTypeTabCheck.partnerId}
        onClick={SearchFilterPartnerIdFunc}
        className={searchTypeTabCheck.partnerId==true? "Existingpartner-drawer-selected-button-tab-style":"Existingpartner-drawer-notselected-button-tab-style"}

        >Partner Id
        </button>
</div>
<Search placeholder={searchTypeTabCheck.name==true? "Search By Name":searchTypeTabCheck.mobile==true?"Search By Mobile No":"Search By Partner Id"} allowClear
value={searchFilterValue}
onChange={SearchFilterValueFunc}
className="Existingpartner-drawer-searchbox-style"
/>
        </div>

      </div>

      <div
      className="Existingpartner-drawer-card-style"
      >
     <div
     className="Existingpartner-drawer-applybutton-flex"
     >

     <button
        onClick={ApplyFilterButtonFunc}
        className="Existingpartner-drawer-selected-button-tab-style"

        >Apply
        </button>
     </div>
      </div>

      </Drawer>


    {/* <Button
    onClick={ButtonDrawerVisibleFunc}
    className="Existingpartner-floater-button-style"
    type="primary" shape="circle" icon={<SlidersFilled
        style={{
            fontSize:"25px",


            // marginRight:"8px"
            }}
    rotate={90}/>}  /> */}

    </div>

</div>



        </div>
    )
}
export default ExistingPartner