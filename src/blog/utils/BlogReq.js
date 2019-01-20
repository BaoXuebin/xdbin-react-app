import Net from '../../utils/Net';
import {
    FETCH_BLOG_LIST_URL,
    FETCH_BLOG_DETAIL_URL,
    FETCH_GROUP_BY_MONTHLY_URL
} from '../../utils/Urls';

export const redirect = (res, url = '/') => {
    res.writeHead(302, { Location: url });
    res.end();
};

const params = condition => Object.keys(condition).filter(k => condition[k]).map(k => `${k}=${condition[k] || ''}`).join('&');

export const fetchBlogListReq = condition => new Promise((resolve, reject) => {
    let url = `${FETCH_BLOG_LIST_URL}?${params(condition)}`;
    Net.fetch(url)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});

export const fetchBlogDetailReq = blogId => new Promise((resolve, reject) => {
    Net.fetch(`${FETCH_BLOG_DETAIL_URL}${blogId}`)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});

export const fetchGroupByMonthly = () => new Promise((resolve, reject) => {
    Net.fetch(`${FETCH_GROUP_BY_MONTHLY_URL}`)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});
