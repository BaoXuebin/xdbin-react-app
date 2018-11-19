import Net from '../../utils/Net';
import {
    FETCH_MOOD_PAGE_URL
} from '../../utils/Urls';

export const redirect = (res, url = '/') => {
    res.writeHead(302, { Location: url });
    res.end();
};

export const fetchMoodsByPage = page => new Promise((resolve, reject) => {
    Net.fetch(`${FETCH_MOOD_PAGE_URL}?page=${page}`)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});
