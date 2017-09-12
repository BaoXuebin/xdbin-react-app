import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import { highlightAuto } from 'highlight.js';

function renderMarkdown(mdContent) {
    marked.setOptions({
        highlight: code => highlightAuto(code).value
    });
    return marked(mdContent);
}

function BlogContent({ textType, content }) {
    if (textType === 'text') {
        return (
            <div>{content}</div>
        );
    }
    const _html = textType === 'html' ? content : renderMarkdown(content);
    return (
        <div dangerouslySetInnerHTML={{ __html: _html }} />
    );
}

BlogContent.propTypes = {
    textType: PropTypes.string,
    content: PropTypes.string.isRequired
};
BlogContent.defaultProps = {
    textType: 'markdown'
};

export default BlogContent;
