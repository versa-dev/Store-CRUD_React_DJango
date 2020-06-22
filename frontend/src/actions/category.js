import { UPDATE_CATEGORY, SET_CATEGORY } from './types';

export const update_category = ( data ) =>dispatch => {
    
    dispatch({
        type: UPDATE_CATEGORY,
        payload: data
    });
}
export const set_category = (data) => dispatch => {
    dispatch({
        type: SET_CATEGORY,
        payload: data
    })
}