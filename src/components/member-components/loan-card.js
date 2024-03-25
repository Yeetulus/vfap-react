import React from "react";
import { Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/global.scss";
import {formatDate} from "../../utils/date-utils";

const LoanCard = ({ loan }) => {

    const isWithin24Hours = () => {
        const scheduledDate = new Date(loan.scheduledReturnDate);
        const currentDate = new Date();
        const diff = scheduledDate - currentDate;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        return hours <= 24;
    };

    return (
        <Card className={"my-1 me-2 col-md-8 col-lg-6 card-hover-primary " + (loan.actualReturnDate !== null? "grey-bg" : "")}>
            <Card.Body>
                <Card.Title>{loan.copy.book.title}</Card.Title>
                <Card.Text>
                    Borrowed: {formatDate(loan.dateBorrowed)} <br />
                    {loan.actualReturnDate
                        ? (
                            <>
                                Returned: {formatDate(loan.actualReturnDate)}
                            </>
                        )
                        : (
                            <>
                                Scheduled Return: {isWithin24Hours()
                                ? <span style={{ color: "red" }}>{formatDate(loan.scheduledReturnDate)}</span>
                                : formatDate(loan.scheduledReturnDate)}
                            </>
                        )}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default LoanCard;