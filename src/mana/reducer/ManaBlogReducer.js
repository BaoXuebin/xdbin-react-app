import { combineReducers } from 'redux';

import { ManaBlogActionTypes } from '../action/ManaBlogAction';
import AuthReducer from './AuthReducer';

const initState = {
    loading: false,
    error: null,
    blogs: [],
    total: 0, // 全部页数
    current: 0 // 当前页数
};

const ManaBlogReducer = (state = initState, action) => {
    switch (action.type) {
        case ManaBlogActionTypes.FETCH_ALL_BLOG:
            return Object.assign({}, state, { loading: true });
        case ManaBlogActionTypes.FETCH_ALL_BLOG_SUCCESS: {
            console.log(action);
            
            const { blogs, total, current } = action;
            return Object.assign({}, state, {
                loading: false,
                blogs,
                total,
                current
            });
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
