import {Card, CardText, CardTitle} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/global.scss";
import {PlusCircleFill, XCircleFill} from "react-bootstrap-icons";
import {available, borrowed} from "../../utils/copy-states";

export const LibrarianCopy = ({copy, createLoan, eliminateCopy}) => {

    function conditionClass() {
        switch (copy.bookCondition){
            case available:
                return "text-success-bold";
            case borrowed:
                return "text-primary-bold";
            default:
                return "text-danger-bold";
        }
    }

    return(
        <Card className={"mb-1 me-2 col-lg-6 card-hover-primary"}>
            {copy.bookCondition === available && (
                <div className={"position-absolute top-0 end-0 mt-2 me-2"}>
                    <PlusCircleFill
                        className="text-primary text-clickable-grey me-2"
                        size={21}
                        onClick={() => createLoan(copy)}
                    />
                    <XCircleFill
                        className="text-danger text-clickable-grey"
                        size={21}
                        onClick={() => eliminateCopy(copy)}
                    />
                </div>
            )}
            <CardTitle className={"mt-3 ms-3"}>{"#" + copy.id.toString() + " "+ copy.book.title}</CardTitle>
            <CardText className={`ms-3 mb-3 ${conditionClass()}`}>{copy.bookCondition}</CardText>
        </Card>
    )
}