import React, { PureComponent } from 'react';
import withRedux from 'next-redux-wrapper';

import ManaTagStore from '../../src/mana/store/ManaTagStore';
import AuthLayout from '../../src/mana/wrapper/AuthLayout';

class Tag extends PureComponent {
    static getInitialProps() {
        const global = {
            logo: {
                name: 'tag',
                text: '标签管理'
            },
            title: '标签管理',
            active: 'tag'
        };
        return { global };
    }

    render() {
        return (
            <div>
                标签管理
            </div>
        );
    }
}

export default withRedux(ManaTagStore, null, null)(AuthLayout(Tag));
