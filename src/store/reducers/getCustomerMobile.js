import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    customer_mobile: "",
}

const GetCustomerMobileNumber = (state, action) => {
    console.log("COMMERCIAL_VALUE", action);
    return updateObject(state, { customer_mobile: action?.getCustomerMobileNumber });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // leadtchh
        case actionTypes.CUSTOMER_MOBILE:
            return GetCustomerMobileNumber(state, action);
        default:
            return state;
    }
};

export default reducer;