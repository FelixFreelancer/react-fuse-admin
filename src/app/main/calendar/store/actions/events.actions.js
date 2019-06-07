
//import axios from 'axios';
import axiosCore from 'axios';
import { BASE_URL } from '../../../../fuse-configs/apiConfig';

const axios = axiosCore.create({
    baseURL: BASE_URL
});
export const GET_EVENTS = '[CALENDAR APP] GET EVENTS';
export const OPEN_NEW_EVENT_DIALOG = '[CALENDAR APP] OPEN NEW EVENT DIALOG';
export const CLOSE_NEW_EVENT_DIALOG = '[CALENDAR APP] CLOSE NEW EVENT DIALOG';
export const OPEN_EDIT_EVENT_DIALOG = '[CALENDAR APP] OPEN EDIT EVENT DIALOG';
export const CLOSE_EDIT_EVENT_DIALOG = '[CALENDAR APP] CLOSE EDIT EVENT DIALOG';
export const ADD_EVENT = '[CALENDAR APP] ADD EVENT';
export const UPDATE_EVENT = '[CALENDAR APP] UPDATE EVENT';
export const REMOVE_EVENT = '[CALENDAR APP] REMOVE EVENT';

export const GET_EXAM_EVENT = '[CALENDAR APP] GET_EXAM_EVENT';
export const GET_INSURANCE_PROVIDER_EVENT = '[CALENDAR APP] GET_INSURANCE_PROVIDER_EVENT';


export function getExamType() {
    console.log("In action getExamType");
    const request = axios.get(`chart/get-exam-type`);
    return dispatch =>
        request.then(response => {
            dispatch({
                type: GET_EXAM_EVENT,
                payload: response.data.data
            });
        });
}

export function insuranceProvider() {
    console.log("In action insuranceProvider");
    const request = axios.get(`chart/get-insurance-provider`);
    return dispatch =>
        request.then(response => {
            dispatch({
                type: GET_INSURANCE_PROVIDER_EVENT,
                payload: response.data.data
            });
        });
}

export function getEvents() {
    var result = []
    const request = axios.get(`/appointment/get-appointment`);

    return (dispatch) =>
        request.then((response) => {
            response.data.data.map((event) => {
                const res = {
                   // desc: event.insurance.Insurance_Name,
                    end: event.appointmentDate,
                    id: event._id,
                    start: event.appointmentDate,
                    title: event.examType.Exam_Name,

                    firstName:event.patient.user.firstName,
                    lastName:event.patient.user.lastName,
                    email:event.patient.user.email,
                    phone:event.patient.phone,
                    dob:event.patient.dob,
                    examType: event.examType._id,
                    Insurance: event.insurance._id,
                   
                }
                result.push(res);
            })
            dispatch({
                type: GET_EVENTS,
                payload: result

            })
        }
        );
}

// export function getEvents() {
//     const request = axios.get('/appointment/get-appointment/5cbac099ae507822c49f3633');

//     return (dispatch) =>
//         request.then((response) =>
//             dispatch({
//                 type: GET_EVENTS,
//                 // payload: response.data.data
//                 payload: [{
//                     desc: "Most important meal of the day",
//                     end: 'Thu Apr 12 2018 17: 30: 00 GMT + 0530(India Standard Time)',
//                     id: 9,
//                     start: 'Thu Apr 12 2018 17: 00: 00 GMT + 0530(India Standard Time)',
//                     title: "Happy Hour"
//                 },
//                 {
//                     end: 'Fri Apr 13 2018 10:30:00 GMT+0530 (India Standard Time)',
//                     id: 11,
//                     start: 'Fri Apr 13 2018 07:00:00 GMT+0530 (India Standard Time)',
//                     title: "Birthday Party"
//                 },
//                 {
//                     end: 'Sun Apr 22 2018 02:00:00 GMT+0530 (India Standard Time)',
//                     id: 13,
//                     start: 'Fri Apr 20 2018 19:30:00 GMT+0530 (India Standard Time)',
//                     title: "Multi-day Event"
//                 }]
//             })
//         );
// }

export function openNewEventDialog(data) {
    return {
        type: OPEN_NEW_EVENT_DIALOG,
        data
    }
}

export function closeNewEventDialog() {
    return {
        type: CLOSE_NEW_EVENT_DIALOG
    }
}

export function openEditEventDialog(data) {
    console.log("openEditEventDialog", data)
    return {
        type: OPEN_EDIT_EVENT_DIALOG,
        data
    }
}

export function closeEditEventDialog() {
    return {
        type: CLOSE_EDIT_EVENT_DIALOG
    }
}


export function addEvent(newEvent) {
    return (dispatch, getState) => {

        // const request = axios.post('/api/appointment/save-appointment', {
        //     newEvent
        // });
        const request = axios({
            method: 'POST',
            url: '/appointment/save-appointment',
            data: newEvent,
            headers: { 'Content-Type': 'application/json' }
        })

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_EVENT
                })
            ]).then(() => dispatch(getEvents()))
        );
    };
}

export function updateEvent(event) {
    return (dispatch, getState) => {

        const request = axios.post('/appointment/edit-appointment', {
            event
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_EVENT
                })
            ]).then(() => dispatch(getEvents()))
        );
    };
}

export function removeEvent(eventId) {
    return (dispatch, getState) => {

        const request = axios.post('/api/calendar-app/remove-event', {
            eventId
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_EVENT
                })
            ]).then(() => dispatch(getEvents()))
        );
    };
}
