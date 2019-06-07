import * as Actions from '../actions';


const initialState = {

    saveBilling: null,
    deleteBilling: null,
    getBilling: null,
    updateBilling: null,
    pageLoading: false,
    error: false,

};

const billingPageReducers = function (state = initialState, action) {
    switch (action.type) {


        case Actions.GET_BILLING_BEGIN:
            return { ...state, pageLoading: true, getBilling: null, error: false };

        case Actions.GET_BILLING_SUCCESS:
            return { ...state, pageLoading: false, getBilling: action.resp, error: false };

        case Actions.GET_BILLING_FAIL:
            return { ...state, pageLoading: false, getBilling: null, error: true };


        case Actions.SAVE_BILLING_BEGIN:
            return { ...state, pageLoading: true, saveBilling: null, error: false };

        case Actions.SAVE_BILLING_SUCCESS:
            return { ...state, pageLoading: false, saveBilling: action.resp, error: false };

        case Actions.SAVE_BILLING_FAIL:
            return { ...state, pageLoading: false, saveBilling: null, error: true };



        case Actions.UPDATE_BILLING_BEGIN:
            return { ...state, pageLoading: true, updateBilling: null, error: false };

        case Actions.UPDATE_BILLING_SUCCESS:
            var a = state.getBilling
            var b = action.resp
            var c = a.concat(b);
  console.log(" state.billing", state.getAppointment)
            console.log("response data => ", action.resp)
            console.log("updated billing => ", a)
        return { ...state, pageLoading: false, getBilling: c, error: true }
        //return {...state, pageLoading: false, updateBilling: action.resp, error: false};

        case Actions.UPDATE_BILLING_FAIL:
            return { ...state, pageLoading: false, updateBilling: null, error: true };




        case Actions.DELETE_BILLING_BEGIN:
            return { ...state, pageLoading: true, deleteBilling: null, error: false };

        case Actions.DELETE_BILLING_SUCCESS:
            var b = state.getBilling

            // return {...state, pageLoading: false, deleteBilling: action.resp, error: false};
            return { ...state, pageLoading: false, getBilling: state.getBilling.filter(v => v._id !== action.resp) }

        case Actions.DELETE_BILLING_FAIL:
            return { ...state, pageLoading: false, deleteBilling: null, error: true };






        default:
            return {
                ...state
            };
    }
};
export default billingPageReducers;
