import axiosCore from 'axios';
import { BASE_URL } from './../../../../fuse-configs/apiConfig';

export const SET_ACTIVE_CHART = 'SET_ACTIVE_CHART';
export const SET_ACTIVE_PATIENT = 'SET_ACTIVE_PATIENT';
export const REMOVE_ACTIVE_PATIENT = 'REMOVE_ACTIVE_PATIENT';
export const SAVE_IN_PROGRESS = 'SAVE_IN_PROGRESS';
export const SIGN_CHART = 'SIGN_CHART';
export const ERROR = 'ERROR';

const axios = axiosCore.create({
  baseURL: BASE_URL
});

export function getChart(chartId) {
  const request = axios.get(`chart/get/${chartId}`);
  return dispatch =>
    request
      .then(response => {
        dispatch({
          type: SET_ACTIVE_CHART,
          chart: response.data.data
        });
      })
      .catch(error => {
        console.log('error ==>', error);
      });
}

export function getPatientInfo(patientId) {
  const request = axios.get(`patient/get/${patientId}`);
  return dispatch =>
    request
      .then(response => {
        console.log('response *******++++====> ',response);
        dispatch({
          type: SET_ACTIVE_PATIENT,
          patientInfo: response.data.data,
          patientId
        });
      })
      .catch(error => {
        console.log('error ==>', error);
      });
}

export function removeActivePatient() {
  return dispatch =>
    dispatch({
      type: REMOVE_ACTIVE_PATIENT
    });
}


export function signChart(isSigned, chartId) {
  const request = axios.post(`chart/sign-chart/${chartId}`, { isSigned });
  return dispatch =>
    request.then(response => {
      dispatch({
        type: SIGN_CHART,
        data: response.data.data
      });
    });
}
