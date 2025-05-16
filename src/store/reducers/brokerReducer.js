import { BROKER_DETAILS } from "../actions/actionTypes";

const initialState = {
    brokerDetails: {},
};

const brokerReducer = (state = initialState, action) => {
    switch (action.type) {
        case BROKER_DETAILS:
            return {
                ...state,
                brokerDetails: action.payload,
            };
        default:
            return state;
    }
};

export default brokerReducer;