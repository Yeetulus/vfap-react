import {useBooksContext} from "../../../context/books-context";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getReleaseYear} from "../../../utils/date-utils";
import {StarFill} from "react-bootstrap-icons";
import {Card, Pagination} from "react-bootstrap";

export function BookDetail() {

    const [reviews, setReviews] = useState(null);
    const [availability, setAvailability] = useState(0);

    const navigate = useNavigate();
    const {
        selectedBook,
        fetchSelectedBook,
        fetchBookResults,
        fetchReviews,
        fetchAvailability
    } = useBooksContext();
    const { id } = useParams();

    useEffect(() => {
        if(!selectedBook || selectedBook.id.toString() === id){
            fetchSelectedBook(id);
        }
    }, [id]);

    useEffect(() => {
        if(selectedBook === undefined || selectedBook === null) return;

        fetchReviews(selectedBook.id, (data) => {
            pageCount = Math.ceil(data.messages.length / ITEMS_PER_PAGE);
            offset = currentPage * ITEMS_PER_PAGE;
            currentPageReviews = data.messages.slice(offset, offset + ITEMS_PER_PAGE);
            setReviews(data);
            console.log(data.messages);
        });
        fetchAvailability(selectedBook.id, (data) => setAvailability(data))

    }, [selectedBook]);

    const searchAuthorBooks = (authorId) => {
        fetchBookResults('', authorId);
        navigate("/");
    }

    const ITEMS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    let offset = 0;
    let pageCount = 1;
    let currentPageReviews = [];

    return(
        <>
            {
                selectedBook? (
                    <div className={"mt-2 ms-4 h-100 scrollbar"}>
                        <h3 className={"text-primary-bold"}>{selectedBook.title}</h3>
                        <p className={"text-clickable-primary fw-bold"}>{selectedBook.genre.name}</p>
                        {
                            (selectedBook.authors?.length > 0)?
                            <div className="book-view-authors">
                            {
                                selectedBook.authors.map((author, index) =>
                                    <h4 key={index} className={"text-clickable-primary"}
                                        onClick={() => searchAuthorBooks(author.id)}>{author.name}</h4>
                                )
                            }

                            </div> : <></>
                        }
                        <br/><span>Released: {getReleaseYear(selectedBook.releaseDate)}</span>
                        <br/><span>Pages: {selectedBook.pages}</span>
                        <br/><span>Available: <span className={availability!==0? "text-success-bold" : "text-danger-bold"}>{availability}</span></span><br/>
                        {reviews?.reviewsCount > 0 ? (
                            <>
                                <h4 style={{ marginLeft: "-2px", marginTop: "4px" }}>Reviews</h4>
                                <div className="d-flex align-items-center">
                                    <span>{reviews.average.toFixed(1)}</span>
                                    <StarFill color={"#ffea00"} className="star-icon" />
                                    <span className="text-grey">({reviews.reviewsCount})</span>
                                </div>
                                <div className={"pb-2"}>
                                    {currentPageReviews.map((message, index) => (
                                        <Card key={index} className="my-1 me-4 col-md-6 col-lg-4">
                                            <Card.Body>
                                                <div className="d-flex rating-info align-items-center">
                                                    <span>{message.rating}</span>
                                                    <StarFill color={"#ffea00"} className="star-icon" />
                                                </div>
                                                <Card.Title>{message.name}</Card.Title>
                                                <Card.Text>{message.comment}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                                {pageCount > 1 && (
                                    <Pagination className="mt-3 justify-content-start">
                                        {currentPage !== 0 && (
                                            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
                                        )}
                                        {Array.from({ length: pageCount }).map((_, index) => (
                                            <Pagination.Item
                                                key={index}
                                                active={index === currentPage}
                                                onClick={() => handlePageChange(index)}
                                            >
                                                {index + 1}
                                            </Pagination.Item>
                                        ))}
                                        {currentPage !== pageCount - 1 && (
                                            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
                                        )}
                                    </Pagination>
                                )}
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                ) : (
                    <p className="mt-4 ms-4">No book found</p>
                )}
        </>
    );
};