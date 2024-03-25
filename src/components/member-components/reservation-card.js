import {Button, Card, CardBody} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/global.scss";
import React from "react";

export const ReservationCard = ({reservation, navigateToBookDetail, searchBooksByAuthor, handleCancelReservation}) =>
{

    return (<Card className={"my-1 me-4 col-md-8 col-lg-6 card-hover-primary"}>
        <CardBody>
            <h5 className={"text-clickable-primary"} onClick={() => navigateToBookDetail(reservation.book.id)}>
                {reservation.book.title}
            </h5>
            {reservation.book.authors.map((author, _index) =>
                <span key={_index} className={"text-clickable-primary"} onClick={() => searchBooksByAuthor(author.id)}>
                                    {author.name}
                                </span>
            )}
            <Button className={"rating-info"} onClick={() => handleCancelReservation(reservation)}>Cancel</Button>
        </CardBody>
    </Card>)
}