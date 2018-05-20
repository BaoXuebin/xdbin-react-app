import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import EditStore from '../../src/mana/store/EditStore';
import { redirect, fetchAllTagReq } from '../../src/blog/utils/TagReq';
import Layout from '../../src/blog/container/Layout';
import EditContainer from '../../src/mana/container/EditContainer';
import { initEditBlog, initTags } from '../../src/mana/action/EditAction';

class AddBlog extends Component {
    static async getInitialProps({
        res
    }) {
        const global = {
            title: '新增笔记',
            logo: {
                name: 'plus',
                text: '新增笔记'
            }
        };
        await fetchAllTagReq()
            .then((tags) => { global.tags = tags; })
            .catch(() => { redirect(res); });
        return { global };
    }

    constructor(props) {
        super(props);
        this.blog = {
            title: '这里填写标题',
            summary: '',
            content: '',
            tags: [],
            ifPub: true
        };
    }

    componentWillMount() {
        this.props.initEditBlog(this.blog);
        this.props.initTags(this.props.global.tags);
    }

    render() {
        return (
            <EditContainer blog={this.blog} add />
        );
    }
}

AddBlog.propTypes = {
    global: PropTypes.shape().isRequired,
    initEditBlog: PropTypes.func.isRequired,
    initTags: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    initEditBlog: bindActionCreators(initEditBlog, dispatch),
    initTags: bindActionCreators(initTags, dispatch)
});


export default withRedux(EditStore, null, mapDispatchToProps)(Layout(AddBlog));
