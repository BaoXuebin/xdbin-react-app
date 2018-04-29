import { combineReducers } from 'redux';

import { ManaBlogActionTypes } from '../action/ManaBlogAction';
import AuthReducer from './AuthReducer';

const initState = {
    loading: false,
    error: null,
    blogs: [],
    total: 0
};

const ManaBlogReducer = (state = initState, action) => {
    switch (action.type) {
        case ManaBlogActionTypes.FETCH_ALL_BLOG:
            return Object.assign({}, state, { loading: true });
        case ManaBlogActionTypes.FETCH_ALL_BLOG_SUCCESS: {
            const { blogs, total } = action;
            return Object.assign({}, state, { loading: false, blogs, total });
        }
        case ManaBlogActionTypes.FETCH_ALL_BLOG_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};

export default combineReducers({
    auth: AuthReducer,
    blog: ManaBlogReducer
});
