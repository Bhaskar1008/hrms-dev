import * as actionTypes from "../actions/actionTypes";

export const GetDashboardPremiumStore = (payload) => {
    return {
        type: actionTypes.ALL_DASHBOARD_STORE,
        dashBoardPremiumStore: payload,
    };
};
