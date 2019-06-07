import * as Actions from '../actions';


const initialState = {
  
  getOfficeHours:null,
  pageLoading:false,
  error:false
 
};

const officePageReducers = function (state = initialState, action) {
  switch (action.type) {



  
  case Actions.GET_OFFICE_HOURS_DATA_BEGIN:
      return {...state, pageLoading: true, getOfficeHours: null, error:false};

  case Actions.GET_OFFICE_HOURS_DATA_SUCCESS:
      return {...state, pageLoading: false, getOfficeHours:action.resp, error: false};

  case Actions.GET_OFFICE_HOURS_DATA_FAIL:
      return {...state, pageLoading: false, getOfficeHours: null, error: true };



  

    default:
      return {
        ...state
      };
  }
};
export default officePageReducers;
