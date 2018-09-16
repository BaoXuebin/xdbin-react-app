import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Comment, Button, Header, Divider, Label, Icon, Grid } from 'semantic-ui-react';
import Empty from '../common/Empty';
import Config from '../../../config/Config';
import ReplyCommentPopup from './ReplyCommentPopup';

moment.locale('zh-cn');

const CommentItem = ({ comment, onReply }) => (
    <Comment style={{ marginBottom: '1rem' }}>
        <Comment.Avatar as="a" src={comment.avatar || Config.defaultAvatar} />
        <Comment.Content>
            <Comment.Author>
                <Grid>
                    <Grid.Column floated="left" width={12}>
                        {comment.username}&nbsp;&nbsp;
                        {
                            comment.username === '止于秋分' &&
                                <Label color="red" horizontal style={{ padding: '.2rem', fontWeight: 'normal' }}>
                                    作者
                                </Label>
                        }
                        { comment.replyId && '回复' }
                        { comment.replyId && <ReplyCommentPopup replyId={comment.replyId} />}
                    </Grid.Column>
                    <Grid.Column floated="right" width={4} textAlign="right">
                        <span style={{ color: 'grey' }}>#{comment.id}</span>
                    </Grid.Column>
                </Grid>
            </Comment.Author>
            <Comment.Metadata>
                <div>{moment(comment.publishTime).fromNow()}</div>
            </Comment.Metadata>
            <Comment.Text>
                {comment.content}
            </Comment.Text>
            <Comment.Actions>
                <Comment.Action>
                    <Icon name="reply" onClick={() => { onReply(comment.id); }} />
                </Comment.Action>
            </Comment.Actions>
        </Comment.Content>
    </Comment>
);

CommentItem.propTypes = {
    comment: PropTypes.shape().isRequired,
    onReply: PropTypes.func.isRequired
};

const CommentList = ({
    top,
    comments,
    onLoadMore,
    loading,
    pageNo,
    pageSize,
    total,
    onReply
}) => {
    if (total === 0 && top.length === 0) {
        return <Empty content="快发表第一个评论吧 ~" />;
    }
    const _topHtml = top.map(c => <CommentItem key={c.id} comment={c} onReply={onReply} />);
    const _html = comments.map(c => <CommentItem key={c.id} comment={c} onReply={onReply} />);
    return (
        <Fragment>
            <Header key="comment-header" as="h3">评论 ({total})</Header>
            {
                top.length > 0 && [
                    <div key="my-divider" style={{ margin: '0 3rem' }}><Divider horizontal>我的评论</Divider></div>,
                    <Comment.Group key="top-comment">
                        {_topHtml}
                    </Comment.Group>,
                    <div key="all-divider" style={{ margin: '0 3rem' }}><Divider horizontal>所有评论</Divider></div>
                ]
            }
            <Comment.Group key="comment-body">
                { _html }
            </Comment.Group>
            { (total > pageNo * pageSize) &&
                <div style={{ textAlign: 'center' }}><Button loading={loading} content="加载更多" basic size="mini" onClick={onLoadMore} /></div> }
        </Fragment>
    );
};

CommentList.propTypes = {
    top: PropTypes.arrayOf(PropTypes.shape()),
    comments: PropTypes.arrayOf(PropTypes.shape()),
    pageNo: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    onLoadMore: PropTypes.func.isRequired,
    onReply: PropTypes.func.isRequired,
    loading: PropTypes.bool
};
CommentList.defaultProps = {
    top: null,
    loading: false,
    comments: [],
    pageNo: 1,
    pageSize: 10,
    total: 0
};

export default CommentList;
