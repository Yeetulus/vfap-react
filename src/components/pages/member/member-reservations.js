import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../styles/global.scss"
import React, {useEffect, useState} from "react";
import {Button, Card, CardBody} from "react-bootstrap";
import {useBooksContext} from "../../../context/books-context";
import {useNavigate} from "react-router-dom";
import {ReservationCard} from "../../member-components/reservation-card";

export function MemberReservations(){

    const [reservations, setReservations] = useState([]);
    const { fetchReservations,fetchSelectedBook, fetchBookResults, cancelReservation } = useBooksContext();
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
    const handleCancelReservation = (reservation) => {
        const success = () => {
            setReservations(prevReservations => prevReservations.filter(res => res.id !== reservation.id));
        };
        cancelReservation(reservation.book.id, success);
    };
    return(
        <div className={"mt-2 ms-4 h-85 scrollbar"}>
            { reservations.length > 0?
                <h3>Reservations</h3> : <p className={"mt-3 ms-2"}>You have no reservations</p>
            }
            {
                reservations.map((reservation, index) => {
                    return (
                        <ReservationCard reservation={reservation}
                                         navigateToBookDetail={navigateToBookDetail}
                                         key={index}
                                         searchBooksByAuthor={searchBooksByAuthor}
                                         handleCancelReservation={handleCancelReservation}>

                        </ReservationCard>
                    )
                })
            }
        </div>
    )
}