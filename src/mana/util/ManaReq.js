import Net from '../../utils/Net';
import { LOGIN_URL, AUTH_TOKEN_URL, FETCH_ALL_BLOG_URL } from '../../utils/Urls';

// 登录请求
export const loginReq = (username, password) => new Promise((resolve, reject) => {
    Net.fetch(LOGIN_URL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then((data) => {
            resolve(data.result);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});

// token 验证请求
export const authReq = cookie => new Promise((resolve, reject) => {
    Net.authFetch(AUTH_TOKEN_URL, cookie, {
        method: 'post'
    })
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});

// 请求所有笔记列表
export const fetchAllBlogReq = page => new Promise((resolve, reject) => {
    Net.fetch(`${FETCH_ALL_BLOG_URL}?page=${page}`)
        .then((data) => {
            if (data) {
                resolve(data.content, Math.ceil(data.totalElements / data.size), data.number + 1);
            }
            reject(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});
