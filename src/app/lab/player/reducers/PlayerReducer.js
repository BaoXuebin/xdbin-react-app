import { PlayerActionConstants } from '../actions/PlayerAction';

const musics = [
    {
        id: '1',
        song: '山阴路的夏天',
        singer: '李志'
    },
    {
        id: '2',
        song: '梵高先生',
        singer: '李志'
    }
];
const initState = {
    play: false, // 是否正在播放音乐，默认不播放
    slideOpen: false, // 侧边栏默认关闭
    musics, // 播放列表
    musicId: musics[0].id, // 当前播放的音乐id
    playProgress: 0, // 当前播放进度
    volumeProgress: 0.3 // 当前音量
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
            return Object.assign({}, state, { volumeProgress: action.volumeProgress });
        case PlayerActionConstants.PLAY_MUSIC:
        case PlayerActionConstants.PAUSE_MUSIC:
            return Object.assign({}, state, { play: !state.play });
        default:
            return state;
    }
};

export default PlayerReducer;
