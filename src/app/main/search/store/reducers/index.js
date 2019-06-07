import { combineReducers } from 'redux';

import patients from './patients.reducer';

const reducer = combineReducers({
    patients
});

export default reducer;
