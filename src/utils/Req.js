export const redirect = (res, url = '/') => {
    res.writeHead(302, { Location: url });
    res.end();
};

export const href = (url) => {
    if (window) {
        window.location.href = url;
    }
};

export const nologin = (res, r = '') => {
    if (res) {
        redirect(res, `/login?r=${r}`);
    } else {
        href('/login');
    }
};
