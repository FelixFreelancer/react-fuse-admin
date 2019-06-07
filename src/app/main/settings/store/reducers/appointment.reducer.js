import * as Actions from '../actions';


const initialState = {

    saveAppointment: null,
    deleteAppointment: null,
    getAppointment: null,
    updateAppointment: null,
    pageLoading: false,
    error: false,

};

const appointmentPageReducers = function (state = initialState, action) {
    switch (action.type) {

        case Actions.SAVE_APPOINTMENT_BEGIN:
            return { ...state, pageLoading: true, saveAppointment: null, error: false };

        case Actions.SAVE_APPOINTMENT_SUCCESS:
            return { ...state, pageLoading: false, saveAppointment: action.resp, error: false };

        case Actions.SAVE_APPOINTMENT_FAIL:
            return { ...state, pageLoading: false, saveAppointment: null, error: true };



        case Actions.GET_APPOINTMENT_BEGIN:
            return { ...state, pageLoading: true, getAppointment: null, error: false };

        case Actions.GET_APPOINTMENT_SUCCESS:
            return { ...state, pageLoading: false, getAppointment: action.resp, error: false };

        case Actions.GET_APPOINTMENT_FAIL:
            return { ...state, pageLoading: false, getAppointment: null, error: true };


        case Actions.UPDATE_APPOINTMENT_BEGIN:
            return { ...state, pageLoading: true, updateAppointment: null, error: false };


        case Actions.UPDATE_APPOINTMENT_SUCCESS:
            var a = state.getAppointment
            var b = action.resp
            var c = a.concat(b);
          
            return { ...state, pageLoading: false, getAppointment: c, error: true }

        case Actions.UPDATE_APPOINTMENT_FAIL:
            return { ...state, pageLoading: false, updateAppointment: null, error: true };



        case Actions.DELETE_APPOINTMENT_BEGIN:
            return { ...state, pageLoading: true, deleteAppointment: null, error: false };

        case Actions.DELETE_APPOINTMENT_SUCCESS:
            console.log("action.resp", action.resp)
            return { ...state, pageLoading: false, getAppointment: state.getAppointment.filter(v => v._id !== action.resp) }

        case Actions.DELETE_APPOINTMENT_FAIL:
            return { ...state, pageLoading: false, deleteAppointment: null, error: true };


        default:
            return {
                ...state
            };
    }
};
export default appointmentPageReducers;
