import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import "./MainTabs.css";
import _ from "lodash";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";

import { stoageGetter } from "../../helpers";

const { TabPane } = Tabs;

const MainTabs = ({
  tabMenu,
  header,
  detailsRouteTab,
  activeKey,
  activeRenewalkey,
  current,
}) => {
  const dispatch = useDispatch();
  const { leadType } = useParams();
  const { masterType } = useParams();
  const [activeTab, setactiveTab] = useState();
  useEffect(() => {
    // dispatch(actions.fetchAllLeads(leadType, current))

    const ids = stoageGetter("user");
    dispatch(actions.fetchAllLeads(ids[0][0]._id, leadType, current));
  }, [dispatch, current, activeTab]);
  let history = useHistory();
  // const [activeKey, setactiveKey] = useState('1')

  // const onChange = (key)=>{

  //     setactiveKey(key)
  // }
  const handler = (activeKey) => {
    setactiveTab(activeKey);
    // dispatch(actions.fetchAllLeads(activeTab,current))

    // setactiveKey(key)
    if (activeKey) {
      switch (activeKey) {
        // case "all": return history.push('/leadMaster/all_leads');
        // case "fortoday": return history.push('/leadMaster/fortoday');
        // case "open": return history.push('/leadMaster/openlead');
        // case "converted": return history.push('/leadMaster/convertedleads');
        // case "failed": return history.push('/leadMaster/pendingproposal');

        // case "1": return history.push('/leadmasterpage/statuslead');
        // case "2": return history.push('/leadmasterpage/leaddetails/personallead');
        // case "3": return history.push('/leadmasterpage/proposal');
        // case "4": return history.push('/leadmasterpage/leadmasterdoc/leaddoc');
        // case "5": return history.push('/leadmasterpage/leadhistorymaster/leadhistory');

        case "customerpitch":
          return history.push("/masterpresales/customerdetails/salespitch");
        case "advisorpitch":
          return history.push("/masterpresales/advisordetail/advisorpitch");
        case "benefitillustrator":
          return history.push("/master/benefitillustrator");
        case "proposalfulfilment":
          return history.push("/master/proposalfulfilment");
        case "prepaymentreview":
          return history.push("/master/prepaymentreview");
        case "paymentoptions":
          return history.push("/master/paymentoptions");
        case "uploaddocuments":
          return history.push("/master/uploaddocuments");
        case "proposalhistory":
          return history.push("/master/proposalhistory");
        // default:  return history.push('/leadmasterpage/statuslead');
      }
    }
    // if(activeKey){
    //     switch (activeKey) {
    //         case "1": return history.push('/renewalMaster/allRenewals');
    //         case "2": return history.push('/renewalMaster/paidRenewals');
    //         case "3": return history.push('/renewalMaster/unpaidRenewals');
    //         case "4": return history.push('/renewalMaster/lapsedRenewals');
    //     }
    // }
  };

  // const handler = (activeRenewalkey) => {
  //     // setactiveKey(key)

  //     switch (activeRenewalkey) {
  //         case "1": return history.push('/renewalMaster/all');
  //         // case "2": return history.push('/leadmasterpage/leaddetails/personallead');
  //         // case "3": return history.push('/leadmasterpage/proposal');
  //         // case "4": return history.push('/leadmasterpage/leadmasterdoc/leaddoc');
  //         // case "5": return history.push('/leadmasterpage/leadhistorymaster/leadhistory');
  //         default:  return history.push('/leadmasterpage/statuslead');
  //     }
  // }

  let tabPane = [];
  if (tabMenu && !_.isEmpty(tabMenu)) {
    tabPane = _.map(tabMenu, (value, id) => {
      return <TabPane key={value.id} tab={value.value}></TabPane>;
    });
  }
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  return (
    <>
      {width > breakpoint ? (
        <div className="header-img mainTabsStyle">
          <div className="sales-Header">
            <p>Presales Tools</p>
          </div>
          <p className="header-title">{header}</p>
          <div className="tab-section">
            <Tabs
              tabBarGutter={20}
              centered={false}
              type="card"
              onTabClick={handler}
              size="large"
              activeKey={activeKey}
              style={{ marginLeft: "120px" }}
            >
              {tabPane}
            </Tabs>
          </div>
        </div>
      ) : (
        <>
          <Tabs
            tabBarGutter={20}
            className="TabMenu-Card mainTabsStyle"
            onTabClick={handler}
            size="medium"
            activeKey={activeKey}
            style={{ margin: "20px" }}
          >
            {tabPane}
          </Tabs>
        </>
      )}
    </>
  );
};

export default MainTabs;
/* <Tabs defaultActiveKey="1" tabBarGutter={10} style={style} centered={true} type="card">
<TabPane tab={card} key="1"  style={gridStyle}>
</TabPane>
<TabPane tab="All leads" key="1"  >
</TabPane>
<TabPane tab="All leads" key="1"  >
</TabPane>
</Tabs>
<Menu  mode="horizontal">
<Menu.Item key="mail" style={gridStyle}>
All leads
</Menu.Item>
<Menu.Item key="mail" style={gridStyle}>
All leads
</Menu.Item>
<Menu.Item key="mail" >
{card}
</Menu.Item>
</Menu> */

// let card2 = <Card className="tab-pane">
//                     Open
//                     <Button type="primary" danger={true} shape="circle" size="small">
//                         10
//                     </Button>
//                 </Card>
//     let card3 = <Card className="tab-pane">
//                     Failed
//                     <Button type="primary" danger={true} shape="circle" size="small">
//                         12
//                     </Button>
//                 </Card>
