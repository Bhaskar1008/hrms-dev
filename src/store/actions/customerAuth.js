import * as actionTypes from "../actions/actionTypes";

export const GetCustomerToken = (payload) => {
    return {
        type: actionTypes.CUSTOMER_TOKEN,
        CustomerToken: payload,
    };
};
