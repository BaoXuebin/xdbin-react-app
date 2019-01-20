import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';

import StarStore from '../../src/lab/store/StarStore';
import Layout from '../../src/blog/container/Layout';
import StarContainer from '../../src/lab/component/star/StarContainer';
import Info from '../../src/lab/component/star/Info';
import { fetchStarBlogsReq } from '../../src/lab/utils/StarBlogReq';
import { Divider } from 'semantic-ui-react';

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

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            blogs: [],
            total: 0,
            pageNo: 1,
            pageSize: 10,
            last: false
        };
        this.handleFetchStarBlogList = this.handleFetchStarBlogList.bind(this);
        this.handleChangeOrigin = this.handleChangeOrigin.bind(this);
    }

    componentDidMount() {
        this.handleFetchStarBlogList({ append: false, pageNo: 1 });
    }

    handleFetchStarBlogList({ append, pageNo, origin }) {
        this.setState({ loading: true });
        fetchStarBlogsReq({ page: pageNo, origin })
            .then((blog) => {
                const { content, last, number, size, totalElements } = blog;
                this.setState({
                    blogs: append ? this.state.blogs.concat(content) : content,
                    pageNo: number + 1,
                    pageSize: size,
                    total: totalElements,
                    last
                });
            })
            .catch((e) => { console.error(e); })
            .finally(() => { this.setState({ loading: false }); });
    }

    handleChangeOrigin(origin) {
        this.setState({ origin }, () => {
            this.handleFetchStarBlogList({ append: false, pageNo: 1, origin });
        });
    }

    render() {
        const { origin, pageNo, last, loading, blogs } = this.state;
        return [
            <Info key="info" origin={origin} onChangeOrigin={this.handleChangeOrigin} />,
            <Divider key="divider" />,
            <StarContainer
                key="starContainer"
                blogs={blogs}
                onFetch={() => { this.handleFetchStarBlogList({ append: true, pageNo: pageNo + 1, origin }); }}
                loading={loading}
                more={!last}
            />
        ];
    }
}

export default withRedux(StarStore, null, null)(Layout(Star));
