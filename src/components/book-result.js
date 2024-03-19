import {Card} from "react-bootstrap";
import {getReleaseYear} from "../utils/date-utils";
import React from "react";
import '../styles/global.scss';

export const BookResult = ({book, onClick}) => {

    return(
        <Card onClick={() => onClick()} className="my-1 me-2 clickable non-selectable card-hover-primary">
            <Card.Body>
                <Card.Title>
                    <span className="text-primary-bold">{book.title}</span>
                    <span className="text-muted">
                        {" "}- {book.authors.map((author) => author.name).join(", ")}
                    </span>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {book.genre.name}
                </Card.Subtitle>
                <Card.Text className="my-0">Pages: {book.pages}</Card.Text>
                <Card.Text className="my-0">
                    Released: {getReleaseYear(book.releaseDate)}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}