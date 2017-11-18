import React from 'react';
import PropTypes from 'prop-types';
import { List, Header, Icon } from 'semantic-ui-react';

import MusicListItem from '../components/MusicListItem';
import '../styles/musiclist.less';

const MusicList = ({ musicId, musics, onClickItem }) => {
    const _html = musics.map((m) => {
        const current = m.id === musicId;
        return <MusicListItem key={m.id} current={current} music={m} onClickItem={onClickItem} />;
    });
    return (
        <div className="musiclist-container">
            <Header dividing>
                <Header.Content>
                    <span className="updateTime">歌单列表</span>
                </Header.Content>
            </Header>
            <List divided relaxed celled animated verticalAlign="middle">
                {_html}
            </List>
        </div>
    );
};

MusicList.propTypes = {
    musicId: PropTypes.string.isRequired,
    musics: PropTypes.arrayOf(PropTypes.shape()),
    onClickItem: PropTypes.func.isRequired
};
MusicList.defaultProps = {
    musics: []
};

export default MusicList;
