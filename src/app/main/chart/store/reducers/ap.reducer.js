import * as Actions from '../actions';

const initialState = {
  diagnosis: '',
  plans: '',
  signed: false
};

const apReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SAVE_AP:
      return {
        ...state
      };
    case Actions.GET_AP:
      return {
        ...state,
        ...action.data
      };
    default:
      return {
        ...state
      };
  }
};
export default apReducer;
