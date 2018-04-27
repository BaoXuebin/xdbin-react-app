import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';

const SelectTag = ({ tag }) => (
    <Label as="span" color="red" tag>{tag}</Label>
);

SelectTag.propTypes = {
    tag: PropTypes.string.isRequired
};

export default SelectTag;
