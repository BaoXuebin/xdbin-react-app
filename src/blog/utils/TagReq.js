import Net from '../../utils/Net';
import {
    FETCH_ALL_TAG_URL,
    FETCH_BLOGS_BY_TAG_URL
} from '../../utils/Urls';

export const redirect = (res, url = '/') => {
    res.writeHead(302, { Location: url });
    res.end();
};

export const fetchAllTagReq = () => new Promise((resolve, reject) => {
    Net.fetch(`${FETCH_ALL_TAG_URL}`)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});

export const fetchBlogByTagReq = (page, tagId) => new Promise((resolve, reject) => {
    Net.fetch(`${FETCH_BLOGS_BY_TAG_URL}?page=${page}&tagId=${tagId}`)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});
