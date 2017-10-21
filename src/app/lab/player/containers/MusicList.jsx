import React from 'react';
import { List, Header, Icon } from 'semantic-ui-react';

import MusicListItem from '../components/MusicListItem';
import '../styles/musiclist.less';

const buildItems = () => {
    const currentMusicId = 2;
    const musics = [
        {
            id: 1,
            song: '山阴路的夏天',
            singer: '李志'
        },
        {
            id: 2,
            song: '梵高先生',
            singer: '李志'
        }
    ];
    return musics.map((m) => {
        const current = m.id === currentMusicId;
        return <MusicListItem key={m.id} current={current} music={m} />;
    });
};

const MusicList = () => (
    <div className="musiclist-container">
        <Header dividing>
            <Header.Content>
                <span className="updateTime">歌单更新于</span>
                <Icon className="refreshBtn" name="refresh" />
            </Header.Content>
        </Header>
        <List divided relaxed celled animated verticalAlign="middle">
            {buildItems()}
        </List>
    </div>
);

export default MusicList;
