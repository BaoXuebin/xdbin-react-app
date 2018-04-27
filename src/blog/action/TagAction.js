import { fetchBlogByTagReq } from '../utils/TagReq';

export const TagActionTypes = {
    FETCH_BLOGS_BY_TAG: 'FETCH_BLOGS_BY_TAG',
    FETCH_BLOGS_BY_TAG_SUCCESS: 'FETCH_BLOGS_BY_TAG_SUCCESS',
    FETCH_BLOGS_BY_TAG_ERROR: 'FETCH_BLOGS_BY_TAG_ERROR',
    SELECT_TAG: 'SELECT_TAG',
    INIT_TAG_BLOG: 'INIT_TAG_BLOG'
};

export const initBlogs = blogs => ({
    type: TagActionTypes.INIT_TAG_BLOG,
    blogs
});

const fetchBlogByTag = () => ({
    type: TagActionTypes.FETCH_BLOGS_BY_TAG
});
const fetchBlogByTagSuccess = (page, blogs) => ({
    type: TagActionTypes.FETCH_BLOGS_BY_TAG_SUCCESS,
    page,
    blogs
});
const fetchBlogByTagError = error => ({
    type: TagActionTypes.FETCH_BLOGS_BY_TAG_ERROR,
    error
});

export const fetchBlogByTagIfNeeded = (page, tagId) => (dispatch, getState) => {
    const { loading } = getState().tag;
    if (loading) {
        return dispatch(fetchBlogByTagError('正在请求中，稍后再试'));
    }
    dispatch(fetchBlogByTag());
    return fetchBlogByTagReq(page, tagId)
        .then((blogs) => { dispatch(fetchBlogByTagSuccess(page, blogs)); })
        .catch((err) => { dispatch(fetchBlogByTagError(err)); });
};
