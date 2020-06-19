import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated:null,
    loading: false,
    is_staff: false,
};
export default function(state, action){
 
    if(state === undefined) {
        state = initialState;
    }
    const {type, payload} = action;

    switch(type){
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.access);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                token: payload.access,
                is_staff: payload.is_staff
            }
        case SIGNUP_SUCCESS: 
            return {
                ...state,
                isAuthenticated: false,
                loading:true
            }
        // case SIGNUP_FAIL:   
        // case LOGIN_FAIL:
        case LOGOUT:
            
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated:false,
                loading:false
            }
        default:
            return state;
    }
}