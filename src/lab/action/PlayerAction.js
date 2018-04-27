export const PlayerActionTypes = {
    TOGGLE_MUSIC_LIST: 'TOGGLE_MUSIC_LIST',
    PLAY_SPECIAL_MUSIC: 'PLAY_SPECIAL_MUSIC',
    CHANGE_PLAY_PROGRESS: 'CHANGE_PLAY_PROGRESS',
    CHANGE_VOLUME_PROGRESS: 'CHANGE_VOLUME_PROGRESS',
    PLAY_MUSIC: 'PLAY_MUSIC',
    PAUSE_MUSIC: 'PAUSE_MUSIC',
    CHANGE_PLAY_MODE: 'CHANGE_PLAY_MODE',
    TOGGLE_MUTE: 'TOGGLE_MUTE',
    PLAY_PRE_MUSIC: 'PLAY_PRE_MUSIC',
    PLAY_NEXT_MUSIC: 'PLAY_NEXT_MUSIC',
    INIT_MUSIC_DURATION: 'INIT_MUSIC_DURATION',
    LOAD_MUSIC: 'LOAD_MUSIC',
    REFRESH_MUSICS: 'REFRESH_MUSICS',
    TOGGLE_LIST_TYPE: 'TOGGLE_LIST_TYPE',
    APPEND_PLAY_LIST: 'APPEND_PLAY_LIST',
    SET_MUSIC_INFO: 'SET_MUSIC_INFO',
    TOGGLE_IF_EDIT: 'TOGGLE_IF_EDIT',
    REDUCE_PLAY_LIST: 'REDUCE_PLAY_LIST'
};

// 设置音乐的 url
export const setMusicInfo = (id, url, cover) => ({
    type: PlayerActionTypes.SET_MUSIC_INFO,
    id,
    url,
    cover
});

// 刷新播放列表
export const refreshMusics = musics => ({
    type: PlayerActionTypes.REFRESH_MUSICS,
    musics
});

// 添加歌曲到播放列表，isPlay 表示是否播放当前歌曲，默认播放
export const appendPlayList = (music, isPlay = true) => ({
    type: PlayerActionTypes.APPEND_PLAY_LIST,
    music,
    play: isPlay // 是否播放
});

// 切换播放列表的显示
export const changeListType = listType => ({
    type: PlayerActionTypes.TOGGLE_LIST_TYPE,
    listType
});

// 切换侧边播放列表的显示与隐藏
export const toggleMusicList = () => ({
    type: PlayerActionTypes.TOGGLE_MUSIC_LIST
});

// 播放指定音乐
export const playSpecialMusic = musicId => ({
    type: PlayerActionTypes.PLAY_SPECIAL_MUSIC,
    musicId
});

// 修改当前播放进度
export const changePlayProgress = playProgress => ({
    type: PlayerActionTypes.CHANGE_PLAY_PROGRESS,
    playProgress
});

// 修改当前音量大小
export const changeVolumeProgress = volumeProgress => ({
    type: PlayerActionTypes.CHANGE_VOLUME_PROGRESS,
    volumeProgress
});

// 按播放按钮，播放音乐
export const playMusic = () => ({
    type: PlayerActionTypes.PLAY_MUSIC
});

// 暂停音乐
export const pauseMusic = () => ({
    type: PlayerActionTypes.PAUSE_MUSIC
});

// 上一曲
export const playPreMusic = () => ({
    type: PlayerActionTypes.PLAY_PRE_MUSIC
});

// 下一曲
export const playNextMusic = () => ({
    type: PlayerActionTypes.PLAY_NEXT_MUSIC
});

// 切换播放模式
export const changePlayMode = () => ({
    type: PlayerActionTypes.CHANGE_PLAY_MODE
});

// 切换静音
export const toggleMute = () => ({
    type: PlayerActionTypes.TOGGLE_MUTE
});

// 初始化歌曲长度
export const initMusicDuration = duration => ({
    type: PlayerActionTypes.INIT_MUSIC_DURATION,
    duration
});

// 加载音乐
export const loadMusic = () => ({
    type: PlayerActionTypes.LOAD_MUSIC,
    loading: true
});
// 加载音乐完成
export const loadMusicFinish = () => ({
    type: PlayerActionTypes.LOAD_MUSIC,
    loading: false
});
// 是否编辑列表
export const toggleIfEdit = () => ({
    type: PlayerActionTypes.TOGGLE_IF_EDIT
});
// 从播放列表清除
export const reducePlayList = id => ({
    type: PlayerActionTypes.REDUCE_PLAY_LIST,
    id
});
