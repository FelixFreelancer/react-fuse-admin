import axiosCore from 'axios';
import { BASE_URL } from '../../../../fuse-configs/apiConfig';

const axios = axiosCore.create({
  baseURL: BASE_URL
});

export const GET_EXAM = 'GET_EXAM';
export const SAVE_EXAM = 'SAVE_EXAM';

export const EXAM_ERROR = 'EXAM_ERROR';
export const EXAM_SUCCESS = 'EXAM_SUCCESS';

export function getExam(patientId) {
  const request = axios.get(`chart/get-exam/${patientId}`);

  return dispatch =>
    request.then(response => {
      const { ...rest } = response.data.data;
      console.log('rest=======================>', rest);
      dispatch({
        type: GET_EXAM,
        data: rest
      });
    });
}

/**
 * @todo : Handle error in a better way
 * @param {string} step
 * @param {string} chart
 * @param {object} data
 */
export function saveExam(step, chart, data) {
  const payload = {
    chart: chart,
    [step]: data
  };
  const request = axios.post('chart/save-exam', payload);
  return dispatch =>
    request.catch(error => {
      alert(`Error : ${error.response.data.message}`);
    });
}
