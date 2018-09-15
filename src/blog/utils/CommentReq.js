import Net from '../../utils/Net';
import {
    FETCH_BLOG_COMMENT,
    FETCH_COMMENT,
    PUBLISH_COMMENT
} from '../../utils/Urls';

export const redirect = (res, url = '/') => {
    res.writeHead(302, { Location: url });
    res.end();
};

export const fetchBlogCommentReq = (blogId, page) => new Promise((resolve, reject) => {
    Net.fetch(`${FETCH_BLOG_COMMENT}?origin=${blogId}&page=${page || 1}`)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});

export const fetchCommentReq = commentId => new Promise((resolve, reject) => {
    Net.fetch(`${FETCH_COMMENT}/${commentId}`)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});

export const publishCommentReq = comment => new Promise((resolve, reject) => {
    Net.fetch(PUBLISH_COMMENT, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});
