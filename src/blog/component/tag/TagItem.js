import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const TagItem = ({ tag }) => (
    <Link as={`/tag/${tag.tagId}`} href={`/tag/${tag.tagId}`}>
        <div className="tag">
            <span>
                {tag.tagName}
            </span>
        </div>
    </Link>
);

TagItem.propTypes = {
    tag: PropTypes.shape().isRequired
};

export default TagItem;
