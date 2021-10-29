import React, { Component} from "react";
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
import Book from "./Book";

class BookSearch extends Component{
    state = {
        query: ''
    }

    static propTypes = {
        books: PropTypes.array.isRequired,
        changeBookshelf: PropTypes.func.isRequired,
        searchBooks: PropTypes.func.isRequired
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
    }

    updateSearch = (event) => {
        const value = event.target.value;
        this.setState({
                query: value
            }, () => {
            setTimeout(() => {
                this.props.searchBooks(this.state.query)
            }, 1000);})
    };

    resetSearch = () =>{
        this.setState({
            query: ''
        })
        this.props.resetSearch()
    }

    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query}
                               onChange={this.updateSearch}/>
                        <Link to='/' onClick={this.resetSearch}>Go back to shelves</Link>
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.query === '' &&
                    <div> Search for new Books! </div>}
                    {this.props.books !== [] &&
                    <Book books={this.props.books}
                          changeBookshelf={this.props.changeBookshelf}></Book>
                    }
                </div>
            </div>
        )
    }
}

export default BookSearch