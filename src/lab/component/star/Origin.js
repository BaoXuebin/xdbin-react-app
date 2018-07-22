import React from 'react';
import PropTypes from 'prop-types';

const Origin = ({ origin, originLink }) => (
    <div className="xd-tags" style={{ display: 'inline-block' }}>
        <div className="tag">
            {
                originLink ? <a href={originLink} target="blank" style={{ color: '#9EABB3' }}>{origin}</a>
                    : origin
            }
        </div>
    </div>
);

Origin.propTypes = {
    origin: PropTypes.string.isRequired,
    originLink: PropTypes.string
};
Origin.defaultProps = {
    originLink: null
};

export default Origin;
