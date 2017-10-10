import fetch from 'isomorphic-fetch';
import {
    FETCH_BLOG_URL,
    FETCH_BLOG_DETAIL_URL,
    FETCH_ALL_BLOG_URL,
    DELETE_BLOG_URL,
    TOGGLE_PUB_URL
} from '../data/Urls';
import authFetch from './AuthAction';

export const ActionConstants = {
    FETCH_BLOG: 'FETCH_BLOG',
    FETCH_BLOG_SUCCESS: 'FETCH_BLOG_SUCCESS',
    FETCH_BLOG_ERROR: 'FETCH_BLOG_ERROR',
    FETCH_BLOG_DETAIL: 'FETCH_BLOG_DETAIL',
    FETCH_BLOG_DETAIL_SUCCESS: 'FETCH_BLOG_DETAIL_SUCCESS',
    FETCH_ALL_BLOG: 'FETCH_ALL_BLOG',
    FETCH_ALL_BLOG_SUCCESS: 'FETCH_ALL_BLOG_SUCCESS',
    FETCH_ALL_BLOG_ERROR: 'FETCH_ALL_BLOG_ERROR',
    REMOVE_FETCH_ALL_BLOG_ERROR: 'REMOVE_FETCH_ALL_BLOG_ERROR',
    DELETE_BLOG_SUCCESS: 'DELETE_BLOG_SUCCESS',
    DELETE_BLOG_ERROR: 'DELETE_BLOG_ERROR',
    TOGGLE_PUB_SUCCESS: 'TOGGLE_PUB_SUCCESS',
    TOGGLE_PUB_ERROR: 'TOGGLE_PUB_ERROR'
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

function fetchAllBlog() {
    return {
        type: ActionConstants.FETCH_ALL_BLOG
    };
}

function fetchAllBlogSuccess(tableBlogs, tablePage) {
    return {
        type: ActionConstants.FETCH_ALL_BLOG_SUCCESS,
        tableBlogs,
        tablePage
    };
}

function deleteBlogSuccess(blogId) {
    return {
        type: ActionConstants.DELETE_BLOG_SUCCESS,
        blogId
    };
}

function deleteBlogError(error) {
    return {
        type: ActionConstants.DELETE_BLOG_ERROR,
        error
    };
}

function togglePubSuccess(blogId) {
    return {
        type: ActionConstants.TOGGLE_PUB_SUCCESS,
        blogId
    };
}

function togglePubError(error) {
    return {
        type: ActionConstants.TOGGLE_PUB_ERROR,
        error
    };
}

export function fetchAllBlogError(error) {
    return {
        type: ActionConstants.FETCH_ALL_BLOG_ERROR,
        error
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

export function fetchBlogDetailIfNeeded(id) {
    return (dispatch) => {
        dispatch(fetchBlogDetail());
        return fetch(`${FETCH_BLOG_DETAIL_URL}${id}`).then(response => response.json()).then(json => dispatch(fetchBlogDetailSuccess(json)));
    };
}

export function fetchAllBlogByPageIfNeeded(page, history) {
    const success = (json) => {
        if (json.code) {
            return fetchAllBlogError(json.error);
        } else if (json.length === 0) {
            return fetchAllBlogError('没有更多了');
        }
        return fetchAllBlogSuccess(json, page);
    };
    const error = () => fetchAllBlogError('请求服务器失败');
    return (dispatch) => {
        dispatch(fetchAllBlog());
        return authFetch(dispatch, `${FETCH_ALL_BLOG_URL}?page=${page}`, {
            method: 'GET'
        }, success, error, history);
    };
}

export function deleteBlogById(blogId, history) {
    const success = (json) => {
        if (json.code) {
            return deleteBlogError(json.error);
        }
        return deleteBlogSuccess(json.blogId);
    };
    const error = () => deleteBlogError('请求服务器失败');
    return dispatch => authFetch(dispatch,
        `${DELETE_BLOG_URL}?blogId=${blogId}`,
        { method: 'DELETE' },
        success, error, history
    );
}

export function removeFetchAllBlogError() {
    return {
        type: ActionConstants.REMOVE_FETCH_ALL_BLOG_ERROR
    };
}

export function updateBlogPubById(blogId, type, history) {
    const success = (json) => {
        if (json.code) {
            return togglePubError(json.error);
        }
        return togglePubSuccess(json.blogId);
    };
    const error = () => togglePubError('请求服务器失败');
    return dispatch => authFetch(dispatch,
        `${TOGGLE_PUB_URL}?blogId=${blogId}&type=${type}`,
        { method: 'PATCH' },
        success, error, history
    );
}
