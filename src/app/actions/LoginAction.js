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

export function loginIfNeeded(name, pwd) {
    return (dispatch) => {
        dispatch(login());
        setTimeout(() => {
            if (pwd === name) {
                dispatch(loginSuccess({
                    userId: 'baoxuebin',
                    username: name,
                    token: `${name}${pwd}`
                }));
            } else {
                dispatch(loginError('用户名密码不匹配'));
            }
        }, 3000);
    };
}

export function removeError() {
    return {
        type: ActionConstants.REMOVE_ERROR,
        error: null
    };
}
