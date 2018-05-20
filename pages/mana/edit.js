import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import EditStore from '../../src/mana/store/EditStore';
import { nologin } from '../../src/utils/Req';
import { fetchEditBlogDetailReq } from '../../src/mana/util/ManaReq';
import { redirect, fetchAllTagReq } from '../../src/blog/utils/TagReq';
import Layout from '../../src/blog/container/Layout';
import EditContainer from '../../src/mana/container/EditContainer';
import { initEditBlog, initTags } from '../../src/mana/action/EditAction';

class Edit extends Component {
    static async getInitialProps({
        query,
        req,
        res,
        asPath
    }) {
        const global = {
            logo: {
                name: 'edit',
                text: '笔记编辑'
            }
        };
        await fetchEditBlogDetailReq(req.headers.cookie, query.blogId)
            .then((blog) => { global.blog = blog; global.title = blog.title; })
            .catch(() => nologin(res, asPath));
        await fetchAllTagReq()
            .then((tags) => { global.tags = tags; })
            .catch(() => { redirect(res); });
        return { global };
    }

    componentWillMount() {
        this.props.initEditBlog(this.props.global.blog);
        this.props.initTags(this.props.global.tags);
    }

    render() {
        const { blog } = this.props.global;
        return (
            <EditContainer blog={blog} />
        );
    }
}

Edit.propTypes = {
    global: PropTypes.shape().isRequired,
    initEditBlog: PropTypes.func.isRequired,
    initTags: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    initEditBlog: bindActionCreators(initEditBlog, dispatch),
    initTags: bindActionCreators(initTags, dispatch)
});


export default withRedux(EditStore, null, mapDispatchToProps)(Layout(Edit));
