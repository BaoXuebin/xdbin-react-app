import React, { PureComponent } from 'react';
import { Button, Grid, Container, Divider, Header, Icon } from 'semantic-ui-react';

import LabCard from '../components/LabCard';

class Lab extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { mode: '平铺' };
        this.showByGridLayout = this.showByGridLayout.bind(this);
        this.showByList = this.showByList.bind(this);
    }

    showByGridLayout() {
        this.setState({
            mode: '平铺'
        });
    }

    showByList() {
        this.setState({
            mode: '列表'
        });
    }

    render() {
        const mode = this.state.mode;
        return (
            <div>
                <Grid columns="equal">
                    <Grid.Column>
                        <Header as="h2" icon="lab" content="实验室" />
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        <Button.Group basic size="mini">
                            <Button icon="grid layout" onClick={this.showByGridLayout} />
                            <Button icon="list" onClick={this.showByList} />
                        </Button.Group>
                    </Grid.Column>
                </Grid>
                <Divider />
                <Grid columns="3" doubling>
                    <Grid.Row>
                        <Grid.Column>
                            <LabCard />
                        </Grid.Column>
                        <Grid.Column>
                            <Container>
                                <LabCard />
                            </Container>
                        </Grid.Column>
                        <Grid.Column>
                            <Container>
                                <LabCard />
                            </Container>
                        </Grid.Column>
                        <Grid.Column>
                            <Container>
                                <LabCard />
                            </Container>
                        </Grid.Column>
                        <Grid.Column>
                            <Container>
                                <LabCard />
                            </Container>
                        </Grid.Column>
                        <Grid.Column>
                            <Container>
                                <LabCard />
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Lab;
