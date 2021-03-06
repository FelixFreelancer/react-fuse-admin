import * as Actions from '../actions';

const initialState = {
    entities   : [],
    eventDialog: {
        type : 'new',
        props: {
            open: false
        },
        data : null
    }
};

const eventsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_EVENTS:
        {
            return {
                ...state,
                entities: action.payload
            };
            // const entities = action.payload.map((event) => (
            //     {
            //         ...event,
            //         start: new Date(event.start),
            //         end  : new Date(event.end)
            //     }
            // ));
            // console.log("entities------~~~>", entities)
            // return {
            //     ...state,
            //     entities
            // };
        }
       
        case Actions.OPEN_NEW_EVENT_DIALOG:
        {
            return {
                ...state,
                eventDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : {
                        ...action.data
                    }
                }
            };
        }
        case Actions.CLOSE_NEW_EVENT_DIALOG:
        {
            return {
                ...state,
                eventDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_EVENT_DIALOG:
        {
            return {
                ...state,
                eventDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : {
                        ...action.data,
                        start: new Date(action.data.start),
                        end  : new Date(action.data.end)
                    }
                }
            };
        }
        case Actions.CLOSE_EDIT_EVENT_DIALOG:
        {
            return {
                ...state,
                eventDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.GET_EXAM_EVENT:
            return {
                ...state,
                examType: action.payload
            };
        case Actions.GET_INSURANCE_PROVIDER_EVENT:
            return {
                ...state,
                insurance: action.payload
            };    
        default:
        {
            return state;
        }
    }
};

export default eventsReducer;