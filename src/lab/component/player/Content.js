import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Sidebar } from 'semantic-ui-react';

import Cover from './Cover';
import Info from './Info';
import MusicList from './MusicList';
import { playSpecialMusic } from '../../action/PlayerAction';
import Utils from '../../utils/MusicUtil';

class Content extends Component {
    constructor(props) {
        super(props);
        this.cover = null;
        this.handleClickItem = this.handleClickItem.bind(this);
        this.refreshHeight = this.refreshHeight.bind(this);
    }

    componentDidMount() {
        // 初始化高度
        this.refreshHeight();
        const callback = window.onresize;
        window.onresize = () => {
            if (callback) {
                callback();
            }
            this.refreshHeight();
        };
    }

    refreshHeight() {
        // 初始化高度
        const windowHeight = document.body.clientHeight;
        const headerHeight = document.getElementById('playerHeader').offsetHeight;
        const controlHeight = document.getElementById('playerControl').offsetHeight;
        const contentHeight = windowHeight - headerHeight - controlHeight;
        this.playerContent.style.height = `${contentHeight}px`;
    }

    // 点击播放列表
    handleClickItem(musicId) {
        this.props.dispatch(playSpecialMusic(musicId));
    }

    render() {
        const {
            slideOpen,
            musicId,
            musics,
            play
        } = this.props;
        const music = Utils.get(musicId, musics);
        const cover = music && music.cover ? music.cover : this.cover;
        return (
            <div ref={(playerContent) => { this.playerContent = playerContent; }} id="playerContent">
                <Sidebar.Pushable>
                    <Sidebar animation="overlay" visible={slideOpen} width="wide" direction="right">
                        <MusicList musicId={musicId} musics={musics} onClickItem={this.handleClickItem} />
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Grid textAlign="center">
                            <Grid.Row>
                                <Grid.Column>
                                    <Cover src={cover} play={play} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Info music={music} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

Content.propTypes = {
    dispatch: PropTypes.func.isRequired,
    slideOpen: PropTypes.bool.isRequired,
    musicId: PropTypes.number.isRequired,
    musics: PropTypes.arrayOf(PropTypes.shape()),
    play: PropTypes.bool.isRequired
};
Content.defaultProps = {
    musics: []
};

const mapStateToProps = state => ({
    slideOpen: state.player.slideOpen,
    musicId: state.player.musicId,
    musics: state.player.musics,
    play: state.player.play
});

export default connect(mapStateToProps)(Content);
