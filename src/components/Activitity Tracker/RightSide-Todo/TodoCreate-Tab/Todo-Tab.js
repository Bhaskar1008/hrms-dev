import { Button, Modal,TimePicker,DatePicker,Input ,Select ,message , MenuProps, AutoComplete  } from 'antd';
import React, { useEffect, useState } from 'react';
import {SearchOutlined , CloseOutlined} from '@ant-design/icons'
import moment from 'moment';

import './Todo-Tab.css'
import axiosRequest from '../../../../axios-request/request.methods';

import {stoageGetter} from '../../../../helpers'
import { useDispatch, useSelector } from 'react-redux';
import _ from "lodash";
import { convertTimeToDecimal, convertToIndianTimezone } from '../../../../helper/utils';

const { Option } = Select;
const { Search } = Input;


const TodoTab = (props) => {  
  const login_user_data = stoageGetter("user");
  
  const [isHighButtonClick ,setIsHighButtonClick]=useState(false)
  const [isMediumButtonClick ,setIsMediumButtonClick]=useState(false)
  const [isLowButtonClick ,setIsLowButtonClick]=useState(false)
  const [priorityBtn ,setPriorityBtn]=useState('medium')
  const [priorityBtnColr ,setPriorityBtnColr]=useState('#fb8c00')
  const [reminderDate ,setReminderDate]=useState('')
  const [reminderDateString ,setReminderDateString]=useState('')
  const [todoDesc ,setTodoDesc]=useState('')
  const [usercreatedid ,setusercreatedid]=useState(true)
  const [selectedTime ,setSelectedTime]=useState('select')
  const [buttonName ,setButtonName]=useState('')
  const [createTodoCheck, setCreateTodoCheck] = useState(true)
  const [hierarAgentList ,setHierarAgentList]=useState([])
  const [teamMemberChip ,setTeamMemberChip]=useState([])
  const [ownerCollectn ,setOwnerCollectn]=useState([])
  const [teamMemberData ,setTeamMemberData]=useState('')
  const [isDisabled, setIsDisabled] = useState(true);
  const [open, setOpen] = useState(false);



  const _dataStore = useSelector((state) => state?.home?.user_tree)
  const minimumDate = moment().format("MM-DD-YYYY")
  // var usercreatedid = false

  //const userId1 = useSelector((state) => state?.login?.user?.designation);
  const userId1 = login_user_data.userRole[0].roleName
  
  

  useEffect(() => {
    let _teamMember = []
    if(Object.keys(_dataStore).length !== 0){
      _dataStore?.reporting_users?.map(el => {
          let sortarray = {
              FullName: el.full_name,
              ShortId: el.employeeCode,
              // firstname: el.first_name,
              // lastname: el.last_name,
              // employecode: el.employeeCode,
              designation: el.hierarchyName,
              _Id: el._id,
              //value:toCapitalize(el.full_name) + ' ' + '('+el.hierarchyName+')'
               value:el.full_name === 'undefined undefined' ? 'No Data Found' : toCapitalize(el.full_name) + ' ' + '('+el.hierarchyName+')'
          }
          _teamMember.push(sortarray)
          sortarray = {};

      })
      
      setHierarAgentList(_teamMember)
      
    }
  },[])

  useEffect(() => {
    try{
    if(props.button === 'Create' && props.isModalVisible === true) {
      setButtonName(props.button)
      // clearData()
    }

    if(props.button === 'Update' && props.isModalVisible === true) setButtonName(props.button)

    
    if(Object.keys(props.editData).length === 0){
      // usercreatedid = true
      setusercreatedid(true)
    }else{
      
      let {id} = stoageGetter('user')
      let data = props.editData.taskOwner_id !== id ? false :true
      setusercreatedid(data)
      // usercreatedid = data
      
    }


    if(Object.keys(props.editData).length !== 0 || props.editData !== undefined){
      
     
      let _teamMember = props.editData.searchdata.map(el =>{ return toCapitalize(el.FullName) + ' ' + '('+el.designation+')' })
      setTeamMemberChip(_teamMember)
      setOwnerCollectn(props.editData.searchdata)
      
      let _data = moment(moment(props.editData.dateofreminder).format("MM-DD-YYYY"), "MM-DD-YYYY")
      if(props.editData.taskPriority === 'low'){
        setIsHighButtonClick(false)
        setIsMediumButtonClick(false)
        setIsLowButtonClick(true)
      }else if(props.editData.taskPriority === 'high'){
        setIsHighButtonClick(true)
        setIsMediumButtonClick(false)
        setIsLowButtonClick(false)
      }else{
        setIsHighButtonClick(false)
        setIsMediumButtonClick(true)
        setIsLowButtonClick(false)
      }
      
      setPriorityBtn(props.editData.taskPriority)
      setPriorityBtnColr(props.editData.priorityIndicatorColor)
      setReminderDate(_data)
      setReminderDateString(moment(props.editData.dateofreminder).format("MM-DD-YYYY"))
      setTodoDesc(props.editData.content)
      setSelectedTime(props.editData.stringtimeofreminder)
      setTodoDesc(props.editData.content)
    }
  }catch(err){}
    
  },[props]);

  let toCapitalize = (strText) =>{
    try {
        if (strText !== '' && strText !== null && typeof(strText) !== undefined) {
            var _str = strText.toLowerCase();
            var collection = _str.split(" ");
            var modifyStrigs = [];
            _str = '';
            for (var i = 0; i < collection.length; i++) {
                modifyStrigs[i] = collection[i].charAt(0).toUpperCase() + collection[i].slice(1);
                _str = _str + modifyStrigs[i] + ' ';
            }
            return _str;
        } else {
            return "";
        }
    } catch (err) {

    }
};

useEffect(()=>{},[createTodoCheck])

  let timeListText = [
    {
      dispValue: "Select",
      label: "Select",
      value: "select"
    }, 
    {
    dispValue: "12:00 AM",
    label: "12:00 AM",
    value: "12:00 AM"
  }, {
    dispValue: "12:30 AM",
    label: "12:30 AM",
    value: "12:30 AM"
  }, {
    dispValue: "1:00 AM",
    label: "1:00 AM",
    value: "1:00 AM"
  }, {
    dispValue: "1:30 AM",
    label: "1:30 AM",
    value: "1:30 AM"
  }, {
    dispValue: "2:00 AM",
    label: "2:00 AM",
    value: "2:00 AM"
  }, {
    dispValue: "2:30 AM",
    label: "2:30 AM",
    value: "2:30 AM"
  }, {
    dispValue: "3:00 AM",
    label: "3:00 AM",
    value: "3:00 AM"
  }, {
    dispValue: "3:30 AM",
    label: "3:30 AM",
    value: "3:30 AM"
  }, {
    dispValue: "4:00 AM",
    label: "4:00 AM",
    value: "4:00 AM"
  }, {
    dispValue: "4:30 AM",
    label: "4:30 AM",
    value: "4:30 AM"
  }, {
    dispValue: "5:00 AM",
    label: "5:00 AM",
    value: "5:00 AM"
  }, {
    dispValue: "5:30 AM",
    label: "5:30 AM",
    value: "5:30 AM"
  }, {
    dispValue: "6:00 AM",
    label: "6:00 AM",
    value: "6:00 AM"
  }, {
    dispValue: "6:30 AM",
    label: "6:30 AM",
    value: "6:30 AM"
  }, {
    dispValue: "7:00 AM",
    label: "7:00 AM",
    value: "7:00 AM"
  }, {
    dispValue: "7:30 AM",
    label: "7:30 AM",
    value: "7:30 AM"
  },
  {
    dispValue: "8:00 AM",
    label: "8:00 AM",
    value: "8:00 AM"
  }, {
    dispValue: "8:30 AM",
    label: "8:30 AM",
    value: "8:30 AM"
  }, {
    dispValue: "9:00 AM",
    label: "9:00 AM",
    value: "9:00 AM"
  }, {
    dispValue: "9:30 AM",
    label: "9:30 AM",
    value: "9:30 AM"
  }, {
    dispValue: "10:00 AM",
    label: "10:00 AM",
    value: "10:00 AM"
  }, {
    dispValue: "10:30 AM",
    label: "10:30 AM",
    value: "10:30 AM"
  }, {
    dispValue: "11:00 AM",
    label: "11:00 AM",
    value: "11:00 AM"
  }, {
    dispValue: "11:30 AM",
    label: "11:30 AM",
    value: "11:30 AM"
  }, {
    dispValue: "12:00 PM",
    label: "12:00 PM",
    value: "12:00 PM"
  }, {
    dispValue: "12:30 PM",
    label: "12:30 PM",
    value: "12:30 PM"
  }, {
    dispValue: "1:00 PM",
    label: "1:00 PM",
    value: "1:00 PM"
  }, {
    dispValue: "1:30 PM",
    label: "1:30 PM",
    value: "1:30 PM"
  }, {
    dispValue: "2:00 PM",
    label: "2:00 PM",
    value: "2:00 PM"
  }, {
    dispValue: "2:30 PM",
    label: "2:30 PM",
    value: "2:30 PM"
  }, {
    dispValue: "3:00 PM",
    label: "3:00 PM",
    value: "3:00 PM"
  }, {
    dispValue: "3:30 PM",
    label: "3:30 PM",
    value: "3:30 PM"
  }, {
    dispValue: "4:00 PM",
    label: "4:00 PM",
    value: "4:00 PM"
  }, {
    dispValue: "4:30 PM",
    label: "4:30 PM",
    value: "4:30 PM"
  }, {
    dispValue: "5:00 PM",
    label: "5:00 PM",
    value: "5:00 PM"
  }, {
    dispValue: "5:30 PM",
    label: "5:30 PM",
    value: "5:30 PM"
  }, {
    dispValue: "6:00 PM",
    label: "6:00 PM",
    value: "6:00 PM"
  }, {
    dispValue: "6:30 PM",
    label: "6:30 PM",
    value: "6:30 PM"
  }, {
    dispValue: "7:00 PM",
    label: "7:00 PM",
    value: "7:00 PM"
  }, {
    dispValue: "7:30 PM",
    label: "7:30 PM",
    value: "7:30 PM"
  }, {
    dispValue: "8:00 PM",
    label: "8:00 PM",
    value: "8:00 PM"
  }, {
    dispValue: "8:30 PM",
    label: "8:30 PM",
    value: "8:30 PM"
  }, {
    dispValue: "9:00 PM",
    label: "9:00 PM",
    value: "9:00 PM"
  }, {
    dispValue: "9:30 PM",
    label: "9:30 PM",
    value: "9:30 PM"
  }, {
    dispValue: "10:00 PM",
    label: "10:00 PM",
    value: "10:00 PM"
  }, {
    dispValue: "10:30 PM",
    label: "10:30 PM",
    value: "10:30 PM"
  }, {
    dispValue: "11:00 PM",
    label: "11:00 PM",
    value: "11:00 PM"
  }, {
    dispValue: "11:30 PM",
    label: "11:30 PM",
    value: "11:30 PM"
  }
  ]

  const handleOk = () => {
    props.setIsModalVisible(false);
    clearData()
  };

  const handleCancel = () => {
    props.setIsModalVisible(false);
    clearData()
  };

  const [windowWidth, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  const onChangeDatePick = (date, dateString) => {
    setCreateTodoCheck(true)
    setReminderDateString(dateString)
    setReminderDate(date)
  };

  const submitTodoData = async () =>{
    const {id} = stoageGetter('user')
    // return
      if(buttonName === 'Create'){
        if(todoDesc === ''){
            message.warning('Please Add Task Name');
            return
        }
        if(priorityBtn === ''){
            message.warning('Please select priority');
            return
        }
        if(reminderDate === ''){
            message.warning('Please select due date');
            return
        }
        if(selectedTime === '' || selectedTime === 'select'){
            message.warning('Please select time');
            return
        }

        let allocationdata = [];
        if(ownerCollectn === null || ownerCollectn === undefined || ownerCollectn === ""){
            allocationdata.push(id);

        }else{
            ownerCollectn.map(x => { allocationdata.push(x._Id) });
            allocationdata.push(id);
        }

        let _ownerCollectn = _.uniqBy(ownerCollectn,'ShortId'); 
        allocationdata = [...new Set(allocationdata)];
        let _ownerCollectnFD = _ownerCollectn.map(el=>{
          return {
            FullName: el.FullName,
            ShortId: el.ShortId,
            designation: el.designation,
            _Id: el._Id,
            remarkText :el.remarkText,
            remarkDate: el.remarkDate,
            taskDone: el.taskDone,
            remarkNotification: el.remarkNotification
          }
        })
        let filter_ownerCollectnFD = _ownerCollectnFD.filter((value) => Object.keys(value).length !== 0);
        let formData ={
          dateOfReminder: convertToIndianTimezone(reminderDateString, true),
          description: todoDesc,
          owernersCollectionDetails: filter_ownerCollectnFD,
          priorityIndicatorColor: priorityBtnColr,
          taskOwner: id,
          taskOwners:allocationdata,
          taskPriority: priorityBtn,
          timeOfReminder: convertTimeToDecimal(selectedTime),
          // userId: id
        }
        // if(formData.owernersCollectionDetails.length > 3){
        //   message.warning('Only Three Members are Allowed');
        //   // return
        // }else{
          let _resp = await axiosRequest.post(`user/todo_task`,formData, { secure: true })
    setCreateTodoCheck(false)

        if(_resp.length !== 0){
          handleCancel()
          props.getTodoData()
        }
        // }
        

      }else{

        let allocationdata = [];
        if(ownerCollectn === null || ownerCollectn === undefined || ownerCollectn === ""){
            allocationdata.push(id);

        }else{
            ownerCollectn.map(x => { allocationdata.push(x._Id) });
            allocationdata.push(id);
        }
        let _ownerCollectn = _.uniqBy(ownerCollectn,'ShortId'); 
        allocationdata = [...new Set(allocationdata)];
        let _ownerCollectnFD = _ownerCollectn.map(el=>{
          return {
            FullName: el.FullName,
            ShortId: el.ShortId,
            designation: el.designation,
            _Id: el._Id,
            remarkText :el.remarkText,
            remarkDate: el.remarkDate,
            taskDone: el.taskDone,
            remarkNotification: el.remarkNotification
          }
        })
        let filter_ownerCollectnFD = _ownerCollectnFD.filter((value) => Object.keys(value).length !== 0);
        let formData ={
          dateOfReminder: convertToIndianTimezone(reminderDateString, true),
          description: todoDesc,
          owernersCollectionDetails: filter_ownerCollectnFD,
          priorityIndicatorColor: priorityBtnColr,
          taskOwner: id,
          taskOwners: allocationdata,
          taskPriority: priorityBtn,
          timeOfReminder: convertTimeToDecimal(selectedTime),
          taskId:props.editData.todoid,
          userId: id
        }


        // if(formData.owernersCollectionDetails.length > 3){
        //   message.warning('Only Three Members are Allowed');
        //   // return
        // }else{
           
          let _resp = await axiosRequest.put(`user/update_task_status`,formData, { secure: true })

        // setIsModalVisible(false);
        if(_resp.length !== 0){
          handleCancel()
          props.getTodoData()
        }
       
        // }


        
      }
  }

  const clearData = () =>{
      setPriorityBtn('medium')
      setPriorityBtnColr('#fb8c00')
      setIsHighButtonClick(false)
      setIsMediumButtonClick(true)
      setIsLowButtonClick(false)
      // setPriorityBtn('')
      // setPriorityBtnColr('')
      setReminderDate('')
      setTodoDesc('')
      setSelectedTime('select')
      setOwnerCollectn([])
      setTeamMemberChip([])
      setTeamMemberData('')
  }
  const handleTimeChange = (value) => {
    setCreateTodoCheck(true)
    setSelectedTime(value)
  };
  
  const onChangeTeam = (text,data) => {
    if (text == 'No Data Found') {
      setTeamMemberData('')
      setOwnerCollectn([])

    }else{
      setTeamMemberData(text)
       let newArray = [...ownerCollectn,data]
       let _OwnerData = newArray.filter((value) => Object.keys(value).length !== 0);
      //  const MAPownerData = newArray.map(ele => ele.value)
      //  const FILTERownerData = _OwnerData.filter(({value}, index) => !MAPownerData.includes(value, index + 1))
      //   console.log(newArray, _OwnerData, FILTERownerData, 'FILTERownerData');
      //  setOwnerCollectn(FILTERownerData)
       setOwnerCollectn(_OwnerData)
      //  setOwnerCollectn([...ownerCollectn,data])

    }
    
  };

  // const onSearch = () =>{
  //   setHierarAgentList(_teamMember)
  // }
  
  
  const onSelectTeam = (value) => {
    if (value == 'No Data Found') {
      setTeamMemberData('')
      let selectData = []
      setTeamMemberChip(selectData)
    }else{
      setTeamMemberData('')
      let _data = [...new Set([...teamMemberChip,value])]
      let _finalData = _data.filter(ele=>ele!=undefined)

      setTeamMemberChip(_finalData)
    }
     
  }

  const removeTeamMember = (data,ind) => {
    let splitarray = data.split('(')
    let finalarray = splitarray[0].trim()
    let _arrayOwner = ownerCollectn.filter((item,index) => item.FullName.toLowerCase() !== finalarray.toLowerCase())
    setOwnerCollectn(_arrayOwner)
    let _array = teamMemberChip.filter((item,index) => index !== ind)
    setTeamMemberChip(_array)
  }

  const settodoonchange = (e) =>{
    setCreateTodoCheck(true)
    setTodoDesc(e.target.value)
  }

  
  
  
  return (
    <div>
      <Modal title="To Do" 
        visible={props.isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        className='todo-popup-container-width'
        >
            <div className='Todo-Create-Container'>
              
                <div className='Todo-Col-shadow-box'>
                {userId1 === "Agent" ? "" : <>
                <div className='Todo-Create-Header' style={{marginBottom:5}}>
                        <p style={{marginBottom:0}}> Add Team Member</p>
                    </div>
                    <div className='Todo-Create-SearchBox todoSearch'>
                        {/* <input type='text' placeholder='Search by Name'/> */}
                        {/* <SearchOutlined /> */}
                        {/* <Input addonAfter={<SearchOutlined />} placeholder="Search by Name" /> */}
                        {/* <Search placeholder="Search by Name" onSearch={onSearch}  /> */}
                        {/* <AutoComplete
                        allowClear={false}
                          value={teamMemberData}
                          style={{width: '100%'}}
                          options={hierarAgentList}
                          onChange={(text,data)=> onChangeTeam(text,data) }
                          onSelect={onSelectTeam}
                          filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1  
                          }
                          
                          >
                            <Search  placeholder="Search by Name" />
                          </AutoComplete> */}

                          <Select
                              //  onSearch={onSearch}
                                 showSearch
                                allowClear={false}
                                value={teamMemberData}
                                style={{width: '100%'}}
                                options={hierarAgentList}
                                onChange={(text,data)=> onChangeTeam(text,data) }
                                onSelect={onSelectTeam}
                                filterOption={(inputValue, option) =>
                                  option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1  
                                }
                              />
                    </div>
              </>}
                    

                    { teamMemberChip.length !== 0 &&
                        <div style={{display:'flex',flexFlow:'wrap',alignItems:'center'}}>
                          {
                            teamMemberChip.map((item,index) =>{
                              return(
                                <div style={{marginRight:10,marginTop:10,}}>
                                  <Button 
                                  size="small" type="primary"
                                   style={{ backgroundColor: '#00ACC1',
                                   border: 'none',display:'flex',alignItems:'center' }} 
                                   shape="round" >{item} 
                                   <CloseOutlined onClick={() => removeTeamMember(item,index)} /></Button>
                                </div>
                              )
                          })
                          }
                        </div>
                      }
                    
                    <hr style={{margin:"10px 0", color:"#f4f4f4",opacity:"0.2"}}/>
                    <div className='Todo-Create-TextBox'>
                        <Input value={todoDesc} onChange={(e) => settodoonchange(e) } type='text' placeholder='What do you need to remember To Do' maxLength="100"/>
                        
                    </div>
                    <hr style={{margin:"10px 0", color:"#f4f4f4 !important",opacity:"0.2"}}/>
                    <div className='Todo-Create-Priority'>
                        <p style={{marginBottom:0}}>Add Priority</p>
                        <Button style={{backgroundColor:"#ff5252",color:"#fff"}} 
                        onClick={()=>{
                          setCreateTodoCheck(true)
                          setPriorityBtnColr('#ff5252')
                          setPriorityBtn('high')
                          setIsHighButtonClick(true)
                          if(isMediumButtonClick == true){
                            setIsMediumButtonClick(false)
                          }else if(isLowButtonClick ==true){
                            setIsLowButtonClick(false)
                          }
                        }}
                        className={isHighButtonClick ?'buttonOpacity':""}
                        >
                          High
                        </Button>
                        <Button 
                        style={{backgroundColor:"#fb8c00",color:"#fff"}} 
                        onClick={()=>{
                          setCreateTodoCheck(true)
                          setPriorityBtnColr('#fb8c00')
                          setPriorityBtn('medium')
                          setIsMediumButtonClick(true)
                          if(isHighButtonClick == true){
                            setIsHighButtonClick(false)
                          }else if(isLowButtonClick ==true){
                            setIsLowButtonClick(false)
                          }
                        }}
                        className={isMediumButtonClick ?'buttonOpacity':""}
                        >
                          Medium
                        </Button>
                        <Button style={{backgroundColor:"#4caf50",color:"#fff"}} 
                          onClick={()=>{
                            setCreateTodoCheck(true)
                            setPriorityBtnColr('#4caf50')
                            setPriorityBtn('low')
                            setIsLowButtonClick(true)
                          if(isHighButtonClick == true){
                            setIsHighButtonClick(false)
                          }else if(isMediumButtonClick ==true){
                            setIsMediumButtonClick(false)
                          }
                        }}
                        className={isLowButtonClick ?'buttonOpacity':""}
                        >
                          Low
                        </Button>
                    </div>
                    <hr style={{margin:"10px 0", color:"#f4f4f4 !important",opacity:"0.4"}}/>
                    <div className={[ windowWidth < breakpoint ? 'Todo-Create-FooterReminder-mob' : 'Todo-Create-FooterReminder' ]} style={{display: 'flex'}}>
                        <p>Set a Due Reminder</p>
                        {/* <input type='date' style={{marginBottom: '10px'}} /> */}
                        <DatePicker  format="MM-DD-YYYY" inputReadOnly={true} value={reminderDate} onChange={onChangeDatePick} disabledDate={d => !d || d.isBefore(minimumDate)} className='todo-ml10' style={{marginBottom: '10px',flex:1}}/>
                       
                          <Select value={selectedTime} className='todo-mb20 todo-ml10' style={{flex:1}} onChange={(time)=> handleTimeChange(time) }>
                            {
                              timeListText.map((e, index) => 
                                  <Option value={e.value}>{e.label}</Option>
                              )
                            }
                          </Select>
                          
                        <div className='todo-ml10'>
                          
                          {usercreatedid === true && (
                            <>
                            {/* {buttonName=="Update" ?
                            <Button
                            onClick={()=> submitTodoData()}
                            className='Todo-Create-FooterReminder-Button todo-mb20'>
                              Save
                            </Button> 
                            : */}
                            <Button
                              disabled={createTodoCheck==false} 
                              onClick={()=> {
                                submitTodoData()}
                              }
                              className='Todo-Create-FooterReminder-Button todo-mb20'>
                            Save
                          </Button>
                             {/* } */}
                            </>
                          )}
                             
                        </div>
                        
                    </div>
                </div>
            </div>
            
      </Modal>
      </div>
    // </>
  );
};

export default TodoTab;