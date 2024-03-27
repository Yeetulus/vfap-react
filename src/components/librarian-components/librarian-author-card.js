import {Card, CardText} from "react-bootstrap";
import {PencilFill, XCircleFill} from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/global.scss";

export const LibrarianAuthorCard = ({author, editAuthor, deleteAuthor}) => {

    return(
        <Card className={"mb-1 me-2 col-lg-6 card-hover-primary"}>
            <div className="position-absolute top-0 end-0 mt-2 me-2">
                <PencilFill
                    className={"text-primary text-clickable-grey"}
                    size={21}
                    onClick={editAuthor}
                />
                <XCircleFill
                    className={"ms-2 text-primary text-clickable-danger"}
                    size={21}
                    onClick={deleteAuthor}
                />
            </div>
            <CardText className={"my-2 ms-3"}>{author.name}</CardText>
        </Card>
    )
}