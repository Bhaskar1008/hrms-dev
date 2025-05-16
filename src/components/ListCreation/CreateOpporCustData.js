import {useEffect,useState} from 'react'
import _ from "lodash";
import './ListCreationCSS.css'
import { Row, Col,Input,Button ,Select,AutoComplete , Divider,Card,Space, Typography,message } from 'antd'
import { useHistory } from 'react-router';
import { CheckCircleFilled, CloseCircleFilled, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

let _attribArray = []
let uniqueObjData = {}
let lastUpdatedAtrribSize = 0
let attribDataList = {}
let apiLeadStatus = {}
let apiLeadDispo = {}
let apiLeadSubDispo = {}
let _newFieldarray = []


const ListCreationMaster = (props) => {
    const [stateItems, setStateItems] = useState([]);
    const [cityItems, setCityItems] = useState([]);
    const [pinCodeArray, setPinCodeArray] = useState([]);

    const [leadTypeArray, setLeadTypeArray] = useState([]);
    const [leadStatusArray, setLeadStatusArray] = useState([]);
    const [leadDispositionArray, setLeadDispositionArray] = useState([]);
    const [leadsubDispositionArray, setLeadsubDispositionArray] = useState([]);
    const [policyTypeArray, setPolicyTypeArray] = useState([]);
    const [productTypeArray, setProductTypeArray] = useState([]);
    const [attributeList, setAttributeList] = useState([]);
    
    const [attributeValueList, setAttributeValueList] = useState([]);
    const [atrribKeyValueArray, setAtrribKeyValueArray] = useState([]);
    const [finalKeyValueArray, setFinalKeyValueArray] = useState([]);
    // const [attribDataList, setAttribDataList] = useState({});
    const [selectAddNewAttribute, setSelectAddNewAttribute] = useState([]);
    const [showNewDrop, setShowNewDrop] = useState(false);
    const [selectdRowID, setSelectdRowID] = useState('');
    
    
    
    const [nameOfList, setNameOfList] = useState('');
    const [selectLeadType, setSelectLeadType] = useState([]);
    const [selectState, setSelectState] = useState('');
    const [selectCity, setSelectCity] = useState('');
    const [selectPincode, setSelectPincode] = useState('');
    const [selectLeadStatus, setSelectLeadStatus] = useState([]);
    const [selectLeadDispo, setSelectLeadDispo] = useState([]);
    const [selectLeadSubDispo, setSelectLeadSubDispo] = useState([]);
    const [saveUpdateBtn, setSaveUpdateBtn] = useState('');
    const [selectPolicyType, setSelectPolicyType] = useState([]);
    const [selectProductType, setSelectProductType] = useState([]);

    const history = useHistory()
    const { Text } = Typography;
    useEffect(() => {
        if(history.location.hasOwnProperty('editData')){
            editDataBind(history.location.editData)
            setSaveUpdateBtn('Update')
        }else{
            setSaveUpdateBtn('Save')
            getAttributeNames({})
            _newFieldarray = []
            // setFinalKeyValueArray([])
        }
    }, []);
    useEffect(() => {
        _attribArray = []
        uniqueObjData = {}
        lastUpdatedAtrribSize = 0
        // attribDataList = {}
        // apiLeadStatus = {}
        // apiLeadDispo = {}
        // apiLeadSubDispo = {}
        // _newFieldarray = []
    }, []);
    useEffect(() => {
        dropDownData()
    }, []);
    useEffect(() => {
        // getAttributeNames()
    }, []);

    useEffect(() => {
        let formData = {
            userId:"610a50ec85eac609e29061e3",
            selectedParams:{}
        }
        let _stateData = []
        axios.post(`http://13.235.110.62:3001/get-pincode-masters`,formData).then( res =>{
            res.data.STATE.map(el=>{
                let _data = { value:el, label:el}
                _stateData.push(_data)
            })
            setStateItems(_stateData)
        })
    }, []);

    const editDataBind = event => {
        setNameOfList(event.nameOfList)
        setSelectLeadType(event.attributes.leadType)
        setSelectPolicyType(event.attributes.policyType)
        setSelectProductType(event.attributes.productCategory)
        // setSelectLeadStatus(event.attributes.leadStatus)
        // setSelectLeadDispo(event.attributes.leadDisposition)
        // setSelectLeadSubDispo(event.attributes.leadsubDisposition)
        // setSelectState(event.attributes.STATE)
        // setSelectCity(event.attributes.CITY)
        getCityData(event.attributes.STATE)
        getPincodeData(event.attributes.CITY)
        setSelectPincode(event.attributes.PIN_CODE)
        setSelectdRowID(event._id)
        getAttributeNames(event.attributes)

        attribDataList = event.attributes
        // selectCustomerType = event.attributes.productCategory

        if(event.attributes.hasOwnProperty('leadStatus')) changeLeadStatus(event.attributes.leadStatus.value,event.attributes.leadStatus) 
        if(event.attributes.hasOwnProperty('leadDisposition')) changeLeadDispo(event.attributes.leadDisposition.value,event.attributes.leadDisposition)
        if(event.attributes.hasOwnProperty('leadsubDisposition')) changeLeadSubDispo(event.attributes.leadsubDisposition.value,event.attributes.leadsubDisposition)

        
    };
    
    const changeLeadDispo = (event,objData) => {
        setSelectLeadDispo(event)
        setLeadsubDispositionArray([])
        setLeadsubDispositionArray(objData.children)
        apiLeadDispo = objData
        
    }
    const changeLeadStatus = (event,objData) => {
        setSelectLeadStatus(event)
        setLeadDispositionArray([])
        setLeadDispositionArray(objData.children)
        apiLeadStatus = objData
        
    }
    const changeLeadSubDispo = (event,objData) => {
        setSelectLeadSubDispo(event)
        apiLeadSubDispo = objData
    };
    const dropDownData = () =>{
        let formData = {
            moduleName:history.location.module,
            userId:"610a50ec85eac609e29061e3"
        }

        axios.post(`http://13.235.110.62:3001/get-modulewise-attribute-values`,formData).then( res =>{
            if(history.location.module == 'Customers'){
                if(res.data.hasOwnProperty('policyType')) setPolicyTypeArray( structureDataSet(res.data.policyType) )
                if(res.data.hasOwnProperty('productCategory')) setProductTypeArray( structureDataSet(res.data.productCategory) )
                // if(res.data.hasOwnProperty('customerType')) setLeadTypeArray( structureDataSet(res.data.customerType) )
            }else{
                if(res.data.hasOwnProperty('leadType')) setLeadTypeArray( structureDataSet(res.data.leadType) )
                if(res.data.hasOwnProperty('dispositionAndSubDispositionMapping')) setLeadStatusArray( res.data.dispositionAndSubDispositionMapping )
            }
        })
    }
    const getAttributeNames = (event) =>{
        // setAttribDataList(event)
        axios.get(`http://13.235.110.62:3001/get-attribute-names?moduleName=${history.location.module}`).then( res =>{
            let _dataArray = []
            let _atrribListArray = []
            setAttributeList([])
            res.data.attributeNames.map(el =>{
               // let _data = { value:el,label:toCapitalize(camelToNormal(el)) }
               let _data = { value:el,label:el }
                _dataArray.push(_data)
            })
            setAttributeList(_dataArray)
            if(Object.keys(event).length > 0){
                let _attributes =  _dataArray.filter(el =>{ 
                    if(event.hasOwnProperty(el.value)){
                        uniqueObjData = Object.assign({ [el.value] : true },uniqueObjData)
                        lastUpdatedAtrribSize =  Object.keys(uniqueObjData).length
                        _atrribListArray.push(el.value)
                        return el
                    }
                })
                selectedAttribute(_atrribListArray,_attributes)
                // setSelectAddNewAttribute(_attributes)
            }
        })
    }
    const selectAttribValueFunc = (event,objData) =>{
        // let _selectedData = []
        
        if(attributeValueList.length > 0){
            let _selectedData = attributeValueList.map(el =>{ 
                // let _condition = saveUpdateBtn !== 'Save' ? objData.value : objData.type
                if(el.value == objData.type) {
                    el.selectedAttribValue = objData.value
                    let _data = { [el.value] : el.selectedAttribValue }
                    _newFieldarray.push(_data)
                }
                return el
            })
            setAttributeValueList(_selectedData)
            setAtrribKeyValueArray(_newFieldarray)
            setFinalKeyValueArray(_newFieldarray)
        }else{
            let _data = { [objData.value] : objData.selectedAttribValue }
            _newFieldarray.push(_data)
            setAtrribKeyValueArray(_newFieldarray)
            setFinalKeyValueArray(_newFieldarray)
        }
        
        // setShowNewDrop(true)

    }
    const selectedAttribute = (event,objData) =>{
        setSelectAddNewAttribute(event)
        setShowNewDrop(false)
        if(lastUpdatedAtrribSize > objData.length){
            try{
                let _result =  _.differenceBy(attributeValueList,objData,'value')
                setAttributeValueList(_.pullAll(attributeValueList,_result))
                // attributeValueList = _.pullAll(attributeValueList,_result);
                lastUpdatedAtrribSize = attributeValueList.length
                for(let _props of atrribKeyValueArray){
                    let _keys = Object.keys(_props)
                    if(_keys[0] !== _result.value) setFinalKeyValueArray(atrribKeyValueArray.slice(0, -1))
                }
                delete uniqueObjData[_result[0].value]
                setShowNewDrop(true)
            }catch(err){}
        }else{
            let _attriName = objData.slice(-1)[0].value
             
            if(!uniqueObjData.hasOwnProperty(_attriName)){
                let formData = {
                    moduleName:history.location.module,
                    fieldName:_attriName,
                    userId:"610a50ec85eac609e29061e3",
                    selectedParams:{}
                }

                axios.post(`http://13.235.110.62:3001/get-attribute-values`,formData).then( res =>{
                    for(let i = 0;i < objData.length ; i++){
                        if(_attriName == objData[i].value){
                            let _product = {
                                value: objData[i].value,
                                label: objData[i].label,
                                attribValueList : structureDataSet(res.data,objData[i].value),
                                selectedAttribValue:[],
                            }
                            _attribArray.push(_product)
                            uniqueObjData = Object.assign({ [objData[i].value] : true },uniqueObjData)
                        }
                    }
                    setAttributeValueList(_attribArray)
                    lastUpdatedAtrribSize = _attribArray.length
                    setShowNewDrop(true)
                })
            }else{
                getAtrributesValue(objData)
                // setAttributeValueList
            }
            
        }
    }
    const getAtrributesValue = (event) =>{
        let _attriDataArray = []
        for(let i = 0;i < event.length ; i++){
            let formData = {
                moduleName:history.location.module,
                fieldName:event[i].value,
                userId:"610a50ec85eac609e29061e3",
                selectedParams:{}
            }

            axios.post(`http://13.235.110.62:3001/get-attribute-values`,formData).then( res =>{
                let _product = {
                    value: event[i].value,
                    label: event[i].label,
                    attribValueList : structureDataSet(res.data,event[i].value),
                    selectedAttribValue:[],
                }
                _attriDataArray.push(_product)
                // lastUpdatedAtrribSize = this.attributeValueList.length
                uniqueObjData = Object.assign({ [event[i].value] : true },uniqueObjData)

                if(Object.keys(attribDataList).length > 0){
                    _attriDataArray.forEach( ev=>{
                        if(event[i].value == ev.value) {
                            ev.selectedAttribValue = attribDataList[event[i].value]
                            selectAttribValueFunc(ev.value,ev)
                        }
                    })
                    setAttributeValueList(_attriDataArray)
                    lastUpdatedAtrribSize = _attriDataArray.length
                    setShowNewDrop(true)
                }
                
            })
        }
    }
    
    // const camelToNormal = (key) =>{
    //     var result = key.replace( /([A-Z])/g, " $1" );
    //     return result.split(' ').join(' ').toUpperCase();
    // }


    const toCapitalize = (strText) =>{
        try {
            if (strText === '' || strText === null || typeof(strText) === 'undefine') {
                return strText;
            } else {
                let _str = strText.toLowerCase();
                let collection = _str.split(" ");
                let modifyStrigs = [];
                _str = '';
                for (let i = 0; i < collection.length; i++) {
                    modifyStrigs[i] = collection[i].charAt(0).toUpperCase() + collection[i].slice(1);
                    _str = _str + modifyStrigs[i] + ' ';
                }
                return _str;
            }
        } catch (Exception) {
            return strText;
        }
    }
    const structureDataSet = (event,type) =>{
        let _dataArray = []
        event.map(el=>{
            let _data = { value:el, label:el}
            let _final = type !== undefined || type !== 'undefined' ? Object.assign(_data, {type:type}) : _data
            _dataArray.push(_final)
        })
        return _dataArray
    }
   
    const getCityData = (ev) =>{
        setSelectState(ev)
        let formData = {
            userId:"610a50ec85eac609e29061e3",
            selectedParams:{ STATE:ev }
        }
        let _cityData = []
        axios.post(`http://13.235.110.62:3001/get-pincode-masters`,formData).then( res =>{
            res.data.CITY.map(el=>{
                let _data = { value:el, label:el}
                _cityData.push(_data)
            })
            setCityItems(_cityData)
        })
    }
    const getPincodeData = (city) =>{
        setSelectCity(city)
        let formData = {
            userId:"610a50ec85eac609e29061e3",
            selectedParams:{
                STATE:selectState,
                CITY:city,
            }
        }
        let _pincodeData = []
        axios.post(`http://13.235.110.62:3001/get-pincode-masters`,formData).then( res =>{
            res.data.PIN_CODE.map(el=>{
                let _data = { value:el, label:el}
                _pincodeData.push(_data)
            })
            setPinCodeArray(_pincodeData)
        })
    }
    const handlePincodeData = (pin) =>{
        setSelectPincode(pin)
    }

    const newFieldData = () =>{
        if(attributeValueList.length > 0){
            return attributeValueList.map((data,index) =>{
                return(
                    <Col key={index} xs={24} sm={6} md={8} >
                        <Col style={{marginBottom:5,paddingLeft:0}}>
                            <Text className="field-title-text" strong>{data.label}</Text>
                        </Col>
                        <Select
                        key={index}
                            size="large"
                            value={ data.selectedAttribValue }
                            options={ data.attribValueList }
                            style={{ width: '100%' }}
                            placeholder={'Enter '+data.label}
                            onChange={ selectAttribValueFunc }
                            >
                        </Select>
                    </Col>
                );
            });
        }
    };
    const submitData = () =>{
        saveUpdateBtn == 'Save' ? submitListData() : updateListData()
    }

    const submitListData = () =>{
        let _moduleName = history.location.module
        let opportAttrib = {
            CITY : selectCity,
            PIN_CODE : selectPincode,
            STATE : selectState,
            leadType : selectLeadType,
            leadStatus : apiLeadStatus,
            leadDisposition : apiLeadDispo,
            leadsubDisposition : apiLeadSubDispo,
        }
        let custAttrib = {
            CITY : selectCity,
            PIN_CODE : selectPincode,
            STATE : selectState,
            policyType : selectPolicyType,
            productCategory : selectProductType,
        }
        let _finalAttributes = _moduleName == 'Customers' ? Object.assign(custAttrib, ...finalKeyValueArray) : Object.assign(opportAttrib, ...finalKeyValueArray)
        
        let formData = {
            moduleName:_moduleName,
            operationType:"create",
            userId:"507f1f77bcf86cd799439011",
            params:{
                nameOfList: nameOfList,
                attributes: _finalAttributes
            }
        }
        // return
        axios.post('http://13.235.110.62:3001/list-crud',formData).then( res =>{
            message.success('List created Successfully');
            // this.showToast('List created Successfully','success')
        })
    }
    const updateListData = () =>{
        let _moduleName = history.location.module
        let opportAttrib = {
            CITY : selectCity,
            PIN_CODE : selectPincode,
            STATE : selectState,
            leadType : selectLeadType,
            leadStatus : apiLeadStatus,
            leadDisposition : apiLeadDispo,
            leadsubDisposition : apiLeadSubDispo,
        }
        let custAttrib = {
            CITY : selectCity,
            PIN_CODE : selectPincode,
            STATE : selectState,
            policyType : selectPolicyType,
            productCategory : selectProductType,
        }
        let _finalAttributes = _moduleName == 'Customers' ? Object.assign(custAttrib, ...finalKeyValueArray) : Object.assign(opportAttrib, ...finalKeyValueArray)
        
        let formData = {
            moduleName:_moduleName,
            operationType:"update",
            userId:"507f1f77bcf86cd799439011",
            listId:selectdRowID,
            params:{
                nameOfList:nameOfList,
                attributes:_finalAttributes
            }
        }
        
        // return

        axios.post('http://13.235.110.62:3001/list-crud',formData).then( res =>{
            message.success('List Updated Successfully');
        })
    }
    const cancelListData = () =>{
    //     const [nameOfList, setNameOfList] = useState('');
    // const [selectLeadType, setSelectLeadType] = useState([]);
    // const [selectState, setSelectState] = useState('');
    // const [selectCity, setSelectCity] = useState('');
    // const [selectPincode, setSelectPincode] = useState('');
    // const [selectLeadStatus, setSelectLeadStatus] = useState([]);
    // const [selectLeadDispo, setSelectLeadDispo] = useState([]);
    // const [selectLeadSubDispo, setSelectLeadSubDispo] = useState([]);
    // const [saveUpdateBtn, setSaveUpdateBtn] = useState('');
    // const [selectPolicyType, setSelectPolicyType] = useState([]);
    // const [selectProductType, setSelectProductType] = useState([]);
        setNameOfList('')
        setSelectAddNewAttribute([])
        setSelectLeadType([])
        // setSelectCustomerType()
        setSelectPolicyType([])
        setSelectProductType([])
        setSelectLeadStatus([])
        setSelectLeadDispo([])
        setSelectLeadSubDispo([])
        setSelectState('')
        setSelectCity('')
        setSelectPincode('')
        setStateItems([])
        setCityItems([])
        setPinCodeArray([])
    }
    // const handleLeadType = event => {
    // };
    
    return (
        <div className="cards-container">
            <Card title={history.location.module.toUpperCase()} className="card-shadow">
                <Row wrap gutter={[14, 14]}>
                    <Col xs={24} sm={6} md={8}>
                        <Col style={{marginBottom:5,paddingLeft:0}}>
                            <Text className="field-title-text" strong>Name of the List</Text>
                        </Col>
                        <Input style={{ color:'#10242B' }} value={nameOfList} onInput={(ev)=> setNameOfList(ev.target.value)} size="large" placeholder="Enter Name of the List" />
                    </Col>
                    <Col  xs={24} sm={6} md={8} >
                        <Col style={{marginBottom:5,paddingLeft:0}}>
                            <Text className="field-title-text" strong>Add New Attributes</Text>
                        </Col>
                        <Select
                            mode="multiple"
                            size="large"
                            allowClear
                            value={selectAddNewAttribute}
                            options={ attributeList }
                            style={{ width: '100%',color:'#10242B' }}
                            placeholder="Select Add New Attributes"
                            onChange={ selectedAttribute }
                            // filterOption={(input, option) =>{ selectedAttribute(input, option) }}
                            >
                            {/* {children} */}
                        </Select>
                    </Col>

                    { showNewDrop == true && newFieldData() }

                    { history.location.module == 'Opportunities' &&
                        <Col xs={24} sm={6} md={8} >
                            <Col style={{marginBottom:5,paddingLeft:0}}>
                                <Text className="field-title-text" strong>Lead Type</Text>
                            </Col>
                            <Select
                                size="large"
                                style={{ width: '100%' }}
                                options={ leadTypeArray }
                                value={ selectLeadType }
                                placeholder="Select Lead Type"
                                onChange={(event)=> setSelectLeadType(event) }
                                >
                                {/* {children} */}
                            </Select>
                        </Col>
                    }
                    { history.location.module == 'Customers' &&
                        <Col xs={24} sm={6} md={8} >
                            <Col style={{marginBottom:5,paddingLeft:0}}>
                                <Text className="field-title-text" strong>Policy Type</Text>
                            </Col>
                            <Select
                                size="large"
                                options={ policyTypeArray }
                                style={{ width: '100%' }}
                                value={ selectPolicyType }
                                placeholder="Select Policy Type"
                                onChange={(event)=> setSelectPolicyType(event) }
                                >
                                {/* {children} */}
                            </Select>
                        </Col>
                    }
                    
                    { history.location.module == 'Customers' &&
                        <Col xs={24} sm={6} md={8} >
                            <Col style={{marginBottom:5,paddingLeft:0}}>
                                <Text className="field-title-text" strong>Product Type</Text>
                            </Col>
                            <Select
                                size="large"
                                options={ productTypeArray }
                                style={{ width: '100%' }}
                                value={ selectProductType }
                                placeholder="Select Product Type"
                                onChange={(event)=> setSelectProductType(event) }
                                >
                                {/* {children} */}
                            </Select>
                        </Col>
                    }

                    { history.location.module == 'Opportunities' &&
                        <Col xs={24} sm={6} md={8} >
                            <Col style={{marginBottom:5,paddingLeft:0}}>
                                <Text className="field-title-text" strong>Lead Status</Text>
                            </Col>
                            <Select
                                size="large"
                                options={ leadStatusArray }
                                style={{ width: '100%' }}
                                value={ selectLeadStatus }
                                placeholder="Select Lead Status"
                                onChange={ changeLeadStatus }
                                >
                                {/* {children} */}
                            </Select>
                        </Col>
                    }
                    { history.location.module == 'Opportunities' &&
                        <Col xs={24} sm={6} md={8} >
                            <Col style={{marginBottom:5,paddingLeft:0}}>
                                <Text className="field-title-text" strong>Lead Disposition</Text>
                            </Col>
                            <Select
                                size="large"
                                options={ leadDispositionArray }
                                style={{ width: '100%' }}
                                value={ selectLeadDispo }
                                placeholder="Select Lead Disposition"
                                onChange={ changeLeadDispo }
                                >
                                {/* {children} */}
                            </Select>
                        </Col>
                    }
                    { history.location.module == 'Opportunities' &&
                        <Col xs={24} sm={6} md={8} >
                            <Col style={{marginBottom:5,paddingLeft:0}}>
                                <Text className="field-title-text" strong>Lead Sub-Disposition</Text>
                            </Col>
                            <Select
                                size="large"
                                options={ leadsubDispositionArray }
                                style={{ width: '100%' }}
                                value={ selectLeadSubDispo }
                                placeholder="Select Lead Sub-Disposition"
                                onChange={ changeLeadSubDispo }
                                >
                                {/* {children} */}
                            </Select>
                        </Col>
                    }
                    <Col xs={24} sm={6} md={8}>
                        <Col style={{marginBottom:5,paddingLeft:0}}>
                            <Text className="field-title-text" strong>State</Text>
                        </Col>
                        <AutoComplete
                            size="large"
                            style={{ width: '100%' }}
                            options={stateItems}
                            value={selectState}
                            placeholder="Select State"
                            onChange={ getCityData }
                            filterOption={(inputValue, option) =>
                                option.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                            }
                        />
                    </Col>
                    <Col xs={24} sm={6} md={8}>
                        <Col style={{marginBottom:5,paddingLeft:0}}>
                            <Text className="field-title-text" strong>City</Text>
                        </Col>
                        <AutoComplete
                            size="large"
                            style={{ width: '100%' }}
                            options={ cityItems }
                            placeholder="Select City"
                            value={selectCity}
                            onChange={ getPincodeData }
                            filterOption={(inputValue, option) =>
                                option.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                            }
                        />
                    </Col>
                    <Col xs={24} sm={6} md={8}>
                        <Col style={{marginBottom:5,paddingLeft:0}}>
                            <Text className="field-title-text" strong>Pincode</Text>
                        </Col>
                        <AutoComplete
                            size="large"
                            style={{ width: '100%' }}
                            options={pinCodeArray}
                            value={selectPincode}
                            placeholder="Select Pincode"
                            onChange={ handlePincodeData }
                            
                        />
                    </Col>
                </Row>
                <Divider/>
                <Space direction="horizontal" >
                    <Button
                        className="card-shadow"
                        icon={<CheckCircleFilled />}
                        style={{backgroundColor:'#00ACC1',borderColor:'#00ACC1'}}
                        type="primary"
                        onClick={() => submitData()}>
                        {saveUpdateBtn}
                    </Button>
                    <Button
                        className="card-shadow"
                        style={{backgroundColor:'#E46A25',borderColor:'#E46A25'}}
                        icon={<CloseCircleFilled />}
                        type="primary"
                        onClick={() => cancelListData()}>
                        Cancel
                    </Button>
                </Space>
            </Card>
        </div>
    )
}

export default ListCreationMaster
