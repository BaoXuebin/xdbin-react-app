import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import withRedux from 'next-redux-wrapper';
import { Feed, Icon, Divider, Container, Button } from 'semantic-ui-react';

import NoneStore from '../../src/common/store/NoneStore';
import Layout from '../../src/blog/container/Layout';
import { fetchMoodsByPage, redirect } from '../../src/lab/utils/MoodReq';
import MarkdownPreview from '../../src/blog/component/common/MarkdownPreview';
import Empty from '../../src/blog/component/common/Empty';

moment.locale('zh-cn');

class Mood extends Component {
    static async getInitialProps({ res }) {
        const global = {
            page: 1,
            now: new Date(),
            logo: {
                name: 'heartbeat',
                text: '心情'
            },
            title: '「心情」'
        };
        await fetchMoodsByPage(global.page)
            .then((result) => { global.mood = result; })
            .catch(() => { redirect(res); });
        return { global };
    }

    constructor(props) {
        super(props);
        const { mood } = this.props.global;
        this.state = {
            pageNo: mood.number + 1,
            moods: mood.content,
            total: mood.totalElements,
            loading: false,
            last: mood.last
        };
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    handleLoadMore() {
        this.setState({ loading: true });
        fetchMoodsByPage(this.state.pageNo + 1)
            .then((result) => {
                console.log(result);
                const {
                    number,
                    totalElements,
                    content,
                    last
                } = result;
                this.setState({
                    pageNo: number + 1,
                    total: totalElements,
                    moods: this.state.moods.concat(content),
                    last
                });
            })
            .catch((e) => { console.error(e); })
            .finally(() => { this.setState({ loading: false }); });
    }

    render() {
        const {
            moods,
            loading,
            last,
            total
        } = this.state;
        if (total === 0) {
            return (
                <div>
                    <Container textAlign="right" style={{ color: '#aaa' }}>
                        <Icon name="heartbeat" /> 页面加载于 {moment(this.props.global.now).format('YYYY/MM/DD HH:mm:ss')}
                    </Container>
                    <Divider />
                    <Empty content="雁过无痕 ~" />
                </div>
            );
        }
        return (
            <div>
                <Container textAlign="right" style={{ color: '#aaa' }}>
                    {moment(new Date()).format('YYYY/MM/DD')}
                </Container>
                <Divider />
                {
                    moods.map(mood => <MoodItem key={mood.id} mood={mood} />)
                }
                { !last && <div style={{ textAlign: 'center' }}><Button loading={loading} content="更久以前" basic size="tiny" onClick={this.handleLoadMore} /></div> }
                <style scoped>{`
                    img {
                        max-width: 120px;
                        object-fit: cover;
                    }
                `}
                </style>
            </div>
        );
    }
}


const MoodItem = ({ mood }) => (
    <Feed>
        <Feed.Event>
            <Feed.Label image={mood.avatar} />
            <Feed.Content>
                <Feed.Summary>
                    <Feed.User>{mood.user}</Feed.User>&nbsp;{mood.action}
                    <Feed.Date>{moment(mood.publishTime).fromNow()}</Feed.Date>
                </Feed.Summary>
                {
                    mood.content &&
                    <Feed.Extra text>
                        <MarkdownPreview style={{ color: '#293846' }} text={mood.content} />
                    </Feed.Extra>
                }
                <Feed.Meta>
                    <Feed.Like>
                        <Icon name='like' />
                        {mood.liked} 喜欢
                    </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
    </Feed>
);


export default withRedux(NoneStore, null, null)(Layout(Mood));
