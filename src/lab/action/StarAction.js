import { fetchStarBlogsReq } from '../utils/StarBlogReq';

export const StarActionTypes = {
    FETCH_STAR_BLOG: 'FETCH_STAR_BLOG',
    FETCH_STAR_BLOG_SUCCESS: 'FETCH_STAR_BLOG_SUCCESS',
    FETCH_STAR_BLOG_ERROR: 'FETCH_STAR_BLOG_ERROR'
};

const fetchStarBlog = () => ({
    type: StarActionTypes.FETCH_STAR_BLOG
});
const fetchStarBlogSuccess = (blogs, more) => ({
    type: StarActionTypes.FETCH_STAR_BLOG_SUCCESS,
    blogs,
    more
});
const fetchStarBlogError = error => ({
    type: StarActionTypes.FETCH_STAR_BLOG_ERROR,
    error
});

export const fetchStarBlogIfNeeded = () => (dispatch, getState) => {
    const { page, loading } = getState();
    if (loading) {
        return dispatch(fetchStarBlogError('正在请求中，稍后再试'));
    }
    dispatch(fetchStarBlog());
    return fetchStarBlogsReq(page)
        .then((result) => { dispatch(fetchStarBlogSuccess(result.content, !result.last)); })
        .catch((error) => { dispatch(fetchStarBlogError(error)); });
};
