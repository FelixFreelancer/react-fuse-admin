
//import axios from 'axios';
import axiosCore from 'axios';
import * as _Actions from 'app/store/actions';
import { BASE_URL } from '../../../../fuse-configs/apiConfig';

const axios = axiosCore.create({
    baseURL: BASE_URL
});

export const SAVE_INSURANCE_BEGIN = 'SAVE_INSURANCE_BEGIN';
export const SAVE_INSURANCE_SUCCESS = 'SAVE_INSURANCE_SUCCESS';
export const SAVE_INSURANCE_FAIL = "SAVE_INSURANCE_FAIL"

export const DELETE_INSURANCE_BEGIN = 'DELETE_INSURANCE_BEGIN';
export const DELETE_INSURANCE_SUCCESS = 'DELETE_INSURANCE_SUCCESS';
export const DELETE_INSURANCE_FAIL = "DELETE_INSURANCE_FAIL";

export const GET_INSURANCE_BEGIN = 'GET_INSURANCE_BEGIN';
export const GET_INSURANCE_SUCCESS = 'GET_INSURANCE_SUCCESS';
export const GET_INSURANCE_FAIL = "GET_INSURANCE_FAIL";


export const UPDATE_INSURANCE_BEGIN = 'UPDATE_INSURANCE_BEGIN';
export const UPDATE_INSURANCE_SUCCESS = 'UPDATE_INSURANCE_SUCCESS';
export const UPDATE_INSURANCE_FAIL = "UPDATE_INSURANCE_FAIL";

export const GET_INSURANCE_NAME_BEGIN = 'GET_INSURANCE_NAME_BEGIN';
export const GET_INSURANCE_NAME_SUCCESS = 'GET_INSURANCE_NAME_SUCCESS';
export const GET_INSURANCE_NAME_FAIL = "GET_INSURANCE_NAME_FAIL";

export function saveInsurance(data) {
    console.log()
    return (dispatch) => {
        dispatch({
            type: SAVE_INSURANCE_BEGIN
        })
        axios({
            method: 'POST',
            url:  `settings/exam-type-many`,
            data: data,
            headers: { 'Content-Type': 'application/json' }
        }).then(resp => {
            return dispatch({
                type: SAVE_INSURANCE_SUCCESS,
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
                type: SAVE_INSURANCE_FAIL,
                resp: error
            })
        })
    }
}

// export const updateInsurance = (value) => {
//     return axios({
//         method: 'POST',
//         url:  `/settings/insurance-many`,
//         data: value,
//         headers: { 'Content-Type': 'application/json' }
//     })
// }

export function updateInsurance(data) {
    console.log()
    return (dispatch) => {
        dispatch({
            type: UPDATE_INSURANCE_BEGIN
        })
        axios({
            method: 'POST',
            url:  `/settings/insurance-many`,
            data: data,
            headers: { 'Content-Type': 'application/json' }
        }).then(resp => {
            return dispatch({
                type: UPDATE_INSURANCE_SUCCESS,
                resp: resp.data
            })            
        })
        .then(resp => {
            return dispatch(
                _Actions.showMessage({ variant: 'success', message: 'success fully Updated' })
            )   
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: UPDATE_INSURANCE_FAIL,
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


export function deleteInsurance(ID) {
    console.log()
    return (dispatch) => {
        dispatch({
            type: DELETE_INSURANCE_BEGIN
        })
        axios({
            method: 'DELETE',
            url:  `/settings/insurance/${ID}`,
           
        }).then(resp => {
            return dispatch({
                type: DELETE_INSURANCE_SUCCESS,
                resp: ID
            })            
        })
        .then(resp => {
            return dispatch(
                _Actions.showMessage({ message: 'Successfully Deleted' })
            )   
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: DELETE_INSURANCE_FAIL,
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

export function getInsurance(ID) {
    console.log()
    return (dispatch) => {
        dispatch({
            type: GET_INSURANCE_BEGIN
        })
        axios({
            method: 'GET',
            url:  `/settings/insurance/office/${ID}`,          
        }).then(resp => {
            return dispatch({
                type: GET_INSURANCE_SUCCESS,
                resp: resp.data.data
            })  
            
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: GET_INSURANCE_FAIL,
                resp: error
            })
        })
    }
}


export function getInsuranceName(ID) {
    console.log()
    return (dispatch) => {
        dispatch({
            type: GET_INSURANCE_NAME_BEGIN
        })
        axios({
            method: 'GET',
            url:  `/settings/insurance`,          
        }).then(resp => {
            return dispatch({
                type: GET_INSURANCE_NAME_SUCCESS,
                resp: resp.data
            })  
            
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: GET_INSURANCE_NAME_FAIL,
                resp: error
            })
        })
    }
}
