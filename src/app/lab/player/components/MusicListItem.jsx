import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

const MusicListItem = ({ current, music, onClickItem }) => {
    const handleClickItem = () => onClickItem(music.id);
    return (
        <List.Item className={current ? 'current' : ''} onClick={handleClickItem}>
            <List.Content as="span">{music.song}</List.Content>
            <List.Content floated="right">{music.singer}</List.Content>
        </List.Item>
    );
};
MusicListItem.propTypes = {
    current: PropTypes.bool.isRequired,
    music: PropTypes.shape().isRequired,
    onClickItem: PropTypes.func.isRequired
};

export default MusicListItem;
