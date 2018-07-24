import React from 'react';
import PropTypes from 'prop-types';
import { Card, Modal, Image, Icon } from 'semantic-ui-react';

// <Image src={data.image} style={{ height: '200px', objectFit: 'cover' }} />

const VideoCard = ({ data }) => (
    <Card>
        <Card style={{ textAlign: 'left' }}>
            <Modal
                trigger={
                    <div className="vedio-image">
                        <Icon name="play" size="huge" color="red" />
                        <Image src={data.image} style={{ height: '200px', objectFit: 'cover' }} />
                    </div>
                }
                closeIcon
                size="large"
                style={{ top: '3rem' }}
            >
                <Modal.Content className="scrolling" style={{ padding: 0, maxHeight: '610px' }}>
                    <video controls="controls" width="100%" height="100%" autoPlay="autoplay" style={{ marginBottom: '-4px' }}>
                        <source type="video/mp4" src={data.source} />
                        您的浏览器不支持Video标签。
                    </video>
                </Modal.Content>
            </Modal>
            <Card.Content>
                <Card.Description>
                    {data.name}
                </Card.Description>
            </Card.Content>
        </Card>
    </Card>
);

VideoCard.propTypes = {
    data: PropTypes.shape().isRequired
};

export default VideoCard;
