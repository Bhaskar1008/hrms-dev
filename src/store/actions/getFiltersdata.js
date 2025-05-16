import * as actionTypes from "./actionTypes";

export const GetfilterQuotationData = (payload) => {

    return {
        type: actionTypes.FILTER_QUATAION_STORE,
        filterquotationValue: payload,
    };
};
