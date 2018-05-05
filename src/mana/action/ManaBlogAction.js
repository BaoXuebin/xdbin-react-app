import { fetchAllBlogReq, toggleBlogPubReq } from '../util/ManaReq';

export const ManaBlogActionTypes = {
    FETCH_ALL_BLOG: 'FETCH_ALL_BLOG',
    FETCH_ALL_BLOG_SUCCESS: 'FETCH_ALL_BLOG_SUCCESS',
    FETCH_ALL_BLOG_ERROR: 'FETCH_ALL_BLOG_ERROR',
    CHANGE_CURRENT_PAGE: 'CHANGE_CURRENT_PAGE',
    CHANGE_TOTAL_PAGE: 'CHANGE_TOTAL_PAGE',
    TOGGLE_BLOG_PUB_SUCCESS: 'TOGGLE_BLOG_PUB_SUCCESS'
};

const fetchAllBlog = () => ({
    type: ManaBlogActionTypes.FETCH_ALL_BLOG
});

const fetchAllBlogSuccess = (blogs, total, current) => ({
    type: ManaBlogActionTypes.FETCH_ALL_BLOG_SUCCESS,
    blogs,
    total,
    current
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
        .then((result) => {
            const { blogs, total, current } = result;
            dispatch(fetchAllBlogSuccess(blogs, total, current));
        })
        .catch((error) => { dispatch(fetchAllBlogError(error)); });
};

// 改变页数
export const changeCurrentPage = current => ({
    type: ManaBlogActionTypes.CHANGE_CURRENT_PAGE,
    current
});
// 改变总页数
export const changeTotalPage = total => ({
    type: ManaBlogActionTypes.CHANGE_TOTAL_PAGE,
    total
});

// 切换是否可见
export const toggleBlogPub = (blogIdd, type) =>
    dispatch => toggleBlogPubReq(blogIdd, type)
        .then((result) => {
            const { blogId, ifPub } = result;
            dispatch({ type: ManaBlogActionTypes.TOGGLE_BLOG_PUB_SUCCESS, blogId, ifPub });
        })
        .catch((e) => { console.error(e); });
