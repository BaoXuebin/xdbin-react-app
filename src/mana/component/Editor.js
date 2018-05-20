import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import { highlightAuto } from 'highlight.js';

class Editor extends PureComponent {
    componentDidMount() {
        this.smde = new SimpleMDE({
            element: this.mde,
            autofocus: false,
            autosave: false,
            previewRender: plainText => marked(plainText, {
                renderer: new marked.Renderer(),
                gfm: true,
                pedantic: false,
                sanitize: false,
                tables: true,
                breaks: true,
                smartLists: true,
                smartypants: true,
                highlight: code => highlightAuto(code).value
            })
        });
        this.smde.value(this.props.text);
    }

    getValue() {
        return this.smde ? this.smde.value() : '';
    }

    reset() {
        this.smde.value('');
    }

    render() {
        return (
            <textarea ref={(mde) => { this.mde = mde; }} style={{ display: 'none' }} />
        );
    }
}

Editor.propTypes = {
    text: PropTypes.string
};
Editor.defaultProps = {
    text: ''
};

export default Editor;
