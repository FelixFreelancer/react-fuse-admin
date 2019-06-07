import * as Actions from '../actions';

const initialState = {
    success: false,
    token: localStorage.getItem('jwt_access_token') ? localStorage.getItem('jwt_access_token') : null,
    userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null,
    refresh_token: localStorage.getItem('refresh_token') ? localStorage.getItem('refresh_token') : null,
    error: {
        username: null,
        password: null
    }
};

const login = function (state = initialState, action) {
    switch (action.type) {
        case Actions.LOGIN_SUCCESS:
            {
                console.info("Login Success ===>", action);
                //console.log(action.data.data.user)
                let data = {
                    success: true,
                    refreshToken: action.data.data.refreshToken,
                    token: action.data.data.token,
                    userData: action.data.data.user,
                    doctorId: action.data.data.doctorId
                }
                return {
                    ...initialState,
                    ...data
                };
            }
        case Actions.LOGIN_ERROR:
            {
                return {
                    success: false,
                    error: action.payload
                };
            }
        default:
            {
               // console.info("[login.reducer.js] Default ====>", state)
                return state
            }
    }
};

export default login;