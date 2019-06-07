import * as Actions from '../actions';


const initialState = {

  pageLoading: true,
  sendPaymentData: null,
  getCardList: null,
  getSingleCard: null,
  updateCardInfo: null,
  deleteCardList: null

};

const profilePageReducers = function (state = initialState, action) {
  switch (action.type) {





    case Actions.GET_CARD_LIST_BEGIN:
      return { ...state, pageLoading: true, getCardList: null, error: false };

    case Actions.GET_CARD_LIST_SUCCESS:
      console.log(' action.resp.data====> ', action.resp);
      return { ...state, pageLoading: false, getCardList: action.resp, error: false };

    case Actions.GET_CARD_LIST_FAIL:
      return { ...state, pageLoading: false, getCardList: null, error: true };



    case Actions.SEND_PAYMENT_BEGIN:
      return { ...state, pageLoading: true, sendPaymentData: null, error: false };

    case Actions.SEND_PAYMENT_SUCCESS:
      return { ...state, pageLoading: false, sendPaymentData: action.resp, error: false }

    case Actions.SEND_PAYMENT_FAIL:
      return { ...state, pageLoading: false, sendPaymentData: null, error: true };



    case Actions.GET_SINGLE_CARD_BEGIN:
      return { ...state, pageLoading: true, getSingleCard: null, error: false };

    case Actions.GET_SINGLE_CARD_SUCCESS:
      return { ...state, pageLoading: false, getSingleCard: action.resp, error: false };

    case Actions.GET_SINGLE_CARD_FAIL:
      return { ...state, pageLoading: false, getSingleCard: null, error: true };



    case Actions.UPDATE_CARD_BEGIN:
      return { ...state, pageLoading: true, updateCardInfo: null, error: false };

    case Actions.UPDATE_CARD_SUCCESS:
      console.log(' action.resp.data====> ', action.resp);
      var a = state.getCardList
      a.push(action.resp)
      console.log("a => ", a)

      return { ...state, pageLoading: false, getCardList: a, error: true }
   // return { ...state, pageLoading: false, updateCardInfo: action.resp, error: false };

    case Actions.UPDATE_CARD_FAIL:
      return { ...state, pageLoading: false, updateCardInfo: null, error: true };



    case Actions.DELETE_CARD_BEGIN:
      return { ...state, pageLoading: true, deleteCardList: null, error: false };

    case Actions.DELETE_CARD_SUCCESS:
      return { ...state, pageLoading: false, getCardList: state.getCardList.filter(v => v.id !== action.resp) }


    case Actions.DELETE_CARD_FAIL:
      return { ...state, pageLoading: false, deleteCardList: null, error: true };



    default:
      return {
        ...state
      };
  }
};
export default profilePageReducers;
