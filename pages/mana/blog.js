import React, { PureComponent } from 'react';
import withRedux from 'next-redux-wrapper';

import ManaStore from '../../src/mana/store/ManaStore';
import AuthLayout from '../../src/mana/wrapper/AuthLayout';
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

    render() {
        return (
            <div>
                <BlogTable />
            </div>
        );
    }
}

export default withRedux(ManaStore, null, null)(AuthLayout(Blog));
