import React from 'react';
import PropTypes from 'prop-types';
import {
    Link
} from 'react-router-dom';

const Error404 = () => (
    <div>
        <p>404</p>
        <Link to="/">回到首页</Link>
    </div>
);

const ErrorPage = ({ code }) => {
    if (code === 404) {
        return <Error404 />;
    }
    return (<p>None</p>);
};

ErrorPage.propTypes = {
    code: PropTypes.number
};
ErrorPage.defaultProps = {
    code: -1
};

export default ErrorPage;
