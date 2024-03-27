import {PencilFill, XCircleFill} from "react-bootstrap-icons";
import {Card, CardText, CardTitle} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/global.scss";
import {getReleaseYear} from "../../utils/date-utils";

export const LibrarianBookCard = ({book, onEdit, onDelete}) => {

    return(
        <Card className={"mb-1 me-2 col-lg-6 card-hover-primary"}>
            <div className="position-absolute top-0 end-0 mt-2 me-2">
                <PencilFill
                    className={"text-primary text-clickable-grey"}
                    size={21}
                    onClick={onEdit}
                />
                <XCircleFill
                    className={"ms-2 text-primary text-clickable-danger"}
                    size={21}
                    onClick={onDelete}
                />
            </div>
            <CardTitle className={"mt-2 mb-0 ms-3"}>{book.title}</CardTitle>
            <CardText className={"text-muted ms-3 mb-1"}>{book.genre.name}</CardText>
            <CardText className={"ms-3"} style={{marginTop: 0, marginBottom: -2}}>{
                book.authors.map((author, index) => {
                    return (
                        <span key={index}>
                            {author.name}
                            {index !== book.authors.length - 1 && ", "}
                        </span>
                    );
                })
            }</CardText>
            <CardText className={"ms-3"} style={{marginTop: -2, marginBottom: -2}}>Pages: {book.pages}</CardText>
            <CardText className={"ms-3 pb-2"} style={{marginTop: -2}}>Released: {getReleaseYear(book.releaseDate)}</CardText>
        </Card>
    );
}