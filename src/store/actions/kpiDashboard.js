import * as actionTypes from './actionTypes';
import axios from '../../axios-banca';
import axiosRequest from '../../axios-request/request.methods';


export const kpiDashboardStart = () => {
    return {
        type: actionTypes.KPI_DASHBOARD_START
    }
}

export const kpiDashboardSuccess = (payload) => {
    return {
        type: actionTypes.KPI_DASHBOARD_SUCCESS,
        kpi_data:payload
    }
} 


export const kpiDashboardFail = (error) => {
    return {
        type: actionTypes.KPI_DASHBOARD_FAIL,
        error: error
    }
}



export const kpiDashboard = (value,userId,channel) => {
    return async dispatch => {
        dispatch(kpiDashboardStart())
        // return axios.get(`fetch_employee_kpi?emp_code=60e5d6056b18e8309da3fa49&category=${value}&channel=5f912e05037b6c581e7678f1`)
        // .then(res=>{
        //     return dispatch(kpiDashboardSuccess(res.data.data))
        // }).catch(error=>{
        //     console.log(error)
        // })


        let result = await axiosRequest.get(`user/fetch_employee_kpi?emp_code=${userId}&category=${value}&channel=${channel}`, { secure: true });
        
        if (result.length > 0) {
            return dispatch(kpiDashboardSuccess(result));
        }
    }
}