import {PencilFill, StarFill, XCircleFill} from "react-bootstrap-icons";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, OverlayTrigger, Tooltip} from "react-bootstrap";
import {userId} from "../context/auth-context";

export const BookReview = ({message, onEdit, onDelete}) => {

    const isSameUser = (messageUserId) => {
        return localStorage.getItem(userId) === messageUserId.toString();
    }

    return (<Card className="my-1 me-4 col-md-6 col-lg-4">
        <Card.Body>
            <div className="d-flex rating-info align-items-center">
                <span>{message.rating}</span>
                <StarFill color={"#ffea00"} className="star-icon"/>
                {
                    isSameUser(message.userId) && (
                        <>
                            <OverlayTrigger placement={"top"} overlay={
                                <Tooltip className={"tooltip-width"} >Edit review</Tooltip>
                            }>
                                <PencilFill className="text-primary clickable ms-3 me-2" onClick={onEdit}></PencilFill>
                            </OverlayTrigger>
                            <OverlayTrigger placement={"top"} overlay={
                                <Tooltip className={"tooltip-width"}>Delete review</Tooltip>
                            }>
                                <XCircleFill className="text-primary text-clickable-danger" onClick={onDelete}></XCircleFill>
                            </OverlayTrigger>
                        </>
                    )
                }
            </div>
            <Card.Title>{message.name}</Card.Title>
            <Card.Text>{message.comment}</Card.Text>
        </Card.Body>
    </Card>);
}