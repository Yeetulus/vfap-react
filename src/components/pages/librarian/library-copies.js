import {PlusCircleFill} from "react-bootstrap-icons";
import {Form, FormControl} from "react-bootstrap";
import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../styles/global.scss";
import {LibrarianCopy} from "../../librarian-components/librarian-copy";
import {useBooksContext} from "../../../context/books-context";

export function LibraryCopies(){

    const [searchValue, setSearchValue] = useState("");
    const [copies, setCopies] = useState([]);

    const {selectedBook, setSelectedBook, searchBarResults, fetchSearchBarResults, fetchCopies} = useBooksContext();

    function searchValueChanged(value) {
        fetchSearchBarResults(value);
        setSearchValue(value);
    }

    function addCopy() {

    }

    function selectBook(result) {
        setSelectedBook(result);
        fetchCopies(result.id, (data) => {
            setCopies(data);
        });
        searchValueChanged("");
    }

    return(
        <div className={"mt-2 ms-4 h-85"}>
            <div className={"d-flex align-items-center"}>
                <h3>Copies</h3>
                <Form className={"ms-3"}>
                    <FormControl
                        type="email"
                        placeholder="Type in book title"
                        value={searchValue}
                        onChange={(e) => searchValueChanged(e.target.value)}
                    />
                    {searchValue.length > 0 && (
                        <div className="autocomplete">
                            {searchBarResults.slice(0, 6).map((result, index) => (
                                <p onClick={() => selectBook(result)} key={index}>{result.title}</p>
                            ))}
                        </div>
                    )}
                </Form>
                {
                    selectedBook !== undefined && (
                        <PlusCircleFill onClick={() => addCopy()} className={"text-primary text-clickable-grey ms-3 mt-2 h5"}></PlusCircleFill>
                    )
                }

            </div>
            <div className={"scrollbar h-85 mt-2"}>
                {
                    copies.map((copy, index) => {
                        return(<LibrarianCopy key={index} copy={copy}/>)
                    })
                }
            </div>
        </div>
    )
}