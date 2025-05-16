import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    kpi_data:[],
    fetch_Kpidashboard_Loading : false,
    kpiDashboard_Error : "",

}


const fetchKpiDashboardStart = (state, action) => {
    return updateObject(state, { fetch_Kpidashboard_Loading: true })
}

const fetchKpiDashboardSuccess = (state, action) => {
    return updateObject(state, { fetch_Kpidashboard_Loading: false, kpi_data: action.kpi_data})
}
const fetchKpiDashboardFail = (state, action) => {
    return updateObject(state, { fetch_Kpidashboard_Loading: false, kpiDashboard_Error: action.error });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.KPI_DASHBOARD_START: return fetchKpiDashboardStart(state, action)
        case actionTypes.KPI_DASHBOARD_SUCCESS: return fetchKpiDashboardSuccess(state, action)
        case actionTypes.KPI_DASHBOARD_FAIL: return fetchKpiDashboardFail(state, action)

        default: return state
    }
}

export default reducer;