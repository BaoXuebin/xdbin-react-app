import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';

import LoginStore from '../src/mana/store/LoginStore';
import Layout from '../src/blog/container/Layout';
import Uploader from '../src/mana/component/Uploader';

class Test extends Component {
    static async getInitialProps() {
        const global = {
            logo: {
                name: 'quote left',
                text: '测试'
            },
            title: '测试'
        };
        return { global };
    }

    render() {
        return (
            <Uploader />
        );
    }
}

export default withRedux(LoginStore, null, null)(Layout(Test));

