import React, {useEffect, useState} from "react";
import {useBooksContext} from "../../../context/books-context";
import {Form, FormControl} from "react-bootstrap";
import {PlusCircleFill} from "react-bootstrap-icons";
import {LibrarianBookCard} from "../../librarian-components/librarian-book-card";
import {UniversalModal} from "../../universal-modal";
import {formatDateModalInput} from "../../../utils/date-utils";

export function LibraryBooks(){

    const [searchValue, setSearchValue] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(undefined);

    const {
        searchBarResults,
        setSearchBarResults,
        fetchSearchBarResults,
        authors,
        fetchAuthors,
        genres,
        fetchGenres,
        createBook,
        editBook,
        deleteBook
    } = useBooksContext();

    useEffect(() => {
        fetchAuthors();
        fetchGenres();
    }, []);

    function searchValueChanged(value) {
        fetchSearchBarResults(value);
        setSearchValue(value);
    }

    function addBook() {
        setShowCreateModal(true);
    }
    function closeEditModal() {
        setSelectedBook(undefined);
        setShowEditModal(false);
    }
    function openEditModal(book) {
        setShowEditModal(true);
        setSelectedBook(book);
    }
    function closeCreateModal() {
        setShowCreateModal(false);
    }

    function handleCreateBook(formData) {
        const {title, genre, authors, pages, released} = formData;

        const body = {
            title: title,
            pages: pages,
            releaseDate: released,
            genreId: genre,
            authorIds: authors
        }
        const callback = (newBook) => {
            if(newBook.title.includes(searchValue)){
                setSearchBarResults([...searchBarResults, newBook]);
            }
        }
        createBook(body, callback);
    }

    function handleEditBook(formData) {
        const {title, genre, authors, pages, released} = formData;

        const body = {
            bookId: selectedBook.id,
            title: title,
            pages: pages,
            releaseDate: released,
            genreId: genre,
            authorIds: authors
        }

        const callback = (newBook) => {
            const index = searchBarResults.findIndex(book => book.id === newBook.id);
            if (index !== -1) {
                const updatedSearchResults = [...searchBarResults];
                updatedSearchResults[index] = newBook;
                setSearchBarResults(updatedSearchResults);
            }
        }
        editBook(body, callback);
        closeEditModal();
    }

    const createElements = [
        { id: 'title', label: 'Title', type: 'text', placeholder: 'Enter title' },
        { id: 'genre', label: 'Genre', type: 'select', initialValue: genres && genres.length > 0? genres[0].id : "", options: genres, placeholder: 'Select genre' },
        { id: 'authors', label: 'Authors', type: 'multiselect', options: authors, placeholder: 'Select authors' },
        { id: 'pages', label: 'Pages', type: 'number', placeholder: 'Enter number of pages' },
        { id: 'released', label: 'Released', type: 'date', placeholder: 'Select release date' }
    ];

    const editElements = [
        { id: 'title', label: 'Title', type: 'text', initialValue: selectedBook? selectedBook.title : "", placeholder: 'Enter title' },
        { id: 'genre', label: 'Genre', type: 'select', initialValue: selectedBook? selectedBook.genre.id : "", options: genres, placeholder: 'Select genre' },
        { id: 'authors', label: 'Authors', type: 'multiselect',
            initialValue: selectedBook && selectedBook.authors ? selectedBook.authors.map(author => author.id) : [],
            options: authors,
            placeholder: 'Select authors' },
        { id: 'pages', label: 'Pages', type: 'number', initialValue: selectedBook? selectedBook.pages : "", placeholder: 'Enter number of pages' },
        { id: 'released', label: 'Released', type: 'date', initialValue: selectedBook? formatDateModalInput(selectedBook.releaseDate) : "", placeholder: 'Select release date' }
    ];

    function handleDeleteBook(id) {
        const callback = () => {
            const updatedSearchResults = searchBarResults.filter(book => book.id !== id);
            setSearchBarResults(updatedSearchResults);
        };
        deleteBook(id, callback);
    }

    return(
        <div className={"mt-2 ms-4 h-85"}>
            <UniversalModal onConfirm={handleCreateBook} onHide={closeCreateModal} formElements={createElements} show={showCreateModal} confirmText={"Create"} title={"Create new book"} />
            <UniversalModal onConfirm={handleEditBook} onHide={closeEditModal} formElements={editElements} show={showEditModal} confirmText={"Update"} title={`Update ${selectedBook? selectedBook.title: "Book"}`} />
            <div className={"d-flex align-items-center"}>
                <h3>Books</h3>
                <Form className={"ms-3"}>
                    <FormControl
                        type="text"
                        placeholder="Type in book title"
                        value={searchValue}
                        onChange={(e) => searchValueChanged(e.target.value)}
                    />
                </Form>
                <PlusCircleFill onClick={() => addBook()} className={"text-primary text-clickable-grey ms-3 mt-2 h5"}></PlusCircleFill>

            </div>
            <div className={"scrollbar h-85 mt-2"}>
                {
                    searchBarResults.map((book, index) => {
                        return(
                            <LibrarianBookCard key={index} book={book} onEdit={() => openEditModal(book)} onDelete={() => handleDeleteBook(book.id)} />
                        )
                    })
                }
            </div>
        </div>
    )
}