import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    commercial_Value: "",
}

const GetCommercialValue = (state, action) => {
    return updateObject(state, { commercial_Value: action?.getCommercialValue });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // leadtchh
        case actionTypes.COMMERCIAL_VALUE:
            return GetCommercialValue(state, action);
        default:
            return state;
    }
};

export default reducer;