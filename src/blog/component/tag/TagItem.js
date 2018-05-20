import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Icon, Label } from 'semantic-ui-react';

const TagItem = ({
    tag,
    link,
    icon,
    onClick
}) => {
    if (link) {
        return (
            <Link as={`/tag/${tag.tagId}`} href={`/tag/${tag.tagId}`}>
                <div className="tag">
                    <span>
                        {tag.tagName}
                        {icon && <Icon style={{ margin: '0 0 0 0.75rem' }} name={icon} onClick={() => { onClick(tag.tagId); }} />}
                    </span>
                </div>
            </Link>
        );
    }
    return (
        <Label>
            {tag.tagName}
            <Icon style={{ margin: '0 0 0 0.75rem' }} name={icon} link onClick={() => { onClick(tag.tagId); }} />
        </Label>
    );
};

TagItem.propTypes = {
    tag: PropTypes.shape().isRequired,
    link: PropTypes.bool,
    icon: PropTypes.string,
    onClick: PropTypes.func
};
TagItem.defaultProps = {
    link: true,
    icon: null,
    onClick: () => {}
};

export default TagItem;
