import React from 'react';
import { Container, Grid, Button, Popup, Icon } from 'semantic-ui-react';

import '../styles/control.less';
import ProgressBar from '../components/ProgressBar';

const Control = () => (
    <div id="playerControl" className="Control">
        <Container>
            <Grid>
                <Grid.Column width={2}>
                    <Button.Group>
                        <Button icon="step backward" color="red" />
                        <Button icon="pause" color="red" />
                        <Button icon="step forward" color="red" />
                    </Button.Group>
                </Grid.Column>
                <Grid.Column width={8}>
                    <ProgressBar />
                </Grid.Column>
                <Grid.Column width={2} style={{ marginLeft: '-1.5rem' }}>
                    12:00/12:00
                </Grid.Column>
                <Grid.Column width={2} style={{ marginLeft: '-3rem' }}>
                    <div style={{ float: 'left' }}>
                        <Icon name="volume down" size="large" />
                    </div>
                    <ProgressBar offsetX="20%" />
                </Grid.Column>
                <Grid.Column width={2} style={{ marginLeft: '3rem' }}>
                    <Button.Group floated="right" basic>
                        <Popup
                            trigger={<Button icon="random" />}
                            on="hover"
                            content="随机"
                            position="top center"
                            size="mini"
                        />
                        <Popup
                            trigger={<Button content="词" floated="right" />}
                            on="hover"
                            content="歌词"
                            position="top center"
                            size="mini"
                        />
                        <Popup
                            trigger={<Button icon="list" floated="left" />}
                            on="hover"
                            content="播放列表"
                            position="top center"
                            size="mini"
                        />
                    </Button.Group>
                </Grid.Column>
            </Grid>
        </Container>
    </div>
);

export default Control;
