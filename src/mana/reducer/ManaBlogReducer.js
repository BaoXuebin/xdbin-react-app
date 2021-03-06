import { ManaBlogActionTypes } from '../action/ManaBlogAction';
import Collections from '../../utils/Collections';

const initState = {
    loading: false,
    error: null,
    blogs: [],
    total: 0, // 全部页数
    current: 0, // 当前页数
    modal: false // 是否显示笔记删除提示框
};

const ManaBlogReducer = (state = initState, action) => {
    switch (action.type) {
        case ManaBlogActionTypes.FETCH_ALL_BLOG:
            return Object.assign({}, state, { loading: true });
        case ManaBlogActionTypes.FETCH_ALL_BLOG_SUCCESS: {
            const { blogs, total, current } = action;
            return Object.assign({}, state, {
                loading: false,
                blogs,
                total,
                current
            });
        }
        case ManaBlogActionTypes.FETCH_ALL_BLOG_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        case ManaBlogActionTypes.CHANGE_CURRENT_PAGE:
            return Object.assign({}, state, { current: action.current });
        case ManaBlogActionTypes.TOGGLE_BLOG_PUB_SUCCESS: {
            const { blogId, ifPub } = action;
            const index = Collections.indexOf(state.blogs, blog => blog.blogId === blogId);
            const newBlogs = [...state.blogs];
            if (index >= 0) {
                newBlogs[index].ifPub = ifPub;
            }
            return Object.assign({}, state, { blogs: newBlogs });
        }
        case ManaBlogActionTypes.SHOW_DEL_BLOG_MODAL:
            return Object.assign({}, state, { modal: true, delBlogId: action.blogId });
        case ManaBlogActionTypes.HIDE_DEL_BLOG_MODAL:
            return Object.assign({}, state, { modal: false });
        case ManaBlogActionTypes.DEL_BLOG_SUCCESS:
            return Object.assign({}, state, { blogs: state.blogs.filter(b => b.blogId !== action.blogId) });
        default:
            return state;
    }
};

export default ManaBlogReducer;

