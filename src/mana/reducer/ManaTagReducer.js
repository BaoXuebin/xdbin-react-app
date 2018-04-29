import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';

const initState = {
    loading: false,
    error: null
};

const TagBlogReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default combineReducers({
    auth: AuthReducer,
    tag: TagBlogReducer
});
