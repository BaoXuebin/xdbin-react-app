import { ActionConstants } from '../actions/BlogAction';

const initState = {
    blogs: [],
    loading: false,
    page: 1,
    more: true
};

const BlogReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionConstants.FETCH_BLOG:
            return Object.assign({}, state, { loading: true });
        case ActionConstants.FETCH_BLOG_SUCCESS: {
            const blogs = [...state.blogs, ...action.blogs];
            return Object.assign({}, state, {
                loading: false,
                blogs,
                page: state.page + 1,
                refreshTime: new Date().getTime(),
                more: action.more
            });
        }
        case ActionConstants.FETCH_BLOG_DETAIL:
            return Object.assign({}, state, { loading: true });
        case ActionConstants.FETCH_BLOG_DETAIL_SUCCESS:
            return Object.assign({}, state, { detail: action.blog, loading: false });
        default:
            return state;
    }
};

export default BlogReducer;
