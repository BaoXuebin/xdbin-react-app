import Config from '../config/Config';

const base = Config.baseUrl;

export const FETCH_BLOG_LIST_URL = `${base}blogs`;
export const FETCH_BLOG_DETAIL_URL = `${base}blog/`;
export const FETCH_EDIT_BLOG_DETAIL_URL = `${base}blog/update/`;
export const FETCH_ALL_TAG_URL = `${base}tags`;
export const FETCH_BLOGS_BY_TAG_URL = `${base}blogs`;
export const FETCH_STAR_BLOGS_URL = `${base}blog/star`;
export const LOGIN_URL = `${base}login`; // 登录
export const AUTH_TOKEN_URL = `${base}validate`; // token 验证
export const FETCH_ALL_BLOG_URL = `${base}blogs/all`; // 所有的 blog
export const TOGGLE_BLOG_PUB_URL = `${base}blog/togglePub`; // 切换博客是否可见
export const ADD_TAG_URL = `${base}tag`; // 添加标签
export const DEL_TAG_URL = `${base}tag`; // 删除标签
export const ADD_BLOG_URL = `${base}blog`; // 添加笔记
export const DEL_BLOG_URL = `${base}blog`; // 删除笔记

export const FETCH_QINIU_TOKEN_URL = `${base}/qiniu/token`; // 七牛文件上传 token

// video
export const FETCH_VIDEO_URL = `${base}/video`;
export const FETCH_ALL_VIDEO_URL = `${base}/video/all`;

// comment
export const FETCH_BLOG_COMMENT = `${base}comment`;
export const FETCH_COMMENT = `${base}comment`; // /comment/23
export const PUBLISH_COMMENT = `${base}comment`; // POST 请求
