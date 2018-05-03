import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import PlayerStore from '../../src/lab/store/PlayerStore';
import LabLayout from '../../src/lab/container/LabLayout';
import Content from '../../src/lab/component/player/Content';
import Control from '../../src/lab/component/player/Control';
import Utils from '../../src/lab/utils/MusicUtil';

class Player extends Component {
    static async getInitialProps() {
        const global = {
            logo: {
                name: 'music',
                text: 'Music'
            },
            title: '「音乐播放器」'
        };
        return { global };
    }

    render() {
        const { musicId, musics } = this.props;
        const music = Utils.get(musicId, musics);
        const cover = music && music.cover ? music.cover : this.cover;
        return [
            <div key="bg-component" className="bg">
                <img alt="aa" className="filter" src={cover} />
            </div>,
            <Content key="content-component" />,
            <Control key="control-component" />
        ];
    }
}

Player.propTypes = {
    musicId: PropTypes.number.isRequired,
    musics: PropTypes.arrayOf(PropTypes.shape())
};
Player.defaultProps = {
    musics: []
};

const mapStateToProps = state => ({
    musicId: state.player.musicId,
    musics: state.player.musics
});

export default withRedux(PlayerStore, mapStateToProps, null)(LabLayout(Player));
