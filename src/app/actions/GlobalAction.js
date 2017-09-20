export const ActionConstants = {
    TOGGLE_THEME: 'TOGGLE_THEME',
    PAGE_LOADING: 'PAGE_LOADING',
    PAGE_LOAD_FINISH: 'PAGE_LOAD_FINISH',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS'
};

export function toggleTheme(currentTheme) {
    let theme = 'day';
    if (currentTheme === 'day') {
        theme = 'night';
    }
    return {
        type: ActionConstants.TOGGLE_THEME,
        theme
    };
}

export function pageLoading() {
    return {
        type: ActionConstants.PAGE_LOADING
    };
}

export function pageLoadFinish() {
    return {
        type: ActionConstants.PAGE_LOAD_FINISH
    };
}
