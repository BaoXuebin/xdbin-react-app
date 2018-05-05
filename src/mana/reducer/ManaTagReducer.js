import { combineReducers } from 'redux';

import { ManaTagActionTypes } from '../action/ManaTagAction';
import AuthReducer from './AuthReducer';

const initState = {
    tags: null,
    loading: false,
    error: null
};

const TagBlogReducer = (state = initState, action) => {
    switch (action.type) {
        case ManaTagActionTypes.INIT_TAGS:
            return Object.assign({}, state, { tags: action.tags });
        case ManaTagActionTypes.ADD_TAG:
            return Object.assign({}, state, { loading: true, error: null });
        case ManaTagActionTypes.ADD_TAG_SUCCESS:
            return Object.assign({}, state, { tags: [...state.tags, action.tag] });
        case ManaTagActionTypes.ADD_TAG_ERROR:
            return Object.assign({}, state, { error: action.error });
        case ManaTagActionTypes.CLEAR_TAG_ERROR:
            return Object.assign({}, state, { error: null });
        default:
            return state;
    }
};

export default combineReducers({
    auth: AuthReducer,
    tag: TagBlogReducer
});
