import fetch from 'isomorphic-fetch';
import { FETCH_TAG_URL, DELETE_TAG_URL, ADD_TAG_URL } from '../data/Urls';
import authFetch from './AuthAction';

export const ActionConstants = {
    FETCH_TAG: 'FETCH_TAG',
    FETCH_TAG_SUCCESS: 'FETCH_TAG_SUCCESS',
    FETCH_TAG_ERROR: 'FETCH_TAG_ERROR',
    ADD_TAG_SUCCESS: 'ADD_TAG_SUCCESS',
    ADD_TAG_ERROR: 'ADD_TAG_ERROR',
    DELETE_TAG_SUCCESS: 'DELETE_TAG_SUCCESS',
    REMOVE_ERROR: 'REMOVE_ERROR'
};

function fetchTag() {
    return {
        type: ActionConstants.FETCH_TAG
    };
}

function fetchTagSuccess(tags) {
    return {
        type: ActionConstants.FETCH_TAG_SUCCESS,
        tags
    };
}

function fetchTagError() {
    return {
        type: ActionConstants.FETCH_TAG_ERROR
    };
}

export function fetchTagIfNeed() {
    return (dispatch) => {
        dispatch(fetchTag());
        return fetch(FETCH_TAG_URL)
            .then(response => response.json())
            .then(json => dispatch(fetchTagSuccess(json)))
            .catch(() => {
                dispatch(fetchTagError());
            });
    };
}

function addTagSuccess(tag) {
    return {
        type: ActionConstants.ADD_TAG_SUCCESS,
        tag
    };
}

function addTagError(error) {
    return {
        type: ActionConstants.ADD_TAG_ERROR,
        error
    };
}

export function addTagIfNeed(tag, history) {
    const success = (json) => {
        if (json.code) {
            return addTagError(json.error);
        }
        return addTagSuccess(json);
    };
    const error = () => addTagError('请求服务器失败');
    return (dispatch, getState) => {
        if (!tag.tagName) {
            return dispatch(addTagError('标签不能为空'));
        }
        const tags = getState().Tag.tags;
        const isExit = tags.filter(t => t.tagName === tag.tagName).length > 0;
        if (isExit) {
            return dispatch(addTagError('标签已经存在'));
        }
        return authFetch(dispatch, ADD_TAG_URL, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tag)
        }, success, error, history);
    };
}

function deleteTagSuccess(tag) {
    return {
        type: ActionConstants.DELETE_TAG_SUCCESS,
        tag
    };
}

function deleteTagError(error) {
    return {
        type: ActionConstants.DELETE_TAG_ERROR,
        error
    };
}

export function deleteTagIfNeed(tag, history) {
    const success = (json) => {
        if (json.code) {
            return deleteTagError(json.error);
        }
        return deleteTagSuccess(json);
    };
    const error = () => addTagError('请求服务器失败');
    return dispatch => authFetch(dispatch, DELETE_TAG_URL, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tag)
    }, success, error, history);
}

// 获取焦点，移除提示的错误信息
export function removeError() {
    return {
        type: ActionConstants.REMOVE_ERROR
    };
}
