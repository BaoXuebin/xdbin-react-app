import fetch from 'isomorphic-fetch';
import { LOGIN_URL } from '../data/Urls';

export const ActionConstants = {
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    REMOVE_ERROR: 'REMOVE_ERROR'
};

function login() {
    return {
        type: ActionConstants.LOGIN,
        loading: true
    };
}

function loginSuccess(user) {
    return {
        type: ActionConstants.LOGIN_SUCCESS,
        user,
        loading: false
    };
}

export function loginError(error) {
    return {
        type: ActionConstants.LOGIN_ERROR,
        error,
        loading: false
    };
}

export function loginIfNeeded(loginBean) {
    return (dispatch) => {
        dispatch(login());
        return fetch(LOGIN_URL, {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(loginBean)
        })
            .then(response => response.json())
            .then((json) => {
                if (json.code) {
                    dispatch(loginError(json.error));
                } else {
                    dispatch(loginSuccess(json));
                }
            })
            .catch(() => dispatch(loginError('网络异常或者未知错误')));
    };
}

export function removeError() {
    return {
        type: ActionConstants.REMOVE_ERROR,
        error: null
    };
}
