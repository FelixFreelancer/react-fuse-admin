import * as Actions from '../actions';


const initialState = {
 
  pageLoading: true,
  getProfile: null,
 
};

const profilePageReducers = function (state = initialState, action) {
  switch (action.type) {


  case Actions.SAVE_PROFILE_BEGIN:
      return {...state, pageLoading: true, getDoctotID: null, error:false};

  case Actions.SAVE_PROFILE_SUCCESS:
      return {...state, pageLoading: false, ...action.payload, error: false};

  case Actions.SAVE_PROFILE_FAIL:
      return {...state, pageLoading: false, getDoctotID: null, error: true };



      
  case Actions.GET_PROFILE_BEGIN:
      return {...state, pageLoading: true, getProfile: null, error:false};

  case Actions.GET_PROFILE_SUCCESS:
      return {...state, pageLoading: false, getProfile:action.resp, error: false};

  case Actions.GET_PROFILE_FAIL:
      return {...state, pageLoading: false, getProfile: null, error: true };  

    default:
      return {
        ...state
      };
  }
};
export default profilePageReducers;
