import { combineReducers } from 'redux';

import application from './applications.reducers';
import ros from './review-of-systems.reducer';
import test from './test.reducer';
import exam from './exam.reducer';
import ap from './ap.reducer';
import bill from './bill.reducer';

const reducer = combineReducers({
  application,
  test,
  exam,
  ros,
  ap,
  bill
});

export default reducer;
