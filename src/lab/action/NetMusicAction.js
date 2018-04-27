import {
    musicListReq,
    musicUrlReq
} from '../utils/NetEaseApiReq';
import {
    changeListType,
    loadMusic
} from './PlayerAction';

export const NetMusicActionTypes = {
    SEARCH: 'SEARCH',
    SEARCH_SUCCESS: 'SEARCH_SUCCESS',
    SEARCH_ERROR: 'SEARCH_ERROR',
    FETCH_MUSIC_URL: 'FETCH_MUSIC_URL',
    FETCH_MUSIC_URL_SUCCESS: 'FETCH_MUSIC_URL_SUCCESS',
    FETCH_MUSIC_URL_ERROR: 'FETCH_MUSIC_URL_ERROR'
};

// 解析歌曲数据
const parseSong = (song) => {
    if (song) {
        return {
            id: song.id,
            song: song.name,
            singer: song.artists[0].name,
            src: '',
            cover: ''
            // cover: song.album.artist.img1v1Url
        };
    }
    return {};
};

const search = () => ({
    type: NetMusicActionTypes.SEARCH
});
const searchSuccess = (songs, total) => ({
    type: NetMusicActionTypes.SEARCH_SUCCESS,
    songs,
    total
});
const searchError = error => ({
    type: NetMusicActionTypes.SEARCH_ERROR,
    error
});

export const searchIfNeeded = keyword => (dispatch, getState) => {
    const { loading } = getState().netMusic;
    if (loading) {
        return dispatch(searchError('请求中，稍后再试'));
    }
    if (!keyword) {
        return dispatch(searchError('输入关键字'));
    }
    dispatch(search());
    return musicListReq(keyword)
        .then((result) => {
            dispatch(searchSuccess(result.songs.map(song => parseSong(song))));
            dispatch(changeListType('search'));
        })
        .catch((e) => { dispatch(searchError(e)); });
};

// 获取歌曲 url
const fetchMusicUrlError = error => ({
    type: NetMusicActionTypes.FETCH_MUSIC_URL_ERROR,
    error
});
export const fetchMusicUrlIfNeeded = () => (dispatch, getState) => {
    const { loading, musicId } = getState().player;
    if (loading) {
        return dispatch(fetchMusicUrlError('请求中，稍后再试'));
    }
    if (!musicId) {
        return dispatch(fetchMusicUrlError('id 不能为空'));
    }
    dispatch(loadMusic());
    return musicUrlReq(musicId)
        .then((result) => {
            console.log(result);
        })
        .catch((e) => { dispatch(fetchMusicUrlError(e)); });
};
