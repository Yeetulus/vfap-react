import React, {useEffect, useState} from "react";
import {useBooksContext} from "../../../context/books-context";
import {Col, Pagination, Row} from "react-bootstrap";
import '../../../styles/global.scss'
import Sidebar from "../../sidebar/member-sidebar";
import {BookResult} from "../../book-result";
import {useNavigate} from "react-router-dom";

export function BookSearch(){

    const {
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
        fetchGenres

    } = useBooksContext();

    useEffect(() => {
        fetchGenres();
    });

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = bookResults.slice(indexOfFirstBook, indexOfLastBook);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Row className="page-body">
            <Col xs={4} sm={3} lg={2} className="h-100">
                <Sidebar></Sidebar>
            </Col>
            <Col xs={8} sm={9} lg={10} className="h-100">
                <div className="p-1 mt-2"></div>
                <div className="h-75 scrollbar">
                    {currentBooks.map((book, index) => (
                        <BookResult book={book} onClick={() => {
                            setSelectedBook(book);
                            navigate(`/${book.id}`);
                        }} key={index} />
                    ))}

                </div>
                <Pagination className="mt-3 justify-content-start">
                    {bookResults.length > booksPerPage ? (
                        <Pagination.Prev
                            onClick={() =>
                                setCurrentPage(
                                    currentPage > 1 ? currentPage - 1 : currentPage
                                )
                            }
                        />
                    ) : null}
                    {Array.from({ length: Math.ceil(bookResults.length / booksPerPage) }).map(
                        (number, index) => (
                            <Pagination.Item
                                key={index}
                                active={index + 1 === currentPage}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        )
                    )}
                    {bookResults.length > booksPerPage ? (
                        <Pagination.Next
                            onClick={() =>
                                setCurrentPage(
                                    currentPage < Math.ceil(bookResults.length / booksPerPage)
                                        ? currentPage + 1
                                        : currentPage
                                )
                            }
                        />
                    ) : null}
                </Pagination>
            </Col>
        </Row>
    );
}