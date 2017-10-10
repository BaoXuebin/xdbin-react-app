import { ActionConstants } from '../actions/TagAction';

const initState = {
    tags: [],
    error: null
};

const TagReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionConstants.FETCH_TAG:
            return Object.assign({}, state, { loading: true });
        case ActionConstants.FETCH_TAG_SUCCESS:
            return Object.assign({}, state, { loading: false, tags: action.tags });
        case ActionConstants.FETCH_TAG_ERROR:
            return Object.assign({}, state, { loading: false });
        case ActionConstants.ADD_TAG_SUCCESS: {
            const tags = [...state.tags, action.tag];
            return Object.assign({}, state, { tags });
        }
        case ActionConstants.ADD_TAG_ERROR:
            return Object.assign({}, state, { error: action.error });
        case ActionConstants.REMOVE_ERROR:
            return Object.assign({}, state, { error: null });
        case ActionConstants.DELETE_TAG_SUCCESS: {
            const tags = state.tags.filter(t => t.tagId !== action.tag.tagId);
            return Object.assign({}, state, { tags });
        }
        case ActionConstants.DELETE_TAG_ERROR:
            return Object.assign({}, state, { error: action.error });
        default:
            return state;
    }
};

export default TagReducer;
