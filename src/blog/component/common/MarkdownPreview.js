import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import { highlightAuto } from 'highlight.js';

const renderMarkdown = (mdContent) => {
    marked.setOptions({
        highlight: code => highlightAuto(code).value
    });
    return marked(mdContent);
};

const MarkdownPreview = ({ style, text }) => (
    <div style={style} dangerouslySetInnerHTML={{ __html: renderMarkdown(text) }} />
);

MarkdownPreview.propTypes = {
    style: PropTypes.shape(),
    text: PropTypes.string
};
MarkdownPreview.defaultProps = {
    style: {},
    text: ''
};

export default MarkdownPreview;
