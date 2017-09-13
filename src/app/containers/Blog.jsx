import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Dimmer, Loader, Container } from 'semantic-ui-react';

import { fetchBlogIfNeeded } from '../actions/BlogAction';
import BlogItem from '../components/BlogItem';

class Blog extends PureComponent {
    constructor(props) {
        super(props);
        this.fetchMoreBlog = this.fetchMoreBlog.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchBlogIfNeeded());
    }

    fetchMoreBlog() {
        this.props.dispatch(fetchBlogIfNeeded(true));
    }

    render() {
        const { blogs, theme, loading, more } = this.props;
        const hasBlog = blogs.length > 0;
        const _html = blogs.map(blog => <BlogItem key={blog.blogId} blog={blog} theme={theme} />);
        return (
            <div style={{ minHeight: '600px' }}>
                {
                    loading && !hasBlog ?
                        <Dimmer active inverted={theme === 'day'}>
                            <Loader size="medium">Loading</Loader>
                        </Dimmer> :
                        <div>
                            {_html}
                            {more ? <Grid>
                                <Grid.Column textAlign="center">
                                    {loading ?
                                        <Loader active inline size="small" /> :
                                        <a style={{ cursor: 'pointer' }} onClick={this.fetchMoreBlog}>加载更多</a>
                                    }
                                </Grid.Column>
                            </Grid> : <Container textAlign="center"><span style={{ color: '#9EABB3' }}>#陆止于此，海始于斯#</span></Container>}
                        </div>
                }
            </div>
        );
    }
}

Blog.propTypes = {
    dispatch: PropTypes.func.isRequired,
    blogs: PropTypes.arrayOf(PropTypes.object),
    theme: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    more: PropTypes.bool.isRequired
};
Blog.defaultProps = {
    blogs: [],
    theme: 'day'
};

function mapStateToProps(state) {
    return {
        blogs: state.Blog.blogs,
        loading: state.Blog.loading,
        theme: state.Global.theme,
        more: state.Blog.more // 是否有更多博客
    };
}

export default connect(mapStateToProps)(Blog);
