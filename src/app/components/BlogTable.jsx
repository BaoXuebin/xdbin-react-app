import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Icon, Button, Modal } from 'semantic-ui-react';
import moment from 'moment';
import {
    withRouter
} from 'react-router-dom';

import { deleteBlogById, updateBlogPubById } from '../actions/BlogAction';

class BlogTable extends Component {
    constructor(props) {
        super(props);
        // open: 控制 modal 的显示与隐藏
        // blog: 当前操作的 blog
        this.state = { open: false, blog: {} };
        this.onDeleteBlog = this.onDeleteBlog.bind(this);
        this.onUpdateBlog = this.onUpdateBlog.bind(this);
        this.onShowBlog = this.onShowBlog.bind(this);
        this.onHideBlog = this.onHideBlog.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    onDeleteBlog() {
        const { dispatch, history } = this.props;
        dispatch(deleteBlogById(this.state.blog.blogId, history));
        this.onCloseModal();
    }

    onUpdateBlog(blogId) {
        // console.log(blogId);
        this.props.history.push(`/blog/update/${blogId}`);
    }

    onShowBlog(blogId) {
        const { dispatch, history } = this.props;
        dispatch(updateBlogPubById(blogId, 'pub', history));
    }

    onHideBlog(blogId) {
        const { dispatch, history } = this.props;
        dispatch(updateBlogPubById(blogId, 'pvt', history));
    }

    onCloseModal() {
        this.setState({ open: false });
    }

    render() {
        const blogs = this.props.blogs;
        const empty = !(blogs && blogs.length > 0);
        const _html = empty ?
            <Table.Row colSpan="4"><Table.Cell textAlign="center">暂无相关内容</Table.Cell></Table.Row> :
            blogs.map(blog => (
                <BlogTr
                    key={blog.blogId}
                    blog={blog}
                    onUpdate={() => this.onUpdateBlog(blog.blogId)}
                    onPub={() => this.onShowBlog(blog.blogId)}
                    onHide={() => this.onHideBlog(blog.blogId)}
                    onDelete={() => this.setState({ open: true, blog })}
                />));
        return (
            <div style={{ margin: '1rem 0' }}>
                <Table color="orange">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>ID</Table.HeaderCell>
                            <Table.HeaderCell width={6}>标题</Table.HeaderCell>
                            <Table.HeaderCell width={2}>日期</Table.HeaderCell>
                            <Table.HeaderCell width={3}>操作</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_html}
                    </Table.Body>
                </Table>
                <Modal size="mini" open={this.state.open} onClose={this.onCloseModal}>
                    <Modal.Header>
                        删除？
                    </Modal.Header>
                    <Modal.Content>
                        <p>确定删除 <Icon name="file text" />「{this.state.blog.title}」博客？</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.onCloseModal}>
                            No
                        </Button>
                        <Button positive icon="checkmark" labelPosition="right" content="Yes" onClick={this.onDeleteBlog} />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

function BlogTr({ blog, onDelete, onUpdate, onPub, onHide }) {
    const { shortBlogId, publishDate, pub, title } = blog;
    return (
        <Table.Row>
            <Table.Cell>{shortBlogId}</Table.Cell>
            <Table.Cell>{title}</Table.Cell>
            <Table.Cell>{moment(publishDate).format('MM.DD.YYYY')}</Table.Cell>
            <Table.Cell>
                <Button.Group>
                    <Button icon="pencil" onClick={onUpdate} />
                    { pub ? <Button icon="hide" onClick={onHide} /> : <Button icon="eye" onClick={onPub} /> }
                    <Button icon="delete" onClick={onDelete} />
                </Button.Group>
            </Table.Cell>
        </Table.Row>
    );
}

BlogTr.propTypes = {
    blog: PropTypes.shape().isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onPub: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired
};

BlogTable.propTypes = {
    blogs: PropTypes.arrayOf(PropTypes.shape()),
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape()
};
BlogTable.defaultProps = {
    blogs: [],
    history: {}
};

export default withRouter(connect()(BlogTable));
