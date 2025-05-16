import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    all_PremiumData: "",
}

const GetDashboardPremiumStore = (state, action) => {
    return updateObject(state, { all_PremiumData: action?.dashBoardPremiumStore });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // leadtchh
        case actionTypes.ALL_DASHBOARD_STORE:
            return GetDashboardPremiumStore(state, action);
        default:
            return state;
    }
};

export default reducer;