import { NetMusicActionTypes } from '../action/NetMusicAction';

const initState = {
    loading: false,
    total: 0,
    songs: [],
    receivedAt: 0,
    error: null
};

const NetMusicReducer = (state = initState, action) => {
    switch (action.type) {
        case NetMusicActionTypes.SEARCH:
            return Object.assign({}, state, { loading: true });
        case NetMusicActionTypes.SEARCH_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                songs: action.songs,
                total: action.total,
                receivedAt: new Date().getTime(),
                error: null
            });
        case NetMusicActionTypes.SEARCH_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: action.error
            });
        default:
            return state;
    }
};

export default NetMusicReducer;
