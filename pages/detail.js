import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import BlogStore from '../src/blog/store/BlogStore';
import { redirect, fetchBlogDetailReq } from '../src/blog/utils/BlogReq';
import Layout from '../src/blog/container/Layout';
import BlogDetail from '../src/blog/component/blog/BlogDetail';

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
        return { global };
    }

    render() {
        const { blog } = this.props.global;
        return (
            <BlogDetail
                blog={blog}
            />
        );
    }
}

Detail.propTypes = {
    global: PropTypes.shape().isRequired
};

export default withRedux(BlogStore, null, null)(Layout(Detail));
