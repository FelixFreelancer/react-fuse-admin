import * as Actions from '../actions';

const initialState = {
    data: null
};

const widgetsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        
        case Actions.GET_WIDGETS:
        console.log("action is++++++", action.payload)
            return {
                ...state,
                data: {...action.payload}
            };
        default:
            return state;
    }
};

export default widgetsReducer;