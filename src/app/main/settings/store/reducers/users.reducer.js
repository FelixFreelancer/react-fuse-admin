import * as Actions from '../actions';


const initialState = {

  saveUser:null, 
  deleteUser:null, 
  getUser:null,
  updateUser:null,
  pageLoading:false,
  error:false,
  
};

const userPageReducers = function (state = initialState, action) {
  switch (action.type) {
   
  case Actions.SAVE_USER_BEGIN:
      return {...state, pageLoading: true, saveUser: null, error:false};

  case Actions.SAVE_USER_SUCCESS:
      return {...state, pageLoading: false, saveUser: action.resp, error: false};

  case Actions.SAVE_USER_FAIL:
      return {...state, pageLoading: false, saveUser: null, error: true };


      
case Actions.UPDATE_USER_BEGIN:
      return {...state, pageLoading: true, updateUser: null, error:false};

  case Actions.UPDATE_USER_SUCCESS:
      return {...state, pageLoading: false, updateUser: action.resp, error: false};

  case Actions.UPDATE_USER_FAIL:
      return {...state, pageLoading: false, updateUser: null, error: true };




  case Actions.DELETE_USER_BEGIN:
      return {...state, pageLoading: true, deleteUser: null, error:false};

  case Actions.DELETE_USER_SUCCESS:
      return {...state, pageLoading: false, deleteUser: action.resp, error: false};

  case Actions.DELETE_USER_FAIL:
      return {...state, pageLoading: false, deleteUser: null, error: true };   



      
  case Actions.GET_USER_BEGIN:
      return {...state, pageLoading: true, getUser: null, error:false};

  case Actions.GET_USER_SUCCESS:
      return {...state, pageLoading: false, getUser: action.resp, error: false};

  case Actions.GET_USER_FAIL:
      return {...state, pageLoading: false, getUser: null, error: true };   

    default:
      return {
        ...state
      };
  }
};
export default userPageReducers;
