import Net from '../../utils/Net';
import { LOGIN_URL, AUTH_TOKEN_URL } from '../../utils/Urls';

// 登录请求
export const loginReq = (username, password) => new Promise((resolve, reject) => {
    Net.neteaseFetch(LOGIN_URL, {
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
    Net.neteaseFetch(AUTH_TOKEN_URL, cookie, {
        method: 'post'
    })
        .then((data) => {
            resolve(data.result);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});
