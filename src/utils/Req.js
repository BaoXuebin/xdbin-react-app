export const redirect = (res, url = '/') => {
    res.writeHead(302, { Location: url });
    res.end();
};

export const href = (url) => {
    if (window) {
        window.location.href = url;
    }
};

export const nologin = (res) => {
    if (res) {
        redirect(res, '/login');
    } else {
        href('/login');
    }
};
