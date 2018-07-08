import Net from '../../utils/Net';
import { FETCH_VIDEO_URL, FETCH_ALL_VIDEO_URL } from '../../utils/Urls';

export const pubVideoReq = page => new Promise((resolve, reject) => {
    Net.fetch(`${FETCH_VIDEO_URL}?page=${page}`)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});

export const allVideoReq = page => new Promise((resolve, reject) => {
    Net.authFetch(`${FETCH_ALL_VIDEO_URL}?page=${page}`)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});
