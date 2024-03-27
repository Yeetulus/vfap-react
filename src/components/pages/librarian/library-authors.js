import {PlusCircleFill} from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../styles/global.scss";
import React, {useEffect, useState} from "react";
import {useBooksContext} from "../../../context/books-context";
import {UniversalModal} from "../../universal-modal";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {LibrarianAuthorCard} from "../../librarian-components/librarian-author-card";

export function LibraryAuthors() {

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentAuthor, setCurrentAuthor] = useState(undefined);
    const {authors, fetchAuthors, editAuthor, createAuthor, deleteAuthor} = useBooksContext();

    useEffect(() => {
        fetchAuthors();
    }, []);

    function handleCreateAuthor() {
        setShowCreateModal(true);
    }
    function submitAuthorCreate(formData) {
        const {name} = formData;
        createAuthor(name);
    }

    function handleEditAuthor(author) {
        setCurrentAuthor(author);
        setShowEditModal(true);
    }
    function submitAuthorEdit(formData) {
        const { name } = formData;
        editAuthor(currentAuthor.id, name);
    }

    function handleDeleteAuthor(author) {
        deleteAuthor(author.id);
    }

    function hideCreateModal() {
        setShowCreateModal(false);
    }
    function hideEditModal() {
        setShowEditModal(false);
    }

    const formCreateElements = [
        { id: 'name', label: 'Author name', type: 'text', placeholder: "Type in author name" }
    ];
    const formEditElements = [
        { id: 'name', label: 'New name', type: 'text', placeholder: "Type in new author name" }
    ];

    return(
        <div className={"mt-2 ms-4 h-85"}>
            <UniversalModal show={showCreateModal} title={"Create new author"} confirmText={"Create"} formElements={formCreateElements} onConfirm={submitAuthorCreate} onHide={hideCreateModal} />
            <UniversalModal show={showEditModal} title={`Update author ${currentAuthor?.name}`} confirmText={"Update"} formElements={formEditElements} onConfirm={submitAuthorEdit} onHide={hideEditModal} />
            <div className={"d-flex align-items-center"}>
                <h3>Authors</h3>
                <OverlayTrigger placement={"top"} overlay={
                    <Tooltip className={"tooltip-width"} >Create Authors</Tooltip>
                }>
                    <PlusCircleFill onClick={handleCreateAuthor} className={"text-primary text-clickable-grey ms-3 mt-2 h5"}></PlusCircleFill>

                </OverlayTrigger>
            </div>
            <div className={"scrollbar h-85 mt-2"}>
                {
                    authors.map((author, index) => {
                        return(<LibrarianAuthorCard author={author} editAuthor={() => handleEditAuthor(author)} deleteAuthor={() => handleDeleteAuthor(author)} key={index} />)
                    })
                }
            </div>
        </div>
    )
}