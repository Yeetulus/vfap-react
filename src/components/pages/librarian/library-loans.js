import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../styles/global.scss";
import {PlusCircleFill} from "react-bootstrap-icons";
import React, {useState} from "react";
import {Form, FormControl} from "react-bootstrap";
import {useBooksContext} from "../../../context/books-context";
import {LibrarianLoanCard} from "../../librarian-components/librarian-loan-card";
import {showSnackbar, successType} from "../../../utils/snackbar-display";
import {useNavigate} from "react-router-dom";

export function LibraryLoans(){

    const [email, setEmail] = useState("");
    const [loans, setLoans] = useState([]);
    const [activeOnly, setActiveOnly] = useState(false);
    const { fetchLibrarianLoansActive, fetchLibrarianLoans, returnLoan } = useBooksContext();
    const navigate = useNavigate();

    function handleToggleSwitch() {
        emailValueChanged(email, !activeOnly);
        setActiveOnly(!activeOnly);
    }

    function emailValueChanged(newValue, _activeOnly){
        setEmail(newValue);
        if(newValue.length < 1) return;
        const response = (data) => {
            setLoans(data);
        }
        if(_activeOnly !== undefined){
            if(_activeOnly){
                fetchLibrarianLoansActive(newValue, response);
            } else{
                fetchLibrarianLoans(newValue, response);
            }
        }
        else {
            if(activeOnly) {
                fetchLibrarianLoansActive(newValue, response);
            } else{
                fetchLibrarianLoans(newValue, response);
            }
        }
    }

    function handleReturnLoan(loan) {
        const success = (data) => {
            const updatedLoans = loans.map(prevLoan => {
                if (prevLoan.id === loan.id) {
                    return { ...prevLoan, actualReturnDate: new Date().toISOString() };
                }
                return prevLoan;
            });
            setLoans(updatedLoans);
            showSnackbar("Loan returned", successType);
        }
        returnLoan(loan.id, success);
    }

    function handleCreateLoan() {
        navigate("/librarian/copies");
    }

    return(
        <div className={"mt-2 ms-4 h-85"}>
            <div className={"d-flex align-items-center"}>
                <PlusCircleFill onClick={handleCreateLoan} className={"text-primary text-clickable-grey me-3 h5"}></PlusCircleFill>
                <h3>Loans</h3>
                <Form className={"ms-3"}>
                    <FormControl
                        type="email"
                        placeholder="Search by email"
                        value={email}
                        onChange={(e) => emailValueChanged(e.target.value, undefined)}
                    />
                </Form>
                <Form.Check
                    type="switch"
                    id="toggle-switch"
                    label={activeOnly ? "Show active only" : "Show all"}
                    checked={activeOnly}
                    onChange={handleToggleSwitch}
                    style={{ marginLeft: "15px" }}
                />
            </div>
            <div className={"scrollbar h-85 mt-2"}>
                {
                    loans.map((loan, index) => {
                        return(<LibrarianLoanCard loan={loan} returnLoan={() => handleReturnLoan(loan)} key={index} />)
                    })
                }
            </div>
        </div>
    )
}