
//import axios from 'axios';
import axiosCore from 'axios';
import * as _Actions from 'app/store/actions';
import { BASE_URL } from '../../../../fuse-configs/apiConfig';

const axios = axiosCore.create({
    baseURL: BASE_URL
});

export const SAVE_APPOINTMENT_BEGIN = 'SAVE_APPOINTMENT_BEGIN';
export const SAVE_APPOINTMENT_SUCCESS = 'SAVE_APPOINTMENT_SUCCESS';
export const SAVE_APPOINTMENT_FAIL = "SAVE_APPOINTMENT_FAIL"

export const DELETE_APPOINTMENT_BEGIN = 'DELETE_APPOINTMENT_BEGIN';
export const DELETE_APPOINTMENT_SUCCESS = 'DELETE_APPOINTMENT_SUCCESS';
export const DELETE_APPOINTMENT_FAIL = "DELETE_APPOINTMENT_FAIL";

export const GET_APPOINTMENT_BEGIN = 'GET_APPOINTMENT_BEGIN';
export const GET_APPOINTMENT_SUCCESS = 'GET_APPOINTMENT_SUCCESS';
export const GET_APPOINTMENT_FAIL = "GET_APPOINTMENT_FAIL";


export const UPDATE_APPOINTMENT_BEGIN = 'UPDATE_APPOINTMENT_BEGIN';
export const UPDATE_APPOINTMENT_SUCCESS = 'UPDATE_APPOINTMENT_SUCCESS';
export const UPDATE_APPOINTMENT_FAIL = "UPDATE_APPOINTMENT_FAIL";

  
export function getAppointmentDetails(ID) {
    console.log()
    return (dispatch) => {
        dispatch({
            type: GET_APPOINTMENT_BEGIN
        })
        axios({
            method: 'GET',
            url:  `/settings/exam-type/office/${ID}`,          
        }).then(resp => {
            return dispatch({
                type: GET_APPOINTMENT_SUCCESS,
                resp: resp.data.data
            })  
            
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: GET_APPOINTMENT_FAIL,
                resp: error
            })
        })
    }
}
export function saveAppointment(data) {
    console.log()
    return (dispatch) => {
        dispatch({
            type: SAVE_APPOINTMENT_BEGIN
        })
        axios({
            method: 'POST',
            url:  `/settings/exam-type-many`,
            data: data,
            headers: { 'Content-Type': 'application/json' }
        }).then(resp => {
            return dispatch({
                type: SAVE_APPOINTMENT_SUCCESS,
                resp: resp.data
            })            
        })
        .then(resp => {
            return dispatch(
                _Actions.showMessage({ message: 'success fully added' })
            )   
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: SAVE_APPOINTMENT_FAIL,
                resp: error
            })
        })
    }
}

export const updateAppointment = (value) => {
    return axios({
        method: 'POST',
        url:  `/settings/exam-type-many`,
        data: value,
        headers: { 'Content-Type': 'application/json' }
    })
}

// export function updateAppointment(data) {
//     console.log()
//     return (dispatch) => {
//         dispatch({
//             type: UPDATE_APPOINTMENT_BEGIN
//         })
//         axios({
//             method: 'POST',
//             url:  `/settings/exam-type-many`,
//             data: data,
//             headers: { 'Content-Type': 'application/json' }
//         }).then(resp => {
//             return dispatch({
//                 type: UPDATE_APPOINTMENT_SUCCESS,
//                 resp: resp.data.data
//             })            
//         })
//         .then(resp => {
//             return dispatch(
//                 _Actions.showMessage({ variant: 'success', message: 'success fully Updated' })
//             )   
//         })
//         .catch(error => {
//             console.log(error);
//             return dispatch({
//                 type: UPDATE_APPOINTMENT_FAIL,
//                 resp: error
//             })
//         })
//         .catch(error => {
//             console.log(error);
//             return dispatch(
//                 _Actions.showMessage({ variant: 'error', message: 'error' })
//             ) 
//         })
//     }
// }


export function deleteAppointment(ID) {
    console.log()
    return (dispatch) => {
        dispatch({
            type: DELETE_APPOINTMENT_BEGIN
        })
        axios({
            method: 'DELETE',
            url:  `/settings/exam-type/${ID}`,
           
        }).then(resp => {
            return dispatch({
                type: DELETE_APPOINTMENT_SUCCESS,
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
                type: DELETE_APPOINTMENT_FAIL,
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


