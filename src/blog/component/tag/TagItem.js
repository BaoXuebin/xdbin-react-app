import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Icon, Label } from 'semantic-ui-react';

const TagItem = ({
    tag,
    link,
    del,
    onDel
}) => {
    if (link) {
        return (
            <Link as={`/tag/${tag.tagId}`} href={`/tag/${tag.tagId}`}>
                <div className="tag">
                    <span>
                        {tag.tagName}
                        {del && <Icon name="delete" onClick={() => { onDel(tag.tagId); }} />}
                    </span>
                </div>
            </Link>
        );
    }
    return (
        <Label>
            {tag.tagName}
            <Icon name="delete" link onClick={() => { onDel(tag.tagId); }} />
        </Label>
    );
};

TagItem.propTypes = {
    tag: PropTypes.shape().isRequired,
    link: PropTypes.bool,
    del: PropTypes.bool,
    onDel: PropTypes.func
};
TagItem.defaultProps = {
    link: true,
    del: false,
    onDel: () => {}
};

export default TagItem;
