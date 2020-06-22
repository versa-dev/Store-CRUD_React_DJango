import {SET_CATEGORY, UPDATE_CATEGORY} from '../actions/types';
const initialState = {
    category_list:[],
    category_id:0
};

export default function(state = initialState,action){
    if(state === undefined) {
        state = initialState;
    }
    const {type, payload} = action;
    switch(type) {
        case SET_CATEGORY:
            return {
                ...state,
                category_id: payload
            }
        case UPDATE_CATEGORY:
            
            return {
                ...state,
                category_list:payload
            }
        default:
            return state
    }
}