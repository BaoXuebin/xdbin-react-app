import { combineReducers } from 'redux';

const initState = {};

const TagReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default combineReducers({
    tag: TagReducer
});
