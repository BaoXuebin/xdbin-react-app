import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { Segment, Divider, Button } from 'semantic-ui-react';

import LabStore from '../../src/blog/store/LabStore';
import LabLayout from '../../src/lab/container/LabLayout';

const Gap = () => (
    <div style={{ height: '1rem' }} />
);

const Image = ({
    img,
    focus,
    onFocus,
    onDelete
}) => {
    const {
        id,
        src,
        width,
        height,
        rotate,
        top,
        left
    } = img;
    const clickEvent = () => { onFocus(id); };
    const dbClickEvent = () => { onDelete(id); };
    if (focus) return <img style={{ zIndex: 2, borderWidth: '15px' }} alt={id} src={src} width={500} onClick={clickEvent} onDoubleClick={dbClickEvent} />;
    if (top || top === 0 || left || left === 0) {
        return <img style={{ transform: `rotate(${rotate}deg)`, top, left }} alt={id} src={src} width={width} height={height} onClick={clickEvent} />;
    }
    return <img style={{ transform: `rotate(${rotate}deg)` }} alt={id} src={src} width={width} height={height} />;
};

Image.propTypes = {
    img: PropTypes.shape().isRequired,
    focus: PropTypes.bool.isRequired,
    onFocus: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

class Shot extends Component {
    static async getInitialProps() {
        const global = {
            page: 1,
            logo: {
                name: 'crop',
                text: '视频截图'
            },
            title: '「视频截图」'
        };
        return { global };
    }

    constructor(props) {
        super(props);
        this.canvas = null;
        this.img = null;
        this.state = {
            videoName: '',
            imgs: [],
            focusImage: ''
        };
        this.handleCut = this.handleCut.bind(this);
        this.handleOpenFile = this.handleOpenFile.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
        this.handleFoucsImage = this.handleFoucsImage.bind(this);
        this.handleDeleteImage = this.handleDeleteImage.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleCut() {
        if (!document) return;
        this.canvas = document.createElement('canvas');

        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
        this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        // this.img.setAttribute('crossOrigin', 'Anonymous');
        const rotate = Math.floor(Math.random() * 70) - 35;
        const top = Math.floor(Math.random() * 400) + 5;
        const left = Math.floor(Math.random() * 650) + 5;
        const id = String(new Date().getTime());
        this.setState({
            imgs: [...this.state.imgs, {
                id,
                src: this.canvas.toDataURL('image/png'),
                width: 200,
                rotate,
                top,
                left
            }]
            // focusImage: id
        });
    }

    handleOpenFile() {
        this.file.click();
    }

    handleChangeFile() {
        const file = this.file.files[0];
        this.video.src = URL.createObjectURL(file);
        this.setState({
            videoName: file.name
        });
    }

    handleFoucsImage(id) {
        this.setState({
            focusImage: id === this.state.focusImage ? '' : id
        });
    }

    handleDeleteImage(id) {
        this.setState({
            imgs: this.state.imgs.filter(img => img.id !== id)
        });
    }

    handleClear() {
        this.setState({
            imgs: [],
            focusImage: ''
        });
    }

    render() {
        const { videoName, imgs, focusImage } = this.state;
        return (
            <Segment className="lab-container">
                <Divider />
                <input type="file" style={{ display: 'none' }} ref={(file) => { this.file = file; }} onChange={this.handleChangeFile} />
                <video ref={(video) => { this.video = video; }} controls="controls" width="500px" style={{ marginBottom: '-4px', backgroundColor: '#ccc' }}>
                    您的浏览器不支持Video标签。
                </video>
                <Gap />
                <Button.Group basic>
                    {videoName ? <Button title={videoName} className="single-line" style={{ maxWidth: '200px' }} content={videoName} onClick={this.handleOpenFile} />
                        : <Button icon="file" onClick={this.handleOpenFile} />}
                    <Button icon="crop" onClick={this.handleCut} />
                    <Button icon="eraser" onClick={this.handleClear} />
                </Button.Group>
                <Gap />
                <div className="shot">
                    {
                        this.state && imgs.map(img =>
                            <Image key={img.id} img={img} focus={img.id === focusImage} onFocus={this.handleFoucsImage} onDelete={this.handleDeleteImage} />)
                    }
                </div>
                <Divider />
            </Segment>
        );
    }
}

export default withRedux(LabStore, null, null)(LabLayout(Shot));
