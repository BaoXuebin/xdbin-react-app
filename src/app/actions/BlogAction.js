import fetch from 'isomorphic-fetch';
import { FETCH_BLOG_URL, FETCH_BLOG_DETAIL_URL } from '../data/Urls';

export const ActionConstants = {
    FETCH_BLOG: 'FETCH_BLOG',
    FETCH_BLOG_SUCCESS: 'FETCH_BLOG_SUCCESS',
    FETCH_BLOG_ERROR: 'FETCH_BLOG_ERROR',
    FETCH_BLOG_DETAIL: 'FETCH_BLOG_DETAIL',
    FETCH_BLOG_DETAIL_SUCCESS: 'FETCH_BLOG_DETAIL_SUCCESS'
};

function fetchBlog() {
    return {
        type: ActionConstants.FETCH_BLOG
    };
}

function fetchBlogSuccess(blogs) {
    let more = true;
    if (blogs.length < 10) {
        more = false;
    }
    return {
        type: ActionConstants.FETCH_BLOG_SUCCESS,
        blogs,
        more
    };
}

export function fetchBlogIfNeeded(force) {
    return (dispatch, getState) => {
        const page = getState().Blog.page || 1;
        const refreshTime = getState().Blog.refreshTime;
        const currentTime = new Date().getTime();
        if (force || !refreshTime || currentTime - refreshTime > 1000 * 60 * 5) {
            dispatch(fetchBlog(refreshTime));
            return fetch(`${FETCH_BLOG_URL}?page=${page}`).then(response => response.json()).then(json => dispatch(fetchBlogSuccess(json)));
        }
        return {
            type: 'NOTHING'
        };
    };
}

export function fetchMoreBlogIfNeeded() {
    return (dispatch, getState) => {
        const page = getState().Blog.page || 1;
        return fetch(`${FETCH_BLOG_URL}?page=${page}`).then(response => response.json()).then(json => dispatch(fetchBlogSuccess(json)));
    };
}

function fetchBlogDetail() {
    return {
        type: ActionConstants.FETCH_BLOG_DETAIL
    };
}

function fetchBlogDetailSuccess(blog) {
    return {
        type: ActionConstants.FETCH_BLOG_DETAIL_SUCCESS,
        blog
    };
}

export function fetchBlogDetailIfNeeded(id) {
    return (dispatch) => {
        dispatch(fetchBlogDetail());
        return fetch(`${FETCH_BLOG_DETAIL_URL}${id}`).then(response => response.json()).then(json => dispatch(fetchBlogDetailSuccess(json)));
    };
}
