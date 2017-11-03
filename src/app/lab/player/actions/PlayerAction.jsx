export const PlayerActionConstants = {
    TOGGLE_MUSIC_LIST: 'TOGGLE_MUSIC_LIST',
    PLAY_SPECIAL_MUSIC: 'PLAY_SPECIAL_MUSIC',
    CHANGE_PLAY_PROGRESS: 'CHANGE_PLAY_PROGRESS',
    CHANGE_VOLUME_PROGRESS: 'CHANGE_VOLUME_PROGRESS',
    PLAY_MUSIC: 'PLAY_MUSIC',
    PAUSE_MUSIC: 'PAUSE_MUSIC'
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

// 下一曲
