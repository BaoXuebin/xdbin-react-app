import React, { Component } from 'react';
import moment from 'moment';

import BlogTable from '../components/BlogTable';

class Manager extends Component {
    componentWillMount() {
        // 加载博客列表
    }

    render() {
        const blogs = [
            {
                id: 'asd2ds',
                title: '测试一',
                publishTime: moment().format('MM.DD.YYYY')
            },
            {
                id: '1sdd3s',
                title: '测试二',
                publishTime: moment().format('MM.DD.YYYY')
            }
        ];
        return (
            <BlogTable blogs={blogs} />
        );
    }
}

export default Manager;
