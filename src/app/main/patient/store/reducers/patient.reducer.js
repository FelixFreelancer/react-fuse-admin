import * as Actions from '../actions';

const initialState = {
  patientId: null
};

const patientReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_PATIENT:
      console.log('action', action);
      return {
        ...state,
        patientId: action.patientId
      };
    default:
      return {
        ...state
      };
  }
};
export default patientReducer;
