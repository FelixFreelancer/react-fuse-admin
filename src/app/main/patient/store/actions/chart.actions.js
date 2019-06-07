import axiosCore from 'axios';
import { BASE_URL } from './../../../../fuse-configs/apiConfig';

export const GET_RX = 'GET_RX';
export const GET_CHART = 'GET_CHART';
export const GET_CHART_LIST = 'GET_CHART_LIST';
export const CREATED_CHART = 'CREATE_CHART';

const axios = axiosCore.create({
  baseURL: BASE_URL
});

export async function getRX(chartId) {
  const response = await axios.get(`chart/get-RX/${chartId}`);
  console.log('pp', response);
  return response.data.data;
}

export async function getChart(chartId) {
  const response = await axios.get(`chart/get-patient-chart/${chartId}`);
  return response.data.data;
}

export function listCharts(patientId) {
  const request = axios.get(`chart/list-patient-charts/${patientId}`);
  console.log('pp', patientId);
  return dispatch =>
    request
      .then(response => {
        console.log('response', response);
        dispatch({
          type: GET_CHART_LIST,
          data: response.data.data
        });
      })
      .catch(error => {
        console.log('error ==>', error);
      });
}

export function createChart(value, patientId) {
  const request = axios.post(`chart/save-chart`, value, patientId);
  return dispatch =>
    request
      .then(response => {
        console.log('response', response);
        dispatch({
          type: CREATED_CHART,
          data: response.data.data
        });
      })
      .catch(error => {
        console.log('error ==>', error);
      });
}
