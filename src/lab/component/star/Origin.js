import React from 'react';
import PropTypes from 'prop-types';

const Origin = ({ origin }) => (
    <div className="xd-tags" style={{ display: 'inline-block' }}>
        <div className="tag">#来源</div>
        <div className="tag">
            {origin}
        </div>
    </div>
);

Origin.propTypes = {
    origin: PropTypes.string.isRequired
};

export default Origin;
