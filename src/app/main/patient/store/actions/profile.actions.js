import axiosCore from 'axios';
import { BASE_URL } from './../../../../fuse-configs/apiConfig';

export const GET_PROFILE = 'GET_PROFILE';
export const CLEAR_PROFILE = 'CLEAR_PROFILE';
// export const REMOVE_ACTIVE_PATIENT = 'REMOVE_ACTIVE_PATIENT';
// export const ERROR = 'ERROR';

export const GET_INSURANCE_NAME_BEGIN = 'GET_INSURANCE_NAME_BEGIN';
export const GET_INSURANCE_NAME_SUCCESS = 'GET_INSURANCE_NAME_SUCCESS';
export const GET_INSURANCE_NAME_FAIL = "GET_INSURANCE_NAME_FAIL";

const axios = axiosCore.create({
  baseURL: BASE_URL
});

export function getProfile(patientId) {
  const request = axios.get(`patient/get/${patientId}`);
  console.log('patientId', patientId);
  return dispatch =>
    request
      .then(response => {
        console.log('response data', response);
        dispatch({
          type: GET_PROFILE,
          payload: response.data.data
          //   patientId
        });
      })
      .catch(error => {
        console.log('error ==>', error);
      });
}

export function updateProfile(payload, patientId) {
  const request = axios.post(`patient/update/${patientId}`, payload);
  console.log('patientId', patientId);
  return dispatch =>
    request
      .then(response => {
        console.log('response', response);
        // dispatch({
        //   type: GET_PROFILE,
        //   payload: response.data.data
        //   //   patientId
        // });
      })
      .catch(error => {
        console.log('error ==>', error);
      });
}

export const clearProfile = () => {
  return dispatch =>
    dispatch({
      type: CLEAR_PROFILE,
    });
};

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
