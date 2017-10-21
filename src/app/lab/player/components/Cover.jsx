import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

import DefaultCover from './1.jpeg';
import '../styles/cover.less';

// src 封面图片路径
const Cover = ({ src }) => (
    <Image className="cover" src={src || DefaultCover} shape="circular" />
);

Cover.propTypes = {
    src: PropTypes.string.isRequired
};

export default Cover;
