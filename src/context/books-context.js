import {createContext, useContext, useState} from "react";
import {get} from "../api/api";

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
            fetchAvailability
        }}>
            {children}
        </BooksContext.Provider>
    );

}

export function useBooksContext(){
    return useContext(BooksContext);
}
