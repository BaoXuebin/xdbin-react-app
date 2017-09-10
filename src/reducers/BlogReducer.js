import { ActionConstants } from '../actions/BlogAction';

const initState = {};

const BlogReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionConstants.FETCH_BLOG:
            return Object.assign({}, state, { loading: true });
        case ActionConstants.FETCH_BLOG_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                blogs: action.blogs,
                refreshTime: action.refreshTime
            });
        case ActionConstants.FETCH_BLOG_DETAIL_SUCCESS:
            return Object.assign({}, state, { detail: action.blog });
        default:
            return state;
    }
};

export default BlogReducer;
