import { href } from '../../utils/Req';
import { loginReq } from '../util/ManaReq';

export const LoginActionTypes = {
    LOGIN: 'LOGIN',
    LOGIN_ERROR: 'LOGIN_ERROR',
    CLEAR_LOGIN_ERROR: 'CLEAR_LOGIN_ERROR'
};

const login = () => ({
    type: LoginActionTypes.LOGIN
});

export const loginError = error => ({
    type: LoginActionTypes.LOGIN_ERROR,
    error
});

export const clearError = () => ({
    type: LoginActionTypes.CLEAR_LOGIN_ERROR
});

export const loginIfNeeded = (username, password) => (dispatch, getState) => {
    const { loading } = getState();
    if (loading) {
        return dispatch(loginError('登录中，请稍后再试'));
    }
    dispatch(login());
    return loginReq(username, password)
        .then(() => { href('/mana'); })
        .catch(error => dispatch(loginError(error)));
};

