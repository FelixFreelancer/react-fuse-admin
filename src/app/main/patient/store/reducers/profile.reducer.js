import * as Actions from '../actions';

const initialState = {
  getInsuranceName:null,
  pageLoading:false,
  error:false,
  insuranceDetail:null,
  getPatientInfo:null
};

const profileReducer = function (state = initialState, action) {
  switch (action.type) {
    // case Actions.UPDATE_PROFILE:
    //   return {
    //     ...state
    //   };
    case Actions.GET_INSURANCE_NAME_BEGIN:
      return {...state, pageLoading: true, getInsuranceName: null, error:false};

  case Actions.GET_INSURANCE_NAME_SUCCESS:
      return {...state, pageLoading: false, getInsuranceName: action.resp, error: false};

  case Actions.GET_INSURANCE_NAME_FAIL:
      return {...state, pageLoading: false, getInsuranceName: null, error: true };  

      
    case Actions.GET_PROFILE:
      return {
        ...state,
        ...action.payload,
        getPatientInfo:action.payload
      };
    // case Actions.UPDATE_PROFILE:
    //   console.log(action.value);
    //   return {
    //     ...state,
    //     ...action.payload
    //   };
    case Actions.CLEAR_PROFILE:
      return initialState

    

    default:
      return {
        ...state
      };
  }
};
export default profileReducer;
