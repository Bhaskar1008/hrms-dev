import React, { useEffect ,useState} from 'react';
import { Button,Modal, Radio } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import "./paymenttype.css"
import icons from '../../../../assets/paymentsicon/icon_gcash.png';
import gcashicon from '../../../../assets/paymentsicon/icon_gcash.png';
import creditcardicon from '../../../../assets/paymentsicon/icon_visa.png'

const PaymentTypeSelectionPopup = ({ visible, onCancel, onOk ,paymnettype,onClick,ispopupopen}) => {
    // let icon1 = icons
    const [isOpen, setIsOpen] = useState(false);
    const [isselecteddata,setisselecteddata] = useState({})
    const [LoadedData ,setLoadeddata] = useState([])
    const [LoadedDatapaymnet ,setLoadeddatapaymnet] = useState(paymnettype)
    const [buttondesable ,setButtondesabled] =useState(true)
 
    // setLoadeddatapaymnet(paymnettype)
    console.log("data loaded",paymnettype)

    useEffect(() => {
    
        paymnettype?.map(o => {
            o.selectedbutton = false
            if(o.paymentMethod === 'GC'){
                o.icon = gcashicon
            }else if(o.paymentMethod === 'CC'){
                o.icon = creditcardicon
            }else{
                o.icon = creditcardicon
            }
        })

        console.log("Paymnet Type In the Compo",paymnettype)
        
        // TemVariable= paymnettype
        setLoadeddata(paymnettype)
        setButtondesabled(true)
    
      }, [ispopupopen,paymnettype])

      const paymentOptions  = LoadedData

      console.log("Paymnet Type In the Compo====>>>>",paymentOptions)
  

  const Clickdata = (data,index)=>{
      console.log("Selected Button",data,index)
      for(let i=0;i<paymentOptions.length;i++){
          console.log("paymen",index,paymentOptions[i])
          if(paymentOptions[i].paymentText === data.paymentText){
              console.log("Index ",index,paymentOptions[i])
              setisselecteddata(paymentOptions[i])
              setButtondesabled(false)
                paymentOptions[i].selectedbutton  = true
                setIsOpen(true)
          }else{
            paymentOptions[i].selectedbutton  = false
                setIsOpen(false)
          }
      }
      console.log("Datat after changes",paymentOptions)

  }

  const proceed = (daat)=>{
      console.log("Proceed",isselecteddata)
      onClick(isselecteddata)
  } 

  


  

  return (
    <Modal
      title={null}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      footer={null}
      className="modalStyle"
    >
        <div className='margin-bottom-10'>
        <span className="button-text">Select Payment Method</span>
        </div>
        {paymentOptions.map((data,index) => {
            console.log("dataatt",data?.selectedbutton,index)
        return  <div key={index} className={`${data?.selectedbutton === true ? 'custom-button-true' : 'custom-button'}`} onClick={()=>Clickdata(data,index)}>
            <img src={data?.icon} alt="Button Icon" className="button-icon" />
            <span className="button-text">{data?.paymentText}</span>
        </div>})}

        <Button disabled={buttondesable} onClick={()=>proceed('datata')} className="confirm-pay">
                  Proceed <ArrowRightOutlined />
        </Button>
    </Modal>
  );
};

export default PaymentTypeSelectionPopup;
