import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import BlogStore from '../src/blog/store/BlogStore';
import { redirect, fetchBlogDetailReq } from '../src/blog/utils/BlogReq';
import Layout from '../src/blog/container/Layout';
import BlogDetail from '../src/blog/component/blog/BlogDetail';
import { fetchBlogCommentReq } from '../src/blog/utils/CommentReq';

class Detail extends Component {
    static async getInitialProps({ query, res }) {
        const global = {
            logo: {
                name: 'book',
                text: '笔记'
            }
        };
        await fetchBlogDetailReq(query.blogId)
            .then((blog) => { global.blog = blog; global.title = blog.title; })
            .catch(() => redirect(res));
        // 获取该页面的评论
        await fetchBlogCommentReq(query.blogId)
            .then((comment) => { global.comment = comment; })
            .catch(() => redirect(res));
        return { global };
    }

    constructor(props) {
        super(props);
        const { blog, comment } = this.props.global;
        this.state = {
            blogId: blog.blogId,
            loading: false,
            pageNo: comment.pageNo + 1,
            pageSize: comment.pageSize,
            total: comment.total,
            comments: comment.content
        };
        this.handleLoadMoreComment = this.handleLoadMoreComment.bind(this);
    }

    handleLoadMoreComment() {
        this.setState({ loading: true });
        fetchBlogCommentReq(this.state.blogId, this.state.pageNo + 1)
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
        const { blog } = this.props.global;
        const {
            loading,
            pageNo,
            pageSize,
            total,
            comments
        } = this.state;
        return (
            <BlogDetail
                blog={blog}
                comments={comments}
                onLoadMore={this.handleLoadMoreComment}
                loading={loading}
                pageNo={pageNo}
                pageSize={pageSize}
                total={total}
            />
        );
    }
}

Detail.propTypes = {
    global: PropTypes.shape().isRequired
};

export default withRedux(BlogStore, null, null)(Layout(Detail));
