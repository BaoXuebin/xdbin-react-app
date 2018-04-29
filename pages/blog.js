import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import BlogStore from '../src/blog/store/BlogStore';
import { fetchBlogListIfNeeded, initBlogs } from '../src/blog/action/BlogAction';
import { redirect, fetchBlogListReq } from '../src/blog/utils/BlogReq';
import Layout from '../src/blog/container/Layout';
import BlogContainer from '../src/blog/component/blog/BlogContainer';

class Blog extends Component {
    static async getInitialProps(ctx) {
        const global = {
            page: 1,
            logo: {
                name: 'book',
                text: '笔记'
            },
            search: true
        };
        await fetchBlogListReq(global.page)
            .then((blogs) => { global.blogs = blogs; })
            .catch((e) => { console.log(e); });
        return { global };
    }

    constructor(props) {
        super(props);
        this.handleFetchMoreBlog = this.handleFetchMoreBlog.bind(this);
    }

    componentWillMount() {
        const { blogs } = this.props.global;
        this.props.initBlogs(blogs);
    }

    handleFetchMoreBlog() {
        const { page } = this.props;
        this.props.fetchBlogListIfNeeded(page + 1, true);
    }

    render() {
        const {
            loading,
            blogs,
            keyword,
            more
        } = this.props;
        return (
            <BlogContainer
                loading={loading}
                blogs={blogs}
                onFetch={this.handleFetchMoreBlog}
                filter={keyword}
                more={more}
            />
        );
    }
}

Blog.propTypes = {
    keyword: PropTypes.string,
    global: PropTypes.shape().isRequired,
    loading: PropTypes.bool.isRequired,
    more: PropTypes.bool.isRequired,
    page: PropTypes.number.isRequired,
    blogs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    fetchBlogListIfNeeded: PropTypes.func.isRequired,
    initBlogs: PropTypes.func.isRequired
};
Blog.defaultProps = {
    keyword: null
};

const mapStateToProps = state => ({
    loading: state.blog.loading,
    more: state.blog.more,
    page: state.blog.page,
    blogs: state.blog.blogs,
    error: state.blog.error,
    keyword: state.search.filter
});

const mapDispatchToProps = dispatch => ({
    initBlogs: bindActionCreators(initBlogs, dispatch),
    fetchBlogListIfNeeded: bindActionCreators(fetchBlogListIfNeeded, dispatch)
});

export default withRedux(BlogStore, mapStateToProps, mapDispatchToProps)(Layout(Blog));
