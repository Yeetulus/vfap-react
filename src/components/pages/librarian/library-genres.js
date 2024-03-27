import {PlusCircleFill} from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../styles/global.scss";
import React, {useEffect, useState} from "react";
import {useBooksContext} from "../../../context/books-context";
import {LibrarianGenreCard} from "../../librarian-components/librarian-genre-card";
import {UniversalModal} from "../../universal-modal";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

export function LibraryGenres() {

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentGenre, setCurrentGenre] = useState(undefined);
    const {genres, fetchGenres, editGenre, createGenre, deleteGenre} = useBooksContext();

    useEffect(() => {
        fetchGenres();
    }, []);
    function handleCreateGenre() {
        setShowCreateModal(true);
    }
    function submitGenreCreate(formData) {
        const {name} = formData;
        createGenre(name);
    }

    function handleEditGenre(genre) {
        setCurrentGenre(genre);
        setShowEditModal(true);
    }
    function submitGenreEdit(formData) {
        const { name } = formData;
        editGenre(currentGenre.name, name);
    }

    function handleDeleteGenre(genre) {
        deleteGenre(genre.name);
    }

    function hideCreateModal() {
        setShowCreateModal(false);
    }
    function hideEditModal() {
        setShowEditModal(false);
    }

    const formCreateElements = [
        { id: 'name', label: 'Genre name', type: 'text', placeholder: "Type in genre name" }
    ];
    const formEditElements = [
        { id: 'name', label: 'New name', type: 'text', initialValue: currentGenre? currentGenre.name: '', placeholder: "Type in new genre name" }
    ];

    return(
        <div className={"mt-2 ms-4 h-85"}>
            <UniversalModal show={showCreateModal} title={"Create new genre"} confirmText={"Create"} formElements={formCreateElements} onConfirm={submitGenreCreate} onHide={hideCreateModal} />
            <UniversalModal show={showEditModal} title={`Update genre ${currentGenre?.name}`} confirmText={"Update"} formElements={formEditElements} onConfirm={submitGenreEdit} onHide={hideEditModal} />
            <div className={"d-flex align-items-center"}>
                <h3>Genres</h3>
                <OverlayTrigger placement={"top"} overlay={
                    <Tooltip className={"tooltip-width"} >Create Genre</Tooltip>
                }>
                    <PlusCircleFill onClick={handleCreateGenre} className={"text-primary text-clickable-grey ms-3 mt-2 h5"}></PlusCircleFill>

                </OverlayTrigger>
            </div>
            <div className={"scrollbar h-85 mt-2"}>
                {
                    genres.map((genre, index) => {
                        return(<LibrarianGenreCard genre={genre} editGenre={() => handleEditGenre(genre)} deleteGenre={() => handleDeleteGenre(genre)} key={index} />)
                    })
                }
            </div>
        </div>
    )
}