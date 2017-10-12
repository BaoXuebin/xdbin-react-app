import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Label
} from 'semantic-ui-react';

class ErrorLabel extends PureComponent {
    componentWillReceiveProps() {
        const { delay, delayCallBack, dispatch } = this.props;
        if (delayCallBack) {
            setTimeout(() => dispatch(delayCallBack()), delay);
        } else {
            console.error('未指定回调方法');
        }
    }

    render() {
        const { error, color } = this.props;
        const _html = error ?
            <Label basic color={color}>{error}</Label> :
            <span />;
        return _html;
    }
}

ErrorLabel.propTypes = {
    error: PropTypes.string,
    delay: PropTypes.number,
    delayCallBack: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    color: PropTypes.string
};
ErrorLabel.defaultProps = {
    error: null,
    delay: 2000,
    delayCallBack: null,
    color: 'red'
};

export default connect()(ErrorLabel);
