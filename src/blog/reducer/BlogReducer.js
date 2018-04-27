import { combineReducers } from 'redux';
import { BlogActionTypes } from '../action/BlogAction';
import SearchReducer from './SearchReducer';

const initState = {
    more: false,
    blogs: [],
    page: 1, // 第一页由服务端渲染
    receivedAt: 0,
    loading: false,
    error: null,
    detail: null,
    detailReceivedAt: 0
};

const BlogReducer = (state = initState, action) => {
    switch (action.type) {
        case BlogActionTypes.INIT_BLOG:
            return Object.assign({}, state, { blogs: action.blogs, more: action.blogs.length >= 10 });
        case BlogActionTypes.FETCH_BLOG_LIST:
        case BlogActionTypes.FETCH_BLOG_DETAIL:
            return Object.assign({}, state, { loading: true });
        case BlogActionTypes.FETCH_BLOG_LIST_SUCCESS: {
            const { page, blogs } = action;
            return Object.assign({}, state, {
                loading: false,
                more: action.blogs.length >= 10,
                blogs: action.append ? state.blogs.concat(blogs) : blogs,
                page,
                receivedAt: new Date().getTime()
            });
        }
        case BlogActionTypes.FETCH_BLOG_LIST_ERROR:
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
