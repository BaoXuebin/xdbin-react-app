import { StarActionTypes } from '../action/StarAction';

const initState = {
    page: 1,
    loading: false,
    more: false,
    blogs: [],
    error: null
};

const StarReducer = (state = initState, action) => {
    switch (action.type) {
        case StarActionTypes.FETCH_STAR_BLOG:
            return Object.assign({}, state, { loading: true });
        case StarActionTypes.FETCH_STAR_BLOG_SUCCESS: {
            const { blogs, more } = action;
            return Object.assign({}, state, {
                loading: false,
                more,
                blogs: state.blogs.concat(blogs),
                page: state.page + 1
            });
        }
        case StarActionTypes.FETCH_STAR_BLOG_ERROR:
            return Object.assign({}, state, { loading: true, error: action.error });
        default:
            return state;
    }
};

export default StarReducer;
