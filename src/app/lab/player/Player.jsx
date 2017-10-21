import React from 'react';

import './styles/player.less';
import Header from './components/Header';
import Control from './containers/Control';
import Content from './containers/Content';

const Player = () => (
    <div>
        <Header />
        <Content />
        <Control />
    </div>
);

export default Player;
