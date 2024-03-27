import {useBooksContext} from "../../../context/books-context";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getReleaseYear} from "../../../utils/date-utils";
import {StarFill} from "react-bootstrap-icons";
import {Button, Card, Form, Pagination} from "react-bootstrap";
import {BookReview} from "../../member-components/book-review";
import RangeSlider from "react-bootstrap-range-slider";
import {useAuthContext, userId} from "../../../context/auth-context";
import {member} from "../../../utils/roles";
import {UniversalModal} from "../../universal-modal";

export function BookDetail() {

    const [reviews, setReviews] = useState(null);
    const [availability, setAvailability] = useState(0);

    const navigate = useNavigate();
    const {authenticated, role} = useAuthContext();
    const {
        selectedBook,
        fetchSelectedBook,
        fetchBookResults,
        fetchReviews,
        fetchAvailability,
        fetchLoans,
        deleteReview,
        editReview,
        createReview,
        createReservation
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
            setReviews(data);
            canLeaveReview(data);
        });
        fetchAvailability(selectedBook.id, (data) => setAvailability(data))

    }, [selectedBook?.id]);

    const searchAuthorBooks = (authorId) => {
        fetchBookResults('', authorId);
        navigate("/");
    }
    const searchGenreBooks = () => {
        fetchBookResults(selectedBook.genre.name)
        navigate("/");
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(5);

    const indexOfLastBook = currentPage * reviewsPerPage;
    const indexOfFirstBook = indexOfLastBook - reviewsPerPage;
    const currentReviews = reviews && reviews.messages? reviews.messages.slice(indexOfFirstBook, indexOfLastBook) : [];
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [sliderValue, setSliderValue] = useState(0);
    const [inputValue, setInputValue] = useState('');

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const handleClose = () => {
        setSelectedMessage(null);
        setShowEditModal(false);
    };
    const handleShowEditModal = (message) => {
        setSelectedMessage(message);
        setShowEditModal(true)
    };
    const handleEditSubmit = () => {
        const success = (data) => {
            fetchReviews(selectedBook.id, (data) => {
                setReviews(data);
                canLeaveReview(data);
            });
        };
        editReview(selectedMessage.bookId, success, sliderValue, inputValue);
        handleClose();
    };

    const handleSliderChange = (event) => {
        setSliderValue(event);
    };
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const submitCreateReview = (event) => {
        const success = (newReview) => {
            fetchReviews(selectedBook.id, (data) => {
                setReviews(data);
                canLeaveReview(data);
            });
        }
        createReview(selectedBook.id, success, inputValue, sliderValue);
        setSliderValue(0);
        setInputValue('');
    };

    const [showReviewForm, setShowReviewForm] = useState(false);

    async function canLeaveReview(data) {
        if(!authenticated || data === null) return false;
        fetchLoans((loans) => {
            const canLeaveReview = loans.some(loan => loan.copy.book.id === selectedBook.id);
            const id = localStorage.getItem(userId);
            const alreadyPostedReview = data.messages.some(message => message.userId.toString() === id);
            setShowReviewForm(canLeaveReview && !alreadyPostedReview);
        });
    }

    const removeReview = (message) => {
        const success = () => {
            fetchReviews(selectedBook.id, (data) => {
                setReviews(data);
                canLeaveReview(data);
            });
        }
        deleteReview(message.bookId, success);
    }

    const handleCreateReservation = () => {
        const success = () => {
            setAvailability(availability- 1);
        }
        createReservation(selectedBook.id, success);
    }

    const formElements = [
        { id: 'input1', label: 'Description', type: 'textarea', placeholder: "Type in your opinion", onChange: handleInputChange },
        { id: 'range1', label: 'Rating', type: 'range', max: 5, min: 0, onChange: handleSliderChange },
    ];

    return(
        <>
            {
                selectedBook? (
                    <div className={"mt-2 ms-4 h-85 scrollbar"}>
                        <h3 className={"text-primary-bold"}>{selectedBook.title}</h3>
                        <p className={"text-clickable-primary fw-bold"} onClick={() => searchGenreBooks()}>{selectedBook.genre.name}</p>
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
                        <br/>
                        {
                            authenticated === false?
                            <>
                                <span>Available: <span
                                className={availability !== 0 ? "text-success-bold" : "text-danger-bold"}>{availability}
                                </span></span>
                                <br/>
                            </> : <></>
                        }
                        {reviews?.reviewsCount > 0 ? (
                            <>
                                <h4 style={{ marginLeft: "-2px", marginTop: "4px" }}>Reviews</h4>
                                <div className="d-flex align-items-center">
                                    <span>{reviews.average.toFixed(1)}</span>
                                    <StarFill color={"#ffea00"} className="star-icon" />
                                    <span className="text-grey">({reviews.reviewsCount})</span>
                                </div>
                                { reviews?.messages?.length > 0 && ( <div className={"pb-2"}>
                                    {currentReviews.map((message, index) => (
                                        <BookReview key={index} message={message} onEdit={() => handleShowEditModal(message)} onDelete={() => removeReview(message)}></BookReview>
                                    ))}
                                </div> )}
                                { reviews?.messages?.length > 0 && (<Pagination className="mt-3 justify-content-start">
                                    {reviews.messages.length > reviewsPerPage ? (
                                        <Pagination.Prev
                                            onClick={() =>
                                                setCurrentPage(
                                                    currentPage > 1 ? currentPage - 1 : currentPage
                                                )
                                            }
                                        />
                                    ) : null}
                                    {Array.from({length: Math.ceil(reviews.messages.length / reviewsPerPage)}).map(
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
                                    {reviews.messages.length > reviewsPerPage ? (
                                        <Pagination.Next
                                            onClick={() =>
                                                setCurrentPage(
                                                    currentPage < Math.ceil(reviews.messages.length / reviewsPerPage)
                                                        ? currentPage + 1
                                                        : currentPage
                                                )
                                            }
                                        />
                                    ) : null}
                                </Pagination>)}
                            </>
                        ) : (
                            <></>
                        )}
                        { showReviewForm?
                            <Card className={"mt-2 col-md-6 col-lg-4 me-4"}>
                            <Card.Body>
                                <h5>Leave a review</h5>
                                <Form >
                                    <Form.Label>Rating: {sliderValue}</Form.Label><br/>
                                    <RangeSlider value={sliderValue} onChange={(e) => handleSliderChange(e.target.value)} max={5} min={0}
                                                 className={"w-25"} tooltip={"off"}/>
                                    <br/>

                                    <Form.Group controlId="comment">
                                        <Form.Label>Comment:</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            placeholder="Enter comment"
                                        />
                                    </Form.Group>

                                    <Button onClick={submitCreateReview} className={"mt-1"} type="button" variant="primary">Submit Review</Button>
                                </Form>
                            </Card.Body>
                        </Card>  : <></>}
                        {
                            authenticated === true && role === member?
                                <>
                                    <h5>Reservations</h5>
                                    <span>Available: <span
                                        className={availability !== 0 ? "text-success-bold" : "text-danger-bold"}>{availability}
                                    </span></span>
                                    <br/>
                                    {
                                        availability > 0?
                                        <Button onClick={() => handleCreateReservation()} className={"mt-1"} type="button"
                                             variant="primary">Create Reservation
                                        </Button> : <></>}
                                </> : <></>
                        }
                        <UniversalModal
                            formElements={formElements}
                            title={"Edit Review"}
                            confirmText={"Submit Review"}
                            show={showEditModal}
                            onHide={handleClose}
                            onConfirm={() => handleEditSubmit()} />
                        <div className={"py-3"} />
                    </div>
                ) : (
                    <p className="mt-4 ms-4">No book found</p>
                )}
        </>
    );
}