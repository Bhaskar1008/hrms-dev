import * as actionTypes from "../actions/actionTypes";

export const hypervergeCTPLData = (formData) => {
    return {
        type: actionTypes.HYPERVERGE_CTPL_DATA,
        formData: formData,
    };
};
export const hypervergeTravelData = (formData) => {
    return {
        type: actionTypes.HYPERVERGE_TRAVEL_DATA,
        formData: formData,
    };
};
export const hypervergeMotorData = (formData) => {
    return {
        type: actionTypes.HYPERVERGE_MOTOR_DATA,
        formData: formData,
    };
};
export const currentLobData = (formData) => {
    return {
        type: actionTypes.CURRENT_LOB_DATA,
        formData: formData,
    };
};
