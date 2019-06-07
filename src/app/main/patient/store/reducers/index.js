import { combineReducers } from 'redux';

import patient from './patient.reducer';
import profile from './profile.reducer';
import chart from './chart.reducer';

const reducer = combineReducers({
  patient,
  chart,
  profile
});

export default reducer;
