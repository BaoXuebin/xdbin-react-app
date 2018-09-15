import fetch from 'isomorphic-fetch';
import { nologin } from './Req';

export default class Net {
    // 封装 fetch 请求
    // url: 请求路径
    // headers: 请求参数
    static fetch(url, headers) {
        let _headers = headers;
        // 默认 header
        const _defaultHeaders = {
            credentials: 'include' // 添加 cookie
        };
        _headers = Object.assign({}, _defaultHeaders, headers);
        return new Promise((resolve, reject) => {
            fetch(url, _headers)
                .then(res => res.json())
                .then((result) => {
                    if (result.code && result.code > 200) {
                        // 请求出现错误
                        reject(result);
                    } else if (result.code === 401) {
                        nologin();
                        reject(result);
                    } else if (result && result.status > 200) {
                        reject(result);
                    }
                    resolve(result);
                }).catch((e) => {
                    reject(e);
                });
        });
    }

    static authFetch(url, cookie, headers) {
        let _headers = headers;
        return new Promise((resolve, reject) => {
            if (!cookie && cookie.indexOf('x-token') < 0) {
                reject();
            }
            // 默认 header
            const _defaultHeaders = {
                credentials: 'include', // 添加 cookie
                headers: {
                    Cookie: cookie
                }
            };
            _headers = Object.assign({}, _defaultHeaders, headers);
            fetch(url, _headers)
                .then(res => res.json())
                .then((result) => {
                    if (result.code && result.code > 200) {
                        // 请求出现错误
                        reject(result);
                    }
                    resolve(result);
                }).catch((e) => {
                    reject(e);
                });
        });
    }

    // 封装 fetch 请求
    // url: 请求路径
    // headers: 请求参数
    static neteaseFetch(url, headers) {
        let _headers = headers;
        // 默认 header
        const _defaultHeaders = {
            credentials: 'include' // 添加 cookie
        };
        _headers = Object.assign({}, _defaultHeaders, headers);
        return new Promise((resolve, reject) => {
            fetch(url, _headers)
                .then(res => res.json())
                .then((result) => {
                    if (result.code && result.code > 200) {
                        // 请求出现错误
                        reject(result);
                    }
                    resolve(result);
                }).catch((e) => {
                    reject(e);
                });
        });
    }
}
