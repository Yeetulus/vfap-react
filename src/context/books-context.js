import {createContext, useContext, useState} from "react";
import {del, get, post, put} from "../api/api";
import {errorType, showSnackbar, successType} from "../utils/snackbar-display";
import {useNavigate} from "react-router-dom";
import {eliminatedState} from "../utils/copy-states";

const BooksContext = createContext();
export function BooksProvider({children}){
    const [availableOnly, setAvailableOnly] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [bookResults, setBookResults] = useState([]);
    const [searchBarResults, setSearchBarResults] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);

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

    const createGenre = (name) => {
        const url = "librarian/genre/create";
        const params = {
            genreName: name
        }
        const response = (genre) => {
            setGenres([...genres, genre]);
            showSnackbar(`Created genre: ${genre.name}`, successType);
        }
        const error = () => {
            showSnackbar("Cannot create genre", errorType);
        }
        post(url, params, {}, true, response, error, redirect);
    }
    const editGenre = (name, newName) => {
        const url = "librarian/genre/update";
        const params = {
            genreName: name,
            newName: newName
        }
        const response = (genre) => {
            const index = genres.findIndex(g => g.name === name);
            if (index !== -1) {
                const updatedGenres = [...genres];
                updatedGenres[index] = genre;
                setGenres(updatedGenres);
                showSnackbar(`Updated genre: ${genre.name}`, successType);
            } else {
                showSnackbar("Cannot update genre", errorType);
            }
        };

        const error = () => {
            showSnackbar("Cannot update genre", errorType);
        }
        put(url, params, {}, true, response, error, redirect);
    }

    const deleteGenre = (name) => {
        const url = "librarian/genre/delete";
        const params = {
            name: name
        }
        const response = () => {
            const updatedGenres = genres.filter(genre => genre.name !== name);
            setGenres(updatedGenres);
            showSnackbar(`Deleted genre ${name}`, successType);
        }
        const error = () => {
            showSnackbar("Cannot delete genre", errorType);
        }
        del(url, params, true, response, error, redirect);
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
        get(url, params, true, response, () => {}, redirect);
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
            callback(reservation);
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

    const eliminateCopy = (copyId, callback) => {
        const url = "librarian/copy/update";
        const params = {
            copyId: copyId,
            condition: eliminatedState
        };
        const response = (data) => {
            callback(data);
            showSnackbar("Eliminated copy", successType)
        }
        const error = () => {
            showSnackbar("Could not eliminate copy", errorType)
        }
        put(url, params, {}, true, response, error, redirect);
    }

    const createCopy = (bookId, callback) => {
        const url = "librarian/copy/create";
        const params = {
            bookId: bookId
        };
        const response= (copy) => {
            callback(copy);
            showSnackbar("Created new copy", successType);
        }
        const error = () => {
            showSnackbar("Cannot create new copy", errorType);
        }
        post(url, params, {}, true, response, error, redirect);
    }

    const fetchAuthors = () => {
        const url = "librarian/author/get-all";
        const response = (data) =>{
            console.log(data);
            setAuthors(data);
        };
        get(url, {}, true, response, undefined, redirect);
    }


    const createAuthor = (name) => {
        const url = "librarian/author/create";
        const params = {
            name: name
        }
        const response = (data) => {
            setAuthors([...authors, data]);
            showSnackbar("Created new author", successType);
        };
        post(url, params, {}, true, response, undefined, redirect);
    }

    const editAuthor = (id, newName) => {
        const url = "librarian/author/update";
        const params = {
            id: id,
            newName: newName
        }
        const response = (data) => {
            const updatedAuthors = authors.map(author => {
                if (author.id === id) {
                    return { ...author, name: data.name };
                } else {
                    return author;
                }
            });
            setAuthors(updatedAuthors);
            showSnackbar("Updated author", successType);
        };
        const error = () => {
            showSnackbar("Cannot update author", errorType);
        }
        put(url, params, {}, true, response, error, redirect);
    }

    const deleteAuthor = (id) => {
        const url = "librarian/author/delete";
        const params = {
            id: id,
        }
        const response = () => {
            const updatedAuthors = authors.filter(author => author.id !== id);
            setAuthors(updatedAuthors);
            showSnackbar("Deleted author", successType);
        };
        const error = () => {
            showSnackbar("Cannot delete author", errorType);
        }
        del(url, params,  true, response, error, redirect);
    }

    const createBook = (body, success) => {
        const url = "librarian/book/create";
        const response = (newBook) => {
            console.log("New Book", newBook);
            success(newBook);
            showSnackbar("Book created", successType);
        }
        const error = () => {
            showSnackbar("Cannot create book", errorType);
        }
        post(url, {}, body, true, response, error, redirect);
    }

    const editBook = (body, success) => {
        const url = "librarian/book/update";
        const response = (newBook) => {
            success(newBook);
            showSnackbar("Book updated", successType);
        }
        const error = () => {
            showSnackbar("Cannot update book", errorType);
        }
        put(url, {}, body, true, response, error, redirect);
    }

    const deleteBook = (bookId, success) => {
        const url = "librarian/book/delete";
        const params = {
            id: bookId
        };
        const response = () => {
            success();
            showSnackbar("Book deleted", successType);
        }
        const error = () => {
            showSnackbar("Cannot delete book", errorType);
        }
        del(url, params, true, response, error, redirect);
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
            createGenre,
            editGenre,
            deleteGenre,
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
            fetchCopies,
            eliminateCopy,
            createCopy,
            authors,
            setAuthors,
            fetchAuthors,
            createAuthor,
            editAuthor,
            deleteAuthor,
            createBook,
            editBook,
            deleteBook,

        }}>
            {children}
        </BooksContext.Provider>
    );

}

export function useBooksContext(){
    return useContext(BooksContext);
}
