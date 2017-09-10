import React from 'react';
import PropTypes from 'prop-types';

const Tag = ({ tag }) => (
    <div className="tag">
        <a>{tag}</a>
    </div>
);

const Tags = ({ tags }) => {
    const hasTag = tags && tags.length && tags.length > 0;
    const _html = tags && tags.map(tag => <Tag key={tag} tag={tag} />);
    if (hasTag) {
        return (
            <div className="xd-tags" style={{ display: 'inline-block', marginLeft: '.5rem' }}>
                <div className="tag">
                    # 标签
                </div>
                {_html}
            </div>
        );
    }
    return (
        <div style={{ display: 'inline-block' }} />
    );
};

Tag.propTypes = {
    tag: PropTypes.string.isRequired
};

Tags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string)
};
Tags.defaultProps = {
    tags: []
};

export default Tags;
