import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Divider } from 'semantic-ui-react';
import {
    withRouter
} from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import BackTop from '../components/BackTop';

function Layout(props) {
    return (
        <div>
            <Header />
            <Grid centered>
                <Grid.Column computer={10} mobile={16}>
                    {props.children}
                    <Divider />
                    <Footer />
                    <BackTop />
                </Grid.Column>
            </Grid>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.shape().isRequired
};

function mapStateToProps(state) {
    return {
        theme: state.Global.theme,
        loading: state.Global.loading
    };
}

export default withRouter(connect(mapStateToProps)(Layout));
