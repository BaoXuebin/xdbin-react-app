import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Loader } from 'semantic-ui-react';

import StarItem from './StarItem';
import Empty from '../../../blog/component/common/Empty';

const StarContainer = ({
    blogs,
    loading,
    onFetch,
    more
}) => {
    if (!loading && blogs.length === 0) {
        return <Empty />;
    }
    const blogItemHtml = blogs.map(blog => <StarItem key={blog.uid} blog={blog} />);
    return (
        <div style={{ marginTop: '1rem' }}>
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

StarContainer.propTypes = {
    loading: PropTypes.bool.isRequired,
    more: PropTypes.bool.isRequired,
    blogs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onFetch: PropTypes.func
};
StarContainer.defaultProps = {
    onFetch: () => {}
};

export default StarContainer;
