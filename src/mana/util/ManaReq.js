import Net from '../../utils/Net';
import {
    LOGIN_URL,
    AUTH_TOKEN_URL,
    FETCH_ALL_BLOG_URL,
    TOGGLE_BLOG_PUB_URL,
    ADD_TAG_URL,
    DEL_TAG_URL,
    DEL_BLOG_URL
} from '../../utils/Urls';

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
                resolve({
                    blogs: data.content,
                    total: Math.ceil(data.totalElements / data.size),
                    current: data.number + 1
                });
            }
            reject(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});

// 请求所有笔记列表
export const toggleBlogPubReq = (blogId, type) => new Promise((resolve, reject) => {
    Net.fetch(`${TOGGLE_BLOG_PUB_URL}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({ blogId, type })
    })
        .then((data) => {
            const { ifPub } = data;
            resolve({ blogId, ifPub });
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});

// 删除笔记
export const delBlogReq = blogId => new Promise((resolve, reject) => {
    Net.fetch(`${DEL_BLOG_URL}?blogId=${blogId}`, {
        method: 'delete'
    })
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});

// 添加标签
export const addTagReq = tag => new Promise((resolve, reject) => {
    Net.fetch(ADD_TAG_URL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tagName: tag })
    })
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});

// 删除标签
export const delTagReq = tagId => new Promise((resolve, reject) => {
    Net.fetch(DEL_TAG_URL, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tagId })
    })
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});
