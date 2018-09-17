import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { Divider } from 'semantic-ui-react';

import LabStore from '../../src/blog/store/LabStore';
import Layout from '../../src/blog/container/Layout';
import CommentEditor from '../../src/blog/component/comment/CommentEditor';
import { href } from '../../src/utils/Req';
import CommentList from '../../src/blog/component/comment/CommentList';
import { fetchBlogCommentReq, redirect } from '../../src/blog/utils/CommentReq';

class Message extends Component {
    static async getInitialProps({ res }) {
        const global = {
            page: 1,
            logo: {
                name: 'comment alternate',
                text: '留言板'
            },
            title: '「留言板」'
        };
        await fetchBlogCommentReq('xdbin.com')
            .then((comment) => { global.comment = comment; })
            .catch(() => redirect(res));
        return { global };
    }

    constructor(props) {
        super(props);
        const { comment } = this.props.global;
        this.state = {
            myComment: [],
            replyId: null,
            loading: false,
            pageNo: comment.pageNo + 1,
            pageSize: comment.pageSize,
            total: comment.total,
            comments: comment.content
        };
        this.handlePublish = this.handlePublish.bind(this);
        this.handleReply = this.handleReply.bind(this);
        this.handleLoadMoreComment = this.handleLoadMoreComment.bind(this);
    }

    handlePublish(comment) {
        this.setState({ myComment: [comment, ...this.state.myComment] });
    }

    handleReply(replyId) {
        this.setState({ replyId }, () => {
            href('#reply-comment');
        });
    }

    handleLoadMoreComment() {
        this.setState({ loading: true });
        fetchBlogCommentReq('xdbin.com', this.state.pageNo + 1)
            .then((result) => {
                const {
                    pageNo,
                    pageSize,
                    total,
                    content
                } = result;
                this.setState({
                    pageNo: pageNo + 1,
                    pageSize,
                    total,
                    comments: this.state.comments.concat(content)
                });
            })
            .catch((e) => { console.log(e); });
    }

    render() {
        const {
            myComment,
            replyId,
            loading,
            pageNo,
            pageSize,
            total,
            comments
        } = this.state;
        return (
            <div>
                <CommentEditor origin="xdbin.com" onPublish={this.handlePublish} replyId={replyId} />
                <Divider />
                <CommentList
                    top={myComment}
                    comments={comments}
                    loading={loading}
                    pageNo={pageNo}
                    pageSize={pageSize}
                    total={total}
                    onReply={this.handleReply}
                    onLoadMore={this.handleLoadMoreComment}
                />
            </div>
        );
    }
}

Message.propTypes = {
    global: PropTypes.shape().isRequired
};

export default withRedux(LabStore, null, null)(Layout(Message));
