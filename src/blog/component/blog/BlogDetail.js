import React from 'react';
import PropTypes from 'prop-types';
import { Container, Divider, Header, Grid } from 'semantic-ui-react';

import MarkdownPreview from '../common/MarkdownPreview';
import Tag from '../tag/Tag';
import BlogTime from './BlogTime';

const BlogDetail = ({ blog }) => {
    const {
        title,
        publishTime,
        updateTime,
        tags,
        content
    } = blog;
    return (
        <Container text className="xd-content">
            <Header as="h2" content={title} />
            <Grid>
                <Grid.Column width={6}>
                    <BlogTime publishTime={publishTime} updateTime={updateTime} />
                </Grid.Column>
                <Grid.Column textAlign="right" width={10}>
                    <Tag tags={tags} />
                </Grid.Column>
            </Grid>
            <Divider />
            <MarkdownPreview style={{ color: '#293846' }} text={content} />
        </Container>
    );
};

BlogDetail.propTypes = {
    blog: PropTypes.shape().isRequired
};

export default BlogDetail;
