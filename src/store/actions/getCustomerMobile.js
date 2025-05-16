import * as actionTypes from "./actionTypes";

export const GetCustomerMobileNumber = (payload) => {
    return {
        type: actionTypes.CUSTOMER_MOBILE,
        getCustomerMobileNumber: payload,
    };
};
