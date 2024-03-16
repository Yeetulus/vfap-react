import {useEffect} from "react";
import {useBooksContext} from "../../../model/books-context";
import {Col, Row} from "react-bootstrap";
import '../../../styles/global.scss'
import Sidebar from "../../sidebar/member-sidebar";

export function BookSearch(){

    const {
        availableOnly,
        setAvailableOnly,

        selectedBook,
        selectSelectedBook,

        bookResults,
        setBookResults,

        searchBarResults,
        setSearchBarResults,

        selectedGenres,
        setSelectedGenres,

        genres,
        setGenres,

        fetchSearchBarResults,
        fetchBookResults,
        fetchGenres

    } = useBooksContext();

    useEffect(() => {
        fetchGenres();
    });

    return(
        <Row className="page-body">
            <Col xs={4} sm={3} lg={2} style={{ height: '100%' }}>
                <Sidebar></Sidebar>
            </Col>
            <Col xs={8} sm={9} lg={10} style={{ height: '100%' }}>
                <p>right</p>
            </Col>
        </Row>
    )
}