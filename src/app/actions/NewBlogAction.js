export const ActionConstants = {
    SELECT_TAG: 'SELECT_TAG',
    DELETE_TAG: 'DELETE_TAG'
};

export function selectTag(tag) {
    return {
        type: ActionConstants.SELECT_TAG,
        tag
    };
}

export function deleteTag(tag) {
    return {
        type: ActionConstants.DELETE_TAG,
        tag
    };
}
