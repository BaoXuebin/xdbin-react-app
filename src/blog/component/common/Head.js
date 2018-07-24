import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import Config from '../../../config/Config';

const HtmlHead = ({ title }) => (
    <Head>
        <title>{`${title} - ${Config.website}`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link href="https://cdn.bootcss.com/semantic-ui/2.3.1/semantic.min.css" rel="stylesheet" />
        <link href="/static/css/atom.one.dark.min.css" rel="stylesheet" />
        <link href="/static/css/pace-theme-flash.css" rel="stylesheet" />
        <link href="/static/css/simplemde.min.css" rel="stylesheet" />
        <link href="/static/css/xdbin.css" rel="stylesheet" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-107197856-1" />
        <script src="/static/js/pace.min.js" />
        <script src="/static/js/simplemde.min.js" />
        <script src="/static/js/xdbin.js" />
    </Head>
);

HtmlHead.propTypes = {
    title: PropTypes.string
};
HtmlHead.defaultProps = {
    title: Config.defaultTitle
};


export default HtmlHead;
