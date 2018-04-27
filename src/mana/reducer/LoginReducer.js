import { LoginActionTypes } from '../action/LoginAction';

const initState = {
    loading: false,
    error: null
};

const LoginReducer = (state = initState, action) => {
    switch (action.type) {
        case LoginActionTypes.LOGIN:
            return Object.assign({}, state, { error: null, loading: true });
        case LoginActionTypes.LOGIN_ERROR:
            return Object.assign({}, state, { error: action.error, loading: false });
        case LoginActionTypes.CLEAR_LOGIN_ERROR:
            return Object.assign({}, state, { error: null });
        default:
            return state;
    }
};

export default LoginReducer;
