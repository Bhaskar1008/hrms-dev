import React, { useEffect, useState } from 'react';
import { Avatar,Button,Modal,Input,DatePicker} from 'antd';
import {
    FormOutlined,
MailOutlined,
  PlusOutlined,
  PhoneOutlined,
  SlidersFilled,

   } from '@ant-design/icons'; 
   import {
    BrowserRouter as Router,
    useLocation
  } from "react-router-dom";

import './ExistingPartnerDetails.css';
import CreateAdvisorModal from './CreateAdvisorModal';
import axios from 'axios';
import PartnerFloatButton from './PartnerFloatButton';
import moment from 'moment';
const UserList = ['U', 'L', 'To', 'Ed'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];
const ExistingPartnerDetails=()=>{
    const [user, setUser] = useState(UserList[0]);
    const [color, setColor] = useState(ColorList[0]);
    const [gap, setGap] = useState(GapList[0]);
    const location=useLocation();
    const{partnerId}=location.state;
    const[isAdvisorModalVisible,setIsAdvisorModalVisible]=useState(false)
    const[fetchedPartnerObj,setFetchedPartnerObj]=useState();
    const[updatePartnerName,setUpdatePartnerName]=useState(fetchedPartnerObj? fetchedPartnerObj.partnerName:"");
    const[updateMobileNo,setUpdateMobileNo]=useState("")
    const[updateEmailId,setUpdateEmailId]=useState("");
    const[updateAddress,setUpdateAddress]=useState("");
    const[updateDateOfBirth,setUpdateDateOfBirth]=useState();
    const[partnerDocumentId,setPartnerDocumentId]=useState("")
    const[updateCheck,setUpdateCheck]=useState(false);
    useEffect(()=>{
      axios.get(`https://sdtatadevlmsv2.iorta.in/auth/user/fetch_existing_partners?userId=616e908c43ed727bbac8d2d4&partnerId=${partnerId}`)
      .then((res)=>{
        setFetchedPartnerObj(res.data.data[0][0])
        setUpdatePartnerName(res.data.data[0][0].partnerName)
        setUpdateMobileNo(res.data.data[0][0].contactNo)
        setUpdateEmailId(res.data.data[0][0].emailAddress)
        setUpdateAddress(res.data.data[0][0].addresss)
        setUpdateDateOfBirth(res.data.data[0][0].dateOfBirth?moment(res.data.data[0][0].dateOfBirth):"")
        setPartnerDocumentId(res.data.data[0][0]._id)
        
      })
      .catch((err)=>{
console.log(err)
      })
      // alert(isAdvisorModalVisible)
    },[updateCheck])
    const UpdateDataFunc=()=>{
      setIsUpdateModalVisible(false);

      axios.put(`https://sdtatadevlmsv2.iorta.in/auth/user/update_partner`,{
    
     
      
      
      
      
      
      
        address: updateAddress,
        contactNo: updateMobileNo,
        dateOfBirth: moment(updateDateOfBirth).format("DD-MM-YYYY"),
        emailAddress: updateEmailId,
        partnerName: updatePartnerName,
        partner_document_id: partnerDocumentId,
        userID: "616e908c43ed727bbac8d2d4",
  
        
      
      
     
        })
.then((res)=>{
  
  
setUpdateCheck(true)
})
.catch((err)=>{
  console.log(err)
})
    }
    const CreateEventButtonFunc=()=>{
      setIsAdvisorModalVisible(true)
      // alert(isAdvisorModalVisible)
    }
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

    const showModal = () => {
      setIsUpdateModalVisible(true);
      setUpdateCheck(false)
    };
  
    const handleOk = () => {
      setIsUpdateModalVisible(false);
      setUpdateCheck(false)
    };
  
    const handleCancel = () => {
      setIsUpdateModalVisible(false);
      setUpdateCheck(false)
    };
    const onChangeDate=(date, dateString)=> {
      setUpdateDateOfBirth(date)
    }
    const UpdatePartnerNameFunc=(e)=>{
      setUpdatePartnerName(e.target.value)
    }
    const UpdateEmailIdFunc=(e)=>{
      setUpdateEmailId(e.target.value)
    }
    const UpdateMobileNoFunc=(e)=>{
      setUpdateMobileNo(e.target.value)
    }
    const UpdateAddressFunc=(e)=>{
      setUpdateAddress(e.target.value)
    }
    return(
        <div
        className="Existingpartnerdetails-main-flex"
        >
       <div
       className="Existingpartnerdetails-row-flex"
       >

           {/*Card Region */}
<div
className="Existingpartnerdetails-card-flex"
>
<Modal 
className="Existingpartnerdetails-modal-style"
title="Update Contact Details" visible={isUpdateModalVisible} onOk={handleOk} 
footer={[
 
  
      <Button type="primary" className="Existingpartnerdetails-modal-update-button-style"
      onClick={UpdateDataFunc}
      >Update</Button>,
      <Button type="primary" className="Existingpartnerdetails-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,


  
  
]}
width="50%"
bodyStyle={{
  height: "auto",
  // display:"flex",
  // flexDirection:"column"
  overflowY: "scroll"

}}
>
        <div
        className="Existingpartnerdetails-modal-row-flex"
        >
          <div>
          <p className="Existingpartnerdetails-modal-title-text-style">Partner Name</p>
          <input         className="Existingpartnerdetails-modal-input-style"
           value={updatePartnerName} 
           onChange={UpdatePartnerNameFunc}/>
          </div>
          <div>
          <p className="Existingpartnerdetails-modal-title-text-style">Email Id</p>
          <input         className="Existingpartnerdetails-modal-input-style"
          value={updateEmailId}
          onChange={UpdateEmailIdFunc}
          />
          </div>
        </div>
        <div
        className="Existingpartnerdetails-modal-row-flex"
        >
          <div>
          <p className="Existingpartnerdetails-modal-title-text-style">Contact No</p>
          <input         className="Existingpartnerdetails-modal-input-style" 
          value={updateMobileNo}
          onChange={UpdateMobileNoFunc}
          />
          </div>
          <div>
          <p className="Existingpartnerdetails-modal-title-text-style">Address</p>
          <input         className="Existingpartnerdetails-modal-input-style"
          value={updateAddress}
          onChange={UpdateAddressFunc}
          />
    
          </div>
        </div>
        <div
        className="Existingpartnerdetails-modal-row-flex"
        >
            <div>
          <p className="Existingpartnerdetails-modal-title-text-style">Date Of Birth</p>
          <DatePicker className="Existingpartnerdetails-modal-input-style"
          value={updateDateOfBirth}
          onChange={onChangeDate} />
          </div>
        </div>
        
      </Modal>
<div
className="Existingpartnerdetails-card-style"
>
<div
className="Existingpartnerdetails-avatar-flex"
>
<div
className="Existingpartnerdetails-avatar-row-flex"
>
    <div
    className="Existingpartnerdetails-avatar-row-flex"
    >
<Avatar
        style={{
          backgroundColor: "#00ACC1",
          verticalAlign: 'middle',
        
          marginRight:"10px"
        }}
        size="large"
        gap={gap}
      >
      {fetchedPartnerObj?fetchedPartnerObj.partnerName.match(/\b(\w)/g).join('').toUpperCase():""}
      </Avatar>
      <div
      className="Existingpartnerdetails-avatar-name-column-flex"
      >
      <p className="Existingpartnerdetails-avatar-name-text-style">{fetchedPartnerObj? fetchedPartnerObj.partnerName:""}</p>
      <p className="Existingpartnerdetails-avatar-partner-text-style"><strong>Partner ID</strong> {fetchedPartnerObj? fetchedPartnerObj.partnerId:""}</p>
      </div>
 
     </div>
     <div
     className="Existingpartnerdetails-modal-pointer"
     onClick={showModal}
     >
     <FormOutlined 
       style={{
        fontSize:"20px",
        marginTop:"10px",
       
        // marginRight:"8px"
        }}
      />
     </div>
     
</div>

</div>
<div
className="Existingpartnerdetails-card-middle-horizontal-line-style"
></div>

<div
className="Existingpartnerdetails-contacts-flex"
>

<div
className="Existingpartnerdetails-contacts-row-flex"
>
<p className="Existingpartnerdetails-contacts-text-style">Contact</p>
<div
className="Existingpartnerdetails-create-event-row-flex"
onClick={CreateEventButtonFunc}
>
<p className="Existingpartnerdetails-create-event-text-style">Create an event</p>
    <PlusOutlined
        style={{
          fontSize:"16px",
          marginTop:"3px",
          color:"#00ACC1"
      
          // marginRight:"8px"
          }}
    />
</div>
    
</div>

</div>
<div
className="Existingpartnerdetails-card-middle-horizontal-line-style"
></div>
<div
className="Existingpartnerdetails-phone-mail-flex"
>
  <div
  className="Existingpartnerdetails-phone-mail-row-flex"
  >
    <MailOutlined 
 style={{
  fontSize:"16px",
  marginRight:"9px",
  marginTop:"3px"
  
  }}
/>
<p className="Existingpartnerdetails-phone-mail-number-text-style">{fetchedPartnerObj?fetchedPartnerObj.emailAddress:""}</p>
  </div>
  <div
  className="Existingpartnerdetails-phone-mail-row-flex"
  >
      <PhoneOutlined 
          rotate="180"
   style={{
    fontSize:"16px",
    marginRight:"9px",
    marginTop:"3px"
    
    }}
  />
  <p>{fetchedPartnerObj?fetchedPartnerObj.contactNo:""}</p>
  </div>

</div>
<div
className="Existingpartnerdetails-card-middle-horizontal-line-style"
></div>
<div
className="Existingpartnerdetails-birthdate-flex"
>
  <div
  className="Existingpartnerdetails-birthdate-row-flex"
  >
  <p>Date of Birth</p>
  <p className="Existingpartnerdetails-birthdate-text-style">{moment(updateDateOfBirth).format("DD-MM-YYYY")}</p>
  </div>

</div>
<div
className="Existingpartnerdetails-card-middle-horizontal-line-style"
></div>
<div
className="Existingpartnerdetails-inner-card-flex"
>
  <div
  className="Existingpartnerdetails-inner-card-row-flex"
  >
  <div className="Existingpartnerdetails-inner-card-style">
    <div
    className="Existingpartnerdetails-inner-card-top-style"
    >
      <div
          className="Existingpartnerdetails-inner-card-top-column-flex"
      >
      <p className="Existingpartnerdetails-inner-card-top-heading-text">Target</p>
      <p className="Existingpartnerdetails-inner-card-top-rupees-text">₹{fetchedPartnerObj?fetchedPartnerObj.target:""}</p>
      </div>

      <div
          className="Existingpartnerdetails-inner-card-top-column-flex"
      >
      <p className="Existingpartnerdetails-inner-card-top-heading-text">Achieved</p>
      <p className="Existingpartnerdetails-inner-card-top-rupees-text">₹{fetchedPartnerObj?fetchedPartnerObj.achivement:""}</p>
      </div>
      <div
          className="Existingpartnerdetails-inner-card-top-column-flex"
      >
      <p className="Existingpartnerdetails-inner-card-top-heading-text">%Achieved</p>
      <p className="Existingpartnerdetails-inner-card-top-rupees-text">{fetchedPartnerObj?(100*fetchedPartnerObj.achivement)/fetchedPartnerObj.target:""}%</p>
      </div>
    </div>

<div
className="Existingpartnerdetails-card-middle-horizontal-card-line-style"
></div>
<div
className="Existingpartnerdetails-card-middle-horizontal-card-margin-style"
>
<p className="Existingpartnerdetails-inner-card-top-heading-text">Current Club*</p>
<div className="Existingpartnerdetails-card-innercard-row-flex">
<p className="Existingpartnerdetails-inner-card-top-rupees-text">{fetchedPartnerObj?fetchedPartnerObj.currentClubBasisGWP.clubName:""}</p>
<p className="Existingpartnerdetails-inner-card-top-heading-text">*As per GPW</p>
</div>

</div>




<div
className="Existingpartnerdetails-card-middle-horizontal-card-line-style"
></div>
<div
className="Existingpartnerdetails-card-middle-horizontal-card-margin-style"
>
<p className="Existingpartnerdetails-inner-card-top-heading-text">Next Club*</p>
<div className="Existingpartnerdetails-card-innercard-row-flex">
<p className="Existingpartnerdetails-inner-card-top-rupees-text">{fetchedPartnerObj?fetchedPartnerObj.nextClub.clubName:""}</p>
<div
          className="Existingpartnerdetails-inner-card-top-column-flex"
      >
      <p className="Existingpartnerdetails-inner-card-top-heading-text">Balance to Achieve</p>
      <p className="Existingpartnerdetails-inner-card-top-rupees-text">₹{fetchedPartnerObj?fetchedPartnerObj.balance_to_achieve_next_club:""}</p>
      </div>
<p className="Existingpartnerdetails-inner-card-top-heading-text">*As per GPW</p>
</div>

</div>
  </div>
  </div>
  
</div>

</div>
</div>
<div
     
     className="Existingpartnerdetails-floater-button-column-flex"
 >
   <PartnerFloatButton/>
{/* <Button
    onClick={()=>{}}
    
    className="Existingpartnerdetails-floater-button-style"
    type="primary" shape="circle" icon={<PlusOutlined  
        style={{
            fontSize:"30px",
       
       
            // marginRight:"8px"
            }}
    rotate={90}/>}  /> */}
</div>

       </div>
       {isAdvisorModalVisible?
        <CreateAdvisorModal
        advisorModalVisible={true}
        advisorName="siddhesh"
        />
       :null}
      
        </div>
    )
}
export default ExistingPartnerDetails