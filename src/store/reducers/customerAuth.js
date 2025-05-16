import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    Customer_Token: "",
}

const GetCustomerToken = (state, action) => {
    return updateObject(state, { Customer_Token: action?.CustomerToken });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // leadtchh
        case actionTypes.CUSTOMER_TOKEN:
            return GetCustomerToken(state, action);
        default:
            return state;
    }
};

export default reducer;