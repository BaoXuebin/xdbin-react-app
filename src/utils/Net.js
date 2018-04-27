import fetch from 'isomorphic-fetch';

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
