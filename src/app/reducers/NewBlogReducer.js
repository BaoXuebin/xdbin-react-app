import { ActionConstants } from '../actions/NewBlogAction';

const initState = {
    selectTags: [],
    ifPub: true
};

const NewBlogReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionConstants.SELECT_TAG:
            return Object.assign({}, state, {
                selectTags: [...state.selectTags, action.tag]
            });
        case ActionConstants.DELETE_TAG: {
            const tag = action.tag;
            const selectTags = state.selectTags.filter(selectTag => selectTag.id !== tag.id);
            return Object.assign({}, state, { selectTags });
        }
        default:
            return state;
    }
};

export default NewBlogReducer;
