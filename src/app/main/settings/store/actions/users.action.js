
//import axios from 'axios';
import axiosCore from 'axios';
import * as _Actions from 'app/store/actions';
import { BASE_URL } from '../../../../fuse-configs/apiConfig';

const axios = axiosCore.create({
    baseURL: BASE_URL
});

export const SAVE_USER_BEGIN = 'SAVE_USER_BEGIN';
export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS';
export const SAVE_USER_FAIL = "SAVE_USER_FAIL";

export const UPDATE_USER_BEGIN = 'UPDATE_APPOINTMENT_BEGIN';
export const UPDATE_USER_SUCCESS = 'UPDATE_APPOINTMENT_SUCCESS';
export const UPDATE_USER_FAIL = "UPDATE_APPOINTMENT_FAIL";


export const DELETE_USER_BEGIN = 'DELETE_USER_BEGIN';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";

export const GET_USER_BEGIN = 'GET_USER_BEGIN';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAIL = "GET_USER_FAIL";



  

export function saveUsers(data) {
    console.log()
    return (dispatch) => {
        dispatch({
            type: SAVE_USER_BEGIN
        })
        axios({
            method: 'POST',
            url:  `settings/exam-type-many`,
            data: data,
            headers: { 'Content-Type': 'application/json' }
        }).then(resp => {
            return dispatch({
                type: SAVE_USER_SUCCESS,
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
                type: SAVE_USER_FAIL,
                resp: error
            })
        })
    }
}

export const updateUsers = (value) => {
    return axios({
        method: 'POST',
        url:  `/settings/user-many`,
        data: value,
        headers: { 'Content-Type': 'application/json' }
    })
}
// export function updateUsers(data,ID) {
//     console.log()
//     return (dispatch) => {
//         dispatch({
//             type: UPDATE_USER_BEGIN
//         })
//         axios({
//             method: 'PUT',
//             url:  `/settings/exam-type/${ID}`,
//             data: data,
//             headers: { 'Content-Type': 'application/json' }
//         }).then(resp => {
//             return dispatch({
//                 type: UPDATE_USER_SUCCESS,
//                 resp: resp.data
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
//                 type: UPDATE_USER_FAIL,
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


export function deleteUsers(ID) {
    console.log()
    return (dispatch) => {
        dispatch({
            type: DELETE_USER_BEGIN
        })
        axios({
            method: 'DELETE',
            url:  `/settings/user/${ID}`,
           
        }).then(resp => {
            return dispatch({
                type: DELETE_USER_SUCCESS,
                resp: resp.data
            })            
        })
        .then(resp => {
            return dispatch(
                _Actions.showMessage({ variant: 'success',message: 'Successfully Deleted' })
            )   
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: DELETE_USER_FAIL,
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

export function getUsers(ID) {
    console.log()
    return (dispatch) => {
        dispatch({
            type: GET_USER_BEGIN
        })
        axios({
            method: 'GET',
            url:  `settings/user/office/${ID}`,          
        }).then(resp => {
            return dispatch({
                type: GET_USER_SUCCESS,
                resp: resp.data.data
            })  
            
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: GET_USER_FAIL,
                resp: error
            })
        })
    }
}
