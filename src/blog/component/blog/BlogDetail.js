import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Divider, Header, Grid } from 'semantic-ui-react';

import MarkdownPreview from '../common/MarkdownPreview';
import Tag from '../tag/Tag';
import BlogTime from './BlogTime';
import CommentEditor from '../common/CommentEditor';
import CommentList from '../common/CommentList';

class BlogDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myComment: []
        };
        this.handlePublish = this.handlePublish.bind(this);
    }

    handlePublish(comment) {
        this.setState({ myComment: [comment, ...this.state.myComment] });
    }

    render() {
        const {
            blog,
            loading,
            pageNo,
            pageSize,
            total,
            comments,
            onLoadMore
        } = this.props;
        const {
            blogId,
            title,
            publishTime,
            updateTime,
            tags,
            content
        } = blog;
        const { myComment } = this.state;
        return (
            <Container text className="xd-content">
                <Header as="h2" content={title} />
                <Grid>
                    <Grid.Column width={6}>
                        <BlogTime publishTime={publishTime} updateTime={updateTime} />
                    </Grid.Column>
                    <Grid.Column textAlign="right" width={10}>
                        <Tag tags={tags} />
                    </Grid.Column>
                </Grid>
                <Divider />
                <MarkdownPreview style={{ color: '#293846' }} text={content} />
                <div style={{ height: '60px' }} />
                <Divider />
                <CommentEditor origin={blogId} onPublish={this.handlePublish} />
                <Divider />
                <CommentList
                    top={myComment}
                    comments={comments}
                    onLoadMore={onLoadMore}
                    loading={loading}
                    pageNo={pageNo}
                    pageSize={pageSize}
                    total={total}
                />
            </Container>
        );
    }
}

BlogDetail.propTypes = {
    blog: PropTypes.shape().isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape()),
    pageNo: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    loading: PropTypes.bool,
    onLoadMore: PropTypes.func
};
BlogDetail.defaultProps = {
    comments: [],
    pageNo: 1,
    pageSize: 10,
    total: 0,
    loading: false,
    onLoadMore: () => {}
};

export default BlogDetail;
