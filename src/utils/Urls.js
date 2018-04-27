import Config from '../config/Config';

const base = Config.baseUrl;

export const FETCH_BLOG_LIST_URL = `${base}blogs`;
export const FETCH_BLOG_DETAIL_URL = `${base}blog/`;
export const FETCH_ALL_TAG_URL = `${base}tags`;
export const FETCH_BLOGS_BY_TAG_URL = `${base}blogs`;
export const FETCH_STAR_BLOGS_URL = `${base}blog/star`;
