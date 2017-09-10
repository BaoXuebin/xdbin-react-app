export const ActionConstants = {
    TOGGLE_THEME: 'TOGGLE_THEME'
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
