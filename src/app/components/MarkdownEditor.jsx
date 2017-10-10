import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, TextArea, Button, Label } from 'semantic-ui-react';
import marked from 'marked';
import { highlightAuto } from 'highlight.js';

class MarkdownEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { mode: 'edit', renderContent: '' };
        this.changeViewMode = this.changeViewMode.bind(this);
        this.changeEditMode = this.changeEditMode.bind(this);
        this.renderMarkdown = this.renderMarkdown.bind(this);
        this.getValue = this.getValue.bind(this);
        this.getError = this.getError.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.content && !this.content.ref.value) {
            this.content.ref.value = nextProps.content;
            this.changeViewMode();
        }
    }

    getValue() {
        return this.content.ref.value;
    }

    getError() {
        const { errorKey, errors } = this.props;
        const ee = errors.filter(e => e && e.errorKey === errorKey);
        return ee && ee.length > 0 ? ee[0] : null;
    }

    validate() {
        const { errorKey, validate } = this.props;
        const value = this.getValue();
        for (let k in validate) {
            if ('nullable' === k && !validate[k]) {
                if (!value) {
                    return { errorKey, text: '内容不能为空' };
                }
            }
            if ('maxLength' === k) {
                const l = validate[k];
                if (value.length > l) {
                    return { errorKey, text: `内容长度不超过 ${l} 字符` };
                }
            }
        }
        return null;
    }

    changeViewMode() {
        const renderContent = this.renderMarkdown();
        this.setState({
            mode: 'view',
            renderContent
        });
    }

    changeEditMode() {
        this.setState({
            mode: 'edit'
        });
    }

    renderMarkdown() {
        const mdContent = this.content ? (this.content.ref.value || '试着写点东西') : '试着写点东西';
        marked.setOptions({
            highlight: code => highlightAuto(code).value
        });
        return marked(mdContent);
    }

    render() {
        const error = this.getError();
        return (
            <Container>
                <Form>
                    <Button.Group>
                        { this.state.mode === 'edit' && <Button basic content="预览" onClick={this.changeViewMode} /> }
                        { this.state.mode === 'view' && <Button basic content="返回编辑" onClick={this.changeEditMode} /> }
                    </Button.Group>
                    <div style={{ height: '.5rem' }} />
                    <Container>
                        <TextArea className={this.state.mode !== 'edit' && 'xd-hide'} autoHeight ref={(t) => { this.content = t; }} placeholder="Type markdown here ~" />
                        {error && <Label basic color="red" pointing>{error.text}</Label>}
                        <div className={this.state.mode !== 'view' && 'xd-hide'} dangerouslySetInnerHTML={{ __html: this.state.renderContent }} />
                    </Container>
                    <div style={{ height: '.5rem' }} />
                </Form>
            </Container>
        );
    }
}

MarkdownEditor.propTypes = {
    errorKey: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.shape()),
    validate: PropTypes.shape(),
    content: PropTypes.string
};
MarkdownEditor.defaultProps = {
    errorKey: 'MarkdownEditor',
    errors: [],
    validate: {},
    content: ''
};

export default MarkdownEditor;
