import {createContext, useContext, useState} from "react";
import {del, get, post, put} from "../api/api";
import {errorType, showSnackbar, successType} from "../utils/snackbar-display";

const BooksContext = createContext();
export function BooksProvider({children}){
    const [availableOnly, setAvailableOnly] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [bookResults, setBookResults] = useState([]);
    const [searchBarResults, setSearchBarResults] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);

    const fetchSearchBarResults = (term, authorId) => {

        return new Promise((resolve, reject) => {
            const response = (data) => {
                setSearchBarResults(data);
                console.log("Search bar results", data);
                resolve(data);
            };
            fetchBooks(term, response, authorId);
        });
    };

    const fetchBookResults = (term, authorId) => {
        const response = (data) => {
            setBookResults(data);
            console.log("Book results", data);
        };
        fetchBooks(term, response, authorId);
    };

    const fetchBooks = (term, response, authorId) => {
        const url = 'library/search';
        const params = {
            searchedValue: term,
            searchOnlyAvailable: availableOnly,
        };
        const genreIds = getGenreIds();
        if (genreIds !== undefined) {
            params.genreIds = genreIds;
        }
        if (authorId !== undefined && authorId !== null) {
            params.authorId = authorId;
        }
        get(url, params, false, response);
    };

    const getGenreIds = () => {
        if(selectedGenres.length > 0) return selectedGenres.map(genre => genre.id);
        else return undefined;
    }

    const fetchSelectedBook = (bookId) => {
        const url = "library/get";
        const params = {
            bookId: bookId
        };
        const response = (book) => {
            setSelectedBook(book);
        };
        get(url, params, false, response);

    }

    const fetchGenres = () => {
        const url = "library/genres";
        const response = (data) => {
            setGenres(data);
        };
        get(url, undefined, false, response);
    }

    const fetchReviews = (bookId, setReviews) => {
        const url = "library/review";
        const params = {
            bookId: bookId
        }
        const response = (data) => {
            console.log(`Fetched review for book with ID ${bookId}`);
            setReviews(data);
        }
        get(url, params, false, response);
    }

    const fetchAvailability = (bookId, setAvailability) => {
        const url = "library/available"
        const response = (data) => {
            setAvailability(data);
        }
        const params = {
            bookId: bookId
        }
        get(url, params, false, response);
    }

    const fetchLoans = (callback) => {
        const url = "member/loan/get-all";
        const response = (data) => {
            callback(data)
        }
        get(url, {}, true, response, undefined, true);
    }

    const deleteReview = (bookId, callback) => {
        const url = "member/review/delete";
        const params = {
            bookId: bookId
        }
        const response = () => {
            callback();
        }
        del(url, params, true, response, undefined, true);
    }

    const createReview = (bookId, callback, comment, rating) => {
        const url = "member/review/create";
        const body = {
            bookId: bookId,
            comment: comment,
            rating: rating
        }
        const response = (data) => {
            callback(data);
        }
        post(url, {}, body, true, response, undefined, true);
    }

    const editReview = (bookId, callback, rating, comment) =>{
        const url = "member/review/edit";
        const params = {
            bookId: bookId
        }
        const body = {
            bookId: bookId,
            comment: comment,
            rating: rating
        }
        const response = (data) => {
            callback(data);
        }
        put(url, params, body, true, response, undefined, true);
    }

    const createReservation = (bookId, callback) =>{
        const url = "member/reservation/create";
        const params = {
            bookId: bookId
        }
        const response = (reservation) => {
            callback();
            showSnackbar("Reservation successful", successType);
        }
        const error = (error) => {
            console.error(error)
            showSnackbar("Cannot create reservation", errorType);
        }
        post(url, params, {}, true, response, error, true);
    }

    const fetchReservations = (callback) => {
        const url = "member/reservation/get-all";
        const response = (data) =>{
            console.log(data);
            callback(data);
        }
        get(url, {}, true, response, undefined, true);
    }

    return (
        <BooksContext.Provider value={{
            availableOnly,
            setAvailableOnly,
            selectedBook,
            setSelectedBook,
            bookResults,
            setBookResults,
            searchBarResults,
            setSearchBarResults,
            selectedGenres,
            setSelectedGenres,
            genres,
            setGenres,
            fetchSearchBarResults,
            fetchBookResults,
            fetchSelectedBook,
            fetchGenres,
            fetchReviews,
            fetchAvailability,
            fetchLoans,
            deleteReview,
            editReview,
            createReview,
            createReservation,
            fetchReservations
        }}>
            {children}
        </BooksContext.Provider>
    );

}

export function useBooksContext(){
    return useContext(BooksContext);
}
