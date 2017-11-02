import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfName: PropTypes.string.isRequired,
    handleShelfChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    // this.state = {shelf: props.shelf};
    this.handleShelfChange = this.handleShelfChange.bind(this);
  }

  handleShelfChange(id, shelf) {
    console.log('shelf');
    this.props.handleShelfChange(id, shelf);
  }

  render() {
    const shelf = [];
    this.props.books.forEach((book) => {
      shelf.push(
        <Book
          authors={book.authors}
          title={book.title}
          shelf={book.shelf}
          img={book.imageLinks.thumbnail}
          handleShelfChange={this.handleShelfChange}
          id={book.id}
          key={book.title}
        />
      );
    });
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelf}
          </ol>
        </div>
      </div>
    )
  }
}

class Library extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleShelfChange = this.handleShelfChange.bind(this);
  }

  handleShelfChange(id, shelf) {
    console.log('lib');
    this.props.handleShelfChange(id, shelf);
  }

  render() {
    const shelves = new Map([]);
    this.props.books.forEach((book) => {
      if (shelves.has(book.shelf)) {
        const shelf = shelves.get(book.shelf);
        shelf.push(book);
        shelves.set(book.shelf, shelf);
      } else {
        shelves.set(book.shelf, [book]);
      }}
    )

    const bookshelves = [];

    for (const [key, shelf] of shelves) {
      bookshelves.push(
        <Bookshelf
          books={shelf}
          shelfName={key}
          handleShelfChange={this.handleShelfChange}
          key={key} />
      );
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelves}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Library