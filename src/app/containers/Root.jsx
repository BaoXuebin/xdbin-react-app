import React from 'react';
import { Provider } from 'react-redux';
import {
    // BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import { BrowserRouter } from 'react-g-analytics';

import '../../../static/styles/main.less';
import configureStore from '../stores/ConfigureStore';
import Layout from './Layout';
import Bundle from '../components/Bundle';
import AuthRoute from '../components/AuthRoute';
import Login from './Login';

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

const UpdateBlog = ({ match }) => (
    <Layout>
        <Bundle load={() => import('./NewBlog')}>
            {NewBlog => <NewBlog update={true} match={match} />}
        </Bundle>
    </Layout>
);

// 登录页面
// const Login = () => (
//     <Layout>
//         <Bundle load={() => import('./Login')}>
//             {Login => <Login />}
//         </Bundle>
//     </Layout>
// );

// 管理页面
const Manager = () => (
    <Layout>
        <Bundle load={() => import('./Manager')}>
            {Manager => <Manager />}
        </Bundle>
    </Layout>
);

const Lab = () => (
    <Layout>
        <Bundle load={() => import('./Lab')}>
            {Lab => <Lab />}
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

//UA-107197856-1
const Root = () => (
    <Provider store={configureStore()}>
        <BrowserRouter id="UA-107197856-1">
            <div>
                <Switch>
                    <Route exact path="/" component={Blog} />
                    <Route exact path="/login" render={() => <Layout><Login /></Layout> } />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/lab" component={Lab} />
                    <AuthRoute path="/manager" component={Manager} />
                    <AuthRoute path="/blog/add" component={NewBlog} />
                    <AuthRoute path="/blog/update/:id" component={UpdateBlog} />
                    <Route path="/blog/:id" render={({ match }) => <BlogDetail match={match} />} />
                    <Route component={ErrorPage} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
);

export default Root;
