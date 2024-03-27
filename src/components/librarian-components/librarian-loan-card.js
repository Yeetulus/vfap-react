import {Card, CardText, CardTitle} from "react-bootstrap";
import {formatDate} from "../../utils/date-utils";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/global.scss";
import {XCircleFill} from "react-bootstrap-icons";

export const LibrarianLoanCard = ({loan, returnLoan}) => {


    return(
        <Card className={"mb-1 me-2 col-lg-6 card-hover-primary"}>
            {loan.actualReturnDate === null && (
                <XCircleFill
                    className="position-absolute top-0 end-0 mt-2 me-2 text-danger text-clickable-grey"
                    size={21}
                    onClick={() => returnLoan(loan)}
                />
            )}
            <CardTitle className={"mt-3 ms-3"}>{loan.copy.book.title}</CardTitle>
            <CardText className={"ms-3 mb-3"}>{loan.actualReturnDate ? "Returned: " + formatDate(loan.actualReturnDate) : "Scheduled for: " + formatDate(loan.scheduledReturnDate)}</CardText>
        </Card>
    )
}