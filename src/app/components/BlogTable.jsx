import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react';

class BlogTr extends Component {
    constructor(props) {
        super(props);
        this.state = { willDelete: false };
        this.id = null;
        this.edit = this.edit.bind(this);
        this.togglePub = this.togglePub.bind(this);
        this.willDelete = this.willDelete.bind(this);
    }

    edit() {

    }

    togglePub() {

    }

    // 预删除
    willDelete() {

    }

    render() {
        const { id, title, publishTime } = this.props.blog;
        this.id = id;
        return (
            <Table.Row>
                <Table.Cell>{id}</Table.Cell>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{publishTime}</Table.Cell>
                <Table.Cell>
                    <Icon name="pencil" title="编辑" link />
                    <Icon name="hide" title="隐藏" link />
                    <Icon name="delete" title="删除" link />
                </Table.Cell>
            </Table.Row>
        );
    }
}

BlogTr.propTypes = {
    blog: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        publishTime: PropTypes.string.isRequired
    }).isRequired
};

const BlogTable = ({ blogs }) => (
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
            {blogs.map(blog => <BlogTr key={blog.blogId} blog={blog} />)}
        </Table.Body>
    </Table>
);

BlogTable.propTypes = {
    blogs: PropTypes.arrayOf()
};
BlogTable.defaultProps = {
    blogs: []
};

export default BlogTable;
