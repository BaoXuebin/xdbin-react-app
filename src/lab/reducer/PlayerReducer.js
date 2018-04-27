import { combineReducers } from 'redux';

import { PlayerActionTypes } from '../action/PlayerAction';
import Utils from '../utils/MusicUtil';
import musics from '../data/MusicData';
import NetMusicReducer from './NetMusicReducer';
import { get, persist, LocalStorageKeys } from '../../utils/LocalStorage';

const initMusics = JSON.parse(get(LocalStorageKeys.MUSIC_CACHE)) || musics;

const initState = {
    loading: true,
    play: false, // 是否正在播放音乐，默认不播放
    slideOpen: false, // 侧边栏默认关闭
    musics: initMusics, // 播放列表
    musicId: initMusics[0].id, // 当前播放的音乐id
    playProgress: 0, // 当前播放进度
    volumeProgress: 0.3, // 当前音量
    mode: 'repeat', // 播放模式，默认 下一曲
    mute: false, // 是否静音，默认不静音
    duration: 0, // 歌曲长度，默认 0
    listType: 'play', // 音乐列表，默认显示播放列表
    edit: false // 是否编辑列表
};

const PlayerReducer = (state = initState, action) => {
    switch (action.type) {
        case PlayerActionTypes.TOGGLE_LIST_TYPE:
            return Object.assign({}, state, { listType: action.listType });
        case PlayerActionTypes.TOGGLE_MUSIC_LIST:
            return Object.assign({}, state, { slideOpen: !state.slideOpen });
        case PlayerActionTypes.PLAY_SPECIAL_MUSIC:
            return Object.assign({}, state, { musicId: action.musicId, play: true });
        case PlayerActionTypes.CHANGE_PLAY_PROGRESS:
            return Object.assign({}, state, { playProgress: action.playProgress });
        case PlayerActionTypes.CHANGE_VOLUME_PROGRESS:
            return Object.assign({}, state, { mute: false, volumeProgress: action.volumeProgress });
        case PlayerActionTypes.PLAY_MUSIC:
        case PlayerActionTypes.PAUSE_MUSIC:
            return Object.assign({}, state, { play: !state.play });
        case PlayerActionTypes.CHANGE_PLAY_MODE: {
            let { mode } = state;
            if (mode === 'repeat') {
                mode = 'random';
            } else if (mode === 'random') {
                mode = 'lock';
            } else {
                mode = 'repeat';
            }
            return Object.assign({}, state, { mode });
        }
        case PlayerActionTypes.TOGGLE_MUTE:
            return Object.assign({}, state, { mute: !state.mute });
        case PlayerActionTypes.PLAY_PRE_MUSIC: {
            const { mode } = state;
            let { musicId } = state;
            if (mode === 'repeat') {
                musicId = Utils.last(state.musicId, state.musics);
            } else if (mode === 'random') {
                musicId = Utils.random(state.musicId, state.musics);
            }
            return Object.assign({}, state, { musicId, playProgress: 0, play: true });
        }
        case PlayerActionTypes.PLAY_NEXT_MUSIC: {
            const { mode } = state;
            let { musicId } = state;
            if (mode === 'repeat') {
                musicId = Utils.next(state.musicId, state.musics);
            } else if (mode === 'random') {
                musicId = Utils.random(state.musicId, state.musics);
            }
            return Object.assign({}, state, { musicId, playProgress: 0, play: true });
        }
        case PlayerActionTypes.INIT_MUSIC_DURATION:
            return Object.assign({}, state, { duration: action.duration });
        case PlayerActionTypes.LOAD_MUSIC:
            return Object.assign({}, state, { loading: action.loading });
        case PlayerActionTypes.REFRESH_MUSICS:
            return Object.assign({}, state, { musics: action.musics });
        case PlayerActionTypes.APPEND_PLAY_LIST: {
            const { music, play } = action;
            const isContain = state.musics.filter(m => m.id === music.id).length > 0;
            if (!isContain) {
                persist(LocalStorageKeys.MUSIC_CACHE, state.musics.concat(music));
            }
            return Object.assign({}, state, {
                musics: isContain ? state.musics : state.musics.concat(music),
                musicId: play ? music.id : state.musicId,
                play: play ? true : state.play
            });
        }
        case PlayerActionTypes.SET_MUSIC_INFO: {
            const source = Object.assign([], state.musics);
            const { id, url, cover } = action;
            const index = Utils.index(id, source);
            source[index].src = url;
            if (cover) {
                source[index].cover = cover;
            }
            persist(LocalStorageKeys.MUSIC_CACHE, source);
            return Object.assign({}, state, { musics: source });
        }
        case PlayerActionTypes.TOGGLE_IF_EDIT:
            return Object.assign({}, state, { edit: !state.edit });
        case PlayerActionTypes.REDUCE_PLAY_LIST: {
            const { id } = action;
            if (state.musics.length === 1) {
                return Object.assign({}, state, { edit: false });
            }
            const filterMusics = state.musics.filter(m => m.id !== id);
            persist(LocalStorageKeys.MUSIC_CACHE, filterMusics);
            return Object.assign({}, state, { musics: filterMusics });
        }
        default:
            return state;
    }
};

export default combineReducers({
    player: PlayerReducer,
    netMusic: NetMusicReducer
});
