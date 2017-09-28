import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Container, Grid, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import BlogContent from './BlogContent';
import Tags from './Tags';

function BlogItem(props) {
    const ifNight = props.theme === 'night';
    const { blogId, title, updateTime, tags, summaryTextType, summary } = props.blog;
    const publishTimeStr = moment(updateTime).format('MM.DD.YYYY');
    return (
        <Container text>
            <h2>{title}</h2>
            <BlogContent textType={summaryTextType} content={summary} />
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column textAlign="left">
                        <span style={{ color: 'gray', fontSize: 13 }}>{publishTimeStr}</span>
                        <Tags tags={tags} />
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        <Link to={`/blog/${blogId}`}><span style={{ fontSize: 14 }}>阅读全部</span></Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Divider />
        </Container>
    );
}

BlogItem.propTypes = {
    theme: PropTypes.string,
    blog: PropTypes.shape({
        blogId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        updateTime: PropTypes.number.isRequired,
        summary: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
};
BlogItem.defaultProps = {
    theme: 'day'
};

export default BlogItem;
