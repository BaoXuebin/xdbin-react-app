import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';

import { fetchBlogIfNeeded } from '../actions/BlogAction';
import BlogItem from '../components/BlogItem';

class Blog extends PureComponent {
    componentWillMount() {
        this.props.dispatch(fetchBlogIfNeeded());
    }

    render() {
        const { blogs, theme } = this.props;
        const _html = blogs.map(blog => <BlogItem key={blog.blogId} blog={blog} theme={theme} />);
        return (
            <div>
                {_html}
                <Grid columns="equal">
                    <Grid.Column textAlign="right">
                        <Button color="green" content="上一页" />
                    </Grid.Column>
                    <Grid.Column textAlign="left">
                        <Button color="green" content="下一页" />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

Blog.propTypes = {
    dispatch: PropTypes.func.isRequired,
    blogs: PropTypes.arrayOf(PropTypes.object),
    theme: PropTypes.string
};
Blog.defaultProps = {
    blogs: [],
    loading: true,
    theme: 'day'
};

function mapStateToProps(state) {
    return {
        blogs: state.Blog.blogs,
        loading: state.Blog.loading,
        theme: state.Global.theme
    };
}

export default connect(mapStateToProps)(Blog);
