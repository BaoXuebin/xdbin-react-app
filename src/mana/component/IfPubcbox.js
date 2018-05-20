import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'semantic-ui-react';

const IfPubcbox = ({ ifPub, onChange }) => (
    <Checkbox toggle checked={ifPub} onChange={onChange} label={ifPub ? '公开' : '私密'} />
);

IfPubcbox.propTypes = {
    ifPub: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

export default IfPubcbox;
