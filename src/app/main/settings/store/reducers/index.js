
import {combineReducers} from 'redux';
import profile from './profile.reducer';
import office from './office.reducer';
import appointment from './appointment.reducer';
import billing from './billing.reducer';
import user from './users.reducer';
import insurance from './insurance.reducer';
import payment from './payment.reducer';
import officeHours from './officeHours.reducer';
const settingReducer = combineReducers({
  profile,
  office,
  appointment,
  billing,
  user,
  insurance,
  payment,
  officeHours
});

export default settingReducer;
