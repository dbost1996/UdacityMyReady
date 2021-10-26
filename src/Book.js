import React from "react";
import BookShelfChanger from "./BookShelfChanger";
import noCover from "./icons/noCover.jpg"

function addDefaultImg(book) {
    if(book.imageLinks){
        return book.imageLinks.smallThumbnail
    }else{
        return noCover
    }
}

function Book(props){
    return(
        <ol className="books-grid">
            {props.books.map((book) => (

                <li key={book.id}>

                        <div className="book">
                            <div className="book-top">
                                <img style={{ width: 128, height: 193 }} src={addDefaultImg(book)} alt='book cover' onError={addDefaultImg} />
                                <BookShelfChanger book={book}
                                                  changeBookshelf={props.changeBookshelf}></BookShelfChanger>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                        </div>

                </li>
            ))}
        </ol>
    )
}

export default Book