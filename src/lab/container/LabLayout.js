import React, { Component } from 'react';
import { connect } from 'react-redux';

import Head from '../../blog/component/common/Head';
import Header from '../../blog/component/header/Header';
import Config from '../../config/Config';

export default ChildComponent => connect(null, null)(class extends Component {
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
            <ChildComponent key="childComponent" {...this.props} />
        ];
    }
});

