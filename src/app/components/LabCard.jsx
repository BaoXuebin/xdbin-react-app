import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const LabCard = ({ data }) => {
    const _icons = data.icon.map(icon => <Icon key={icon} name={icon} style={{ fontSize: '1.3rem' }} />);
    return (
        <Card>
            <Link to={data.route}>
                <Card style={{ textAlign: 'left' }}>
                    { data.image && <Image src={data.image} /> }
                    <Card.Content>
                        <Card.Header>
                            {data.title}
                        </Card.Header>
                        <Card.Description>
                            {data.description}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        { _icons }
                    </Card.Content>
                </Card>
            </Link>
        </Card>
    );
};

LabCard.propTypes = {
    data: PropTypes.shape().isRequired
};

export default LabCard;
