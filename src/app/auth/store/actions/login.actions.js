import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import { setUserData } from './user.actions';
import * as Actions from 'app/store/actions';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

/**
 * Submits the Login data and sets the user tokens
 * @param {string} email
 * @param {string} password
 */
export function submitLogin({ email, password }) {
  return dispatch =>
    jwtService
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log("response of login ----->", response);
        dispatch(setUserData(response.data.user));
        dispatch(
          Actions.showMessage({
            message: response.message,
            variant: 'success',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            }
          })
        );
        return dispatch({
          type: LOGIN_SUCCESS,
          data: response
        });
      })
      .catch(error => {
        dispatch(
          Actions.showMessage({
            message: error,
            variant: 'error',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            }
          })
        );
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
}

export function submitLoginWithFireBase({ username, password }) {
  return dispatch =>
    firebaseService.auth &&
    firebaseService.auth
      .signInWithEmailAndPassword(username, password)
      .then((response) => {
        return dispatch({
          type: LOGIN_SUCCESS,
          data: response
        });
      })
      .catch(error => {
        const usernameErrorCodes = [
          'auth/email-already-in-use',
          'auth/invalid-email',
          'auth/operation-not-allowed',
          'auth/user-not-found',
          'auth/user-disabled'
        ];
        const passwordErrorCodes = [
          'auth/weak-password',
          'auth/wrong-password'
        ];

        const response = {
          username: usernameErrorCodes.includes(error.code)
            ? error.message
            : null,
          password: passwordErrorCodes.includes(error.code)
            ? error.message
            : null
        };

        if (error.code === 'auth/invalid-api-key') {
          dispatch(Actions.showMessage({ message: error.message }));
        }

        return dispatch({
          type: LOGIN_ERROR,
          payload: response
        });
      });
}
