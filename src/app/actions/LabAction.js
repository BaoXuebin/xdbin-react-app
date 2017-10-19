export const ActionConstants = {
    CHANGE_VIEW_MODE: 'CHANGE_VIEW_MODE'
};

export function changeViewMode(mode) {
    return {
        type: ActionConstants.CHANGE_VIEW_MODE,
        mode
    };
}
