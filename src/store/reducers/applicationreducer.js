

const initialState = {
    singleCardData:{},
    
}


const applicationReducer=(state=initialState, action)=>{
    if(action.type === 'SINGLE_CARD_DATA'){
        return { singleCardData:{ ...action.payload}}
    }else{
        return state;
    }
        

}
export default applicationReducer;