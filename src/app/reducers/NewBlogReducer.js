import { ActionConstants } from '../actions/NewBlogAction';

const initState = {
    selectTags: [],
    ifPub: true,
    errors: []
};

const NewBlogReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionConstants.SELECT_TAG:
            return Object.assign({}, state, {
                selectTags: [...state.selectTags, action.tag]
            });
        case ActionConstants.REMOVE_TAG: {
            const tag = action.tag;
            const selectTags = state.selectTags.filter(selectTag => selectTag.tagId !== tag.tagId);
            return Object.assign({}, state, { selectTags });
        }
        case ActionConstants.TOGGLE_PUB:
            return Object.assign({}, state, { ifPub: action.ifPub });
        case ActionConstants.VALIDATE_ERROR:
            return Object.assign({}, state, { errors: action.errors });
        case ActionConstants.REMOVE_ERROR: {
            const errors = state.errors.filter(e => e && (e.errorKey !== action.errorKey));
            return Object.assign({}, state, { errors });
        }
        case ActionConstants.SUBMIT_BLOG:
            return Object.assign({}, state, { loading: true });
        case ActionConstants.SUBMIT_BLOG_SUCCESS:
            return Object.assign({}, state, { loading: false });
        default:
            return state;
    }
};

export default NewBlogReducer;
