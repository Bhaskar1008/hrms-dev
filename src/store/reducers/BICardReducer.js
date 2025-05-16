const initialState = {
    BICardData:{}
}


const BICardReducer=(state=initialState, action)=>{
    if(action.type === 'BI_CARD_DATA'){
        return { ...state,  BICardData:{ ...action.payload, }}
    }else{
        return state;
    }
        

}
export default BICardReducer;