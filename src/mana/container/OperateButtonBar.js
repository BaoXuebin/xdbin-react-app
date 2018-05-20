import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class OperateButtonBar extends PureComponent {
    render() {
        const { loading, onSave, content } = this.props;
        return (
            <Button size="tiny" loading={loading} color="green" icon="refresh" content={content} onClick={onSave} />
        );
    }
}

OperateButtonBar.propTypes = {
    loading: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired
};

export default OperateButtonBar;
