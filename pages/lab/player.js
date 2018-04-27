import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';

import PlayerStore from '../../src/lab/store/PlayerStore';
import LabLayout from '../../src/lab/container/LabLayout';
import Content from '../../src/lab/component/player/Content';
import Control from '../../src/lab/component/player/Control';

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
        return [
            <Content key="content-component" />,
            <Control key="control-component" />
        ];
    }
}

export default withRedux(PlayerStore, null, null)(LabLayout(Player));
