import { SearchActionTypes } from '../action/SearchAction';

const initState = {
    show: false,
    keyword: null,
    filter: null
};

const SearchReducer = (state = initState, action) => {
    switch (action.type) {
        case SearchActionTypes.TOGGLE_SEARCH_BAR: {
            const { show } = state;
            return Object.assign({}, state, { show: !show, filter: show ? null : state.filter });
        }
        case SearchActionTypes.CHANGE_SEARCH_KEYWORD:
            return Object.assign({}, state, { keyword: action.keyword });
        case SearchActionTypes.SET_SEARCH_KEYWORD:
            return Object.assign({}, state, { filter: action.keyword });
        default:
            return state;
    }
};

export default SearchReducer;
