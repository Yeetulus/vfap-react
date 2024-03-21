import {Card} from "react-bootstrap";
import {getReleaseYear} from "../utils/date-utils";
import React, {useEffect, useState} from "react";
import '../styles/global.scss';
import {useBooksContext} from "../context/books-context";
import {StarFill} from "react-bootstrap-icons";

export const BookResult = ({book, onClick}) => {

    const [reviews, setReviews] = useState(null);
    const [availability, setAvailability] = useState(0);

    const{
        fetchReviews,
        fetchAvailability
    } = useBooksContext();

    useEffect(() => {
        fetchReviews(book.id, (data) => {
            setReviews(data);
        });
        fetchAvailability(book.id, (data) => {
            setAvailability(data);
        });
    }, [book]);

    return(
        <Card onClick={() => onClick()} className="my-1 me-2 clickable non-selectable card-hover-primary">
            <Card.Body>
                <Card.Title>
                    <span className="text-primary-bold">{book.title}</span>
                    <span className="text-muted">
                        {" - "}
                        {book.authors.slice(0, 3).map((author, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && ", "}
                                {author.name}
                            </React.Fragment>
                        ))}
                        {book.authors.length > 3 && " ..."}
                    </span>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {book.genre.name}
                </Card.Subtitle>
                <Card.Text className="my-0">Pages: {book.pages}</Card.Text>
                <Card.Text className="my-0">
                    Released: {getReleaseYear(book.releaseDate)}
                </Card.Text>
                {
                    reviews !== null && reviews.reviewsCount > 0?
                        <div className="d-flex align-items-center">
                            <span>{reviews.average.toFixed(1)}</span>
                            <StarFill color={"#ffea00"} className="star-icon"></StarFill>
                            <span className="text-grey">({reviews.reviewsCount})</span>
                        </div> :
                        <></>
                }
                <span className={"availability-info"}>Available: <span className={availability!==0? "text-success-bold" : "text-danger-bold"}>{availability}</span></span>
            </Card.Body>
        </Card>
    );
}