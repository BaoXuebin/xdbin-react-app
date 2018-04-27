import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

// src 封面图片路径
// play 是否正在播放
class Cover extends Component {
    shouldComponentUpdate(nextProps) {
        if (!nextProps.src) {
            return false;
        }
        return true;
    }

    render() {
        const { src, play } = this.props;
        return [
            <Image key="cover-component" className={play ? 'cover' : 'cover pause'} src={src} circular />,
            <style key="cover-style" jsx="true">{`
                img.cover {
                    width: 280px;
                    height: 280px;
                    margin: .5rem auto;
                    margin-top: 4rem;

                    animation: rotate 30s linear infinite;
                }

                img.pause {
                    animation-play-state: paused;
                    -webkit-animation-play-state: paused; /* Safari 和 Chrome */
                }

                @keyframes rotate {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}
            </style>
        ];
    }
}

Cover.propTypes = {
    src: PropTypes.string,
    play: PropTypes.bool.isRequired
};
Cover.defaultProps = {
    src: ''
};

export default Cover;
