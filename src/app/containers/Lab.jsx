import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Grid, Divider, Header, Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import LabCard from '../components/LabCard';
import LabItem from '../components/LabItem';
import labData from '../data/Data';
import { changeViewMode } from '../actions/LabAction';

class Lab extends PureComponent {
    constructor(props) {
        super(props);
        this.showByGridLayout = this.showByGridLayout.bind(this);
        this.showByList = this.showByList.bind(this);
        this.labs = labData;
    }

    showByGridLayout() {
        this.props.dispatch(changeViewMode('plat'));
    }

    showByList() {
        this.props.dispatch(changeViewMode('list'));
    }

    render() {
        const mode = this.props.mode;
        const firstPlatHtml = this.labs.map((lab, i) => {
            if (i % 3 === 0) {
                return <LabCard key={lab.id} data={lab} />;
            }
            return '';
        });
        const secondPlatHtml = this.labs.map((lab, i) => {
            if (i % 3 === 1) {
                return <LabCard key={lab.id} data={lab} />;
            }
            return '';
        });
        const thirdPlatHtml = this.labs.map((lab, i) => {
            if (i % 3 === 2) {
                return <LabCard key={lab.id} data={lab} />;
            }
            return '';
        });
        const listHtml = this.labs.map(lab => <Link to={lab.route}><LabItem key={lab.id} data={lab} /></Link>);
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
                {
                    mode === 'plat' &&
                    <Grid doubling columns={3} verticalAlign="top">
                        <Grid.Row stretched>
                            <Grid.Column>
                                {firstPlatHtml}
                            </Grid.Column>
                            <Grid.Column>
                                {secondPlatHtml}
                            </Grid.Column>
                            <Grid.Column>
                                {thirdPlatHtml}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                }
                {
                    mode === 'list' &&
                    <Item.Group>
                        {listHtml}
                    </Item.Group>
                }
            </div>
        );
    }
}

Lab.propTypes = {
    dispatch: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        mode: state.Lab.mode
    };
}

export default connect(mapStateToProps)(Lab);
