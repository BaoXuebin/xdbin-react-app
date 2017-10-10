import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tab, Form, TextArea, Label } from 'semantic-ui-react';
import marked from 'marked';
import { highlightAuto } from 'highlight.js';

class EditorAndPreview extends PureComponent {
    constructor(props) {
        super(props);
        this.renderMarkdown = this.renderMarkdown.bind(this);
        this.tabChange = this.tabChange.bind(this);
        this.getValue = this.getValue.bind(this);
        const { rows, label, errorKey } = this.props;
        this.errorKey = errorKey || 'editorAndPreview';
        const placeholder = `${label}, 试着输入 markdown 格式内容 ~`;
        this.panes = [
            {
                menuItem: {
                    key: 'content', icon: 'code', content: label
                },
                pane: {
                    key: 'content',
                    content: <Form>
                        <TextArea autoHeight placeholder={placeholder} rows={rows} ref={(t) => { this.textarea = t; }} />
                    </Form>
                }
            },
            {
                menuItem: {
                    key: 'preview', icon: 'eye', content: '预览'
                },
                pane: {
                    key: 'preview'
                }
            }
        ];
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.value, this.textarea.inputRef);
        this.textarea.inputRef.value = nextProps.value;
    }

    getValue() {
        return this.textarea.ref.value;
    }

    getError() {
        const errors = this.props.errors;
        const ee = errors.filter(e => e && e.errorKey === this.errorKey);
        return ee && ee.length > 0 ? ee[0] : null;
    }

    validate() {
        const validate = this.props.validate;
        const value = this.getValue();
        for (let k in validate) {
            if ('nullable' === k && validate[k]) {
                if (!value) {
                    return { errorKey: this.errorKey, text: '内容不能为空' };
                }
            }
            if ('maxLength' === k) {
                const l = validate[k];
                if (value.length > l) {
                    return { errorKey: this.errorKey, text: `内容长度不超过 ${l} 字符` };
                }
            }
        }
        return null;
    }

    tabChange(event, data) {
        if (data.activeIndex === 1) {
            const preview = data.panes[data.activeIndex];
            preview.pane.content = <div dangerouslySetInnerHTML={this.renderMarkdown()} />;
        }
    }

    removeError() {
        this.props.removeError(this.errorKey);
    }

    renderMarkdown() {
        const mdContent = this.textarea ? (this.textarea.ref.value || '试着写点东西') : '试着写点东西';
        marked.setOptions({
            highlight: code => highlightAuto(code).value
        });
        return { __html: marked(mdContent) };
    }

    render() {
        return (
            <Tab panes={this.panes} renderActiveOnly={false} onTabChange={this.tabChange} />
        );
    }
}

EditorAndPreview.propTypes = {
    rows: PropTypes.number,
    label: PropTypes.string.isRequired,
    validate: PropTypes.shape(),
    errorKey: PropTypes.string.isRequired,
    removeError: PropTypes.func,
    errors: PropTypes.arrayOf(PropTypes.object).isRequired,
    value: PropTypes.string
};
EditorAndPreview.defaultProps = {
    rows: 3,
    validate: {},
    removeError: () => {},
    errors: [],
    value: ''
};

export default EditorAndPreview;
