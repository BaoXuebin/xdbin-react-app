import { ActionConstants } from '../actions/GlobalAction';

const initState = {
    theme: 'day',
    loading: false
};

const GlobalReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionConstants.TOGGLE_THEME:
            return Object.assign({}, state, { theme: action.theme });
        case ActionConstants.PAGE_LOADING:
            return Object.assign({}, state, { loading: true });
        case ActionConstants.PAGE_LOAD_FINISH:
            return Object.assign({}, state, { loading: false });
        default:
            return state;
    }
};

export default GlobalReducer;
