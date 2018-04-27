import Net from '../../utils/Net';
import {
    FETCH_STAR_BLOGS_URL
} from '../../utils/Urls';

export const redirect = (res, url = '/') => {
    res.writeHead(302, { Location: url });
    res.end();
};

export const fetchStarBlogsReq = page => new Promise((resolve, reject) => {
    Net.fetch(`${FETCH_STAR_BLOGS_URL}?page=${page}`)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});
