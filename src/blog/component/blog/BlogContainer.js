import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Loader } from 'semantic-ui-react';

import BlogItem from './BlogItem';
import Empty from '../common/Empty';

const BlogContainer = ({
    blogs,
    loading,
    onFetch,
    filter,
    more
}) => {
    if (!loading && blogs.length === 0) {
        return <Empty />;
    }
    const blogItemHtml = blogs.map(blog => <BlogItem key={blog.blogId} blog={blog} filter={filter} />);
    return (
        <div className="blog-item-container" style={{ paddingTop: 0 }}>
            {blogItemHtml}
            <Grid>
                <Grid.Column textAlign="center">
                    { loading && <Loader active inline size="small" /> }
                    { !loading && more && <a style={{ cursor: 'pointer' }} onClick={onFetch}>加载更多</a> }
                    { !loading && !more && <Empty /> }
                </Grid.Column>
            </Grid>
        </div>
    );
};

BlogContainer.propTypes = {
    filter: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    more: PropTypes.bool.isRequired,
    blogs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onFetch: PropTypes.func
};
BlogContainer.defaultProps = {
    onFetch: () => {},
    filter: null
};

export default BlogContainer;
