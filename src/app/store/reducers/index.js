import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import fuse from './fuse';
import auth from 'app/auth/store/reducers';
import quickPanel from 'app/fuse-layouts/shared-components/quickPanel/store/reducers';

console.log('formReducer', formReducer);

const createReducer = asyncReducers =>
  combineReducers({
    auth,
    fuse,
    quickPanel,
    form: formReducer,
    ...asyncReducers
  });

export default createReducer;
