import React from 'react';
import PropTypes from 'prop-types';
import { Label, Icon } from 'semantic-ui-react';

const AddTag = ({ onAdd }) => (
    <Label onClick={onAdd} style={{ cursor: 'pointer' }}>
        <Icon name="add" />
    </Label>
);

AddTag.propTypes = {
    onAdd: PropTypes.func.isRequired
};

export default AddTag;
