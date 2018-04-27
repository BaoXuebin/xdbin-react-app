export const SearchActionTypes = {
    TOGGLE_SEARCH_BAR: 'TOGGLE_SEARCH_BAR',
    CHANGE_SEARCH_KEYWORD: 'CHANGE_SEARCH_KEYWORD',
    SET_SEARCH_KEYWORD: 'SET_SEARCH_KEYWORD'
};

export const toggleSearchBar = () => ({
    type: SearchActionTypes.TOGGLE_SEARCH_BAR
});

export const changeKeyword = keyword => ({
    type: SearchActionTypes.CHANGE_SEARCH_KEYWORD,
    keyword
});

export const setKeyword = keyword => ({
    type: SearchActionTypes.SET_SEARCH_KEYWORD,
    keyword
});
