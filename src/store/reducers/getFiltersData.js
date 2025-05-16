import * as actionTypes from "../actions/actionTypes";
// import { updateObject } from "../utility"; // You can remove this line if you're not using it

const initialState = {

    productName: "",
    quotationStatus: "",
    documentStatus: "",
    policyholder: "",
    quotationPolicyNumber: "",
    dateCreated: "",
    effectivityfromDate: '',
    effectivitytoDate: '',
    expiryfromDate: '',
    expirytoDate: "",
    showButton: '',
    DocumentStatus: '',
    quotationOrPolicy: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FILTER_QUATAION_STORE:
            // No need to destructure action.payload since it contains all the fields
            return {
                ...state,
                ...action.filterquotationValue,
                // Merge the payload into the state
            };
        default:
            return state;
    }
};

export default reducer;
