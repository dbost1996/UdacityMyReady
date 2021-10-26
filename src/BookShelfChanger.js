import React, {Component} from "react";
import PropTypes from "prop-types";

class BookShelfChanger extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        changeBookshelf: PropTypes.func.isRequired
    }
    state = {
        value: this.props.book.shelf,
    }

    selectChange = (event) => {
        const value = event.target.value;
        this.props.changeBookshelf(this.props.book, value)
    };

    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.state.value}
                        onChange={this.selectChange} >
                    <option value="move" disabled>
                        Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}
export default BookShelfChanger