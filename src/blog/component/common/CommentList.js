import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Comment, Button, Header, Divider } from 'semantic-ui-react';
import Empty from './Empty';
import Config from '../../../config/Config';

moment.locale('zh-cn');

// { id: 4,
//     origin: '8a9eec5163c064a70163e41f18fc0002',
//     replyId: null,
//     username: '制约秋分',
//     content: 'Hello World!',
//     type: null,
//     publishTime: 1536854711000,
//     valid: 1 },
const CommentItem = ({ comment }) => (
    <Comment style={{ marginBottom: '1rem' }}>
        <Comment.Avatar as="a" src={comment.avatar || Config.defaultAvatar} />
        <Comment.Content>
            <Comment.Author>{comment.username}</Comment.Author>
            <Comment.Metadata>
                <div>{moment(comment.publishTime).fromNow()}</div>
                {/* <div>
                    <Icon name="reply" link />
                </div> */}
            </Comment.Metadata>
            <Comment.Text>
                {comment.content}
            </Comment.Text>
        </Comment.Content>
    </Comment>
);

CommentItem.propTypes = {
    comment: PropTypes.shape().isRequired
};

const CommentList = ({
    top,
    comments,
    onLoadMore,
    loading,
    pageNo,
    pageSize,
    total
}) => {
    if (total === 0 && top.length === 0) {
        return <Empty content="快发表第一个评论吧 ~" />;
    }
    const _topHtml = top.map(c => <CommentItem key={c.id} comment={c} />);
    const _html = comments.map(c => <CommentItem key={c.id} comment={c} />);
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
