import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import ManaBlogStore from '../../src/mana/store/ManaBlogStore';
import AuthLayout from '../../src/mana/wrapper/AuthLayout';
import { fetchAllBlogIfNeeded } from '../../src/mana/action/ManaBlogAction';
import BlogTable from '../../src/mana/component/BlogTable';

class Blog extends PureComponent {
    static getInitialProps() {
        const global = {
            logo: {
                name: 'file',
                text: '笔记管理'
            },
            title: '笔记管理',
            active: 'blog'
        };
        return { global };
    }

    componentDidMount() {
        this.props.fetchAllBlogIfNeeded(1);
    }

    render() {
        return (
            <div>
                <BlogTable />
            </div>
        );
    }
}

Blog.propTypes = {
    fetchAllBlogIfNeeded: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    fetchAllBlogIfNeeded: bindActionCreators(fetchAllBlogIfNeeded, dispatch)
});


export default withRedux(ManaBlogStore, null, mapDispatchToProps)(AuthLayout(Blog));
