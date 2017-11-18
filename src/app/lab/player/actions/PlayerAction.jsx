export const PlayerActionConstants = {
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
    INIT_MUSIC_DURATION: 'INIT_MUSIC_DURATION'
};

// 切换侧边播放列表的显示与隐藏
export const toggleMusicList = () => ({
    type: PlayerActionConstants.TOGGLE_MUSIC_LIST
});

// 播放指定音乐
export const playSpecialMusic = musicId => ({
    type: PlayerActionConstants.PLAY_SPECIAL_MUSIC,
    musicId
});

// 修改当前播放进度
export const changePlayProgress = playProgress => ({
    type: PlayerActionConstants.CHANGE_PLAY_PROGRESS,
    playProgress
});

// 修改当前音量大小
export const changeVolumeProgress = volumeProgress => ({
    type: PlayerActionConstants.CHANGE_VOLUME_PROGRESS,
    volumeProgress
});

// 按播放按钮，播放音乐
export const playMusic = () => ({
    type: PlayerActionConstants.PLAY_MUSIC
});

// 暂停音乐
export const pauseMusic = () => ({
    type: PlayerActionConstants.PAUSE_MUSIC
});

// 上一曲
export const playPreMusic = () => ({
    type: PlayerActionConstants.PLAY_PRE_MUSIC
});

// 下一曲
export const playNextMusic = () => ({
    type: PlayerActionConstants.PLAY_NEXT_MUSIC
});

// 切换播放模式
export const changePlayMode = () => ({
    type: PlayerActionConstants.CHANGE_PLAY_MODE
});

// 切换静音
export const toggleMute = () => ({
    type: PlayerActionConstants.TOGGLE_MUTE
});

// 初始化歌曲长度
export const initMusicDuration = duration => ({
    type: PlayerActionConstants.INIT_MUSIC_DURATION,
    duration
});
