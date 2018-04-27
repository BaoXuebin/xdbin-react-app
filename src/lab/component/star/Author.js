import React from 'react';
import PropTypes from 'prop-types';

const Author = ({ author }) => (
    <div className="xd-tags" style={{ display: 'inline-block', marginLeft: '.5rem' }}>
        <div className="tag">#作者</div>
        <div className="tag">
            {author}
        </div>
    </div>
);

Author.propTypes = {
    author: PropTypes.string.isRequired
};

export default Author;
