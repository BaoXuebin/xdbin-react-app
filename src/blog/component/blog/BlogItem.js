import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Divider } from 'semantic-ui-react';

import MarkdownPreview from '../common/MarkdownPreview';
import Tag from '../tag/Tag';
import BlogTime from './BlogTime';

const BlogItem = ({ blog, filter }) => {
    const {
        blogId,
        publishTime,
        updateTime,
        tags,
        summary
    } = blog;
    const title = filter ? blog.title.replace(new RegExp(filter, 'g'), `<span style="color: white; background-color: red;">${filter}</span>`) : blog.title;
    return (
        <Container text>
            <h2>
                <a href={`/blog/${blogId}`} style={{ color: 'black' }} target="_blank" dangerouslySetInnerHTML={{ __html: title }} />
            </h2>
            <MarkdownPreview style={{ color: '#293846' }} text={summary} />
            <div style={{ height: '.6rem' }} />
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column textAlign="left" width={6}>
                        <BlogTime publishTime={publishTime} updateTime={updateTime} />
                    </Grid.Column>
                    <Grid.Column textAlign="right" width={10}>
                        <Tag tags={tags} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Divider />
        </Container>
    );
};

BlogItem.propTypes = {
    blog: PropTypes.shape({
        blogId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        publishTime: PropTypes.number.isRequired,
        updateTime: PropTypes.number.isRequired,
        summary: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.shape())
    }).isRequired,
    filter: PropTypes.string
};
BlogItem.defaultProps = {
    filter: null
};

export default BlogItem;
