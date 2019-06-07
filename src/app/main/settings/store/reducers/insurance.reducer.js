import * as Actions from '../actions';


const initialState = {

  saveInsurance:null, 
  deleteInsurance:null, 
  getInsurance:null,
  getInsuranceName:null,
  updateInsurance:null,
  pageLoading:false,
  error:false,
  
};

const insurancePageReducers = function (state = initialState, action) {
  switch (action.type) {
   
  case Actions.SAVE_INSURANCE_BEGIN:
      return {...state, pageLoading: true, saveInsurance: null, error:false};

  case Actions.SAVE_INSURANCE_SUCCESS:
      return {...state, pageLoading: false, saveInsurance: action.resp, error: false};

  case Actions.SAVE_INSURANCE_FAIL:
      return {...state, pageLoading: false, saveInsurance: null, error: true };


      
case Actions.UPDATE_INSURANCE_BEGIN:
      return {...state, pageLoading: true, updateInsurance: null, error:false};

  case Actions.UPDATE_INSURANCE_SUCCESS:
      return {...state, pageLoading: false, updateInsurance: action.resp, error: false};

  case Actions.UPDATE_INSURANCE_FAIL:
      return {...state, pageLoading: false, updateInsurance: null, error: true };




  case Actions.DELETE_INSURANCE_BEGIN:
      return {...state, pageLoading: true, deleteInsurance: null, error:false};

  case Actions.DELETE_INSURANCE_SUCCESS:
   //   return {...state, pageLoading: false, deleteInsurance: action.resp, error: false};
   return {...state, pageLoading: false, getInsurance: state.getInsurance.filter(v => v._id !== action.resp)}

  case Actions.DELETE_INSURANCE_FAIL:
      return {...state, pageLoading: false, deleteInsurance: null, error: true };   



      
  case Actions.GET_INSURANCE_BEGIN:
      return {...state, pageLoading: true, getInsurance: null, error:false};

  case Actions.GET_INSURANCE_SUCCESS:
      return {...state, pageLoading: false, getInsurance: action.resp, error: false};

  case Actions.GET_INSURANCE_FAIL:
      return {...state, pageLoading: false, getInsurance: null, error: true };  


      
case Actions.GET_INSURANCE_NAME_BEGIN:
      return {...state, pageLoading: true, getInsuranceName: null, error:false};

  case Actions.GET_INSURANCE_NAME_SUCCESS:
      return {...state, pageLoading: false, getInsuranceName: action.resp, error: false};

  case Actions.GET_INSURANCE_NAME_FAIL:
      return {...state, pageLoading: false, getInsuranceName: null, error: true };  

    default:
      return {
        ...state
      };
  }
};
export default insurancePageReducers;
