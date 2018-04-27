import { combineReducers } from 'redux';
import { TagActionTypes } from '../action/TagAction';

const initState = {
    more: false,
    blogs: [],
    page: 1, // 第一页由服务端渲染
    receivedAt: 0,
    loading: false,
    error: null
};

const TagReducer = (state = initState, action) => {
    switch (action.type) {
        case TagActionTypes.INIT_TAG_BLOG:
            return Object.assign({}, state, { blogs: action.blogs, more: action.blogs.length >= 10 });
        case TagActionTypes.FETCH_BLOGS_BY_TAG:
            return Object.assign({}, state, { loading: true });
        case TagActionTypes.FETCH_BLOGS_BY_TAG_SUCCESS: {
            const { page, blogs } = action;
            return Object.assign({}, state, {
                loading: false,
                blogs: state.blogs.concat(blogs),
                more: blogs.length >= 10,
                page,
                receivedAt: new Date().getTime()
            });
        }
        case TagActionTypes.FETCH_BLOGS_BY_TAG_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};

export default combineReducers({
    tag: TagReducer
});
