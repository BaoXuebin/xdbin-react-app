import fetch from 'isomorphic-fetch';
import { FETCH_BLOG_URL, FETCH_BLOG_DETAIL_URL } from '../data/Urls';

export const ActionConstants = {
    AUTH_FETCH_BLOG_PAGE: 'AUTH_FETCH_BLOG_PAGE'
};

// 需要 token 验证的请求
function authFetch(token, history) {
    fetch()
        .then(response => response.json())
        .then((json) => {
            if (json.code === 403) {
                history.push('/login');
            }
        })
        .catch();
}
