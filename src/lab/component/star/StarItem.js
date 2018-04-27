import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Container, Grid, Divider } from 'semantic-ui-react';

import Author from './Author';
import Origin from './Origin';

const StarItem = ({ blog }) => {
    const {
        title,
        href,
        publishTime,
        author,
        origin
    } = blog;
    return (
        <Container text>
            <h2>
                <a href={href} style={{ color: '#2a3845' }} target="_blank" dangerouslySetInnerHTML={{ __html: title }} />
            </h2>
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column textAlign="left" width={5}>
                        <span style={{ color: 'gray', fontSize: 13 }}>{moment(publishTime).format('MM.DD.YYYY')}</span>
                        { author && <Author author={author} /> }
                    </Grid.Column>
                    <Grid.Column textAlign="right" width={11}>
                        <Origin origin={origin} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Divider />
        </Container>
    );
};

StarItem.propTypes = {
    blog: PropTypes.shape({
        uid: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        publishTime: PropTypes.number.isRequired,
        author: PropTypes.string,
        origin: PropTypes.string.isRequired
    }).isRequired
};

export default StarItem;
