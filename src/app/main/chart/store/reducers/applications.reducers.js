import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
  activePatientId: null,
  activePatientInfo: null,
  // TODO : Remove the above soon
  loading: true,
  patient: null,
  chartId: null,
  chart: null,
  saveInProgress: false
};

const applicationsReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_ACTIVE_CHART:
      return {
        ...state,
        chart: action.chart,
        patient: action.chart.patient,
        loading: false
      };
    case Actions.SAVE_IN_PROGRESS:
      return {
        ...state,
        saveInProgress: true
      };
    case Actions.SIGN_CHART:
      return {
        ...state,
        ...action.data,
        chart: { ...state.chart, ...action.data }
      };
    case Actions.SET_ACTIVE_PATIENT:
    console.log('action.patientId ====> ',action.patientId);
      return {
        ...state,
        activePatientId: action.patientId,
        activePatientInfo: action.patientInfo
      };
    case Actions.REMOVE_ACTIVE_PATIENT:
      state = initialState;
      return {
        ...state,
        activePatientId: null,
        activePatientInfo: null
      };
    default:
      return {
        ...state
      };
  }
};
export default applicationsReducer;
