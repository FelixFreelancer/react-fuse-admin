
//import axios from 'axios';
import axiosCore from 'axios';
import * as _Actions from 'app/store/actions';
import { BASE_URL } from '../../../../fuse-configs/apiConfig';

const axios = axiosCore.create({
    baseURL: BASE_URL
});

export const SAVE_BILLING_BEGIN = 'SAVE_BILLING_BEGIN';
export const SAVE_BILLING_SUCCESS = 'SAVE_BILLING_SUCCESS';
export const SAVE_BILLING_FAIL = "SAVE_BILLING_FAIL"

export const DELETE_BILLING_BEGIN = 'DELETE_BILLING_BEGIN';
export const DELETE_BILLING_SUCCESS = 'DELETE_BILLING_SUCCESS';
export const DELETE_BILLING_FAIL = "DELETE_BILLING_FAIL";

export const GET_BILLING_BEGIN = 'GET_BILLING_BEGIN';
export const GET_BILLING_SUCCESS = 'GET_BILLING_SUCCESS';
export const GET_BILLING_FAIL = "GET_BILLING_FAIL";


export const UPDATE_BILLING_BEGIN = 'UPDATE_BILLING_BEGIN';
export const UPDATE_BILLING_SUCCESS = 'UPDATE_BILLING_SUCCESS';
export const UPDATE_BILLING_FAIL = "UPDATE_BILLING_FAIL";

  

export function saveBilling(data) {
    console.log()
    return (dispatch) => {
        dispatch({
            type: SAVE_BILLING_BEGIN
        })
        axios({
            method: 'POST',
            url:  `settings/exam-type-many`,
            data: data,
            headers: { 'Content-Type': 'application/json' }
        }).then(resp => {
            return dispatch({
                type: SAVE_BILLING_SUCCESS,
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
                type: SAVE_BILLING_FAIL,
                resp: error
            })
        })
    }
}

export const updateBilling = (value) => {
    return axios({
        method: 'POST',
        url:  `/settings/cpt-many`,
        data: value,
        headers: { 'Content-Type': 'application/json' }
    })
}
// export function updateBilling(data) {
//     return (dispatch) => {
//         dispatch({
//             type: UPDATE_BILLING_BEGIN
//         })
//         axios({
//             method: 'POST',
//             url:  `/settings/cpt-many`,
//             data: data,
//             headers: { 'Content-Type': 'application/json' }
//         }).then(resp => {
//             return dispatch({
//                 type: UPDATE_BILLING_SUCCESS,
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
//                 type: UPDATE_BILLING_FAIL,
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


export function deleteBilling(ID) {
    console.log()
    return (dispatch) => {
        dispatch({
            type: DELETE_BILLING_BEGIN
        })
        axios({
            method: 'DELETE',
            url:  `/settings/cpt/${ID}`,
           
        }).then(resp => {
            return dispatch({
                type: DELETE_BILLING_SUCCESS,
                resp: ID
            })            
        })
        .then(resp => {
            return dispatch(
                _Actions.showMessage({ variant: 'success', message: 'Successfully Deleted' })
            )   
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: DELETE_BILLING_FAIL,
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

export function getBilling(ID) {
    console.log()
    return (dispatch) => {
        dispatch({
            type: GET_BILLING_BEGIN
        })
        axios({
            method: 'GET',
            url:  `/settings/cpt/office/${ID}`,          
        }).then(resp => {
            return dispatch({
                type: GET_BILLING_SUCCESS,
                resp: resp.data.data
            })  
            
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: GET_BILLING_FAIL,
                resp: error
            })
        })
    }
}
