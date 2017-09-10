import React from 'react';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import configureStore from '../stores/ConfigureStore';
import Blog from '../containers/Blog';
import Header from './Header';
import Footer from './Footer';
import BlogDetail from '../containers/BlogDetail';
import '../../static/styles/main.less';

const Root = () => (
    <Provider store={configureStore()}>
        <Router>
            <div>
                <Header />
                <Route exact path="/" component={Blog} />
                <Route exact path="/blog" component={Blog} />
                <Route path="/blog/:id" component={BlogDetail} />
                <Footer />
            </div>
        </Router>
    </Provider>
);

export default Root;
