import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';

const Info = ({ music }) => (
    <Container textAlign="center">
        <Header as="h3" content={music.song} />
        {music.singer}
    </Container>
);

Info.propTypes = {
    music: PropTypes.shape()
};
Info.defaultProps = {
    music: {
        id: '',
        song: '未知歌曲',
        singer: '未知歌手'
    }
};

export default Info;
