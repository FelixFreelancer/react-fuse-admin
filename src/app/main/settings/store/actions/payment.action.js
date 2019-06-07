
//import axios from 'axios';
import axiosCore from 'axios';
import { BASE_URL } from '../../../../fuse-configs/apiConfig';
import * as _Actions from 'app/store/actions';
const axios = axiosCore.create({
    baseURL: BASE_URL
});
export const SEND_PAYMENT_BEGIN = 'SEND_PAYMENT_BEGIN';
export const SEND_PAYMENT_SUCCESS = 'SEND_PAYMENT_SUCCESS';
export const SEND_PAYMENT_FAIL = 'SEND_PAYMENT_FAIL';

export const GET_CARD_LIST_BEGIN = 'GET_CARD_LIST_BEGIN';
export const GET_CARD_LIST_SUCCESS = 'GET_CARD_LIST_SUCCESS';
export const GET_CARD_LIST_FAIL = 'GET_CARD_LIST_FAIL';


export const GET_SINGLE_CARD_BEGIN = 'GET_SINGLE_CARD_BEGIN';
export const GET_SINGLE_CARD_SUCCESS = 'GET_SINGLE_CARD_SUCCESS';
export const GET_SINGLE_CARD_FAIL = 'GET_SINGLE_CARD_FAIL';

export const UPDATE_CARD_BEGIN = 'UPDATE_CARD_BEGIN';
export const UPDATE_CARD_SUCCESS = 'UPDATE_CARD_SUCCESS';
export const UPDATE_CARD_FAIL = 'UPDATE_CARD_FAIL';

export const DELETE_CARD_BEGIN = 'DELETE_CARD_BEGIN';
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';
export const DELETE_CARD_FAIL = 'DELETE_CARD_FAIL';

export function SendPaymentDetails(data) {
    console.log()
    return (dispatch) => {
        dispatch({
            type: SEND_PAYMENT_BEGIN
        })
        axios({
            method: 'POST',
            url:  `/settings/stripe/card`,
            data: data,
            headers: { 'Content-Type': 'application/json' }
        }).then(resp => {
            return dispatch({
                type: SEND_PAYMENT_SUCCESS,
                resp: resp.data.data
            })            
        })
        .then(resp => {
            return dispatch(
                _Actions.showMessage({variant: 'success', message: 'success fully send' })
            )   
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: SEND_PAYMENT_FAIL,
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

export function getCardList(ID) {
    return (dispatch) => {
        dispatch({
            type: GET_CARD_LIST_BEGIN
        })
        axios({
            method: 'GET',
            url: `/settings/stripe/card/${ID}`,
        
        }).then(resp => {
            return dispatch({
                type: GET_CARD_LIST_SUCCESS,
                resp: resp.data.data
            })            
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: GET_CARD_LIST_FAIL,
                resp: error
            })
        })
    }
}

export function getSingleCardData(customerID, cardId) {
    return (dispatch) => {
        dispatch({
            type: GET_SINGLE_CARD_BEGIN
        })
        axios({
            method: 'GET',
            url: `/settings/stripe/card/${customerID}/${cardId}`,
        
        }).then(resp => {
            return dispatch({
                type: GET_SINGLE_CARD_SUCCESS,
                resp: resp.data
            })            
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: GET_SINGLE_CARD_FAIL,
                resp: error
            })
        })
    }
}

export function updateCardInfo(customer_id, card_id,cardDetails) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_CARD_BEGIN
        })
        axios({
            method: 'PUT',
            url: `/settings/stripe/card/${customer_id}/${card_id}`,
            data: cardDetails,
            headers: { 'Content-Type': 'application/json' }
        
        }).then(resp => {
            return dispatch({
                type: UPDATE_CARD_SUCCESS,
                resp: resp.data.data
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
                type: UPDATE_CARD_FAIL,
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

export function deleteCardInfo(customerID, cardId) {
    console.log()
    return (dispatch) => {
        dispatch({
            type: DELETE_CARD_BEGIN
        })
        axios({
            method: 'DELETE',
            url:  `/settings/stripe/card/${customerID}/${cardId}`,
           
        }).then(resp => {
            //console.log("respone of delte", resp)
            return dispatch({
                type: DELETE_CARD_SUCCESS,
                resp: cardId
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
                type: DELETE_CARD_FAIL,
                resp: error
            })
        })
    }
}