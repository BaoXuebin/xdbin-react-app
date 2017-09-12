import { ActionConstants } from '../actions/TagAction';

const initState = {
    tags: [
        {
            tagId: 1,
            tagName: 'Atom'
        },
        {
            tagId: 2,
            tagName: 'Sublime'
        },
        {
            tagId: 3,
            tagName: 'Java'
        },
        {
            tagId: 4,
            tagName: 'ReactJs'
        }
    ]
};

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
