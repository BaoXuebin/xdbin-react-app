import { ActionConstants } from '../actions/BlogAction';

const initState = {
    blogs: [],
    loading: false,
    page: 1,
    more: true,
    manager: {
        page: 1,
        blogs: [],
        loading: false,
        error: null
    }
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
        case ActionConstants.FETCH_ALL_BLOG:
            return Object.assign({}, state, { manager: Object.assign({}, state.manager, { loading: true }) });
        case ActionConstants.FETCH_ALL_BLOG_SUCCESS:
            return Object.assign({}, state, { manager: Object.assign({}, state.manager, {
                loading: false,
                page: action.tablePage,
                blogs: action.tableBlogs
            }) });
        case ActionConstants.FETCH_ALL_BLOG_ERROR:
            return Object.assign({}, state, { manager: Object.assign({}, state.manager, {
                loading: false,
                error: action.error
            }) });
        case ActionConstants.REMOVE_FETCH_ALL_BLOG_ERROR:
            return Object.assign({}, state, { manager: Object.assign({}, state.manager, {
                error: null
            }) });
        case ActionConstants.DELETE_BLOG_SUCCESS: {
            const blogs = state.manager.blogs.filter(b => b.blogId !== action.blogId);
            return Object.assign({}, state, { manager: Object.assign({}, state.manager, {
                blogs
            }) });
        }
        case ActionConstants.TOGGLE_PUB_SUCCESS: {
            const blogs = state.manager.blogs.map((b) => {
                const tempB = b;
                if (tempB.blogId === action.blogId) {
                    tempB.pub = !tempB.pub;
                }
                return tempB;
            });
            return Object.assign({}, state, { manager: Object.assign({}, state.manager, {
                blogs
            }) });
        }
        case ActionConstants.DELETE_BLOG_ERROR:
        case ActionConstants.TOGGLE_PUB_ERROR:
            return Object.assign({}, state, { manager: Object.assign({}, state.manager, {
                error: action.error
            }) });
        default:
            return state;
    }
};

export default BlogReducer;
