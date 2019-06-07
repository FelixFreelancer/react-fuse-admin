import axiosCore from 'axios';
import { BASE_URL } from '../../../../fuse-configs/apiConfig';

const axios = axiosCore.create({
    baseURL: BASE_URL
});

export const GET_PATIENTS = 'GET_PATIENTS';
export const REQUEST_PATIENTS = 'REQUEST_PATIENTS';
export const CREATED_PATIENT = 'CREATED_PATIENT';


export function getPatients(query) {
    const request = axios.get(`patient/list`, { params: { ...query } });
    return dispatch => {
        dispatch({
            type: REQUEST_PATIENTS,
            // payload: response.data.data,
        });
        request.then(response => {
            dispatch({
                type: GET_PATIENTS,
                payload: response.data.data,
            });
        });
    }
}

export function createPatient(payload) {
    const request = axios.post(`patient/add`, payload);

    return dispatch =>
        request.then(response => {
            console.log("yellow", response);
            dispatch({
                type: CREATED_PATIENT,
                payload: response.data.data
            });
        }).catch(error => {
            console.log('error ==>', error);
        });

}



// export function saveBill(payload, patientId) {
//   payload.patient = patientId;
//   const request = axios.post('applications/save-bill', payload);
//   return dispatch =>
//     request.then(response => {
//       // dispatch({
//       //   type: SAVE_TEST
//       //   // newReviews: payload,
//       //   // patientId: payload.patientId
//       // });
//     });
// }
