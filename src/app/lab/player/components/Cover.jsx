import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

import DefaultCover from './1.jpeg';
import '../styles/cover.less';

// src 封面图片路径
// play 是否正在播放
const Cover = ({ src, play }) => (
    <Image className={play ? 'cover' : 'cover pause'} src={src || DefaultCover} shape="circular" />
);

Cover.propTypes = {
    src: PropTypes.string,
    play: PropTypes.bool.isRequired
};
Cover.defaultProps = {
    src: ''
};

export default Cover;
