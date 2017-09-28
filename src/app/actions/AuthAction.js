import fetch from 'isomorphic-fetch';

// 需要 token 验证的请求
export default function authFetch(dispatch, url, params, success, error, history) {
    const token = localStorage.token;
    if (!token) {
        history.push('/login');
        return null;
    }
    const _params = params;
    _params.headers = Object.assign({}, params.headers, { auth: token });
    return fetch(url, params)
        .then(response => response.json())
        .then((json) => {
            if (json.code === 401) {
                history.push('/login');
                dispatch(error(json));
            } else {
                dispatch(success(json));
            }
        })
        .catch(() => {
            dispatch(error());
        });
}
