import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { Grid, Segment, Divider, Button } from 'semantic-ui-react';

import LabStore from '../../src/blog/store/LabStore';
import LabLayout from '../../src/lab/container/LabLayout';
import BookItem from '../../src/blog/component/lab/book/BookItem';
import { fetchAllBooksReq } from '../../src/blog/utils/BookReq';

class Book extends Component {
  static async getInitialProps() {
    const global = {
      logo: {
        name: 'book',
        text: '图书'
      },
      title: '「图书」'
    };
    await fetchAllBooksReq({ pageNo: 1, pageSize: 12 })
      .then((res) => {
        console.log(res);
        const { content, last, pageNo, pageSize, total } = res;
        global.books = content;
        global.last = last;
        global.pageNo = pageNo;
        global.pageSize = pageSize;
        global.total = total;
      })
      .catch((e) => { console.log(e); });
    return { global };
  }

  constructor(props) {
    super(props);
    const { books, last, pageNo, pageSize, total } = this.props.global;
    this.state = { books, last, pageNo, pageSize, total, loading: false };
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  handleLoadMore() {
    this.setState({ loading: true });
    fetchAllBooksReq({ pageNo: this.state.pageNo + 1, pageSize: 12 })
      .then((result) => {
        const {
          pageNo,
          pageSize,
          total,
          content,
          last
        } = result;
        this.setState({
          pageNo,
          total,
          books: this.state.books.concat(content),
          pageSize,
          last
        });
      })
      .catch((e) => { console.error(e); })
      .finally(() => { this.setState({ loading: false }); });
  }

  render() {
    const { books, last, loading } = this.state;
    console.log(books);
    const _html = books.map(book => <Grid.Column key={book.id}><BookItem book={book} /></Grid.Column>);
    return (
      <Segment className="lab-container">
        <Divider />
        <Grid doubling columns={4} textAlign="center" verticalAlign="top">
          {_html}
        </Grid>
        {!last && <div style={{ textAlign: 'center', marginTop: '20px' }}><Button loading={loading} content="更多图书" basic size="tiny" onClick={this.handleLoadMore} /></div>}
      </Segment>
    );
  }
}

export default withRedux(LabStore, null, null)(LabLayout(Book));
