import * as Actions from '../actions';


const initialState = {
  saveOffice: null,
  getOffice:null,
  getOfficeDetails:null,
  updateOffice:null,
  deleteOfficeList:null,
  getState:null,
  getOfficeTime:null,
  pageLoading:false,
  error:false
 
};

const officePageReducers = function (state = initialState, action) {
  switch (action.type) {

    case Actions.SAVE_OFFICE_BEGIN:
      return {...state, pageLoading: true, saveOffice: null, error:false};

  case Actions.SAVE_OFFICE_SUCCESS:
      return {...state, pageLoading: false, saveOffice:action.resp, error: false};

  case Actions.SAVE_OFFICE_FAIL:
      return {...state, pageLoading: false, saveOffice: null, error: true };


    case Actions.GET_STATE_BEGIN:
            return { ...state, pageLoading: true, getState: null, error: false };

    case Actions.GET_STATE_SUCCESS:
            return { ...state, pageLoading: false, getState: action.resp, error: false };

    case Actions.GET_STATE_FAIL:
            return { ...state, pageLoading: false, getState: null, error: true };



    case Actions.GET_OFFICE_TIME_BEGIN:
            return { ...state, pageLoading: true, getOfficeTime: null, error: false };

    case Actions.GET_OFFICE_TIME_SUCCESS:
            return { ...state, pageLoading: false, getOfficeTime: action.resp, error: false };

    case Actions.GET_OFFICE_TIME_FAIL:
            return { ...state, pageLoading: false, getOfficeTime: null, error: true };




    case Actions.GET_OFFICE_BEGIN:
      return {...state, pageLoading: true, getOffice: null, error:false};

  case Actions.GET_OFFICE_SUCCESS:
      return {...state, pageLoading: false, getOffice:action.resp, error: false};

  case Actions.GET_OFFICE_FAIL:
      return {...state, pageLoading: false, getOffice: null, error: true };



  case Actions.GET_OFFICE_DETAILS_BEGIN:
      return {...state, pageLoading: true, getOfficeDetails: null, error:false};

  case Actions.GET_OFFICE_DETAILS_SUCCESS:
      return {...state, pageLoading: false, getOfficeDetails:action.resp, error: false};

  case Actions.GET_OFFICE_DETAILS_FAIL:
      return {...state, pageLoading: false, getOfficeDetails: null, error: true };
      


  case Actions.UPDATE_OFFICE_BEGIN:
      return {...state, pageLoading: true, updateOffice: null, error:false};

  case Actions.UPDATE_OFFICE_SUCCESS:
      return {...state, pageLoading: false, updateOffice:action.resp, error: false};

  case Actions.UPDATE_OFFICE_FAIL:
      return {...state, pageLoading: false, updateOffice: null, error: true };



  case Actions.DELETE_OFFICE_LIST_BEGIN:
      return {...state, pageLoading: true, deleteOfficeList: null, error:false};

  case Actions.DELETE_OFFICE_LIST_SUCCESS:
//   console.log("action.resp", action.resp)
//   console.log("office list.resp", this.state.getOffice)
  return {...state, pageLoading: false, getOffice: state.getOffice.filter(v => v._id !== action.resp)}
      //return {...state, pageLoading: false, deleteOfficeList: action.resp, error: false};

  case Actions.DELETE_OFFICE_LIST_FAIL:
      return {...state, pageLoading: false, deleteOfficeList: null, error: true };   

    default:
      return {
        ...state
      };
  }
};
export default officePageReducers;
