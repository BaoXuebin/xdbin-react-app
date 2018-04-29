import { fetchAllBlogReq } from '../util/ManaReq';

export const ManaBlogActionTypes = {
    FETCH_ALL_BLOG: 'FETCH_ALL_BLOG',
    FETCH_ALL_BLOG_SUCCESS: 'FETCH_ALL_BLOG_SUCCESS',
    FETCH_ALL_BLOG_ERROR: 'FETCH_ALL_BLOG_ERROR'
};

const fetchAllBlog = () => ({
    type: ManaBlogActionTypes.FETCH_ALL_BLOG
});

const fetchAllBlogSuccess = (blogs, total) => ({
    type: ManaBlogActionTypes.FETCH_ALL_BLOG_SUCCESS,
    blogs,
    total
});

const fetchAllBlogError = error => ({
    type: ManaBlogActionTypes.FETCH_ALL_BLOG,
    error
});

export const fetchAllBlogIfNeeded = page => (dispatch, getState) => {
    const { loading } = getState().blog;
    if (loading) {
        dispatch(fetchAllBlogError('请求中，稍后再试'));
    }
    dispatch(fetchAllBlog());
    return fetchAllBlogReq(page)
        .then((blogs, total) => { dispatch(fetchAllBlogSuccess(blogs, total)); })
        .catch((error) => { dispatch(fetchAllBlogError(error)); });
};
