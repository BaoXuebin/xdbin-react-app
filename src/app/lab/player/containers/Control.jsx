import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Grid, Button, Popup, Icon } from 'semantic-ui-react';

import '../styles/control.less';
import ProgressBar from '../components/ProgressBar';
import {
    toggleMusicList,
    changePlayProgress,
    changeVolumeProgress
} from '../actions/PlayerAction';

class Control extends Component {
    constructor(props) {
        super(props);
        this.handleToggleMusicList = this.handleToggleMusicList.bind(this);
        this.handleChangePlayProgress = this.handleChangePlayProgress.bind(this);
        this.handleChangeVolumeProgress = this.handleChangeVolumeProgress.bind(this);
    }

    handleToggleMusicList() {
        this.props.dispatch(toggleMusicList());
    }

    handleChangePlayProgress(playProgress) {
        this.props.dispatch(changePlayProgress(playProgress));
    }

    handleChangeVolumeProgress(volumeProgress) {
        this.props.dispatch(changeVolumeProgress(volumeProgress));
    }

    render() {
        const { playProgress, volumeProgress } = this.props;
        return (
            <div id="playerControl" className="Control">
                <Container>
                    <Grid>
                        <Grid.Column width={2}>
                            <Button.Group>
                                <Button icon="step backward" color="red" />
                                <Button icon="pause" color="red" />
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
                    </Grid>
                </Container>
            </div>
        );
    }
}

Control.propTypes = {
    dispatch: PropTypes.func.isRequired,
    playProgress: PropTypes.number.isRequired,
    volumeProgress: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    playProgress: state.Player.playProgress,
    volumeProgress: state.Player.volumeProgress
});

export default connect(mapStateToProps)(Control);
