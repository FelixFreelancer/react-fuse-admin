import axiosCore from 'axios';
import * as _Actions from 'app/store/actions';
import { BASE_URL } from '../../../../fuse-configs/apiConfig';

const axios = axiosCore.create({
  baseURL: BASE_URL
});


export const GET_ROS = 'GET_ROS';
export const ADD_ROS = 'ADD_ROS';
export const DELETE_ROS = 'DELETE_ROS';
export const RESET_ROS = 'RESET_ROS';

export const ROS_ERROR = 'ROS_ERROR';
export const ROS_SUCCESS = 'ROS_SUCCESS';

export function getRos(chartId) {
  const request = axios.get(`chart/get-ros/${chartId}`);
  return dispatch =>
    request
      .then(response => {
        dispatch({
          type: GET_ROS,
          reviews: response.data.data
        });
      })
      .catch(error => {
        alert(`Error : ${error.response.data.message}`);
      });
}
export function addRos(payload) {
  const request = axios.post('chart/save-ros', payload);
  return dispatch =>
    request.then(response => {
      dispatch({
        type: ADD_ROS,
        newReviews: response.data.data
      })
    }).catch(error => {
      console.log(error);
      return dispatch(
          _Actions.showMessage({ variant: 'error', message: 'This Value Already Exists!' })
      ) 
  })
}

export function deleteRos(reviewId) {
  const request = axios.post('chart/delete-ros', { id: reviewId });
  return dispatch =>
    request.then(response => {
      dispatch({
        type: DELETE_ROS,
        deletedId: reviewId
      });
    }).catch(error => {
      alert(`Error : ${error.response.data.message}`);
    });
}

export function resetRos() {
  return dispatch =>
    dispatch({
      type: RESET_ROS
    });
}
