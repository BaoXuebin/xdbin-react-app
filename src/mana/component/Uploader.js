import React, { Component } from 'react';
import { Button, Label } from 'semantic-ui-react';
import * as qiniu from 'qiniu-js';

import { fetchQiniuTokenReq } from '../util/ManaReq';
import './styles/Uploader.less';

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            filepath: null,
            fileUrl: null
        };
        this.selectImage = this.selectImage.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleThrowError = this.handleThrowError.bind(this);
    }

    componentWillUnmount() {
        this.file.onchange = null;
    }

    selectImage() {
        if (this.file) {
            this.file.click();
        }
    }

    handleChangeFile() {
        const file = this.file.files[0];
        this.setState({
            filepath: file.name
        });
    }

    handleUpload() {
        this.setState({ loading: true, error: null }, () => {
            fetchQiniuTokenReq()
                .then((data) => {
                    const { key, token } = data;
                    const observable = qiniu.upload(
                        this.file.files[0],
                        key,
                        token,
                        { region: qiniu.region.z0 }
                    );
                    const _this = this;
                    observable.subscribe({
                        error(err) { _this.handleThrowError('图片上传失败', err); },
                        complete(res) {
                            _this.setState({ fileUrl: res.url, loading: false, filepath: null });
                        }
                    });
                })
                .catch((err) => { this.handleThrowError('获取token失败', err); });
        });
    }

    handleThrowError(e, error) {
        console.error(e);
        this.setState({ error, loading: false });
    }

    render() {
        const {
            filepath,
            error,
            loading,
            fileUrl
        } = this.state;
        return (
            <div className="uploader">
                <input type="file" ref={(file) => { this.file = file; }} style={{ display: 'none' }} onChange={this.handleChangeFile} />
                <Button.Group basic>
                    <Button onClick={this.selectImage}>{filepath || '选择图片'}</Button>
                    <Button icon="upload" loading={loading} disabled={loading} onClick={this.handleUpload} />
                </Button.Group>
                { error && <Label basic color="red" pointing="left">{error}</Label> }
                { fileUrl &&
                    <div style={{ margin: '1rem' }}>
                        <span className="url">{fileUrl}</span>
                    </div>
                }
            </div>
        );
    }
}

export default Uploader;
