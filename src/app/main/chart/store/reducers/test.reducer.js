import * as Actions from '../actions';

const initialState = {
  OD: {
    sphere: 0.0,
    cylinder: 0.0,
    axis: 180,
    iop: 0
  },
  OS: {
    sphere: 0.0,
    cylinder: 0.0,
    axis: 180,
    iop: 0
  },
  method: 'NCP',
  time: new Date()
};

const testReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SAVE_TEST:
      return {
        ...state
        // patientId: action.patientId
      };
    case Actions.GET_TEST:
    console.log("pepepe",action.data);
      return {
        ...state,
        patient: action.patientId,
        ...action.data
      };
    default:
      return {
        ...state
      };
  }
};
export default testReducer;
