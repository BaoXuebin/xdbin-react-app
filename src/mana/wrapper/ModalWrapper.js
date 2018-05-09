import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';

class ModalWrapper extends PureComponent {
    render() {
        const {
            open,
            onClose,
            title,
            content,
            onPositive
        } = this.props;
        return (
            <Modal size="mini" open={open} onClose={onClose}>
                <Modal.Header>
                    {title}
                </Modal.Header>
                <Modal.Content>
                    {content}
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={onClose}>
                        No
                    </Button>
                    <Button positive icon="checkmark" labelPosition="right" content="Yes" onClick={onPositive} />
                </Modal.Actions>
            </Modal>
        );
    }
}

ModalWrapper.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.shape().isRequired,
    onClose: PropTypes.func.isRequired,
    onPositive: PropTypes.func.isRequired
};

export default ModalWrapper;
