import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Dropdown, Divider, Grid } from 'semantic-ui-react';
import withRedux from 'next-redux-wrapper';

import BlogStore from '../src/blog/store/BlogStore';
import { fetchBlogListReq, fetchGroupByMonthly } from '../src/blog/utils/BlogReq';
import Layout from '../src/blog/container/Layout';
import BlogContainer from '../src/blog/component/blog/BlogContainer';

class Blog extends Component {
    static async getInitialProps() {
        const global = {
            thin: true, // 距离顶部 1rem
            page: 1,
            logo: {
                name: 'book',
                text: '笔记'
            },
            search: true
        };
        await fetchBlogListReq({ pageNo: global.page })
            .then((blog) => { global.blog = blog; })
            .catch((e) => { console.log(e); });
        return { global };
    }

    constructor(props) {
        super(props);
        const { blog } = this.props.global;
        this.state = {
            loading: false,
            pageNo: blog.pageNo,
            pageSize: blog.pageSize,
            total: blog.total,
            blogs: blog.content,
            last: blog.last,
            months: [],
            monthly: '全部'
        };
        this.handleChangeMonth = this.handleChangeMonth.bind(this);
        this.handleFetchBlogList = this.handleFetchBlogList.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.keyword !== this.props.keyword) {
            this.handleFetchBlogList({ append: false, pageNo: 1, title: nextProps.keyword });
        }
    }

    componentDidMount() {
        fetchGroupByMonthly()
            .then((res) => {
                this.setState({
                    months: res
                });
            })
            .catch((e) => { console.error(e); });
    }

    handleFetchBlogList({ append = true, pageNo, monthly, title }) {
        title = title || this.props.keyword;
        pageNo = pageNo || this.state.pageNo;
        monthly = monthly || this.state.monthly;
        const month = monthly === '全部' ? '' : this.state.monthly;
        this.setState({ loading: true });
        fetchBlogListReq({ pageNo, month, title })
            .then((blog) => {
                const { content, last, pageNo, pageSize, total } = blog;
                this.setState({
                    blogs: append ? this.state.blogs.concat(content) : content,
                    last, pageNo, pageSize, total
                });
            })
            .catch((e) => { console.log(e); })
            .finally(() => { this.setState({ loading: false }); });
    }

    handleChangeMonth(event, data) {
        if (data.value !== this.state.monthly) {
            this.setState({ monthly: data.value }, () => {
                this.handleFetchBlogList({ append: false, pageNo: 1, monthly: this.state.monthly });
            });
        }
    }

    render() {
        const { keyword } = this.props;
        const { months, monthly, blogs, loading, last, pageNo, total } = this.state;
        const options = months.map(m => ({ key: m.month, value: m.month, text: `${m.month} [${m.count}篇]` }));
        options.unshift({ key: 'all', value: '', text: '全部' });
        return [
            <Container key="condition-dropdown">
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column textAlign="left">
                            <span style={{ marginLeft: '2rem' }}>共 {total} 篇</span>
                        </Grid.Column>
                        <Grid.Column textAlign="right">
                            <Dropdown style={{ marginRight: '2rem' }} text={monthly || '全部'} options={options} onChange={this.handleChangeMonth} />, 
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>,
            <Divider key="divider" />,
            <BlogContainer
                key="BlogContainer"
                loading={loading}
                blogs={blogs}
                onFetch={() => { this.handleFetchBlogList({ append: true, pageNo: pageNo + 1 }); }}
                filter={keyword}
                more={!last}
            />
        ];
    }
}

Blog.propTypes = {
    keyword: PropTypes.string,
    global: PropTypes.shape().isRequired
};
Blog.defaultProps = {
    keyword: null
};

const mapStateToProps = state => ({
    loading: state.blog.loading,
    more: state.blog.more,
    page: state.blog.page,
    blogs: state.blog.blogs,
    error: state.blog.error,
    keyword: state.search.filter
});

export default withRedux(BlogStore, mapStateToProps, null)(Layout(Blog));
