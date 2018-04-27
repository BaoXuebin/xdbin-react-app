import Net from '../../utils/Net';
import {
    FETCH_BLOG_LIST_URL,
    FETCH_BLOG_DETAIL_URL
} from '../../utils/Urls';

export const redirect = (res, url = '/') => {
    res.writeHead(302, { Location: url });
    res.end();
};

export const fetchBlogListReq = (page, title) => new Promise((resolve, reject) => {
    let url = `${FETCH_BLOG_LIST_URL}?page=${page}`;
    if (title) {
        url += `&title=${title}`;
    }
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
