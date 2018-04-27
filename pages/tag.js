import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { Divider } from 'semantic-ui-react';

import { redirect, fetchAllTagReq, fetchBlogByTagReq } from '../src/blog/utils/TagReq';
import { fetchBlogByTagIfNeeded, initBlogs } from '../src/blog/action/TagAction';
import TagStore from '../src/blog/store/TagStore';
import Layout from '../src/blog/container/Layout';
import TagPool from '../src/blog/component/tag/TagPool';
import BlogContainer from '../src/blog/component/blog/BlogContainer';

class Tag extends Component {
    static async getInitialProps(ctx) {
        const tagId = ctx.query && ctx.query.tag ? ctx.query.tag : null;
        const global = {
            title: '「标签」',
            logo: {
                name: 'puzzle',
                text: '标签'
            },
            blogs: []
        };
        await fetchAllTagReq()
            .then((tags) => { global.tags = tags; })
            .catch(() => { redirect(ctx.res); });
        if (tagId) {
            await fetchBlogByTagReq(1, tagId)
                .then((blogs) => { global.blogs = blogs; })
                .catch(() => { redirect(ctx.res); });
            const filterTag = global.tags.filter(tag => `${tag.tagId}` === tagId);
            global.selectTag = filterTag && filterTag.length > 0 ? filterTag[0] : null;
        }
        return { global };
    }

    constructor(props) {
        super(props);
        this.tagId = this.props.global.selectTag ? this.props.global.selectTag.tagId : null;
        this.handleFetchMoreBlog = this.handleFetchMoreBlog.bind(this);
    }

    componentWillMount() {
        const { blogs } = this.props.global;
        this.props.initBlogs(blogs);
    }

    handleFetchMoreBlog() {
        if (this.tagId) {
            const { page } = this.props;
            this.props.fetchBlogByTagIfNeeded(page + 1, this.tagId);
        }
    }

    render() {
        const { tags, selectTag } = this.props.global;
        const { blogs, more, loading } = this.props;
        return [
            <TagPool key="tagPool" tags={tags} selectTag={selectTag} />,
            <Divider key="blogDivider" />,
            <BlogContainer
                key="BlogContainer"
                blogs={blogs}
                loading={loading}
                onFetch={this.handleFetchMoreBlog}
                more={more}
            />
        ];
    }
}

Tag.propTypes = {
    global: PropTypes.shape().isRequired,
    page: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    more: PropTypes.bool.isRequired,
    blogs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    fetchBlogByTagIfNeeded: PropTypes.func.isRequired,
    initBlogs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    loading: state.tag.loading,
    more: state.tag.more,
    page: state.tag.page,
    blogs: state.tag.blogs,
    error: state.tag.error
});

const mapDispatchToProps = dispatch => ({
    initBlogs: bindActionCreators(initBlogs, dispatch),
    fetchBlogByTagIfNeeded: bindActionCreators(fetchBlogByTagIfNeeded, dispatch)
});

export default withRedux(TagStore, mapStateToProps, mapDispatchToProps)(Layout(Tag));
