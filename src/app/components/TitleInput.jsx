import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'semantic-ui-react';

export default class TitleInput extends PureComponent {
    constructor(props) {
        super(props);
        this.errorKey = 'title';
        this.getValue = this.getValue.bind(this);
        this.getError = this.getError.bind(this);
        this.validate = this.validate.bind(this);
        this.removeError = this.removeError.bind(this);
    }

    getValue() {
        return this.title.inputRef.value;
    }

    getError() {
        const errors = this.props.errors;
        const ee = errors.filter(e => e && e.errorKey === this.errorKey);
        return ee && ee.length > 0 ? ee[0] : null;
    }

    validate() {
        const title = this.getValue();
        if (title) {
            if (title.length > 100) {
                return { errorKey: this.errorKey, text: '标题长度不超过 100 字符' };
            }
        } else {
            return { errorKey: this.errorKey, text: '标题不能为空' };
        }
        return null;
    }

    removeError() {
        this.props.removeError(this.errorKey);
    }

    render() {
        const error = this.getError();
        return (
            <div>
                <Input
                    error={error !== null}
                    placeholder="输入标题"
                    ref={(title) => { this.title = title; }}
                    onFocus={this.removeError}
                    fluid
                />
                {error && <Label basic color="red" pointing>{error.text}</Label>}
            </div>
        );
    }
}

TitleInput.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.object).isRequired,
    removeError: PropTypes.func
};
TitleInput.defaultProps = {
    errors: [],
    removeError: () => {}
};
