import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../styles/global.scss"
import React, {useEffect, useState} from "react";
import {Button, Card, CardBody} from "react-bootstrap";
import {useBooksContext} from "../../../context/books-context";
import {useNavigate} from "react-router-dom";

export function MemberReservations(){

    const [reservations, setReservations] = useState([]);
    const { fetchReservations,fetchSelectedBook, fetchBookResults } = useBooksContext();
    const navigate = useNavigate();

    useEffect(() => {
        const response = (data) => {
            setReservations(data);
        }
        fetchReservations(response);
    }, []);

    const navigateToBookDetail = (bookId) => {
        fetchSelectedBook(bookId);
        navigate(`/${bookId}`);
    };
    const searchBooksByAuthor = (id) => {
        fetchBookResults('', id);
        navigate("/");
    };
    const cancelReservation = (reservation) => {
        
    };
    return(
        <div className={"mt-2 ms-4 h-85 scrollbar"}>
            <h3>Reservations</h3>
            {
                reservations.map((reservation, index) => {
                    return (
                    <Card key={index} className={"my-1 me-4 col-md-8 col-lg-6"}>
                        <CardBody>
                            <h5 className={"text-clickable-primary"} onClick={() => navigateToBookDetail(reservation.book.id)}>
                                {reservation.book.title}
                            </h5>
                            {reservation.book.authors.map((author, _index) =>
                                <span key={_index} className={"text-clickable-primary"} onClick={() => searchBooksByAuthor(author.id)}>
                                    {author.name}
                                </span>
                            )}
                            <Button className={"rating-info"} onClick={() => cancelReservation(reservation)}>Cancel</Button>
                        </CardBody>
                    </Card>)
                })
            }
        </div>
    )
}