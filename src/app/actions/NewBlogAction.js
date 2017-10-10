import { SUBMIT_BLOG_URL, FETCH_UPDATE_BLOG_URL } from '../data/Urls';
import authFetch from './AuthAction';

export const ActionConstants = {
    SELECT_TAG: 'SELECT_TAG',
    REMOVE_TAG: 'REMOVE_TAG',
    DELETE_TAG: 'DELETE_TAG',
    TOGGLE_PUB: 'TOGGLE_PUB',
    VALIDATE_ERROR: 'VALIDATE_ERROR',
    REMOVE_ERROR: 'REMOVE_ERROR',
    SUBMIT_BLOG: 'SUBMIT_BLOG',
    SUBMIT_BLOG_SUCCESS: 'SUBMIT_BLOG_SUCCESS',
    REMOVE_SUBMIT_BLOG_SUCCESS: 'REMOVE_SUBMIT_BLOG_SUCCESS',
    FETCH_UPDATE_BLOG_SUCCESS: 'FETCH_UPDATE_BLOG_SUCCESS',
    FETCH_UPDATE_BLOG_ERROR: 'FETCH_UPDATE_BLOG_ERROR'
};

export function removeSuccessLabel() {
    return {
        type: ActionConstants.REMOVE_SUBMIT_BLOG_SUCCESS
    };
}

export function selectTag(tag) {
    return {
        type: ActionConstants.SELECT_TAG,
        tag
    };
}

export function removeTag(tag) {
    return {
        type: ActionConstants.REMOVE_TAG,
        tag
    };
}

export function deleteTag(tag) {
    return {
        type: ActionConstants.DELETE_TAG,
        tag
    };
}

export function togglePub(ifPub) {
    return {
        type: ActionConstants.TOGGLE_PUB,
        ifPub
    };
}

export function validateFormError(errors) {
    return {
        type: ActionConstants.VALIDATE_ERROR,
        errors
    };
}

export function removeError(errorKey) {
    return {
        type: ActionConstants.REMOVE_ERROR,
        errorKey
    };
}

function submitBlog() {
    return {
        type: ActionConstants.SUBMIT_BLOG
    };
}

function submitBlogSuccess() {
    return {
        type: ActionConstants.SUBMIT_BLOG_SUCCESS
    };
}

function fetchUpdateBlogSuccess(blog) {
    return {
        type: ActionConstants.FETCH_UPDATE_BLOG_SUCCESS,
        blog
    };
}

function fetchUpdateBlogError() {
    return {
        type: ActionConstants.FETCH_UPDATE_BLOG_ERROR
    };
}

export function submitBlogIfNeeded(blog, history) {
    return (dispatch) => {
        dispatch(submitBlog());
        const params = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog)
        };
        const success = json => submitBlogSuccess(json);
        const error = () => {};
        return authFetch(dispatch, SUBMIT_BLOG_URL, params, success, error, history);
    };
}

export function fetchUpdateBlogByIdIfNeed(blogId, history) {
    const success = json => fetchUpdateBlogSuccess(json);
    const error = () => fetchUpdateBlogError();
    return dispatch => authFetch(dispatch,
        `${FETCH_UPDATE_BLOG_URL}/${blogId}`,
        { method: 'GET' },
        success, error, history
    );
}
