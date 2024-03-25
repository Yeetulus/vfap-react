import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {useBooksContext} from "../../../context/books-context";
import LoanCard from "../../member-components/loan-card";

export function MemberLoans() {

    const [loans, setLoans] = useState([]);
    const [activeOnly, setActiveOnly] = useState(false);
    const {fetchActiveLoans, fetchLoans} = useBooksContext();

    useEffect(() =>{
        reFetchLoans(activeOnly);
    }, []);
    const reFetchLoans = (newValue) => {
        const success = (data) => {
            setLoans(data);
        }
        newValue? fetchActiveLoans(success) : fetchLoans(success);
    };
    const handleToggleSwitch = () => {
        const newValue = !activeOnly;
        setActiveOnly(newValue);
        reFetchLoans(newValue);
    };
    return(
        <div className={"mt-2 ms-4 h-85"}>
            <h3>Loans</h3>
            <Form.Check
                type="switch"
                id="toggle-switch"
                label={activeOnly ? "Show only active" : "Show all"}
                checked={activeOnly}
                onChange={handleToggleSwitch}
                style={{ marginLeft: "15px", marginBottom: "10px" }}
            />
            <div className={"h-85 scrollbar"}>
                {
                    loans.map((loan, index) => {
                        return <LoanCard loan={loan} key={index}></LoanCard>
                    })
                }
            </div>
        </div>
    )
}