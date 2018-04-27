import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Grid, Button, Popup, Icon } from 'semantic-ui-react';

import ProgressBar from './ProgressBar';
import {
    toggleMusicList,
    changePlayProgress,
    changeVolumeProgress,
    playMusic,
    pauseMusic,
    changePlayMode,
    toggleMute,
    playPreMusic,
    playNextMusic,
    initMusicDuration,
    loadMusic,
    loadMusicFinish,
    setMusicInfo
} from '../../action/PlayerAction';
import Utils from '../../utils/MusicUtil';
import {
    musicUrlReq,
    musicCoverReq
} from '../../utils/NetEaseApiReq';

class Control extends Component {
    constructor(props) {
        super(props);
        this.audio = null;
        this.task = null; // 进度条前进任务
        this.handleAudioCanPlay = this.handleAudioCanPlay.bind(this);
        this.handleToggleMusicList = this.handleToggleMusicList.bind(this);
        this.handlePlayMusic = this.handlePlayMusic.bind(this);
        this.handlePauseMusic = this.handlePauseMusic.bind(this);
        this.handleChangePlayProgress = this.handleChangePlayProgress.bind(this);
        this.handleChangeVolumeProgress = this.handleChangeVolumeProgress.bind(this);
        this.handleChangePlayMode = this.handleChangePlayMode.bind(this);
        this.handleToggleMute = this.handleToggleMute.bind(this);
        this.handlePlayPreMusic = this.handlePlayPreMusic.bind(this);
        this.handlePlayNextMusic = this.handlePlayNextMusic.bind(this);
        this.handlePlayAudio = this.handlePlayAudio.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(loadMusic());
        // 组件挂载后，获取 audio 标签
        if (!this.audio) {
            this.audio = document.getElementById('audio');
        }
        // 获取音频总时长
        this.audio.ondurationchange = () => {
            this.props.dispatch(initMusicDuration(this.audio.duration));
        };
        // 加载完成
        this.audio.oncanplay = () => {
            // console.log('canplay');
            this.props.dispatch(loadMusicFinish());
            // console.log(e.target.duration);
            // this.handleAudioCanPlay();
        };
        // 加载失败，加载下一首
        this.audio.onerror = () => {
            this.handlePlayNextMusic();
        };
        // 播放完毕
        this.audio.onended = this.handlePlayNextMusic;
    }

    componentWillReceiveProps(nextProps) {
        const {
            mute,
            volumeProgress,
            play,
            musicId
        } = this.props;
        // 静音
        if (nextProps.mute !== mute) {
            if (this.audio && (this.audio.volume || this.audio.volume === 0)) {
                this.audio.volume = nextProps.mute ? 0 : nextProps.volumeProgress;
            }
        }
        // 音量调节
        if (nextProps.volumeProgress !== volumeProgress) {
            if (this.audio && (this.audio.volume || this.audio.volume === 0)) {
                this.audio.volume = nextProps.volumeProgress;
            }
        }
        if (nextProps.musicId !== musicId) {
            const music = Utils.get(nextProps.musicId, nextProps.musics);
            if (this.audio) {
                if (!music.src) {
                    musicUrlReq(nextProps.musicId)
                        .then((r) => {
                            musicCoverReq(nextProps.musicId)
                                .then((songs) => {
                                    const cover = songs[0].al.picUrl;
                                    const { url } = r[0];
                                    nextProps.dispatch(setMusicInfo(nextProps.musicId, url, cover));
                                    this.audio.src = url;
                                    this.handlePlayAudio();
                                });
                        })
                        .catch((e) => { console.log(e); });
                } else {
                    this.audio.src = music.src;
                    this.handlePlayAudio();
                }
            }
        } else if (nextProps.play !== play) {
            if (nextProps.play) {
                if (!this.audio.src) {
                    const music = Utils.get(nextProps.musicId, nextProps.musics);
                    this.audio.src = music.src;
                }
                this.handlePlayAudio();
            } else {
                if (this.task) {
                    clearInterval(this.task);
                }
                this.audio.pause();
            }
        }
    }

    handlePlayAudio() {
        this.audio.play()
            .then(() => {
                if (this.task) {
                    clearInterval(this.task);
                }
                this.task = setInterval(() => {
                    const progress = this.audio.duration === 0 ? 0 : this.audio.currentTime / this.audio.duration;
                    this.handleChangePlayProgress(progress);
                }, 1000);
            })
            .catch((e) => { console.log(e); });
    }

    handleAudioCanPlay() {
        // 初始化歌曲长度
        this.props.dispatch(initMusicDuration(this.audio.duration));
    }

    handleToggleMusicList() {
        this.props.dispatch(toggleMusicList());
    }

    handlePlayMusic() {
        this.props.dispatch(playMusic());
    }

    handlePauseMusic() {
        this.props.dispatch(pauseMusic());
    }

    handleChangePlayProgress(playProgress, drag) {
        // 是否是手动拖拽进度条
        if (drag) {
            this.audio.currentTime = playProgress * this.audio.duration;
            this.props.dispatch(loadMusic());
        }
        this.props.dispatch(changePlayProgress(playProgress));
    }

    handleChangeVolumeProgress(volumeProgress) {
        this.props.dispatch(changeVolumeProgress(volumeProgress));
    }

    handleChangePlayMode() {
        this.props.dispatch(changePlayMode());
    }

    handleToggleMute() {
        this.props.dispatch(toggleMute());
    }

    handlePlayPreMusic() {
        this.props.dispatch(playPreMusic());
    }

    handlePlayNextMusic() {
        this.props.dispatch(playNextMusic());
    }

    render() {
        const {
            loading,
            play,
            playProgress,
            volumeProgress,
            mode,
            mute,
            duration
        } = this.props;
        let playModeText = '单曲循环';
        if (mode === 'random') {
            playModeText = '随机播放';
        } else if (mode === 'repeat') {
            playModeText = '列表循环';
        }
        return (
            <div id="playerControl" className="Control">
                <Container>
                    <Grid>
                        <Grid.Row only="computer">
                            <Grid.Column width={2}>
                                <Button.Group>
                                    <Button icon="step backward" color="red" onClick={this.handlePlayPreMusic} />
                                    {
                                        play ?
                                            <Button icon="pause" loading={loading} color="red" onClick={this.handlePauseMusic} /> :
                                            <Button icon="play" color="red" onClick={this.handlePlayMusic} />
                                    }
                                    <Button icon="step forward" color="red" onClick={this.handlePlayNextMusic} />
                                </Button.Group>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <ProgressBar percent={playProgress} onChangeProgress={this.handleChangePlayProgress} />
                            </Grid.Column>
                            <Grid.Column width={2} style={{ marginLeft: '-1.5rem' }}>
                                {Utils.parseTime(duration * playProgress)}/{Utils.parseTime(duration)}
                            </Grid.Column>
                            <Grid.Column width={2} style={{ marginLeft: '-3rem' }}>
                                <div style={{ float: 'left' }}>
                                    <Icon name={mute ? 'volume off' : 'volume down'} size="large" onClick={this.handleToggleMute} />
                                </div>
                                <ProgressBar
                                    offsetX="20%"
                                    percent={mute ? 0 : volumeProgress}
                                    onChangeProgress={this.handleChangeVolumeProgress}
                                />
                            </Grid.Column>
                            <Grid.Column width={2} style={{ marginLeft: '3rem' }}>
                                <Button.Group floated="right" basic>
                                    <Popup
                                        trigger={<Button icon={mode} onClick={this.handleChangePlayMode} />}
                                        on="hover"
                                        content={playModeText}
                                        position="top center"
                                        size="mini"
                                    />
                                    <Popup
                                        trigger={<Button content="词" floated="right" />}
                                        on="hover"
                                        content="歌词"
                                        position="top center"
                                        size="mini"
                                    />
                                    <Popup
                                        trigger={<Button icon="list" floated="left" onClick={this.handleToggleMusicList} />}
                                        on="hover"
                                        content="播放列表"
                                        position="top center"
                                        size="mini"
                                    />
                                </Button.Group>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row only="tablet">
                            <Grid.Column width={3}>
                                <Button.Group>
                                    <Button icon="step backward" color="red" onClick={this.handlePlayPreMusic} />
                                    {
                                        play ?
                                            <Button icon="pause" loading={loading} color="red" onClick={this.handlePauseMusic} /> :
                                            <Button icon="play" color="red" onClick={this.handlePlayMusic} />
                                    }
                                    <Button icon="step forward" color="red" onClick={this.handlePlayNextMusic} />
                                </Button.Group>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <ProgressBar percent={playProgress} onChangeProgress={this.handleChangePlayProgress} />
                            </Grid.Column>
                            <Grid.Column width={2} style={{ marginLeft: '-1.5rem' }}>
                                {Utils.parseTime(duration * playProgress)}/{Utils.parseTime(duration)}
                            </Grid.Column>
                            <Grid.Column width={2} textAlign="right">
                                <Button.Group basic>
                                    <Button icon={mode} onClick={this.handleChangePlayMode} />
                                    <Button content="词" floated="right" />
                                    <Button icon="list" floated="left" onClick={this.handleToggleMusicList} />
                                </Button.Group>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row only="mobile" style={{ margin: '-.2rem 0 -1.8rem 0' }}>
                            <Grid.Column width={12}>
                                <ProgressBar percent={playProgress} onChangeProgress={this.handleChangePlayProgress} />
                            </Grid.Column>
                            <Grid.Column width={4} style={{ marginLeft: '-1.5rem' }}>
                                {Utils.parseTime(duration * playProgress)}/{Utils.parseTime(duration)}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={3} only="mobile">
                            <Grid.Column width={3}>
                                <Button.Group floated="left" basic>
                                    <Button icon={mode} onClick={this.handleChangePlayMode} />
                                </Button.Group>
                            </Grid.Column>
                            <Grid.Column width={10} textAlign="center">
                                <Button.Group>
                                    <Button icon="step backward" color="red" onClick={this.handlePlayPreMusic} />
                                    {
                                        play ?
                                            <Button icon="pause" loading={loading} color="red" onClick={this.handlePauseMusic} /> :
                                            <Button icon="play" color="red" onClick={this.handlePlayMusic} />
                                    }
                                    <Button icon="step forward" color="red" onClick={this.handlePlayNextMusic} />
                                </Button.Group>
                            </Grid.Column>
                            <Grid.Column width={3} textAlign="right">
                                <Button.Group basic>
                                    <Button icon="list" floated="left" onClick={this.handleToggleMusicList} />
                                </Button.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
                <audio id="audio" loop={mode === 'lock' && 'loop'} >
                    <track kind="captions" />
                </audio>
            </div>
        );
    }
}

Control.propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    play: PropTypes.bool.isRequired,
    playProgress: PropTypes.number.isRequired,
    volumeProgress: PropTypes.number.isRequired,
    mode: PropTypes.string.isRequired,
    mute: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired,
    musicId: PropTypes.number.isRequired,
    musics: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

const mapStateToProps = state => ({
    loading: state.player.loading,
    play: state.player.play,
    playProgress: state.player.playProgress,
    volumeProgress: state.player.volumeProgress,
    mode: state.player.mode,
    mute: state.player.mute,
    duration: state.player.duration,
    musicId: state.player.musicId,
    musics: state.player.musics
});

export default connect(mapStateToProps)(Control);
