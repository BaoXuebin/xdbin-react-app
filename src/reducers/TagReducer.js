import { ActionConstants } from '../actions/TagAction';

const initState = {};

const TagReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionConstants.FETCH_TAG:
            return Object.assign({}, state, { loading: true });
        case ActionConstants.FETCH_TAG_SUCCESS:
            return Object.assign({}, state, { loading: false, tags: action.tags });
        case ActionConstants.FETCH_TAG_ERROR:
            return Object.assign({}, state, { loading: false });
        default:
            return state;
    }
};

export default TagReducer;
