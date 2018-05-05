import Collections from '../../utils/Collections';
import { addTagReq } from '../util/ManaReq';

export const ManaTagActionTypes = {
    ADD_TAG: 'ADD_TAG',
    ADD_TAG_SUCCESS: 'ADD_TAG_SUCCESS',
    ADD_TAG_ERROR: 'ADD_TAG_ERROR',
    DEL_TAG_SUCCESS: 'DEL_TAG_SUCCESS',
    CLEAR_TAG_ERROR: 'CLEAR_TAG_ERROR',
    INIT_TAGS: 'INIT_TAGS'
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
