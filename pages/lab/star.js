import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import StarStore from '../../src/lab/store/StarStore';
import Layout from '../../src/blog/container/Layout';
import StarContainer from '../../src/lab/component/star/StarContainer';
import Info from '../../src/lab/component/star/Info';
import { fetchStarBlogIfNeeded } from '../../src/lab/action/StarAction';

class Star extends Component {
    static async getInitialProps() {
        const global = {
            logo: {
                name: 'feed',
                text: '知无涯'
            },
            title: '「知无涯」'
        };
        return { global };
    }

    componentDidMount() {
        this.props.fetchStarBlogIfNeeded();
    }

    render() {
        const { blogs, loading, more } = this.props;
        return [
            <Info key="info" />,
            <StarContainer
                key="starContainer"
                blogs={blogs}
                onFetch={this.props.fetchStarBlogIfNeeded}
                loading={loading}
                more={more}
            />
        ];
    }
}

Star.propTypes = {
    blogs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    loading: PropTypes.bool.isRequired,
    more: PropTypes.bool.isRequired,
    fetchStarBlogIfNeeded: PropTypes.func.isRequired
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    fetchStarBlogIfNeeded: bindActionCreators(fetchStarBlogIfNeeded, dispatch)
});

export default withRedux(StarStore, mapStateToProps, mapDispatchToProps)(Layout(Star));
