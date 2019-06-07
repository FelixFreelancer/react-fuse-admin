
//import axios from 'axios';
import axiosCore from 'axios';
import { BASE_URL } from '../../../../fuse-configs/apiConfig';
import * as _Actions from 'app/store/actions';
const axios = axiosCore.create({
    baseURL: BASE_URL
});
export const SAVE_PROFILE_BEGIN = 'SAVE_PROFILE_BEGIN';
export const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS';
export const SAVE_PROFILE_FAIL = 'SAVE_PROFILE_FAIL';

export const GET_PROFILE_BEGIN = 'GET_PROFILE_BEGIN';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAIL = 'GET_PROFILE_FAIL';


export function saveProfile(newEvent, DoctoreId) {
    return (dispatch) => {
        dispatch({
            type: SAVE_PROFILE_BEGIN
        })
        axios({
            method: 'PUT',
            url: `/settings/doctor/${DoctoreId}`,
            data: newEvent,
            headers: { 'Content-Type': 'application/json' }
        
        }).then(resp => {
            return dispatch({
                type: SAVE_PROFILE_SUCCESS,
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
                type: SAVE_PROFILE_FAIL,
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
  
export function getProfile(doctoreID) {
    return (dispatch) => {
        dispatch({
            type: GET_PROFILE_BEGIN
        })
        axios({
            method: 'GET',
            url:  `/settings/doctor/${doctoreID}`,
        }).then(resp => {
            return dispatch({
                type: GET_PROFILE_SUCCESS,
                resp: resp.data
            })  
        })
        .catch(error => {
            console.log(error);
            return dispatch({
                type: GET_PROFILE_FAIL,
                resp: error
            })
        })
    }
}

// export function saveProfile(newEvent, DoctoreId) {
//     return (dispatch, getState) => {

//         const request = axios({
//             method: 'PUT',
//             url: `/settings/doctor/${DoctoreId}`,
//             data: newEvent,
//             headers: { 'Content-Type': 'application/json' }
//         })

//         return request.then((response) =>
//             Promise.all([
//                 dispatch({
//                     type: SAVE_PROFILE
//                 })
//             ])
//         );
//     };
// }


// export function getProfile(doctoreID) {
//     console.log("action----->", doctoreID)
//     const request = axios.get(`/settings/doctor/${doctoreID}`);
//     return dispatch =>
//       request.then(response => {

//         dispatch({
//           type: GET_PROFILE,
//           data: response.data
//         });
//       });
//   }


