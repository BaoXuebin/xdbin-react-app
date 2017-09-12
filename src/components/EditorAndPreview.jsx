import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Form, TextArea } from 'semantic-ui-react';

class EditorAndPreview extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this.props);
    }

    render() {
        const { rows, label } = this.props;
        const panes = [
            {
                menuItem: {
                    key: 'content', icon: 'code', content: label
                },
                render: () => <Form><TextArea autoHeight placeholder={label} rows={rows} /></Form>
            },
            {
                menuItem: {
                    key: 'preview', icon: 'eye', content: '预览'
                },
                render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>
            }
        ];
        return (
            <Tab panes={panes} />
        );
    }
}

EditorAndPreview.propTypes = {
    rows: PropTypes.number,
    label: PropTypes.string.isRequired
};
EditorAndPreview.defaultProps = {
    rows: 3
};

export default EditorAndPreview;
