import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Divider } from 'semantic-ui-react';

import Head from './Head';
import Header from '../header/Header';
import Footer from './Footer';

const Layout = ({ children, title }) => [
    <Head key="head" title={title} />,
    <Header key="header" />,
    <Grid centered padded key="body">
        <Grid.Column computer={10} plant={13} mobile={16}>
            {children}
            <Divider />
            <Footer />
        </Grid.Column>
    </Grid>
];

Layout.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired
};
Layout.defaultProps = {
    title: '陆止于此，海始于斯。'
};

export default Layout;
