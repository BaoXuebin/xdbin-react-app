import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { Grid, Segment, Divider, Loader } from 'semantic-ui-react';

import LabStore from '../../src/blog/store/LabStore';
import LabLayout from '../../src/lab/container/LabLayout';
import VideoCard from '../../src/lab/component/video/VideoCard';
import { pubVideoReq } from '../../src/lab/utils/VideoReq';

class Video extends Component {
    static async getInitialProps() {
        const global = {
            page: 1,
            logo: {
                name: 'film',
                text: '短片'
            },
            title: '「短片」'
        };
        await pubVideoReq(global.page)
            .then((result) => {
                global.videos = result.content;
                global.more = !result.last;
            })
            .catch((e) => { console.log(e); });
        return { global };
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            videos: this.props.global.videos,
            more: this.props.global.more,
            page: 2
        };
        this.handleReqVideo = this.handleReqVideo.bind(this);
    }

    handleReqVideo() {
        this.setState({ loading: true });
        pubVideoReq(this.state.page)
            .then((result) => {
                this.setState({
                    loading: false,
                    videos: [...this.state.videos, ...result.content],
                    more: !result.last,
                    page: this.state.page + 1
                });
            })
            .catch((error) => {
                console.error(error);
                this.setState({ loading: false });
            });
    }

    render() {
        if (!this.state) return null;
        const { loading, videos, more } = this.state;
        console.log(videos);
        return (
            <Segment className="lab-container">
                <Divider />
                <Grid doubling columns={3} verticalAlign="top">
                    { videos && videos.map(video => <Grid.Column key={video.id}><VideoCard data={video} /></Grid.Column>) }
                </Grid>
                { loading && <Loader active inline size="small" /> }
                { more && !loading && <a style={{ cursor: 'pointer' }} onClick={this.handleReqVideo}>加载更多</a> }
                <Divider />
            </Segment>
        );
    }
}

Video.propTypes = {
    global: PropTypes.shape().isRequired
};

export default withRedux(LabStore, null, null)(LabLayout(Video));
