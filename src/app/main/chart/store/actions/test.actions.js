import axiosCore from 'axios';
import { BASE_URL } from '../../../../fuse-configs/apiConfig';

const axios = axiosCore.create({
  baseURL: BASE_URL
});

export const GET_TEST = 'GET_TEST';
export const SAVE_TEST = 'SAVE_TEST';

export const TEST_ERROR = 'TEST_ERROR';
export const TEST_SUCCESS = 'TEST_SUCCESS';

export function getTest(chartId) {
  const request = axios.get(`chart/get-test/${chartId}`);
  return dispatch =>
    request.then(response => {
      dispatch({
        type: GET_TEST,
        data: response.data.data,
      });
    });
}

export function saveTest(payload, chartId) {
  console.log('payload ===> ', payload);
  payload.time = new Date();
  payload.chart = chartId;
  const request = axios.post('chart/save-test', payload);
  return dispatch =>
    request.then(response => {
      // dispatch({
      //   type: SAVE_TEST
      //   // newReviews: payload,
      //   // patientId: payload.patientId
      // });
    });
}
