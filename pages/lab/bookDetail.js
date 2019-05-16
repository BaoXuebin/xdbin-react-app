import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { Segment, Label, Image, Divider, Feed, Icon, Loader, Button } from 'semantic-ui-react';
import moment from 'moment';

import LabStore from '../../src/blog/store/LabStore';
import LabLayout from '../../src/lab/container/LabLayout';
import { fetchBookByBookIdReq, fetchBookCommentReq } from '../../src/blog/utils/BookReq';
import MarkdownPreview from '../../src/blog/component/common/MarkdownPreview';
import Empty from '../../src/blog/component/common/Empty';

moment.locale('zh-cn');

class BookDetail extends Component {
  static async getInitialProps(ctx) {
    const bookId = ctx.query && ctx.query.bookId ? ctx.query.bookId : null;
    const global = {
      bookId,
      logo: {
        name: 'book',
        text: '读书'
      },
      title: '「读书」'
    };
    await fetchBookByBookIdReq(bookId)
      .then((res) => {
        global.book = res;
        global.title = res.title;
      }).catch((e) => { console.log(e); });
    return { global };
  }

  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      pageSize: 20,
      total: 0,
      last: false,
      comments: []
    };
    this.handleReqComment = this.handleReqComment.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  componentDidMount() {
    this.handleReqComment(this.state.pageNo);
  }

  handleReqComment(pageNo) {
    this.setState({ loading: true });
    fetchBookCommentReq({ bookId: this.props.global.bookId, pageNo, pageSize: this.state.pageSize })
      .then((res) => {
        const { pageNo, pageSize, total, last, content } = res;
        this.setState({ pageNo, pageSize, total, last, comments: [...this.state.comments, ...content] });
      }).catch((e) => { console.log(e); })
      .finally(() => { this.setState({ loading: false }); });
  }

  handleLoadMore() {
    this.handleReqComment(this.state.pageNo + 1);
  }

  render() {
    const { book } = this.props.global;
    const { comments, loading, last } = this.state;
    return (
      <Segment className="lab-container">
        <div className="detail">
          <div className="title">{book.title}</div>
          <div className="extra">{book.authors} | {book.publisher}</div>
          <div className="cover-container">
            <div className="cover">
              <Image
                fluid
                src={book.image}
              />
            </div>
          </div>
          <div className="tag">{
            book.tagGroup.map(tag => (
              <Label key={tag}>
                {tag}
              </Label>))
          }</div>
        </div>
        <Divider />
        <div className="feed-container">
          <Feed>
            {
              comments && comments.map(comment => (
                <Feed.Event key={comment.id}>
                  <Feed.Label image='http://cdn.xdbin.com/pics/20190516232022' />
                  <Feed.Content>
                    <Feed.Summary>
                      <a>{comment.author}</a> <span style={{ fontWeight: 'normal' }}>记录</span> {comment.position}
                      <Feed.Date>{moment(comment.publishTime).fromNow()}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                      <MarkdownPreview text={comment.comment} />
                      
                    </Feed.Extra>
                    <Feed.Meta>
                      <Feed.Like>
                        <Icon name='like' />
                        Like
                      </Feed.Like>
                    </Feed.Meta>
                  </Feed.Content>
                </Feed.Event>
              ))
            }
          </Feed>
        </div>
        <div>
          {(comments.length === 0 && loading) && <Loader active inline size="small" />}
        </div>
        <div>
          {(comments.length === 0 && !loading) && <Empty />}
        </div>
        {(!last && comments.length !== 0) && <div style={{ textAlign: 'center', marginTop: '20px' }}><Button loading={loading} content="更多读书笔记" basic size="tiny" onClick={this.handleLoadMore} /></div>}
      </Segment>
    );
  }
}

export default withRedux(LabStore, null, null)(LabLayout(BookDetail));
