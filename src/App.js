import React from 'react'
import * as BooksAPI from "./BooksAPI";
import {Link, Route} from 'react-router-dom'
import BookSearch from "./BookSearch";
import Book from "./Book";
import './App.css'

class BooksApp extends React.Component {

  state = {
      books: [],
      wantToRead: [],
      currentlyReading: [],
      read: [],
      searchResults: []
  }

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          this.setState(() => ({
              books: books,
              currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
              wantToRead: books.filter(book => book.shelf === 'wantToRead'),
              read: books.filter(book => book.shelf === 'read')
          }))
      })
  }

  changeBookshelf = (book, value) => {
      BooksAPI.update(book, value)
          .then((books) => {
              BooksAPI.getAll().then((books) => {
                  this.setState(() => ({
                      books: books,
                      currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
                      wantToRead: books.filter(book => book.shelf === 'wantToRead'),
                      read: books.filter(book => book.shelf === 'read')
                  }))
              })
          })
    }

    searchBooks = (query) => {
      if(query === ''){
          this.setState(() => ({
              searchResults: []
          }))
      } else {
          BooksAPI.search(query)
              .then((data) => {
                  if(!data.error){
                      data.forEach( element => {
                          if( this.state.currentlyReading.some(el => el.id === element.id) ){
                              element.shelf = 'currentlyReading'
                          } else if( this.state.wantToRead.some(el => el.id === element.id) ){
                              element.shelf = 'wantToRead'
                          } else if( this.state.read.some(el => el.id === element.id) ) {
                              element.shelf = 'read'
                          } else {
                          element.shelf = 'none'
                          }
                      })
                      this.setState(() => ({
                          searchResults: data
                      }))
                  }
                  else{
                      this.setState(() => ({
                          searchResults: []
                      }))
                  }
              })
      }
    }

    resetSearch = () =>{
        this.setState(() => ({
            searchResults: []
        }))
    }

  render() {
    return (
      <div className="app">
          <Route exact path='/' render={() => (
              <div>
                  <div className="list-books">
                      <div className="list-books-title">
                          <h1>MyReads</h1>
                      </div>
                      <Link to='/search'> Search for Books</Link>
                      <div className="list-books-content">
                          <div>
                              <div className="bookshelf">
                                  <h2 className="bookshelf-title">Currently Reading</h2>
                                  <div className="bookshelf-books">
                                    <Book books={this.state.currentlyReading}
                                          changeBookshelf={this.changeBookshelf}></Book>
                                  </div>
                              </div>
                              <div className="bookshelf">
                                  <h2 className="bookshelf-title">Want to Read</h2>
                                  <div className="bookshelf-books">
                                      <Book books={this.state.wantToRead}
                                            changeBookshelf={this.changeBookshelf}></Book>
                                  </div>
                              </div>
                              <div className="bookshelf">
                                  <h2 className="bookshelf-title">Read</h2>
                                  <div className="bookshelf-books">
                                    <Book books={this.state.read}
                                        changeBookshelf={this.changeBookshelf}></Book>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}
          />
          <Route exact path='/search' render={() => (
              <BookSearch books={this.state.searchResults}
                          changeBookshelf={this.changeBookshelf}
                          searchBooks={this.searchBooks}
                          resetSearch={this.resetSearch}></BookSearch>

          )}
          />
      </div>
    )
  }
}

export default BooksApp
