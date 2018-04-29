import { AuthActionTypes } from '../action/AuthAction';

const initState = {
    user: null
};

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case AuthActionTypes.INIT_USER:
            return Object.assign({}, state, { user: action.user });
        default:
            return state;
    }
};

export default AuthReducer;
