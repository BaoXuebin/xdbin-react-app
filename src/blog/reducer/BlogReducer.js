import { combineReducers } from 'redux';
import { BlogActionTypes } from '../action/BlogAction';
import SearchReducer from './SearchReducer';

const initState = {
    loading: false,
    error: null,
    detail: null,
    detailReceivedAt: 0
};

const BlogReducer = (state = initState, action) => {
    switch (action.type) {
        case BlogActionTypes.FETCH_BLOG_DETAIL:
            return Object.assign({}, state, { loading: true });
        case BlogActionTypes.FETCH_BLOG_DETAIL_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        case BlogActionTypes.FETCH_BLOG_DETAIL_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                detail: action.blog,
                detailReceivedAt: new Date().getTime()
            });
        default:
            return state;
    }
};

export default combineReducers({
    search: SearchReducer,
    blog: BlogReducer
});
