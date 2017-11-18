import { PlayerActionConstants } from '../actions/PlayerAction';
import Utils from '../utils/Utils';
import musics from '../utils/MusicData';

const initState = {
    play: false, // 是否正在播放音乐，默认不播放
    slideOpen: false, // 侧边栏默认关闭
    musics, // 播放列表
    musicId: musics[0].id, // 当前播放的音乐id
    playProgress: 0, // 当前播放进度
    volumeProgress: 0.3, // 当前音量
    mode: 'repeat', // 播放模式，默认 下一曲
    mute: false, // 是否静音，默认不静音
    duration: 0 // 歌曲长度，默认 0
};

const PlayerReducer = (state = initState, action) => {
    switch (action.type) {
        case PlayerActionConstants.TOGGLE_MUSIC_LIST:
            return Object.assign({}, state, { slideOpen: !state.slideOpen });
        case PlayerActionConstants.PLAY_SPECIAL_MUSIC:
            return Object.assign({}, state, { musicId: action.musicId });
        case PlayerActionConstants.CHANGE_PLAY_PROGRESS:
            return Object.assign({}, state, { playProgress: action.playProgress });
        case PlayerActionConstants.CHANGE_VOLUME_PROGRESS:
            return Object.assign({}, state, { mute: false, volumeProgress: action.volumeProgress });
        case PlayerActionConstants.PLAY_MUSIC:
        case PlayerActionConstants.PAUSE_MUSIC:
            return Object.assign({}, state, { play: !state.play });
        case PlayerActionConstants.CHANGE_PLAY_MODE: {
            let mode = state.mode;
            if (mode === 'repeat') {
                mode = 'random';
            } else if (mode === 'random') {
                mode = 'lock';
            } else {
                mode = 'repeat';
            }
            return Object.assign({}, state, { mode });
        }
        case PlayerActionConstants.TOGGLE_MUTE:
            return Object.assign({}, state, { mute: !state.mute });
        case PlayerActionConstants.PLAY_PRE_MUSIC: {
            const mode = state.mode;
            let musicId = state.musicId;
            if (mode === 'repeat') {
                musicId = Utils.last(state.musicId, state.musics);
            } else if (mode === 'random') {
                musicId = Utils.random(state.musicId, state.musics);
            }
            return Object.assign({}, state, { musicId, playProgress: 0, play: true });
        }
        case PlayerActionConstants.PLAY_NEXT_MUSIC: {
            const mode = state.mode;
            let musicId = state.musicId;
            if (mode === 'repeat') {
                musicId = Utils.next(state.musicId, state.musics);
            } else if (mode === 'random') {
                musicId = Utils.random(state.musicId, state.musics);
            }
            return Object.assign({}, state, { musicId, playProgress: 0, play: true });
        }
        case PlayerActionConstants.INIT_MUSIC_DURATION:
            return Object.assign({}, state, { duration: action.duration });
        default:
            return state;
    }
};

export default PlayerReducer;
