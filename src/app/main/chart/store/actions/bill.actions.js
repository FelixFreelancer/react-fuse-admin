import axiosCore from 'axios';
import { BASE_URL } from '../../../../fuse-configs/apiConfig';

const axios = axiosCore.create({
  baseURL: BASE_URL
});

export const GET_BILL = 'GET_BILL';
export const SAVE_BILL = 'SAVE_BILL';

export const GET_CPT_BEGIN = 'GET_CPT_BEGIN';
export const GET_CPT_SUCCESS = 'GET_CPT_SUCCESS';
export const GET_CPT_FAIL = 'GET_CPT_FAIL';

export function getBill(chart) {
  const request = axios.get(`chart/get-bill/${chart}`);
  return dispatch =>
    request.then(response => {
      dispatch({
        type: GET_BILL,
        data: response.data.data
      });
    });
}

export function saveBill(payload, chart) {
  payload.chart = chart;
  const request = axios.post('chart/save-bill', payload);
  return dispatch =>
    request.catch(error => {
      // alert(`Error : ${error.response.data.message}`);
    });
}

export function getCPT() {
  return (dispatch) => {
      dispatch({
          type: GET_CPT_BEGIN
      })
      axios({
          method: 'GET',
          url:  `/settings/cpt`,          
      }).then(resp => {
          return dispatch({
              type: GET_CPT_SUCCESS,
              resp: resp.data
          })  
          
      })
      .catch(error => {
          console.log(error);
          return dispatch({
              type: GET_CPT_FAIL,
              resp: error
          })
      })
  }
}
