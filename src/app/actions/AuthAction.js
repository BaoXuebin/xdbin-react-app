import fetch from 'isomorphic-fetch';

export const ActionConstants = {
    INVALID_TOKEN: 'INVALID_TOKEN'
};

// 需要 token 验证的请求
export default function authFetch(dispatch, url, params, success, error, history) {
    const token = localStorage.token;
    if (!token) {
        dispatch({
            type: ActionConstants.INVALID_TOKEN
        });
        history.push('/login');
        return null;
    }
    const _params = params;
    _params.headers = Object.assign({}, params.headers, { auth: token });
    return fetch(url, params)
        .then(response => response.json())
        .then((json) => {
            if (json.status >= 400) {
                dispatch(error());
            } else if (json.code && json.code === 401) {
                history.push('/login');
                dispatch(error(json.error));
            } else {
                dispatch(success(json));
            }
        })
        .catch(() => {
            dispatch(error());
        });
}
