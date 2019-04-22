import React, { Component } from 'react';
import moment from 'moment';
import withRedux from 'next-redux-wrapper';
import { Feed, Icon, Divider, Container, Button, Modal } from 'semantic-ui-react';

import NoneStore from '../../src/common/store/NoneStore';
import Layout from '../../src/blog/container/Layout';
import { fetchNotesByPage, redirect } from '../../src/lab/utils/MoodReq';
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
    await fetchNotesByPage(global.page)
      .then((result) => { global.mood = result; })
      .catch(() => { redirect(res); });
    return { global };
  }

  constructor(props) {
    super(props);
    const { mood } = this.props.global;
    this.state = {
      pageNo: mood.pageNo,
      moods: mood.content,
      total: mood.totalElements,
      loading: false,
      last: mood.last
    };
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  handleLoadMore() {
    this.setState({ loading: true });
    fetchNotesByPage(this.state.pageNo + 1)
      .then((result) => {
        const {
          pageNo,
          total,
          content,
          last
        } = result;
        this.setState({
          pageNo,
          total,
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
          <Icon name="heartbeat" /> 页面加载于 {moment(this.props.global.now).format('YYYY/MM/DD HH:mm:ss')}
        </Container>
        <Divider />
        {
          moods.map(mood => <MoodItem key={mood.id} mood={mood} />)
        }
        {!last && <div style={{ textAlign: 'center' }}><Button loading={loading} content="更久以前" basic size="tiny" onClick={this.handleLoadMore} /></div>}
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
  <Feed className="mood-item-component">
    <Feed.Event>
      <Feed.Label>
        <img src={mood.avatarUrl} />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>{mood.nickName || '止于秋分'}</Feed.User>&nbsp;发布了一个心情
          <Feed.Date>{moment(mood.publishTime).fromNow()}</Feed.Date>
        </Feed.Summary>
        {
          mood.content ?
            <Feed.Extra text>
              <MarkdownPreview style={{ color: '#293846' }} text={mood.content} />
            </Feed.Extra> :
            <Feed.Extra text>
              [The Secret] <Icon name="lock" color="grey" />
            </Feed.Extra>
        }
        {
          (mood.images && mood.images.length > 0) &&
          <Feed.Extra images>
            {
              mood.images.length === 1 ?
                <div>
                  {
                    mood.images.map(img => <a key={img}>
                      <Modal trigger={<img style={{ maxWidth: '200px', width: '200px' }} src={img} />} basic size='large'>
                        <Modal.Content style={{ textAlign: 'center' }}>
                          <img style={{ maxWidth: '100%' }} src={img} />
                        </Modal.Content>
                      </Modal></a>)
                  }
                </div>
                :
                <div>
                  {
                    mood.images.map(img =>
                      <a key={img}>
                        <Modal trigger={<img style={{ width: '6em', height: '6em' }} src={img} />} basic size='large'>
                          <Modal.Content style={{ textAlign: 'center' }}>
                            <img style={{ maxWidth: '100%' }} src={img} />
                          </Modal.Content>
                        </Modal></a>)
                  }
                </div>
            }
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

const ImageViewModal = (props) => (
  <Modal trigger={props.component} basic size='small'>
    <Modal.Content>
      <p>
        Your inbox is getting full, would you like us to enable automatic archiving of old messages?
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red' inverted>
        <Icon name='remove' /> No
      </Button>
      <Button color='green' inverted>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
);


export default withRedux(NoneStore, null, null)(Layout(Mood));
