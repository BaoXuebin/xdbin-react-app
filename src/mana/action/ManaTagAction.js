import Collections from '../../utils/Collections';
import { addTagReq, delTagReq } from '../util/ManaReq';

export const ManaTagActionTypes = {
    ADD_TAG: 'ADD_TAG',
    ADD_TAG_SUCCESS: 'ADD_TAG_SUCCESS',
    ADD_TAG_ERROR: 'ADD_TAG_ERROR',
    DEL_TAG_SUCCESS: 'DEL_TAG_SUCCESS',
    CLEAR_TAG_ERROR: 'CLEAR_TAG_ERROR',
    INIT_TAGS: 'INIT_TAGS',
    SHOW_DEL_MODAL: 'SHOW_DEL_MODAL',
    HIDE_DEL_MODAL: 'HIDE_DEL_MODAL'
};

const addTag = () => ({
    type: ManaTagActionTypes.ADD_TAG
});

const addTagSuccess = tag => ({
    type: ManaTagActionTypes.ADD_TAG_SUCCESS,
    tag
});

const addTagError = error => ({
    type: ManaTagActionTypes.ADD_TAG_ERROR,
    error
});

export const addTagIfNeeded = tag => (dispatch, getState) => {
    const { tags } = getState().tag;
    if (Collections.indexOf(tags, t => t === tag) >= 0) {
        return dispatch(addTagError(`${tag} 标签已经存在`));
    }
    dispatch(addTag());
    return addTagReq(tag)
        .then((result) => { dispatch(addTagSuccess(result)); }) // { tagId: 1, tagName: '11' }
        .catch((error) => { dispatch(addTagError(error)); });
};

export const initTags = tags => ({
    type: ManaTagActionTypes.INIT_TAGS,
    tags
});

export const clearError = () => ({
    type: ManaTagActionTypes.CLEAR_TAG_ERROR
});

export const showDelModal = tagId => ({
    type: ManaTagActionTypes.SHOW_DEL_MODAL,
    tagId
});

export const hideDelModal = () => ({
    type: ManaTagActionTypes.HIDE_DEL_MODAL
});

const delTagSuccess = tagId => ({
    type: ManaTagActionTypes.DEL_TAG_SUCCESS,
    tagId
});

export const delTagIfNeeded = tagId =>
    dispatch => delTagReq(tagId)
        .then((result) => {
            dispatch(delTagSuccess(result.tagId));
            dispatch(hideDelModal());
        })
        .catch((error) => { console.error(error); });
