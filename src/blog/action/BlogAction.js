import { fetchBlogListReq, fetchBlogDetailReq } from '../utils/BlogReq';
import { setKeyword } from './SearchAction';

export const BlogActionTypes = {
    INIT_BLOG: 'INIT_BLOG',
    FETCH_BLOG_LIST: 'FETCH_BLOG_LIST',
    FETCH_BLOG_LIST_SUCCESS: 'FETCH_BLOG_LIST_SUCCESS',
    FETCH_BLOG_LIST_ERROR: 'FETCH_BLOG_LIST_ERROR',
    FETCH_BLOG_DETAIL: 'FETCH_BLOG_DETAIL',
    FETCH_BLOG_DETAIL_SUCCESS: 'FETCH_BLOG_DETAIL_SUCCESS',
    FETCH_BLOG_DETAIL_ERROR: 'FETCH_BLOG_DETAIL_ERROR'
};

export const initBlogs = blogs => ({
    type: BlogActionTypes.INIT_BLOG,
    blogs
});

const fetchBlogList = () => ({
    type: BlogActionTypes.FETCH_BLOG_LIST
});

const fetchBlogListSuccess = (page, blogs, append) => ({
    type: BlogActionTypes.FETCH_BLOG_LIST_SUCCESS,
    page,
    blogs,
    append
});

const fetchBlogListError = error => ({
    type: BlogActionTypes.FETCH_BLOG_LIST_ERROR,
    error
});

// append 查询结果是否追加
export const fetchBlogListIfNeeded = (page, month, append) => (dispatch, getState) => {
    const { loading } = getState().blog;
    const { keyword } = getState().search;
    if (loading) {
        return dispatch(fetchBlogListError('正在请求中，稍后再试'));
    }
    if (keyword || keyword === '') {
        dispatch(setKeyword(keyword));
    }
    dispatch(fetchBlogList());
    return fetchBlogListReq({ page, keyword, month })
        .then((blogs) => { dispatch(fetchBlogListSuccess(page, blogs, append)); })
        .catch((err) => { dispatch(fetchBlogListError(err)); });
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
