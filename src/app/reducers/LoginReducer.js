import { ActionConstants } from '../actions/LoginAction';

const initState = {
    loading: false,
    error: null
};

const LoginReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionConstants.LOGIN:
            return Object.assign({}, state, { loading: action.loading });
        case ActionConstants.LOGIN_SUCCESS:
            return Object.assign({}, state, { loading: action.loading });
        case ActionConstants.LOGIN_ERROR:
            return Object.assign({}, state, { loading: action.loading, error: action.error });
        case ActionConstants.REMOVE_ERROR:
            return Object.assign({}, state, { error: action.error });
        default:
            return state;
    }
};

export default LoginReducer;
