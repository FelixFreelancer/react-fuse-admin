import axiosCore from 'axios';
import { BASE_URL } from './../../fuse-configs/apiConfig';
import jwtDecode from 'jwt-decode';
import FuseUtils from '@fuse/FuseUtils';

const axios = axiosCore.create({
  baseURL: BASE_URL
  /* other custom settings */
});

class jwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
    this.isAuthTokenValid();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      err => {
        return new Promise((resolve, reject) => {
          if (
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid access_token');
            this.setSession(null);
          //  localStorage.clear();
         // this.props.history.push('../../main/auth/lock/LockPage')
           window.location.href='/lock';
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    let access_token = this.getAccessToken();
    let refresh_token = this.getRefreshToken();
    let user = this.getUserInfo();

    if (!access_token || !refresh_token) {
      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token, refresh_token, user);
      console.log('hooray');
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      localStorage.clear();
      //this.props.history.push('../../main/auth/lock/LockPage')
      window.location.href='/lock';
      this.emit('onAutoLogout', 'You have been logged out due to inactivity');
     
    }
  };

  createUser = data => {
    return new Promise((resolve, reject) => {
      axios.post('/api/auth/register', data).then(response => {
        if (response.data.user) {
          this.setSession(response.data.access_token);
          resolve(response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/user/login', {
          email,
          password
        })
        .then(response => {
          if (response.data.data.user) {
            response.data.data.user['doctorId'] = response.data.data.doctorId;
            response.data.data.user['role'] = 'admin';
            this.setSession(
              response.data.data.token,
              response.data.data.refreshToken,
              response.data.data.user
            );
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        })
        .catch(error => {
          if (error.response) {
            reject(error.response.data.message);
          } else {
            reject(error.message);
          }
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .post('/user/validate', {
          data: {
            access_token: this.getAccessToken()
          }
        })
        .then(response => {
          const user = response.data.data.user;
          if (response.data.data.user) {
            user['doctorId'] = response.data.data.doctorId;
            user['role'] = 'admin';
            this.setSession(
              response.data.data.token,
              response.data.data.refreshToken,
              response.data.data.user
            );
            resolve(user);
          } else {
            reject(response.data.error);
          }
        })
        .catch(error => {
          console.log('error', error);
          reject(error.message);
        });
    });
  };

  updateUserData = user => {
    return axios.post('/api/auth/user/update', {
      user: user
    });
  };

  setSession = (access_token, refresh_token,userData) => {
    console.log(access_token, refresh_token, userData)
    if (access_token) {
      localStorage.setItem('jwt_access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('userData', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      console.log(access_token, refresh_token);
      axios.defaults.headers.common['x-refresh-token'] = refresh_token;
    } else {
      localStorage.removeItem('jwt_access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('userData');
      delete axios.defaults.headers.common['Authorization'];
      delete axios.defaults.headers.common['x-refresh-token'];
    }
  };

  logout = () => {
    this.setSession(null);
    localStorage.clear();
  };

  isAuthTokenValid = access_token => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    console.log('decoded', decoded);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      localStorage.clear();
      //this.props.history.push('../../main/auth/lock/LockPage')
       window.location.href='/lock';
      return false;
    } else {
      return true;
    }
  };

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };

  getRefreshToken = () => {
    return window.localStorage.getItem('refresh_token');
  };
  getUserInfo = () => {
    return JSON.parse(window.localStorage.getItem('userData'));
  };
}

const instance = new jwtService();

export default instance;
