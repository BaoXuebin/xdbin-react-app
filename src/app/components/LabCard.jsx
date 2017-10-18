import React from 'react';
import { Image, Card, Icon } from 'semantic-ui-react';

const LabCard = () => (
    <Card style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
        <Image src="http://oxrjqkvly.bkt.clouddn.com/atom_2x.png" />
        <Card.Content>
            <Card.Header>
                博客
            </Card.Header>
            <Card.Description>
                Code the Heart.
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Icon name="code" />
            10.17.2017
        </Card.Content>
    </Card>
);

export default LabCard;
