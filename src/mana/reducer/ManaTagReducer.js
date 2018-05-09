import { ManaTagActionTypes } from '../action/ManaTagAction';

const initState = {
    tags: null,
    loading: false,
    error: null,
    modal: false
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
        case ManaTagActionTypes.SHOW_DEL_MODAL:
            return Object.assign({}, state, { modal: true, delTagId: action.tagId });
        case ManaTagActionTypes.HIDE_DEL_MODAL:
            return Object.assign({}, state, { modal: false });
        case ManaTagActionTypes.DEL_TAG_SUCCESS:
            return Object.assign({}, state, { tags: state.tags.filter(t => t.tagId !== action.tagId) });
        default:
            return state;
    }
};

export default TagBlogReducer;
