import React from 'react';
import { Image } from 'semantic-ui-react';

const BookItem = ({ book }) => (
  <div>
    <div className="book-item-component">
      <div className="book-conver">
        <Image
          fluid
          label={{ as: 'a', color: 'black', content: book.progress > 0 ? `${book.progress}%` : '未读', ribbon: 'right' }}
          src={book.image}
        />
      </div>
      <div className="book-title single-line">
        {book.title}
      </div>
    </div>
    <style jsx>{`
      .book-item-component {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
      }
      .book-conver {
        cursor: pointer;
        width: 70%;
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
        // box-shadow: 0 0 16px #ccc;
        overflow: hidden;
      }
      .book-cover img {
        height: 100%;
        object-fit: cover;
      }
      .book-title {
        width: 100%;
        cursor: pointer;
        margin-top: 12px;
        font-size: 15px;
        font-weight: 600;
        color: #3F536E;
      }
    `}</style>
  </div>
);

export default BookItem;
