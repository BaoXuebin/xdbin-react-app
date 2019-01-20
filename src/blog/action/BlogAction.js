import { fetchBlogDetailReq } from '../utils/BlogReq';

export const BlogActionTypes = {
    FETCH_BLOG_DETAIL: 'FETCH_BLOG_DETAIL',
    FETCH_BLOG_DETAIL_SUCCESS: 'FETCH_BLOG_DETAIL_SUCCESS',
    FETCH_BLOG_DETAIL_ERROR: 'FETCH_BLOG_DETAIL_ERROR'
};

// 查询单个博客的内容
const fetchBlogDetail = () => ({
    type: BlogActionTypes.FETCH_BLOG_DETAIL
});
const fetchBlogDetailSuccess = blog => ({
    type: BlogActionTypes.FETCH_BLOG_DETAIL_SUCCESS,
    blog
});
const fetchBlogDetailError = error => ({
    type: BlogActionTypes.FETCH_BLOG_DETAIL_ERROR,
    error
});

export const fetchBlogDetailIfNeeded = blogId => (dispatch, getState) => {
    const { loading } = getState().blog;
    if (loading) {
        return dispatch(fetchBlogDetailError('正在请求中，稍后再试'));
    }
    dispatch(fetchBlogDetail());
    return fetchBlogDetailReq(blogId)
        .then((blog) => { dispatch(fetchBlogDetailSuccess(blog)); })
        .catch((err) => { dispatch(fetchBlogDetailError(err)); });
};
