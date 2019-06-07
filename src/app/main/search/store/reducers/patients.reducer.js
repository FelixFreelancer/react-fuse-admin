import * as Actions from '../actions';

const initialState = {
    isFetching: false,
    patients: [],
};

const patientsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.REQUEST_PATIENTS:
            return {
                ...state,
                isFetching: true
            }
        case Actions.GET_PATIENTS:
            console.log('get ---- action.payload ====> ',action.payload);
            return {
                ...state,
                isFetching: false,
                patients: action.payload
            };
        case Actions.CREATED_PATIENT:
                var a = state.patients;
                var b = action.payload
                var c = {
                    dob: b.dob,
                    gender: b.gender,
                    lastVisitOn: b.lastVisitOn,
                    diagnosis:b.diagnosis,
                    _id:b._id,
                    user:{
                        email:b.email,
                        firstName: b.firstName,
                        lastName: b.lastName,
                        password:b.password,
                        role:b.role,
                        _id:b._id
                    }
                }
                a.push({"patient": c});
                console.log('a ====> ',a);
            return {
                ...state,
                 isFetching: false,
                patients: a
            };

        // case Actions.GET_BILL:
        //     return {
        //         ...state,
        //         patient: action.patientId,
        //         ...action.data
        //     };
        default:
            return {
                ...state
            };
    }
};
export default patientsReducer;
