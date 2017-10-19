import React from 'react';
import PropTypes from 'prop-types';
import { Item, Divider } from 'semantic-ui-react';

const LabItem = ({ data }) => (
    <div className="lab-item" style={{ paddingLeft: '1rem' }}>
        <Item>
            <Item.Content>
                <Item.Header>{data.title}</Item.Header>
                <Item.Meta>{data.description}</Item.Meta>
            </Item.Content>
        </Item>
        <Divider />
    </div>
);

LabItem.propTypes = {
    data: PropTypes.shape().isRequired
};

export default LabItem;
