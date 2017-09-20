import React from 'react';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import '../../../static/styles/main.less';
import configureStore from '../stores/ConfigureStore';
import Layout from './Layout';
import Bundle from '../components/Bundle';
import AuthRoute from '../components/AuthRoute';

// const Layout = () => import('./Blog');

const Blog = () => (
    <Layout>
        <Bundle load={() => import('./Blog')}>
            {Blog => <Blog />}
        </Bundle>
    </Layout>
);

const BlogDetail = ({ match }) => (
    <Layout>
        <Bundle load={() => import('./BlogDetail')}>
            {BlogDetail => <BlogDetail match={match} />}
        </Bundle>
    </Layout>
);

const NewBlog = () => (
    <Layout>
        <Bundle load={() => import('./NewBlog')}>
            {NewBlog => <NewBlog />}
        </Bundle>
    </Layout>
);

// 登录页面
const Login = () => (
    <Layout>
        <Bundle load={() => import('./Login')}>
            {Login => <Login />}
        </Bundle>
    </Layout>
);

const ErrorPage = () => (
    <Layout>
        <Bundle load={() => import('./ErrorPage')}>
            {ErrorPage => <ErrorPage code={404} />}
        </Bundle>
    </Layout>
);

const Root = () => (
    <Provider store={configureStore()}>
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Blog} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/blog" component={Blog} />
                    <AuthRoute path="/blog/add" component={NewBlog} />
                    <Route path="/blog/:id" render={({ match }) => <BlogDetail match={match} />} />
                    <Route component={ErrorPage} />
                </Switch>
            </div>
        </Router>
    </Provider>
);

export default Root;
