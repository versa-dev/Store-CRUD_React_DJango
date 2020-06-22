import axios from 'axios';
import { setAlert } from './alert';
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types';

export const login = (email, password) =>async dispatch =>{  
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({
        email, password
    });
    
    try {
        const res = await axios.post('/api/token/',body,config); 
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert('Authentication successful','success'));
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(checkAuthTimeout(3600));
    } 
    catch(err){
        dispatch({
            type:LOGIN_FAIL
        });
        dispatch(setAlert('Error Authenticating','warning'));
    }
}
export const signup = (name,email,password,password2)=> async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    const body = {
        name, email, password, password2
    };
    
    try {
        const res = await axios.post('/api/accounts/signup',body,config);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
        dispatch(login(email,password));
    } 
    catch(err){  
        dispatch({
            type:SIGNUP_FAIL
        });
        dispatch(setAlert('Error Authenticating','warning'));
    }
}
export const checkAuthTimeout = expirationTime => {
    return dispatch => {
      setTimeout(() => {
        dispatch(logout());
      }, expirationTime * 1000);
    };
  };
  
export const logout = () => dispatch => {
    dispatch(setAlert('You logged out!','warning'));
    dispatch({
        type:LOGOUT
    });    
}
