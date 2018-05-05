import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Button } from 'semantic-ui-react';

import Pager from './Pager';
import { fetchAllBlogIfNeeded, changeCurrentPage, toggleBlogPub } from '../action/ManaBlogAction';

const BlogTableItem = ({ blog, onPub, onPvt }) => {
    const {
        blogId,
        title,
        updateTime,
        ifPub
    } = blog;
    return (
        <Table.Row>
            <Table.Cell width={2}>{String(blogId).slice(-6)}</Table.Cell>
            <Table.Cell width={8}>{title}</Table.Cell>
            <Table.Cell width={3}>{moment(updateTime).format('MM.DD.YYYY')}</Table.Cell>
            <Table.Cell width={3}>
                <Button.Group basic>
                    <Button icon="edit" />
                    { ifPub === 1 ? <Button icon="eye" onClick={onPvt} /> : <Button icon="hide" onClick={onPub} /> }
                    <Button icon="delete" />
                </Button.Group>
            </Table.Cell>
        </Table.Row>
    );
};

BlogTableItem.propTypes = {
    blog: PropTypes.shape().isRequired,
    onPub: PropTypes.func.isRequired,
    onPvt: PropTypes.func.isRequired
};

class BlogTable extends PureComponent {
    constructor(props) {
        super(props);
        this.handlePubBlog = this.handlePubBlog.bind(this);
        this.handlePvtBlog = this.handlePvtBlog.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { current } = nextProps;
        if (current !== this.props.current && this.props.current !== 0) {
            this.props.fetchAllBlogIfNeeded(current);
        }
    }

    handlePubBlog(blogId) {
        this.props.toggleBlogPub(blogId, 'pub');
    }

    handlePvtBlog(blogId) {
        this.props.toggleBlogPub(blogId, 'pvt');
    }

    render() {
        const { blogs, total, current } = this.props;
        const _html = blogs.map(blog => (
            <BlogTableItem
                key={blog.blogId}
                blog={blog}
                onPub={() => { this.handlePubBlog(blog.blogId); }}
                onPvt={() => { this.handlePvtBlog(blog.blogId); }}
            />
        ));
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>标题</Table.HeaderCell>
                        <Table.HeaderCell>时间</Table.HeaderCell>
                        <Table.HeaderCell>操作</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {_html}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Pager total={total} current={current} onChange={this.props.changeCurrentPage} />
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

BlogTable.propTypes = {
    blogs: PropTypes.arrayOf(PropTypes.shape()),
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    changeCurrentPage: PropTypes.func.isRequired,
    fetchAllBlogIfNeeded: PropTypes.func.isRequired,
    toggleBlogPub: PropTypes.func.isRequired
};
BlogTable.defaultProps = {
    blogs: []
};

const mapStateToProps = state => ({
    blogs: state.blog.blogs,
    total: state.blog.total,
    current: state.blog.current
});

const mapDispatchToProps = dispatch => ({
    changeCurrentPage: bindActionCreators(changeCurrentPage, dispatch),
    fetchAllBlogIfNeeded: bindActionCreators(fetchAllBlogIfNeeded, dispatch),
    toggleBlogPub: bindActionCreators(toggleBlogPub, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(BlogTable);
