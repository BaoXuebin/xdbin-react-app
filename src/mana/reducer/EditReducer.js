import { EditActionTypes } from '../action/EditAction';

const initState = {
    tags: [],
    blog: null,
    loading: false,
    error: null,
    editable: false
};

const EditReducer = (state = initState, action) => {
    switch (action.type) {
        case EditActionTypes.INIT_TAGS: {
            const tagIds = state.blog ? state.blog.tags.map(t => t.tagId) : [];
            return Object.assign({}, state, { tags: action.tags.filter(t => tagIds.indexOf(t.tagId) < 0) });
        }
        case EditActionTypes.INIT_EDIT_BLOG:
            return Object.assign({}, state, { blog: action.blog });
        case EditActionTypes.SAVE_BLOG:
            return Object.assign({}, state, { loading: true, error: null });
        case EditActionTypes.SAVE_BLOG_SUCCESS:
            return Object.assign({}, state, { loading: false, blog: action.blog });
        case EditActionTypes.SAVE_BLOG_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        case EditActionTypes.CLEAR_EDIT_ERROR:
            return Object.assign({}, state, { error: null });
        case EditActionTypes.DEL_BLOG_TAG: {
            const blog = Object.assign({}, state.blog, { tags: state.blog.tags.filter(t => t.tagId !== action.tagId) });
            const tags = state.tags.concat(state.blog.tags.filter(t => t.tagId === action.tagId));
            return Object.assign({}, state, { blog, tags });
        }
        case EditActionTypes.ADD_BLOG_TAG: {
            const tags = state.tags.filter(t => t.tagId !== action.tagId);
            const originTags = state.blog ? state.blog.tags : [];
            const blog = Object.assign({}, state.blog, { tags: originTags.concat(state.tags.filter(t => t.tagId === action.tagId)) });
            return Object.assign({}, state, { blog, tags });
        }
        case EditActionTypes.TOGGLE_IFPUB: {
            const blog = Object.assign({}, state.blog, { ifPub: !state.blog.ifPub });
            return Object.assign({}, state, { blog });
        }
        default:
            return state;
    }
};

export default EditReducer;
