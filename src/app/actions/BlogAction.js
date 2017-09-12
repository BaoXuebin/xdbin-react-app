import fetch from 'isomorphic-fetch';
import { FETCH_BLOG_URL, FETCH_BLOG_DETAIL_URL } from '../data/Urls';

export const ActionConstants = {
    FETCH_BLOG: 'FETCH_BLOG',
    FETCH_BLOG_SUCCESS: 'FETCH_BLOG_SUCCESS',
    FETCH_BLOG_ERROR: 'FETCH_BLOG_ERROR',
    FETCH_BLOG_DETAIL_SUCCESS: 'FETCH_BLOG_DETAIL_SUCCESS'
};

function fetchBlog() {
    return {
        type: ActionConstants.FETCH_BLOG
    };
}

function fetchBlogSuccess(blogs) {
    const refreshTime = new Date().getTime();
    return {
        type: ActionConstants.FETCH_BLOG_SUCCESS,
        blogs,
        refreshTime
    };
}

export function fetchBlogIfNeeded() {
    return (dispatch, getState) => {
        const refreshTime = getState().Blog.refreshTime;
        const currentTime = new Date().getTime();
        if (!refreshTime || currentTime - refreshTime > 1000 * 60 * 5) {
            dispatch(fetchBlog(refreshTime));
            return fetch(FETCH_BLOG_URL).then(response => response.json()).then(json => dispatch(fetchBlogSuccess(json)));
        }
        return {
            type: 'NOTHING'
        };
    };
}

function fetchBlogDetailSuccess(blog) {
    return {
        type: ActionConstants.FETCH_BLOG_DETAIL_SUCCESS,
        blog
    };
}

export function fetchBlogDetailIfNeeded(id) {
    return dispatch => fetch(`${FETCH_BLOG_DETAIL_URL}${id}`).then(response => response.json()).then(json => dispatch(fetchBlogDetailSuccess(json)));
}
