import {PlusCircleFill} from "react-bootstrap-icons";
import {Form, FormControl} from "react-bootstrap";
import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../styles/global.scss";
import {LibrarianCopy} from "../../librarian-components/librarian-copy";
import {useBooksContext} from "../../../context/books-context";
import {borrowedState, eliminatedState} from "../../../utils/copy-states";
import {UniversalModal} from "../../universal-modal";

export function LibraryCopies(){

    const [searchValue, setSearchValue] = useState("");
    const [copies, setCopies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [id, setCopyId] = useState(-1);

    const {selectedBook,
        setSelectedBook,
        searchBarResults,
        fetchSearchBarResults,
        fetchCopies,
        createLoan,
        eliminateCopy,
        createCopy
    } = useBooksContext();

    function searchValueChanged(value) {
        fetchSearchBarResults(value);
        setSearchValue(value);
    }

    function addCopy() {
        if(selectedBook){
            const success = (copy) => {
                setCopies([...copies, copy])
            }
            createCopy(selectedBook.id, success);
        }
    }

    function _createLoan(copyId) {
        setShowModal(true);
        setCopyId(copyId);
    }

    function selectBook(result) {
        setSelectedBook(result);
        fetchCopies(result.id, (data) => {
            setCopies(data);
        });
        searchValueChanged("");
    }

    function handleClose(event) {
        setShowModal(false);
    }

    function createLoanSubmit(formData) {
        const { email } = formData;
        const callback = () => {
            const copyIndex = copies.findIndex(copy => copy.id === id);
            if (copyIndex !== -1) {
                const updatedCopies = [...copies];
                updatedCopies[copyIndex] = { ...updatedCopies[copyIndex], bookCondition: borrowedState };
                setCopies(updatedCopies);
            }
            setCopyId(-1);
            handleClose();
        };
        createLoan(email, id, callback);
    }

    function _eliminateCopy(copyId) {
        const success = () => {
            const copyIndex = copies.findIndex(copy => copy.id === copyId);
            if (copyIndex !== -1) {
                const updatedCopies = [...copies];
                updatedCopies[copyIndex] = { ...updatedCopies[copyIndex], bookCondition: eliminatedState};
                setCopies(updatedCopies);
            }
        }
        eliminateCopy(copyId, success);
    }

    const formElements = [
        { id: 'email', label: 'Email', type: 'email', placeholder: "Type in member e-mail" }
    ];

    return(
        <div className={"mt-2 ms-4 h-85"}>
            <UniversalModal
                show={showModal}
                onHide={handleClose}
                onConfirm={createLoanSubmit}
                title={`Create loan for copy #${id}`}
                confirmText={"Create Loan"}
                formElements={formElements}
            />
            <div className={"d-flex align-items-center"}>
                <h3>Copies</h3>
                <Form className={"ms-3"}>
                    <FormControl
                        type="text"
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
                        return(<LibrarianCopy key={index} copy={copy} createLoan={() => _createLoan(copy.id)} eliminateCopy={() => _eliminateCopy(copy.id)}/>)
                    })
                }
            </div>
        </div>
    )
}