import React from 'react';
import { Segment, Container, Grid, Header, Icon, Popup } from 'semantic-ui-react';
import {
    Link
} from 'react-router-dom';

import '../styles/header.less';

function TopHeader() {
    return (
        <Segment id="playerHeader">
            <Container>
                <Grid columns={2}>
                    <Grid.Column>
                        <Header as="h2">
                            <Icon name="music" color="red" />
                            <Header.Content>
                                Music
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        <Popup
                            trigger={<Link to="/lab" style={{ color: 'black' }}><Icon name="lab" size="large" /></Link>}
                            content="「实验室」"
                            on="hover"
                        />
                        <Popup
                            trigger={<Link to="/" style={{ color: 'black' }}><Icon name="home" size="large" /></Link>}
                            content="「首页」"
                            on="hover"
                        />
                    </Grid.Column>
                </Grid>
            </Container>
        </Segment>
    );
}

export default TopHeader;
