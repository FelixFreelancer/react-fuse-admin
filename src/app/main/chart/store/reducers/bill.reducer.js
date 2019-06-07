import * as Actions from '../actions';

const initialState = {
  CPT: [null],
  isPaid: false,
  amount: 0,
  paymentMode: 'Cash',
  isBilledInsurance: true,
  confirmationCode: '',
  getCTPVal:null,
  pageLoading:false,
  error:false
};

const billReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SAVE_BILL:
      return {
        ...state
      };
    case Actions.GET_BILL:
      return {
        ...state,
        ...action.data
      };

    case Actions.GET_CPT_BEGIN:
      return {...state, pageLoading: true, getCTPVal: null, error:false};

  case Actions.GET_CPT_SUCCESS:
      return {...state, pageLoading: false, getCTPVal: action.resp, error: false};

  case Actions.GET_CPT_FAIL:
      return {...state, pageLoading: false, getCTPVal: null, error: true };  

    default:
      return {
        ...state
      };
  }
};
export default billReducer;
