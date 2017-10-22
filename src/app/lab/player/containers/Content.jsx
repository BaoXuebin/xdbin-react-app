import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Sidebar } from 'semantic-ui-react';

import Cover from '../components/Cover';
import Info from '../components/Info';
import MusicList from './MusicList';
import { playSpecialMusic } from '../actions/PlayerAction';
import Utils from '../utils/Utils';

class Content extends Component {
    constructor(props) {
        super(props);
        this.handleClickItem = this.handleClickItem.bind(this);
    }

    componentDidMount() {
        // 初始化高度
        const windowHeight = document.body.clientHeight;
        const headerHeight = document.getElementById('playerHeader').offsetHeight;
        const controlHeight = document.getElementById('playerControl').offsetHeight;
        const contentHeight = windowHeight - headerHeight - controlHeight;
        document.getElementById('playerContent').style.height = `${contentHeight}px`;
    }

    // 点击播放列表
    handleClickItem(musicId) {
        this.props.dispatch(playSpecialMusic(musicId));
    }

    render() {
        const { slideOpen, musicId, musics } = this.props;
        const music = Utils.get(musicId, musics);
        return (
            <div id="playerContent" style={{ marginTop: '-1rem' }}>
                <Sidebar.Pushable>
                    <Sidebar animation="overlay" visible={slideOpen} width="wide" direction="right">
                        <MusicList musicId={musicId} musics={musics} onClickItem={this.handleClickItem} />
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Grid textAlign="center">
                            <Grid.Row>
                                <Grid.Column>
                                    <Cover />
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
    musicId: PropTypes.string.isRequired,
    musics: PropTypes.arrayOf(PropTypes.shape())
};
Content.defaultProps = {
    musics: []
};

const mapStateToProps = state => ({
    slideOpen: state.Player.slideOpen,
    musicId: state.Player.musicId,
    musics: state.Player.musics
});

export default connect(mapStateToProps)(Content);
