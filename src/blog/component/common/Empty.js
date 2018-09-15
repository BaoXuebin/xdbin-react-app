import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

const Empty = ({ content }) => (
    <Container textAlign="center">
        <span style={{ color: '#9EABB3' }}>{content}</span>
    </Container>
);

Empty.propTypes = {
    content: PropTypes.string
};
Empty.defaultProps = {
    content: '#陆止于此，海始于斯#'
};

export default Empty;
