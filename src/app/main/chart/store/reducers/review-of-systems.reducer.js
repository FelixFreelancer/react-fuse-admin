import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
  // patientId: null,
  reviews: []
};

const rosReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.ADD_ROS:
      return {
        ...state,
        // patientId: action.patientId,
        reviews: [...state.reviews, action.newReviews]
      };
    case Actions.GET_ROS:
      return {
        ...state,
        // patientId: action.patientId,
        reviews: action.reviews
      };
    case Actions.DELETE_ROS:
      state.reviews = state.reviews.filter(
        review => review._id != action.deletedId
      );
      return {
        ...state
      };
    case Actions.RESET_ROS:
      return initialState;
    default:
      return {
        ...state
      };
  }
};
export default rosReducer;
