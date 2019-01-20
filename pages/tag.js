import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { Divider } from 'semantic-ui-react';

import { redirect, fetchAllTagReq, fetchBlogByTagReq } from '../src/blog/utils/TagReq';
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
            const filterTag = global.tags.filter(tag => `${tag.tagId}` === tagId);
            global.selectTag = filterTag && filterTag.length > 0 ? filterTag[0] : null;
        }
        return { global };
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pageNo: 1,
            pageSize: 10,
            total: 0,
            blogs: [],
            last: false
        };
        this.tagId = this.props.global.selectTag ? this.props.global.selectTag.tagId : null;
        this.handleFetchBlogsByTagId = this.handleFetchBlogsByTagId.bind(this);
    }

    componentDidMount() {
        this.handleFetchBlogsByTagId({ append: false, pageNo: 1, tagId: this.tagId });
    }

    handleFetchBlogsByTagId({ append, pageNo, tagId }) {
        this.setState({ loading: true });
        fetchBlogByTagReq(pageNo, tagId)
            .then((blog) => {
                const { content, pageNo, pageSize, last, total } = blog;
                this.setState({
                    blogs: append ? this.state.blogs.concat(content) : content,
                    pageNo, pageSize, last, total
                });
                console.log(blog);
            })
            .catch(() => { redirect(ctx.res); })
            .finally(() => { this.setState({ loading: false }); });
    }

    render() {
        const { tags, selectTag } = this.props.global;
        const { blogs, last, loading } = this.state;
        return [
            <TagPool key="tagPool" tags={tags} selectTag={selectTag} />,
            <Divider key="blogDivider" />,
            <BlogContainer
                key="BlogContainer"
                blogs={blogs}
                loading={loading}
                onFetch={() => { this.handleFetchBlogsByTagId({ append: true, pageNo: pageNo + 1, tagId: this.tagId }); }}
                more={!last}
            />
        ];
    }
}

Tag.propTypes = {
    global: PropTypes.shape().isRequired
};

export default withRedux(TagStore, null, null)(Layout(Tag));
