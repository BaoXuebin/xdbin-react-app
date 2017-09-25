import { VALIDATE_TOKEN_URL } from '../data/Urls';

export const ActionConstants = {
    TOGGLE_THEME: 'TOGGLE_THEME',
    PAGE_LOADING: 'PAGE_LOADING',
    PAGE_LOAD_FINISH: 'PAGE_LOAD_FINISH',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    VALIDATE_TOKEN_SUCCESS: 'VALIDATE_TOKEN_SUCCESS',
    VALIDATE_TOKEN_ERROR: 'VALIDATE_TOKEN_ERROR'
};

export function toggleTheme(currentTheme) {
    let theme = 'day';
    if (currentTheme === 'day') {
        theme = 'night';
    }
    return {
        type: ActionConstants.TOGGLE_THEME,
        theme
    };
}

export function pageLoading() {
    return {
        type: ActionConstants.PAGE_LOADING
    };
}

export function pageLoadFinish() {
    return {
        type: ActionConstants.PAGE_LOAD_FINISH
    };
}

function validateSuccess(token) {
    return {
        type: ActionConstants.VALIDATE_TOKEN_SUCCESS,
        token
    };
}

function validateError() {
    return {
        type: ActionConstants.VALIDATE_TOKEN_ERROR
    };
}

// 验证 token 有效性
export function validate(token, history) {
    return dispatch => fetch(VALIDATE_TOKEN_URL, {
        method: 'POST',
        headers: {
            auth: token
        }
    })
        .then(response => response.json())
        .then((json) => {
            if (json.code === 401) {
                history.push('/login');
                dispatch(validateError());
            } else {
                dispatch(validateSuccess(token));
            }
        }).catch(() => dispatch(validateError()));
}
