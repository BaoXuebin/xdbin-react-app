import React from 'react';
import PropTypes from 'prop-types';
import { List, Icon } from 'semantic-ui-react';

const MusicListItem = ({
    current,
    music,
    edit,
    onClickItem,
    onEdit
}) => {
    const handleClickItem = () => onClickItem(music.id, true);
    const handleEditItem = (e) => { onEdit(music.id, false); e.stopPropagation(); };
    return (
        <List.Item className={current ? 'current' : ''} style={{ height: '2.4rem' }} onClick={handleClickItem}>
            <List.Content as="span">{music.song}</List.Content>
            <List.Content floated="right">
                {music.singer}
                { edit && <Icon name="send" link color="red" style={{ marginLeft: '5px' }} onClick={handleEditItem} /> }
            </List.Content>
        </List.Item>
    );
};
MusicListItem.propTypes = {
    current: PropTypes.bool.isRequired,
    edit: PropTypes.bool.isRequired,
    music: PropTypes.shape().isRequired,
    onClickItem: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};

export default MusicListItem;
