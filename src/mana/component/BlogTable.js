import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Button, Icon } from 'semantic-ui-react';

import Pager from './Pager';
import {
    fetchAllBlogIfNeeded,
    changeCurrentPage,
    toggleBlogPub,
    showDelBlogModal,
    hideDelBlogModal,
    delBlogIfNeeded
} from '../action/ManaBlogAction';
import ModalWrapper from '../wrapper/ModalWrapper';

const BlogTableItem = ({
    blog,
    onPub,
    onPvt,
    onDel
}) => {
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
                    <Button icon="delete" onClick={onDel} />
                </Button.Group>
            </Table.Cell>
        </Table.Row>
    );
};

BlogTableItem.propTypes = {
    blog: PropTypes.shape().isRequired,
    onPub: PropTypes.func.isRequired,
    onPvt: PropTypes.func.isRequired,
    onDel: PropTypes.func.isRequired
};

class BlogTable extends PureComponent {
    constructor(props) {
        super(props);
        this.delBlog = {};
        this.handlePubBlog = this.handlePubBlog.bind(this);
        this.handlePvtBlog = this.handlePvtBlog.bind(this);
        this.handleDeleteBlog = this.handleDeleteBlog.bind(this);
    }

    componentDidMount() {
        if (this.props.blogs.length <= 0) {
            this.props.fetchAllBlogIfNeeded(1);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { current, delBlogId, blogs } = nextProps;
        if (current !== this.props.current && this.props.current !== 0) {
            this.props.fetchAllBlogIfNeeded(current);
        }
        if (delBlogId !== this.props.delBlogId) {
            const [blog] = blogs.filter(b => delBlogId === b.blogId);
            this.delBlog = blog || {};
        }
    }

    handlePubBlog(blogId) {
        this.props.toggleBlogPub(blogId, 'pub');
    }

    handlePvtBlog(blogId) {
        this.props.toggleBlogPub(blogId, 'pvt');
    }

    handleDeleteBlog() {
        if (this.props.delBlogId) {
            this.props.delBlogIfNeeded(this.props.delBlogId);
        }
    }

    render() {
        const {
            blogs,
            total,
            current,
            modal
        } = this.props;
        const _html = blogs.map(blog => (
            <BlogTableItem
                key={blog.blogId}
                blog={blog}
                onPub={() => { this.handlePubBlog(blog.blogId); }}
                onPvt={() => { this.handlePvtBlog(blog.blogId); }}
                onDel={() => { this.props.showDelBlogModal(blog.blogId); }}
            />
        ));
        return [
            <Table key="blog-table" celled>
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
            </Table>,
            <ModalWrapper
                key="blog-del-modal"
                open={modal}
                onClose={this.props.hideDelBlogModal}
                title="删除？"
                content={(<p>确定删除 <Icon name="file" />「{this.delBlog.title}」笔记？</p>)}
                onPositive={this.handleDeleteBlog}
            />
        ];
    }
}

BlogTable.propTypes = {
    modal: PropTypes.bool.isRequired,
    blogs: PropTypes.arrayOf(PropTypes.shape()),
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    delBlogId: PropTypes.string,
    changeCurrentPage: PropTypes.func.isRequired,
    fetchAllBlogIfNeeded: PropTypes.func.isRequired,
    toggleBlogPub: PropTypes.func.isRequired,
    showDelBlogModal: PropTypes.func.isRequired,
    hideDelBlogModal: PropTypes.func.isRequired,
    delBlogIfNeeded: PropTypes.func.isRequired
};
BlogTable.defaultProps = {
    blogs: [],
    delBlogId: null
};

const mapStateToProps = state => ({
    blogs: state.blog.blogs,
    total: state.blog.total,
    current: state.blog.current,
    modal: state.blog.modal,
    delBlogId: state.blog.delBlogId
});

const mapDispatchToProps = dispatch => ({
    changeCurrentPage: bindActionCreators(changeCurrentPage, dispatch),
    fetchAllBlogIfNeeded: bindActionCreators(fetchAllBlogIfNeeded, dispatch),
    toggleBlogPub: bindActionCreators(toggleBlogPub, dispatch),
    showDelBlogModal: bindActionCreators(showDelBlogModal, dispatch),
    hideDelBlogModal: bindActionCreators(hideDelBlogModal, dispatch),
    delBlogIfNeeded: bindActionCreators(delBlogIfNeeded, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(BlogTable);
