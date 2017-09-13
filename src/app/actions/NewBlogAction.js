import { SUBMIT_BLOG_URL } from '../data/Urls';

export const ActionConstants = {
    SELECT_TAG: 'SELECT_TAG',
    DELETE_TAG: 'DELETE_TAG',
    TOGGLE_PUB: 'TOGGLE_PUB',
    VALIDATE_ERROR: 'VALIDATE_ERROR',
    REMOVE_ERROR: 'REMOVE_ERROR',
    SUBMIT_BLOG: 'SUBMIT_BLOG',
    SUBMIT_BLOG_SUCCESS: 'SUBMIT_BLOG_SUCCESS'
};

export function selectTag(tag) {
    return {
        type: ActionConstants.SELECT_TAG,
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

export function submitBlogIfNeeded(blog) {
    return (dispatch) => {
        dispatch(submitBlog);
        return fetch(SUBMIT_BLOG_URL, {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(blog)
        }).then(response => response.json()).then(json => dispatch(submitBlogSuccess(json)));
    };
}
