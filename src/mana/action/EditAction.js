import { saveBlogReq } from '../util/ManaReq';

export const EditActionTypes = {
    INIT_TAGS: 'INIT_TAGS',
    INIT_EDIT_BLOG: 'INIT_EDIT_BLOG',
    SAVE_BLOG: 'SAVE_BLOG',
    SAVE_BLOG_SUCCESS: 'SAVE_BLOG_SUCCESS',
    SAVE_BLOG_ERROR: 'SAVE_BLOG_ERROR',
    CLEAR_EDIT_ERROR: 'CLEAR_EDIT_ERROR',
    DEL_BLOG_TAG: 'DEL_BLOG_TAG',
    ADD_BLOG_TAG: 'ADD_BLOG_TAG',
    TOGGLE_IFPUB: 'TOGGLE_IFPUB'
};

export const initTags = tags => ({
    type: EditActionTypes.INIT_TAGS,
    tags
});

export const initEditBlog = blog => ({
    type: EditActionTypes.INIT_EDIT_BLOG,
    blog
});

const saveBlog = () => ({
    type: EditActionTypes.SAVE_BLOG
});

const saveBlogSuccess = blog => ({
    type: EditActionTypes.SAVE_BLOG_SUCCESS,
    blog
});

const saveBlogError = error => ({
    type: EditActionTypes.SAVE_BLOG_ERROR,
    error
});

export const saveBlogIfNeeded = blog => (dispatch) => {
    if (!blog.content) {
        return dispatch(saveBlogError('笔记内容不能为空'));
    }
    dispatch(saveBlog());
    return saveBlogReq(blog)
        .then((b) => {
            if (blog.blogId) { // 修改
                dispatch(saveBlogSuccess(b));
            } else { // 新增
                dispatch(saveBlogSuccess({
                    title: '这里填写标题',
                    tags: [],
                    content: '',
                    summary: '',
                    ifPub: true
                }));
            }
        })
        .catch((error) => { dispatch(saveBlogError(error)); });
};

export const clearError = () => ({
    type: EditActionTypes.CLEAR_EDIT_ERROR
});

export const delBlogTag = tagId => ({
    type: EditActionTypes.DEL_BLOG_TAG,
    tagId
});

export const addBlogTag = tagId => ({
    type: EditActionTypes.ADD_BLOG_TAG,
    tagId
});

export const toggleIfPub = () => ({
    type: EditActionTypes.TOGGLE_IFPUB
});

