import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import { Button, Input, Dropdown, Menu } from 'antd';
import TodoTab from '../TodoCreate-Tab/Todo-Tab'
import TodoClock from '../../icons/todoclock.png'
import hamburger from '../../icons/hamburger8@2x.png'
import TodoData from '../../JSON/TodoData'
import Pagenation from '../../Pagenation/Pagenation'
import { FormOutlined, ShopOutlined, DownOutlined } from '@ant-design/icons'
import '../Todo&Archive-Css/TodoCards.css'
import checkboxoutline from '../../icons/checkboxoutline.png'
import truecheckbox from '../../icons/truecheckbox.png'
import { Card, Col, Collapse, Pagination } from 'antd'
import axiosRequest from '../../../../axios-request/request.methods';
import moment from 'moment'
import { stoageGetter } from '../../../../helpers'
import '../../../Activitity Tracker/Pagenation/Pagenation.css'
import noDataIcon from '../../../../assets/078e54aa9d@2x.png'
import { positions } from '@mui/system';

function Modal({ children, shown, close }) {
    return shown ? (
        <div
            className="modal-backdrop"
            onClick={() => {
                // close modal when outside of modal is clicked

                close();

            }}
        >
            <div
                className="modal-content"
                onClick={e => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}
            >
                {/* <button onClick={close}>Close</button> */}
                {children}
            </div>
        </div>
    ) : null;
}

const TodoCards = forwardRef((props, ref) => {
    const { id } = stoageGetter('user')
    let loginUserID = id
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showData, setShowData] = useState(false);
    const [getTodoDataArray, setGetTodoDataArray] = useState([]);
    const [updateData, setUpdateData] = useState({});
    const [totolDataCount, setTotolDataCount] = useState(0);
    const [buttonName, setButtonName] = useState('');
    const [usercreatedid, setusercreatedid] = useState(true)
    const [open, setOpen] = useState(false);
    const [modalShown, toggleModal] = useState(false);


    const [totalPage, setTotalPage] = useState(0);
    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);
    const [isHamburger, setHamburger] = useState(false);
    const [skipVal, setSkipVal] = useState(0);
    const [fval, setFval] = useState(0);
    const [sval, setSval] = useState(0);
    const [swap_final_count, setSwap_final_count] = useState(false);
    const [remarkDataEnt, setRemarkDataEnt] = useState('');

    const showModal = (event, ind) => {
        // setButtonName('Update')
        getTodoDataArray[ind].showarchiedpopup = false
        setUpdateData(event)
        setIsModalVisible(true);
    };

    useImperativeHandle(ref, () => ({
        getTodoData: () => { getTodoData(0) }
    }));

    const closeFunction = (ind) => {
        let _data = getTodoDataArray.map((ev, index) => {
            ind === index ? ev.showarchiedpopup === false ? ev.showarchiedpopup = false : ev.showarchiedpopup = false : ev.showarchiedpopup = false
            return ev
        })

        setGetTodoDataArray(_data)
    }


    const [isEditModalIndex, setisEditModalIndex] = useState();
    // const EditModal=(index)=>{
    //     setisEditModalIndex(index)
    // }
    useEffect(() => {
        getTodoData(0)
    }, [])

    let getTodoData = async (skip) => {
        try {
            const { id } = stoageGetter('user')
            let arrData = []
            let _resp = await axiosRequest.get(`user/fetch_todo_list?filter=all&skip=${skip}`, { secure: true })
            let respData = _resp.data[0]

            setTotalPage(_resp.data[1][0].count / 5)

            setTotolDataCount(_resp.data[1][0].count)
            var less_enough = _resp.data[1][0].count
            var checkless_init = false
            less_enough < 5 ? checkless_init = false : checkless_init = true

            // if less than 15 we have second value same as total value as no pagination will occur
            if (checkless_init) {
                // checkinit is true means the final count is more than 15
                var traverse = skip + 5
                setFval(traverse - 4)
                swap_final_count ? setSval(totolDataCount) : setSval(traverse)
            } else {
                setFval(1)
                setSval(totolDataCount)
            }
            for (let _data of respData) {
                let _icon = ''
                let _remark = ''
                // let _enableRemark = null
                // let _disableSubmit = null
                let _textOverline = {}
                if (_data.taskOwner._id !== id) {
                    if (_data.owernersCollectionDetails.length !== 0) {
                        _textOverline = _data.owernersCollectionDetails[0].taskDone === false ? { textDecorationLine: '', opacity: '0' } : { textDecorationLine: 'line-through', opacity: '0' }
                        _icon = _data.owernersCollectionDetails[0].taskDone === false ? checkboxoutline : truecheckbox
                    } else {
                        _textOverline = { textDecorationLine: '', opacity: '0' }
                        _icon = checkboxoutline
                    }
                } else {
                    _textOverline = _data.taskDone === false ? { textDecorationLine: '', opacity: '0' } : { textDecorationLine: 'line-through', opacity: '0' }
                    _icon = _data.taskDone === false ? checkboxoutline : truecheckbox
                }

                if (_data.owernersCollectionDetails.length !== 0) {
                    _data.owernersCollectionDetails.forEach(event => {
                        if (event.remarkText !== '') {
                            // _enableRemark = false
                            // _disableSubmit = true
                            event.remarkData = event.remarkText
                            event.disableSubmit = true
                        } else {
                            // _enableRemark = true
                            // _disableSubmit = false
                            event.remarkData = event.remarkText
                            event.disableSubmit = false
                        }
                    })
                }

                let objstrct = {
                    content: _data.description,
                    removeBtn: _data.taskDone,
                    icon: _icon,
                    createddate: _data.createdDate,
                    dateofreminder: moment(_data.dateOfReminder).format('L'),
                    timeofreminder: parseInt(_data.timeOfReminder),
                    todoid: _data._id,
                    ownername: _data.taskOwner.first_name + ' ' + _data.taskOwner.last_name,
                    status: setTodoStatus(_data.dateOfReminder, parseInt(_data.timeOfReminder)),
                    searchdata: _data.owernersCollectionDetails,
                    taskOwner_id: _data.taskOwner._id,
                    taskPriority: _data.taskPriority,
                    priorityIndicatorColor: _data.priorityIndicatorColor,
                    showMemberRemark: false,
                    showMemText: 'Show More',
                    sooncolor: '#E46A25',
                    overduecolor: '#F44336',
                    showarchiedpopup: false,
                    remarkData: _remark,
                    textOverLine: _textOverline,
                    wholeData: _data,
                    Cretedownertaskdon: _data.taskDone,
                    isUserIdSameornot: _data.taskOwner._id !== id ? false : true
                }

                objstrct.stringtimeofreminder = moment.utc(_data.dateOfReminder + _data.timeOfReminder).utcOffset(330).format('hh:mm A')
                arrData.push(objstrct)

            }
            setGetTodoDataArray(arrData);
            // usercreatedid = data
            setShowData(true)
        } catch (err) {

        }
    }

    let setTodoStatus = (reminderDate, reminderTime) => {
        try {
            let reminderDay = reminderDate + reminderTime;
            let current_date = Date.now();

            let soon_time_ = reminderDay - ((60000 * 60) * 24);
            let start_time = new Date(current_date).setHours(0, 0, 0, 0)
            let end_time = new Date(current_date).setHours(23, 59, 59, 999)

            if (current_date > reminderDay) {
                return 'Overdue';
            } else if (start_time < soon_time_ && soon_time_ < end_time) {
                return 'Soon';
            } else {
                return '';
            }
        } catch (err) {
        }
    }

    const archiveData = async (event) => {
        //   setIsModalVisible(true);
        const { id } = stoageGetter('user')
        try {
            let formData = {
                // userId:id,
                userId: id,
                taskOwner: event.taskOwner_id,
                taskId: event.todoid,
                archive: true
            }
            let _resp = await axiosRequest.put(`user/update_task_status`, formData, { secure: true })
            setGetTodoDataArray([])
            getTodoData(0)

        } catch (err) {
        }
    };

    // const [isCompleted,setIscompleted]=useState();
    const Uncheck = (index) => {
        // setIscompleted(
        getTodoDataArray.map((item) => {
            if (item.taskOwner_id === index) {
                item.Completed === true ? item.Completed = false : item.Completed = true
            }
            return item
        })
        // )
    }

    const removListFromToDo = (data, rowIndex) => {
        const { id } = stoageGetter('user')
        let _teamMembers = []

        // let datachek = data.taskOwner_id !== id ? false :true
        //         setusercreatedid(datachek)

        // return
        // let newData = getTodoDataArray;
        if (data.removeBtn === false) {
            let _data = getTodoDataArray.map((ev, index) => {
                if (rowIndex === index) {
                    ev.removeBtn = true
                    ev.icon = truecheckbox
                    ev.textOverLine.textDecorationLine = 'line-through'
                }
                return ev
            })
            setGetTodoDataArray(_data)


            // let _teamMember =[]
            _teamMembers = _data[rowIndex].searchdata
            if (_data[rowIndex].taskOwner_id !== id) {
                var switchdata = false
                const newArr = _teamMembers.map(_ev => {
                    if (_ev._Id === id) {
                        // var switchdata = false
                        if (_ev.taskDone === false) {
                            switchdata = true
                        } else if (_ev.taskDone === true) {
                            switchdata = false
                        }

                        return {
                            ..._ev,
                            FullName: _ev.FullName,
                            designation: _ev.designation,
                            _Id: _ev._Id,
                            ShortId: _ev.ShortId,
                            remarkText: _ev.remarkText,
                            taskDone: switchdata,
                            inAppNotification: _ev.inAppNotification,
                            remarkNotification: _ev.remarkNotification,
                        };
                    }

                    return _ev;
                });

                let formdata = {
                    userId: id,
                    taskOwner: _data[rowIndex].taskOwner_id,
                    taskId: _data[rowIndex].todoid,
                    owernersCollectionDetails: newArr
                }
                updateTODOTaskApi(formdata)
            } else {

                let formdata = {
                    userId: id,
                    taskOwner: _data[rowIndex].taskOwner_id,
                    taskId: data.todoid,
                    taskDone: true
                }
                updateTODOTaskApi(formdata)
            }
        } else if (data.removeBtn === true) {

            // return
            let _data = getTodoDataArray.map((ev, index) => {
                if (rowIndex === index) {
                    ev.removeBtn = false
                    ev.icon = checkboxoutline
                    ev.textOverLine.textDecorationLine = ''
                }
                return ev
            })


            _teamMembers = _data[rowIndex].searchdata

            if (_data[rowIndex].taskOwner_id !== id) {

                var switchdata = false
                const newArr = _teamMembers.map(_ev => {
                    if (_ev._Id === id) {

                        if (_ev.taskDone === false) {
                            switchdata = true
                        } else if (_ev.taskDone === true) {
                            switchdata = false
                        }
                        return {
                            ..._ev,
                            FullName: _ev.FullName,
                            designation: _ev.designation,
                            _Id: _ev._Id,
                            ShortId: _ev.ShortId,
                            remarkText: _ev.remarkText,
                            taskDone: switchdata,
                            inAppNotification: _ev.inAppNotification,
                            remarkNotification: _ev.remarkNotification,

                        };
                    }

                    return _ev;
                });

                let formdata = {
                    userId: id,
                    taskOwner: _data[rowIndex].taskOwner_id,
                    taskId: _data[rowIndex].todoid,
                    owernersCollectionDetails: newArr
                }
                updateTODOTaskApi(formdata)
            } else {

                let formdata = {
                    userId: id,
                    taskOwner: _data[rowIndex].taskOwner_id,
                    taskId: data.todoid,
                    taskDone: false
                }
                updateTODOTaskApi(formdata)
            }
        }
    }

    const updateTODOTaskApi = async (data) => {
        setGetTodoDataArray([])
        let _resp = await axiosRequest.put(`user/update_task_status`, data, { secure: true })
        getTodoData(0)

    };

    const [ShowMore, setShowMore] = useState(false);
    const [isShowMoreIndex, setIsShowMoreIndex] = useState();
    const showMoreIndex = (index) => {
        setIsShowMoreIndex(index);
    }

    const onChangePagination = (page) => {
        let _decrement = 0
        let _increment = 0

        if (current > page) {
            _decrement = skipVal - 5
            setSkipVal(_decrement)
            getTodoData(_decrement)
        } else if (current < page) {
            _increment = skipVal + 5
            setSkipVal(_increment)
            getTodoData(_increment)
        }
        setCurrent(page)
    }

    const Showpopuptodo = (ind, data) => {
        let _data = getTodoDataArray.map((ev, index) => {
            ind === index ? ev.showarchiedpopup === true ? ev.showarchiedpopup = false : ev.showarchiedpopup = true : ev.showarchiedpopup = false
            return ev
        })

        setGetTodoDataArray(_data)
        // toggleModal(_data[ind].showarchiedpopup);
    }

    const memberRemarks = (ind) => {
        let _data = getTodoDataArray.map((ev, index) => {
            if (ind === index) {
                if (ev.showMemberRemark === false) {
                    ev.showMemberRemark = true
                    ev.showMemText = 'Show Less'
                } else if (ev.showMemberRemark === true) {
                    ev.showMemberRemark = false
                    ev.showMemText = 'Show More'
                }
            }
            return ev
        })
        setGetTodoDataArray(_data)
    };

    const submitRemark = (ind, remark, userId) => {
        let _teamMembers = []
        let _data = {}
        _teamMembers = getTodoDataArray[ind].searchdata
        // _teamMembers.map(ev => {

        //     if(userId == ev._Id){
        //         ev.remarkData = remark
        //         _data = {
        //             FullName : ev.FullName,
        //             designation : ev.designation,
        //             _Id : ev._Id,
        //             ShortId : ev.ShortId,
        //             remarkText : remark,
        //             taskDone : ev.taskDone,
        //             inAppNotification : ev.inAppNotification,
        //             remarkNotification  : ev.remarkNotification
        //         }
        //         _teamMembers.push(_data);
        //     }

        // })

        const newArr = _teamMembers.map(ev => {
            if (ev._Id === userId) {
                return {
                    ...ev,
                    FullName: ev.FullName,
                    designation: ev.designation,
                    _Id: ev._Id,
                    ShortId: ev.ShortId,
                    remarkText: remark,
                    taskDone: ev.taskDone,
                    inAppNotification: ev.inAppNotification,
                    remarkNotification: ev.remarkNotification

                };
            }

            return ev;
        });


        let formdata = {
            userId: loginUserID,
            taskOwner: getTodoDataArray[ind].taskOwner_id,
            taskId: getTodoDataArray[ind].todoid,
            owernersCollectionDetails: newArr
        }
        // return
        updateTODOTaskApi(formdata)

    };

    const menu = (element, index, showModal, archiveData) => (
        <Menu>
            <Menu.Item key="edit" onClick={() => showModal(element, index)}>
                <FormOutlined style={{ marginRight: 10 }} /> Edit
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="archive" onClick={() => archiveData(element)}>
                <ShopOutlined style={{ marginRight: 10 }} /> Archive
            </Menu.Item>
        </Menu>
    );

    let fetchTodo = () => {
        return getTodoDataArray.map((element, index) => {
            return (
                <div className='TodoCard-Container' key={index}>
                    <div className='TodoCards-Top'>
                        <div className='TodoCards-TimedateArchive' sm>
                            <Col className='TodoCards-TopClock'>
                                <div className='todoCard-mr15'>
                                    <img src={TodoClock} alt='alarm' />
                                </div>
                                <div>
                                    <text style={{ color: element.status === 'Soon' ? element.sooncolor : element.status === 'Overdue' ? element.overduecolor : '#000', fontSize: 14, fontWeight: 'bolder' }}>{element.status} </text>
                                </div>
                                <div style={{ marginLeft: 5 }}>
                                    <text style={{ color: element.status === 'Soon' ? element.sooncolor : element.status === 'Overdue' ? element.overduecolor : '#000', fontSize: 14, fontWeight: 'bolder' }}>{element.stringtimeofreminder} : {element.dateofreminder}</text>
                                </div>
                            </Col>

                            <Dropdown overlay={menu(element, index, showModal, archiveData)} trigger={['click']}>
                                <div style={{ paddingLeft: 10, paddingRight: 5 }}>
                                    <img alt='' src={hamburger} style={{ height: 15, width: 3, cursor: "pointer" }} onClick={() => {
                                        Showpopuptodo(index, element);
                                    }} />
                                    <div className=''>
                                    </div>
                                </div>
                            </Dropdown>

                            {/* <Modal
                                shown={element.showarchiedpopup}
                                close={() => {
                                    closeFunction(index);
                                }}
                            >
                                <div className='Hamburger-Edit'>
                                    <div className='TodoCard-Container-Hamburger'>
                                        <Card className='Hamburger-Card Hamburger-box'>
                                            <div style={{ cursor: 'pointer' }} onClick={() => showModal(element, index)}><FormOutlined style={{ marginRight: "10px", marginLeft: 10 }} />Edit</div>
                                            <div style={{ backgroundColor: '#e6e9eb', opacity: '0.3', height: 1, marginTop: 5, marginBottom: 5 }}></div>
                                            <div style={{ cursor: 'pointer' }} onClick={() => archiveData(element)}><ShopOutlined style={{ marginRight: "10px", marginLeft: 10 }} />Archive</div>
                                        </Card>
                                    </div>
                                </div>
                            </Modal>
 */}



                            {/* <div className='Hamburger-Edit'
                            
                            >
                            {
                                element.showarchiedpopup === true &&
                                    <div className='TodoCard-Container-Hamburger'>
                                        <Card className='Hamburger-Card Hamburger-box'>
                                            <div style={{cursor:'pointer'}} onClick={()=> showModal(element,index)}><FormOutlined style={{marginRight:"10px",marginLeft:10}} />Edit</div>
                                            <div style={{backgroundColor:'#e6e9eb', opacity:'0.3',height:1,marginTop:5,marginBottom:5}}></div>
                                            <div style={{cursor:'pointer'}} onClick={()=> archiveData(element)}><ShopOutlined style={{marginRight:"10px",marginLeft:10}}/>Archive</div>
                                        </Card>
                                    </div>
                            }
                            </div> */}

                        </div>
                    </div>
                    {element.isUserIdSameornot === true &&
                        <div className='TodoCards-Body'>
                            {/* <div className='TodoCard-Body-CheckBox'>
                                    <input type='checkbox'   onClick={(e)=>{Uncheck(element.taskOwner_id)}}/>
                                </div> */}

                            {/* {usercreatedid ===} */}
                            <div className='TodoCard-Body-CheckBox todoCard-mr15' onClick={() => removListFromToDo(element, index)}>
                                <img src={element.Cretedownertaskdon === true ? truecheckbox : checkboxoutline} className='archive-trueCheckBox' alt='trueCheckBox' />
                            </div>
                            <p style={{ textDecorationLine: element.Cretedownertaskdon === true ? 'line-through' : '' }} >{element.content}</p>
                            {/* <p style={[{textDecorationLine : element.textOverLine.textDecorationLine}]} className={element.removeBtn ?"textDecoration":""}>{element.content}</p> */}
                        </div>
                    }

                    {/* {  element.isUserIdSameornot === false &&               */}
                    {element.isUserIdSameornot === false ? element.searchdata.map((data, ind) => {
                        return (
                            <div>
                                {data._Id == loginUserID &&
                                    <div className='TodoCards-Body'>

                                        <div className='TodoCard-Body-CheckBox todoCard-mr15' onClick={() => removListFromToDo(element, index)}>
                                            <img src={data.taskDone === true ? truecheckbox : checkboxoutline} className='archive-trueCheckBox' alt='trueCheckBox' />
                                        </div>
                                        <p style={{ textDecorationLine: data.taskDone === true ? 'line-through' : '' }} >{element.content}</p>

                                        {/* <p style={[{textDecorationLine : element.textOverLine.textDecorationLine}]} className={element.removeBtn ?"textDecoration":""}>{element.content}</p> */}
                                    </div>
                                }
                            </div>
                        )
                    })
                        :
                        ""}

                    <div className='Todo-Footer'>
                        <p style={{ textTransform: 'capitalize', fontWeight: 'bolder', width: '150px' }}>{element.ownername}</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span
                                style={{
                                height: '10px',
                                width: '10px',
                                borderRadius: '50%',
                                backgroundColor: element.priorityIndicatorColor,
                                display: 'inline-block',
                                marginRight: '6px',
                                }}
                            />
                            <span
                                style={{
                                color: element.priorityIndicatorColor,
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                fontSize: '14px',
                                }}
                            >
                                {element.taskPriority}
                            </span>
                        </div>

                        {/* {element.searchdata.length !== 0 &&
                            <p style={{ color: "#00acc1" }} onClick={() => memberRemarks(index)} >{element.showMemText}</p>
                        } */}
                    </div>
                    <div style={{ backgroundColor: '#C1C8CC', height: 1 }}></div>
                    {element.showMemberRemark === true &&
                        <>
                            {element.searchdata.map((data, ind) => {
                                return (
                                    <div>
                                        {element.taskOwner_id === loginUserID ?
                                            <div className="TodoCard-Footer">
                                                <div className='TodoCard-Footer-Main'>
                                                    <span style={{ marginBottom: 10 }}>Submited by :
                                                        <p style={{ color: '#5ea5c0', marginBottom: 0, marginLeft: 5 }}>{data.FullName}</p>
                                                    </span>
                                                    <div>
                                                        <Input disabled={true} value={data.remarkText} type='text' placeholder='Enter Remark' />
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="TodoCard-Footer">
                                                {data._Id == loginUserID &&
                                                    <div className='TodoCard-Footer-Main'>
                                                        <div>
                                                            <p style={{ marginBottom: 3, fontSize: 13 }} >Please enter the remark before ticking the checkbox</p>
                                                        </div>
                                                        <div>
                                                            {data.remarkData == '' ?
                                                                // value={remarkDataEnt}
                                                                <Input type='text' placeholder='Enter Remark' onChange={(e) => setRemarkDataEnt(e.target.value)} />
                                                                :
                                                                <div style={{ border: '1px solid #C1C8CC', padding: 4 }}>
                                                                    <p style={{ color: 'grey', fontSize: 12, marginBottom: 0 }}>{!data.remarkData ? '-' : data.remarkData}</p>
                                                                </div>
                                                            }
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                                                            <Button
                                                                disabled={data.disableSubmit}
                                                                // size="small" 
                                                                onClick={() => submitRemark(index, remarkDataEnt, data._Id)}
                                                                type="primary"
                                                                style={{ backgroundColor: '#E46A25', borderRadius: 3, border: 'none' }} >
                                                                Submit
                                                            </Button>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        }

                                    </div>
                                )
                            })
                            }
                        </>
                    }
                </div>
            )

        })
    }
    return (
        <div className="site-card-border-less-wrapper">
            {showData === true &&
                <div>
                    <div>{fetchTodo()}</div>

                    <div className='TodoCard-Pagenation'>
                        <div className='Pagenation-Content'>
                            {
                                sval >= 5 ?
                                    <p className='Pagenation-RecordsData'>Showing {fval} to {sval}</p>
                                    : <p className='Pagenation-RecordsData'>Showing {fval} to {totolDataCount}</p>
                            }
                            <p className='Pagenation-OutOfData'>Out of {totolDataCount} records</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Pagination
                                pageSize={5}
                                current={current}
                                total={totolDataCount}
                                onChange={onChangePagination}
                            />
                        </div>
                    </div>
                </div>
            }

            {showData === false &&
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 50 }} >
                    <img src={noDataIcon} style={{ height: 150, width: 100 }} />
                    <div style={{ marginTop: 10 }}>
                        <text style={{ textAlign: 'center', fontSize: 14 }} > No records found </text>
                    </div>
                </div>
            }
            <TodoTab getTodoData={getTodoData} button={'Update'} editData={updateData} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />


        </div>
    )
})

export default TodoCards