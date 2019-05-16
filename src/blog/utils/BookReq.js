import Net from '../../utils/Net';
import {
  FETCH_ALL_BOOK_URL,
  FETCH_BOOK_BY_BOOKID_URL,
  FETCH_BOOK_COMMENT_URL
} from '../../utils/Urls';

export const redirect = (res, url = '/') => {
  res.writeHead(302, { Location: url });
  res.end();
};

export const fetchAllBooksReq = ({ pageNo, pageSize }) => new Promise((resolve, reject) => {
  Net.fetch(`${FETCH_ALL_BOOK_URL}?pageNo=${pageNo || 1}&pageSize=${pageSize || 10}`)
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error.error || '未知错误');
    });
});

export const fetchBookByBookIdReq = bookId => new Promise((resolve, reject) => {
  Net.fetch(`${FETCH_BOOK_BY_BOOKID_URL}${bookId}`)
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error.error || '未知错误');
    });
});

export const fetchBookCommentReq = ({ pageNo, pageSize, bookId }) => new Promise((resolve, reject) => {
  Net.fetch(`${FETCH_BOOK_COMMENT_URL}${bookId}/comment?pageNo=${pageNo}&pageSize=${pageSize}`)
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error.error || '未知错误');
    });
});
