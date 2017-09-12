import { ActionConstants } from '../actions/GlobalAction';

const initState = { theme: 'day' };

const GlobalReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionConstants.TOGGLE_THEME:
            return Object.assign({}, state, { theme: action.theme });
        default:
            return state;
    }
};

export default GlobalReducer;
