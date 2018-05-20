import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

const options = [
    { key: 'English', text: 'English', value: 'English' },
    { key: 'French', text: 'French', value: 'French' },
    { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
    { key: 'German', text: 'German', value: 'German' },
    { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
];

class TagSelector extends Component {
    constructor(props) {
        super(props);
        this.state = { options };
        this.handleAddition = this.handleAddition.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleAddition(e, { value }) {
        this.setState({
            options: [{ text: value, value }, ...this.state.options]
        });
    }

    handleChange(e, { value }) {
        this.setState({
            currentValues: value
        });
    }

    render() {
        return (
            <Dropdown
                options={this.state.options}
                placeholder="选择标签"
                search
                selection
                fluid
                multiple
                allowAdditions
                value={this.state.currentValues}
                onAddItem={this.handleAddition}
                onChange={this.handleChange}
            />
        );
    }
}

export default TagSelector;
