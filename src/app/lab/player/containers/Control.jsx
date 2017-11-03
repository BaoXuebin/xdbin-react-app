import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Grid, Button, Popup, Icon } from 'semantic-ui-react';

import '../styles/control.less';
import ProgressBar from '../components/ProgressBar';
import {
    toggleMusicList,
    changePlayProgress,
    changeVolumeProgress,
    playMusic,
    pauseMusic
} from '../actions/PlayerAction';

class Control extends Component {
    constructor(props) {
        super(props);
        this.handleToggleMusicList = this.handleToggleMusicList.bind(this);
        this.handlePlayMusic = this.handlePlayMusic.bind(this);
        this.handlePauseMusic = this.handlePauseMusic.bind(this);
        this.handleChangePlayProgress = this.handleChangePlayProgress.bind(this);
        this.handleChangeVolumeProgress = this.handleChangeVolumeProgress.bind(this);
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

    handleChangePlayProgress(playProgress) {
        this.props.dispatch(changePlayProgress(playProgress));
    }

    handleChangeVolumeProgress(volumeProgress) {
        this.props.dispatch(changeVolumeProgress(volumeProgress));
    }

    render() {
        const { play, playProgress, volumeProgress } = this.props;
        return (
            <div id="playerControl" className="Control">
                <Container>
                    <Grid>
                        <Grid.Row only="computer">
                            <Grid.Column width={2}>
                                <Button.Group>
                                    <Button icon="step backward" color="red" />
                                    {
                                        play ?
                                            <Button icon="pause" color="red" onClick={this.handlePauseMusic} /> :
                                            <Button icon="play" color="red" onClick={this.handlePlayMusic} />
                                    }
                                    <Button icon="step forward" color="red" />
                                </Button.Group>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <ProgressBar percent={playProgress} onChangeProgress={this.handleChangePlayProgress} />
                            </Grid.Column>
                            <Grid.Column width={2} style={{ marginLeft: '-1.5rem' }}>
                                12:00/12:00
                            </Grid.Column>
                            <Grid.Column width={2} style={{ marginLeft: '-3rem' }}>
                                <div style={{ float: 'left' }}>
                                    <Icon name="volume down" size="large" />
                                </div>
                                <ProgressBar
                                    offsetX="20%"
                                    percent={volumeProgress}
                                    onChangeProgress={this.handleChangeVolumeProgress}
                                />
                            </Grid.Column>
                            <Grid.Column width={2} style={{ marginLeft: '3rem' }}>
                                <Button.Group floated="right" basic>
                                    <Popup
                                        trigger={<Button icon="random" />}
                                        on="hover"
                                        content="随机"
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
                                    <Button icon="step backward" color="red" />
                                    {
                                        play ?
                                            <Button icon="pause" color="red" onClick={this.handlePauseMusic} /> :
                                            <Button icon="play" color="red" onClick={this.handlePlayMusic} />
                                    }
                                    <Button icon="step forward" color="red" />
                                </Button.Group>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <ProgressBar percent={playProgress} onChangeProgress={this.handleChangePlayProgress} />
                            </Grid.Column>
                            <Grid.Column width={2} style={{ marginLeft: '-1.5rem' }}>
                                12:00/12:00
                            </Grid.Column>
                            <Grid.Column width={2} textAlign="right">
                                <Button.Group basic>
                                    <Popup
                                        trigger={<Button icon="random" />}
                                        on="hover"
                                        content="随机"
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
                        <Grid.Row only="mobile" style={{ margin: '-.2rem 0 -1.8rem 0' }}>
                            <Grid.Column width={12}>
                                <ProgressBar percent={playProgress} onChangeProgress={this.handleChangePlayProgress} />
                            </Grid.Column>
                            <Grid.Column width={4} style={{ marginLeft: '-1.5rem' }}>
                                12:00/12:00
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={3} only="mobile">
                            <Grid.Column width={3}>
                                <Button.Group floated="left" basic>
                                    <Popup
                                        trigger={<Button icon="random" />}
                                        on="hover"
                                        content="随机"
                                        position="top center"
                                        size="mini"
                                    />
                                </Button.Group>
                            </Grid.Column>
                            <Grid.Column width={10} textAlign="center">
                                <Button.Group>
                                    <Button icon="step backward" color="red" />
                                    {
                                        play ?
                                            <Button icon="pause" color="red" onClick={this.handlePauseMusic} /> :
                                            <Button icon="play" color="red" onClick={this.handlePlayMusic} />
                                    }
                                    <Button icon="step forward" color="red" />
                                </Button.Group>
                            </Grid.Column>
                            <Grid.Column width={3} textAlign="right">
                                <Button.Group basic>
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
                    </Grid>
                </Container>
            </div>
        );
    }
}

Control.propTypes = {
    dispatch: PropTypes.func.isRequired,
    play: PropTypes.bool.isRequired,
    playProgress: PropTypes.number.isRequired,
    volumeProgress: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    play: state.Player.play,
    playProgress: state.Player.playProgress,
    volumeProgress: state.Player.volumeProgress
});

export default connect(mapStateToProps)(Control);
