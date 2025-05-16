import {useEffect,useState} from 'react'
import _ from "lodash";
import './ListCreationCSS.css'
import { Row, Col,Avatar,Card,Radio , Divider , Table,Space,Input,Button } from 'antd'
import { useHistory } from 'react-router';
import { EditOutlined, DeleteOutlined, PlusOutlined , CloudDownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment'

const ListCreationMaster = (props) => {
    const [switchBtn, setSwitchBtn] = useState('Opportunities');
    const [listTableData, setListTableData] = useState([]);
    const history = useHistory()
    const { Search } = Input;

    const tableHeaders = [
        {
            title: 'Date & Time of List Creation',
            dataIndex: 'createdAt',
            key:'createdAt',
        },
        {
            title: 'Created By',
            dataIndex: 'moduleName',
            key:'moduleName',
        },
        {
            title: 'Name of the List',
            dataIndex: 'nameOfList',
            key:'nameOfList',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (event) => (
                <Space size="middle">
                    <Button onClick={ ()=>{ handleEditData(event) } } style={{backgroundColor:'#454545',borderColor:'#454545'}} type="primary" shape="circle" icon={<EditOutlined />} />
                    <Button onClick={ ()=>{ deleteTableItem(event) } } style={{backgroundColor:'#D1121B',borderColor:'#D1121B'}} type="primary" shape="circle" icon={<DeleteOutlined />} />
                    <Button style={{backgroundColor:'#00ACC1',borderColor:'#00ACC1'}} type="primary" shape="circle" icon={<CloudDownloadOutlined />} />
                </Space>
            ),
        },
    ];

    useEffect(() => {
        getTableData('Opportunities')
        
    }, []);
    // history.push({ pathname: '/create-list',module:switchBtn,editData: });
    
    const handleModeChange = event => {
        let _data = event.target.value
        setSwitchBtn(_data)
        getTableData(_data)
    };
    const handleEditData = (event) => {
        history.push({ pathname: '/create-list',module:switchBtn,editData:event.fullData });
    };
    const onSearch = value => {

    }

    const getTableData = (event)=>{
        let tableData = []
        let formData = {
            moduleName: event,
            operationType:"read",
            userId:'507f1f77bcf86cd799439011',
            // userId:this.getAgentInfo()._id,
            params:{ skips:0 }
        }
        axios.post('http://13.235.110.62:3001/list-crud',formData).then( res =>{
            res.data.items.map( el=>{
                let _time =  moment(el.createdAt).format("HH:mm")
                let _data = {
                    createdAt : moment(el.createdAt).format("DD-MM-YYYY")+ ' | ' + moment(_time, 'hh:mm a').format('hh:mm a'),
                    moduleName : el.moduleName,
                    fullData : el,
                    nameOfList : el.nameOfList,
                }
                tableData.push(_data)
            })
            setListTableData(tableData)
        })
    }
    const createList = ()=>{
        history.push({ pathname: '/create-list',module:switchBtn });
    }
    const deleteTableItem = (data)=>{
        // return
        let _deleteData = {
            moduleName:switchBtn,
            operationType:"delete",
            userId:"507f1f77bcf86cd799439011",
            listId:data.fullData._id
        }
        axios.delete('http://13.235.110.62:3001/list-crud', { data: _deleteData }).then(res =>{
            getTableData('Opportunities')
        })
    }
    return (
        <div className="cards-container">
            <Card className="card-shadow">
                <Radio.Group defaultValue="Opportunities" size="large" buttonStyle="solid" onChange={ handleModeChange } value={ switchBtn }>
                    <Radio.Button value="Opportunities">Opportunities</Radio.Button>
                    <Radio.Button value="Customers">Customers</Radio.Button>
                </Radio.Group>

                <Divider/>

                <Space direction="horizontal" style={{marginBottom:20}}>
                    <Search placeholder="input search text" onSearch={onSearch} enterButton  />
                    <Button
                        style={{backgroundColor:'#E46A25',borderColor:'#E46A25'}}
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => createList()}>
                        {switchBtn}
                    </Button>
                </Space>
                {/* xs={8} sm={12} md={12}  */}
                <Col style={{flex:1}}>
                    <Table 
                        columns={tableHeaders} 
                        dataSource={listTableData} 
                        bordered 
                        size="middle"
                        scroll={{ x: 'calc(700px + 35%)', y: 240 }}
                    />
                </Col>
            </Card>
        </div>
    )
}

export default ListCreationMaster
