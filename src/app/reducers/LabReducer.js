import { ActionConstants } from '../actions/LabAction';

const initState = {
    mode: 'plat'
};

const LabReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionConstants.CHANGE_VIEW_MODE:
            return Object.assign({}, state, { mode: action.mode });
        default:
            return state;
    }
};

export default LabReducer;
