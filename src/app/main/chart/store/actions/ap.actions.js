import axiosCore from 'axios';
import { BASE_URL } from '../../../../fuse-configs/apiConfig';

const axios = axiosCore.create({
  baseURL: BASE_URL
});

export const GET_AP = 'GET_AP';
export const SAVE_AP = 'SAVE_AP';

// export const TEST_ERROR = 'TEST_ERROR';
// export const TEST_SUCCESS = 'TEST_SUCCESS';

export function getAp(chartId) {
  const request = axios.get(`chart/get-ap/${chartId}`);
  return dispatch =>
    request.then(response => {
      dispatch({
        type: GET_AP,
        data: response.data.data
      });
    });
}

export function saveAp(payload, chart) {
  payload.chart = chart;
  const request = axios.post(`chart/save-ap`, payload);
  return dispatch =>
    request.catch(error => {
      alert(`Error : ${error.response.data.message}`);
    });
}

