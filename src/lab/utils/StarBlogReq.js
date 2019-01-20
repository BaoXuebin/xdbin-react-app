import Net from '../../utils/Net';
import {
    FETCH_STAR_BLOGS_URL,
    FETCH_GROUP_BY_STAR_BLOGS_ORIGIN_URL
} from '../../utils/Urls';

export const redirect = (res, url = '/') => {
    res.writeHead(302, { Location: url });
    res.end();
};

const params = condition => Object.keys(condition).filter(k => condition[k]).map(k => `${k}=${condition[k] || ''}`).join('&');

// (page, origin)
export const fetchStarBlogsReq = condition => new Promise((resolve, reject) => {
    Net.fetch(`${FETCH_STAR_BLOGS_URL}?${params(condition)}`)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});

export const fetchAllOriginsReq = () => new Promise((resolve, reject) => {
    Net.fetch(`${FETCH_GROUP_BY_STAR_BLOGS_ORIGIN_URL}`)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});
