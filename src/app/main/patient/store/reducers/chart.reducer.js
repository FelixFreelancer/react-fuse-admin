import * as Actions from '../actions';

const initialState = {
  isLoading: true,
  patient: null,
  contactLens: [],
  distanceVision: {},
  nearVision: {},
  chart: {
    _id: null,
    exam: {},
    test: {},
    ap: {}
  },
  charts: []
};

const chartReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_CHART_LIST:
      return {
        ...state,
        charts: action.data,
        isLoading: false
      };
    case Actions.CREATED_CHART:
      return {
        ...state,
        charts: [...state.charts, action.data],
        isLoading: false
      };

    default:
      return {
        ...state
      };
  }
};
export default chartReducer;
