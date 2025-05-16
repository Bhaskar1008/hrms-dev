import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
    hypervergeCtpl: {},
    hypervergeTravel: {},
    hypervergeMotor: {},
    currentLOB: null,
}
// export const HYPERVERGE_CTPL_DATA = "HYPERVERGE_CTPL_DATA";
// export const HYPERVERGE_TRAVEL_DATA = "HYPERVERGE_TRAVEL_DATA";
// export const HYPERVERGE_MOTOR_DATA = "HYPERVERGE_MOTOR_DATA";

const hypervergeCTPLData = (state, action) => {

    return updateObject(state, { hypervergeCtpl: action?.formData });
};
const hypervergeTravelData = (state, action) => {

    return updateObject(state, { hypervergeTravel: action?.formData });
};
const hypervergeMotorData = (state, action) => {

    return updateObject(state, { hypervergeMotor: action?.formData });
};
const currentLobData = (state, action) => {
    return updateObject(state, { currentLOB: action?.formData });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // leadtchh
        case actionTypes.HYPERVERGE_CTPL_DATA:
            return hypervergeCTPLData(state, action);
        case actionTypes.HYPERVERGE_TRAVEL_DATA:
            return hypervergeTravelData(state, action);
        case actionTypes.HYPERVERGE_MOTOR_DATA:
            return hypervergeMotorData(state, action);
        case actionTypes.CURRENT_LOB_DATA:
            return currentLobData(state, action);
        default:
            return state;
    }
};

export default reducer;