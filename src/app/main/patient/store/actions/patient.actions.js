import axiosCore from 'axios';
import { BASE_URL } from './../../../../fuse-configs/apiConfig';

export const SET_PATIENT = 'SET_PATIENT';
// export const REMOVE_ACTIVE_PATIENT = 'REMOVE_ACTIVE_PATIENT';
// export const ERROR = 'ERROR';

const axios = axiosCore.create({
  baseURL: BASE_URL
});

export function setPatient(patientId) {
  console.log('patientId', patientId);
  return dispatch =>
    dispatch({
      type: SET_PATIENT,
      patientId
    });
}

// export function getPatientInfo(patientId) {
//   const request = axios.get(`patient/get/${patientId}`);
//   return dispatch =>
//     request
//       .then(response => {
//         dispatch({
//           type: SET_ACTIVE_PATIENT,
//           patientInfo: response.data.data,
//           patientId
//         });
//       })
//       .catch(error => {
//         console.log('error ==>', error);
//       });
// }

// export function removeActivePatient() {
//   return dispatch =>
//     dispatch({
//       type: REMOVE_ACTIVE_PATIENT,
//     });
// }
