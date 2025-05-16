import * as actionTypes from "./actionTypes";

export const GetCommercialValue = (payload) => {
    return {
        type: actionTypes.COMMERCIAL_VALUE,
        getCommercialValue: payload,
    };
};
