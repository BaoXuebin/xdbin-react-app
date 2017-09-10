import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Container, Segment, Grid, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Tags from './Tags';

function BlogItem(props) {
    const ifNight = props.theme === 'night';
    const { id, title, publishTime, tags, subContent } = props.blog;
    const publishTimeStr = moment(publishTime).format('MM.DD.YYYY');
    return (
        <Segment inverted={ifNight}>
            <Container text>
                <h2>{title}</h2>
                <p>{subContent}</p>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column width={12} textAlign="left">
                            <span style={{ color: 'gray', fontSize: 13 }}>{publishTimeStr}</span>
                            <Tags tags={tags} />
                        </Grid.Column>
                        <Grid.Column width={4} textAlign="right">
                            <Link to={`/blog/${id}`}><Label as="span" color="grey">阅读全部</Label></Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    );
}

BlogItem.propTypes = {
    theme: PropTypes.string,
    blog: PropTypes.shape({
        title: PropTypes.string.isRequired,
        publishTime: PropTypes.number.isRequired,
        subContent: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
};
BlogItem.defaultProps = {
    theme: 'day'
};

export default BlogItem;
