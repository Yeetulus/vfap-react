import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/global.scss";
import {Card, CardText} from "react-bootstrap";
import {PencilFill, XCircleFill} from "react-bootstrap-icons";

export const LibrarianGenreCard = ({genre, editGenre, deleteGenre}) => {

    return(
        <Card className={"mb-1 me-2 col-lg-6 card-hover-primary"}>
            <div className="position-absolute top-0 end-0 mt-2 me-2">
                <PencilFill
                    className={"text-primary text-clickable-grey"}
                    size={21}
                    onClick={editGenre}
                />
                <XCircleFill
                    className={"ms-2 text-primary text-clickable-danger"}
                    size={21}
                    onClick={deleteGenre}
                />
            </div>

            <CardText className={"my-2 ms-3"}>{genre.name}</CardText>
        </Card>
    );
}