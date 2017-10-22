export const PlayerActionConstants = {
    TOGGLE_MUSIC_LIST: 'TOGGLE_MUSIC_LIST',
    PLAY_SPECIAL_MUSIC: 'PLAY_SPECIAL_MUSIC',
    CHANGE_PLAY_PROGRESS: 'CHANGE_PLAY_PROGRESS',
    CHANGE_VOLUME_PROGRESS: 'CHANGE_VOLUME_PROGRESS'
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
