import Net from '../../utils/Net';
import {
  FETCH_ALL_BOOK_URL
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
