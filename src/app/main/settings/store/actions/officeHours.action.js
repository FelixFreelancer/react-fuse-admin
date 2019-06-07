
//import axios from 'axios';
import axiosCore from 'axios';
import { BASE_URL } from '../../../../fuse-configs/apiConfig';
import * as _Actions from 'app/store/actions';
const axios = axiosCore.create({
    baseURL: BASE_URL
});
export const SAVE_OFFICE_BEGIN = 'SAVE_OFFICE_BEGIN';
export const SAVE_OFFICE_SUCCESS = 'SAVE_OFFICE_SUCCESS';
export const SAVE_OFFICE_FAIL = 'SAVE_OFFICE_FAIL';

export const GET_STATE_BEGIN = 'GET_STATE_BEGIN';
export const GET_STATE_SUCCESS = 'GET_STATE_SUCCESS';
export const GET_STATE_FAIL = 'GET_STATE_FAIL';


export const GET_OFFICE_BEGIN = 'GET_OFFICE_BEGIN';
export const GET_OFFICE_SUCCESS = 'GET_OFFICE_SUCCESS';
export const GET_OFFICE_FAIL = 'SAVE_OFFICE_FAIL';

export const GET_OFFICE_DETAILS_BEGIN = 'GET_OFFICE_DETAILS_BEGIN';
export const GET_OFFICE_DETAILS_SUCCESS = 'GET_OFFICE_DETAILS_SUCCESS';
export const GET_OFFICE_DETAILS_FAIL = 'GET_OFFICE_DETAILS_FAIL';

export const UPDATE_OFFICE_BEGIN = 'UPDATE_OFFICE_BEGIN';
export const UPDATE_OFFICE_SUCCESS = 'UPDATE_OFFICE_SUCCESS';
export const UPDATE_OFFICE_FAIL = 'UPDATE_OFFICE_FAIL';

export const DELETE_OFFICE_LIST_BEGIN = 'DELETE_OFFICE_LIST_BEGIN';
export const DELETE_OFFICE_LIST_SUCCESS = 'DELETE_OFFICE_LIST_SUCCESS';
export const DELETE_OFFICE_LIST_FAIL = 'DELETE_OFFICE_LIST_FAIL';

export const GET_OFFICE_TIME_BEGIN = 'GET_OFFICE_TIME_BEGIN';
export const GET_OFFICE_TIME_SUCCESS = 'GET_OFFICE_TIME_SUCCESS';
export const GET_OFFICE_TIME_FAIL = 'GET_OFFICE_TIME_FAIL';

export const GET_OFFICE_HOURS_DATA_BEGIN = 'GET_OFFICE_HOURS_DATA_BEGIN';
export const GET_OFFICE_HOURS_DATA_SUCCESS = 'GET_OFFICE_HOURS_DATA_SUCCESS';
export const GET_OFFICE_HOURS_DATA_FAIL = 'GET_OFFICE_HOURS_DATA_FAIL';

export const saveOffice = (newEvent) => {
    return axios({
        method: 'POST',
        url: `/settings/office`,
        data: newEvent,
        headers: { 'Content-Type': 'application/json' }
    })
}
// export const getOfficeHoursData = (ID) => {
//     return axios({
//         method: 'GET',
//         url: `/settings/office/hours/${ID}`,
//         //data: newEvent,
//         //headers: { 'Content-Type': 'application/json' }
//     })
// }
export function getOfficeHoursData(ID) {
    return (dispatch) => {
        dispatch({
            type: GET_OFFICE_HOURS_DATA_BEGIN
        })
        axios({
            method: 'GET',
            url: `/settings/office/hours/${ID}`,
        
        }).then(resp => {
            return dispatch({
                type: GET_OFFICE_HOURS_DATA_SUCCESS,
                resp: resp.data.data
            })            
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: GET_OFFICE_HOURS_DATA_FAIL,
                resp: error
            })
        })
    }
}
export function getState() {
    return (dispatch) => {
        dispatch({
            type: GET_STATE_BEGIN
        })
        axios({
            method: 'GET',
            url: `/us-states`,
        
        }).then(resp => {
            return dispatch({
                type: GET_STATE_SUCCESS,
                resp: resp.data.data
            })            
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: GET_STATE_FAIL,
                resp: error
            })
        })
    }
}

export function getOfficeTime() {
    return (dispatch) => {
        dispatch({
            type: GET_OFFICE_TIME_BEGIN
        })
        axios({
            method: 'GET',
            url: `/office-times`,
        
        }).then(resp => {
            return dispatch({
                type: GET_OFFICE_TIME_SUCCESS,
                resp: resp.data.data
            })            
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: GET_OFFICE_TIME_FAIL,
                resp: error
            })
        })
    }
}

export function getOfficeList() {
    return (dispatch) => {
        dispatch({
            type: GET_OFFICE_BEGIN
        })
        axios({
            method: 'GET',
            url: `/settings/office`,
        
        }).then(resp => {
            return dispatch({
                type: GET_OFFICE_SUCCESS,
                resp: resp.data.data
            })            
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: GET_OFFICE_FAIL,
                resp: error
            })
        })
    }
}

export function getOfficeDetails(ID) {
    return (dispatch) => {
        dispatch({
            type: GET_OFFICE_DETAILS_BEGIN
        })
        axios({
            method: 'GET',
            url: `/settings/office/${ID}`,
        
        }).then(resp => {
            return dispatch({
                type: GET_OFFICE_DETAILS_SUCCESS,
                resp: resp.data
            })            
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: GET_OFFICE_DETAILS_FAIL,
                resp: error
            })
        })
    }
}

export const updateOfficeHours = (value) => {
    return axios({
        method: 'POST',
        url:  `/settings/office/hours`,
        data: value,
        headers: { 'Content-Type': 'application/json' }
    })
}

export function deleteOfficeList(ID) {
    console.log()
    return (dispatch) => {
        dispatch({
            type: DELETE_OFFICE_LIST_BEGIN
        })
        axios({
            method: 'DELETE',
            url:  `/settings/office/${ID}`,
           
        }).then(resp => {
            return dispatch({
                type: DELETE_OFFICE_LIST_SUCCESS,
                resp: ID
            })            
        })
        .then(resp => {
            return dispatch(
                _Actions.showMessage({variant: 'success', message: 'Successfully Deleted' })
            )   
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: DELETE_OFFICE_LIST_FAIL,
                resp: error
            })
        })
        .catch(error => {
            console.log(error);
            return dispatch(
                _Actions.showMessage({ variant: 'error', message: 'error' })
            ) 
        })
    }
}
