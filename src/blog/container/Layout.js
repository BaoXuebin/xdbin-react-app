import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Grid, Divider } from 'semantic-ui-react';

import Head from '../component/common/Head';
import Header from '../component/header/Header';
import Footer from '../component/common/Footer';
import Config from '../../config/Config';

export default ChildComponent => connect(null, null)(class extends Component {
    // static propTypes = {
    //     global: PropTypes.shape().isRequired
    // };

    static async getInitialProps(ctx) {
        const global = {};
        if (ctx.req) {
            // 这里做登录验证
        }
        if (ChildComponent.getInitialProps) {
            const props = await ChildComponent.getInitialProps(ctx);
            return { global, ...props };
        }
        return { global };
    }

    render() {
        const global = this.props.global || {};
        return [
            <Head key="head" title={global.title || Config.title} />,
            <Header key="header" logo={global.logo || null} search={global.search || false} />,
            <Grid centered key="body" style={{ margin: '-1rem 0' }}>
                <Grid.Column computer={10} plant={13} mobile={16} className="xd-body">
                    <ChildComponent {...this.props} />
                    <Divider />
                    <Footer />
                </Grid.Column>
            </Grid>
        ];
    }
});
