import {createContext, useContext, useState} from "react";
import {del, get, post, put} from "../api/api";
import {errorType, showSnackbar, successType} from "../utils/snackbar-display";
import {Navigate, useNavigate} from "react-router-dom";

const BooksContext = createContext();
export function BooksProvider({children}){
    const [availableOnly, setAvailableOnly] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [bookResults, setBookResults] = useState([]);
    const [searchBarResults, setSearchBarResults] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);

    const navigate = useNavigate();
    const redirect = () => {
        navigate("/login");
    }

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
        get(url, {}, true, response, undefined, redirect);
    }

    const fetchActiveLoans = (callback) => {
        const url = "member/loan/get-all-active";
        const response = (data) => {
            callback(data)
        }
        get(url, {}, true, response, undefined, redirect);
    }

    const fetchLibrarianLoans = (email, callback) => {
        const url = "librarian/loan/user-loans";
        librarianLoans(email, callback, url);
    }
    const fetchLibrarianLoansActive = (email, callback) => {
        const url = "librarian/loan/user-loans-active";
        librarianLoans(email, callback, url);
    }
    const librarianLoans = (email, callback, url) => {
        const params = {
            userEmail: email
        };
        const response = (data) => {
            console.log(data);
            callback(data);
        }
        get(url, params, true, response, undefined, redirect);
    }

    const deleteReview = (bookId, callback) => {
        const url = "member/review/delete";
        const params = {
            bookId: bookId
        }
        const response = () => {
            callback();
        }
        del(url, params, true, response, undefined, redirect);
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
        post(url, {}, body, true, response, undefined, redirect);
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
        put(url, params, body, true, response, undefined, redirect);
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
        post(url, params, {}, true, response, error, redirect);
    }

    const fetchReservations = (callback) => {
        const url = "member/reservation/get-all";
        const response = (data) =>{
            console.log(data);
            callback(data);
        }
        get(url, {}, true, response, undefined, redirect);
    }

    const cancelReservation = (bookId, callback) => {
        const url = "member/reservation/cancel";
        const params = {
            bookId: bookId
        }
        const response = () => {
            showSnackbar("Canceled reservation", successType);
            callback();
        }
        const error = (error) => {
            console.error(error);
            showSnackbar("Cannot cancel reservation", errorType);
        }
        del(url, params, true, response, error, redirect);
    }

    const returnLoan = (loanId, callback) => {
        const url = "librarian/loan/return";
        const params = {
            loanId: loanId
        };
        const response = (data) => {
            callback(data);
        }
        put(url, params, {}, true, response, undefined, redirect);
    }

    const createLoan = (email, copyId, callback) => {
        const url = "librarian/loan/create";
        const params = {
            userEmail: email,
            copyId: copyId
        };
        const response = (data) => {
            callback(data);
        }
        post(url, params, {}, true, response, undefined, redirect);
    }

    const fetchCopies = (bookId, callback) => {
        const url = "librarian/copy/get-all";
        const params = {
            bookId: bookId,
        };
        const response = (data) => {
            callback(data);
        }
        get(url, params, true, response, undefined, redirect);
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
            fetchActiveLoans,
            fetchLibrarianLoansActive,
            fetchLibrarianLoans,
            deleteReview,
            editReview,
            createReview,
            createReservation,
            fetchReservations,
            cancelReservation,
            returnLoan,
            createLoan,
            fetchCopies

        }}>
            {children}
        </BooksContext.Provider>
    );

}

export function useBooksContext(){
    return useContext(BooksContext);
}
